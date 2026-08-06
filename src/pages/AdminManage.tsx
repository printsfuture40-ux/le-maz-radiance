import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ImagePlus, Loader2, LogOut, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { adminInvoke, adminLogout } from "@/lib/adminSession";
import { imageLibrary } from "@/data/imageLibrary";
import { formatKES } from "@/data/services";
import { cn } from "@/lib/utils";

const PORTFOLIO_CATEGORIES = ["Braiding", "Wigs & Locks", "Nails", "Bridal & Editorial"];

type PortfolioItem = {
  id?: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
  hidden: boolean;
};

type Product = {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string | null;
  available: boolean;
  featured: boolean;
  display_order: number;
  hidden: boolean;
};

type PaymentSettings = {
  business_name: string;
  paybill: string;
  till: string;
  account_reference: string;
  deposit_percent: number;
  callback_url: string;
  automation_mode: "manual" | "automatic" | "hybrid";
};

const emptyPortfolio = (): PortfolioItem => ({
  category: PORTFOLIO_CATEGORIES[0],
  title: "",
  description: "",
  image_url: "",
  display_order: 0,
  hidden: false,
});

const emptyProduct = (): Product => ({
  name: "",
  category: "",
  description: "",
  price: 0,
  image_url: null,
  available: true,
  featured: false,
  display_order: 0,
  hidden: false,
});

