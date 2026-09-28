/**
 * Newsletter Welcome Email Template
 * Generates HTML for welcome email based on language
 */

type Locale = 'fr' | 'en';

interface WelcomeEmailProps {
  email: string;
  locale: Locale;
}

export function generateWelcomeEmailHtml({ email, locale }: WelcomeEmailProps): string {
  const content = locale === 'fr' ? frenchContent : englishContent;
  
  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #0D1F6B;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo-text {
      font-size: 20px;
      font-weight: bold;
      color: #0D1F6B;
    }
    .welcome-text {
      font-size: 18px;
      color: #1A3A8F;
      margin-bottom: 15px;
    }
    .description {
      color: #555;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      background-color: #D32F2F;
      color: #ffffff;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #B71C1C;
    }
    .footer {
      background-color: #0D1F6B;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 12px;
    }
    .footer a {
      color: #F5A623;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    @media only screen and (max-width: 600px) {
      .container {
        width: 100%;
        border-radius: 0;
      }
      .header, .content, .footer {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">Les Génies d'Afrique</div>
    </div>
    
    <div class="content">
      <div class="logo">
        <h2 class="welcome-text">${content.greeting}</h2>
      </div>
      
      <p class="description">${content.welcomeMessage}</p>
      
      <p class="description">${content.newsletterValue}</p>
      
      <div style="text-align: center;">
        <a href="${content.siteUrl}" class="button">${content.ctaButton}</a>
      </div>
      
      <p class="description">${content.closing}</p>
      
      <p class="description">
        <strong>${content.signature}</strong><br>
        ${content.schoolName}
      </p>
    </div>
    
    <div class="footer">
      <p>${content.footerText}</p>
      <p>
        <a href="${content.unsubscribeUrl}">${content.unsubscribeText}</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

const frenchContent = {
  subject: "Bienvenue chez Les Génies d'Afrique",
  greeting: "Bienvenue !",
  welcomeMessage: "Merci de vous être inscrit à la newsletter de Les Génies d'Afrique. Nous sommes ravis de vous compter parmi nous.",
  newsletterValue: "Vous recevrez désormais nos actualités, nos événements et les informations importantes sur la vie de notre établissement scolaire.",
  siteUrl: "https://csbgeniesdafrique.com",
  ctaButton: "Découvrir notre site",
  closing: "Si vous avez des questions, n'hésitez pas à nous contacter. Nous serons heureux de vous répondre.",
  signature: "L'équipe de Les Génies d'Afrique",
  schoolName: "Complexe Scolaire Bilingue Les Génies d'Afrique",
  footerText: "© 2026 Les Génies d'Afrique. Tous droits réservés.",
  unsubscribeUrl: "https://csbgeniesdafrique.com/unsubscribe",
  unsubscribeText: "Se désabonner",
};

const englishContent = {
  subject: "Welcome to Les Génies d'Afrique",
  greeting: "Welcome!",
  welcomeMessage: "Thank you for subscribing to the Les Génies d'Afrique newsletter. We are delighted to have you with us.",
  newsletterValue: "You will now receive our news, events, and important information about our school.",
  siteUrl: "https://csbgeniesdafrique.com",
  ctaButton: "Visit our website",
  closing: "If you have any questions, please don't hesitate to contact us. We'll be happy to help.",
  signature: "The Les Génies d'Afrique Team",
  schoolName: "Bilingual School Complex Les Génies d'Afrique",
  footerText: "© 2026 Les Génies d'Afrique. All rights reserved.",
  unsubscribeUrl: "https://csbgeniesdafrique.com/unsubscribe",
  unsubscribeText: "Unsubscribe",
};
