from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
from dotenv import load_dotenv
from database import db
import psycopg2
from psycopg2.extras import RealDictCursor
from auth import register_user, login_user, get_user_profile

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

# Socket.io connection handling
@socketio.on('connect')
def handle_connect():
    print(f'User connected: {request.sid}')
    emit('status', {'message': 'Connected to Chickalo server'})

@socketio.on('disconnect')
def handle_disconnect():
    print(f'User disconnected: {request.sid}')

@socketio.on('join_room')
def handle_join_room(data):
    room = data.get('room', 'general')
    join_room(room)
    emit('status', {'message': f'Joined room: {room}'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3000))
    socketio.run(app, host='0.0.0.0', port=port, debug=True)
