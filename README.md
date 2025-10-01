# Chickalo

*An anonymous, consent-based mobile app for spontaneous social interaction in public spaces*

## Proposal Link 
https://docs.google.com/document/d/15G8fIXyQHO87AUUBRo3NkDl85nDPth-3gokQ9nyrrN0/edit?usp=sharing 

## Overview

Chickalo is a mobile application designed to bridge the gap between digital isolation and real-world social connection. In an increasingly digital world where organic spontaneous social interactions in public spaces have become rare, Chickalo facilitates anonymous, consent-based connections between individuals in shared physical spaces.

## Problem Statement

Despite the internet connecting billions globally, individuals often struggle to initiate real-world conversations with strangers. Public settings, where natural interaction opportunities arise, are instead dominated by digital isolation. Factors like social anxiety, fear of awkwardness, and safety concerns create invisible social barriers.

## Solution

Chickalo enables users to appear on an interactive map as anonymous avatars when their "activity" toggle is turned on. Within a set proximity (200-300ft), users can view other active users and interact safely and playfully in their immediate environment.

## Core Features

### MVP Features
- **User Profiles**: Account creation with email, password, customized avatar, and headline
- **Activity Toggle**: Users control when their avatar appears on the map
- **Interactive Map**: Gamified map interface showing nearby active users
- **Avatar System**: Cartoon-style avatars (like Snapchat Bitmojis) for anonymity
- **Proximity Detection**: Real-time location sharing within 200-300ft radius
- **Friend System**: Users can friend other users after mutual agreement

### Future Features (Post-MVP)
- Anonymous messaging system
- Business profiles and local advertising
- Event mode for special gatherings
- Safety and moderation tools
- Background notifications

## Tech Stack

### Frontend (Expo)
- **Expo** - Cross-platform mobile development framework
- **React Native** - Mobile app framework (via Expo)
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Screen navigation
- **Expo Location** - GPS and location services
- **Expo Maps** - Interactive map components
- **Expo SQLite** - Local database storage
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Secure token storage

### Backend (Python Flask)
- **Flask** - Python web framework
- **Flask-SocketIO** - Real-time communication
- **PostgreSQL** - Primary database
- **psycopg2** - PostgreSQL adapter
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-SQLAlchemy** - Database ORM
- **Flask-Migrate** - Database migrations
- **Python-dotenv** - Environment configuration
- **PyJWT** - JSON Web Tokens
- **bcrypt** - Password hashing
- **geopy** - Geographic calculations

### Development Tools
- **Git** - Version control
- **Python Virtual Environment** - Backend dependency isolation
- **Node.js (NVM)** - Frontend development
- **PostgreSQL** - Database server
- **Expo CLI** - Mobile development

## Project Structure

```
chickalo/
├── mobile/              # Expo app
│   ├── App.tsx         # Main app component
│   ├── index.ts        # App entry point
│   ├── app.json        # Expo configuration
│   ├── package.json    # Dependencies
│   ├── tsconfig.json   # TypeScript config
│   ├── src/
│   │   ├── screens/    # Login, Register, Map screens
│   │   ├── services/   # API calls and storage
│   │   └── components/ # Reusable components
│   └── assets/         # Images and icons
├── backend/            # Python Flask API
│   ├── src/
│   │   ├── app.py      # Flask application
│   │   ├── database.py # Database connection
│   │   ├── auth.py     # Authentication logic
│   │   ├── controllers/ # Route handlers
│   │   ├── models/     # Database models
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Custom middleware
│   │   └── utils/      # Helper functions
│   ├── database/
│   │   └── schema.sql   # Database schema
│   ├── venv/           # Python virtual environment
│   └── requirements.txt # Python dependencies
└── docs/              # Documentation
```

## Current Status

### ✅ Completed
- **Project Architecture**: Full-stack setup with Expo frontend and Flask backend
- **Database Setup**: PostgreSQL with complete schema (users, locations, friends)
- **Backend API**: Flask server with Socket.io for real-time communication
- **User Authentication**: Complete login/register system with JWT tokens
- **Frontend Foundation**: Expo app with navigation and authentication screens
- **Development Environment**: Virtual environment, dependencies, and tooling
- **Network Configuration**: Mobile app configured for local development

