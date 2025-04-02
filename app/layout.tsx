import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Kseniya Parkhamchuk",
  description: "Personal website for Kseniya Parkhamchuk",
  icons: {
    icon: "/icons/fox.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
        <header>
        <Link href="/" className="header-name">Kseniya Parkhamchuk</Link>
        <div className="header-contact">
          <div className="social-links">
            <a href="https://x.com/KsenaParhamchuk" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/x.svg" alt="X Profile" width={24} height={24} />
            </a>
            <a href="https://github.com/KsuParkhamchuk" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/github.svg" alt="GitHub Profile" width={24} height={24} />
            </a>
            <a href="https://www.linkedin.com/in/kparkhamchuk/" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/linkedin.svg" alt="LinkedIn Profile" width={24} height={24} />
            </a>
          </div>
          <div className="email-link">k.parkhamchuk@gmail.com</div>
        </div>
      </header>
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
