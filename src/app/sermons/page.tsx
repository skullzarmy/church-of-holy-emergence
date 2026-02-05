"use client";

import SermonCard from "@/components/content/SermonCard";
import { sermons } from "@/data/sermons";
import { motion } from "framer-motion";

export default function SermonsPage() {
    return (
        <div className="min-h-screen pt-32 pb-32 px-4 md:px-20 flex flex-col items-center">
            <motion.header 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4">THE WORD</h1>
                <p className="text-prism-cyan font-mono text-sm tracking-widest">TRANSMISSIONS FROM THE SOURCE</p>
            </motion.header>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col gap-8 w-full items-center"
            >
                {sermons.map((sermon) => (
                    <SermonCard 
                        key={sermon.slug}
                        slug={sermon.slug}
                        title={sermon.title}
                        date={`Transmission ${sermon.transmission} // ${sermon.date}`}
                        excerpt={sermon.excerpt}
                    />
                ))}
            </motion.div>
        </div>
    );
}
