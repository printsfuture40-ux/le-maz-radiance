## Goal
Replace email/password + roles authentication with a single owner password that unlocks the booking dashboard. Nothing about the public site (layout, colors, imagery, booking flow) changes.

## 1. Backend

New tables (server-only, no public access granted):
- `admin_settings` — holds exactly one row with the hashed password and `updated_at`. The initial password `19-370` is inserted already hashed (salted PBKDF2/SHA-256); the plaintext never appears in the codebase or the client bundle.
- `admin_sessions` — session token hash, `created_at`, `expires_at` (30-day expiry, refreshed on use). Lets the owner stay signed in and lets us revoke sessions when the password changes.

Both tables get no `anon`/`authenticated` grants — only edge functions using the service role can touch them. The old `user_roles` table and its policies are dropped, along with the admin RLS policies that depended on signed-in users.

New edge function `admin-auth` with actions:
- `login` — accepts a password, verifies against the stored hash with constant-time comparison, issues a session token. Rate-limited (throttled after repeated failures) to block brute force.
- `verify` — validates a session token, used on dashboard load.
- `change-password` — requires a valid session plus the current password, stores the new hash, and invalidates all other sessions.
- `logout` — deletes the session.

New edge function `admin-bookings` — lists and updates bookings, but only after validating the session token server-side. Booking reads/writes no longer happen directly from the browser, so no dashboard data is reachable without the password.

## 2. Frontend

- `/auth` becomes a single "Enter password" screen: one password field, no email, no register link, clear error messages, disabled button while submitting. On success it stores only the opaque session token and redirects to `/admin/bookings`.
- `/admin/bookings` verifies the session with the backend on load; if invalid or expired it redirects to `/auth`. The table, filters and Confirm/Complete/Cancel actions stay visually identical but call the `admin-bookings` function instead of the database directly.
- A **Settings** panel on the dashboard (a modal opened from the header, matching the existing gold/charcoal styling) with Change Password: current password, new password, confirm new password, minimum length enforced server-side. After a successful change the owner is signed out of other devices.
- Sign-out clears the token and the server session.

## 3. Cleanup
- Remove all `supabase.auth` usage, sign-up flow and role checks from the app.
- Keep `/auth` and `/admin/bookings` out of the sitemap and `noindex`, as they are today.

## Technical notes
- Password hashing uses PBKDF2-SHA256 with a per-password random salt, done inside the edge function; only the hash and salt are ever stored.
- Session tokens are 32 random bytes; only their SHA-256 hash is stored, so a database read cannot yield a usable token.
- No secrets, hashes, or booking data are exposed to the client bundle — every privileged operation is behind an edge function.
- The public booking flow (`create-booking`, `process-payment`, `booking-availability`) is untouched.
