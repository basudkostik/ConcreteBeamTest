# Concrete Beam Test Web Application

Modern React web application for calculating reinforced concrete beam capacity.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

## Getting Started

### 1. Navigate to the Web directory

```bash
cd ConcreteBeamTest.Web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API URL

Create a `.env.local` file in the root directory (optional, defaults to `http://localhost:5233`):

```env
VITE_API_BASE_URL=http://localhost:5233
```

**Note:** If your API is running on a different port or machine, update this URL accordingly.

### 4. Run the development server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### 6. Preview production build

```bash
npm run preview
```

## Features

- ✅ Modern dark theme UI
- ✅ Responsive design (mobile and desktop)
- ✅ Real-time calculation
- ✅ CSV export
- ✅ PDF export (via browser print)
- ✅ Input validation
- ✅ Error handling

## Project Structure

```
ConcreteBeamTest.Web/
├── src/
│   ├── api.ts                # API client
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   ├── types.ts              # TypeScript types
│   ├── styles.css            # Global styles
│   └── components/
│       └── InputField.tsx    # Input field component
├── public/
│   └── docs/                 # Documentation files
└── package.json
```

## Configuration

### API Base URL

The default API URL is `http://localhost:5233`. To change it:

1. Create `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://your-api-url:port
   ```

2. Restart the dev server after changing the URL

### Export Features

- **CSV Export**: Downloads calculation results as CSV file
- **PDF Export**: Uses browser's print functionality (Press Ctrl+P or Cmd+P)

## Usage

1. Enter beam parameters:
   - `fck`: Concrete characteristic compressive strength (MPa)
   - `fyk`: Steel characteristic yield strength (MPa)
   - `b`: Section width (mm)
   - `h`: Section height (mm)
   - `d1`: Distance to top reinforcement center (mm)
   - `d2`: Distance to bottom reinforcement center (mm)
   - `As_top`: Top reinforcement area (mm²)
   - `As_bot`: Bottom reinforcement area (mm²)

2. Click **"Calculate"** button

3. View results in the results panel

4. Export results using **"Export CSV"** or **"Export PDF"** buttons

## Troubleshooting

### API Connection Failed

- Ensure the backend API is running
- Check the API URL in `.env.local`
- Verify CORS is enabled on the backend
- Check browser console for detailed error messages

### Build Errors

- Clear `node_modules` and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

## Technologies

- **React 18.3.1**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **CSS3**: Modern styling with gradients and animations

