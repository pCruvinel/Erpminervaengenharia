# 📎 Feature: Upload de Arquivos - Supabase Storage

> ⚠️ **DOCUMENTO ARQUIVADO** - 14/11/2025  
> Este documento foi consolidado em `/UPLOAD_STORAGE_GUIDE.md`  
> Por favor, consulte o novo guia consolidado para informações atualizadas.

## 📋 Status: ✅ IMPLEMENTADO | 📦 ARQUIVADO

**Data:** 2025-11-13  
**Versão:** 1.0  
**Etapa:** Follow-up 1 (Etapa 3) - OS 01-04

---

## 🎯 Objetivo

Permitir que colaboradores anexem arquivos (escopo, laudo, fotos) na etapa de Follow-up 1 do fluxo de OS 01-04 (Novo Lead - Obras), com armazenamento no Supabase Storage.

---

## ✨ Funcionalidades Implementadas

### 1. Upload de Arquivos ✅

- **Métodos de Upload:**
  - ✅ Clique para selecionar arquivo(s)
  - ✅ Drag & Drop (arrastar e soltar)
  - ✅ Upload múltiplo (vários arquivos de uma vez)

- **Validações:**
  - ✅ Tipo de arquivo (PDF, JPG, PNG, DOCX, XLSX)
  - ✅ Tamanho máximo: 10MB
  - ✅ Mensagens de erro claras

- **Feedback Visual:**
  - ✅ Loading durante upload
  - ✅ Barra de progresso (%)
  - ✅ Toast de sucesso/erro

### 2. Gestão de Arquivos ✅

- **Listagem:**
  - ✅ Nome do arquivo
  - ✅ Tamanho formatado (KB/MB)
  - ✅ Data/hora do upload
  - ✅ Ícone por tipo de arquivo

- **Ações:**
  - ✅ Download (abre em nova aba)
  - ✅ Deletar arquivo
  - ✅ Contador de arquivos anexados

### 3. Armazenamento no Supabase ✅

- **Bucket:** `uploads`
- **Estrutura:** `uploads/os1/follow-up1/dd-mm-yy-{osId}-{userId}-{fileId}.ext`
- **Nomenclatura:** Única e rastreável
- **Acesso:** URLs públicas para compartilhamento

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos

1. **`/lib/utils/supabase-storage.ts`**
   - Utilitário para upload, delete e gestão de arquivos
   - Funções: `uploadFile()`, `deleteFile()`, `getFileUrl()`, `formatFileSize()`
   - Validações de tipo e tamanho

2. **`/SUPABASE_STORAGE_SETUP.md`**
   - Documentação completa de configuração
   - Instruções de políticas RLS
   - Troubleshooting

3. **`/QUICK_STORAGE_SETUP.md`**
   - Guia rápido de 5 minutos
   - Scripts SQL prontos
   - Passo a passo simplificado

4. **`/FEATURE_FILE_UPLOAD.md`** (este arquivo)
   - Documentação da feature
   - Resumo técnico

### Arquivos Modificados

1. **`/components/os/os-details-workflow-page.tsx`**
   - ✅ Import do utilitário de storage
   - ✅ Estado para arquivos anexados (`etapa3Data.anexos`)
   - ✅ Estado de upload (`isUploading`, `uploadProgress`)
   - ✅ Funções: `handleFileUpload()`, `handleFileDelete()`, `handleDragOver()`, `handleDrop()`
   - ✅ UI: Área de upload com drag & drop
   - ✅ UI: Lista de arquivos anexados
   - ✅ UI: Botões de download e deletar

---

## 🏗��� Estrutura de Armazenamento

### Bucket

```
Bucket: uploads
Tipo: Public
Tamanho máx por arquivo: 10MB
```

### Organização de Pastas

```
uploads/
├── os1/
│   ├── follow-up1/
│   │   ├── 13-11-25-550e8400-user123-a1b2c3d4.pdf
│   │   ├── 13-11-25-550e8400-user123-e5f6g7h8.jpg
│   │   └── ...
│   ├── follow-up2/
│   ├── escopo/
│   └── contrato/
├── os2/
├── os5/
└── ...
```

### Nomenclatura de Arquivos

**Formato:** `dd-mm-yy-{osId}-{colaboradorId}-{fileId}.{ext}`

**Exemplo:** `13-11-25-550e8400-user789-a1b2c3d4.pdf`

**Componentes:**
- `dd-mm-yy`: Data do upload (13-11-25)
- `{osId}`: ID da OS (UUID)
- `{colaboradorId}`: ID do colaborador que fez upload
- `{fileId}`: ID único do arquivo (UUID)
- `.{ext}`: Extensão original (.pdf, .jpg, etc.)

**Benefícios:**
- ✅ Nomes únicos (sem sobrescrita)
- ✅ Rastreabilidade (quem fez upload e quando)
- ✅ Organização por OS e etapa
- ✅ Fácil debug e auditoria