/** Gold-framed picker over the bundled Le'maz photo library. */
const ImagePicker = ({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2">
      <Label>Image</Label>
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-border bg-accent/40 flex-shrink-0">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ImagePlus size={18} />
            </span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/visual/photo.jpeg or https://…"
          />
          <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={() => setOpen(true)}>
            Choose from library
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-display">Photo Library</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-1">
              {imageLibrary.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    onChange(src);
                    setOpen(false);
                  }}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    value === src ? "border-gold" : "border-transparent hover:border-gold/50",
                  )}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AdminManage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [payment, setPayment] = useState<PaymentSettings | null>(null);
  const [darajaConfigured, setDarajaConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [pItem, setPItem] = useState<PortfolioItem | null>(null);
  const [prod, setProd] = useState<Product | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [p, pr, pay] = await Promise.all([
      adminInvoke<{ items: PortfolioItem[] }>("admin-content", { action: "portfolio-list" }),
      adminInvoke<{ items: Product[] }>("admin-content", { action: "products-list" }),
      adminInvoke<{ settings: PaymentSettings; daraja_configured: boolean }>("admin-content", {
        action: "payment-get",
      }),
    ]);
    setPortfolio(p.data?.items ?? []);
    setProducts(pr.data?.items ?? []);
    if (pay.data?.settings) setPayment(pay.data.settings);
    setDarajaConfigured(Boolean(pay.data?.daraja_configured));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const savePortfolio = async () => {
    if (!pItem) return;
    if (!pItem.image_url.trim()) {
      toast({ title: "Choose an image first", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await adminInvoke("admin-content", { action: "portfolio-save", ...pItem });
    setSaving(false);
    if (error) return toast({ title: "Save failed", description: error, variant: "destructive" });
    setPItem(null);
    toast({ title: "Portfolio updated." });
    load();
  };

  const deletePortfolio = async (id?: string) => {
    if (!id) return;
    const { error } = await adminInvoke("admin-content", { action: "portfolio-delete", id });
    if (error) return toast({ title: "Delete failed", description: error, variant: "destructive" });
    setPortfolio((prev) => prev.filter((i) => i.id !== id));
  };

  const saveProduct = async () => {
    if (!prod) return;
    if (!prod.name.trim()) {
      toast({ title: "A product name is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await adminInvoke("admin-content", { action: "product-save", ...prod });
    setSaving(false);
    if (error) return toast({ title: "Save failed", description: error, variant: "destructive" });
    setProd(null);
    toast({ title: "Product saved." });
    load();
  };

  const deleteProduct = async (id?: string) => {
    if (!id) return;
    const { error } = await adminInvoke("admin-content", { action: "product-delete", id });
    if (error) return toast({ title: "Delete failed", description: error, variant: "destructive" });
    setProducts((prev) => prev.filter((i) => i.id !== id));
  };

  const savePayment = async (extra: Record<string, string> = {}) => {
    if (!payment) return;
    setSaving(true);
    const { error } = await adminInvoke("admin-content", {
      action: "payment-save",
      ...payment,
      ...extra,
    });
    setSaving(false);
    if (error) return toast({ title: "Save failed", description: error, variant: "destructive" });
    toast({ title: "Payment settings saved." });
    load();
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-gold" size={24} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-gold text-[11px] uppercase tracking-ultra-wide">Owner Panel</p>
            <h1 className="font-display text-3xl font-semibold">Manage Content</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" onClick={() => navigate("/admin/bookings")}>
              <CalendarDays size={15} className="mr-2" /> Bookings
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={async () => {
                await adminLogout();
                navigate("/auth", { replace: true });
              }}
            >
              <LogOut size={15} className="mr-2" /> Sign out
            </Button>
          </div>
        </header>

        <Tabs defaultValue="portfolio">
          <TabsList className="mb-6">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* ---------- Portfolio ---------- */}
          <TabsContent value="portfolio" className="space-y-4">
            <Button
              className="rounded-full bg-gold text-charcoal hover:bg-gold-light"
              onClick={() => setPItem(emptyPortfolio())}
            >
              <Plus size={15} className="mr-2" /> Add photo
            </Button>

            {portfolio.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No custom photos yet — the site is showing the default gallery.
              </p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border overflow-hidden bg-card">
                  <img src={item.image_url} alt={item.title} className="w-full h-44 object-cover" />
                  <div className="p-4 space-y-1">
                    <p className="text-[11px] uppercase tracking-wider text-gold">{item.category}</p>
                    <p className="font-medium text-sm">{item.title || "Untitled"}</p>
                    {item.hidden && <p className="text-[11px] text-muted-foreground">Hidden from site</p>}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="rounded-full" onClick={() => setPItem(item)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full text-destructive"
                        onClick={() => deletePortfolio(item.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ---------- Products ---------- */}
          <TabsContent value="products" className="space-y-4">
            <Button
              className="rounded-full bg-gold text-charcoal hover:bg-gold-light"
              onClick={() => setProd(emptyProduct())}
            >
              <Plus size={15} className="mr-2" /> Add product
            </Button>

            {products.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No products yet — the Products page shows the “Coming Soon” screen until you add one.
              </p>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border overflow-hidden bg-card">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-full h-44 object-cover" />
                  )}
                  <div className="p-4 space-y-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-gold">{formatKES(item.price)}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {item.available ? "In stock" : "Out of stock"}
                      {item.hidden ? " • hidden" : ""}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="rounded-full" onClick={() => setProd(item)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-full text-destructive"
                        onClick={() => deleteProduct(item.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ---------- Payments ---------- */}
          <TabsContent value="payments">
            {payment && (
              <div className="max-w-xl space-y-5 rounded-2xl border border-border p-6 bg-card">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business name</Label>
                    <Input
                      value={payment.business_name}
                      onChange={(e) => setPayment({ ...payment, business_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Deposit %</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={payment.deposit_percent}
                      onChange={(e) =>
                        setPayment({ ...payment, deposit_percent: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PayBill</Label>
                    <Input
                      value={payment.paybill}
                      onChange={(e) => setPayment({ ...payment, paybill: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Till number</Label>
                    <Input
                      value={payment.till}
                      onChange={(e) => setPayment({ ...payment, till: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Account reference</Label>
                    <Input
                      value={payment.account_reference}
                      onChange={(e) => setPayment({ ...payment, account_reference: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-accent/40 p-4">
                  <div>
                    <p className="text-sm font-medium">Automated M-Pesa (Daraja)</p>
                    <p className="text-xs text-muted-foreground">
                      {darajaConfigured
                        ? "Credentials saved."
                        : "Not configured — clients pay manually and you confirm each booking."}
                    </p>
                  </div>
                  <Switch
                    checked={payment.automation_mode !== "manual"}
                    onCheckedChange={(on) =>
                      setPayment({ ...payment, automation_mode: on ? "automatic" : "manual" })
                    }
                  />
                </div>

                <Button
                  onClick={() => savePayment()}
                  disabled={saving}
                  className="rounded-full bg-gold text-charcoal hover:bg-gold-light"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : "Save payment settings"}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Portfolio editor */}
      <Dialog open={Boolean(pItem)} onOpenChange={(o) => !o && setPItem(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {pItem?.id ? "Edit photo" : "Add photo"}
            </DialogTitle>
          </DialogHeader>
          {pItem && (
            <div className="space-y-4">
              <ImagePicker
                value={pItem.image_url}
                onChange={(url) => setPItem({ ...pItem, image_url: url })}
              />
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={pItem.category}
                  onChange={(e) => setPItem({ ...pItem, category: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {PORTFOLIO_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={pItem.title}
                  onChange={(e) => setPItem({ ...pItem, title: e.target.value })}
                  placeholder="Knotless Long Braids"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pf-hidden">Hide from website</Label>
                <Switch
                  id="pf-hidden"
                  checked={pItem.hidden}
                  onCheckedChange={(v) => setPItem({ ...pItem, hidden: v })}
                />
              </div>
              <Button
                onClick={savePortfolio}
                disabled={saving}
                className="w-full rounded-full bg-gold text-charcoal hover:bg-gold-light h-11"
              >
                {saving ? <Loader2 size={15} className="animate-spin" /> : "Save"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Product editor */}
      <Dialog open={Boolean(prod)} onOpenChange={(o) => !o && setProd(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">{prod?.id ? "Edit product" : "Add product"}</DialogTitle>
          </DialogHeader>
          {prod && (
            <div className="space-y-4">
              <ImagePicker
                value={prod.image_url}
                onChange={(url) => setProd({ ...prod, image_url: url })}
              />
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={prod.name} onChange={(e) => setProd({ ...prod, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={prod.category}
                    onChange={(e) => setProd({ ...prod, category: e.target.value })}
                    placeholder="Haircare"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price (KES)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={prod.price}
                    onChange={(e) => setProd({ ...prod, price: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={prod.description}
                  onChange={(e) => setProd({ ...prod, description: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pr-available">In stock</Label>
                <Switch
                  id="pr-available"
                  checked={prod.available}
                  onCheckedChange={(v) => setProd({ ...prod, available: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pr-hidden">Hide from website</Label>
                <Switch
                  id="pr-hidden"
                  checked={prod.hidden}
                  onCheckedChange={(v) => setProd({ ...prod, hidden: v })}
                />
              </div>
              <Button
                onClick={saveProduct}
                disabled={saving}
                className="w-full rounded-full bg-gold text-charcoal hover:bg-gold-light h-11"
              >
                {saving ? <Loader2 size={15} className="animate-spin" /> : "Save"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default AdminManage;
