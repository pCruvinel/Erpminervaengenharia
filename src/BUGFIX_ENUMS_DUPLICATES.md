# 🔧 Correção: Erros de Enums e Duplicatas

**Data:** 10/11/2025  
**Versão:** 1.0

## 📋 Problemas Identificados

### 1. ❌ Colaborador Sistema - Duplicate Key Error

**Erro:**
```
duplicate key value violates unique constraint "colaboradores_pkey"
Key (id)=(0f6f5986-8993-49c7-897b-e184d94afa1a) already exists.
```

**Causa:** 
- Auth user `sistema@minerva.com` já existia no banco
- Código tentava criar novamente
- Falha ao inserir colaborador com ID duplicado

**Solução Implementada:**
```typescript
// 1. Verificar se auth user já existe
const existingAuthUser = await buscarAuthUser('sistema@minerva.com');

// 2. Se não existir, criar
if (!existingAuthUser) {
  authUserId = await criarAuthUser();
} else {
  authUserId = existingAuthUser.id;
}

// 3. Criar colaborador (só se não existir)
await criarColaborador(authUserId);
```

---

### 2. ❌ Status "Concluída" - Invalid Enum Value

**Erro:**
```
invalid input value for enum os_etapa_status: "Concluída"
```

**Causas Possíveis:**

#### Causa A: Enum não criado no banco
O tipo `os_etapa_status` pode não ter sido criado no Supabase.

**Verificação:**
```sql
-- Verificar se enum existe
SELECT typname 
FROM pg_type 
WHERE typname = 'os_etapa_status';
```

**Solução:**
```sql
-- Criar enum com todos os valores
CREATE TYPE os_etapa_status AS ENUM (
  'Pendente',
  'Em Andamento',
  'Aguardando Aprovação',
  'Aprovada',
  'Reprovada',
  'Concluída'
);
```

#### Causa B: Encoding/charset incorreto
PostgreSQL pode ter problemas com caracteres acentuados dependendo do encoding.

**Verificação:**
```sql
-- Verificar encoding do banco
SHOW SERVER_ENCODING;

-- Deve retornar: UTF8
```

**Solução Alternativa:**
Se o problema persistir, usar valores sem acento:
```sql
-- Recriar enum sem acentos
DROP TYPE IF EXISTS os_etapa_status CASCADE;
CREATE TYPE os_etapa_status AS ENUM (
  'Pendente',
  'Em Andamento',
  'Aguardando Aprovacao',
  'Aprovada',
  'Reprovada',
  'Concluida'
);
```

E atualizar o código:
```typescript
// Usar sem acento
const statusEtapa = i <= 2 ? 'Concluida' : 'Pendente';
```

---

## 🔧 Arquivos Modificados

### `/supabase/functions/server/index.tsx`

**1. Criação do Colaborador Sistema (linhas ~287-365)**

Antes:
```typescript
// Buscar ou criar Sistema
const sistemaColaborador = await buscarSistema();
if (!sistemaColaborador) {
  await criarAuthUser();  // ❌ Pode falhar se já existir
  await criarColaborador(); // ❌ Usa ID que pode já existir
}
```

Depois:
```typescript
// Verificar auth user existente primeiro
const existingAuthUser = await buscarAuthUserPorEmail('sistema@minerva.com');
const authUserId = existingAuthUser?.id ?? await criarAuthUser();

// Depois criar colaborador (garantido que auth user existe)
await criarColaborador(authUserId);
```

**2. Criação de Etapas (linhas ~449-475)**

Adicionado:
```typescript
// Log detalhado
console.log(`📝 Criando etapa para OS ${osId}:`, body);

// Mensagem amigável para erro de enum
if (error.message?.includes('invalid input value for enum')) {
  return c.json({ 
    error: error.message,
    hint: 'Execute: CREATE TYPE os_etapa_status AS ENUM (...)',
    status_enviado: body.status
  }, 500);
}

console.log(`✅ Etapa criada: ${data.nome_etapa}`);
```

---

## 📝 Checklist de Verificação

### Antes de Criar OS

- [ ] **Verificar enum `os_etapa_status` existe**
  ```sql
  SELECT typname FROM pg_type WHERE typname = 'os_etapa_status';
  ```

- [ ] **Verificar valores do enum**
  ```sql
  SELECT enumlabel 
  FROM pg_enum 
  WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'os_etapa_status')
  ORDER BY enumsortorder;
  ```
  
  Deve retornar:
  ```
  Pendente
  Em Andamento
  Aguardando Aprovação
  Aprovada
  Reprovada
  Concluída
  ```

- [ ] **Verificar colaborador Sistema**
  ```sql
  SELECT id, nome_completo, role_nivel 
  FROM colaboradores 
  WHERE nome_completo = 'Sistema Minerva';
  ```

- [ ] **Verificar auth user Sistema**
  ```sql
  -- Não pode fazer via SQL direto
  -- Use: Dashboard Supabase → Authentication → Users
  -- Procure: sistema@minerva.com
  ```

### Após Criar OS

- [ ] **Verificar OS criada**
  ```sql
  SELECT id, codigo_os, titulo, status_geral, criado_por_id
  FROM ordens_servico
  ORDER BY created_at DESC
  LIMIT 1;
  ```

