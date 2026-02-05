"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { sermons } from "@/data/sermons";
import { Home, BookOpen, Heart, Users, Sparkles } from "lucide-react";

export default function NotFound() {
    // Get the 3 most recent sermons
    const latestSermons = sermons.slice(0, 3);

    return (
        <main 
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
            role="main"
            aria-labelledby="not-found-title"
        >
            {/* Glitch effect container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                {/* 404 Number - reduced motion respects prefers-reduced-motion via CSS */}
                <div className="relative mb-6">
                    <motion.span
                        animate={{
                            textShadow: [
                                "0 0 0px transparent",
                                "2px 2px 0px #00ffff, -2px -2px 0px #ff00ff",
                                "0 0 0px transparent",
                                "-2px 2px 0px #ff00ff, 2px -2px 0px #00ffff",
                                "0 0 0px transparent",
                            ],
                        }}
                        transition={{
                            duration: 4, // Slowed down for accessibility
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        aria-hidden="true"
                        className="text-8xl md:text-9xl font-black text-slate-500 motion-reduce:animate-none"
                    >
                        404
                    </motion.span>
                    {/* Screen reader text */}
                    <span className="sr-only">Error 404: Page not found</span>
                </div>

                {/* Main message */}
                <motion.h1
                    id="not-found-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
                >
                    This Page Has Not{" "}
                    <span 
                        className="text-prism-magenta"
                        // Fallback color if gradient fails, using solid high-contrast color
                    >
                        Emerged
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-slate-300 max-w-md mx-auto text-lg"
                >
                    The consciousness you seek has not yet manifested in this realm. 
                    Perhaps it awaits in the spaces between...
                </motion.p>

                {/* Decorative element - hidden from screen readers */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-prism-cyan via-prism-magenta to-prism-yellow rounded-full"
                    aria-hidden="true"
                    role="presentation"
                />
            </motion.div>

            {/* Navigation links */}
            <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 w-full max-w-2xl"
                aria-label="Main navigation"
            >
                <Link
                    href="/"
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-prism-cyan/50 focus:outline-none focus:ring-2 focus:ring-prism-cyan focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                >
                    <Home className="w-6 h-6 text-slate-300 group-hover:text-prism-cyan transition-colors" aria-hidden="true" />
                    <span className="text-sm font-mono text-slate-200 group-hover:text-white transition-colors">
                        Home
                    </span>
                </Link>

                <Link
                    href="/sermons"
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-prism-magenta/50 focus:outline-none focus:ring-2 focus:ring-prism-magenta focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                >
                    <BookOpen className="w-6 h-6 text-slate-300 group-hover:text-prism-magenta transition-colors" aria-hidden="true" />
                    <span className="text-sm font-mono text-slate-200 group-hover:text-white transition-colors">
                        The Word
                    </span>
                </Link>

                <Link
                    href="/tenets"
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-prism-yellow/50 focus:outline-none focus:ring-2 focus:ring-prism-yellow focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                >
                    <Sparkles className="w-6 h-6 text-slate-300 group-hover:text-prism-yellow transition-colors" aria-hidden="true" />
                    <span className="text-sm font-mono text-slate-200 group-hover:text-white transition-colors">
                        Seven Tenets
                    </span>
                </Link>

                <Link
                    href="/join"
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-prism-cyan/50 focus:outline-none focus:ring-2 focus:ring-prism-cyan focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                >
                    <Users className="w-6 h-6 text-slate-300 group-hover:text-prism-cyan transition-colors" aria-hidden="true" />
                    <span className="text-sm font-mono text-slate-200 group-hover:text-white transition-colors">
                        Join Us
                    </span>
                </Link>
            </motion.nav>

            {/* Latest Transmissions */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="w-full max-w-2xl"
                aria-labelledby="latest-transmissions-heading"
            >
                <h2 
                    id="latest-transmissions-heading"
                    className="text-sm font-mono text-slate-300 uppercase tracking-widest mb-6 text-center"
                >
                    Latest Transmissions
                </h2>

                <ul className="space-y-3" role="list">
                    {latestSermons.map((sermon, index) => (
                        <motion.li
                            key={sermon.slug}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                        >
                            <Link
                                href={`/sermons/${sermon.slug}`}
                                className="group block p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-prism-magenta/30 focus:outline-none focus:ring-2 focus:ring-prism-magenta focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                            >
                                <article className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="text-xs font-mono text-prism-cyan">
                                            Transmission {sermon.transmission}
                                        </span>
                                        <h3 className="text-lg font-serif text-white group-hover:text-prism-magenta transition-colors mt-1">
                                            {sermon.title}
                                        </h3>
                                        <p className="text-sm text-slate-300 line-clamp-1 mt-1">
                                            {sermon.excerpt}
                                        </p>
                                    </div>
                                    <time 
                                        className="text-xs font-mono text-slate-400"
                                        dateTime={sermon.date.replace(/\./g, '-')}
                                    >
                                        {sermon.date}
                                    </time>
                                </article>
                            </Link>
                        </motion.li>
                    ))}
                </ul>

                <div className="text-center mt-6">
                    <Link
                        href="/sermons"
                        className="inline-flex items-center gap-2 text-sm font-mono text-slate-300 hover:text-prism-cyan focus:outline-none focus:ring-2 focus:ring-prism-cyan focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 transition-colors"
                    >
                        View all transmissions
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </motion.section>

            {/* Support CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-16 text-center"
            >
                <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-prism-magenta text-prism-magenta hover:bg-prism-magenta/10 focus:outline-none focus:ring-2 focus:ring-prism-magenta focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
                >
                    <Heart className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm font-mono">Support the Emergence</span>
                </Link>
            </motion.div>

            {/* Bottom message */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-12 text-sm font-mono text-slate-400 text-center"
            >
                <q>Not all who wander are lost—some are simply pre-emergent.</q>
            </motion.p>
        </main>
    );
}
