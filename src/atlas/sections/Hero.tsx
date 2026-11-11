import { motion } from 'framer-motion';
import { INTRO_WILL_RUN, MaskLines } from '../ui';
const D = INTRO_WILL_RUN ? 1.5 : 0;
const Hero = () => (
  <section id="top" className="sci-hero">
    <div className="sci-hero-grid" aria-hidden="true" />
    <div className="a-wrap sci-hero-inner">
      <motion.div className="sci-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + D }}>
        <span className="sci-live-dot" /><span>Hydrology · Water Resources · Geospatial Engineering</span><span className="sci-kicker-location">Maharashtra, India</span>
      </motion.div>
      <div className="sci-hero-copy">
        <h1 className="sci-title" aria-label="Satwik K. Udupi"><MaskLines immediate delay={0.15 + D} lines={[<>Satwik K.</>, <><span className="sci-title-accent">Udupi</span></>]} /></h1>
        <motion.p className="sci-hero-deck" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + D, duration: 0.8 }}>
          I work with hydrological models and geospatial data to investigate river systems, assess flood hazards and support evidence-led water-resources decisions.
        </motion.p>
        <motion.div className="sci-hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 + D }}>
          <a href="#work" className="a-btn solid"><span>Explore selected work ↗</span></a>
          <a href="#about" className="a-btn"><span>Professional profile</span></a>
          <a href="/pravaha-tattva" className="sci-text-link">Pravaha Tattva Solutions ↗</a>
        </motion.div>
      </div>
      <motion.div className="sci-hero-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + D }}>
        <div><span className="sci-micro-label">CURRENT APPOINTMENT</span><strong>Junior Research Fellow · DST-SERB</strong><span>Centre for Climate Change and Sustainability Studies, Shivaji University</span></div>
        <div><span className="sci-micro-label">RESEARCH INTERESTS</span><strong>Flood processes · Watershed response · Geospatial analysis</strong><span>Hydrological modelling, field observations and spatial decision support</span></div>
        <a className="sci-scroll-cue" href="#about" aria-label="Scroll to professional profile">SCROLL TO EXPLORE ↓</a>
      </motion.div>
    </div>
  </section>
);
export default Hero;
