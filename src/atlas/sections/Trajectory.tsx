import { useState } from 'react';
import { certificationsFull } from '@/data/legacy';
import { Reveal } from '../ui';

/* months since Sep 2021 */
const m = (y: number, mo: number) => (y - 2021) * 12 + (mo - 9);
const END = m(2026, 12);
const pct = (v: number) => `${(v / END) * 100}%`;
const MON: Record<string, number> = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
const NOW = m(2026, 10);

interface Bar { id: string; label: string; sub: string; from: number; to: number; lane: number; tone: 'ink' | 'water' | 'signal'; open?: boolean }
const tracks: { name: string; lanes: number; bars: Bar[] }[] = [
  { name: 'Study', lanes: 1, bars: [
    { id: 'btech', label: 'B.Tech · Agricultural Engineering', sub: 'Sahyadri College / MPKV Rahuri · First Class with Distinction · CGPA 8.27', from: m(2021, 9), to: m(2025, 6), lane: 0, tone: 'ink' },
  ] },
  { name: 'Field & industry', lanes: 3, bars: [
    { id: 'cfmtti', label: 'CFMTTI', sub: 'Farm machinery training · Budni, MP · Sep 2023', from: m(2023, 9), to: m(2023, 10), lane: 0, tone: 'water' },
    { id: 'itr', label: 'Indo-German Tool Room', sub: 'CFD & FEA simulation · Ahmedabad · Jun–Jul 2024', from: m(2024, 6), to: m(2024, 8), lane: 0, tone: 'water' },
    { id: 'shivaji', label: 'Shivaji University', sub: 'Hydrology, GEE & photogrammetry · Kolhapur · Aug–Dec 2024', from: m(2024, 8), to: m(2025, 1), lane: 1, tone: 'water' },
    { id: 'forest', label: 'Forest Dept.', sub: 'Camera-trap analytics · Sahyadri Tiger Reserve · Mar–Apr 2025', from: m(2025, 3), to: m(2025, 5), lane: 2, tone: 'water' },
    { id: 'jrf', label: 'DST-SERB JRF · Shivaji University', sub: 'Junior Research Fellow · IoT & geoinformatics flood monitoring and prediction (HydroCast) · start date not shown', from: m(2026, 1), to: NOW + 1, lane: 2, tone: 'signal', open: true },
    { id: 'ghod', label: 'Resilient River Ghod', sub: 'Project Associate · Shramjivi Janata Sahayyak Mandal · Sep 2025 – now', from: m(2025, 9), to: NOW + 1, lane: 1, tone: 'signal' },
  ] },
  { name: 'Studies & projects', lanes: 3, bars: [
    { id: 'panch', label: 'Panchganga RUSLE', sub: 'Spatiotemporal analysis & soil loss · Aug–Sep 2024', from: m(2024, 8), to: m(2024, 10), lane: 0, tone: 'ink' },
    { id: 'mula', label: 'Mula–Mutha risk', sub: 'Floodplain zonation · Nov–Dec 2024', from: m(2024, 11), to: m(2025, 1), lane: 1, tone: 'ink' },
    { id: 'koyna', label: 'Koyna dam breach', sub: 'PMF & 2D breach modelling · Feb–May 2025', from: m(2025, 2), to: m(2025, 6), lane: 2, tone: 'ink' },
    { id: 'pravaha', label: 'Pravaha Tattva Solutions', sub: 'Consulting company · dam-break, flood-frequency, GIS, CSR reports · ongoing (start date not shown)', from: m(2025, 7), to: NOW + 1, lane: 0, tone: 'signal', open: true },
    { id: 'hydrocast', label: 'Hydrocast', sub: 'HydroCast · operational flood-forecasting system · Panchganga basin', from: m(2026, 5), to: NOW + 1, lane: 1, tone: 'signal', open: true },
  ] },
];

const credDots = certificationsFull
  .map((c) => { const [mo, y] = c.date.split(' '); return { ...c, at: m(+y, MON[mo]) }; })
  .filter((c) => c.at >= 0)
  .sort((a, b) => a.at - b.at);
const stack: Record<number, number> = {};
const dots = credDots.map((c) => { const k = (stack[c.at] = (stack[c.at] ?? -1) + 1); return { ...c, k }; });

const years = [2022, 2023, 2024, 2025, 2026];
const toneBg = { ink: 'var(--ink)', water: 'var(--water)', signal: 'var(--signal)' };

