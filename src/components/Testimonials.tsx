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
      name: "Michael Johnson",
      role: "Professional Bettor",
      content: "I've been using GoLeadorTips for 6 months now and my success rate has increased by 40%. The Platinum package predictions are incredibly accurate!",
      rating: 5,
      package: "Platinum",
    },
    {
      name: "Sarah Williams",
      role: "Sports Enthusiast",
      content: "The Gold package is worth every penny. The detailed analysis and high-confidence tips have helped me make smarter betting decisions.",
      rating: 5,
      package: "Gold",
    },
    {
      name: "David Martinez",
      role: "Casual Bettor",
      content: "Started with Silver to test the waters. The predictions are solid and the support team is very responsive. Highly recommend!",
      rating: 5,
      package: "Silver",
    },
    {
      name: "James Anderson",
      role: "Football Analyst",
      content: "As someone who analyzes football professionally, I'm impressed by the depth of research behind these predictions. Top-notch service!",
      rating: 5,
      package: "Platinum",
    },
    {
      name: "Emma Thompson",
      role: "Weekend Bettor",
      content: "The transparency with past results really builds trust. I've been consistently profitable since joining the Gold package.",
      rating: 5,
      package: "Gold",
    },
    {
      name: "Robert Chen",
      role: "Sports Investor",
      content: "The ROI speaks for itself. Best investment I've made in sports betting. The VIP predictions are game-changers.",
      rating: 5,
      package: "Platinum",
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
