"""
Location management utilities for real-time user tracking
Handles proximity calculations and location updates
"""
import math
from typing import List, Dict, Tuple, Optional
from database import db

# Proximity radius in meters (250 feet = ~76 meters)
PROXIMITY_RADIUS_METERS = 76.2

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate distance between two coordinates using Haversine formula
    Returns distance in meters
    """
    R = 6371000  # Earth's radius in meters
    
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    a = (math.sin(delta_phi / 2) ** 2 +
         math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2)
    
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c  # Distance in meters
    return distance


def is_within_proximity(lat1: float, lon1: float, lat2: float, lon2: float) -> bool:
    """
    Check if two coordinates are within proximity radius
    """
    distance = calculate_distance(lat1, lon1, lat2, lon2)
    return distance <= PROXIMITY_RADIUS_METERS


def update_user_location(user_id: int, latitude: float, longitude: float) -> bool:
    """
    Update or insert user's current location
    Only stores location for active users
    """
    conn = db.get_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        
        # First check if user is active
        cursor.execute("SELECT is_active FROM users WHERE id = %s", (user_id,))
        result = cursor.fetchone()
        
        if not result or not result[0]:
            # User is not active, don't store location
            # Delete any existing location
            cursor.execute("DELETE FROM user_locations WHERE user_id = %s", (user_id,))
            conn.commit()
            db.return_connection(conn)
            return False
        
        # Upsert location (insert or update if exists)
        cursor.execute("""
            INSERT INTO user_locations (user_id, latitude, longitude, last_updated)
            VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id) 
            DO UPDATE SET 
                latitude = EXCLUDED.latitude,
                longitude = EXCLUDED.longitude,
                last_updated = CURRENT_TIMESTAMP
        """, (user_id, latitude, longitude))
        
        conn.commit()
        return True
        
    except Exception as e:
        print(f"Error updating user location: {str(e)}")
        conn.rollback()
        return False
    finally:
        db.return_connection(conn)


def delete_user_location(user_id: int) -> bool:
    """
    Delete user's location (when they go inactive)
    Privacy feature: no location stored when inactive
    """
    conn = db.get_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user_locations WHERE user_id = %s", (user_id,))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error deleting user location: {str(e)}")
        conn.rollback()
        return False
    finally:
        db.return_connection(conn)


def get_nearby_active_users(
    user_id: int, 
    latitude: float, 
    longitude: float
) -> List[Dict]:
    """
    Get all active users within proximity radius
    Returns list of user data including location and avatar
    Excludes the requesting user
    """
    conn = db.get_connection()
    if not conn:
        return []
    
    try:
        cursor = conn.cursor()
        
        # Get all active users with locations (excluding current user)
        cursor.execute("""
            SELECT 
                u.id, 
                u.username, 
                u.avatar_data, 
                u.is_active,
                u.headline,
                ul.latitude, 
                ul.longitude,
                ul.last_updated
            FROM users u
            INNER JOIN user_locations ul ON u.id = ul.user_id
            WHERE u.is_active = true 
            AND u.id != %s
            AND ul.last_updated > NOW() - INTERVAL '5 minutes'
        """, (user_id,))
        
        results = cursor.fetchall()
        nearby_users = []
        
        # Filter by proximity
        for row in results:
            user_lat, user_lon = row[5], row[6]
            
            if is_within_proximity(latitude, longitude, user_lat, user_lon):
                nearby_users.append({
                    'userId': row[0],
                    'username': row[1],
                    'avatar_data': row[2],
                    'is_active': row[3],
                    'headline': row[4],
                    'latitude': float(user_lat),
                    'longitude': float(user_lon),
                })
        
        return nearby_users
        
    except Exception as e:
        print(f"Error getting nearby users: {str(e)}")
        return []
    finally:
        db.return_connection(conn)


def get_user_location(user_id: int) -> Optional[Tuple[float, float]]:
    """
    Get user's current stored location
    Returns (latitude, longitude) or None
    """
    conn = db.get_connection()
    if not conn:
        return None
    
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT latitude, longitude 
            FROM user_locations 
            WHERE user_id = %s
        """, (user_id,))
        
        result = cursor.fetchone()
        if result:
            return (float(result[0]), float(result[1]))
        return None
        
    except Exception as e:
        print(f"Error getting user location: {str(e)}")
        return None
    finally:
        db.return_connection(conn)
