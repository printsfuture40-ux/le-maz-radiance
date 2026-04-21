import { Link, useLocation } from "react-router-dom";
import { Home, Scissors, Image, ShoppingBag, Phone } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Scissors, label: "Services", path: "/services" },
  { icon: Image, label: "Portfolio", path: "/portfolio" },
  { icon: ShoppingBag, label: "Products", path: "/products" },
  { icon: Phone, label: "Contact", path: "/contact" },
];

const MobileNav = () => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-charcoal/95 backdrop-blur-xl border-t border-gold/20">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} className="flex flex-col items-center gap-1 py-1 px-3" aria-label={label}>
              <Icon size={20} className={active ? "text-gold" : "text-primary-foreground/60"} />
              <span
                className={`text-[10px] tracking-wider uppercase ${
                  active ? "text-gold font-medium" : "text-primary-foreground/60"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
