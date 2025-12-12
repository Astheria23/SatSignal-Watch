'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TARGET_CITIES, CityLocation } from './lib/location';
import { Wifi } from 'lucide-react';

// Import Map secara Lazy/Dynamic biar gak error window is not defined
const Map = dynamic(() => import('./components/map'), { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100">Loading Map...</div>
});

interface ProcessedData extends CityLocation {
  weatherDesc: string;
  temp: number;
  signalStatus: 'Excellent' | 'Degraded' | 'Critical';
  color: string;
}

export default function Home() {
  const [mapData, setMapData] = useState<ProcessedData[]>([]);
  const [loading, setLoading] = useState(true);

  // LOGIC: Klasifikasi Sinyal berdasarkan deskripsi cuaca
  const analyzeSignal = (weatherDesc: string): { status: 'Excellent' | 'Degraded' | 'Critical'; color: string } => {
    const desc = weatherDesc.toLowerCase();
    
    if (desc.includes('petir') || desc.includes('lebat') || desc.includes('extrem')) {
        return { status: 'Critical', color: '#ef4444' }; // Red-500
    } else if (desc.includes('hujan') || desc.includes('sedang')) {
        return { status: 'Degraded', color: '#eab308' }; // Yellow-500
    } else {
        return { status: 'Excellent', color: '#22c55e' }; // Green-500
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data parallel biar cepet
        const promises = TARGET_CITIES.map(async (city) => {
            // Gunakan Proxy cors-anywhere atau sejenisnya JIKA di-block browser.
            // Untuk sekarang kita coba direct hit ke API BMKG.
            // Kalau error CORS, ganti url jadi: `https://api.allorigins.win/raw?url=${encodeURIComponent('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=')}${city.code}`
            
            const res = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${city.code}`);
            const json = await res.json();
            
            // Ambil data cuaca jam ini (Index 0 di array cuaca)
            // Struktur API: data[0].cuaca[0][0] -> ini kadang berubah tergantung API, perlu cek console.log kalau error
            const currentData = json.data[0].cuaca[0][0]; 
            
            const signal = analyzeSignal(currentData.weather_desc);

            return {
                ...city,
                weatherDesc: currentData.weather_desc,
                temp: currentData.t,
                signalStatus: signal.status,
                color: signal.color
            };
        });

        const results = await Promise.all(promises);
        setMapData(results);
        setLoading(false);

      } catch (error) {
        console.error("Gagal ambil data BMKG:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col h-screen">
      {/* Header */}
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg z-10">
        <div className="flex items-center gap-2">
            <Wifi className="text-blue-400" />
            <h1 className="font-bold text-xl">SatSignal Watch</h1>
        </div>
        <div className="text-xs text-slate-400">
            Data Source: BMKG Public API
        </div>
      </nav>

      {/* Konten: Map & Sidebar Overlay */}
      <div className="flex-1 relative">
        
        {/* Map Container */}
        <div className="absolute inset-0 z-0">
            <Map data={mapData} />
        </div>

        {/* Legend Overlay (Pojok Kanan Atas) */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-xl z-[1000] max-w-xs">
            <h3 className="font-bold text-slate-800 mb-2 border-b pb-1">Signal Status</h3>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span>Excellent (Clear Sky)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span>Degraded (Light Rain)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                    <span>Critical (Heavy Rain/Storm)</span>
                </div>
            </div>
            
            {/* Mini Dashboard */}
            <div className="mt-4 pt-2 border-t text-xs text-slate-600">
               {loading ? 'Fetching satellites...' : (
                   <>
                    <p>Monitored Nodes: <b>{mapData.length}</b></p>
                    <p>Critical Areas: <b>{mapData.filter(d => d.signalStatus === 'Critical').length}</b></p>
                   </>
               )}
            </div>
        </div>

      </div>
    </main>
  );
}