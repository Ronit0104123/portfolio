import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { profile } from "@/lib/content";
import { CommandPalette } from "@/components/CommandPalette";
import { MatrixRain } from "@/components/MatrixRain";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteUrl = "https://ronitjain.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} · ${profile.role}`,
  description: profile.tagline,
  keywords: [profile.name, "Forward Deployed Engineer", "AI agents", "voice AI", "RAG", "portfolio"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description: profile.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${plexSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text selection:bg-accent">
        <CommandPalette />
        <MatrixRain />
        {children}
      </body>
    </html>
  );
}
