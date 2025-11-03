import { Trophy, Shield, Lock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-base sm:text-lg font-semibold">GoLeadorTips</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Premium Football Predictions
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors block">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors block">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/archives" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors block">
                  Archives
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Payment & Security</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground break-words">Secure PayPal Payments</p>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground break-words">SSL Encrypted Connection</p>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground break-words">We never store or share personal payment data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} GoLeadorTips. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
