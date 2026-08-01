import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useBooking } from "@/components/BookingProvider";
import { catalog } from "@/data/services";
import braidingImg from "@/assets/braiding-service.jpg";
import wigImg from "@/assets/wig-service.jpg";
import makeupImg from "@/assets/makeup-service.jpg";
import nailImg from "@/assets/nail-service.jpg";
import kidsImg from "@/assets/kids-service.jpg";
import spaImg from "@/assets/spa-service.jpg";

/**
 * Service Vault — pricing & structure aligned 1:1 with the official
 * "Le'maz Beauty Service Catalogue" (see src/data/services.ts).
 */
const categoryImages: Record<string, string> = {
  "Braiding & Twists": braidingImg,
  "Wigs, Weaves & Locks": wigImg,
  "Kids' Hairstyles": kidsImg,
  "Pedicure & Manicure": nailImg,
  "Makeup & Beauty Enhancements": makeupImg,
  "Extras & Add-Ons": spaImg,
};

const categories = catalog.map((c) => ({
  name: c.name,
  img: categoryImages[c.name],
  services: c.services.map((s) => ({ name: s.name, price: s.label })),
}));

const ServiceVault = () => {
  // -1 → all categories collapsed by default per client spec.
  const [openIdx, setOpenIdx] = useState<number>(-1);
  const { open: openBooking } = useBooking();

  return (
    <main className="pt-24 pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={braidingImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 px-6">
          <ScrollReveal>
            <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Expertise</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">The Service Vault</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Every service delivered with Le'maz precision, care, and premium products. Tap a category to explore.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto space-y-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.05}>
              <div className="border border-border rounded-2xl overflow-hidden bg-card hover:border-gold/30 transition-colors">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  className="w-full flex items-center gap-4 p-4 md:p-6 text-left hover:bg-accent/50 transition-colors"
                  aria-expanded={openIdx === i}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg md:text-xl font-semibold">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.services.length} services</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gold transition-transform duration-300 flex-shrink-0 ${
                      openIdx === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-6 space-y-1">
                        <div className="h-px bg-border mb-4" />
                        {cat.services.map((s, j) => (
                          <button
                            key={s.name}
                            type="button"
                            onClick={() => openBooking([s.name])}
                            aria-label={`Book ${s.name}`}
                            className={`w-full text-left flex items-center justify-between gap-4 py-3 px-4 rounded-xl transition-colors ${
                              j % 2 === 0 ? "bg-accent/30 hover:bg-accent/60" : "hover:bg-accent/30"
                            }`}
                          >
                            <span className="text-sm font-medium">{s.name}</span>
                            <span className="text-sm text-gold font-semibold whitespace-nowrap">{s.price}</span>
                          </button>
                        ))}
                        <div className="pt-5">
                          <button
                            type="button"
                            onClick={() => openBooking()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
                          >
                            Book {cat.name}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}

          <p className="text-xs text-muted-foreground text-center pt-6">
            All prices in Kenyan Shillings (KES). Sourced directly from the official Le'maz Service Catalogue.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ServiceVault;
