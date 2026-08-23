import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, MessageCircle, Phone, Map, ZoomIn, Search } from 'lucide-react';
import AuroraText from '@/components/ui/AuroraText';

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

interface MapItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  categoryColor: string;
}

const maps: MapItem[] = [
  { id: 1, src: controlledReleaseMap,  alt: 'Controlled Release Flood Depth Map',    category: 'Flood Modeling',  categoryColor: 'text-blue-400  bg-blue-500/10  border-blue-500/20'  },
  { id: 2, src: damOvertoppingDepth,   alt: 'Dam Overtopping Failure Scenario',        category: 'Dam Safety',      categoryColor: 'text-rose-400  bg-rose-500/10  border-rose-500/20'  },
  { id: 3, src: damSeismicDepth,       alt: 'Dam Seismic Collapse Scenario',           category: 'Dam Safety',      categoryColor: 'text-rose-400  bg-rose-500/10  border-rose-500/20'  },
  { id: 4, src: floodRiskMap,          alt: 'Flood Risk Map – Mula Mutha Basin',       category: 'Risk Assessment', categoryColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  { id: 5, src: lulc2024Map,           alt: 'LULC 2024 – Pravara River Basin',         category: 'Land Use',        categoryColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { id: 6, src: koynaRiverBasin,       alt: 'Koyna River Basin Location Map',          category: 'Watershed',       categoryColor: 'text-cyan-400  bg-cyan-500/10  border-cyan-500/20'  },
  { id: 7, src: soilLossClass,         alt: 'Soil Loss Class – Panchganga Basin',      category: 'Erosion',         categoryColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  { id: 8, src: krishnaLulcMap,        alt: 'LULC – Krishna Upper Reach Basin',        category: 'Land Use',        categoryColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { id: 9, src: urbanIndexMap,         alt: 'Urban Index Map – Kolhapur',              category: 'Urban Analysis',  categoryColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
];

// ── Masonry Grid Item ──────────────────────────────────────────────────────────
interface GridItemProps {
  item: MapItem;
  index: number;
  isInView: boolean;
  onOpen: (index: number) => void;
}

const GridItem = ({ item, index, isInView, onOpen }: GridItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="mb-5 break-inside-avoid relative cursor-pointer group"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.055, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
    >
      {/* Card shell */}
      <div className="relative rounded-2xl overflow-hidden border border-border/30 group-hover:border-primary/40 transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:shadow-primary/10">

        {/* Image */}
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Gradient overlay — always present, stronger on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bottom meta — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-4"
            >
              <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-widest
                               px-2 py-0.5 rounded-full border mb-2 ${item.categoryColor}`}>
                {item.category}
              </span>
              <p className="text-white text-sm font-semibold leading-snug line-clamp-2">
                {item.alt}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom badge */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full
                         bg-background/80 backdrop-blur-md border border-border/60
                         flex items-center justify-center text-primary shadow-lg"
            >
              <Search className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ── Main Section ───────────────────────────────────────────────────────────────
const MapGallerySection = () => {
  const [selectedMap, setSelectedMap] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const whatsappUrl = `https://wa.me/919834300849?text=${encodeURIComponent('Hi Satwik, I viewed your GIS portfolio and would like to discuss a project.')}`;

  const openModal = (index: number) => {
    setSelectedMap(index);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedMap(null);
    document.body.style.overflow = 'auto';
  };
  const goToPrevious = () =>
    setSelectedMap((s) => (s === null ? 0 : s === 0 ? maps.length - 1 : s - 1));
  const goToNext = () =>
    setSelectedMap((s) => (s === null ? 0 : s === maps.length - 1 ? 0 : s + 1));

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (selectedMap === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [selectedMap]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goToNext() : goToPrevious();
    setTouchStart(null);
  };

  const downloadMap = () => {
    if (selectedMap === null) return;
    const a = document.createElement('a');
    a.href = maps[selectedMap].src;
    a.download = `map-${selectedMap + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section ref={sectionRef} id="previous-work" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Map className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">GIS Portfolio</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">
            Previous{' '}
            <AuroraText
              colors={['#213BA3', '#47A2F5', '#D6AE29']}
              className="text-4xl md:text-5xl font-bold font-display inline-flex"
            >
              Work
            </AuroraText>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of hydrological, watershed, and geospatial mapping outputs from various research and consulting projects.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Flood Modeling', 'Dam Safety', 'Land Use', 'Watershed', 'Erosion', 'Urban Analysis'].map((c) => (
              <span key={c} className="px-3 py-1 text-[11px] font-mono rounded-full bg-card/50 border border-border/50 text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Masonry Grid ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {maps.map((map, index) => (
            <GridItem
              key={map.id}
              item={map}
              index={index}
              isInView={isInView}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>

      {/* ── Fullscreen Inspect Modal ── */}
      <AnimatePresence>
        {selectedMap !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 flex-shrink-0">
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest
                                  px-2.5 py-0.5 rounded-full border inline-block mb-1
                                  ${maps[selectedMap].categoryColor}`}>
                  {maps[selectedMap].category}
                </span>
                <h3 className="text-sm md:text-base font-semibold text-foreground">
                  {maps[selectedMap].alt}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground hidden sm:block">
                  {selectedMap + 1} / {maps.length}
                </span>
                <button
                  onClick={closeModal}
                  className="p-2.5 rounded-full bg-card/80 hover:bg-card border border-border/50 text-foreground transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ← → nav arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full
                         bg-card/90 hover:bg-card border border-border/50 text-foreground
                         transition-all hidden md:flex items-center justify-center shadow-lg hover:shadow-primary/10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full
                         bg-card/90 hover:bg-card border border-border/50 text-foreground
                         transition-all hidden md:flex items-center justify-center shadow-lg hover:shadow-primary/10"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden">
              <motion.img
                key={selectedMap}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                src={maps[selectedMap].src}
                alt={maps[selectedMap].alt}
                className="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Bottom bar */}
            <div className="px-5 py-4 border-t border-border/30 bg-card/40 backdrop-blur-md flex-shrink-0">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Dot scrubber */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground sm:hidden">
                    {selectedMap + 1} / {maps.length}
                  </span>
                  <div className="flex gap-1.5">
                    {maps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedMap(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === selectedMap
                            ? 'bg-primary w-6'
                            : 'bg-muted-foreground/25 hover:bg-muted-foreground/50 w-2'
                        }`}
                        aria-label={`Go to map ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={downloadMap}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50
                               hover:border-primary/50 text-foreground transition-all text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>

                  <a
                    href="tel:+919834300849"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground
                               text-background hover:bg-foreground/90 transition-all text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500
                               hover:bg-green-600 text-white transition-all text-sm font-medium"
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


