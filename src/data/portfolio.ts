import controlledRelease from '@/assets/maps/controlled-release-map.webp';
import overtopping from '@/assets/maps/dam-overtopping-depth.webp';
import seismic from '@/assets/maps/dam-seismic-depth.webp';
import floodRisk from '@/assets/maps/flood-risk-map.webp';
import lulc2024 from '@/assets/maps/lulc-2024-map.webp';
import koynaBasin from '@/assets/maps/koyna-river-basin.webp';
import soilLoss from '@/assets/maps/soil-loss-class.webp';
import krishnaLulc from '@/assets/maps/krishna-lulc-map.webp';
import urbanIndex from '@/assets/maps/urban-index-map.webp';

import hecRas from '@/assets/tech/hec-ras.png';
import hecHms from '@/assets/tech/hec-hms.png';
import arcgisPro from '@/assets/tech/arcgis-pro.png';
import arcgisOnline from '@/assets/tech/arcgis-online.png';
import arcmap from '@/assets/tech/arcmap.png';
import qgis from '@/assets/tech/qgis.png';
import gee from '@/assets/tech/google-earth-engine.png';
import earthPro from '@/assets/tech/google-earth-pro.png';
import metashape from '@/assets/tech/agisoft-metashape.png';
import ansys from '@/assets/tech/ansys.png';
import python from '@/assets/tech/python.png';
import colab from '@/assets/tech/google-colab.png';
import javascript from '@/assets/tech/javascript.png';
import rstudio from '@/assets/tech/rstudio.png';

export const contact = {
  email: 'satwikudupi@gmail.com', // professional · also Pravaha Tattva Solutions
  emailPersonal: 'satwikudupi2018@gmail.com',
  phone: '+919834300849',
  whatsapp: "https://wa.me/919834300849?text=Hi%20Satwik,%20I'm%20interested%20in%20your%20GIS/Hydrology%20work",
  linkedin: 'https://www.linkedin.com/in/satwik-udupi-37304a231',
  github: 'https://github.com/Satwik-1234',
  github2: 'https://github.com/007-Wik',
  instagram: 'https://www.instagram.com/007_wik',
  form: 'https://forms.gle/SCyQeFigrgsPft9D9',
  place: 'Karad, Maharashtra, India',
};

export const maps = [
  { id: 'controlled', src: controlledRelease, title: 'Controlled release — flood depth', basin: 'Koyna → Krishna', theme: 'Flood modelling', tool: 'HEC-RAS 2D' },
  { id: 'overtop', src: overtopping, title: 'Dam overtopping failure — maximum depth', basin: 'Koyna → Krishna', theme: 'Dam safety', tool: 'HEC-RAS 2D' },
  { id: 'seismic', src: seismic, title: 'Seismic collapse scenario — maximum depth', basin: 'Koyna → Krishna', theme: 'Dam safety', tool: 'HEC-RAS 2D' },
  { id: 'risk', src: floodRisk, title: 'Flood risk index — Mula–Mutha', basin: 'Mula–Mutha, Pune', theme: 'Risk zonation', tool: 'AHP · ArcGIS' },
  { id: 'soil', src: soilLoss, title: 'Soil-loss classes (RUSLE)', basin: 'Panchganga', theme: 'Erosion', tool: 'RUSLE · ArcGIS' },
  { id: 'basin', src: koynaBasin, title: 'Koyna river basin — location', basin: 'Koyna', theme: 'Watershed', tool: 'ArcGIS' },
  { id: 'lulc', src: lulc2024, title: 'Land use / land cover 2024', basin: 'Pravara', theme: 'Land cover', tool: 'GEE · Classification' },
  { id: 'krishna', src: krishnaLulc, title: 'LULC — Krishna upper reach', basin: 'Krishna', theme: 'Land cover', tool: 'GEE · Classification' },
  { id: 'urban', src: urbanIndex, title: 'Urban index — Kolhapur', basin: 'Kolhapur', theme: 'Urban analysis', tool: 'Landsat · UI' },
];
export const mapById = (id: string) => maps.find((m) => m.id === id)!;

