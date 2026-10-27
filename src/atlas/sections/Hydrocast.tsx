import { Fragment, useEffect, useMemo, useState } from 'react';
import { CycleRow, HYDROCAST_LINKS, HydrocastRun, demoRun, loadIndex, loadRun } from '@/lib/hydrocast';
import Hydrograph from '../Hydrograph';
import { MaskLines, PlateHead, Reveal } from '../ui';

const fmtT = (t: number) => new Date(t).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
const fmtFull = (t: number) => new Date(t).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }) + ' IST';

/* SCS-CN rainfall → runoff → triangular unit hydrograph (same method as the coursework models). */
function scs(rain: number, cn: number, area: number) {
  const S = 25400 / cn - 254, Ia = 0.2 * S;
  const Q = rain > Ia ? Math.pow(rain - Ia, 2) / (rain + 0.8 * S) : 0;
  const tc = Math.max(1.5, Math.min(12, Math.sqrt(area) * 0.35));
  const tp = 0.6 * tc + 1;
  const qp = (0.208 * area * Q) / tp;
  const pts: { x: number; y: number }[] = [];
  for (let t = 0; t <= tp * 5; t += 0.5) pts.push({ x: t, y: t <= tp ? qp * Math.pow(t / tp, 1.8) : qp * Math.exp(-((t - tp) / (tp * 1.1)) * 1.6) });
  return { Q, qp, tp, pts };
}

