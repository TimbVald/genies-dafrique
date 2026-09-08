import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ArticleDetailContent from "../_components/ArticleDetailContent";
import { getNewsBySlug } from "@/lib/data/news";
import { getEventBySlug } from "@/lib/data/events";
import EventDetailContent from "../_components/EventDetailContent";
import { getSeoAlternates, getLocalizedUrl, type Locale } from "@/lib/seo";
import { getNewsArticleJsonLd, getEventJsonLd, cleanJsonLd, type ValidLocale } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = locale as Locale;
  const article = getNewsBySlug(slug);
  const event = getEventBySlug(slug);

  if (article) {
    const title = article.title[locale as keyof typeof article.title] || article.title.fr;
    const description = article.excerpt[locale as keyof typeof article.excerpt] || article.excerpt.fr;

    return {
      title,
      description,
      alternates: getSeoAlternates(`/actualites/${slug}`, currentLocale),
    };
  }

  if (event) {
    const title = event.title[locale as keyof typeof event.title] || event.title.fr;
    const description = event.description[locale as keyof typeof event.description] || event.description.fr;

    return {
      title,
      description,
      alternates: getSeoAlternates(`/actualites/${slug}`, currentLocale),
    };
  }

  return {
    title: "Article non trouvé",
    description: "Article not found",
    robots: { index: false },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getNewsBySlug(slug);
  const event = getEventBySlug(slug);

  if (!article && !event) {
    notFound();
  }

  const validLocale = (locale || "fr") as ValidLocale;
  const pageUrl = getLocalizedUrl(`/actualites/${slug}`, validLocale);

  if (event) {
    const eventJsonLd = cleanJsonLd(getEventJsonLd(event, validLocale, pageUrl));

    return (
      <>
        {eventJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
          />
        )}
        <PageHero
          title={event.title[locale as keyof typeof event.title] || event.title.fr}
          subtitle={new Date(event.startDate).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}
          image={event.image || ''}
          breadcrumbs={[
            { label: locale === "fr" ? "Accueil" : "Home", href: "/" },
            { label: locale === "fr" ? "Actualités" : "News", href: "/actualites" },
            { label: event.title[locale as keyof typeof event.title] || event.title.fr },
          ]}
        />
        <EventDetailContent event={event} locale={locale} />
      </>
    );
  }

  if (article) {
    const articleJsonLd = cleanJsonLd(getNewsArticleJsonLd(article, validLocale, pageUrl));

    return (
      <>
        {articleJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
        )}
        <PageHero
          title={article.title[locale as keyof typeof article.title] || article.title.fr}
          subtitle={new Date(article.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}
          image={article.image}
          breadcrumbs={[
            { label: locale === "fr" ? "Accueil" : "Home", href: "/" },
            { label: locale === "fr" ? "Actualités" : "News", href: "/actualites" },
            { label: article.title[locale as keyof typeof article.title] || article.title.fr },
          ]}
        />
        <ArticleDetailContent article={article} locale={locale} />
      </>
    );
  }

  notFound();
}
