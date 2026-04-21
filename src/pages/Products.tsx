import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import logoImg from "@/assets/lemaz-logo.png";

const Products = () => (
  <main className="pt-24 lg:pt-0 pb-20 lg:pb-0">
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal text-primary-foreground px-6">
      {/* Soft animated gold halo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-30"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.35 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 40%, hsla(42,68%,52%,0.22), transparent 55%)",
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
          Curated haircare, beauty essentials and signature scents — handpicked
          to extend the Le'maz salon experience to your home. Launching soon.
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
  </main>
);

export default Products;
