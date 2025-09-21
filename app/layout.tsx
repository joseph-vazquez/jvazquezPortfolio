import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Joseph Vazquez - Portfolio",
  description: "Software Engineer & Cybersecurity Professional Portfolio",
  keywords: [
    "Joseph Vazquez",
    "Software Engineer",
    "Cybersecurity",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Joseph Vazquez" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className={jetbrainsMono.className}>
        <div className="grid-overlay"></div>
        {children}
      </body>
    </html>
  );
}
