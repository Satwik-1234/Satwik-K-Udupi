import { motion } from 'framer-motion';
import { INTRO_WILL_RUN, MaskLines } from '../ui';

const D = INTRO_WILL_RUN ? 1.5 : 0;

const Hero = () => (
  <section id="top" style={{ minHeight: '100svh', display: 'grid', gridTemplateRows: '1fr auto', padding: 'clamp(84px,12vh,120px) 0 28px', position: 'relative' }}>
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 62% at 24% 56%, rgba(242,237,226,.88), rgba(242,237,226,.55) 55%, rgba(242,237,226,0) 100%)' }} />
    <div className="a-wrap" style={{ alignSelf: 'center', position: 'relative' }}>
      <motion.div className="a-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + D, duration: 1 }}
        style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 'clamp(18px,3vw,36px)' }}>
        <span>Plate 00 — Index</span><span style={{ color: 'var(--signal)' }}>●</span>
        <span>Hydrologist · GIS analyst · DST-SERB JRF, Shivaji University</span>
      </motion.div>

      <h1 className="a-display" aria-label="Satwik K. Udupi">
        <MaskLines immediate delay={0.15 + D} lines={[
          <>Satwik <span className="a-em">K.</span></>,
          <>Udupi</>,
        ]} />
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', marginTop: 'clamp(24px,4vw,54px)' }} className="hero-sub">
        <motion.p className="a-lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + D, duration: 1 }}
          style={{ color: 'var(--ink)', maxWidth: '38ch', fontSize: 'clamp(1.15rem,1.9vw,1.6rem)' }}>
          I model where water goes — and who is in its way. Flood hydraulics, watershed hydrology and geospatial intelligence for dams, rivers and basins.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + D, duration: 1 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
          <a href="#work" className="a-btn solid" data-cursor="Go"><span>See the work ↓</span></a>
          <a href="#contact" className="a-btn" data-cursor="Talk" style={{ background: 'rgba(242,237,226,.9)' }}><span>Hire me</span></a>
        </motion.div>
      </div>
    </div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 + D, duration: 1 }}
      className="a-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap', position: 'relative' }}>
      <div className="a-label" style={{ lineHeight: 1.9 }}>
        <div>17°17′N 74°11′E</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 70, height: 6, borderInline: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', display: 'inline-block' }} /> 5 km
        </div>
      </div>
      <div className="a-label" style={{ maxWidth: 360, textAlign: 'right', lineHeight: 1.9 }}>
        Move the cursor to pour water ·{' '}
        <span style={{ color: 'var(--signal)' }}>click</span> to make rain · scroll to raise the river
      </div>
    </motion.div>
  </section>
);
export default Hero;
