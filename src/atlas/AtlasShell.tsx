import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import Intro from './Intro';
import ContourField from './ContourField';
import '@/styles/atlas.css';

export const lenisRef: { current: Lenis | null } = { current: null };

interface NavItem { label: string; href: string; }
interface ShellProps {
  children: ReactNode;
  variant?: 'personal' | 'company';
  nav: NavItem[];
  brand: ReactNode;
  cta: { label: string; to: string };
}

const COMPANY = { ink: '#0d1a45', water: '#213ba3', wash: '#c3cff2', signal: '#c99a1c' };

export default function AtlasShell({ children, variant = 'personal', nav, brand, cta }: ShellProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const bobRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [menu, setMenu] = useState(false);
  const isCompany = variant === 'company';

  useEffect(() => {
    document.documentElement.classList.add('atlas-on');
    return () => document.documentElement.classList.remove('atlas-on');
  }, []);

  // smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')!;
      const el = id.length > 1 ? document.querySelector(id) : null;
      if (el) { e.preventDefault(); lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.4 }); setMenu(false); }
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; document.removeEventListener('click', onClick); };
  }, []);

  // cursor + gauge
  useEffect(() => {
    const cur = cursorRef.current;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; cur?.classList.add('on'); };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (t && cur && labelRef.current) { labelRef.current.textContent = t.dataset.cursor || ''; cur.classList.add('hover'); }
      else cur?.classList.remove('hover');
    };
    const tick = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      if (cur) cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    const gauge = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, window.scrollY / max);
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      if (bobRef.current) bobRef.current.style.bottom = `${p * 100}%`;
      if (readoutRef.current) readoutRef.current.textContent = (p * 18.26).toFixed(1);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseover', over);
    window.addEventListener('scroll', gauge, { passive: true });
    gauge(); raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseover', over);
      window.removeEventListener('scroll', gauge);
    };
  }, []);

  const colors = isCompany ? COMPANY : {};

  return (
    <MotionConfig reducedMotion="user">
    <div className={`atlas ${isCompany ? 'is-company' : ''}`}>
      <a href="#main" className="a-skip">Skip to content</a>
      {!isCompany && <Intro />}
      <ContourField {...(isCompany ? { ink: COMPANY.ink, water: COMPANY.water, wash: COMPANY.wash, signal: COMPANY.signal } : {})} />
      <div className="a-cursor" ref={cursorRef}><span ref={labelRef} /></div>

      <header className="a-bar">
        <Link to={isCompany ? '/pravaha-tattva' : '/'} data-cursor="Top" className="a-label" style={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 12 }}>
          {brand}
        </Link>
        <nav className="hidden md:flex" style={{ gap: 28, alignItems: 'center' }}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="a-label a-link" style={{ color: 'var(--ink)' }}>{n.label}</a>
          ))}
          <Link to={cta.to} className="a-label" style={{ color: 'var(--ink)', border: '1px solid var(--ink)', padding: '8px 12px' }} data-cursor="Go">
            {cta.label} ↗
          </Link>
        </nav>
        <button className="md:hidden a-label" style={{ color: 'var(--ink)' }} onClick={() => setMenu((m) => !m)} aria-expanded={menu}>
          {menu ? 'Close ×' : 'Index ≡'}
        </button>
      </header>

      {menu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 58, background: 'var(--paper)', padding: '90px var(--gutter) 40px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} className="a-h2" style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
              <span className="a-label">{String(i + 1).padStart(2, '0')}</span>{n.label}
            </a>
          ))}
          <Link to={cta.to} className="a-btn solid" style={{ marginTop: 'auto', justifyContent: 'center' }}><span>{cta.label} ↗</span></Link>
        </div>
      )}

      <aside className="a-gauge" aria-hidden="true">
        <span ref={readoutRef}>0.0</span>
        <div className="tube"><div className="fill" ref={fillRef} /><div className="bob" ref={bobRef} /></div>
        <span>m</span>
      </aside>

      <main id="main" style={{ position: 'relative', zIndex: 2, ...(colors as object) }}>{children}</main>
    </div>
    </MotionConfig>
  );
}
