import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INTRO_WILL_RUN } from './ui';

/** One-time "survey" intro: a counter climbs while a water line rises, then the sheet lifts away. */
export default function Intro() {
  const [on, setOn] = useState(INTRO_WILL_RUN);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    try { sessionStorage.setItem('sku-intro', '1'); } catch { /* ignore */ }
    const t0 = performance.now(); let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1250); setN(Math.round(100 * (1 - Math.pow(1 - p, 2.2)))); if (p < 1) raf = requestAnimationFrame(tick); else setTimeout(() => setOn(false), 180); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <AnimatePresence>
      {on && (
        <motion.div aria-hidden="true" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'var(--paper)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: `${n}%`, background: 'var(--water-wash)', opacity: 0.7, transition: 'height .12s linear' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: `${n}%`, height: 2, background: 'var(--signal)' }} />
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div className="a-serif" style={{ fontSize: 'clamp(4rem,14vw,11rem)', lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>{String(n).padStart(2, '0')}<span className="a-em" style={{ fontSize: '.4em' }}> %</span></div>
            <div className="a-label" style={{ marginTop: 18 }}>Surveying the basin · 17°17′N 74°11′E</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
