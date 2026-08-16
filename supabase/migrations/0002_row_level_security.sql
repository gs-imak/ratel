-- Ratel, règles d'accès.
--
-- RLS activé sur toutes les tables. Le principe : la clé anonyme est publique, donc
-- tout ce qui n'est pas explicitement autorisé ici est refusé, y compris si le code
-- applicatif se trompe. La clé service-role contourne RLS et reste strictement côté
-- serveur.

-- Rôle du compte courant. SECURITY DEFINER pour que la lecture de `profiles` ne
-- déclenche pas récursivement la politique de `profiles`.
create or replace function current_role_of() returns user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

create or replace function is_staff() returns boolean
language sql
stable
as $$
  select coalesce(current_role_of() = 'staff', false);
$$;

alter table profiles        enable row level security;
alter table products        enable row level security;
alter table orders          enable row level security;
alter table order_items     enable row level security;
alter table order_events    enable row level security;
alter table leads           enable row level security;
alter table subscriptions   enable row level security;
alter table alerts          enable row level security;
alter table alert_events    enable row level security;

-- --- profiles ---------------------------------------------------------------
create policy "profiles: lire le sien" on profiles
  for select using (id = auth.uid() or is_staff());

create policy "profiles: modifier le sien" on profiles
  for update using (id = auth.uid() or is_staff());

-- Création de compte réservée au personnel : pas d'inscription libre (ADR 0002).
create policy "profiles: creation par le personnel" on profiles
  for insert with check (is_staff());

-- --- products ---------------------------------------------------------------
-- Catalogue public en lecture, écriture réservée au personnel.
create policy "products: lecture publique" on products
  for select using (is_published or is_staff());

create policy "products: ecriture personnel" on products
  for all using (is_staff()) with check (is_staff());

-- --- orders -----------------------------------------------------------------
-- Le suivi public passe par le jeton, jamais par cette politique : la page de suivi
-- est rendue côté serveur avec la clé service-role et ne lit que la commande dont le
-- jeton figure dans l'URL.
create policy "orders: le client voit les siennes" on orders
  for select using (
    customer_id = auth.uid()
    or courier_id = auth.uid()
    or is_staff()
  );

create policy "orders: ecriture personnel" on orders
  for all using (is_staff()) with check (is_staff());

-- Le livreur fait avancer ses propres livraisons, sans rien pouvoir changer d'autre.
create policy "orders: le livreur avance les siennes" on orders
  for update using (courier_id = auth.uid()) with check (courier_id = auth.uid());

create policy "order_items: suit la commande" on order_items
  for select using (
    exists (
      select 1 from orders o
      where o.id = order_items.order_id
        and (o.customer_id = auth.uid() or o.courier_id = auth.uid() or is_staff())
    )
  );

create policy "order_items: ecriture personnel" on order_items
  for all using (is_staff()) with check (is_staff());

create policy "order_events: suit la commande" on order_events
  for select using (
    exists (
      select 1 from orders o
      where o.id = order_events.order_id
        and (o.customer_id = auth.uid() or o.courier_id = auth.uid() or is_staff())
    )
  );

create policy "order_events: ajout personnel ou livreur" on order_events
  for insert with check (
    is_staff()
    or exists (select 1 from orders o where o.id = order_events.order_id and o.courier_id = auth.uid())
  );

-- --- leads ------------------------------------------------------------------
-- Volontairement aucune politique de lecture pour les non-staff : une demande de
-- devis contient des coordonnées personnelles. L'insertion depuis le site public
-- passe par l'action serveur avec la clé service-role.
create policy "leads: personnel uniquement" on leads
  for all using (is_staff()) with check (is_staff());

-- --- subscriptions ----------------------------------------------------------
create policy "subscriptions: l abonne voit la sienne" on subscriptions
  for select using (subscriber_id = auth.uid() or is_staff());

create policy "subscriptions: ecriture personnel" on subscriptions
  for all using (is_staff()) with check (is_staff());

-- --- alerts -----------------------------------------------------------------
-- Un abonné ne peut déclencher une alerte que sur un abonnement ACTIF qui lui
-- appartient. La condition est ici et pas seulement dans le bouton.
create policy "alerts: declenchement par un abonne actif" on alerts
  for insert with check (
    exists (
      select 1 from subscriptions s
      where s.id = alerts.subscription_id
        and s.subscriber_id = auth.uid()
        and s.status = 'active'
    )
  );

create policy "alerts: l abonne suit la sienne" on alerts
  for select using (
    exists (select 1 from subscriptions s where s.id = alerts.subscription_id and s.subscriber_id = auth.uid())
    or is_staff()
  );

-- Prise en charge et clôture réservées au personnel de garde.
create policy "alerts: traitement personnel" on alerts
  for update using (is_staff()) with check (is_staff());

create policy "alert_events: lecture" on alert_events
  for select using (
    is_staff()
    or exists (
      select 1 from alerts a
      join subscriptions s on s.id = a.subscription_id
      where a.id = alert_events.alert_id and s.subscriber_id = auth.uid()
    )
  );

-- Journal en ajout seul. Aucune politique update ou delete n'existe, donc personne
-- ne peut réécrire l'historique d'une alerte, y compris le personnel (R8).
create policy "alert_events: ajout" on alert_events
  for insert with check (true);
