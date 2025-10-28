-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create questionnaire_drafts table
CREATE TABLE IF NOT EXISTS questionnaire_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  plan_type TEXT NOT NULL,
  tier TEXT NOT NULL,
  glp_addon BOOLEAN DEFAULT FALSE,
  answers_json JSONB DEFAULT '{}',
  progress_pct INT DEFAULT 0,
  last_step TEXT DEFAULT 'start',
  resume_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  status TEXT DEFAULT 'draft',
  consent_reminders BOOLEAN DEFAULT TRUE,
  reminders_sent INT DEFAULT 0,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_plan_type CHECK (plan_type IN ('meal', 'workout', 'both')),
  CONSTRAINT valid_tier CHECK (tier IN ('standard', 'advanced')),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'completed', 'abandoned')),
  CONSTRAINT valid_progress CHECK (progress_pct >= 0 AND progress_pct <= 100)
);

-- Enable Row Level Security
ALTER TABLE questionnaire_drafts ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Authenticated users can read their own drafts
CREATE POLICY "Users can view own drafts"
  ON questionnaire_drafts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Anonymous users can read drafts with their resume token
CREATE POLICY "Anonymous can view drafts by token"
  ON questionnaire_drafts
  FOR SELECT
  USING (auth.uid() IS NULL AND resume_token IS NOT NULL);

-- Authenticated users can insert their own drafts
CREATE POLICY "Users can create own drafts"
  ON questionnaire_drafts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Anonymous users can insert drafts (user_id will be NULL)
CREATE POLICY "Anonymous can create drafts"
  ON questionnaire_drafts
  FOR INSERT
  WITH CHECK (auth.uid() IS NULL AND user_id IS NULL);

-- Authenticated users can update their own drafts
CREATE POLICY "Users can update own drafts"
  ON questionnaire_drafts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Anonymous users can update drafts with their resume token
CREATE POLICY "Anonymous can update drafts by token"
  ON questionnaire_drafts
  FOR UPDATE
  USING (auth.uid() IS NULL AND resume_token IS NOT NULL);

-- Authenticated users can delete their own drafts
CREATE POLICY "Users can delete own drafts"
  ON questionnaire_drafts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Anonymous users can delete drafts with their resume token (GDPR)
CREATE POLICY "Anonymous can delete drafts by token"
  ON questionnaire_drafts
  FOR DELETE
  USING (auth.uid() IS NULL AND resume_token IS NOT NULL);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_drafts_user_id ON questionnaire_drafts(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_drafts_resume_token ON questionnaire_drafts(resume_token);
CREATE INDEX IF NOT EXISTS idx_questionnaire_drafts_email ON questionnaire_drafts(email);
CREATE INDEX IF NOT EXISTS idx_questionnaire_drafts_expires_at ON questionnaire_drafts(expires_at);
CREATE INDEX IF NOT EXISTS idx_questionnaire_drafts_status ON questionnaire_drafts(status);
CREATE INDEX IF NOT EXISTS idx_questionnaire_drafts_created_at ON questionnaire_drafts(created_at DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_questionnaire_drafts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before updates
CREATE TRIGGER trigger_update_questionnaire_drafts_updated_at
  BEFORE UPDATE ON questionnaire_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_questionnaire_drafts_updated_at();

-- Function to clean up expired drafts (can be called by cron job)
CREATE OR REPLACE FUNCTION cleanup_expired_drafts()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM questionnaire_drafts
  WHERE expires_at < NOW() AND status = 'draft';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON questionnaire_drafts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON questionnaire_drafts TO anon;
