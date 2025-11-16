# Chickalo User Testing Plan

> **Objective**: Gather user experience feedback from 5 testers through structured testing scenarios in real-world environments

**Test Date**: [November 20]  
**Test Environment**: Public space (coffee shop, campus, marketplace, home)  
**Number of Testers**: 5 participants (Megan, Jessie, Kaylie, Anissa, and Rin)

---

## Table of Contents

1. [Pre-Test Preparation](#pre-test-preparation)
2. [Technical Setup](#technical-setup)
3. [Testing Scenarios](#testing-scenarios)
4. [Data Collection](#data-collection)
5. [Post-Test Debrief](#post-test-debrief)
6. [Success Metrics](#success-metrics)

---

## Pre-Test Preparation

### **Timeline: 1 Week Before Test**

#### **Recruiter Checklist**
- [Y] Recruit 5 testers (diverse demographics: ages 18-30, mix of tech-savvy and non-tech users)
- [Y] Gather device information from each tester:
  - [Y] Device model (iPhone 11+, iPad)
  - [Y] iOS version (iOS 14+)
  - [Y] Apple ID email (for device provisioning if needed)
- [Y] Send **[pre-test questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSfcLzJ-PGOEKLCXJnfIAYudrniCwz_ROOA6tRDlv80ILDaQ9Q/viewform?usp=header)** to gauge expectations
- [Y] Reserve public testing location (ensure WiFi availability-- must be on same network for local installation)

#### **Technical Preparation**
- [ ] Update backend IP address to test location's network
- [ ] Test backend stability with Gunicorn + eventlet
- [ ] Verify database is clean (reset test accounts if needed)
- [Y] Prepare production-ready app version 
- [Y] Test multi-user scenario with 2-3 devices beforehand

#### **Materials to Bring**
- [ ] Laptop with backend running
- [ ] Mobile hotspot (backup if location WiFi fails)
- [Y] Instruction sheet (**[quick start guide](https://docs.google.com/document/d/1MDITFQ17ozD3jxaWJT3qKDmcp6u9juWttqFR0zN1vyo/edit?usp=sharing)**)
- [Y] Feedback survey form
- [ ] Charging cables and power bank
- [ ] Notebook for observational notes
- [ ] Camera/phone for recording (with permission)

---

### **[Pre-Test Questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSfcLzJ-PGOEKLCXJnfIAYudrniCwz_ROOA6tRDlv80ILDaQ9Q/viewform?usp=preview)**

**About You:**
1. Age: _____
2. Gender: Female/ Male/ Prefer Not to Say
3. Major: _____

**Device Info:**
1. Apple ID Email: _____
2. Device Model: _____
3. iOS Version: _____

**Expectations:**
1. How often do you use social apps? (Daily / Weekly / Rarely / Never)
2. What is your most used social app? What about it do you like? 
3. Have you used location-based apps before? (Snapchat, Pokemon GO, etc.) (Y/N)
4. How comfortable are you with location tracking in apps? (Very Comfortable / Moderately Comfortable / Not Sure / Not Comfortable / Depends on what app it is)

**User Testing Consent Agreement:**
I agree to participate in user testing for the Chickalo mobile application. 
I understand that: 
- My feedback will be used to improve the app
- My session may be observed and recorded (with my permission)
- My data will be deleted after testing (unless I consent to its retention)
- I can withdraw from testing at any time without penalty
- My identity will remain confidential in any published results

I consent to:
- Audio/video recording of my testing session
- Use of my feedback in research reports (anonymized)
- Retention of my test account for future testing

---

## Technical Setup

### **Phase 1: Backend Setup (before participants arrive)**

#### **Step 1: Connect to Test Location WiFi**
```bash
# Get your laptop's IP address on the WiFi network
ifconfig | grep "inet " | grep -v 127.0.0.1
# Note the IP address (e.g., 192.168.1.XXX)
```

#### **Step 2: Update Frontend API URLs**
Update the following files with your current IP:
- `mobile/src/services/api.ts` → `API_BASE_URL`
- `mobile/src/services/socket.ts` → `SOCKET_URL`

```typescript
// Example:
const API_BASE_URL = 'http://192.168.1.XXX:3000';
const SOCKET_URL = 'http://192.168.1.XXX:3000';
```

#### **Step 3: Start Backend Server**
```bash
cd backend/src
source ../venv/bin/activate
gunicorn --worker-class eventlet -w 1 --bind 0.0.0.0:3000 app:app
```

**Expected Output:**
```
[INFO] Starting gunicorn 23.0.0
[INFO] Listening at: http://0.0.0.0:3000
Database connection pool created successfully
```

#### **Step 4: Verify Backend Health**
```bash
# In a new terminal:
curl http://localhost:3000/api/auth/profile
# Should return: {"error": "Authorization header is missing"}
```

---

### **Phase 2: Device Setup (60-90 min, participants present)**

#### **Option A: Pre-Built App Installation (Recommended)**

**Prerequisites for Each Tester:**
1. iPhone or iPad with iOS 14+
2. Device connected to same WiFi as backend
3. Device connected to your laptop via USB cable
4. **Tester's Apple ID email** (collected in pre-test questionnaire)

---

#### **CRITICAL FIRST STEP: Add Testers to Your Apple Developer Team**

**⚠️ DO THIS 1-2 DAYS BEFORE TEST DAY ⚠️**

**Personal Team** (free Apple ID):
- Add participants' devices via their Apple ID emails (you can have up to **100 devices** registered)
- Devices stay registered for **1 year**
- No approval process needed

---

**Method 2: Manual Registration in Xcode (If Automatic Fails)**

1. **Open Xcode and Select Project**

3. **Go to Signing & Capabilities Tab**
   - Click "Signing & Capabilities" at the top

4. **Select Your Team**
   - Under "Team" dropdown, select your Apple ID
   - If you see "Add an Account...", click it and sign in with your Apple ID

5. **Connect Tester's Device**
   - Plug in tester's iPhone/iPad via USB
   - Unlock the device
   - Trust Computer
   - Enter device passcode

6. **Register Device**
   - In Xcode, go to **Window → Devices and Simulators** (Cmd+Shift+2)
   - You should see the connected device in the left sidebar
   - Right-click on the device → **Show Provisioning Profiles**
   - Xcode will automatically register the device's UDID

7. **Verify Device is Registered**
   - Go to [Apple Developer Portal](https://developer.apple.com/account/resources/devices/list)
   - Sign in with your Apple ID
   - Click "Devices" → "All"
   - You should see the device listed with its name and UDID

---

#### **Installation Steps (PER DEVICE - Repeat 5 Times)**

**⏱️ Time: 10-15 minutes per device**

---

**Step 1: Physical Connection**

1. **Connect Device to Laptop via USB Cable**
   - Use Lightning cable (iPhone) or USB-C cable (iPad)
   - Ensure cable is securely connected

2. **Unlock Tester's Device**
   - Ask tester to enter passcode
   - Keep device unlocked during installation

3. **Trust This Computer (First Time Only)**
   - If tester hasn't connected their device to your laptop before:
     - A popup will appear on their device: **"Trust This Computer?"**
     - Tap **Trust**
     - Enter device passcode again
   - This allows your laptop to communicate with their device

4. **Verify Device is Detected**
   ```bash
   xcrun xctrace list devices
   ```
   - You should see output like:
     ```
     == Devices ==
     Megan's iPhone (12.3.4) (UDID: 00008030-XXXXXXXXXXXX)
     ```
   - If you don't see the device:
     - Unplug and replug the cable
     - Restart your laptop
     - Try a different USB port
     - Check if device is in "Low Power Mode" (disable it)

---

**Step 2: Build and Install App**

1. **Navigate to Mobile Directory**
   ```bash
   cd /Users/masterhulkfung/Senior_Project/Chickalo/mobile
   ```

2. **Run Build Command**
   ```bash
   npx expo run:ios --device
   ```

3. **Select Tester's Device**
   - A list of connected devices will appear:
     ```
     ? Select a device/simulator:
     › Megan's iPhone (iOS 16.5)
       Jessie's iPhone (iOS 17.1)
       Kaylie's iPad (iOS 15.8)
     ```
   - Use arrow keys to select the correct device
   - Press **Enter**

4. **Wait for Build Process** (~5-10 minutes)
   - You'll see output like:
     ```
     › Building for iOS...
     › Compiling TypeScript...
     › Bundling JavaScript...
     › Building native app (Xcode)...
     › Installing on Megan's iPhone...
     ```
   - **DO NOT** unplug device during this process
   - Keep device unlocked

5. **Build Completion**
   - You should see:
     ```
     ✓ Build succeeded
     ✓ Installed on Megan's iPhone
     › Opening app...
     ```
   - The Chickalo app will automatically launch on the device

---

**Step 3: Handle Developer Certificate Trust (CRITICAL)**

**⚠️ The app will NOT open until the tester trusts your certificate ⚠️**

1. **App Shows "App Unavailable" Error**
   - This is expected!
   - The app icon is installed, but iOS blocks it from running

2. **Guide Tester to Trust Your Certificate**
   ```
   Open Settings app → General → VPN & Device Management
   ```

3. **What Testers Will See:**
   - Under "DEVELOPER APP" section:
   - "Apple Development: [Your Name] ([Your Apple ID])"

4. **Tap on Your Developer Profile**
   - Testers tap on your name/email

5. **Trust the Developer**
   - Tap **"Trust 'Apple Development: [Your Name]'"** (blue text)
   - A confirmation popup appears:
     ```
     Trust "Apple Development: [Your Name]"?
     
     You are about to trust software from developer
     "[Your Name]" on this iPhone. This means that
     apps from this developer will be allowed to run
     on this iPhone.
     ```
   - Tap **Trust** (red text)

6. **Verify Trust**
   - The screen should now show:
     ```
     Apple Development: [Your Name]
     [Your Apple ID]
     
     ✓ Trusted
     ```

---

**Step 4: Launch App**

1. **Return to Home Screen**
   - Press home button or swipe up

2. **Find Chickalo App**
   - Look for the Chickalo icon
   - Icon should show the app logo (not grayed out)

3. **Tap to Open**
   - Tap the Chickalo icon
   - App should launch and show the login screen

4. **Verify App Loads Correctly**
   - [ ] Login screen appears
   - [ ] "Login" and "Create Account" buttons visible
   - [ ] "Forgot password?" link visible
   - [ ] No error messages
   - [ ] No crashes

---

**Step 5: Verify Backend Connectivity**

1. **Check Device is on Correct WiFi**
   - Have tester open **Settings → WiFi**
   - Verify connected to same network as your laptop
   - Network name should match your laptop's WiFi

2. **Test Backend Connection (Optional)**
   - Have tester tap "Create Account" on login screen
   - If registration screen loads, backend is reachable
   - Tap "Back" to return to login screen (don't register yet)

---

**Step 6: Repeat for All Testers**

---

#### **Common Issues & Solutions**

| Problem | Solution |
|---------|----------|
| **"No devices found"** | 1. Unplug/replug cable<br>2. Unlock device<br>3. Trust this computer<br>4. Try different USB port<br>5. Restart device |
| **"Signing requires a development team"** | 1. Open Xcode<br>2. Project → Signing & Capabilities<br>3. Select your Team (Apple ID)<br>4. Change Bundle Identifier to unique name |
| **"Provisioning profile doesn't include device"** | 1. Device UDID not registered<br>2. Go to Xcode → Window → Devices<br>3. Right-click device → Show Provisioning Profiles<br>4. Rebuild app |
| **Build fails with Xcode error** | 1. Clean build: `cd ios && rm -rf build`<br>2. Delete derived data<br>3. Reinstall pods: `pod install`<br>4. Rebuild |
| **"App is damaged" or "Cannot verify"** | 1. Tester hasn't trusted your certificate<br>2. Repeat Step 3 (Trust Developer) |
| **App crashes immediately** | 1. Check backend is running<br>2. Verify IP address in api.ts matches<br>3. Check Xcode console logs for errors |
| **Device not on same WiFi** | 1. Settings → WiFi<br>2. Connect to correct network<br>3. Verify IP matches your laptop's IP range |

---

### **Phase 3: Account Creation & Database Verification (30 min)**

#### **Guided Registration (All 5 Testers Simultaneously)**

**Script for Testers:**
> "We'll now create your Chickalo account. Please follow along on your device."

**Registration Steps:**

1. **Open Chickalo** → Tap **"Create Account"**
2. **Enter Email**: Use personal emails
3. **Enter Password**: Use personal passwords (min 6 characters)
4. **Confirm Password**: Re-enter same password
5. **Optional Headline**: "First time using Chickalo!"
6. **Tap "Register"**
7. **Wait for Success** (~2-3 seconds)
8. **Note your Username**: Write down the randomly generated username (e.g., "JadeStoneGecko327")

**Frontend Verification Checklist (per tester):**
- [ ] Login screen → Map screen transition successful
- [ ] Username displays in header
- [ ] Avatar is visible in bottom navigation
- [ ] Activity toggle is OFF (orange border on avatar)
- [ ] Headline appears in settings (if entered)
- [ ] No error messages appear

**Frontend Troubleshooting:**
- **"Invalid email format"**: Ensure email has `@` and `.`
- **"Passwords do not match"**: Re-type carefully
- **"Email already exists"**: Use a different email
- **App crashes**: Check backend logs, restart app
- **"Network error"**: Verify device is on correct WiFi, backend is running

---

#### **DATABASE VERIFICATION (CRITICAL - Do This After ALL 5 Testers Register)**

**⚠️ DO NOT proceed to testing scenarios until database is verified ⚠️**

This section ensures all user data is correctly stored in PostgreSQL before starting testing scenarios.

---

#### **Step 1: Access PostgreSQL Database**

**From Your Laptop (in a new terminal window):**

```bash
# Connect to Chickalo database
psql chickalo
```

---

#### **Step 2: Verify All 5 Users Exist in `users` Table**

**Run this query:**

```sql
SELECT 
    id, 
    email, 
    username, 
    headline, 
    pronouns,
    is_active,
    avatar_data IS NOT NULL as has_avatar,
    created_at
FROM users
ORDER BY id DESC
LIMIT 5;
```

**Checklist:**
- [ ] **5 rows returned** (one for each tester)
- [ ] **All emails are unique** (no duplicates)
- [ ] **All usernames are unique** (no duplicates)
- [ ] **All usernames follow pattern** (AdjectiveNoun###)
- [ ] **`is_active` is `f` (false)** for all users (should start inactive)
- [ ] **`has_avatar` is `t` (true)** for all users (avatar assigned during registration)
- [ ] **`headline` matches what testers entered** (or empty if skipped)
- [ ] **`pronouns` is NULL** for all users (not set during registration)
- [ ] **`created_at` timestamps are within last 10 minutes** (recently created)

**If ANY of these fail, STOP and debug before proceeding!**

---

#### **Step 3: Verify Password Hashes Are Stored**

**Run this query:**

```sql
SELECT 
    id,
    username,
    LENGTH(password_hash) as hash_length,
    SUBSTRING(password_hash, 1, 10) as hash_preview
FROM users
ORDER BY id DESC
LIMIT 5;
```

**Checklist:**
- [ ] **`hash_length` is exactly 60** for all users (bcrypt standard)
- [ ] **`hash_preview` starts with `$2b$12$`** (bcrypt format with cost factor 12)
- [ ] **All hashes are different** (even if users used same password, salt makes them unique)

---

#### **Step 4: Verify Avatar Data is Valid JSON**

**Run this query:**

```sql
SELECT 
    id,
    username,
    jsonb_typeof(avatar_data) as data_type,
    avatar_data->>'backgroundColor' as bg_color,
    avatar_data->>'skinColor' as skin_color,
    avatar_data->>'hairStyle' as hair_style
FROM users
ORDER BY id DESC
LIMIT 5;
```

**Checklist:**
- [ ] **`data_type` is `object`** for all users (valid JSONB)
- [ ] **`bg_color` is a 6-character hex code** (e.g., `b6e3f4`)
- [ ] **`skin_color` is a 6-character hex code**
- [ ] **`hair_style` is a valid style name** (e.g., `short02`, `curly`, `buzz`)

**If any field is NULL or malformed, avatar won't render correctly!**

---

#### **Step 5: Verify NO Location Data Exists Yet**

**Run this query:**

```sql
SELECT 
    ul.id,
    ul.user_id,
    u.username,
    ul.latitude,
    ul.longitude,
    ul.last_updated
FROM user_locations ul
JOIN users u ON ul.user_id = u.id
WHERE u.id IN (
    SELECT id FROM users ORDER BY id DESC LIMIT 5
);
```

**Expected Output:**
```
(0 rows)
```

**Checklist:**
- [ ] **0 rows returned** (no location data should exist yet)
- [ ] Users haven't turned Activity ON, so locations shouldn't be tracked

**If any rows are returned, this indicates a bug in the Activity toggle or location tracking!**

---

#### **Step 6: Test Login for One User**

**Pick one tester (e.g., Megan) and have them:**

1. **Log Out**
   - Navigate to Settings
   - Tap "Log Out"
   - Should return to login screen

2. **Log Back In**
   - Enter email: `megan@example.com`
   - Enter password: [their password]
   - Tap "Login"

3. **Verify Success**
   - Should navigate to Map screen
   - Username should display in header
   - Avatar should appear in bottom nav

**Database Verification (Run this query):**

```sql
SELECT 
    id,
    username,
    email,
    is_active
FROM users
WHERE email = 'megan@example.com';
```

**Checklist:**
- [ ] **User data returned** (login successful)
- [ ] **`is_active` is still `f`** (didn't change on login)

---

#### **Common Database Issues & Solutions**

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| **User not in database** | Registration failed silently | Check backend logs for errors; have user re-register |
| **Duplicate email error** | User tried to register twice | Use a different email or delete duplicate from DB |
| **`avatar_data` is NULL** | Avatar generation failed | Check backend `auth.py` → `generate_random_avatar()` function |
| **`password_hash` wrong length** | bcrypt not working | Verify `bcrypt` package is installed; check Python version |
| **Location data exists** | User turned Activity ON prematurely | Delete from `user_locations` table; ask user to toggle OFF |
| **`is_active` is `t` (true)** | Activity toggled during registration | Should be `f` by default; check if user toggled during setup |

---

## Testing Scenarios

### **Scenario 1: New User Onboarding (15 min)**

**Objective:** Evaluate ease of account creation and initial app understanding

**Script:**
> "Imagine you've just downloaded Chickalo. Explore the app and try to understand what it does without any guidance from me."

**Tasks:**
1. Navigate through login screen
2. Create account
3. Explore map screen (inactive state)
4. Navigate to settings screen
5. Review profile information

**Observation Checklist:**
- [ ] User understands "Activity" toggle without explanation
- [ ] User finds settings screen intuitively
- [ ] User reads headline and understands its purpose
- [ ] User attempts to customize avatar
- [ ] User asks clarifying questions (note specific confusion points)

**Questions to Ask After:**
1. "What do you think this app is for?"
2. "What does the Activity toggle do?"
3. "Was anything confusing or unclear?"
4. "Did you feel comfortable navigating the app?"

---

### **Scenario 2: Activating and Discovering Nearby Users (20 min)**

**Objective:** Test real-time location tracking and multi-user visibility

**Script:**
> "Now, let's turn your Activity ON and see what happens. Walk around this space and observe your map."

**Tasks:**
1. Toggle Activity ON (green border should appear)
2. Walk 20-30 feet from original position
3. Observe other users appearing on map (if within ~250 feet)
4. Tap on another user's avatar to view their profile
5. Return to settings → Toggle Activity OFF

**Technical Checks:**
- [ ] Avatar appears on map when Activity is ON
- [ ] Avatar border changes from orange → green
- [ ] User's location updates smoothly (no glitching)
- [ ] Other users appear within 30 seconds of being nearby
- [ ] Tapping avatar opens UserInfoModal correctly
- [ ] Avatar disappears when Activity is OFF

**Observation Checklist:**
- [ ] User notices border color change
- [ ] User understands they are now "visible"
- [ ] User finds other avatars on map
- [ ] User attempts to tap on other avatars
- [ ] User feels comfortable with location tracking

**Questions to Ask After:**
1. "Did you feel your location was accurately represented?"
2. "How quickly did you see other users appear?"
3. "Did the map feel responsive?"
4. "Any concerns about privacy or location tracking?"
5. "What did you think of the speech bubbles above avatars?"

---

### **Scenario 3: Profile Customization (15 min)**

**Objective:** Test settings interface and profile update functionality

**Script:**
> "Let's personalize your profile. Navigate to Settings and make some changes."

**Tasks:**
1. Navigate to Settings screen
2. Update headline to: "Looking for study partners for CSC 203"
3. Update pronouns to: "they/them"
4. Tap "Randomize Avatar" 2-3 times
5. Manually customize avatar (change hair, eyes, etc.)
6. Save changes
7. Return to Map screen to verify headline appears above avatar

**Technical Checks:**
- [ ] Headline updates in real-time on map
- [ ] Pronouns save successfully
- [ ] Avatar randomization works
- [ ] Manual avatar customization saves
- [ ] Changes persist after navigating away

**Observation Checklist:**
- [ ] User finds customization options intuitive
- [ ] User enjoys avatar randomization feature
- [ ] User understands headline's social purpose
- [ ] User saves changes without confusion

**Questions to Ask After:**
1. "Was it easy to customize your profile?"
2. "Did you enjoy the avatar customization options?"
3. "Do you feel the headline feature is useful?"
4. "Would you add more customization options? If so, what?"

---

### **Scenario 4: Social Interaction Simulation (20 min)**

**Objective:** Test real-world use case inspired by proposal user stories

**Script:**
> "Let's simulate a real scenario. Imagine you're at Cal Poly's 1901 Marketplace, and you missed your Physics class. You need to find a lab partner."

**Tasks:**
1. Update headline to: "Need a Physics lab partner! Fraser's 9am section"
2. Turn Activity ON
3. Walk around the test location
4. Look for other users with relevant headlines
5. Tap on a user's avatar to view their profile
6. Tap on your own avatar to verify it navigates to Settings

**Role-Play Setup:**
- **Tester 1 (Lab Partner Seeker)**: Headline = "Need a Physics lab partner! Fraser's 9am section"
- **Tester 2 (Lab Partner Provider)**: Headline = "Have room in my Physics lab group!"
- **Tester 3 (New to City)**: Headline = "Newly moved to SLO, looking for friends"
- **Tester 4 (Coffee Shop Regular)**: Headline = "Anyone want to study together?"
- **Tester 5 (Event Attendee)**: Headline = "At the career fair, let's network!"

**Observation Checklist:**
- [ ] Users actively read each other's headlines
- [ ] Users understand the social utility
- [ ] Users feel comfortable approaching each other based on app info
- [ ] Users provide feedback on headline character limits
- [ ] Users suggest additional features for interaction

**Questions to Ask After:**
1. "Did you feel the headline helped you understand other users?"
2. "Would you actually use this app in this scenario?"
3. "What would make you more likely to approach someone?"
4. "Do you feel safe and comfortable using this feature?"
5. "Would messaging be a necessary addition?"

---

### **Scenario 5: Privacy and Safety (10 min)**

**Objective:** Assess user concerns about location privacy and anonymity

**Script:**
> "Let's talk about privacy. Toggle your Activity OFF and observe what happens."

**Tasks:**
1. Turn Activity OFF
2. Verify avatar becomes grayscale
3. Verify avatar disappears from other users' maps
4. Verify location is no longer tracked
5. Turn Activity back ON
6. Discuss privacy concerns

**Technical Checks:**
- [ ] Avatar turns grayscale when inactive
- [ ] Avatar disappears from other users' maps within 5 seconds
- [ ] No location updates sent when inactive
- [ ] Activity toggle is easily accessible

**Questions to Ask:**
1. "Do you feel you have enough control over your visibility?"
2. "Are you comfortable with the app tracking your location when active?"
3. "Would you want additional privacy features? (e.g., block users, hide from specific people)"
4. "Do you trust that your location is deleted when you go inactive?"
5. "Would you use this app in your daily life?"

---

### **Scenario 6: Password Reset Flow (10 min)**

**Objective:** Test forgot password functionality

**Script:**
> "Let's test the password reset feature. Log out and request a password reset."

**Tasks:**
1. Navigate to Settings → Log Out
2. On login screen, tap "Forgot password?"
3. Enter email address
4. Check email for reset code (you'll simulate this by providing the code from backend logs)
5. Enter reset code
6. Set new password
7. Log back in

**Technical Checks:**
- [ ] Email validation works
- [ ] Reset code email is sent (check backend logs for token)
- [ ] Token verification works
- [ ] Password reset successful
- [ ] Can log in with new password

**Questions to Ask:**
1. "Was the password reset process straightforward?"
2. "Did you understand each step?"
3. "Would you prefer a different method (e.g., link instead of code)?"

---

## Data Collection

### **During Testing: Observational Notes**

**For Each Tester, Note:**
- Hesitations or confusion points
- Unsolicited comments ("Oh, this is cool!" or "I don't understand this")
- Time spent on each task
- Number of attempts to complete task
- Questions asked

---

### **Technical Metrics to Track**

**From Backend Logs:**
- [ ] Number of successful registrations
- [ ] Number of successful logins
- [ ] Number of activity toggles (ON/OFF)
- [ ] Number of location updates emitted
- [ ] Number of nearby users detected
- [ ] Average response time for API calls
- [ ] Any error logs or crashes

**From Device Observations:**
- [ ] Time to load map screen
- [ ] Time for nearby users to appear
- [ ] Number of app crashes
- [ ] Number of UI glitches

---

## Post-Test Debrief

### **Immediate Debrief (15 min, all testers together)**

**Script:**
> "Thank you for testing Chickalo! Let's have a quick group discussion about your experience."

**Discussion Questions:**
1. "What was your first impression of the app?"
2. "What feature stood out to you the most?"
3. "What was the most confusing part?"
4. "Would you actually use this app? In what situations?"
5. "Any concerns or red flags?"

**Facilitate Open Discussion:**
- Encourage testers to share differing opinions
- Note consensus points (e.g., "Everyone found X confusing")
- Ask follow-up questions for clarity

---

### **Individual Debrief (10 min per tester, optional)**

For deeper insights, schedule 1-on-1 follow-ups:

**Topics to Cover:**
- Personal use cases they envision
- Specific technical issues they encountered
- Comparison to similar apps they use
- Suggestions for improvement

---

### **Post-Test: [Feedback Survey](https://docs.google.com/forms/d/e/1FAIpQLScCLw_EYPZzxUtgntqoUzrs2dOsLd3wVT2Qhv-WV0OizTOiDw/viewform?usp=preview)**

#### **Section 1: Usability (1-5 scale: 1=Strongly Disagree, 5=Strongly Agree)**

1. The app was easy to navigate
2. I understood the purpose of the Activity toggle
3. The map interface was intuitive
4. Profile customization was straightforward
5. I felt in control of my privacy
6. The app responded quickly to my actions
7. The speech bubbles above avatars were helpful
8. I would recommend this app to a friend

#### **Section 2: Feature Feedback**

**What did you like most about Chickalo?**
- [ ] Avatar customization
- [ ] Real-time map
- [ ] Headline feature
- [ ] Activity toggle control
- [ ] Anonymous profiles
- [ ] Other: _______________

**What frustrated you the most?**
- [ ] App was slow
- [ ] Features were confusing
- [ ] Privacy concerns
- [ ] Limited customization
- [ ] Other: _______________

#### **Section 3: Open-Ended Questions**

1. **What would make you use this app regularly?**
   - _____________________________________________________

2. **What features are missing that you would want?**
   - _____________________________________________________

3. **Did you feel safe using this app? Why or why not?**
   - _____________________________________________________

4. **How would you describe Chickalo to a friend?**
   - _____________________________________________________

5. **On a scale of 1-10, how likely are you to use this app in real life?**
   - [ ] 1 [ ] 2 [ ] 3 [ ] 4 [ ] 5 [ ] 6 [ ] 7 [ ] 8 [ ] 9 [ ] 10

6. **Additional comments or suggestions:**
   - _____________________________________________________

---

### **Data Analysis (1 week after test)**

**Compile Results:**
1. **Quantitative Data:**
   - Average usability scores (1-5 scale)
   - Likelihood to use app (1-10 scale)
   - Task completion rates
   - Time to complete each scenario

2. **Qualitative Data:**
   - Common themes in feedback
   - Recurring pain points
   - Feature requests (prioritize by frequency)
   - Privacy concerns

3. **Technical Data:**
   - App performance metrics
   - Error rates
   - Device-specific issues

**Create Summary Report:**
- Executive summary (1 page)
- Key findings (3-5 bullet points)
- Prioritized list of improvements
- User quotes (for context)

---

## Success Metrics

### **Critical Success Criteria (Must Pass)**

- [ ] All 5 testers successfully create accounts
- [ ] All 5 testers can toggle Activity ON/OFF
- [ ] At least 4/5 testers see other nearby users on map
- [ ] 0 app crashes during testing
- [ ] Average usability score ≥ 3.5/5

### **Desired Success Criteria (Nice to Have)**

- [ ] All 5 testers complete all scenarios without help
- [ ] Average "likelihood to use" score ≥ 7/10
- [ ] At least 4/5 testers say they would recommend the app
- [ ] No major privacy concerns raised
- [ ] Testers provide at least 10 actionable feature suggestions

### **Red Flags (Require Immediate Attention)**

- [ ] More than 2 testers cannot complete registration
- [ ] More than 1 app crash during testing
- [ ] Testers express serious privacy or safety concerns
- [ ] Average usability score < 3.0/5
- [ ] Testers find core feature (Activity toggle or map) confusing

---

## Contingency Plans

### **Technical Issues**

**Problem:** Backend crashes or becomes unresponsive
- **Solution:** Restart Gunicorn server, verify IP address hasn't changed

**Problem:** Devices cannot connect to backend
- **Solution:** Switch to mobile hotspot, update API URLs, rebuild apps

**Problem:** App won't install on tester's device
- **Solution:** Use backup device, switch to TestFlight if available

**Problem:** Location services not working
- **Solution:** Verify GPS permissions, restart app, check device settings

---

### **Logistical Issues**

**Problem:** Tester doesn't show up
- **Solution:** Have 1-2 backup testers on standby

**Problem:** Testing location WiFi is down
- **Solution:** Use mobile hotspot, relocate to backup location (library, campus center)

**Problem:** Testing runs over time
- **Solution:** Prioritize Scenarios 1, 2, and 4 (core functionality)

---

### **User Discomfort**

**Problem:** Tester expresses privacy concerns mid-test
- **Solution:** Pause test, discuss concerns, offer to delete their data, reassure them

**Problem:** Tester feels uncomfortable with location tracking
- **Solution:** Emphasize Activity toggle control, explain data deletion policy

---

## Resources 

[Pre-Test Questionaire](https://docs.google.com/forms/d/e/1FAIpQLSfcLzJ-PGOEKLCXJnfIAYudrniCwz_ROOA6tRDlv80ILDaQ9Q/viewform?usp=header)

[User Test Guide](https://docs.google.com/document/d/1MDITFQ17ozD3jxaWJT3qKDmcp6u9juWttqFR0zN1vyo/edit?usp=sharing)

[Post-Test Feedback](https://docs.google.com/forms/d/e/1FAIpQLScCLw_EYPZzxUtgntqoUzrs2dOsLd3wVT2Qhv-WV0OizTOiDw/viewform?usp=preview)
