import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TCC Careers - Connect Exceptional Talent with World-Class Opportunities",
  description: "Join thousands of professionals who've found their perfect match. From startups to Fortune 500, we connect talent with purpose.",
  keywords: ["careers", "jobs", "recruitment", "talent", "opportunities", "hiring"],
  authors: [{ name: "TCC Careers" }],
  creator: "TCC Careers",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://careers.tcc.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "TCC Careers - Connect Exceptional Talent with World-Class Opportunities",
    description: "Join thousands of professionals who've found their perfect match. From startups to Fortune 500, we connect talent with purpose.",
    siteName: "TCC Careers",
  },
  twitter: {
    card: "summary_large_image",
    title: "TCC Careers - Connect Exceptional Talent with World-Class Opportunities",
    description: "Join thousands of professionals who've found their perfect match. From startups to Fortune 500, we connect talent with purpose.",
    creator: "@tcc_careers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Plausible Analytics */}
        <script
          defer
          data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