const Trajectory = () => {
  const [info, setInfo] = useState<{ title: string; sub: string } | null>(null);
  const lh = 34;
  return (
    <Reveal>
      <div className="a-label" style={{ marginBottom: 6, color: 'var(--ink)' }}>Trajectory · Sep 2021 → today</div>
      <p style={{ color: 'var(--ink-soft)', maxWidth: '60ch', marginBottom: 22 }}>
        Machinery and CFD first, then hydrology and remote sensing, then conservation and community watershed work — all while studying, building projects and starting a company.
      </p>
      <div style={{ overflowX: 'auto', paddingBottom: 6 }}>
        <div style={{ minWidth: 860, position: 'relative', paddingLeft: 118 }}>
          {/* year grid */}
          <div style={{ position: 'absolute', left: 118, right: 0, top: 0, bottom: 28, pointerEvents: 'none' }}>
            {years.map((y) => (<div key={y} style={{ position: 'absolute', left: pct(m(y, 1)), top: 0, bottom: 0, borderLeft: '1px dashed var(--rule)' }} />))}
            <div style={{ position: 'absolute', left: pct(NOW + 0.5), top: -4, bottom: 0, borderLeft: '1px solid var(--signal)' }}>
              <span className="a-label" style={{ position: 'absolute', top: -14, left: -14, color: 'var(--signal)' }}>NOW</span>
            </div>
          </div>

          {tracks.map((t) => (
            <div key={t.name} style={{ position: 'relative', height: t.lanes * lh + 14, borderTop: '1px solid var(--rule-strong)' }}>
              <span className="a-label" style={{ position: 'absolute', left: -118, top: 12, width: 108, color: 'var(--ink)' }}>{t.name}</span>
              {t.bars.map((b) => (
                <button key={b.id} onMouseEnter={() => setInfo({ title: b.label, sub: b.sub })} onFocus={() => setInfo({ title: b.label, sub: b.sub })} data-cursor="Info" aria-label={`${b.label}. ${b.sub}`}
                  style={{ position: 'absolute', left: pct(b.from), width: `calc(${pct(b.to - b.from)} - 2px)`, top: 8 + b.lane * lh, height: lh - 6, background: b.open ? `linear-gradient(to right, transparent, ${toneBg[b.tone]} 45%)` : toneBg[b.tone], color: '#f2ede2', textAlign: 'left', padding: '0 8px', fontFamily: 'var(--f-mono)', fontSize: 10.5, letterSpacing: '.04em', whiteSpace: 'nowrap', overflow: 'visible', cursor: 'none', display: 'flex', alignItems: 'center' }}>
                  <span style={!b.open && b.to - b.from < 8 ? { position: 'absolute', left: '100%', marginLeft: 6, color: 'var(--ink)' } : b.open ? { marginLeft: 'auto' } : undefined}>
                    {b.label}
                  </span>
                </button>
              ))}
            </div>
          ))}

          {/* credentials */}
          <div style={{ position: 'relative', height: 4 * 14 + 22, borderTop: '1px solid var(--rule-strong)', borderBottom: '1px solid var(--rule-strong)' }}>
            <span className="a-label" style={{ position: 'absolute', left: -118, top: 12, width: 108, color: 'var(--ink)' }}>Credentials</span>
            {dots.map((c) => (
              <button key={c.name + c.date} onMouseEnter={() => setInfo({ title: c.name, sub: `${c.issuer} · ${c.date}` })} onFocus={() => setInfo({ title: c.name, sub: `${c.issuer} · ${c.date}` })} aria-label={`${c.name}, ${c.issuer}, ${c.date}`} data-cursor="Info"
                style={{ position: 'absolute', left: `calc(${pct(c.at + 0.5)} - 5px)`, top: 12 + c.k * 14, width: 10, height: 10, borderRadius: '50%', background: 'var(--signal)', border: '1px solid var(--paper)', cursor: 'none' }} />
            ))}
          </div>
          <div style={{ position: 'relative', height: 26 }}>
            {years.map((y) => (<span key={y} className="a-label" style={{ position: 'absolute', left: pct(m(y, 1)), top: 6, transform: 'translateX(4px)' }}>{y}</span>))}
          </div>
        </div>
      </div>
      <div aria-live="polite" style={{ minHeight: 56, marginTop: 8 }}>
        {info ? (<><div className="a-h3" style={{ fontSize: '1.5rem' }}>{info.title}</div><div className="a-label" style={{ marginTop: 4 }}>{info.sub}</div></>)
          : <div className="a-label">Hover or focus any bar or dot for detail · {dots.length} credentials since 2023</div>}
      </div>
    </Reveal>
  );
};
export default Trajectory;
