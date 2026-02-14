# Mini App - Mobile (React Native)

This is the React Native mobile application for Mini App, sharing the same backend as the web version.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Android Studio Iguana (as specified)
- JDK 17
- React Native development environment set up

## Project Structure

```
mobile/
├── android/               # Android native code
├── src/
│   ├── context/          # Auth context for state management
│   ├── screens/          # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── services/         # API services
│       ├── api.ts        # Axios configuration
│       └── authService.ts # Auth API calls
├── App.tsx               # Main app component
├── index.js              # App entry point
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Configure Backend URL

**IMPORTANT:** Update the API base URL in `src/services/api.ts`:

For Android Emulator:
```typescript
const API_BASE_URL = 'http://10.0.2.2:8080/api';
```

For Physical Device (find your computer's IP address):
```bash
# On Windows
ipconfig

# On Mac/Linux
ifconfig
```

Then update to:
```typescript
const API_BASE_URL = 'http://YOUR_IP_ADDRESS:8080/api';
// Example: http://192.168.1.100:8080/api
```

### 3. Start the Backend

Make sure your Spring Boot backend is running on port 8080:

```bash
cd ../backend
mvn spring-boot:run
```

### 4. Start Metro Bundler

In the mobile directory:

```bash
npm start
```

### 5. Run on Android

#### Option A: Using Android Studio

1. Open Android Studio
2. Open the `mobile/android` folder as a project
3. Wait for Gradle sync to complete
4. Click the "Run" button or press Shift+F10

#### Option B: Using Command Line

Make sure you have an Android emulator running or a device connected, then:

```bash
npm run android
```

## Features

- ✅ User Registration with validation
- ✅ User Login with JWT authentication
- ✅ Dashboard
- ✅ Profile management
- ✅ Secure token storage using AsyncStorage
- ✅ Automatic token refresh on API calls
- ✅ Navigation using React Navigation

## API Integration

The mobile app connects to the same Spring Boot backend as the web version:

- **Base URL:** `http://10.0.2.2:8080/api` (emulator) or `http://YOUR_IP:8080/api` (device)
- **Auth Endpoints:**
  - POST `/auth/register` - User registration
  - POST `/auth/login` - User login
  - POST `/auth/logout` - User logout
- **User Endpoints:**
  - GET `/user/profile` - Get user profile
  - PUT `/user/profile` - Update user profile
  - GET `/user/dashboard` - Get dashboard data

## Development

### Hot Reloading

React Native supports hot reloading. After making changes to your code:
- Press `r` in the Metro terminal to reload
- Or shake your device and select "Reload"

### Debugging

- Press `Ctrl+M` (Windows/Linux) or `Cmd+M` (Mac) in the emulator
- Or shake your physical device
- Select "Debug" to open Chrome DevTools

### Common Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint

# Clear cache
npm start -- --reset-cache
```

## Troubleshooting

### Cannot connect to backend

1. **Using Emulator:** Use `http://10.0.2.2:8080/api`
2. **Using Device:** 
   - Find your computer's IP address
   - Make sure device is on same WiFi network
   - Update API_BASE_URL to `http://YOUR_IP:8080/api`
   - Ensure backend allows CORS from your device IP

### Port already in use

```bash
# Kill process on port 8081 (Metro bundler)
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8081
kill -9 <PID>
```

### Gradle build errors

```bash
cd android
./gradlew clean
cd ..
npm start -- --reset-cache
npm run android
```

### Cannot find module errors

```bash
rm -rf node_modules
npm install
```

## Building for Production

### Generate Release APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Key Dependencies

- **React Native:** 0.76.6
- **React Navigation:** ^6.1.9 - Navigation
- **Axios:** ^1.6.5 - HTTP client
- **AsyncStorage:** ^1.21.0 - Local storage

## Authentication Flow

1. User enters credentials
2. App sends request to `/auth/login`
3. Backend validates and returns JWT token
4. Token stored in AsyncStorage
5. Token attached to all subsequent API requests
6. On 401 error, user redirected to login

## State Management

The app uses React Context API for state management:

- **AuthContext:** Manages authentication state
  - User info
  - JWT token
  - Login/logout/register methods
  - Token persistence

## Security

- Passwords validated on client and server
- JWT tokens stored securely in AsyncStorage
- Tokens automatically attached to API requests
- HTTPS should be used in production
- Token expiration handled automatically

## Next Steps

1. ✅ Basic authentication implemented
2. ✅ Profile management implemented
3. 🔄 Add more features as needed
4. 🔄 Implement proper error handling
5. 🔄 Add loading states
6. 🔄 Add offline support

## Support

For issues related to:
- **Backend:** Check Spring Boot logs
- **Mobile App:** Check Metro bundler logs
- **Android:** Check Android Studio logcat
