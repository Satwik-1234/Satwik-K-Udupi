import { Fragment } from 'react';
import { plates, mapById, redacted } from '@/data/portfolio';
import { projectsFull } from '@/data/legacy';
import { Disclosure, MaskLines, PlateHead, Reveal, pressable, useLightbox } from '../ui';
import { HYDROCAST_LINKS } from '@/lib/hydrocast';

const detailIdx: Record<string, number> = { koyna: 0, mula: 1, panch: 2 };

const digitalProjects = [
  { id: '01', title: 'Panchganga FloodWatch', category: 'Flood monitoring · Web application', note: 'Public flood-monitoring interface for the Panchganga basin.', live: 'https://satwikcccss-crypto.github.io/PanchgangaFloodwatch/', liveLabel: 'Open application' },
  { id: '02', title: 'Panchganga HydroCast', category: 'Flood forecasting · Dashboard', note: 'Forecast dashboard with hydrological outputs and monitoring views.', live: 'https://cccss-suk-panchganga-hydrocast.vercel.app/dashboard', liveLabel: 'Open dashboard', repo: 'https://github.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast' },
  { id: '03', title: 'Panchganga RainWatch', category: 'Rainfall monitoring · Data system', note: 'Repository for the Panchganga rainfall-monitoring work.', repo: 'https://github.com/satwikcccss-crypto/PanchgangaRainwatch' },
  { id: '04', title: 'Western Maharashtra RUSLE', category: 'Soil erosion · Interactive application', note: 'Streamlit application for regional soil-erosion assessment.', live: 'https://ruslewestern-maharashtrav1.streamlit.app/', liveLabel: 'Open application' },
  { id: '05', title: 'Bori Dam breach outputs', category: 'Dam safety · HEC-RAS results', note: 'Published output maps and plots for the Bori Dam breach study.', repo: 'https://github.com/Satwik-1234/BORI-DAM-breach-plots-/tree/main/outputs' },
  { id: '06', title: 'Pravara basin analysis', category: 'Morphometry · Hydrological GIS', note: 'Spatial outputs from the advanced Pravara River Basin analysis.', repo: 'https://github.com/Satwik-1234/Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis/tree/main/outputs' },
  { id: '07', title: 'Ghod basin sedimentation', category: 'Reservoir sedimentation · Notebook', note: 'Jupyter notebook for sedimentation volume analysis.', repo: 'https://github.com/Satwik-1234/Ghod_basin_study/blob/main/Sedimentation%20Analysis/%20Sedimentation%20Volume%20Analysis.ipynb' },
  { id: '08', title: 'Godavari flood visualisation', category: 'Flood mapping · Geospatial visualisation', note: 'Published visualisation assets and map outputs.', repo: 'https://github.com/Satwik-1234/Godavari-Flood-Visualization/tree/main/assets' },
  { id: '09', title: 'Mahad flood visualisation', category: 'Flood mapping · Google Earth Engine', note: 'Geospatial assets for the Mahad flood visualisation work.', repo: 'https://github.com/Satwik-1234/Mahad-flood-vizuilization-GEE/tree/main/assets' },
  { id: '10', title: 'Pulsar N250 tracker', category: 'Independent web tool', note: 'A personal vehicle-tracking application; included separately from the hydrology research portfolio.', live: 'https://satwiks-n250-tracker.vercel.app/', liveLabel: 'Open application' },
];
const projectImages: Record<string, string> = {
  koyna: 'overtop',
  mula: 'risk',
  panch: 'soil',
};

const Cols = ({ d }: { d: any }) => (
  <div className="det-grid sci-method-grid">
    {([['Objectives', d.objectives], ['Datasets', d.datasets], ['Methodology', d.methodology], ['Analysis', d.analysis], ['Results', d.results]] as [string, string[]][]).filter(([, v]) => v?.length).map(([k, v]) => (
      <div key={k}>
        <div className="a-label sci-method-label">{k}</div>
        <ul className="sci-method-list">{v.map((x) => <li key={x}><span>—</span>{x}</li>)}</ul>
      </div>
    ))}
    <div>
      <div className="a-label sci-method-label">Skills applied</div>
      <div className="sci-tags">{d.skills.map((t: string) => <span className="a-tag" key={t}>{t}</span>)}</div>
    </div>
  </div>
);

