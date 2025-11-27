-- ============================================
-- CRÉATION DES UTILISATEURS
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor

-- Supprimer les utilisateurs existants (optionnel)
DELETE FROM users WHERE username IN ('Employe', 'Collable');

-- Insérer les nouveaux utilisateurs
INSERT INTO users (username, password, role) VALUES
  ('Employe', '$2b$10$CwnCDMJPl8VynIx5jpg3mOwn1nhq4o6pBqX8s4fA89uz9ROSlqWky', 'USER'),
  ('Collable', '$2b$10$7cfeZlVn6ELTkgo9SjWTG.eHA5tSkwgtTJNcoww0cYEHSbzqXp3P6', 'ADMIN');

-- Vérifier que les utilisateurs sont créés
SELECT id, username, role, created_at FROM users;

-- ============================================
-- INFORMATIONS DE CONNEXION
-- ============================================
-- 
-- Utilisateur normal :
--   Username: Employe
--   Email: employe@collable.com (info seulement, pas utilisé pour la connexion)
--   Password: Emploe@2025
--
-- Administrateur :
--   Username: Collable
--   Email: admin@collable.com (info seulement, pas utilisé pour la connexion)
--   Password: Collable@2025
--
-- ⚠️ IMPORTANT : 
-- - La connexion se fait avec le USERNAME (pas l'email)
-- - Les emails sont fournis à titre informatif uniquement
-- - Le système actuel n'utilise pas les emails pour l'authentification
