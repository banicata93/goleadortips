import { Newspaper, Radio, Tv, Globe } from "lucide-react";

interface FeaturedInProps {
  className?: string;
}

const FeaturedIn = ({ className = "" }: FeaturedInProps) => {
  const media = [
    {
      name: "Sports Betting Weekly",
      icon: Newspaper,
      description: "Featured Article",
    },
    {
      name: "Football Analytics Today",
      icon: Globe,
      description: "Top 10 Services",
    },
    {
      name: "Betting Insights Podcast",
      icon: Radio,
      description: "Guest Interview",
    },
    {
      name: "Sports Tech Review",
      icon: Tv,
      description: "Editor's Choice",
    },
  ];

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-6">
          As Featured In
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {media.map((outlet, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card/50 border border-border rounded-lg hover:border-primary/50 transition-all animate-fade-in grayscale hover:grayscale-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <outlet.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xs font-semibold mb-1 text-foreground">{outlet.name}</h3>
            <p className="text-xs text-muted-foreground">{outlet.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-muted-foreground italic">
          Trusted by industry experts and featured in leading sports betting publications
        </p>
      </div>
    </div>
  );
};

export default FeaturedIn;
