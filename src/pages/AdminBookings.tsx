import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatKES } from "@/data/services";
import { adminInvoke, adminLogout, verifyAdminSession } from "@/lib/adminSession";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  const signOut = useCallback(async () => {
    await adminLogout();
    navigate("/auth", { replace: true });
  }, [navigate]);

  useEffect(() => {
    let active = true;
    verifyAdminSession().then((valid) => {
      if (!active) return;
      if (!valid) {
        navigate("/auth", { replace: true });
        return;
      }
      setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await adminInvoke<{ bookings: Booking[] }>("admin-bookings", {
      action: "list",
    });
    if (error) {
      toast({ title: "Could not load bookings", description: error, variant: "destructive" });
    } else {
      setBookings(data?.bookings ?? []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    if (!checking) load();
  }, [checking, load]);

  const update = async (id: string, status: BookingStatus) => {
    setBusyId(id);
    const { error } = await adminInvoke("admin-bookings", {
      action: "update-status",
      id,
      status,
    });
    if (error) {
      toast({ title: "Update failed", description: error, variant: "destructive" });
    } else {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      toast({ title: `Booking marked ${statusLabel[status].toLowerCase()}.` });
    }
    setBusyId(null);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwSaving) return;
    setPwError(null);
    if (newPassword.trim().length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    setPwSaving(true);
    const { error } = await adminInvoke("admin-auth", {
      action: "change-password",
      current_password: currentPassword,
      new_password: newPassword,
    });
    setPwSaving(false);
    if (error) {
      setPwError(error);
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSettingsOpen(false);
    toast({ title: "Password updated", description: "Other devices have been signed out." });
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
              aria-label="Settings"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Sign out"
              onClick={signOut}
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

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Settings</DialogTitle>
            <DialogDescription>
              Update the dashboard password. All other devices will be signed out.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={changePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            {pwError && <p className="text-sm text-destructive">{pwError}</p>}
            <Button
              type="submit"
              disabled={pwSaving}
              className="w-full h-11 rounded-full bg-gold text-charcoal hover:bg-gold-light uppercase tracking-wider text-xs font-semibold"
            >
              {pwSaving ? <Loader2 size={16} className="animate-spin" /> : "Update Password"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AdminBookings;
