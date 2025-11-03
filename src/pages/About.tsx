import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import TrustBadges from "@/components/TrustBadges";
import { Users, Target, TrendingUp, Shield, Award, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "2,500+", label: "Active Members" },
    { icon: Target, value: "89%", label: "Average Success Rate" },
    { icon: TrendingUp, value: "€2.4M+", label: "Total Winnings" },
    { icon: Clock, value: "2+ Years", label: "In Operation" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "We publish all our predictions and results. No hidden losses, no fake statistics. What you see is what you get.",
    },
    {
      icon: Target,
      title: "Data-Driven",
      description: "Every prediction is backed by advanced statistical models, team analysis, and years of football expertise.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Our track record speaks for itself. Consistent profitability across all major European leagues.",
    },
  ];

  const team = [
    {
      name: "Analytics Team",
      role: "Statistical Analysis & Modeling",
      description: "Our data scientists use machine learning algorithms to analyze thousands of matches, identifying patterns and value bets.",
    },
    {
      name: "Expert Analysts",
      role: "Football Intelligence",
      description: "Former professional players and coaches who understand the game beyond statistics - tactics, psychology, and team dynamics.",
    },
    {
      name: "Support Team",
      role: "Customer Success",
      description: "Dedicated support staff available via email, Telegram, and priority channels to ensure you get the most from your subscription.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="About Us - GoLeadorTips | Expert Football Predictions"
        description="Learn about GoLeadorTips - our mission, methodology, and the team behind Europe's most trusted football prediction service."
        keywords="about goleadortips, football prediction experts, betting tips team, sports analytics"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              About GoLeadorTips
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              We're a team of football analysts, data scientists, and betting professionals dedicated to providing the most accurate and profitable football predictions in Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 md:py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Our Story</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                GoLeadorTips was founded in 2022 by a group of football enthusiasts who were frustrated with the lack of transparency and reliability in the sports betting prediction industry. Too many services made unrealistic promises, hid their losses, and provided little to no real value to their subscribers.
              </p>
              
              <p>
                We decided to do things differently. Our approach combines advanced statistical modeling with deep football knowledge. We don't just look at numbers - we understand the game, the teams, the players, and the countless factors that influence match outcomes.
              </p>
              
              <p>
                What started as a small project among friends has grown into one of Europe's most trusted football prediction services, with over 2,500 active members across 40+ countries. Our success is built on three pillars: transparency, accuracy, and customer success.
              </p>
              
              <p className="font-semibold text-foreground">
                We publish every prediction, every result, and every statistic. When we win, you see it. When we lose, you see it too. This transparency has earned us the trust of thousands of members who rely on our predictions to make informed betting decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-16 text-center">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-lg border border-border hover:border-primary transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <value.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Methodology */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Our Methodology</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-3">1. Data Collection & Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We analyze over 50 different metrics for each match, including team form, head-to-head records, player statistics, injury reports, tactical setups, and historical performance patterns. Our database contains data from 100,000+ matches across all major European leagues.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-3">2. Statistical Modeling</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our proprietary algorithms use machine learning to identify value bets and predict outcomes with high accuracy. We continuously refine our models based on new data and results, ensuring they stay sharp and effective.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-3">3. Expert Review</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every prediction generated by our algorithms is reviewed by our team of football experts. They add context that numbers can't capture - team morale, managerial changes, weather conditions, and other intangible factors that influence match outcomes.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-3">4. Risk Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We carefully select predictions based on value and risk. Our Silver package focuses on safer bets with lower odds, Gold targets medium-risk accumulators, and Platinum offers high-odds VIP predictions for experienced bettors. Each tier is designed for different risk appetites and bankroll sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 md:mb-16 text-center">Our Team</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="p-6 bg-background rounded-lg border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Why Choose GoLeadorTips?</h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p><strong className="text-foreground">Complete Transparency:</strong> We publish all predictions and results. No cherry-picking, no hiding losses.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p><strong className="text-foreground">Proven Track Record:</strong> 89% average success rate across all packages over 2+ years of operation.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p><strong className="text-foreground">Expert Analysis:</strong> Combination of advanced algorithms and human expertise from former players and coaches.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p><strong className="text-foreground">Flexible Packages:</strong> Three tiers designed for different experience levels and risk appetites.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p><strong className="text-foreground">Excellent Support:</strong> Responsive customer support via email and Telegram, with 24/7 availability for Platinum members.</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <p><strong className="text-foreground">Community:</strong> Join thousands of members in our Telegram group, share experiences, and learn from each other.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Start winning with data-driven predictions from Europe's most trusted football prediction service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                View Packages
              </a>
              <a
                href="/archives"
                className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-border rounded-lg font-semibold hover:border-primary transition-colors"
              >
                View Our Results
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
