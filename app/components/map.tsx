'use client';

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

interface WeatherData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  weatherDesc: string;
  temp: number;
  signalStatus: 'Excellent' | 'Degraded' | 'Critical';
  color: string;
}

export default function Map({ data }: { data: WeatherData[] }) {
  // Batas Koordinat (Bounding Box) Indonesia
  // [Latitude Selatan, Longitude Barat], [Latitude Utara, Longitude Timur]
  const indoBounds: LatLngBoundsExpression = [
    [-15.0, 90.0], // Pojok Kiri Bawah (Samudra Hindia)
    [10.0, 150.0]  // Pojok Kanan Atas (Pasifik/Papua)
  ];
  const defaultCenter: LatLngExpression = [-2.5, 118];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={5} 
      minZoom={5} // Gak bisa zoom out sampe liat dunia
      maxBounds={indoBounds} // Lock area mentok di kotak indoBounds
      maxBoundsViscosity={1.0} // Bikin 'mental' kalau ditarik keluar batas
      className="w-full h-full z-0 bg-slate-900" // bg-slate biar kalau loading warnanya gelap
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        // Pake style CartoDB Dark Matter biar kelihatan Tech/Hacker banget (Opsional)
        // Kalau mau yang terang biasa, pake url osm standar.
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {data.map((city) => (
        <CircleMarker 
          key={city.id}
          center={[city.lat, city.lng]}
          pathOptions={{ 
            color: city.color, 
            fillColor: city.color, 
            fillOpacity: 0.8,
            weight: 1 // Tebal garis pinggir
          }}
          radius={6} // <-- UKURAN DIPERKECIL (Tadi 15, sekarang 6)
        >
            <Tooltip direction="top" offset={[0, -5]} opacity={1}>
                <span className="font-bold text-xs">{city.name}</span>
            </Tooltip>

            <Popup>
                <div className="p-1 min-w-40">
                    <h3 className="font-bold text-base text-slate-800">{city.name}</h3>
                    <div className="text-xs mt-2 space-y-1 text-slate-600">
                        <p>Cuaca: <b className="text-slate-900">{city.weatherDesc}</b></p>
                        <p>Suhu: {city.temp}°C</p>
                        <hr className="my-2 border-slate-200"/>
                        <p>Kualitas Sinyal:</p>
                        <span className={`inline-block mt-1 px-2 py-1 rounded text-white text-[10px] font-bold tracking-wider
                            ${city.signalStatus === 'Critical' ? 'bg-red-600' : 
                              city.signalStatus === 'Degraded' ? 'bg-yellow-500' : 'bg-green-600'}`}>
                            {city.signalStatus.toUpperCase()}
                        </span>
                    </div>
                </div>
            </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}