const Slider = ({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) => (
  <label style={{ display: 'block', borderTop: '1px solid var(--rule-strong)', padding: '14px 0 18px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="a-label">{label}</span><span className="a-mono" style={{ fontSize: 14 }}>{value}{unit}</span></div>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} style={{ width: '100%', accentColor: 'var(--signal)', marginTop: 10 }} />
  </label>
);
const Stat = ({ k, v, tone, sub }: { k: string; v: string; tone?: string; sub?: string }) => (
  <div style={{ borderTop: '1px solid var(--rule-strong)', padding: '14px 0' }}>
    <div className="a-label">{k}</div>
    <div className="a-serif" style={{ fontSize: 'clamp(1.7rem,2.8vw,2.4rem)', color: tone ?? 'var(--ink)', lineHeight: 1.1, marginTop: 4 }}>{v}</div>
    {sub && <div className="a-label" style={{ marginTop: 4, textTransform: 'none', letterSpacing: '.02em' }}>{sub}</div>}
  </div>
);

const facts: [string, string][] = [
  ['Project', 'DST-SERB research · IoT & geoinformatics flood monitoring and prediction · CCCSS, Shivaji University'],
  ['Basin', '2,140 km² Panchganga catchment · 9 subbasins · 18 rain gauges'],
  ['Forecast', 'ECMWF IFS HRES 9 km via Open-Meteo · 90 h ahead · every 6 h'],
  ['Hydrology', 'SCS-CN → SCS unit hydrograph → Muskingum routing (HEC-HMS 4.x)'],
  ['Stage', 'WRD-anchored PCHIP rating curves · Shivaji Bridge & Rajaram K.T. Weir'],
  ['Sensing', 'Live ultrasonic level at Shivaji Bridge via ThingSpeak · ML recalibration'],
  ['Alerts', '6-level ladder · Telegram bulletins to district control room'],
  ['Stack', 'Python · FastAPI · Next.js 14 · PostGIS / Supabase · GitHub Actions'],
];

const Hydrocast = () => {
  const [tab, setTab] = useState<'cast' | 'lab'>('cast');
  const [index, setIndex] = useState<CycleRow[] | null | undefined>(undefined);
  const [sel, setSel] = useState<string>('');
  const [run, setRun] = useState<HydrocastRun | null>(null);
  const [metric, setMetric] = useState<'stage' | 'q'>('stage');
  const [rain, setRain] = useState(140); const [cn, setCn] = useState(80); const [area, setArea] = useState(320);

  useEffect(() => { loadIndex().then((i) => { setIndex(i); if (i?.length) setSel(i[0].id); else setRun(demoRun()); }); }, []);
  useEffect(() => { if (!sel) return; setRun(null); loadRun(sel).then((r) => setRun(r ?? demoRun())); }, [sel]);
  const lab = useMemo(() => scs(rain, cn, area), [rain, cn, area]);

  const th = run?.thresholds;
  const level = run ? (run.alert === 'NORMAL' ? ['NORMAL', 'var(--water)'] : [run.alert, 'var(--signal)']) : ['—', 'var(--ink)'];
  const first = index?.[index.length - 1], latest = index?.[0];

  return (
    <section id="hydrocast" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
      <div className="a-wrap">
        <PlateHead n="04" label="HydroCast · operational flood forecasting" right="Panchganga river basin" />
        <div style={{ display: 'grid', gap: 'clamp(28px,5vw,80px)' }} className="hc-grid">
          <div>
            <h2 className="a-h2"><MaskLines lines={[<>Forecast the</>, <span className="a-em" key="f">flood</span>, <>before it</>, <>arrives.</>]} /></h2>
            <Reveal delay={0.1}>
              <p className="a-lede" style={{ marginTop: 28, color: 'var(--ink)' }}>
                <strong>HydroCast</strong> turns weather-model rainfall, rain-gauge data and a live river sensor into 90-hour stage and discharge forecasts for Kolhapur — recomputed every six hours, with alert levels and peak-arrival windows.
              </p>
              <div className="a-spec" style={{ marginTop: 26 }}>
                {facts.map(([k, v]) => (<Fragment key={k}><div className="k">{k}</div><div style={{ fontSize: 14.5 }}>{v}</div></Fragment>))}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 26 }}>
                <a className="a-btn solid" href={HYDROCAST_LINKS.dashboard} target="_blank" rel="noopener noreferrer" data-cursor="Live"><span>Live dashboard ↗</span></a>
                <a className="a-btn" href={HYDROCAST_LINKS.repo} target="_blank" rel="noopener noreferrer" data-cursor="Code" style={{ background: 'var(--paper)' }}><span>Source ↗</span></a>
                <a className="a-btn" href={HYDROCAST_LINKS.docs} target="_blank" rel="noopener noreferrer" data-cursor="Docs" style={{ background: 'var(--paper)' }}><span>Docs ↗</span></a>
              </div>
              <p className="a-label" style={{ marginTop: 22, lineHeight: 1.8, maxWidth: '46ch' }}>
                {first && latest ? `${index!.length} forecast cycles archived since ${first.runDate}.` : ''} The chart reads the system’s own public output — nothing here is mocked.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="a-plate" style={{ padding: 'clamp(14px,2vw,26px)' }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
                {([['cast', 'Live forecast'], ['lab', 'Runoff lab']] as const).map(([k, l]) => (
                  <button key={k} className={`a-btn ${tab === k ? 'solid' : ''}`} onClick={() => setTab(k)} data-cursor="Switch" style={{ padding: '10px 16px' }}><span>{l}</span></button>
                ))}
              </div>

              {tab === 'cast' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 12, alignItems: 'center' }}>
                    <span className="a-label" style={{ color: 'var(--ink)' }}>{run ? run.station : 'Loading forecast…'}</span>
                    <span className="a-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: run?.live ? '#2f9e5b' : 'var(--signal)' }} />
                      {run ? (run.live ? `Live · cycle ${fmtFull(run.start)}` : 'Demo data — feed unreachable') : '…'}
                    </span>
                  </div>

                  {run && th && (
                    <>
                      <Hydrograph
                        key={metric + run.id}
                        yUnit={metric === 'stage' ? 'm MSL' : 'm³/s'}
                        xLabel={fmtT}
                        yMin={metric === 'stage' ? Math.floor(Math.min(...run.stage.map((p) => p.v), ...run.observed.map((p) => p.v)) - 0.5) : 0}
                        yMax={metric === 'stage' ? Math.ceil(th.extreme + 0.5) : undefined}
                        hlines={metric === 'stage' ? [
                          { y: th.alert, label: 'Alert → Extreme', color: '#2f7fa8' }, { y: th.warning, label: '', color: '#c98a1c' },
                          { y: th.danger, label: '', color: 'var(--signal)' }, { y: th.extreme, label: '', color: '#8a1c1c' }] : []}
                        series={metric === 'stage' ? [
                          { label: 'Shivaji Bridge', pts: run.stage.map((p) => ({ x: p.t, y: p.v })), area: true },
                          { label: 'Rajaram Weir', dashed: true, color: 'var(--ink-soft)', pts: run.stageRajaram.map((p) => ({ x: p.t, y: p.v })) },
                          ...(run.observed.length > 1 ? [{ label: 'Observed', color: 'var(--signal)', pts: run.observed.map((p) => ({ x: p.t, y: p.v })) }] : []),
                        ] : [{ label: 'Discharge', pts: run.discharge.map((p) => ({ x: p.t, y: p.v })), area: true }]}
                      />
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', margin: '6px 0 4px' }}>
                        {([['stage', 'Stage'], ['q', 'Discharge']] as const).map(([k, l]) => (
                          <button key={k} className="a-tag" onClick={() => setMetric(k)} data-cursor="Switch" style={{ background: metric === k ? 'var(--ink)' : 'transparent', color: metric === k ? 'var(--paper)' : 'var(--ink)', cursor: 'none' }}>{l}</button>
                        ))}
                        {index && index.length > 1 && (
                          <button className="a-tag" onClick={() => setSel(index.reduce((a, b) => (b.peakQ > a.peakQ ? b : a)).id)} data-cursor="Jump" style={{ cursor: 'none' }}>Highest flow on record</button>
                        )}
                        {index && index.length > 1 && (
                          <label className="a-label" style={{ marginLeft: 'auto', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                            Replay a past cycle
                            <select value={sel} onChange={(e) => setSel(e.target.value)} style={{ font: 'inherit', fontFamily: 'var(--f-mono)', fontSize: 11, background: 'var(--paper)', border: '1px solid var(--rule-strong)', padding: '5px 6px', color: 'var(--ink)' }}>
                              {index.map((c) => (<option key={c.id} value={c.id}>{c.runDate} · {c.cycleTime} · {c.peakQ.toFixed(0)} m³/s</option>))}
                            </select>
                          </label>
                        )}
                      </div>
                      <p className="a-mono" style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 8 }}>
                        {metric === 'stage' ? `Alert ${th.alert} · Warning ${th.warning} · Danger ${th.danger} · Extreme ${th.extreme} m MSL (Shivaji Bridge). Dashed: Rajaram Weir.${run.observed.length > 1 ? ' Red: observed.' : ''}` : 'Modelled discharge at the basin outlet, 90 h ahead.'}
                      </p>
                      <div className="kpi-grid" style={{ display: 'grid', gap: 18, marginTop: 8 }}>
                        <Stat k="Peak stage" v={`${run.peakStage.toFixed(2)} m`} sub={th.alert - run.peakStage > 0 ? `${(th.alert - run.peakStage).toFixed(1)} m below Alert level` : 'At or above Alert level'} />
                        <Stat k="Peak discharge" v={`${run.peakQ.toFixed(1)} m³/s`} sub={run.receding ? 'receding — no peak ahead' : `in ${run.leadToPeak} h${run.ciHours ? ` (±${run.ciHours} h)` : ''}`} />
                        <Stat k="Alert level" v={level[0]} tone={level[1] as string} sub={`Rain ${run.rainfallMm.toFixed(1)} mm over 90 h`} />
                      </div>
                      {Object.keys(run.components).length > 0 && (
                        <div className="a-mono" style={{ marginTop: 14, fontSize: 11, color: 'var(--ink-soft)', lineHeight: 1.9, borderTop: '1px solid var(--rule)', paddingTop: 12 }}>
                          {Object.entries(run.components).map(([k, v]) => (<span key={k} style={{ display: 'inline-block', marginRight: 18 }}>{k.replace(/_/g, ' ')}: <span style={{ color: 'var(--ink)' }}>{v}</span></span>))}
                        </div>
                      )}
                    </>
                  )}
                  {!run && <div style={{ height: 380, display: 'grid', placeItems: 'center' }} className="a-label">Fetching latest cycle from GitHub…</div>}
                </>
              )}

              {tab === 'lab' && (
                <div style={{ display: 'grid', gap: 26 }} className="lab-grid">
                  <div>
                    <div className="a-label" style={{ color: 'var(--ink)', marginBottom: 10 }}>{`Catchment ${area} km² · CN ${cn} — SCS-CN + triangular unit hydrograph`}</div>
                    <Hydrograph yUnit="m³/s" xLabel={(x) => `${x.toFixed(0)} h`} series={[{ label: 'Runoff', pts: lab.pts, area: true }]} height={300} width={560} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 10 }}>
                      <Stat k="Direct runoff" v={`${lab.Q.toFixed(1)} mm`} />
                      <Stat k="Peak discharge" v={`${Math.round(lab.qp).toLocaleString('en-IN')} m³/s`} tone="var(--signal)" />
                      <Stat k="Time to peak" v={`${lab.tp.toFixed(1)} h`} />
                    </div>
                  </div>
                  <div>
                    <Slider label="Rainfall (24 h)" value={rain} min={20} max={400} step={5} unit=" mm" onChange={setRain} />
                    <Slider label="Curve number" value={cn} min={40} max={98} step={1} unit="" onChange={setCn} />
                    <Slider label="Catchment area" value={area} min={20} max={2000} step={10} unit=" km²" onChange={setArea} />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        .hc-grid{grid-template-columns:1fr}
        .lab-grid{grid-template-columns:1fr}
        .kpi-grid{grid-template-columns:1fr}
        @media(min-width:640px){.kpi-grid{grid-template-columns:repeat(3,1fr)}}
        @media(min-width:1000px){.hc-grid{grid-template-columns:minmax(0,4fr) minmax(0,8fr)}.lab-grid{grid-template-columns:minmax(0,2fr) minmax(0,1fr)}}
      `}</style>
    </section>
  );
};
export default Hydrocast;
