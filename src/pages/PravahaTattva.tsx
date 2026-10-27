import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AtlasShell from '@/atlas/AtlasShell';
import Engagements from '@/atlas/sections/Engagements';
import { LightboxProvider, MaskLines, PlateHead, Reveal, pressable, useLightbox } from '@/atlas/ui';
import { contact, mapById, pravahaNow } from '@/data/portfolio';
import { HYDROCAST_LINKS } from '@/lib/hydrocast';
import logo from '@/assets/pravaha-logo.png';
import floodplainImg from '@/assets/services/floodplain-mapping.webp';
import rainfallRunoffImg from '@/assets/services/rainfall-runoff.webp';
import soilErosionImg from '@/assets/services/soil-erosion.webp';
import gisAnalysisImg from '@/assets/services/gis-analysis.webp';
import cfdAnalysisImg from '@/assets/services/cfd-analysis.webp';
import dronePhotogrammetryImg from '@/assets/services/drone-photogrammetry.webp';
import droneMappingImg from '@/assets/services/drone-mapping.webp';
import multispectralImg from '@/assets/services/multispectral.webp';

const services = [
  { id: '01', title: 'Hydraulic modelling', tool: 'HEC-RAS · flood analysis', text: 'Flood-extent and depth–velocity mapping, dam-break simulation and bridge hydraulics, built on industry-standard 1D/2D models.', caps: ['Flood extent mapping', 'Depth–velocity analysis', 'Dam-break simulation', 'Bridge hydraulics'], img: floodplainImg },
  { id: '02', title: 'Watershed hydrology', tool: 'HEC-HMS · runoff modelling', text: 'From catchment delineation to peak-discharge estimation — rainfall–runoff models that stand up to review.', caps: ['Basin delineation', 'Rainfall–runoff modelling', 'SCS-CN method', 'Unit hydrograph'], img: rainfallRunoffImg },
  { id: '03', title: 'Erosion assessment', tool: 'RUSLE · soil conservation', text: 'Quantified soil loss using empirical models combined with remote sensing, ready for conservation planning.', caps: ['RUSLE modelling', 'Sediment yield', 'Conservation planning', 'Priority mapping'], img: soilErosionImg },
  { id: '04', title: 'Geospatial analysis', tool: 'ArcGIS Pro · QGIS', text: 'Spatial analysis and thematic cartography from multi-temporal satellite imagery.', caps: ['LULC classification', 'Change detection', 'Spatial modelling', 'Cartographic design'], img: gisAnalysisImg },
  { id: '05', title: 'UAV photogrammetry', tool: 'Drone surveys · mapping', text: 'High-resolution aerial surveys with centimetre-level accuracy for terrain analysis and volumes.', caps: ['Orthomosaics', 'DSM / DTM', 'Volumetric analysis', 'Contour mapping'], img: dronePhotogrammetryImg },
  { id: '06', title: 'CFD simulation', tool: 'Computational fluid dynamics', text: 'Flow and thermal simulation for agricultural machinery and irrigation infrastructure.', caps: ['Flow simulation', 'Thermal analysis', 'Design optimisation', 'Performance validation'], img: cfdAnalysisImg },
  { id: '07', title: 'Multispectral imaging', tool: 'NDVI · crop health', text: 'Vegetation-health assessment from multispectral indices, for agriculture and land management.', caps: ['NDVI / NDWI analysis', 'Crop-health mapping', 'Stress detection', 'Yield indicators'], img: multispectralImg },
  { id: '08', title: 'Flood-frequency analysis', tool: 'Return periods · design floods', text: 'Annual-maxima and peak-over-threshold analysis of gauge records to derive return-period discharges and stages for design and hydraulic models.', caps: ['Return-period estimates', 'Distribution fitting', 'Design flood hydrographs', 'Uncertainty bands'], img: rainfallRunoffImg },
  { id: '09', title: 'NGO & CSR reporting', tool: 'Impact maps · data analysis', text: 'Programme reports for NGOs and CSR funders: clear maps, analysed field data and defensible numbers.', caps: ['Impact mapping', 'GIS mapping', 'Data analysis', 'Report design'], img: gisAnalysisImg },
  { id: '10', title: 'Technical drafting', tool: 'CAD · documentation', text: 'Professional 2D/3D CAD for irrigation systems and civil infrastructure.', caps: ['2D drafting', '3D modelling', 'Assembly drawings', 'Design documentation'], img: droneMappingImg },
];

