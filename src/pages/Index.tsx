import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles, Users, Award, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-main.jpg";
import braidingImg from "@/assets/braiding-service.jpg";
import makeupImg from "@/assets/makeup-service.jpg";
import nailImg from "@/assets/nail-service.jpg";
import wigImg from "@/assets/wig-service.jpg";
import kidsImg from "@/assets/kids-service.jpg";
import salonImg from "@/assets/salon-interior.jpg";
import bridalImg from "@/assets/bridal-bundle.jpg";

const services = [
  { title: "Braiding & Twists", desc: "Knotless braids, cornrows, Ghanaian lines, and twist-outs crafted with precision.", price: "From KES 1,000", img: braidingImg },
  { title: "Wigs & Weaves", desc: "Professional wig installation, styling, revamps, and track sew services.", price: "From KES 1,000", img: wigImg },
  { title: "Makeup Artistry", desc: "Full glam, face beats, and eyebrow grooming — flawless looks tailored to you.", price: "From KES 200", img: makeupImg },
  { title: "Nail Services", desc: "Pedicures, manicures, gel nails, nail art, and henna applications.", price: "From KES 50", img: nailImg },
  { title: "Kids' Hairstyles", desc: "Gentle care for little ones — from back-to-school lines to beautiful twist-outs.", price: "From KES 200", img: kidsImg },
];

const testimonials = [
  { name: "Violet Kinuthia", text: "Ooooh I love this place! Whatever you want they do it perfectly — hair, makeup, nails done by them. There is no other place like Le'maz Beauty Salon. They are top notch 😍", rating: 5 },
  { name: "Aisha Aliviza", text: "Best salon in Muthiga. Their braiding skills are unmatched, and the staff are so friendly and professional. I always leave feeling like a queen!", rating: 5 },
  { name: "Grace Wanjiku", text: "I've been a regular for 2 years. The consistency in quality and service is what keeps me coming back. Highly recommend their wig installation services!", rating: 5 },
];

const insights = [
  { title: "Knotless Braids Reign Supreme", desc: "Nairobi stylists report a 60% increase in knotless braid requests in 2024 — gentle on edges and stunning in versatility." },
  { title: "Protective Styling Season", desc: "With changing weather patterns, more Nairobi women are choosing protective styles to maintain hair health year-round." },
  { title: "Scalp Care is Self-Care", desc: "The latest trend focuses on healthy foundations — hot oil treatments and scalp massages are now standard pre-styling rituals." },
];

const Index = () => (
  <main className="pb-16 lg:pb-0">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Le'maz Beauty — stunning braided hairstyle" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32">
        <motion.p
          className="text-gold font-accent text-sm md:text-base tracking-ultra-wide uppercase mb-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          Amaziah Square, Muthiga — Nairobi
        </motion.p>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight max-w-2xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          Step In. <em className="gold-text-gradient not-italic">Shine</em> Out.
        </motion.h1>
        <motion.p
          className="mt-6 text-primary-foreground/70 max-w-lg text-base md:text-lg font-body leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        >
          Your trusted home for premium haircare, beauty, and self-care excellence. We specialize in authentic braiding, luxury wig services, nail artistry, makeup, and rejuvenating treatments.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        >
          <a
            href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
          >
            Book Appointment <ArrowRight size={16} />
          </a>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-primary-foreground/30 text-primary-foreground text-sm tracking-wider uppercase rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            Our Services
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>

    {/* Services Preview */}
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">Our Signature Services</h2>
          <p className="text-muted-foreground max-w-xl mb-12">From intricate braiding to refined makeup artistry, every service is delivered with Le'maz precision.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <Link to="/services" className="group block overflow-hidden rounded-2xl bg-card hover:shadow-xl transition-shadow duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-charcoal/80 backdrop-blur text-gold text-xs font-medium rounded-full">{s.price}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-gold font-medium text-sm tracking-wider uppercase hover:gap-4 transition-all">
            View Full Service Vault <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>

    {/* About Preview */}
    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <div className="relative">
            <img src={salonImg} alt="Le'maz salon interior" loading="lazy" width={1200} height={800} className="rounded-3xl shadow-2xl w-full" />
            <div className="absolute -bottom-4 -right-4 bg-gold text-primary-foreground rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <Star size={20} className="fill-current" />
              <div>
                <p className="text-2xl font-display font-bold">4.8</p>
                <p className="text-xs opacity-80">Google Reviews</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">About Le'maz</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Polished. Elegant. Modern.</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Le'maz Hair & Beauty is committed to delivering polished, elegant, and modern hair and beauty services tailored to each client. Our team blends creativity and professionalism to give you a premium salon experience every visit.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: "Happy Clients", value: "2,000+" },
              { icon: Award, label: "Years Experience", value: "5+" },
              { icon: Clock, label: "Services Offered", value: "50+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="mx-auto text-gold mb-2" />
                <p className="text-xl font-display font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 text-gold text-sm tracking-wider uppercase font-medium hover:gap-4 transition-all">
            More About Us <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>

    {/* Journey Steps */}
    <section className="section-padding bg-charcoal text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">The Le'maz Experience</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">Your Journey With Us</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Consultation", desc: "We listen to your vision, understand your lifestyle, and craft a personalized plan." },
            { step: "02", title: "The Craft", desc: "Our skilled artisans bring your look to life with premium products and expert techniques." },
            { step: "03", title: "The Reveal", desc: "Walk out feeling confident, radiant, and ready to turn heads. Step in. Shine out." },
          ].map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.15}>
              <div className="text-center">
                <span className="text-6xl font-display font-bold gold-text-gradient">{s.step}</span>
                <h3 className="font-display text-xl font-semibold mt-4 mb-3">{s.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Bridal Bundle CTA */}
    <section className="relative overflow-hidden">
      <img src={bridalImg} alt="Bridal glow package" loading="lazy" width={1200} height={800} className="w-full h-[500px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/40 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">
              <Sparkles size={14} className="inline mr-1" /> Exclusive Package
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground max-w-lg mb-4">The Bridal Glow Bundle</h2>
            <p className="text-primary-foreground/70 max-w-md mb-6">Curated wedding prep — hair, full glam makeup, spa treatments. Your day, perfected.</p>
            <Link to="/club" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-primary-foreground font-medium text-sm tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors">
              Explore Packages <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Google Reviews</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-2">Rated 4.8 out of 5 on Google</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-6 font-accent italic">"{t.text}"</p>
                <div>
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">via Google Reviews</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Beauty Insights */}
    <section className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Beauty Insights</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold">Nairobi Trends & Hair Health</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((ins, i) => (
            <ScrollReveal key={ins.title} delay={i * 0.1}>
              <div className="bg-background rounded-2xl p-8 border border-border">
                <Sparkles size={20} className="text-gold mb-4" />
                <h3 className="font-display text-lg font-semibold mb-3">{ins.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ins.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-charcoal text-center text-primary-foreground">
      <ScrollReveal>
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Ready to <em className="gold-text-gradient not-italic">Shine</em>?</h2>
        <p className="text-primary-foreground/60 mb-8 max-w-md mx-auto">Book your appointment today. Walk in beautiful. Walk out stunning.</p>
        <a
          href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-primary-foreground font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
        >
          Book via WhatsApp <ArrowRight size={16} />
        </a>
      </ScrollReveal>
    </section>
  </main>
);

export default Index;
