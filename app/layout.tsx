import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const creepster = localFont({
  src: "./fonts/Creepster-Regular.ttf",
  variable: "--font-creepster-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Oceanic Communications Trick or Treat App",
  description: "Trick or Treat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="theme-color" content="#171717" />
      </head>
      <body
        className={`${geistSans.variable} ${creepster.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
