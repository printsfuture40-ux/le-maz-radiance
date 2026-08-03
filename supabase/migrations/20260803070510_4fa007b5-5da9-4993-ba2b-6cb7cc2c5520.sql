CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP TABLE IF EXISTS public.user_roles;
DROP TYPE IF EXISTS public.app_role;

CREATE TABLE public.admin_settings (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id),
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_algo TEXT NOT NULL DEFAULT 'pbkdf2-sha256',
  password_iterations INTEGER NOT NULL DEFAULT 0,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX admin_sessions_expires_at_idx ON public.admin_sessions (expires_at);

REVOKE ALL ON public.admin_settings FROM anon, authenticated;
REVOKE ALL ON public.admin_sessions FROM anon, authenticated;
GRANT ALL ON public.admin_settings TO service_role;
GRANT ALL ON public.admin_sessions TO service_role;

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.admin_settings (id, password_hash, password_salt, password_algo, password_iterations)
SELECT true,
       encode(extensions.digest(convert_to(s.salt || '19-370', 'utf8'), 'sha256'), 'hex'),
       s.salt,
       'sha256-salt',
       0
FROM (SELECT encode(extensions.gen_random_bytes(16), 'hex') AS salt) s
ON CONFLICT (id) DO NOTHING;