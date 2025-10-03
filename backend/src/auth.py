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
        
        # Generate unique username and hash password
        username = generate_unique_username()
        password_hash = hash_password(password)
        
        # Generate completely random avatar for new user
        import random
        import string
        random_seed = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        
        # Random avatar options based on DiceBear Big Smile schema
        background_colors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'c7f9cc', 'fff2cc', 'fca5a5', '5eead4']
        skin_colors = ['ffe4c0', 'f5d7b1', 'efcc9f', 'e2ba87', 'c99c62', 'a47539', '8c5a2b', '643d19']
        hair_styles = ['shortHair', 'mohawk', 'wavyBob', 'bowlCutHair', 'curlyBob', 'straightHair', 'braids', 'shavedHead', 'bunHair', 'froBun', 'bangs', 'halfShavedHead', 'curlyShortHair']
        hair_colors = ['220f00', '3a1a00', '71472d', 'e2ba87', '605de4', '238d80', 'd56c0c', 'e9b729']
        eyes = ['cheery', 'normal', 'confused', 'starstruck', 'winking', 'sleepy', 'sad', 'angry']
        mouths = ['openedSmile', 'unimpressed', 'gapSmile', 'openSad', 'teethSmile', 'awkwardSmile', 'braces', 'kawaii']
        accessories = ['none', 'catEars', 'glasses', 'sailormoonCrown', 'clownNose', 'sleepMask', 'sunglasses', 'faceMask', 'mustache']
        
        # Randomly select options for the new user's avatar
        selected_accessory = random.choice(accessories)
        default_avatar_data = {
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
        
        # Create user
        cursor.execute("""
            INSERT INTO users (email, password_hash, username, headline, avatar_data, pronouns, is_active, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (email, password_hash, username, headline, psycopg2.extras.Json(default_avatar_data), None, False, datetime.utcnow(), datetime.utcnow()))
        
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
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            },
            'token': token
        }), 201
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Registration error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

def update_user_pronouns():
    """Update user pronouns"""
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
        
        # Get new pronouns from request
        data = request.get_json()
        pronouns = data.get('pronouns', None)
        
        # Update user pronouns
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET pronouns = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (pronouns, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Pronouns updated successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

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
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            },
            'token': token
        }), 200
        
    except Exception as e:
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_pronouns():
    """Update user pronouns"""
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
        
        # Get new pronouns from request
        data = request.get_json()
        pronouns = data.get('pronouns', None)
        
        # Update user pronouns
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET pronouns = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (pronouns, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Pronouns updated successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

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
        cursor.execute("SELECT id, username, email, headline, avatar_data, pronouns, is_active, created_at FROM users WHERE id = %s", (user_id,))
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
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_pronouns():
    """Update user pronouns"""
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
        
        # Get new pronouns from request
        data = request.get_json()
        pronouns = data.get('pronouns', None)
        
        # Update user pronouns
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET pronouns = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (pronouns, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Pronouns updated successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_headline():
    """Update user headline"""
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
        
        # Get new headline from request
        data = request.get_json()
        headline = data.get('headline', '')
        
        # Update user headline
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET headline = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, is_active, created_at
        """, (headline, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Headline updated successfully',
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
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_pronouns():
    """Update user pronouns"""
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
        
        # Get new pronouns from request
        data = request.get_json()
        pronouns = data.get('pronouns', None)
        
        # Update user pronouns
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET pronouns = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (pronouns, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Pronouns updated successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_avatar():
    """Update user avatar data"""
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
        
        # Get avatar data from request
        data = request.get_json()
        avatar_data = data.get('avatar_data', {})
        
        # Update user avatar
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET avatar_data = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, is_active, created_at
        """, (psycopg2.extras.Json(avatar_data), datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Avatar updated successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'avatar_data': user['avatar_data'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500

def update_user_pronouns():
    """Update user pronouns"""
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
        
        # Get new pronouns from request
        data = request.get_json()
        pronouns = data.get('pronouns', None)
        
        # Update user pronouns
        conn = db.get_connection()
        cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("""
            UPDATE users 
            SET pronouns = %s, updated_at = %s 
            WHERE id = %s
            RETURNING id, username, email, headline, avatar_data, pronouns, is_active, created_at
        """, (pronouns, datetime.utcnow(), user_id))
        
        user = cursor.fetchone()
        
        # COMMIT THE TRANSACTION
        conn.commit()
        
        cursor.close()
        db.return_connection(conn)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Pronouns updated successfully',
            'user': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'headline': user['headline'],
                'avatar_data': user['avatar_data'],
                'pronouns': user['pronouns'],
                'is_active': user['is_active'],
                'created_at': user['created_at'].isoformat()
            }
        }), 200
        
    except Exception as e:
        # ROLLBACK ON ERROR
        if 'conn' in locals():
            conn.rollback()
        # Log the actual error for debugging
        print(f"Error: {str(e)}")
        # Return generic error message to user
        return jsonify({'error': 'An error occurred. Please try again.'}), 500
