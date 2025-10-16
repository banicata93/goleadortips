import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SubscriptionCardProps {
  tier: "silver" | "gold" | "platinum";
  title: string;
  price: string;
  features: string[];
  description: string;
  odds?: string;
  popular?: boolean;
}

const SubscriptionCard = ({
  tier,
  title,
  price,
  features,
  description,
  odds,
  popular = false,
}: SubscriptionCardProps) => {
  const tierColors = {
    silver: "border-silver/30",
    gold: "border-gold/30",
    platinum: "border-platinum/30",
  };

  const tierGradients = {
    silver: "from-silver/10 to-transparent",
    gold: "from-gold/10 to-transparent",
    platinum: "from-platinum/10 to-transparent",
  };

  const paypalLinks = {
    silver: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NEPYT72VXLE64",
    gold: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RZW56CJUMW94Q",
    platinum: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CWS96VXJJ5XTE",
  };

  const handlePayPalClick = () => {
    window.open(paypalLinks[tier], '_blank');
  };

  return (
    <Card
      className={`relative p-6 md:p-8 border-2 ${tierColors[tier]} bg-gradient-to-br ${tierGradients[tier]} hover:scale-105 transition-transform duration-300 animate-fade-in`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1 bg-primary text-primary-foreground text-xs md:text-sm font-semibold rounded-full">
          Most Popular
        </div>
      )}

      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
        <div className="text-3xl md:text-4xl font-bold mb-2 md:mb-3">
          <span className={`bg-gradient-${tier} bg-clip-text text-transparent`}>{price}</span>
          <span className="text-base md:text-lg text-muted-foreground">/month</span>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
        {odds && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-lg border border-accent/30">
            <span className="text-xs font-medium text-muted-foreground">Odds:</span>
            <span className="text-sm font-bold text-accent-foreground">{odds}</span>
          </div>
        )}
      </div>

      <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier}
        size="lg"
        className="w-full text-sm md:text-base"
        onClick={handlePayPalClick}
      >
        Subscribe with PayPal
      </Button>
    </Card>
  );
};

export default SubscriptionCard;
