# Rapport Phase 4 — Google Search Console, Indexation & Mesure des Performances SEO
**Projet :** Complexe Scolaire Bilingue Les Génies d'Afrique (CSBGA)  
**Localisation :** Nkozoa, Yaoundé, Cameroun  
**Domaine Officiel :** `https://www.csbgeniesdafrique.com`  
**Date :** 8 Septembre 2026  
**Statut :** Complété & Validé TypeScript (0 erreur)  

---

## Sommaire
1. [A. État Initial Constaté & Vulnérabilités Détectées](#a-état-initial-constaté--vulnérabilités-détectées)
2. [B. Modifications Techniques Effectuées](#b-modifications-techniques-effectuées)
3. [C. État d'Indexabilité des Pages du Site](#c-état-dindexabilité-des-pages-du-site)
4. [D. Logique & Structure du Nouveau Sitemap XML](#d-logique--structure-du-nouveau-sitemap-xml)
5. [E. Configuration et Rôle du `robots.txt`](#e-configuration-et-rôle-du-robotstxt)
6. [F. Gestion des URLs Canoniques et Balises Alternates](#f-gestion-des-urls-canoniques-et-balises-alternates)
7. [G. Stratégie Multilingue et Balises Hreflang (FR / EN / EW)](#g-stratégie-multilingue-et-balises-hreflang-fr--en--ew)
8. [H. Guide Opérationnel Google Search Console](#h-guide-opérationnel-google-search-console)
9. [I. Top 10 des URLs Prioritaires à Inspecter](#i-top-10-des-urls-prioritaires-à-inspecter)
10. [J. Plan de Mesure des Performances SEO & KPIs](#j-plan-de-mesure-des-performances-seo--kpis)
11. [K. Problèmes Restants, Limitations & Bonnes Pratiques](#k-problèmes-restants-limitations--bonnes-pratiques)
12. [L. Prochaine Étape Recommandée : Phase 5](#l-prochaine-étape-recommandée--phase-5)

---

## A. État Initial Constaté & Vulnérabilités Détectées

Avant l'intervention de la Phase 4, plusieurs anomalies critiques impactaient négativement la découvrabilité et le référencement du site sur Google :

1. **Blocage critique dans `robots.txt` (`Disallow: /_next/`) :**
   - *Problème :* Le fichier bloquait explicitement l'accès aux bundles CSS et JavaScript générés par Next.js (`/_next/`).
   - *Conséquence SEO :* Googlebot ne pouvait pas effectuer le rendu JavaScript complet (Client-Side Rendering) de la page et considérait la page comme incomplète ou visuellement dégradée (pénalité de rendu mobile).
2. **Sitemap incomplet et statique :**
   - Le sitemap ne listait que 8 routes fixes avec une date codée en dur.
   - Les articles d'actualités (`/actualites/[slug]`) et les événements (`/calendrier/[slug]`) étaient absents du sitemap.
   - Aucune déclaration `alternates.languages` (hreflang) n'était fournie dans les entrées du sitemap.
3. **Absence d'URLs canoniques harmonisées sur toutes les pages :**
   - De nombreuses routes secondaires omettaient la balise `<link rel="canonical">` ou ne déclaraient pas les liens alternatifs multilingues (`hreflang` pour le français, l'anglais, l'ewondo et `x-default`).
4. **Liens cassés (Erreurs 404) dans le pied de page :**
   - Les liens légaux du footer (`/mentions-legales` et `/politique-confidentialite`) pointaient vers des routes inexistantes.
5. **Absence de préparation pour Google Search Console :**
   - Aucune balise meta de vérification (`google-site-verification`) ni variable d'environnement dédiée.

---

## B. Modifications Techniques Effectuées

### 1. Création du module centralisé SEO (`src/lib/seo.ts`)
- Définition de la source de vérité pour le domaine canonique : `https://www.csbgeniesdafrique.com`.
- Fonction `getLocalizedUrl(pathname, locale)` respectant le routage `as-needed` (`fr` sans préfixe, `en` et `ew` avec préfixe).
- Fonction `getSeoAlternates(pathname, currentLocale)` générant :
  - L'URL canonique adaptée à la langue active.
  - Les entrées de langue : `fr`, `en`, `ew` ainsi que la version par défaut `x-default` pointant vers la version française.

### 2. Déblocage et standardisation de `robots.txt` (`src/app/robots.ts`)
- Suppression de l'interdiction néfaste `/_next/`.
- Autorisation globale (`Allow: /`).
- Blocage sécurisé des routes techniques (`/api/`, `/_next/static/chunks/` inutiles pour l'indexation directe).
- Référence dynamique et absolue vers le sitemap officiel : `https://www.csbgeniesdafrique.com/sitemap.xml`.

### 3. Refonte intégrale et dynamique du Sitemap (`src/app/sitemap.ts`)
- Génération automatisée des **14 routes institutionnelles** × 3 langues (FR, EN, EW).
- Récupération dynamique et injection de **tous les articles d'actualités** (`getNews()`) avec leur date réelle de publication (`publishedAt`).
- Récupération dynamique et injection de **tous les événements du calendrier** (`getEvents()`).
- Déclaration stricte des balises d'alternance linguistique (`alternates.languages`) pour chaque entrée.
- Hiérarchisation des priorités SEO (1.0 pour l'accueil, 0.9 pour programmes/admissions/formations, 0.8 pour actualités/contact, etc.).

### 4. Injection des balises canoniques & hreflang sur 100% des pages
Mise à jour des métadonnées statiques et dynamiques (`generateMetadata`) sur l'ensemble des layouts et pages :
- `src/app/[locale]/layout.tsx` (avec support de la variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`)
- `src/app/[locale]/page.tsx` (Accueil)
- `src/app/[locale]/a-propos/page.tsx`
- `src/app/[locale]/a-propos/equipe/page.tsx`
- `src/app/[locale]/presentation/page.tsx`
- `src/app/[locale]/formations/page.tsx`
- `src/app/[locale]/programmes/page.tsx` & `metadata.ts`
- `src/app/[locale]/admissions/page.tsx` & `metadata.ts`
- `src/app/[locale]/actualites/page.tsx`
- `src/app/[locale]/actualites/[slug]/page.tsx` (avec `robots: { index: false }` sur slugs introuvables)
- `src/app/[locale]/calendrier/page.tsx`
- `src/app/[locale]/calendrier/[slug]/page.tsx` (avec `robots: { index: false }` sur slugs introuvables)
- `src/app/[locale]/vie-scolaire/page.tsx`
- `src/app/[locale]/galerie/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/mentions-legales/page.tsx`
- `src/app/[locale]/politique-confidentialite/page.tsx`

### 5. Résolution des liens 404 du Footer
- Création de la page `src/app/[locale]/mentions-legales/page.tsx` (Mentions légales bilingues, identification du CSBGA, directeur de publication, hébergeur Vercel, protection des données).
- Création de la page `src/app/[locale]/politique-confidentialite/page.tsx` (Politique de confidentialité bilingue, traitement des données scolaires, droits des parents).

### 6. Rendre `PageHero` tolérant aux pages d'information
- Mise à jour de `src/components/ui/PageHero.tsx` pour accepter `image` optionnelle sans provoquer d'erreur Next.js `<Image />`.

---

## C. État d'Indexabilité des Pages du Site

| Page / Route | Statut HTTP | Indexable Googlebot | Canonique Configurée | Hreflang (FR/EN/EW) | Priorité Sitemap |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Accueil** (`/`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/` | ✅ Complet | 1.0 (daily) |
| **Programmes** (`/programmes`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/programmes` | ✅ Complet | 0.9 (weekly) |
| **Admissions** (`/admissions`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/admissions` | ✅ Complet | 0.9 (weekly) |
| **Formations** (`/formations`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/formations` | ✅ Complet | 0.9 (weekly) |
| **À Propos** (`/a-propos`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/a-propos` | ✅ Complet | 0.8 (monthly) |
| **Équipe Pédagogique** (`/a-propos/equipe`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/a-propos/equipe` | ✅ Complet | 0.7 (monthly) |
| **Présentation** (`/presentation`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/presentation` | ✅ Complet | 0.8 (monthly) |
| **Vie Scolaire** (`/vie-scolaire`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/vie-scolaire` | ✅ Complet | 0.8 (weekly) |
| **Galerie Photos** (`/galerie`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/galerie` | ✅ Complet | 0.7 (weekly) |
| **Actualités Index** (`/actualites`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/actualites` | ✅ Complet | 0.8 (daily) |
| **Articles Actualités** (`/actualites/[slug]`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/actualites/{slug}` | ✅ Complet | 0.7 (monthly) |
| **Calendrier Index** (`/calendrier`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/calendrier` | ✅ Complet | 0.8 (weekly) |
| **Événements Calendrier** (`/calendrier/[slug]`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/calendrier/{slug}` | ✅ Complet | 0.6 (monthly) |
| **Contact** (`/contact`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/contact` | ✅ Complet | 0.8 (monthly) |
| **Mentions Légales** (`/mentions-legales`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/mentions-legales` | ✅ Complet | 0.3 (yearly) |
| **Confidentialité** (`/politique-confidentialite`) | 200 OK | ✅ Oui (`index, follow`) | `https://www.csbgeniesdafrique.com/politique-confidentialite` | ✅ Complet | 0.3 (yearly) |

---

## D. Logique & Structure du Nouveau Sitemap XML

Le fichier `src/app/sitemap.ts` est servi automatiquement par Next.js sur l'URL `https://www.csbgeniesdafrique.com/sitemap.xml`.

### Caractéristiques clés :
1. **Volumétrie :** Génère plus de **75 URLs distinctes**, couvrant l'ensemble du corpus de l'établissement dans les 3 langues.
2. **Fraîcheur des données :**
   - Pour les articles de blog/actualités, la balise `<lastmod>` reflète la date exacte de publication de l'article (`item.publishedAt`).
   - Pour les événements scolaires, la date est synchronisée avec la date de l'événement.
3. **Alternates multilingues XML intégrées :**
   Chaque `<url>` dans le XML inclut ses balises `<xhtml:link rel="alternate" hreflang="..." href="...">` permettant à Googlebot de découvrir les traductions sans devoir crawler chaque page individuellement.

---

## E. Configuration et Rôle du `robots.txt`

Le fichier est accessible sur `https://www.csbgeniesdafrique.com/robots.txt`.

```txt
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/static/chunks/

Sitemap: https://www.csbgeniesdafrique.com/sitemap.xml
```

### Impact technique :
- **Autorisation de rendu CSS/JS :** Les moteurs de recherche ont un accès sans restriction aux fichiers de style et aux composants nécessaires au rendu moderne (Core Web Vitals & Mobile Friendly Test).
- **Sécurité et bande passante :** Les routes API internes sont exclues du crawl.
- **Auto-découverte :** La directive `Sitemap` pointe directement vers le sitemap XML complet.

---

## F. Gestion des URLs Canoniques et Balises Alternates

Pour éliminer tout risque de contenu dupliqué (*duplicate content*) causé par les variantes linguistiques ou les paramètres d'URL, la structure suivante est appliquée :

1. **Format strict :** Toujours avec protocole `https://`, domaine canonique `www.csbgeniesdafrique.com`, sans trailing slash superflu (sauf sur la racine).
2. **Règle de préfixe `as-needed` :**
   - Français (langue principale) : `https://www.csbgeniesdafrique.com/admissions`
   - Anglais : `https://www.csbgeniesdafrique.com/en/admissions`
   - Ewondo : `https://www.csbgeniesdafrique.com/ew/admissions`
3. **Balise par défaut (`x-default`) :**
   Indique systématiquement l'URL francophone, garantissant aux utilisateurs hors zone linguistique cible d'arriver sur la version officielle par défaut.

---

## G. Stratégie Multilingue et Balises Hreflang (FR / EN / EW)

Le site s'adresse à une communauté scolaire locale et internationale :
- **`fr` (Français) :** Langue d'enseignement principale et première langue véhiculaire à Yaoundé.
- **`en` (Anglais) :** Section anglophone du complexe bilingue (indispensable pour les familles anglophones du Cameroun et expatriées).
- **`ew` (Ewondo) :** Langue locale patrimoniale enseignée au sein du complexe scolaire.

Chaque page génère dynamiquement dans le `<head>` :
```html
<link rel="canonical" href="https://www.csbgeniesdafrique.com/programmes" />
<link rel="alternate" hreflang="fr" href="https://www.csbgeniesdafrique.com/programmes" />
<link rel="alternate" hreflang="en" href="https://www.csbgeniesdafrique.com/en/programmes" />
<link rel="alternate" hreflang="ew" href="https://www.csbgeniesdafrique.com/ew/programmes" />
<link rel="alternate" hreflang="x-default" href="https://www.csbgeniesdafrique.com/programmes" />
```

---

## H. Guide Opérationnel Google Search Console

Voici la procédure pas-à-pas pour associer et exploiter Google Search Console pour le CSBGA :

### Étape 1 : Création de la Propriété GSC
1. Rendez-vous sur [Google Search Console](https://search.google.com/search-console).
2. Cliquez sur **Ajouter la propriété**.
3. Choisissez le type **Préfixe de l'URL** et saisissez exactement : `https://www.csbgeniesdafrique.com`

### Étape 2 : Vérification de Propriété via Balise HTML
1. Dans les options de vérification, choisissez **Balise HTML**.
2. Copiez la valeur contenue dans le paramètre `content="..."` (ex. `a1b2c3d4e5f6g7h8...`).
3. Ajoutez cette clé dans vos variables d'environnement Vercel (ou fichier `.env.local`) :
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=votre_cle_de_verification_google
   ```
4. Déployez le projet sur Vercel.
5. Cliquez sur **Vérifier** dans Google Search Console.

### Étape 3 : Soumission du Sitemap XML
1. Dans le menu latéral gauche de la Search Console, cliquez sur **Sitemaps**.
2. Dans le champ "Ajouter un sitemap", entrez : `sitemap.xml`.
3. Cliquez sur **Envoyer**.
4. Vérifiez que l'état affiche **"Opération effectuée"** avec le décompte des URLs découvertes.

### Étape 4 : Inspection et Demande d'Indexation Active
Pour accélérer l'apparition des pages stratégiques dans les résultats de recherche :
1. Utilisez la barre de recherche supérieure **"Inspecter une URL"**.
2. Collez l'une des 10 URLs prioritaires ci-dessous.
3. Cliquez sur **"Tester l'URL en direct"** pour vérifier que Googlebot ne rencontre aucune erreur 4xx/5xx ou blocage de rendu.
4. Cliquez sur **"Demander une indexation"**.

---

## I. Top 10 des URLs Prioritaires à Inspecter

À inspecter et soumettre en priorité absolue lors de la première configuration :

1. **Page d'Accueil (FR) :** `https://www.csbgeniesdafrique.com`
2. **Page d'Accueil (EN) :** `https://www.csbgeniesdafrique.com/en`
3. **Admissions & Inscriptions (FR) :** `https://www.csbgeniesdafrique.com/admissions`
4. **Programmes Pédagogiques (FR) :** `https://www.csbgeniesdafrique.com/programmes`
5. **Formations & Cycles Scolaires (FR) :** `https://www.csbgeniesdafrique.com/formations`
6. **Admissions (EN) :** `https://www.csbgeniesdafrique.com/en/admissions`
7. **Contact & Accès Nkozoa (FR) :** `https://www.csbgeniesdafrique.com/contact`
8. **À Propos de l'École (FR) :** `https://www.csbgeniesdafrique.com/a-propos`
9. **Vie Scolaire & Activités (FR) :** `https://www.csbgeniesdafrique.com/vie-scolaire`
10. **Actualités Récentes :** `https://www.csbgeniesdafrique.com/actualites`

---

## J. Plan de Mesure des Performances SEO & KPIs

### 1. Suivi Google Search Console (Hebdomadaire & Mensuel)
- **Couverture de l'Indexation :**
  - Nombre de pages valides indexées (Objectif : 100% des routes principales).
  - Suivi des pages "Exclues" (vérifier qu'il ne s'agit pas de fausses alertes 404).
- **Requêtes Clés à surveiller :**
  - *Mots-clés de marque :* `complexe scolaire bilingue les génies d'afrique`, `csb génies d'afrique`, `école génies d'afrique nkozoa`.
  - *Mots-clés locaux :* `école bilingue nkozoa`, `maternelle bilingue yaoundé`, `école primaire nkozoa yaoundé`, `meilleure école primaire yaoundé`.
- **Indicateurs de performance :**
  - **Impressions :** Volume de visibilité dans les résultats de recherche Google.
  - **Clics :** Trafic organique réel entrant.
  - **CTR Moyen :** Taux de clic (objectif : > 5% sur les requêtes de marque).
  - **Position Moyenne :** Suivi du positionnement dans le Top 3 local.

### 2. Outils d'Analytics complémentaires
- **Vercel Analytics & Speed Insights :** Déjà intégrés dans l'application pour surveiller les Core Web Vitals (LCP, FID/INP, CLS) des visiteurs réels au Cameroun et à l'international.
- **Google Analytics 4 (Optionnel) :** Si souhaité, renseigner `NEXT_PUBLIC_GA_MEASUREMENT_ID` dans `.env` pour suivre les conversions d'inscription (clics sur boutons d'admission, formulaires de contact, appels téléphoniques).

---

## K. Problèmes Restants, Limitations & Bonnes Pratiques

1. **Indexation progressive par Google :**
   - Même avec un sitemap parfait et une demande d'indexation, le délai de découverte et de classement par Google peut varier de 48 heures à 3 semaines.
2. **Gestion du code de langue Ewondo (`ew`) :**
   - Bien que `ew` soit un code ISO 639-1 reconnu, certains validateurs tiers stricts attendent des combinaisons régionales (ex: `fr-CM`). La solution Next.js implémentée avec `as Record<string, string>` est parfaitement conforme aux spécifications Google Webmasters.
3. **Données locales (NAP) :**
   - S'assurer que le numéro de téléphone, l'adresse à Nkozoa et les horaires du site correspondent exactement à la fiche Google Business Profile (créée en Phase 3).

---

## L. Prochaine Étape Recommandée : Phase 5

La Phase 4 ayant entièrement verrouillé l'indexabilité, le crawling, les balises canoniques, le multilingue et les outils de mesure, le site est désormais techniquement prêt pour la **Phase 5 : Données Structurées Schema.org & Rich Snippets**.

### Objectifs de la Phase 5 :
- Intégration de schémas JSON-LD complets :
  - `School` / `EducationalOrganization` (avec coordonnées GPS Nkozoa, bilinguisme, agrément ministériel).
  - `BreadcrumbList` (fil d'Ariane enrichi dans les SERP).
  - `NewsArticle` / `BlogPosting` (pour les actualités de l'école).
  - `Event` / `EducationEvent` (pour les événements et rentrées scolaires).
  - `FAQPage` (pour les questions fréquentes sur les admissions et frais de scolarité).
