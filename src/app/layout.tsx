import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased font-inter">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="paper-texture" />
        {children}
      </body>
    </html>
  );
}
