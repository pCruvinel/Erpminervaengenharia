# 📦 Configuração do Supabase Storage

> ⚠️ **DOCUMENTO ARQUIVADO** - 14/11/2025  
> Este documento foi consolidado em `/UPLOAD_STORAGE_GUIDE.md`  
> Por favor, consulte o novo guia consolidado para informações atualizadas.

## 📋 Visão Geral

Este documento explica como configurar o Supabase Storage para armazenar anexos de Ordens de Serviço no ERP Minerva Engenharia.

---

## 🗂️ Estrutura de Armazenamento

### Bucket
- **Nome:** `uploads`
- **Tipo:** Public (arquivos acessíveis via URL pública)

### Estrutura de Pastas
```
uploads/
├── os1/
│   ├── follow-up1/
│   │   ├── 13-11-25-os123-user456-uuid1.pdf
│   │   ├── 13-11-25-os123-user456-uuid2.jpg
│   │   └── ...
│   ├── follow-up2/
│   └── ...
├── os2/
│   └── ...
└── ...
```

### Nomenclatura de Arquivos

**Formato:** `dd-mm-yy-{osId}-{colaboradorId}-{fileId}.{extensão}`

**Exemplo:** `13-11-25-550e8400-user789-a1b2c3d4.pdf`

**Componentes:**
- `dd-mm-yy`: Data do upload (dia-mês-ano)
- `{osId}`: ID da Ordem de Serviço (UUID)
- `{colaboradorId}`: ID do colaborador que fez o upload
- `{fileId}`: ID único do arquivo (UUID)
- `.{extensão}`: Extensão original do arquivo

---

## 🔧 Configuração no Supabase Dashboard

### 1. Criar Bucket

1. Acesse o **Supabase Dashboard**: https://app.supabase.com
2. Selecione seu projeto: `zxfevlkssljndqqhxkjb`
3. No menu lateral, clique em **Storage**
4. Clique em **"New bucket"**
5. Configure:
   - **Name:** `uploads`
   - **Public bucket:** ✅ Habilitado (para URLs públicas)
   - **File size limit:** `10 MB` (10.485.760 bytes)
   - **Allowed MIME types:** (deixar vazio para permitir todos)

6. Clique em **"Create bucket"**

### 2. Configurar Políticas de Acesso (RLS)

Por padrão, o bucket público permite leitura, mas precisamos permitir upload e deleção.

#### Política 1: Upload de Arquivos (INSERT)

```sql
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
```

#### Política 2: Leitura de Arquivos (SELECT)

```sql
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
```

#### Política 3: Deleção de Arquivos (DELETE)

```sql
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
```

### 3. Aplicar Políticas via Dashboard

1. No Storage, clique no bucket **`uploads`**
2. Clique na aba **"Policies"**
3. Clique em **"New policy"**
4. Selecione **"Create a policy from scratch"**
5. Cole cada política SQL acima
6. Clique em **"Review"** e depois **"Save policy"**

---

## 📂 Estrutura de Código

### Utilitário de Storage

**Arquivo:** `/lib/utils/supabase-storage.ts`

Funções disponíveis:
- ✅ `uploadFile()` - Upload de arquivo
- ✅ `deleteFile()` - Deleção de arquivo
- ✅ `getFileUrl()` - Obter URL pública
- ✅ `formatFileSize()` - Formatar tamanho do arquivo

### Exemplo de Uso

```typescript
import { uploadFile, deleteFile } from '../../lib/utils/supabase-storage';

// Upload
const uploadedFile = await uploadFile({
  file: selectedFile,
  osNumero: 'os1',
  etapa: 'follow-up1',
  osId: '550e8400-e29b-41d4-a716-446655440000',
  colaboradorId: 'user-123',
});

// Delete
await deleteFile(uploadedFile.path);
```

---

## 🎯 Tipos de Arquivo Permitidos

### MIME Types Aceitos

| Tipo | Extensão | MIME Type |
|------|----------|-----------|
| PDF | `.pdf` | `application/pdf` |
| JPEG | `.jpg`, `.jpeg` | `image/jpeg` |
| PNG | `.png` | `image/png` |
| Word | `.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| Excel | `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| Word Legacy | `.doc` | `application/msword` |
| Excel Legacy | `.xls` | `application/vnd.ms-excel` |

### Tamanho Máximo

- **10 MB** por arquivo
- Validação no frontend antes do upload
- Validação no Supabase Storage (configuração do bucket)

---

## 🔐 Segurança

### Validações Implementadas

1. **Tipo de Arquivo:**
   - Validação de MIME type
   - Lista de tipos permitidos
   - Rejeição de tipos não autorizados

2. **Tamanho de Arquivo:**
   - Máximo de 10MB
   - Validação antes do upload
   - Evita desperdício de banda

3. **Nomenclatura:**
   - Nomes únicos com UUID
   - Prevenção de sobrescrita
   - Rastreabilidade (osId + colaboradorId + data)

4. **Políticas RLS:**
   - Upload apenas para usuários autenticados
   - Deleção apenas para usuários autenticados
   - Leitura pública (para compartilhamento)

---

## 📊 Organização por OS e Etapa

### Mapeamento OS → Pasta

