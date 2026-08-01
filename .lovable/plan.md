## Goal
Add a lightweight booking workflow (form → summary → 35% deposit → confirmation) backed by Lovable Cloud, an internal bookings page, and the requested price corrections. No redesign — existing layout, colors, typography, animations and imagery stay untouched.

## 1. Backend (Lovable Cloud)
Enable Cloud and add two logically separated tables:

- `bookings` — full_name, phone, services (JSON: name + price), total_amount, deposit_amount, booking_date, notes, status (`pending_payment` | `confirmed` | `cancelled` | `completed`), created_at.
- `payments` — booking_id, provider (`mpesa`), amount, status, provider_ref / checkout_request_id, raw_payload (for future Daraja callbacks), created_at.

Security: public visitors can insert a booking (via a server-side function, not direct table writes) but cannot read others' bookings. Staff read/update access gated by an `admin` role in a separate `user_roles` table with a `has_role()` security-definer function.

Availability: a server function returns the list of dates in the next 6 months that already have 5 confirmed bookings, so the calendar can disable them. The 5-per-day cap is re-checked server-side on submit so it can't be bypassed.

## 2. Booking flow (front end)
A new `/book` page plus a reusable booking dialog, styled with the existing gold/charcoal tokens and shadcn components already in the project.

Steps:
1. **Details** — Full Name, Phone (Kenyan format validation), Service(s) picker sourced from the existing Service Vault catalogue (searchable, multi-select), Preferred Date (calendar: today → +6 months, fully-booked dates disabled), optional Notes. No time selection.
2. **Summary** — services list, Total, Deposit (35%, rounded to whole KES), Balance due at salon.
3. **Payment** — M-Pesa deposit step. Booking is saved as `pending_payment`, then a simulated confirmation marks it `confirmed` and writes a `payments` row. All payment calls go through one server function so real Daraja STK Push + callback can drop in without touching UI.
4. **Confirmation** — booking reference, date, deposit paid, balance.

Error handling: inline field errors, disabled/loading submit button to stop double-clicks, idempotent submission, clear toasts for unavailable dates, failed/cancelled payment, and network errors.

## 3. CTA changes only
"Book Appointment" / "Book Now" CTAs on Home (hero + final CTA), Header, Service Vault, About and Contact open the booking flow instead of WhatsApp. Service Vault buttons pre-select that service. The floating WhatsApp button and all non-booking WhatsApp links (Footer, Products notify, Club enquiries) stay as they are. Buttons keep their exact current styling.

## 4. Admin page
`/admin/bookings` — email/password sign-in (`/auth`), access limited to users with the `admin` role. Simple table: Name, Phone, Service(s), Booking Date, Deposit Paid, Status, Created. Actions: Confirm, Cancel, Mark Completed. Filter by status/date. Not linked in public navigation; excluded from sitemap and set to noindex.

## 5. Price corrections
- Home: "Pedicure & Manicure" from KES 50 → **KES 500**; "Wigs, Weaves & Locks" from KES 500 → **KES 1,000**.
- Service Vault: remove **Advanced Pedicure** and **Advanced Manicure** entirely; **Pedi-Gel** KES 2,000 → **KES 1,000**. Nothing else changes.

## 6. QA
Verify build, no console errors, mobile + desktop layouts unchanged, all existing links work, booking flow end-to-end (including the 5-booking cap and 6-month limit), and no SEO/performance regressions — booking code is lazy-loaded so the home bundle stays the same size.

## Technical notes
- Deposit is computed and re-verified server-side; the client never sets the amount it pays.
- Payment logic lives behind a single `initiate-payment` server function with a provider field, so Daraja credentials + callback URL are the only additions needed later.
- Service catalogue is extracted into a shared module so the vault, home page and booking picker use one source of prices.
