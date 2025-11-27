-- ============================================
-- SYSTÈME DE COMMENTAIRES
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor

-- Table Comments
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  idea_id BIGINT REFERENCES ideas(id) ON DELETE CASCADE,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_comments_idea_id ON comments(idea_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on comments" 
  ON comments FOR ALL 
  USING (true);

-- Vérification
SELECT * FROM comments LIMIT 5;
