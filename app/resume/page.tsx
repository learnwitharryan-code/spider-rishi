import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import styles from "./resume.module.css";

const resumePdf = "/RishiSingh.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Rishi Singh, a Full Stack Developer specializing in Java, Spring Boot, React, Next.js, and .NET.",
  alternates: {
    canonical: "/resume/",
  },
  openGraph: {
    type: "profile",
    title: "Resume | Rishi Singh",
    description:
      "View and download the resume of Rishi Singh, Full Stack Developer.",
    url: "https://www.rishisingh.online/resume/",
    siteName: "Rishi Singh",
  },
  twitter: {
    card: "summary",
    title: "Resume | Rishi Singh",
    description:
      "View and download the resume of Rishi Singh, Full Stack Developer.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Resume | Rishi Singh",
  url: "https://www.rishisingh.online/resume/",
  description: "Resume of Rishi Singh, Full Stack Developer.",
  mainEntity: {
    "@type": "Person",
    name: "Rishi Singh",
    jobTitle: "Full Stack Developer",
    url: "https://www.rishisingh.online/",
  },
};

export default function ResumePage() {
  return (
    <main className={styles.shell}>
      <Script id="resume-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.toolbar}>
        <Link className={styles.homeLink} href="/">
          Back to Home
        </Link>
        <div className={styles.actions}>
          <a className={styles.secondaryButton} href={resumePdf} target="_blank" rel="noopener noreferrer">
            Open PDF
          </a>
          <a className={styles.primaryButton} href={resumePdf} download="RishiSingh.pdf">
            Download
          </a>
        </div>
      </header>

      <section className={styles.viewerWrap} aria-label="Resume PDF viewer">
        <object className={styles.viewer} data={`${resumePdf}#view=FitH`} type="application/pdf">
          <div className={styles.fallback}>
            <p>Your browser cannot display the resume PDF inline.</p>
            <a href={resumePdf} download="RishiSingh.pdf">
              Download Resume
            </a>
          </div>
        </object>
      </section>
    </main>
  );
}
