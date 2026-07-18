import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft, Waves, Mountain, Map,
  Plane, Camera, Ruler, Phone, Mail, MessageCircle, ExternalLink,
  ArrowRight, ArrowUpRight, Droplets, Layers, Satellite, FlaskConical,
  User, Briefcase, Award, MapPin, GraduationCap, Github, Globe, CheckCircle2, Star,
  Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

// Service images
import floodplainImg from '@/assets/services/floodplain-mapping.png';
import rainfallRunoffImg from '@/assets/services/rainfall-runoff.png';
import soilErosionImg from '@/assets/services/soil-erosion.png';
import gisAnalysisImg from '@/assets/services/gis-analysis.png';
import cfdAnalysisImg from '@/assets/services/cfd-analysis.png';
import dronePhotogrammetryImg from '@/assets/services/drone-photogrammetry.png';
import droneMappingImg from '@/assets/services/drone-mapping.png';
import multispectralImg from '@/assets/services/multispectral.png';
import pravahaLogo from '@/assets/pravaha-logo.png';
import profilePhoto from '@/assets/profile-photo.png';
import earthGif from '@/assets/revolving-earth.gif';

const services = [
  {
    id: '01', icon: Waves, title: 'Hydraulic Modeling', subtitle: 'HEC-RAS & Flood Analysis',
    description: 'Precision flood risk assessment and floodplain delineation using industry-standard hydraulic modeling.',
    capabilities: ['Flood Extent Mapping', 'Depth-Velocity Analysis', 'Dam Break Simulation', 'Bridge Hydraulics'],
    image: floodplainImg
  },
  {
    id: '02', icon: Mountain, title: 'Watershed Hydrology', subtitle: 'HEC-HMS & Runoff Modeling',
    description: 'Comprehensive hydrological analysis from catchment delineation to peak discharge estimation.',
    capabilities: ['Basin Delineation', 'Rainfall-Runoff Modeling', 'SCS-CN Method', 'Unit Hydrograph'],
    image: rainfallRunoffImg
  },
  {
    id: '03', icon: Layers, title: 'Erosion Assessment', subtitle: 'RUSLE & Soil Conservation',
    description: 'Quantitative soil loss estimation using empirical models integrated with remote sensing data.',
    capabilities: ['RUSLE Modeling', 'Sediment Yield', 'Conservation Planning', 'Priority Mapping'],
    image: soilErosionImg
  },
  {
    id: '04', icon: Satellite, title: 'Geospatial Analysis', subtitle: 'ArcGIS Pro & QGIS',
    description: 'Advanced spatial analysis and thematic mapping leveraging multi-temporal satellite imagery.',
    capabilities: ['LULC Classification', 'Change Detection', 'Spatial Modeling', 'Cartographic Design'],
    image: gisAnalysisImg
  },
  {
    id: '05', icon: Plane, title: 'UAV Photogrammetry', subtitle: 'Drone Surveys & Mapping',
    description: 'High-resolution aerial surveys with centimeter-level accuracy for terrain analysis.',
    capabilities: ['Orthomosaic Generation', 'DSM/DTM Creation', 'Volumetric Analysis', 'Contour Mapping'],
    image: dronePhotogrammetryImg
  },
  {
    id: '06', icon: FlaskConical, title: 'CFD Simulations', subtitle: 'Computational Fluid Dynamics',
    description: 'Flow simulation and thermal analysis for agricultural machinery and irrigation infrastructure.',
    capabilities: ['Flow Simulation', 'Thermal Analysis', 'Design Optimization', 'Performance Validation'],
    image: cfdAnalysisImg
  },
  {
    id: '07', icon: Camera, title: 'Multispectral Imaging', subtitle: 'NDVI & Crop Health',
    description: 'Vegetation health assessment using multispectral indices for agricultural optimization.',
    capabilities: ['NDVI/NDWI Analysis', 'Crop Health Mapping', 'Stress Detection', 'Yield Prediction'],
    image: multispectralImg
  },
  {
    id: '08', icon: Ruler, title: 'Technical Drafting', subtitle: 'CAD & Design Documentation',
    description: 'Professional 2D/3D CAD services for irrigation systems and civil infrastructure.',
    capabilities: ['2D Drafting', '3D Modeling', 'Assembly Drawings', 'Design Documentation'],
    image: droneMappingImg
  }
];

