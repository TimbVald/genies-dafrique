/**
 * Newsletter Welcome Email Template
 * Generates HTML for welcome email based on language
 */

type Locale = "fr" | "en";

interface WelcomeEmailProps {
  email: string;
  locale: Locale;
}

export function generateWelcomeEmailHtml({ email, locale }: WelcomeEmailProps): string {
  const content = locale === "fr" ? frenchContent : englishContent;

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1A202C;
      margin: 0;
      padding: 0;
      background-color: #F7FAFC;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F7FAFC;
      padding: 30px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #E2E8F0;
    }
    .header {
      background: linear-gradient(135deg, #0D1F6B 0%, #1A3A8F 100%);
      padding: 35px 20px;
      text-align: center;
    }
    .header-logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 12px auto;
      display: block;
      border-radius: 50%;
      background-color: #ffffff;
      padding: 4px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .header p {
      color: rgba(255, 255, 255, 0.85);
      margin: 4px 0 0 0;
      font-size: 13px;
    }
    .content {
      padding: 35px 30px;
    }
    .welcome-badge {
      display: inline-block;
      background-color: #EEF2FF;
      color: #1A3A8F;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }
    .welcome-text {
      font-size: 22px;
      color: #0D1F6B;
      margin: 0 0 16px 0;
      font-weight: 700;
    }
    .description {
      color: #4A5568;
      font-size: 15px;
      line-height: 1.65;
      margin-bottom: 18px;
    }
    .cta-container {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      background-color: #D32F2F;
      color: #ffffff !important;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 15px;
      box-shadow: 0 4px 14px rgba(211, 47, 47, 0.35);
    }
    .highlight-card {
      background-color: #F8FAFC;
      border-left: 4px solid #F5A623;
      padding: 16px;
      border-radius: 6px;
      margin: 24px 0;
    }
    .highlight-card p {
      margin: 0;
      font-size: 14px;
      color: #2D3748;
    }
    .signature-block {
      border-top: 1px solid #EDF2F7;
      padding-top: 20px;
      margin-top: 25px;
    }
    .signature-title {
      font-weight: 700;
      color: #0D1F6B;
      font-size: 15px;
    }
    .signature-sub {
      color: #718096;
      font-size: 13px;
    }
    .footer {
      background-color: #0D1F6B;
      color: #A0AEC0;
      padding: 25px 20px;
      text-align: center;
      font-size: 12px;
    }
    .footer p {
      margin: 6px 0;
    }
    .footer a {
      color: #F5A623;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 0;
      }
      .container {
        width: 100% !important;
        border-radius: 0;
        border: none;
      }
      .content {
        padding: 25px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- En-tête avec Logo -->
      <div class="header">
        <img 
          src="https://www.csbgeniesdafrique.com/logo/logo.png" 
          alt="Les Génies d'Afrique" 
          class="header-logo"
        />
        <h1>Les Génies d'Afrique</h1>
        <p>${content.tagline}</p>
      </div>
      
      <!-- Contenu -->
      <div class="content">
        <span class="welcome-badge">${content.badge}</span>
        <h2 class="welcome-text">${content.greeting}</h2>
        
        <p class="description">${content.welcomeMessage}</p>
        
        <div class="highlight-card">
          <p>📌 ${content.newsletterValue}</p>
        </div>
        
        <div class="cta-container">
          <a href="${content.siteUrl}" class="button" target="_blank">${content.ctaButton}</a>
        </div>
        
        <p class="description">${content.closing}</p>
        
        <div class="signature-block">
          <div class="signature-title">${content.signature}</div>
          <div class="signature-sub">${content.schoolName}</div>
        </div>
      </div>
      
      <!-- Pied de page -->
      <div class="footer">
        <p>${content.footerText}</p>
        <p>
          <a href="${content.unsubscribeUrl}">${content.unsubscribeText}</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

const frenchContent = {
  subject: "Bienvenue chez Les Génies d'Afrique !",
  tagline: "Former aujourd'hui les leaders de demain",
  badge: "Newsletter Officielle",
  greeting: "Bienvenue dans notre communauté !",
  welcomeMessage:
    "Merci de vous être inscrit(e) à la newsletter du Complexe Scolaire Bilingue Les Génies d'Afrique. Nous sommes ravis de vous compter parmi nous.",
  newsletterValue:
    "Vous recevrez désormais nos actualités, nos projets pédagogiques innovants, le calendrier de nos événements et les informations importantes sur la vie de notre école.",
  siteUrl: "https://www.csbgeniesdafrique.com",
  ctaButton: "Découvrir notre école",
  closing:
    "Pour toute question ou demande d'information, n'hésitez pas à répondre directement à cet e-mail ou à nous contacter.",
  signature: "L'équipe de direction",
  schoolName: "Complexe Scolaire Bilingue Les Génies d'Afrique (Nkozoa, Yaoundé)",
  footerText: "© 2026 Les Génies d'Afrique. Tous droits réservés.",
  unsubscribeUrl: "https://www.csbgeniesdafrique.com/contact",
  unsubscribeText: "Gérer mes préférences / Me désabonner",
};

const englishContent = {
  subject: "Welcome to Les Génies d'Afrique!",
  tagline: "Shaping today's leaders for tomorrow",
  badge: "Official Newsletter",
  greeting: "Welcome to our community!",
  welcomeMessage:
    "Thank you for subscribing to the Les Génies d'Afrique Bilingual School Complex newsletter. We are delighted to have you with us.",
  newsletterValue:
    "You will now receive our latest news, innovative educational projects, event calendars, and important school announcements.",
  siteUrl: "https://www.csbgeniesdafrique.com",
  ctaButton: "Visit our school website",
  closing:
    "If you have any questions, please feel free to reply directly to this email or contact us.",
  signature: "School Management Team",
  schoolName: "Bilingual School Complex Les Génies d'Afrique (Nkozoa, Yaoundé)",
  footerText: "© 2026 Les Génies d'Afrique. All rights reserved.",
  unsubscribeUrl: "https://www.csbgeniesdafrique.com/contact",
  unsubscribeText: "Manage preferences / Unsubscribe",
};
