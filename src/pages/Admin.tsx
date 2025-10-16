import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, Trash2, Edit, X, Copy, Calculator, RotateCcw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PredictionMatch {
  id?: string;
  match_date: string;
  match_name: string;
  prediction: string;
  odds: number | null;
}

interface Prediction {
  id: string;
  prediction_date: string;
  tier: "silver" | "gold" | "platinum";
  result: string | null;
  ticket_odds: number | null;
  matches?: PredictionMatch[];
}

// Match templates for quick insertion
const MATCH_TEMPLATES = {
  leagues: [
    "Premier League",
    "Champions League",
    "Europa League",
    "La Liga",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
    "Championship"
  ],
  teams: [
    "Arsenal", "Chelsea", "Manchester City", "Manchester United", "Liverpool",
    "Tottenham", "Newcastle", "Aston Villa", "West Ham", "Brighton",
    "Real Madrid", "Barcelona", "Atletico Madrid", "Sevilla", "Valencia",
    "Juventus", "AC Milan", "Inter Milan", "Napoli", "Roma",
    "Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen"
  ],
  predictions: [
    "Home Win", "Away Win", "Draw", "Over 1.5 Goals", "Over 2.5 Goals", "Under 2.5 Goals",
    "Both Teams to Score", "Clean Sheet", "First Goal", "Last Goal"
  ]
};

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [formData, setFormData] = useState({
    prediction_date: new Date().toISOString().split('T')[0],
    tier: "silver" as "silver" | "gold" | "platinum",
    result: "",
    ticket_odds: "",
  });
  const [matches, setMatches] = useState<Array<{
    match_date: string;
    match_name: string;
    prediction: string;
    odds: string;
  }>>([
    { match_date: new Date().toISOString().split('T')[0], match_name: "", prediction: "", odds: "" }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roles) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await fetchPredictions();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error checking admin access:", error);
      }
      toast({
        title: "Error",
        description: "Unable to verify admin access. Please try again.",
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictions = async () => {
    const { data: predictionsData, error: predictionsError } = await supabase
      .from("predictions")
      .select("*")
      .order("prediction_date", { ascending: false });

    if (predictionsError) {
      toast({
        title: "Error",
        description: "Failed to fetch predictions",
        variant: "destructive",
      });
      return;
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

    setPredictions(predictionsWithMatches);
  };

  const calculateTotalOdds = () => {
    const validOdds = matches
      .filter(m => m.odds && !isNaN(parseFloat(m.odds)))
      .map(m => parseFloat(m.odds));

    if (validOdds.length === 0) return 0;

    return validOdds.reduce((total, odds) => total * odds, 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (matches.length === 0 || matches.some(m => !m.match_date || !m.match_name || !m.prediction)) {
      toast({
        title: "Error",
        description: "Please fill all match details",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingId) {
        // Update prediction
        const { error: predError } = await supabase
          .from("predictions")
          .update({
            prediction_date: formData.prediction_date,
            tier: formData.tier,
            result: formData.result || null,
            ticket_odds: formData.ticket_odds ? parseFloat(formData.ticket_odds) : null,
          })
          .eq("id", editingId);

        if (predError) throw predError;

        // Delete old matches and insert new ones
        await supabase
          .from("prediction_matches")
          .delete()
          .eq("prediction_id", editingId);

        const { error: matchError } = await supabase
          .from("prediction_matches")
          .insert(
            matches.map(m => ({
              prediction_id: editingId,
              match_date: m.match_date,
              match_name: m.match_name,
              prediction: m.prediction,
              odds: m.odds ? parseFloat(m.odds) : null,
            }))
          );

        if (matchError) throw matchError;

        toast({
          title: "Success",
          description: "Prediction updated successfully",
        });
      } else {
        // Insert new prediction
        const { data: newPrediction, error: predError } = await supabase
          .from("predictions")
          .insert([{
            prediction_date: formData.prediction_date,
            tier: formData.tier,
            result: formData.result || null,
            ticket_odds: formData.ticket_odds ? parseFloat(formData.ticket_odds) : null,
          }])
          .select()
          .single();

        if (predError) throw predError;

        // Insert matches
        const { error: matchError } = await supabase
          .from("prediction_matches")
          .insert(
            matches.map(m => ({
              prediction_id: newPrediction.id,
              match_date: m.match_date,
              match_name: m.match_name,
              prediction: m.prediction,
              odds: m.odds ? parseFloat(m.odds) : null,
            }))
          );

        if (matchError) throw matchError;

        toast({
          title: "Success",
          description: "Prediction added successfully",
        });
      }

      resetForm();
      await fetchPredictions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      prediction_date: new Date().toISOString().split('T')[0],
      tier: "silver",
      result: "",
      ticket_odds: "",
    });
    setMatches([{ match_date: new Date().toISOString().split('T')[0], match_name: "", prediction: "", odds: "" }]);
    setEditingId(null);
  };

  const handleEdit = (prediction: Prediction) => {
    setFormData({
      prediction_date: prediction.prediction_date,
      tier: prediction.tier,
      result: prediction.result || "",
      ticket_odds: prediction.ticket_odds?.toString() || "",
    });
    setMatches(prediction.matches?.map(m => ({
      match_date: m.match_date,
      match_name: m.match_name,
      prediction: m.prediction,
      odds: m.odds?.toString() || ""
    })) || [{ match_date: "", match_name: "", prediction: "", odds: "" }]);
    setEditingId(prediction.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this prediction and all its matches?")) return;

    const { error } = await supabase
      .from("predictions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete prediction",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Prediction deleted successfully",
    });
    await fetchPredictions();
  };

  const addMatch = () => {
    setMatches([...matches, { match_date: new Date().toISOString().split('T')[0], match_name: "", prediction: "", odds: "" }]);
  };

  const removeMatch = (index: number) => {
    if (matches.length === 1) {
      toast({
        title: "Error",
        description: "At least one match is required",
        variant: "destructive",
      });
      return;
    }
    setMatches(matches.filter((_, i) => i !== index));
  };

  const updateMatch = (index: number, field: string, value: string) => {
    const newMatches = [...matches];
    newMatches[index] = { ...newMatches[index], [field]: value };
    setMatches(newMatches);
  };

  const applyTemplate = (template: string, index: number) => {
    const newMatches = [...matches];
    if (template.startsWith('Team: ')) {
      newMatches[index].match_name = template.replace('Team: ', '');
    } else if (template.startsWith('Prediction: ')) {
      newMatches[index].prediction = template.replace('Prediction: ', '');
    }
    setMatches(newMatches);
  };

  const duplicateMatch = (index: number) => {
    const matchToDuplicate = matches[index];
    setMatches([...matches, { ...matchToDuplicate }]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Panel</h1>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {predictions.length} total predictions
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Prediction" : "Add New Prediction"}
                </h2>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setFormData({ ...formData, ticket_odds: calculateTotalOdds().toFixed(2) })}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calc Odds
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={resetForm}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prediction Date</label>
                    <Input
                      type="date"
                      value={formData.prediction_date}
                      onChange={(e) => setFormData({ ...formData, prediction_date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Tier</label>
                    <Select
                      value={formData.tier}
                      onValueChange={(value: "silver" | "gold" | "platinum") =>
                        setFormData({ ...formData, tier: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="silver">Silver (Single Match)</SelectItem>
                        <SelectItem value="gold">Gold (Accumulator)</SelectItem>
                        <SelectItem value="platinum">Platinum (Accumulator)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ticket Odds (Total)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Auto-calculated or manual"
                      value={formData.ticket_odds}
                      onChange={(e) => setFormData({ ...formData, ticket_odds: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Result</label>
                    <Input
                      placeholder="e.g. WIN, LOST, or leave empty"
                      value={formData.result}
                      onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Matches ({matches.length})</h3>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setShowTemplates(!showTemplates)}
                      >
                        Templates
                      </Button>
                      <Button type="button" size="sm" variant="outline" onClick={addMatch}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Match
                      </Button>
                    </div>
                  </div>

                  {showTemplates && (
                    <Card className="p-4 bg-muted/50">
                      <h4 className="font-semibold mb-3">Quick Templates</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium mb-2">Popular Teams:</div>
                          <div className="space-y-1">
                            {MATCH_TEMPLATES.teams.slice(0, 5).map(team => (
                              <Button
                                key={team}
                                size="sm"
                                variant="ghost"
                                className="h-auto p-1 text-xs justify-start"
                                onClick={() => applyTemplate(`Team: ${team}`, matches.length - 1)}
                              >
                                {team}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-2">Prediction Types:</div>
                          <div className="space-y-1">
                            {MATCH_TEMPLATES.predictions.map(pred => (
                              <Button
                                key={pred}
                                size="sm"
                                variant="ghost"
                                className="h-auto p-1 text-xs justify-start"
                                onClick={() => applyTemplate(`Prediction: ${pred}`, matches.length - 1)}
                              >
                                {pred}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-2">Leagues:</div>
                          <div className="space-y-1">
                            {MATCH_TEMPLATES.leagues.map(league => (
                              <Button
                                key={league}
                                size="sm"
                                variant="ghost"
                                className="h-auto p-1 text-xs justify-start"
                                onClick={() => applyTemplate(`Team: ${league}`, matches.length - 1)}
                              >
                                {league}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  <div className="space-y-4">
                    {matches.map((match, index) => (
                      <Card key={index} className="p-4 relative">
                        <div className="flex justify-between items-center mb-3">
                          <Badge variant="outline">Match {index + 1}</Badge>
                          <div className="flex gap-1">
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() => duplicateMatch(index)}
                              title="Duplicate this match"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            {matches.length > 1 && (
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => removeMatch(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium mb-1 block">Match Date</label>
                            <Input
                              type="date"
                              value={match.match_date}
                              onChange={(e) => updateMatch(index, "match_date", e.target.value)}
                              required
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Match Name</label>
                            <Input
                              value={match.match_name}
                              onChange={(e) => updateMatch(index, "match_name", e.target.value)}
                              placeholder="e.g. Arsenal vs Chelsea"
                              required
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Prediction</label>
                            <Input
                              value={match.prediction}
                              onChange={(e) => updateMatch(index, "prediction", e.target.value)}
                              placeholder="e.g. Over 2.5 Goals"
                              required
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium mb-1 block">Odds</label>
                            <Input
                              type="number"
                              step="0.01"
                              value={match.odds}
                              onChange={(e) => updateMatch(index, "odds", e.target.value)}
                              placeholder="e.g. 1.85"
                              className="text-sm"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingId ? (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Update Prediction
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Prediction
                      </>
                    )}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Card>

            <Card className="p-6 max-h-[800px] overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Predictions</h2>
                <Badge variant="secondary">
                  {predictions.length} total
                </Badge>
              </div>

              <div className="space-y-4">
                {predictions.slice(0, 15).map((prediction) => (
                  <Card key={prediction.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-semibold text-lg">{prediction.prediction_date}</div>
                          <Badge
                            variant={prediction.tier === 'platinum' ? 'default' : prediction.tier === 'gold' ? 'secondary' : 'outline'}
                            className="capitalize"
                          >
                            {prediction.tier}
                          </Badge>
                          {prediction.result && (
                            <Badge
                              variant={prediction.result.includes('WIN') || prediction.result.includes('✅') ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {prediction.result}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {prediction.ticket_odds && `Total Odds: ${prediction.ticket_odds} • `}
                          {prediction.matches?.length || 0} matches
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(prediction)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(prediction.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="space-y-2">
                      {prediction.matches?.slice(0, 3).map((match, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm py-1">
                          <span className="font-medium truncate flex-1">{match.match_name}</span>
                          <div className="flex items-center gap-2 ml-2">
                            <Badge variant="outline" className="text-xs">
                              {match.prediction}
                            </Badge>
                            {match.odds && (
                              <span className="text-muted-foreground font-mono">
                                {match.odds}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {prediction.matches && prediction.matches.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{prediction.matches.length - 3} more matches...
                        </div>
                      )}
                    </div>
                  </Card>
                ))}

                {predictions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No predictions yet. Add your first prediction above!
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;