const processSteps = [
  { 
    step: '01', title: 'Discovery & Consultation', 
    description: 'We begin with in-depth discussions to understand your project scope, objectives, geographic focus, and data requirements. This includes site feasibility assessment, stakeholder mapping, and defining key deliverables and timelines.',
    highlights: ['Scope Definition', 'Feasibility Study', 'Timeline Planning']
  },
  { 
    step: '02', title: 'Data Acquisition & Preprocessing', 
    description: 'We collect and preprocess multi-source datasets including satellite imagery (Landsat, Sentinel), DEM data (SRTM/ALOS), field survey measurements, drone captures, and existing hydrological records for comprehensive spatial coverage.',
    highlights: ['Satellite Imagery', 'Field Surveys', 'Drone Captures']
  },
  { 
    step: '03', title: 'Analysis & Modeling', 
    description: 'Our core phase applies industry-standard tools—HEC-RAS for hydraulic modeling, HEC-HMS for rainfall-runoff simulation, ArcGIS Pro/QGIS for spatial analysis, and Python/GEE for automated geospatial workflows and machine learning integration.',
    highlights: ['HEC-RAS/HMS', 'GIS Analysis', 'ML Integration']
  },
  { 
    step: '04', title: 'Deliverables & Reporting', 
    description: 'We deliver publication-ready thematic maps, comprehensive technical reports with methodology documentation, interactive web maps, raw processed datasets, and actionable recommendations tailored to your project goals.',
    highlights: ['Thematic Maps', 'Technical Reports', 'Recommendations']
  },
];

const testimonials = [
  { name: 'Watershed Management Project', org: 'Forest Department, Maharashtra', text: 'Delivered comprehensive erosion mapping for priority watershed conservation.' },
  { name: 'Dam Safety Assessment', org: 'Academic Research', text: 'Precision HEC-RAS modeling for Koyna Dam breach scenario analysis.' },
];

