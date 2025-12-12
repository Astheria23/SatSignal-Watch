'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { TARGET_CITIES, CityLocation } from './lib/location';
import { Wifi, Info, CloudRain, Zap } from 'lucide-react'; // Tambah icon

const Map = dynamic(() => import('./components/map'), { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white">Initializing Satellite Uplink...</div>
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

    const orderedData = useMemo(() => {
        const priority: Record<ProcessedData['signalStatus'], number> = {
            Critical: 0,
            Degraded: 1,
            Excellent: 2,
        };

        return [...mapData].sort((a, b) => priority[a.signalStatus] - priority[b.signalStatus]);
    }, [mapData]);

  // LOGIC SAMA KAYAK SEBELUMNYA
  const analyzeSignal = (weatherDesc: string): { status: 'Excellent' | 'Degraded' | 'Critical'; color: string } => {
    const desc = weatherDesc.toLowerCase();
    if (desc.includes('petir') || desc.includes('lebat') || desc.includes('extrem')) {
        return { status: 'Critical', color: '#ef4444' }; 
    } else if (desc.includes('hujan') || desc.includes('sedang')) {
        return { status: 'Degraded', color: '#eab308' }; 
    } else {
        return { status: 'Excellent', color: '#22c55e' }; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
                const promises = TARGET_CITIES.map(async (city) => {
                        try {
                const res = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${city.code}`);
                if (!res.ok) return null; 
                const json = await res.json();
                if (!json.data || json.data.length === 0) return null;

                const currentData = json.data[0].cuaca[0][0]; 
                if (!currentData) return null;

                const signal = analyzeSignal(currentData.weather_desc);

                return {
                    ...city,
                    weatherDesc: currentData.weather_desc,
                    temp: currentData.t,
                    signalStatus: signal.status,
                    color: signal.color
                } as ProcessedData;
                                    } catch {
                return null;
            }
        });

        const results = await Promise.all(promises);
        const validResults = results.filter((item): item is ProcessedData => item !== null);
        setMapData(validResults);
        setLoading(false);
                        } catch {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* Navbar Minimalis */}
      <nav className="absolute top-0 left-0 w-full p-4 z-20 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto bg-slate-900/80 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-slate-700 shadow-2xl">
            <div className="p-2 bg-blue-600 rounded-full">
                <Wifi className="text-white w-4 h-4" />
            </div>
            <div>
                <h1 className="font-bold text-sm tracking-wide">SATSIGNAL WATCH</h1>
                <p className="text-[10px] text-slate-400">Live Rain Fade Monitoring</p>
            </div>
        </div>
      </nav>

      {/* Map Content */}
      <div className="flex-1 relative z-10">
        <Map data={mapData} />

                {/* Query Sidebar (Kiri) */}
            <div className="absolute top-24 left-4 z-50 w-72">
                        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-5 shadow-2xl">
                                <div className="mb-4">
                                        <h2 className="font-bold text-sm text-white tracking-wide">Criticality Watchlist</h2>
                                        <p className="text-[10px] text-slate-400 mt-1">Prioritas lokasi berdasarkan risiko gangguan sinyal.</p>
                                </div>

                                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                        {loading ? (
                                                <p className="text-[11px] text-slate-400">Memuat data telemetri...</p>
                                        ) : orderedData.length === 0 ? (
                                                <p className="text-[11px] text-slate-500">Tidak ada data yang dapat dianalisis.</p>
                                        ) : (
                                                orderedData.map((city) => {
                                                        const badgeStyles: Record<ProcessedData['signalStatus'], string> = {
                                                            Critical: 'bg-red-500/20 border border-red-500/60 text-red-300',
                                                            Degraded: 'bg-yellow-500/20 border border-yellow-500/60 text-yellow-200',
                                                            Excellent: 'bg-green-500/20 border border-green-500/60 text-green-200',
                                                        };

                                                        return (
                                                            <div key={city.id} className="bg-slate-900/80 border border-slate-700 rounded-lg p-3">
                                                                <div className="flex items-start justify-between gap-2">
                                                                    <div>
                                                                        <p className="text-xs font-semibold text-white">{city.name}</p>
                                                                        <p className="text-[10px] text-slate-400 capitalize">{city.weatherDesc || 'Tidak ada data cuaca'}</p>
                                                                    </div>
                                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${badgeStyles[city.signalStatus]}`}>
                                                                        {city.signalStatus}
                                                                    </span>
                                                                </div>
                                                                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                                                                    <span>Suhu: <b className="text-slate-200">{city.temp ?? '-'}°C</b></span>
                                                                    <span>Node ID: {city.id}</span>
                                                                </div>
                                                            </div>
                                                        );
                                                })
                                        )}
                                </div>
                        </div>
                </div>

        {/* INFO BOX / LEGEND (KANAN ATAS) */}
    <div className="absolute top-4 right-4 z-50 w-72">
            {/* Card Glassmorphism */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-5 shadow-2xl">
                
                {/* Header Info */}
                <div className="mb-4 pb-4 border-b border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                        <Info className="w-4 h-4 text-blue-400" />
                        <h2 className="font-bold text-sm text-white">About System</h2>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Sistem ini memantau potensi gangguan sinyal satelit (VSAT/Starlink) akibat atenuasi hujan (Rain Fade) secara real-time berdasarkan data BMKG.
                    </p>
                </div>

                {/* Legend Status */}
                <h3 className="text-[10px] uppercase font-bold text-slate-500 mb-3 tracking-wider">Signal Status Legend</h3>
                <div className="space-y-3">
                    
                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-1 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                        <div>
                            <p className="text-xs font-bold text-green-400">Excellent</p>
                            <p className="text-[10px] text-slate-400">Cuaca cerah/berawan. Sinyal optimal.</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-1 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>
                        <div>
                            <p className="text-xs font-bold text-yellow-400">Degraded</p>
                            <p className="text-[10px] text-slate-400">Hujan ringan. Potensi jitter/lag.</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-1 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                        <div>
                            <div className="flex items-center gap-1">
                                <p className="text-xs font-bold text-red-400">Critical Outage</p>
                                <Zap className="w-3 h-3 text-red-500 fill-red-500" />
                            </div>
                            <p className="text-[10px] text-slate-400">Hujan deras/petir. Risiko putus koneksi tinggi.</p>
                        </div>
                    </div>
                </div>

                {/* Footer Data */}
                                <div className="mt-5 pt-3 border-t border-slate-700 flex justify-between items-center text-[10px] text-slate-500">
                                        <span>
                                            {loading ? (
                                                <span className="text-slate-400">Scanning network...</span>
                                            ) : (
                                                <>Monitored Nodes: <b className="text-white">{mapData.length}</b></>
                                            )}
                                        </span>
                                        <div className="flex items-center gap-1">
                                                <CloudRain className="w-3 h-3" />
                                                <span>Source: BMKG v2</span>
                                        </div>
                                </div>

            </div>
        </div>
      </div>
    </main>
  );
}