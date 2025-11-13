# 🐛 Bugfix: Enum "Concluída" → "Concluida" (Sem Acento)

**Data:** 11/11/2025  
**Status:** ✅ RESOLVIDO  
**Criticidade:** 🔴 ALTA

---

## 🔥 Problema

Sistema estava gerando erro ao criar etapas com status "Concluída":

```
❌ invalid input value for enum os_etapa_status: "Concluída"
```

### Impacto

- **Bloqueio total**: Impossível criar OS automaticamente
- **Fluxo afetado**: Criação automática de OS ao avançar da Etapa 2 → Etapa 3
- **Componente**: `/components/os/os-details-workflow-page.tsx`

---

## 🔍 Causa Raiz

O enum `os_etapa_status` no PostgreSQL está configurado **SEM acento**:

```sql
-- ❌ VALOR REJEITADO
'Concluída'  -- COM acento

-- ✅ VALOR ACEITO
'Concluida'  -- SEM acento
```

### Onde o problema ocorria

1. **Frontend** (`os-details-workflow-page.tsx:300`):
   ```typescript
   const statusEtapa = i <= 2 ? 'Concluída' : ...
   ```

2. **Backend** (`index.tsx:36-39`):
   ```typescript
   const statusMap = {
     'Concluída': 'Concluída',  // ❌ Normalizando ERRADO
     'Concluida': 'Concluída',  // ❌ Normalizando ERRADO
   }
   ```

3. **TypeScript** (`use-etapas.ts:9,21,29`):
   ```typescript
   status: 'Pendente' | ... | 'Concluída'  // ❌ Tipo ERRADO
   ```

---

## ✅ Solução Implementada

### 1. Atualizar Normalização no Backend

**Arquivo:** `/supabase/functions/server/index.tsx`

```typescript
const normalizeEtapaStatus = (status: string | undefined): string | undefined => {
  if (!status) return status;
  
  const statusMap: Record<string, string> = {
    // ✅ ATENÇÃO: O enum no Postgres está SEM acento ("Concluida")
    'Concluída': 'Concluida',
    'Concluida': 'Concluida',
    'concluida': 'Concluida',
    'concluída': 'Concluida',
    'CONCLUÍDA': 'Concluida',
    'CONCLUIDA': 'Concluida',
    // ... outros status
  };
  
  return statusMap[status] || status;
};
```

### 2. Atualizar TypeScript Types

**Arquivo:** `/lib/hooks/use-etapas.ts`

```typescript
export interface Etapa {
  // ...
  status: 'Pendente' | 'Em Andamento' | 'Aguardando Aprovação' | 'Aprovada' | 'Reprovada' | 'Concluida'; // SEM acento
}

export interface CreateEtapaData {
  // ...
  status?: 'Pendente' | 'Em Andamento' | 'Concluida';
}

export interface UpdateEtapaData {
  // ...
  status?: 'Pendente' | 'Em Andamento' | 'Aguardando Aprovação' | 'Aprovada' | 'Reprovada' | 'Concluida';
}
```

### 3. Atualizar Mapeamento no Frontend

**Arquivo:** `/lib/hooks/use-ordens-servico.ts`

```typescript
function mapStatusToLocal(status: string): string {
  const statusMap: Record<string, string> = {
    'Concluida': 'concluida', // SEM acento no backend
    'Concluída': 'concluida', // Para compatibilidade com dados antigos
    // ... outros status
  };
  return statusMap[status] || 'em_andamento';
}
```

### 4. Atualizar Documentação

**Arquivo:** `/ENUM_REFERENCE.md`

```markdown
### ✅ Valores Corretos (Use Sempre Estes)

'Concluida'  // ⚠️ SEM ACENTO - O banco PostgreSQL está configurado sem acento
```

---

## 🧪 Como Testar

### 1. Criar OS Automaticamente

```bash
# No frontend
1. Criar lead na Etapa 1
2. Selecionar tipo de OS na Etapa 2
3. Clicar em "Próxima Etapa"
4. ✅ OS deve ser criada com sucesso
5. ✅ Etapas 1-2 devem ter status "Concluida"
6. ✅ Etapa 3 deve ter status "Em Andamento"
```

