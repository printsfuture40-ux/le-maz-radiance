import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { verifyAdminSession } from "@/lib/adminSession";

/** Blocks every /admin route behind the owner password screen. */
const AdminGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [state, setState] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    let active = true;
    verifyAdminSession().then((valid) => {
      if (active) setState(valid ? "allowed" : "denied");
    });
    return () => {
      active = false;
    };
  }, [location.pathname]);

  if (state === "checking") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-gold" size={24} />
      </main>
    );
  }

  if (state === "denied") {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default AdminGuard;
