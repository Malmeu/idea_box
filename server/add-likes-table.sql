-- ============================================
-- AJOUT DE LA TABLE LIKES
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor pour ajouter le système de likes

-- Table pour tracker les likes par utilisateur
CREATE TABLE IF NOT EXISTS likes (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  idea_id BIGINT REFERENCES ideas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, idea_id) -- Un utilisateur ne peut liker qu'une fois par idée
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_idea_id ON likes(idea_id);

-- RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on likes" 
  ON likes FOR ALL 
  USING (true);

-- Vérification
SELECT * FROM likes LIMIT 5;
