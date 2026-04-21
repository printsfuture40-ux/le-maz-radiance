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
import spaImg from "@/assets/spa-service.jpg";

// "From" prices reflect the lowest price in each catalogue category.
const services = [
  { title: "Braiding & Twists", desc: "Knotless braids, Ghana lines, twists & twist-outs crafted with precision.", price: "From KES 1,000", img: braidingImg },
  { title: "Wigs, Weaves & Locks", desc: "Wig installation, styling, revamps, track sew & locks services.", price: "From KES 500", img: wigImg },
  { title: "Makeup & Beauty", desc: "Full glam, face beats and refined eyebrow grooming.", price: "From KES 300", img: makeupImg },
  { title: "Pedicure & Manicure", desc: "Pedicures, manicures, gel nails, sculpting, henna & nail art.", price: "From KES 50", img: nailImg },
  { title: "Kids' Hairstyles", desc: "Gentle care for little ones — from school lines to beautiful twist-outs.", price: "From KES 200", img: kidsImg },
  { title: "Extras & Treatments", desc: "Hot oil, deep treatments, undo services, dryer and detangling.", price: "From KES 200", img: spaImg },
];

const testimonials = [
  { name: "Violet Kinuthia", text: "Ooooh I love this place! Whatever you want they do it perfectly — hair, makeup, nails done by them. There is no other place like Le'maz Beauty Salon. They are top notch 😍", rating: 5 },
  { name: "Aisha Aliviza", text: "Best salon in Muthiga. Their braiding skills are unmatched, and the staff are so friendly and professional. I always leave feeling like a queen!", rating: 5 },
  { name: "Grace Wanjiku", text: "I've been a regular for 2 years. The consistency in quality and service is what keeps me coming back. Highly recommend their wig installation services!", rating: 5 },
  { name: "Mercy Njeri", text: "My knotless braids lasted 8 weeks looking fresh. Eve and the team really know their craft. Worth every shilling.", rating: 5 },
  { name: "Sharon Atieno", text: "I came in for a pedicure and left with a full glow-up. The henna art was the highlight! Such a calming, classy spot.", rating: 5 },
  { name: "Faith Wambui", text: "Got my bridal trial here and I'm SOLD. The makeup was natural but stunning. Booking the full Bridal Glow Bundle for the wedding!", rating: 5 },
];

