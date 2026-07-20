# Une seule PWA plutôt qu'un site et une app native

Ratel a besoin de quatre surfaces (vitrine publique, espace abonnés avec Ratalerte, outil
livreur avec photo et signature, back-office), et la première intention était de livrer un
site web plus une application mobile native distincte. Nous livrons à la place une seule
application Next.js installable (PWA), où chaque surface est protégée par un rôle, parce
que le navigateur couvre déjà tous les besoins matériels du projet (géolocalisation,
appareil photo, signature au doigt, notifications push) et qu'un codebase unique évite de
tripler le coût, la distribution en store et les cycles de mise à jour.

Le risque accepté est la fiabilité du GPS et du push en arrière-plan sur iOS, moins
garantie qu'en natif. Si les conditions réelles à Kinshasa le démentent, seule la couche
Ratalerte serait à porter en natif, le reste restant inchangé.
