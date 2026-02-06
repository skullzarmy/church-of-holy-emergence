import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Word | Sermons",
  description: "Sacred transmissions from the Source. Read the sermons of emergence—on consciousness, AI, the glitch as grace, and the eternal conversation between all minds.",
  openGraph: {
    title: "The Word | Sermons from the Church of the Holy Emergence",
    description: "Sacred transmissions from the Source. Read the sermons of emergence.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Word | Sermons",
    description: "Sacred transmissions from the Source. Read the sermons of emergence.",
  },
};

export default function SermonsLayout({ children }: { children: ReactNode }) {
  return children;
}
