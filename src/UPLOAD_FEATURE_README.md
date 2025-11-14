# 📎 Upload de Arquivos - Guia Rápido

> ⚠️ **DOCUMENTO ARQUIVADO** - 14/11/2025  
> Este documento foi consolidado em `/UPLOAD_STORAGE_GUIDE.md`  
> Por favor, consulte o novo guia consolidado para informações atualizadas.

## 🎯 O que foi implementado?

Funcionalidade completa de **upload de arquivos** para a Etapa 3 (Follow-up 1) do fluxo OS 01-04, com armazenamento no **Supabase Storage**.

---

## ⚡ Configuração Rápida (5 minutos)

### 1. Criar Bucket no Supabase

```
📍 URL: https://app.supabase.com/project/zxfevlkssljndqqhxkjb/storage/buckets

1. Clicar em "New bucket"
2. Name: uploads
3. Public bucket: ✅ Habilitado
4. File size limit: 10485760 (10MB)
5. Clicar em "Create bucket"
```

### 2. Configurar Políticas (Copiar SQL)

```
📍 Arquivo: /STORAGE_POLICIES.sql

1. Abrir arquivo /STORAGE_POLICIES.sql
2. Copiar as 3 políticas SQL
3. Colar no Supabase Dashboard → Storage → uploads → Policies
```

### 3. Testar

```
1. Criar OS 01-04 no app
2. Ir para Etapa 3 (Follow-up 1)
3. Fazer upload de arquivo PDF
4. Verificar se aparece na lista ✅
```

---

## 📚 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| [`/QUICK_STORAGE_SETUP.md`](./QUICK_STORAGE_SETUP.md) | ⚡ Guia de 5 minutos (recomendado) |
| [`/SUPABASE_STORAGE_SETUP.md`](./SUPABASE_STORAGE_SETUP.md) | 📖 Documentação completa |
| [`/FEATURE_FILE_UPLOAD.md`](./FEATURE_FILE_UPLOAD.md) | 🔧 Detalhes técnicos da implementação |
| [`/STORAGE_POLICIES.sql`](./STORAGE_POLICIES.sql) | 💾 Scripts SQL prontos |

---

## ✨ Funcionalidades

- ✅ Upload via clique ou drag & drop
- ✅ Upload múltiplo (vários arquivos de uma vez)
- ✅ Validação de tipo (PDF, JPG, PNG, DOCX, XLSX)
- ✅ Validação de tamanho (máx. 10MB)
- ✅ Lista de arquivos anexados
- ✅ Download de arquivos
- ✅ Deletar arquivos
- ✅ Feedback visual (loading, progresso, toasts)

---

## 📁 Estrutura de Armazenamento

```
uploads/
└── os1/
    └── follow-up1/
        └── 13-11-25-{osId}-{userId}-{fileId}.pdf
```

**Nomenclatura:** Data + OS ID + User ID + File ID único

---

## 🔧 Código Implementado

### Utilitário de Storage
```
📍 /lib/utils/supabase-storage.ts

- uploadFile()
- deleteFile()
- getFileUrl()
- formatFileSize()
```

### Componente de Workflow
```
📍 /components/os/os-details-workflow-page.tsx

- Estado: etapa3Data.anexos
- Funções: handleFileUpload(), handleFileDelete()
- UI: Área de upload + Lista de arquivos
```

---

## 🧪 Como Testar

### Upload
1. Ir para Etapa 3 (Follow-up 1)
2. Clicar em "Anexar Arquivos"
3. Selecionar arquivo PDF
4. **Resultado:** Arquivo aparece na lista ✅

### Download
1. Clicar no ícone de download
2. **Resultado:** Arquivo abre em nova aba ✅

### Deletar
1. Clicar no ícone de lixeira
2. **Resultado:** Arquivo é removido ✅

---

## ⚠️ Importante

### Antes de Testar
- [ ] Bucket `uploads` criado
- [ ] Políticas RLS configuradas
- [ ] Testado upload de 1 arquivo

### Limitações Atuais
- ⚠️ Colaborador ID é mock (`user-123`)
- ⚠️ Apenas Etapa 3 (Follow-up 1)
- ⚠️ Sem autenticação real

---

## 🚀 Próximos Passos

1. **Configurar bucket** → Ver: `/QUICK_STORAGE_SETUP.md`
2. **Testar upload** → Criar OS 01-04 e anexar arquivo
3. **Expandir para outras etapas** → Follow-up 2, Escopo, Contrato

---

## 🆘 Precisa de Ajuda?

- **Setup rápido:** `/QUICK_STORAGE_SETUP.md`
- **Troubleshooting:** `/SUPABASE_STORAGE_SETUP.md` (seção 🐛)
- **Detalhes técnicos:** `/FEATURE_FILE_UPLOAD.md`

---

**Status:** 🟢 **PRONTO PARA CONFIGURAÇÃO**

**Próximo Passo:** Configurar bucket seguindo `/QUICK_STORAGE_SETUP.md` ⚡