const ProjectCard = ({ p, i, open }: { p: typeof plates[number]; i: number; open: (id: string) => void }) => {
  const map = mapById(projectImages[p.id]);
  const detail = projectsFull[detailIdx[p.id]];
  return (
    <article className="sci-project-card">
      <button className="sci-project-media" onClick={() => open(map.id)} aria-label={`Open ${map.title}`} data-cursor="Inspect result">
        <img src={map.src} alt={map.title} loading="lazy" />
        <span className="sci-media-index">FIG. 0{i + 1}</span>
        <span className="sci-media-open">↗</span>
      </button>
      <div className="sci-project-body">
        <div className="sci-project-meta"><span>{p.kicker}</span><span>{p.period}</span></div>
        <h3>{p.title}</h3>
        <p className="sci-project-summary">{p.summary}</p>
        <div className="sci-project-finding"><span>KEY RESULT</span><p>{p.finding}</p></div>
        <div className="sci-project-tools">{p.spec[0][1].split(' · ').slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div>
        <div className="sci-project-actions">
          <button type="button" onClick={() => open(map.id)}>View result image ↗</button>
        </div>
        <Disclosure head={<span className="sci-disclosure-label">Method, datasets & detailed results</span>}>
          <Cols d={detail} />
          <div className="sci-detail-spec">
            {p.spec.map(([k, v]) => <Fragment key={k}><span>{k}</span><p>{v}</p></Fragment>)}
            <span>Study period</span><p>{p.period} · {p.context}</p>
          </div>
        </Disclosure>
      </div>
    </article>
  );
};

const HydrocastCard = () => (
  <article className="sci-app-card">
    <div className="sci-app-visual">
      <div className="sci-app-topline"><span><i /> INTERFACE PREVIEW · SCHEMATIC</span><span>90 H FORECAST</span></div>
      <svg viewBox="0 0 620 230" role="img" aria-label="Schematic hydrograph used as a visual preview of the HydroCast application">
        <defs><linearGradient id="hydroFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#39b8a9" stopOpacity=".35"/><stop offset="1" stopColor="#39b8a9" stopOpacity="0"/></linearGradient></defs>
        {[40,90,140,190].map(y => <line key={y} x1="22" x2="600" y1={y} y2={y} stroke="rgba(210,230,236,.13)" strokeDasharray="3 7" />)}
        <path d="M22 184 C90 182 112 177 150 164 S215 123 248 78 S294 35 321 52 S360 105 393 131 S467 168 600 179 L600 205 L22 205Z" fill="url(#hydroFill)" />
        <path d="M22 184 C90 182 112 177 150 164 S215 123 248 78 S294 35 321 52 S360 105 393 131 S467 168 600 179" fill="none" stroke="#52c7b7" strokeWidth="3" />
        <line x1="321" x2="321" y1="22" y2="205" stroke="#e1b85c" strokeDasharray="4 5" />
        <circle cx="321" cy="52" r="5" fill="#e1b85c" />
        <text x="335" y="35" fill="#e1b85c" fontSize="11" fontFamily="monospace">MODELLED PEAK</text>
        <text x="22" y="222" fill="#a9bac6" fontSize="10" fontFamily="monospace">T + 00 H</text>
        <text x="600" y="222" textAnchor="end" fill="#a9bac6" fontSize="10" fontFamily="monospace">T + 90 H</text>
      </svg>
      <div className="sci-app-foot"><span>Rainfall → Runoff → Routing → Stage</span><span>HydroCast / Panchganga</span></div>
    </div>
    <div className="sci-app-copy">
      <div className="sci-project-meta"><span>OPERATIONAL WEB APPLICATION</span><span>CCCSS · DST-SERB</span></div>
      <h3>HydroCast — Panchganga flood forecasting</h3>
      <p>Forecast dashboard connecting weather-model rainfall, hydrological simulation and river-stage monitoring. The public interface provides forecast cycles, hydrographs and a runoff exploration tool.</p>
      <div className="sci-project-tools"><span>HEC-HMS</span><span>Python</span><span>FastAPI</span><span>PostGIS</span><span>Next.js</span></div>
      <div className="sci-project-actions">
        <a className="sci-app-primary" href={HYDROCAST_LINKS.dashboard} target="_blank" rel="noreferrer">Open live dashboard ↗</a>
        <a href={HYDROCAST_LINKS.docs} target="_blank" rel="noreferrer">Technical documentation ↗</a>
        <a href={HYDROCAST_LINKS.repo} target="_blank" rel="noreferrer">Source repository ↗</a>
      </div>
    </div>
  </article>
);

const Work = () => {
  const { open } = useLightbox();
  return (
    <section id="work" className="a-section sci-projects">
      <div className="a-wrap">
        <PlateHead n="03" label="Selected work" right="Research · Engineering · Digital systems" />
        <div className="sci-project-heading">
          <div>
            <span className="sci-section-eyebrow">A FIELD REGISTER OF PROJECTS</span>
            <h2 className="a-h2"><MaskLines lines={[<>Evidence,</>, <>not just <span className="a-em">outputs.</span></>]} /></h2>
          </div>
          <p>Selected studies, engineering assignments and digital tools. Open a result to inspect the map, or expand a case study for its datasets and method.</p>
        </div>

        <div className="sci-project-grid">
          {plates.map((p, i) => <Reveal key={p.id} delay={i * 0.08}><ProjectCard p={p} i={i} open={open} /></Reveal>)}
        </div>

        <div className="sci-app-section">
          <div className="sci-subhead"><span className="sci-section-eyebrow">BEYOND STATIC MAPS</span><span>02 / WEB APPLICATIONS & TOOLS</span></div>
          <HydrocastCard />
        </div>

        <section className="sci-digital-section" aria-labelledby="digital-projects-heading">
          <div className="sci-subhead"><span className="sci-section-eyebrow">DIGITAL WORK & RESEARCH OUTPUTS</span><span>03 / APPLICATIONS · REPOSITORIES · NOTEBOOKS</span></div>
          <div className="sci-digital-intro">
            <h3 id="digital-projects-heading">From model outputs to <em>working tools.</em></h3>
            <p>Selected live applications, public repositories and reproducible analysis notebooks. Each link opens the original project source or deployment.</p>
          </div>
          <div className="sci-digital-grid">
            {digitalProjects.map((project) => (
              <article className="sci-digital-card" key={project.id}>
                <div className="sci-digital-card-top"><span>{project.id} / PROJECT RECORD</span><span className="sci-digital-mark">↗</span></div>
                <div className="sci-project-meta"><span>{project.category}</span></div>
                <h4>{project.title}</h4>
                <p>{project.note}</p>
                <div className="sci-project-actions">
                  {project.live && <a className="sci-app-primary" href={project.live} target="_blank" rel="noreferrer">{project.liveLabel || 'Open live project'} ↗</a>}
                  {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Source / outputs ↗</a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="sci-register">
          <div className="sci-register-intro">
            <span className="sci-section-eyebrow">PROJECT INDEX</span>
            <h3>More work, <em>on record.</em></h3>
            <p>Additional dam-safety, flood-frequency and GIS engagements. Public repositories are linked where available; confidential assignments remain appropriately limited.</p>
          </div>
          <div className="sci-register-list">
            {redacted.map((r, i) => (
              <Reveal key={r.code} delay={Math.min(i, 5) * .035}>
                <a className="sci-register-row" href={r.url || undefined} target={r.url ? '_blank' : undefined} rel={r.url ? 'noreferrer' : undefined} aria-disabled={!r.url}>
                  <span className="sci-register-code">{r.code}</span>
                  <span className="sci-register-content"><strong>{r.scope}</strong><small>{r.client === 'Withheld' ? 'Client details withheld' : r.client}</small><small>{r.method} · {r.tools}</small></span>
                  <span className="sci-register-status">{r.status} {r.url ? '↗' : '·'}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Work;
