-- ========================================
-- SUPABASE STORAGE - POLÍTICAS RLS
-- Bucket: uploads
-- Data: 2025-11-13
-- ========================================

-- INSTRUÇÕES:
-- 1. Acesse: https://app.supabase.com/project/zxfevlkssljndqqhxkjb/storage/buckets
-- 2. Clique no bucket "uploads" → aba "Policies"
-- 3. Clique em "New policy" → "Create a policy from scratch"
-- 4. Cole cada política abaixo (uma por vez)
-- 5. Clique em "Review" → "Save policy"

-- ========================================
-- POLÍTICA 1: UPLOAD (INSERT)
-- ========================================
-- Nome: "Permitir upload para usuários autenticados"
-- Operação: INSERT
-- Target roles: authenticated

CREATE POLICY "Permitir upload para usuários autenticados"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'uploads'
);

-- ========================================
-- POLÍTICA 2: LEITURA (SELECT)
-- ========================================
-- Nome: "Permitir leitura pública de arquivos"
-- Operação: SELECT
-- Target roles: public

CREATE POLICY "Permitir leitura pública de arquivos"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'uploads'
);

-- ========================================
-- POLÍTICA 3: DELEÇÃO (DELETE)
-- ========================================
-- Nome: "Permitir deleção para usuários autenticados"
-- Operação: DELETE
-- Target roles: authenticated

CREATE POLICY "Permitir deleção para usuários autenticados"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'uploads'
);

-- ========================================
-- VERIFICAR POLÍTICAS CRIADAS
-- ========================================

-- Execute esta query no SQL Editor para verificar:
SELECT
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects';

-- Resultado esperado:
-- 1. "Permitir upload para usuários autenticados"   | INSERT | {authenticated} | NULL                      | (bucket_id = 'uploads'::text)
-- 2. "Permitir leitura pública de arquivos"         | SELECT | {public}        | (bucket_id = 'uploads'::text) | NULL
-- 3. "Permitir deleção para usuários autenticados"  | DELETE | {authenticated} | (bucket_id = 'uploads'::text) | NULL

-- ========================================
-- DELETAR POLÍTICAS (SE NECESSÁRIO)
-- ========================================

-- Se precisar deletar e recriar:
DROP POLICY IF EXISTS "Permitir upload para usuários autenticados" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura pública de arquivos" ON storage.objects;
DROP POLICY IF EXISTS "Permitir deleção para usuários autenticados" ON storage.objects;

-- ========================================
-- CONFIGURAÇÃO DO BUCKET
-- ========================================

-- Configurações recomendadas:
-- Name: uploads
-- Public: ✅ Habilitado
-- File size limit: 10485760 (10MB)
-- Allowed MIME types: (deixar vazio = todos)

-- ========================================
-- TESTAR POLÍTICAS
-- ========================================

-- 1. Teste de Upload:
--    - Fazer upload via app
--    - Verificar se arquivo aparece no bucket

-- 2. Teste de Leitura:
--    - Abrir URL pública do arquivo
--    - Deve funcionar sem autenticação

-- 3. Teste de Deleção:
--    - Deletar arquivo via app
--    - Verificar se arquivo foi removido do bucket

-- ========================================
-- ESTRUTURA DE PASTAS
-- ========================================

-- uploads/
-- ├── os1/
-- │   ├── follow-up1/
-- │   │   └── dd-mm-yy-{osId}-{userId}-{fileId}.pdf
-- │   ├── follow-up2/
-- │   ├── escopo/
-- │   └── contrato/
-- ├── os2/
-- ├── os5/
-- └── ...

-- ========================================
-- URLS DE ACESSO
-- ========================================

-- Upload (POST):
-- https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/uploads/{path}

-- Download (GET - Público):
-- https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/public/uploads/{path}

-- Delete (DELETE):
-- https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/uploads/{path}

-- ========================================
-- FIM
-- ========================================
