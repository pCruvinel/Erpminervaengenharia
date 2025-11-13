# Setup Supabase - Passo a Passo

**Sistema:** Minerva Engenharia - ERP  
**Data:** 10/11/2024

---

## ✅ Você já fez:

1. ✅ Conectou o Supabase ao projeto
2. ✅ As rotas da API estão implementadas no servidor

---

## 📋 Próximos Passos

### 1. Criar as Tabelas no Supabase

Acesse o [Supabase Dashboard](https://app.supabase.com) e execute os SQL statements do arquivo `/DATABASE_SCHEMA.md`.

#### Script Rápido - Criar Tabelas Principais

```sql
-- 1. Criar ENUMs primeiro
CREATE TYPE cliente_status AS ENUM ('LEAD', 'CLIENTE_ATIVO', 'CLIENTE_INATIVO');
CREATE TYPE tipo_cliente AS ENUM ('PESSOA_FISICA', 'CONDOMINIO', 'CONSTRUTORA', 'INCORPORADORA', 'INDUSTRIA', 'COMERCIO', 'OUTRO');
CREATE TYPE os_status_geral AS ENUM ('Em Triagem', 'Em Andamento', 'Aguardando Aprovação', 'Concluída', 'Cancelada', 'Pausada');
CREATE TYPE os_etapa_status AS ENUM ('Pendente', 'Em Andamento', 'Aguardando Aprovação', 'Aprovada', 'Reprovada', 'Concluída');
CREATE TYPE setor_colaborador AS ENUM ('ADM', 'OBRAS', 'LABORATORIO', 'FINANCEIRO', 'COMERCIAL');

-- 2. Criar tabela de clientes
CREATE TABLE public.clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status cliente_status NOT NULL DEFAULT 'LEAD',
  nome_razao_social text NOT NULL,
  cpf_cnpj character varying UNIQUE,
  email text,
  telefone character varying,
  nome_responsavel text,
  tipo_cliente tipo_cliente,
  endereco jsonb,
  observacoes text,
  responsavel_id uuid
);

-- 3. Criar tabela de tipos_os
CREATE TABLE public.tipos_os (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo character varying NOT NULL UNIQUE,
  nome text NOT NULL,
  setor_padrao setor_colaborador NOT NULL,
  descricao text
);

-- 4. Criar tabela de ordens_servico
CREATE TABLE public.ordens_servico (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo_os character varying UNIQUE,
  cliente_id uuid NOT NULL REFERENCES public.clientes(id),
  tipo_os_id uuid NOT NULL REFERENCES public.tipos_os(id),
  responsavel_id uuid,
  criado_por_id uuid,
  cc_id uuid,
  status_geral os_status_geral NOT NULL DEFAULT 'Em Triagem',
  data_entrada timestamp with time zone NOT NULL DEFAULT now(),
  data_prazo timestamp with time zone,
  data_conclusao timestamp with time zone,
  valor_proposta numeric,
  valor_contrato numeric,
  descricao text
);

-- 5. Criar tabela de os_etapas
CREATE TABLE public.os_etapas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  os_id uuid NOT NULL REFERENCES public.ordens_servico(id),
  nome_etapa text NOT NULL,
  ordem smallint DEFAULT 0,
  status os_etapa_status NOT NULL DEFAULT 'Pendente',
  responsavel_id uuid,
  aprovador_id uuid,
  comentarios_aprovacao text,
  data_inicio timestamp with time zone,
  data_conclusao timestamp with time zone,
  dados_etapa jsonb
);

-- 6. Criar índices
CREATE INDEX idx_os_status ON ordens_servico(status_geral);
CREATE INDEX idx_os_cliente ON ordens_servico(cliente_id);
CREATE INDEX idx_clientes_status ON clientes(status);
CREATE INDEX idx_etapas_os ON os_etapas(os_id);
```

---

### 2. Popular Dados de Teste (Opcional)

```sql
-- Inserir tipos de OS
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao) VALUES
('OS-01', 'Perícia de Fachada', 'OBRAS', 'Perícia técnica em fachadas'),
('OS-02', 'Consultoria Técnica em Obras', 'OBRAS', 'Consultoria para obras'),
('OS-05', 'Assessoria Técnica Mensal', 'OBRAS', 'Assessoria mensal'),
('OS-13', 'Start de Contrato de Obra', 'OBRAS', 'Início de contrato');

-- Inserir clientes de teste
INSERT INTO public.clientes (nome_razao_social, cpf_cnpj, status, tipo_cliente, email, telefone) VALUES
('Construtora ABC Ltda', '12.345.678/0001-90', 'LEAD', 'CONSTRUTORA', 'contato@abc.com', '(11) 98765-4321'),
('Condomínio Residencial Alpha', '98.765.432/0001-10', 'CLIENTE_ATIVO', 'CONDOMINIO', 'admin@alpha.com', '(11) 91234-5678'),
('Incorporadora XYZ', '11.222.333/0001-44', 'LEAD', 'INCORPORADORA', 'contato@xyz.com', '(11) 99999-8888');

-- Inserir OS de teste
INSERT INTO public.ordens_servico (
  codigo_os, 
  cliente_id, 
  tipo_os_id, 
  status_geral,
  descricao
) VALUES (
  'OS-2025-001',
  (SELECT id FROM public.clientes LIMIT 1),
  (SELECT id FROM public.tipos_os WHERE codigo = 'OS-01' LIMIT 1),
  'Em Andamento',
  'Perícia técnica em fachada do edifício'
);
```

---

### 3. Testar a Conexão

Adicione o componente de teste no seu `App.tsx`:

```tsx
import { TestSupabaseConnection } from './components/test-supabase-connection';

// Adicionar em alguma rota
<TestSupabaseConnection />
```

Ou teste diretamente no console do navegador:

```javascript
import { healthCheck, clientesAPI } from './lib/api-client';

// Testar servidor
const health = await healthCheck();
console.log(health); // { status: "ok" }

// Testar clientes
const clientes = await clientesAPI.list();
console.log(clientes);
```

---

### 4. Verificar Logs

Abra o DevTools do navegador (F12) e verifique:

1. **Network Tab**: Veja as requisições para o Supabase
2. **Console Tab**: Veja os logs das chamadas

Logs esperados:
```
✅ OS carregadas com sucesso: 1 registros
GET https://[seu-projeto].supabase.co/functions/v1/make-server-5ad7fd2c/ordens-servico
```

---

## 🔧 Configuração do Supabase

### Verificar Variáveis de Ambiente

O arquivo `/utils/supabase/info.tsx` deve conter:

```typescript
export const projectId = 'seu-project-id';
export const publicAnonKey = 'sua-anon-key';
```

Essas variáveis são usadas automaticamente pelo `api-client.ts`.

---

## 🎯 Usar API nos Componentes

### Exemplo 1: Listar Dados

```tsx
import { useApi } from './lib/hooks/use-api';
import { clientesAPI } from './lib/api-client';

function MeuComponente() {
  const { data, loading, error } = useApi(() => clientesAPI.list());
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <ul>
      {data?.map(cliente => (
        <li key={cliente.id}>{cliente.nome_razao_social}</li>
      ))}
    </ul>
  );
}
```

### Exemplo 2: Criar Dados

```tsx
import { useMutation } from './lib/hooks/use-api';
import { clientesAPI } from './lib/api-client';
import { toast } from 'sonner@2.0.3';

function FormCliente() {
  const { mutate, loading } = useMutation(
    clientesAPI.create,
    {
      onSuccess: () => toast.success('Cliente criado!'),
      onError: (err) => toast.error(err.message),
    }
  );
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutate({
      nome_razao_social: 'Novo Cliente',
      status: 'LEAD',
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={loading}>Criar</button>
    </form>
  );
}
```

---

## 📚 Documentação Completa

- **Schema do Banco:** [DATABASE_SCHEMA.md](/DATABASE_SCHEMA.md)
- **Guia da API:** [API_INTEGRATION_GUIDE.md](/API_INTEGRATION_GUIDE.md)
- **Resumo da Integração:** [SUPABASE_INTEGRATION.md](/SUPABASE_INTEGRATION.md)

---

## 🚨 Troubleshooting

### Erro: "Failed to fetch"

**Causa:** Servidor não está respondendo  
**Solução:** 
1. Verificar se o Supabase está ativo
2. Verificar variáveis em `/utils/supabase/info.tsx`

### Erro: "relation does not exist"

**Causa:** Tabelas não foram criadas  
**Solução:** Executar os SQLs de criação no Supabase Dashboard

### Erro: "permission denied"

**Causa:** RLS (Row Level Security) está bloqueando  
**Solução:** Desabilitar RLS temporariamente:

```sql
ALTER TABLE public.clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.ordens_servico DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.os_etapas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tipos_os DISABLE ROW LEVEL SECURITY;
```

---

## ✅ Checklist Final

- [ ] Tabelas criadas no Supabase
- [ ] Dados de teste inseridos (opcional)
- [ ] Health check retorna `{ status: "ok" }`
- [ ] `clientesAPI.list()` retorna array
- [ ] `ordensServicoAPI.list()` retorna array
- [ ] `tiposOSAPI.list()` retorna array
- [ ] Componente TestSupabaseConnection funciona
- [ ] Logs aparecem no console sem erros

---

## 🎉 Próximos Passos

Agora que a conexão está funcionando:

1. ✅ Migrar componentes de mock data para API real
2. ✅ Implementar autenticação (Supabase Auth)
3. ✅ Adicionar upload de arquivos (Supabase Storage)
4. ✅ Configurar RLS policies
5. ✅ Otimizar queries com índices

---

**Última atualização:** 10/11/2024  
**Suporte:** Equipe Minerva ERP
