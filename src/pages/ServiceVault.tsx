import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import braidingImg from "@/assets/braiding-service.jpg";
import wigImg from "@/assets/wig-service.jpg";
import makeupImg from "@/assets/makeup-service.jpg";
import nailImg from "@/assets/nail-service.jpg";
import kidsImg from "@/assets/kids-service.jpg";
import spaImg from "@/assets/spa-service.jpg";

/**
 * Service Vault — pricing & structure aligned 1:1 with the official
 * "Le'maz Beauty Service Catalogue" PDF supplied by the client.
 * All prices in KES. Do not modify without an updated catalog.
 */
const categories = [
  {
    name: "Braiding & Twists",
    img: braidingImg,
    services: [
      { name: "Knotless Braids — Large", price: "KES 2,000" },
      { name: "Knotless Braids — Medium", price: "KES 2,500" },
      { name: "Knotless Braids — Small", price: "KES 3,000" },
      { name: "Half Braids, Half Lines — Large", price: "KES 2,000" },
      { name: "Half Braids, Half Lines — Medium", price: "KES 2,500" },
      { name: "Half Braids, Half Lines — Small", price: "KES 3,000" },
      { name: "Ghanaian Lines / Ghana Braids — Large", price: "KES 2,000" },
      { name: "Ghanaian Lines / Ghana Braids — Small", price: "KES 2,500" },
      { name: "Spring Twist / Natural Twists — Large", price: "KES 3,000" },
      { name: "Spring Twist / Natural Twists — Small", price: "KES 3,500" },
      { name: "Twist-Outs — Large", price: "KES 1,000" },
      { name: "Twist-Outs — Medium", price: "KES 1,400" },
      { name: "Twist-Outs — Small", price: "KES 2,000" },
      { name: "Twist-Outs — Micro", price: "KES 4,000" },
    ],
  },
  {
    name: "Wigs, Weaves & Locks",
    img: wigImg,
    services: [
      { name: "Track Sew", price: "KES 3,500" },
      { name: "Wig Installation", price: "KES 1,500" },
      { name: "Wig Styling", price: "KES 1,000" },
      { name: "Wig Revamp", price: "KES 1,500" },
      { name: "Retouch (Wax)", price: "KES 1,200" },
      { name: "Retouch Crochet (Interlocking)", price: "KES 2,000" },
      { name: "Styling", price: "KES 500" },
      { name: "Crochet Pinning", price: "KES 3,500" },
      { name: "Artificial Dreadlocks Installation", price: "KES 4,500" },
      { name: "Sisterlocks Installation", price: "KES 20,000 – 30,000" },
      { name: "Sisterlocks Retie", price: "KES 3,500" },
    ],
  },
  {
    name: "Kids' Hairstyles",
    img: kidsImg,
    services: [
      { name: "Back-to-School Lines — Large", price: "KES 200" },
      { name: "Back-to-School Lines — Medium", price: "KES 400" },
      { name: "Back-to-School Lines — Small", price: "KES 600" },
      { name: "Kids Braids (Inclusive of Hair) — All Styles", price: "KES 2,000" },
      { name: "Kids Twist-Outs — Large", price: "KES 800" },
      { name: "Kids Twist-Outs — Medium", price: "KES 1,200" },
      { name: "Kids Twist-Outs — Small", price: "KES 1,600" },
      { name: "Back-to-School Lines for Adults — Large", price: "KES 300" },
      { name: "Back-to-School Lines for Adults — Medium", price: "KES 600" },
      { name: "Back-to-School Lines for Adults — Small", price: "KES 800" },
    ],
  },
  {
    name: "Pedicure & Manicure",
    img: nailImg,
    services: [
      { name: "Pedicure Plain", price: "KES 1,500" },
      { name: "Pedi-Gel", price: "KES 2,000" },
      { name: "Advanced Pedicure", price: "KES 2,500" },
      { name: "Manicure Plain", price: "KES 800" },
      { name: "Mani-Gel", price: "KES 1,200" },
      { name: "Advanced Manicure", price: "KES 1,700" },
      { name: "Foot Scrubbing", price: "KES 300" },
      { name: "Cuticle Removal", price: "KES 300" },
      { name: "Plain Gel", price: "KES 500" },
      { name: "Tips Gel", price: "KES 1,500" },
      { name: "Stick-Ons Gel", price: "KES 1,200" },
      { name: "Overlays", price: "KES 2,000" },
      { name: "Builder Gel", price: "KES 1,200" },
      { name: "Glam Gel", price: "KES 1,500" },
      { name: "Nail Sculpting", price: "KES 2,000" },
      { name: "Nail Repairs", price: "KES 200" },
      { name: "Press-On Nails", price: "KES 500" },
      { name: "Henna Application", price: "KES 300" },
      { name: "Soak-Off Gel", price: "KES 200" },
      { name: "Soak-Off Tips", price: "KES 500" },
      { name: "Nail Art (Per Nail) — Standard", price: "KES 50" },
      { name: "Nail Art (Per Nail) — Detailed", price: "KES 100" },
      { name: "Top Coat", price: "KES 200" },
    ],
  },
  {
    name: "Makeup & Beauty Enhancements",
    img: makeupImg,
    services: [
      { name: "Full Glam", price: "KES 2,500" },
      { name: "Face Beat", price: "KES 1,500" },
      { name: "Eyebrow Shaping (Laser)", price: "KES 300" },
      { name: "Eyebrow Twisting / Threading", price: "KES 300" },
      { name: "Eyebrow Tinting", price: "KES 500" },
    ],
  },
  {
    name: "Extras & Add-Ons",
    img: spaImg,
    services: [
      { name: "Knotless Undo (Large)", price: "KES 300" },
      { name: "Knotless Undo (Medium)", price: "KES 300" },
      { name: "Knotless Undo (Small)", price: "KES 500" },
      { name: "Ghanaian Undo", price: "KES 300" },
      { name: "Artificial Locks Undo", price: "KES 2,000" },
      { name: "Twist-Outs Undo", price: "KES 300" },
      { name: "Twist-Outs Undo (Small)", price: "KES 500" },
      { name: "Hair Oiling", price: "KES 200" },
      { name: "Dryer Service", price: "KES 500" },
      { name: "Hair Detangling", price: "KES 200" },
      { name: "Leave-In Treatment", price: "KES 800 – 1,000" },
      { name: "Deep Treatment", price: "KES 1,000 – 2,000" },
      { name: "Wash & Straighten (Short)", price: "KES 300" },
      { name: "Full Wash & Straighten", price: "KES 500" },
    ],
  },
];

const ServiceVault = () => {
  // -1 → all categories collapsed by default per client spec.
  const [openIdx, setOpenIdx] = useState<number>(-1);

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
                          <div
                            key={s.name}
                            className={`flex items-center justify-between gap-4 py-3 px-4 rounded-xl transition-colors ${
                              j % 2 === 0 ? "bg-accent/30" : "hover:bg-accent/30"
                            }`}
                          >
                            <span className="text-sm font-medium">{s.name}</span>
                            <span className="text-sm text-gold font-semibold whitespace-nowrap">{s.price}</span>
                          </div>
                        ))}
                        <div className="pt-5">
                          <a
                            href={`https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20a%20${encodeURIComponent(
                              cat.name
                            )}%20service`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-colors"
                          >
                            Book {cat.name}
                          </a>
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
