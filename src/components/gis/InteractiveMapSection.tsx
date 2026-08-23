'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin, Sparkles } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export const InteractiveMapSection: React.FC = () => {
  return (
    <section id="gis-footprint" className="py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4">
            <Map className="w-3.5 h-3.5" />
            <span>Geospatial Coverage</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Interactive <span className="gradient-text-hydro">Geospatial Footprint</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Geographical distribution of field-verified hydrological assessments, dam breach simulations, and ecological GIS monitoring across Western Maharashtra and the Western Ghats.
          </p>
        </div>

        {/* Interactive Map Component */}
        <div className="w-full">
          <InteractiveMap />
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