const PravahaTattva = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  const phoneNumber = '+919834300849';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=Hi%20Satwik,%20I'm%20interested%20in%20your%20geospatial%20consulting%20services`;
  const googleFormUrl = 'https://forms.gle/SCyQeFigrgsPft9D9';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Krishna+Canal+Saidapur+Road+Karad+415124+Maharashtra+India';
  const githubUrl = 'https://github.com/007-Wik';

  return (
    <>
      <Helmet>
        <title>Pravaha Tattva Solutions | Geospatial & Hydrology Consulting</title>
        <meta name="description" content="Professional GIS, hydraulic modeling, and drone mapping services. Expertise in HEC-RAS, HEC-HMS, ArcGIS, and remote sensing for sustainable water resource management." />
        <link rel="canonical" href="https://satwikudupi.com/pravaha-tattva" />
      </Helmet>

      {/* Global Background and Overlay */}
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/assets/pravaha-hero-bg.jpg')" }} 
      />
      {/* Light/Dark Mode friendly frosted glass overlay */}
      <div className="fixed inset-0 z-[-1] bg-background/85 backdrop-blur-[4px] transition-colors duration-300" />

      <div className="min-h-screen text-foreground">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30">
          <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-semibold tracking-tight text-foreground">Pravaha Tattva</span>
                <span className="text-xs text-muted-foreground block -mt-0.5">Geospatial and Hydrological Solutions</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#process" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Process</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all">
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
              <a href={googleFormUrl} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300">
                Get Quote
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-card/50 mb-8 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Available for Projects</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] mb-6 tracking-tight text-foreground">
                  Precision
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Geospatial
                  </span>
                  <br />
                  Intelligence
                </h1>
                
                <p className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed font-light">
                  Transforming complex hydrological data into strategic insights. 
                  From watershed analysis to flood risk mapping—engineering solutions 
                  for sustainable water resource management.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <motion.a href={googleFormUrl} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Start a Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <a href="#services"
                    className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full border border-border/50 text-foreground font-medium hover:bg-card/50 hover:border-border transition-all duration-300 backdrop-blur-sm">
                    Explore Services
                  </a>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden lg:flex items-center justify-center">
                <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/10" />
                <div className="absolute w-[320px] h-[320px] rounded-full border border-primary/20" />
                <div className="absolute w-[240px] h-[240px] rounded-full border border-primary/10" />
                <motion.img src={pravahaLogo} alt="Pravaha Tattva Logo" className="w-[380px] md:w-[420px] drop-shadow-2xl"
                  animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
              </motion.div>
            </div>
          </div>
          
          <motion.div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-6 h-10 rounded-full border border-border/40 flex justify-center pt-2 backdrop-blur-sm">
              <div className="w-1 h-2 rounded-full bg-muted-foreground/40" />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={isAboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
                className="relative">
                <div className="relative p-8 md:p-10 rounded-3xl border border-border/40 bg-card/60 backdrop-blur-md shadow-xl shadow-foreground/5">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-2 ring-primary/30 ring-offset-4 ring-offset-background flex-shrink-0">
                      <img src={profilePhoto} alt="Satwik Udupi - Founder" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                        <User className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary font-medium">Founder</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">Satwik Udupi</h3>
                      <p className="text-muted-foreground text-sm mt-1">Agricultural Engineer & GIS Specialist</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: GraduationCap, label: 'Education', value: 'B.Tech Agricultural Engg.' },
                      { icon: MapPin, label: 'Location', value: 'Karad, Maharashtra' },
                      { icon: Briefcase, label: 'Experience', value: '2+ Years' },
                      { icon: Award, label: 'Certifications', value: '20+ Professional' },
                    ].map(item => (
                      <div key={item.label} className="p-4 rounded-xl bg-background/50 border border-border/30">
                        <item.icon className="w-5 h-5 text-primary mb-2" />
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-sm text-foreground font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 30 }} animate={isAboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
                <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">Our Background</span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                  Engineering <span className="font-semibold">Sustainable Solutions</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Pravaha Tattva Solutions bridges the gap between field-level agricultural challenges and cutting-edge geospatial technology. Founded by Satwik Udupi, we specialize in delivering data-driven insights for water resource management.</p>
                  <p>With expertise spanning hydrological modeling, GIS analysis, drone surveys, and CFD simulations, we've collaborated with institutions like Shivaji University and the Forest Department of Maharashtra on critical watershed conservation projects.</p>
                  <p>Our mission: Transform complex environmental data into actionable intelligence for sustainable land and water management across India.</p>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Watershed Management', 'Flood Risk Analysis', 'Precision Agriculture'].map((tag) => (
                    <span key={tag} className="px-4 py-2 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm text-sm text-foreground font-medium shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" ref={servicesRef} className="py-24 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 md:mb-20 text-center md:text-left">
              <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">What We Deliver</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4">
                Technical <span className="font-semibold">Services</span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-base md:text-lg font-light mx-auto md:mx-0">
                End-to-end geospatial solutions powered by industry-standard tools and methodologies.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="h-full">
                  <CardContainer className="inter-var w-full h-full" containerClassName="w-full h-full flex py-0 items-stretch">
                    <CardBody className="relative flex flex-col p-5 sm:p-6 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-md shadow-lg shadow-foreground/5 hover:border-primary/30 transition-all duration-300 w-full h-full group/card">
                      <CardItem translateZ="50" className="flex items-center justify-between mb-4 w-full">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-primary-foreground text-primary transition-all duration-300">
                          <service.icon className="w-5 h-5" />
                        </div>
                        <span className="text-2xl font-light text-muted-foreground/30 group-hover/card:text-primary/20 transition-colors">{service.id}</span>
                      </CardItem>
                      
                      <CardItem translateZ="60" className="w-full">
                        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover/card:text-primary transition-colors">{service.title}</h3>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">{service.subtitle}</p>
                      </CardItem>

                      <CardItem translateZ="80" className="w-full mb-6 mt-2">
                        <img
                          src={service.image}
                          height="1000"
                          width="1000"
                          className="aspect-video w-full object-cover rounded-xl group-hover/card:shadow-2xl transition-all duration-500"
                          alt={service.title}
                        />
                      </CardItem>
                      
                      <CardItem as="p" translateZ="50" className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow w-full">
                        {service.description}
                      </CardItem>
                      
                      <CardItem translateZ="80" className="flex flex-wrap gap-2 mt-auto w-full">
                        {service.capabilities.map((cap) => (
                          <span key={cap} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-background/50 border border-border/40 text-foreground/80 group-hover/card:border-primary/20 transition-all">
                            {cap}
                          </span>
                        ))}
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" ref={processRef} className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isProcessInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">How We Work</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-4">
                Our <span className="font-semibold">Process</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">A structured approach to delivering precision geospatial intelligence.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-md shadow-lg shadow-foreground/5 hover:border-primary/20 transition-all group">
                  <span className="text-4xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">{step.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.highlights.map((h) => (
                      <span key={h} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background border border-border/40 text-foreground/80">{h}</span>
                    ))}
                  </div>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">Track Record</span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Notable <span className="font-semibold">Engagements</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 md:p-8 rounded-2xl border border-border/30 bg-card/60 backdrop-blur-md shadow-lg shadow-foreground/5">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm font-medium leading-relaxed mb-6">"{t.text}"</p>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{t.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
          {/* Earth Background */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ 
              backgroundImage: `url(${earthGif})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.15
            }}
          />
          {/* Subtle overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-background/50 pointer-events-none z-0" />

          <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-8 md:p-12 rounded-3xl border border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl shadow-foreground/5">
              <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">Let's Collaborate</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-6">
                Ready to Start Your <span className="font-semibold">Next Project?</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg font-light max-w-xl mx-auto mb-10 md:mb-12">
                Whether it's flood risk analysis, watershed modeling, or drone surveys—
                I'm here to deliver precision solutions tailored to your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 md:mb-16">
                <motion.a href={googleFormUrl} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Request a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BD5A] transition-all duration-300"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </motion.a>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <a href={`tel:${phoneNumber}`} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-background/50 border border-border/30 hover:border-primary/20 transition-all group">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium text-sm">+91 9834300849</span>
                </a>
                <a href="mailto:satwikudupi@gmail.com" className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-background/50 border border-border/30 hover:border-primary/20 transition-all group">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium text-sm">satwikudupi@gmail.com</span>
                </a>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-background/50 border border-border/30 hover:border-primary/20 transition-all group">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-medium text-sm text-center">Karad, Maharashtra</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/30 bg-background/50 backdrop-blur-lg mt-auto">
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted-foreground">© {new Date().getFullYear()} Pravaha Tattva Solutions</p>
            <div className="flex items-center gap-6">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Portfolio
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PravahaTattva;
