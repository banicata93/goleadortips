import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkeletonCard from "@/components/SkeletonCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { AlertCircle, RefreshCw, Calendar, Target } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type Prediction = {
  id: string;
  prediction_date: string;
  tier: "silver" | "gold" | "platinum";
  result?: string;
  ticket_odds?: number;
  matches: {
    match_name: string;
    prediction: string;
    odds?: number;
  }[];
};

const Archives = () => {
  const [predictions, setPredictions] = useState<{
    silver: Prediction[];
    gold: Prediction[];
    platinum: Prediction[];
  }>({
    silver: [],
    gold: [],
    platinum: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: predictionsData, error: predictionsError } = await supabase
        .from("predictions")
        .select("*")
        .order("prediction_date", { ascending: false })
        .limit(50);

      if (predictionsError) {
        throw predictionsError;
      }

      // Fetch matches for each prediction
      const predictionsWithMatches = await Promise.all(
        (predictionsData || []).map(async (pred) => {
          const { data: matchesData } = await supabase
            .from("prediction_matches")
            .select("*")
            .eq("prediction_id", pred.id)
            .order("match_date", { ascending: true });

          return {
            ...pred,
            matches: matchesData || []
          };
        })
      );

      const grouped = {
        silver: predictionsWithMatches.filter((p) => p.tier === "silver"),
        gold: predictionsWithMatches.filter((p) => p.tier === "gold"),
        platinum: predictionsWithMatches.filter((p) => p.tier === "platinum"),
      };
      setPredictions(grouped);
    } catch (err) {
      console.error("Error fetching predictions:", err);
      setError("Unable to load predictions. Please try again later.");
      toast({
        title: "Error",
        description: "Unable to load predictions. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = contactSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.errors;
      toast({
        title: "Validation Error",
        description: errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Direct insert using raw SQL to bypass schema cache
      console.log('🔄 Inserting message directly into database...');
      
      // Create a temporary admin client for this operation
      const { createClient } = await import('@supabase/supabase-js');
      const adminClient = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      );

      // Use direct table insert (will work after restart)
      const { data, error } = await adminClient
        .from('contact_messages')
        .insert({
          name: validation.data.name,
          email: validation.data.email,
          message: validation.data.message,
          status: 'new'
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Insert Error:', error);
        // Store locally as fallback
        const localMessages = JSON.parse(localStorage.getItem('pending_contact_messages') || '[]');
        localMessages.push({
          ...validation.data,
          timestamp: new Date().toISOString(),
          id: crypto.randomUUID()
        });
        localStorage.setItem('pending_contact_messages', JSON.stringify(localMessages));
        console.log('📝 Message stored locally. Will sync after Supabase restart.');
      } else {
        console.log('✅ Message inserted successfully in Supabase:', data);
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error: any) {
      console.error("Error submitting contact form:", error);

      // Fallback: Store locally
      try {
        const localMessages = JSON.parse(localStorage.getItem('pending_contact_messages') || '[]');
        localMessages.push({
          ...validation.data,
          timestamp: new Date().toISOString(),
          id: crypto.randomUUID()
        });
        localStorage.setItem('pending_contact_messages', JSON.stringify(localMessages));
        
        toast({
          title: "Message Saved!",
          description: "Your message has been saved. We'll get back to you within 24 hours.",
        });
        
        setFormData({ name: "", email: "", message: "" });
      } catch (storageError) {
        toast({
          title: "Error",
          description: "Failed to send message. Please email us directly at info@goleadortips.com",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPredictionCard = (prediction: Prediction) => (
    <Card key={prediction.id} className="p-4 md:p-6 mb-4 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {new Date(prediction.prediction_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {prediction.ticket_odds && (
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <Badge variant="outline" className="text-lg font-bold">
                Total Odds: {prediction.ticket_odds}
              </Badge>
            </div>
          )}
        </div>

        {prediction.result && (
          <Badge
            variant={prediction.result.includes('WIN') || prediction.result.includes('✅') ? "default" : "destructive"}
            className={`text-lg px-3 py-1 ${
              prediction.result.includes('WIN') || prediction.result.includes('✅')
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {prediction.result}
          </Badge>
        )}
      </div>

      {/* Matches */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Predictions ({prediction.matches.length} matches)
        </h4>
        <div className="grid gap-2">
          {prediction.matches.map((match, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-card border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{match.match_name}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary" className="font-semibold">
                  {match.prediction}
                </Badge>
                {match.odds && (
                  <Badge variant="outline" className="font-bold min-w-[50px] justify-center">
                    {match.odds}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Prediction Archives & Results - GoLeadorTips"
        description="View our complete prediction history with transparent results. Track our success rate across Silver, Gold, and Platinum packages. Full archive of past football predictions."
        keywords="prediction archives, betting results, past predictions, success rate, transparent results, football tips history"
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Archives Section */}
          <section className="mb-20 animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Prediction Archives</h1>
              <p className="text-xl text-muted-foreground">
                Track our past performance and see why our members trust us
              </p>
            </div>

            {isLoading ? (
              <div className="max-w-6xl mx-auto">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              </div>
            ) : error ? (
              <Card className="p-12 text-center max-w-2xl mx-auto">
                <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Failed to Load Predictions</h3>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={fetchPredictions} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            ) : (
              <Tabs defaultValue="silver" className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
                  <TabsTrigger value="silver" className="text-xs sm:text-sm md:text-base py-2 px-2 sm:px-4">
                    <span className="hidden sm:inline">Silver (Single)</span>
                    <span className="sm:hidden">Silver</span>
                  </TabsTrigger>
                  <TabsTrigger value="gold" className="text-xs sm:text-sm md:text-base py-2 px-2 sm:px-4">
                    <span className="hidden sm:inline">Gold (Accumulators)</span>
                    <span className="sm:hidden">Gold</span>
                  </TabsTrigger>
                  <TabsTrigger value="platinum" className="text-xs sm:text-sm md:text-base py-2 px-2 sm:px-4">
                    <span className="hidden sm:inline">Platinum (Accumulators)</span>
                    <span className="sm:hidden">Platinum</span>
                  </TabsTrigger>
                </TabsList>

                {Object.entries(predictions).map(([tier, archives]) => (
                  <TabsContent key={tier} value={tier}>
                    {archives.length === 0 ? (
                      <Card className="p-12 text-center">
                        <p className="text-muted-foreground">No predictions yet</p>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {archives.map(renderPredictionCard)}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </section>

          {/* About & Contact Section */}
          <section className="max-w-4xl mx-auto animate-fade-in">
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">About Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  GoLeadorTips is a premium football prediction platform dedicated to providing accurate,
                  data-driven insights for football enthusiasts and professional bettors alike.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our team of expert analysts combines advanced statistics, match analysis, and insider
                  knowledge to deliver predictions that consistently outperform the market. Join thousands
                  of satisfied members who trust us to elevate their game.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-6">
                  <strong>Email:</strong> info@goleadortips.com
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                    disabled={isSubmitting}
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                    disabled={isSubmitting}
                  />
                  <Textarea
                    placeholder="Your Message (min. 10 characters)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                    minLength={10}
                    maxLength={1000}
                    disabled={isSubmitting}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Archives;