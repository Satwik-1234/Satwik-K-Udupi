import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Github,
  ArrowUpRight,
  Star,
  GitFork,
  Terminal,
  Copy,
  Check,
  Code2,
  Cpu,
  Layers,
  Database,
  ExternalLink,
  FolderGit2
} from 'lucide-react';
import AuroraText from '@/components/ui/AuroraText';

interface RepositoryData {
  id: string;
  name: string;
  repoSlug: string;
  title: string;
  category: string;
  language: string;
  languageColor: string;
  summary: string;
  algorithm: string;
  dataInputs: string;
  deliverables: string;
  codeSnippet: string;
  cloneCmd: string;
  url: string;
  stars?: number;
  forks?: number;
}

const REPOSITORIES: RepositoryData[] = [
  {
    id: 'rusle-wm',
    name: 'RUSLE_Western-Maharashtra',
    repoSlug: 'Satwik-1234/RUSLE_Western-Maharashtra',
    title: 'RUSLE Catchment Soil Erosion Engine',
    category: 'Soil Conservation',
    language: 'Python',
    languageColor: '#3B82F6',
    summary: 'Automated 30m spatial erosion modeling integrating rainfall erosivity, soil erodibility, and slope length-steepness factors across Western Maharashtra river basins.',
    algorithm: 'RUSLE (Renard et al.) + Topo-Hydrological Slope Formulation',
    dataInputs: 'CHIRPS Daily Rainfall, NBSS&LUP Soil Maps, SRTM 30m DEM, Sentinel-2 NDVI',
    deliverables: 'Mean Annual Soil Loss (t/ha/yr) GeoTIFFs, Conservation Priority Zonation',
    codeSnippet: `# Compute LS Factor from DEM slope & catchment area
slope_rad = np.radians(dem_slope)
flow_acc_m = flow_accumulation * pixel_size
ls_factor = np.power(flow_acc_m / 22.13, 0.4) * np.power(np.sin(slope_rad) / 0.0896, 1.3)
annual_soil_loss = r_factor * k_factor * ls_factor * c_factor * p_factor`,
    cloneCmd: 'git clone https://github.com/Satwik-1234/RUSLE_Western-Maharashtra.git',
    url: 'https://github.com/Satwik-1234/RUSLE_Western-Maharashtra',
  },
  {
    id: 'pravara-morph',
    name: 'Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis',
    repoSlug: 'Satwik-1234/Pravara-River-Basin-Analysis',
    title: 'Drainage Morphometry & Basin Prioritization',
    category: 'Watershed Hydrology',
    language: 'Python',
    languageColor: '#3B82F6',
    summary: 'Comprehensive extraction of linear, areal, and relief drainage parameters with compound priority rank scoring for sub-watershed soil and water conservation.',
    algorithm: 'Horton & Strahler Stream Ordering + Compound Ranking (CR)',
    dataInputs: 'ALOS PALSAR 12.5m RTC DEM, Survey of India Toposheets',
    deliverables: 'Bifurcation Ratios, Drainage Density (Dd), Relief Ratio (Rh), Priority Rankings',
    codeSnippet: `# Automated morphometric parameter calculations
Rb = np.mean([N_u / N_u_plus_1 for N_u, N_u_plus_1 in stream_pairs])
Dd = total_stream_length_km / basin_area_sqkm
Fs = stream_count_total / basin_area_sqkm
Rn = basin_relief_m * Dd  # Ruggedness number`,
    cloneCmd: 'git clone https://github.com/Satwik-1234/Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis.git',
    url: 'https://github.com/Satwik-1234/Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis',
  },
  {
    id: 'crop-water-gee',
    name: 'Crop-water-Balance-Analysis-GEE-',
    repoSlug: 'Satwik-1234/Crop-water-Balance-Analysis-GEE-',
    title: 'Cloud-Native Crop Water Balance & ET Engine',
    category: 'Remote Sensing & Agri-Tech',
    language: 'JavaScript',
    languageColor: '#FACC15',
    summary: 'Google Earth Engine script calculating spatial evapotranspiration (ET), crop water requirements (CWR), and soil water deficit indices at multi-temporal scales.',
    algorithm: 'FAO-56 Penman-Monteith Formulation & SSEBop Energy Balance',
    dataInputs: 'MODIS MOD16A2 ET (500m), Landsat-8 Surface Reflectance, CHIRPS Pentad',
    deliverables: 'Crop Water Stress Indices (CWSI), Command Area Monthly Water Deficit Rasters',
    codeSnippet: `// GEE Daily Evapotranspiration & Water Deficit
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(roi)
  .filterDate(startDate, endDate)
  .map(maskS2clouds);

var ndvi = s2.map(function(img) {
  return img.normalizedDifference(['B8', 'B4']).rename('NDVI');
});
var kc = ndvi.map(function(img) {
  return img.multiply(1.2).subtract(0.1).rename('Kc');
});`,
    cloneCmd: 'git clone https://github.com/Satwik-1234/Crop-water-Balance-Analysis-GEE-.git',
    url: 'https://github.com/Satwik-1234/Crop-water-Balance-Analysis-GEE-',
  },
  {
    id: 'soil-erosion-gee',
    name: 'Soil-Erosion-Analysis-GEE',
    repoSlug: 'Satwik-1234/Soil-Erosion-Analysis-GEE',
    title: 'GEE Cloud Planetary RUSLE Pipeline',
    category: 'Planetary Computing',
    language: 'JavaScript',
    languageColor: '#FACC15',
    summary: 'Zero-install interactive GEE cloud pipeline estimating erosion dynamics across multiple catchments with dynamic slider visualizations and zonal stats export.',
    algorithm: 'Continuous Cloud-Computed Spatial RUSLE Matrix',
    dataInputs: 'Sentinel-2 BOA, SRTM 30m Global DEM, OpenLandMap Soil Sand/Clay Grids',
    deliverables: 'Real-time Regional Erosion Heatmaps, Sub-basin Tabular Zonal Summaries',
    codeSnippet: `// Compute dynamic vegetation C-factor from NDVI in Earth Engine
var ndviMean = ndviCollection.reduce(ee.Reducer.mean());
var cFactor = ndviMean.expression(
  'exp(-alpha * (ndvi / (beta - ndvi)))', {
    'ndvi': ndviMean.select('NDVI_mean'),
    'alpha': 2.0,
    'beta': 1.0
  }
).rename('C_Factor');`,
    cloneCmd: 'git clone https://github.com/Satwik-1234/Soil-Erosion-Analysis-GEE.git',
    url: 'https://github.com/Satwik-1234/Soil-Erosion-Analysis-GEE',
  },
  {
    id: 'trmm-gpm-extractor',
    name: 'TRMM-GPM-Rainfall-Data-Extraction-Guide-Panchganga-Basin',
    repoSlug: 'Satwik-1234/TRMM-GPM-Rainfall-Pipeline',
    title: 'TRMM / GPM Satellite Rainfall Batch Extractor',
    category: 'Data Engineering',
    language: 'Python',
    languageColor: '#3B82F6',
    summary: 'High-throughput NetCDF4 parser and spatial aggregation pipeline converting 20+ years of satellite precipitation into clean time-series CSVs for hydraulic models.',
    algorithm: 'Spatial Polygon Vector Masking & Weighted Grid Cell Averages',
    dataInputs: 'NASA TRMM 3B42 (0.25°), GPM IMERG Final Run V06 (0.1°)',
    deliverables: 'Daily/Monthly Basin Hyetographs, Extreme Rainfall Frequency Statistics',
    codeSnippet: `# Spatial clip & organize NetCDF4 rainfall cubes
import xarray as xr, geopandas as gpd, rioxarray
basin_shape = gpd.read_file('panchganga_basin.shp')
ds = xr.open_mfdataset('data/gpm_*.nc', combine='by_coords')
ds = ds.rio.write_crs("EPSG:4326")
clipped = ds.rio.clip(basin_shape.geometry, basin_shape.crs)
df_rainfall = clipped['precipitationCal'].mean(dim=['lat', 'lon']).to_dataframe()`,
    cloneCmd: 'git clone https://github.com/Satwik-1234/TRMM-GPM-Rainfall-Data-Extraction-Guide-Panchganga-Basin.git',
    url: 'https://github.com/Satwik-1234/TRMM-GPM-Rainfall-Data-Extraction-Guide-Panchganga-Basin',
  },
  {
    id: 'bori-dam-breach',
    name: 'BORI-DAM-breach-plots-',
    repoSlug: 'Satwik-1234/BORI-DAM-breach-plots-',
    title: 'Dam Breach Outflow & Wave Propagation Plots',
    category: 'Hydraulic Modeling',
    language: 'Python',
    languageColor: '#3B82F6',
    summary: 'Engineering visualization suite translating unsteady HEC-RAS 2D breach simulation tables into peak arrival times, hydrographs, and inundation lag curves.',
    algorithm: 'Froehlich Dam Breach Hydrograph Analytics & Stage-Discharge Plotting',
    dataInputs: 'HEC-RAS Unsteady Inundation Plan HDF5 / DSS Output Files',
    deliverables: 'Peak Discharge Hydrographs, Wave Attenuation Profiles, Emergency Action Timers',
    codeSnippet: `# Plot stage-discharge & wave lag propagation
fig, ax1 = plt.subplots(figsize=(10, 5))
ax1.plot(time_hours, breach_discharge, color='#213BA3', lw=2.2, label='Breach Outflow (m³/s)')
ax1.set_ylabel('Discharge Q (m³/s)', color='#213BA3', fontweight='bold')
ax2 = ax1.twinx()
ax2.plot(time_hours, downstream_depth, color='#D6AE29', lw=1.8, ls='--', label='Downstream Depth (m)')
ax1.grid(True, alpha=0.25)`,
    cloneCmd: 'git clone https://github.com/Satwik-1234/BORI-DAM-breach-plots-.git',
    url: 'https://github.com/Satwik-1234/BORI-DAM-breach-plots-',
  },
];

const GitHubProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedRepoId, setSelectedRepoId] = useState<string>(REPOSITORIES[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const activeRepo = REPOSITORIES.find((r) => r.id === selectedRepoId) || REPOSITORIES[0];

  const handleCopyClone = () => {
    navigator.clipboard.writeText(activeRepo.cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-background border-t border-border/40" ref={ref}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Github className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono font-medium text-primary tracking-wide">
              Engineering Repositories & Code
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Open Source{' '}
            <AuroraText
              speed={1}
              colors={['#213BA3', '#47A2F5', '#D6AE29', '#213BA3']}
              className="font-display font-extrabold"
            >
              Hydrology & Geospatial Code
            </AuroraText>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Select a repository to inspect its engineering methodology, data inputs, real outputs, and executable pipeline scripts.
          </p>
        </motion.div>

        {/* Dual-Pane Interactive Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Repository Selector List (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Repositories ({REPOSITORIES.length})
              </span>
              <a
                href="https://github.com/Satwik-1234"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
              >
                @Satwik-1234 <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {REPOSITORIES.map((repo) => {
              const isSelected = repo.id === selectedRepoId;
              return (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepoId(repo.id)}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-card border-primary/50 shadow-md shadow-primary/5'
                      : 'bg-card/40 hover:bg-card/70 border-border/50 hover:border-border'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l" />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono text-muted-foreground truncate">
                      {repo.repoSlug}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                      {repo.category}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-bold leading-tight mb-1.5 transition-colors ${
                      isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}
                  >
                    {repo.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {repo.summary}
                  </p>

                  <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-border/30 text-[11px] font-mono text-muted-foreground">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Right Column: Deep-Dive Inspector & Code Terminal (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 sticky top-24"
          >
            <div className="rounded-2xl border border-border/70 bg-card/90 backdrop-blur-xl shadow-xl overflow-hidden">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground ml-2 font-medium flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-primary" />
                    {activeRepo.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyClone}
                    title="Copy Git Clone command"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-background border border-border hover:border-primary/40 text-foreground transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-muted-foreground" />
                        <span>git clone</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeRepo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
                  >
                    <span>View Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Inspector Content Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRepo.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 space-y-5"
                >
                  {/* Title & Summary */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: activeRepo.languageColor }}
                      />
                      <span className="text-xs font-mono text-muted-foreground">
                        {activeRepo.language} · {activeRepo.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {activeRepo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {activeRepo.summary}
                    </p>
                  </div>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Algorithm */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border/50">
                      <div className="flex items-center gap-2 mb-1 text-primary">
                        <Cpu className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                          Methodology / Formulation
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground leading-tight">
                        {activeRepo.algorithm}
                      </p>
                    </div>

                    {/* Inputs */}
                    <div className="p-3.5 rounded-xl bg-background/80 border border-border/50">
                      <div className="flex items-center gap-2 mb-1 text-primary">
                        <Layers className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                          Primary Datasets & Inputs
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground leading-tight">
                        {activeRepo.dataInputs}
                      </p>
                    </div>
                  </div>

                  {/* Core Deliverable Bar */}
                  <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-start gap-2">
                      <Database className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block mb-0.5">
                          Engineering Output Deliverable
                        </span>
                        <span className="text-xs text-foreground font-semibold">
                          {activeRepo.deliverables}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippet Box */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-primary" />
                        Core Algorithm Implementation
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground/70">
                        {activeRepo.language}
                      </span>
                    </div>

                    <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed border border-zinc-800 shadow-inner">
                      <code>{activeRepo.codeSnippet}</code>
                    </pre>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/Satwik-1234"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs font-mono font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Github className="w-4 h-4" />
            <span>Explore All 20+ Repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjectsSection;
