import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SubscriptionCard from "@/components/SubscriptionCard";
import SEO from "@/components/SEO";

const Services = () => {
  const subscriptions = [
    {
      tier: "silver" as const,
      title: "Silver Package",
      price: "$29",
      description: "Kickstart Your Predictions ⚽",
      odds: "Around 2.00",
      features: [
        "Daily curated soccer predictions",
        "Access to standard match insights",
        "Reliable, easy-to-follow forecasts",
        "Affordable entry-level subscription",
        "Email support",
      ],
      fullDescription:
        "Ideal for beginners who want consistent tips without overwhelming complexity. Kick off your winning streak today!",
    },
    {
      tier: "gold" as const,
      title: "Gold Package",
      price: "$59",
      description: "Step Up Your Game 🏆",
      odds: "Around 3.00-4.00",
      features: [
        "All Silver benefits included",
        "Exclusive access to high-confidence predictions",
        "Weekly performance summary & stats",
        "Priority support and tips directly from the expert team",
        "Advanced match analysis",
      ],
      fullDescription:
        "Elevate your football predictions. Be ahead of the game and enjoy smarter, more profitable forecasts.",
      popular: true,
    },
    {
      tier: "platinum" as const,
      title: "Platinum Package",
      price: "$99",
      description: "The VIP Experience 🔥",
      odds: "Around 8.00-10.00",
      features: [
        "All Gold benefits included",
        "Access to VIP predictions for top matches",
        "Personalized alerts and updates",
        "Detailed analytics for each match",
        "Maximum value for professional-level betting enthusiasts",
        "24/7 dedicated support",
      ],
      fullDescription:
        "Step into the VIP zone. Only the boldest take Platinum – secure your edge and dominate your predictions!",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Subscription Packages - GoLeadorTips"
        description="Choose from Silver, Gold, or Platinum packages. Get daily football predictions with odds ranging from 2.00 to 10.00. Premium betting tips for all levels."
        keywords="betting packages, subscription plans, football tips packages, premium predictions, silver gold platinum"
      />
      <Navigation />

      <main className="flex-1 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Choose Your Package</h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Select the subscription that matches your ambitions and start winning today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-10 md:mb-16">
            {subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.tier}
                tier={sub.tier}
                title={sub.title}
                price={sub.price}
                features={sub.features}
                description={sub.description}
                odds={sub.odds}
                popular={sub.popular}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            {subscriptions.map((sub) => (
              <div
                key={sub.tier}
                className="mb-12 p-8 bg-card rounded-lg border border-border animate-fade-in"
              >
                <h2 className="text-2xl font-bold mb-4">{sub.title}</h2>
                <p className="text-lg text-muted-foreground mb-4">{sub.description}</p>
                <p className="text-foreground leading-relaxed">{sub.fullDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
