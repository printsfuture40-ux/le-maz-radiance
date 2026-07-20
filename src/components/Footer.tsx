import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import logoImg from "@/assets/lemaz-logo.png";

// TikTok glyph (lucide-react has none) — kept inline for fidelity.
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.42a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.01z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-charcoal text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <img src={logoImg} alt="Le'maz Beauty" className="h-14 w-auto mb-4" />
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
              { label: "Products", path: "/products" },
              { label: "Le'maz Club", path: "/club" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="text-primary-foreground/60 hover:text-gold text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Visit Us</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <span className="flex items-start gap-2">
              <MapPin size={14} className="text-gold flex-shrink-0 mt-1" />
              <span>
                A Square Mall, Waiyaki Way<br />Muthiga, Rungiri — Nairobi
              </span>
            </span>
            <span className="flex items-start gap-2">
              <MapPin size={14} className="text-gold flex-shrink-0 mt-1" />
              <span>
                Nyeri Branch
                <span className="ml-2 text-[10px] uppercase tracking-wider text-gold/80 border border-gold/30 rounded-full px-2 py-0.5">
                  Coming Soon
                </span>
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-gold flex-shrink-0" /> Mon–Sat: 8AM – 8PM
            </span>
            <a
              href="tel:+254746580502"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone size={14} className="text-gold flex-shrink-0" /> +254 746 580 502
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold-light">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/lemaz_beauty"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@evetinachi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all"
              aria-label="TikTok"
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href="https://wa.me/254746580502"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} Le'maz Beauty Salon & Spa. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
