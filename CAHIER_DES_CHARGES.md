# CAHIER DES CHARGES — SITE WEB
# Complexe Scolaire Bilingue Les Génies d'Afrique (CSB-LGA)
# Bilingual School Complex "Les Génies d'Afrique" (BSC-LGA)

**Version :** 1.0  
**Date :** Juillet 2026  
**Statut :** Document opérationnel — prêt pour développement  
**Destinataire :** Développeur / Agence web  

---

## TABLE DES MATIÈRES

1. [Présentation générale](#1-présentation-générale)
2. [Arborescence du site](#2-arborescence-du-site)
3. [Maquette navigation](#3-maquette-navigation)
4. [Design system](#4-design-system)
5. [Page d'accueil](#5-page-daccueil)
6. [Pages intérieures](#6-pages-intérieures)
7. [Responsive & performances](#7-responsive--performances)
8. [Contenu éditorial](#8-contenu-éditorial)
9. [Annexes](#9-annexes)

---

## 1. PRÉSENTATION GÉNÉRALE

### 1.1 Identité de l'établissement

| Champ | Information |
|---|---|
| **Nom officiel (FR)** | Complexe Scolaire Bilingue Les Génies d'Afrique |
| **Nom officiel (EN)** | Bilingual School Complex "Les Génies d'Afrique" |
| **Sigle** | CSB-LGA / BSC-LGA |
| **Localisation** | Nkozoa, derrière la Boulangerie Massa — Yaoundé, Cameroun |
| **Agrément** | Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP du 14 février 2025 |
| **Téléphones** | 651 11 15 06 / 656 66 38 48 |
| **Email** | lesgeniesdafrique@836gmail.com |
| **Réseaux sociaux** | Facebook : Complexe scolaire bilingue les génies d'Afrique / TikTok : Les génies d'Afrique |
| **Slogan (FR)** | « Former aujourd'hui les leaders de demain » |
| **Slogan (EN)** | "Shaping today's leaders for tomorrow" |
| **Devise** | Travail – Discipline – Succès / Work – Discipline – Success |
| **Mission** | Pour le Développement des Talents / For the Development of Talents |


### 1.2 Objectif du site

Créer une **vitrine numérique premium** qui positionne le CSB Les Génies d'Afrique comme l'établissement bilingue de référence à Nkozoa/Yaoundé. Le site doit :

- Inspirer immédiatement confiance aux parents dès la première visite
- Valoriser l'offre pédagogique bilingue (sections francophone et anglophone)
- Faciliter les démarches d'inscription en ligne
- Mettre en avant les atouts distinctifs de l'école (agriculture, élevage, pisciculture, projets entrepreneuriaux, cadre sécurisé)
- Servir de hub de communication avec la communauté scolaire (parents, enseignants, partenaires)
- Assurer une présence digitale professionnelle comparable aux meilleures écoles internationales d'Afrique

### 1.3 Public cible

**Cible primaire :**
- Parents d'élèves résidant à Nkozoa, Yaoundé et environs, cherchant un établissement bilingue de qualité pour leurs enfants (de la crèche au CM2)
- Parents francophones et anglophones, sensibles à la qualité de l'encadrement, à la sécurité et au développement global de l'enfant

**Cible secondaire :**
- Enseignants et candidats à un poste dans l'établissement
- Partenaires institutionnels (MINEDUB, ONG, organisations éducatives)
- Donateurs et investisseurs potentiels dans l'éducation privée au Cameroun
- Médias et journalistes couvrant l'éducation au Cameroun

### 1.4 Ton éditorial

| Dimension | Description |
|---|---|
| **Registre** | Professionnel, chaleureux, inspirant — ni trop formel ni familier |
| **Voix** | Celle d'une institution sérieuse qui met l'enfant au centre |
| **Émotion** | Confiance, fierté, appartenance, aspiration |
| **Bilinguisme** | Chaque page et section en français ET en anglais, avec bascule fluide |
| **Évitement** | Jargon administratif froid, formulations vagues, contenu non factuel |

### 1.5 Niveaux scolaires couverts

| Niveau (FR) | Niveau (EN) | Tranche d'âge |
|---|---|---|
| Crèche | Day Care | 0 – 2 ans |
| Maternelle (Pré-nursery / Nursery) | Pre-Nursery / Nursery | 2 – 5 ans |
| Primaire Section Francophone | Primary French Section | 6 – 12 ans |
| Primaire Section Anglophone | Primary English Section | 6 – 12 ans |


---

## 2. ARBORESCENCE DU SITE

### 2.1 Structure générale

```
/                           → Accueil / Home
├── /presentation           → L'École / The School
│   ├── /mot-du-directeur   → Mot du Directeur / Director's Message
│   ├── /histoire           → Notre Histoire / Our History
│   ├── /valeurs            → Nos Valeurs / Our Values
│   └── /equipe             → Notre Équipe / Our Team
├── /programmes             → Programmes / Programs
│   ├── /creche             → Crèche / Day Care
│   ├── /maternelle         → Maternelle / Nursery
│   ├── /primaire-fr        → Primaire Francophone / French Primary
│   ├── /primaire-en        → Primaire Anglophone / English Primary
│   └── /activites          → Activités Périscolaires / Extracurricular
├── /admissions             → Admissions / Admissions
│   ├── /procedure          → Procédure / Procedure
│   ├── /frais              → Frais de Scolarité / Tuition Fees
│   ├── /dossier            → Constitution du Dossier / Requirements
│   └── /inscription        → Formulaire d'Inscription / Enroll Now
├── /vie-scolaire           → Vie Scolaire / School Life
│   ├── /galerie            → Galerie Photos & Vidéos / Gallery
│   ├── /agenda             → Agenda / Calendar
│   └── /projets            → Projets Pédagogiques / Projects
├── /actualites             → Actualités / News & Blog
│   └── /[slug]             → Article individuel / Single post
├── /temoignages            → Témoignages / Testimonials
├── /espace-parents         → Espace Parents / Parents' Portal
│   ├── /connexion          → Connexion / Login
│   └── /tableau-de-bord    → Tableau de bord / Dashboard
└── /contact                → Contact / Contact Us
```

### 2.2 Pages statiques additionnelles

```
/mentions-legales           → Mentions Légales / Legal Notice
/politique-confidentialite  → Politique de Confidentialité / Privacy Policy
/plan-du-site               → Plan du Site / Sitemap
/404                        → Page erreur personnalisée
```

### 2.3 Priorités de développement (phases)

| Phase | Pages | Priorité |
|---|---|---|
| Phase 1 (MVP) | Accueil, Présentation, Programmes, Admissions, Contact | Critique |
| Phase 2 | Actualités, Galerie, Témoignages, Vie Scolaire | Haute |
| Phase 3 | Espace Parents (portail sécurisé), Blog, Agenda | Moyenne |


---

## 3. MAQUETTE NAVIGATION

### 3.1 En-tête (Header)

**Structure desktop (≥ 1024px) :**
```
[LOGO CSB-LGA]   [Nav principale]                    [Sélecteur langue FR|EN]  [CTA : S'inscrire]
                  Accueil | L'École | Programmes | Admissions | Vie Scolaire | Actualités | Contact
```

**Comportement du header :**
- Position : `sticky` — le header reste visible au défilement
- Au scroll > 80px : fond blanc avec ombre douce (`box-shadow: 0 2px 20px rgba(0,0,0,0.08)`), transition 0.3s
- État initial sur page d'accueil : transparent avec texte blanc (sur hero plein écran)
- Logo : SVG ou PNG haute résolution, hauteur 56px en état sticky, 72px en état transparent
- Sélecteur de langue : bouton pill `FR | EN` — changement instantané sans rechargement de page (i18n)
- CTA principal : bouton rouge `S'inscrire maintenant / Enroll Now` — radius 8px, toujours visible

**Navigation principale :**
- 7 items maximum en desktop
- Dropdown au survol pour les sous-menus (délai 150ms, animation fadeIn 200ms)
- Item actif : soulignement rouge animé (largeur 0→100%, 300ms)
- Typographie : 500 weight, 15px, letterspacing 0.3px

**Barre d'urgence (optionnelle — période d'inscription) :**
```
Bandeau rouge en haut du header :
FR : "📢 Les inscriptions sont ouvertes — Du lundi au vendredi 8h–13h"
EN : "📢 Enrollment is now open — Monday to Friday 8AM–1PM"
```

### 3.2 Navigation mobile (< 768px)

- Hamburger icon (3 barres → X animé) en haut à droite
- Menu en tiroir latéral (drawer) depuis la gauche, largeur 85% de l'écran
- Logo visible en haut du drawer
- Sous-menus : accordéon avec chevron animé
- Footer du drawer : coordonnées téléphoniques + icônes réseaux sociaux
- Overlay semi-transparent derrière le drawer (click pour fermer)

### 3.3 Pied de page (Footer)

**Structure en 4 colonnes (desktop) / 2 colonnes (tablette) / 1 colonne (mobile) :**

```
COL 1 — Identité                COL 2 — Navigation rapide       COL 3 — Contact              COL 4 — Réseaux & Infos
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
[Logo blanc]                    L'École                         📍 Nkozoa, derrière          [Facebook]
Complexe Scolaire Bilingue      Programmes                         la Boulangerie Massa        [TikTok]
Les Génies d'Afrique            Admissions                         Yaoundé, Cameroun           [WhatsApp]
"Former aujourd'hui les         Vie Scolaire                    📞 651 11 15 06
leaders de demain"              Actualités                      📞 656 66 38 48              Horaires d'inscription :
                                Contact                         ✉ lesgeniesdafrique         Lun–Ven 8h00–13h00
                                Mentions légales                  @836gmail.com
```

**Bande de copyright :**
```
© 2026 Complexe Scolaire Bilingue Les Génies d'Afrique — Tous droits réservés | Mentions légales | Politique de confidentialité
```

- Fond footer : Bleu marine profond (`#1A237E`)
- Texte : blanc avec opacité 0.85 pour les sous-textes
- Séparateur : ligne de 1px rouge (`#D32F2F`) entre le footer principal et la bande copyright

### 3.4 Parcours utilisateurs types

**Parcours 1 — Parent souhaitant inscrire son enfant :**
```
Accueil → Section "Pourquoi nous choisir" → Programmes → Admissions (Frais + Dossier) → Formulaire d'inscription → Page de confirmation
```

**Parcours 2 — Parent découvrant l'école :**
```
Accueil → Présentation (Histoire + Valeurs) → Galerie Photos → Témoignages → Contact
```

**Parcours 3 — Partenaire institutionnel :**
```
Accueil → L'École (Agrément + Mission) → Programmes → Contact (formulaire partenariat)
```

**Parcours 4 — Navigation rapide depuis mobile :**
```
Header mobile → Menu tiroir → Admissions → Frais de scolarité → Bouton WhatsApp flottant
```


---

## 4. DESIGN SYSTEM

### 4.1 Palette de couleurs

#### Couleurs primaires

| Rôle | Nom | Code Hexadécimal | Usage principal |
|---|---|---|---|
| **Bleu Principal** | Navy Royal | `#1A3A8F` | Header, titres majeurs, arrière-plans de sections |
| **Bleu Foncé** | Navy Profond | `#0D1F6B` | Footer, hover states, dégradés |
| **Bleu Clair** | Bleu Ciel | `#2D5BE3` | Liens, accents interactifs, badges |
| **Rouge Principal** | Rouge CSB | `#D32F2F` | CTA, boutons primaires, accents urgents |
| **Rouge Foncé** | Rouge Bordeaux | `#B71C1C` | Hover sur boutons rouges, bandeau bas |
| **Blanc Pur** | Blanc | `#FFFFFF` | Fond pages, texte sur fond sombre |

#### Couleurs secondaires

| Rôle | Nom | Code Hexadécimal | Usage |
|---|---|---|---|
| **Or / Doré** | Or Académique | `#F5A623` | Étoiles, récompenses, mise en avant prestige (référence logo) |
| **Gris Clair** | Fond Section | `#F7F9FC` | Sections alternées, arrière-plan cartes |
| **Gris Moyen** | Texte Corps | `#4A5568` | Texte paragraphe, descriptions |
| **Gris Foncé** | Texte Titre | `#1A202C` | Titres de sections sur fond blanc |
| **Vert Succès** | Vert Validation | `#2E7D32` | Messages de succès, formulaires valides |
| **Overlay Sombre** | Scrim Hero | `rgba(13, 31, 107, 0.55)` | Superposition sur images hero |

#### Dégradés utilisés

```css
/* Dégradé hero principal */
background: linear-gradient(135deg, rgba(13,31,107,0.8) 0%, rgba(211,47,47,0.4) 100%);

/* Dégradé bouton CTA */
background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%);

/* Dégradé section statistiques */
background: linear-gradient(135deg, #1A3A8F 0%, #0D1F6B 100%);

/* Dégradé card premium */
background: linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%);
```

### 4.2 Typographie

#### Polices recommandées (Google Fonts — chargement optimisé)

| Rôle | Police | Variantes | Taille desktop | Taille mobile |
|---|---|---|---|---|
| **Titres principaux (H1)** | Playfair Display | Bold 700 | 56–72px | 32–40px |
| **Titres secondaires (H2)** | Playfair Display | SemiBold 600 | 36–44px | 26–32px |
| **Titres tertiaires (H3)** | Montserrat | SemiBold 600 | 22–28px | 18–22px |
| **Corps de texte** | Montserrat | Regular 400 | 16–18px | 15–16px |
| **Texte UI (navigation, boutons)** | Montserrat | Medium 500 | 14–16px | 14px |
| **Citations / Accroches** | Playfair Display | Italic 400 | 20–24px | 18–20px |
| **Labels, tags, badges** | Montserrat | Bold 700 | 11–13px | 11px |

#### Règles typographiques

```css
/* Line-height */
Titres : 1.2
Corps : 1.7
Citations : 1.5

/* Letter-spacing */
Navigation : 0.05em
Boutons CTA : 0.08em
Labels majuscules : 0.15em

/* Paragraphe max-width */
max-width: 720px (texte corps centré)
max-width: 960px (colonnes larges)
```

### 4.3 Iconographie

- **Bibliothèque principale :** Lucide Icons (React) ou Heroicons — trait fin, style moderne
- **Icônes d'atouts :** Illustrations SVG custom (style flat design africain, tons bleu/rouge/or)
- **Taille standard :** 24px (inline), 32px (cards), 48px (sections features)
- **Réseaux sociaux :** Simple Icons (SVG monochrome, adaptés aux couleurs du fond)
- **Emojis éducatifs :** Utilisés avec parcimonie dans les bandeaux d'information uniquement

#### Icônes clés définies

| Concept | Icône Lucide | Usage |
|---|---|---|
| Sécurité | `Shield` | Sécurité de l'école |
| Bilinguisme | `Globe` | Sections FR/EN |
| Agriculture | `Sprout` | Programme agricole |
| Excellence | `Star` | Distinctions, valeurs |
| Famille | `Heart` | Témoignages parents |
| Calendrier | `Calendar` | Admissions, agenda |
| Diplôme | `GraduationCap` | Niveaux scolaires |
| Téléphone | `Phone` | Contact |
| Localisation | `MapPin` | Adresse |

### 4.4 Composants récurrents

#### Boutons

```
BOUTON PRIMAIRE (Rouge)
─────────────────────────────────
Background : #D32F2F → #B71C1C (hover)
Texte : blanc, Montserrat 600, 15px, letterspacing 0.08em
Padding : 14px 32px
Border-radius : 8px
Box-shadow : 0 4px 15px rgba(211,47,47,0.35)
Transition : all 0.25s ease
Hover : translateY(-2px), shadow intensifiée

BOUTON SECONDAIRE (Contour bleu)
─────────────────────────────────
Background : transparent
Border : 2px solid #1A3A8F
Texte : #1A3A8F, Montserrat 600, 15px
Padding : 12px 30px
Border-radius : 8px
Hover : background #1A3A8F, texte blanc

BOUTON GHOST (Contour blanc — sur fonds sombres)
─────────────────────────────────
Border : 2px solid rgba(255,255,255,0.8)
Texte : blanc
Hover : background rgba(255,255,255,0.15)
```

#### Cartes (Cards)

```
CARTE PROGRAMME
─────────────────────────────────
Background : #FFFFFF
Border-radius : 16px
Box-shadow : 0 4px 24px rgba(26,58,143,0.08)
Border-top : 4px solid #D32F2F
Padding : 32px 28px
Hover : translateY(-6px), shadow 0 12px 40px rgba(26,58,143,0.15)
Transition : all 0.3s cubic-bezier(0.4,0,0.2,1)
Image : ratio 16:9, border-radius 12px, object-fit cover

CARTE TÉMOIGNAGE
─────────────────────────────────
Background : #F7F9FC
Border-radius : 16px
Border-left : 4px solid #F5A623
Padding : 28px
Icône guillemets : color #D32F2F, taille 32px
Avatar : 56px, border-radius 50%, border 3px solid #1A3A8F

CARTE STATISTIQUE (Compteur animé)
─────────────────────────────────
Background : rgba(255,255,255,0.1) (sur fond bleu)
Border-radius : 16px
Chiffre : Playfair Display 700, 48–64px, couleur or #F5A623
Label : Montserrat 500, 14px, blanc
Animation : compteur +1 par frame (Intersection Observer)
```

#### Formulaires

```
CHAMP INPUT
─────────────────────────────────
Border : 1.5px solid #E2E8F0
Border-radius : 8px
Padding : 14px 16px
Font : Montserrat 400, 15px
Focus : border-color #1A3A8F, box-shadow 0 0 0 3px rgba(26,58,143,0.15)
Error : border-color #D32F2F, message rouge sous le champ
Valid : border-color #2E7D32, icône check à droite

SELECT / DROPDOWN
─────────────────────────────────
Apparence custom (chevron SVG bleu)
Même traitement que l'input au focus

TEXTAREA
─────────────────────────────────
min-height : 120px
resize : vertical uniquement
Même style que l'input
```

#### Badges et Tags

```
BADGE NIVEAU (Crèche, Maternelle, etc.)
─────────────────────────────────
Background : #EEF2FF
Color : #1A3A8F
Border-radius : 20px
Padding : 4px 12px
Font : Montserrat 700, 12px, uppercase, letterspacing 0.1em

BADGE NOUVEAU / NEW
─────────────────────────────────
Background : #D32F2F
Color : blanc
Border-radius : 4px
Padding : 3px 8px
Font : Montserrat 700, 11px, uppercase
Animation : pulse 2s infinite
```

### 4.5 Espacement et grille

```css
/* Grille principale */
max-width: 1280px;
margin: 0 auto;
padding: 0 24px; /* mobile */
padding: 0 40px; /* tablette */
padding: 0 80px; /* desktop */

/* Espacements de sections */
Section padding (desktop) : padding: 96px 0;
Section padding (mobile)  : padding: 64px 0;

/* Gap grilles */
Grid gap desktop : 32px
Grid gap mobile  : 20px

/* Échelle d'espacement (multiples de 8) */
xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px | 2xl: 48px | 3xl: 64px | 4xl: 96px
```


---

## 5. PAGE D'ACCUEIL

La page d'accueil est la pièce maîtresse du site. Elle doit capter l'attention en moins de 3 secondes et guider le visiteur vers une action (inscription, découverte, contact). Elle se compose de 10 sections empilées verticalement.

---

### SECTION 1 — HERO PLEIN ÉCRAN

**Layout :** Image ou diaporama plein écran (`100vh`), texte centré sur overlay dégradé bleu/rouge.

**Contenu visuel :**
- Diaporama automatique de 3 à 4 photos issues de la galerie (`/public/images/`) : enfants en salle de classe, activités extérieures, terrain de sport, équipe enseignante
- Durée par slide : 5 secondes, transition `crossfade` 800ms
- Overlay : `linear-gradient(135deg, rgba(13,31,107,0.78) 0%, rgba(211,47,47,0.35) 100%)`
- Logo de l'école affiché en haut à gauche (via le header transparent)

**Contenu textuel (centré verticalement) :**
```
[Pré-titre badge animé] : "Bilingue · Agréé MINEDUB · Nkozoa, Yaoundé"
[H1 Playfair Display 700] : "Former aujourd'hui les leaders de demain"
[Sous-titre Montserrat 400] : "Un cadre d'excellence bilingue pour l'épanouissement
                              total de votre enfant — de la crèche au primaire."
[2 boutons côte à côte] :
  → [Rouge] "Inscrire mon enfant" / "Enroll My Child"
  → [Ghost blanc] "Découvrir l'école" / "Explore Our School"
```

**Animation d'entrée :**
- Pré-titre : `fadeInDown` 0.4s, délai 0.2s
- H1 : `fadeInUp` 0.6s, délai 0.4s
- Sous-titre : `fadeInUp` 0.6s, délai 0.6s
- Boutons : `fadeInUp` 0.5s, délai 0.8s

**Indicateur de défilement :**
- Icône chevron-down animée (`bounce` infini, 1.5s) en bas de la section
- Disparaît au premier scroll

---

### SECTION 2 — BANDEAU DE CONFIANCE (TRUST BAR)

**Layout :** Fond blanc, ligne unique horizontale, 4 indicateurs clés séparés par des traits verticaux.

```
🏫 Agréé MINEDUB 2025    |    📚 4 Niveaux Scolaires    |    🌍 Bilingue FR / EN    |    📞 651 11 15 06
```

**Comportement :** Fixe sur desktop, carrousel tactile sur mobile (swipe).  
**Typographie :** Montserrat 500, 15px, couleur `#1A3A8F`.  
**Animation :** `slideInLeft` séquentiel, 100ms de délai entre chaque item.

---

### SECTION 3 — PRÉSENTATION COURTE DE L'ÉCOLE

**Layout :** 2 colonnes égales (desktop) — texte à gauche, image à droite.

**Colonne texte :**
```
[Badge label] "Notre Mission / Our Mission"
[H2 Playfair] "L'excellence bilingue au service de chaque enfant"
              "Bilingual Excellence at the Service of Every Child"

[Paragraphe] Fondé à Nkozoa en 2025 et agréé par le MINEDUB, le Complexe
Scolaire Bilingue Les Génies d'Afrique accueille les enfants de 0 à 12 ans
dans un cadre sécurisé, stimulant et bienveillant. Notre approche pédagogique
bilingue — français et anglais — prépare vos enfants à réussir dans un monde
globalisé.

[4 points forts en liste iconique] :
  ✔ Encadrement bilingue dès la crèche
  ✔ Corps enseignant qualifié et passionné
  ✔ Projets pédagogiques innovants (agriculture, élevage, pisciculture)
  ✔ Sécurité et bien-être au cœur du projet éducatif

[Bouton secondaire bleu] "En savoir plus / Learn More" → /presentation
```

**Colonne image :** Photo haute résolution d'enfants en classe, ratio 4:3, `border-radius: 20px`, légère ombre portée. Micro-animation : `scale(1.03)` au hover avec `overflow: hidden`.

**Animation section :** `fadeIn` au défilement (Intersection Observer), seuil 20%.

---

### SECTION 4 — STATISTIQUES CLÉS (CHIFFRES ANIMÉS)

**Layout :** Fond bleu marine dégradé (`#1A3A8F` → `#0D1F6B`), 4 colonnes de statistiques.

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│      4       │  │      2       │  │     FR + EN  │  │    2025      │
│  Niveaux     │  │  Sections    │  │  Bilinguisme │  │  Agrément    │
│  scolaires   │  │  primaires   │  │  intégral    │  │  MINEDUB     │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

**Chiffres animés :** Compteur incrémental déclenché à l'entrée dans le viewport (Intersection Observer). Durée : 1.5s, easing `easeOutQuart`.  
**Typographie chiffres :** Playfair Display 700, 56px, couleur or `#F5A623`.  
**Typographie labels :** Montserrat 500, 15px, blanc, opacité 0.9.  
**Séparateurs :** Traits verticaux `rgba(255,255,255,0.2)`.

---

### SECTION 5 — NOS PROGRAMMES / OUR PROGRAMS

**Layout :** Titre centré + grille 2×2 de cartes programmes (desktop), colonnes 1 (mobile).

**Titre section :**
```
[Badge] "Programmes / Programs"
[H2] "Un parcours complet de 0 à 12 ans"
     "A Complete Journey from 0 to 12 Years"
[Sous-texte] "Chaque cycle est conçu pour développer les compétences cognitives,
              linguistiques et sociales de votre enfant."
```

**4 Cartes programmes :**

```
CARTE 1 — CRÈCHE / DAY CARE
Image : photo bébés/tout-petits en salle
Badge : "0 – 2 ans"
H3 : "Crèche / Day Care"
Texte : "Un environnement sécurisé et affectif pour les tout-petits.
         Éveil sensoriel, motricité et premiers apprentissages."
Lien : "Découvrir → / Explore →"

CARTE 2 — MATERNELLE / NURSERY
Image : photo élèves maternelle en activité
Badge : "2 – 5 ans"
H3 : "Maternelle / Nursery"
Texte : "Pré-nursery et Nursery pour poser les bases de l'apprentissage
         dans un cadre joyeux et bienveillant."
Lien : "Découvrir → / Explore →"

CARTE 3 — PRIMAIRE FRANCOPHONE / FRENCH PRIMARY
Image : photo classe primaire avec tableau
Badge : "6 – 12 ans · Français"
H3 : "Primaire Francophone / French Primary"
Texte : "Programme officiel camerounais enrichi, avec immersion progressive
         en anglais dès le CP."
Lien : "Découvrir → / Explore →"

CARTE 4 — PRIMAIRE ANGLOPHONE / ENGLISH PRIMARY
Image : photo classe en anglais
Badge : "6 – 12 ans · Anglais"
H3 : "Primaire Anglophone / English Primary"
Texte : "Curriculum anglophone rigoureux avec initiation au français,
         préparant aux meilleurs établissements secondaires."
Lien : "Découvrir → / Explore →"
```

**Animation :** Cartes apparaissent en `fadeInUp` séquentiel (150ms de délai entre chaque) au défilement.

---

### SECTION 6 — POURQUOI NOUS CHOISIR / WHY CHOOSE US

**Layout :** Fond gris clair `#F7F9FC`, titre centré + grille 3 colonnes d'icônes-features (desktop), 1 colonne (mobile).

**Titre :**
```
[H2] "Pourquoi choisir les Génies d'Afrique ?"
     "Why Choose Les Génies d'Afrique?"
```

**6 Features iconiques :**
```
🌍 Bilinguisme dès la crèche         📋 Agrément officiel MINEDUB
   "Immersion bilingue intégrale          "Reconnaissance nationale,
    français–anglais dès 0 ans."           curriculum officiel certifié."

🌱 Projets pédagogiques uniques       👨‍🏫 Enseignants qualifiés & passionnés
   "Agriculture, élevage, pisciculture,    "Corps enseignant diplômé,
    entrepreneuriat junior."               formation continue, encadrement attentif."

🛡️ Sécurité & bien-être              💡 Apprentissage par l'action
   "Enceinte sécurisée, surveillance       "Pédagogie active, projets concrets,
    permanente, charte de protection."      développement du talent naturel."
```

**Design feature cards :**
- Icône : 48px, couleur `#1A3A8F`, fond rond `#EEF2FF`
- Titre feature : Montserrat 600, 17px, `#1A202C`
- Texte : Montserrat 400, 15px, `#4A5568`
- Hover : bordure bleue subtile, légère élévation

---

### SECTION 7 — GALERIE APERÇU / PHOTO PREVIEW

**Layout :** Mosaïque de 6 photos en grille asymétrique (1 grande + 5 petites), fond blanc.

**Titre :**
```
[H2] "La vie à l'école en images"
     "School Life in Pictures"
[Sous-texte] "Un cadre inspirant, des élèves épanouis."
              "An inspiring environment, thriving students."
```

**Grille desktop :**
```
┌─────────────────────┬──────────┬──────────┐
│                     │          │          │
│   GRANDE PHOTO      │  Photo 2 │  Photo 3 │
│   (2 colonnes       │          │          │
│    2 rangées)       ├──────────┼──────────┤
│                     │  Photo 4 │  Photo 5 │
│                     │          │          │
└─────────────────────┴──────────┴──────────┘
                       Photo 6 (pleine largeur en dessous)
```

**Bouton bas :** `[Rouge] "Voir toute la galerie / View Full Gallery"` → `/vie-scolaire/galerie`

**Interaction :** Clic sur une photo → lightbox avec navigation gauche/droite, fond noir semi-transparent, bouton fermeture ×.

---

### SECTION 8 — TÉMOIGNAGES PARENTS / PARENT TESTIMONIALS

**Layout :** Fond bleu marine, carrousel de 3 témoignages visibles simultanément (desktop), 1 (mobile).

**Titre :**
```
[H2 blanc] "Ce que disent les parents"
            "What Parents Say"
```

**3 Témoignages (exemple de contenu) :**
```
TÉMOIGNAGE 1
Avatar : photo parent (placeholder si non fourni)
Nom : "Mme Ngo Biyong, mère d'élève"
Note : ★★★★★
Texte FR : "Depuis que mon fils est inscrit aux Génies d'Afrique, j'observe une
             évolution remarquable. Il parle maintenant couramment en anglais et
             en français. L'encadrement est exceptionnel."
Texte EN : "Since my son enrolled at Les Génies d'Afrique, I've noticed remarkable
             progress. He now speaks fluently in both English and French.
             The support is exceptional."

TÉMOIGNAGE 2
Nom : "M. Atangana Biyick, père d'élève"
Note : ★★★★★
Texte FR : "Une école qui allie rigueur académique et épanouissement personnel.
             Mes deux enfants adorent venir à l'école chaque matin !"
Texte EN : "A school that combines academic rigor with personal development.
             My two children love coming to school every morning!"

TÉMOIGNAGE 3
Nom : "Mme Essomba, parent d'élève"
Note : ★★★★★
Texte FR : "Les projets agricoles et d'élevage m'ont vraiment surpris.
             Ma fille a développé le sens des responsabilités et l'amour du travail.
             Bravo à toute l'équipe !"
Texte EN : "The farming and livestock projects truly surprised me. My daughter
             has developed a sense of responsibility and a love of work.
             Congratulations to the whole team!"
```

**Contrôles :** Points de navigation + flèches `←` `→`, auto-play 6s, pause au hover.

---

### SECTION 9 — ADMISSIONS / ENROLL NOW (CTA FORT)

**Layout :** Fond avec image en arrière-plan (élèves en cour de récréation) + overlay rouge `rgba(183,28,28,0.88)`, texte centré blanc.

**Contenu :**
```
[H2 blanc Playfair] "Les inscriptions sont ouvertes"
                    "Enrollment is Now Open"
[Sous-texte] "Rejoignez la famille des Génies d'Afrique.
              Places limitées — agissez maintenant."
             "Join the Les Génies d'Afrique family.
              Limited places — act now."

[Encadré blanc centré, max-width 600px] :
  📅 Horaires d'inscription : Lundi au Vendredi, 8h00 – 13h00
  📞 651 11 15 06 / 656 66 38 48
  📍 Nkozoa, derrière la Boulangerie Massa, Yaoundé

[Bouton ghost blanc grand] "Télécharger le dossier d'inscription / Download Application Form"
[Bouton rouge] "Nous contacter maintenant / Contact Us Now"
```

---

### SECTION 10 — ACTUALITÉS RÉCENTES / LATEST NEWS

**Layout :** Fond blanc, titre centré, grille 3 cartes articles (desktop), 1 (mobile).

**Titre :**
```
[H2] "Actualités de l'école"
     "School News"
```

**Carte article (structure) :**
- Image : ratio 16:9, `object-fit: cover`, border-radius 12px
- Badge catégorie : `Événement`, `Pédagogie`, `Admissions`
- Date : Montserrat 500, 13px, couleur `#4A5568`
- Titre article : Montserrat 700, 18px
- Extrait : 2 lignes, `line-clamp: 2`
- Lien `Lire la suite → / Read More →` en bleu

**Bouton bas :** `[Secondaire bleu] "Voir toutes les actualités / View All News"` → `/actualites`


---

## 6. PAGES INTÉRIEURES

Chaque page intérieure suit une structure commune :
- **Hero page interne :** hauteur `400px` (desktop) / `260px` (mobile), image de fond + overlay, breadcrumb blanc, titre H1 centré blanc, sous-titre optionnel
- **Fil d'Ariane (breadcrumb) :** `Accueil / L'École / Nos Valeurs` — Montserrat 400, 13px, blanc opacité 0.75
- **Corps de page :** max-width 1280px centré, padding cohérent avec le Design System
- **CTA de bas de page :** Chaque page se termine par un bandeau d'appel à l'action vers `/admissions`

---

### 6.1 PAGE L'ÉCOLE / THE SCHOOL (`/presentation`)

**Hero :** Image de groupe enseignants-élèves, titre "L'École / The School"

**Section A — Mot du Directeur / Director's Message**
```
Layout : 2 colonnes — photo directeur à gauche (portrait formel, border-radius 12px,
         border 4px solid #F5A623), texte à droite.

Contenu FR :
"Bienvenue au Complexe Scolaire Bilingue Les Génies d'Afrique. Notre établissement
est né d'une conviction profonde : chaque enfant porte en lui un génie unique,
qu'il revient à l'école de révéler et de cultiver. Ici, nous ne nous contentons
pas d'instruire — nous éduquons, nous accompagnons, nous inspirons. Bienvenue dans
notre famille."

Signature : Le Directeur / The Principal
```

**Section B — Notre Histoire / Our History**
```
Layout : Timeline verticale (points sur axe central)

Jalons :
• 2024 — Fondation de l'établissement et construction des locaux
• Février 2025 — Obtention de l'agrément MINEDUB
           (Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP)
• Septembre 2025 — Ouverture officielle et accueil des premiers élèves
• 2026 — Extension des programmes et lancement du site web officiel
```

**Section C — Nos Valeurs / Our Values**
```
6 valeurs en grille 3×2 :

EXCELLENCE / EXCELLENCE
Icône : Star — "Exiger le meilleur de chaque élève dans un esprit de progrès continu."
               "Expecting the best from every student in a spirit of continuous growth."

INTÉGRITÉ / INTEGRITY
Icône : Shield — "Former des individus honnêtes, responsables et respectueux."
                 "Shaping honest, responsible and respectful individuals."

BILINGUISME / BILINGUALISM
Icône : Globe — "Maîtriser le français et l'anglais comme passeports vers le monde."
                "Mastering French and English as passports to the world."

INNOVATION / INNOVATION
Icône : Lightbulb — "Expérimenter, créer, entreprendre dès le plus jeune âge."
                    "Experimenting, creating and entrepreneurship from an early age."

BIENVEILLANCE / CARE
Icône : Heart — "Un environnement affectif, sécurisé et inclusif pour tous."
               "An affective, safe and inclusive environment for all."

DÉVELOPPEMENT GLOBAL / HOLISTIC DEVELOPMENT
Icône : Sprout — "Corps, esprit et caractère développés en harmonie."
                 "Body, mind and character developed in harmony."
```

**Section D — Notre Équipe / Our Team**
```
Layout : Grille de cartes profil (3 colonnes desktop)

Carte profil :
- Photo (ratio 1:1, border-radius 50% pour avatar, ou rectangle arrondi)
- Nom : Montserrat 700, 18px
- Poste FR + EN
- Courte biographie (2 lignes)
- Icône LinkedIn (si disponible)

Postes à prévoir :
• Direction générale / General Director
• Responsable pédagogique francophone / French Curriculum Coordinator
• Responsable pédagogique anglophone / English Curriculum Coordinator
• Coordinatrice crèche-maternelle / Day Care & Nursery Coordinator
• Personnel administratif / Administrative Staff
```

---

### 6.2 PAGE PROGRAMMES / PROGRAMS (`/programmes`)

**Hero :** Image salle de classe moderne, titre "Nos Programmes / Our Programs"

**Introduction de section :**
```
Texte centré max-width 700px :
FR : "Du tout premier âge jusqu'à la fin du primaire, chaque cycle offre un
     environnement adapté, des enseignants spécialisés et une pédagogie bilingue
     rigoureuse."
EN : "From the earliest age through the end of primary school, each cycle offers
     an adapted environment, specialised teachers and rigorous bilingual pedagogy."
```

**Structure type de chaque sous-page de programme :**

```
ONGLETS DE NAVIGATION HORIZONTAUX :
[ Crèche ] [ Maternelle ] [ Primaire FR ] [ Primaire EN ] [ Activités périscolaires ]

──────────────────────────────────────────────────────────────────

CONTENU ONGLET SÉLECTIONNÉ :

BLOC A — Présentation du niveau
  Image illustrative plein largeur (arrondie) + texte descriptif

BLOC B — Informations pratiques (carte récapitulative)
  ┌────────────────────────────────────────────────────────────┐
  │ 🎓 Niveau : [Nom]          📅 Âge : [Tranche d'âge]       │
  │ 🌍 Langue : FR / EN        ⏰ Horaires : Lun–Ven 7h30–15h │
  │ 📋 Effectif : Petits groupes (<25 élèves par classe)      │
  └────────────────────────────────────────────────────────────┘

BLOC C — Points forts du programme (liste iconique 3 colonnes)
  Ex. Maternelle :
  🎨 Activités créatives | 🎵 Éveil musical | 📖 Pré-lecture
  🏃 Motricité fine      | 🌍 Premiers mots EN/FR | 🌱 Jardinage pédagogique

BLOC D — Journée type / A Typical Day
  Timeline illustrée :
  7h30 Accueil | 8h00 Activités matinales | 10h00 Récréation |
  10h30 Apprentissages | 12h00 Déjeuner | 13h00 Sieste/Lecture |
  14h00 Activités pratiques | 15h00 Retour familles

BLOC E — CTA inscription
  [Bouton rouge] "Inscrire mon enfant dans ce programme / Enroll in this program"
```

**Programmes spéciaux documentés :**
```
PROJETS PÉDAGOGIQUES DISTINCTIFS :

🌱 Agriculture scolaire — Apprentissage pratique du jardinage et de la culture
🐄 Élevage — Initiation à l'élevage responsable (poules, lapins)
🐟 Pisciculture — Découverte de l'aquaculture
💡 Mini-entreprises — Projets entrepreneuriaux supervisés dès le CM1
🎭 Arts et culture — Théâtre, danse, musique africaine et internationale
⚽ Sport — Football, athlétisme, jeux collectifs
```

---

### 6.3 PAGE ADMISSIONS (`/admissions`)

**Hero :** Image parent et enfant à l'entrée de l'école, titre "Admissions"

**SOUS-PAGE A — Procédure d'admission / Admission Procedure**
```
Stepper horizontal (desktop) / vertical (mobile) en 4 étapes :

ÉTAPE 1 : Constitution du dossier / Prepare Your Documents
Icône : ClipboardList
FR : "Rassemblez les documents requis listés ci-dessous."
EN : "Gather the required documents listed below."

ÉTAPE 2 : Dépôt du dossier / Submit Application
Icône : Send
FR : "Déposez le dossier au secrétariat : Lun–Ven, 8h–13h."
EN : "Submit the file at the school office: Mon–Fri, 8AM–1PM."

ÉTAPE 3 : Entretien d'admission / Admission Interview
Icône : Users
FR : "Un entretien avec la direction pour les deux parents et l'élève."
EN : "A meeting with the principal for both parents and the student."

ÉTAPE 4 : Confirmation & Paiement / Confirmation & Payment
Icône : CheckCircle
FR : "Confirmation de l'admission et règlement des frais de scolarité."
EN : "Admission confirmation and payment of tuition fees."
```

**SOUS-PAGE B — Frais de scolarité / Tuition Fees**
```
Tableau de tarifs (données issues des brochures de l'école) :

┌──────────────────────────────┬──────────────┬──────────────┬─────────────────────┐
│ Niveau / Level               │ Inscription  │ Scolarité    │ Autres frais        │
│                              │ (à verser    │ annuelle     │ (tenue, fournitures)│
│                              │  à l'entrée) │              │                     │
├──────────────────────────────┼──────────────┼──────────────┼─────────────────────┤
│ Crèche / Day Care            │ <incertain>  │ <incertain>  │ <incertain>         │
│ Maternelle / Nursery         │ <incertain>  │ <incertain>  │ <incertain>         │
│ Primaire Francophone         │ <incertain>  │ <incertain>  │ <incertain>         │
│ Primaire Anglophone          │ <incertain>  │ <incertain>  │ <incertain>         │
└──────────────────────────────┴──────────────┴──────────────┴─────────────────────┘

Note développeur : Ces données doivent être renseignées par la direction avant mise
en ligne. Le tableau est stylisé avec un header bleu marine et lignes alternées.
```

**SOUS-PAGE C — Dossier d'inscription / Application Requirements**
```
Liste des pièces requises (checklist interactive) :

□ Extrait d'acte de naissance (original + copie)
  Birth certificate (original + copy)
□ Carnet de vaccinations à jour
  Up-to-date vaccination booklet
□ 4 photos d'identité récentes de l'enfant
  4 recent passport photos of the child
□ Photocopie de la CNI ou passeport du parent/tuteur
  Copy of parent/guardian's ID card or passport
□ Fiche de renseignements complétée (formulaire fourni par l'école)
  Completed information form (provided by the school)
□ Bulletins scolaires des deux dernières années (à partir du CP)
  Last two years' report cards (from Grade 1 onwards)

[Bouton] "Télécharger le formulaire / Download Form" → PDF
```

**SOUS-PAGE D — Formulaire d'inscription en ligne / Online Enrollment Form**
```
Formulaire en 2 étapes (wizard) :

ÉTAPE 1 — Informations de l'élève :
  • Nom complet / Full name
  • Date de naissance / Date of birth
  • Niveau souhaité / Desired level (select)
  • Section souhaitée (FR/EN) / Desired section

ÉTAPE 2 — Informations des parents :
  • Nom du père / Father's name
  • Nom de la mère / Mother's name
  • Téléphone principal / Primary phone
  • Téléphone secondaire / Secondary phone
  • Email
  • Message libre / Free message
  • [Checkbox] J'accepte la politique de confidentialité

[Bouton rouge] "Envoyer la demande / Submit Request"
[Message succès] "Votre demande a bien été envoyée. Nous vous contacterons dans les 48h."
                 "Your request has been sent. We will contact you within 48 hours."
```

---

### 6.4 PAGE VIE SCOLAIRE — GALERIE (`/vie-scolaire/galerie`)

**Hero :** Collage de photos, titre "Galerie / Gallery"

**Filtres de catégories (onglets) :**
```
[ Tout / All ] [ Classes / Classrooms ] [ Sports ] [ Fêtes & Événements / Events ]
[ Projets / Projects ] [ Sorties / Field Trips ]
```

**Grille galerie :**
- Format Masonry (colonnes de hauteurs variables) ou grille uniforme 3×N
- Chaque photo : `border-radius: 12px`, hover → overlay sombre + icône loupe centré
- Clic → lightbox plein écran avec navigation clavier (← →) et swipe mobile
- Chargement progressif (lazy loading) — afficher 12 photos par défaut + bouton "Voir plus"

**Section vidéos (si disponibles) :**
```
Grille 2 colonnes de players vidéo embarqués (YouTube ou vidéo native HTML5)
Thumbnail avec bouton play centré, animation au hover
```

---

### 6.5 PAGE ACTUALITÉS / NEWS (`/actualites`)

**Hero :** Fond bleu avec motif léger, titre "Actualités / News"

**Layout :**
- Article mis en avant (featured) : pleine largeur, image large à gauche, résumé à droite
- Grille d'articles : 3 colonnes desktop, 2 tablette, 1 mobile
- Pagination : "< Page précédente · 1 · 2 · 3 · Page suivante >"

**Sidebar (desktop uniquement) :**
```
• Recherche : input de recherche full-text
• Catégories : Pédagogie | Événements | Admissions | Vie scolaire | Partenariats
• Articles récents : liste de 5 liens
• Tags : nuage de tags cliquables
```

**Page article individuel (`/actualites/[slug]`) :**
```
• Hero image de l'article (pleine largeur, hauteur 400px)
• Métadonnées : date, catégorie, temps de lecture estimé
• Corps de l'article : typography optimisée (line-height 1.8, max-width 720px)
• Partage réseaux sociaux : Facebook, WhatsApp, copier le lien
• Articles similaires : 3 cartes en bas de page
```

---

### 6.6 PAGE CONTACT (`/contact`)

**Hero :** Carte de Yaoundé stylisée ou photo du bâtiment, titre "Contact"

**Layout 2 colonnes :**

**Colonne gauche — Informations :**
```
📍 Adresse :
Nkozoa, derrière la Boulangerie Massa
Yaoundé, Cameroun

📞 Téléphones :
651 11 15 06
656 66 38 48

✉ Email :
lesgeniesdafrique@836gmail.com

⏰ Horaires d'inscription :
Lundi – Vendredi : 8h00 – 13h00
Monday – Friday: 8AM – 1PM

──────────────────────────────
Réseaux sociaux / Social Media :
[Facebook] [TikTok] [WhatsApp]
──────────────────────────────
[Bouton WhatsApp vert] "Écrire sur WhatsApp / Chat on WhatsApp"
```

**Colonne droite — Formulaire de contact :**
```
Champs :
• Nom complet / Full name *
• Email *
• Téléphone / Phone
• Sujet / Subject (select : Admission | Information | Partenariat | Autre)
• Message *
• [Checkbox] Consentement RGPD / Privacy consent

[Bouton rouge] "Envoyer le message / Send Message"
```

**Section carte interactive :**
```
Intégration Google Maps (iframe) ou Leaflet.js centré sur Nkozoa, Yaoundé.
Marqueur personnalisé avec logo de l'école.
Hauteur : 400px, border-radius : 16px, ombre douce.
```

---

### 6.7 PAGE ESPACE PARENTS / PARENTS' PORTAL (`/espace-parents`)

> **Phase 3 — développement ultérieur**

**Fonctionnalités prévues :**
```
• Connexion sécurisée (email + mot de passe) avec option "Se souvenir"
• Tableau de bord personnalisé par enfant
• Accès aux bulletins de notes en PDF
• Agenda scolaire et calendrier des événements
• Messagerie directe avec les enseignants
• Suivi des paiements et reçus de scolarité
• Notifications push (navigateur)
```

**Stack technique recommandé pour la Phase 3 :**
- Authentification : NextAuth.js avec JWT
- Base de données : PostgreSQL + Prisma ORM
- Stockage fichiers : AWS S3 ou Cloudinary
- Notifications : Firebase Cloud Messaging


---

## 7. RESPONSIVE & PERFORMANCES

### 7.1 Breakpoints définis

| Breakpoint | Largeur | Cible | Alias |
|---|---|---|---|
| **Mobile petit** | 0 – 479px | Smartphones anciens | `xs` |
| **Mobile** | 480 – 767px | Smartphones courants | `sm` |
| **Tablette** | 768 – 1023px | Tablettes portrait/paysage | `md` |
| **Desktop** | 1024 – 1279px | Laptops | `lg` |
| **Large desktop** | 1280px+ | Grands écrans | `xl` |

---

### 7.2 Adaptations par breakpoint

#### Navigation

| Élément | Desktop (≥1024px) | Tablette (768–1023px) | Mobile (<768px) |
|---|---|---|---|
| Header | Horizontal complet | Logo + hamburger | Logo + hamburger |
| Menu | Barre horizontale inline | Drawer latéral | Drawer latéral |
| CTA header | Bouton visible | Masqué, dans le drawer | Dans le drawer |
| Sélecteur langue | Pill FR\|EN visible | Dans le drawer | Dans le drawer |
| Logo hauteur | 56px (sticky) / 72px | 48px | 44px |

#### Page d'accueil

| Section | Desktop | Tablette | Mobile |
|---|---|---|---|
| Hero | 100vh, texte centré H1 64px | 80vh, H1 44px | 100svh, H1 36px |
| Trust bar | 4 colonnes inline | 2×2 grille | Carrousel swipeable |
| Présentation | 2 colonnes 50/50 | 2 colonnes 60/40 | 1 colonne, image au-dessus |
| Statistiques | 4 colonnes inline | 2×2 grille | 2×2 grille compacte |
| Programmes | Grille 2×2 | Grille 2×2 | 1 colonne défilable |
| Why choose us | Grille 3×2 | Grille 2×3 | 1 colonne |
| Galerie | Mosaïque asymétrique | Grille 2 colonnes | Grille 2 colonnes |
| Témoignages | 3 slides visibles | 2 slides visibles | 1 slide, navigation dots |
| CTA admissions | Texte + 2 boutons côte à côte | Texte + 2 boutons côte à côte | Texte + 2 boutons empilés |

#### Typographie responsive

```css
/* H1 */
font-size: clamp(32px, 5vw, 72px);

/* H2 */
font-size: clamp(26px, 3.5vw, 44px);

/* H3 */
font-size: clamp(18px, 2.5vw, 28px);

/* Corps */
font-size: clamp(15px, 1.5vw, 18px);
```

#### Images et médias

```
Desktop  : images en full quality (WebP), lazy loading activé
Tablette : srcset avec image 1024px max
Mobile   : srcset avec image 640px max, format WebP obligatoire
Hero     : object-fit: cover, object-position: center top (pour les visages)
```

---

### 7.3 Éléments flottants (toutes tailles)

**Bouton WhatsApp flottant (FAB) :**
```css
position: fixed;
bottom: 24px;
right: 24px;
z-index: 999;
background: #25D366;
border-radius: 50%;
width: 60px; height: 60px;
box-shadow: 0 4px 20px rgba(37,211,102,0.5);
animation: pulse 2.5s infinite;
/* Tooltip au hover : "Écrivez-nous sur WhatsApp" */
```

**Bouton retour en haut (Back to top) :**
- Apparaît après 400px de scroll
- Position : `fixed`, bottom 24px, right 96px (à côté du WhatsApp)
- Icône flèche haut, fond bleu marine, border-radius 50%

---

### 7.4 Animations et transitions

#### Principes généraux
- Toutes les animations respectent `prefers-reduced-motion: reduce` (accessibilité)
- Durée standard : 200–400ms pour les micro-interactions UI
- Durée scroll animations : 500–800ms

#### Animations par composant

```css
/* Apparition au scroll (Intersection Observer, seuil 0.15) */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Compteurs animés */
.counter {
  /* requestAnimationFrame, durée 1500ms, easing easeOutQuart */
}

/* Hover carte programme */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(26,58,143,0.15);
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}

/* Underline nav item actif */
.nav-item::after {
  content: '';
  width: 0;
  height: 2px;
  background: #D32F2F;
  transition: width 0.3s ease;
}
.nav-item:hover::after, .nav-item.active::after {
  width: 100%;
}
```

#### Micro-interactions définies
- **Bouton au clic :** `scale(0.96)` pendant 100ms (effet press physique)
- **Champ focus :** bordure bleue avec glow, transition 200ms
- **Menu dropdown :** `opacity 0→1` + `translateY(-8px→0)`, 180ms
- **Lightbox galerie :** fond noir fade-in 200ms, image scale `0.9→1`, 300ms
- **Hamburger → X :** rotation 180° + morphing des barres, 300ms

---

### 7.5 Performances techniques

#### Objectifs Lighthouse

| Métrique | Cible |
|---|---|
| Performance | ≥ 90 |
| Accessibilité | ≥ 95 |
| Bonnes pratiques | ≥ 95 |
| SEO | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FID / INP | < 200ms |

#### Stratégie d'optimisation

```
IMAGES
• Format WebP avec fallback JPEG
• Composant next/image (lazy loading natif, srcset automatique)
• Images hero : preload avec <link rel="preload">
• Dimensions explicites sur toutes les balises <img> (éviter CLS)

POLICES
• Google Fonts chargées via next/font (optimisation automatique)
• font-display: swap
• Subset latin + latin-ext uniquement

JAVASCRIPT
• Code splitting automatique (Next.js)
• Composants interactifs lourds en dynamic import + SSR: false
• Third-party scripts (Maps, Analytics) : chargement différé

CSS
• Tailwind CSS avec purge en production (CSS minimal)
• Variables CSS pour le design token (couleurs, espacement)

SEO
• Balises Open Graph complètes pour chaque page
• Schema.org : EducationalOrganization, LocalBusiness
• Sitemap.xml généré automatiquement (next-sitemap)
• robots.txt correctement configuré
• Balises hreflang pour FR / EN
• Meta description unique par page (max 160 caractères)

ACCESSIBILITÉ
• Contraste minimum WCAG 2.1 AA (ratio 4.5:1 pour le texte)
• Attributs aria-label sur tous les éléments interactifs
• Navigation au clavier fonctionnelle (focus visible)
• Textes alternatifs (alt) sur toutes les images
• Sémantique HTML correcte (main, nav, header, footer, section, article)
```

#### Stack technique recommandé

```
Framework       : Next.js 15 (App Router)
Langage         : TypeScript
Styles          : Tailwind CSS v4
Animations      : Framer Motion (pour les animations complexes)
                  CSS natif (pour les micro-interactions simples)
Icônes          : Lucide React
Internationalisation : next-intl (FR / EN)
Formulaires     : React Hook Form + Zod (validation)
Cartes          : Leaflet.js (open source, pas de quota)
Galerie/Lightbox: yet-another-react-lightbox
Carrousel       : Embla Carousel
CMS (Phase 2)   : Contentlayer ou Sanity.io (pour le blog/actualités)
Déploiement     : Vercel (recommandé pour Next.js) ou VPS Ubuntu + Nginx
Analytics       : Plausible.io (RGPD-friendly, sans cookie consent)
```


---

## 8. CONTENU ÉDITORIAL

Cette section fournit les textes clés prêts à l'emploi pour chaque page, en version française et anglaise. Tous les textes sont rédigés dans le ton défini à la section 1.4.

---

### 8.1 Page d'accueil / Home

#### Accroche principale

**FR :**
> « Former aujourd'hui les leaders de demain »  
> Un cadre d'excellence bilingue pour l'épanouissement total de votre enfant — de la crèche au primaire.

**EN :**
> "Shaping today's leaders for tomorrow"  
> A bilingual excellence environment for your child's total development — from day care to primary school.

#### Section présentation courte

**FR :**
Fondé à Nkozoa et agréé par le Ministère de l'Éducation de Base (MINEDUB), le Complexe Scolaire Bilingue Les Génies d'Afrique est un établissement d'enseignement privé dédié au développement intégral de l'enfant. De la crèche au primaire, nous offrons un cadre bilingue, sécurisé et stimulant où chaque élève est accompagné pour révéler son potentiel unique.

**EN :**
Founded in Nkozoa and accredited by the Ministry of Basic Education (MINEDUB), the Bilingual School Complex Les Génies d'Afrique is a private educational institution dedicated to the holistic development of the child. From day care to primary school, we offer a bilingual, safe and stimulating environment where every student is supported in revealing their unique potential.

#### Labels des 4 atouts principaux

| FR | EN |
|---|---|
| Encadrement bilingue dès la crèche | Bilingual guidance from day care |
| Corps enseignant qualifié et passionné | Qualified and dedicated teaching staff |
| Projets pédagogiques innovants | Innovative educational projects |
| Sécurité et bien-être au cœur du projet | Safety and well-being at the heart of our mission |

---

### 8.2 Page Présentation / About Us

#### Mot du Directeur

**FR :**
> Bienvenue au Complexe Scolaire Bilingue Les Génies d'Afrique.  
> Notre établissement est né d'une conviction profonde : chaque enfant porte en lui un génie unique, qu'il revient à l'école de révéler et de cultiver. Ici, nous ne nous contentons pas d'instruire — nous éduquons, nous accompagnons, nous inspirons.  
> Notre équipe s'engage chaque jour à offrir à votre enfant le meilleur environnement d'apprentissage bilingue, dans le respect de ses rythmes et de sa personnalité.  
> Bienvenue dans notre grande famille.

**EN :**
> Welcome to the Bilingual School Complex Les Génies d'Afrique.  
> Our institution was born from a deep conviction: every child carries a unique genius within them, and it is the school's role to reveal and nurture it. Here, we do not merely instruct — we educate, we support, we inspire.  
> Our team is committed every day to providing your child with the best bilingual learning environment, respecting their rhythm and personality.  
> Welcome to our family.

#### Paragraphe Histoire

**FR :**
Les Génies d'Afrique est né de la volonté de créer, à Nkozoa, un espace éducatif bilingue de haute qualité, accessible et ancré dans les réalités africaines. Après une période de préparation et de construction, l'établissement a obtenu son agrément officiel du MINEDUB en février 2025 (Arrêté N°103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP) et a accueilli ses premiers élèves à la rentrée de septembre 2025. Depuis, l'école n'a cessé de grandir, portée par la confiance des familles du quartier et au-delà.

**EN :**
Les Génies d'Afrique was born from a desire to create, in Nkozoa, a high-quality bilingual educational space that is accessible and rooted in African realities. After a period of preparation and construction, the institution obtained its official MINEDUB accreditation in February 2025 (Order No. 103/j1/7/A/MINEDUB/SG/DSEPB/SDAAP) and welcomed its first students at the start of September 2025. Since then, the school has continued to grow, supported by the trust of families from the neighborhood and beyond.

#### Les 6 valeurs — textes complets

**1. Excellence**
- FR : Nous croyons que chaque enfant est capable de grandes choses. Nous cultivons une culture de l'effort, de l'ambition raisonnée et du dépassement de soi.
- EN : We believe every child is capable of great things. We cultivate a culture of effort, measured ambition and self-surpassing.

**2. Intégrité**
- FR : Honnêteté, responsabilité et respect sont les piliers du comportement que nous inculquons dès le plus jeune âge.
- EN : Honesty, responsibility and respect are the pillars of the behaviour we instil from the earliest age.

**3. Bilinguisme**
- FR : Maîtriser le français et l'anglais, c'est s'ouvrir à deux univers culturels et se donner les moyens de réussir partout dans le monde.
- EN : Mastering French and English means opening up to two cultural worlds and giving yourself the means to succeed anywhere in the world.

**4. Innovation**
- FR : De l'agriculture scolaire à l'entrepreneuriat junior, nous préparons nos élèves au monde de demain en leur apprenant à créer, expérimenter et résoudre des problèmes concrets.
- EN : From school farming to junior entrepreneurship, we prepare our students for tomorrow's world by teaching them to create, experiment and solve real-world problems.

**5. Bienveillance**
- FR : Un enfant épanoui apprend mieux. Notre école est un espace de confiance, de respect mutuel et de soutien affectif, où chacun se sent accueilli et valorisé.
- EN : A happy child learns better. Our school is a space of trust, mutual respect and emotional support, where everyone feels welcomed and valued.

**6. Développement global**
- FR : Nous développons l'enfant dans toutes ses dimensions : intellectuelle, physique, créative et morale. Car les leaders de demain sont des êtres complets.
- EN : We develop the child in all their dimensions: intellectual, physical, creative and moral. Because tomorrow's leaders are complete human beings.

---

### 8.3 Page Programmes / Programs

#### Introduction générale

**FR :**
De la toute petite enfance jusqu'à la fin du cycle primaire, chaque programme des Génies d'Afrique est conçu pour correspondre précisément aux besoins développementaux de l'enfant. Notre approche bilingue intégrale garantit une immersion naturelle et progressive en français et en anglais, dans un cadre pédagogique rigoureux et bienveillant.

**EN :**
From early childhood through the end of the primary cycle, every programme at Les Génies d'Afrique is designed to precisely match the developmental needs of the child. Our fully bilingual approach guarantees a natural and progressive immersion in French and English, within a rigorous and caring educational framework.

#### Crèche / Day Care

**FR :**
La crèche des Génies d'Afrique accueille les tout-petits de 0 à 2 ans dans un environnement sécurisé, chaleureux et stimulant. Nos éducatrices diplômées proposent des activités d'éveil sensoriel, de motricité et de socialisation adaptées à chaque stade du développement. Les premiers mots en français et en anglais sont introduits naturellement dès cet âge.

**EN :**
The Les Génies d'Afrique Day Care welcomes toddlers from 0 to 2 years old in a safe, warm and stimulating environment. Our qualified educators offer sensory, motor and social development activities tailored to each developmental stage. First words in French and English are naturally introduced from this age.

#### Maternelle / Nursery

**FR :**
De 2 à 5 ans, la section maternelle (Pré-nursery et Nursery) offre à l'enfant un espace d'épanouissement complet. Jeux éducatifs, arts plastiques, éveil musical, initiation à la lecture et aux mathématiques, jardinage pédagogique : chaque journée est une aventure d'apprentissage. L'immersion bilingue est totale et naturelle.

**EN :**
From 2 to 5 years, the nursery section (Pre-Nursery and Nursery) offers children a complete space for development. Educational games, arts and crafts, musical awakening, introduction to reading and mathematics, educational gardening: every day is a learning adventure. Bilingual immersion is total and natural.

#### Primaire Francophone / French Primary

**FR :**
La section primaire francophone suit les programmes officiels du Ministère de l'Éducation de Base du Cameroun, enrichis de contenus pédagogiques complémentaires. Du CP au CM2, les élèves développent des compétences solides en français, mathématiques, sciences et histoire-géographie. L'anglais est enseigné en intensif à raison de plusieurs heures par semaine, assurant un vrai bilinguisme à la sortie du cycle.

**EN :**
The French primary section follows the official programmes of the Cameroon Ministry of Basic Education, enriched with complementary teaching content. From Grade 1 to Grade 6, students develop strong skills in French, mathematics, science and social studies. English is taught intensively for several hours per week, ensuring true bilingualism at the end of the cycle.

#### Primaire Anglophone / English Primary

**FR :**
La section primaire anglophone propose un curriculum anglophone rigoureux, en parfaite conformité avec les directives du MINEDUB. L'enseignement se fait majoritairement en anglais, avec une place importante accordée au français comme langue seconde. Les élèves progressent en confiance vers les meilleures filières secondaires anglophones du pays.

**EN :**
The English primary section offers a rigorous anglophone curriculum, in full compliance with MINEDUB guidelines. Teaching is conducted primarily in English, with significant space given to French as a second language. Students confidently progress towards the best anglophone secondary schools in the country.

---

### 8.4 Page Admissions

#### Introduction

**FR :**
Rejoindre les Génies d'Afrique, c'est choisir pour votre enfant un cadre d'excellence, de sécurité et d'épanouissement. Notre processus d'admission est simple, transparent et accessible. Nous vous accompagnons à chaque étape.

**EN :**
Joining Les Génies d'Afrique means choosing a framework of excellence, safety and fulfilment for your child. Our admission process is simple, transparent and accessible. We guide you every step of the way.

#### CTA inscription

**FR :**
Les inscriptions sont ouvertes du lundi au vendredi, de 8h00 à 13h00, au secrétariat de l'école. Venez avec votre dossier complet ou appelez-nous pour un premier rendez-vous.

**EN :**
Enrollment is open Monday to Friday, from 8AM to 1PM, at the school's administrative office. Come with your complete file or call us to schedule a first appointment.

---

### 8.5 Page Contact

#### Texte d'introduction

**FR :**
Vous avez une question sur nos programmes, nos tarifs ou la procédure d'inscription ? Notre équipe est à votre disposition. Contactez-nous par téléphone, par email, ou directement via le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.

**EN :**
Do you have a question about our programmes, fees or enrolment procedure? Our team is at your disposal. Contact us by phone, email, or directly through the form below. We will get back to you as soon as possible.

#### Message de confirmation de formulaire

**FR :**
Votre message a bien été envoyé. Merci de votre intérêt pour le Complexe Scolaire Bilingue Les Génies d'Afrique. Un membre de notre équipe vous contactera dans les 24 à 48 heures.

**EN :**
Your message has been sent successfully. Thank you for your interest in the Bilingual School Complex Les Génies d'Afrique. A member of our team will contact you within 24 to 48 hours.

---

### 8.6 Méta-descriptions SEO (par page)

| Page | Meta description FR | Meta description EN |
|---|---|---|
| Accueil | Complexe Scolaire Bilingue Les Génies d'Afrique à Nkozoa, Yaoundé. École bilingue FR/EN de la crèche au primaire. Agrément MINEDUB 2025. | Bilingual School Complex Les Génies d'Afrique in Nkozoa, Yaoundé. FR/EN bilingual school from day care to primary. MINEDUB accredited 2025. |
| Présentation | Découvrez la mission, les valeurs et l'équipe du Complexe Scolaire Bilingue Les Génies d'Afrique, établissement agréé MINEDUB à Yaoundé. | Discover the mission, values and team of Les Génies d'Afrique Bilingual School, MINEDUB accredited institution in Yaoundé. |
| Programmes | Crèche, maternelle et primaire bilingue à Yaoundé. Découvrez nos programmes FR/EN, nos projets pédagogiques et nos activités périscolaires. | Day care, nursery and bilingual primary in Yaoundé. Discover our FR/EN programmes, educational projects and extracurricular activities. |
| Admissions | Procédure d'admission, frais de scolarité et dossier d'inscription au Complexe Scolaire Bilingue Les Génies d'Afrique à Nkozoa, Yaoundé. | Admission procedure, tuition fees and enrolment file for Les Génies d'Afrique Bilingual School in Nkozoa, Yaoundé. |
| Contact | Contactez le Complexe Scolaire Bilingue Les Génies d'Afrique à Nkozoa, Yaoundé. Tél : 651 11 15 06 / 656 66 38 48. | Contact Les Génies d'Afrique Bilingual School in Nkozoa, Yaoundé. Tel: 651 11 15 06 / 656 66 38 48. |

---

### 8.7 Sélecteur de langue — textes UI

| Élément | FR | EN |
|---|---|---|
| Bouton langue | Français | English |
| Menu hamburger | Menu | Menu |
| Fermer menu | Fermer | Close |
| Retour en haut | Haut de page | Back to top |
| Lire la suite | Lire la suite | Read more |
| En savoir plus | En savoir plus | Learn more |
| Télécharger | Télécharger | Download |
| Envoyer | Envoyer | Send |
| Chargement | Chargement… | Loading… |
| Succès formulaire | Message envoyé ! | Message sent! |
| Erreur formulaire | Veuillez remplir tous les champs obligatoires. | Please fill in all required fields. |


---

## 9. ANNEXES

### 9.1 Références visuelles — Sites inspirants

#### A. International School of Kenya (ISK) — https://www.isk.ac.ke

**Éléments observés et à transposer :**

- **Hero vidéo / diaporama plein écran :** ISK utilise une vidéo en fond plein écran (`100vh`) avec texte centré blanc sur overlay sombre. À reproduire avec les photos de l'école.
- **Section statistiques animées :** ISK présente ses chiffres clés ("By the Numbers") avec des compteurs animés en fond sombre — `10:1` ratio élèves/enseignants, `98.5%` taux de réussite IB, `70+` nationalités, `96%` parents satisfaits. Même approche avec les données du CSB-LGA.
- **Structure "Who We Are" + "Why ISK?" :** Présentation en 2 colonnes alternant texte et visuel, paragraphes courts et percutants. À adapter pour "Pourquoi les Génies d'Afrique ?"
- **Palette bleue profonde avec accents or :** Ton institutionnel sérieux mais chaleureux — cohérent avec la charte du CSB-LGA.
- **Sections bien aérées :** Très grand espacement vertical entre les sections (80–120px), sections à fond alterné blanc/gris clair/bleu.
- **CTA "Explore Virtual Tour" :** À adapter en "Visitez notre école" avec galerie photo immersive.
- **Événements à venir :** Bloc "Upcoming Events" avec dates et descriptions courtes — à intégrer dans la section Actualités/Agenda.
- **Navigation sticky avec fond transparent → opaque :** Pattern exact à reproduire.

---

#### B. École Jeannine Manuel — https://www.ecolejeanninemanuel.org

**Éléments observés et à transposer :**

- **Devise mise en avant dans le hero :** "Think, Dare, Share & Care." — style sobre, Playfair Display italique, ligne seule en pleine page. À adapter : *"Travail – Discipline – Succès"* en affichage premium.
- **Citation fondatrice :** L'école Jeannine Manuel cite systématiquement sa fondatrice dans une section dédiée avec guillemets stylisés et attribution en italique. À transposer avec la vision du directeur du CSB-LGA.
- **Section "Well-being au cœur du projet" :** Notion de bien-être élève mise en section visuelle forte. À décliner en *"L'épanouissement au cœur de notre projet"* avec icône cœur.
- **Mission bilingue centrale :** La mission bilingue est déclinée sur toutes les pages avec constance. Appliquer le même principe : mention FR/EN systématique dès le header et dans chaque section de présentation.
- **Typographie Playfair Display + sans-serif :** Combinaison classique du secteur éducatif premium — confirmée comme choix typographique dans le Design System.
- **Mise en page sobre et centrée :** Sections à max-width 800–900px centrées, texte long bien structuré avec sous-titres clairs. Standard à maintenir pour les pages intérieures.
- **Esthétique épurée :** Très peu d'animations agressives, accent sur la lisibilité et le contenu. Équilibre à trouver : ajouter les animations modernes (ISK) sans sacrifier la sobriété (Jeannine Manuel).

---

### 9.2 Galerie d'images disponibles

Les photos suivantes sont disponibles dans `/public/images/` et doivent être utilisées selon leur contenu :

| Fichier | Utilisation recommandée |
|---|---|
| `IMG-20260722-WA0048.jpg` | Section présentation école / hero intérieur |
| `IMG-20260722-WA0049.jpg` | Section présentation école / galerie |
| `IMG-20260722-WA0050.jpg` | Brochure/informations école — à utiliser en page Admissions |
| `IMG-20260722-WA0051.jpg` | Brochure/informations école — frais, niveaux |
| `IMG-20260723-WA0004.jpg` | Activités élèves — section Programmes ou Galerie |
| `IMG-20260723-WA0005.jpg` | Activités élèves — section Galerie |
| `IMG-20260723-WA0006.jpg` | Grande photo — candidate hero page d'accueil |
| `IMG-20260723-WA0007.jpg` | Élèves en classe — section Programmes |
| `IMG-20260723-WA0008.jpg` | Activités scolaires — section Vie Scolaire |
| `IMG-20260723-WA0012.jpg` | Photo de groupe — section Présentation ou Footer |
| `IMG-20260723-WA0013.jpg` | Activité périscolaire — section Programmes/Activités |
| `IMG-20260723-WA0015.jpg` | Ambiance scolaire — Galerie |
| `IMG-20260723-WA0017.jpg` | Élèves en activité — section Why Choose Us |
| `IMG-20260723-WA0018.jpg` | Portrait ou activité — Témoignages / Galerie |
| `IMG-20260723-WA0022.jpg` | Activité extérieure — section Vie Scolaire |
| `IMG-20260723-WA0024.jpg` | Salle de classe — section Programmes |
| `IMG-20260723-WA0034.jpg` | Groupe élèves — Galerie ou section accueil |
| `IMG-20260723-WA0037.jpg` | Activité scolaire — Galerie |
| `IMG-20260723-WA0039.jpg` | Ambiance école — Hero diaporama |
| `IMG-20260723-WA0046.jpg` | Portrait ou remise — section Témoignages |
| `IMG-20260723-WA0051.jpg` | Activité ou événement — Actualités |
| `IMG-20260723-WA0056.jpg` | Photo illustrative — section Présentation |
| `IMG-20260723-WA0075.jpg` | Activité créative — section Programmes Maternelle |

**Logo :** `/public/logo/logo.jpg` — Utiliser en SVG si possible pour la qualité à toutes tailles. Demander le fichier vectoriel (`.svg` ou `.ai`) à la direction.

---

### 9.3 Notes techniques pour le développeur

#### Structure du projet Next.js recommandée

```
src/
├── app/
│   ├── [locale]/           # Routing i18n (fr / en)
│   │   ├── page.tsx        # Accueil
│   │   ├── presentation/
│   │   ├── programmes/
│   │   ├── admissions/
│   │   ├── vie-scolaire/
│   │   ├── actualites/
│   │   ├── temoignages/
│   │   ├── espace-parents/
│   │   └── contact/
│   └── layout.tsx
├── components/
│   ├── ui/                 # Composants atomiques (Button, Card, Badge…)
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Sections de la page d'accueil
│   └── pages/              # Composants spécifiques à chaque page
├── lib/
│   ├── i18n/               # Fichiers de traduction FR/EN
│   └── utils/
├── styles/
│   └── globals.css
└── public/
    ├── images/
    ├── logo/
    └── videos/
```

#### Fichiers de traduction i18n

```json
// messages/fr.json (extrait)
{
  "hero": {
    "badge": "Bilingue · Agréé MINEDUB · Nkozoa, Yaoundé",
    "title": "Former aujourd'hui les leaders de demain",
    "subtitle": "Un cadre d'excellence bilingue pour l'épanouissement total de votre enfant.",
    "cta_primary": "Inscrire mon enfant",
    "cta_secondary": "Découvrir l'école"
  },
  "nav": {
    "home": "Accueil",
    "school": "L'École",
    "programs": "Programmes",
    "admissions": "Admissions",
    "life": "Vie Scolaire",
    "news": "Actualités",
    "contact": "Contact",
    "enroll": "S'inscrire"
  }
}

// messages/en.json (extrait)
{
  "hero": {
    "badge": "Bilingual · MINEDUB Accredited · Nkozoa, Yaoundé",
    "title": "Shaping today's leaders for tomorrow",
    "subtitle": "A bilingual excellence environment for your child's total development.",
    "cta_primary": "Enroll My Child",
    "cta_secondary": "Explore Our School"
  },
  "nav": {
    "home": "Home",
    "school": "The School",
    "programs": "Programs",
    "admissions": "Admissions",
    "life": "School Life",
    "news": "News",
    "contact": "Contact",
    "enroll": "Enroll Now"
  }
}
```

#### Schema.org — données structurées

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Complexe Scolaire Bilingue Les Génies d'Afrique",
  "alternateName": "CSB-LGA",
  "description": "École bilingue privée de la crèche au primaire, agréée MINEDUB, à Nkozoa, Yaoundé, Cameroun.",
  "url": "https://www.lesgeniesdafrique.cm",
  "telephone": "+237651111506",
  "email": "lesgeniesdafrique@836gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nkozoa, derrière la Boulangerie Massa",
    "addressLocality": "Yaoundé",
    "addressCountry": "CM"
  },
  "sameAs": [
    "https://www.facebook.com/lesgeniesdafrique"
  ],
  "foundingDate": "2025",
  "educationalLevel": ["Crèche", "Maternelle", "Primaire"],
  "inLanguage": ["fr", "en"]
}
```

#### Variables CSS (design tokens à définir dans `globals.css`)

```css
:root {
  /* Couleurs */
  --color-blue-primary: #1A3A8F;
  --color-blue-dark: #0D1F6B;
  --color-blue-light: #2D5BE3;
  --color-red-primary: #D32F2F;
  --color-red-dark: #B71C1C;
  --color-gold: #F5A623;
  --color-white: #FFFFFF;
  --color-grey-bg: #F7F9FC;
  --color-grey-text: #4A5568;
  --color-grey-title: #1A202C;
  --color-green-success: #2E7D32;

  /* Typographie */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Montserrat', 'Helvetica Neue', sans-serif;

  /* Rayons */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* Ombres */
  --shadow-card: 0 4px 24px rgba(26,58,143,0.08);
  --shadow-card-hover: 0 12px 40px rgba(26,58,143,0.15);
  --shadow-btn: 0 4px 15px rgba(211,47,47,0.35);

  /* Transitions */
  --transition-fast: 200ms ease;
  --transition-base: 300ms cubic-bezier(0.4,0,0.2,1);
  --transition-slow: 600ms ease;
}
```

---

### 9.4 Checklist de livraison

**Avant la mise en ligne, vérifier :**

- [ ] Toutes les pages affichées en FR et EN, bascule fonctionnelle
- [ ] Header sticky testé sur Chrome, Firefox, Safari, Edge
- [ ] Navigation mobile (drawer) testée sur iOS et Android
- [ ] Formulaire de contact : envoi, validation, message de succès
- [ ] Formulaire d'inscription : étapes wizard, validation Zod
- [ ] Toutes les images au format WebP avec fallback JPEG
- [ ] Logo en haute résolution (SVG recommandé)
- [ ] Score Lighthouse ≥ 90 en Performance, Accessibilité, SEO
- [ ] Balises Open Graph vérifiées (partage Facebook, WhatsApp)
- [ ] Schema.org validé via Google Rich Results Test
- [ ] Sitemap.xml soumis à Google Search Console
- [ ] Certificat SSL actif (HTTPS)
- [ ] Politique de confidentialité / Mentions légales en ligne
- [ ] Bouton WhatsApp flottant fonctionnel (lien `https://wa.me/237651111506`)
- [ ] Carte Google Maps ou Leaflet centrée sur Nkozoa
- [ ] Analytics Plausible ou Google Analytics configuré
- [ ] Test d'affichage sur mobile (375px, 390px, 414px)
- [ ] Test d'affichage tablette (768px, 1024px)
- [ ] Test contraste WCAG AA sur tous les textes

---

*Fin du cahier des charges — Document complet v1.0*  
*Complexe Scolaire Bilingue Les Génies d'Afrique — Yaoundé, Cameroun*  
*© Juillet 2026 — Document confidentiel, usage interne*
