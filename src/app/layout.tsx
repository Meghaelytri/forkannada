import type { Metadata } from "next";
import {
  Boldonse,
  Fraunces,
  Geist_Mono,
  Noto_Sans_Kannada,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const boldonse = Boldonse({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const kannada = Noto_Sans_Kannada({
  variable: "--font-kannada",
  subsets: ["kannada"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Kannada | Kannada Learning for Classes 1-10",
  description:
    "Friendly Kannada notes, worksheets, grammar, essays, and lessons for students from Class 1 to Class 10.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${boldonse.variable} ${geistMono.variable} ${kannada.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
