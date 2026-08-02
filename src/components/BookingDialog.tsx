import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { catalog, depositFor, formatKES } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Step = "details" | "summary" | "confirmed";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselect?: string[];
};

const priceByName = new Map(
  catalog.flatMap((c) => c.services.map((s) => [s.name, s] as const)),
);

const isValidKenyanPhone = (raw: string) => {
  const digits = raw.replace(/[^\d+]/g, "");
  let p = digits.startsWith("+") ? digits.slice(1) : digits;
  if (p.startsWith("0")) p = "254" + p.slice(1);
  if (p.startsWith("7") || p.startsWith("1")) p = "254" + p;
  return /^254(7|1)\d{8}$/.test(p);
};

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const sixMonthsOut = () => {
  const d = today();
  d.setMonth(d.getMonth() + 6);
  return d;
};

const BookingDialog = ({ open, onOpenChange, preselect = [] }: Props) => {
  const [step, setStep] = useState<Step>("details");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>(preselect);
  const [date, setDate] = useState<Date | undefined>();
  const [notes, setNotes] = useState("");
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unavailable, setUnavailable] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    deposit: number;
    total: number;
    date: string;
  } | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);


  useEffect(() => {
    setSelected(preselect);
  }, [preselect]);

  useEffect(() => {
    let active = true;
    supabase.functions.invoke("booking-availability").then(({ data }) => {
      if (active && Array.isArray(data?.dates)) setUnavailable(data.dates as string[]);
    });
    return () => {
      active = false;
    };
  }, []);


  const total = useMemo(
    () => selected.reduce((sum, name) => sum + (priceByName.get(name)?.price ?? 0), 0),
    [selected],
  );
  const deposit = depositFor(total);
  const balance = total - deposit;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog;
    return catalog
      .map((c) => ({ ...c, services: c.services.filter((s) => s.name.toLowerCase().includes(q)) }))
      .filter((c) => c.services.length > 0);
  }, [query]);

  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const reset = () => {
    setStep("details");
    setFullName("");
    setPhone("");
    setSelected([]);
    setDate(undefined);
    setNotes("");
    setQuery("");
    setErrors({});
    setFormError(null);
    setConfirmation(null);
    setBookingId(null);
    setAccessToken(null);

  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) setTimeout(reset, 250);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (fullName.trim().length < 2) next.fullName = "Please enter your full name.";
    if (!isValidKenyanPhone(phone)) next.phone = "Enter a valid Kenyan number, e.g. 0746 580502.";
    if (selected.length === 0) next.services = "Select at least one service.";
    if (!date) next.date = "Choose your preferred date.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goToSummary = () => {
    setFormError(null);
    if (validate()) setStep("summary");
  };

  const payDeposit = async () => {
    if (submitting || !date) return;
    setSubmitting(true);
    setFormError(null);
    try {
      let id = bookingId;
      let token = accessToken;
      if (!id || !token) {
        const { data, error } = await supabase.functions.invoke("create-booking", {
          body: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            services: selected,
            booking_date: format(date, "yyyy-MM-dd"),
            notes: notes.trim() || null,
          },
        });
        if (error || data?.error) throw new Error(data?.error ?? "We could not save your booking.");
        id = data.booking.id as string;
        token = data.booking.access_token as string;
        setBookingId(id);
        setAccessToken(token);
      }

      const { data: pay, error: payError } = await supabase.functions.invoke("process-payment", {
        body: { booking_id: id, access_token: token, action: "initiate" },
      });

      if (payError || pay?.error) throw new Error(pay?.error ?? "Payment could not be processed.");

      if (pay.status === "confirmed") {
        setConfirmation({
          reference: pay.reference,
          deposit: pay.deposit_amount ?? deposit,
          total: pay.total_amount ?? total,
          date: format(date, "EEEE, d MMMM yyyy"),
        });
        setStep("confirmed");
      } else {
        setFormError("An M-Pesa prompt has been sent to your phone. Complete it to confirm your booking.");
      }
    } catch (err) {
      setFormError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Book Your Appointment</DialogTitle>
              <DialogDescription>
                Tell us who you are and when you'd like to come in. We'll handle the timing on the day.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              <div className="space-y-2">
                <Label htmlFor="booking-name">Full Name</Label>
                <Input
                  id="booking-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Wanjiru"
                  autoComplete="name"
                />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-phone">Phone Number</Label>
                <Input
                  id="booking-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0746 580502"
                  inputMode="tel"
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label>Select Service(s)</Label>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search services…"
                  aria-label="Search services"
                />
                <ScrollArea className="h-52 rounded-xl border border-border">
                  <div className="p-2">
                    {filtered.map((cat) => (
                      <div key={cat.name} className="mb-3">
                        <p className="px-2 py-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                          {cat.name}
                        </p>
                        {cat.services.map((s) => {
                          const active = selected.includes(s.name);
                          return (
                            <button
                              key={s.name}
                              type="button"
                              onClick={() => toggle(s.name)}
                              aria-pressed={active}
                              className={cn(
                                "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                                active ? "bg-gold/15 text-foreground" : "hover:bg-accent/50",
                              )}
                            >
                              <span className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0",
                                    active ? "bg-gold border-gold" : "border-border",
                                  )}
                                >
                                  {active && <Check size={12} className="text-charcoal" />}
                                </span>
                                {s.name}
                              </span>
                              <span className="text-xs text-gold font-semibold whitespace-nowrap">
                                {s.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                    {filtered.length === 0 && (
                      <p className="p-4 text-sm text-muted-foreground text-center">No services match that search.</p>
                    )}
                  </div>
                </ScrollArea>
                {errors.services && <p className="text-xs text-destructive">{errors.services}</p>}
              </div>

              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start rounded-xl font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon size={16} className="mr-2" />
                      {date ? format(date, "EEEE, d MMMM yyyy") : "Choose a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      fromDate={today()}
                      toDate={sixMonthsOut()}
                      disabled={(d) => unavailable.includes(format(d, "yyyy-MM-dd"))}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-[11px] text-muted-foreground">
                  We manage arrival times on the day — walk-ins and booked clients are both welcome.
                </p>
                {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-notes">Additional Notes (optional)</Label>
                <Textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know?"
                  rows={3}
                />
              </div>

              {total > 0 && (
                <div className="rounded-xl bg-accent/40 p-4 text-sm flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated total</span>
                  <span className="font-display font-semibold">{formatKES(total)}</span>
                </div>
              )}

              <Button
                onClick={goToSummary}
                className="w-full rounded-full bg-gold text-charcoal hover:bg-gold-light uppercase tracking-wider text-xs font-semibold h-12"
              >
                Review Booking
              </Button>
            </div>
          </>
        )}

        {step === "summary" && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Review Your Booking</DialogTitle>
              <DialogDescription>
                Confirm the details below, then secure your slot with a 35% deposit.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 pt-2">
              <div className="rounded-2xl border border-border p-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium text-right">{fullName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium text-right">{phone}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-right">
                    {date ? format(date, "EEEE, d MMMM yyyy") : "—"}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-4 space-y-2">
                {selected.map((name) => (
                  <div key={name} className="flex justify-between gap-4 text-sm">
                    <span>{name}</span>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {formatKES(priceByName.get(name)?.price ?? 0)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-charcoal text-primary-foreground p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Service total</span>
                  <span>{formatKES(total)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-gold">Deposit due now (35%)</span>
                  <span className="text-gold">{formatKES(deposit)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Balance at the salon</span>
                  <span>{formatKES(balance)}</span>
                </div>
              </div>

              {formError && (
                <p className="text-sm text-destructive text-center" role="alert">
                  {formError}
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full h-12"
                  onClick={() => setStep("details")}
                  disabled={submitting}
                >
                  Back
                </Button>
                <Button
                  onClick={payDeposit}
                  disabled={submitting}
                  className="flex-1 rounded-full bg-gold text-charcoal hover:bg-gold-light uppercase tracking-wider text-xs font-semibold h-12"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : "Pay Deposit"}
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <ShieldCheck size={12} /> Deposit paid via M-Pesa. Balance settled at the salon.
              </p>
            </div>
          </>
        )}

        {step === "confirmed" && confirmation && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Booking Confirmed</DialogTitle>
              <DialogDescription>
                We can't wait to see you. A member of our team will be in touch if anything changes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 pt-2">
              <div className="rounded-2xl bg-accent/40 p-5 text-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Booking Reference</p>
                <p className="font-display text-2xl font-bold text-gold mt-1">{confirmation.reference}</p>
              </div>
              <div className="rounded-2xl border border-border p-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-right">{confirmation.date}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Deposit paid</span>
                  <span className="font-medium">{formatKES(confirmation.deposit)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Balance at salon</span>
                  <span className="font-medium">{formatKES(confirmation.total - confirmation.deposit)}</span>
                </div>
              </div>
              <Button
                onClick={() => handleClose(false)}
                className="w-full rounded-full bg-gold text-charcoal hover:bg-gold-light uppercase tracking-wider text-xs font-semibold h-12"
              >
                Done
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
