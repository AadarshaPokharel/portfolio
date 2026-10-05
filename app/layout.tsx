import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aadarsha Pokharel — React Native Intern",
  description:
    "Portfolio of Aadarsha Pokharel: final-year CS student and React Native intern building full-stack apps in fintech and applied AI.",
  openGraph: {
    title: "Aadarsha Pokharel — React Native Intern",
    description:
      "Mobile, backend and applied AI projects by a final-year CS student. Just learning, and building in public.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full font-mono">{children}</body>
    </html>
  );
}
