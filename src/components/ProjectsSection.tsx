import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronRight, MapPin, Calendar, Target, Database, Wrench, BarChart3, CheckCircle2, Layers, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  shortTitle: string;
  duration: string;
  association?: string;
  objectives: string[];
  datasets: string[];
  methodology: string[];
  analysis: string[];
  results: string[];
  skills: string[];
  featured?: boolean;
  color: string;
}

const projects: Project[] = [
  {
    title: "Hydraulic Assessment of Koyna Dam - Breach Scenarios Using HEC-RAS and HEC-HMS",
    shortTitle: "Koyna Dam Breach Analysis",
    duration: "Feb 2025 - May 2025",
    association: "Sahyadri College of Agricultural Engineering and Technology",
    objectives: [
      "Assess Probable Maximum Precipitation and Flood for Koyna Dam Catchment",
      "Evaluate spillway performance and flood buffering capacity",
      "Prepare floodplain inundation maps for various breach scenarios"
    ],
    datasets: [
      "Historical rainfall & stream gauge records (IMD)",
      "Probable Maximum Precipitation (PMP) estimates",
      "SRTM GL1 Digital Elevation Model",
      "Globecover v200 Land use land cover data"
    ],
    methodology: [
      "Hydrological simulations in HEC-HMS for PMF hydrographs",
      "Breach modeling in HEC-RAS 2D for overtopping scenarios",
      "Reservoir routing in HEC-HMS for spillway capacity testing"
    ],
    analysis: [
      "Spillway found inadequate for PMP-based floods",
      "Reservoir levels approached 657m (near 661.3m max)",
      "Peak breach discharges exceeded 66,000 m³/s",
      "Downstream inundation depths reached 18+ meters"
    ],
    results: [
      "Reduced flood buffering due to sedimentation",
      "Dam breach and Inundation maps for downstream basin",
      "PMF Hydrographs for 1-2-3 day intervals",
      "Proposed spillway expansion and EAPs for downstream safety"
    ],
    skills: ["HEC-HMS", "HEC-RAS", "Floodplain Mapping", "Dam Safety Analysis"],
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Floodplain Risk Zonation Mapping of Mula Mutha River Basin",
    shortTitle: "Mula Mutha Flood Risk Mapping",
    duration: "Nov 2024 - Dec 2024",
    objectives: [
      "Assess flood risks across the Mula–Mutha basin",
      "Integrate hydraulic modeling with GIS-based decision analysis",
      "Support disaster preparedness and urban planning"
    ],
    datasets: [
      "River discharge data for multiple return periods",
      "DEM-based elevation & slope layers",
      "Land use/land cover (LULC) maps",
      "Proximity-to-river spatial layers"
    ],
    methodology: [
      "HEC-RAS 1D steady flow simulations for flood inundation",
      "ArcGIS mapping of terrain & land-use factors",
      "AHP-based multi-criteria analysis with weighted factors",
      "Weighted overlay to produce Flood Risk Index maps"
    ],
    analysis: [
      "Identified inundation patterns across basin floodplains",
      "Assigned relative influence of slope, elevation, LULC",
      "Created risk categories: low, moderate, high, very high"
    ],
    results: [
      "Detailed flood risk maps for urban Pune",
      "Highlighted vulnerability of rapidly developing areas",
      "Integration of hydraulic + spatial analysis for better planning"
    ],
    skills: ["AHP", "Supervised Classification", "ArcGIS Desktop", "HEC-RAS"],
    featured: true,
    color: "from-teal-500/20 to-emerald-500/20"
  },
  {
    title: "Spatiotemporal Analysis and RUSLE Assessment of Panchganga River Basin",
    shortTitle: "Panchganga River RUSLE Analysis",
    duration: "Aug 2024 - Sep 2024",
    objectives: [
      "Investigate temporal shifts in river flow patterns (1994–2024)",
      "Assess erosion and accretion dynamics using satellite data",
      "Estimate average annual soil loss for watershed management"
    ],
    datasets: [
      "Landsat 5 & 9 imagery (1994–2024)",
      "NDWI-derived waterbody layers",
      "Vectorized channel boundaries",
      "Soil, rainfall & topographic datasets for RUSLE"
    ],
    methodology: [
      "NDWI & vector analysis for erosion–accretion mapping",
      "Temporal river channel shift detection",
      "RUSLE model applied in ArcGIS for annual soil loss",
      "Spatial overlay of hydrological & terrain parameters"
    ],
    analysis: [
      "Detected channel migration and morphological changes",
      "Identified critical erosion-prone and deposition zones",
      "Estimated spatial soil loss rates across the basin"
    ],
    results: [
      "Mapped 30-year morphodynamic changes in lower Panchganga",
      "Quantified erosion–accretion hotspots",
      "Insights for soil conservation & sustainable planning"
    ],
    skills: ["Spatial Analysis", "ArcGIS Desktop", "RUSLE", "Change Detection"],
    featured: true,
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    title: "Revolving Type Sprinkler Design for Irrigation",
    shortTitle: "Sprinkler Design (SolidWorks)",
    duration: "Academic Project",
    objectives: [
      "Design efficient revolving type sprinkler for irrigation",
      "Calculate discharge flow and pressure requirements"
    ],
    datasets: [],
    methodology: [
      "Discharge flow calculations",
      "Pressure calculations for real-world irrigation",
      "3D modeling in SolidWorks"
    ],
    analysis: [],
    results: [
      "Functional sprinkler design for agricultural applications",
      "Optimized for water efficiency"
    ],
    skills: ["SolidWorks", "Irrigation Systems", "Fluid Mechanics"],
    featured: false,
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    title: "Tractor Rear Mounted Leveler/Grader Design",
    shortTitle: "Leveler/Grader Design",
    duration: "Mini Project",
    objectives: [
      "Design functional tractor-mounted grader/leveler",
      "Consider real-world farming and earthmoving applications"
    ],
    datasets: [],
    methodology: [
      "Functional design considering cost economics",
      "3D modeling in SolidWorks",
      "Load and stress analysis"
    ],
    analysis: [],
    results: [
      "Complete design for tractor-mounted leveler",
      "Cost-effective solution for farming operations"
    ],
    skills: ["SolidWorks", "Agricultural Machinery", "Mechanical Design"],
    featured: false,
    color: "from-rose-500/20 to-pink-500/20"
  }
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Layers className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Research & Projects</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive hydrological modeling, GIS analysis, and watershed management projects with real-world impact.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="space-y-6 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div 
                  className={`relative glass-card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${
                    expandedProject === project.title ? 'border-primary/50' : ''
                  }`}
                >
                  {/* Gradient accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Project number */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-foreground/5 font-display">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  {/* Header */}
                  <div 
                    className="relative p-6 md:p-8 cursor-pointer"
                    onClick={() => setExpandedProject(expandedProject === project.title ? null : project.title)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{project.duration}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.shortTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                          {project.title}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/10 text-foreground/80 border border-foreground/10">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground hidden lg:block">
                          {expandedProject === project.title ? 'Collapse' : 'Expand'}
                        </span>
                        <div className={`w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center transition-transform duration-300 ${
                          expandedProject === project.title ? 'rotate-90' : ''
                        }`}>
                          <ChevronRight className="w-5 h-5 text-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedProject === project.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative border-t border-border/30"
                      >
                        <div className="p-6 md:p-8">
                          {project.association && (
                            <p className="text-sm text-secondary flex items-center gap-2 mb-6 pb-6 border-b border-border/30">
                              <MapPin className="w-4 h-4" />
                              {project.association}
                            </p>
                          )}

                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Objectives */}
                            <div>
                              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                <Target className="w-4 h-4 text-primary" />
                                Objectives
                              </h4>
                              <ul className="space-y-3">
                                {project.objectives.map((obj, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span>{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Datasets */}
                            {project.datasets.length > 0 && (
                              <div>
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                  <Database className="w-4 h-4 text-primary" />
                                  Datasets
                                </h4>
                                <ul className="space-y-3">
                                  {project.datasets.map((data, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                                      <span>{data}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Methodology */}
                            <div>
                              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                <Wrench className="w-4 h-4 text-primary" />
                                Methodology
                              </h4>
                              <ul className="space-y-3">
                                {project.methodology.map((method, i) => (
                                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                    <span>{method}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Analysis */}
                            {project.analysis.length > 0 && (
                              <div>
                                <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                  <BarChart3 className="w-4 h-4 text-primary" />
                                  Key Findings
                                </h4>
                                <ul className="space-y-3">
                                  {project.analysis.map((item, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Results */}
                          <div className="mt-8 pt-8 border-t border-border/30">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              Results & Deliverables
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {project.results.map((result, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-foreground">{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-8 text-center text-muted-foreground">
              Other Academic Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="group relative glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.shortTitle}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{project.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 text-xs rounded-md bg-muted/50 text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
