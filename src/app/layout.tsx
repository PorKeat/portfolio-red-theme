import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import MusicPlayer from "@/components/ui/MusicPlayer";

const mainFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexkgm.com"),
  title: "Alex KGM (Seng PorKeat) | DevOps & Fullstack Developer",
  description: "Portfolio of Alex KGM, a Fullstack Developer & Cyber Security Associate specializing in DevOps practices, application deployment, CI/CD, and infrastructure management.",
  keywords: ["Alex KGM", "Seng PorKeat", "Portfolio", "DevOps", "Fullstack Developer", "Cyber Security", "Next.js", "React", "Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
  authors: [{ name: "Alex KGM" }],
  creator: "Alex KGM",
  openGraph: {
    title: "Alex KGM | DevOps & Fullstack Developer",
    description: "Creative Developer x System Architect. Automating today, scaling tomorrow.",
    url: "https://alexkgm.com",
    siteName: "Alex KGM Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alex KGM DevOps Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex KGM | DevOps & Fullstack Developer",
    description: "Automating today, scaling tomorrow. Explore my projects and infrastructure deployments.",
    images: ["/og-image.png"],
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
        <MusicPlayer />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
