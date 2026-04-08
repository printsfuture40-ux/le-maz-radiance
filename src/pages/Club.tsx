import { ArrowRight, Crown, Sparkles, Repeat, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import bridalImg from "@/assets/bridal-bundle.jpg";

const memberships = [
  {
    name: "Essential Glow",
    price: "KES 3,500",
    period: "/month",
    features: [
      "2 Braiding Sessions (Medium)",
      "2 Basic Pedicures",
      "10% off all other services",
      "Priority booking",
    ],
    highlight: false,
  },
  {
    name: "Le'maz Signature",
    price: "KES 6,500",
    period: "/month",
    features: [
      "2 Braiding Sessions (any style)",
      "2 Gel Pedicures",
      "1 Facial Treatment",
      "15% off all other services",
      "Priority booking + free consultations",
      "Complimentary hot oil treatment",
    ],
    highlight: true,
  },
  {
    name: "Royal Radiance",
    price: "KES 10,000",
    period: "/month",
    features: [
      "Unlimited braiding (up to 4 sessions)",
      "4 Gel Pedicures + 2 Manicures",
      "2 Facial Treatments",
      "20% off makeup & wig services",
      "VIP priority + dedicated stylist",
      "Monthly scalp treatment included",
      "Exclusive member events",
    ],
    highlight: false,
  },
];

const Club = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <ScrollReveal>
        <Crown size={32} className="mx-auto text-gold mb-4" />
        <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Exclusive Memberships</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Le'maz Club</h1>
        <p className="text-primary-foreground/60 max-w-lg mx-auto">Join an exclusive circle of beauty enthusiasts. Save more, glow more.</p>
      </ScrollReveal>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {memberships.map((m, i) => (
          <ScrollReveal key={m.name} delay={i * 0.1}>
            <div className={`rounded-3xl p-8 border h-full flex flex-col ${
              m.highlight ? "border-gold bg-charcoal text-primary-foreground relative overflow-hidden" : "border-border bg-card"
            }`}>
              {m.highlight && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-charcoal text-xs font-bold tracking-wider uppercase rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold mb-1">{m.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold gold-text-gradient">{m.price}</span>
                <span className={`text-sm ${m.highlight ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{m.period}</span>
              </div>
              <ul className="space-y-3 flex-1">
                {m.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className={m.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20join%20the%20" 
                target="_blank" rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wider uppercase rounded-full transition-colors ${
                  m.highlight ? "bg-gold text-charcoal hover:bg-gold-light" : "border border-gold text-gold hover:bg-gold hover:text-primary-foreground"
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
      <img src={bridalImg} alt="Bridal glow bundle" loading="lazy" width={1200} height={800} className="w-full h-[500px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/40 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <Sparkles size={20} className="text-gold mb-3" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground max-w-lg mb-4">The Bridal Glow Bundle</h2>
            <p className="text-primary-foreground/70 max-w-md mb-6 leading-relaxed">
              Your dream wedding deserves the ultimate beauty experience. Our curated bridal package includes luxury hair styling, full glam makeup, spa day pampering, and a trial session — all at an exclusive bundled price.
            </p>
            <ul className="space-y-2 mb-8">
              {["Bridal Hair Styling (any style)", "Full Glam Bridal Makeup + Trial", "Pre-Wedding Facial & Spa Day", "Bridal Party Discounts (15% off)"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <Check size={14} className="text-gold" /> {f}
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-display font-bold gold-text-gradient">KES 15,000</span>
              <span className="text-primary-foreground/50 text-sm line-through">KES 20,000</span>
            </div>
            <a
              href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27m%20interested%20in%20the%20Bridal%20Glow%20Bundle"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
            >
              Inquire Now <ArrowRight size={16} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Monthly Maintenance */}
    <section className="section-padding bg-cream-dark">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <Repeat size={28} className="mx-auto text-gold mb-4" />
          <h2 className="text-3xl font-display font-semibold mb-4">Monthly Maintenance Plan</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Stay consistently stunning with our subscription plan — 2 braiding sessions + 2 pedicures every month at a discounted rate. Save up to 25% compared to individual bookings.
          </p>
          <div className="inline-flex items-baseline gap-2 bg-card rounded-2xl px-8 py-4 border border-border">
            <span className="text-3xl font-display font-bold gold-text-gradient">KES 3,500</span>
            <span className="text-muted-foreground text-sm">/month (save KES 1,100)</span>
          </div>
          <div className="mt-8">
            <a
              href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20subscribe%20to%20the%20Monthly%20Maintenance%20Plan"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
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