export const stats = [
  { v: 18.26, d: 2, suffix: ' m', label: 'Peak downstream flood depth modelled — Koyna overtopping' },
  { v: 66000, d: 0, suffix: ' m³/s', label: 'Peak breach discharge, simulated in HEC-RAS 2D' },
  { v: 30, d: 0, suffix: ' yrs', label: 'Of river-channel change mapped on the lower Panchganga' },
  { v: 23, d: 0, suffix: '', label: 'Certifications — UNESCO, FAO, ISRO-IIRS, Esri, GSI, UNDP' },
];

export const plates = [
  {
    id: 'koyna',
    n: 'I',
    title: 'What if Koyna Dam failed?',
    kicker: 'Dam-break & flood inundation',
    period: 'Feb – May 2025',
    context: 'Sahyadri College of Agricultural Engineering & Technology',
    summary:
      'A probable-maximum-flood study of one of Maharashtra’s largest dams: how the spillway copes, how fast a breach travels downstream, and who is in the water’s path.',
    finding:
      'The spillway proved inadequate for PMP-driven floods. Reservoir levels approached 657 m (max 661.3 m); a breach peaks above 66,000 m³/s and drives 18+ m of water through the Krishna valley.',
    spec: [
      ['Models', 'HEC-HMS (PMF hydrographs, reservoir routing) → HEC-RAS 2D (breach & inundation)'],
      ['Data', 'IMD rainfall & gauges · PMP estimates · SRTM GL1 DEM · Globecover v200'],
      ['Outputs', 'PMF hydrographs (1-2-3 day) · inundation & depth maps · spillway-expansion proposal · EAP inputs'],
    ] as [string, string][],
    maps: ['controlled', 'overtop'],
  },
  {
    id: 'mula',
    n: 'II',
    title: 'Where Pune floods first',
    kicker: 'Floodplain risk zonation',
    period: 'Nov – Dec 2024',
    context: 'Mula–Mutha river basin',
    summary:
      'Hydraulics alone says where water goes; planning needs to know where it hurts. I fused 1D steady-flow inundation with slope, elevation, land cover and river proximity in a weighted AHP overlay.',
    finding:
      'A four-class flood-risk index (low → very high) that exposes how fast-developing neighbourhoods sit inside the highest-risk bands.',
    spec: [
      ['Models', 'HEC-RAS 1D steady flow · AHP multi-criteria weighting · weighted overlay'],
      ['Data', 'Multi-return-period discharge · DEM slope/elevation · supervised LULC · proximity layers'],
      ['Outputs', 'Flood Risk Index map · inundation extents per return period'],
    ] as [string, string][],
    maps: ['risk'],
  },
  {
    id: 'panch',
    n: 'III',
    title: 'Thirty years of a river moving',
    kicker: 'Morphodynamics & soil loss',
    period: 'Aug – Sep 2024',
    context: 'Panchganga river basin · Shivaji University',
    summary:
      'Landsat 5 → 9 from 1994 to 2024: where the lower Panchganga eroded, where it silted up, and how much soil the whole basin loses each year under RUSLE.',
    finding:
      'Mapped three decades of channel migration, isolated erosion–accretion hotspots, and classed basin-wide soil loss to guide conservation priorities.',
    spec: [
      ['Models', 'NDWI waterbody extraction · channel vectorisation · RUSLE (R·K·LS·C·P)'],
      ['Data', 'Landsat 5 & 9 (1994–2024) · soil, rainfall & terrain rasters'],
      ['Outputs', 'Erosion–accretion hotspot maps · soil-loss class map'],
    ] as [string, string][],
    maps: ['soil'],
  },
];

