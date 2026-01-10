# Concrete Beam Test API

ASP.NET Core Web API for calculating reinforced concrete beam capacity.

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or higher
- Visual Studio / Visual Studio Code / Rider (optional)

## Getting Started

### 1. Navigate to the API directory

```bash
cd ConcreteBeamTest.API
```

### 2. Restore dependencies

```bash
dotnet restore
```

### 3. Run the application

**Using HTTP profile (recommended for development):**
```bash
dotnet run --launch-profile http
```

**Using HTTPS profile:**
```bash
dotnet run --launch-profile https
```

The API will start and listen on:
- HTTP: `http://0.0.0.0:5233` (accessible from mobile devices and network)
- HTTPS: `https://localhost:7146` and `http://localhost:5232`

### 4. Access Swagger UI

Once the server is running, open your browser and navigate to:
- HTTP: `http://localhost:5233/swagger`
- HTTPS: `https://localhost:7146/swagger`

## API Endpoint

### POST `/api/Beam`

Calculate beam capacity based on input parameters.

**Request Body:**
```json
{
  "fck": 30,
  "fyk": 420,
  "b": 300,
  "h": 500,
  "d1": 50,
  "d2": 200,
  "As_top": 600,
  "As_bot": 1200
}
```

**Response:**
```json
{
  "x": 74.09,
  "a": 62.98,
  "fcd": 20.0,
  "fyd": 365.22,
  "es": 200000,
  "epsilon_cu": 0.003,
  "eps_s_top": 0.000975,
  "eps_s_bot": 0.005098,
  "fs_top": 195.11,
  "fs_bot": 365.22,
  "fc_kN": 321.20,
  "fs_top_kN": 117.06,
  "fs_bot_kN": 438.26,
  "m_rd_kNm": 71.685
}
```

## Configuration

### Mobile Device Access

The API is configured to listen on `0.0.0.0:5233` to allow access from:
- **iOS Simulator**: Use `http://localhost:5233`
- **Android Emulator**: Use `http://10.0.2.2:5233`
- **Physical Device**: Use your computer's local IP (e.g., `http://192.168.1.10:5233`)

### CORS

CORS is configured to allow all origins for development. This can be restricted in production.

## Project Structure

```
ConcreteBeamTest.API/
├── Controllers/
│   └── BeamController.cs       # API endpoints
├── Models/
│   ├── InputModel.cs           # Request model
│   └── OutputModel.cs          # Response model
├── Services/
│   └── ConcreteCalculator.cs   # Calculation logic
└── Program.cs                  # Application entry point
```

## Troubleshooting

### Port Already in Use

If port 5233 is already in use:

1. Find the process:
   ```bash
   lsof -i :5233
   ```

2. Kill the process:
   ```bash
   kill -9 <PID>
   ```

3. Or use a different port by modifying `Properties/launchSettings.json`

### Network Access Issues

If mobile devices cannot connect:

1. Ensure the API is listening on `0.0.0.0`, not just `localhost`
2. Check firewall settings
3. Verify both devices are on the same network
4. For Android emulator, ensure you're using `10.0.2.2` instead of `localhost`

## Development Notes

- The calculator uses bisection method to find the neutral axis depth
- Design strengths are automatically calculated: `fcd = fck/1.5`, `fyd = fyk/1.15`
- Steel stress is limited by yield strength `fyd`

