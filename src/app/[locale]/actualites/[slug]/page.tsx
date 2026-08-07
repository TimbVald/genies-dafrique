import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ArticleDetailContent from "../_components/ArticleDetailContent";
import { getNewsBySlug } from "@/lib/data/news";
import type { NewsArticle } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getNewsBySlug(slug);
  
  if (!article) {
    return {
      title: "Article non trouvé",
      description: "Article not found",
    };
  }

  const title = article.title[locale as keyof typeof article.title] || article.title.fr;
  const description = article.excerpt[locale as keyof typeof article.excerpt] || article.excerpt.fr;

  return {
    title,
    description,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "newsPage" });

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
