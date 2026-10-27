import { useState } from 'react';
import { repositories as legacyRepos } from '@/data/legacy';

const repositories: any[] = [hydrocastRepo, ...legacyRepos];
import { findings, hydrocastRepo } from '@/data/portfolio';
import { MaskLines, PlateHead, Reveal } from '../ui';

const Code = () => {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const r = repositories[i];
  const copy = () => { navigator.clipboard?.writeText(r.cloneCmd).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }); };
  return (
    <section id="code" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
      <div className="a-wrap">
        <PlateHead n="08" label="Research code" right="Open repositories" />
        <h2 className="a-h2" style={{ marginBottom: 'clamp(30px,4vw,56px)' }}>
          <MaskLines lines={[<>Reproducible,</>, <><span className="a-em">or it didn’t happen.</span></>]} />
        </h2>

        <div className="fd-grid" style={{ display: 'grid', marginBottom: 'clamp(50px,7vw,100px)' }}>
          {findings.map((f, k) => (
            <Reveal key={f.v} delay={k * 0.07}>
              <div style={{ borderTop: '1px solid var(--rule-strong)', padding: '20px 22px 24px 0', height: '100%' }}>
                <div className="a-serif" style={{ fontSize: 'clamp(2rem,3.4vw,3.2rem)', lineHeight: 1, color: 'var(--signal)' }}>{f.v}</div>
                <p className="a-label" style={{ marginTop: 12, lineHeight: 1.7 }}>{f.k}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="repo-grid" style={{ display: 'grid', gap: 'clamp(24px,4vw,60px)' }}>
          <div>
            {repositories.map((x: any, k: number) => (
              <button key={x.id} onClick={() => setI(k)} onMouseEnter={() => setI(k)} data-cursor="View"
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '16px 0', borderTop: '1px solid var(--rule-strong)', opacity: i === k ? 1 : 0.5, transition: 'opacity .25s, padding .3s', paddingLeft: i === k ? 14 : 0, cursor: 'none' }}>
                <div className="a-label" style={{ color: i === k ? 'var(--signal)' : undefined }}>{x.category} · {x.language}</div>
                <div className="a-h3" style={{ fontSize: 'clamp(1.3rem,2.1vw,1.8rem)', marginTop: 4 }}>{x.title}</div>
              </button>
            ))}
            <div className="a-rule" />
            <p className="a-label" style={{ marginTop: 18, lineHeight: 1.8 }}>Client & consulting work (Pravaha Tattva): <a className="a-link" href="https://github.com/007-Wik?tab=repositories" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)' }}>github.com/007-Wik ↗</a></p>
          </div>

          <div key={r.id}>
            <div className="a-plate" style={{ padding: 'clamp(16px,2.2vw,30px)' }}>
              <div className="a-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', color: 'var(--ink)' }}>
                <span>{r.name}</span><span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: r.languageColor, marginRight: 8 }} />{r.language}</span>
              </div>
              <p style={{ margin: '16px 0 20px', fontSize: 18 }}>{r.summary}</p>
              <div className="a-spec">
                <div className="k">Algorithm</div><div>{r.algorithm}</div>
                <div className="k">Data in</div><div>{r.dataInputs}</div>
                <div className="k">Delivers</div><div>{r.deliverables}</div>
              </div>
              <pre style={{ margin: '22px 0 0', padding: 18, background: 'var(--ink)', color: '#e8e1d0', fontFamily: 'var(--f-mono)', fontSize: 12.5, lineHeight: 1.7, overflowX: 'auto' }}><code>{r.codeSnippet}</code></pre>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
                <a className="a-btn solid" href={r.url} target="_blank" rel="noopener noreferrer" data-cursor="GitHub"><span>View on GitHub ↗</span></a>
                <button className="a-btn" onClick={copy} data-cursor="Copy"><span>{copied ? 'Copied ✓' : 'Copy clone command'}</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.fd-grid{grid-template-columns:1fr 1fr}.repo-grid{grid-template-columns:1fr}@media(min-width:960px){.fd-grid{grid-template-columns:repeat(4,1fr)}.repo-grid{grid-template-columns:minmax(0,4fr) minmax(0,7fr)}}`}</style>
    </section>
  );
};
export default Code;
