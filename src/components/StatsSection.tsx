import { TrendingUp, Target, Award, Users, Star, Zap, Crown, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const StatsSection = () => {
  const navigate = useNavigate();
  const stats = [
    {
      icon: TrendingUp,
      value: "89%",
      label: "Success Rate",
      description: "Average win rate across all packages",
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 via-emerald-100/80 to-emerald-200/60 dark:from-emerald-950/50 dark:via-emerald-900/40 dark:to-emerald-800/60",
      accentColor: "from-emerald-500 to-emerald-600",
      progress: 89,
    },
    {
      icon: Target,
      value: "2,500+",
      label: "Predictions Made",
      description: "Total predictions delivered to members",
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 via-blue-100/80 to-blue-200/60 dark:from-blue-950/50 dark:via-blue-900/40 dark:to-blue-800/60",
      accentColor: "from-blue-500 to-blue-600",
      progress: 95,
    },
    {
      icon: Award,
      value: "3.2x",
      label: "Average ROI",
      description: "Return on investment for Gold package",
      color: "text-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 via-amber-100/80 to-amber-200/60 dark:from-amber-950/50 dark:via-amber-900/40 dark:to-amber-800/60",
      accentColor: "from-amber-500 to-amber-600",
      progress: 85,
    },
    {
      icon: Users,
      value: "82",
      label: "Active Members",
      description: "Trusted by thousands worldwide",
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 via-purple-100/80 to-purple-200/60 dark:from-purple-950/50 dark:via-purple-900/40 dark:to-purple-800/60",
      accentColor: "from-purple-500 to-purple-600",
      progress: 90,
    },
  ];

  const tierStats = [
    {
      tier: "Silver",
      winRate: "94%",
      avgOdds: "1.80",
      dailyTips: "30+",
      color: "border-blue-300 dark:border-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50/90 via-blue-100/80 to-blue-200/70 dark:from-blue-950/70 dark:via-blue-900/60 dark:to-blue-800/70",
      icon: Star,
      iconColor: "text-blue-700 dark:text-blue-200",
      accentColor: "from-blue-500 to-blue-600",
      progress: 94,
    },
    {
      tier: "Gold",
      winRate: "87%",
      avgOdds: "3.5",
      dailyTips: "25+",
      color: "border-amber-300 dark:border-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50/90 via-yellow-50/80 to-orange-100/70 dark:from-amber-950/60 dark:via-amber-900/50 dark:to-orange-900/60",
      icon: Crown,
      iconColor: "text-amber-600 dark:text-amber-300",
      accentColor: "from-amber-400 to-amber-600",
      progress: 87,
    },
    {
      tier: "Platinum",
      winRate: "77%",
      avgOdds: "9.0",
      dailyTips: "15+",
      color: "border-purple-300 dark:border-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50/90 via-pink-50/80 to-purple-100/70 dark:from-purple-950/60 dark:via-purple-900/50 dark:to-purple-800/60",
      icon: Zap,
      iconColor: "text-purple-600 dark:text-purple-300",
      accentColor: "from-purple-400 to-purple-600",
      progress: 77,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-background/95 to-card/30 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/3 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-secondary/3 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-primary/2 to-transparent rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl mb-8 shadow-lg border border-primary/20">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
              Our Track
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Record
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Real numbers from real predictions — transparency you can trust, results you can count on
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-8xl mx-auto mb-24">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group relative p-8 text-center hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 animate-fade-in hover:-translate-y-3 border-0 overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent opacity-10"></div>
              </div>

              {/* Icon container with enhanced styling */}
              <div className={`relative w-20 h-20 mx-auto mb-6 rounded-3xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                <stat.icon className={`w-10 h-10 ${stat.color} drop-shadow-sm`} />
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.accentColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              </div>

              {/* Enhanced progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Progress</span>
                  <span className="text-sm font-bold text-foreground">{stat.progress}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-3 shadow-inner">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${stat.accentColor} shadow-sm transition-all duration-1500 ease-out relative overflow-hidden`}
                    style={{
                      width: `${stat.progress}%`,
                      animationDelay: `${(index + 2) * 300}ms`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="text-5xl md:text-6xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300 text-foreground">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-2 text-foreground/90">{stat.label}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Tier Performance with enhanced design */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl mb-6 shadow-lg border border-secondary/20">
              <Sparkles className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                Performance by
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Package
              </span>
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose the perfect package for your betting strategy and experience level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {tierStats.map((tier, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden border-2 ${tier.color} ${tier.bgColor} animate-fade-in hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 hover:-translate-y-2`}
                style={{ animationDelay: `${(index + 6) * 200}ms` }}
              >
                <div className="relative p-8">
                  {/* Enhanced icon container */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`relative w-20 h-20 rounded-3xl ${tier.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500`}>
                      <tier.icon className={`w-10 h-10 ${tier.iconColor} drop-shadow-sm`} />
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tier.accentColor} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>
                    </div>
                  </div>

                  <h4 className="text-3xl font-bold mb-8 text-center text-foreground">
                    {tier.tier}
                  </h4>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-xl bg-muted/10">
                        <span className="text-muted-foreground font-medium">Win Rate</span>
                        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {tier.winRate}
                        </span>
                      </div>

                      {/* Enhanced progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-muted-foreground">Success Rate</span>
                          <span className="text-sm font-bold text-foreground">{tier.progress}%</span>
                        </div>
                        <div className="w-full bg-muted/20 rounded-full h-3 shadow-inner">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${tier.accentColor} shadow-sm transition-all duration-1500 ease-out relative overflow-hidden`}
                            style={{
                              width: `${tier.progress}%`,
                              animationDelay: `${(index + 8) * 300}ms`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-xl bg-muted/10">
                        <div className="text-sm text-muted-foreground mb-1">Avg. Odds</div>
                        <div className="text-xl font-bold text-foreground">{tier.avgOdds}</div>
                      </div>
                      <div className="text-center p-3 rounded-xl bg-muted/10">
                        <div className="text-sm text-muted-foreground mb-1">Daily Tips</div>
                        <div className="text-xl font-bold text-foreground">{tier.dailyTips}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/30">
                    <button
                      onClick={() => navigate('/services')}
                      className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Choose {tier.tier}
                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Disclaimer */}
        <div className="max-w-5xl mx-auto mt-20 text-center">
          <div className="bg-gradient-to-r from-muted/10 via-muted/5 to-muted/10 rounded-3xl p-8 border border-border/20 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Important Disclaimer:</span> Statistics based on last 6 months of predictions.
              Past performance does not guarantee future results. Please bet responsibly and within your means.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
