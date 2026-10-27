import { certificationsFull } from './legacy';

/** Each discipline = a claim + the evidence behind it (all drawn from the original portfolio & GitHub). */
export interface Discipline {
  id: string; name: string; claim: string;
  proof: { what: string; where: string; when: string }[];
  tools: string[]; certKeys: string[]; map?: string;
}

export const disciplines: Discipline[] = [
  {
    id: 'dam', name: 'Dam safety & flood hydraulics',
    claim: 'Breach, overtopping and floodplain simulation — from probable-maximum flood to street-level depth.',
    proof: [
      { what: 'Koyna Dam breach scenarios: PMF in HEC-HMS, 2D breach in HEC-RAS — 66,000+ m³/s, 18+ m depths', where: 'Sahyadri College of Agri. Engg.', when: 'Feb–May 2025' },
      { what: 'Mula–Mutha floodplain risk zonation: HEC-RAS 1D + AHP weighted overlay', where: 'Academic project', when: 'Nov–Dec 2024' },
      { what: 'Flood mapping of Panchganga, Godavari, Krishna and Mula–Mutha rivers', where: 'B.Tech coursework', when: '2021–25' },
      { what: 'Dehrang Dam, Panvel — HEC-HMS hydrology and HEC-RAS 2D breach inundation with Froehlich (2008) breach parameters', where: 'Panvel Municipal Corporation · with CCCSS, Shivaji University', when: '' },
      { what: 'Ekrukh Dam — PMF/SPF design floods, overtopping and piping breach, population at risk and evacuation shelters', where: 'Irrigation & Water Resources Dept., Maharashtra', when: '' },
      { what: 'Jawalgaon Dam — SPF 1,838 m³/s, 72-hour breach simulations and a 22-step EAP-ready PAR pipeline; Kurnur (Bori) Dam breach and controlled-release hydrographs', where: 'Pravaha Tattva Solutions', when: '' },
      { what: 'Flood-frequency analysis, Krishna at Karad: 57 years, LP3 adopted, 100-year flood 8,667 m³/s (95% CI 6,048–12,923)', where: 'Pravaha Tattva Solutions', when: '' },
    ],
    tools: ['HEC-RAS 1D/2D', 'HEC-HMS', 'RAS Mapper', 'Flood-frequency (LP3, GEV, MCMC)', 'IDF / Gumbel', 'Froehlich breach', 'PAR & EAP', 'AHP'],
    certKeys: ['Flood Hazard', 'HEC-HMS', 'Landslide'], map: 'overtop',
  },
  {
    id: 'forecast', name: 'Operational flood forecasting',
    claim: 'HydroCast: a running early-warning system — weather model in, 90-hour river forecast and alert levels out.',
    proof: [
      { what: 'Automated 12-step cycle every 6 h: ECMWF rainfall for 18 gauges → HEC-HMS (SCS-CN, SCS-UH, Muskingum) → stage → alerts', where: 'DST-SERB project · Shivaji University', when: 'Current' },
      { what: 'Rating curves anchored to the Maharashtra WRD stage–discharge sheet (PCHIP, monotonic) at Shivaji Bridge and Rajaram K.T. Weir', where: 'HydroCast · hydraulics', when: '' },
      { what: 'Live ultrasonic river-level sensor over ThingSpeak feeding Levenberg–Marquardt recalibration and hourly verification', where: 'HydroCast · IoT telemetry', when: '' },
      { what: 'Peak-arrival windows (±2 h, 95%) and a 6-level alert ladder broadcast to district control rooms by Telegram', where: 'HydroCast · alerting', when: '' },
    ],
    tools: ['HEC-HMS 4.x', 'ECMWF / Open-Meteo', 'Muskingum routing', 'Rating curves', 'ThingSpeak IoT', 'FastAPI', 'Next.js', 'PostGIS'],
    certKeys: ['Drought', 'Flood Hazard'], map: 'overtop',
  },
  {
    id: 'watershed', name: 'Watershed hydrology & conservation',
    claim: 'From catchment delineation and runoff modelling to on-the-ground soil-and-water structures.',
    proof: [
      { what: 'Resilient River Ghod: documenting CCTs, gabions and loose-boulder structures; village plantation mapping', where: 'Shramjivi Janata Sahayyak Mandal', when: 'Sep 2025 – now' },
      { what: 'CSR and watershed programme reports for SJSM (HDFC Bank, TE Connectivity, Atlas): 16-theme GIS atlas over 2,043.9 km², six-village hydrological mapping, drone monitoring', where: 'Pravaha Tattva Solutions', when: '' },
      { what: 'Panchganga basin rainfall–runoff model in HEC-HMS', where: 'Shivaji University (CCCSS)', when: 'Aug–Dec 2024' },
      { what: 'Pravara basin morphometry: 62+ parameters, PCA/K-means, tri-method prioritisation', where: 'Open repository', when: '' },
    ],
    tools: ['HEC-HMS', 'SCS-CN', 'Unit hydrograph', 'Horton–Strahler', 'Compound ranking'],
    certKeys: ['Resilient', 'WaterShed', 'Drought'], map: 'basin',
  },
  {
    id: 'erosion', name: 'Soil erosion & land degradation',
    claim: 'RUSLE at every scale — a river reach, a basin, 35,000 km² of Western Maharashtra.',
    proof: [
      { what: 'Panchganga spatiotemporal analysis (1994–2024) + RUSLE soil-loss classes', where: 'Academic project', when: 'Aug–Sep 2024' },
      { what: 'Land-degradation mapping in the Western Ghats; RUSLE implemented in Google Earth Engine', where: 'Shivaji University', when: 'Aug–Dec 2024' },
      { what: 'Pravara: 168 t/ha/yr mean loss — 33× the tolerable limit; 21.76 Mm³ water-harvesting potential', where: 'Open repository', when: '' },
    ],
    tools: ['RUSLE', 'Google Earth Engine', 'ArcGIS', 'CHIRPS · SoilGrids', 'GPM IMERG'],
    certKeys: [], map: 'soil',
  },
  {
    id: 'rs', name: 'Remote sensing & Earth Engine',
    claim: 'Landsat, Sentinel and MODIS turned into change, water, vegetation and urban indicators.',
    proof: [
      { what: '30 years of channel migration from Landsat 5 → 9 with NDWI and vector analysis', where: 'Academic project', when: 'Aug–Sep 2024' },
      { what: 'NDVI, NDWI, MNDWI, BSI, SAVI, EVI and Urban Index analysis; LULC classification', where: 'Shivaji University', when: 'Aug–Dec 2024' },
      { what: 'FAO-56 crop water balance and ET engine for Satara–Sangli–Kolhapur on GEE', where: 'Open repository', when: '' },
    ],
    tools: ['Google Earth Engine', 'Landsat · Sentinel · MODIS', 'ERDAS', 'GDAL / Rasterio', 'LULC classification'],
    certKeys: ['IIRS', 'Hyperspectral', 'Remote Sensing', 'GEE', 'GEO University', 'Geological Survey'], map: 'lulc',
  },
  {
    id: 'uav', name: 'UAV photogrammetry & terrain',
    claim: 'Drone imagery to centimetre-grade surfaces, orthomosaics and volumes.',
    proof: [
      { what: 'High-resolution DSM of Panhala Fort from UAV imagery in Agisoft Metashape', where: 'Shivaji University', when: 'Aug–Dec 2024' },
      { what: 'Pipeline: Structure-from-Motion → dense matching → DSM/DEM, orthomosaic, point cloud, volumetrics', where: 'Pravaha Tattva service', when: 'ongoing' },
    ],
    tools: ['Agisoft Metashape', 'WebODM', 'Pix4D', 'CloudCompare', 'DSM / DTM'],
    certKeys: [],
  },
  {
    id: 'wildlife', name: 'Wildlife & conservation geomatics',
    claim: 'Camera-trap data and habitat maps that show where animals — and people — are.',
    proof: [
      { what: 'Camera-trap time-series cleaning and wildlife-hotspot mapping; study & location index maps', where: 'Sahyadri Tiger Reserve · Maharashtra Forest Dept.', when: 'Mar–Apr 2025' },
      { what: 'Village plantation and structure mapping for river restoration', where: 'Resilient River Ghod', when: 'Sep 2025 – now' },
    ],
    tools: ['ArcMap', 'Hotspot analysis', 'Time-series cleaning', 'Cartography'],
    certKeys: [],
  },
  {
    id: 'sim', name: 'Engineering simulation & machinery design',
    claim: 'The engineering root: CFD, FEA and CAD on agricultural machinery and irrigation hardware.',
    proof: [
      { what: 'Static-structural, thermal and fluid-flow simulation of transmissions, shafts, gears and engines', where: 'Indo-German Tool Room, Ahmedabad', when: 'Jun–Jul 2024' },
      { what: 'Revolving sprinkler design: discharge and pressure calculations, SolidWorks model', where: 'B.Tech project', when: '' },
      { what: 'Tractor rear-mounted leveler/grader: cost-aware design with load and stress analysis', where: 'B.Tech mini-project', when: '' },
      { what: '26-day programme on tractors, tillage implements and seed-drill calibration', where: 'CFMTTI, Budni', when: 'Sep 2023' },
    ],
    tools: ['ANSYS', 'SolidWorks CAE', 'OpenFOAM', 'AutoCAD', 'Siemens NX'],
    certKeys: ['ANSYS', 'SOLIDWORKS', 'NX'],
  },
  {
    id: 'code', name: 'Code & data science',
    claim: 'Python and JavaScript pipelines so every analysis is reproducible — and a forecasting system in progress.',
    proof: [
      { what: 'HydroCast — operational flood-forecasting system for the Panchganga basin (Python, FastAPI, Next.js, PostGIS, GitHub Actions)', where: 'Open source', when: 'Operational' },
      { what: 'Pravara pipeline: 19 sections, 24 maps at 600 DPI, 36 interactive charts, 8,000+ lines', where: 'Open repository', when: '' },
      { what: 'RUSLE, crop-water balance, TRMM/GPM rainfall extraction and dam-breach plotting tools', where: 'GitHub · Satwik-1234', when: '' },
    ],
    tools: ['Python', 'JavaScript', 'R', 'GeoPandas', 'scikit-learn', 'Plotly', 'Jupyter'],
    certKeys: ['ChatGPT'],
  },
];

export const certsFor = (d: Discipline) =>
  certificationsFull.filter((c) => d.certKeys.some((k) => (c.name + ' ' + c.issuer).toLowerCase().includes(k.toLowerCase())));
