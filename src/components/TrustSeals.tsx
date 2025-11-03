import { Shield, Star, Award, CheckCircle } from "lucide-react";

interface TrustSealsProps {
  variant?: "default" | "compact";
  className?: string;
}

const TrustSeals = ({ variant = "default", className = "" }: TrustSealsProps) => {
  const seals = [
    {
      name: "Trustpilot",
      rating: "4.8/5",
      reviews: "1,247 reviews",
      icon: Star,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      name: "Google Reviews",
      rating: "4.7/5",
      reviews: "892 reviews",
      icon: Star,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "Norton Secured",
      rating: "SSL Verified",
      reviews: "256-bit encryption",
      icon: Shield,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      name: "McAfee Secure",
      rating: "Protected",
      reviews: "Daily security scans",
      icon: CheckCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {seals.map((seal, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className={`${seal.bgColor} p-1.5 rounded`}>
              <seal.icon className={`w-4 h-4 ${seal.color}`} />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-foreground">{seal.name}</div>
              <div className="text-xs text-muted-foreground">{seal.rating}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {seals.map((seal, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-14 h-14 rounded-full ${seal.bgColor} flex items-center justify-center mb-3`}>
            <seal.icon className={`w-7 h-7 ${seal.color}`} />
          </div>
          <h3 className="text-sm font-semibold mb-1">{seal.name}</h3>
          <div className="flex items-center gap-1 mb-1">
            {seal.icon === Star && (
              <>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 fill-current ${seal.color}`} />
                ))}
              </>
            )}
          </div>
          <p className="text-xs font-medium text-foreground">{seal.rating}</p>
          <p className="text-xs text-muted-foreground">{seal.reviews}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustSeals;