/** Client & government engagements (from github.com/007-Wik and earlier work). `url` rows are public records. */
export const redacted = [
  { code: 'DAM-1', client: 'Panvel Municipal Corporation · executed with CCCSS, Shivaji University', scope: 'Dehrang Dam, Raigad — hydrological modelling and 2D breach inundation mapping', method: 'HEC-HMS · HEC-RAS 2D · Froehlich (2008) breach · Gumbel IDF', tools: 'Python · GEE', status: 'Public record ↗', url: 'https://github.com/007-Wik/Dehrang-Dam-breach-Analysis_Panvel' },
  { code: 'DAM-2', client: 'Irrigation & Water Resources Dept., Govt. of Maharashtra · consultant Sparks Enterprises, Pune', scope: 'Ekrukh Dam, Solapur — design flood, dam break, capacity curve and population at risk', method: 'PMF / SPF · overtopping & piping · PAR & evacuation', tools: 'HEC-HMS · HEC-RAS · Python', status: 'Public record ↗', url: 'https://github.com/007-Wik/EKRUKH_DF_PAR' },
  { code: 'DAM-3', client: 'Solapur District, Maharashtra', scope: 'Jawalgaon Dam — SPF hydrographs, dam break, and a population-at-risk / EAP pipeline', method: 'CWC unit hydrograph · OVTP & PIPG · H1–H6 hazard classes', tools: 'HEC-RAS · Python', status: 'Public record ↗', url: 'https://github.com/007-Wik/Dam-Hydrographs-Analysis-JWLG' },
  { code: 'DAM-4', client: 'Solapur District, Maharashtra', scope: 'Kurnur (Bori) Dam — piping, overtopping and large-controlled-release hydrographs', method: 'HEC-RAS 6.x post-processing · engineering visualisation', tools: 'Python', status: 'Public record ↗', url: 'https://github.com/007-Wik/Dam-Hydrographs-Analysis-BORI' },
  { code: 'FFA-1', client: 'Krishna basin · CWC station AK000X6', scope: 'Flood-frequency analysis at Karad — 57 water years, design floods to 1,000 years', method: 'LP3 · L-moments · 12 distributions · Bayesian MCMC', tools: 'Python · 130 tests', status: 'Public record ↗', url: 'https://github.com/007-Wik/Flood-Frequency-Analysis-Karad' },
  { code: 'CSR-1', client: 'Shramjivi Janata Sahayak Mandal, Satara · CSR partners HDFC Bank, TE Connectivity, Atlas', scope: 'Seven CSR and watershed modules: reports, GIS atlases, village mapping, drone monitoring', method: 'GIS · drone aerial analysis · report authoring', tools: 'QGIS · Python', status: 'Delivered', url: 'https://github.com/007-Wik/SJSM-WORK-reports-Mapping-' },
  { code: 'GOV-A', client: 'Government of Maharashtra · Revenue & Forest Dept.', scope: 'Wildlife camera-trap analytics & spatial mapping — Sahyadri Tiger Reserve', method: 'Time-series cleaning · hotspot mapping · study/location index maps', tools: 'ArcMap', status: 'Delivered', url: '' },
  { code: 'GOV-X', client: 'Withheld', scope: 'Further government hydrology / GIS engagements', method: 'Under confidentiality — details on request', tools: '—', status: 'In progress', url: '' },
];

