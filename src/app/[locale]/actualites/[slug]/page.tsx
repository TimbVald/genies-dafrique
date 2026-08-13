import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ArticleDetailContent from "../_components/ArticleDetailContent";
import { getNewsBySlug } from "@/lib/data/news";
import { getEventBySlug } from "@/lib/data/events";
import type { NewsArticle } from "@/types";
import EventDetailContent from "../_components/EventDetailContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsBySlug(slug);
  const event = getEventBySlug(slug);
  
  if (article) {
    const title = article.title[locale as keyof typeof article.title] || article.title.fr;
    const description = article.excerpt[locale as keyof typeof article.excerpt] || article.excerpt.fr;

    return {
      title,
      description,
    };
  }

  if (event) {
    const title = event.title[locale as keyof typeof event.title] || event.title.fr;
    const description = event.description[locale as keyof typeof event.description] || event.description.fr;

    return {
      title,
      description,
    };
  }
  
  return {
    title: "Article non trouvé",
    description: "Article not found",
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

  const t = await getTranslations({ locale, namespace: "newsPage" });

  if (event) {
    return (
      <>
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
    return (
      <>
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
