# 🧹 Code Quality Checklist for Chickalo

## ✅ **Standards to Maintain ALWAYS**

This document ensures we maintain clean, maintainable, and professional code throughout development.

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
backend/src/
├── app.py           # Flask routes & Socket.io
├── auth.py          # Authentication logic
├── location.py      # Location utilities
└── database.py      # DB connection
```

---

## 🔍 **Code Review Checklist**

Before considering any feature "done":

- [ ] No local StyleSheets (search: `StyleSheet.create`)
- [ ] No duplicate code (look for copy-paste patterns)
- [ ] All styles in `mobile/src/styles/index.ts`
- [ ] All types in `mobile/src/types/index.ts`
- [ ] All constants properly named and organized
- [ ] Functions follow SRP (< 50 lines each)
- [ ] Proper error handling (try/catch)
- [ ] No hardcoded magic numbers
- [ ] Consistent naming conventions
- [ ] Clean import organization
- [ ] Comments explain complex logic
- [ ] No linting errors
- [ ] No console.log statements (use proper logging)

---

## 🚫 **Common Anti-Patterns to Avoid**

### **1. Inline Styles**
```typescript
// ❌ BAD
<View style={{ padding: 20, backgroundColor: '#cc4e00' }}>

// ✅ GOOD
<View style={styles.container}>
```

### **2. Magic Numbers**
```typescript
// ❌ BAD
if (distance > 76.2) { /* ... */ }

// ✅ GOOD
import { PROXIMITY_RADIUS_METERS } from '../constants';
if (distance > PROXIMITY_RADIUS_METERS) { /* ... */ }
```

### **3. Prop Drilling**
```typescript
// ❌ BAD - passing props through 5 components

// ✅ GOOD - use context or lift state to common parent
```

### **4. God Components**
```typescript
// ❌ BAD - 500 line component doing everything

// ✅ GOOD - break into smaller components
```

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

### **Good Code Indicators:**
- ✅ < 5 `StyleSheet.create()` in entire codebase (ideally 1)
- ✅ < 50 lines per function (average)
- ✅ < 200 lines per component
- ✅ 0 linting errors
- ✅ 0 duplicate code blocks

### **Red Flags:**
- ❌ Multiple `StyleSheet.create()` in components
- ❌ Functions > 100 lines
- ❌ Files > 500 lines
- ❌ Duplicate logic in 3+ places
- ❌ Any linting errors

---

## 🛠️ **Quick Commands**

### **Check for Local StyleSheets:**
```bash
grep -r "StyleSheet.create" mobile/src --exclude-dir=styles
```

### **Find Duplicate Code:**
```bash
# Look for similar patterns manually
# Use your IDE's "Find Similar" feature
```

### **Check File Sizes:**
```bash
find mobile/src -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -n
```

### **Run Linter:**
```bash
cd mobile && npx expo lint
```

---

## 📚 **Resources**

- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

---

## ✅ **Current Status: CLEAN**

**Last Check:** After Mapbox implementation
- ✅ All styles centralized in `mobile/src/styles/index.ts`
- ✅ All types centralized in `mobile/src/types/index.ts`
- ✅ No duplicate validation logic
- ✅ No local StyleSheets in components
- ✅ Consistent naming conventions
- ✅ Clean import organization
- ✅ No linting errors

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

