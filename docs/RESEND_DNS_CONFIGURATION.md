# Configuration DNS pour Resend

## Aperçu

Pour envoyer des e-mails depuis votre propre domaine avec Resend, vous devez configurer les enregistrements DNS appropriés. Cela permet de vérifier que vous êtes le propriétaire du domaine et d'améliorer la délivrabilité des e-mails.

## Étapes de configuration

### 1. Créer un domaine dans Resend

1. Connectez-vous à votre compte Resend : https://resend.com/domains
2. Cliquez sur "Add Domain"
3. Entrez votre domaine (ex: `geniesdafrique.com`)
4. Resend générera les enregistrements DNS à ajouter

### 2. Enregistrements DNS à ajouter

Resend vous demandera d'ajouter les enregistrements suivants à votre configuration DNS :

#### TXT Record (Vérification du domaine)
```
Type: TXT
Host: @
Value: resend-verification=your-verification-code
```

#### TXT Record (SPF)
```
Type: TXT
Host: @
Value: v=spf1 include:resend.com ~all
```

#### TXT Record (DKIM)
```
Type: TXT
Host: resend._domainkey
Value: v=DKIM1; p=your-dkim-key
```

#### CNAME Record (Tracking)
```
Type: CNAME
Host: resend
Value: track.resend.com
```

### 3. Où ajouter ces enregistrements ?

Si votre domaine est enregistré chez un registrar externe (ex: Namecheap, GoDaddy, OVH) :

1. Connectez-vous au panneau de contrôle de votre registrar
2. Naviguez vers la section "DNS Management" ou "DNS Settings"
3. Ajoutez chaque enregistrement DNS fourni par Resend
4. Sauvegardez les modifications

Si votre domaine est géré par Vercel :

1. Allez dans votre projet Vercel
2. Naviguez vers Settings > Domains
3. Sélectionnez votre domaine
4. Ajoutez les enregistrements DNS dans la section DNS Records

### 4. Vérification

Après avoir ajouté les enregistrements DNS :

1. Retournez sur Resend
2. Cliquez sur "Verify DNS Records"
3. Resend vérifiera automatiquement les enregistrements
4. La vérification peut prendre jusqu'à 24-48 heures (généralement quelques minutes)

### 5. Configuration de l'adresse d'expédition

Une fois le domaine vérifié, vous pouvez configurer l'adresse d'expédition dans les variables d'environnement :

```env
RESEND_FROM_EMAIL=Les Génies d'Afrique <newsletter@geniesdafrique.com>
```

## Notes importantes

- **Ne modifiez pas les enregistrements DNS existants** sans comprendre leur impact
- **Les modifications DNS peuvent prendre jusqu'à 48 heures** pour se propager
- **Conservez vos enregistrements SPF existants** en ajoutant `include:resend.com` au lieu de remplacer
- **Testez l'envoi d'e-mails** après la vérification du domaine

## Pour le développement

Pendant le développement, vous pouvez utiliser l'adresse par défaut de Resend :

```env
RESEND_FROM_EMAIL=Les Génies d'Afrique <onboarding@resend.dev>
```

Cette adresse ne nécessite pas de configuration DNS et fonctionne immédiatement.

## Dépannage

### Les enregistrements DNS ne se vérifient pas

- Vérifiez que vous avez ajouté tous les enregistrements
- Attendez quelques minutes et réessayez
- Vérifiez que vous n'avez pas fait de fautes de frappe dans les valeurs
- Certains registrars ont des interfaces différentes pour les enregistrements TXT

### Les e-mails ne sont pas reçus

- Vérifiez le dossier spam
- Assurez-vous que le domaine est vérifié dans Resend
- Vérifiez que l'adresse d'expédition est correctement configurée

## Support

Pour plus d'informations, consultez la documentation Resend :
- https://resend.com/docs/domains/introduction
- https://resend.com/docs/dmca-dns
