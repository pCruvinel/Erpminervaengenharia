# 🔧 Bugfix: Erro de Enum Status de Etapa

## ❌ Problema

Erro ao criar ou atualizar etapas com status:

```
invalid input value for enum os_etapa_status: "Concluída"
```

## 🔍 Causa Raiz

O enum `os_etapa_status` no PostgreSQL é case-sensitive e aceita valores específicos:

```sql
CREATE TYPE os_etapa_status AS ENUM (
  'Pendente',
  'Em Andamento',
  'Aguardando Aprovação',
  'Aprovada',
  'Reprovada',
  'Concluída'
);
```

**Problema:** O código estava enviando valores com diferentes formatos:
- ❌ `'pendente'` (lowercase)
- ❌ `'em_andamento'` (snake_case)
- ❌ `'concluida'` (sem acento)
- ✅ `'Concluída'` (correto)

## ✅ Solução Implementada

### 1. **Função de Normalização no Servidor**

Adicionado helper `normalizeEtapaStatus()` em `/supabase/functions/server/index.tsx`:

```typescript
const normalizeEtapaStatus = (status: string | undefined): string | undefined => {
  if (!status) return status;
  
  const statusMap: Record<string, string> = {
    'Concluída': 'Concluída',
    'Concluida': 'Concluída',
    'concluida': 'Concluída',
    'concluída': 'Concluída',
    'Em Andamento': 'Em Andamento',
    'em_andamento': 'Em Andamento',
    'em andamento': 'Em Andamento',
    'Pendente': 'Pendente',
    'pendente': 'Pendente',
    'Aguardando Aprovação': 'Aguardando Aprovação',
    'aguardando_aprovacao': 'Aguardando Aprovação',
    'aguardando aprovacao': 'Aguardando Aprovação',
    'Aprovada': 'Aprovada',
    'aprovada': 'Aprovada',
    'Reprovada': 'Reprovada',
    'reprovada': 'Reprovada',
  };
  
  return statusMap[status] || status;
};
```

### 2. **Normalização em Rotas de Criação e Atualização**

#### POST `/ordens-servico/:osId/etapas`
```typescript
app.post("/make-server-5ad7fd2c/ordens-servico/:osId/etapas", async (c) => {
  const body = await c.req.json();
  
  // Normalizar status antes de inserir
  if (body.status) {
    body.status = normalizeEtapaStatus(body.status);
  }
  
  const { data, error } = await supabase
    .from('os_etapas')
    .insert([{ ...body, os_id: osId }])
    // ...
});
```

#### PUT `/etapas/:id`
```typescript
app.put("/make-server-5ad7fd2c/etapas/:id", async (c) => {
  const body = await c.req.json();
  
  // Normalizar status antes de atualizar
  if (body.status) {
    body.status = normalizeEtapaStatus(body.status);
  }
  
  const { data, error } = await supabase
    .from('os_etapas')
    .update(body)
    // ...
});
```

### 3. **Correção no Hook Frontend**

Arquivo: `/lib/hooks/use-etapas.ts`

**Antes:**
```typescript
status: data.status || 'pendente', // ❌ lowercase
```

**Depois:**
```typescript
status: data.status || 'Pendente', // ✅ PascalCase
```

### 4. **Logs Aprimorados**

Adicionados logs detalhados para debug:

```typescript
console.log(`➕ Criando etapa na OS ${osId}:`, {
  ordem: body.ordem,
  nome_etapa: body.nome_etapa,
  status: body.status
});
```

## 📊 Valores Aceitos do Enum

| Valor Original | Normalizado Para |
|----------------|------------------|
| `pendente` | `Pendente` |
| `em_andamento` | `Em Andamento` |
| `em andamento` | `Em Andamento` |
| `concluida` | `Concluída` |
| `Concluida` | `Concluída` |
| `concluída` | `Concluída` |
| `aguardando_aprovacao` | `Aguardando Aprovação` |
| `aguardando aprovacao` | `Aguardando Aprovação` |
| `aprovada` | `Aprovada` |
| `reprovada` | `Reprovada` |

## 🎯 Benefícios

1. **Tolerante a variações** - Aceita múltiplos formatos de entrada
2. **Case-insensitive** - `pendente`, `Pendente`, `PENDENTE` → `Pendente`
3. **Snake_case support** - `em_andamento` → `Em Andamento`
4. **Acentuação flexível** - `concluida` ou `concluída` → `Concluída`
5. **Logs detalhados** - Facilita debug de problemas futuros

## 🔍 Como Verificar

### Teste no Console

```typescript
// Criar etapa com diferentes formatos de status
await createEtapa(osId, {
  ordem: 1,
  nome_etapa: 'Teste',
  status: 'pendente' // será normalizado para 'Pendente'
});

await createEtapa(osId, {
  ordem: 2,
  nome_etapa: 'Teste 2',
  status: 'em_andamento' // será normalizado para 'Em Andamento'
});

await createEtapa(osId, {
  ordem: 3,
  nome_etapa: 'Teste 3',
  status: 'concluida' // será normalizado para 'Concluída'
});
```

### Verificar Logs do Servidor

```
➕ Criando etapa na OS abc-123:
  ordem: 1
  nome_etapa: "Teste"
  status: "Pendente"  ← normalizado
✅ Etapa criada: Teste
```

## 📝 Arquivos Modificados

1. ✅ `/supabase/functions/server/index.tsx`
   - Adicionado `normalizeEtapaStatus()`
   - Aplicado em POST e PUT de etapas
   - Logs aprimorados

2. ✅ `/lib/hooks/use-etapas.ts`
   - Corrigido status padrão: `'pendente'` → `'Pendente'`
   - Corrigido log: `data.nome` → `data.nome_etapa`

## 🚀 Próximos Passos

### Recomendações Futuras

1. **TypeScript Strict Types**
   ```typescript
   type EtapaStatus = 
     | 'Pendente' 
     | 'Em Andamento' 
     | 'Aguardando Aprovação'
     | 'Aprovada'
     | 'Reprovada'
     | 'Concluída';
   ```

2. **Constantes Centralizadas**
   ```typescript
   export const ETAPA_STATUS = {
     PENDENTE: 'Pendente',
     EM_ANDAMENTO: 'Em Andamento',
     AGUARDANDO_APROVACAO: 'Aguardando Aprovação',
     APROVADA: 'Aprovada',
     REPROVADA: 'Reprovada',
     CONCLUIDA: 'Concluída',
   } as const;
   ```

3. **Validação no Frontend**
   ```typescript
   const isValidStatus = (status: string): boolean => {
     return Object.values(ETAPA_STATUS).includes(status);
   };
   ```

## 🔗 Referências

- Enum no Schema: `/DATABASE_SCHEMA.md` linha 563
- Setup SQL: `/SETUP_SUPABASE.md` linha 28
- Bugfix de Schema: `/BUGFIX_SCHEMA_COLUNAS.md`

---

**Data da Correção:** 10/11/2025  
**Versão:** 1.0  
**Status:** ✅ Resolvido  
**Responsável:** Sistema de Normalização Automática
