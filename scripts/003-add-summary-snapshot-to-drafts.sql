-- Add summary_snapshot_json column to questionnaire_drafts table
ALTER TABLE questionnaire_drafts
ADD COLUMN IF NOT EXISTS summary_snapshot_json JSONB;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_drafts_summary_snapshot 
ON questionnaire_drafts USING GIN (summary_snapshot_json);
