# 📎 Guia Completo: Upload de Arquivos - Supabase Storage

**Status:** ✅ DOCUMENTAÇÃO CONSOLIDADA  
**Data:** 14/11/2025  
**Versão:** 2.0 (Consolidada)

> **⭐ Este documento consolida:** FEATURE_FILE_UPLOAD.md, UPLOAD_FEATURE_README.md, QUICK_STORAGE_SETUP.md, SUPABASE_STORAGE_SETUP.md

---

## 📋 Índice

1. [🎯 Visão Geral](#visão-geral)
2. [⚡ Setup Rápido (5 min)](#setup-rápido)
3. [✨ Funcionalidades](#funcionalidades)
4. [🏗️ Estrutura Técnica](#estrutura-técnica)
5. [🔧 Configuração Detalhada](#configuração-detalhada)
6. [📁 Arquivos do Projeto](#arquivos-do-projeto)
7. [🧪 Testes](#testes)
8. [🆘 Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

### Objetivo

Permitir upload, gestão e download de arquivos (escopo, laudo, fotos) na **Etapa 3 (Follow-up 1)** do fluxo OS 01-04, com armazenamento seguro no Supabase Storage.

### Status de Implementação

- ✅ **Upload:** Drag & drop, clique, múltiplo
- ✅ **Validação:** Tipo, tamanho (10MB)
- ✅ **Gestão:** Lista, download, deletar
- ✅ **Storage:** Bucket público configurado
- ✅ **Segurança:** Políticas RLS ativas

---

## ⚡ Setup Rápido

### 1️⃣ Criar Bucket (2 min)

```
URL: https://app.supabase.com/project/zxfevlkssljndqqhxkjb/storage/buckets

1. Clicar em "New bucket"
2. Name: uploads
3. Public bucket: ✅ Habilitado
4. File size limit: 10485760 (10MB)
5. Clicar em "Create bucket"
```

### 2️⃣ Configurar Políticas (3 min)

Navegar para: `Storage → uploads → Policies`

**Política 1 - Upload (INSERT):**
```sql
CREATE POLICY "Permitir upload para usuários autenticados"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');
```

**Política 2 - Leitura (SELECT):**
```sql
CREATE POLICY "Permitir leitura pública de arquivos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'uploads');
```

**Política 3 - Deleção (DELETE):**
```sql
CREATE POLICY "Permitir deleção para usuários autenticados"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'uploads');
```

> **💡 Alternativa:** Executar script completo em `/STORAGE_POLICIES.sql`

### 3️⃣ Testar (1 min)

1. Criar OS 01-04 no app
2. Ir para Etapa 3 (Follow-up 1)
3. Upload de arquivo PDF
4. Verificar aparece na lista ✅
5. Clicar em download ✅
6. Clicar em deletar ✅

---

## ✨ Funcionalidades

### Upload de Arquivos

**Métodos suportados:**
- ✅ **Clique:** Seleção de arquivo(s) via botão
- ✅ **Drag & Drop:** Arrastar e soltar na área designada
- ✅ **Múltiplo:** Vários arquivos simultaneamente

**Validações:**
```typescript
Tipos aceitos: PDF, JPG, PNG, DOCX, XLSX
Tamanho máximo: 10MB por arquivo
Mensagens de erro: Claras e específicas
```

**Feedback visual:**
- 🔄 Loading durante upload
- 📊 Barra de progresso (%)
- ✅ Toast de sucesso
- ❌ Toast de erro (tipo/tamanho)

### Gestão de Arquivos

**Lista de arquivos anexados:**
```
┌─────────────────────────────────────────────┐
│ 📄 relatorio-tecnico.pdf       2.3 MB      │
│    13/11/2025 14:30  [Download] [Delete]   │
├─────────────────────────────────────────────┤
│ 📷 foto-fachada.jpg            1.1 MB      │
│    13/11/2025 14:32  [Download] [Delete]   │
└─────────────────────────────────────────────┘
```

**Informações exibidas:**
- ✅ Nome do arquivo
- ✅ Tamanho formatado (KB/MB)
- ✅ Data/hora do upload
- ✅ Ícone por tipo de arquivo

**Ações disponíveis:**
- 📥 **Download:** Abre arquivo em nova aba
- 🗑️ **Deletar:** Remove do storage
- 🔢 **Contador:** Total de arquivos anexados

---

## 🏗️ Estrutura Técnica

### Bucket Supabase

```
Bucket: uploads
Tipo: Public
Limite: 10MB por arquivo
URL Base: https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/public/uploads/
```

### Estrutura de Pastas

```
uploads/
├── os1/
│   ├── follow-up1/
│   │   ├── 13-11-25-uuid1-user1-file1.pdf
│   │   ├── 13-11-25-uuid1-user1-file2.jpg
│   │   └── ...
│   ├── follow-up2/
│   └── follow-up3/
├── os2/
│   └── ...
└── ...
```

### Nomenclatura de Arquivos

**Formato:**
```
dd-mm-yy-{osId}-{colaboradorId}-{fileId}.{ext}
```

**Exemplo:**
```
13-11-25-550e8400-user789-a1b2c3d4.pdf
```

**Componentes:**
- `dd-mm-yy`: Data do upload (13-11-25)
- `{osId}`: ID da OS (UUID)
- `{colaboradorId}`: ID do usuário
- `{fileId}`: ID único do arquivo (UUID)
- `.{ext}`: Extensão original (pdf, jpg, png, etc)

**Benefícios:**
- ✅ Nomes únicos (sem conflitos)
- ✅ Rastreabilidade (quem, quando, qual OS)
- ✅ Organização por tipo de OS
- ✅ Separação por etapa

---

## 🔧 Configuração Detalhada

### Arquivo: `/lib/utils/supabase-storage.ts`

**Funções principais:**

#### 1. `uploadFile()`
```typescript
async uploadFile(
  file: File,
  osId: string,
  etapa: string,
  userId: string
): Promise<{ url: string; path: string }>
```

**Validações:**
- Verifica tipo de arquivo
- Verifica tamanho (max 10MB)
- Gera nome único
- Faz upload para bucket
- Retorna URL pública

#### 2. `deleteFile()`
```typescript
async deleteFile(filePath: string): Promise<void>
```

**Ação:**
- Remove arquivo do storage
- Loga erros se falhar

#### 3. `getFileUrl()`
```typescript
getFileUrl(filePath: string): string
```

**Retorna:**
- URL pública do arquivo

#### 4. `formatFileSize()`
```typescript
formatFileSize(bytes: number): string
```

**Converte:**
- Bytes → KB/MB formatado

---

## 📁 Arquivos do Projeto

### Criados

1. **`/lib/utils/supabase-storage.ts`**
   - Utilitário de storage completo
   - Validações e upload
   
2. **`/STORAGE_POLICIES.sql`**
   - Script SQL de políticas RLS
   
3. **`/CREATE_BUCKET.sql`**
   - Script de criação do bucket

4. **`/UPLOAD_STORAGE_GUIDE.md`** (este arquivo)
   - Documentação consolidada

### Modificados

1. **`/components/os/os-details-workflow-page.tsx`**
   - Import do utilitário
   - Estados: `anexos`, `isUploading`, `uploadProgress`
   - Funções: `handleFileUpload()`, `handleFileDelete()`, etc
   - UI: Área de drag & drop
   - UI: Lista de arquivos

2. **`/components/os/steps/shared/step-followup-1.tsx`**
   - Integração com upload
   - Exibição de arquivos anexados

---

## 🧪 Testes

### Teste 1: Upload Simples

```
1. Criar OS 01-04
2. Ir para Etapa 3
3. Clicar em "Selecionar arquivos"
4. Escolher arquivo PDF (< 10MB)
5. ✅ Deve aparecer na lista
6. ✅ Toast de sucesso
```

### Teste 2: Drag & Drop

```
1. Na Etapa 3
2. Arrastar arquivo JPG para área
3. ✅ Deve fazer upload
4. ✅ Aparecer na lista
```

### Teste 3: Validação de Tamanho

```
1. Upload de arquivo > 10MB
2. ❌ Deve mostrar erro
3. ✅ Toast: "Arquivo muito grande"
```

### Teste 4: Validação de Tipo

```
1. Upload de arquivo .exe
2. ❌ Deve mostrar erro
3. ✅ Toast: "Tipo de arquivo não permitido"
```

### Teste 5: Download

```
1. Clicar no ícone de download
2. ✅ Deve abrir arquivo em nova aba
3. ✅ URL pública funcionando
```

### Teste 6: Deleção

```
1. Clicar no ícone de lixeira
2. ✅ Deve remover da lista
3. ✅ Deve deletar do storage
4. ✅ Toast de confirmação
```

---

## 🆘 Troubleshooting

### Erro: "Upload failed"

**Causa:** Políticas RLS não configuradas

**Solução:**
```sql
-- Verificar políticas no Supabase Dashboard
SELECT * FROM pg_policies WHERE tablename = 'objects';

-- Se vazio, executar script STORAGE_POLICIES.sql
```

### Erro: "Bucket not found"

**Causa:** Bucket 'uploads' não existe

**Solução:**
```
1. Ir para Storage no Supabase
2. Criar bucket 'uploads'
3. Marcar como público
```

### Erro: "File too large"

**Causa:** Arquivo > 10MB

**Solução:**
```typescript
// Usuário: Reduzir tamanho do arquivo
// Dev: Aumentar limite no bucket (se necessário)
```

### Download não funciona

**Causa:** Bucket não é público

**Solução:**
```
1. Storage → uploads → Settings
2. Public bucket: ✅ Habilitar
3. Save
```

### Arquivos não aparecem

**Causa:** Nomenclatura incorreta ou pasta errada

**Solução:**
```typescript
// Verificar console.log no handleFileUpload()
// Path esperado: uploads/os1/follow-up1/...
```

---

## 📚 Referências

### Documentação Supabase
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Storage RLS](https://supabase.com/docs/guides/storage/security/access-control)

### Arquivos de Configuração
- `/STORAGE_POLICIES.sql` - Políticas SQL
- `/CREATE_BUCKET.sql` - Criação do bucket
- `/lib/utils/supabase-storage.ts` - Código do utilitário

### Documentos Substituídos (Arquivados)
> ⚠️ Estes documentos foram consolidados neste guia:
- ~~`/FEATURE_FILE_UPLOAD.md`~~ → Seção "Funcionalidades"
- ~~`/UPLOAD_FEATURE_README.md`~~ → Seção "Visão Geral"
- ~~`/QUICK_STORAGE_SETUP.md`~~ → Seção "Setup Rápido"
- ~~`/SUPABASE_STORAGE_SETUP.md`~~ → Seção "Configuração Detalhada"

---

## 🎯 Checklist de Implementação

### Setup Inicial
- [ ] Bucket 'uploads' criado
- [ ] Políticas RLS configuradas
- [ ] Bucket marcado como público
- [ ] Limite de 10MB configurado

### Código
- [ ] `/lib/utils/supabase-storage.ts` implementado
- [ ] `os-details-workflow-page.tsx` integrado
- [ ] Estados de upload funcionando
- [ ] Validações ativas

### Testes
- [ ] Upload simples ✅
- [ ] Drag & drop ✅
- [ ] Validação de tamanho ✅
- [ ] Validação de tipo ✅
- [ ] Download funcionando ✅
- [ ] Deleção funcionando ✅

---

**Última Atualização:** 14/11/2025  
**Versão:** 2.0 (Consolidada)  
**Status:** ✅ Documentação Completa e Atualizada
