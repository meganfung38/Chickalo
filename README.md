# Chickalo

> *A location-based mobile app for spontaneous, consent-driven social connections in public spaces*

[![Tech Stack](https://img.shields.io/badge/Stack-React_Native_+_Flask_+_PostgreSQL-blue)]()
[![Status](https://img.shields.io/badge/Status-Active_Development-green)]()


**[Demo Recordings](https://drive.google.com/drive/folders/1gJCFfIW81ThgoIUujnJcwPUEaK-cnli_?usp=sharing)**

**[Demo #2](docs-and-resources/DEMO.MOV)**

**[Proposal](https://docs.google.com/document/d/15G8fIXyQHO87AUUBRo3NkDl85nDPth-3gokQ9nyrrN0/edit?usp=sharing)**

---

## Overview

Chickalo enables anonymous, proximity-based social interaction by displaying users as customizable avatars on an interactive map. When users toggle their "activity" status ON, their avatar appears to nearby users within ~250 feet, facilitating safe, playful real-world connections.

### Problem
Despite living in a connected world, spontaneous real-world interactions are rare. Social anxiety, safety concerns, and digital isolation create barriers to organic connections in public spaces.

### Solution
Chickalo provides a low-stakes, gamified way to signal openness to interaction while maintaining anonymity and control through an activity toggle.

---

## Features

### Implemented
- **Authentication**: Secure registration/login with JWT tokens, session persistence
- **Profile Management**: Customizable avatars (DiceBear), headlines, pronouns
- **Activity Toggle**: Control visibility on map (active = visible, inactive = hidden)
- **Real-time Map**: Mapbox integration with 3D buildings, GPS tracking, live location updates
- **Tracking**: Continuous location updates (1-second GPS polling, smooth avatar movement)
- **Smart Location Broadcasting**: Debounced network emissions (5m threshold or 2s intervals) to optimize performance
- **Multi-User Real-Time**: Bidirectional Socket.io broadcasting, users see each other instantly when nearby
- **Production Server**: Gunicorn + eventlet for stable WebSocket connections
- **Avatar System**: 7 customization categories (hair, eyes, accessories, etc.) with randomization
- **Settings Interface**: Edit profile, randomize avatar, save preferences
- **Modern UI**: Dynamic theme colors (green/orange), floating navigation, responsive design
- **Speech Bubbles**: Headlines displayed above avatars on map with matching colors
- **Activity-Synced Borders**: Avatar borders change color based on activity status (green = active, orange = inactive)
- **User Interaction**: Tap avatars to view profiles (username, headline, pronouns); tap own avatar to navigate to settings

### Future (Post-MVP)
- Anonymous messaging between nearby users
- Friend system with mutual connections
- Safety reporting and moderation tools
- Business profiles for local advertising

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React Native, Expo, TypeScript, Mapbox (@rnmapbox/maps) |
| **Backend** | Python, Flask, Flask-SocketIO, Gunicorn + eventlet |
| **Database** | PostgreSQL (connection pooling, JSONB for avatar data) |
| **Real-time** | Socket.io (bidirectional broadcasting, room-based updates) |
| **Location** | expo-location (GPS), Haversine distance calculations |
| **Auth** | JWT tokens, bcrypt password hashing |
| **Development** | Xcode (iOS builds), Expo Dev Client |

---

## Project Structure

```
Chickalo/
├── mobile/                      # React Native app
│   ├── App.tsx                 # Main app with global state management
│   ├── src/
│   │   ├── screens/            # Full-screen components
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   ├── MapScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── BottomNavigation.tsx
│   │   │   ├── AvatarMarker.tsx          # Map marker with speech bubble (tappable)
│   │   │   ├── UserInfoModal.tsx         # User profile modal
│   │   │   ├── DiceBearAvatar.tsx
│   │   │   ├── GrayscaleAvatar.tsx       # Inactive avatar rendering
│   │   │   └── ActivityBorderedAvatar.tsx # Avatar with activity-synced border
│   │   ├── services/           # External service integrations
│   │   │   ├── api.ts          # REST API client
│   │   │   └── socket.ts       # Socket.io client for real-time updates
│   │   ├── utils/              # Helper functions
│   │   │   ├── validation.ts   # Form validation utilities
│   │   │   └── location.ts     # GPS, Haversine distance calculations
│   │   ├── types/              # TypeScript interfaces (centralized)
│   │   │   └── index.ts
│   │   ├── styles/             # Single unified stylesheet
│   │   │   └── index.ts        # Theme constants (COLORS, TYPOGRAPHY, SPACING)
│   │   ├── constants/          # App-wide constants
│   │   │   ├── avatar.ts       # Avatar customization options
│   │   │   └── mapStyle.ts     # Map configuration
│   │   └── config/             # Environment configuration
│   │       └── mapbox.ts       # Mapbox access token & style URL
│   ├── app.config.js           # Expo config with Mapbox plugin
│   ├── package.json
│   └── assets/                 # Images, fonts
│       └── Chickalo_LOGO.png
│
├── backend/                     # Flask API
│   ├── src/
│   │   ├── app.py              # Flask routes + Socket.io event handlers
│   │   ├── auth.py             # User authentication, profile updates (JWT)
│   │   ├── location.py         # GPS storage, proximity calculations (Haversine)
│   │   └── database.py         # PostgreSQL connection pooling
│   ├── database/
│   │   └── schema.sql          # Database schema (users, user_locations, friends)
│   ├── requirements.txt        # Python dependencies
│   └── venv/                   # Virtual environment (not in git)
│
└── README.md                    # This file
```

---

## Quick Start

### Prerequisites
- **Node.js** (v16+), **Python 3.12+**, **PostgreSQL**, **Xcode** (for iOS)
- Apple Developer account (free personal team for device testing)

### 1. Database Setup
```bash
brew install postgresql
brew services start postgresql
createdb chickalo
psql chickalo -f backend/database/schema.sql
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# For production/multi-user (recommended):
cd src
gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:3000 app:app

# For single-user dev:
# cd backend && python src/app.py
```

### 3. Frontend Setup
```bash
cd mobile
npm install

# Update API URL with your IP address
# In mobile/src/services/api.ts:
# const API_BASE_URL = 'http://YOUR_IP:3000';

# Update Socket URL with your IP address
# In mobile/src/services/socket.ts:
# const SOCKET_URL = 'http://YOUR_IP:3000';
```

### 4. Mapbox Configuration
1. Create account at [Mapbox](https://mapbox.com)
2. Get access token (public scope)
3. Update `mobile/src/config/mapbox.ts`:
   ```typescript
   export const MAPBOX_ACCESS_TOKEN = 'your_token_here';
   ```

### 5. Run the App
```bash
# Terminal 1: Backend
cd backend/src && source ../venv/bin/activate
gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:3000 app:app

# Terminal 2: Frontend (iOS device)
cd mobile && npx expo run:ios --device
```

> **📱 For detailed setup instructions, troubleshooting, and different scenarios (fresh build, certificate expired, quick start), see [DEVELOPMENT_SETUP.md](./DEVELOPMENT_SETUP.md)**

---

## How It Works

### User Flow
1. **Register/Login** → Create account with email/password
2. **Customize Avatar** → DiceBear avatars with 7 categories (hair, eyes, accessories)
3. **Toggle Activity** → Turn ON to appear on map, OFF to hide
4. **View Map** → See nearby active users within ~250 feet
5. **Tap Avatars** → View other users' profiles (username, headline, pronouns)
6. **Update Profile** → Edit headline, pronouns, avatar in Settings

### Location & Privacy
- **GPS Tracking**: Only when activity is ON, continuous 1-second polling
- **Proximity**: Users see others within ~250 feet (Haversine distance)
- **Privacy**: Inactive users are NOT visible, locations deleted when toggled OFF
- **Real-time**: Bidirectional Socket.io broadcasting with room-based updates
- **Smart Updates**: Location emitted when moved 5+ meters or after 2 seconds of small movements

### Avatar System
- **7 Customization Categories**: Background, skin, hair style, hair color, eyes, mouth, accessories
- **50+ Options**: Mix and match for unique avatars
- **Storage**: Complete settings saved as JSONB in PostgreSQL
- **Grayscale**: Inactive users see their avatar grayed out (opacity 0.4)

---

## App Screens

| Screen | Purpose |
|--------|---------|
| **LoginScreen** | Email/password authentication |
| **RegisterScreen** | Account creation with validation (email format, password min 6 chars) |
| **MapScreen** | Mapbox map with user's avatar + nearby active users |
| **SettingsScreen** | Profile editing, avatar customization, logout |

### UI Components
- **Header**: Displays "Welcome {username}", dynamic background color (green = active, orange = inactive)
- **BottomNavigation**: Floating nav bar with Chickalo logo, activity toggle (●/○ icons), settings button (user's avatar)
- **AvatarMarker**: Tappable Mapbox marker with speech bubble headline, activity-synced border colors
- **UserInfoModal**: Modal displaying user profile (avatar, username, headline, pronouns) with exit button
- **ActivityBorderedAvatar**: Reusable avatar component with dynamic border (green when active, orange when inactive)
- **DiceBearAvatar**: Renders customizable avatars from DiceBear Big Smile collection
- **GrayscaleAvatar**: Displays inactive avatars with reduced opacity

---

## Database Schema

### `users`
- `id`, `email` (unique), `password_hash`, `username` (unique)
- `avatar_data` (JSONB), `headline`, `pronouns`, `is_active` (boolean)
- `created_at`, `updated_at`

### `user_locations`
- `id`, `user_id` (FK to users, unique constraint), `latitude`, `longitude`, `last_updated`
- **ON DELETE CASCADE**: Location deleted when user is deleted
- **UNIQUE(user_id)**: One location per user

### `friends` (future)
- `id`, `user1_id`, `user2_id`, `status`, `created_at`

### Indexes
- `idx_user_locations_user_id`, `idx_users_active` for performance

---

## Security & Validation

### Authentication
- **Passwords**: bcrypt hashing with salt
- **Tokens**: JWT with 7-day expiration
- **Storage**: AsyncStorage for secure token persistence

### Validation
- **Frontend**: Real-time form validation (email regex, password min 6 chars, password matching)
- **Backend**: Server-side validation, generic error messages (no internal details exposed)
- **Database**: Unique constraints (email, username), foreign key integrity

### Privacy
- **Activity Control**: Users choose when to be visible
- **Location Privacy**: GPS only tracked when active, deleted when inactive
- **Anonymity**: Only avatar and headline visible to others

---

## Architecture 

### State Management
- **Global State**: `App.tsx` manages `user`, `token`, `isActive`, `currentScreen`
- **Props Drilling**: Avoided by lifting shared state to common parent
- **Real-time Sync**: Socket.io updates propagate through state callbacks

### Performance
- **Connection Pooling**: PostgreSQL connections managed efficiently with `psycopg2.pool`
- **Production WebSockets**: Gunicorn + eventlet for stable multi-user connections
- **Debounced Updates**: Location updates throttled (5m threshold or 2s intervals) to reduce server load
- **Room-Based Broadcasting**: Socket.io rooms for targeted nearby user updates
- **Smart GPS Polling**: 1-second continuous tracking with intelligent network emission

---

## Testing

### Registration Flow
1. Open app → Create Account
2. Enter email (validated), password (min 6 chars), confirm password
3. Optional headline → Button enables when valid → Random avatar assigned

### Map Flow
1. Login → Navigate to map
2. Toggle activity ON → Avatar appears on map (colored)
3. Toggle activity OFF → Avatar turns grayscale, location hidden from others
4. Tap other users' avatars → View their profile in modal
5. Tap own avatar → Navigate to Settings screen

### Profile Management
1. Navigate to Settings (tap avatar in nav bar)
2. Edit headline/pronouns → Save → Changes reflect immediately
3. Customize Avatar → Randomize or select options → Save

---

## Development Status

**Phase**: Active Development (MVP Complete + Multi-User Testing)  
**Next Steps**: Performance optimization, messaging system, safety features

**Contact**: mfung06@calpoly.edu  
**Institution**: Cal Poly San Luis Obispo (Senior Project)

---

