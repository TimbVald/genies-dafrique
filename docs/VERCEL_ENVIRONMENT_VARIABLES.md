# Configuration des Variables d'Environnement sur Vercel

## Aperçu

Ce document explique comment configurer les variables d'environnement nécessaires pour le système de newsletter Resend sur Vercel.

## Variables d'Environnement Requises

### 1. RESEND_API_KEY

**Description** : Clé API Resend pour l'envoi d'e-mails

**Comment obtenir** :
1. Connectez-vous à votre compte Resend : https://resend.com/api-keys
2. Cliquez sur "Create API Key"
3. Donnez un nom à votre clé (ex: "Production")
4. Copiez la clé générée (commence par `re_`)

**Configuration sur Vercel** :
1. Allez dans votre projet Vercel
2. Naviguez vers Settings > Environment Variables
3. Cliquez sur "Add New"
4. Nom : `RESEND_API_KEY`
5. Valeur : votre clé API Resend (ex: `re_Js8VEcGv_9mX3A8F...`)
6. Sélectionnez les environnements : Production, Preview, Development
7. Cliquez sur "Save"

**IMPORTANT** :
- NE PAS ajouter le préfixe `NEXT_PUBLIC_`
- Cette variable doit rester côté serveur uniquement
- Ne jamais exposer cette clé dans le code client

### 2. RESEND_FROM_EMAIL

**Description** : Adresse d'expédition pour les e-mails

**Valeurs possibles** :

Pour le développement (sans configuration DNS) :
```
RESEND_FROM_EMAIL=Les Génies d'Afrique <onboarding@resend.dev>
```

Pour la production (avec domaine vérifié) :
```
RESEND_FROM_EMAIL=Les Génies d'Afrique <newsletter@geniesdafrique.com>
```

**Configuration sur Vercel** :
1. Allez dans Settings > Environment Variables
2. Cliquez sur "Add New"
3. Nom : `RESEND_FROM_EMAIL`
4. Valeur : l'adresse d'expédition souhaitée
5. Sélectionnez les environnements appropriés
6. Cliquez sur "Save"

## Étapes de Configuration

### 1. Via l'interface Web Vercel

1. Connectez-vous à Vercel : https://vercel.com
2. Sélectionnez votre projet `genies-dafrique`
3. Cliquez sur l'onglet "Settings"
4. Dans la barre latérale, cliquez sur "Environment Variables"
5. Pour chaque variable :
   - Cliquez sur "Add New"
   - Entrez le nom de la variable
   - Entrez la valeur
   - Sélectionnez les environnements (Production, Preview, Development)
   - Cliquez sur "Save"
6. Redéployez votre projet pour appliquer les changements

### 2. Via Vercel CLI

```bash
# Ajouter une variable pour tous les environnements
vercel env add RESEND_API_KEY

# Ajouter une variable pour un environnement spécifique
vercel env add RESEND_FROM_EMAIL production

# Lister toutes les variables
vercel env ls

# Supprimer une variable
vercel env rm RESEND_API_KEY production
```

### 3. Via le fichier .env.local (développement uniquement)

Pour le développement local, créez un fichier `.env.local` à la racine du projet :

```env
RESEND_API_KEY=re_votre_clé_api_ici
RESEND_FROM_EMAIL=Les Génies d'Afrique <onboarding@resend.dev>
```

**IMPORTANT** :
- Le fichier `.env.local` ne doit jamais être commité dans Git
- Il est déjà dans `.gitignore`
- Utilisez `.env.example` comme template

## Différents Environnements

### Development
- Utilisé pour le développement local
- Variables définies dans `.env.local`
- Peut utiliser `onboarding@resend.dev`

### Preview
- Utilisé pour les déploiements de preview (pull requests)
- Variables configurées dans Vercel pour l'environnement Preview
- Peut utiliser `onboarding@resend.dev` pour les tests

### Production
- Utilisé pour le site en production
- Variables configurées dans Vercel pour l'environnement Production
- Doit utiliser le domaine vérifié : `newsletter@geniesdafrique.com`

## Vérification de la Configuration

Après avoir configuré les variables :

1. **Vérifier que les variables sont présentes** :
   ```bash
   vercel env ls
   ```

2. **Tester localement** :
   - Assurez-vous que `.env.local` est configuré
   - Lancez le serveur de développement : `npm run dev`
   - Testez le formulaire newsletter

3. **Tester en production** :
   - Poussez vos changements sur Git
   - Vercel déploiera automatiquement
   - Testez le formulaire sur l'URL de production

## Dépannage

### Les e-mails ne sont pas envoyés

- Vérifiez que `RESEND_API_KEY` est correctement configurée
- Vérifiez que la clé commence par `re_`
- Vérifiez les logs Vercel pour les erreurs
- Assurez-vous que la clé API a les permissions nécessaires

### Erreur "Email service not configured"

- Vérifiez que `RESEND_API_KEY` est définie
- Vérifiez qu'elle n'a pas le préfixe `NEXT_PUBLIC_`
- Redéployez après avoir ajouté la variable

### Les e-mails arrivent mais avec le mauvais expéditeur

- Vérifiez la valeur de `RESEND_FROM_EMAIL`
- Assurez-vous que le domaine est vérifié dans Resend si vous utilisez votre propre domaine
- Pour le développement, utilisez `onboarding@resend.dev`

## Sécurité

- **Jamais** exposer les clés API dans le code client
- **Jamais** committer `.env.local`
- **Jamais** utiliser `NEXT_PUBLIC_` pour les secrets
- **Toujours** utiliser des clés API différentes pour dev et prod
- **Faire** tourner les clés API régulièrement

## Ressources

- Documentation Vercel Environment Variables : https://vercel.com/docs/projects/environment-variables
- Documentation Resend API Keys : https://resend.com/docs/api-reference/api-keys
