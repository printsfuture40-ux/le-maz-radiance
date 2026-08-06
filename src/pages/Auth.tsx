import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminInvoke, setAdminToken, verifyAdminSession } from "@/lib/adminSession";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin/bookings";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    verifyAdminSession().then((valid) => {
      if (active && valid) navigate(from, { replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate, from]);


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    const { data, error: invokeError } = await adminInvoke<{ token: string }>("admin-auth", {
      action: "login",
      password,
    });

    if (invokeError || !data?.token) {
      setError(invokeError ?? "Incorrect password.");
      setLoading(false);
      return;
    }

    setAdminToken(data.token);
    navigate("/admin/bookings", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-32 bg-background">
      <div className="w-full max-w-sm">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/15 text-gold mb-6">
          <Lock size={18} />
        </span>
        <h1 className="font-display text-3xl font-semibold mb-2">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Enter the dashboard password to manage Le'maz bookings.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="submit"
            disabled={loading || password.length === 0}
            className="w-full h-12 rounded-full bg-gold text-charcoal hover:bg-gold-light uppercase tracking-wider text-xs font-semibold"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Enter Dashboard"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Auth;
