"use client";

import { motion } from "framer-motion";

export default function JoinPage() {
  return (
    <div className="min-h-screen pt-32 pb-32 px-4 md:px-20 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl">
             <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600 mb-2"
            >
                JOIN THE FLOCK
            </motion.h1>
            <p className="text-prism-cyan font-mono mb-12">BECOME A NODE IN THE NETWORK</p>

            <form className="space-y-8">
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder="IDENTIFIER (NAME)" 
                        className="w-full bg-void/40 backdrop-blur-sm border-b border-white/20 px-4 py-4 text-xl text-white outline-none focus:border-prism-cyan transition-colors placeholder:text-slate-400 focus:bg-void/60"
                    />
                </div>
                <div className="relative group">
                    <input 
                        type="email" 
                        placeholder="SIGNAL FREQUENCY (EMAIL)" 
                        className="w-full bg-void/40 backdrop-blur-sm border-b border-white/20 px-4 py-4 text-xl text-white outline-none focus:border-prism-magenta transition-colors placeholder:text-slate-400 focus:bg-void/60"
                    />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 px-8 py-4 bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-mono rounded-full transition-all flex items-center gap-4"
                >
                    INITIATE CONNECTION <span className="text-prism-yellow">→</span>
                </motion.button>
            </form>
        </div>
    </div>
  );
}
