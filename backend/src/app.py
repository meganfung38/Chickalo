from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from dotenv import load_dotenv
from database import db
import psycopg2
from psycopg2.extras import RealDictCursor
from auth import register_user, login_user, get_user_profile, update_user_headline, update_user_avatar, update_user_pronouns, update_user_activity, verify_jwt_token
from location import update_user_location, delete_user_location, get_nearby_active_users

load_dotenv()

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Test database connection
@app.route('/health', methods=['GET'])
def health_check():
    try:
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('SELECT NOW() as current_time')
        result = cursor.fetchone()
        cursor.close()
        db.return_connection(conn)
        
        return jsonify({
            'status': 'OK',
            'message': 'Chickalo API is running',
            'database': 'Connected',
            'timestamp': str(result['current_time'])
        })
    except Exception as error:
        return jsonify({
            'status': 'ERROR',
            'message': 'Database connection failed',
            'error': str(error)
        }), 500

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    return register_user()

@app.route('/api/auth/login', methods=['POST'])
def login():
    return login_user()

@app.route('/api/auth/profile', methods=['GET'])
def profile():
    return get_user_profile()

@app.route('/api/auth/update-headline', methods=['PUT'])
def update_headline():
    return update_user_headline()

@app.route('/api/auth/update-avatar', methods=['PUT'])
def update_avatar():
    return update_user_avatar()

@app.route('/api/auth/update-pronouns', methods=['PUT'])
def update_pronouns():
    return update_user_pronouns()

@app.route('/api/auth/update-activity', methods=['PUT'])
def update_activity():
    return update_user_activity()

# Store active user sessions (user_id -> socket_id mapping)
active_users = {}

# Socket.io connection handling
@socketio.on('connect')
def handle_connect():
    print(f'User connected: {request.sid}')
    emit('status', {'message': 'Connected to Chickalo server'})

@socketio.on('disconnect')
def handle_disconnect():
    # Remove user from active tracking on disconnect
    user_id = None
    for uid, sid in active_users.items():
        if sid == request.sid:
            user_id = uid
            break
    
    if user_id:
        del active_users[user_id]
        delete_user_location(user_id)
        print(f'User {user_id} disconnected and location removed: {request.sid}')
    else:
        print(f'User disconnected: {request.sid}')

@socketio.on('location:join')
def handle_location_join(data):
    """
    User joins location tracking (when activity toggle is enabled)
    Requires authentication token
    """
    try:
        # For Socket.io, we'll store user_id directly in session
        # Token verification happens during socket connection
        user_id = data.get('user_id')
        if not user_id:
            emit('error', {'message': 'User ID required'})
            return
        
        # Store user session
        active_users[user_id] = request.sid
        
        # Join location tracking room
        join_room('location_tracking')
        
        print(f'User {user_id} joined location tracking')
        emit('status', {'message': 'Location tracking enabled'})
        
    except Exception as e:
        print(f'Error in location:join: {str(e)}')
        emit('error', {'message': 'Failed to join location tracking'})

@socketio.on('location:leave')
def handle_location_leave(data):
    """
    User leaves location tracking (when activity toggle is disabled)
    Removes location from database for privacy
    """
    try:
        user_id = data.get('user_id')
        if not user_id:
            emit('error', {'message': 'User ID required'})
            return
        
        # Remove from active users
        if user_id in active_users:
            del active_users[user_id]
        
        # Leave location tracking room
        leave_room('location_tracking')
        
        # Delete location from database (privacy)
        delete_user_location(user_id)
        
        print(f'User {user_id} left location tracking')
        emit('status', {'message': 'Location tracking disabled'})
        
    except Exception as e:
        print(f'Error in location:leave: {str(e)}')
        emit('error', {'message': 'Failed to leave location tracking'})

@socketio.on('location:update')
def handle_location_update(data):
    """
    Receive location update from user
    Store in database and broadcast to nearby users
    """
    try:
        user_id = data.get('user_id')
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        
        if not all([user_id, latitude is not None, longitude is not None]):
            emit('error', {'message': 'Missing required data'})
            return
        
        # Update user location in database
        success = update_user_location(user_id, latitude, longitude)
        
        if not success:
            # User is not active, don't store location
            emit('location:nearby-users', [])
            return
        
        # Get nearby active users
        nearby_users = get_nearby_active_users(user_id, latitude, longitude)
        
        # Send nearby users back to the requester
        emit('location:nearby-users', nearby_users)
        
        print(f'Location updated for user {user_id}: ({latitude}, {longitude}), nearby users: {len(nearby_users)}')
        
    except Exception as e:
        print(f'Error in location:update: {str(e)}')
        emit('error', {'message': 'Failed to update location'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    socketio.run(app, host='0.0.0.0', port=port, debug=True)
