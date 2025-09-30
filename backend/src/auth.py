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
    adjectives = ['Jade', 'Stone', 'Gecko', 'Crystal', 'Moon', 'Star', 'River', 'Forest', 'Ocean', 'Mountain']
    nouns = ['Dragon', 'Phoenix', 'Tiger', 'Wolf', 'Eagle', 'Lion', 'Bear', 'Fox', 'Hawk', 'Shark']
    number = ''.join(secrets.choice(string.digits) for _ in range(2))
    return f"{secrets.choice(adjectives)}{secrets.choice(nouns)}{number}"

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
        
        # Generate username and hash password
        username = generate_username()
        password_hash = hash_password(password)
        
        # Create user
        cursor.execute("""
            INSERT INTO users (email, password_hash, username, headline, is_active, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, username, email, headline, is_active, created_at
        """, (email, password_hash, username, headline, False, datetime.utcnow(), datetime.utcnow()))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        # Generate JWT token
        token = generate_jwt_token(user['id'])
        
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'is_active': user['is_active']
            },
            'token': token
        }), 201
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        return jsonify({'error': str(e)}), 500

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
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Verify password
        if not verify_password(password, user['password_hash']):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Generate JWT token
        token = generate_jwt_token(user['id'])
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'is_active': user['is_active']
            },
            'token': token
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_user_profile():
    """Get user profile by token"""
    try:
        # Get token from header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'No token provided'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Decode token
        try:
            payload = jwt.decode(token, 'your-super-secret-jwt-key-change-this-in-production', algorithms=['HS256'])
            user_id = payload['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Get user from database
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT id, username, email, headline, is_active, created_at FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
