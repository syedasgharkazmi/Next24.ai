/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Layout, 
  Database, 
  ArrowRight, 
  Check, 
  X, 
  Layers, 
  Server, 
  ShieldCheck, 
  Zap,
  Globe,
  TrendingUp,
  Cpu,
  ChevronRight,
  Menu
} from 'lucide-react';

// --- Types & Constants ---
const SOLUTIONS = [
  {
    title: "Ads Lifecycle",
    description: "Automated setup and optimization for Meta, Google, and TikTok Ads. Direct API integration for total control.",
    icon: <Zap className="w-6 h-6" />,
    badge: "Ads Setup"
  },
  {
    title: "Creative Engine",
    description: "Neural Video and Content generators. Produce hook-heavy assets and high-converting copy in seconds.",
    icon: <Video className="w-6 h-6" />,
    badge: "AI Content"
  },
  {
    title: "Funnels & Data",
    description: "One-click Landing Page and Funnel deployment with integrated Predictive Analytics for max ROI.",
    icon: <TrendingUp className="w-6 h-6" />,
    badge: "Funnels & ROI"
  }
];

// --- Components ---

const Logo = ({ size = "w-4 h-4" }: { size?: string }) => (
  <div className={`relative ${size} grid grid-cols-2 gap-[2px] items-center justify-center shrink-0`}>
    {/* Minimalistic 4-dot creative tech grid (Google/Microsoft vibe but modern) */}
    <div className="w-full h-full bg-[#4285F4] rounded-tl-sm rounded-br-sm" />
    <div className="w-full h-full bg-[#EA4335] rounded-tr-sm rounded-bl-sm opacity-90" />
    <div className="w-full h-full bg-[#FBBC05] rounded-bl-sm rounded-tr-sm opacity-90" />
    <div className="w-full h-full bg-[#34A853] rounded-br-sm rounded-tl-sm" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Page Header for Subpages ---
const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="relative pt-32 pb-16 px-8 border-b border-white/5 bg-[#000000]">
    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">{title}</h1>
      <p className="text-white/50 text-lg max-w-2xl mx-auto font-medium">{subtitle}</p>
    </div>
  </section>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Platform", to: "/platform" },
    { title: "Analytics", to: "/analytics-engine" },
    { title: "Solutions", to: "/solutions" },
    { title: "Alpha", to: "/alpha" },
    { title: "Docs", to: "/docs" },
  ];

  return (
    <>
      <nav className={`glass-nav px-6 py-3 flex justify-between items-center transition-all duration-500 z-50 relative ${isScrolled || isMenuOpen ? 'border-b border-white/[0.05] bg-[#000000]/60 backdrop-blur-md' : 'border-transparent shadow-none'}`}>
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group z-50">
            <Logo size="w-4 h-4" />
            <span className="text-[14px] font-semibold tracking-tight text-white transition-colors">Next24.ai</span>
          </Link>
          
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 lg:gap-8 text-[13px] text-white/50 font-bold tracking-tight z-50">
            {navLinks.map((link) => (
              <Link 
                key={link.title} 
                to={link.to} 
                className={`hover:text-white transition-colors`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6 z-50">
            <button className="hidden sm:block text-[13px] text-white/50 hover:text-white transition-colors font-bold tracking-tight">Log in</button>
            <button className="bg-white text-black hover:bg-white/80 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-tight transition-all duration-300 shadow-md">
              Sign Up
            </button>
            <button 
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 text-2xl font-bold tracking-tight">
              {navLinks.map((link) => (
                <Link 
                  key={link.title} 
                  to={link.to} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-blue-500 transition-colors text-white`}
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                <button className="text-left text-white/50 hover:text-white transition-colors">Log in</button>
                <button className="bg-white text-black py-4 rounded-full text-center font-bold">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  // Remove the heavily dragged Y translation mapping to stop the page from feeling like it resists scrolling
  const scale = useTransform(scrollY, [0, 600], [1, 0.85]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 px-6 sm:px-8 overflow-hidden min-h-[600px] sm:min-h-[700px] flex flex-col items-center justify-center -z-0">
      
      {/* RGB Animated Orbs - Heavily Performance Optimized (No blur filters) */}
      <motion.div 
        style={{ scale: useTransform(scrollY, [0, 600], [1, 1.2]) }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] sm:w-[800px] sm:h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_60%)] rounded-full animate-blob transform-gpu will-change-transform" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/3 w-[250px] h-[250px] sm:w-[700px] sm:h-[700px] bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_60%)] rounded-full animate-blob animation-delay-2000 transform-gpu will-change-transform" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] sm:w-[900px] sm:h-[900px] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_60%)] rounded-full animate-blob animation-delay-4000 transform-gpu will-change-transform" />
      </motion.div>
      
      <motion.div style={{ scale, opacity }} className="max-w-4xl mx-auto text-center relative z-10 px-4 transform-gpu will-change-transform">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
            className="inline-block px-5 py-2 border border-white/10 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-8 bg-white/5 backdrop-blur-md shadow-sm"
          >
            Private AI Infrastructure v2.0
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-bold tracking-tighter leading-[1.05] sm:leading-[1] mb-8 text-white px-2 sm:px-0 drop-shadow-2xl"
          >
            Marketing on Autopilot. <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)] drop-shadow-none">
              Total Control.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-white/50 text-xl md:text-2xl font-medium leading-[1.4] max-w-2xl mx-auto mb-12 px-4 sm:px-0 tracking-tight"
          >
            Connect Meta, Google, and TikTok Ads simultaneously. Replace your human workflow with private AI nodes.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <button className="bg-white text-black hover:bg-white/80 px-8 py-4 sm:py-5 rounded-full font-bold text-base tracking-tight transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Start Automation
            </button>
            <button className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-8 py-4 sm:py-5 rounded-full font-bold text-base tracking-tight transition-all duration-300 backdrop-blur-md w-full sm:w-auto shadow-sm">
              System Architecture
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const DataEngine = () => {
  const { scrollY } = useScroll();
  // As user scrolls past hero (from 500 to 1200), slightly scale up the core dashboard
  const chartScale = useTransform(scrollY, [300, 1000], [0.9, 1.05]);

  return (
    <section id="platform" className="py-12 md:py-24 px-6 sm:px-8 perspective-[1000px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 text-center lg:text-left relative z-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-6 sm:mb-8 tracking-tighter leading-tight text-white">Real-Time Data Engine</h2>
            <p className="text-white/50 text-lg sm:text-xl mb-10 sm:mb-12 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              Connect every channel into a single source of truth. Our private infrastructure streams direct API data from Meta, Google, and TikTok.
            </p>
            <motion.ul 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-4 sm:space-y-6 text-left max-w-md mx-auto lg:mx-0"
            >
              {[
                "Deep-link Funnel Intelligence",
                "Instant Creative ROI Attribution",
                "Self-Healing Ad Pipelines",
                "Privacy-First Data Sovereignty"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
                  className="flex items-center gap-4 text-white/80"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shrink-0 shadow-sm">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                  <span className="text-base sm:text-lg font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            style={{ scale: chartScale }}
            className="lg:col-span-7 bg-[#F5F5F7] rounded-3xl sm:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] aspect-auto sm:aspect-video min-h-[350px] group cursor-default p-6 sm:p-10 z-10 border border-black/5 relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.05] blur-[100px] pointer-events-none text-center" />
             <div className="relative h-full flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0 mb-8 sm:mb-12">
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {[
                      { title: "Meta", path: "M12 1.4c-5.85 0-10.6 4.75-10.6 10.6s4.75 10.6 10.6 10.6 10.6-4.75 10.6-10.6S17.85 1.4 12 1.4zm0 19.4c-4.86 0-8.8-3.94-8.8-8.8s3.94-8.8 8.8-8.8 8.8 3.94 8.8 8.8-3.94 8.8-8.8 8.8zm3.22-12.3c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm-6.44 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" },
                      { title: "Google", path: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84zM12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" },
                      { title: "TikTok", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.51 4.3 1.33 1.93 3.4 3.25 5.73 3.7.01 1.3 0 2.6 0 3.89-.6-.02-1.19-.13-1.77-.32-1.39-.47-2.66-1.35-3.64-2.52a9.14 9.14 0 0 1-1.3-2.14v8.9c-.01 1.08-.2 2.15-.55 3.17-1 2.89-3.79 5-7.1 4.9-3.4-.1-6.1-2.9-6.3-6.23-.2-3.6 2.4-6.8 6-7.3 1.01-.15 2.05-.08 3.02.21v4.06c-.52-.2-1.07-.3-1.63-.3-1.63-.01-3.12 1.02-3.61 2.57-.5 1.57.11 3.3 1.5 4.19 1.41.9 3.3.6 4.36-.67.43-.53.65-1.2.64-1.88V0h.01z" }
                    ].map((platform, i) => (
                      <div key={i} className="p-3 sm:p-4 bg-black/[0.03] rounded-2xl sm:rounded-[1.25rem] border border-black/[0.05] flex items-center justify-center transition-transform hover:scale-[1.05]" title={`${platform.title} Ads`}>
                        <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-black/40 group-hover:fill-black/80 transition-colors" xmlns="http://www.w3.org/2000/svg"><path d={platform.path}/></svg>
                      </div>
                    ))}
                    <div className="hidden sm:flex p-3 text-black/20 self-center text-xl">→</div>
                    <div className="px-4 h-11 sm:h-auto sm:px-6 sm:py-3 bg-black/5 rounded-2xl sm:rounded-[1.25rem] border border-black/10 flex items-center justify-center shadow-sm"><span className="text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-black">CORE ENGINE</span></div>
                  </div>
                  <div className="text-black font-bold text-3xl sm:text-4xl tracking-tighter self-end sm:self-auto">+340% ROI</div>
                </div>
                
                <div className="flex-1 flex items-end gap-1.5 sm:gap-3 mb-8 sm:mb-10">
                  {[40, 70, 45, 90, 65, 85, 100, 75, 50, 80].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 bg-black/[0.05] rounded-t-lg group-hover:bg-blue-500/30 transition-all duration-700"
                    />
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-6 sm:pt-8 border-t border-black/5">
                   <div className="flex flex-col">
                     <span className="text-black/40 font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2 text-[9px] sm:text-[11px]">Performance</span>
                     <span className="text-xl sm:text-2xl font-bold tracking-tight text-black">Active Pulse</span>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-black/40 font-bold uppercase tracking-[0.2em] mb-1 sm:mb-2 text-[9px] sm:text-[11px]">Internal Status</span>
                     <span className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2 sm:gap-3 text-black">
                       Online <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                     </span>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AISuite = () => {
  return (
    <section id="creative" className="py-16 md:py-32 bg-white overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1200px] mx-auto px-6 sm:px-8 text-center mb-16 lg:mb-24"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 sm:mb-8 tracking-tighter text-black leading-[1.1]">The AI Production Suite</h2>
        <p className="text-black/50 text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight">Eliminate the daily friction of content logistics. Our neural nodes replace high-cost freelancers with 24/7 instant deployment.</p>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10"
        >
          {[
            { icon: <Video />, title: "Neural Video Editor", desc: "No more 48-hour turnarounds. Generate high-converting video units in under 30 seconds." },
            { icon: <ImageIcon />, title: "Pro Asset Studio", desc: "Professional photography and art direction without a physical studio or photographer." },
            { icon: <FileText />, title: "Deep Copy Engine", desc: "Direct-response copy that converts. Replaces senior copywriters for every distribution node." },
          ].map((feature, i) => (
            <motion.div 
               key={i} 
               variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
               className="bg-[#F5F5F7] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 rounded-3xl sm:rounded-[2.5rem] min-h-[320px] sm:min-h-[380px] flex flex-col justify-between group cursor-pointer p-8 sm:p-10 transition-transform duration-500 hover:scale-[1.02]"
             >
               <div>
                 <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/5 flex items-center justify-center mb-8 sm:mb-10 text-black group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors duration-300">
                   {React.cloneElement(feature.icon as React.ReactElement, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
                 </div>
                 <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-black">{feature.title}</h3>
                 <p className="text-black/50 text-base sm:text-lg leading-relaxed font-medium">{feature.desc}</p>
               </div>
               <div className="flex items-center gap-2 mt-8 text-sm font-bold tracking-tight text-black/50 group-hover:text-black transition-colors duration-300">
                 Deploy Intelligent Unit <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </div>
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ComparisonTable = () => {
  return (
    <section id="architecture" className="py-16 md:py-32 px-6 sm:px-8 overflow-hidden bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-tighter leading-tight text-white">Manual vs. Automation</h2>
          <p className="text-white/50 text-xl md:text-2xl font-medium px-4 tracking-tight">Stop paying for overhead. Start investing in infrastructure.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch px-4 sm:px-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between bg-[#0A0A0A] border border-white/5 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
             <div>
               <div className="text-white/40 font-bold tracking-[0.2em] uppercase mb-4 text-xs">Manual Workforce</div>
               <h3 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight text-white">The Human Team</h3>
               <ul className="space-y-4 text-white/60 font-medium">
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>Senior Marketer</span> <X className="w-5 h-5 text-white/30" /></li>
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>Video Editor (48h TA)</span> <X className="w-5 h-5 text-white/30" /></li>
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>Direct Copywriter</span> <X className="w-5 h-5 text-white/30" /></li>
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>Graphic Designer</span> <X className="w-5 h-5 text-white/30" /></li>
               </ul>
             </div>
             <div className="mt-10 pt-8 border-t border-white/5 font-bold text-2xl sm:text-3xl text-white/40 tracking-tight">
                $5,000+ / mo
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between bg-[#111111] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-500"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] pointer-events-none text-center" />
             <div className="absolute top-0 right-0 p-6 z-10">
               <div className="px-3 py-1.5 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md">Automated v2.0</div>
             </div>
             <div className="relative z-10">
               <div className="text-blue-400 font-bold tracking-[0.2em] uppercase mb-4 text-xs">Next24.ai Automation</div>
               <h3 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight text-white">Private Infrastructure</h3>
               <ul className="space-y-4 text-white/80 font-medium">
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>AI Marketing Strategy</span> <Check className="w-5 h-5 text-blue-400" /></li>
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>Instant Video Production</span> <Check className="w-5 h-5 text-blue-400" /></li>
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>Neural Copy Engine</span> <Check className="w-5 h-5 text-blue-400" /></li>
                 <li className="flex justify-between items-center text-base sm:text-lg"><span>AI Graphic Designer</span> <Check className="w-5 h-5 text-blue-400" /></li>
               </ul>
             </div>
             <div className="mt-10 pt-8 border-t border-white/10 font-bold text-4xl sm:text-5xl text-white tracking-tighter relative z-10">
                $29 <span className="text-xs sm:text-sm text-white/40 tracking-tight font-medium ml-2 uppercase">Starting Monthly</span>
             </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 bg-[#111111] border border-white/5 rounded-3xl sm:rounded-[2.5rem] py-10 px-8 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 text-center lg:text-left mx-4 sm:mx-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto">
             <div className="flex flex-col">
               <span className="text-white/40 font-bold uppercase tracking-[0.2em] mb-2 text-[10px] sm:text-xs">Performance</span>
               <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">+340% ROI</span>
             </div>
             <div className="flex flex-col">
               <span className="text-white/40 font-bold uppercase tracking-[0.2em] mb-2 text-[10px] sm:text-xs">Sovereignty</span>
               <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">Private Server</span>
             </div>
             <div className="flex flex-col">
               <span className="text-white/40 font-bold uppercase tracking-[0.2em] mb-2 text-[10px] sm:text-xs">Automation</span>
               <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">End-to-End</span>
             </div>
           </div>
           <div className="flex items-center gap-6 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/5 w-full lg:w-auto lg:pl-12 justify-center lg:justify-start">
              <span className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">Trusted</span>
              <div className="flex gap-8 opacity-40 font-bold text-xs tracking-widest uppercase text-white">
                <span>Agency.X</span>
                <span>Storeflow</span>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    { 
      name: "Starter Alpha", 
      monthlyPrice: 29, 
      desc: "Perfect for single-brand stores looking to automate creative production.",
      features: ["1 Node Connector (Meta/Google)", "AI Creative Suite (Video/Copy)", "Real-time ROI Tracking", "Standard Data Sovereignty"],
      cta: "Start for $29",
      highlight: false
    },
    { 
      name: "Sovereign Scale", 
      monthlyPrice: 99, 
      desc: "For high-volume agencies managing multiple client pipelines simultaneously.",
      features: ["Multi-Node Connectors", "Infinite Creative Variations", "Deep-Link Funnel Intelligence", "Priority Edge Compute", "24/7 Monitor Suite"],
      cta: "Go Pro for $99",
      highlight: true
    },
    { 
      name: "Enterprise Core", 
      monthlyPrice: null, 
      desc: "Dedicated data-centers for global organizations with total custom logic control.",
      features: ["Full Source-Code Ownership", "Custom Neural Training", "Dedicated Infrastructure", "White-Label Solution", "24/7 Strategic Support"],
      cta: "Contact Architecture",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-32 px-6 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-tighter px-4 text-transparent bg-clip-text bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)] drop-shadow-none text-balance">Tiered Sovereignty</h2>
          <p className="text-black/50 max-w-xl mx-auto mb-10 px-4 text-lg sm:text-xl font-medium tracking-tight">Scale your private infrastructure according to your growth. Zero hidden fees. 24/7 Uptime.</p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold tracking-tight ${!isYearly ? 'text-black' : 'text-black/40'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-black/10 relative transition-colors shadow-inner"
            >
              <motion.div 
                animate={{ x: isYearly ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.5)]"
              />
            </button>
            <span className={`text-sm font-semibold tracking-tight ${isYearly ? 'text-black' : 'text-black/40'}`}>Yearly (Save 15%)</span>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0"
        >
          {plans.map((plan, i) => {
            const displayPrice = plan.monthlyPrice 
              ? (isYearly ? Math.floor(plan.monthlyPrice * 0.85) : plan.monthlyPrice)
              : "Custom";
            
            const isHighlight = plan.highlight;

            return (
              <motion.div 
                key={i} 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                className={`flex flex-col justify-between p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-black/5 transition-transform duration-500 hover:-translate-y-2 ${isHighlight ? 'bg-white text-black shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:scale-105 z-10' : 'bg-[#F5F5F7] text-black shadow-[0_8px_30px_rgb(0,0,0,0.04)]'}`}
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <span className={`font-bold uppercase tracking-[0.2em] text-[11px] ${isHighlight ? 'text-black/50' : 'text-black/40'}`}>{plan.name}</span>
                    {isHighlight && (
                      <span className="px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] text-[10px] font-bold uppercase rounded-full tracking-widest shrink-0">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-5xl sm:text-6xl font-bold tracking-tighter text-black`}>
                      {typeof displayPrice === 'number' ? `$${displayPrice}` : displayPrice}
                    </span>
                    {typeof displayPrice === 'number' && (
                       <span className={`text-sm font-semibold tracking-tight ${isHighlight ? 'text-black/40' : 'text-black/40'}`}>/mo</span>
                    )}
                  </div>
                  <p className={`text-base mb-10 leading-relaxed font-medium ${isHighlight ? 'text-black/60' : 'text-black/60'}`}>{plan.desc}</p>
                  <ul className="space-y-4 mb-12 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-4 text-sm sm:text-base font-medium">
                        <Check className={`w-5 h-5 shrink-0 mt-0.5 ${isHighlight ? 'text-[#4285F4]' : 'text-black/20'}`} strokeWidth={3} />
                        <span className={`leading-tight ${isHighlight ? 'text-black' : 'text-black/70'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-5 rounded-2xl font-bold text-base transition-all duration-300 transform active:scale-95 ${isHighlight ? 'bg-black text-white hover:bg-gray-800 shadow-md' : 'bg-black/5 text-black hover:bg-black/10'}`}>
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const PrivateAlpha = () => {
  const { scrollYProgress } = useScroll();
  const scaleEffect = useTransform(scrollYProgress, [0.7, 1], [0.95, 1.05]);

  return (
    <section id="alpha" className="py-16 md:py-32 px-6 sm:px-8 relative overflow-hidden bg-black perspective-[1000px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.05)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto">
        <motion.div 
          style={{ scale: scaleEffect }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#111111] rounded-[2.5rem] sm:rounded-[3.5rem] p-10 sm:p-24 md:p-32 text-center relative overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.5)] border border-white/[0.05]"
        >
           <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/5 rounded-full mb-8 sm:mb-12">
                <ShieldCheck className="w-4 h-4 text-white/50" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/50">Restricted Ecosystem</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-semibold mb-8 sm:mb-10 tracking-tighter text-white leading-none px-2 sm:px-0">
                Request Access
              </h2>
              
              <p className="text-white/50 text-lg sm:text-xl font-medium mb-12 sm:mb-16 leading-relaxed px-4 sm:px-0 tracking-tight">
                Join the initial <span className="text-white font-semibold">50 elite agencies</span> establishing private cluster infrastructure. Personal technician assigned on invitation.
              </p>
              
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto px-4 sm:px-0">
                <div className="relative w-full">
                  <input 
                    type="email" 
                    placeholder="Enter work email"
                    className="w-full h-14 sm:h-16 bg-[#000000]/50 border border-white/10 rounded-2xl px-6 sm:px-8 text-base font-medium placeholder:text-white/30 text-white focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] transition-all duration-300 shadow-sm"
                  />
                </div>
                <button className="w-full h-14 sm:h-16 bg-white text-black text-base font-bold rounded-2xl hover:bg-gray-100 transition-colors whitespace-nowrap px-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Request Key
                </button>
              </div>
              <p className="mt-8 text-[9px] sm:text-[11px] text-white/30 uppercase tracking-[0.25em] font-bold px-4 sm:px-0">Priority response for established agencies</p>
              
              <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 px-4 sm:px-0">
                 {[
                   { label: "Slots Remaining", val: "12 / 50" },
                   { label: "Cluster Status", val: "Operational" },
                   { label: "Latency", val: "0.2ms" },
                   { label: "Uptime", val: "100.0%" }
                 ].map((stat, i) => (
                   <div key={i} className="text-center">
                     <div className="text-[9px] sm:text-[11px] text-white/40 uppercase mb-2 sm:mb-3 font-bold tracking-widest">{stat.label}</div>
                     <div className="text-xl sm:text-2xl font-bold text-white tracking-tighter uppercase leading-none whitespace-nowrap">{stat.val}</div>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const AIAnalytics = () => {
  return (
    <section id="analytics" className="py-16 md:py-32 px-6 sm:px-8 bg-white relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F5F5F7] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] p-0 overflow-hidden order-2 lg:order-1"
          >
             <div className="p-8 sm:p-10 border-b border-black/5 flex justify-between items-center bg-white/50">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-2.5 h-2.5 bg-[#4285F4] rounded-full shadow-[0_0_10px_#4285F4]" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black/80">Predictive Intelligence</span>
                </div>
                <span className="text-[9px] sm:text-[11px] text-black/30 uppercase tracking-widest font-bold">Neural Forecast</span>
             </div>
             <div className="p-8 sm:p-10 h-[300px] sm:h-[400px] flex items-end gap-1.5 sm:gap-2 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
                {[55, 30, 45, 80, 60, 40, 95, 70, 85, 35, 50, 65, 90, 75, 40, 60, 80, 45].map((h, i) => {
                  const colors = ['bg-[#4285F4]', 'bg-[#EA4335]', 'bg-[#FBBC05]', 'bg-[#34A853]'];
                  return (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ delay: i * 0.03, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex-1 ${colors[i % 4]} opacity-70 hover:opacity-100 border-x-0 border-b-0 rounded-t-lg origin-bottom transition-opacity`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
             </div>
             <div className="grid grid-cols-3 border-t border-black/5 divide-x divide-black/5 bg-white/50">
                {[
                  { label: "Predict ROI", value: "+5.2x", color: "text-[#34A853]" },
                  { label: "Confidence", value: "98.4%", color: "text-black" },
                  { label: "Accuracy", value: "High", color: "text-black" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 sm:p-10 text-center">
                    <div className="text-[9px] sm:text-[11px] text-black/30 uppercase tracking-widest mb-2 sm:mb-3 font-bold">{stat.label}</div>
                    <div className={`text-2xl sm:text-4xl font-bold tracking-tighter ${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-black/5 border border-black/10 rounded-full mb-8 lg:mb-10 text-black">
              <TrendingUp className="w-4 h-4 text-black/50" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black/50">Intelligence Node</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold mb-8 lg:mb-10 tracking-tighter leading-[1.1] text-black">The Insight Engine</h2>
            <p className="text-black/50 text-lg sm:text-2xl font-medium mb-10 lg:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 tracking-tight">
              Don't just track metrics—architect outcomes. Our neural engine forecasts performance and reallocates budget before the market shifts.
            </p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
              className="space-y-8 lg:space-y-10 text-left max-w-lg mx-auto lg:mx-0"
            >
               {[
                 { title: "Deterministic Budgeting", desc: "Instantly reallocate compute from stagnant assets to high-yield nodes." },
                 { title: "Fatigue Analysis", desc: "Predict CPV spikes across distribution chains before they impact ROI." },
               ].map((item, i) => (
                 <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="flex gap-4 sm:gap-6 group">
                    <div className="mt-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-xl bg-black/5 flex items-center justify-center shrink-0 transition-transform duration-500">
                      <Zap className="w-4 h-4 text-black/50 group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-black tracking-tight mb-2">{item.title}</h4>
                      <p className="text-black/50 text-base sm:text-lg leading-relaxed font-medium">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MonitoringSection = () => {
  return (
    <section id="monitoring" className="py-12 md:py-24 px-8 relative overflow-hidden bg-white">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.02)_0%,_transparent_70%)] pointer-events-none" />
       
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
         className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10"
       >
          <div className="w-20 h-20 rounded-full border border-black/10 bg-[#F5F5F7] flex items-center justify-center mb-10 shadow-sm transition-transform hover:scale-105">
             <ShieldCheck className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6 tracking-tighter text-black">24/7 Total Vigilance</h2>
          <p className="text-black/50 text-lg mb-12 leading-relaxed max-w-2xl font-medium tracking-tight">
            Our platform never sleeps. Your private nodes continuously analyze market triggers, bid adjustments, and ad fatigue across Meta, Google, and TikTok. Automation that works while you scale.
          </p>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full"
          >
             {[
               { val: "99.99%", lab: "Server Uptime" },
               { val: "0.2ms", lab: "API Sync Latency" },
               { val: "∞", lab: "Daily Creative Gen" },
               { val: "End-to-End", lab: "Automation Scope" }
             ].map((stat, i) => (
               <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="flex flex-col">
                 <span className="text-2xl font-bold tracking-tighter mb-1 text-black">{stat.val}</span>
                 <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-black/40">{stat.lab}</span>
               </motion.div>
             ))}
          </motion.div>
       </motion.div>
    </section>
  );
};

const SolutionsGrid = () => {
  return (
    <section id="solutions" className="py-16 md:py-32 px-6 sm:px-8 bg-black">
       <div className="max-w-[1200px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-6 tracking-tighter text-white">Built for scale.</h2>
            <p className="text-white/50 text-xl md:text-2xl font-medium max-w-2xl mx-auto tracking-tight">Deploy our proprietary infrastructure across your entire marketing stack.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="grid md:grid-cols-3 gap-6 sm:gap-8"
          >
            {SOLUTIONS.map((solution, i) => {
              // Create the Apple-style alternating highly-contrasted bento blocks
              const isDark = i === 0 || i === 2;
              const blockClass = isDark 
                ? "bg-[#111111] text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5" 
                : "bg-white text-black shadow-[0_8px_30px_rgb(0,0,0,0.04)]";
              const labelClass = isDark
                ? "bg-white/10 text-white border-white/10"
                : "bg-black/5 text-black/70 border-black/10";
              const descClass = isDark
                ? "text-white/60"
                : "text-black/60";
              const linkClass = isDark
                ? "text-white/60 hover:text-white"
                : "text-black/50 hover:text-black";

              return (
                <motion.div 
                  key={i} 
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                  className={`${blockClass} flex flex-col group min-h-[360px] sm:h-[400px] justify-between rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 transition-transform duration-500 hover:scale-[1.02] cursor-pointer`}
                >
                  <div>
                     <div className={`inline-flex px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-[0.2em] uppercase mb-8 ${labelClass}`}>
                        {solution.badge}
                     </div>
                     <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight leading-[1.1]">{solution.title}</h3>
                     <p className={`text-base sm:text-lg font-medium leading-relaxed ${descClass}`}>{solution.description}</p>
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-bold tracking-tight transition-colors mt-8 ${linkClass}`}>
                     Explore capability <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
       </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-20 sm:pt-40 pb-10 sm:pb-20 px-6 sm:px-8 border-t border-white/5 bg-[#000000]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 sm:gap-16 mb-20 lg:mb-32">
          <div className="col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-6 sm:mb-8">
              <Logo size="w-4 h-4" />
              <span className="text-[14px] font-bold tracking-tight text-white">Next24.ai</span>
            </div>
            <p className="text-white/50 text-[13px] sm:text-sm max-w-xs mb-8 sm:mb-10 leading-relaxed font-medium mx-auto sm:mx-0 tracking-tight">
              The elite infrastructure for marketing automation. Connect, analyze, and scale with global private nodes.
            </p>
            <div className="flex justify-center sm:justify-start gap-6 sm:gap-8">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300 pointer-events-auto">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h5 className="text-white/80 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-6 sm:mb-8 whitespace-nowrap">Ad Solutions</h5>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { name: 'Meta Setup', slug: '/meta-ads' },
                { name: 'Google Hub', slug: '/google-ads' },
                { name: 'TikTok Suite', slug: '/tiktok-ads' }
              ].map((item) => (
                <li key={item.name}><Link to={item.slug} className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors duration-300 font-bold tracking-tight">
                  {item.name}
                </Link></li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h5 className="text-white/80 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-6 sm:mb-8 whitespace-nowrap">Production</h5>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { name: 'Content Gen', slug: '/content' },
                { name: 'Video Engine', slug: '/video' },
                { name: 'Landing Pages', slug: '/landing-pages' },
                { name: 'Analytics', slug: '/analytics' }
              ].map((item) => (
                <li key={item.name}><Link to={item.slug} className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors duration-300 font-bold tracking-tight">
                  {item.name}
                </Link></li>
              ))}
            </ul>
          </div>

          <div className="text-center sm:text-left col-span-2 md:col-span-1 mt-10 md:mt-0">
            <h5 className="text-white/80 font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-6 sm:mb-8 whitespace-nowrap">Company</h5>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { name: 'Privacy', slug: '/privacy' },
                { name: 'Terms', slug: '/terms' },
                { name: 'Security', slug: '/security' }
              ].map((item) => (
                <li key={item.name}><Link to={item.slug} className="text-white/50 hover:text-white text-xs sm:text-sm transition-colors duration-300 font-bold tracking-tight">
                  {item.name}
                </Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 sm:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10 text-center">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse opacity-70 shadow-[0_0_10px_#22c55e]" />
              <span className="text-white/50 font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[11px]">System Nominal (0.2ms)</span>
            </div>
            <span className="text-white/40 italic font-bold tracking-[0.2em] text-[9px] sm:text-[11px]">Designed in Private Cloud. Next24 © 2026</span>
          </div>
          
          <div className="flex gap-8 sm:gap-10">
            <span className="text-white/30 font-bold uppercase tracking-[0.2em] select-none text-[9px] sm:text-[11px]">AES-256</span>
            <span className="text-white/30 font-bold uppercase tracking-[0.2em] select-none text-[9px] sm:text-[11px]">SHA-512</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LegalSection = () => {
  return (
    <section id="legal" className="py-12 md:py-24 px-6 sm:px-8 border-t border-white/5 bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 uppercase tracking-[0.2em] text-center px-4 text-white">Legal & Privacy</h2>
        <div className="bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 rounded-[2.5rem] p-8 sm:p-12 space-y-8 text-white/60 text-sm leading-relaxed mx-4 sm:mx-0 font-medium">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-base">Privacy Policy</h4>
            <p>
              Next24.ai is built on the principle of data sovereignty. Your private marketing nodes are isolated clusters. 
              We do not sell, rent, or share your campaign data with third-party vendors. All ad-spend intelligence stays 
              within your private cloud instance.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-tighter text-base">Terms of Service</h4>
            <p>
              By utilizing our private infrastructure, you agree to our fair-use policy regarding neural node compute. 
              Our service provides the tools for automation; ad-spend remains the responsibility of the account owner 
              through their respective platform connections.
            </p>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
             <span>Protocol Version 1.2.4</span>
             <span>Last Updated: April 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <Hero />
    <DataEngine />
    <AIAnalytics />
    <AISuite />
    <MonitoringSection />
    <ComparisonTable />
    <SolutionsGrid />
    <Pricing />
    <PrivateAlpha />
  </>
);

const PlatformPage = () => (
  <div className="pt-20">
    <PageHeader title="Platform Architecture" subtitle="Explore the core neural systems powering decentralized ad distribution." />
    <DataEngine />
    <ComparisonTable />
    <Pricing />
  </div>
);

const AnalyticsPage = () => (
  <div className="pt-20">
    <PageHeader title="Insight Engine" subtitle="Real-time predictive analytics and deterministic budgeting." />
    <AIAnalytics />
    <MonitoringSection />
  </div>
);

const SolutionsPage = () => (
  <div className="pt-20">
    <PageHeader title="Deployment Solutions" subtitle="Specialized instances for every stage of your agency's lifecycle." />
    <AISuite />
    <SolutionsGrid />
  </div>
);

const AlphaPage = () => (
  <div className="pt-20">
    <PageHeader title="Private Alpha" subtitle="Secured cluster allocation request." />
    <PrivateAlpha />
  </div>
);

const DocsPage = () => (
  <div className="pt-20 pb-32 bg-black">
    <PageHeader title="Developer Docs" subtitle="API specifications and system architectural references." />
    <section className="px-6 sm:px-8 max-w-4xl mx-auto mt-20 text-center">
      <div className="w-20 h-20 bg-[#111111] rounded-[1.5rem] mx-auto flex items-center justify-center border border-white/5 mb-8 uppercase text-blue-500 font-bold tracking-widest text-[10px]">v1.0</div>
      <h3 className="text-3xl font-semibold mb-6 tracking-tighter text-white">API Documentation Access</h3>
      <p className="text-white/50 leading-relaxed max-w-2xl mx-auto font-medium">
        Technical documentation, GraphQL schemas, and Node connection primitives are currently restricted to active Alpha members. Approved organizations can access their specific endpoints from their private dashboard.
      </p>
    </section>
  </div>
);

const ServicePage = ({ title, subtitle, features }: { title: string; subtitle: string; features: string[] }) => (
  <div className="pb-32 bg-black">
    <PageHeader title={title} subtitle={subtitle} />
    <section className="py-24 px-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] p-8 sm:p-10 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Check className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight text-white">{feature}</h3>
            <p className="text-white/50 text-sm leading-relaxed font-medium">Advanced neural optimization for maximum performance and scalable marketing outcomes.</p>
          </div>
        ))}
      </div>
    </section>
    <PrivateAlpha />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-blue-500/30 selection:text-white relative">
        {/* Global Aesthetics */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)] pointer-events-none z-10" />
        
        <div className="relative z-20">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/analytics-engine" element={<AnalyticsPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/alpha" element={<AlphaPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/meta-ads" element={<ServicePage title="Meta Ads Setup" subtitle="Automated campaign architecture for Facebook and Instagram." features={["Dynamic Creative Optimization", "Pixel & CAPI Setup", "Audience Neural Mapping", "Automated Scaling"]} />} />
              <Route path="/google-ads" element={<ServicePage title="Google Ads Setup" subtitle="High-intent Search, Display, and PMax campaign automation." features={["Semantic Keyword Research", "Conversion Value Tracking", "Performance Max Optimization", "Bid Strategy Guardrails"]} />} />
              <Route path="/tiktok-ads" element={<ServicePage title="TikTok Ads Setup" subtitle="Viral-ready campaign structure for the world's most dynamic feed." features={["Trend-Sync Strategy", "Native Experience Optimization", "Creator Matchmaking AI", "Hook Retention Tracking"]} />} />
              <Route path="/content" element={<ServicePage title="AI Content Gen" subtitle="Unlimited high-converting marketing copy and assets." features={["Multi-Tone Brand Voice", "SEO Strategy Integration", "Infinite Variation Gen", "Emotional Trigger Mapping"]} />} />
              <Route path="/video" element={<ServicePage title="Video Generator" subtitle="Production-grade video ads without a studio." features={["Hook-Heavy Sequence Gen", "Music Sync Intelligence", "Caption & Text Overlay", "Cross-Platform Formatting"]} />} />
              <Route path="/landing-pages" element={<ServicePage title="Landing Page Gen" subtitle="Hyper-optimized high-speed performance pages." features={["Conversion-First Design", "Edge-Cached Speed", "A/B Variation Testing", "Real-time Personalization"]} />} />
              <Route path="/funnels" element={<ServicePage title="Funnel Generator" subtitle="End-to-end deal tracking and deal-closing paths." features={["Multi-Step Mapping", "LTV Prediction", "Frictionless Checkout", "Email Sequence Sync"]} />} />
              <Route path="/analytics" element={<ServicePage title="Analytics Gen" subtitle="Predictive data intelligence for deeper insights." features={["Real-time ROI Tracking", "Attribution Modeling", "Ad Fatigue Prediction", "Competitor Benchmarking"]} />} />
              <Route path="/about" element={<ServicePage title="About Next24.ai" subtitle="The future of decentralized marketing infrastructure." features={["Our Mission", "Infrastructure Ethos", "Global Node Network", "Sovereignty Focus"]} />} />
              <Route path="/privacy" element={<div className="pb-32"><PageHeader title="Privacy Policy" subtitle="Your data sovereignty is our primary directive." /><LegalSection /></div>} />
              <Route path="/terms" element={<div className="pb-32"><PageHeader title="Terms of Service" subtitle="Infrastructure rules for a decentralized future." /><LegalSection /></div>} />
              <Route path="/security" element={<ServicePage title="Security Audit" subtitle="Enterprise-grade protection for your nodes." features={["AES-256 Encryption", "Zero-Knowledge Logs", "DDoS Node Protection", "Self-Healing Clusters"]} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
