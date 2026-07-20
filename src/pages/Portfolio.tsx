import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import braidingImg from "@/assets/braiding-service.jpg";
import wigImg from "@/assets/wig-service.jpg";
import makeupImg from "@/assets/makeup-service.jpg";
import nailImg from "@/assets/nail-service.jpg";
import bridalImg from "@/assets/bridal-bundle.jpg";
import twistsImg from "@/assets/portfolio-twists.jpg";
import fulaniImg from "@/assets/portfolio-fulani.jpg";
import locsImg from "@/assets/portfolio-locs.jpg";
import cornrowsImg from "@/assets/portfolio-cornrows.jpg";
import stilettoNailsImg from "@/assets/portfolio-nails-stiletto.jpg";
import glamWigImg from "@/assets/portfolio-glam-wig.jpg";
import editorialImg from "@/assets/portfolio-editorial.jpg";
import bridalRedImg from "@/assets/portfolio-bridal-red.jpg";
import pedicureImg from "@/assets/portfolio-pedicure.jpg";

const categories = ["All", "Braiding", "Wigs & Locks", "Nails", "Bridal & Editorial"] as const;

// Only category-accurate, authentic Le'maz photography. No forced fillers.
const portfolio = [
  // Braiding
  { src: braidingImg, cat: "Braiding", title: "Sculpted Cornrow Bun" },
  { src: cornrowsImg, cat: "Braiding", title: "Feed-in Cornrow Updo" },
  { src: fulaniImg, cat: "Braiding", title: "Knotless Long Braids" },
  // Wigs & Locks
  { src: wigImg, cat: "Wigs & Locks", title: "Braided Bun Install" },
  { src: locsImg, cat: "Wigs & Locks", title: "Faux Locs Portrait" },
  { src: twistsImg, cat: "Wigs & Locks", title: "Honey Faux Locs" },
  { src: glamWigImg, cat: "Wigs & Locks", title: "Long Braided Extensions" },
  // Nails
  { src: nailImg, cat: "Nails", title: "Stiletto Chrome Set" },
  { src: stilettoNailsImg, cat: "Nails", title: "Monochrome Almond Tips" },
  { src: pedicureImg, cat: "Nails", title: "Classic Red Manicure" },
  // Bridal & Editorial
  { src: makeupImg, cat: "Bridal & Editorial", title: "Soft Glam Waves" },
  { src: bridalImg, cat: "Bridal & Editorial", title: "Bridal Braided Length" },
  { src: editorialImg, cat: "Bridal & Editorial", title: "Editorial Bare Glow" },
  { src: bridalRedImg, cat: "Bridal & Editorial", title: "Statement Bridesmaid Braids" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? portfolio : portfolio.filter((p) => p.cat === filter);

  return (
    <main className="pt-24 pb-20">
      <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={fulaniImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <ScrollReveal>
            <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Work</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Portfolio</h1>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              Every look tells a story. Real clients. Real craft. Curated selections from our recent transformations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                  filter === cat
                    ? "bg-gold text-charcoal shadow-[0_4px_20px_-4px_hsl(42_68%_52%/0.4)]"
                    : "bg-card text-foreground/60 hover:text-gold border border-border hover:border-gold/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.cat}-${item.title}`}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div>
                      <p className="text-primary-foreground font-display font-semibold">{item.title}</p>
                      <p className="text-gold text-xs tracking-wider uppercase">{item.cat}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
