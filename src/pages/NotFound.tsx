import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="404 - Page Not Found | GoLeadorTips"
        description="The page you're looking for doesn't exist. Return to our homepage for premium football predictions."
      />
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center animate-fade-in">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[200px] font-bold text-primary/20 leading-none">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-muted-foreground">
              Don't worry, even the best predictions miss sometimes! 😉
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/services">
                <Search className="w-5 h-5 mr-2" />
                View Packages
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Popular Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Popular pages:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link 
                to="/" 
                className="text-sm text-primary hover:underline"
              >
                Home
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/services" 
                className="text-sm text-primary hover:underline"
              >
                Subscription Packages
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/archives" 
                className="text-sm text-primary hover:underline"
              >
                Prediction Archives
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link 
                to="/admin" 
                className="text-sm text-primary hover:underline"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