const process = [
  ['01', 'Discovery', 'Scope, objectives, geography and data needs. Feasibility, deliverables and timeline agreed up front.'],
  ['02', 'Data', 'Satellite imagery, DEMs, field surveys, drone captures and hydrological records — collected and preprocessed.'],
  ['03', 'Modelling', 'HEC-RAS, HEC-HMS, ArcGIS Pro/QGIS and Python/GEE workflows, with ML where it earns its place.'],
  ['04', 'Delivery', 'Publication-ready maps, a documented method report, processed datasets and clear recommendations.'],
];

const Services = () => {
  const [i, setI] = useState(0);
  const s = services[i];
  return (
    <section id="services" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
      <div className="a-wrap">
        <PlateHead n="03" label="Services" right="Legend of capabilities" />
        <h2 className="a-h2" style={{ marginBottom: 'clamp(36px,5vw,70px)' }}>
          <MaskLines lines={[<>Ten ways to</>, <>read <span className="a-em">a landscape.</span></>]} />
        </h2>
        <div className="svc-grid" style={{ display: 'grid', gap: 'clamp(24px,4vw,70px)' }}>
          <div>
            {services.map((x, k) => (
              <button key={x.id} onClick={() => setI(k)} onMouseEnter={() => setI(k)} data-cursor="View"
                style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', alignItems: 'baseline', width: '100%', textAlign: 'left', padding: '16px 0', borderTop: '1px solid var(--rule-strong)', opacity: i === k ? 1 : 0.5, transition: 'opacity .25s, padding .35s', paddingLeft: i === k ? 14 : 0, cursor: 'none' }}>
                <span className="a-label" style={{ color: i === k ? 'var(--signal)' : undefined }}>{x.id}</span>
                <span className="a-h3" style={{ fontSize: 'clamp(1.5rem,2.6vw,2.3rem)' }}>{x.title}</span>
                <span className="a-label hidden sm:block">{x.tool}</span>
              </button>
            ))}
            <div className="a-rule" />
          </div>
          <div style={{ position: 'sticky', top: 90, alignSelf: 'start' }}>
            <div className="a-plate" key={s.id}>
              <motion.img initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={s.img} alt={s.title} style={{ aspectRatio: '16/10', objectFit: 'cover', width: '100%' }} />
            </div>
            <div className="a-caption"><span>{s.id} — {s.title}</span><span>{s.tool}</span></div>
            <p style={{ marginTop: 18, fontSize: 18 }}>{s.text}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>{s.caps.map((c) => <span key={c} className="a-tag">{c}</span>)}</div>
          </div>
        </div>
      </div>
      <style>{`.svc-grid{grid-template-columns:1fr}@media(min-width:960px){.svc-grid{grid-template-columns:minmax(0,6fr) minmax(0,5fr)}}`}</style>
    </section>
  );
};

