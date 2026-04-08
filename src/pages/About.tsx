import { Heart, Award, Sparkles, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import salonImg from "@/assets/salon-interior.jpg";
import heroImg from "@/assets/hero-main.jpg";

const About = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <ScrollReveal>
        <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Le'maz</h1>
        <p className="text-primary-foreground/60 max-w-lg mx-auto">Where beauty meets artistry, and every client is treated like royalty.</p>
      </ScrollReveal>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <img src={salonImg} alt="Le'maz salon" loading="lazy" width={1200} height={800} className="rounded-3xl shadow-2xl w-full" />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl font-display font-semibold mb-6">Polished. Elegant. Modern.</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Le'maz Beauty Salon & Spa was born from a deep passion for beauty and the belief that everyone deserves to feel extraordinary. Located at Amaziah Square in Muthiga, Nairobi, we've built a sanctuary where artistry meets self-care.</p>
            <p>Our team of skilled artisans specializes in authentic African braiding, luxury wig installations, makeup artistry, nail services, and rejuvenating spa treatments. We use only premium products and techniques that honour your natural beauty.</p>
            <p>From the moment you walk through our doors, you're family. We listen, we craft, and we deliver — transformations that make you feel confident, radiant, and truly yourself.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl font-display font-semibold">What Sets Us Apart</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Heart, title: "Client-First", desc: "Your comfort and satisfaction are our highest priority." },
            { icon: Award, title: "Expert Artisans", desc: "Trained professionals with years of experience in African hair artistry." },
            { icon: Sparkles, title: "Premium Products", desc: "Only the finest hair products, tools, and techniques." },
            { icon: Users, title: "Community", desc: "We're not just a salon — we're a family that celebrates you." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-display font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden">
      <img src={heroImg} alt="Le'maz beauty" loading="lazy" className="w-full h-[400px] object-cover" />
      <div className="absolute inset-0 bg-charcoal/80 flex items-center justify-center text-center px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Step In. <em className="gold-text-gradient not-italic">Shine</em> Out.
          </h2>
          <p className="text-primary-foreground/60 max-w-md mx-auto mb-6">
            Every visit is a transformation. Every client, a work of art.
          </p>
          <a
            href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex px-8 py-3.5 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
          >
            Book Your Visit
          </a>
        </ScrollReveal>
      </div>
    </section>
  </main>
);

export default About;
