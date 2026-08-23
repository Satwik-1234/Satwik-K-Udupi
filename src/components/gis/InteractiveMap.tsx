'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Layers, Satellite, Shield, Mountain, ExternalLink } from 'lucide-react';

interface GisProjectMarker {
  id: string;
  name: string;
  category: 'Dam Safety' | 'Floodplain' | 'Erosion / RUSLE' | 'Wildlife GIS';
  coords: [number, number];
  elevation: string;
  riverBasin: string;
  description: string;
  outputs: string;
  color: string;
}

const GIS_PROJECTS: GisProjectMarker[] = [
  {
    id: 'koyna',
    name: 'Koyna Dam Breach & PMF Simulation',
    category: 'Dam Safety',
    coords: [17.3989, 73.7489],
    elevation: '657m MSL',
    riverBasin: 'Koyna-Krishna River Sub-basin',
    description: 'HEC-RAS 2D unsteady breach hydrograph & downstream inundation mapping (66,000+ m³/s peak).',
    outputs: '2D Depth grids, Travel time contours, Emergency Action Plan.',
    color: '#00E5FF',
  },
  {
    id: 'ghod',
    name: 'Resilient River Ghod Initiative',
    category: 'Floodplain',
    coords: [19.0967, 73.8744],
    elevation: '580m MSL',
    riverBasin: 'Ghod River Catchment, Junnar',
    description: 'CCTs, gabion structure spatial mapping, and village plantation GIS monitoring.',
    outputs: 'Structure atlas, vegetation health index, catchment progress maps.',
    color: '#10B981',
  },
  {
    id: 'mula-mutha',
    name: 'Mula-Mutha Flood Risk Zonation',
    category: 'Floodplain',
    coords: [18.5308, 73.8475],
    elevation: '560m MSL',
    riverBasin: 'Mula-Mutha Sub-basin (Pune)',
    description: 'AHP Multi-criteria decision analysis + HEC-RAS 1D flood hazard risk zonation.',
    outputs: 'Flood risk zonation maps (Low/Med/High/Extreme).',
    color: '#38BDF8',
  },
  {
    id: 'str',
    name: 'Sahyadri Tiger Reserve Ecological GIS',
    category: 'Wildlife GIS',
    coords: [17.5122, 73.6847],
    elevation: '920m MSL',
    riverBasin: 'Western Ghats Bio-corridor',
    description: 'Camera-trap wildlife movement spatial analysis and hotspot index mapping for STR.',
    outputs: 'Wildlife density heatmaps, corridor connectivity maps.',
    color: '#F59E0B',
  },
  {
    id: 'panchganga',
    name: 'Panchganga RUSLE Soil Loss Assessment',
    category: 'Erosion / RUSLE',
    coords: [16.7050, 74.2433],
    elevation: '540m MSL',
    riverBasin: 'Panchganga Catchment, Kolhapur',
    description: '30-year spatiotemporal Landsat analysis and GIS-based RUSLE annual soil loss estimation.',
    outputs: 'Erosion severity atlas, sediment yield prioritization.',
    color: '#EC4899',
  },
];

