import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SubscriptionCard from "@/components/SubscriptionCard";
import Testimonials from "@/components/Testimonials";
import StatsSection from "@/components/StatsSection";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Target, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const subscriptions = [
    {
      tier: "silver" as const,
      title: "Silver",
      features: ["Daily predictions", "Standard insights", "Email and Telegram support"],
      description: "Perfect for beginners",
    },
    {
      tier: "gold" as const,
      title: "Gold",
      features: ["Everything you need for top-tier predictions", "High-confidence tips", "Priority support"],
      description: "For those who know what they want:",
    },
    {
      tier: "platinum" as const,
      title: "Platinum",
      features: ["Everything you need", "Exclusive predictions", "Always-on help"],
      description: "For professionals",
    },
  ];

  const features = [
    {
      icon: Trophy,
      title: "Expert Analysis",
      description: "Professional analysts with years of experience in football predictions",
    },
    {
      icon: TrendingUp,
      title: "High Success Rate",
      description: "Consistently delivering winning predictions day after day",
    },
    {
      icon: Target,
      title: "Data-Driven",
      description: "Advanced statistics and match insights backing every prediction",
    },
    {
      icon: Shield,
      title: "Transparent Results",
      description: "Full archive of past predictions for complete transparency",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="GoLeadorTips - Premium Football Predictions & Betting Tips"
        description="Join thousands of winners with our expert football predictions. Get data-driven betting tips with high success rates. Silver, Gold & Platinum packages available."
        keywords="football predictions, betting tips, soccer predictions, football betting, premium tips, accumulator tips"
      />
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
              Win More With{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Premium
              </span>{" "}
              Predictions
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 px-4 leading-relaxed">
              Join thousands of winners who trust our expert football predictions to dominate their game
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button asChild size="lg" className="animate-glow-pulse w-full sm:w-auto text-sm sm:text-base">
                <Link to="/services">View Packages</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                <Link to="/archives">View Archives</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Trust Badges Section */}
      <section className="py-8 md:py-12 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 px-2">Why Choose GoLeadorTips?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              The trusted choice for serious football prediction enthusiasts
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 md:p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Packages Section */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 px-2">Choose Your Package</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
              Select the subscription that fits your goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.tier}
                tier={sub.tier}
                title={sub.title}
                features={sub.features}
                description={sub.description}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Button asChild variant="outline" size="lg" className="text-sm sm:text-base">
              <Link to="/services">View Full Package Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 px-2">Ready to Start Winning?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 px-4 leading-relaxed">
              Join our community of winners and take your predictions to the next level
            </p>
            <Button asChild size="lg" className="text-sm sm:text-base md:text-lg">
              <Link to="/services">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
