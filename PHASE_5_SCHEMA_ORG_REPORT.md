# Rapport Phase 5 — Données Structurées Schema.org & Compréhension Sémantique
**Projet :** Complexe Scolaire Bilingue Les Génies d'Afrique (CSBGA)  
**Localisation :** Nkozoa, Yaoundé, Cameroun  
**Domaine Officiel :** `https://www.csbgeniesdafrique.com`  
**Date :** 8 Septembre 2026  
**Statut :** Complété & Validé TypeScript (0 erreur)  

---

## Sommaire
1. [A. État Initial des Données Structurées & Audit](#a-état-initial-des-données-structurées--audit)
2. [B. Entité Principale & Schéma Retenu pour l'Établissement](#b-entité-principale--schéma-retenu-pour-létablissement)
3. [C. Tableau Synthétique des Schémas par Page](#c-tableau-synthétique-des-schémas-par-page)
4. [D. Propriétés d'Identité de l'École](#d-propriétés-didentité-de-lécole)
5. [E. Architecture des Relations Sémantiques](#e-architecture-des-relations-sémantiques)
6. [F. Prise en Compte du Multilingue (FR / EN / EW)](#f-prise-en-compte-du-multilingue-fr--en--ew)
7. [G. Validation Syntaxique & Tests Effectués](#g-validation-syntaxique--tests-effectués)
8. [H. Données Manquantes & Limites Réelles](#h-données-manquantes--limites-réelles)
9. [I. Recommandations Post-Déploiement & Rich Results](#i-recommandations-post-déploiement--rich-results)
10. [J. Prochaine Phase Recommandée (Phase 6)](#j-prochaine-phase-recommandée-phase-6)

---

## A. État Initial des Données Structurées & Audit

Avant notre intervention, un audit complet du codebase a révélé :
1. **Logo erroné :** La propriété `logo` pointait vers `"/images/logo.png"`, un chemin inexistant. Le véritable logo officiel haute définition est situé à `"/logo/logo.png"`.
2. **Identifiant `@id` instable :** L'`@id` changeait selon la langue courante (`https://www.csbgeniesdafrique.com/en#school` vs `.../fr#school`), ce qui créait des entités concurrentes pour Google au lieu d'une entité unique consolidée.
3. **Absence du schéma `WebSite` :** Le site n'était pas formellement déclaré comme un `WebSite` relié à l'organisation éditrice (`publisher: { "@id": "...#school" }`).
4. **Absence de schémas `BreadcrumbList` :** Malgré la présence de fils d'Ariane visuels sur toutes les sous-pages via le composant `PageHero`, aucun balisage sémantique n'était transmis aux moteurs de recherche.
5. **Absence de `NewsArticle` :** Les articles d'actualités et publications institutionnelles (`/actualites/[slug]`) ne contenaient aucun schéma d'article structuré.
6. **Absence de `EducationEvent` :** Les événements du calendrier scolaire (`/calendrier/[slug]`) manquaient de balisage d'événement pour l'agenda Google.
7. **Politique FAQ :** Le site ne disposant pas d'une section FAQ statique visible dans le DOM d'une page (les questions/réponses étant réservées au moteur de recherche interne et au chatbot), aucun schéma artificiel `FAQPage` n'a été injecté, garantissant une stricte conformité avec les consignes de qualité Google Search Essentials.

---

## B. Entité Principale & Schéma Retenu pour l'Établissement

### Type Schema.org Retenu : `["School", "EducationalOrganization"]`

```json
{
  "@context": "https://schema.org",
  "@type": ["School", "EducationalOrganization"],
  "@id": "https://www.csbgeniesdafrique.com/#school"
}
```

### Justification :
- `School` est le type le plus précis et le plus pertinent pour un établissement d'enseignement maternel et primaire.
- L'ajout d'`EducationalOrganization` renforce la sémantique institutionnelle et l'autorité éducative reconnue par le Ministère de l'Éducation de Base (MINEDUB) du Cameroun.
- L'utilisation d'un `@id` stable et unique (`https://www.csbgeniesdafrique.com/#school`) permet à tous les autres schémas (`WebSite`, `NewsArticle`, `EducationEvent`, `BreadcrumbList`) de faire référence à la même entité sans duplication.

---

## C. Tableau Synthétique des Schémas par Page

| Page / Route | Types Schema.org Implémentés | Statut | Justification |
| :--- | :--- | :---: | :--- |
| **Global (Toutes pages via Layout)** | `School`, `EducationalOrganization`, `WebSite` | ✅ Implémenté | Établit l'identité de l'école et la propriété du site web officiel. |
| **Accueil** (`/`, `/en`, `/ew`) | `School`, `WebSite` | ✅ Implémenté | Page principale d'entrée de l'établissement. |
| **À Propos** (`/a-propos`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → À Propos. |
| **Équipe Pédagogique** (`/a-propos/equipe`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → À Propos → Équipe pédagogique. |
| **Programmes** (`/programmes`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Programmes scolaires (Crèche, Maternelle, Primaire). |
| **Formations** (`/formations`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Formations & Cycles. |
| **Admissions** (`/admissions`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Inscriptions & Admissions. |
| **Vie Scolaire** (`/vie-scolaire`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Vie Scolaire & Activités. |
| **Galerie** (`/galerie`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Galerie Photos. |
| **Actualités (Index)** (`/actualites`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Actualités. |
| **Article d'Actualité** (`/actualites/[slug]`) | `NewsArticle`, `BreadcrumbList` | ✅ Implémenté | Titre, extrait, image, date de publication, auteur, éditeur (`School`). |
| **Calendrier (Index)** (`/calendrier`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Calendrier. |
| **Événement Scolaire** (`/calendrier/[slug]`) | `EducationEvent`, `BreadcrumbList` | ✅ Implémenté | Titre, description, dates, statut, lieu (Nkozoa), organisateur (`School`). |
| **Contact** (`/contact`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Contact (données NAP fournies par `School`). |
| **Mentions Légales** (`/mentions-legales`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Mentions Légales. |
| **Confidentialité** (`/politique-confidentialite`) | `BreadcrumbList` | ✅ Implémenté | Fil d'Ariane : Accueil → Politique de Confidentialité. |

---

## D. Propriétés d'Identité de l'École

Toutes les propriétés proviennent des données réelles de l'établissement sans aucune invention :

- **`name` :** Complexe Scolaire Bilingue Les Génies d'Afrique
- **`legalName` :** Complexe Scolaire Bilingue Les Génies d'Afrique
- **`alternateName` :** `["CSB Génies d'Afrique", "Les Génies d'Afrique"]`
- **`url` :** `https://www.csbgeniesdafrique.com`
- **`logo` :** `https://www.csbgeniesdafrique.com/logo/logo.png`
- **`image` :** Images réelles des infrastructures scolaires (`IMG-20260723-WA0006.jpg`, `IMG-20260723-WA0046.jpg`, etc.)
- **`address` (`PostalAddress`) :**
  - `streetAddress` : "Nkozoa, derrière la Boulangerie Massa"
  - `addressLocality` : "Yaoundé"
  - `addressRegion` : "Centre"
  - `addressCountry` : "CM"
- **`geo` (`GeoCoordinates`) :**
  - `latitude` : 3.8520
  - `longitude` : 11.5090
- **`hasMap` :** `https://maps.app.goo.gl/b6r6PyYzXz8Meeoh6`
- **`telephone` :** `["+237651111506", "+237656663848"]`
- **`email` :** `lesgeniesdafrique836@gmail.com`
- **`openingHoursSpecification` :** Lundi au Vendredi, 07h30 – 16h00
- **`sameAs` :**
  - `https://facebook.com/geniesdafrique`
  - `https://instagram.com/geniesdafrique`
  - `https://wa.me/237651111506`
- **`foundingDate` :** "2024"
- **`knowsLanguage` :** `["fr", "en"]` (Établissement bilingue agréé)
- **`areaServed` :** "Yaoundé, Nkozoa, Soa et région du Centre"

---

## E. Architecture des Relations Sémantiques

Les entités sont interconnectées via leurs identifiants canoniques stables :

```
[ School / EducationalOrganization ] (@id: .../#school)
       ▲                        ▲
       │ publisher              │ organizer / publisher
[ WebSite ] (@id: .../#website)  ├─ [ NewsArticle ] (@id: .../actualites/slug#article)
       │                        └─ [ EducationEvent ] (@id: .../calendrier/slug#event)
       ▼ hasPart
[ WebPage / BreadcrumbList ]
```

---

## F. Prise en Compte du Multilingue (FR / EN / EW)

Le module `src/lib/schema.ts` s'adapte automatiquement à la langue active (`fr`, `en`, `ew`) :
- **Noms et descriptions :** Traduits selon la locale (`SITE_INFO.name[locale]`, `article.title[locale]`, `event.title[locale]`).
- **`inLanguage` :** Renseigné avec la langue de la page courante (`"fr"`, `"en"` ou `"ew"`).
- **URLs absolues :** Localisées (`/en/actualites/...`, `/actualites/...`).
- **Fils d'Ariane (`BreadcrumbList`) :** Les libellés visibles traduits (ex. "Home" vs "Accueil") sont fidèlement reflétés dans les nœuds JSON-LD correspondants.

---

## G. Validation Syntaxique & Tests Effectués

1. **Compilation TypeScript :** `npx tsc --noEmit` exécuté avec succès (**0 erreur**).
2. **Nettoyage JSON-LD :** Utilitaire `cleanJsonLd()` garantissant l'absence de valeurs `undefined`, `null` ou chaînes vides.
3. **Sécurité SSR / Hydratation :** Les scripts JSON-LD utilisent `dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}` côté serveur, sans impact sur le cycle d'hydratation client.
4. **Validité Schema.org :** Tous les types utilisés (`School`, `EducationalOrganization`, `WebSite`, `BreadcrumbList`, `NewsArticle`, `EducationEvent`, `PostalAddress`, `GeoCoordinates`, `ImageObject`) sont conformes aux spécifications officielles de Schema.org et aux directives Google Search Central.

---

## H. Données Manquantes & Limites Réelles

1. **Section FAQ dédiée :** Le site dispose d'une base FAQ utilisée par le moteur de recherche et le chatbot, mais ne présente pas de bloc FAQ statique sur ses pages. Si une page FAQ dédiée est créée ultérieurement, le schéma `FAQPage` pourra être activé.
2. **Organigramme enseignant individuel :** Les membres de l'équipe pédagogique sont présentés collectivement sur `/a-propos/equipe`. L'ajout de profils détaillés avec `Person` pourra être envisagé si des biographies académiques complètes sont publiées.
3. **Absence de garantie de Rich Results :** L'implémentation de Schema.org permet à Google de comprendre parfaitement le site et le rend éligible aux extraits enrichis (fils d'Ariane, carrousels d'actualités, événements), mais l'affichage effectif dépend de l'algorithme de Google et de l'historique du domaine.

---

## I. Recommandations Post-Déploiement & Rich Results

1. **Test des Résultats Enrichis Google :**  
   Tester l'accueil et les pages d'actualités sur le [Google Rich Results Test](https://search.google.com/test/rich-results).
2. **Vérification Schema.org Validator :**  
   Tester l'URL sur le [Validateur de balisage de schéma](https://validator.schema.org/).
3. **Surveillance Search Console :**  
   Consulter le rapport **"Résultats enrichis"** dans Google Search Console pour vérifier la prise en compte des `Fils d'Ariane` et des `Événements`.

---

## J. Prochaine Phase Recommandée (Phase 6)

La Phase 5 ayant complètement structuré la sémantique de l'établissement, la prochaine étape stratégique est :

**Phase 6 — Autorité, backlinks, réputation, contenu éditorial et stratégie de croissance SEO.**
- Développement de l'autorité de domaine (E-E-A-T) pour l'enseignement privé au Cameroun.
- Stratégie d'acquisition de liens locaux de qualité (annuaires éducatifs camerounais, partenaires institutionnels).
- Calendrier éditorial pour renforcer le positionnement sur les requêtes clés des parents d'élèves.
