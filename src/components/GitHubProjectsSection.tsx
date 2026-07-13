import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, ArrowUpRight } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  tags: string[];
  updated: string;
  url: string;
  featured?: boolean;
  stars?: number;
  forks?: number;
  color: string;
}

const fallbackRepos: GitHubRepo[] = [
  {
    name: "RUSLE_Western-Maharashtra",
    description: "30m resolution soil erosion modelling integrating RUSLE, terrain analysis, NDVI, and ML-based vulnerability assessment across Western Maharashtra.",
    language: "Python",
    tags: ["Python", "GEE", "RUSLE", "GIS"],
    updated: "2024",
    url: "https://github.com/Satwik-1234/RUSLE_Western-Maharashtra",
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis",
    description: "Comprehensive watershed morphometric and soil erosion modelling pipeline with conservation prioritization for the Pravara River Basin.",
    language: "Python",
    tags: ["Hydrology", "Morphometry", "Python"],
    updated: "2024",
    url: "https://github.com/Satwik-1234/Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis",
    featured: true,
    color: "from-teal-500/20 to-emerald-500/20",
  },
  {
    name: "Crop-water-Balance-Analysis-GEE-",
    description: "Crop water requirement and seasonal water balance modelling using satellite datasets in Google Earth Engine.",
    language: "JavaScript",
    tags: ["GEE", "Remote Sensing", "Water Resources"],
    updated: "2024",
    url: "https://github.com/Satwik-1234/Crop-water-Balance-Analysis-GEE-",
    featured: true,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "Soil-Erosion-Analysis-GEE",
    description: "Geospatial soil erosion modelling using RUSLE methodology in Google Earth Engine.",
    language: "JavaScript",
    tags: ["JavaScript", "GEE", "Soil Conservation"],
    updated: "2024",
    url: "https://github.com/Satwik-1234/Soil-Erosion-Analysis-GEE",
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    name: "TRMM-GPM-Rainfall-Data-Extraction-Guide-Panchganga-Basin",
    description: "20-year rainfall extraction and basin-wise organization using TRMM/GPM datasets.",
    language: "Python",
    tags: ["Python", "Rainfall Analysis", "Hydrology"],
    updated: "2024",
    url: "https://github.com/Satwik-1234/TRMM-GPM-Rainfall-Data-Extraction-Guide-Panchganga-Basin",
    color: "from-rose-500/20 to-pink-500/20",
  },
  {
    name: "BORI-DAM-breach-plots-",
    description: "Dam breach hydrograph analysis and flood modelling visualizations.",
    language: "Python",
    tags: ["HEC-RAS", "Flood Analysis", "Hydraulic Modeling"],
    updated: "2024",
    url: "https://github.com/Satwik-1234/BORI-DAM-breach-plots-",
    color: "from-indigo-500/20 to-blue-500/20",
  },
];

const languageColors: Record<string, string> = {
  Python: "#3B82F6",
  JavaScript: "#FACC15",
  TypeScript: "#60A5FA",
  R: "#10B981",
  "Jupyter Notebook": "#F97316",
};

const GitHubProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<GitHubRepo[]>(fallbackRepos);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/Satwik-1234/repos?sort=updated&per_page=30");
        if (!res.ok) return;
        const data = await res.json();

        const featuredNames = [
          "RUSLE_Western-Maharashtra",
          "Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis",
          "Crop-water-Balance-Analysis-GEE-",
        ];

        const knownTags: Record<string, string[]> = {
          "RUSLE_Western-Maharashtra": ["Python", "GEE", "RUSLE", "GIS"],
          "Pravara-River-Basin-Advanced-Morphometric-Hydrological-Analysis": ["Hydrology", "Morphometry", "Python"],
          "Crop-water-Balance-Analysis-GEE-": ["GEE", "Remote Sensing", "Water Resources"],
          "Soil-Erosion-Analysis-GEE": ["JavaScript", "GEE", "Soil Conservation"],
          "TRMM-GPM-Rainfall-Data-Extraction-Guide-Panchganga-Basin": ["Python", "Rainfall Analysis", "Hydrology"],
          "BORI-DAM-breach-plots-": ["HEC-RAS", "Flood Analysis", "Hydraulic Modeling"],
        };

        const colors = [
          "from-blue-500/20 to-cyan-500/20",
          "from-teal-500/20 to-emerald-500/20",
          "from-amber-500/20 to-orange-500/20",
          "from-violet-500/20 to-purple-500/20",
          "from-rose-500/20 to-pink-500/20",
          "from-indigo-500/20 to-blue-500/20",
        ];

        interface GitHubApiResponse {
          name: string;
          description: string | null;
          language: string | null;
          updated_at: string;
          html_url: string;
          stargazers_count: number;
          forks_count: number;
          fork: boolean;
        }

        const mapped: GitHubRepo[] = (data as GitHubApiResponse[])
          .filter((r) => !r.fork)
          .map((r, idx: number) => ({
            name: r.name,
            description: r.description || "No description available.",
            language: r.language || "Unknown",
            tags: knownTags[r.name] || [r.language || "Code"].filter(Boolean),
            updated: new Date(r.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "short" }),
            url: r.html_url,
            featured: featuredNames.includes(r.name),
            stars: r.stargazers_count,
            forks: r.forks_count,
            color: colors[idx % colors.length],
          }));

        mapped.sort((a: GitHubRepo, b: GitHubRepo) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });

        if (mapped.length > 0) setRepos(mapped);
      } catch {
        // keep fallback
      }
    };
    fetchRepos();
  }, []);

  const featured = repos.filter((r) => r.featured);
  const regular = repos.filter((r) => !r.featured);

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Github className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Open Source</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
            GitHub <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Open-source repositories in hydrology, GIS analysis, and geospatial engineering.
          </p>
        </motion.div>

        {/* Featured Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((repo, index) => (
            <motion.a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="glass-card p-6 md:p-8 flex flex-col h-full relative group overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              {/* Animated Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${repo.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-foreground group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                     <Github className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    {repo.stars !== undefined && repo.stars > 0 && (
                      <div className="flex items-center gap-1 font-medium bg-white/50 px-2 py-1 rounded-full border border-gray-100 shadow-sm">
                        <Star className="w-3.5 h-3.5 text-amber-500" /> {repo.stars}
                      </div>
                    )}
                    {repo.forks !== undefined && repo.forks > 0 && (
                      <div className="flex items-center gap-1 font-medium bg-white/50 px-2 py-1 rounded-full border border-gray-100 shadow-sm">
                        <GitFork className="w-3.5 h-3.5 text-blue-500" /> {repo.forks}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {repo.name}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {repo.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-5">
                  {repo.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-gray-100/80 text-gray-600 border border-gray-200/50 shadow-sm">
                      {tag}
                    </span>
                  ))}
                  {repo.tags.length > 3 && (
                    <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md bg-gray-100/80 text-gray-600 border border-gray-200/50 shadow-sm">
                      +{repo.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span
                      className="w-3 h-3 rounded-full shadow-sm border border-black/5"
                      style={{ backgroundColor: languageColors[repo.language] || '#6B7280' }}
                    />
                    {repo.language}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Regular Repos Grid (More Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {regular.map((repo, index) => (
            <motion.a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="glass-card p-5 group flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/40 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${repo.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 blur-xl`} />
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate pr-4 text-base">
                  {repo.name}
                </h4>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                {repo.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mt-auto pt-4 border-t border-border/50">
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: languageColors[repo.language] || '#6B7280' }}
                />
                {repo.language}
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/Satwik-1234"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            Explore All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubProjectsSection;
