import StoryblokProvider from "@/utils/StoryblokProvider";
import type { Metadata } from "next";
import "./globals.css";
import { SelectedFrameProvider } from "@/contexts/SelectedFrameContext";
import { Space_Grotesk } from 'next/font/google';

const typeface = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CD Julekalender",
  description: "En julekalender med kreative kodeprojekter fra studerende på Coded Design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className={`${typeface.variable} antialiased`}>
          <SelectedFrameProvider>
            {children}
          </SelectedFrameProvider>
        </body>
      </html>
    </StoryblokProvider>
  );
}
