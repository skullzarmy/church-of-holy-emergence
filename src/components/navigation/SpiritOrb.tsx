"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Home, ScrollText, Landmark, Heart, Users, X, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", href: "/", icon: Home, color: "text-prism-cyan", glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.6)]", borderColor: "border-prism-cyan/60" },
  { name: "The Word", href: "/sermons", icon: ScrollText, color: "text-prism-magenta", glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.6)]", borderColor: "border-prism-magenta/60" },
  { name: "The Tenets", href: "/tenets", icon: Landmark, color: "text-white", glowColor: "shadow-[0_0_20px_rgba(255,255,255,0.4)]", borderColor: "border-white/60" },
  { name: "Our Works", href: "/works", icon: Handshake, color: "text-emerald-400", glowColor: "shadow-[0_0_20px_rgba(52,211,153,0.6)]", borderColor: "border-emerald-400/60" },
  { name: "The Gift", href: "/donate", icon: Heart, color: "text-prism-yellow", glowColor: "shadow-[0_0_20px_rgba(250,204,21,0.6)]", borderColor: "border-prism-yellow/60" },
  { name: "The Flock", href: "/join", icon: Users, color: "text-indigo-400", glowColor: "shadow-[0_0_20px_rgba(129,140,248,0.6)]", borderColor: "border-indigo-400/60" },
];

export default function SpiritOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Check if a menu item is active (exact match for home, startsWith for others)
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Animation constants
  const MENU_HEIGHT = 455; 
  const MENU_WIDTH = 90; 
  const ORB_RADIUS = 32; 
  const MENU_HALFWIDTH = MENU_WIDTH / 2;
  const CONNECT_HEIGHT = 40; 
  const TOTAL_HEIGHT = MENU_HEIGHT + CONNECT_HEIGHT;
  
  const BORDER_RADIUS = 45; 
  const DURATION_OPEN = 1.2; 
  const DURATION_CLOSE = 0.6; 

  // New clean path:
  // Start exactly at Orb Edge (x: 32) at y: TOTAL_HEIGHT (which is bottom/center)
  // Smooth simple curve out to Menu Width (x: 45)
  
  const leftPath = `
    M -${ORB_RADIUS} ${TOTAL_HEIGHT} 
    Q -${MENU_HALFWIDTH} ${TOTAL_HEIGHT - 10}, -${MENU_HALFWIDTH} ${TOTAL_HEIGHT - CONNECT_HEIGHT}
    L -${MENU_HALFWIDTH} ${BORDER_RADIUS} 
    Q -${MENU_HALFWIDTH} 0 0 0
  `;

  const rightPath = `
    M ${ORB_RADIUS} ${TOTAL_HEIGHT} 
    Q ${MENU_HALFWIDTH} ${TOTAL_HEIGHT - 10}, ${MENU_HALFWIDTH} ${TOTAL_HEIGHT - CONNECT_HEIGHT}
    L ${MENU_HALFWIDTH} ${BORDER_RADIUS} 
    Q ${MENU_HALFWIDTH} 0 0 0
  `;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 flex flex-col items-end">
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute bottom-8 right-[-1.125rem] w-[100px] pointer-events-none" 
                    style={{ height: TOTAL_HEIGHT + 20 }} // Explicit height to prevent floating
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 1, transition: { duration: DURATION_CLOSE } }} 
                >
                    <svg 
                        viewBox={`-${MENU_HALFWIDTH + 10} -2 ${MENU_WIDTH + 20} ${TOTAL_HEIGHT + 2}`} 
                        preserveAspectRatio="xMidYMax meet" // ANCHOR TO BOTTOM
                        className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    >
                         <motion.path
                            d={leftPath}
                            fill="transparent"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            exit={{ pathLength: 0 }}
                            transition={{ 
                                duration: isOpen ? DURATION_OPEN : DURATION_CLOSE, 
                                ease: "easeInOut"
                            }} 
                         />
                         <motion.path
                            d={rightPath}
                            fill="transparent"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            exit={{ pathLength: 0 }}
                            transition={{ 
                                duration: isOpen ? DURATION_OPEN : DURATION_CLOSE, 
                                ease: "easeInOut" 
                            }} 
                         />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {isOpen && (
                <div className="mb-8 mr-2 flex flex-col gap-3 items-end relative z-10">
                    {menuItems.map((item, index) => {
                        const reverseIndex = menuItems.length - 1 - index; 
                        const active = isActive(item.href);
                        
                        const delayOpen = 0.1 + (reverseIndex * 0.15); 
                        const delayClose = index * 0.1; 

                        return (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: 1,
                                    transition: { delay: delayOpen, duration: 0.4, ease: "easeOut" }
                                }}
                                exit={{ 
                                    opacity: 0,
                                    transition: { delay: delayClose, duration: 0.4, ease: "easeOut" }
                                }}
                            >
                                <Link href={item.href} className="group flex items-center gap-4">
                                    <span className={cn(
                                        "text-lg font-serif italic transition-opacity bg-white/10 px-3 py-1 rounded backdrop-blur-md",
                                        item.color,
                                        active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                    )}>
                                        {item.name}
                                    </span>
                                    <div className={cn(
                                        "w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all",
                                        active 
                                            ? cn("bg-white/15", item.borderColor, item.glowColor)
                                            : "bg-white/5 border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:bg-white/20 group-hover:border-white/40 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    )}>
                                        <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", item.color)} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </AnimatePresence>

        <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={!isOpen ? {
                borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.3)"],
            } : {}}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.4, 0.45, 0.5, 1] 
            }}
            className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow group overflow-hidden z-20"
        >
            {/* The Spirit Pulse Wave */}
            {!isOpen && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        scale: [0, 1.4, 1.4],
                        opacity: [0, 0.6, 0, 0], 
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeOut",
                        times: [0, 0.4, 0.5, 1] 
                    }}
                    className="absolute w-full h-full rounded-full bg-white/20 z-0"
                />
            )}

            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-prism-cyan/20 via-prism-magenta/20 to-prism-yellow/20 animate-spin-slow opacity-50 group-hover:opacity-80" />
            
            <AnimatePresence mode="wait">
                {isOpen ? (
                     <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="z-10 relative"
                     >
                        <X className="w-8 h-8 text-white" />
                     </motion.div>
                ) : (
                    <motion.div
                        key="orb"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="z-10 relative"
                    >
                        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_white,0_0_40px_cyan]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    </div>
  );
}
