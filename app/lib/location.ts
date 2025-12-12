// lib/locations.ts

export interface CityLocation {
  id: string;
  name: string;
  code: string; 
  lat: number;
  lng: number;
}

export const TARGET_CITIES: CityLocation[] = [
  // === JABODETABEK & BANTEN ===
  { id: 'JKT', name: "Jakarta Pusat", code: "31.71.01.1002", lat: -6.1767, lng: 106.8263 },
  { id: 'SSEL', name: "Jakarta Selatan", code: "31.74.04.1002", lat: -6.2615, lng: 106.8106 },
  { id: 'BGR', name: "Bogor", code: "32.71.04.1001", lat: -6.5976, lng: 106.7996 },
  { id: 'DPK', name: "Depok", code: "32.76.02.1005", lat: -6.4025, lng: 106.7942 },
  { id: 'TNG', name: "Tangerang", code: "36.71.05.1001", lat: -6.1731, lng: 106.6293 },
  { id: 'BKS', name: "Bekasi", code: "32.75.03.1004", lat: -6.2383, lng: 106.9756 },
  { id: 'SRG', name: "Serang", code: "36.73.01.1005", lat: -6.1154, lng: 106.1537 },
  { id: 'CLG', name: "Cilegon", code: "36.72.01.1003", lat: -6.0173, lng: 106.0536 },

  // === JAWA BARAT ===
  { id: 'BDG', name: "Bandung", code: "32.73.02.1002", lat: -6.8839, lng: 107.6143 },
  { id: 'SKB', name: "Sukabumi", code: "32.72.03.1004", lat: -6.9277, lng: 106.9300 },
  { id: 'CJR', name: "Cianjur", code: "32.03.01.2012", lat: -6.8166, lng: 107.1422 },
  { id: 'CRB', name: "Cirebon", code: "32.74.03.1004", lat: -6.7320, lng: 108.5523 },
  { id: 'KNG', name: "Kuningan", code: "32.08.01.2001", lat: -6.9758, lng: 108.4831 },
  { id: 'TSK', name: "Tasikmalaya", code: "32.78.05.1003", lat: -7.3274, lng: 108.2207 },
  { id: 'KPW', name: "Karawang", code: "32.15.01.2016", lat: -6.3112, lng: 107.2922 },

  // === JAWA TENGAH & DIY ===
  { id: 'SMG', name: "Semarang", code: "33.74.06.1003", lat: -6.9904, lng: 110.4229 },
  { id: 'SLO', name: "Surakarta (Solo)", code: "33.72.04.1003", lat: -7.5556, lng: 110.8208 },
  { id: 'YOG', name: "Yogyakarta", code: "34.71.03.1004", lat: -7.7926, lng: 110.3658 },
  { id: 'MGL', name: "Magelang", code: "33.71.02.1006", lat: -7.4727, lng: 110.2198 },
  { id: 'TGL', name: "Tegal", code: "33.76.02.1004", lat: -6.8797, lng: 109.1256 },
  { id: 'PKL', name: "Pekalongan", code: "33.75.01.1005", lat: -6.8898, lng: 109.6746 },
  { id: 'PWT', name: "Purwokerto", code: "33.02.24.1006", lat: -7.4302, lng: 109.2304 }, // Banyumas
  { id: 'CLP', name: "Cilacap", code: "33.01.21.1003", lat: -7.7188, lng: 109.0159 },
  { id: 'KDS', name: "Kudus", code: "33.19.01.2005", lat: -6.8048, lng: 110.8405 },
  { id: 'JPR', name: "Jepara", code: "33.20.07.2007", lat: -6.5867, lng: 110.6713 },

  // === JAWA TIMUR ===
  { id: 'SUB', name: "Surabaya", code: "35.78.08.1004", lat: -7.2805, lng: 112.7505 },
  { id: 'MLG', name: "Malang", code: "35.73.01.1006", lat: -7.9785, lng: 112.6307 },
  { id: 'SDA', name: "Sidoarjo", code: "35.15.08.2007", lat: -7.4478, lng: 112.7183 },
  { id: 'GZK', name: "Gresik", code: "35.25.16.2007", lat: -7.1557, lng: 112.6560 },
  { id: 'KDR', name: "Kediri", code: "35.71.01.1004", lat: -7.8480, lng: 112.0178 },
  { id: 'MDU', name: "Madiun", code: "35.77.01.1003", lat: -7.6298, lng: 111.5176 },
  { id: 'BJW', name: "Banyuwangi", code: "35.10.16.2008", lat: -8.2192, lng: 114.3692 },
  { id: 'JMR', name: "Jember", code: "35.09.19.2003", lat: -8.1845, lng: 113.6681 },
  { id: 'PBL', name: "Probolinggo", code: "35.74.03.1004", lat: -7.7569, lng: 113.2115 },
  { id: 'TBN', name: "Tuban", code: "35.23.19.2003", lat: -6.8976, lng: 112.0649 },

  // === SUMATERA UTARA & ACEH ===
  { id: 'BNA', name: "Banda Aceh", code: "11.71.02.1003", lat: 5.5536, lng: 95.3172 },
  { id: 'LSM', name: "Lhokseumawe", code: "11.73.02.2007", lat: 5.1824, lng: 97.1419 },
  { id: 'MDN', name: "Medan", code: "12.71.04.1003", lat: 3.5915, lng: 98.6775 },
  { id: 'BIN', name: "Binjai", code: "12.75.03.1004", lat: 3.6166, lng: 98.4851 },
  { id: 'PMS', name: "Pematang Siantar", code: "12.72.03.1006", lat: 2.9649, lng: 99.0619 },
  { id: 'SBG', name: "Sibolga", code: "12.73.02.1005", lat: 1.7410, lng: 98.7798 },

  // === SUMATERA BARAT, RIAU, KEPRI ===
  { id: 'PDG', name: "Padang", code: "13.71.11.1001", lat: -0.8936, lng: 100.3517 },
  { id: 'BKT', name: "Bukittinggi", code: "13.75.03.1005", lat: -0.3039, lng: 100.3692 },
  { id: 'PKU', name: "Pekanbaru", code: "14.71.12.1003", lat: 0.5268, lng: 101.4468 },
  { id: 'DUM', name: "Dumai", code: "14.72.02.1006", lat: 1.6815, lng: 101.4456 },
  { id: 'BTM', name: "Batam", code: "21.71.02.1005", lat: 1.1445, lng: 104.0202 },
  { id: 'TPI', name: "Tanjung Pinang", code: "21.72.01.1004", lat: 0.9165, lng: 104.4485 },

  // === SUMATERA SELATAN, JAMBI, LAMPUNG ===
  { id: 'PLM', name: "Palembang", code: "16.71.06.1004", lat: -2.9723, lng: 104.7645 },
  { id: 'PRB', name: "Prabumulih", code: "16.74.02.1008", lat: -3.4320, lng: 104.2255 },
  { id: 'JAM', name: "Jambi", code: "15.71.07.1004", lat: -1.6111, lng: 103.6066 },
  { id: 'BKL', name: "Bengkulu", code: "17.71.02.1003", lat: -3.7928, lng: 102.2608 },
  { id: 'LPG', name: "Bandar Lampung", code: "18.71.10.1004", lat: -5.4262, lng: 105.2580 },
  { id: 'MET', name: "Metro", code: "18.72.01.1005", lat: -5.1136, lng: 105.3056 },
  { id: 'PGK', name: "Pangkal Pinang", code: "19.71.04.1003", lat: -2.1292, lng: 106.1118 },

  // === KALIMANTAN ===
  { id: 'PTK', name: "Pontianak", code: "61.71.01.1003", lat: -0.0406, lng: 109.3364 },
  { id: 'SKW', name: "Singkawang", code: "61.72.02.1007", lat: 0.9068, lng: 108.9857 },
  { id: 'PLK', name: "Palangkaraya", code: "62.71.01.1003", lat: -2.2106, lng: 113.9139 },
  { id: 'BJM', name: "Banjarmasin", code: "63.71.03.1005", lat: -3.3194, lng: 114.5908 },
  { id: 'BJB', name: "Banjarbaru", code: "63.72.01.1005", lat: -3.4414, lng: 114.8315 },
  { id: 'BPN', name: "Balikpapan", code: "64.71.01.1003", lat: -1.2729, lng: 116.8276 },
  { id: 'SMD', name: "Samarinda", code: "64.72.04.1006", lat: -0.5022, lng: 117.1536 },
  { id: 'TRK', name: "Tarakan", code: "65.71.01.1005", lat: 3.3086, lng: 117.5905 },

  // === SULAWESI ===
  { id: 'MKS', name: "Makassar", code: "73.71.04.1004", lat: -5.1437, lng: 119.4124 },
  { id: 'PAR', name: "Parepare", code: "73.72.03.1004", lat: -4.0152, lng: 119.6247 },
  { id: 'MND', name: "Manado", code: "71.71.03.1001", lat: 1.4870, lng: 124.8427 },
  { id: 'BIT', name: "Bitung", code: "71.72.03.1004", lat: 1.4404, lng: 125.1217 },
  { id: 'GOR', name: "Gorontalo", code: "75.71.03.1003", lat: 0.5369, lng: 123.0605 },
  { id: 'PLU', name: "Palu", code: "72.71.03.1005", lat: -0.9003, lng: 119.8780 },
  { id: 'KDI', name: "Kendari", code: "74.71.01.1005", lat: -3.9725, lng: 122.5140 },
  { id: 'MJU', name: "Mamuju", code: "76.02.01.1006", lat: -2.6778, lng: 118.8824 },

  // === BALI & NUSA TENGGARA ===
  { id: 'DPS', name: "Denpasar", code: "51.71.02.1003", lat: -8.6793, lng: 115.2631 },
  { id: 'SGR', name: "Singaraja", code: "51.08.06.1011", lat: -8.1120, lng: 115.0882 },
  { id: 'MTR', name: "Mataram", code: "52.71.01.1003", lat: -8.5833, lng: 116.1039 },
  { id: 'BIM', name: "Bima", code: "52.72.03.1005", lat: -8.4609, lng: 118.7268 },
  { id: 'KPG', name: "Kupang", code: "53.71.03.1003", lat: -10.1633, lng: 123.6022 },
  { id: 'LBJ', name: "Labuan Bajo", code: "53.15.01.2009", lat: -8.4964, lng: 119.8707 },
  { id: 'MME', name: "Maumere", code: "53.07.01.2001", lat: -8.6198, lng: 122.2144 },

  // === MALUKU & PAPUA ===
  { id: 'AMB', name: "Ambon", code: "81.71.02.1011", lat: -3.6934, lng: 128.1812 },
  { id: 'TRN', name: "Ternate", code: "82.71.03.1004", lat: 0.7916, lng: 127.3888 },
  { id: 'JYP', name: "Jayapura", code: "91.71.03.1005", lat: -2.5330, lng: 140.7169 },
  { id: 'SRG', name: "Sorong", code: "92.71.08.1002", lat: -0.8763, lng: 131.2543 },
  { id: 'MNK', name: "Manokwari", code: "92.02.12.2007", lat: -0.8615, lng: 134.0620 },
  { id: 'TIM', name: "Timika", code: "94.12.02.2004", lat: -4.5468, lng: 136.8837 },
  { id: 'MRK', name: "Merauke", code: "93.01.01.1002", lat: -8.4824, lng: 140.3953 },
];