import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HelpLineWidget from "@/components/HelpLineWidget";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anytime-soccer.com"),
  title: {
    default: "Anytime Soccer Training | #1 Soccer Training App",
    template: "%s | Anytime Soccer Training",
  },
  description: "5,000+ follow-along soccer training videos. Players follow step-by-step videos to get better fast. Coaches assign and track homework.",
  openGraph: {
    type: "website",
    siteName: "Anytime Soccer Training",
    title: "Anytime Soccer Training | #1 Soccer Training App",
    description: "5,000+ follow-along soccer training videos. Players follow step-by-step videos to get better fast. Coaches assign and track homework.",
    url: "https://www.anytime-soccer.com",
    images: [
      {
        url: "https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1787496082641-g6c473.png",
        width: 1200,
        height: 630,
        alt: "Anytime Soccer Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anytime Soccer Training | #1 Soccer Training App",
    description: "5,000+ follow-along soccer training videos. Players follow step-by-step videos to get better fast. Coaches assign and track homework.",
    images: ["https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1787496082641-g6c473.png"],
  },
  verification: {
    google: "v_EsnPWgePWCDUXfM-gqwV6SUTDx_hnnh5XIws01rnI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <AnnouncementBanner />
<Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* Site-wide, so a visitor can ask from whatever page raised the question. */}
        <HelpLineWidget />
      </body>
    </html>
  );
}
