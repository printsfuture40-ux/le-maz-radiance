import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import logoImg from "@/assets/lemaz-logo.png";
import ScrollReveal from "@/components/ScrollReveal";
import { formatKES } from "@/data/services";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string | null;
  available: boolean;
};

const ComingSoon = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal text-primary-foreground px-6">
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-30"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.35 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{
        background: "radial-gradient(circle at 50% 40%, hsla(42,68%,52%,0.22), transparent 55%)",
      }}
    />

    <div className="relative z-10 max-w-2xl mx-auto text-center">
      <motion.img
        src={logoImg}
        alt="Le'maz Beauty"
        className="h-16 md:h-20 w-auto mx-auto mb-10 drop-shadow-[0_0_30px_hsla(42,68%,52%,0.3)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      />

      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 text-gold text-[11px] tracking-ultra-wide uppercase mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Sparkles size={12} /> Coming Soon
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.05]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9 }}
      >
        Le'maz <em className="gold-text-gradient not-italic">Products</em>
      </motion.h1>

      <motion.p
        className="text-primary-foreground/60 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        Curated haircare, beauty essentials and signature scents — handpicked to extend the Le'maz
        salon experience to your home. Launching soon.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9 }}
      >
        <a
          href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20please%20notify%20me%20when%20your%20Products%20launch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
        >
          Notify Me <ArrowRight size={16} />
        </a>
      </motion.div>

      <motion.div
        className="mt-12 w-24 h-[1px] gold-gradient mx-auto"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      />
    </div>
  </section>
);

const Products = () => {
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("products")
      .select("id, name, category, description, price, image_url, available")
      .eq("hidden", false)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (active) setItems((data as Product[]) ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  if (items === null || items.length === 0) {
    return (
      <main className="pt-24 lg:pt-0 pb-20 lg:pb-0">
        <ComingSoon />
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center px-6">
        <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">The Shelf</p>
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Le'maz Products</h1>
        <p className="text-primary-foreground/60 max-w-lg mx-auto">
          Salon-grade essentials, curated by our stylists and available at the studio.
        </p>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.05}>
              <article className="group rounded-[1.75rem] overflow-hidden bg-card border border-border h-full flex flex-col">
                {p.image_url && (
                  <div className="overflow-hidden">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-2 flex-1">
                  {p.category && (
                    <p className="text-[11px] uppercase tracking-ultra-wide text-gold">{p.category}</p>
                  )}
                  <h2 className="font-display text-xl font-semibold">{p.name}</h2>
                  {p.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  )}
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-display font-semibold text-lg">{formatKES(p.price)}</span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {p.available ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Products;