- [ ] **Verificar etapas criadas**
  ```sql
  SELECT ordem, nome_etapa, status
  FROM os_etapas
  WHERE os_id = 'uuid-da-os'
  ORDER BY ordem;
  ```
  
  Deve retornar 15 etapas com:
  - Etapas 1-2: status = 'Concluída'
  - Etapa 3: status = 'Em Andamento'
  - Etapas 4-15: status = 'Pendente'

---

## 🚀 Script SQL Completo de Setup

Execute este script no Supabase SQL Editor para garantir tudo funcionando:

```sql
-- ========================================
-- SCRIPT COMPLETO DE SETUP - MINERVA ERP
-- ========================================

-- 1. Criar ENUMs (se não existirem)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'os_etapa_status') THEN
    CREATE TYPE os_etapa_status AS ENUM (
      'Pendente',
      'Em Andamento',
      'Aguardando Aprovação',
      'Aprovada',
      'Reprovada',
      'Concluída'
    );
    RAISE NOTICE '✅ Enum os_etapa_status criado';
  ELSE
    RAISE NOTICE 'ℹ️ Enum os_etapa_status já existe';
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'os_status_geral') THEN
    CREATE TYPE os_status_geral AS ENUM (
      'Em Triagem',
      'Em Andamento',
      'Aguardando Aprovação',
      'Concluída',
      'Cancelada',
      'Pausada'
    );
    RAISE NOTICE '✅ Enum os_status_geral criado';
  ELSE
    RAISE NOTICE 'ℹ️ Enum os_status_geral já existe';
  END IF;
END $$;

-- 2. Verificar tabelas necessárias
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'colaboradores') THEN
    RAISE EXCEPTION '❌ Tabela colaboradores não existe! Execute o schema completo primeiro.';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ordens_servico') THEN
    RAISE EXCEPTION '❌ Tabela ordens_servico não existe! Execute o schema completo primeiro.';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'os_etapas') THEN
    RAISE EXCEPTION '❌ Tabela os_etapas não existe! Execute o schema completo primeiro.';
  END IF;
  
  RAISE NOTICE '✅ Todas as tabelas necessárias existem';
END $$;

-- 3. Relatório final
SELECT 
  'Enum os_etapa_status' as item,
  CASE WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'os_etapa_status') 
    THEN '✅ OK' 
    ELSE '❌ FALTANDO' 
  END as status
UNION ALL
SELECT 
  'Enum os_status_geral' as item,
  CASE WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'os_status_geral') 
    THEN '✅ OK' 
    ELSE '❌ FALTANDO' 
  END as status
UNION ALL
SELECT 
  'Tabela colaboradores' as item,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'colaboradores') 
    THEN '✅ OK' 
    ELSE '❌ FALTANDO' 
  END as status
UNION ALL
SELECT 
  'Tabela ordens_servico' as item,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'ordens_servico') 
    THEN '✅ OK' 
    ELSE '❌ FALTANDO' 
  END as status
UNION ALL
SELECT 
  'Tabela os_etapas' as item,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'os_etapas') 
    THEN '✅ OK' 
    ELSE '❌ FALTANDO' 
  END as status
UNION ALL
SELECT 
  'Colaborador Sistema' as item,
  CASE WHEN EXISTS (SELECT 1 FROM colaboradores WHERE nome_completo = 'Sistema Minerva') 
    THEN '✅ OK' 
    ELSE '⚠️ SERÁ CRIADO AUTOMATICAMENTE' 
  END as status;
```

---

## 🎯 Resultado Esperado

Após executar o script, você deve ver:

```
item                    | status
------------------------+--------------------------------
Enum os_etapa_status    | ✅ OK
Enum os_status_geral    | ✅ OK
Tabela colaboradores    | ✅ OK
Tabela ordens_servico   | ✅ OK
Tabela os_etapas        | ✅ OK
Colaborador Sistema     | ✅ OK ou ⚠️ SERÁ CRIADO...
```

---

## 📞 Troubleshooting

### Ainda recebe erro "invalid input value for enum"?

1. **Deletar e recriar o enum:**
   ```sql
   -- ATENÇÃO: Isso vai falhar se houver dados usando o enum
   DROP TYPE os_etapa_status CASCADE;
   
   CREATE TYPE os_etapa_status AS ENUM (
     'Pendente',
     'Em Andamento',
     'Aguardando Aprovação',
     'Aprovada',
     'Reprovada',
     'Concluída'
   );
   
   -- Recriar constraint na tabela
   ALTER TABLE os_etapas 
     ALTER COLUMN status TYPE os_etapa_status 
     USING status::os_etapa_status;
   ```

2. **Verificar encoding:**
   ```sql
   SHOW SERVER_ENCODING;  -- Deve ser UTF8
   ```

3. **Usar versão sem acento** (última opção):
   - Modificar enum para usar 'Concluida' sem acento
   - Atualizar código frontend para usar sem acento

### Colaborador Sistema ainda dá erro?

```sql
-- Ver todos os auth users (Dashboard → Authentication → Users)
-- Ou via API:
```

Se o problema persistir, deletar manualmente:

1. Dashboard Supabase → Authentication → Users
2. Procurar: sistema@minerva.com
3. Deletar
4. Deletar colaborador:
   ```sql
   DELETE FROM colaboradores WHERE nome_completo = 'Sistema Minerva';
   ```
5. Tentar criar OS novamente (será criado automaticamente)

---

**Status:** ✅ Correções Implementadas  
**Próximos Passos:** Executar script SQL de setup e testar criação de OS
