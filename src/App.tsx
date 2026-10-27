import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const PravahaTattva = lazy(() => import("./pages/PravahaTattva"));

const queryClient = new QueryClient();

// New page → top; page with #hash → that section (after it has mounted)
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 400);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename="/Satwik-K-Udupi">
            <ScrollManager />
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f2ede2' }} />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pravaha-tattva" element={<PravahaTattva />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
