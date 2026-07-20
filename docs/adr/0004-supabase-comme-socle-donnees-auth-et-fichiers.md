# Supabase comme socle données, auth et fichiers

Les fonctionnalités demandées (comptes abonnés, stock et date de remise en stock, avis
modérés, commandes, photos et signatures de livraison, alertes Ratalerte) exigent une base
relationnelle, une authentification par rôles, du stockage de fichiers et du temps réel.
Nous retenons Supabase, qui réunit les quatre dans un seul service et s'intègre bien à
Next.js sur Vercel, plutôt que d'assembler Neon, Auth.js et Vercel Blob séparément.

Le verrou fournisseur est réel mais reste du Postgres standard, donc réversible au prix
d'un remplacement de l'auth et du stockage. Cette décision remplace le tableau de produits
codé en dur dans `lib/products.ts`, qui ne permet ni au client de gérer son stock ni de
tenir les autres fonctionnalités.