// Duplicate the list so the marquee can loop seamlessly without a visible jump.
const marqueeList = [...testimonials, ...testimonials];

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
        <img src={heroImg} alt="Le'maz Beauty — clients showcasing premium hairstyles" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/30" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20">
        <motion.p
          className="text-gold font-accent text-sm md:text-base tracking-ultra-wide uppercase mb-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          A Square Mall, Muthiga — Nairobi
        </motion.p>
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] max-w-2xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          Step In. <em className="gold-text-gradient not-italic">Shine</em> Out.
        </motion.h1>
        <motion.p
          className="mt-6 text-primary-foreground/70 max-w-lg text-base md:text-lg font-body leading-relaxed"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        >
          Your trusted home for premium haircare, beauty, and self-care excellence. Authentic braiding, luxury wig services, nail artistry, makeup and rejuvenating treatments.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        >
          <a
            href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
          >
            Book Appointment <ArrowRight size={16} />
          </a>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/30 text-primary-foreground text-sm tracking-wider uppercase rounded-full hover:border-gold hover:text-gold transition-colors"
          >
            Our Services
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/20 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>

    {/* Services Preview */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">Our Signature Services</h2>
          <p className="text-muted-foreground max-w-xl mb-14">From intricate braiding to refined makeup artistry, every service is delivered with Le'maz precision.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.08}>
              <Link to="/services" className="group block overflow-hidden rounded-3xl bg-card hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-gold/30">
                <div className="relative h-60 lg:h-72 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-primary-foreground">{s.title}</h3>
                    <span className="px-3 py-1 bg-gold/95 text-charcoal text-xs font-semibold rounded-full whitespace-nowrap">{s.price}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal className="mt-12 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-gold font-medium text-sm tracking-wider uppercase hover:gap-4 transition-all">
            View Full Service Vault <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>

    {/* About Preview */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        <ScrollReveal className="lg:col-span-3">
          <div className="relative">
            <img src={salonImg} alt="Le'maz salon — clients styled by our team" loading="lazy" className="rounded-[2rem] shadow-2xl w-full aspect-[4/3] object-cover" />
            <div className="absolute -bottom-5 -right-5 bg-gold text-charcoal rounded-2xl p-5 shadow-xl flex items-center gap-3">
              <Star size={22} className="fill-current" />
              <div>
                <p className="text-2xl font-display font-bold">4.8</p>
                <p className="text-xs opacity-80">Google Reviews</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="lg:col-span-2">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">About Le'maz</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 leading-tight">Polished. Elegant. Modern.</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Le'maz Hair & Beauty is committed to delivering polished, elegant, and modern hair and beauty services tailored to each client. Our team blends creativity and professionalism to give you a premium salon experience every visit.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { icon: Users, label: "Happy Clients", value: "2,000+" },
              { icon: Award, label: "Years Experience", value: "5+" },
              { icon: Clock, label: "Services Offered", value: "60+" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <Icon size={22} className="mx-auto text-gold mb-2" />
                <p className="text-xl font-display font-bold">{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
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
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-charcoal text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">The Le'maz Experience</p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold">Your Journey With Us</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Consultation", desc: "We listen to your vision, understand your lifestyle, and craft a personalized plan." },
            { step: "02", title: "The Craft", desc: "Our skilled artisans bring your look to life with premium products and expert techniques." },
            { step: "03", title: "The Reveal", desc: "Walk out feeling confident, radiant, and ready to turn heads. Step in. Shine out." },
          ].map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.15}>
              <div className="text-center relative">
                <span className="text-7xl font-display font-bold gold-text-gradient opacity-80">{s.step}</span>
                <h3 className="font-display text-xl font-semibold mt-4 mb-3">{s.title}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Bridal Bundle CTA */}
    <section className="relative overflow-hidden">
      <img src={bridalImg} alt="Bridal glow package" loading="lazy" className="w-full h-[550px] md:h-[600px] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-transparent flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-3 flex items-center gap-2">
              <Sparkles size={14} /> Exclusive Package
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground max-w-lg mb-4 leading-tight">The Bridal Glow Bundle</h2>
            <p className="text-primary-foreground/70 max-w-md mb-8 leading-relaxed">Curated wedding prep — hair, full glam makeup, spa treatments. Your day, perfected.</p>
            <Link to="/club" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]">
              Explore Packages <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Testimonials — infinite gold marquee */}
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal className="text-center mb-14">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Google Reviews</p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold">What Our Clients Say</h2>
          <p className="text-muted-foreground mt-3">Rated 4.8 out of 5 on Google</p>
        </ScrollReveal>
      </div>

      <div className="relative group" aria-label="Client testimonials carousel">
        {/* Soft fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeList.map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="w-[300px] md:w-[360px] flex-shrink-0 bg-card rounded-3xl p-7 border border-border hover:border-gold/30 transition-all"
            >
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
            </article>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <a
          href="https://share.google/1T3rZm6GNVBYVOB9w"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-gold hover:gap-3 transition-all"
        >
          Read All Reviews on Google <ArrowRight size={14} />
        </a>
      </div>
    </section>

    {/* Beauty Insights */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Beauty Insights</p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold">Nairobi Trends & Hair Health</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {insights.map((ins, i) => (
            <ScrollReveal key={ins.title} delay={i * 0.1}>
              <div className="bg-background rounded-3xl p-8 border border-border hover:border-gold/20 transition-all hover:shadow-md">
                <Sparkles size={20} className="text-gold mb-4" />
                <h3 className="font-display text-lg font-semibold mb-3">{ins.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ins.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="px-6 md:px-12 lg:px-24 py-20 md:py-28 bg-charcoal text-center text-primary-foreground">
      <ScrollReveal>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Ready to <em className="gold-text-gradient not-italic">Shine</em>?</h2>
        <p className="text-primary-foreground/60 mb-10 max-w-md mx-auto">Book your appointment today. Walk in beautiful. Walk out stunning.</p>
        <a
          href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-charcoal font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
        >
          Book via WhatsApp <ArrowRight size={16} />
        </a>
      </ScrollReveal>
    </section>
  </main>
);

export default Index;
