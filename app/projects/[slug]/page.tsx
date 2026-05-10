import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, projects } from "../../data/projects";
import styles from "./project.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} Case Study`,
    description: `${project.title} by Rishi Singh: ${project.description}`,
    alternates: {
      canonical: `/projects/${project.slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${project.title} | Rishi Singh Project`,
      description: project.description,
      url: `https://www.rishisingh.online/projects/${project.slug}/`,
      siteName: "Rishi Singh",
      images: [
        {
          url: "https://www.rishisingh.online/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} project by Rishi Singh`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Rishi Singh Project`,
      description: project.description,
      images: ["https://www.rishisingh.online/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: `https://www.rishisingh.online/projects/${project.slug}/`,
    programmingLanguage: project.stack,
    author: {
      "@type": "Person",
      name: "Rishi Singh",
      url: "https://www.rishisingh.online/",
    },
    targetProduct: {
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: project.category,
      url: project.href,
    },
  };

  return (
    <main className={styles.shell}>
      <Script id="project-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className={styles.nav}>
        <Link href="/#work" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Work
        </Link>
        <span>{project.category}</span>
      </header>

      <section className={styles.hero}>
        <p className={styles.kicker}>{project.year} / Case Study</p>
        <h1>{project.title}</h1>
        <p>{project.longDescription}</p>
        <div className={styles.actions}>
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            <ExternalLink size={17} aria-hidden="true" />
            Live Project
          </a>

        </div>
      </section>

      <section className={styles.grid}>
        <article className={`${styles.panel} ${styles.largePanel}`}>
          <p className={styles.panelLabel}>What it does</p>
          <h2>{project.description}</h2>
        </article>

        <article className={styles.panel}>
          <p className={styles.panelLabel}>Stack</p>
          <div className={styles.tags}>
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className={`${styles.panel} ${styles.largePanel}`}>
          <p className={styles.panelLabel}>Highlights</p>
          <ul className={styles.highlights}>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>

        <article className={styles.panel}>
          <p className={styles.panelLabel}>Project Links</p>
          <div className={styles.linkList}>
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              Production URL
            </a>

          </div>
        </article>
      </section>
    </main>
  );
}
