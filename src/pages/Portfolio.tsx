import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import braidingImg from "@/assets/braiding-service.jpg";
import wigImg from "@/assets/wig-service.jpg";
import makeupImg from "@/assets/makeup-service.jpg";
import nailImg from "@/assets/nail-service.jpg";
import kidsImg from "@/assets/kids-service.jpg";
import heroImg from "@/assets/hero-main.jpg";
import bridalImg from "@/assets/bridal-bundle.jpg";
import salonImg from "@/assets/salon-interior.jpg";
import spaImg from "@/assets/spa-service.jpg";

const categories = ["All", "Braiding", "Wigs & Weaves", "Makeup", "Nails", "Kids", "Bridal", "Salon"];

const portfolio = [
  { src: braidingImg, cat: "Braiding", title: "Knotless Box Braids" },
  { src: heroImg, cat: "Braiding", title: "Elegant Cornrow Design" },
  { src: wigImg, cat: "Wigs & Weaves", title: "Luxury Wig Installation" },
  { src: makeupImg, cat: "Makeup", title: "Full Glam Beat" },
  { src: nailImg, cat: "Nails", title: "Gold Accent Nail Art" },
  { src: kidsImg, cat: "Kids", title: "Kids Braids with Beads" },
  { src: bridalImg, cat: "Bridal", title: "Bridal Glam Makeup" },
  { src: salonImg, cat: "Salon", title: "Le'maz Interior" },
  { src: spaImg, cat: "Salon", title: "Spa Treatment Room" },
  { src: braidingImg, cat: "Braiding", title: "Passion Twists" },
  { src: wigImg, cat: "Wigs & Weaves", title: "Frontal Wig Styling" },
  { src: makeupImg, cat: "Makeup", title: "Soft Glam Look" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? portfolio : portfolio.filter((p) => p.cat === filter);

  return (
    <main className="pt-24 pb-20 lg:pb-0">
      <section className="section-padding bg-charcoal text-primary-foreground text-center">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Portfolio</h1>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">Every look tells a story. Browse our gallery of transformations.</p>
        </ScrollReveal>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all ${
                  filter === cat ? "bg-gold text-primary-foreground" : "bg-card text-foreground/70 hover:text-gold border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title + i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                >
                  <img src={item.src} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-primary-foreground font-display font-semibold text-sm">{item.title}</p>
                      <p className="text-gold text-xs">{item.cat}</p>
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
