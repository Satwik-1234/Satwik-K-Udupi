import { useState } from 'react';
import { certsFor, disciplines } from '@/data/expertise';
import { mapById } from '@/data/portfolio';
import { MaskLines, PlateHead, Reveal, pressable, useLightbox } from '../ui';

const Expertise = () => {
  const [i, setI] = useState(0);
  const { open } = useLightbox();
  const d = disciplines[i];
  const certs = certsFor(d);
  return (
    <section id="expertise" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
      <div className="a-wrap">
        <PlateHead n="02" label="Disciplines" right={`${disciplines.length} areas · each with evidence`} />
        <h2 className="a-h2" style={{ marginBottom: 'clamp(16px,2vw,28px)' }}>
          <MaskLines lines={[<>Nine disciplines,</>, <><span className="a-em">one thread: water.</span></>]} />
        </h2>
        <Reveal>
          <p className="a-lede" style={{ marginBottom: 'clamp(34px,5vw,70px)' }}>
            From tractor gearboxes to dam breaches to a live flood-forecasting system — pick a discipline to see the projects, roles, tools and credentials behind it.
          </p>
        </Reveal>

        <div className="ex-grid" style={{ display: 'grid', gap: 'clamp(24px,4vw,70px)' }}>
          <div role="tablist" aria-label="Disciplines">
            {disciplines.map((x, k) => (
              <button key={x.id} role="tab" aria-selected={i === k} onClick={() => setI(k)} onMouseEnter={() => setI(k)} data-cursor="View"
                style={{ display: 'grid', gridTemplateColumns: '40px 1fr', alignItems: 'baseline', width: '100%', textAlign: 'left', padding: '15px 0', borderTop: '1px solid var(--rule-strong)', opacity: i === k ? 1 : 0.48, transition: 'opacity .25s, padding .3s', paddingLeft: i === k ? 14 : 0, cursor: 'none' }}>
                <span className="a-label" style={{ color: i === k ? 'var(--signal)' : undefined }}>{String(k + 1).padStart(2, '0')}</span>
                <span className="a-h3" style={{ fontSize: 'clamp(1.3rem,2.2vw,1.9rem)' }}>{x.name}</span>
              </button>
            ))}
            <div className="a-rule" />
          </div>

          <div key={d.id} className="ex-panel">
            <h3 className="a-h3" style={{ fontSize: 'clamp(1.6rem,2.8vw,2.5rem)', maxWidth: '24ch' }}>{d.claim}</h3>

            <div className="a-label" style={{ margin: '30px 0 6px', color: 'var(--ink)' }}>Evidence</div>
            {d.proof.map((p) => (
              <div key={p.what} className="pf-row" style={{ display: 'grid', gap: '4px 22px', padding: '14px 0', borderTop: '1px solid var(--rule)' }}>
                <div>
                  <div>{p.what}</div>
                  <div className="a-label" style={{ marginTop: 5 }}>{p.where}</div>
                </div>
                <div className="a-label" style={{ color: 'var(--signal)', whiteSpace: 'nowrap' }}>{p.when}</div>
              </div>
            ))}
            <div className="a-rule-soft" />

            <div className="ex-two" style={{ display: 'grid', gap: '26px 40px', marginTop: 30 }}>
              <div>
                <div className="a-label" style={{ color: 'var(--ink)', marginBottom: 10 }}>Tools</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{d.tools.map((t) => <span className="a-tag" key={t}>{t}</span>)}</div>
              </div>
              {certs.length > 0 && (
                <div>
                  <div className="a-label" style={{ color: 'var(--ink)', marginBottom: 10 }}>Credentials · {certs.length}</div>
                  <ul style={{ display: 'grid', gap: 6 }}>
                    {certs.map((c) => (<li key={c.name + c.date} style={{ fontSize: 14.5 }}>{c.name} <span className="a-label" style={{ marginLeft: 4 }}>{c.issuer} · {c.date}</span></li>))}
                  </ul>
                </div>
              )}
            </div>

            {d.map && (
              <div className="a-plate" data-cursor="Open" aria-label={`Open map: ${mapById(d.map).title}`} {...pressable(() => open(d.map!))} style={{ marginTop: 34, maxWidth: 520, cursor: 'none' }}>
                <img src={mapById(d.map).src} alt={mapById(d.map).title} loading="lazy" />
              </div>
            )}
            {d.map && <div className="a-caption" style={{ maxWidth: 520 }}><span>{mapById(d.map).title}</span><span>Click to enlarge</span></div>}
          </div>
        </div>
      </div>
      <style>{`
        .ex-grid{grid-template-columns:1fr}.pf-row{grid-template-columns:1fr}.ex-two{grid-template-columns:1fr}
        @media(min-width:620px){.pf-row{grid-template-columns:minmax(0,1fr) auto}}
        @media(min-width:960px){.ex-grid{grid-template-columns:minmax(0,4fr) minmax(0,7fr)}.ex-two{grid-template-columns:1fr 1fr}}
      `}</style>
    </section>
  );
};
export default Expertise;
