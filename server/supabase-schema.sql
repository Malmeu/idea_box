-- ============================================
-- SUPABASE DATABASE SCHEMA FOR IDEA BOX
-- ============================================
-- Exécutez ce script dans le SQL Editor de Supabase

-- Table Users
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Ideas
CREATE TABLE IF NOT EXISTS ideas (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Messages (Safe Space)
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  color TEXT NOT NULL,
  title TEXT,
  category TEXT,
  mood TEXT,
  is_advanced BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Emergencies
CREATE TABLE IF NOT EXISTS emergencies (
  id BIGSERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  urgency_level TEXT NOT NULL CHECK (urgency_level IN ('MEDIUM', 'HIGH', 'CRITICAL')),
  contact_agreement BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'RESOLVED')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table About U
CREATE TABLE IF NOT EXISTS about_u (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('DREAM', 'GOAL', 'PASSION', 'STORY')),
  nickname TEXT NOT NULL,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  is_surprise_unlocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_ideas_created_at ON ideas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_emergencies_status ON emergencies(status);
CREATE INDEX IF NOT EXISTS idx_emergencies_created_at ON emergencies(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_about_u_user_id ON about_u(user_id);
CREATE INDEX IF NOT EXISTS idx_about_u_created_at ON about_u(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_u ENABLE ROW LEVEL SECURITY;

-- Policies: Allow service role to bypass RLS
-- (Le service role key utilisé côté serveur a accès complet)

-- Pour l'instant, on permet tout via le service role
-- Les policies ci-dessous sont pour référence si vous voulez utiliser RLS avec auth côté client

CREATE POLICY "Service role can do everything on users" 
  ON users FOR ALL 
  USING (true);

CREATE POLICY "Service role can do everything on ideas" 
  ON ideas FOR ALL 
  USING (true);

CREATE POLICY "Service role can do everything on messages" 
  ON messages FOR ALL 
  USING (true);

CREATE POLICY "Service role can do everything on emergencies" 
  ON emergencies FOR ALL 
  USING (true);

CREATE POLICY "Service role can do everything on about_u" 
  ON about_u FOR ALL 
  USING (true);

-- ============================================
-- VERIFICATION
-- ============================================

-- Vérifier que les tables sont créées
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
