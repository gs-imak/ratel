-- Ratel, schéma initial.
--
-- Couvre le lot B du cahier des charges du 10/08/2026 (catalogue, stock, commandes,
-- livraison par étapes, paiement à la livraison) et pose les tables que le lot C
-- (Ratalerte) réutilisera, sans les remplir.
--
-- Conventions : identifiants en anglais comme le reste du code, valeurs métier en
-- français quand elles sont affichées. Montants en FRANCS CONGOLAIS ENTIERS : le CDF
-- ne s'utilise pas avec des décimales et le rail M-Pesa refuse les montants
-- fractionnaires, donc bigint et jamais numeric.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Rôles
-- ---------------------------------------------------------------------------
-- Quatre rôles imposés par les trois fonctions demandées. Le rôle vit dans une table
-- applicative et non dans les métadonnées Supabase, pour qu'une politique RLS puisse
-- le lire sans privilège particulier.
create type user_role as enum ('customer', 'subscriber', 'courier', 'staff');

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'customer',
  full_name text not null,
  phone text,
  created_at timestamptz not null default now()
);

comment on table profiles is
  'Un profil par compte. Les comptes abonnés sont créés par Ratel depuis le back-office : il n''y a volontairement pas d''inscription libre (ADR 0002).';

-- ---------------------------------------------------------------------------
-- Catalogue
-- ---------------------------------------------------------------------------
create type product_category as enum ('voiture', 'maison', 'cuisine', 'entreprise');
create type product_kind as enum ('extincteur', 'couverture', 'detecteur');

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  kind product_kind not null,
  category product_category not null,
  tag text not null,
  agent text not null,
  capacity text not null,
  fire_classes text,
  blurb text not null,
  price_cdf bigint not null check (price_cdf >= 0),
  image_path text,
  gallery text[] not null default '{}',
  -- R15 : la quantité décroît à chaque vente ; à zéro la fiche passe en gris et la
  -- commande est bloquée. restock_at est facultatif et affiché au client.
  stock integer not null default 0 check (stock >= 0),
  restock_at date,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column products.price_cdf is
  'Francs congolais entiers. L''affichage en devise étrangère est interdit (arrêté 007/CAB/VPM/MINECONAT/DMS/AKM/2025, art. 6 bis).';

create index products_published_idx on products (is_published, sort_order);

-- ---------------------------------------------------------------------------
-- Commandes
-- ---------------------------------------------------------------------------
-- R9 : les étapes sont horodatées. Le suivi par étapes a été retenu par le client le
-- 10/08/2026, à la place de la carte animée.
create type order_status as enum ('pending', 'prepared', 'in_transit', 'delivered', 'cancelled');
create type payment_method as enum ('mpesa', 'airtel', 'orange');
create type payment_status as enum ('pending', 'paid', 'failed');

create table orders (
  id uuid primary key default gen_random_uuid(),
  -- Numéro lisible affiché au client, généré côté application.
  reference text not null unique,
  -- Un acheteur n'a pas besoin de compte : le lien de suivi suffit (R10).
  customer_id uuid references profiles (id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  address_line text not null,
  commune text,
  city text not null default 'Kinshasa',
  status order_status not null default 'pending',
  payment_method payment_method,
  payment_status payment_status not null default 'pending',
  subtotal_cdf bigint not null check (subtotal_cdf >= 0),
  shipping_cdf bigint not null default 0 check (shipping_cdf >= 0),
  total_cdf bigint not null check (total_cdf >= 0),
  courier_id uuid references profiles (id) on delete set null,
  -- Jeton du lien de suivi public : impossible à deviner, donc consultable sans compte.
  tracking_token uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_status_idx on orders (status, created_at desc);
create index orders_courier_idx on orders (courier_id, status);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  product_id uuid not null references products (id) on delete restrict,
  -- Nom et prix recopiés à la commande : une commande passée ne doit pas changer
  -- parce que le catalogue a bougé ensuite.
  product_name text not null,
  unit_price_cdf bigint not null check (unit_price_cdf >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create index order_items_order_idx on order_items (order_id);

-- Journal des étapes : c'est lui qui porte l'heure de chaque changement, plutôt que
-- des colonnes datées qui se multiplieraient à chaque nouvelle étape.
create table order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders (id) on delete cascade,
  status order_status not null,
  note text,
  created_by uuid references profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index order_events_order_idx on order_events (order_id, created_at);

-- ---------------------------------------------------------------------------
-- Demandes (devis et formation)
-- ---------------------------------------------------------------------------
-- Aujourd'hui ces demandes partent par mail sans être conservées. La table les rend
-- consultables dans le back-office et empêche qu'une demande soit perdue si le mail
-- échoue.
create type lead_kind as enum ('devis', 'formation');
create type lead_status as enum ('new', 'contacted', 'closed');

create table leads (
  id uuid primary key default gen_random_uuid(),
  kind lead_kind not null,
  status lead_status not null default 'new',
  name text not null,
  phone text not null,
  email text,
  sector text,
  address_line text,
  training_type text,
  preferred_date date,
  message text,
  created_at timestamptz not null default now()
);

create index leads_status_idx on leads (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Abonnements et Ratalerte (lot C, tables posées, non alimentées)
-- ---------------------------------------------------------------------------
create type subscription_status as enum ('active', 'suspended', 'ended');

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid not null references profiles (id) on delete cascade,
  status subscription_status not null default 'active',
  -- Fiche du site relevée par le technicien à l'installation. Elle sert de repli
  -- quand le GPS échoue ou tarde, ce qui est fréquent en intérieur.
  site_label text not null,
  site_address text not null,
  site_lat double precision,
  site_lng double precision,
  site_notes text,
  penalty_rate numeric(5, 2) not null default 40.00,
  -- Trace du consentement à la pénalité : date et version exacte du texte accepté.
  penalty_accepted_at timestamptz,
  penalty_terms_version text,
  started_on date not null default current_date,
  ended_on date,
  created_at timestamptz not null default now()
);

create index subscriptions_subscriber_idx on subscriptions (subscriber_id, status);

create type alert_status as enum ('open', 'acknowledged', 'resolved', 'cancelled');
create type alert_outcome as enum ('genuine', 'abusive', 'test');

create table alerts (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions (id) on delete restrict,
  status alert_status not null default 'open',
  lat double precision,
  lng double precision,
  accuracy_m integer,
  -- Vrai quand la position vient de la fiche du site et non du GPS du téléphone.
  used_site_fallback boolean not null default false,
  acknowledged_by uuid references profiles (id) on delete set null,
  acknowledged_at timestamptz,
  resolved_at timestamptz,
  outcome alert_outcome,
  created_at timestamptz not null default now()
);

create index alerts_open_idx on alerts (status, created_at desc);

-- R8 : journal non modifiable. En l'absence de législation encadrant le secours
-- incendie en RDC, c'est la seule preuve dont Ratel disposera en cas de litige.
create table alert_events (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid not null references alerts (id) on delete cascade,
  kind text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

create index alert_events_alert_idx on alert_events (alert_id, created_at);

-- ---------------------------------------------------------------------------
-- updated_at
-- ---------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

create trigger orders_updated_at before update on orders
  for each row execute function set_updated_at();
