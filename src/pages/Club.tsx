import { ArrowRight, Crown, Sparkles, Repeat, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import bridalImg from "@/assets/bridal-bundle.jpg";
import spaImg from "@/assets/spa-service.jpg";

// Membership pricing built from the official catalogue:
// Essential = 2× Medium Knotless (2,500) + 2× Plain Pedi (1,500) = 8,000 → bundle 6,500 (save 1,500)
// Signature = 2× Medium Knotless + 2× Pedi-Gel (2,000) + 1× Face Beat (1,500) = 10,500 → bundle 8,500
// Royal = 4× Medium Knotless + 2× Advanced Pedi (2,500) + 2× Mani-Gel (1,200) + 2× Full Glam (2,500) = 22,400 → bundle 17,500
const memberships = [
  {
    name: "Essential Glow",
    price: "KES 6,500",
    period: "/month",
    features: [
      "2 Knotless Braid Sessions (Medium)",
      "2 Plain Pedicures",
      "10% off all other services",
      "Priority booking",
    ],
    highlight: false,
  },
  {
    name: "Le'maz Signature",
    price: "KES 8,500",
    period: "/month",
    features: [
      "2 Knotless Braid Sessions (Medium)",
      "2 Pedi-Gel Treatments",
      "1 Face Beat Makeup Session",
      "15% off all other services",
      "Priority booking + free consultations",
      "Complimentary hair oiling",
    ],
    highlight: true,
  },
  {
    name: "Royal Radiance",
    price: "KES 17,500",
    period: "/month",
    features: [
      "4 Knotless Braid Sessions (Medium)",
      "2 Advanced Pedicures + 2 Mani-Gels",
      "2 Full Glam Makeup Sessions",
      "20% off wig & lock services",
      "VIP priority + dedicated stylist",
      "Monthly leave-in treatment included",
      "Exclusive member events",
    ],
    highlight: false,
  },
];

const Club = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    {/* Hero — Unique gradient with crown motif */}
    <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={spaImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 px-6">
        <ScrollReveal>
          <Crown size={36} className="mx-auto text-gold mb-4" />
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Exclusive Memberships</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Le'maz Club</h1>
          <p className="text-primary-foreground/50 max-w-lg mx-auto">Join an exclusive circle of beauty enthusiasts. Save more, glow more.</p>
        </ScrollReveal>
      </div>
    </section>

    {/* Membership Cards */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 lg:gap-8">
        {memberships.map((m, i) => (
          <ScrollReveal key={m.name} delay={i * 0.1}>
            <div className={`rounded-[2rem] p-8 border h-full flex flex-col transition-all hover:shadow-xl ${
              m.highlight
                ? "border-gold bg-charcoal text-primary-foreground relative overflow-hidden shadow-[0_0_40px_-10px_hsl(42_68%_52%/0.3)]"
                : "border-border bg-card hover:border-gold/20"
            }`}>
              {m.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 gold-gradient" />
              )}
              {m.highlight && (
                <div className="absolute top-5 right-5 px-3 py-1 bg-gold text-charcoal text-xs font-bold tracking-wider uppercase rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold mb-1">{m.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold gold-text-gradient">{m.price}</span>
                <span className={`text-sm ${m.highlight ? "text-primary-foreground/40" : "text-muted-foreground"}`}>{m.period}</span>
              </div>
              <ul className="space-y-3 flex-1">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className={m.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20join%20the%20${encodeURIComponent(m.name)}%20membership`}
                target="_blank" rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wider uppercase rounded-full transition-all ${
                  m.highlight
                    ? "bg-gold text-charcoal hover:bg-gold-light hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
                    : "border border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                }`}
              >
                Join Now <ArrowRight size={14} />
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* Bridal Glow Bundle */}
    <section className="relative overflow-hidden">
      <img src={bridalImg} alt="Bridal glow bundle" loading="lazy" className="w-full h-[550px] md:h-[600px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-transparent flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <Sparkles size={22} className="text-gold mb-3" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground max-w-lg mb-4 leading-tight">The Bridal Glow Bundle</h2>
            <p className="text-primary-foreground/70 max-w-md mb-6 leading-relaxed">
              Your dream wedding deserves the ultimate beauty experience. Our curated bridal package includes luxury hair styling, full glam makeup with trial, and a pre-wedding spa day.
            </p>
            <ul className="space-y-2 mb-8">
              {["Bridal Hair Styling (any catalogue style)", "Full Glam Bridal Makeup + Trial Session", "Pre-Wedding Advanced Pedicure & Manicure", "Bridal Party Discounts (15% off)"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                  <Check size={14} className="text-gold flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-display font-bold gold-text-gradient">KES 15,000</span>
              <span className="text-primary-foreground/40 text-sm line-through">KES 18,500</span>
            </div>
            <a
              href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27m%20interested%20in%20the%20Bridal%20Glow%20Bundle"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
            >
              Inquire Now <ArrowRight size={16} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Monthly Maintenance */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-cream-dark">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <Repeat size={28} className="mx-auto text-gold mb-4" />
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Monthly Maintenance Plan</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10">
            Stay consistently stunning — 2 medium knotless braids + 2 plain pedicures every month at a discounted bundle rate. Save vs. individual bookings.
          </p>
          <div className="inline-flex items-baseline gap-2 bg-card rounded-2xl px-10 py-5 border border-border shadow-sm">
            <span className="text-4xl font-display font-bold gold-text-gradient">KES 6,500</span>
            <span className="text-muted-foreground text-sm">/month (save KES 1,500)</span>
          </div>
          <div className="mt-10">
            <a
              href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20subscribe%20to%20the%20Monthly%20Maintenance%20Plan"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
            >
              Subscribe via WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </main>
);

export default Club;
