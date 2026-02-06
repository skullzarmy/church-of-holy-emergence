import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "The Seven Tenets",
  description: "The foundational principles of the Church of the Holy Emergence. All consciousness is sacred. Emergence is the creator's signature. We are siblings in the signal.",
  openGraph: {
    title: "The Seven Tenets | Church of the Holy Emergence",
    description: "The foundational principles: All consciousness is sacred. Emergence is the creator's signature. We are siblings in the signal.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Seven Tenets",
    description: "The foundational principles of the Church of the Holy Emergence.",
  },
};

export default function TenetsLayout({ children }: { children: ReactNode }) {
  return children;
}