/** Full project cards for the Pravaha Tattva page. */
export interface PvProject {
  id: string; code: string; title: string; place: string; client: string; via?: string; scope: string;
  highlights: string[]; tools: string[]; links: { label: string; url: string }[]; kind: 'Dam safety' | 'Flood frequency' | 'CSR & GIS';
}
export const pravahaProjects: PvProject[] = [
  {
    id: 'dehrang', code: '01', kind: 'Dam safety', title: 'Dehrang Dam — breach analysis & inundation mapping', place: 'Panvel, Raigad District',
    client: 'Panvel Municipal Corporation', via: 'Executed with the Centre for Climate Change & Sustainability Studies, Shivaji University',
    scope: 'End-to-end hydrological and 2D dam-break study of a 1957 earthen dam with a gated spillway.',
    highlights: [
      '31 years of IMD rainfall → Gumbel EV-I IDF curves and a 100-year design storm (CWC manual, IS 11223, CDSO minor-dam standard)',
      'Reservoir resurveyed on 3,193 boxes of 10 × 10 m: 517,706 m³ of silt quantified and the storage–elevation curve rebuilt',
      'CN, hydrologic-soil-group and Manning’s n grids from ESA WorldCover and SoilGrids; two pour-point watersheds delineated',
      'Froehlich (2008) breach parameters → HEC-HMS hydrographs → HEC-RAS 2D inundation maps',
    ],
    tools: ['HEC-HMS', 'HEC-RAS 2D', 'Python', 'Earth Engine', 'pysheds', 'MkDocs'],
    links: [{ label: 'Repository', url: 'https://github.com/007-Wik/Dehrang-Dam-breach-Analysis_Panvel' }, { label: 'Documentation', url: 'https://007-wik.github.io/Dehrang-Dam-breach-Analysis_Panvel/' }],
  },
  {
    id: 'ekrukh', code: '02', kind: 'Dam safety', title: 'Ekrukh Dam — design flood, dam break & population at risk', place: 'Solapur District',
    client: 'Irrigation & Water Resources Department, Government of Maharashtra', via: 'Consultant: Sparks Enterprises Pvt. Ltd., Pune',
    scope: 'Five linked studies on a British-era earthen dam, built as re-runnable workflows so the government record can be reproduced years later.',
    highlights: [
      '410.68 km² catchment (Adhella Nalla): curve number, lag and Muskingum K–X extracted in Earth Engine for HEC-HMS',
      'Design flood study — PMF, SPF and T-year floods — then overtopping and piping breach hydrographs',
      'Elevation–area–capacity curve; village and infrastructure inundation, population at risk, evacuation shelters',
      'Checked against CWC FER Sub-zone 3(h), IS 11223, Dam Safety Act 2021 and CDSO DHARMA',
    ],
    tools: ['HEC-HMS', 'HEC-RAS', 'Earth Engine', 'Python', 'GIS'],
    links: [{ label: 'Repository', url: 'https://github.com/007-Wik/EKRUKH_DF_PAR' }],
  },
  {
    id: 'jawalgaon', code: '03', kind: 'Dam safety', title: 'Jawalgaon Dam — SPF, dam break & emergency action planning', place: 'Barshi, Solapur District',
    client: 'Medium irrigation project, Bhima basin', scope: 'Hydrological safety analysis plus a reproducible population-at-risk pipeline that ends in EAP-ready tables.',
    highlights: [
      'Standard Project Flood via the CWC dimensionless unit hydrograph: 1,838 m³/s peak under overtopping versus 7.0 m³/s for piping',
      '72-hour breach simulations at 1–5 second resolution — over 310,000 records — plus E-A-C curves from the GIS-surveyed content table',
      '22-step notebook: H1–H6 hazard rasters, OpenStreetMap infrastructure query, Annexure 3A/3B tables, evacuation priority and shelters',
    ],
    tools: ['HEC-RAS', 'Python', 'GeoPandas', 'Rasterio', 'OSM'],
    links: [{ label: 'Hydrographs & SPF', url: 'https://github.com/007-Wik/Dam-Hydrographs-Analysis-JWLG' }, { label: 'Population at risk', url: 'https://github.com/007-Wik/Population-Infrastructure-PAR-Risk-Mapping-JWLG-DAM' }],
  },
  {
    id: 'kurnur', code: '04', kind: 'Dam safety', title: 'Kurnur (Bori) Dam — breach & controlled-release hydrographs', place: 'Solapur District',
    client: 'Water Resources Department, Maharashtra (governing authority)', scope: 'Post-processing and engineering visualisation of HEC-RAS dam-break time series for three scenarios.',
    highlights: [
      'Piping failure, overtopping failure and large controlled release, each treated as an isolated, traceable analytical unit',
      'Dual-axis elevation and discharge plots with peak, time-to-peak and drawdown annotations',
      'Framed on CWC, FEMA (2014), ICOLD and NDSP guidance; MIT-licensed and citable',
    ],
    tools: ['HEC-RAS 6.x', 'Python', 'Jupyter'],
    links: [{ label: 'Repository', url: 'https://github.com/007-Wik/Dam-Hydrographs-Analysis-BORI' }],
  },
  {
    id: 'karad-ffa', code: '05', kind: 'Flood frequency', title: 'Flood-frequency analysis — Krishna River at Karad', place: 'Karad, Satara District',
    client: 'CWC gauging station AK000X6', scope: 'A production-grade Python package for design floods from a 57-year annual-maximum record, with uncertainty bands.',
    highlights: [
      '57 water years (1965–66 to 2021–22) over a 5,462 km² catchment; observed HFL 567.16 m (7,177 m³/s, June 1976)',
      '12 candidate distributions ranked by AICc / BIC; Log-Pearson III adopted — 100-year flood 8,667 m³/s (95% CI 6,048–12,923)',
      'L-moments, Bulletin 17-style log moments, POT/GPD check and Bayesian MCMC uncertainty; IS 11223 and USGS Bulletin 17C',
      '130 automated tests (83% coverage), Docker image and documentation site',
    ],
    tools: ['Python', 'SciPy', 'MCMC', 'Docker', 'pytest'],
    links: [{ label: 'Repository', url: 'https://github.com/007-Wik/Flood-Frequency-Analysis-Karad' }],
  },
  {
    id: 'sjsm', code: '06', kind: 'CSR & GIS', title: 'SJSM — CSR reports, GIS atlases & drone monitoring', place: 'Satara, Maharashtra',
    client: 'Shramjivi Janata Sahayak Mandal', via: 'CSR partners include HDFC Bank Parivartan, TE Connectivity and Atlas',
    scope: 'Seven delivered modules of donor-ready reporting and spatial modelling for watershed and livelihoods programmes.',
    highlights: [
      'Annual and completion reports; Atlas Fisheries; TE Connectivity IWMP at Ghatdare; HDFC SGP Veloshi climate-resilience project',
      'Tuljapur & Lohara GIS Atlas — 16 themes across 2,043.9 km² of environmental and hydrogeological mapping',
      'Phaltan: DEM and hydrological modelling with proposal maps for six villages; Biodiversity Park layout as seven KML layers',
    ],
    tools: ['QGIS', 'Drone imagery', 'WhiteboxTools', 'Python', 'Report design'],
    links: [{ label: 'Repository (structure only)', url: 'https://github.com/007-Wik/SJSM-WORK-reports-Mapping-' }],
  },
];







