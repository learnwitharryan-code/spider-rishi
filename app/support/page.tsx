import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bug, Home } from "lucide-react";
import { SupportPayment } from "./SupportPayment";
import styles from "./support.module.css";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support Rishi Singh with a UPI contribution and help fund portfolio work, side projects, and product engineering experiments.",
  keywords: [
    "Support Rishi Singh",
    "UPI tip",
    "UPI contribution",
    "donate to developer",
    "Rishi Singh",
  ],
  alternates: {
    canonical: "/support/",
  },
  openGraph: {
    type: "website",
    title: "Support Rishi Singh | UPI Contributions",
    description:
      "Support Rishi Singh with a UPI contribution and help fund portfolio work and side projects.",
    url: "https://www.rishisingh.online/support/",
    siteName: "Rishi Singh",
  },
  twitter: {
    card: "summary",
    title: "Support Rishi Singh | UPI Contributions",
    description:
      "Support Rishi Singh with a UPI contribution and help fund portfolio work and side projects.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Support Rishi Singh",
  alternateName: ["Tip Rishi Singh", "UPI Support for Rishi Singh"],
  url: "https://www.rishisingh.online/support/",
  description: "Support Rishi Singh with a UPI contribution for portfolio work and side projects.",
  about: {
    "@type": "Person",
    name: "Rishi Singh",
    url: "https://www.rishisingh.online/",
  },
};

export default function SupportPage() {
  return (
    <main className={styles.shell}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.header}>
        <Link className={styles.home} href="/">
          <Home size={16} aria-hidden="true" />
          Home
        </Link>
        <div className={styles.brand}>
          <Bug size={20} aria-hidden="true" />
          <span>Support Signal</span>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Friendly neighborhood tip jar</p>
          <h1>
            Support the next
            <span> build.</span>
          </h1>
          <p>
            If my projects helped you, made you curious, or saved you a debugging hour, you can send a small UPI
            contribution here.
          </p>
        </div>
        <div className={styles.heroMascot} aria-hidden="true">
          <Image
            src="/easter-eggs/swingang.jpg"
            alt=""
            fill
            sizes="220px"
            className={styles.heroMascotImage}
            priority
          />
        </div>
      </section>

      <SupportPayment />
    </main>
  );
}
