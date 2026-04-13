import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/lemaz-logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Service Vault", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Le'maz Club", path: "/club" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Le'maz Beauty" className="h-12 md:h-14 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs tracking-ultra-wide uppercase transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-gold font-medium"
                  : scrolled ? "text-foreground/70 hover:text-gold" : "text-primary-foreground/80 hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex px-6 py-2.5 bg-gold text-primary-foreground text-xs font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
        >
          Book Now
        </a>

        <button onClick={() => setOpen(!open)} className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden bg-charcoal/98 backdrop-blur-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`text-sm tracking-wider uppercase py-2 ${
                    location.pathname === link.path ? "text-gold font-medium" : "text-primary-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-6 py-3 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full text-center"
              >
                Book Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
