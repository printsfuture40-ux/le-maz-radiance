import { Heart, Award, Sparkles, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import salonImg from "@/assets/salon-interior.jpg";
import loungeImg from "@/assets/salon-lounge.jpg";
import receptionImg from "@/assets/salon-reception.jpg";
import signageImg from "@/assets/salon-signage.jpg";
import teamImg from "@/assets/team.jpg";

const About = () => (
  <main className="pt-24 pb-20">
    {/* Hero — authentic reception / signage backdrop */}
    <section className="relative py-24 md:py-32 bg-charcoal text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src={receptionImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/70 to-charcoal" />
      </div>
      <div className="relative z-10 text-center px-6">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-3">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">About Le'maz</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            A sanctuary of artistry in Muthiga — where beauty meets craft, and every client is treated like royalty.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Story with interior */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="relative">
            <img src={salonImg} alt="Le'maz salon styling floor" loading="lazy" className="rounded-[2rem] shadow-2xl w-full aspect-[4/5] object-cover" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl bg-gold/10 -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-gold/5 -z-10" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-xs mb-3">The Space</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 leading-tight">Polished. Elegant. Modern.</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Le'maz Beauty Salon & Spa was born from a deep passion for beauty and the belief that everyone deserves to feel extraordinary. Located at A Square Mall, Waiyaki Way in Muthiga (Rungiri), Nairobi, we've built a sanctuary where artistry meets self-care.</p>
            <p>Our styling floor is designed as a private retreat — soft light, custom botanical mirrors, brushed-gold accents, and velvet seating throughout. Every corner is engineered for comfort and photographable moments.</p>
            <p>From the moment you walk through our doors, you're family. We listen, we craft, and we deliver — transformations that make you feel confident, radiant, and truly yourself.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Experience gallery — take-a-look-inside strip */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Take a Look Inside</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">The Le'maz Experience</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">Feel the space before you visit — reception, styling stations, treatment lounge and the details in between.</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { src: receptionImg, label: "Reception" },
            { src: salonImg, label: "Styling Floor" },
            { src: loungeImg, label: "Lounge" },
            { src: signageImg, label: "Service Board" },
          ].map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-md">
                <img src={item.src} alt={`Le'maz ${item.label}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/85 to-transparent">
                  <p className="text-primary-foreground text-xs tracking-ultra-wide uppercase">{item.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-background">
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
              <div className="bg-card rounded-3xl p-8 text-center border border-border hover:border-gold/30 hover:shadow-lg transition-all h-full">
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
      <img src={teamImg} alt="Le'maz Beauty team" loading="lazy" className="w-full h-[480px] object-cover object-top" />
      <div className="absolute inset-0 bg-charcoal/75 flex items-center justify-center text-center px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Step In. <em className="gold-text-gradient not-italic">Shine</em> Out.
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">
            Every visit is a transformation. Every client, a work of art.
          </p>
          <a
            href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex px-8 py-4 bg-gold text-charcoal text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
          >
            Book Your Visit
          </a>
        </ScrollReveal>
      </div>
    </section>
  </main>
);

export default About;