---

## 🔐 Segurança e Validações

### Frontend (TypeScript)

```typescript
// Tipos permitidos
const allowedTypes = [
  'application/pdf',           // PDF
  'image/jpeg',                // JPG
  'image/png',                 // PNG
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',       // XLSX
];

// Tamanho máximo: 10MB
const maxSize = 10 * 1024 * 1024;
```

### Backend (Supabase RLS)

```sql
-- Upload: apenas autenticados
INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');

-- Leitura: público
SELECT TO public USING (bucket_id = 'uploads');

-- Deleção: apenas autenticados
DELETE TO authenticated USING (bucket_id = 'uploads');
```

---

## 🧪 Como Testar

### Teste 1: Upload via Clique

```
1. Criar OS 01-04
2. Ir para Etapa 3 (Follow-up 1)
3. Rolar até "Anexar Arquivos"
4. Clicar na área de upload
5. Selecionar arquivo PDF
6. VERIFICAR:
   ✅ Loading aparece
   ✅ Progresso exibido
   ✅ Arquivo aparece na lista
   ✅ Toast: "1 arquivo(s) enviado(s) com sucesso!"
```

### Teste 2: Upload via Drag & Drop

```
1. Na mesma área de upload
2. Arrastar arquivo da área de trabalho
3. Soltar sobre a área de upload
4. VERIFICAR:
   ✅ Upload funciona igual ao clique
   ✅ Arquivo aparece na lista
```

### Teste 3: Upload Múltiplo

```
1. Clicar na área de upload
2. Selecionar 3 arquivos (PDF, JPG, PNG)
3. VERIFICAR:
   ✅ Todos os 3 arquivos são enviados
   ✅ Progresso atualiza: 33%, 66%, 100%
   ✅ Toast: "3 arquivo(s) enviado(s) com sucesso!"
```

### Teste 4: Validação de Tipo

```
1. Tentar upload de arquivo .exe ou .zip
2. VERIFICAR:
   ✅ Upload rejeitado
   ✅ Toast de erro: "Tipo de arquivo não permitido..."
```

### Teste 5: Validação de Tamanho

```
1. Tentar upload de arquivo > 10MB
2. VERIFICAR:
   ✅ Upload rejeitado
   ✅ Toast de erro: "Arquivo muito grande. Tamanho máximo: 10MB"
```

### Teste 6: Download

```
1. Após upload bem-sucedido
2. Clicar no ícone de download (seta para baixo)
3. VERIFICAR:
   ✅ Arquivo abre em nova aba
   ✅ URL pública funciona
```

### Teste 7: Deletar

```
1. Após upload bem-sucedido
2. Clicar no ícone de lixeira (vermelho)
3. VERIFICAR:
   ✅ Arquivo removido da lista
   ✅ Toast: "Arquivo removido com sucesso!"
   ✅ Arquivo deletado do Supabase Storage
```

---

## 📊 Dados Armazenados

### Estado da Etapa 3 (Follow-up 1)

```typescript
{
  idadeEdificacao: string;
  motivoProcura: string;
  // ... outros campos ...
  anexos: Array<{
    id: string;           // UUID do arquivo
    name: string;         // Nome original (ex: "planta.pdf")
    path: string;         // Caminho no storage (ex: "os1/follow-up1/...")
    size: number;         // Tamanho em bytes
    type: string;         // MIME type (ex: "application/pdf")
    url: string;          // URL pública para acesso
    uploadedAt: string;   // ISO timestamp
  }>;
}
```

### Exemplo de Objeto de Arquivo

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "planta-baixa.pdf",
  "path": "os1/follow-up1/13-11-25-550e8400-user123-a1b2c3d4.pdf",
  "size": 2457600,
  "type": "application/pdf",
  "url": "https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/public/uploads/os1/follow-up1/13-11-25-550e8400-user123-a1b2c3d4.pdf",
  "uploadedAt": "2025-11-13T14:30:00.000Z"
}
```

---

## 🔄 Fluxo Técnico

### Upload

```
1. Usuário seleciona arquivo(s)
   ↓
2. Validação frontend (tipo + tamanho)
   ↓
3. Gerar fileId (UUID)
   ↓
4. Gerar nome único: dd-mm-yy-{osId}-{userId}-{fileId}.ext
   ↓
5. Construir path: uploads/os1/follow-up1/{nome}
   ↓
6. Fazer POST para Supabase Storage API
   ↓
7. Receber URL pública
   ↓
8. Adicionar ao estado (etapa3Data.anexos)
   ↓
9. Exibir na lista + toast de sucesso
```

### Delete

```
1. Usuário clica em deletar
   ↓
2. Fazer DELETE para Supabase Storage API
   ↓
3. Remover do estado (filtrar por fileId)
   ↓
