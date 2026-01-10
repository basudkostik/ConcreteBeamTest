# Concrete Beam Test

A full-stack application for calculating reinforced concrete beam capacity, consisting of:
- **ASP.NET Core Web API** (Backend)
- **React Web Application** (Frontend)
- **React Native Mobile Application** (Mobile)

## Project Structure

```
ConcreteBeamTest/
├── ConcreteBeamTest.API/      # ASP.NET Core Web API
├── ConcreteBeamTest.Web/       # React Web Application
├── ConcreteBeamTest.Mobile/    # React Native Mobile Application
└── docs/                       # Documentation files
```

## Quick Start

### 1. Start the Backend API

```bash
cd ConcreteBeamTest.API
dotnet run --launch-profile http
```

API will be available at: `http://localhost:5233/swagger`

### 2. Start the Web Application

```bash
cd ConcreteBeamTest.Web
npm install
npm run dev
```

Web app will be available at: `http://localhost:5173`

### 3. Start the Mobile Application

```bash
cd ConcreteBeamTest.Mobile
npm install
npm start
```

Scan QR code with Expo Go app.

## Documentation

- [API README](./ConcreteBeamTest.API/README.md)
- [Web README](./ConcreteBeamTest.Web/README.md)
- [Mobile README](./ConcreteBeamTest.Mobile/README.md)

## Features

- ✅ Beam capacity calculation with neutral axis determination
- ✅ Automatic design strength calculation (fcd, fyd)
- ✅ Modern dark theme UI (Web & Mobile)
- ✅ CSV and PDF export (Web)
- ✅ Cross-platform mobile support (iOS & Android)
- ✅ Responsive design

## Technologies

**Backend:**
- ASP.NET Core 8.0
- C#

**Web Frontend:**
- React 18.3.1
- TypeScript
- Vite

**Mobile:**
- React Native 0.76.3
- Expo SDK 52
- TypeScript

## License

This project is part of an interdisciplinary engineering design course.

