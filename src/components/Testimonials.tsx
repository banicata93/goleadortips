import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  package: "Silver" | "Gold" | "Platinum";
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Marco R.",
      role: "Milan, Italy • Member since March 2024",
      content: "After 4 months with the Platinum package, I've turned my €500 bankroll into €2,100. The Serie A predictions are spot-on, and the detailed analytics help me understand each bet. Worth every euro!",
      rating: 5,
      package: "Platinum",
    },
    {
      name: "Thomas K.",
      role: "Munich, Germany • Gold Member",
      content: "I was skeptical at first, but the weekly performance reports convinced me. 67% win rate over 3 months on Bundesliga matches. The priority support team answers within hours. Sehr gut!",
      rating: 5,
      package: "Gold",
    },
    {
      name: "Carlos M.",
      role: "Madrid, Spain • Silver Member",
      content: "Perfect for beginners like me. Started with small bets following the Silver predictions. Won 8 out of 12 last month. The Telegram group is very helpful and supportive.",
      rating: 5,
      package: "Silver",
    },
    {
      name: "Alex P.",
      role: "London, UK • Platinum Member",
      content: "The VIP predictions for Premier League are unmatched. I've been betting for 10 years, and this is the first service that actually delivers consistent results. The 24/7 support is a game-changer.",
      rating: 5,
      package: "Platinum",
    },
    {
      name: "Jean-Pierre L.",
      role: "Paris, France • Gold Member",
      content: "Trois mois avec Gold package - excellent! The Champions League predictions helped me win €850 last month. The analysis is professional and the odds are realistic, not crazy promises.",
      rating: 5,
      package: "Gold",
    },
    {
      name: "Ahmed S.",
      role: "Dubai, UAE • Silver Member",
      content: "I use the Silver package for system bets. Combined 4 predictions last week - hit 3 out of 4 and still made profit. The email delivery is always on time before kickoff. Reliable service.",
      rating: 4,
      package: "Silver",
    },
  ];

  const getPackageColor = (pkg: string) => {
    switch (pkg) {
      case "Silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "Gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            What Our Members Say
          </h2>
          <p className="text-base md:text-xl text-muted-foreground px-4">
            Join thousands of satisfied members who trust our predictions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow animate-fade-in relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getPackageColor(
                    testimonial.package
                  )}`}
                >
                  {testimonial.package}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