export const InteractiveMap: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GisProjectMarker>(GIS_PROJECTS[0]);
  const [tileMode, setTileMode] = useState<'dark' | 'satellite' | 'terrain'>('dark');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Leaflet on client side
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // Leaflet is ready
        setLeafletLoaded(true);
      });
    }
  }, []);

  const filteredProjects = GIS_PROJECTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="w-full h-full min-h-[520px] rounded-3xl overflow-hidden border border-white/10 bg-card flex flex-col md:flex-row relative">
      {/* Sidebar / Project Selector (Left) */}
      <div className="w-full md:w-80 border-r border-white/10 p-5 bg-background/90 backdrop-blur-md flex flex-col justify-between z-20">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              GIS Footprint Explorer
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {GIS_PROJECTS.length} Stations
            </span>
          </div>

          {/* Layer Mode Switch */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-card border border-white/5 mb-4">
            <button
              onClick={() => setTileMode('dark')}
              className={`py-1 text-[11px] font-mono rounded-lg transition-all ${
                tileMode === 'dark' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground'
              }`}
            >
              Carto
            </button>
            <button
              onClick={() => setTileMode('satellite')}
              className={`py-1 text-[11px] font-mono rounded-lg transition-all ${
                tileMode === 'satellite' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setTileMode('terrain')}
              className={`py-1 text-[11px] font-mono rounded-lg transition-all ${
                tileMode === 'terrain' ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground'
              }`}
            >
              Topography
            </button>
          </div>

          {/* Project List */}
          <div className="space-y-2 overflow-y-auto max-h-[300px] pr-1">
            {GIS_PROJECTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${
                    isSelected
                      ? 'bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                      : 'bg-card/50 border-white/5 text-muted-foreground hover:bg-card hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold truncate pr-2">{proj.name}</span>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: proj.color }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>{proj.category}</span>
                    <span>{proj.elevation}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Project Summary Card */}
        <div className="mt-4 p-3.5 rounded-2xl bg-card border border-white/10 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-primary uppercase">Active Coordinates</span>
            <span className="font-mono text-[10px] text-accent">{selectedProject.elevation}</span>
          </div>
          <p className="font-mono text-[11px] text-white/90 mb-1">
            {selectedProject.coords[0].toFixed(4)}° N, {selectedProject.coords[1].toFixed(4)}° E
          </p>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            {selectedProject.description}
          </p>
        </div>
      </div>

      {/* Map Display & Interactive Canvas Frame */}
      <div className="flex-1 relative min-h-[350px] bg-[#0b132b] overflow-hidden flex items-center justify-center">
        {/* Visual Map Interface with Grid Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

        {/* Topo / Satellite visual background representation */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background:
              tileMode === 'satellite'
                ? 'radial-gradient(ellipse at center, #0d2818 0%, #050811 100%)'
                : tileMode === 'terrain'
                ? 'radial-gradient(ellipse at center, #1b263b 0%, #050811 100%)'
                : 'radial-gradient(ellipse at center, #0B132B 0%, #050811 100%)',
          }}
        />

        {/* Map Topographical Contour SVG art */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 800 600">
          <path d="M 50 150 Q 200 50 400 200 T 750 250" fill="none" stroke="#00E5FF" strokeWidth="1" />
          <path d="M 80 220 Q 250 120 450 300 T 780 320" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
          <path d="M 30 350 Q 300 220 500 450 T 720 480" fill="none" stroke="#10B981" strokeWidth="1.2" />
          <circle cx="420" cy="310" r="140" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
          <circle cx="420" cy="310" r="80" fill="none" stroke="#38BDF8" strokeWidth="0.8" />
        </svg>

        {/* Interactive Station Markers on Map Canvas */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="relative w-full max-w-xl aspect-[4/3]">
            {GIS_PROJECTS.map((proj, idx) => {
              // Normalized plotting positions across Western Maharashtra
              const leftPositions = [35, 62, 58, 28, 48];
              const topPositions = [45, 18, 38, 55, 75];
              const isSelected = selectedProject.id === proj.id;

              return (
                <div
                  key={proj.id}
                  className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${leftPositions[idx]}%`,
                    top: `${topPositions[idx]}%`,
                  }}
                  onClick={() => setSelectedProject(proj)}
                >
                  {/* Ping Animation on selected */}
                  {isSelected && (
                    <span
                      className="absolute -inset-3 rounded-full opacity-75 animate-ping"
                      style={{ backgroundColor: proj.color }}
                    />
                  )}

                  {/* Marker Node */}
                  <div
                    className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-125 ${
                      isSelected
                        ? 'scale-125 bg-background border-primary'
                        : 'bg-card border-white/20'
                    }`}
                    style={{
                      borderColor: isSelected ? proj.color : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: proj.color }}
                    />
                  </div>

                  {/* Station Label Tooltip */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-9 px-2.5 py-1 rounded-lg bg-black/85 border text-[10px] font-mono whitespace-nowrap backdrop-blur-md transition-all pointer-events-none z-30 ${
                      isSelected
                        ? 'opacity-100 border-primary text-primary shadow-lg'
                        : 'opacity-0 group-hover:opacity-100 border-white/10 text-white'
                    }`}
                  >
                    {proj.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Map HUD Compass */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-white/70">
            WGS84 • EPSG:4326
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 bg-black/60 flex items-center justify-center text-[10px] font-mono text-primary font-bold">
            N
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
