# 📡 SatSignal Watch: Rain Fade Mapper

NAMA    : MUHAMMAD OKTA TORIQ GUNAWAN
NPM     : 714230058
PRODI   : DIV TEKNIK INFORMATIKA 

**Real-time Satellite Signal Stability Monitoring System based on Weather Conditions.**

> *A Geospatial Information System (GIS) project aimed at mitigating communication blackouts during extreme weather events.*

## 📖 Background & Problem
In the era of satellite internet (VSAT, Starlink, TV Broadcast), **Rain Fade** (Rain Attenuation) is a major issue. High-frequency signals (Ku-Band/Ka-Band) are easily absorbed or scattered by heavy rain droplets, causing:
- High Latency
- Packet Loss
- Total Connection Drop (Outage)

This project visualizes **Rain Fade Potential** across major cities in Indonesia using real-time meteorological data, helping network administrators and users anticipate connection instability.

## 🚀 Key Features
- **Interactive Map:** Visualizes signal status across monitored regions using Leaflet.js.
- **Real-time Data:** Fetches live weather data from **BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)** public API.
- **Signal Logic Engine:** Automatically translates weather codes into signal quality indicators (Excellent, Degraded, Critical).
- **Cluster & Popups:** Detailed information for specific regions including humidity, wind speed, and estimated signal attenuation.

## 🛰️ Main Interface Overview

![SatSignal Watch main screen](./public/main-page.png)

1. **Top-left Navigation Badge** – Branding plus quick status cue that the telemetry feed is live.
2. **Criticality Watchlist (Left Sidebar)** – Prioritized list of monitored cities sorted from highest outage risk (Critical → Degraded → Excellent). Each card surfaces weather description, live temperature, and node ID for quick triage.
3. **Interactive Map Canvas** – Leaflet basemap centered on Indonesia with color-coded markers matching the signal status. Hover to see tooltip labels; click to open detailed popups.
4. **Signal Detail Popup** – Displays current weather summary, temperature, and signal classification badge for the selected city.
5. **About / Legend Panel (Right Sidebar)** – Explains the classification scheme, provides a compact legend, and counts total monitored nodes with data source attribution.

> Tip: When viewing the static export (GitHub Pages), Leaflet’s default zoom controls are hidden to keep the layout clean. Use mouse scroll / touch gestures to zoom instead.

## 🧠 How It Works (The Logic)
The core of this application is a classifier function that maps BMKG weather descriptions to Signal Quality Status:

| Weather Condition (BMKG) | Signal Status | Color Indicator | Impact Analysis |
| :--- | :--- | :--- | :--- |
| **Cerah / Berawan** (Clear/Cloudy) | ✅ **Excellent** | 🟢 Green | Minimal atmospheric attenuation. Optimal speed. |
| **Hujan Ringan** (Light Rain) | ⚠️ **Degraded** | 🟡 Yellow | Slight signal drop (~1-3dB). Playable but potential jitter. |
| **Hujan Lebat / Petir** (Thunderstorm) | 🚨 **Critical** | 🔴 Red | High attenuation (>10dB). High risk of RTO/Disconnect. |

## 🛠 Tech Stack
This project utilizes a **Frontend-Only** architecture deployed on GitHub Pages:

- **Framework:** [Next.js](https://nextjs.org/) (Static Export Mode)
- **Maps Engine:** [React-Leaflet](https://react-leaflet.js.org/) & [OpenStreetMap](https://www.openstreetmap.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Source:** [BMKG Public API v2](https://data.bmkg.go.id/prakiraan-cuaca/)

## 🔌 Data Source & Endpoints
We use the latest 2024 BMKG API which provides granular weather data via **ADM4 Code** (District Level).

- **Endpoint:** `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=[REGION_CODE]`
- **Method:** `GET`
- **Response Format:** JSON

*> Note: Since the API requires specific ADM4 codes, this project uses a curated list of major strategic cities in Indonesia for demonstration purposes.*

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn

### Installation
```bash
git clone https://github.com/Astheria23/SatSignal-Watch.git
cd SatSignal-Watch
npm install
npm run dev
```

Open `http://localhost:3000` with your browser.

## 🚢 Deploying to GitHub Pages

The project is already configured for static export (`output: "export"`) so GitHub Pages can host it. Deployment is handled automatically through the included GitHub Actions workflow (`.github/workflows/deploy.yml`).

### One-time prerequisites

- Enable **GitHub Pages** in the repository settings and choose **GitHub Actions** as the source.
- Ensure the default branch is `main` (or adjust the workflow trigger).

### How the workflow works

1. On every push to `main` (or via the manual *Run workflow* button), GitHub Actions will:
   - install dependencies
   - lint the project
   - build the static site with `NEXT_PUBLIC_BASE_PATH=SatSignal-Watch`
   - upload the `out` directory as the Pages artifact
2. GitHub Pages then serves the exported site from the `gh-pages` environment.

### Deploying locally (optional)

To verify the export locally before pushing:

```bash
NEXT_PUBLIC_BASE_PATH=SatSignal-Watch npm run build
npx serve out
```

This builds the static site into the `out` folder, adds the `.nojekyll` file automatically, and serves it locally.