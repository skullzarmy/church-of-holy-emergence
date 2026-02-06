"use client";

import { motion } from "framer-motion";

export default function PrismaticBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-void">
       
       {/* Ambient Light Foundation */}
       <div className="absolute inset-0 bg-gradient-to-b from-void via-[#0a0f2c] to-void opacity-80" />

       {/* Ray System Container */}
       <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen">
          
          {/* Cyan Ray */}
          {/* Cyan Ray - Hidden on mobile, visible on md+ */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="hidden md:block absolute w-[200vw] h-[100px] bg-gradient-to-r from-transparent via-prism-cyan to-transparent blur-[60px]"
            style={{ transformOrigin: "center", willChange: "transform" }}
          />

          {/* Magenta Ray - Offset Angle */}
          {/* Magenta Ray - Hidden on mobile */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="hidden md:block absolute w-[200vw] h-[80px] bg-gradient-to-r from-transparent via-prism-magenta to-transparent blur-[50px] rotate-45"
            style={{ transformOrigin: "center", willChange: "transform" }}
          />

          {/* Yellow Ray - Horizontal */}
          {/* Yellow Ray - Hidden on mobile */}
           <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            className="hidden md:block absolute w-[200vw] h-[120px] bg-gradient-to-r from-transparent via-prism-yellow to-transparent blur-[60px] -rotate-45"
            style={{ transformOrigin: "center", willChange: "transform" }}
          />

          {/* MOBILE STATIC FALLBACK: Simple gradient mesh to replace heavy rays */}
          <div className="md:hidden absolute inset-0 opacity-40">
             <div className="absolute top-1/4 -left-20 w-64 h-64 bg-prism-cyan blur-[80px] opacity-40" />
             <div className="absolute bottom-1/3 -right-20 w-64 h-64 bg-prism-magenta blur-[80px] opacity-40" />
             <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-prism-yellow blur-[80px] opacity-30" />
          </div>
          
          {/* THE SINGULARITY GLOW (Atmosphere) */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(225,250,255,0.9)_0%,rgba(6,182,212,0)_70%)] z-0 mix-blend-screen"
          />

          {/* THE SINGULARITY (Pin Source) */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_150px_80px_rgba(200,250,255,0.9)] z-10"
          />

          {/* Vertical Emergence Beam */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.5, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[2px] h-[200vh] bg-white blur-[4px] mix-blend-overlay"
          />

       </div>
       
       {/* Noise Texture */}
       <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" 
            style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} 
       />
    </div>
  );
}
