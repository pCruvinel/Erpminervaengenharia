# 🚨 COMO RESOLVER: Erro "Could not find the 'titulo' column"

## ⚡ Solução Rápida (Recomendada)

### Opção 1: Interface do Sistema ✨

1. **Faça login no sistema**
2. **Clique em "Debug Schema"** na barra lateral esquerda (último item com ícone 🐛)
3. **Clique em "Recarregar Schema"**
4. **Aguarde 10 segundos**
5. **Tente criar a OS novamente**

---

### Opção 2: Supabase Dashboard

1. **Acesse:** https://app.supabase.com/project/[seu-project-id]
2. **Vá para:** Settings (⚙️) → API
3. **Role até:** "PostgREST Settings"
4. **Clique em:** "Reload Schema" ou "Restart PostgREST"
5. **Aguarde:** ~30 segundos
6. **Tente novamente**

---

## 🔍 Por que isso acontece?

O **PostgREST** (API do Supabase) mantém um **cache** do schema do banco de dados. 

Quando a tabela foi criada inicialmente, ela tinha uma coluna chamada `titulo`. Depois, o schema foi alterado para usar `descricao` em vez de `titulo`. 

O PostgREST ainda está usando o cache antigo e procurando pela coluna `titulo` que não existe mais.

---

## ✅ Verificar se Foi Resolvido

Após recarregar o schema, faça o teste:

1. **Navegue para:** Hub de Criação de OS
2. **Etapa 1:** Selecione um Lead
3. **Etapa 2:** Selecione Tipo de OS
4. **Clique em "Continuar"**

**Console deve mostrar:**
```
🚀 Iniciando criação da OS...
✅ Tipo de OS encontrado: { id: "...", codigo: "OS-01", ... }
📝 Criando OS no banco...
✅ OS criada: { id: "...", codigo_os: "OS-2025-001", ... }
```

**Se ainda der erro**, vá para a **Solução Manual** abaixo.

---

## 🛠️ Solução Manual (Se as anteriores não funcionarem)

### Passo 1: Verificar Estrutura da Tabela

Execute no **SQL Editor** do Supabase:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'ordens_servico'
  AND table_schema = 'public'
ORDER BY ordinal_position;
```

**Se aparecer `titulo` em vez de `descricao`:**

```sql
-- Renomear coluna
ALTER TABLE ordens_servico 
RENAME COLUMN titulo TO descricao;

-- Depois, recarregue o schema (Opção 1 ou 2)
```

---

### Passo 2: Se a Tabela Estiver Muito Corrompida

**Fazer backup e recriar:**

```sql
-- 1. Backup
CREATE TABLE ordens_servico_backup AS 
SELECT * FROM ordens_servico;

-- 2. Dropar foreign keys
ALTER TABLE os_etapas DROP CONSTRAINT IF EXISTS os_etapas_os_id_fkey;

-- 3. Dropar tabela
DROP TABLE IF EXISTS ordens_servico CASCADE;

-- 4. Recriar tabela correta
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
  descricao text  -- ✅ descricao
);

-- 5. Recriar índices
CREATE INDEX idx_os_status ON ordens_servico(status_geral);
CREATE INDEX idx_os_cliente ON ordens_servico(cliente_id);

-- 6. Restaurar foreign key
ALTER TABLE os_etapas 
ADD CONSTRAINT os_etapas_os_id_fkey 
FOREIGN KEY (os_id) REFERENCES ordens_servico(id);

-- 7. Restaurar dados (se houver)
INSERT INTO ordens_servico 
SELECT * FROM ordens_servico_backup;

-- 8. Limpar
DROP TABLE ordens_servico_backup;
```

**Depois disso, SEMPRE recarregue o schema!**

---

## 📱 Usar Página de Debug

A página **Debug Schema** tem 2 ferramentas:

### 1. Recarregar Schema
- Envia sinal para o PostgREST recarregar o cache
- Deve resolver 90% dos casos

### 2. Verificar Estrutura da Tabela
- Tenta buscar informações sobre as colunas
- Mostra se a tabela existe e quais erros estão acontecendo

---

## 🎯 Checklist de Resolução

- [ ] Tentei recarregar via página "Debug Schema"
- [ ] Aguardei pelo menos 10 segundos
- [ ] Tentei recarregar via Dashboard do Supabase
- [ ] Verifiquei se a coluna `descricao` existe no banco (SQL Editor)
- [ ] Se `titulo` existe, renomeei para `descricao`
- [ ] Recarreguei o schema novamente após renomear
- [ ] Testei criar OS novamente
- [ ] Se ainda não funcionar, recriaria a tabela (backup primeiro!)

---

## 💡 Dica: Como Evitar no Futuro

Sempre que modificar o schema de uma tabela:

1. **Execute o ALTER TABLE**
2. **Imediatamente recarregue o schema** (Dashboard ou Debug)
3. **Aguarde 10-30 segundos**
4. **Teste a modificação**

---

## 🆘 Ainda Não Funciona?

Se nada disso resolver:

1. **Verifique logs do servidor** (função Edge)
2. **Verifique se há migrations pendentes**
3. **Considere criar tabela nova** (ex: `ordens_servico_v2`)
4. **Entre em contato com suporte do Supabase**

---

## ✅ Arquivos Atualizados

- `/supabase/functions/server/index.tsx` - Logs detalhados + endpoint debug
- `/components/test-schema-reload.tsx` - Interface de debug
- `/components/layout/sidebar.tsx` - Link para debug
- `/App.tsx` - Rota para debug
- `/components/os/os-details-workflow-page.tsx` - Usa `descricao`
- `/lib/hooks/use-etapas.ts` - Usa `dados_etapa`

---

**Boa sorte! 🚀**
