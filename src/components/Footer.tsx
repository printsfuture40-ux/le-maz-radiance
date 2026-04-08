import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground">
    <div className="max-w-7xl mx-auto section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <h3 className="text-3xl font-display gold-text-gradient mb-4">Le'maz</h3>
          <p className="text-primary-foreground/60 font-accent text-sm leading-relaxed">
            Premium haircare, beauty, and self-care excellence in the heart of Muthiga, Nairobi.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Services", path: "/services" },
              { label: "Portfolio", path: "/portfolio" },
              { label: "Le'maz Club", path: "/club" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-primary-foreground/60 hover:text-gold text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Visit Us</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> Amaziah Square, Muthiga, Nairobi</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> Mon–Sat: 8AM – 8PM</span>
            <span className="flex items-center gap-2"><Phone size={14} className="text-gold" /> +254 746 580 502</span>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Le'maz Beauty Salon & Spa. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
