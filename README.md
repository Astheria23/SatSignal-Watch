# 📡 SatSignal Watch: Rain Fade Mapper

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
1. Clone the repository:
   ```bash
   git clone [https://github.com/username/satsignal-watch.git](https://github.com/username/satsignal-watch.git)
Navigate to project directory:


cd satsignal-watch
Install dependencies:


npm install
Run development server:


npm run dev
Open http://localhost:3000 with your browser.