import { Phone, MapPin, Clock, ArrowRight, Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import salonImg from "@/assets/salon-interior.jpg";

const Contact = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    {/* Hero — Unique warm tone */}
    <section className="relative py-20 md:py-28 bg-charcoal text-primary-foreground text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src={salonImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 px-6">
        <ScrollReveal>
          <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-primary-foreground/50 max-w-lg mx-auto">We'd love to hear from you. Book your appointment or just say hello.</p>
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
                  { icon: MapPin, label: "Location", value: "Amaziah Square, Muthiga, Nairobi, Kenya" },
                  { icon: Clock, label: "Hours", value: "Monday – Saturday: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM" },
                  { icon: Phone, label: "Phone", value: "+254 746 580 502" },
                  { icon: Mail, label: "Email", value: "info@lemazbeauty.co.ke" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm mb-1">{label}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-all hover:shadow-[0_8px_30px_-6px_hsl(42_68%_52%/0.5)]"
            >
              Book via WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="rounded-[2rem] overflow-hidden shadow-2xl h-[400px] lg:h-full min-h-[400px] border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d36.72!3d-1.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTUnMDAuMCJTIDM2wrA0MycxMi4wIkU!5e0!3m2!1sen!2ske!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Le'maz Beauty Salon location"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  </main>
);

export default Contact;
