import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bangers } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppChrome } from "./components/AppChrome";
import { projects } from "./data/projects";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const bangers = Bangers({
  variable: "--font-bangers",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rishisingh.online"),
  title: {
    default: "Rishi Singh | Full Stack Developer in India",
    template: "%s | Rishi Singh",
  },
  description: "Portfolio of Rishi Singh, a Full Stack Developer in India building Java Spring Boot, React, Next.js, ASP.NET Core, MySQL, and real-time web applications.",
  keywords: ["Rishi Singh", "Full Stack Developer India", "Java Spring Boot Developer", "React Developer", "Next.js Developer", "ASP.NET Core Developer", "Software Engineer Portfolio", "MySQL Developer"],
  authors: [{ name: "Rishi Singh", url: "https://www.rishisingh.online" }],
  creator: "Rishi Singh",
  alternates: {
    canonical: "/",
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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Rishi Singh | Full Stack Developer in India",
    description: "Full Stack Developer portfolio featuring Java Spring Boot, React, Next.js, ASP.NET Core, real-time apps, and production web projects.",
    url: "https://www.rishisingh.online",
    siteName: "Rishi Singh Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.rishisingh.online/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rishi Singh full stack developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Singh | Full Stack Developer in India",
    description: "Full Stack Developer portfolio featuring Java Spring Boot, React, Next.js, ASP.NET Core, and production web projects.",
    creator: "@Rishihoon", 
    images: ["https://www.rishisingh.online/opengraph-image"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishi Singh",
  url: "https://www.rishisingh.online",
  jobTitle: "Full Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "MET Institute of Information Technology"
    },
    {
      "@type": "EducationalOrganization",
      name: "Laxmi Institute of Technology"
    }
  ],
  sameAs: [
    "https://github.com/Rishihoon",
    "https://www.linkedin.com/in/rishisingh700"
  ],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "React",
    "Next.js",
    "ASP.NET Core",
    "MySQL",
    "Full Stack Development",
    "REST APIs"
  ],
  hasPart: projects.map((project) => ({
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: project.category,
    url: `https://www.rishisingh.online/projects/${project.slug}/`,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rishi Singh Portfolio",
  url: "https://www.rishisingh.online",
  author: {
    "@type": "Person",
    name: "Rishi Singh",
  },
  inLanguage: "en",
};

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Rishi Singh Full Stack Developer Portfolio",
  url: "https://www.rishisingh.online",
  hasPart: projects.map((project, index) => ({
    "@type": "CreativeWork",
    position: index + 1,
    name: project.title,
    description: project.description,
    url: `https://www.rishisingh.online/projects/${project.slug}/`,
  })),
};

import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${bangers.variable} antialiased bg-[var(--theme-bg)]`}
        suppressHydrationWarning
      >
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd, portfolioJsonLd]) }}
        />
        <Script
          id="sw-unregister"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (let registration of registrations) {
                      registration.unregister();
                    }
                  }).catch(function(err) {
                    console.log('Service Worker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
        <ThemeProvider>
          <AppChrome>{children}</AppChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
