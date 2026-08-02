
-- 1. Booking access token (proof of ownership for payment/cancel)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS access_token text NOT NULL DEFAULT encode(gen_random_bytes(24), 'hex');

-- 2. Remove publicly-executable SECURITY DEFINER functions
DROP FUNCTION IF EXISTS public.get_unavailable_dates();

-- Rewrite policies inline (RLS on user_roles already limits rows to the caller)
DROP POLICY IF EXISTS "Admins can view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view payments" ON public.payments;

CREATE POLICY "Admins can view bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can view payments" ON public.payments
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- 3. Least-privilege grants: no direct writes from clients; writes only via edge functions
REVOKE ALL ON public.bookings FROM anon, authenticated;
REVOKE ALL ON public.payments FROM anon, authenticated;
REVOKE ALL ON public.user_roles FROM anon, authenticated;

GRANT SELECT, UPDATE ON public.bookings TO authenticated;
GRANT SELECT ON public.payments TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;

GRANT ALL ON public.bookings TO service_role;
GRANT ALL ON public.payments TO service_role;
GRANT ALL ON public.user_roles TO service_role;