const Work = () => {
  const { open } = useLightbox();
  const ids = ['overtop', 'risk', 'soil'];
  const labels = ['Dam-break inundation', 'Flood-risk zonation', 'Erosion & soil loss'];
  return (
    <section id="projects" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
      <div className="a-wrap">
        <PlateHead n="04" label="Recent deliverables" right="Sample sheets" />
        <h2 className="a-h2" style={{ marginBottom: 'clamp(36px,5vw,70px)' }}>
          <MaskLines lines={[<>Sheets we’ve</>, <><span className="a-em">put our name on.</span></>]} />
        </h2>
        <div className="pw-grid" style={{ display: 'grid', gap: 'clamp(18px,2.4vw,34px)' }}>
          {ids.map((id, k) => (
            <Reveal key={id} delay={k * 0.08}>
              <div className="a-plate" data-cursor="Open" aria-label={`Open map: ${mapById(id).title}`} {...pressable(() => open(id))} style={{ cursor: 'none' }}><img src={mapById(id).src} alt={mapById(id).title} loading="lazy" /></div>
              <div className="a-caption"><span>{labels[k]}</span><span>{mapById(id).tool}</span></div>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="a-lede" style={{ marginTop: 48, color: 'var(--ink)' }}>Government and institutional engagements are delivered under confidentiality; references and method statements are available on request.</p></Reveal>
      </div>
      <style>{`.pw-grid{grid-template-columns:1fr}@media(min-width:800px){.pw-grid{grid-template-columns:repeat(3,1fr)}}`}</style>
    </section>
  );
};

const PravahaTattva = () => (
  <>
    <Helmet>
      <title>Pravaha Tattva Solutions — Geospatial & Hydrology Consulting</title>
      <meta name="description" content="Pravaha Tattva Solutions: flood and dam-break modelling (HEC-RAS), watershed hydrology (HEC-HMS), GIS, remote sensing, UAV mapping and CFD consulting from Karad, Maharashtra." />
    </Helmet>
    <AtlasShell variant="company"
      nav={[{ label: 'Engagements', href: '#engagements' }, { label: 'Services', href: '#services' }, { label: 'Sheets', href: '#projects' }, { label: 'Process', href: '#process' }, { label: 'Contact', href: '#contact' }]}
      cta={{ label: 'Portfolio', to: '/' }}
      brand={<><img src={logo} alt="" style={{ height: 26, width: 'auto' }} /><span>Pravaha Tattva</span></>}>
      <LightboxProvider>
        {/* Hero */}
        <section style={{ minHeight: '100svh', display: 'grid', alignItems: 'center', padding: '110px 0 60px', position: 'relative' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 62% 64% at 26% 54%, rgba(242,237,226,.9), rgba(242,237,226,.5) 58%, rgba(242,237,226,0))' }} />
          <div className="a-wrap" style={{ position: 'relative' }}>
            <div className="a-label" style={{ marginBottom: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <span>Geospatial & hydrological solutions</span><span style={{ color: 'var(--signal)' }}>●</span><span>Karad, Maharashtra</span>
            </div>
            <h1 className="a-display" style={{ fontSize: 'clamp(3rem,10.5vw,10.5rem)' }}>
              <MaskLines immediate delay={0.1} lines={[<>Pravaha</>, <><span className="a-em">Tattva</span> Solutions</>]} />
            </h1>
            <motion.p className="a-lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
              style={{ color: 'var(--ink)', marginTop: 'clamp(24px,4vw,48px)', fontSize: 'clamp(1.15rem,1.9vw,1.6rem)', maxWidth: '40ch' }}>
              Flood and dam-break modelling, watershed hydrology, GIS and UAV mapping — turning complex water and terrain data into decisions you can defend.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
              <a className="a-btn solid" href={contact.form} target="_blank" rel="noopener noreferrer" data-cursor="Quote"><span>Start a project ↗</span></a>
              <a className="a-btn" href="#services" style={{ background: 'var(--paper)' }}><span>Explore services ↓</span></a>
            </motion.div>
          </div>
        </section>

        {/* Statement */}
        <section className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
          <div className="a-wrap" style={{ display: 'grid', gap: 40 }}>
            <PlateHead n="00" label="The studio" right="Founded by Satwik K. Udupi" />
            <div className="st-grid" style={{ display: 'grid', gap: 40 }}>
              <h2 className="a-h2"><MaskLines lines={[<>Engineering for</>, <>water, land and</>, <span className="a-em" key="a">the people between.</span>]} /></h2>
              <Reveal delay={0.1}>
                <p className="a-lede" style={{ color: 'var(--ink)' }}>Pravaha Tattva bridges field-level agricultural and watershed challenges with modern geospatial technology. We’ve collaborated with institutions such as Shivaji University and the Forest Department of Maharashtra on watershed conservation and flood studies.</p>
                <p className="a-lede" style={{ marginTop: 18 }}>Our mission: transform environmental data into actionable intelligence for sustainable land and water management across India.</p>
                <Link to="/" className="a-link" style={{ display: 'inline-block', marginTop: 26, fontWeight: 600 }} data-cursor="Portfolio">Meet the founder — personal portfolio →</Link>
              </Reveal>
            </div>
          </div>
          <style>{`.st-grid{grid-template-columns:1fr}@media(min-width:960px){.st-grid{grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:90px;align-items:end}}`}</style>
        </section>

        {/* Current work */}
        <section className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
          <div className="a-wrap">
            <PlateHead n="00b" label="On the desk now" right="Current engagements" />
            <div className="now-grid" style={{ display: 'grid', gap: 0 }}>
              {pravahaNow.map((x, k) => (
                <Reveal key={x.k} delay={k * 0.06}>
                  <div style={{ borderTop: '1px solid var(--rule-strong)', padding: '20px 22px 26px 0', height: '100%' }}>
                    <div className="a-label" style={{ color: 'var(--signal)' }}>{String(k + 1).padStart(2, '0')}</div>
                    <h3 className="a-h3" style={{ fontSize: 'clamp(1.35rem,2vw,1.8rem)', margin: '8px 0 10px' }}>{x.k}</h3>
                    <p style={{ color: 'var(--ink-soft)', fontSize: 15 }}>{x.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <style>{`.now-grid{grid-template-columns:1fr}@media(min-width:700px){.now-grid{grid-template-columns:1fr 1fr}}@media(min-width:1100px){.now-grid{grid-template-columns:repeat(5,1fr)}}`}</style>
        </section>

        <Engagements />
        <Services />
        <Work />

        {/* Hydrocast */}
        <section className="a-section" style={{ background: '#0d1a45', color: '#f2ede2' }}>
          <div className="a-wrap" style={{ display: 'grid', gap: 28 }}>
            <div className="a-label" style={{ color: '#c99a1c' }}>Research system · Shivaji University · DST-SERB</div>
            <h2 className="a-h2" style={{ color: '#f2ede2' }}><MaskLines lines={[<>HydroCast —</>, <span key="x" style={{ fontStyle: 'italic', color: '#c99a1c' }}>flood prediction,</span>, <>basin by basin.</>]} /></h2>
            <p style={{ fontSize: 'clamp(1.1rem,1.6vw,1.35rem)', maxWidth: '52ch', color: 'rgba(242,237,226,.78)' }}>The operational flood-forecasting system for the Panchganga basin: weather-model rainfall, live IoT river sensing and HEC-HMS hydrology become 90-hour stage forecasts and alert levels, refreshed every six hours.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/#hydrocast" className="a-btn" style={{ color: '#f2ede2', borderColor: '#f2ede2' }} data-cursor="Open"><span>See the live forecast →</span></Link>
              <a className="a-btn" href={HYDROCAST_LINKS.dashboard} target="_blank" rel="noopener noreferrer" style={{ color: '#f2ede2', borderColor: '#f2ede2' }} data-cursor="Live"><span>Live dashboard ↗</span></a>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="a-section" style={{ background: 'rgba(242,237,226,.9)' }}>
          <div className="a-wrap">
            <PlateHead n="05" label="How we work" right="Four stages" />
            <div className="pr-grid" style={{ display: 'grid', gap: 0 }}>
              {process.map(([n, t, d], k) => (
                <Reveal key={n} delay={k * 0.08}>
                  <div style={{ borderTop: '1px solid var(--rule-strong)', padding: '22px 24px 30px 0', height: '100%' }}>
                    <div className="a-serif" style={{ fontSize: 'clamp(3rem,5vw,4.6rem)', lineHeight: 1, color: 'var(--signal)', fontStyle: 'italic' }}>{n}</div>
                    <h3 className="a-h3" style={{ margin: '14px 0 10px' }}>{t}</h3>
                    <p style={{ color: 'var(--ink-soft)' }}>{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <style>{`.pr-grid{grid-template-columns:1fr}@media(min-width:700px){.pr-grid{grid-template-columns:1fr 1fr}}@media(min-width:1100px){.pr-grid{grid-template-columns:repeat(4,1fr)}}`}</style>
        </section>

        {/* Contact */}
        <section id="contact" className="a-section" style={{ background: 'rgba(232,225,208,.92)' }}>
          <div className="a-wrap">
            <div className="a-label" style={{ marginBottom: 24 }}>06 — Commission a study</div>
            <h2 className="a-display" style={{ fontSize: 'clamp(3rem,9.5vw,9.5rem)' }}><MaskLines lines={[<>Tell us the</>, <>river. <span className="a-em">We’ll map it.</span></>]} /></h2>
            <Reveal>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '48px 0 40px' }}>
                <a className="a-btn solid" href={contact.form} target="_blank" rel="noopener noreferrer" data-cursor="Brief"><span>Project brief form ↗</span></a>
                <a className="a-btn" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--paper)' }}><span>WhatsApp</span></a>
                <a className="a-btn" href={`mailto:${contact.email}`} style={{ background: 'var(--paper)' }}><span>{contact.email}</span></a>
              </div>
              <div className="a-label">Krishna Canal, Saidapur Road, Karad 415124, Maharashtra · +91 98343 00849</div>
              <div className="a-label" style={{ marginTop: 10 }}><a className="a-link" href={contact.github2} target="_blank" rel="noopener noreferrer">GitHub · 007-Wik ↗</a> &nbsp;·&nbsp; <a className="a-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
            </Reveal>
          </div>
          <footer className="a-wrap" style={{ marginTop: 100, display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <span className="a-label">© {new Date().getFullYear()} Pravaha Tattva Solutions</span>
            <Link to="/" className="a-label a-link">← Satwik K. Udupi · portfolio</Link>
          </footer>
        </section>
      </LightboxProvider>
    </AtlasShell>
  </>
);

export default PravahaTattva;