4. Toast de sucesso
```

---

## 🚀 API do Supabase Storage

### Upload (POST)

```http
POST https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/uploads/{path}
Authorization: Bearer {publicAnonKey}
Content-Type: {mimeType}

{fileBody}
```

### Delete (DELETE)

```http
DELETE https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/uploads/{path}
Authorization: Bearer {publicAnonKey}
```

### Download (GET - URL Pública)

```http
GET https://zxfevlkssljndqqhxkjb.supabase.co/storage/v1/object/public/uploads/{path}
```

---

## ⚠️ Limitações Conhecidas

### 1. Colaborador ID Mock
- **Problema:** Atualmente usando `colaboradorId = 'user-123'` (mock)
- **Solução Futura:** Integrar com sistema de autenticação do Supabase
- **Impacto:** Rastreabilidade limitada de quem fez upload

### 2. Sem Autenticação Real
- **Problema:** Políticas RLS permitem qualquer usuário autenticado
- **Solução Futura:** Validar permissões por setor/cargo
- **Impacto:** Qualquer usuário pode deletar qualquer arquivo

### 3. Etapa Única
- **Problema:** Upload implementado apenas na Etapa 3 (Follow-up 1)
- **Solução Futura:** Estender para outras etapas (Follow-up 2, Escopo, Contrato)
- **Impacto:** Limitado a uma etapa por enquanto

---

## 📈 Próximos Passos

### Curto Prazo

- [ ] Integrar com autenticação do Supabase (colaboradorId real)
- [ ] Adicionar upload em outras etapas (Follow-up 2, Escopo, Contrato)
- [ ] Salvar lista de anexos no banco de dados (tabela `etapas.form_data`)

### Médio Prazo

- [ ] Compressão de imagens no frontend (otimizar tamanho)
- [ ] Preview de imagens antes do upload
- [ ] Edição de nomes de arquivos
- [ ] Categorização de arquivos (escopo, laudo, foto, etc.)

### Longo Prazo

- [ ] Upload resumable para arquivos grandes
- [ ] Busca e filtros de arquivos
- [ ] Tags e metadados customizados
- [ ] Histórico de versões de arquivos

---

## 🐛 Troubleshooting

### Erro: "Erro ao fazer upload do arquivo"

**Causa:** Bucket não foi criado ou políticas RLS não configuradas

**Solução:**
1. Verificar se bucket `uploads` existe
2. Adicionar políticas RLS (INSERT, SELECT, DELETE)
3. Ver: `/QUICK_STORAGE_SETUP.md`

### Erro: "Tipo de arquivo não permitido"

**Causa:** Arquivo com extensão/MIME type não suportado

**Solução:**
1. Usar apenas: PDF, JPG, PNG, DOCX, XLSX
2. Verificar se arquivo não está corrompido

### Erro: "Arquivo muito grande"

**Causa:** Arquivo excede 10MB

**Solução:**
1. Reduzir tamanho do arquivo
2. Comprimir imagens
3. Para PDFs: reduzir qualidade ou dividir em partes

### Download não funciona

**Causa:** Bucket não é público ou política SELECT não configurada

**Solução:**
1. Configurar bucket como público
2. Adicionar política SELECT para role `public`

---

## ✅ Checklist de Implementação

### Código
- [x] Utilitário de storage criado (`/lib/utils/supabase-storage.ts`)
- [x] Estado de arquivos adicionado (`etapa3Data.anexos`)
- [x] Funções de upload/delete implementadas
- [x] UI de upload (clique + drag & drop)
- [x] UI de lista de arquivos
- [x] Validações de tipo e tamanho
- [x] Feedback visual (loading, progresso, toasts)

### Configuração
- [ ] Bucket `uploads` criado no Supabase
- [ ] Bucket configurado como público
- [ ] Política INSERT criada
- [ ] Política SELECT criada
- [ ] Política DELETE criada

### Documentação
- [x] Documentação completa (`/SUPABASE_STORAGE_SETUP.md`)
- [x] Guia rápido (`/QUICK_STORAGE_SETUP.md`)
- [x] Documentação da feature (`/FEATURE_FILE_UPLOAD.md`)

### Testes
- [ ] Teste de upload via clique
- [ ] Teste de upload via drag & drop
- [ ] Teste de upload múltiplo
- [ ] Teste de validação de tipo
- [ ] Teste de validação de tamanho
- [ ] Teste de download
- [ ] Teste de deletar

---

## 📚 Referências

- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Supabase Storage API](https://supabase.com/docs/reference/javascript/storage)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

---

**Status Final:** 🟢 **PRONTO PARA CONFIGURAÇÃO E TESTE**

**Próximo Passo:** Configure o bucket no Supabase seguindo `/QUICK_STORAGE_SETUP.md` (5 minutos)

---

**Desenvolvido em:** 2025-11-13  
**Versão:** 1.0  
**Autor:** AI Assistant + Equipe Minerva