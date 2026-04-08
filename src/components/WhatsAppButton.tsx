import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/254746580502?text=Hi%20Le%27maz%2C%20I%27d%20like%20to%20book%20an%20appointment"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold shadow-lg shadow-gold/30 flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform animate-float lg:bottom-8 lg:right-8"
    aria-label="Book via WhatsApp"
  >
    <MessageCircle size={26} />
  </a>
);

export default WhatsAppButton;
