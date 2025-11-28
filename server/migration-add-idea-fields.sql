-- ============================================
-- MIGRATION: Ajouter les champs avancés à la table ideas
-- ============================================
-- Exécutez ce script dans le SQL Editor de Supabase

-- Ajouter les colonnes category, priority, tags et is_advanced à la table ideas
ALTER TABLE ideas 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS priority TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT,
ADD COLUMN IF NOT EXISTS is_advanced BOOLEAN DEFAULT FALSE;

-- Vérifier que les colonnes ont été ajoutées
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ideas' 
ORDER BY ordinal_position;
