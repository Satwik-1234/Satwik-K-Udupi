import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu } from 'lucide-react';

// Tech stack logos
import pythonLogo from '@/assets/tech/python.png';
import javascriptLogo from '@/assets/tech/javascript.png';
import googleEarthProLogo from '@/assets/tech/google-earth-pro.png';
import googleEarthEngineLogo from '@/assets/tech/google-earth-engine.png';
import hecHmsLogo from '@/assets/tech/hec-hms.png';
import hecRasLogo from '@/assets/tech/hec-ras.png';
import agisoftLogo from '@/assets/tech/agisoft-metashape.png';
import arcgisProLogo from '@/assets/tech/arcgis-pro.png';
import arcmapLogo from '@/assets/tech/arcmap.png';
import qgisLogo from '@/assets/tech/qgis.png';
import arcgisOnlineLogo from '@/assets/tech/arcgis-online.png';
import googleColabLogo from '@/assets/tech/google-colab.png';
import ansysLogo from '@/assets/tech/ansys.png';
import rstudioLogo from '@/assets/tech/rstudio.png';

interface TechItem {
  name: string;
  logo: string;
  category: string;
}

const ROW_1: TechItem[] = [
  { name: 'HEC-RAS', logo: hecRasLogo, category: 'Hydrology' },
  { name: 'HEC-HMS', logo: hecHmsLogo, category: 'Hydrology' },
  { name: 'ArcGIS Pro', logo: arcgisProLogo, category: 'GIS' },
  { name: 'QGIS', logo: qgisLogo, category: 'GIS' },
  { name: 'Google Earth Engine', logo: googleEarthEngineLogo, category: 'Remote Sensing' },
  { name: 'Python', logo: pythonLogo, category: 'Programming' },
  { name: 'ANSYS Fluent', logo: ansysLogo, category: 'Engineering' },
];

const ROW_2: TechItem[] = [
  { name: 'ArcMap', logo: arcmapLogo, category: 'GIS' },
  { name: 'Agisoft Metashape', logo: agisoftLogo, category: 'Remote Sensing' },
  { name: 'ArcGIS Online', logo: arcgisOnlineLogo, category: 'GIS' },
  { name: 'Google Earth Pro', logo: googleEarthProLogo, category: 'Remote Sensing' },
  { name: 'Google Colab', logo: googleColabLogo, category: 'Programming' },
  { name: 'JavaScript', logo: javascriptLogo, category: 'Programming' },
  { name: 'R Studio', logo: rstudioLogo, category: 'Programming' },
];




interface MarqueeRowProps {
  items: TechItem[];
  direction?: 'forwards' | 'reverse';
  speed?: string;
}

const MarqueeRow = ({ items, direction = 'forwards', speed = '32s' }: MarqueeRowProps) => {
  const doubled = [...items, ...items, ...items]; // triple for seamless loop

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div
        className="flex items-center"
        style={{
          width: 'max-content',
          gap: '3rem',
          animation: `tech-marquee-${direction} ${speed} linear infinite`,
        }}
      >
        {doubled.map((item, idx) => {
          return (
            <div
              key={`${item.name}-${idx}`}
              className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-default"
              style={{ width: '104px' }}
            >
              {/* Icon */}
              <div className="relative">
                <div className="absolute -inset-3 rounded-2xl bg-primary/0 group-hover:bg-primary/8 transition-all duration-500 blur-sm" />
                <img
                  src={item.logo}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="relative object-contain opacity-40 group-hover:opacity-100
                             transition-all duration-400 group-hover:scale-110 drop-shadow-none
                             group-hover:drop-shadow-[0_0_16px_rgba(71,162,245,0.45)]"
                  loading="lazy"
                  style={{ width: '72px', height: '72px' }}
                />
              </div>

              {/* Name */}
              <span className="text-[11px] font-mono font-medium text-center leading-tight
                               text-muted-foreground/40 group-hover:text-muted-foreground
                               transition-colors duration-300 max-w-[96px]">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const id = 'tech-marquee-keyframes-v2';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = `
      @keyframes tech-marquee-forwards {
        from { transform: translateX(0); }
        to   { transform: translateX(calc(-100% / 3)); }
      }
      @keyframes tech-marquee-reverse {
        from { transform: translateX(calc(-100% / 3)); }
        to   { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.getElementById(id)?.remove();
  }, []);

  const categoryLabels = [
    { label: 'GIS & Mapping', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
    { label: 'Hydrology', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20' },
    { label: 'Remote Sensing', color: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20' },
    { label: 'Programming', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    { label: 'Engineering', color: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/20' },
  ];

  return (
    <section className="py-28 relative overflow-hidden" ref={ref}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5"
          >
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Technology Stack</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4">
            Tools &{' '}
            <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg">
            Industry-standard software for geospatial analysis and hydrological modeling
          </p>

          {/* Category legend pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            {categoryLabels.map((c) => (
              <span
                key={c.label}
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${c.color}`}
              >
                {c.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Marquee rows ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col gap-12"
        >
          <MarqueeRow items={ROW_1} direction="forwards" speed="38s" />
          <MarqueeRow items={ROW_2} direction="reverse" speed="32s" />
        </motion.div>

        {/* ── Subtle divider count ────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs font-mono text-muted-foreground/40 mt-14 tracking-widest uppercase"
        >
          14 Tools · 4 Disciplines · CWC & BIS Compliant Workflows
        </motion.p>
      </div>
    </section>
  );
};

export default TechStackSection;