### 2. Verificar no Banco

```sql
-- Ver status das etapas criadas
SELECT 
  ordem,
  nome_etapa,
  status
FROM os_etapas
WHERE os_id = 'UUID_DA_OS'
ORDER BY ordem;

-- Resultado esperado:
-- 1 | Identificação do Lead | Concluida
-- 2 | Seleção do Tipo de OS | Concluida
-- 3 | ... | Em Andamento
```

### 3. Testar Normalização

```typescript
// No servidor, testar vários formatos
normalizeEtapaStatus('Concluída')   // → 'Concluida'
normalizeEtapaStatus('concluída')   // → 'Concluida'
normalizeEtapaStatus('CONCLUÍDA')   // → 'Concluida'
normalizeEtapaStatus('Concluida')   // → 'Concluida'
```

---

## 📋 Checklist de Validação

### Backend

- [x] Função `normalizeEtapaStatus` atualizada
- [x] Mapeamento de 'Concluída' → 'Concluida'
- [x] Logs de debug adicionados
- [x] Normalização aplicada em POST `/ordens-servico/:osId/etapas`
- [x] Normalização aplicada em PUT `/etapas/:id`

### Frontend

- [x] Types em `use-etapas.ts` atualizados
- [x] Mapeamento em `use-ordens-servico.ts` atualizado
- [x] Componentes usando tipos corretos

### Documentação

- [x] `/ENUM_REFERENCE.md` atualizado
- [x] Comentários no código explicando diferença
- [x] Este documento de bugfix criado

---

## ⚠️ ATENÇÃO: Estado Final dos ENUMs

### `os_etapa_status` (Status de Etapa)

```sql
'Concluída'  -- ✅ COM ACENTO
```

**Atualização Final (11/11/2025):** O usuário adicionou o acento "í" em AMBOS os enums no banco de dados Supabase. Agora todos os enums de status usam "Concluída" COM acento.

### `os_status_geral` (Status Geral da OS)

```sql
'Concluída'  -- ✅ COM ACENTO
```

### Normalização Implementada

O servidor possui **duas funções de normalização** que agora AMBAS convertem para "Concluída" COM acento:

1. **`normalizeEtapaStatus()`** - Converte para "Concluída" COM acento
   - Usado em: `POST /ordens-servico/:osId/etapas` e `PUT /etapas/:id`

2. **`normalizeOsStatusGeral()`** - Converte para "Concluída" COM acento  
   - Usado em: `GET /ordens-servico` (filtro por status)

**Resultado:** Não importa qual variação você envie (`concluida`, `Concluida`, `concluída`, `CONCLUÍDA`), o servidor sempre converterá para `Concluída` com acento.

---

## 🔄 Histórico de Fixes Relacionados

1. ✅ **BUGFIX_ENUMS_DUPLICATES.md** - Criação de função de normalização inicial
2. ✅ **BUGFIX_ENUM_STATUS_ETAPA.md** - Documentação dos valores aceitos
3. ✅ **Este Fix** - Correção do valor "Concluída" → "Concluida" para `os_etapa_status`
4. ✅ **Atualização** - Adicionada função `normalizeOsStatusGeral()` para aceitar "Concluída" COM acento

---

## 🎓 Lições Aprendidas

1. **ENUMs são case-sensitive**: Postgres não aceita variações
2. **Documentação deve refletir a realidade**: ENUM_REFERENCE estava incorreto
3. **Normalização é essencial**: Evita erros de digitação/formatação
4. **Frontend e Backend devem estar sincronizados**: Types devem refletir o banco
5. **Logs ajudam muito**: Console.log salvou o dia!

---

## 📚 Referências

- [PostgreSQL ENUM Type](https://www.postgresql.org/docs/current/datatype-enum.html)
- `/ENUM_REFERENCE.md`
- `/DATABASE_SCHEMA.md`
- `/SETUP_SUPABASE.md`

---

**Fix implementado por:** AI Assistant  
**Validado por:** Sistema Minerva  
**Versão:** 1.0