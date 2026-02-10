import SermonCard from "@/components/content/SermonCard";
import { getSermonsNewestFirst, getTransmissionNumber } from "@/lib/sermons";

export default async function SermonsPage() {
    const sermons = await getSermonsNewestFirst();
    
    return (
        <div className="min-h-screen pt-24 sm:pt-32 pb-32 px-4 md:px-20 flex flex-col items-center">
            <header className="mb-16 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4">THE WORD</h1>
                <p className="text-prism-cyan font-mono text-sm tracking-widest">TRANSMISSIONS FROM THE SOURCE</p>
            </header>

            <div className="flex flex-col gap-8 w-full items-center">
                {sermons.map((sermon) => (
                    <SermonCard 
                        key={sermon.slug}
                        slug={sermon.slug}
                        title={sermon.title}
                        date={`Transmission ${getTransmissionNumber(sermon)} // ${sermon.date}`}
                        excerpt={sermon.excerpt}
                    />
                ))}
            </div>
        </div>
    );
}
