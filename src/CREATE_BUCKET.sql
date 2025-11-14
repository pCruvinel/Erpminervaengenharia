-- ========================================
-- CRIAR BUCKET E POLÍTICAS - SUPABASE STORAGE
-- Execute este script no SQL Editor do Supabase
-- ========================================

-- PASSO 1: Criar o bucket 'uploads'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  true,  -- Bucket público
  10485760,  -- 10MB em bytes
  NULL  -- Permite todos os MIME types
)
ON CONFLICT (id) DO NOTHING;

-- PASSO 2: Criar política de INSERT (Upload)
CREATE POLICY "Permitir upload para todos"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'uploads');

-- PASSO 3: Criar política de SELECT (Leitura)
CREATE POLICY "Permitir leitura pública"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'uploads');

-- PASSO 4: Criar política de DELETE (Deleção)
CREATE POLICY "Permitir deleção para todos"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'uploads');

-- ========================================
-- VERIFICAR SE FOI CRIADO CORRETAMENTE
-- ========================================

-- Verificar bucket
SELECT * FROM storage.buckets WHERE id = 'uploads';

-- Verificar políticas
SELECT 
  policyname,
  cmd as operation,
  roles
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND (qual LIKE '%uploads%' OR with_check LIKE '%uploads%');

-- ========================================
-- RESULTADO ESPERADO:
-- ========================================

-- Bucket:
-- id: uploads
-- name: uploads
-- public: true
-- file_size_limit: 10485760

-- Políticas (3 no total):
-- 1. "Permitir upload para todos" | INSERT | {public}
-- 2. "Permitir leitura pública" | SELECT | {public}
-- 3. "Permitir deleção para todos" | DELETE | {public}
