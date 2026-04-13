import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";
import logoImg from "@/assets/lemaz-logo.png";

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground hidden lg:block">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <img src={logoImg} alt="Le'maz Beauty" className="h-14 w-auto mb-4" />
          <p className="text-primary-foreground/50 font-accent text-sm leading-relaxed">
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
              <Link key={l.path} to={l.path} className="text-primary-foreground/50 hover:text-gold text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Visit Us</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/50">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-gold flex-shrink-0" /> Amaziah Square, Muthiga, Nairobi</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-gold flex-shrink-0" /> Mon–Sat: 8AM – 8PM</span>
            <span className="flex items-center gap-2"><Phone size={14} className="text-gold flex-shrink-0" /> +254 746 580 502</span>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/254746580502" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/30">
        © {new Date().getFullYear()} Le'maz Beauty Salon & Spa. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
