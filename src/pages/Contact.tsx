import { Phone, MapPin, Clock, ArrowRight, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import salonImg from "@/assets/salon-interior.jpg";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.42a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.01z" />
  </svg>
);

// Plus Code PMXP+H9M, Muthiga — A Square Mall, Waiyaki Way, Rungiri.
const MAP_EMBED_URL =
  "https://www.google.com/maps?q=PMXP%2BH9M+Muthiga,+A+Square+Mall+Waiyaki+Way,+Rungiri&hl=en&z=18&output=embed";
const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=PMXP%2BH9M+Muthiga+A+Square+Mall+Waiyaki+Way+Rungiri";

const Contact = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={salonImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 px-6">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            We'd love to hear from you. Book your appointment or just say hello.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        <ScrollReveal>
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold mb-8">Visit Le'maz</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Muthiga Branch", value: "A Square Mall, Waiyaki Way, Muthiga (Rungiri), Nairobi" },
                  { icon: MapPin, label: "Nyeri Branch", value: "Coming Soon — stay tuned for our next location." },
                  { icon: Clock, label: "Hours", value: "Monday – Saturday: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM" },
                  { icon: Phone, label: "Phone", value: "+254 746 580 502", href: "tel:+254746580502" },
                  { icon: Mail, label: "Email", value: "info@lemazbeauty.co.ke", href: "mailto:info@lemazbeauty.co.ke" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-muted-foreground hover:text-gold transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-charcoal text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
              >
                Book via WhatsApp <ArrowRight size={14} />
              </a>
              <a href="https://www.instagram.com/lemaz_beauty" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all">
                <InstagramIcon size={18} />
              </a>
              <a href="https://www.tiktok.com/@evetinachi" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all">
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="space-y-3">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[420px] lg:h-[520px] border border-border">
              <iframe
                src={MAP_EMBED_URL}
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Le'maz Beauty Salon — A Square Mall, Muthiga"
              />
            </div>
            <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-gold hover:gap-3 transition-all">
              Get Directions <ArrowRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </main>
);

export default Contact;
