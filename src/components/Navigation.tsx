import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Trophy, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="GoLeadorTips Logo" className="h-8 w-8 md:h-12 md:w-12" />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              GoLeadorTips
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-6">
            <Link
              to="/"
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`text-xs md:text-sm font-medium transition-colors hover:text-primary ${
                isActive("/services") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Services
            </Link>
            <Link
              to="/archives"
              className={`hidden sm:block text-xs md:text-sm font-medium transition-colors hover:text-primary ${
                isActive("/archives") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Archives & Contact
            </Link>
            <Link
              to="/archives"
              className={`sm:hidden text-xs md:text-sm font-medium transition-colors hover:text-primary ${
                isActive("/archives") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Contact
            </Link>

            <ThemeToggle />

            {user && isAdmin && (
              <div className="flex items-center gap-3">
                <Button asChild variant="secondary" size="sm">
                  <Link to="/admin">Admin Panel</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
