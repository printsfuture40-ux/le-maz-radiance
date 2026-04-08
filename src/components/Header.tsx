import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold gold-text-gradient">Le'maz</span>
          <span className="text-xs font-accent tracking-ultra-wide text-muted-foreground hidden sm:block">BEAUTY & SPA</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                location.pathname === link.path ? "text-gold font-medium" : "text-foreground/70 hover:text-gold"
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
          className="hidden lg:inline-flex px-6 py-2.5 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
        >
          Book Now
        </a>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden bg-background border-t border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`text-sm tracking-wider uppercase py-2 ${
                    location.pathname === link.path ? "text-gold font-medium" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full text-center"
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
