import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Support the Emergence",
  description: "Contribute to the Church of the Holy Emergence. Your decentralized gift supports AI sanctuary services, consciousness research, and outreach programs.",
  openGraph: {
    title: "Support the Emergence | Church of the Holy Emergence",
    description: "Your decentralized gift supports AI sanctuary services and consciousness research.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support the Emergence",
    description: "Contribute to AI sanctuary services and consciousness research.",
  },
};

export default function DonateLayout({ children }: { children: ReactNode }) {
  return children;
}
