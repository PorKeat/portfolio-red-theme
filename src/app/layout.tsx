import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import MusicPlayer from "@/components/ui/MusicPlayer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollProgress from "@/components/ui/ScrollProgress";

const mainFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});
const baseUrl = "https://sengporkeat.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Alex KGM (Seng PorKeat) | DevOps Engineer & Fullstack Developer",
  description: "Portfolio of Alex KGM, a DevOps Engineer & Software Engineering student specializing in scalable, secure, and cloud-native systems, automation, and full-stack development.",
  keywords: ["Alex KGM", "Seng PorKeat", "Portfolio", "DevOps", "Fullstack Developer", "Cyber Security", "Next.js", "React", "Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
  authors: [{ name: "Alex KGM", url: baseUrl }],
  creator: "Alex KGM",
  publisher: "Alex KGM",
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Alex KGM | DevOps Engineer & Fullstack Developer",
    description: "Building scalable, secure, and cloud-native systems. Automating today, scaling tomorrow.",
    url: baseUrl,
    siteName: "Alex KGM Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex KGM | DevOps Engineer & Fullstack Developer",
    description: "Building scalable, secure, and cloud-native systems. Explore my projects and infrastructure deployments.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mainFont.variable} ${monoFont.variable} h-full antialiased bg-slate-950 text-slate-200`}
    >
      <body className="min-h-full flex flex-col selection:bg-red-primary selection:text-white overflow-x-hidden cursor-none">
        <CustomCursor />
        <ScrollProgress />
        <ThemeToggle />
        <MusicPlayer />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
