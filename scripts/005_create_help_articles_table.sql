-- Create help_articles table with full-text search support
CREATE TABLE IF NOT EXISTS public.help_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  search TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.help_articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view help articles" ON public.help_articles;

-- Create policy for public read access
CREATE POLICY "Anyone can view help articles"
  ON public.help_articles FOR SELECT
  USING (true);

-- Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_help_articles_search ON public.help_articles USING GIN (search);

-- Create indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_help_articles_category ON public.help_articles(category);
CREATE INDEX IF NOT EXISTS idx_help_articles_views ON public.help_articles(views DESC);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.set_help_articles_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_help_articles_updated_at ON public.help_articles;

-- Create trigger to auto-update updated_at
CREATE TRIGGER set_help_articles_updated_at
  BEFORE UPDATE ON public.help_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_help_articles_updated_at();

-- Insert sample help articles
INSERT INTO public.help_articles (title, category, content, views) VALUES
  ('How do I get started with my first plan?', 'Getting Started', 'To get started with your first plan, simply complete our questionnaire. The questionnaire takes about 5-10 minutes and asks about your dietary preferences, fitness goals, and lifestyle. Once completed, our AI will generate a personalized nutrition plan tailored to your needs. You can then review and purchase your plan.', 1234),
  ('What''s the difference between Standard and Advanced questionnaires?', 'Getting Started', 'The Standard questionnaire covers basic information about your goals, dietary preferences, and activity level. The Advanced questionnaire includes additional questions about medical conditions, specific nutrient requirements, meal timing preferences, and more detailed lifestyle factors. Advanced questionnaires result in more personalized and detailed nutrition plans.', 987),
  ('Can I update my plan after purchase?', 'Plans & Features', 'Yes! You can update your plan at any time from your dashboard. Simply log in, navigate to your current plan, and click "Update Plan". You can modify your dietary preferences, adjust calorie targets, or request a complete plan regeneration based on new questionnaire responses. Updates are included with your subscription.', 856),
  ('How do I cancel my subscription?', 'Billing & Payments', 'To cancel your subscription, log into your account and go to Account Settings > Subscription. Click "Cancel Subscription" and follow the prompts. Your subscription will remain active until the end of your current billing period. You''ll continue to have access to your plans until that date. You can reactivate anytime.', 743),
  ('What payment methods do you accept?', 'Billing & Payments', 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards. Payments are processed securely through Stripe. We do not store your payment information on our servers. All transactions are encrypted and PCI-compliant.', 621),
  ('How long does it take to receive my plan?', 'Plans & Features', 'Your personalized nutrition plan is generated instantly after you complete the questionnaire and payment. You''ll receive an email with a link to view and download your plan within minutes. The plan includes meal suggestions, recipes, shopping lists, and nutritional breakdowns.', 589),
  ('What is GLP-1 and how does it affect my nutrition plan?', 'Plans & Features', 'GLP-1 (Glucagon-Like Peptide-1) medications like Ozempic, Wegovy, and Mounjaro affect appetite and digestion. Our GLP-1 Support plans are specifically designed for people taking these medications, with adjusted portion sizes, nutrient timing, and food choices that work better with GLP-1 side effects. We focus on protein-rich, easily digestible meals.', 445),
  ('Can I pause my subscription?', 'Billing & Payments', 'Currently, we don''t offer a pause feature, but you can cancel your subscription and reactivate it anytime. When you reactivate, you''ll have access to all your previous plans and can generate new ones. We''re working on adding a pause feature in the future.', 392),
  ('How do I update my payment method?', 'Account Management', 'To update your payment method, go to Account Settings > Billing. Click "Update Payment Method" and enter your new card details. Changes take effect immediately and will be used for your next billing cycle.', 356),
  ('What happens if my payment fails?', 'Billing & Payments', 'If a payment fails, we''ll send you an email notification and retry the payment automatically over the next few days. You''ll still have access to your account during this grace period. If payment continues to fail, your subscription will be cancelled, but you can reactivate anytime by updating your payment method.', 298)
ON CONFLICT (id) DO NOTHING;