| OS | Pasta | Etapas que Permitem Upload |
|----|-------|---------------------------|
| OS 01-04 (Obras) | `os1` | Follow-up 1, Follow-up 2, Escopo, Contrato |
| OS 05 (Assessoria) | `os5` | Follow-up 1, Memorial, Contrato |
| OS 06 (ART) | `os6` | Memorial, Documentação |
| ... | ... | ... |

### Subpastas por Etapa

Exemplos para OS1:
- `os1/follow-up1/` - Anexos do Follow-up 1 (escopo, laudo, fotos)
- `os1/follow-up2/` - Anexos do Follow-up 2 (fotos da visita)
- `os1/escopo/` - Arquivos do memorial descritivo
- `os1/contrato/` - Contrato assinado

---

## 🧪 Testes

### 1. Teste de Upload

```
1. Ir para "Criar Nova OS" → "Novo Lead - Obras (OS 01-04)"
2. Preencher Etapa 1 e 2
3. Na Etapa 3 (Follow-up 1), rolar até "Anexar Arquivos"
4. Clicar na área de upload ou arrastar arquivo
5. Selecionar arquivo (PDF, JPG, etc.)
6. VERIFICAR:
   ✅ Upload inicia (ícone de loading aparece)
   ✅ Progresso é exibido
   ✅ Arquivo aparece na lista após upload
   ✅ Toast de sucesso é exibido
```

### 2. Teste de Download

```
1. Após upload bem-sucedido
2. Clicar no ícone de download ao lado do arquivo
3. VERIFICAR:
   ✅ Arquivo abre em nova aba
   ✅ URL é pública (formato: https://{projectId}.supabase.co/storage/v1/object/public/uploads/...)
```

### 3. Teste de Deleção

```
1. Após upload bem-sucedido
2. Clicar no ícone de lixeira ao lado do arquivo
3. VERIFICAR:
   ✅ Arquivo é removido da lista
   ✅ Toast de sucesso é exibido
   ✅ Arquivo não está mais acessível no Supabase Storage
```

### 4. Teste de Validação

```
1. Tentar fazer upload de arquivo muito grande (> 10MB)
2. VERIFICAR:
   ✅ Upload é rejeitado
   ✅ Mensagem de erro clara: "Arquivo muito grande. Tamanho máximo: 10MB"

3. Tentar fazer upload de tipo não permitido (ex: .exe, .zip)
4. VERIFICAR:
   ✅ Upload é rejeitado
   ✅ Mensagem de erro clara: "Tipo de arquivo não permitido..."
```

### 5. Teste de Drag & Drop

```
1. Na Etapa 3, arrastar arquivo da área de trabalho para a área de upload
2. VERIFICAR:
   ✅ Área de upload destaca ao arrastar sobre ela
   ✅ Upload inicia ao soltar arquivo
   ✅ Comportamento igual ao upload via clique
```

---

## 🐛 Troubleshooting

### Erro: "Failed to upload file"

**Possíveis causas:**
1. Bucket `uploads` não foi criado
2. Políticas RLS não foram configuradas
3. Arquivo excede 10MB
4. Tipo de arquivo não permitido

**Solução:**
1. Verificar se bucket existe no Supabase Dashboard
2. Verificar políticas RLS (SELECT, INSERT, DELETE)
3. Validar tamanho do arquivo
4. Validar MIME type

### Erro: "Failed to delete file"

**Possíveis causas:**
1. Política de DELETE não configurada
2. Arquivo já foi deletado
3. Caminho do arquivo incorreto

**Solução:**
1. Adicionar política de DELETE
2. Verificar se arquivo existe no Storage
3. Verificar path do arquivo no console

### URL pública não funciona

**Possíveis causas:**
1. Bucket não é público
2. Política de SELECT não configurada

**Solução:**
1. Configurar bucket como público no Dashboard
2. Adicionar política de SELECT para role `public`

---

## 📈 Melhorias Futuras

### 1. Autenticação
- [ ] Integrar com sistema de autenticação do Supabase
- [ ] Usar `colaboradorId` real do usuário logado
- [ ] Validar permissões por setor/cargo

### 2. Otimização
- [ ] Compressão de imagens no frontend
- [ ] Upload em lote otimizado
- [ ] Resumable uploads para arquivos grandes

### 3. Organização
- [ ] Categorização de arquivos por tipo
- [ ] Tags e metadados customizados
- [ ] Busca de arquivos

### 4. Experiência do Usuário
- [ ] Preview de imagens antes do upload
- [ ] Edição de nomes de arquivos
- [ ] Comentários por arquivo

---

## ✅ Checklist de Configuração

- [ ] Bucket `uploads` criado no Supabase
- [ ] Bucket configurado como público
- [ ] Limite de 10MB configurado
- [ ] Política INSERT criada (authenticated)
- [ ] Política SELECT criada (public)
- [ ] Política DELETE criada (authenticated)
- [ ] Testado upload de arquivo
- [ ] Testado download de arquivo
- [ ] Testado deleção de arquivo
- [ ] Validações funcionando (tamanho + tipo)

---

**Data de Criação:** 2025-11-13  
**Versão:** 1.0  
**Status:** ✅ Implementado