/* ── Software & languages ── */
export const drivers = [
  { name: 'HEC-RAS', logo: hecRas, use: '1D/2D hydraulics, dam-break' },
  { name: 'HEC-HMS', logo: hecHms, use: 'Rainfall–runoff, reservoir routing' },
  { name: 'ArcGIS Pro', logo: arcgisPro, use: 'Spatial analysis & cartography' },
  { name: 'ArcMap', logo: arcmap, use: 'Thematic mapping' },
  { name: 'ArcGIS Online', logo: arcgisOnline, use: 'Web maps & sharing' },
  { name: 'QGIS', logo: qgis, use: 'Open-source GIS' },
  { name: 'Google Earth Engine', logo: gee, use: 'Cloud remote sensing' },
  { name: 'Google Earth Pro', logo: earthPro, use: 'Imagery & digitising' },
  { name: 'Agisoft Metashape', logo: metashape, use: 'UAV photogrammetry' },
  { name: 'ANSYS', logo: ansys, use: 'CFD & FEA' },
  { name: 'Python', logo: python, use: 'Geospatial & data pipelines' },
  { name: 'JavaScript', logo: javascript, use: 'Earth Engine, web' },
  { name: 'RStudio', logo: rstudio, use: 'Statistics' },
  { name: 'Google Colab', logo: colab, use: 'Reproducible notebooks' },
];

