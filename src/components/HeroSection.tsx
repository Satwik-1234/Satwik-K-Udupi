import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'ArcGIS Pro', icon: '/assets/tech/arcgis-pro.png' },
  { name: 'QGIS', icon: '/assets/tech/qgis.png' },
  { name: 'Google Earth Engine', icon: '/assets/tech/google-earth-engine.png' },
  { name: 'HEC-RAS', icon: '/assets/tech/hec-ras.png' },
  { name: 'Python', icon: '/assets/tech/python.png' },
  { name: 'Agisoft Metashape', icon: '/assets/tech/agisoft-metashape.png' },
];

const HeroSection = () => {
  const trackRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.children;
    const totalItems = items.length;

    const tickerRestDuration = 75; 
    const slideDuration = 200; 
    const tickerSpeed = tickerRestDuration + slideDuration;

    let tickerIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function playTicker() {
      tickerIndex++;
      
      // Batch DOM updates cleanly inside a single frame callback
      requestAnimationFrame(() => {
        if (track) {
          track.style.transition = `transform ${slideDuration / 1000}s cubic-bezier(0.25, 1, 0.5, 1)`;
          track.style.transform = `translateY(-${tickerIndex * (100 / totalItems)}%)`;
        }
      });

      let nextDelay = tickerSpeed; 
      const checkIndex = tickerIndex % (totalItems - 1);
      
      // Check for the special gold item
      if (items[checkIndex] && items[checkIndex].classList.contains('ticker-item-gold')) { 
        nextDelay = 5000; 
      }

      // Seamless Reset Check
      if (tickerIndex === totalItems - 1) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (track) {
              track.style.transition = "none"; 
              tickerIndex = 0;
              track.style.transform = `translateY(0%)`;
            }
          });
        }, slideDuration); // Fire exactly when the slide finishes
      }

      timeoutId = setTimeout(playTicker, nextDelay);
    }

    // Kick off the loop safely
    timeoutId = setTimeout(playTicker, tickerSpeed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div 
          className="headline-stack"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="static-line">
            HEY, I'M
            <a
              href="#contact"
              className="stroke-text name-button"
              data-text="SATWIK"
            >
              SATWIK
            </a>
          </h1>

          <div className="action-line">
            <span className="action-static">AND I'M&nbsp;</span>
            <span className="ticker-wrapper">
              <span className="ticker-track" id="ticker-track" ref={trackRef}>
                <span className="ticker-item">A GIS EXPERT</span>
                <span className="ticker-item">AN ENGINEER</span>
                <span className="ticker-item">A HYDROLOGIST</span>
                <span className="ticker-item">A BIKER</span>
                <span className="ticker-item">A PHOTOGRAPHER</span>
                <span className="ticker-item">GIS ANALYST</span>
                <span className="ticker-item">A PROBLEM SOLVER</span>
                <span className="ticker-item">A DESIGNER</span>
                <span className="ticker-item-gold">STILL LEARNING.</span>
                <span className="ticker-item">AN ENGINEER</span>
                <span className="ticker-item">A GIS EXPERT</span>
              </span>
            </span>
          </div>

          <motion.div 
            className="mt-24 w-full max-w-5xl z-10 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {/* Elegant divider */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="h-[1px] w-16 md:w-32 bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <p className="text-center text-xs md:text-sm tracking-[0.4em] uppercase text-amber-600 font-bold drop-shadow-sm">
                Core Technologies
              </p>
              <div className="h-[1px] w-16 md:w-32 bg-gradient-to-l from-transparent to-amber-500/50"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="group relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  {/* Subtle animated border gradient */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-[1px]" />
                  <div className="absolute inset-[1px] rounded-full bg-white/95 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                  {/* Icon Container */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm group-hover:border-amber-200 group-hover:shadow-amber-500/20 transition-all duration-300">
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-5 h-5 md:w-7 md:h-7 object-contain group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300" 
                    />
                  </div>

                  {/* Text */}
                  <span className="relative z-10 font-bold text-sm md:text-base text-gray-700 group-hover:text-amber-700 transition-all duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
