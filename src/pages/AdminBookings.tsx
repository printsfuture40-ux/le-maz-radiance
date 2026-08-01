import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatKES } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";

type BookingStatus = "pending_payment" | "confirmed" | "cancelled" | "completed";

type Booking = {
  id: string;
  reference: string;
  full_name: string;
  phone: string;
  services: { name: string; price: number }[];
  total_amount: number;
  deposit_amount: number;
  booking_date: string;
  status: BookingStatus;
  created_at: string;
};

const statusLabel: Record<BookingStatus, string> = {
  pending_payment: "Pending Payment",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

const statusClass: Record<BookingStatus, string> = {
  pending_payment: "bg-amber-100 text-amber-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-rose-100 text-rose-900",
  completed: "bg-slate-200 text-slate-900",
};

const AdminBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data } = await supabase.rpc("has_role", {
        _user_id: sessionData.session.user.id,
        _role: "admin",
      });
      if (!active) return;
      setAllowed(Boolean(data));
      setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true });
    if (error) {
      toast({ title: "Could not load bookings", description: error.message, variant: "destructive" });
    } else {
      setBookings((data ?? []) as unknown as Booking[]);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    if (allowed) load();
  }, [allowed, load]);

  const update = async (id: string, status: BookingStatus) => {
    setBusyId(id);
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      toast({ title: `Booking marked ${statusLabel[status].toLowerCase()}.` });
    }
    setBusyId(null);
  };

  const visible = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter],
  );

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" />
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl font-semibold">Access restricted</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          This account does not have booking management access. Please contact the salon administrator.
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/auth", { replace: true });
          }}
        >
          Sign out
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-10 py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold">Bookings</h1>
            <p className="text-sm text-muted-foreground">{bookings.length} total</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
              <SelectTrigger className="w-48 rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending_payment">Pending Payment</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Sign out"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/auth", { replace: true });
              }}
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-gold" />
          </div>
        ) : visible.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No bookings to show.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-accent/40 text-left">
                <tr>
                  {["Customer", "Phone", "Services", "Date", "Deposit", "Status", "Created", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((b) => (
                  <tr key={b.id} className="border-t border-border align-top">
                    <td className="px-4 py-3">
                      <span className="font-medium">{b.full_name}</span>
                      <span className="block text-xs text-muted-foreground">{b.reference}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.phone}</td>
                    <td className="px-4 py-3 max-w-xs">
                      {(b.services ?? []).map((s) => s.name).join(", ")}
                      <span className="block text-xs text-muted-foreground">
                        Total {formatKES(b.total_amount)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.booking_date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatKES(b.deposit_amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${statusClass[b.status]}`}>
                        {statusLabel[b.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(b.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs"
                          disabled={busyId === b.id || b.status === "confirmed"}
                          onClick={() => update(b.id, "confirmed")}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs"
                          disabled={busyId === b.id || b.status === "completed"}
                          onClick={() => update(b.id, "completed")}
                        >
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full text-xs"
                          disabled={busyId === b.id || b.status === "cancelled"}
                          onClick={() => update(b.id, "cancelled")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminBookings;
