import { Heart, Award, Sparkles, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import salonImg from "@/assets/salon-interior.jpg";
import heroImg from "@/assets/hero-main.jpg";
import braidingImg from "@/assets/braiding-service.jpg";

const About = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    {/* Hero with unique diagonal overlay */}
    <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={braidingImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 text-center px-6">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">About Le'maz</h1>
          <p className="text-primary-foreground/50 max-w-lg mx-auto">Where beauty meets artistry, and every client is treated like royalty.</p>
        </ScrollReveal>
      </div>
    </section>

    {/* Story section — Unique offset layout */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="relative">
            <img src={salonImg} alt="Le'maz salon" loading="lazy" className="rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-gold/10 -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-gold/5 -z-10" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 leading-tight">Polished. Elegant. Modern.</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Le'maz Beauty Salon & Spa was born from a deep passion for beauty and the belief that everyone deserves to feel extraordinary. Located at A Square Mall, Waiyaki Way in Muthiga (Rungiri), Nairobi, we've built a sanctuary where artistry meets self-care.</p>
            <p>Our team of skilled artisans specializes in authentic African braiding, luxury wig installations, makeup artistry, nail services, and rejuvenating spa treatments. We use only premium products and techniques that honour your natural beauty.</p>
            <p>From the moment you walk through our doors, you're family. We listen, we craft, and we deliver — transformations that make you feel confident, radiant, and truly yourself.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Values — Unique staggered cards */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Values</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">What Sets Us Apart</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, title: "Client-First", desc: "Your comfort and satisfaction are our highest priority." },
            { icon: Award, title: "Expert Artisans", desc: "Trained professionals with years of experience in African hair artistry." },
            { icon: Sparkles, title: "Premium Products", desc: "Only the finest hair products, tools, and techniques." },
            { icon: Users, title: "Community", desc: "We're not just a salon — we're a family that celebrates you." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className="bg-background rounded-3xl p-8 text-center border border-border hover:border-gold/20 hover:shadow-lg transition-all h-full">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-5">
                  <Icon size={26} className="text-gold" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="relative overflow-hidden">
      <img src={heroImg} alt="Le'maz beauty" loading="lazy" className="w-full h-[450px] object-cover" />
      <div className="absolute inset-0 bg-charcoal/85 flex items-center justify-center text-center px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Step In. <em className="gold-text-gradient not-italic">Shine</em> Out.
          </h2>
          <p className="text-primary-foreground/50 max-w-md mx-auto mb-8">
            Every visit is a transformation. Every client, a work of art.
          </p>
          <a
            href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex px-8 py-4 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
          >
            Book Your Visit
          </a>
        </ScrollReveal>
      </div>
    </section>
  </main>
);

export default About;