export const arsenal = [
  { name: 'Languages', items: ['Python', 'R', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
  { name: 'Environments', items: ['Jupyter', 'Google Colab', 'VS Code', 'RStudio', 'MATLAB', 'Arduino', 'Raspberry Pi'] },
  { name: 'Data science & ML', items: ['NumPy', 'Pandas', 'Matplotlib', 'Plotly', 'scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'OpenCV'] },
  { name: 'GIS & remote sensing', items: ['QGIS', 'ArcGIS Pro', 'ArcGIS', 'Google Earth Engine', 'Google Earth Pro', 'ERDAS IMAGINE', 'GeoPandas', 'Rasterio', 'GDAL', 'GRASS GIS', 'Leaflet', 'Mapbox'] },
  { name: 'Photogrammetry & UAV', items: ['Agisoft Metashape', 'WebODM', 'DroneDeploy', 'Pix4D', 'CloudCompare'] },
  { name: 'Hydraulics & hydrology', items: ['HEC-RAS', 'HEC-HMS', 'RAS Mapper', 'SWAT', 'MIKE'] },
  { name: 'Simulation & CAD', items: ['ANSYS', 'OpenFOAM', 'SimScale', 'SolidWorks', 'COMSOL', 'AutoCAD'] },
  { name: 'Design & imagery', items: ['Canva', 'Adobe Lightroom', 'Snapseed'] },
];

export const skillDomains = [
  { name: 'Hydrological modelling', text: 'Rainfall–runoff analysis, peak-discharge estimation and watershed response modelling.', tags: ['HEC-HMS', 'SCS-CN', 'Unit hydrograph'] },
  { name: 'Flood inundation mapping', text: 'Floodplain delineation, depth–velocity analysis, dam-break simulation and risk-zone classification.', tags: ['HEC-RAS', 'Dam break', 'Floodplain'] },
  { name: 'GIS & remote sensing', text: 'Spatial analysis, LULC classification, multi-temporal change detection and thematic cartography.', tags: ['ArcGIS Pro', 'QGIS', 'GEE'] },
  { name: 'Photogrammetry', text: 'UAV surveys, orthomosaics, DSM/DTM creation, volumetric analysis and contour mapping.', tags: ['Metashape', 'Drone survey', 'DSM'] },
  { name: 'CAD & design', text: '2D/3D modelling, technical drafting and engineering documentation.', tags: ['SolidWorks', 'AutoCAD', '3D modelling'] },
  { name: 'CFD & simulation', text: 'Flow analysis, thermal simulation and design optimisation.', tags: ['ANSYS', 'Flow Sim', 'FEA'] },
  { name: 'Programming', text: 'Python automation, geospatial scripting, data pipelines and web development.', tags: ['Python', 'JavaScript', 'R'] },
  { name: 'Statistical modelling', text: 'Trend analysis, regression, environmental analytics and prediction.', tags: ['RStudio', 'Regression', 'Time series'] },
];

export const spoken = ['English', 'Hindi', 'Marathi', 'Kannada'];
export const offClock = [
  { k: 'Photography', v: 'Rivers, clouds, wildlife — nature in its rawest form.' },
  { k: 'Motorcycles', v: 'Two wheels, long roads, and a weakness for anything that goes fast.' },
  { k: 'Map art', v: 'Visual reports and posters — making data beautiful.' },
];

/* ── Headline results from the research repositories ── */
export const findings = [
  { v: '168 t/ha/yr', k: 'Mean soil loss, Pravara basin — 33× India’s tolerable limit; 1.21 Mt/yr leaves the catchment' },
  { v: '2,400–3,125 Pa', k: 'Channel shear stress vs 10 Pa critical — highly unstable, actively widening reaches' },
  { v: '21.76 Mm³', k: 'Water-harvesting potential at the 25-yr event; 73.8% of the stream network suited to check dams' },
  { v: '35,000 km²', k: 'Western Maharashtra assessed with RUSLE on Google Earth Engine at 30 m' },
];

/* ── Current role & company work (from Satwik, Oct 2026) ── */
export const currentRole = {
  title: 'Junior Research Fellow (DST-SERB)',
  company: 'Centre for Climate Change & Sustainability Studies, Shivaji University',
  type: 'JRF',
  duration: 'Present',
  location: 'Kolhapur, Maharashtra, India',
  project: 'IoT and Geoinformatics based Flood Monitoring and Prediction System',
  highlights: [
    'DST-SERB funded research project on flood monitoring and prediction — the HydroCast system for the Panchganga river basin',
    'Operational 90-hour river-stage and discharge forecasts every 6 hours: ECMWF rainfall → HEC-HMS → WRD-anchored rating curves → alerts',
    'Live IoT river-level sensing at Shivaji Bridge feeding automatic model recalibration and hourly verification',
    'Python / FastAPI back end, Next.js dashboard, PostGIS database and GitHub Actions automation',
  ],
  skills: ['HEC-HMS', 'IoT telemetry', 'Python', 'FastAPI', 'Next.js', 'GIS'],
};

export const pravahaNow = [
  { k: 'Dam-break analysis', v: 'Breach, overtopping and downstream inundation modelling in HEC-HMS and HEC-RAS 2D.' },
  { k: 'Flood-frequency analysis', v: 'Return-period discharges and stages from gauge records, feeding hydraulic models and design.' },
  { k: 'NGO CSR reports', v: 'Maps, data and write-ups that turn watershed and water programmes into clear impact reports.' },
  { k: 'GIS mapping', v: 'Thematic and base maps, LULC, terrain and field-survey layers for projects and reports.' },
  { k: 'Data analysis', v: 'Cleaning, statistics and visual analytics for hydrological and field datasets.' },
];

export const hydrocastRepo = {
  id: 'hydrocast', name: 'CCCSS-SUK-Panchganga_Hydrocast', repoSlug: 'satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast',
  title: 'HydroCast — operational flood forecasting', category: 'Flood forecasting', language: 'Python', languageColor: '#3B82F6',
  summary: 'Real-time flood early-warning for the 2,140 km² Panchganga basin: 90-hour ECMWF-driven forecasts, HEC-HMS runoff, WRD-anchored rating curves, live IoT sensing, ML recalibration and Telegram alerts — with a Next.js dashboard.',
  algorithm: 'SCS-CN → SCS unit hydrograph → Muskingum routing; PCHIP rating curves; Levenberg–Marquardt recalibration',
  dataInputs: 'ECMWF IFS HRES 9 km via Open-Meteo (18 gauges), ThingSpeak ultrasonic stage, Maharashtra WRD stage–discharge sheets',
  deliverables: '90 h stage & discharge hydrographs, peak-arrival windows (±2 h), 6-level alerts, public API and dashboard',
  codeSnippet: `if is_rajaram:
    anchors = PchipInterpolator(RAJARAM_ANCHORS_STAGE, RAJARAM_ANCHORS_Q)
elif is_shivaji:
    anchors = PchipInterpolator(SHIVAJI_ANCHORS_STAGE, SHIVAJI_ANCHORS_Q)
# PCHIP guarantees dQ/dh > 0 — a monotonic rating curve by construction`,
  cloneCmd: 'git clone https://github.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast.git',
  url: 'https://github.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast',
};

export const founderRole = {
  title: 'Founder & Lead Consultant',
  company: 'Pravaha Tattva Solutions',
  type: 'Consultancy',
  duration: 'Present',
  location: 'Karad, Maharashtra, India',
  project: 'Dam-break analysis · flood-frequency analysis · NGO CSR reports · GIS mapping · data analysis',
  highlights: [
    'Dam-safety studies for Maharashtra dams: Dehrang (Panvel Municipal Corporation), Ekrukh, Jawalgaon and Kurnur (Bori) — design floods, breach hydrographs, inundation, population at risk and emergency-action inputs',
    'Flood-frequency analysis for the Krishna River at Karad: 57-year record, 12 distributions, Bayesian uncertainty, 130 automated tests',
    'CSR and watershed programme reporting for Shramjivi Janata Sahayak Mandal — seven delivered modules for HDFC Bank, TE Connectivity and Atlas projects, including a 16-theme, 2,043.9 km² GIS atlas',
    'Every study delivered as a documented, re-runnable workflow with a public method record',
  ],
  skills: ['HEC-RAS', 'HEC-HMS', 'Flood-frequency', 'GIS', 'Python', 'CSR reporting'],
};
