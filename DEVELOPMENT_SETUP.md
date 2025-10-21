# 📱 **Chickalo Development Setup Guide**

> **Complete setup instructions for iOS development with React Native, Expo, and Flask backend**

---

## **Table of Contents**

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Device Setup Methods](#device-setup-methods)
   - [Method A: Expo CLI (Recommended)](#method-a-expo-cli-recommended)
   - [Method B: Xcode Only](#method-b-xcode-only)
5. [Multi-Device Testing](#multi-device-testing)
6. [Troubleshooting](#troubleshooting)
7. [Quick Reference](#quick-reference)

---

## **Prerequisites**

### **Required Software**
- **Node.js** (v16+)
- **Python 3.12+**
- **PostgreSQL**
- **Xcode** (latest version)
- **Apple Developer Account** (free personal team)

### **Required Accounts**
- **Apple Developer Account** (free personal team)
- **Mapbox Account** (for maps)

---

## **Backend Setup**

### **1. Database Setup**
```bash
# Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb chickalo
psql chickalo -f backend/database/schema.sql
```

### **2. Backend Installation**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### **3. Start Backend**
```bash
# Keep this running in Terminal 1
cd backend/src
source ../venv/bin/activate
# For multi-user testing (recommended):
gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:3000 app:app
# OR for single-user dev:
# cd backend && python src/app.py
```

**Expected Output:**
```
* Running on all addresses (0.0.0.0)
* Running on http://127.0.0.1:3000
* Running on http://192.168.x.x:3000
```

---

## **Frontend Setup**

### **1. Install Dependencies**
```bash
cd mobile
npm install
npx expo install
```

### **2. Mapbox Configuration**
1. Create account at [Mapbox](https://mapbox.com)
2. Get access token (public scope)
3. Update `mobile/src/config/mapbox.ts`:
   ```typescript
   export const MAPBOX_ACCESS_TOKEN = 'your_token_here';
   ```

### **3. Network Configuration**
```bash
# Get your IP address
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Update these files with your IP:**
- `mobile/src/services/api.ts`: `API_BASE_URL = 'http://YOUR_IP:3000'`
- `mobile/src/services/socket.ts`: `SOCKET_URL = 'http://YOUR_IP:3000'`

---

## **Device Setup Methods**

## **Method A: Expo CLI (Recommended)**

### **Step 1: Device Connection**
**Connect your device via USB:**
- **iPhone/iPad**: Connect to Mac via USB
- **Unlock device** and enter passcode
- **Trust this computer** when prompted
- **Keep device unlocked** during build

### **Step 2: Build and Install**
```bash
cd mobile
npx expo run:ios --device
```

**When prompted, select your device from the list.**

### **Step 3: Trust Certificate**
On device: **Settings > General > VPN & Device Management** → Trust your certificate

---

## **Method B: Xcode Only**

### **Step 1: Generate iOS Project**
```bash
cd mobile
npx expo prebuild --platform ios
```

### **Step 2: Open in Xcode**
```bash
open ios/Chickalo.xcworkspace
```

### **Step 3: Configure Signing**
**In Xcode:**
1. **Select "Chickalo" project** (blue icon at top)
2. **Select "Chickalo" target** (under TARGETS)
3. **Go to "Signing & Capabilities" tab**
4. **Team**: Select your Apple ID
5. **Bundle Identifier**: Change to unique value (e.g., `com.yourname.chickalo`)
6. **Automatically manage signing**: Check this box

### **Step 4: Build and Run**
1. **Select your device** from device dropdown (top left)
2. **Press Cmd + R** to build and run
3. **Trust certificate** on device when prompted

### **Step 5: Trust Certificate**
On device: **Settings > General > VPN & Device Management** → Trust your certificate

---

## **Multi-Device Testing**

### **Setup for iPad Testing**
1. **Connect iPad via USB**
2. **Trust computer** on iPad
3. **Use same Apple ID** (automatic certificate)
4. **Build for iPad** using either method above

### **Testing Flow**
1. **iPhone**: Login with your account, go active
2. **iPad**: Create new account, go active
3. **Both devices**: Should see each other on map

---

## **Troubleshooting**

### **Common Issues**

#### **App Says "Unavailable"**
```bash
# Complete rebuild
cd mobile
npx expo prebuild --clean
rm -rf ios/
npx expo run:ios --device
```

#### **"Provisioning profile doesn't include device"**
**Solution:**
1. Open `ios/Chickalo.xcworkspace` in Xcode
2. Select project → Signing & Capabilities
3. Change Bundle Identifier to unique value
4. Select correct Team (your Apple ID)
5. Build and run

#### **"Device is busy" or "Device not found"**
**Solution:**
1. **Unlock device** completely
2. **Disconnect and reconnect** USB cable
3. **Trust this computer** if prompted
4. **Keep device unlocked** during build

#### **Network Connection Errors**
**Check:**
- Backend is running on port 3000
- IP address is correct in `api.ts` and `socket.ts`
- Device and Mac are on same WiFi network
- Firewall settings allow connections

#### **Build Fails in Xcode**
**Solution:**
1. **Clean Build Folder**: Product → Clean Build Folder
2. **Reset Simulator**: Device → Erase All Content and Settings
3. **Restart Xcode**
4. **Try again**

### **Certificate Issues**

#### **No Developer Certificate in Settings**
- This is normal after clean rebuild
- Certificate appears after successful build
- Trust it when it shows up

#### **Certificate Expired (After 2+ Weeks)**
```bash
# Complete clean and rebuild
cd mobile
npx expo prebuild --clean
rm -rf ios/ node_modules/ .expo/
npm install
npx expo run:ios --device
```

---

## **Quick Reference**

### **Daily Development Workflow**
1. **Start Backend**: `cd backend/src && source ../venv/bin/activate && gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:3000 app:app`
   - **Alternative (dev server)**: `cd backend && python src/app.py` (not recommended for multi-user testing)
2. **Start Frontend**: `cd mobile && npx expo run:ios --device`
3. **Test on Device**: App launches automatically
4. **Make Changes**: Hot reload works automatically

### **After Long Breaks (2+ Weeks)**
1. **Update IP addresses** in `api.ts` and `socket.ts`
2. **Clean rebuild**: `npx expo prebuild --clean && rm -rf ios/`
3. **Rebuild**: `npx expo run:ios --device`
4. **Trust new certificate** on device

### **Multi-Device Testing**
1. **iPhone**: Keep current build running
2. **iPad**: Build using same method
3. **Test**: Both devices should see each other on map

### **Expected Timelines**
| Scenario | Time Required |
|----------|---------------|
| **Fresh Build** | 30-45 minutes |
| **Certificate Expired** | 10-15 minutes |
| **Daily Development** | 2-3 minutes |
| **Xcode Only** | 5-10 minutes |

### **Success Indicators**
✅ Backend: "Running on http://192.168.x.x:3000"  
✅ App installs without errors  
✅ Certificate appears in Settings  
✅ App launches and connects  
✅ Map loads with location  
✅ No network errors in console  

### **Quick Commands**
```bash
# Get IP address
ifconfig | grep "inet " | grep -v 127.0.0.1

# Clean rebuild
cd mobile && npx expo prebuild --clean && rm -rf ios/ && npx expo run:ios --device

# Open in Xcode
open ios/Chickalo.xcworkspace

# Check running processes
ps aux | grep -E "(expo|metro|python.*app.py)"
```

---

**Last Updated**: October 2024  
**For Issues**: Check troubleshooting section or rebuild completely