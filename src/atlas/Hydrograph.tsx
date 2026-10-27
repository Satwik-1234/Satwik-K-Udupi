import { useMemo, useState } from 'react';

export interface Series { pts: { x: number; y: number }[]; dashed?: boolean; color?: string; area?: boolean; label: string }
interface Props {
  series: Series[]; xLabel: (x: number) => string; yUnit: string;
  hlines?: { y: number; label: string; color: string }[]; nowX?: number; height?: number; yMax?: number; yMin?: number; width?: number;
}

/** Small dependency-free hydrograph with hover read-out. */
export default function Hydrograph({ series, xLabel, yUnit, hlines = [], nowX, height = 340, yMax, yMin = 0, width = 900 }: Props) {
  const W = width, H = height, m = { l: 54, r: 18, t: 18, b: 34 };
  const [hover, setHover] = useState<number | null>(null);
  const { x0, x1, y1, X, Y } = useMemo(() => {
    const xs = series.flatMap((s) => s.pts.map((p) => p.x)); const ys = series.flatMap((s) => s.pts.map((p) => p.y)).concat(hlines.map((h) => h.y));
    const x0 = Math.min(...xs), x1 = Math.max(...xs);
    const y1 = yMax ?? (yMin ? Math.ceil(Math.max(...ys)) : Math.ceil(Math.max(...ys) * 1.08));
    return { x0, x1, y1, X: (x: number) => m.l + ((x - x0) / (x1 - x0 || 1)) * (W - m.l - m.r), Y: (y: number) => H - m.b - ((y - yMin) / ((y1 - yMin) || 1)) * (H - m.t - m.b) };
  }, [series, hlines, yMax, yMin, H]);

  const path = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.x).toFixed(1)},${Y(p.y).toFixed(1)}`).join('');
  const yTicks = Array.from({ length: 5 }, (_, i) => yMin + ((y1 - yMin) / 4) * i);
  const xTicks = Array.from({ length: 6 }, (_, i) => x0 + ((x1 - x0) / 5) * i);
  const all = series[0]?.pts ?? [];
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = x0 + ((((e.clientX - r.left) / r.width) * W - m.l) / (W - m.l - m.r)) * (x1 - x0);
    setHover(Math.max(x0, Math.min(x1, x)));
  };
  const near = (s: Series, x: number) => s.pts.reduce((a, b) => (Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a), s.pts[0]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'pan-y' }} role="img" aria-label="Hydrograph"
      onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      {yTicks.map((t) => (
        <g key={t}><line x1={m.l} x2={W - m.r} y1={Y(t)} y2={Y(t)} stroke="var(--rule)" /><text x={m.l - 10} y={Y(t) + 4} textAnchor="end" fontFamily="var(--f-mono)" fontSize="11" fill="var(--ink-soft)">{t.toFixed(yMin || t < 10 ? 1 : 0)}</text></g>
      ))}
      <text x={m.l - 10} y={10} textAnchor="end" fontFamily="var(--f-mono)" fontSize="10" fill="var(--ink-faint)">{yUnit}</text>
      {xTicks.map((t, i) => (<text key={t} x={X(t)} y={H - 10} textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'} fontFamily="var(--f-mono)" fontSize="11" fill="var(--ink-soft)">{xLabel(t)}</text>))}
      {hlines.map((h) => (
        <g key={h.label}><line x1={m.l} x2={W - m.r} y1={Y(h.y)} y2={Y(h.y)} stroke={h.color} strokeDasharray="2 5" strokeWidth="1.4" />
          {h.label && <text x={W - m.r} y={Y(h.y) - 6} textAnchor="end" fontFamily="var(--f-mono)" fontSize="10" letterSpacing="1" fill={h.color}>{h.label.toUpperCase()}</text>}</g>
      ))}
      {series.map((s) => (
        <g key={s.label}>
          {s.area && <path d={`${path(s.pts)}L${X(s.pts[s.pts.length - 1].x)},${Y(yMin)}L${X(s.pts[0].x)},${Y(yMin)}Z`} fill="var(--water-wash)" opacity=".55" />}
          <path d={path(s.pts)} fill="none" stroke={s.color ?? 'var(--water)'} strokeWidth={s.dashed ? 2 : 2.4} strokeDasharray={s.dashed ? '7 6' : undefined} strokeLinejoin="round" />
        </g>
      ))}
      {nowX !== undefined && (<g><line x1={X(nowX)} x2={X(nowX)} y1={m.t} y2={H - m.b} stroke="var(--ink)" /><text x={X(nowX) + 6} y={m.t + 10} fontFamily="var(--f-mono)" fontSize="10" letterSpacing="1" fill="var(--ink)">NOW</text></g>)}
      {hover !== null && all.length > 0 && (
        <g>
          <line x1={X(hover)} x2={X(hover)} y1={m.t} y2={H - m.b} stroke="var(--signal)" />
          {series.map((s) => { const p = near(s, hover); return Math.abs(p.x - hover) < (x1 - x0) / 20 ? (
            <g key={s.label}><circle cx={X(p.x)} cy={Y(p.y)} r="4.5" fill="var(--signal)" /><text x={Math.min(X(p.x) + 10, W - 120)} y={Y(p.y) - 10} fontFamily="var(--f-mono)" fontSize="12" fill="var(--ink)">{p.y.toFixed(yMin || p.y < 100 ? 2 : 0)} {yUnit}</text></g>) : null; })}
        </g>
      )}
    </svg>
  );
}
