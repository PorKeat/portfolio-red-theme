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
  title: "Seng PorKeat | Fullstack & DevOps Developer",
  description: "Portfolio of Seng PorKeat, a Fullstack Web Developer and DevOps practitioner specializing in Next.js, Spring, and infrastructure management.",
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
