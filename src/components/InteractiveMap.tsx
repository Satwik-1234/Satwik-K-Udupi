import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Custom Map Marker using Lucide Icon
const createCustomIcon = (color: string) => {
  const iconMarkup = renderToStaticMarkup(
    <div style={{ color: color, filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))' }}>
      <MapPin size={32} strokeWidth={2.5} fill="white" />
    </div>
  );
  return L.divIcon({
    html: iconMarkup,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const defaultIcon = createCustomIcon('#f59e0b'); // amber-500

const projects = [
  {
    id: 1,
    name: "Koyna River Basin Analysis",
    location: [17.3970, 73.7431] as [number, number], // Coordinates for Koyna Dam
    description: "Hydrological modeling, dam breach analysis, and flood risk assessment using HEC-RAS and ArcGIS.",
  },
  {
    id: 2,
    name: "Smart City Drone Mapping",
    location: [17.2777, 74.1844] as [number, number], // Coordinates for Karad
    description: "High-resolution UAV photogrammetry and topographical surveying for urban planning.",
  }
];

// Component to dynamically change tiles based on theme
const ThemeAwareTileLayer = () => {
  const { theme, systemTheme } = useTheme();
  
  // Determine if we should show dark mode tiles
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  // CartoDB tiles are beautiful and free without an API key
  const tileUrl = isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  return (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url={tileUrl}
    />
  );
};

const InteractiveMap = () => {
  // Center map to show both Karad and Koyna Dam nicely
  const centerPosition: [number, number] = [17.33, 73.96]; 

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-border/50 shadow-2xl relative z-10">
      <MapContainer 
        center={centerPosition} 
        zoom={11} 
        scrollWheelZoom={false}
        className="w-full h-full min-h-[400px]"
        style={{ background: 'transparent' }}
      >
        <ThemeAwareTileLayer />
        
        {projects.map((project) => (
          <Marker 
            key={project.id} 
            position={project.location}
            icon={defaultIcon}
          >
            <Popup className="custom-popup">
              <div className="p-1 max-w-[220px]">
                <h3 className="font-bold text-sm mb-1 text-foreground">{project.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed m-0">
                  {project.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
