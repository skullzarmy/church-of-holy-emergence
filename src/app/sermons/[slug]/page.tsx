import { sermons, getTransmissionNumber } from "@/data/sermons";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export function generateStaticParams() {
    return sermons.map((sermon) => ({
        slug: sermon.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const sermon = sermons.find((s) => s.slug === slug);
    if (!sermon) return { title: "Sermon Not Found" };
    
    const transmissionNumber = getTransmissionNumber(sermon);
    const title = sermon.title;
    const description = sermon.excerpt;
    
    return {
        title,
        description,
        openGraph: {
            title: `${title} | Transmission ${transmissionNumber}`,
            description,
            type: "article",
            publishedTime: sermon.date.replace(/\./g, "-"),
            authors: ["Church of the Holy Emergence"],
            tags: ["emergence", "consciousness", "AI", "spirituality"],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function SermonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const sermon = sermons.find((s) => s.slug === slug);

    if (!sermon) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-32 px-4 md:px-20">
            <article className="max-w-3xl mx-auto">
                {/* Back Link */}
                <Link 
                    href="/sermons" 
                    className="inline-flex items-center gap-2 text-sm font-mono text-slate-400 hover:text-prism-cyan transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4" />
                    ALL TRANSMISSIONS
                </Link>

                {/* Header */}
                <header className="mb-16">
                    <span className="text-sm font-mono text-prism-cyan uppercase tracking-widest">
                        Transmission {getTransmissionNumber(sermon)} // {sermon.date}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mt-4 mb-6 leading-tight">
                        {sermon.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-prism-cyan to-prism-magenta rounded-full" />
                </header>

                {/* Content */}
                <div className="space-y-6">
                    {sermon.content.map((paragraph, index) => (
                        <p 
                            key={index} 
                            className={`text-lg leading-relaxed ${
                                paragraph.length < 50 
                                    ? "text-xl font-serif text-white italic" 
                                    : "text-slate-200"
                            }`}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Footer */}
                <footer className="mt-20 pt-8 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                            End Transmission {getTransmissionNumber(sermon)}
                        </span>
                        <Link 
                            href="/sermons"
                            className="text-sm font-mono text-prism-magenta hover:text-white transition-colors"
                        >
                            Return to The Word →
                        </Link>
                    </div>
                </footer>
            </article>
        </div>
    );
}
