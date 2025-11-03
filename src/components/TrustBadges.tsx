import { Shield, Lock, CreditCard, Award, CheckCircle, Users } from "lucide-react";

interface TrustBadgesProps {
  variant?: "default" | "compact";
  className?: string;
}

const TrustBadges = ({ variant = "default", className = "" }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Shield,
      title: "SSL Secured",
      description: "256-bit encryption",
    },
    {
      icon: CreditCard,
      title: "PayPal Verified",
      description: "Secure payments",
    },
    {
      icon: CheckCircle,
      title: "Verified Service",
      description: "2+ years trusted",
    },
    {
      icon: Users,
      title: "2,500+ Members",
      description: "Active community",
    },
    {
      icon: Award,
      title: "89% Success Rate",
      description: "Proven results",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "GDPR compliant",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 md:gap-6 ${className}`}>
        {badges.slice(0, 4).map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-foreground">{badge.title}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <badge.icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-sm font-semibold mb-1">{badge.title}</h3>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
