import type { Metadata } from "next";
import { Comic_Neue } from 'next/font/google';
import "./globals.css";

const font = Comic_Neue({weight:"400", variable: "--font-comic-neue"});

export const metadata: Metadata = {
  title: "ZotRooms",
  description: "A study room rater",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable}`}>
        {children}
      </body>
    </html>
  );
}
