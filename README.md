# React Native Todo Task Management App

## Features
- Google Authentication
- Full CRUD for tasks (title, description, due date, status, priority)
- Attractive Material UI (React Native Paper)
- Offline support (AsyncStorage)
- Pull-to-refresh, swipe-to-delete, FAB
- Crash reporting (Sentry)

## Setup

1. Install dependencies:
   ```sh
   npm install
   npx expo install react-native-paper @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
   npx expo install expo-auth-session
   npm install @react-native-async-storage/async-storage
   npm install @sentry/react-native
   ```

2. Set your Google OAuth Client ID in `screens/LoginScreen.js`:
   ```js
   expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com"
   ```

3. Set your Sentry DSN in `sentry-expo.js`:
   ```js
   dsn: 'YOUR_SENTRY_DSN'
   ```

4. Run the app:
   ```sh
   npx expo start
   ```

## File Structure
- `App.js` - Main app entry
- `context/` - Auth and Task context providers
- `screens/` - Login, Task List, Add/Edit Task screens
- `components/` - TaskItem, TaskForm
- `sentry-expo.js` - Sentry crash reporting setup 