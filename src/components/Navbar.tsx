import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems: { label: string; href: string; isExternal?: boolean }[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: 'Previous Work', href: '#map-gallery' },
  { label: 'Services', href: '/pravaha-tattva', isExternal: true },
  { label: 'Contact', href: '#contact' },
];

const textSizes = [
  { label: 'Small', value: 'small', class: 'text-sm' },
  { label: 'Medium', value: 'medium', class: 'text-base' },
  { label: 'Large', value: 'large', class: 'text-lg' },
  { label: 'Extra Large', value: 'xlarge', class: 'text-xl' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [textSize, setTextSize] = useState('medium');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply text size to html element
    const html = document.documentElement;
    html.classList.remove('text-size-small', 'text-size-medium', 'text-size-large', 'text-size-xlarge');
    html.classList.add(`text-size-${textSize}`);
  }, [textSize]);

  useEffect(() => {
    // Apply dark/light mode
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDarkMode]);

  const handleNavClick = (href: string, isExternal?: boolean) => {
    setIsMobileMenuOpen(false);
    if (isExternal) {
      // Navigate to top of page
      window.location.href = href;
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 100);
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="#" 
              className="text-xl font-display font-bold gradient-text"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Satwik Udupi
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.isExternal)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Accessibility Controls */}
            <div className="flex items-center gap-2">
              {/* Text Size Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Type className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {textSizes.map((size) => (
                    <DropdownMenuItem
                      key={size.value}
                      onClick={() => setTextSize(size.value)}
                      className={textSize === size.value ? 'bg-primary/10 text-primary' : ''}
                    >
                      <span className={size.class}>{size.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-foreground"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href, item.isExternal)}
                    className="px-4 py-3 text-left font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
