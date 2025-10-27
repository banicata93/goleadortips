import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Upload, FileJson, FileText, CheckCircle, XCircle, Download, Save, Loader2 } from "lucide-react";
import { parseAIPredictionFile, generateExampleJSON, type AIPrediction } from "@/lib/aiPredictionParser";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIImportDialogProps {
  onImport: (predictions: AIPrediction[]) => void;
  onBulkSave?: () => void;
}

const AIImportDialog = ({ onImport, onBulkSave }: AIImportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [parsedData, setParsedData] = useState<AIPrediction[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showExamples, setShowExamples] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      handleParse(content);
    };
    reader.readAsText(file);
  };

  const handleParse = (content: string) => {
    if (!content.trim()) {
      setErrors(["Please provide file content"]);
      setParsedData(null);
      return;
    }

    const result = parseAIPredictionFile(content);

    if (result.success && result.data) {
      setParsedData(result.data);
      setErrors([]);
      toast({
        title: "Success!",
        description: `Parsed ${result.data.length} prediction(s) successfully`,
      });
    } else {
      setParsedData(null);
      setErrors(result.errors || ["Unknown error occurred"]);
      toast({
        title: "Parse Error",
        description: "Please check the errors below",
        variant: "destructive",
      });
    }
  };

  const handleImport = () => {
    if (parsedData) {
      onImport(parsedData);
      setOpen(false);
      resetState();
      toast({
        title: "Imported!",
        description: `${parsedData.length} prediction(s) ready to save`,
      });
    }
  };

  const handleBulkSave = async () => {
    if (!parsedData || parsedData.length === 0) return;

    setIsSaving(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const pred of parsedData) {
        try {
          // Insert prediction
          const { data: newPrediction, error: predError } = await supabase
            .from("predictions")
            .insert([{
              prediction_date: pred.prediction_date,
              tier: pred.tier,
              result: pred.result || null,
              ticket_odds: pred.ticket_odds || null,
            }])
            .select()
            .single();

          if (predError) throw predError;

          // Insert matches
          const { error: matchError } = await supabase
            .from("prediction_matches")
            .insert(
              pred.matches.map(m => ({
                prediction_id: newPrediction.id,
                match_date: m.match_date,
                match_name: m.match_name,
                prediction: m.prediction,
                odds: m.odds,
              }))
            );

          if (matchError) throw matchError;

          successCount++;
        } catch (error) {
          console.error(`Error saving prediction for ${pred.prediction_date}:`, error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast({
          title: "Bulk Save Complete!",
          description: `Successfully saved ${successCount} prediction(s)${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
        });
        
        if (onBulkSave) {
          onBulkSave();
        }
        
        setOpen(false);
        resetState();
      } else {
        toast({
          title: "Save Failed",
          description: "Could not save any predictions. Please check the console for errors.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred during bulk save.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetState = () => {
    setFileContent("");
    setParsedData(null);
    setErrors([]);
    setShowExamples(false);
  };

  const downloadExample = (tier: 'silver' | 'gold' | 'platinum') => {
    const example = generateExampleJSON(tier);
    const blob = new Blob([example], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `example-${tier}-prediction.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          AI Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Import Predictions from AI
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload JSON or CSV file
            </label>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".json,.csv,.txt"
                onChange={handleFileUpload}
                className="flex-1 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
              >
                <Download className="h-4 w-4 mr-2" />
                Examples
              </Button>
            </div>
          </div>

          {/* Examples */}
          {showExamples && (
            <Card className="p-4 bg-muted/50">
              <h4 className="font-semibold mb-3">Download Example Files:</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadExample('silver')}
                >
                  Silver Example
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadExample('gold')}
                >
                  Gold Example
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadExample('platinum')}
                >
                  Platinum Example
                </Button>
              </div>
            </Card>
          )}

          {/* Manual Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Or paste JSON/CSV content:
            </label>
            <Textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              placeholder='{"prediction_date": "2025-01-27", "tier": "silver", "matches": [...]}'
              rows={8}
              className="font-mono text-sm"
            />
            <Button
              onClick={() => handleParse(fileContent)}
              className="mt-2"
              size="sm"
            >
              Parse Content
            </Button>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <Card className="p-4 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <div className="flex items-start gap-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    Validation Errors:
                  </h4>
                  <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
                    {errors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* Preview */}
          {parsedData && parsedData.length > 0 && (
            <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    Preview ({parsedData.length} prediction{parsedData.length > 1 ? 's' : ''})
                  </h4>
                </div>
              </div>

              <div className="space-y-4">
                {parsedData.map((pred, idx) => (
                  <Card key={idx} className="p-4 bg-background">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          pred.tier === 'silver' ? 'secondary' :
                          pred.tier === 'gold' ? 'default' :
                          'destructive'
                        }>
                          {pred.tier.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {pred.prediction_date}
                        </span>
                      </div>
                      {pred.ticket_odds && (
                        <Badge variant="outline" className="font-bold">
                          Odds: {pred.ticket_odds}
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      {pred.matches.map((match, matchIdx) => (
                        <div
                          key={matchIdx}
                          className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm"
                        >
                          <div className="flex-1">
                            <div className="font-medium">{match.match_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {match.match_date} • {match.prediction}
                            </div>
                          </div>
                          <Badge variant="outline">{match.odds}</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {parsedData && parsedData.length > 0 && (
                <span>
                  Ready to save: <strong>{parsedData.length}</strong> prediction(s)
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button
                variant="secondary"
                onClick={handleImport}
                disabled={!parsedData || parsedData.length === 0 || isSaving}
              >
                Load to Form
              </Button>
              <Button
                onClick={handleBulkSave}
                disabled={!parsedData || parsedData.length === 0 || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All {parsedData?.length || 0}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIImportDialog;
