# Concrete Beam Test Mobile Application

React Native mobile application for calculating reinforced concrete beam capacity using Expo.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- **For iOS**: macOS with Xcode (iOS Simulator)
- **For Android**: Android Studio with Android Emulator
- **For Physical Device**: Expo Go app installed on your device

## Getting Started

### 1. Navigate to the Mobile directory

```bash
cd ConcreteBeamTest.Mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

Edit `app.json` and update the `apiBaseUrl` in the `extra` section:

**For iOS Simulator:**
```json
"extra": {
  "apiBaseUrl": "http://localhost:5233"
}
```

**For Android Emulator:**
```json
"extra": {
  "apiBaseUrl": "http://localhost:5233"
}
```
*(The app automatically converts `localhost` to `10.0.2.2` for Android)*

**For Physical Device:**
```json
"extra": {
  "apiBaseUrl": "http://YOUR_COMPUTER_IP:5233"
}
```
Replace `YOUR_COMPUTER_IP` with your computer's local IP address. Find it using:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 4. Start the development server

```bash
npm start
```

or

```bash
npx expo start --clear
```

### 5. Run on device/emulator

**Using Expo Go (Recommended for development):**
1. Install **Expo Go** app on your device from App Store (iOS) or Google Play (Android)
2. Scan the QR code shown in the terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

**Using Development Build:**
```bash
# For iOS
npx expo run:ios

# For Android
npx expo run:android
```

## Configuration

### API Connection

The mobile app connects to the backend API. Ensure:

1. **Backend is running** on `http://0.0.0.0:5233`
2. **API URL is correctly configured** in `app.json`
3. **Same network** for physical devices
4. **CORS is enabled** on the backend

### Platform-Specific Settings

**iOS Simulator:**
- Uses `localhost` directly
- No special configuration needed

**Android Emulator:**
- Automatically converts `localhost` to `10.0.2.2`
- Ensure backend is listening on `0.0.0.0`, not just `localhost`

**Physical Device:**
- Requires your computer's local IP address
- Both devices must be on the same WiFi network
- Firewall may need to allow connections on port 5233

## Project Structure

```
ConcreteBeamTest.Mobile/
├── src/
│   ├── api/
│   │   └── client.ts          # API client with platform detection
│   ├── components/
│   │   └── InputField.tsx     # Input field component
│   ├── screens/
│   │   ├── HomeScreen.tsx     # Main input screen
│   │   └── ResultsScreen.tsx  # Results display screen
│   └── types/
│       └── index.ts           # TypeScript types
├── App.tsx                     # Root component
├── app.json                    # Expo configuration
└── package.json
```

## Features

- ✅ Modern dark theme UI matching web version
- ✅ Platform-aware API URL configuration
- ✅ Separate results screen
- ✅ Input validation
- ✅ Error handling with helpful tips
- ✅ Smooth navigation between screens

## Troubleshooting

### "Network request failed" Error

1. **Check API URL** in `app.json`:
   - iOS Simulator: `http://localhost:5233`
   - Android Emulator: `http://localhost:5233` (auto-converts to `10.0.2.2`)
   - Physical Device: `http://YOUR_IP:5233`

2. **Verify backend is running**:
   - Check backend terminal for "Server listening on http://0.0.0.0:5233"
   - Test API in browser: `http://localhost:5233/swagger`

3. **Check network connectivity**:
   - Same WiFi network (for physical devices)
   - Firewall not blocking port 5233
   - Backend listening on `0.0.0.0`, not just `localhost`

### "PlatformConstants could not be found" Error

This indicates SDK mismatch:
- Ensure you're using **Expo SDK 52** (compatible with Expo Go)
- Clear cache and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npx expo start --clear
  ```

### "babel-preset-expo" Error

Install missing dependency:
```bash
npm install --save-dev babel-preset-expo
```

### Expo Go Compatibility Issues

- Update Expo Go app to latest version
- Ensure `expo` version matches Expo Go SDK (currently SDK 52)
- Try development build if Expo Go continues to fail:
  ```bash
  npx expo prebuild
  npx expo run:android  # or run:ios
  ```

## SDK Version

This project uses **Expo SDK 52** to ensure compatibility with Expo Go.

## Technologies

- **React Native 0.76.3**: Mobile framework
- **Expo SDK 52**: Development platform
- **TypeScript**: Type safety
- **Expo Constants**: Configuration access

