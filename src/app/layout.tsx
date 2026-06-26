import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gracious Joseph Ben | AI Researcher & Software Engineer",
  description: "Personal portfolio website of Gracious Joseph Ben, showcasing projects in AI, IoT, Machine Learning, Computer Vision, and Mobile/Full-Stack Software Engineering.",
  openGraph: {
    title: "Gracious Joseph Ben | AI Researcher & Software Engineer",
    description: "Personal portfolio website of Gracious Joseph Ben, showcasing projects in AI, IoT, Machine Learning, Computer Vision, and Mobile/Full-Stack Software Engineering.",
    type: "website",
    locale: "en_US",
    siteName: "Gracious Joseph Ben Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracious Joseph Ben | AI Researcher & Software Engineer",
    description: "Personal portfolio website of Gracious Joseph Ben, showcasing projects in AI, IoT, Machine Learning, Computer Vision, and Mobile/Full-Stack Software Engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
