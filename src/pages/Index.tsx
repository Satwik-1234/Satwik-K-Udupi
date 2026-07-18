import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import TechStackSection from '@/components/TechStackSection';
import CertificationsSection from '@/components/CertificationsSection';
import ProjectsSection from '@/components/ProjectsSection';

import MapGallerySection from '@/components/MapGallerySection';
import GitHubProjectsSection from '@/components/GitHubProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Satwik Udupi | Hydrologist & GIS Analyst</title>
        <meta 
          name="description" 
          content="Agricultural Engineer specializing in hydraulic modeling, watershed hydrology, and GIS analysis. Expert in HEC-RAS, HEC-HMS, and geospatial technologies for sustainable water resource management." 
        />
        <meta name="keywords" content="hydrologist, GIS analyst, HEC-RAS, HEC-HMS, watershed analysis, flood mapping, Maharashtra" />
        <link rel="canonical" href="https://satwikudupi.com" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          
          {/* Section divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />
          
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <TechStackSection />
          <CertificationsSection />
          <ProjectsSection />
          <GitHubProjectsSection />

          <MapGallerySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
