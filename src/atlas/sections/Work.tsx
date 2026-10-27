import { Fragment, useRef, useState } from 'react';
import { plates, mapById, redacted } from '@/data/portfolio';
import { projectsFull } from '@/data/legacy';
import { Disclosure, MaskLines, PlateHead, Reveal, pressable, useLightbox } from '../ui';

const detailIdx: Record<string, number> = { koyna: 0, mula: 1, panch: 2 };
const Cols = ({ d }: { d: any }) => (
  <div className="det-grid" style={{ display: 'grid', gap: '26px 36px' }}>
    {([['Objectives', d.objectives], ['Datasets', d.datasets], ['Methodology', d.methodology], ['Analysis', d.analysis], ['Results', d.results]] as [string, string[]][]).filter(([, v]) => v?.length).map(([k, v]) => (
      <div key={k}>
        <div className="a-label" style={{ color: 'var(--ink)', marginBottom: 10 }}>{k}</div>
        <ul style={{ display: 'grid', gap: 7 }}>{v.map((x) => (<li key={x} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', color: 'var(--ink-soft)', fontSize: 15 }}><span style={{ color: 'var(--signal)' }}>—</span><span>{x}</span></li>))}</ul>
      </div>
    ))}
    <div><div className="a-label" style={{ color: 'var(--ink)', marginBottom: 10 }}>Skills applied</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{d.skills.map((t: string) => <span className="a-tag" key={t}>{t}</span>)}</div></div>
  </div>
);

/* Drag-to-compare slider: two maps, one clip. */
const Compare = ({ a, b, la, lb }: { a: string; b: string; la: string; lb: string }) => {
  const [pos, setPos] = useState(55);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const set = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  };
  return (
    <div>
      <div className="a-plate">
        <div ref={box} data-cursor="Drag" className="fig"
          style={{ position: 'relative', aspectRatio: '1123 / 794', overflow: 'hidden', touchAction: 'pan-y', userSelect: 'none' }}
          onPointerDown={(e) => { drag.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); set(e.clientX); }}
          onPointerMove={(e) => drag.current && set(e.clientX)}
          onPointerUp={() => (drag.current = false)}>
          <img src={b} alt={lb} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src={a} alt={la} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: 'var(--signal)', transform: 'translateX(-1px)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 46, height: 46, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'var(--signal)', color: 'var(--signal-ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-mono)', fontSize: 14 }}>↔</div>
          </div>
          <span className="a-label" style={{ position: 'absolute', left: 12, bottom: 12, background: 'rgba(242,237,226,.9)', padding: '4px 8px', color: 'var(--ink)' }}>{la}</span>
          <span className="a-label" style={{ position: 'absolute', right: 12, bottom: 12, background: 'rgba(242,237,226,.9)', padding: '4px 8px', color: 'var(--ink)' }}>{lb}</span>
        </div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Compare scenarios" style={{ width: '100%', marginTop: 14, accentColor: 'var(--signal)' }} />
    </div>
  );
};

const RegRow = ({ url, children }: { url: string; children: React.ReactNode }) =>
  url ? <a href={url} target="_blank" rel="noopener noreferrer" data-cursor="Open" style={{ display: 'block' }}>{children}</a> : <>{children}</>;

const Work = () => {
  const { open } = useLightbox();
  return (
    <section id="work" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
      <div className="a-wrap">
        <PlateHead n="03" label="Selected work" right="Three studies" />
        <h2 className="a-h2" style={{ maxWidth: '14ch', marginBottom: 'clamp(50px,8vw,120px)' }}>
          <MaskLines lines={[<>Maps that</>, <>change <span className="a-em">decisions.</span></>]} />
        </h2>

        <div style={{ display: 'grid', gap: 'clamp(80px,12vw,180px)' }}>
          {plates.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.id} id={p.id} className="work-plate" style={{ display: 'grid', gap: 'clamp(28px,4vw,64px)' }}>
                <div style={{ order: flip ? 2 : 1 }} className="work-copy">
                  <Reveal>
                    <div className="a-label" style={{ display: 'flex', gap: 14 }}>
                      <span style={{ color: 'var(--signal)' }}>Study {p.n}</span><span>{p.kicker}</span>
                    </div>
                    <h3 className="a-h3" style={{ fontSize: 'clamp(2.1rem,4.2vw,3.8rem)', margin: '16px 0 22px' }}>{p.title}</h3>
                    <p style={{ color: 'var(--ink-soft)', fontSize: 18, maxWidth: '48ch' }}>{p.summary}</p>
                    <p style={{ marginTop: 18, maxWidth: '48ch', fontSize: 18 }}>
                      <span className="a-label" style={{ color: 'var(--signal)', marginRight: 10 }}>Finding</span>{p.finding}
                    </p>
                    <div className="a-spec" style={{ marginTop: 30 }}>
                      {p.spec.map(([k, v]) => (<Fragment key={k}><div className="k">{k}</div><div>{v}</div></Fragment>))}
                      <div className="k">When</div><div>{p.period} · {p.context}</div>
                    </div>
                  </Reveal>
                </div>
                <div style={{ order: flip ? 1 : 2 }}>
                  <Reveal delay={0.1}>
                    {p.id === 'koyna' ? (
                      <Compare a={mapById('controlled').src} b={mapById('overtop').src} la="Controlled release" lb="Overtopping failure" />
                    ) : (
                      <div className="a-plate" data-cursor="Zoom" aria-label={`Enlarge: ${mapById(p.maps[0]).title}`} {...pressable(() => open(p.maps[0]))} style={{ cursor: 'none' }}>
                        <img src={mapById(p.maps[0]).src} alt={mapById(p.maps[0]).title} loading="lazy" />
                      </div>
                    )}
                    <div className="a-caption">
                      <span>Fig. {p.n} — {p.id === 'koyna' ? 'Max flood depth, Koyna → Krishna valley' : mapById(p.maps[0]).title}</span>
                      <span>{p.id === 'koyna' ? 'Drag to compare' : 'Click to enlarge'}</span>
                    </div>
                  </Reveal>
                </div>
                <div style={{ gridColumn: '1 / -1', order: 3 }}>
                  <Disclosure head={<span className="a-label" style={{ color: 'var(--ink)' }}>Full method, data &amp; results — {projectsFull[detailIdx[p.id]].title}</span>}>
                    <Cols d={projectsFull[detailIdx[p.id]]} />
                  </Disclosure>
                  <div className="a-rule" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Other builds */}
        <div style={{ marginTop: 'clamp(90px,13vw,190px)' }}>
          <PlateHead n="03a" label="Engineering builds" right="Design & mechanics" />
          <div className="ob-grid" style={{ display: 'grid', gap: 'clamp(18px,3vw,40px)' }}>
            {[projectsFull[3], projectsFull[4]].map((d: any, k: number) => (
              <Reveal key={d.title} delay={k * 0.08}>
                <div style={{ borderTop: '1px solid var(--rule-strong)', paddingTop: 20 }}>
                  <div className="a-label">{d.duration}</div>
                  <h3 className="a-h3" style={{ margin: '10px 0 18px' }}>{d.title}</h3>
                  <div className="ob-det"><Cols d={d} /></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Field register — government & confidential work */}
        <div style={{ marginTop: 'clamp(90px,13vw,200px)' }}>
          <PlateHead n="03b" label="Client register" right="Government, institutional & CSR work" />
          <div style={{ display: 'grid', gap: 24 }} className="reg-grid">
            <Reveal>
              <h3 className="a-h3" style={{ maxWidth: '16ch' }}>Work for clients, <span className="a-em">on the record.</span></h3>
              <p className="a-lede" style={{ marginTop: 18 }}>
                Dam-safety, flood-frequency and CSR engagements, each with a public method record. Client documents stay with the client; further government work is held under confidentiality.
              </p>
            </Reveal>
            <div>
              {redacted.map((r, i) => (
                <Reveal key={r.code} delay={Math.min(i, 5) * 0.05}>
                  <RegRow url={r.url}>
                  <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr auto', gap: 18, padding: '22px 0', borderTop: '1px solid var(--rule-strong)', alignItems: 'start' }} className="reg-row">
                    <span className="a-label" style={{ color: 'var(--signal)', paddingTop: 4 }}>{r.code}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 18 }}>{r.scope}</div>
                      <p style={{ color: 'var(--ink-soft)', marginTop: 4 }}>
                        {r.client === 'Withheld' ? <span className="redact">Client name withheld here</span> : r.client}
                      </p>
                      <p className="a-mono" style={{ fontSize: 12, marginTop: 8, color: 'var(--ink-soft)' }}>
                        {r.code === 'GOV-X' ? <><span className="redact">methods and datasets redacted</span> · {r.method}</> : <>{r.method} · {r.tools}</>}
                      </p>
                    </div>
                    <span className="a-label" style={{ border: '1px solid var(--rule-strong)', padding: '4px 8px', whiteSpace: 'nowrap', transform: 'rotate(-2deg)' }}>{r.status}</span>
                  </div>
                  </RegRow>
                </Reveal>
              ))}
              <div className="a-rule" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .work-plate{grid-template-columns:1fr}
        .det-grid{grid-template-columns:1fr}
        .ob-grid{grid-template-columns:1fr}
        @media(min-width:760px){.det-grid{grid-template-columns:1fr 1fr}}
        @media(min-width:960px){.ob-grid{grid-template-columns:1fr 1fr}.ob-det .det-grid{grid-template-columns:1fr 1fr}}
        .reg-grid{grid-template-columns:1fr}
        .redact{background:var(--ink);color:transparent;user-select:none;padding:0 .3em;display:inline-block;line-height:1.1}
        @media(min-width:960px){
          .work-plate{grid-template-columns:minmax(0,5fr) minmax(0,7fr);align-items:center}
          .work-plate:nth-child(even){grid-template-columns:minmax(0,7fr) minmax(0,5fr)}
          .reg-grid{grid-template-columns:minmax(0,4fr) minmax(0,7fr);gap:80px}
        }
        @media(max-width:600px){.reg-row{grid-template-columns:1fr !important}}
      `}</style>
    </section>
  );
};
export default Work;
