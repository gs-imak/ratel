# Configuration, variables d'environnement

À renseigner dans `.env.local` en développement, et dans Vercel
(Project Settings → Environment Variables) en production.

**Le site fonctionne sans aucune de ces variables.** Les formulaires acceptent la
demande et affichent honnêtement qu'elle n'a pas pu être transmise. Rien ne casse et
rien ne ment au visiteur. Renseigner les clés active les fonctions, sans changement
de code.

## Notification des demandes (devis et formation)

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com). Offre gratuite : 3 000 mails par mois, largement suffisant. |
| `RATEL_NOTIFY_TO` | Adresse qui reçoit les demandes. Plusieurs adresses possibles, séparées par une virgule. |
| `RATEL_NOTIFY_FROM` | Expéditeur. Tant que le domaine n'est pas vérifié chez Resend, laisser vide (valeur par défaut `onboarding@resend.dev`). Une fois `ratel.cd` vérifié : `Ratel <contact@ratel.cd>`. |

Sans `RESEND_API_KEY` ou `RATEL_NOTIFY_TO`, l'action serveur enregistre un
avertissement dans les logs et la page de confirmation dit au visiteur de nous
contacter directement.

## Base de données et comptes (lot B)

Tableau de bord Supabase → Project Settings → API.

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet. Publique. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme. Publique, bornée par les règles RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Contourne toutes les règles d'accès. **Serveur uniquement**, jamais préfixée `NEXT_PUBLIC_`, jamais commitée. |

## Hébergement

Le site est commercial, donc le plan Vercel Hobby ne convient pas : ses conditions
d'utilisation le réservent à un usage non commercial. Passer en Pro (20 $/mois).
