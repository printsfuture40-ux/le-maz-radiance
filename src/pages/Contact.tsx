import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => (
  <main className="pt-24 pb-20 lg:pb-0">
    <section className="section-padding bg-charcoal text-primary-foreground text-center">
      <ScrollReveal>
        <p className="text-gold font-accent tracking-ultra-wide uppercase text-sm mb-2">Get in Touch</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
        <p className="text-primary-foreground/60 max-w-lg mx-auto">We'd love to hear from you. Book your appointment or just say hello.</p>
      </ScrollReveal>
    </section>

    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        <ScrollReveal>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-display font-semibold mb-6">Visit Le'maz</h2>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Location", value: "Amaziah Square, Muthiga, Nairobi, Kenya" },
                  { icon: Clock, label: "Hours", value: "Monday – Saturday: 8:00 AM – 8:00 PM\nSunday: 10:00 AM – 6:00 PM" },
                  { icon: Phone, label: "Phone", value: "+254 746 580 502" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm">{label}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-primary-foreground text-sm font-medium tracking-wider uppercase rounded-full hover:bg-gold-dark transition-colors"
            >
              Book via WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-full min-h-[400px]">
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
