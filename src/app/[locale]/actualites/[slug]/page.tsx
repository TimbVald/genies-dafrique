import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ArticleDetailContent from "../_components/ArticleDetailContent";

export interface NewsArticleFull {
  id: string;
  date: string;
  category: string;
  categoryKey: string;
  titleFr: string;
  titleEn: string;
  excerpt: string;
  image: string;
  galleryCount: number;
  author: string;
  gallery: string[];
  contentFr: string[];
  contentEn: string[];
}

export const NEWS_FULL: NewsArticleFull[] = [
  {
    id: "rentree-2025",
    date: "Septembre 2025",
    category: "Événements",
    categoryKey: "evenements",
    titleFr: "Rentrée scolaire 2025-2026 : un nouveau chapitre !",
    titleEn: "Back to School 2025-2026: A New Chapter!",
    excerpt: "L'école a officiellement ouvert ses portes à la rentrée de septembre 2025 avec enthousiasme et de nombreux nouveaux élèves. Une rentrée historique pour Les Génies d'Afrique.",
    image: "/images/IMG-20260723-WA0006.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    gallery: [
      "/images/IMG-20260723-WA0006.jpg",
      "/images/IMG-20260723-WA0012.jpg",
      "/images/IMG-20260723-WA0013.jpg",
      "/images/IMG-20260723-WA0017.jpg",
    ],
    contentFr: [
      "C'est avec une grande joie et une fierté renouvelée que toute l'équipe pédagogique du Complexe Scolaire Bilingue Les Génies d'Afrique a accueilli ses élèves pour cette rentrée scolaire 2025-2026, qui marque un tournant dans l'histoire de l'établissement.",
      "Après avoir obtenu l'agrément officiel du MINEDUB au premier semestre 2025, l'école a pu ouvrir ses portes à une promotion supplémentaires de nouveaux élèves, allant de la crèche au CM2, répartis entre la section francophone et la section anglophone.",
      "La journée de rentrée a été placée sous le signe de la bienveillance et de l'enthousiasme. Les élèves ont été accueillis par leurs enseignants respectifs dans des salles de classe rénovées et équipées de matériel pédagogique moderne.",
      "La directrice, Mme Mbarga, a souligné dans son allocution d'ouverture : « Cette nouvelle année scolaire est l'occasion de bâtir ensemble les fondations de l'excellence. Nous mettons tout en œuvre pour que chaque enfant se sente épanoui, encouragé et accompagné dans son parcours unique. »",
      "Au programme de cette année : renforcement du bilinguisme, projets interdisciplinaires, initiation aux technologies numériques, projets agricoles et entrepreneuriat, clubs scolaires, sorties pédagogiques et manifestations culturelles.",
      "Toute l'équipe sejoint pour une année scolaire riche en découvertes, en réussites et en beaux moments partagés. Bienvenue à tous dans l'aventure des Génies d'Afrique !",
    ],
    contentEn: [
      "It is with great joy and renewed pride that the entire pedagogical team of the Bilingual School Complex Les Génies d'Afrique welcomed its students for the 2025-2026 school year, marking a turning point in the institution's history.",
      "After obtaining official MINEDUB accreditation in the first semester of 2025, the school was able to open its doors to an additional cohort of new students, from day care through primary school, divided between the French and English sections.",
      "The first day of school was marked by warmth and enthusiasm. Students were welcomed by their respective teachers in renovated classrooms equipped with modern pedagogical material.",
      "The Principal, Mrs. Mbarga, emphasised in her opening address: \"This new school year is an opportunity to build the foundations of excellence together. We are doing everything to ensure that every child feels fulfilled, encouraged and supported in their unique journey.\"",
      "On the programme this year: reinforced bilingualism, interdisciplinary projects, introduction to digital technologies, agricultural projects and entrepreneurship, school clubs, educational outings and cultural events.",
      "The whole team joins us for a school year rich in discovery, success and beautiful shared moments. Welcome everyone to the adventure of Les Génies d'Afrique!",
    ],
  },
  {
    id: "agrement-minedub",
    date: "Février 2025",
    category: "Institutionnel",
    categoryKey: "institutionnel",
    titleFr: "Obtention de l'agrément officiel MINEDUB",
    titleEn: "Official MINEDUB Accreditation Obtained",
    excerpt: "Le Complexe Scolaire Bilingue Les Génies d'Afrique a obtenu son agrément officiel du Ministère de l'Éducation de Base du Cameroun, une étape fondatrice pour l'établissement.",
    image: "/images/IMG-20260723-WA0022.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    gallery: [
      "/images/IMG-20260723-WA0022.jpg",
      "/images/IMG-20260723-WA0024.jpg",
      "/images/IMG-20260723-WA0034.jpg",
      "/images/IMG-20260723-WA0039.jpg",
    ],
    contentFr: [
      "C'est une étape historique qui restera gravée dans les annales du Complexe Scolaire Bilingue Les Génies d'Afrique : l'obtention officielle de l'agrément MINEDUB, délivré par le Ministère de l'Éducation de Base du Cameroun.",
      "Ce précieux sésame vient couronner des mois de travail acharné, de préparation rigoureuse et d'engagement sans faille de toute l'équipe fondatrice et pédagogique.",
      "L'inspection ministérielle, venue évaluer l'établissement, a souligné la qualité des infrastructures, la compétence du corps enseignant, la richesse du projet éducatif et le respect des programmes officiels MINEDUB dans les deux sections linguistiques.",
      "La fondatrice, Mme Mbarga, a déclaré : « Cet agrément est avant tout une reconnaissance. Celle de nos valeurs, de notre vision pédagogique et de notre engagement au service de l'enfance camerounaise. Nous sommes honorés et nous continuerons d'aller de l'avant. »",
      "Pour l'avenir, l'établissement vise l'agrandissement des locaux, l'introduction de nouveaux ateliers scientifiques et informatiques, et le renforcement des partenariats éducatifs internationaux.",
    ],
    contentEn: [
      "This is a historic step that will remain engraved in the annals of the Bilingual School Complex Les Génies d'Afrique: the official granting of MINEDUB accreditation, issued by the Ministry of Basic Education of Cameroon.",
      "This precious recognition comes as the reward for months of hard work, rigorous preparation and unwavering commitment from the entire founding and teaching team.",
      "The ministerial inspection team that evaluated the school highlighted the quality of the infrastructure, the competence of the teaching staff, the richness of the educational project and compliance with official MINEDUB curricula in both linguistic sections.",
      "The founder, Mrs. Mbarga, stated: \"This accreditation is above all a recognition – of our values, our pedagogical vision and our commitment at the service of Cameroonian childhood. We are honoured and will continue to move forward.\"",
      "Looking ahead, the school aims to expand its facilities, introduce new science and IT workshops, and strengthen international educational partnerships.",
    ],
  },
  {
    id: "projets-agricoles",
    date: "Octobre 2025",
    category: "Pédagogie",
    categoryKey: "pedagogie",
    titleFr: "Lancement des projets agricoles et d'élevage",
    titleEn: "Launch of Farming and Livestock Projects",
    excerpt: "Les élèves du primaire ont lancé leurs premiers projets d'agriculture scolaire et d'élevage, découvrant la culture des légumes et l'élevage de volaille sur le terrain de l'école.",
    image: "/images/IMG-20260723-WA0013.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    gallery: [
      "/images/IMG-20260723-WA0013.jpg",
      "/images/IMG-20260723-WA0006.jpg",
      "/images/IMG-20260723-WA0017.jpg",
      "/images/IMG-20260723-WA0034.jpg",
    ],
    contentFr: [
      "Sous le soleil camerounais d'octobre, les élèves des classes du CP au CM2 ont investi le terrain attenant à l'école pour lancer leurs premiers projets agricoles et d'élevage, dans le cadre d'un programme pédagogique interdisciplinaire innovant.",
      "Chaque classe a adopté une parcelle de jardin et s'est vue confier la responsabilité de cultiver des légumes locaux : tomates, piments, gombos, salades vertes, et même quelques plantes aromatiques.",
      "Les élèves ont participé activement à toutes les étapes : préparation du sol, semis, arrosage régulier, surveillance des plantations. Ils ont bénéficié des conseils d'un expert agricole venu animer des ateliers pratiques.",
      "Parallèlement, un petit élevage de volaille a été mis en place dans un poulailler construit spécialement pour l'occasion. Les enfants découvrent ainsi le cycle de vie des poules, la collecte des œufs, et l'importance du bien-être animal.",
      "Cette initiative pédagogique poursuit plusieurs objectifs : développer le sens des responsabilités, transmettre des connaissances pratiques sur l'agriculture durable, sensibiliser à l'environnement, et renforcer le lien entre l'école et son territoire.",
    ],
    contentEn: [
      "Under the Cameroonian October sun, students from Class 1 through Class 6 invested the land adjacent to the school to launch their first farming and livestock projects, as part of an innovative interdisciplinary pedagogical programme.",
      "Each class adopted a garden plot and was entrusted with growing local vegetables: tomatoes, peppers, okra, green lettuce, and even some aromatic herbs.",
      "Students actively participated in every step: soil preparation, sowing, regular watering, and plantation monitoring. They benefited from the advice of an agricultural expert who came to lead practical workshops.",
      "At the same time, a small poultry farm was set up in a specially built chicken coop. Children thus discover the life cycle of hens, egg collection, and the importance of animal welfare.",
      "This pedagogical initiative pursues several objectives: developing a sense of responsibility, transmitting practical knowledge on sustainable agriculture, raising environmental awareness, and strengthening the link between the school and its territory.",
    ],
  },
  {
    id: "fete-noel-2025",
    date: "Décembre 2025",
    category: "Événements",
    categoryKey: "evenements",
    titleFr: "Fête de fin d'année : spectacle et remise de prix",
    titleEn: "End-of-Year Celebration: Show and Prize Giving",
    excerpt: "La première grande fête scolaire des Génies d'Afrique a réuni parents, élèves et enseignants pour une soirée inoubliable, couronnée par la remise des prix d'excellence.",
    image: "/images/IMG-20260723-WA0034.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    gallery: [
      "/images/IMG-20260723-WA0034.jpg",
      "/images/IMG-20260723-WA0006.jpg",
      "/images/IMG-20260723-WA0022.jpg",
      "/images/IMG-20260723-WA0017.jpg",
    ],
    contentFr: [
      "C'était une soirée magique, empreinte de joie, de musique et de partage, que celle de la fête de fin d'année 2025 du Complexe Scolaire Bilingue Les Génies d'Afrique.",
      "Les spectacles ont débuté par une procession d'ouverture haut en couleurs, où chaque classe a présenté une création artistique originale : chants de Noël bilingues, danses traditionnelles camerounaises, saynètes théâtrales, poèmes et chorégraphies modernes.",
      "Les parents, venus nombreux, ont pu admirer le travail de leurs enfants et applaudir leur prestation avec enthousiasme. Un moment particulièrement émouvant a été la chorale de l'école, interprétant « Joyeux Noël » en français, en anglais, puis dans plusieurs langues locales.",
      "La soirée s'est poursuivie par la cérémonie de remise des prix d'excellence. Les élèves les plus méritants de chaque niveau ont été récompensés pour leurs résultats académiques, leur assiduité et leur comportement exemplaire.",
      "La directrice a remercié l'ensemble de la communauté éducative : « Merci aux parents de leur confiance, aux enseignants de leur dévouement, et surtout à nos élèves d'être chaque jour la raison d'être de notre école. »",
    ],
    contentEn: [
      "It was a magical evening, filled with joy, music and togetherness – the 2025 end-of-year celebration of the Bilingual School Complex Les Génies d'Afrique.",
      "The performances began with a colourful opening procession, where each class presented an original artistic creation: bilingual Christmas carols, traditional Cameroonian dances, short plays, poems and modern choreographies.",
      "The many parents in attendance were able to admire their children's work and applaud their performance with enthusiasm. A particularly moving moment was the school choir performing \"Joyeux Noël\" in French, English, and then in several local languages.",
      "The evening continued with the excellence prize-giving ceremony. The most deserving students of each level were rewarded for their academic results, attendance and exemplary behaviour.",
      "The Principal thanked the entire educational community: \"Thank you to the parents for their trust, to the teachers for their dedication, and above all to our students for being every day the raison d'être of our school.\"",
    ],
  },
  {
    id: "inscriptions-2026",
    date: "Juillet 2026",
    category: "Admissions",
    categoryKey: "admissions",
    titleFr: "Inscriptions ouvertes pour l'année scolaire 2026-2027",
    titleEn: "Enrollment Open for the 2026-2027 School Year",
    excerpt: "Les inscriptions pour la rentrée de septembre 2026 sont officiellement ouvertes. Venez déposer votre dossier au secrétariat du lundi au vendredi de 8h à 13h.",
    image: "/images/IMG-20260723-WA0039.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    gallery: [
      "/images/IMG-20260723-WA0039.jpg",
      "/images/IMG-20260723-WA0024.jpg",
      "/images/IMG-20260723-WA0012.jpg",
      "/images/IMG-20260723-WA0022.jpg",
    ],
    contentFr: [
      "Bonne nouvelle pour toutes les familles souhaitant rejoindre l'aventure éducative des Génies d'Afrique : les inscriptions pour l'année scolaire 2026-2027 sont officiellement ouvertes depuis le début du mois de juillet.",
      "L'établissement accueille les enfants de 0 à 11 ans, répartis en quatre niveaux : la crèche (0–2 ans), la maternelle (2–5 ans) et le primaire (6–11 ans), avec deux sections parallèles : section francophone et section anglophone.",
      "Les dossiers d'inscription peuvent être retirés et déposés au secrétariat de l'école, du lundi au vendredi, de 8h00 à 13h00. Une visite des locaux et un entretien avec l'équipe de direction sont systématiquement proposés aux nouvelles familles.",
      "Attention : le nombre de places est limité par classe, afin de garantir un encadrement personnalisé et une qualité pédagogique optimale. Nous invitons les familles intéressées à se rapprocher rapidement de l'établissement.",
      "Pour faciliter vos démarches, vous pouvez également nous contacter par WhatsApp au 651 11 15 06 ou nous envoyer un message via notre formulaire de contact sur le site internet.",
    ],
    contentEn: [
      "Good news for all families wishing to join the educational adventure of Les Génies d'Afrique: enrollment for the 2026-2027 school year has been officially open since the beginning of July.",
      "The school welcomes children from 0 to 11 years old, divided into four levels: day care (0–2 years), nursery (2–5 years), and primary school (6–11 years), with two parallel sections: French section and English section.",
      "Enrolment files can be collected and submitted at the school secretariat, Monday to Friday, from 8:00 AM to 1:00 PM. A visit of the premises and an interview with the management team are systematically offered to new families.",
      "Please note: the number of places per class is limited, in order to guarantee personalised supervision and optimal pedagogical quality. We invite interested families to contact the school as soon as possible.",
      "To facilitate your application, you can also contact us via WhatsApp at 651 11 15 06 or send us a message through our contact form on the website.",
    ],
  },
  {
    id: "journee-sport",
    date: "Novembre 2025",
    category: "Sports",
    categoryKey: "sports",
    titleFr: "Journée sportive inter-classes : les champions sont désignés !",
    titleEn: "Inter-class Sports Day: Champions Are Crowned!",
    excerpt: "La première journée sportive de l'école a mobilisé tous les élèves autour de compétitions de football et d'athlétisme dans une ambiance festive et compétitive.",
    image: "/images/IMG-20260723-WA0017.jpg",
    galleryCount: 4,
    author: "Rédaction Les Génies d'Afrique",
    gallery: [
      "/images/IMG-20260723-WA0017.jpg",
      "/images/IMG-20260723-WA0006.jpg",
      "/images/IMG-20260723-WA0013.jpg",
      "/images/IMG-20260723-WA0034.jpg",
    ],
    contentFr: [
      "Le soleil de novembre a brillé sur le stade de l'école pour la première grande journée sportive inter-classes du Complexe Scolaire Bilingue Les Génies d'Afrique. Tous les élèves, de la maternelle au CM2, ont participé avec enthousiasme.",
      "Le matin était consacré aux épreuves d'athlétisme : courses de vitesse, relais, saut en longueur, lancer de balle. Chaque élève, portant les couleurs de sa classe, a donné le meilleur de lui-même sous les encouragements de ses camarades et des parents venus assister à l'événement.",
      "L'après-midi, place aux matchs de football ! Tournois par catégories, organisés selon l'âge des élèves. Les matchs se sont déroulés dans un excellent esprit, marqué par le fair-play et le respect de l'adversaire.",
      "La journée s'est achevée par une cérémonie de remise des récompenses. Trophées, médailles et diplômes ont été distribués aux équipes gagnantes et aux participants les plus méritants. Mais au-delà des résultats, c'est l'esprit d'équipe et la joie de partager un moment sportif qui ont gagné.",
      "Le responsable des sports, M. Ewane, a déclaré : « Le sport est un outil pédagogique essentiel. Il apprend la discipline, le respect des règles, la coopération et la gestion des émotions. Bravo à tous nos sportifs en herbe ! »",
    ],
    contentEn: [
      "The November sun shone on the school stadium for the first major inter-class sports day of the Bilingual School Complex Les Génies d'Afrique. All students, from nursery through primary school, participated with enthusiasm.",
      "The morning was devoted to athletics events: sprint races, relays, long jump, ball throwing. Each student, wearing their class colours, gave their very best under the encouragement of their classmates and parents who came to attend the event.",
      "In the afternoon, it was time for football matches! Tournaments by category, organised according to student age. Matches took place in excellent spirit, marked by fair play and respect for the opponent.",
      "The day ended with an awards ceremony. Trophies, medals and certificates were distributed to the winning teams and most deserving participants. But beyond the results, team spirit and the joy of sharing a sporting moment won out.",
      "The sports coordinator, Mr. Ewane, said: \"Sport is an essential pedagogical tool. It teaches discipline, respect for rules, cooperation and emotional management. Well done to all our budding athletes!\"",
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Événements: "bg-[#EEF2FF] text-[#1A3A8F]",
  Institutionnel: "bg-[#FFF0F0] text-[#D32F2F]",
  Pédagogie: "bg-[#F0FFF4] text-[#2E7D32]",
  Admissions: "bg-[#FFF8EE] text-[#F5A623]",
  Sports: "bg-[#F0F9FF] text-[#0284C7]",
};

export async function generateStaticParams() {
  const slugs = NEWS_FULL.map((article) => article.id);
  const params: { slug: string; locale: string }[] = [];
  for (const locale of ["fr", "en"]) {
    for (const slug of slugs) {
      params.push({ slug, locale });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = NEWS_FULL.find((a) => a.id === slug);

  const t = await getTranslations({ locale, namespace: "pageTitles.news" });

  if (!article) {
    return {
      title: t("title"),
      description: t("description"),
    };
  }

  const title = locale === "fr" ? article.titleFr : article.titleEn;
  return {
    title: title,
    description: article.excerpt,
    openGraph: {
      title,
      description: article.excerpt,
      images: [{ url: article.image, width: 1200, height: 630, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.excerpt,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = NEWS_FULL.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  const isFr = locale === "fr";
  const t = await getTranslations({ locale, namespace: "newsPage" });

  const related = NEWS_FULL.filter(
    (a) => a.id !== article.id && a.categoryKey === article.categoryKey
  ).slice(0, 3);
  const relatedFinal =
    related.length >= 2
      ? related
      : NEWS_FULL.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <PageHero
        title={isFr ? article.titleFr : article.titleEn}
        subtitle={isFr ? article.titleEn : article.titleFr}
        image={article.image}
        breadcrumbs={[
          { label: isFr ? "Accueil" : "Home", href: "/" },
          { label: isFr ? "Actualités" : "News", href: "/actualites" },
          {
            label:
              isFr ? article.category : article.category,
            href: `/actualites?cat=${article.categoryKey}`,
          },
          { label: isFr ? article.titleFr : article.titleEn },
        ]}
      />
      <ArticleDetailContent
        article={article}
        locale={locale}
        relatedArticles={relatedFinal}
        isFr={isFr}
      />
    </>
  );
}
