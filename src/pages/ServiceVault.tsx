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

const categories = [
  {
    name: "Braiding & Twists",
    img: braidingImg,
    services: [
      { name: "Knotless Braids (Small)", price: "KES 3,500" },
      { name: "Knotless Braids (Medium)", price: "KES 2,500" },
      { name: "Knotless Braids (Large/Jumbo)", price: "KES 1,500" },
      { name: "Cornrows / Ghanaian Lines", price: "From KES 1,000" },
      { name: "Twist-Outs", price: "From KES 1,500" },
      { name: "Passion Twists", price: "From KES 2,500" },
      { name: "Fulani Braids", price: "From KES 2,000" },
      { name: "Box Braids (Inc. Hair)", price: "From KES 3,000" },
      { name: "Lemonade Braids", price: "From KES 2,000" },
      { name: "Butterfly Locs", price: "From KES 3,000" },
      { name: "Faux Locs", price: "From KES 3,500" },
    ],
  },
  {
    name: "Wigs & Weaves",
    img: wigImg,
    services: [
      { name: "Wig Installation (Frontal)", price: "KES 2,500" },
      { name: "Wig Installation (Closure)", price: "KES 2,000" },
      { name: "Wig Revamp / Styling", price: "From KES 1,500" },
      { name: "Weave Sew-In (Full)", price: "KES 2,000" },
      { name: "Weave Sew-In (Half)", price: "KES 1,500" },
      { name: "Track Sew Services", price: "From KES 1,000" },
      { name: "Wig Customization", price: "From KES 3,000" },
      { name: "Wig Wash & Set", price: "KES 1,000" },
    ],
  },
  {
    name: "Makeup Artistry",
    img: makeupImg,
    services: [
      { name: "Full Glam Makeup", price: "KES 3,500" },
      { name: "Face Beat (Soft Glam)", price: "KES 2,500" },
      { name: "Bridal Makeup", price: "From KES 5,000" },
      { name: "Eyebrow Grooming (Threading)", price: "KES 200" },
      { name: "Eyebrow Tinting", price: "KES 500" },
      { name: "Lash Application", price: "From KES 500" },
      { name: "Special FX / Editorial Makeup", price: "From KES 4,000" },
    ],
  },
  {
    name: "Nail Services",
    img: nailImg,
    services: [
      { name: "Manicure (Basic)", price: "KES 300" },
      { name: "Pedicure (Basic)", price: "KES 500" },
      { name: "Gel Manicure", price: "KES 800" },
      { name: "Gel Pedicure", price: "KES 1,000" },
      { name: "Acrylic Nails (Full Set)", price: "KES 2,500" },
      { name: "Nail Art (Per Nail)", price: "From KES 50" },
      { name: "Henna Application", price: "From KES 500" },
      { name: "Nail Removal + Soak-Off", price: "KES 500" },
    ],
  },
  {
    name: "Kids' Hairstyles",
    img: kidsImg,
    services: [
      { name: "Back-to-School Lines", price: "From KES 200" },
      { name: "Kids Braids (Inc. Hair)", price: "KES 1,500" },
      { name: "Kids Twist-Outs", price: "From KES 800" },
      { name: "Kids Cornrows", price: "From KES 500" },
      { name: "Kids Wash & Style", price: "KES 500" },
      { name: "Beads & Accessories Add-on", price: "From KES 200" },
    ],
  },
  {
    name: "Spa & Treatments",
    img: spaImg,
    services: [
      { name: "Hot Oil Treatment", price: "KES 800" },
      { name: "Deep Conditioning", price: "KES 1,000" },
      { name: "Scalp Massage", price: "KES 500" },
      { name: "Hair Steaming", price: "KES 700" },
      { name: "Facial Treatment (Basic)", price: "KES 1,500" },
      { name: "Facial Treatment (Premium)", price: "KES 3,000" },
      { name: "Relaxer / Texturizer", price: "From KES 1,000" },
      { name: "Hair Coloring", price: "From KES 2,000" },
    ],
  },
];

const ServiceVault = () => {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <main className="pt-24 pb-20 lg:pb-0">
      {/* Hero — Unique angled design */}
      <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={braidingImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 px-6">
          <ScrollReveal>
            <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Expertise</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">The Service Vault</h1>
            <p className="text-primary-foreground/50 max-w-lg mx-auto">Every service delivered with Le'maz precision, care, and premium products.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto space-y-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.05}>
              <div className="border border-border rounded-2xl overflow-hidden bg-card hover:border-gold/20 transition-colors">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  className="w-full flex items-center gap-4 p-4 md:p-6 text-left hover:bg-accent/50 transition-colors"
                >
                  <img src={cat.img} alt={cat.name} loading="lazy" className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-display text-lg md:text-xl font-semibold">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground">{cat.services.length} services</p>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gold transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
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
                            className={`flex items-center justify-between py-3 px-4 rounded-xl transition-colors ${
                              j % 2 === 0 ? "bg-accent/30" : "hover:bg-accent/30"
                            }`}
                          >
                            <span className="text-sm font-medium">{s.name}</span>
                            <span className="text-sm text-gold font-semibold whitespace-nowrap ml-4">{s.price}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServiceVault;
