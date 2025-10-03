import bcrypt
import jwt
import secrets
import string
from datetime import datetime, timedelta
from flask import request, jsonify
from database import db
import psycopg2.extras

def generate_username():
    """Generate a random username like 'JadeStoneGecko32'"""
    adjectives = [
        'Jade', 'Stone', 'Crystal', 'Moon', 'Star', 'River', 'Forest', 'Ocean', 'Mountain', 'Fire',
        'Ice', 'Thunder', 'Wind', 'Earth', 'Light', 'Shadow', 'Golden', 'Silver', 'Ruby', 'Emerald',
        'Sapphire', 'Diamond', 'Pearl', 'Coral', 'Amber', 'Mystic', 'Ancient', 'Noble', 'Wild', 'Swift',
        'Brave', 'Fierce', 'Gentle', 'Wise', 'Bold', 'Bright', 'Dark', 'Crimson', 'Azure', 'Violet'
    ]
    nouns = [
        'Dragon', 'Phoenix', 'Tiger', 'Wolf', 'Eagle', 'Lion', 'Bear', 'Fox', 'Hawk', 'Shark',
        'Falcon', 'Panther', 'Leopard', 'Jaguar', 'Lynx', 'Raven', 'Owl', 'Deer', 'Elk', 'Moose',
        'Whale', 'Dolphin', 'Turtle', 'Cobra', 'Viper', 'Gecko', 'Lizard', 'Frog', 'Butterfly', 'Bee',
        'Spider', 'Scorpion', 'Mantis', 'Beetle', 'Ant', 'Wasp', 'Hornet', 'Moth', 'Cricket', 'Firefly'
    ]
    number = ''.join(secrets.choice(string.digits) for _ in range(3))  # Increased to 3 digits
    return f"{secrets.choice(adjectives)}{secrets.choice(nouns)}{number}"

def generate_unique_username():
    """Generate a unique username by checking against existing usernames"""
    max_attempts = 10
    for _ in range(max_attempts):
        username = generate_username()
        
        # Check if username already exists
        conn = db.get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
        existing = cursor.fetchone()
        cursor.close()
        db.return_connection(conn)
        
        if not existing:
            return username
    
    # If we couldn't generate a unique username after max_attempts, add timestamp
    base_username = generate_username()
    timestamp = str(int(datetime.utcnow().timestamp()))[-4:]  # Last 4 digits of timestamp
    return f"{base_username}{timestamp}"

def hash_password(password):
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed):
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def generate_jwt_token(user_id):
    """Generate JWT token for user"""
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, 'your-super-secret-jwt-key-change-this-in-production', algorithm='HS256')

