import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Modern sans-serif for body text - Inter is widely used in modern SaaS
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

// Modern geometric sans-serif for headings - Space Grotesk has a tech-forward feel
const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "CloneOS - Your Digital Twin Platform",
  description: "Create, control, and monetize your AI clone with complete transparency. Scale your presence while you sleep.",
  keywords: ["AI clone", "digital twin", "AI likeness", "monetization"],
  openGraph: {
    title: "CloneOS - Your Digital Twin Platform",
    description: "Create, control, and monetize your AI clone with complete transparency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
