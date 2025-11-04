-- Add match_result column to prediction_matches table
ALTER TABLE prediction_matches 
ADD COLUMN IF NOT EXISTS match_result TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN prediction_matches.match_result IS 'Result of individual match: WIN, LOSS, or NULL for pending';
