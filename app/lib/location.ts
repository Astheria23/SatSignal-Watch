export interface CityLocation {
  id: string;
  name: string;
  code: string; // ADM4 Code dari BMKG
  lat: number;
  lng: number;
}

export const TARGET_CITIES: CityLocation[] = [
  { id: 'JKT', name: "Jakarta Pusat", code: "31.71.01.1001", lat: -6.1805, lng: 106.8284 }, // Gambir
  { id: 'BDG', name: "Bandung", code: "32.73.09.1004", lat: -6.9147, lng: 107.6098 }, // Braga
  { id: 'SUB', name: "Surabaya", code: "35.78.08.1002", lat: -7.2654, lng: 112.7445 }, // Gubeng
  { id: 'DPS', name: "Denpasar", code: "51.71.03.1004", lat: -8.6530, lng: 115.2104 }, // Denpasar Barat
  { id: 'MDN', name: "Medan", code: "12.71.04.1003", lat: 3.5915, lng: 98.6775 }, // Medan Kota
  { id: 'PDG', name: "Padang", code: "13.71.03.1005", lat: -0.9504, lng: 100.3542 }, // Padang Barat
  { id: 'MKS', name: "Makassar", code: "73.71.05.1002", lat: -5.1486, lng: 119.4316 }, // Makassar
];