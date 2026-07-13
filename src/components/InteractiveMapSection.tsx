import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Map, MapPin } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

const InteractiveMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref} id="interactive-map">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/10" />
      <div className="absolute -left-1/4 top-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Global Footprint</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4">
            Interactive <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Project Map</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore the geographical distribution of my major geospatial and hydrological projects across the region.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[500px] md:h-[600px] rounded-2xl relative p-1 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 backdrop-blur-sm"
        >
          <div className="absolute inset-0 rounded-2xl bg-card/40 backdrop-blur-md" />
          <InteractiveMap />
          
          {/* Map legend / Info box overlay */}
          <div className="absolute bottom-6 right-6 z-20 bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-xl hidden sm:block">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Project Locations
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Hydrological Modeling
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Drone Mapping & Topography
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
