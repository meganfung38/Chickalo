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

### ✅ Implemented Features
- **Complete User Authentication System**: Registration, login, JWT tokens, session persistence
- **User Profile Management**: Account creation with email, password, customizable avatars, headlines, and pronouns
- **Activity Toggle**: Users control when their avatar appears on the map via switch component
- **Interactive Map Interface**: Basic HTML map with WebView integration for location display
- **Advanced Avatar Customization**: DiceBear Big Smile avatars with 7 customization categories
- **Settings Management**: Complete profile editing with real-time state updates
- **Dynamic Theme System**: Consistent color theming with activity-based header colors
- **Modern UI Components**: Floating navigation bar, themed buttons, responsive design
- **Database Integration**: PostgreSQL with proper transactions and error handling
- **Real-time Communication**: Socket.io setup for future live features

### 🚧 In Progress
- **Location Services**: GPS tracking and proximity detection implementation
- **Real-time Map Updates**: Live user positioning and avatar display on map

### 📋 Future Features (Post-MVP)
- Anonymous messaging system
- Business profiles and local advertising
- Event mode for special gatherings
- Safety and moderation tools
- Background notifications
- Friend system with mutual connections

## Tech Stack

### Frontend (Expo/React Native)
- **Expo** - Cross-platform mobile development framework
- **React Native** - Mobile app framework (via Expo)
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Screen navigation
- **Expo Location** - GPS and location services
- **React Native WebView** - HTML map integration
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Secure token storage
- **React Native SVG** - SVG rendering for avatars
- **DiceBear Avatars** - Avatar generation library

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
├── mobile/              # Expo React Native app
│   ├── App.tsx         # Main app component with navigation
│   ├── package.json    # Dependencies including DiceBear
│   ├── src/
│   │   ├── screens/    # Login, Register, Map, Settings screens
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── MapScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── services/   # API calls and storage
│   │   │   └── api.ts  # Axios configuration and auth API
│   │   └── components/ # Reusable UI components
│   │       ├── DiceBearAvatar.tsx  # Avatar rendering
│   │       ├── Header.tsx          # Dynamic themed header
│   │       └── BottomNavigation.tsx # Floating navigation bar
├── backend/            # Python Flask API
│   ├── src/
│   │   ├── app.py      # Flask application with Socket.io
│   │   ├── database.py # PostgreSQL connection pool
│   │   └── auth.py     # Authentication and user management
│   ├── database/
│   │   └── schema.sql  # Complete database schema
│   ├── venv/           # Python virtual environment
│   └── requirements.txt # Python dependencies
└── README.md          # This file
```

## Current Status

### ✅ Completed (MVP Ready)
- **Full-Stack Architecture**: Expo frontend + Flask backend + PostgreSQL
- **User Authentication**: Complete registration/login system with JWT tokens
- **User Profile System**: Account creation, unique username generation, profile management
- **Avatar System**: Advanced DiceBear integration with 7 customization categories:
  - Background colors (9 options)
  - Skin colors (8 realistic tones)
  - Hair styles (13 styles: mohawk, braids, bun, etc.)
  - Hair colors (8 colors including natural and fun colors)
  - Eyes (8 expressions: cheery, confused, starstruck, etc.)
  - Mouth (8 expressions: smile variations, braces, kawaii)
  - Accessories (9 options including none: glasses, cat ears, etc.)
- **Settings Interface**: Complete profile editing with:
  - Headline editing and saving
  - Pronouns selection (dropdown with 8 common options)
  - Avatar customization (slideshow interface)
  - Real-time state management across screens
- **Map Interface**: Basic interactive map with activity toggle
- **Modern UI Design**: 
  - Dynamic header colors (green when active, orange when inactive)
  - Floating navigation bar with app logo, activity toggle, and user avatar
  - Consistent theme colors throughout app (#cc4e00 primary, #457a00 secondary)
  - Clean white backgrounds with themed accent colors
- **Database Schema**: Complete with users, user_locations, friends tables
- **Error Handling**: Secure error messages (no backend details exposed)
- **Network Configuration**: Mobile app configured for local development

### 🚧 Next Phase
- **Location Services**: Implement GPS tracking and proximity detection
- **Real-time Map**: Show live user avatars on map within 200-300ft radius
- **Socket.io Integration**: Real-time location updates between users

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

# Run schema (includes pronouns field)
psql chickalo -f backend/database/schema.sql
```

