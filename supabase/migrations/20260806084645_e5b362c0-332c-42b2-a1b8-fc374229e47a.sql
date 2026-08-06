CREATE TABLE public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null default '',
  description text not null default '',
  image_url text not null,
  display_order integer not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT ON public.portfolio_items TO anon, authenticated;
GRANT ALL ON public.portfolio_items TO service_role;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible portfolio items" ON public.portfolio_items FOR SELECT USING (hidden = false);
CREATE TRIGGER portfolio_items_set_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default '',
  description text not null default '',
  price integer not null default 0,
  image_url text,
  available boolean not null default true,
  featured boolean not null default false,
  display_order integer not null default 0,
  hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible products" ON public.products FOR SELECT USING (hidden = false);
CREATE TRIGGER products_set_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.payment_settings (
  id boolean primary key default true,
  business_name text not null default 'Le''maz Beauty Studio',
  paybill text not null default '',
  till text not null default '',
  account_reference text not null default '',
  deposit_percent integer not null default 35,
  daraja_consumer_key text not null default '',
  daraja_consumer_secret text not null default '',
  daraja_passkey text not null default '',
  callback_url text not null default '',
  automation_mode text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  CONSTRAINT payment_settings_singleton CHECK (id),
  CONSTRAINT payment_settings_mode CHECK (automation_mode IN ('manual','automatic','hybrid'))
);
GRANT ALL ON public.payment_settings TO service_role;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER payment_settings_set_updated_at BEFORE UPDATE ON public.payment_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.payment_settings (id, paybill, account_reference) VALUES (true, '880100', 'LEMAZ');

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS guests jsonb not null default '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS payment_method text not null default 'manual';

UPDATE public.admin_settings
SET password_hash = 'b12dc93231a4f120b00102c2c0ad89c34bbdb02860719ab99ff182d24e71c083',
    password_salt = '9d7ffe057e648f2ed168c3fe66c0d337',
    password_algo = 'pbkdf2-sha256',
    password_iterations = 210000,
    failed_attempts = 0,
    locked_until = null
WHERE id = true;