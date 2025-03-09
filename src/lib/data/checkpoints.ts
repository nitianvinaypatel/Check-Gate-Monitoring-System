export interface Checkpoint {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  status: "active" | "inactive";
  vehicles: number;
  alerts: number;
  lastUpdated: string;
  coverage: number; // Coverage radius in meters
}

export const CHECKPOINTS: Checkpoint[] = [
  {
    id: 1,
    name: "Vairengte Check Gate",
    location: { lat: 24.5, lng: 92.8 },
    status: "active",
    vehicles: 128,
    alerts: 0,
    lastUpdated: "2024-03-20T10:30:00Z",
    coverage: 2000,
  },
  {
    id: 2,
    name: "Bairabi Check Gate",
    location: { lat: 24.4, lng: 92.6 },
    status: "active",
    vehicles: 87,
    alerts: 2,
    lastUpdated: "2024-03-20T10:28:00Z",
    coverage: 1500,
  },
  {
    id: 3,
    name: "Lengpui Airport Check Gate",
    location: { lat: 23.8, lng: 92.6 },
    status: "active",
    vehicles: 45,
    alerts: 0,
    lastUpdated: "2024-03-20T10:25:00Z",
    coverage: 3000,
  },
  {
    id: 4,
    name: "Kolasib Check Gate",
    location: { lat: 24.2, lng: 92.7 },
    status: "inactive",
    vehicles: 0,
    alerts: 0,
    lastUpdated: "2024-03-20T09:15:00Z",
    coverage: 1800,
  },
  {
    id: 5,
    name: "Champhai Check Gate",
    location: { lat: 23.5, lng: 93.3 },
    status: "active",
    vehicles: 62,
    alerts: 1,
    lastUpdated: "2024-03-20T10:29:00Z",
    coverage: 2500,
  },
]; 