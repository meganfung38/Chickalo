# Chickalo

*An anonymous, consent-based mobile app for spontaneous social interaction in public spaces*

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

### Frontend
- **React Native** - Cross-platform mobile development
- **React Navigation** - Navigation between screens
- **Redux/Context API** - State management
- **React Native Maps** - Map integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **PostgreSQL** - Primary database
- **PostGIS** - Geographic data extension

### Authentication & Security
- **Firebase Auth** - User authentication
- **JWT** - Token-based authentication

### Maps & Location
- **Google Maps API** - Map rendering and geocoding
- **React Native Maps** - Mobile map integration

### Development Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Jest** - Testing framework

## Project Structure

```
chickalo/
├── mobile/              # React Native app
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── screens/     # App screens
│   │   ├── navigation/  # Navigation setup
│   │   ├── services/    # API calls
│   │   └── utils/       # Helper functions
│   └── package.json
├── backend/             # Node.js API
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Custom middleware
│   │   └── utils/       # Helper functions
│   └── package.json
├── database/            # Database schemas and migrations
└── docs/               # Documentation
```

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- PostgreSQL
- Android Studio / Xcode (for mobile development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd chickalo
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install mobile dependencies
```bash
cd ../mobile
npm install
```

4. Set up environment variables
```bash
# Backend .env
DATABASE_URL=postgresql://username:password@localhost:5432/chickalo
JWT_SECRET=your-secret-key
GOOGLE_MAPS_API_KEY=your-api-key

# Mobile .env
API_BASE_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your-api-key
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the mobile app
```bash
cd mobile
npx react-native run-android  # or run-ios
```

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

- **Phase 1**: Project setup and architecture
- **Phase 2**: Backend infrastructure
- **Phase 3**: Mobile app foundation
- **Phase 4**: Map implementation
- **Phase 5**: Core features
- **Phase 6**: Testing and polish

## Contributing

This is a senior project for Cal Poly. For questions or contributions, please contact the project maintainer.

## License

[To be determined]