4. **Frontend Setup (Expo)**
```bash
cd mobile
npm install  # Includes DiceBear and SVG packages
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

## Authentication & User System

### **Implemented Features:**
- ✅ **User Registration**: Email, password, headline, random username generation
- ✅ **User Login**: Secure authentication with JWT tokens
- ✅ **Password Security**: bcrypt hashing for password protection
- ✅ **Token Management**: JWT tokens with 7-day expiration
- ✅ **Session Persistence**: AsyncStorage for token storage
- ✅ **Database Integration**: PostgreSQL with proper transaction handling
- ✅ **Profile Management**: Headlines, pronouns, avatar customization
- ✅ **Real-time State Updates**: Changes reflect across all screens immediately

### **API Endpoints:**
- `POST /api/auth/register` - User registration with random avatar
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires JWT token)
- `PUT /api/auth/update-headline` - Update user headline
- `PUT /api/auth/update-pronouns` - Update user pronouns
- `PUT /api/auth/update-avatar` - Update avatar customization

### **Mobile Screens:**
- **LoginScreen**: Email/password login with validation and themed buttons
- **RegisterScreen**: Account creation with headline and themed buttons
- **MapScreen**: Main app interface with dynamic header, floating navigation, and activity toggle
- **SettingsScreen**: Complete profile management with avatar customization and themed UI

## Database Schema

### **Users Table**
- `id` (SERIAL PRIMARY KEY) - Unique user identifier
- `email` (VARCHAR UNIQUE) - User email address
- `password_hash` (VARCHAR) - bcrypt hashed password
- `username` (VARCHAR UNIQUE) - Auto-generated unique username
- `avatar_data` (JSONB) - Complete DiceBear avatar settings
- `headline` (TEXT) - User's custom headline/bio
- `pronouns` (VARCHAR, nullable) - User's pronouns (optional)
- `is_active` (BOOLEAN) - Activity toggle state
- `created_at` (TIMESTAMP) - Account creation date
- `updated_at` (TIMESTAMP) - Last profile update

### **User Locations Table**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER) - Foreign key to users
- `latitude` (DECIMAL) - GPS latitude
- `longitude` (DECIMAL) - GPS longitude
- `last_updated` (TIMESTAMP) - Location update time

### **Friends Table**
- `id` (SERIAL PRIMARY KEY)
- `user1_id` (INTEGER) - First user
- `user2_id` (INTEGER) - Second user
- `status` (VARCHAR) - Friendship status
- `created_at` (TIMESTAMP) - Friendship creation date

## Theme System

### **Dynamic Color Theming**
- **Primary Color**: `#cc4e00` (Orange) - Main buttons, inactive header, primary actions
- **Secondary Color**: `#457a00` (Green) - Active states, activity indicators, active header
- **Background**: `white` - Clean, consistent backgrounds throughout app
- **Text**: `white` on colored backgrounds, `#333` on white backgrounds

### **Dynamic Header**
- **Active State**: Header turns green (`#457a00`) when user is visible on map
- **Inactive State**: Header turns orange (`#cc4e00`) when user is hidden from map
- **Real-time Updates**: Color changes instantly when activity toggle is switched

### **UI Components**
- **Floating Navigation**: Transparent background with themed button highlights
- **Themed Buttons**: All action buttons use consistent color scheme
- **Activity Indicators**: Visual feedback for user's current visibility status

## Avatar System

### **DiceBear Big Smile Integration**
- **Library**: `@dicebear/collection` and `@dicebear/core`
- **Style**: Big Smile (cartoon-style avatars)
- **Rendering**: React Native SVG for smooth performance
- **Customization**: 7 categories with 50+ total options
- **Storage**: Complete avatar settings saved as JSONB in database
- **Default**: New users get randomized avatars on registration

### **Customization Categories**
1. **Background**: 9 color options
2. **Skin Color**: 8 realistic skin tones
3. **Hair Style**: 13 styles (short, mohawk, braids, bun, etc.)
4. **Hair Color**: 8 colors (natural and fun colors)
5. **Eyes**: 8 expressions (cheery, normal, confused, etc.)
6. **Mouth**: 8 expressions (smiles, braces, kawaii, etc.)
7. **Accessories**: 9 options including none (glasses, cat ears, etc.)

### **User Experience**
- **Slideshow Interface**: Swipe through customization categories
- **Real-time Preview**: Avatar updates instantly as options are selected
- **Randomize Feature**: Generate completely new random avatars
- **Database Persistence**: All customizations saved and synced across devices

## Key Technical Considerations

### Security & Privacy
- **Password Security**: bcrypt hashing with salt
- **Token Security**: JWT with expiration and secure storage
- **Error Handling**: Generic error messages (no backend details exposed)
- **Data Validation**: Input validation on both frontend and backend
- **Optional Data**: Pronouns and other personal info are optional

### Performance Optimization
- **Avatar Rendering**: useMemo hooks for efficient re-rendering
- **Database**: Connection pooling and proper transaction handling
- **State Management**: Optimized React state updates
- **Network**: Axios with proper error handling and timeouts

### Real-time Architecture
- **Socket.io**: Setup for future real-time features
- **WebSocket**: Connection handling and retry logic
- **State Sync**: Real-time updates across all app screens

## Development Timeline

- **Phase 1**: ✅ Project setup and architecture
- **Phase 2**: ✅ Backend infrastructure and database
- **Phase 3**: ✅ Mobile app foundation (Expo)
- **Phase 4**: ✅ User authentication system
- **Phase 5**: ✅ Avatar system and profile management
- **Phase 6**: ✅ Settings interface and state management
- **Phase 7**: 🚧 Location services and real-time map
- **Phase 8**: 📋 Testing and polish

## Testing the Current Build

### **Registration Flow**
1. Open app → Register with email/password/headline
2. Receive random avatar and unique username
3. Navigate to map screen with activity toggle

### **Profile Management**
1. Navigate to Settings from floating navigation bar (tap user avatar)
2. Edit headline → Save → See changes reflect immediately
3. Select pronouns from dropdown → Save
4. Customize avatar through slideshow interface
5. All changes persist in database and sync across screens
6. Notice dynamic header color changes based on activity status

### **Avatar Customization**
1. Open Settings → Tap "Customize Avatar"
2. Swipe through 7 categories of options
3. See real-time preview of changes
4. Use randomize button for new avatars
5. Save changes → Avatar updates everywhere

### **UI/UX Features**
1. Toggle activity status → Watch header color change dynamically
2. Navigate between screens using floating navigation bar
3. Experience consistent theme colors throughout app
4. All buttons and UI elements follow the orange/green color scheme

## Contributing

This is a senior project for Cal Poly. For questions or contributions, please contact mfung06@calpoly.edu.

## License

[To be determined]