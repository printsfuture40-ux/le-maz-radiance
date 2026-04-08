import { Link, useLocation } from "react-router-dom";
import { Home, Scissors, Image, Heart, Phone } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Scissors, label: "Services", path: "/services" },
  { icon: Image, label: "Portfolio", path: "/portfolio" },
  { icon: Heart, label: "Club", path: "/club" },
  { icon: Phone, label: "Contact", path: "/contact" },
];

const MobileNav = () => {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} className="flex flex-col items-center gap-1 py-1 px-3">
              <Icon size={20} className={active ? "text-gold" : "text-muted-foreground"} />
              <span className={`text-[10px] tracking-wider uppercase ${active ? "text-gold font-medium" : "text-muted-foreground"}`}>
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
