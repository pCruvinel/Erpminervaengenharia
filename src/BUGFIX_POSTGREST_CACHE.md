# 🔧 BUGFIX: PostgREST Schema Cache

## 🐛 Problema

```
Erro ao criar OS: {
  code: "PGRST204",
  details: null,
  hint: null,
  message: "Could not find the 'titulo' column of 'ordens_servico' in the schema cache"
}
```

## 🎯 Causa Raiz

O **PostgREST** (camada de API REST do Supabase) mantém um **cache do schema** do banco de dados. Quando você:

1. Cria uma tabela com certos campos
2. Depois altera o schema (adiciona/remove/renomeia colunas)
3. O PostgREST ainda está usando o **schema antigo em cache**

Neste caso:
- A tabela `ordens_servico` **tinha** a coluna `titulo` 
- Agora tem a coluna `descricao`
- Mas o PostgREST ainda procura por `titulo` (cache desatualizado)

---

## ✅ Soluções

### Solução 1: Recarregar Schema via Supabase Dashboard (Recomendado)

1. **Acesse o Supabase Dashboard**
   ```
   https://app.supabase.com/project/[seu-project-id]
   ```

2. **Vá para Settings → API**

3. **Role até "PostgREST Settings"**

4. **Clique em "Reload Schema"** ou **"Restart PostgREST"**

5. **Aguarde ~10 segundos**

6. **Teste novamente a criação de OS**

---

### Solução 2: SQL Manual para Recriar a Tabela

Se a Solução 1 não funcionar, você pode precisar recriar a tabela:

#### Passo 1: Fazer Backup dos Dados
```sql
-- Criar tabela temporária com dados existentes
CREATE TABLE ordens_servico_backup AS 
SELECT * FROM ordens_servico;
```

#### Passo 2: Dropar Tabela Antiga
```sql
-- Remover constraints e foreign keys primeiro
ALTER TABLE os_etapas DROP CONSTRAINT IF EXISTS os_etapas_os_id_fkey;

-- Dropar tabela
DROP TABLE IF EXISTS ordens_servico CASCADE;
```

#### Passo 3: Recriar Tabela Corretamente
```sql
-- Recriar tipos ENUM (se necessário)
DO $$ BEGIN
  CREATE TYPE os_status_geral AS ENUM (
    'Em Triagem',
    'Em Andamento',
    'Aguardando Aprovação',
    'Concluída',
    'Cancelada',
    'Pausada'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Criar tabela com schema correto
CREATE TABLE public.ordens_servico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_os character varying UNIQUE,
  cliente_id uuid NOT NULL REFERENCES public.clientes(id),
  tipo_os_id uuid NOT NULL REFERENCES public.tipos_os(id),
  responsavel_id uuid REFERENCES public.colaboradores(id),
  criado_por_id uuid NOT NULL REFERENCES public.colaboradores(id),
  cc_id uuid,
  status_geral os_status_geral NOT NULL DEFAULT 'Em Triagem',
  data_entrada timestamp with time zone NOT NULL DEFAULT now(),
  data_prazo timestamp with time zone,
  data_conclusao timestamp with time zone,
  valor_proposta numeric,
  valor_contrato numeric,
  descricao text  -- ✅ descricao (não "titulo")
);

-- Recriar índices
CREATE INDEX idx_os_status ON ordens_servico(status_geral);
CREATE INDEX idx_os_cliente ON ordens_servico(cliente_id);
CREATE INDEX idx_os_responsavel ON ordens_servico(responsavel_id);
CREATE INDEX idx_os_created ON ordens_servico(data_entrada);

-- Restaurar foreign key
ALTER TABLE os_etapas 
ADD CONSTRAINT os_etapas_os_id_fkey 
FOREIGN KEY (os_id) REFERENCES ordens_servico(id);
```

#### Passo 4: Restaurar Dados (se houver)
```sql
-- Migrar dados do backup (ajustar conforme colunas antigas)
INSERT INTO ordens_servico (
  id, codigo_os, cliente_id, tipo_os_id, responsavel_id, 
  criado_por_id, status_geral, data_entrada, descricao
)
SELECT 
  id, codigo_os, cliente_id, tipo_os_id, responsavel_id,
  criado_por_id, status_geral, data_entrada, 
  titulo AS descricao  -- ✅ Renomear titulo → descricao
FROM ordens_servico_backup;

-- Remover backup
DROP TABLE ordens_servico_backup;
```

---

### Solução 3: Forçar Reload via API (Endpoint Criado)

Adicionei um endpoint de debug no backend:

```bash
# Recarregar schema
POST https://[project-id].supabase.co/functions/v1/make-server-5ad7fd2c/reload-schema

# Verificar estrutura da tabela
GET https://[project-id].supabase.co/functions/v1/make-server-5ad7fd2c/debug/table-structure
```

**JavaScript:**
```javascript
// Recarregar schema
const reloadResponse = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-5ad7fd2c/reload-schema`,
  { 
    method: 'POST',
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  }
);

console.log('Schema reload:', await reloadResponse.json());

// Verificar estrutura
const structureResponse = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-5ad7fd2c/debug/table-structure`,
  {
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  }
);

console.log('Table structure:', await structureResponse.json());
```

---

### Solução 4: Verificar se a Coluna Existe no Banco

Execute este SQL no **SQL Editor** do Supabase:

```sql
-- Verificar colunas da tabela ordens_servico
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ordens_servico'
  AND table_schema = 'public'
ORDER BY ordinal_position;
```

**Resultado esperado:**
```
column_name        | data_type             | is_nullable
-------------------+-----------------------+-------------
id                 | uuid                  | NO
codigo_os          | character varying     | YES
cliente_id         | uuid                  | NO
tipo_os_id         | uuid                  | NO
responsavel_id     | uuid                  | YES
criado_por_id      | uuid                  | NO
cc_id              | uuid                  | YES
status_geral       | USER-DEFINED          | NO
data_entrada       | timestamp with time   | NO
data_prazo         | timestamp with time   | YES
data_conclusao     | timestamp with time   | YES
valor_proposta     | numeric               | YES
valor_contrato     | numeric               | YES
descricao          | text                  | YES  ✅
```

**Se você ver `titulo` em vez de `descricao`:**
```sql
-- Renomear coluna
ALTER TABLE ordens_servico 
RENAME COLUMN titulo TO descricao;
```

---

## 🔍 Verificar Código Frontend

Certifique-se de que o código **não está enviando** a coluna `titulo`:

```typescript
// ❌ ERRADO
const novaOS = await ordensServicoAPI.create({
  titulo: 'Minha OS',  // ❌ Campo não existe!
  ...
});

// ✅ CORRETO
const novaOS = await ordensServicoAPI.create({
  descricao: 'Minha OS',  // ✅ Campo correto
  ...
});
```

---

## 🧪 Teste Completo

Após aplicar a solução, teste:

### 1. Via SQL Editor
```sql
-- Inserir OS de teste
INSERT INTO ordens_servico (
  cliente_id,
  tipo_os_id,
  criado_por_id,
  descricao,
  status_geral
) VALUES (
  (SELECT id FROM clientes LIMIT 1),
  (SELECT id FROM tipos_os WHERE codigo = 'OS-01' LIMIT 1),
  '00000000-0000-0000-0000-000000000000',
  'Teste via SQL',
  'Em Triagem'
) RETURNING *;
```

### 2. Via API (Postman/cURL)
```bash
curl -X POST \
  "https://[project-id].supabase.co/functions/v1/make-server-5ad7fd2c/ordens-servico" \
  -H "Authorization: Bearer [anon-key]" \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": "uuid-do-cliente",
    "tipo_os_id": "uuid-do-tipo-os",
    "criado_por_id": "00000000-0000-0000-0000-000000000000",
    "descricao": "Teste via API",
    "status_geral": "Em Triagem"
  }'
```

### 3. Via Interface
1. Navegar para Hub de Criação
2. Etapa 1: Selecionar Lead
3. Etapa 2: Selecionar Tipo OS
4. Clicar "Continuar"
5. **Verificar console do navegador** para logs detalhados

---

## 📊 Logs Adicionados

O backend agora loga informações detalhadas:

```javascript
📝 POST /ordens-servico - Dados recebidos: {
  "cliente_id": "...",
  "tipo_os_id": "...",
  "descricao": "...",
  "criado_por_id": "...",
  "status_geral": "Em Andamento"
}

🔢 Código gerado: OS-2025-001

💾 Dados a inserir: {
  "cliente_id": "...",
  "tipo_os_id": "...",
  "descricao": "...",
  "criado_por_id": "...",
  "status_geral": "Em Andamento",
  "codigo_os": "OS-2025-001"
}

✅ OS criada com sucesso: OS-2025-001
```

**Se houver erro:**
```javascript
❌ Erro ao criar OS: { ... }
❌ Erro detalhado: {
  "code": "PGRST204",
  "message": "Could not find the 'titulo' column...",
  "details": null,
  "hint": null
}
```

---

## 🎯 Resumo da Correção

1. ✅ **Código frontend** → Usa `descricao`
2. ✅ **Código backend** → Aceita qualquer payload
3. ❌ **PostgREST cache** → Ainda procura `titulo`

**Solução:** Recarregar schema do PostgREST (Solução 1 ou 2)

---

## 🆘 Se Nada Funcionar

Se após todas as soluções o erro persistir:

### Última Opção: Criar Nova Tabela

```sql
-- Criar tabela com nome diferente
CREATE TABLE public.ordens_servico_v2 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_os character varying UNIQUE,
  cliente_id uuid NOT NULL,
  tipo_os_id uuid NOT NULL,
  criado_por_id uuid NOT NULL,
  descricao text,
  status_geral os_status_geral NOT NULL DEFAULT 'Em Triagem',
  data_entrada timestamp with time zone NOT NULL DEFAULT now()
);

-- Atualizar código para usar nova tabela
-- Em /supabase/functions/server/index.tsx:
.from('ordens_servico_v2')  // ✅ Nova tabela
```

Depois, atualizar todos os endpoints para usar `ordens_servico_v2`.

---

## ✅ Checklist de Resolução

- [ ] Verificar se coluna `descricao` existe no banco (SQL Editor)
- [ ] Recarregar schema via Dashboard (Settings → API → Reload Schema)
- [ ] Aguardar 10-30 segundos
- [ ] Testar criação de OS via interface
- [ ] Verificar logs do console (frontend + backend)
- [ ] Se erro persistir → Recriar tabela (Solução 2)
- [ ] Se ainda persistir → Criar tabela nova (ordens_servico_v2)

---

**Atualizado em:** 2025-01-15  
**Status:** Solução documentada, aguardando teste