def verify_jwt_token():
    """Verify JWT token from request headers and return user_id"""
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None, jsonify({'error': 'No token provided'}), 401
    
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(token, 'your-super-secret-jwt-key-change-this-in-production', algorithms=['HS256'])
        return payload['user_id'], None, None
    except jwt.ExpiredSignatureError:
        return None, jsonify({'error': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return None, jsonify({'error': 'Invalid token'}), 401

def generate_default_avatar():
    """Generate default avatar data for new users"""
    import random
    
    # Random avatar options based on DiceBear Big Smile schema
    background_colors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'c7f9cc', 'fff2cc', 'fca5a5', '5eead4']
    skin_colors = ['ffe4c0', 'f5d7b1', 'efcc9f', 'e2ba87', 'c99c62', 'a47539', '8c5a2b', '643d19']
    hair_styles = ['shortHair', 'mohawk', 'wavyBob', 'bowlCutHair', 'curlyBob', 'straightHair', 'braids', 'shavedHead', 'bunHair', 'froBun', 'bangs', 'halfShavedHead', 'curlyShortHair']
    hair_colors = ['220f00', '3a1a00', '71472d', 'e2ba87', '605de4', '238d80', 'd56c0c', 'e9b729']
    eyes = ['cheery', 'normal', 'confused', 'starstruck', 'winking', 'sleepy', 'sad', 'angry']
    mouths = ['openedSmile', 'unimpressed', 'gapSmile', 'openSad', 'teethSmile', 'awkwardSmile', 'braces', 'kawaii']
    accessories = ['none', 'catEars', 'glasses', 'sailormoonCrown', 'clownNose', 'sleepMask', 'sunglasses', 'faceMask', 'mustache']
    
    # Generate random seed and select options
    random_seed = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
    selected_accessory = random.choice(accessories)
    
    return {
        'style': 'big-smile',
        'seed': random_seed,
        'backgroundColor': [random.choice(background_colors)],
        'skinColor': [random.choice(skin_colors)],
        'hair': [random.choice(hair_styles)],
        'hairColor': [random.choice(hair_colors)],
        'eyes': [random.choice(eyes)],
        'mouth': [random.choice(mouths)],
        'accessories': [selected_accessory],
        'accessoriesChance': 100 if selected_accessory != 'none' else 0
    }

def format_user_response(user):
    """Format user data for API response"""
    return {
        'id': user['id'],
        'username': user['username'],
        'email': user['email'],
        'headline': user['headline'],
        'avatar_data': user['avatar_data'],
        'pronouns': user['pronouns'],
        'is_active': user['is_active'],
        'created_at': user['created_at'].isoformat()
    }

def register_user():
    """Register a new user"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        headline = data.get('headline', '')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Check if user already exists
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        
        if existing_user:
            cursor.close()
            db.return_connection(conn)
            return jsonify({'error': 'User with this email already exists'}), 400
        
        # Generate unique username, hash password, and create default avatar
        username = generate_unique_username()
        password_hash = hash_password(password)
        default_avatar_data = generate_default_avatar()
        
        # Create user
        cursor.execute("""
            INSERT INTO users (email, password_hash, username, headline, avatar_data, pronouns, is_active, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (email, password_hash, username, headline, psycopg2.extras.Json(default_avatar_data), None, False, datetime.utcnow(), datetime.utcnow()))
        
        user = cursor.fetchone()
        conn.commit()
        cursor.close()
        db.return_connection(conn)
        
        # Generate JWT token
        token = generate_jwt_token(user['id'])
        
        return jsonify({
            'message': 'User registered successfully',
            'user': format_user_response(user),
            'token': token
        }), 201
        
    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        print(f"Registration error: {str(e)}")
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

def login_user():
    """Login user"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id, email, password_hash, username, headline, avatar_data, pronouns, is_active, created_at FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        db.return_connection(conn)
        
        if not user or not verify_password(password, user['password_hash']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Generate JWT token
        token = generate_jwt_token(user['id'])
        
        return jsonify({
            'message': 'Login successful',
            'user': format_user_response(user),
            'token': token
        }), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def get_user_profile():
    """Get user profile by token"""
    try:
        user_id, error_response, status_code = verify_jwt_token()
        if error_response:
            return error_response, status_code
        
        # Get user from database
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id, username, email, headline, avatar_data, pronouns, is_active, created_at FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': format_user_response(user)}), 200
        
    except Exception as e:
        print(f"Get profile error: {str(e)}")
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_field(field_name, data_key, success_message, error_message="An error occurred. Please try again.", transform_value=None):
    """Generic function to update any user field"""
    try:
        user_id, error_response, status_code = verify_jwt_token()
        if error_response:
            return error_response, status_code
        
        # Get new value from request
        data = request.get_json()
        value = data.get(data_key)
        
        # Transform value if needed (e.g., for JSON fields)
        if transform_value:
            value = transform_value(value)
        
        # Update user field
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute(f"""
            UPDATE users 
            SET {field_name} = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (value, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        conn.commit()
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': success_message,
            'user': format_user_response(user)
        }), 200
        
    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        print(f"Update {field_name} error: {str(e)}")
        return jsonify({'error': error_message}), 500

def update_user_headline():
    """Update user headline"""
    return update_user_field('headline', 'headline', 'Headline updated successfully')

def update_user_avatar():
    """Update user avatar data"""
    return update_user_field(
        'avatar_data', 
        'avatar_data', 
        'Avatar updated successfully',
        transform_value=lambda x: psycopg2.extras.Json(x)
    )

def update_user_pronouns():
    """Update user pronouns"""
    return update_user_field('pronouns', 'pronouns', 'Pronouns updated successfully')

def update_user_activity():
    """Update user activity status"""
    return update_user_field(
        'is_active', 
        'is_active', 
        'Activity status updated successfully',
        'Failed to update activity status.'
    )