### 🚧 In Progress
- **Map Implementation**: Interactive map with user avatars
- **Location Services**: Real-time proximity detection
- **Activity Toggle**: Show/hide functionality on map

### 📋 Next Steps
- **Map Integration**: Add Expo Maps to show user locations
- **Location Services**: Implement GPS tracking and proximity detection
- **Real-time Updates**: Socket.io integration for live location sharing
- **Avatar System**: User avatar customization and display
- **Testing**: User testing and feedback integration

## Development Setup

### Prerequisites
- **Node.js** (v16+) - Install via NVM
- **Python 3.12+** - For backend development
- **PostgreSQL** - Database server
- **Expo CLI** - Mobile development
- **Git** - Version control

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd chickalo
```

2. **Backend Setup (Python)**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. **Database Setup**
```bash
# Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb chickalo

# Run schema
psql chickalo -f backend/database/schema.sql
```

4. **Frontend Setup (Expo)**
```bash
cd mobile
npm install
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
source venv/bin/activate
python src/app.py
```

2. **Configure network access (REQUIRED for mobile testing)**
```bash
# Find your computer's IP address
ifconfig | grep "inet " | grep -v 127.0.0.1

# Update mobile/src/services/api.ts with your IP address
# Replace the API_BASE_URL with your current IP: http://YOUR_IP:3000
```

3. **Start the mobile app**
```bash
cd mobile
npx expo start
```

4. **Test the API**
```bash
curl http://YOUR_IP:3000/health
```

## Network Configuration (Important!)

### **IP Address Changes**
Your computer's IP address may change when you:
- Reconnect to WiFi
- Switch between different networks
- Restart your computer
- Move to a different location

### **How to Update API Configuration**

1. **Find your current IP address:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

2. **Update the mobile app configuration:**
   - Open `mobile/src/services/api.ts`
   - Find the line: `const API_BASE_URL = 'http://YOUR_IP:3000';`
   - Replace `YOUR_IP` with your current IP address

3. **Test the connection:**
```bash
curl http://YOUR_IP:3000/health
```

4. **Restart the mobile app:**
```bash
cd mobile
npx expo start
```

### **Troubleshooting Network Issues**

- **"Network Error"**: Your IP address has changed - update the API_BASE_URL
- **"Connection refused"**: Backend server is not running - start it with `python src/app.py`
- **"Cannot find module"**: Clear Expo cache with `npx expo start --clear`

## Authentication System

### **Implemented Features:**
- ✅ **User Registration**: Email, password, headline, random username generation
- ✅ **User Login**: Secure authentication with JWT tokens
- ✅ **Password Security**: bcrypt hashing for password protection
- ✅ **Token Management**: JWT tokens with 7-day expiration
- ✅ **Session Persistence**: AsyncStorage for token storage
- ✅ **Database Integration**: PostgreSQL with proper transaction handling

### **API Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires JWT token)

### **Mobile Screens:**
- **LoginScreen**: Email/password login with validation
- **RegisterScreen**: Account creation with headline
- **MapScreen**: Main app interface with activity toggle
- **Navigation**: Seamless flow between screens

## Key Technical Considerations

### Location Privacy
- Store approximate locations (rounded to ~50ft accuracy)
- Implement location data expiration (auto-delete after 24hrs)
- Use relative positioning rather than exact coordinates

### Performance Optimization
- Batch location updates (every 30 seconds)
- Implement user clustering for crowded areas
- Use efficient proximity algorithms

### Real-time Updates
- WebSocket connections for live updates
- Implement connection retry logic
- Handle offline/online state changes

## Development Timeline

- **Phase 1**: ✅ Project setup and architecture
- **Phase 2**: ✅ Backend infrastructure and database
- **Phase 3**: ✅ Mobile app foundation (Expo)
- **Phase 4**: ✅ User authentication system
- **Phase 5**: 🚧 Map implementation and location services
- **Phase 6**: 📋 Core features (real-time updates, proximity detection)
- **Phase 7**: 📋 Testing and polish

## Contributing

This is a senior project for Cal Poly. For questions or contributions, please contact mfung06@calpoly.edu.

## License

[To be determined]
