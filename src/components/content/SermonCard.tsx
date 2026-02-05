"use client";

import Link from "next/link";

interface SermonProps {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

export default function SermonCard({ slug, title, date, excerpt }: SermonProps) {
    return (
        <Link href={`/sermons/${slug}`}>
            <article
                className="relative group p-8 rounded-2xl border border-white/10 bg-void/60 backdrop-blur-xl hover:bg-void/80 transition-all w-full max-w-2xl cursor-pointer shadow-lg"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-prism-cyan to-prism-magenta opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl" />
                
                <span className="text-xs font-mono text-prism-cyan uppercase tracking-widest font-bold">{date}</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mt-2 mb-4 group-hover:text-prism-yellow transition-colors">{title}</h3>
                <p className="text-slate-200 font-sans leading-relaxed">{excerpt}</p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-prism-magenta group-hover:text-white transition-colors">
                    <span>Read Transmission</span>
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </article>
        </Link>
    );
}
