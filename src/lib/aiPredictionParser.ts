// AI Prediction Parser
// Парсва JSON/CSV файлове с прогнози от AI

export interface AIPredictionMatch {
  match_date: string;
  match_name: string;
  prediction: string;
  odds: number;
}

export interface AIPrediction {
  prediction_date: string;
  tier: 'silver' | 'gold' | 'platinum';
  ticket_odds?: number;
  result?: string;
  matches: AIPredictionMatch[];
}

export interface ParseResult {
  success: boolean;
  data?: AIPrediction[];
  errors?: string[];
}

/**
 * Parse JSON file from AI
 */
export const parseJSONPrediction = (jsonString: string): ParseResult => {
  const errors: string[] = [];
  
  try {
    const parsed = JSON.parse(jsonString);
    
    // Handle single prediction or array of predictions
    const predictions: any[] = Array.isArray(parsed) ? parsed : [parsed];
    const validatedPredictions: AIPrediction[] = [];
    
    predictions.forEach((pred, index) => {
      const validation = validatePrediction(pred, index);
      
      if (validation.isValid) {
        validatedPredictions.push(pred);
      } else {
        errors.push(...validation.errors);
      }
    });
    
    if (errors.length > 0) {
      return { success: false, errors };
    }
    
    return { success: true, data: validatedPredictions };
    
  } catch (error) {
    return {
      success: false,
      errors: [`Invalid JSON format: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
};

/**
 * Parse CSV file from AI
 */
export const parseCSVPrediction = (csvString: string): ParseResult => {
  const errors: string[] = [];
  const lines = csvString.trim().split('\n');
  
  if (lines.length < 2) {
    return { success: false, errors: ['CSV file is empty or has no data rows'] };
  }
  
  // Parse header
  const headers = lines[0].split(',').map(h => h.trim());
  const requiredHeaders = ['prediction_date', 'tier', 'match_date', 'match_name', 'prediction', 'odds'];
  
  const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
  if (missingHeaders.length > 0) {
    return { success: false, errors: [`Missing required columns: ${missingHeaders.join(', ')}`] };
  }
  
  // Group rows by prediction_date and tier
  const predictionMap = new Map<string, AIPrediction>();
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length !== headers.length) {
      errors.push(`Row ${i + 1}: Column count mismatch`);
      continue;
    }
    
    const row: any = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx];
    });
    
    const key = `${row.prediction_date}_${row.tier}`;
    
    if (!predictionMap.has(key)) {
      predictionMap.set(key, {
        prediction_date: row.prediction_date,
        tier: row.tier,
        ticket_odds: row.ticket_odds ? parseFloat(row.ticket_odds) : undefined,
        matches: []
      });
    }
    
    const prediction = predictionMap.get(key)!;
    prediction.matches.push({
      match_date: row.match_date,
      match_name: row.match_name,
      prediction: row.prediction,
      odds: parseFloat(row.odds)
    });
  }
  
  const predictions = Array.from(predictionMap.values());
  
  // Validate each prediction
  predictions.forEach((pred, index) => {
    const validation = validatePrediction(pred, index);
    if (!validation.isValid) {
      errors.push(...validation.errors);
    }
  });
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  return { success: true, data: predictions };
};

/**
 * Validate a single prediction
 */
const validatePrediction = (pred: any, index: number): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const prefix = `Prediction ${index + 1}:`;
  
  // Check required fields
  if (!pred.prediction_date) {
    errors.push(`${prefix} Missing prediction_date`);
  } else if (!isValidDate(pred.prediction_date)) {
    errors.push(`${prefix} Invalid prediction_date format (use YYYY-MM-DD)`);
  }
  
  if (!pred.tier) {
    errors.push(`${prefix} Missing tier`);
  } else if (!['silver', 'gold', 'platinum'].includes(pred.tier)) {
    errors.push(`${prefix} Invalid tier (must be: silver, gold, or platinum)`);
  }
  
  if (!pred.matches || !Array.isArray(pred.matches)) {
    errors.push(`${prefix} Missing or invalid matches array`);
    return { isValid: false, errors };
  }
  
  if (pred.matches.length === 0) {
    errors.push(`${prefix} No matches provided`);
  }
  
  // Validate tier-specific rules
  if (pred.tier === 'silver' && pred.matches.length !== 1) {
    errors.push(`${prefix} Silver tier must have exactly 1 match (found ${pred.matches.length})`);
  }
  
  // Validate each match
  pred.matches.forEach((match: any, matchIndex: number) => {
    const matchPrefix = `${prefix} Match ${matchIndex + 1}:`;
    
    if (!match.match_date) {
      errors.push(`${matchPrefix} Missing match_date`);
    } else if (!isValidDate(match.match_date)) {
      errors.push(`${matchPrefix} Invalid match_date format`);
    }
    
    if (!match.match_name) {
      errors.push(`${matchPrefix} Missing match_name`);
    }
    
    if (!match.prediction) {
      errors.push(`${matchPrefix} Missing prediction`);
    }
    
    if (!match.odds) {
      errors.push(`${matchPrefix} Missing odds`);
    } else if (isNaN(parseFloat(match.odds)) || parseFloat(match.odds) <= 0) {
      errors.push(`${matchPrefix} Invalid odds (must be a positive number)`);
    }
  });
  
  // Auto-calculate ticket_odds if not provided
  if (!pred.ticket_odds && pred.matches.length > 0) {
    pred.ticket_odds = pred.matches.reduce((total: number, match: any) => {
      return total * parseFloat(match.odds);
    }, 1);
    pred.ticket_odds = parseFloat(pred.ticket_odds.toFixed(2));
  }
  
  return { isValid: errors.length === 0, errors };
};

/**
 * Validate date format (YYYY-MM-DD)
 */
const isValidDate = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Auto-detect file format and parse
 */
export const parseAIPredictionFile = (content: string): ParseResult => {
  // Try JSON first
  const trimmed = content.trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return parseJSONPrediction(content);
  }
  
  // Try CSV
  if (trimmed.includes(',') && trimmed.split('\n').length > 1) {
    return parseCSVPrediction(content);
  }
  
  return {
    success: false,
    errors: ['Unable to detect file format. Please use JSON or CSV format.']
  };
};

/**
 * Generate example JSON for AI
 */
export const generateExampleJSON = (tier: 'silver' | 'gold' | 'platinum'): string => {
  const today = new Date().toISOString().split('T')[0];
  
  const examples = {
    silver: {
      prediction_date: today,
      tier: 'silver',
      ticket_odds: 1.80,
      matches: [
        {
          match_date: today,
          match_name: 'Arsenal vs Chelsea',
          prediction: '1 (Home Win)',
          odds: 1.80
        }
      ]
    },
    gold: {
      prediction_date: today,
      tier: 'gold',
      ticket_odds: 8.50,
      matches: [
        {
          match_date: today,
          match_name: 'Arsenal vs Chelsea',
          prediction: '1 (Home Win)',
          odds: 1.70
        },
        {
          match_date: today,
          match_name: 'Barcelona vs Real Madrid',
          prediction: 'Over 2.5',
          odds: 2.00
        },
        {
          match_date: today,
          match_name: 'Bayern vs Dortmund',
          prediction: 'BTTS Yes',
          odds: 2.50
        }
      ]
    },
    platinum: {
      prediction_date: today,
      tier: 'platinum',
      ticket_odds: 45.00,
      matches: [
        {
          match_date: today,
          match_name: 'Juventus vs Inter',
          prediction: '2 (Away Win)',
          odds: 3.00
        },
        {
          match_date: today,
          match_name: 'PSG vs Lyon',
          prediction: 'Home Win & Over 2.5',
          odds: 5.00
        },
        {
          match_date: today,
          match_name: 'Atletico vs Sevilla',
          prediction: '1X',
          odds: 3.00
        }
      ]
    }
  };
  
  return JSON.stringify(examples[tier], null, 2);
};
