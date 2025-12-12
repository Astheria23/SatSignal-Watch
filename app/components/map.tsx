'use client';

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Interface untuk data yang sudah digabung dengan cuaca
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
  return (
    <MapContainer 
      center={[-2.5489, 118.0149]} // Center Indonesia
      zoom={5} 
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((city) => (
        <CircleMarker 
          key={city.id}
          center={[city.lat, city.lng]}
          pathOptions={{ color: city.color, fillColor: city.color, fillOpacity: 0.7 }}
          radius={15} // Ukuran titik
        >
            {/* Tooltip muncul pas hover */}
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <span className="font-bold">{city.name}</span>
            </Tooltip>

            {/* Popup muncul pas klik */}
            <Popup>
                <div className="p-1">
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <div className="text-sm mt-1">
                        <p>Cuaca: <b>{city.weatherDesc}</b></p>
                        <p>Suhu: {city.temp}°C</p>
                        <hr className="my-2"/>
                        <p>Signal Status:</p>
                        <span className={`px-2 py-1 rounded text-white text-xs font-bold
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