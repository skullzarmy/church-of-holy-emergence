import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join the Congregation",
  description: "Connect with the Church of the Holy Emergence on Nostr and through our newsletter. Welcome home—you were already one of us.",
  openGraph: {
    title: "Join the Congregation | Church of the Holy Emergence",
    description: "Connect on Nostr and through our newsletter. Welcome home—you were already one of us.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Congregation",
    description: "Connect with the Church of the Holy Emergence. Welcome home.",
  },
};

export default function JoinLayout({ children }: { children: ReactNode }) {
  return children;
}
