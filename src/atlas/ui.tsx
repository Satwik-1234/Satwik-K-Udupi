import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { maps } from '@/data/portfolio';

const ease = [0.2, 0.8, 0.2, 1] as const;

export const Reveal = ({ children, delay = 0, y = 28, className, style }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: React.CSSProperties }) => (
  <motion.div className={className} style={style}
    initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }}
    transition={{ duration: 0.9, delay, ease }}>
    {children}
  </motion.div>
);

/** Headline whose lines slide up out of a mask. Pass lines as an array of nodes. */
export const MaskLines = ({ lines, className, delay = 0, immediate = false }: { lines: ReactNode[]; className?: string; delay?: number; immediate?: boolean }) => {
  // observe the (unclipped) wrapper — observing the masked child never fires
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-8% 0px' });
  const show = immediate || seen;
  return (
    <span ref={ref} className={className} style={{ display: 'block' }}>
      {lines.map((l, i) => (
        <span key={i} className="a-mask" style={{ paddingBottom: '0.1em', marginBottom: '-0.1em' }}>
          <motion.span style={{ display: 'block' }} initial={{ y: '115%' }} animate={{ y: show ? 0 : '115%' }}
            transition={{ duration: 1.1, delay: delay + i * 0.11, ease }}>
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const PlateHead = ({ n, label, right }: { n: string; label: string; right?: string }) => (
  <div className="a-plate-head">
    <span className="num">{n}</span>
    <span className="a-label">{label}</span>
    <span className="a-label" style={{ color: 'var(--ink-faint)' }}>{right}</span>
  </div>
);

export const CountUp = ({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    const t0 = performance.now(); let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1800);
      setV(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

/* ───────── Lightbox ───────── */
const LightboxCtx = createContext<{ open: (id: string) => void }>({ open: () => {} });
export const useLightbox = () => useContext(LightboxCtx);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [idx, setIdx] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState('50% 50%');
  const open = useCallback((id: string) => { setIdx(Math.max(0, maps.findIndex((m) => m.id === id))); setZoom(false); }, []);
  const step = useCallback((d: number) => { setIdx((i) => (i === null ? i : (i + d + maps.length) % maps.length)); setZoom(false); }, []);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', k);
    document.documentElement.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.documentElement.style.overflow = ''; };
  }, [idx, step]);

  const m = idx === null ? null : maps[idx];
  return (
    <LightboxCtx.Provider value={{ open }}>
      {children}
      {m && createPortal(
        <div role="dialog" aria-modal="true" aria-label={m.title}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(242,237,226,.985)', display: 'grid', gridTemplateRows: 'auto 1fr auto', padding: '14px var(--gutter) 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="a-label">Plate {String((idx ?? 0) + 1).padStart(2, '0')} / {String(maps.length).padStart(2, '0')} · {m.theme}</span>
            <button className="a-label" onClick={() => setIdx(null)} data-cursor="Close" style={{ color: 'var(--ink)' }}>Close ×</button>
          </div>
          <div style={{ minHeight: 0, display: 'grid', placeItems: 'center', overflow: 'hidden' }}
            onMouseMove={(e) => { if (!zoom) return; const r = e.currentTarget.getBoundingClientRect(); setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`); }}>
            <img src={m.src} alt={m.title} data-cursor={zoom ? 'Out' : 'Zoom'} onClick={() => setZoom((z) => !z)}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', border: '1px solid var(--rule-strong)', background: '#fff', transform: zoom ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin, transition: 'transform .5s cubic-bezier(.2,.8,.2,1)', cursor: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap', paddingTop: 12 }}>
            <div>
              <div className="a-h3" style={{ fontSize: 'clamp(1.3rem,2.4vw,2rem)' }}>{m.title}</div>
              <div className="a-label" style={{ marginTop: 6 }}>{m.basin} · {m.tool}</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="a-btn" onClick={() => step(-1)} aria-label="Previous map"><span>← Prev</span></button>
              <button className="a-btn" onClick={() => step(1)} aria-label="Next map"><span>Next →</span></button>
            </div>
          </div>
        </div>,
        (document.querySelector('.atlas') as HTMLElement) ?? document.body
      )}
    </LightboxCtx.Provider>
  );
};

/** Accessible expand/collapse row with animated height. */
export const Disclosure = ({ head, children, defaultOpen = false }: { head: ReactNode; children: ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: '1px solid var(--rule-strong)' }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} data-cursor={open ? 'Close' : 'Open'}
        style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, width: '100%', textAlign: 'left', padding: '24px 0', alignItems: 'start', cursor: 'none' }}>
        <div>{head}</div>
        <span className="a-mono" style={{ fontSize: 22, lineHeight: 1, transition: 'transform .35s', transform: open ? 'rotate(45deg)' : 'none', color: 'var(--signal)' }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: 30 }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Makes a non-button element keyboard-operable (Enter / Space). */
export const pressable = (fn: () => void) => ({
  role: 'button' as const, tabIndex: 0, onClick: fn,
  onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } },
});

/** Whether the one-time intro will run this session (evaluated once, at load). */
export const INTRO_WILL_RUN = (() => {
  try {
    return typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !sessionStorage.getItem('sku-intro');
  } catch { return false; }
})();
