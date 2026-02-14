# Mobile App Setup Guide - Quick Start

Follow these steps to get your React Native mobile app running with Android Studio Iguana.

## ✅ Step 1: Copy the Mobile Folder

Copy the entire `mobile` folder to your project directory where you have `web` and `backend` folders.

## ✅ Step 2: Install Node Modules

```bash
cd mobile
npm install
```

This will take a few minutes to download all dependencies.

## ✅ Step 3: Configure Backend Connection

Open `mobile/src/services/api.ts` and find this line:

```typescript
const API_BASE_URL = 'http://10.0.2.2:8080/api';
```

### For Android Emulator (Recommended for testing):
Keep it as is: `http://10.0.2.2:8080/api`
- `10.0.2.2` is a special IP that refers to your computer's localhost from the Android emulator

### For Physical Android Device:
1. Find your computer's IP address:
   - **Windows:** Open Command Prompt, run `ipconfig`, look for "IPv4 Address"
   - **Mac/Linux:** Open Terminal, run `ifconfig`, look for "inet" under your network interface

2. Change the URL to:
   ```typescript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:8080/api';
   // Example: http://192.168.1.100:8080/api
   ```

3. Make sure your phone is connected to the same WiFi network as your computer

## ✅ Step 4: Start Your Backend

Open a terminal in your backend directory and start the Spring Boot server:

```bash
cd backend
mvn spring-boot:run
```

Wait until you see: "Started BackendApplication"

## ✅ Step 5: Open in Android Studio

1. Launch Android Studio Iguana
2. Click "Open" (or File → Open)
3. Navigate to and select: `mobile/android`
4. Click OK

Android Studio will:
- Import the project
- Sync Gradle files (this takes a few minutes the first time)
- Index files

**Wait for "Gradle sync completed" message**

## ✅ Step 6: Create/Start Android Emulator

### Option A: Create a new emulator (if you don't have one)

1. In Android Studio, click the Device Manager icon (phone icon in toolbar)
2. Click "Create Device"
3. Select "Phone" → "Pixel 5" or any recent device
4. Click "Next"
5. Select "Tiramisu" (API 33) or latest available
6. Click "Next" then "Finish"
7. Click the Play button next to your device to start it

### Option B: Use existing emulator

1. Click Device Manager
2. Click Play button next to your device
3. Wait for the emulator to boot completely

## ✅ Step 7: Run the App

### Method 1: Using Android Studio (Easiest)

1. Wait for the emulator to fully boot
2. In Android Studio, click the green "Run" button (or press Shift+F10)
3. Select your emulator from the list
4. Click OK

### Method 2: Using Command Line

In the mobile directory:

```bash
# Make sure Metro bundler is NOT running yet
npm run android
```

This will:
- Start the Metro bundler
- Build the app
- Install it on the emulator
- Launch the app

## ✅ Step 8: Test the App

Once the app launches:

1. **Home Screen** - You should see "Welcome to Mini App"
2. Click **"Get Started"** → Goes to Register screen
3. **Register** a new account:
   - Full Name: Your Name
   - Email: test@example.com
   - Password: Test123 (must meet requirements)
   - Confirm Password: Test123
4. Click **"Register"**
5. You'll be redirected to Login
6. **Login** with the credentials you just created
7. You'll see the **Dashboard**
8. Click **"View Profile"** to see your profile
9. Click **"Edit"** to update your name
10. Click **"Logout"** to test logout functionality

## 🔧 Troubleshooting

### "Cannot connect to backend" or "Network Error"

**Problem:** App can't reach your Spring Boot server

**Solutions:**
1. Make sure backend is running on http://localhost:8080
2. Check the API_BASE_URL in `mobile/src/services/api.ts`:
   - Emulator: Use `http://10.0.2.2:8080/api`
   - Physical device: Use your computer's actual IP
3. Disable any firewall that might block port 8080
4. On Android device, make sure you're on the same WiFi network

### Metro Bundler won't start

**Problem:** Port 8081 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8081
kill -9 <PID>
```

### Gradle sync failed

**Solution:**
```bash
cd mobile/android
./gradlew clean
cd ../..
npm start -- --reset-cache
```

### "Command not found: npm"

**Problem:** Node.js not installed

**Solution:**
1. Download Node.js from https://nodejs.org/ (LTS version)
2. Install it
3. Restart your terminal
4. Run `node --version` to verify

### App crashes on launch

**Solutions:**
1. Check Metro bundler logs for errors
2. Check Android Studio logcat for crash logs
3. Try: `cd mobile && npm start -- --reset-cache`
4. Uninstall app from emulator and reinstall

### Cannot find Android SDK

**Solution:**
1. Open Android Studio Settings
2. Go to Languages & Frameworks → Android SDK
3. Note the SDK Location path
4. Set environment variable: `ANDROID_HOME` to that path

## 🎯 Development Workflow

Once everything is set up:

1. **Start Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Mobile App:**
   ```bash
   cd mobile
   npm start
   ```
   
3. **In another terminal:**
   ```bash
   npm run android
   ```

4. **Make changes to code** - Hot reload will update automatically!

5. To manually reload:
   - Press `r` in Metro terminal
   - Or press `Ctrl+M` in emulator → Reload

## 📱 Features to Test

- ✅ Registration with password validation
- ✅ Login with error handling
- ✅ Dashboard displays user info
- ✅ Profile viewing
- ✅ Profile editing
- ✅ Logout functionality
- ✅ Navigation between screens
- ✅ Form validation
- ✅ Error messages

## 🚀 Next Steps

1. Test all features thoroughly
2. Try on a physical Android device
3. Customize the UI to match your design
4. Add more features as needed

## 📖 Additional Resources

- React Native Docs: https://reactnative.dev/docs/getting-started
- React Navigation: https://reactnavigation.org/docs/getting-started
- Android Studio: https://developer.android.com/studio

## Need Help?

Check:
1. Backend logs in your backend terminal
2. Metro bundler logs in your mobile terminal
3. Android Studio logcat (View → Tool Windows → Logcat)
4. README.md for more detailed information

Happy coding! 🎉
