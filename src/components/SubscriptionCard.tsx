import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UrgencyTimer from "@/components/UrgencyTimer";

interface SubscriptionCardProps {
  tier: "silver" | "gold" | "platinum";
  title: string;
  features: string[];
  description: string;
  odds?: string;
}

const SubscriptionCard = ({
  tier,
  title,
  features,
  description,
  odds,
}: SubscriptionCardProps) => {
  const [period, setPeriod] = useState<'daily' | '15days'>('daily');
  
  // Price mapping for each tier and period
  const priceMap = {
    silver: { daily: "€39", "15days": "€390" },
    gold: { daily: "€59", "15days": "€590" },
    platinum: { daily: "€99", "15days": "€990" },
  };
  
  const currentPrice = priceMap[tier][period];
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
    silver: {
      daily: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NEPYT72VXLE64",
      "15days": "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UV7KQZ9XFTTD4",
    },
    gold: {
      daily: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RZW56CJUMW94Q",
      "15days": "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KQH5PCNXDXRQA",
    },
    platinum: {
      daily: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CWS96VXJJ5XTE",
      "15days": "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D8GE6G9CFA6FL",
    },
  };

  const handlePayPalClick = () => {
    window.open(paypalLinks[tier][period], '_blank');
  };

  return (
    <Card
      className={`relative p-4 sm:p-6 md:p-8 border-2 ${tierColors[tier]} bg-gradient-to-br ${tierGradients[tier]} hover:scale-105 transition-transform duration-300 animate-fade-in`}
    >
      <div className="text-center mb-4 sm:mb-5 md:mb-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-2.5">{title}</h3>
        
        <div className="mb-3 sm:mb-4">
          <Select value={period} onValueChange={(value: 'daily' | '15days') => setPeriod(value)}>
            <SelectTrigger className="w-full max-w-[180px] sm:max-w-[200px] mx-auto text-sm sm:text-base">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="15days">15 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3">
          <span className={`bg-gradient-${tier} bg-clip-text text-transparent`}>{currentPrice}</span>
          <span className="text-sm sm:text-base md:text-lg text-muted-foreground">/{period === 'daily' ? 'day' : '15 days'}</span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{description}</p>
        {odds && (
          <div className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-accent/20 rounded-lg border border-accent/30">
            <span className="text-xs font-medium text-muted-foreground">Odds:</span>
            <span className="text-xs sm:text-sm font-bold text-accent-foreground">{odds}</span>
          </div>
        )}
      </div>

      <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 mb-5 sm:mb-6 md:mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 sm:gap-3">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Urgency Timer - показва се само за Silver tier */}
      {tier === "silver" && (
        <div className="mb-4">
          <UrgencyTimer tier={tier} />
        </div>
      )}

      <Button
        variant={tier}
        size="lg"
        className="w-full text-xs sm:text-sm md:text-base py-2.5 sm:py-3"
        onClick={handlePayPalClick}
      >
        Subscribe with PayPal
      </Button>
    </Card>
  );
};

export default SubscriptionCard;
