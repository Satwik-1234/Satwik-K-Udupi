import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, MessageCircle, Phone, Map, ZoomIn } from 'lucide-react';
import GradientText from '@/components/ui/GradientText';

// Import all map images
import controlledReleaseMap from '@/assets/maps/controlled-release-map.jpg';
import damOvertoppingDepth from '@/assets/maps/dam-overtopping-depth.jpg';
import damSeismicDepth from '@/assets/maps/dam-seismic-depth.jpg';
import floodRiskMap from '@/assets/maps/flood-risk-map.jpg';
import lulc2024Map from '@/assets/maps/lulc-2024-map.png';
import koynaRiverBasin from '@/assets/maps/koyna-river-basin.jpg';
import soilLossClass from '@/assets/maps/soil-loss-class.jpg';
import krishnaLulcMap from '@/assets/maps/krishna-lulc-map.jpg';
import urbanIndexMap from '@/assets/maps/urban-index-map.jpg';

const maps = [
  { id: 1, src: controlledReleaseMap, alt: 'Controlled Release Flood Depth Map', category: 'Flood Modeling' },
  { id: 2, src: damOvertoppingDepth, alt: 'Dam Overtopping Failure Scenario', category: 'Dam Safety' },
  { id: 3, src: damSeismicDepth, alt: 'Dam Seismic Collapse Scenario', category: 'Dam Safety' },
  { id: 4, src: floodRiskMap, alt: 'Flood Risk Map - Mula Mutha Basin', category: 'Risk Assessment' },
  { id: 5, src: lulc2024Map, alt: 'LULC 2024 - Pravara River Basin', category: 'Land Use' },
  { id: 6, src: koynaRiverBasin, alt: 'Koyna River Basin Location', category: 'Watershed' },
  { id: 7, src: soilLossClass, alt: 'Soil Loss Class - Panchganga Basin', category: 'Erosion' },
  { id: 8, src: krishnaLulcMap, alt: 'LULC - Krishna Upper Reach Basin', category: 'Land Use' },
  { id: 9, src: urbanIndexMap, alt: 'Urban Index Map - Kolhapur', category: 'Urban Analysis' },
];

const MapGallerySection = () => {
  const [selectedMap, setSelectedMap] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const whatsappUrl = `https://wa.me/919834300849?text=${encodeURIComponent('Hi Satwik, I viewed your GIS portfolio and would like to discuss a project.')}`;

  const openModal = (index: number) => {
    setSelectedMap(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMap(null);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    if (selectedMap !== null) {
      setSelectedMap(selectedMap === 0 ? maps.length - 1 : selectedMap - 1);
    }
  };

  const goToNext = () => {
    if (selectedMap !== null) {
      setSelectedMap(selectedMap === maps.length - 1 ? 0 : selectedMap + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMap === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMap]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrevious();
    }
    setTouchStart(null);
  };

  const downloadMap = () => {
    if (selectedMap === null) return;
    const link = document.createElement('a');
    link.href = maps[selectedMap].src;
    link.download = `map-${selectedMap + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={sectionRef}
      id="previous-work" 
      className="py-24 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">GIS Portfolio</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">
            Previous{' '}
            <GradientText
              colors={['#213BA3', '#47A2F5', '#D6AE29']}
              animationSpeed={6}
              className="text-4xl md:text-5xl font-bold font-display inline-flex"
            >
              Work
            </GradientText>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of hydrological, watershed, and geospatial mapping outputs from various research and consulting projects.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['All', 'Flood Modeling', 'Dam Safety', 'Land Use', 'Watershed'].map((cat) => (
            <span 
              key={cat}
              className="px-4 py-2 text-sm rounded-full bg-card/50 border border-border/50 text-muted-foreground"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Map Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {maps.map((map, index) => (
            <motion.div
              key={map.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              onClick={() => openModal(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              <img
                src={map.src}
                alt={map.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-medium text-primary mb-1">{map.category}</span>
                <h4 className="text-sm font-semibold text-foreground line-clamp-2">{map.alt}</h4>
              </div>
              
              {/* Zoom icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-border/50">
                <ZoomIn className="w-4 h-4 text-foreground" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedMap !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border/30">
              <div>
                <span className="text-xs font-medium text-primary">{maps[selectedMap].category}</span>
                <h3 className="text-sm md:text-base font-semibold text-foreground mt-1">{maps[selectedMap].alt}</h3>
              </div>
              <button
                onClick={closeModal}
                className="p-3 rounded-full bg-card/80 hover:bg-card border border-border/50 text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card/80 hover:bg-card border border-border/50 text-foreground transition-colors hidden md:flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-card/80 hover:bg-card border border-border/50 text-foreground transition-colors hidden md:flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image container */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12">
              <motion.img
                key={selectedMap}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={maps[selectedMap].src}
                alt={maps[selectedMap].alt}
                className="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-lg"
              />
            </div>

            {/* Bottom bar */}
            <div className="p-4 md:p-6 border-t border-border/30 bg-card/30 backdrop-blur-md">
              <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Counter */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-foreground font-semibold">{selectedMap + 1}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-muted-foreground">{maps.length}</span>
                  </div>
                  <div className="flex gap-1">
                    {maps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedMap(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === selectedMap ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadMap}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border/50 hover:border-primary/50 text-foreground transition-all text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  
                  <a
                    href="tel:+919834300849"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call</span>
                  </a>
                  
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all text-sm font-medium"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapGallerySection;
