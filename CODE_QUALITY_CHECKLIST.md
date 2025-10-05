# 🧹 Code Quality Checklist for Chickalo

## ✅ **Standards to Maintain ALWAYS**

This document ensures we maintain clean, maintainable, and professional code throughout development.

---

## 📑 **Table of Contents**

| Section | Purpose | When to Use |
|---------|---------|-------------|
| 1. [File Organization](#️-file-organization-standards) | Project structure overview | **START HERE** - Understanding the codebase |
| 2. [Pre-Commit Checklist](#-before-any-commit---checklist) | 10-point quick checklist | Before every commit |
| 3. [Frontend Standards](#️-frontend-specific-standards) | React Native/TypeScript rules | Writing frontend code |
| 4. [Backend Standards](#-backend-specific-standards) | Python/Flask/Database rules | Writing backend code |
| 5. [Code Review](#-code-review-checklist) | 42-point comprehensive audit | During code review |
| 6. [Anti-Patterns](#-common-anti-patterns-to-avoid) | What NOT to do | When in doubt |
| 7. [Principles](#-principles-we-follow) | DRY, KISS, SRP, YAGNI | Design decisions |
| 8. [Metrics](#-metrics-to-track) | Quality indicators | Regular audits |
| 9. [Quick Commands](#️-quick-commands) | Terminal checks | Finding issues |
| 10. [Current Status](#-current-status-clean) | Baseline state | Comparing progress |

---

## 🚀 **Quick Reference** (For AI Assistants)

**New to the project? Start with PART 1 (File Organization)** 📁

**When writing frontend code (see PART 3 for details):**
- ✅ Styles → `mobile/src/styles/index.ts` (NO local StyleSheets)
- ✅ Types → `mobile/src/types/index.ts` (NO inline prop types)
- ✅ API calls → `mobile/src/services/` (NOT in components)
- ✅ State management → Lift shared state to App.tsx
- ✅ Effects → Always cleanup subscriptions/timers
- ✅ Handlers → Prefix with `handle`, use try/catch

**When writing backend code (see PART 4 for details):**
- ✅ Use `db.get_connection()` + `db.return_connection(conn)`
- ✅ Parameterized queries ONLY (never f-strings in SQL)
- ✅ Generic user errors, detailed server logs
- ✅ Update `database/schema.sql` for schema changes
- ✅ Type hints on all functions
- ✅ Transactions for multi-step operations

**Before any commit (see PART 2):**
- ❌ No local StyleSheets (frontend)
- ❌ No duplicate code (both)
- ❌ No SQL injection risks (backend)
- ❌ No exposed internal errors (backend)
- ❌ No API calls in components (frontend)

---

---

# 📁 **PART 1: PROJECT STRUCTURE**

---

## 🗂️ **File Organization Standards**

### **Frontend Structure:**
```
mobile/src/
├── components/       # Reusable UI components
├── screens/          # Screen-level components
├── services/         # API, Socket.io, Storage
├── utils/            # Pure utility functions
├── types/            # TypeScript interfaces
├── styles/           # SINGLE stylesheet file
├── constants/        # App-wide constants
└── config/           # Configuration (tokens, URLs)
```

### **Backend Structure:**
```
backend/
├── src/
│   ├── app.py           # Flask routes & Socket.io handlers
│   ├── auth.py          # Authentication logic
│   ├── location.py      # Location utilities
│   └── database.py      # DB connection pooling
├── database/
│   └── schema.sql       # Database schema (single source)
└── requirements.txt     # Python dependencies
```

---

---

# 📋 **PART 2: PRE-COMMIT CHECKLIST**

---

## 📋 **Before Any Commit - Checklist:**

### **1. No Local StyleSheets** ❌
- [ ] **Check**: No `StyleSheet.create()` in component files
- [ ] **Rule**: ALL styles must be in `mobile/src/styles/index.ts`
- [ ] **Why**: Single source of truth for styling, easy to update themes

**Bad:**
```typescript
// ❌ DON'T DO THIS in component files
const localStyles = StyleSheet.create({
  container: { padding: 20 },
});
```

**Good:**
```typescript
// ✅ DO THIS - use centralized styles
import { styles } from '../styles';
// Then use: style={styles.container}
```

---

### **2. No Duplicate Code** ❌
- [ ] **Check**: No repeated logic across files
- [ ] **Rule**: Extract common functionality into utilities
- [ ] **Why**: DRY principle - change once, apply everywhere

**Bad:**
```typescript
// ❌ Same validation logic in multiple files
if (!email.trim() || !password.trim()) { /* ... */ }
```

**Good:**
```typescript
// ✅ Centralized validation
import { validateRegistrationForm } from '../utils/validation';
const { isValid, error } = validateRegistrationForm(email, password);
```

---

### **3. Centralized Types** 📦
- [ ] **Check**: No local interfaces in component files
- [ ] **Rule**: ALL TypeScript interfaces in `mobile/src/types/index.ts`
- [ ] **Why**: Consistency, reusability, type safety

**Bad:**
```typescript
// ❌ Local interface in component
interface User {
  id: number;
  name: string;
}
```

**Good:**
```typescript
// ✅ Import from centralized types
import { User } from '../types';
```

---

### **4. Centralized Constants** 🎯
- [ ] **Check**: No magic numbers or hardcoded values
- [ ] **Rule**: Use constants from `mobile/src/constants/` or `mobile/src/styles/index.ts`
- [ ] **Why**: Easy to update, self-documenting code

**Bad:**
```typescript
// ❌ Magic numbers
<View style={{ padding: 20, color: '#cc4e00' }}>
```

**Good:**
```typescript
// ✅ Named constants
import { COLORS, SPACING } from '../styles';
<View style={{ padding: SPACING.XL, color: COLORS.PRIMARY }}>
```

---

### **5. Single Responsibility** 🎭
- [ ] **Check**: Each function does ONE thing
- [ ] **Rule**: If a function is > 50 lines, consider breaking it up
- [ ] **Why**: SRP principle - easier to test and understand

**Bad:**
```typescript
// ❌ Function does too much
function handleSubmit() {
  validateForm();
  updateDatabase();
  sendNotification();
  logAnalytics();
  redirectUser();
}
```

**Good:**
```typescript
// ✅ Separated concerns
function handleSubmit() {
  const isValid = validateForm();
  if (isValid) {
    await updateDatabase();
    await sendNotification();
  }
}
```

---

### **6. Clean Imports** 📥
- [ ] **Check**: Organized import order
- [ ] **Rule**: React → React Native → Third-party → Local (types, components, utils, styles)
- [ ] **Why**: Readability and consistency

**Good:**
```typescript
// ✅ Clean import order
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { User, AvatarSettings } from '../types';
import Header from '../components/Header';
import { requestLocationPermissions } from '../utils/location';
import { styles, COLORS } from '../styles';
```

---

### **7. No Hardcoded Strings** 📝
- [ ] **Check**: User-facing text should be in constants (for future i18n)
- [ ] **Rule**: Create `mobile/src/constants/strings.ts` if needed
- [ ] **Why**: Easier to translate, update, and maintain

---

### **8. Consistent Naming** 🏷️
- [ ] **Check**: Follow naming conventions
- [ ] **Rules**:
  - Components: `PascalCase` (e.g., `AvatarMarker`)
  - Functions: `camelCase` (e.g., `handleLocationUpdate`)
  - Constants: `SCREAMING_SNAKE_CASE` (e.g., `MAPBOX_ACCESS_TOKEN`)
  - Files: Match component name (e.g., `AvatarMarker.tsx`)

---

### **9. Error Handling** ⚠️
- [ ] **Check**: All async operations have try/catch
- [ ] **Rule**: User-friendly error messages, log technical details
- [ ] **Why**: Better UX and easier debugging

**Good:**
```typescript
try {
  await updateLocation();
} catch (error) {
  console.error('Location update failed:', error); // Log for debugging
  Alert.alert('Error', 'Could not update location'); // User-friendly
}
```

---

### **10. Comments & Documentation** 📖
- [ ] **Check**: Complex logic has comments
- [ ] **Rule**: Explain WHY, not WHAT (code should be self-explanatory)
- [ ] **Why**: Future you will thank you

**Good:**
```typescript
// Calculate Haversine distance for proximity filtering
// Using 250ft radius as per product requirements
const distance = calculateDistance(coord1, coord2);
```

---

---

# ⚛️ **PART 3: FRONTEND-SPECIFIC STANDARDS**

---

## ⚛️ **Frontend-Specific Standards**

### **1. No Local StyleSheets** 🎨
- [ ] **Check**: Zero `StyleSheet.create()` in component files
- [ ] **Rule**: ALL styles must be in `mobile/src/styles/index.ts`
- [ ] **Why**: Single source of truth, easy theme updates, consistent styling

**Bad:**
```typescript
// ❌ Component with local styles
const MyComponent = () => {
  const localStyles = StyleSheet.create({
    container: { padding: 20 }
  });
  return <View style={localStyles.container} />;
};
```

**Good:**
```typescript
// ✅ Using centralized styles
import { styles } from '../styles';
const MyComponent = () => {
  return <View style={styles.container} />;
};
```

---

### **2. Component Organization** 📦
- [ ] **Check**: Components in correct directories
- [ ] **Rule**: 
  - Reusable UI → `components/`
  - Full screens → `screens/`
  - One component per file
- [ ] **Why**: Clear separation of concerns, easy to locate files

**Good Structure:**
```
components/
├── Header.tsx           # Reusable across screens
├── BottomNavigation.tsx # Reusable navigation
├── DiceBearAvatar.tsx   # Reusable avatar
└── AvatarMarker.tsx     # Reusable map marker

screens/
├── LoginScreen.tsx      # Full login page
├── RegisterScreen.tsx   # Full registration page
├── MapScreen.tsx        # Full map page
└── SettingsScreen.tsx   # Full settings page
```

---

### **3. State Management** 🔄
- [ ] **Check**: State lifted to appropriate level
- [ ] **Rule**: 
  - Local state → `useState` in component
  - Shared state → Lift to common parent (App.tsx)
  - Global state → Context (if needed)
- [ ] **Why**: Prevent prop drilling, maintain single source of truth

**Bad:**
```typescript
// ❌ Duplicate state in multiple components
const MapScreen = () => {
  const [isActive, setIsActive] = useState(false);
};
const SettingsScreen = () => {
  const [isActive, setIsActive] = useState(false); // Out of sync!
};
```

**Good:**
```typescript
// ✅ State lifted to App.tsx
const App = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <MapScreen isActive={isActive} onToggle={setIsActive} />
      <SettingsScreen isActive={isActive} onToggle={setIsActive} />
    </>
  );
};
```

---

### **4. Props & Types** 📝
- [ ] **Check**: All props interfaces in `types/index.ts`
- [ ] **Rule**: No inline prop types, use centralized interfaces
- [ ] **Why**: Reusability, type safety, consistency

**Bad:**
```typescript
// ❌ Inline prop type
const Header: React.FC<{ username: string; isActive: boolean }> = ({ username, isActive }) => {
  // ...
};
```

**Good:**
```typescript
// ✅ Centralized interface
import { HeaderProps } from '../types';
const Header: React.FC<HeaderProps> = ({ username, isActive }) => {
  // ...
};
```

---

### **5. Async Operations & Effects** ⚡
- [ ] **Check**: Proper `useEffect` cleanup and dependencies
- [ ] **Rule**: 
  - Always cleanup subscriptions/timers
  - Correct dependency arrays
  - Handle loading/error states
- [ ] **Why**: Prevent memory leaks, stale closures, race conditions

**Bad:**
```typescript
// ❌ Missing cleanup
useEffect(() => {
  const interval = setInterval(() => updateLocation(), 5000);
  // No cleanup!
}, []);
```

**Good:**
```typescript
// ✅ Proper cleanup
useEffect(() => {
  const interval = setInterval(() => updateLocation(), 5000);
  return () => clearInterval(interval); // Cleanup
}, [updateLocation]);
```

---

### **6. API Calls & Services** 🌐
- [ ] **Check**: All API logic in `services/` directory
- [ ] **Rule**: No direct fetch/axios in components
- [ ] **Why**: Centralized error handling, easier mocking, DRY

**Bad:**
```typescript
// ❌ API call directly in component
const SettingsScreen = () => {
  const saveHeadline = async () => {
    const response = await fetch(`${API_URL}/auth/update-headline`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ headline })
    });
  };
};
```

**Good:**
```typescript
// ✅ API service
import { updateUserField } from '../services/api';
const SettingsScreen = () => {
  const saveHeadline = async () => {
    await updateUserField('headline', headline, token);
  };
};
```

---

### **7. Event Handlers** 🎯
- [ ] **Check**: Consistent naming and structure
- [ ] **Rule**: 
  - Prefix with `handle` (e.g., `handlePress`, `handleSubmit`)
  - Async handlers use try/catch
  - User-friendly error messages
- [ ] **Why**: Predictable code, proper error handling

**Good:**
```typescript
const handleSaveAvatar = async () => {
  try {
    setLoading(true);
    await updateUserAvatar(avatarSettings, token);
    Alert.alert('Success', 'Avatar updated!');
    onUserUpdate();
  } catch (error) {
    console.error('Avatar update failed:', error);
    Alert.alert('Error', 'Could not update avatar');
  } finally {
    setLoading(false);
  }
};
```

---

### **8. Conditional Rendering** 🔀
- [ ] **Check**: Clean, readable conditional logic
- [ ] **Rule**: 
  - Extract complex conditions to variables
  - Use early returns for loading/error states
  - Avoid nested ternaries
- [ ] **Why**: Readability and maintainability

**Bad:**
```typescript
// ❌ Nested ternaries
return (
  <View>
    {loading ? <Spinner /> : error ? <Error /> : data ? <Content data={data} /> : <Empty />}
  </View>
);
```

**Good:**
```typescript
// ✅ Early returns and clear conditions
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
if (!data) return <Empty />;

return <Content data={data} />;
```

---

### **9. Performance Optimization** ⚡
- [ ] **Check**: Proper use of memoization
- [ ] **Rule**: 
  - `useMemo` for expensive calculations
  - `useCallback` for callbacks passed to children
  - `React.memo` for expensive components
- [ ] **Why**: Prevent unnecessary re-renders

**Good:**
```typescript
// ✅ Memoized expensive calculation
const nearbyUsersCount = useMemo(() => {
  return nearbyUsers.filter(u => u.isActive).length;
}, [nearbyUsers]);

// ✅ Memoized callback
const handleLocationUpdate = useCallback((location) => {
  socket.emit('location:update', location);
}, [socket]);
```

---

### **10. Accessibility** ♿
- [ ] **Check**: Proper accessibility props
- [ ] **Rule**: 
  - `accessible={true}` on interactive elements
  - `accessibilityLabel` for icons/images
  - Proper contrast ratios for text
- [ ] **Why**: Inclusive design, better UX for all users

**Good:**
```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Toggle activity status"
  accessibilityRole="switch"
  onPress={handleToggle}
>
  <Text>Active</Text>
</TouchableOpacity>
```

---

---

# 🐍 **PART 4: BACKEND & DATABASE**

---

## 🐍 **Backend-Specific Standards**

### **1. Database Operations** 🗄️
- [ ] **Check**: Use connection pooling, never leave connections open
- [ ] **Rule**: Always use `db.get_connection()` and `db.return_connection(conn)`
- [ ] **Why**: Prevent connection leaks and database crashes

**Bad:**
```python
# ❌ Connection leak
conn = psycopg2.connect(...)
cursor = conn.cursor()
# No cleanup!
```

**Good:**
```python
# ✅ Proper connection management
conn = db.get_connection()
try:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    conn.commit()
    return cursor.fetchall()
except Exception as e:
    conn.rollback()
    print(f"Error: {e}")
finally:
    db.return_connection(conn)
```

---

### **2. Error Handling (Backend)** ⚠️
- [ ] **Check**: Never expose internal errors to users
- [ ] **Rule**: Log details, return generic messages
- [ ] **Why**: Security (don't leak database structure) and UX

**Bad:**
```python
# ❌ Exposes database structure
except Exception as e:
    return jsonify({'error': str(e)}), 500
```

**Good:**
```python
# ✅ Generic user message, detailed logs
except Exception as e:
    print(f"Database error: {str(e)}")  # Server logs
    return jsonify({'error': 'An error occurred. Please try again.'}), 500
```

---

### **3. API Response Consistency** 📤
- [ ] **Check**: All endpoints return consistent JSON structure
- [ ] **Rule**: Success: `{'data': ...}`, Error: `{'error': 'message'}`
- [ ] **Why**: Frontend can handle responses uniformly

**Good:**
```python
# ✅ Success response
return jsonify({
    'user': {...},
    'token': '...'
}), 200

# ✅ Error response
return jsonify({
    'error': 'Invalid credentials'
}), 401
```

---

### **4. SQL Injection Prevention** 🛡️
- [ ] **Check**: NEVER use string interpolation in SQL
- [ ] **Rule**: ALWAYS use parameterized queries
- [ ] **Why**: Security - prevent SQL injection attacks

**Bad:**
```python
# ❌ VULNERABLE TO SQL INJECTION
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

**Good:**
```python
# ✅ Safe parameterized query
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
```

---

### **5. No Duplicate Backend Logic** 📦
- [ ] **Check**: Extract repeated patterns into utilities
- [ ] **Rule**: Generic functions > Copy-paste
- [ ] **Why**: DRY principle applies to backend too

**Bad:**
```python
# ❌ Duplicate update logic
def update_headline():
    cursor.execute("UPDATE users SET headline = %s WHERE id = %s", (...))
    
def update_pronouns():
    cursor.execute("UPDATE users SET pronouns = %s WHERE id = %s", (...))
```

**Good:**
```python
# ✅ Generic update function
def update_user_field(user_id: int, field: str, value: any):
    cursor.execute(f"UPDATE users SET {field} = %s WHERE id = %s", (value, user_id))
```

---

### **6. Socket.io Event Naming** 🔌
- [ ] **Check**: Consistent event naming with namespaces
- [ ] **Rule**: Use format `namespace:action` (e.g., `location:update`)
- [ ] **Why**: Clear organization, avoid conflicts

**Good:**
```python
@socketio.on('location:join')
@socketio.on('location:leave')
@socketio.on('location:update')
```

---

### **7. Environment Variables** 🔐
- [ ] **Check**: No hardcoded credentials
- [ ] **Rule**: Use `.env` file and `os.getenv()`
- [ ] **Why**: Security and flexibility

**Bad:**
```python
# ❌ Hardcoded credentials
DB_PASSWORD = "mypassword123"
```

**Good:**
```python
# ✅ Environment variables
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
```

---

### **8. Backend Type Hints** 📝
- [ ] **Check**: Use Python type hints for function signatures
- [ ] **Rule**: Specify types for parameters and return values
- [ ] **Why**: Better IDE support and catch errors early

**Good:**
```python
def update_user_location(user_id: int, lat: float, lon: float) -> bool:
    """Update user location in database."""
    # Implementation
    return True
```

---

### **9. Transaction Management** 💾
- [ ] **Check**: Use transactions for multi-step operations
- [ ] **Rule**: Commit on success, rollback on error
- [ ] **Why**: Data consistency

**Good:**
```python
try:
    cursor.execute("INSERT INTO users ...")
    cursor.execute("INSERT INTO user_locations ...")
    conn.commit()  # Both succeed
except Exception as e:
    conn.rollback()  # Neither succeed
    raise
```

---

### **10. Backend Documentation** 📖
- [ ] **Check**: Docstrings for all functions
- [ ] **Rule**: Explain parameters, returns, and side effects
- [ ] **Why**: API documentation and team understanding

**Good:**
```python
def calculate_distance(coord1: tuple, coord2: tuple) -> float:
    """
    Calculate Haversine distance between two coordinates.
    
    Args:
        coord1: (latitude, longitude) tuple
        coord2: (latitude, longitude) tuple
    
    Returns:
        Distance in meters
    """
    # Implementation
```

---

## 💾 **Database Standards**

### **1. Schema Management** 📋
- [ ] **Check**: All schema changes documented in `database/schema.sql`
- [ ] **Rule**: Single source of truth for database structure
- [ ] **Why**: Easy to recreate database, understand structure

**Good:**
```sql
-- Always document constraints
CREATE TABLE user_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    UNIQUE(user_id)  -- Prevent duplicate locations
);
```

---

### **2. Indexes** 🔍
- [ ] **Check**: Proper indexes on frequently queried columns
- [ ] **Rule**: Index foreign keys and search columns
- [ ] **Why**: Query performance

**Good:**
```sql
CREATE INDEX idx_user_locations_user_id ON user_locations(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
```

---

### **3. Data Types** 📊
- [ ] **Check**: Appropriate data types for each field
- [ ] **Rule**: Use specific types (not TEXT for everything)
- [ ] **Why**: Data integrity and storage efficiency

**Good:**
```sql
email VARCHAR(255),           -- Not TEXT
is_active BOOLEAN,            -- Not VARCHAR
created_at TIMESTAMP,         -- Not VARCHAR
latitude DECIMAL(10, 8),      -- Not FLOAT (precision)
```

---

### **4. Cascading Deletes** 🗑️
- [ ] **Check**: ON DELETE CASCADE on foreign keys
- [ ] **Rule**: Clean up related data automatically
- [ ] **Why**: Data consistency, prevent orphaned records

**Good:**
```sql
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
```

---

### **5. Default Values** 🎯
- [ ] **Check**: Sensible defaults for optional fields
- [ ] **Rule**: Use DEFAULT for common initial values
- [ ] **Why**: Simplify insertions, prevent NULL issues

**Good:**
```sql
is_active BOOLEAN DEFAULT false,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

---

# 🔍 **PART 5: REVIEW & VALIDATION**

---

## 🔍 **Code Review Checklist**

### **Frontend Checks:**
- [ ] No local StyleSheets (search: `StyleSheet.create`)
- [ ] No duplicate code (look for copy-paste patterns)
- [ ] All styles in `mobile/src/styles/index.ts`
- [ ] All types in `mobile/src/types/index.ts`
- [ ] All constants properly named and organized
- [ ] Functions follow SRP (< 50 lines each)
- [ ] Proper error handling (try/catch)
- [ ] No hardcoded magic numbers or strings
- [ ] Consistent naming conventions
- [ ] Clean import organization
- [ ] Comments explain complex logic
- [ ] No linting errors
- [ ] No console.log statements (use proper logging)

### **Backend Checks:**
- [ ] Connection pooling used correctly
- [ ] All connections returned to pool
- [ ] No SQL injection vulnerabilities (parameterized queries)
- [ ] Generic error messages to users (no internal details)
- [ ] Consistent API response format
- [ ] Transactions for multi-step operations
- [ ] No hardcoded credentials (use environment variables)
- [ ] Type hints on all functions
- [ ] Docstrings on complex functions
- [ ] No duplicate database logic
- [ ] Socket.io events properly namespaced
- [ ] All exceptions caught and logged

### **Database Checks:**
- [ ] Schema changes documented in `database/schema.sql`
- [ ] Appropriate indexes on queried columns
- [ ] Correct data types (not TEXT for everything)
- [ ] ON DELETE CASCADE on foreign keys
- [ ] Sensible DEFAULT values
- [ ] UNIQUE constraints where needed
- [ ] NOT NULL on required fields

---

## 🚫 **Common Anti-Patterns to Avoid**

### **Frontend Anti-Patterns:**

#### **1. Inline Styles**
```typescript
// ❌ BAD
<View style={{ padding: 20, backgroundColor: '#cc4e00' }}>

// ✅ GOOD
<View style={styles.container}>
```

#### **2. Magic Numbers**
```typescript
// ❌ BAD
if (distance > 76.2) { /* ... */ }

// ✅ GOOD
import { PROXIMITY_RADIUS_METERS } from '../constants';
if (distance > PROXIMITY_RADIUS_METERS) { /* ... */ }
```

#### **3. API Calls in Components**
```typescript
// ❌ BAD - Direct fetch in component
const SettingsScreen = () => {
  const save = async () => {
    await fetch(`${API_URL}/update`, { ... });
  };
};

// ✅ GOOD - Use service layer
import { updateUserField } from '../services/api';
const SettingsScreen = () => {
  const save = async () => {
    await updateUserField('headline', value, token);
  };
};
```

#### **4. Missing Effect Cleanup**
```typescript
// ❌ BAD - Memory leak
useEffect(() => {
  const interval = setInterval(() => { ... }, 1000);
}, []);

// ✅ GOOD - Proper cleanup
useEffect(() => {
  const interval = setInterval(() => { ... }, 1000);
  return () => clearInterval(interval);
}, []);
```

#### **5. Inline Prop Types**
```typescript
// ❌ BAD - Inline interface
const Header: React.FC<{ name: string; active: boolean }> = ({ name, active }) => { ... };

// ✅ GOOD - Centralized types
import { HeaderProps } from '../types';
const Header: React.FC<HeaderProps> = ({ name, active }) => { ... };
```

#### **6. Prop Drilling**
```typescript
// ❌ BAD - passing props through 5 components

// ✅ GOOD - use context or lift state to common parent
```

#### **7. God Components**
```typescript
// ❌ BAD - 500 line component doing everything

// ✅ GOOD - break into smaller components
```

#### **8. Nested Ternaries**
```typescript
// ❌ BAD - Unreadable
{loading ? <Spinner /> : error ? <Error /> : data ? <Content /> : <Empty />}

// ✅ GOOD - Early returns
if (loading) return <Spinner />;
if (error) return <Error />;
if (!data) return <Empty />;
return <Content data={data} />;
```

---

### **Backend Anti-Patterns:**

#### **1. Connection Leaks**
```python
# ❌ BAD - Connection never returned
conn = db.get_connection()
cursor.execute("SELECT ...")

# ✅ GOOD - Always return connection
conn = db.get_connection()
try:
    cursor.execute("SELECT ...")
finally:
    db.return_connection(conn)
```

#### **2. String Concatenation in SQL**
```python
# ❌ BAD - SQL Injection vulnerability
query = f"SELECT * FROM users WHERE email = '{email}'"

# ✅ GOOD - Parameterized query
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
```

#### **3. Exposing Internal Errors**
```python
# ❌ BAD - Leaks database info
except Exception as e:
    return jsonify({'error': str(e)}), 500

# ✅ GOOD - Generic message
except Exception as e:
    print(f"Error: {e}")  # Log internally
    return jsonify({'error': 'An error occurred'}), 500
```

#### **4. No Transaction Management**
```python
# ❌ BAD - Partial updates on failure
cursor.execute("UPDATE users ...")
cursor.execute("UPDATE locations ...")

# ✅ GOOD - Atomic operations
try:
    cursor.execute("UPDATE users ...")
    cursor.execute("UPDATE locations ...")
    conn.commit()
except:
    conn.rollback()
```

---

---

# 🎯 **PART 6: PRINCIPLES & METRICS**

---

## 🎯 **Principles We Follow**

### **DRY (Don't Repeat Yourself)**
- One source of truth for everything
- Extract common patterns into utilities
- Reuse, don't recreate

### **KISS (Keep It Simple, Stupid)**
- Simple solutions over clever ones
- Readable code over concise code
- Clear > Clever

### **SRP (Single Responsibility Principle)**
- One function = one purpose
- One file = one concept
- One component = one feature

### **YAGNI (You Aren't Gonna Need It)**
- Don't build for future "maybe" features
- Build what's needed now
- Refactor when necessary

---

## 📊 **Metrics to Track**

### **Frontend - Good Code Indicators:**
- ✅ < 5 `StyleSheet.create()` in entire codebase (ideally 1)
- ✅ < 50 lines per function (average)
- ✅ < 200 lines per component
- ✅ 0 linting errors
- ✅ 0 duplicate code blocks
- ✅ 100% TypeScript (no .js files)

### **Backend - Good Code Indicators:**
- ✅ < 50 lines per function (average)
- ✅ 100% parameterized queries (no string interpolation)
- ✅ Type hints on all public functions
- ✅ Docstrings on complex functions
- ✅ No exposed database errors to users
- ✅ All connections returned to pool

### **Red Flags (Frontend):**
- ❌ Multiple `StyleSheet.create()` in components
- ❌ Functions > 100 lines
- ❌ Files > 500 lines
- ❌ Duplicate logic in 3+ places
- ❌ Any linting errors
- ❌ Missing type definitions

### **Red Flags (Backend):**
- ❌ String concatenation in SQL
- ❌ Unclosed database connections
- ❌ Exposed internal errors to users
- ❌ Missing type hints
- ❌ Duplicate database logic
- ❌ No transaction management

---

---

# 🛠️ **PART 7: TOOLS & STATUS**

---

## 🛠️ **Quick Commands**

### **Frontend Checks:**

**Check for Local StyleSheets:**
```bash
grep -r "StyleSheet.create" mobile/src --exclude-dir=styles
```

**Find Duplicate Code:**
```bash
# Look for similar patterns manually
# Use your IDE's "Find Similar" feature
```

**Check File Sizes:**
```bash
find mobile/src -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -n
```

**Run Linter:**
```bash
cd mobile && npx expo lint
```

**Check for console.log:**
```bash
grep -r "console.log" mobile/src
```

---

### **Backend Checks:**

**Check for SQL Injection Risks:**
```bash
# Look for f-strings or % formatting in SQL
grep -r 'f".*SELECT\|UPDATE\|INSERT\|DELETE' backend/src
grep -r '"%.*SELECT\|UPDATE\|INSERT\|DELETE' backend/src
```

**Check for Exposed Errors:**
```bash
# Look for exposed exceptions
grep -r "str(e)" backend/src
```

**Check for Unclosed Connections:**
```bash
# Look for get_connection without return_connection
grep -A 10 "get_connection()" backend/src | grep -v "return_connection"
```

**Check for Missing Type Hints:**
```bash
# Run mypy for type checking (if installed)
cd backend && python -m mypy src/ --ignore-missing-imports
```

**Check for Hardcoded Credentials:**
```bash
grep -r "password\|secret\|key" backend/src --exclude="*.env"
```

---

## 📚 **Resources**

- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

---

## ✅ **Current Status: CLEAN**

**Last Check:** After codebase cleanup (December 2024)

### **Frontend Status:**
- ✅ All styles centralized in `mobile/src/styles/index.ts`
- ✅ All types centralized in `mobile/src/types/index.ts`
- ✅ No duplicate validation logic
- ✅ No local StyleSheets in components
- ✅ Consistent naming conventions
- ✅ Clean import organization
- ✅ No linting errors
- ✅ 100% TypeScript
- ✅ Centralized constants and utilities

### **Backend Status:**
- ✅ Connection pooling implemented
- ✅ All queries parameterized (no SQL injection)
- ✅ Generic error messages to users
- ✅ Transactions for multi-step operations
- ✅ Environment variables for credentials
- ✅ No duplicate database logic (generic `update_user_field`)
- ✅ Socket.io events properly namespaced
- ✅ Consistent API response format

**Next Check:** Before each new feature implementation

---

## 🎓 **For Developers**

**Golden Rule:** 
> "Always leave the codebase cleaner than you found it."

**Before You Code:**
1. Read this checklist
2. Check existing patterns
3. Use centralized utilities

**After You Code:**
1. Review this checklist
2. Run linter
3. Check for duplication
4. Move styles to central file

**Remember:**
> "Clean code reads like well-written prose." - Robert C. Martin

---

**This document should be reviewed before every commit and updated as standards evolve.**

