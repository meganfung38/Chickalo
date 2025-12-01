# Chickalo User Testing Results Summary

> **Test Date**: November 20, 2025  
> **Participants**: 5 female testers, ages 21, diverse majors (Computer Science, Electrical Engineering, Industrial Engineering, Business)  
> **Test Location**: Home environment  
> **Duration**: ~2 hours (setup, testing, feedback)

---

## Form Responses 

**[Pre-Test Survey](https://docs.google.com/spreadsheets/d/1Vb1LVf6fg0Xf1tkWhSAQzLoU2leBhpqOhiI2qXFEr0M/edit?usp=sharing)**
**[Post-Test Survey](https://docs.google.com/spreadsheets/d/17VC5S7tsCij-Le1PcuPM1-NZoL2gWD_NFcVou8m3Vc4/edit?usp=sharing)**

---

## Executive Summary

The user testing session successfully validated Chickalo's core concept of anonymous, location-based social networking while revealing critical areas for improvement. All 5 participants completed registration, explored the app's features, and provided valuable feedback through guided scenarios and surveys.

**Key Findings:**
- **Concept Validation**: Testers understood and appreciated the app's purpose for networking and connecting with strangers
- **Privacy Controls**: Activity toggle was well-understood and appreciated (100% "Agree" or "Strongly Agree")
- **Technical Performance**: Location tracking reliability was the primary pain point
- **Feature Depth**: Limited functionality compared to established competitors (Snapchat Maps)
- **Average Likelihood to Use**: 6.6/10 (needs improvement for market viability)

---

## Participant Demographics

### Pre-Test Background

**Social Media Usage:**
- 80% (4/5) use social apps **daily**
- 20% (1/5) use social apps **weekly**
- **Most used apps**: Instagram (4), TikTok (2), Snapchat (1)

**What They Like About Social Apps:**
- **Passive consumption**: "Silently watch people's lives without needing to respond"
- **Algorithm-curated content**: Explore pages with personalized recommendations (food, beauty, local events)
- **Staying connected**: Feeling informed about friends, family, and current events
- **Discovery features**: Finding new places, restaurants, activities, shopping deals

**Location-Based App Experience:**
- 100% (5/5) have used location-based apps (Snapchat Maps, Pokémon GO)

**Location Tracking Comfort:**
- 80% (4/5): "Depends on what app it is"
- 20% (1/5): "Not Sure / Don't Care"
- **Key insight**: Context-dependent trust; no one selected "Not Comfortable" outright

---

## Detailed Testing Session Notes

### Scenario 1: New User Onboarding (15 min)

**Objective**: Evaluate ease of account creation and initial app understanding

**Script Used**: "Imagine you've just downloaded Chickalo. Explore the app and try to understand what it does without any guidance from me."

#### Observation Checklist Results:

| Observation | Result | Notes |
|-------------|--------|-------|
| User understands "Activity" toggle without explanation | All | All testers correctly identified the toggle's purpose within 30 seconds of exploring |
| User finds settings screen intuitively | All | All testers tapped their avatar in bottom right corner without prompting |
| User reads headline and understands its purpose | All | No comments |
| User attempts to customize avatar | Most | Some testers spent extra time randomizing multiple times, seemed engaged |
| User asks clarifying questions | Some | "Does deactivating activity remove my location from other people's apps or just disable my own map?" |

#### Task Completion:
1. **Navigate through login screen** - All testers completed without issues
2. **Create account** - All testers completed successfully (avg time: 45 seconds)
3. **Explore map screen (inactive state)** - All testers understood they were viewing a map
4. **Navigate to settings screen** - All testers found settings by tapping avatar
5. **Review profile information** - All testers reviewed username, headline, avatar

#### Questions Asked & Responses:

**Q1: "What do you think this app is for?"**
- Kaylie: "It looks like it's for finding people near you, like for networking or making friends"
- Jessie: "Maybe for meeting new people? The anonymous usernames make it seem like it's not for people you already know"
- Rin: "Connecting with people nearby, like at events or on campus"
- Anissa: "Location-based social app for meeting strangers"

**Q2: "What does the Activity toggle do?"**
- Kaylie: "Makes me visible to others on the map"
- Jessie: "Turns on location sharing so people can see me"
- Rin: "Controls whether I'm active or not, like online status"
- Anissa: "Makes me appear on other people's maps"

**Q3: "Was anything confusing or unclear?"**
- Kaylie: "Not really, it's pretty straightforward"
- Jessie: "I wasn't sure what would happen when I toggle activity on at first"
- Rin: "At first wasn't really sure what the app was meant for, map view is simple but plain, not much interactivity"
- Anissa: "Confused about whether my location is being tracked when I'm inactive" (Good question - clarified data deletion)

**Q4: "Did you feel comfortable navigating the app?"**
- All testers: Yes (unanimous)

#### Key Observations:
- Kaylie immediately tapped on avatar after registering - good discoverability
- Rin spent a lot of time randomizing her avatar, laughed at combinations
- Jessie noticed the grayscale effect on avatar, commented "Does the gray mean I'm inactive?"
- All testers completed registration within 60 seconds

#### Time Tracking:
- Average time to complete registration: 45 seconds
- Average time to find settings: 12 seconds
- Average time exploring before asking questions: 2 minutes
- Total scenario duration: 15 minutes

---

### Scenario 2: Activating and Discovering Nearby Users (20 min)

**Objective**: Test real-time location tracking and multi-user visibility

**Script Used**: "Now, let's turn your Activity ON and see what happens. Walk around this space and observe your map."

#### Technical Checks Results:

| Check | Result | Notes |
|-------|--------|-------|
| Avatar appears on map when Activity is ON | All | All avatars appeared, some with 3-5 second delay |
| Avatar border changes from orange → green | All | Color change was clear and immediate |
| User's location updates smoothly | Some | Experienced laggy updates |
| Other users appear within 30 seconds | Most | 3/5 testers within 30 secs > + 2/5 testers needed to toggle to settings and refresh map view in order for it to update |
| Tapping avatar opens UserInfoModal correctly | All | Modal displayed correctly with username, headline, pronouns |
| Avatar disappears when Activity is OFF | All | Confirmed by having testers check each other's screens |

#### Observation Checklist Results:

| Observation | Result | Notes |
|-------------|--------|-------|
| User notices border color change | All | No comments |
| User understands they are now "visible" | All | No comments |
| User finds other avatars on map | All | All successfully located nearby users |
| User attempts to tap on other avatars | All | All explored modal feature |
| User feels comfortable with location tracking | Most | Some expressed mild hesitation |

#### Questions Asked & Responses:

**Q1: "Did you feel your location was accurately represented?"**
- Kaylie: "Mostly, but there was a delay when I moved"
- Jessie: "It was okay, not super precise but good enough"
- Rin: "Yeah, it showed me in the right area"
- Anissa: "Yes, pretty accurate for the most part"

**Q2: "How quickly did you see other users appear?"**
- Kaylie: "Took maybe 5-10 seconds"
- Jessie: "Almost immediately, like 5 seconds"
- Rin: "Pretty fast"
- Anissa: "Within 5 seconds"

**Q3: "Did the map feel responsive?"**
- Kaylie: "Not really, it was a bit laggy"
- Jessie: "Sometimes. It got slow when I toggled between screens"
- Rin: "It was okay, could be smoother with following where I move"
- Anissa: "Mostly yes but the map view doesn't follow me"

**Q4: "Any concerns about privacy or location tracking?"**
- Kaylie: "I'm okay with it for testing, but I'd be careful using this in public"
- Jessie: "Not really, the toggle makes me feel in control"
- Rin: "A little. I'd want to know more about how location data is stored"
- Anissa: "I'm fine with it for private events, but not for everyday use in public"

**Q5: "What did you think of the speech bubbles above avatars?"**
- Kaylie: "They're cute and helpful for seeing what people want"
- Jessie: "I like them, but they overlap when people are close"
- Rin: "They're nice, gives context"
- Anissa: "Helpful for deciding who to talk to"

#### Key Observations:
- All testers toggled activity ON simultaneously - watched border colors change
- Kaylie's avatar took 8 seconds to appear on Jessie's map (technical note)
- Rin walked 15 feet away - avatar position updated with < 5 second delay
- Jessie tapped on Anissa's avatar - modal opened correctly, properly showed headline and pronouns
- Asked all testers to toggle OFF - confirmed disappearance from each other's maps within 3 seconds
- Kaylie navigated to settings and back - noted "the map reloaded when I came back"
- Rin, Jessie commented "The map doesn't follow my avatar when I move" - valid UX issue
- Tested speech bubble overlap - when Jessie & Rin stood close, bubbles overlapped
- OVERALL - location tracking finnicky, but works well enough for app

#### Technical Issues Noted:
1. **Location update latency**: 3-8 second delay observed
2. **Toggle responsiveness**: Sometimes took 2-3 seconds to switch states
3. **Page navigation**: Map reloads when returning from settings, losing zoom/position
4. **Headline overlap**: Speech bubbles overlap when users within ~10 feet

#### Time Tracking:
- Time to toggle activity ON: Instant
- Time for avatar to appear to others: 3-8 seconds (inconsistent)
- Time to discover nearby users: 10-20 seconds
- Time spent exploring map: 12 minutes
- Total scenario duration: 20 minutes

---

### Scenario 3: Profile Customization (15 min)

**Objective**: Test settings interface and profile update functionality

**Script Used**: "Let's personalize your profile. Navigate to Settings and make some changes."

#### Technical Checks Results:

| Check | Result | Notes |
|-------|--------|-------|
| Headline updates in real-time on map | All | Updates appeared after  < 2 seconds |
| Pronouns save successfully | All | All saved without errors |
| Avatar randomization works | All | All testers randomized multiple times |
| Manual avatar customization saves | All | Custom avatars persisted |
| Changes persist after navigating away | All | Verified by returning to settings |

#### Observation Checklist Results:

| Observation | Result | Notes |
|-------------|--------|-------|
| User finds customization options intuitive | All | All navigated options without help |
| User enjoys avatar randomization feature | All | Testers spent 2-3 min randomizing |
| User understands headline's social purpose | All | All entered relevant headlines |
| User saves changes without confusion | All | Save button clearly visible |

#### Task Completion:
1. **Navigate to Settings screen** - All testers completed instantly
2. **Update headline to "Looking for study partners for CSC 203"** - All testers completed (avg time: 20 seconds)
3. **Update pronouns to "they/them"** - All testers completed
4. **Tap "Randomize Avatar" 2-3 times** - All testers completed (some did 5+ times!)
5. **Manually customize avatar** - All testers explored at least 3 customization categories
6. **Save changes** - All testers tapped "Save Profile" successfully
7. **Return to Map screen to verify headline** - All testers verified headline appeared in speech bubble

#### Questions Asked & Responses:

**Q1: "Was it easy to customize your profile?"**
- Kaylie: "Yes, very easy. Everything was clearly labeled"
- Jessie: "Super easy, I liked the randomize button"
- Rin: "Yeah, no issues at all"
- Anissa: "Easy and fun"

**Q2: "Did you enjoy the avatar customization options?"**
- Kaylie: "Yes! The avatars are really cute"
- Jessie: "I loved it, I kept randomizing to see different combinations"
- Rin: "The customization is fun, I wish there were more options though"
- Anissa: "Definitely, the avatars are adorable"

**Q3: "Do you feel the headline feature is useful?"**
- Kaylie: "Yes, it gives context about what someone wants or is doing"
- Jessie: "For networking purposes, definitely useful"
- Rin: "Yeah, it helps break the ice"
- Anissa: "Yes, it's the main way to understand someone's intentions"

**Q4: "Would you add more customization options? If so, what?"**
- Kaylie: "Maybe clothing options or accessories"
- Jessie: "Different avatar styles, like more hair options"
- Rin: "Background patterns or themes"
- Anissa: "Different avatar art styles, maybe more realistic or cartoonish options"

#### Key Observations:
- All testers immediately navigated to settings by tapping avatar
- Jessie randomized avatar 7 times, enjoyed at combinations
- Kaylie asked "Can I change my username?" - no, they are randomized, maybe clarify
- All testers updated headline to testing prompt without issues
- Rin spent extra time manually customizing hair and eyes
- Anissa entered pronouns "she/her" (testing own preference)
- All testers clicked "Save Profile" - confirmation appeared
- Returned to map screen - verified headlines appeared above avatars
- Kaylie went back to settings - confirmed changes persisted

#### Time Tracking:
- Time to navigate to settings: <3 seconds (all)
- Time spent randomizing avatar: 2-4 minutes (avg 3 min)
- Time to update headline: 15-30 seconds
- Time to update pronouns: 10-20 seconds
- Time to save changes: 5 seconds
- Total scenario duration: 15 minutes

---

### Scenario 4: Social Interaction Simulation (20 min)

**Objective**: Test real-world use case inspired by proposal user stories

**Script Used**: "Let's simulate a real scenario. Imagine you're at Cal Poly's 1901 Marketplace, and you missed your Physics class. You need to find a lab partner."

#### Role Assignments:
- **Kaylie**: "Need a Physics lab partner! Fraser's 9am section"
- **Jessie**: "Have room in my Physics lab group!"
- **Rin**: "Newly moved to SLO, looking for friends"
- **Megan**: "Anyone want to study together?"
- **Anissa**: "At the career fair, let's network!"

#### Observation Checklist Results:

| Observation | Result | Notes |
|-------------|--------|-------|
| Users actively read each other's headlines | All | All read headlines before approaching |
| Users understand the social utility | All | All verbalized understanding of matching |
| Users feel comfortable approaching each other based on app info | Most | Rin hesitated slightly |
| Users provide feedback on headline character limits | Some | Kaylie & Jessie wanted longer headlines |
| Users suggest additional features for interaction | All | All mentioned messaging |

#### Task Completion:
1. **Update headline to assigned role** - All testers completed
2. **Turn Activity ON** - All testers completed
3. **Walk around the test location** - All testers moved around space
4. **Look for other users with relevant headlines** - All testers identified matches
5. **Tap on a user's avatar to view their profile** - All testers used modal feature
6. **Tap on own avatar to verify navigation to Settings** - All testers confirmed

#### Questions Asked & Responses:

**Q1: "Did you feel the headline helped you understand other users?"**
- Kaylie: "Yes, I immediately looked for someone with a matching Physics headline"
- Jessie: "Definitely, it's the main piece of information about someone"
- Rin: "Yeah, without it I wouldn't know why they're there"
- Anissa: "Absolutely, it's essential for this app"

**Q2: "Would you actually use this app in this scenario?"**
- Kaylie: "Maybe on campus for finding study partners, but I'd need messaging, maybe during WOW week even"
- Jessie: "I'd use it at networking events where there's already a crowd"
- Rin: "Probably not alone, but if I was with friends at an event, yes"
- Anissa: "At specific events like career fairs or parties, yes"

**Q3: "What would make you more likely to approach someone?"**
- Kaylie: "If I could message them first to break the ice"
- Jessie: "Knowing we have mutual friends or similar interests beyond just the headline"
- Rin: "If the app had more users so I didn't feel like one of the only people using it"
- Anissa: "More information in their profile, like major or interests"

**Q4: "Do you feel safe and comfortable using this feature?"**
- Kaylie: "In controlled settings like campus or events, yes. But not at a random cafe"
- Jessie: "I'd feel safer if there was a way to block or report users"
- Rin: "Only if I'm with friends or in a safe place like school"
- Anissa: "I'd need to trust that bad actors can be removed from the app"

**Q5: "Would messaging be a necessary addition?"**
- All testers: **YES** (unanimous and emphatic)
- Kaylie: "It's essential. I wouldn't just walk up to someone without some online interaction first"
- Jessie: "100%. That's how I'd break the ice before talking in person"
- Rin: "It would make the app way more useful"
- Anissa: "I can't imagine using this without messaging"

#### Key Observations:
- Kaylie spotted Jessie's matching "Physics lab group" headline 
- Rin (new to SLO) wasn't matched with anyone - good real-world scenario test
- Anissa tapped on Megan's avatar to view study buddy headline + pronouns (since she prefers a female study buddy)
- Kaylie & Jessie walked toward each other in real life to simulate approach - successful match
- Rin commented "I feel like I'm just standing here waiting for someone to notice me"
- Asked all testers how they'd actually make contact - all said "I'd message them first or go up to them in person"
- Discussed headline character limit - wanted more space? 
- All testers tapped their own avatar - confirmed navigation to settings
- Group discussed use cases: parties (all), campus (all), public cafes (1 tester)

#### Unsolicited Comments:
- Kaylie: "This is fun for role-play, but in real life I'd be too shy to approach without messaging first"
- Jessie: "I like the concept but it needs more features to compete with other apps"
- Rin: "What if no one has a matching headline? Then I just feel awkward being active"
- Anissa: "I'd use this at club or conferences or professional networking events"

#### Time Tracking:
- Time to update headlines: 30 seconds
- Time to identify matching headlines: 1-2 minutes
- Time spent walking around exploring: 10 minutes
- Time discussing use cases: 6 minutes
- Total scenario duration: 20 minutes

---

### Scenario 5: Privacy and Safety (10 min)

**Objective**: Assess user concerns about location privacy and anonymity

**Script Used**: "Let's talk about privacy. Toggle your Activity OFF and observe what happens."

#### Technical Checks Results:

| Check | Result | Notes |
|-------|--------|-------|
| Avatar turns grayscale when inactive | All | Instant color change |
| Avatar disappears from other users' maps within 5 seconds | All | Confirmed by cross-checking devices |
| No location updates sent when inactive | All | Verified in backend logs |
| Activity toggle is easily accessible | All | All found toggle without help |

#### Questions Asked & Responses:

**Q1: "Do you feel you have enough control over your visibility?"**
- Kaylie: "Yes, the toggle makes it easy to control"
- Jessie: "Definitely, I like that it's just one tap"
- Rin: "Yeah, as long as it actually deletes my location when I go off"
- Anissa: "Yes, but I'd want more granular controls like 'friends only' mode"

**Q2: "Are you comfortable with the app tracking your location when active?"**
- Kaylie: "In certain situations, yes. But not all the time"
- Jessie: "I'm okay with it for short periods, like at an event"
- Rin: "Only if I'm in a safe, crowded place"
- Anissa: "Depends on the context - campus is fine, random public places, not so much"

**Q3: "Would you want additional privacy features? (e.g., block users, hide from specific people)"**
- All testers: **YES**
- Kaylie: "Block and report features are necessary"
- Jessie: "I'd want to hide from certain people or only show to friends"
- Rin: "Definitely block and maybe a 'do not disturb' mode"
- Anissa: "Friends-only mode where I'm anonymous to strangers but visible to friends"

**Q4: "Do you trust that your location is deleted when you go inactive?"**
- Kaylie: "I trust it for this test, but I'd want to see privacy documentation"
- Jessie: "I assume so? I'd need clear info about data retention"
- Rin: "I'd want to verify that in the app's privacy policy"
- Anissa: "I'd need proof - maybe a confirmation message when I go inactive"

**Q5: "Would you use this app in your daily life?"**
- Kaylie: "Not daily, but for specific events or situations"
- Jessie: "Maybe weekly for social events"
- Rin: "Only in safe, controlled environments"
- Anissa: "I'd use it for networking events, not everyday use"

#### Key Observations:
- All testers except one toggled activity OFF simultaneously
- Confirmed that one user who is still active saw all other users disappear within 3-5 seconds
- Watched avatars turn grayscale on own devices
- Rin asked "How do I know my location isn't still being tracked?" - important trust question
- Discussed scenario: "Would you use this alone at Starbucks?" - All said probably no
- Discussed scenario: "Would you use this at a party with friends?" - All said yes
- Kaylie expressed concern: "I'd be worried about stalkers or creeps"
- Anissa suggested: "What if there was a panic button that immediately turns you off and alerts someone?"
- Overall agreeement: adjusting to having location services enabled would take a large user base that proves that this app is used normally (like Uber; people trust it since it is so normalized to)

#### Privacy Concerns Summary:
1. **Stalking/Safety**: 4 testers mentioned concern about "creeps" or "weird people"
2. **Data Transparency**: All testers want clear documentation of data deletion
3. **Trust in Toggle**: All testers trust the toggle works, but want confirmation
4. **Contextual Use**: All prefer closed/controlled environments over open public spaces

#### Safety Feature Requests:
- Block user (all testers mentioned)
- Report user (most testers mentioned)
- Friends-only mode (3 testers mentioned)
- Emergency "disappear" button (1 tester mentioned)
- Location deletion confirmation (2 testers mentioned)

#### Time Tracking:
- Time to toggle activity OFF: Instant
- Time to confirm disappearance: 5 seconds
- Time discussing privacy concerns: 8 minutes
- Total scenario duration: 10 minutes

---

### Scenario 6: Password Reset Flow (10 min)

**Objective**: Test forgot password functionality

**Script Used**: "Let's test the password reset feature. Log out and request a password reset."

#### Technical Checks Results:

| Check | Result | Notes |
|-------|--------|-------|
| Email validation works | All | Invalid emails rejected |
| Reset code email is sent (check backend logs) | All | All codes generated successfully |
| Token verification works | All | Valid tokens accepted, invalid rejected |
| Password reset successful | All | All reset passwords successfully |
| Can log in with new password | All | All logged back in |

#### Task Completion:
1. **Navigate to Settings → Log Out** - All testers completed
2. **On login screen, tap "Forgot password?"** - All testers found link
3. **Enter email address** - All testers entered correct emails
4. **Check email for reset code** - Simulated by providing code from backend logs
5. **Enter reset code** - All testers entered 6-digit codes
6. **Set new password** - All testers created new passwords
7. **Log back in** - All testers logged in with new credentials

#### Questions Asked & Responses:

**Q1: "Was the password reset process straightforward?"**
- Kaylie: "Yes, very clear steps"
- Jessie: "Simple and easy to follow"
- Rin: "No issues, worked smoothly"
- Anissa: "Straightforward, no confusion"

**Q2: "Did you understand each step?"**
- All testers: Yes (unanimous)

**Q3: "Would you prefer a different method (e.g., link instead of code)?"**
- Kaylie: "Either works, but codes are fine"
- Jessie: "I'm used to codes from other apps, this is standard"
- Rin: "A link might be slightly easier, but codes work"
- Anissa: "Current method works fine"

#### Key Observations:
- All testers logged out without issues
- All found "Forgot password?" link immediately (good visibility)
- One tester entered invalid email format - received error message (validation working)
- All entered valid emails - "Request Reset Code" button worked
- Checked backend logs - 5 reset tokens generated, noted expiration (15 min)
- Provided codes to testers - all entered successfully
- One tester intentionally entered wrong code - received error (validation working)
- All entered correct codes - navigated to reset password screen
- All created new passwords (min 6 characters)
- All logged back in with new credentials - successful

#### Time Tracking:
- Time to log out: 5 seconds
- Time to request reset code: 30 seconds
- Time to enter code and reset password: 1 minute
- Time to log back in: 20 seconds
- Total scenario duration: 10 minutes

---

## Post-Test Debrief Session

### Immediate Group Discussion (15 min)

**Script Used**: "Thank you for testing Chickalo! Let's have a quick group discussion about your experience."

#### Discussion Question 1: "What was your first impression of the app?"

- **Kaylie**: "It's cute and simple. I like the concept of anonymous networking. The avatars are adorable"
- **Jessie**: "It feels like Snapchat Maps but for strangers. Clean interface, easy to understand"
- **Rin**: "Fun to use, especially the avatar customization. But it's pretty basic right now"
- **Anissa**: "Looks polished for a prototype. The use case makes sense"

#### Discussion Question 2: "What feature stood out to you the most?"

- **Kaylie**: "The Activity toggle - I really like having control"
- **Jessie**: "Avatar customization, it's really well done"
- **Rin**: "The anonymity aspect - using random usernames instead of real names"
- **Anissa**: "The map interface is clean and intuitive"

#### Discussion Question 3: "What was the most confusing part?"

- **Kaylie**: "At first I wasn't sure if my location was being tracked when inactive"
- **Jessie**: "The lag in location updates was confusing - I'd move but my avatar wouldn't immediately"
- **Rin**: "I didn't know what to do after seeing people on the map. Like, now what? Also the map wasn't always properly centered around my location. As my avatar updated to represent my location on the app, the map would fail to move with me. I did it manually"
- **Anissa**: "Nothing was super confusing, features are limited so not much to say about what is currently implemented"

#### Discussion Question 4: "Would you actually use this app? In what situations?"

**Consensus Areas (all agreed):**
- College campus (finding study partners, lab partners, project groups)
- Networking events (career fairs, conferences, professional meetups)
- Private parties/events (friends' parties, club gatherings)
- NOT: Public spaces alone (cafes, malls, parks)
- NOT: Daily/regular use (not "addicting" enough yet)

**Individual Responses:**
- **Kaylie**: "I'd use it during Week of Welcome or at club meetings, but not randomly at Starbucks"
- **Jessie**: "Maybe at events where I'm already trying to meet people, like orientation or socials"
- **Rin**: "I'd only use it if a lot of my friends were also using it. I wouldn't want to be the only person active"
- **Anissa**: "Professional networking events or large social gatherings. Definitely not alone in public"

#### Discussion Question 5: "Any concerns or red flags?"

**Safety Concerns (primary theme):**
- **Kaylie**: "I'd be worried about stalkers knowing where I am, even if I'm anonymous"
- **Jessie**: "What if someone recognizes me by my headline or location patterns?"
- **Rin**: "I'd need better safety features like blocking and reporting before feeling fully comfortable"

**Technical Concerns:**
- **Kaylie**: "The location tracking needs to be more reliable"
- **Jessie**: "The app is a bit slow when navigating between screens"
- **Anissa**: "Sometimes it lagged when multiple people were active"

**Feature Gaps:**
- **Rin**: "Without messaging, I don't know how I'd actually connect with someone"
- **Anissa**: "It feels a little incomplete - like a proof of concept"

### Open Discussion Themes

#### **Theme 1: Messaging is Essential (Unanimous Agreement)**

Discussion organically turned to messaging feature

- **Jessie**: "How would I even talk to someone I see on the map? Just walk up to them?"
- **Anissa**: "Too awkward. I'd need to message them first"
- **Kaylie**: "Yeah, I wouldn't approach a stranger without some online interaction first"
- **Rin**: "Instagram has DMs, Snapchat has chat - this needs it too"

**Me**: "So if messaging was added, would you use it more?"  
**All testers**: YES

---

#### **Theme 2: Comparison to Snapchat Maps**

Testers began comparing to existing apps

- **Jessie**: "It's basically Snap Maps but anonymous?"
- **Me**: "Kind of, but Snap Maps is for finding your friends. This is for finding strangers"
- **Anissa**: "So the anonymity is the differentiator?"
- **Me**: "Yes, it's for meeting new people, not tracking friends"
- **Rin**: "That makes sense for networking, but Snap Maps also has messaging"

**Key Insight**: Testers understand the differentiation but expect feature parity with competitors

---

#### **Theme 3: Critical Mass & Network Effects**

Discussion of user base requirements

- **Rin**: "What if I'm the only person using this at an event? The app needs a large audience for it to be useful"
- **Kaylie**: "Yeah, I'd need to know a lot of people are on it before I'd turn activity on"
- **Me**: "Maybe launch at specific events first? Like promote it at a career fair so everyone downloads it"
- **Jessie**: "Or start with one college campus, get a bunch of students, then expand"

---

#### **Theme 4: Business Model & Monetization**

Testers brought up future features unsolicited

- **Me**: "What if businesses could use this to promote deals? Like 'Happy hour at this restaurant'"
- **Anissa**: "Oh that's cool - like sponsored avatars or something"
- **All**: "I'd actually want that - like find coffee shops with student discounts nearby"
- **All**: "Similar to how Instagram has business accounts"
- **Rin**: "But don't make it spammy, I'd want to filter business accounts"

**Notes**: Unsolicited discussion of business features shows engagement with app's potential

---

#### **Theme 5: Friend System Hybrid Approach**

Testers suggested combining anonymous + friends features

- **Jessie**: "What if you could add people you meet as friends?"
- **Rin**: "Yeah, like you're anonymous to strangers but can friend people you like"
- **Kaylie**: "Then your friends would see your real name instead of the random username"
- **Anissa**: "That would make me use it more - I want to see my friends AND meet new people"
- **Me**: "And maybe a 'friends-only' mode where you're only visible to friends"

**Notes**: Hybrid model (anonymous public + friends layer) resonates strongly

---

#### **Theme 6: Use Case Specificity**

Discussion of target scenarios

**Scenarios Ranked by Comfort Level:**

1. **Private parties** (all comfortable)
   - "I'd definitely use this at a house party"
   - "Especially parties where I don't know everyone"

2. **Campus/school** (all comfortable)
   - "Perfect for finding study groups"
   - "Would use during WOW or club rush"

3. **Professional events** (most comfortable)
   - "Career fairs would be great for this"
   - "Conferences or networking events"

4. **Public events** (some comfortable)
   - "Maybe at concerts or festivals"
   - "Only if it's crowded"

5. **Open public spaces** (1 tester comfortable)
   - "No way I'd use this at a random cafe alone"
   - "Too risky, feels unsafe"

---

### Final Takeaways from Debrief

1. **Concept is validated** - all testers understood and liked the core idea
2. **Messaging is non-negotiable** - unanimous agreement it's essential for next phase
3. **Safety concerns are real** - need block/report, transparency, contextual use cases
4. **Technical polish needed** - location tracking lag is the #1 technical complaint
5. **Network effects matter** - testers won't use it unless others are already using it
6. **Hybrid approach appeals** - combining anonymous public + friends features resonates

---

## Quantitative Usability Scores (1-5 Scale)

| Statement | Avg Score | Distribution |
|-----------|-----------|--------------|
| The app was easy to navigate | **3.8/5** | Agree (3), Somewhat Agree (2) |
| I understood the purpose of the Activity toggle | **4.4/5** | Strongly Agree (2), Agree (3) |
| The map interface was intuitive | **3.8/5** | Agree (4), Somewhat Agree (1) |
| Profile customization was straightforward | **4.4/5** | Strongly Agree (2), Agree (3) |
| I felt in control of my privacy | **3.8/5** | Agree (2), Somewhat Agree (3) |
| The app responded quickly to my actions | **3.0/5** | Somewhat Agree (2), Somewhat Disagree (3) |
| The speech bubbles above avatars were helpful | **3.8/5** | Agree (4), Somewhat Agree (1) |
| I would recommend this app to a friend | **3.6/5** | Agree (2), Somewhat Agree (3) |

**Overall Average Usability Score: 3.8/5** (Above critical success threshold of 3.5/5)

**Key Takeaway**: App responsiveness (3.0/5) was the weakest metric, directly correlating with location tracking performance issues.

---

## Qualitative Feedback Analysis

### What Testers Liked Most

1. **Concept & Purpose** (3 mentions)
   - "I like the overall concept of the app, to help people feel more connected in public spaces"
   - "The idea for the app is really good"
   - "It was fun to test out and act out the scenarios"

2. **Avatar Customization** (4 mentions)
   - "I liked the cute avatars that we could customize"
   - "Avatars are super cute"
   - "Everything in the settings page works perfectly"

3. **Use Case Potential**
   - "Great for networking purposes"
   - "Useful tool for all the use cases we played out"

---

### What Frustrated Testers Most

#### 1. **Location Tracking Performance** (4 testers mentioned this)
   - "Location tracking was spotty and not as smooth as it needs to be"
   - "The location tracking is a bit finicky"
   - "The app is still in its very early stage"
   - "Has a hard time loading when toggling between pages"

#### 2. **Limited Features** (4 testers mentioned this)
   - "Does not have many functions besides the map and profile editing"
   - "Features are limited so app isn't really entertaining or addicting to use"
   - "Right now there isn't much you can do on the app"
   - "Works exactly like how Snapchat Maps works but doesn't really serve the proposed purpose"

#### 3. **UI/UX Issues** (2 testers mentioned)
   - "The map visual doesn't really follow your avatar around based off location"
   - "Headlines were overlapping with other users"
   - "Bubble headline text is cute but distracts and serves no actual purpose (with current features)"

---

### Most Requested Features

#### **Messaging/Communication (all testers mentioned this)**
- "Chats with other users"
- "Allowing users to message each other should be the next feature"
- "Would help break the ice between users before talking in person"
- "Make the app feel more social than visual"

#### **Friend System (3 testers mentioned)**
- "Allowing users to friend other users they know and seeing them on the map with their actual name"
- "Option to be active but only for people who are your friends"
- "More interactive features like friends"

#### **Map Enhancements (2 testers mentioned)**
- "The map visual should have a cap for how far away a user can explore (7-10 miles)"
- "More interactive features"
- "Event pinning, building markers for parties"

#### **Business/Influencer Features (2 testers mentioned)**
- "Business users that can promote their deals/products"
- "I'd use it to find deals near me"
- "Special avatar features (business account, influencer account)"

---

## Safety & Trust Analysis

### "Did you feel safe using this app? Why or why not?"

**Positive Responses:**
- "Yes, activity toggle works as intended"
- "For the most part yes"
- "Yes I think"

**Conditional/Hesitant Responses:**
- "As long as my activity toggle works as intended **and a large enough user base is established**, I think I would be comfortable" 
- "Not sure how safe I feel turning my activity on if I were to use this app in a public space" 
- "I'd only use it if I were with friends at a party, private event, and maybe school" 
- "I honestly don't share my location regularly on apps" 

**Stated Fears:**
- "Stalking, weird people knowing where I am"
- "I'd be scared to use this app in public spaces like cafes, malls"

**Key Insight**: Privacy **controls** (Activity toggle) work well, but **social safety** concerns persist. Users need:
1. Critical mass of users to feel less "exposed"
2. Additional safety features (block, report, friend-only mode)
3. Clear use case boundaries (events/campus vs. open public)

---

## Likelihood to Use in Real Life (1-10 Scale)

| Tester | Score | Comments |
|--------|-------|----------|
| Kaylie | 6/10 | "If the location tracking was improved and users were able to message other users" |
| Jessie | 7/10 | "If everything worked as intended and seamlessly" |
| Rin | 5/10 | "Great app but I'd need to get use to the idea of sharing my location with the public. I'd need a large audience" |
| Anissa | 8/10 | "If there were more features: messaging, friend requests, special avatar features" |

**Average: 6.5/10** (below desired success criteria of ≥7/10)

**Analysis**: Testers see potential but require:
1. Technical improvements (location tracking)
2. Feature expansion (messaging, friends)
3. User base growth (network effects)

---

## How Testers Described Chickalo

**Analogies Used:**
- "An app like Snap Maps, only everyone is anonymous and is more targeted towards meeting new people"
- "Chickalo is an app that allows you to anonymously meet people and explore your surroundings"
- "A fun app to connect with strangers in person"
- "Simple app that is great for networking purposes"

**Key Themes:**
- **Anonymity** is the differentiator from Snapchat Maps
- **Networking** is the primary understood use case
- **In-person connection** is the value proposition

---

## Success Metrics Evaluation

### Critical Success Criteria (Must Pass)
- All testers successfully created accounts
- All testers could toggle Activity ON/OFF
- Most testers saw other nearby users on map
- 0 app crashes during testing
- Average usability score ≥ 3.5/5 (achieved 3.8/5)

**Result: ALL CRITICAL CRITERIA MET**

---

### Desired Success Criteria (Nice to Have)
- [YES] All testers completed all scenarios without help
- [NO] Average "likelihood to use" score ≥ 7/10 (achieved 6.5/10)
- [YES] Most testers say they would recommend the app (3.6/5 avg = "Somewhat Agree")
- [PARTIAL] No major privacy concerns raised (concerns exist, but mitigated by toggle)
- [YES] Testers provided at least 10 actionable feature suggestions (exceeded)

**Result: 3/5 DESIRED CRITERIA MET**

---

### Red Flags (Require Immediate Attention)
- No red flags triggered
- Location tracking issues noted but not critical enough to halt usage
- Privacy concerns exist but are contextualized (public vs. private spaces)

---

## Technical Performance Issues

### Location Tracking Problems Identified
1. **Update Latency**: Delay between movement and avatar position update
2. **Toggle Responsiveness**: Slow transition between active/inactive states
3. **Page Navigation Impact**: "Hard time loading when toggling between pages"
4. **Map Following**: "Map visual doesn't follow your avatar around"

**Impact**: Directly lowered "app responded quickly" score to 3.0/5

---

### UI/UX Issues Identified
1. **Headline Overlap**: Speech bubbles overlap when multiple users are close
2. **Map Boundaries**: Users can pan too far from their current location
3. **Visual Hierarchy**: Headlines may distract from core map interaction

---

## Feature Requests Prioritized by Frequency

| Feature | Mentions | Priority |
|---------|----------|----------|
| **Messaging/Chat** | All testers | Critical |
| **Friend System** | 3 testers | High |
| **Map Enhancements** | 2 testers | Medium |
| **Business/Influencer Accounts** | 2 testers | Medium |
| **Safety Features** (block, report) | Implied | High |

---

## User Persona Insights

### Ideal Use Cases Identified by Testers

**Comfortable/Likely to Use:**
- Networking events (career fairs, conferences)
- College campus (finding study partners, lab partners)
- Private parties/events
- Social gatherings with friends present

**Uncomfortable/Unlikely to Use:**
- Open public spaces (cafes, malls, parks) when alone
- Indefinite/always-on location sharing
- Situations without social proof (being the only active user)

### User Motivations (from social media preferences)
- **Discovery**: Finding new places, restaurants, events
- **Passive engagement**: Watching/observing without needing to interact
- **Curated content**: Algorithm-driven recommendations
- **Community building**: Feeling connected to a broader social circle

**Implication for Chickalo**: Consider adding discovery features (popular hangouts, event markers) and passive engagement options (view-only mode?)

---

## Strengths to Highlight

1. **Concept Validation**: Users understood and appreciated the app's unique value proposition
2. **Privacy Controls**: Activity toggle was intuitive and effective
3. **Avatar System**: Customization was universally praised
4. **No Critical Failures**: Zero crashes, all users completed tasks successfully
5. **Actionable Feedback**: Testers provided specific, implementable feature requests

---

## Weaknesses to Address

1. **Performance**: Location tracking reliability needs improvement
2. **Feature Depth**: App feels incomplete without messaging/friends
3. **Safety Perception**: Users hesitant to use in truly public spaces
4. **Market Differentiation**: Too similar to Snapchat Maps without additional features
5. **Engagement**: Not "addicting" or "entertaining" enough for regular use

---

## Final Testing Statistics

- **Total Participants**: 5
- **Completion Rate**: 100%
- **Average Session Time**: ~2 hours
- **Crashes**: 0
- **Critical Bugs Found**: 0
- **Feature Requests Collected**: 15+
- **Overall Satisfaction**: 3.8/5 (76%)
- **Recommendation Likelihood**: 3.6/5 (72%)
- **Real-Life Usage Intent**: 6.5/10 (65%)

---

## Conclusion

The user testing session successfully validated Chickalo's core concept while revealing critical gaps in functionality and performance. The app's privacy-first approach and avatar customization were well-received, but location tracking reliability and lack of interactive features (messaging, friends) limit its market readiness.

**Key Insight**: Users don't just want to **see** people nearby—they want to **connect** with them. The app currently provides visual awareness but lacks the social glue (messaging, friending) that would make it indispensable.

**Path Forward**: Prioritize technical stability (location tracking), implement messaging as the next critical feature, and target closed communities (college campuses, private events) for initial launch to build critical mass and social proof before expanding to open public use.

The testing session confirmed that Chickalo solves a real problem (anonymous networking) but must evolve beyond a "visual map" to become a full-fledged social platform.



