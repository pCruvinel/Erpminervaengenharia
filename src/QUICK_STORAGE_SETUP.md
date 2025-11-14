# ⚡ Configuração Rápida - Supabase Storage

## 🎯 Passos Rápidos (5 minutos)

### 1️⃣ Criar Bucket

1. Acesse: https://app.supabase.com/project/zxfevlkssljndqqhxkjb/storage/buckets
2. Clique em **"New bucket"**
3. Configure:
   - Name: `uploads`
   - Public bucket: ✅ **Habilitado**
   - File size limit: `10485760` (10MB)
4. Clique em **"Create bucket"**

---

### 2️⃣ Configurar Políticas (Copiar e Colar)

1. Clique no bucket `uploads` → aba **"Policies"**
2. Clique em **"New policy"** → **"Create a policy from scratch"**

#### Política 1: Upload (INSERT)

```sql
CREATE POLICY "Permitir upload para usuários autenticados"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');
```

#### Política 2: Leitura (SELECT)

```sql
CREATE POLICY "Permitir leitura pública de arquivos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'uploads');
```

#### Política 3: Deleção (DELETE)

```sql
CREATE POLICY "Permitir deleção para usuários autenticados"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'uploads');
```

---

### 3️⃣ Testar

1. Ir para o app → Criar OS 01-04
2. Na Etapa 3 (Follow-up 1), fazer upload de um arquivo
3. Verificar se aparece na lista
4. Clicar no ícone de download (deve abrir arquivo)
5. Clicar no ícone de lixeira (deve remover)

---

## ✅ Pronto!

Arquivos serão salvos em:
```
uploads/os1/follow-up1/13-11-25-{osId}-{userId}-{fileId}.pdf
```

📚 Documentação completa: `/SUPABASE_STORAGE_SETUP.md`
