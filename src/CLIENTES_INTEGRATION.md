# Integração de Clientes/Leads com Banco de Dados

**Data:** 10/11/2025  
**Componente:** Etapa 1 - Identificação do Lead (OS 01-04)  
**Status:** ✅ Implementado

---

## 📋 Resumo

A **Etapa 1** do fluxo de OS 01-04 agora está completamente integrada com o banco de dados Supabase. Os leads não são mais carregados de dados mock (`mockLeads`), mas sim buscados diretamente da tabela `clientes` com `status = 'LEAD'`.

---

## 🎯 Funcionalidades Implementadas

### ✅ Buscar Leads do Banco de Dados
- Hook `useClientes('LEAD')` busca todos os leads da tabela `clientes`
- Filtro automático por `status = 'LEAD'`
- Loading state durante a busca
- Tratamento de erros com opção de retry
- Apenas 1 requisição ao carregar (sem loops infinitos)

### ✅ Criar Novo Lead no Banco
- Formulário completo com validação
- Transformação automática de dados (frontend → API)
- Salvamento na tabela `clientes` via endpoint `/clientes`
- Feedback visual (loading, success toast, error toast)
- Atualização automática da lista após criação
- Seleção automática do lead recém-criado

### ✅ Selecionar Lead Existente
- Busca por nome, CPF ou CNPJ
- Avatar com iniciais do nome
- Indicador visual de seleção (check)
- Popover responsivo com lista completa

---

## 📁 Arquivos Modificados

### 1. `/lib/hooks/use-clientes.ts`
**Alterações:**
- ✅ Adicionado `deps: [status]` no hook `useClientes()` para evitar loops infinitos
- ✅ Adicionado toast de erro no `onError`
- ✅ Atualizada função `transformFormToCliente()` para incluir dados da edificação

**Nova estrutura de transformação:**
```typescript
transformFormToCliente(formData) → {
  nome_razao_social,
  cpf_cnpj,
  email,
  telefone,
  nome_responsavel,
  tipo_cliente: 'PESSOA_FISICA' | 'CONDOMINIO',
  status: 'LEAD',
  endereco: {
    // Dados básicos
    rua, numero, complemento, bairro, cidade, estado, cep,
    
    // Dados da edificação (JSONB)
    tipo_edificacao,
    qtd_unidades,
    qtd_blocos,
    qtd_pavimentos,
    tipo_telhado,
    possui_elevador,
    possui_piscina,
    cargo_responsavel
  }
}
```

---

### 2. `/components/os/steps/shared/step-identificacao-lead-completo.tsx`
**Alterações:**
- ❌ Removido `import { mockLeads }` - dados mock não são mais usados
- ✅ Adicionado `import { useClientes, useCreateCliente, transformFormToCliente }`
- ✅ Implementado hook `useClientes('LEAD')` para buscar leads
- ✅ Implementado hook `useCreateCliente()` para criar novos leads
- ✅ Criada função `handleSaveNewLead()` que:
  - Valida campos obrigatórios
  - Transforma dados do formulário
  - Chama API de criação
  - Atualiza lista de leads
  - Seleciona automaticamente o novo lead
- ✅ Adicionados estados de loading:
  - No botão de busca (durante carregamento inicial)
  - Na lista de leads (skeleton)
  - No botão de salvar (durante criação)
- ✅ Adicionado alerta de erro com botão "Tentar novamente"
- ✅ Atualizado mapeamento de campos:
  - `lead.nome` → `lead.nome_razao_social`
  - `lead.cpfCnpj` → `lead.cpf_cnpj`

---

### 3. `/lib/api-client.ts`
**Status:** ✅ Já estava implementado  
Rotas de clientes já existiam:
- `GET /clientes` - listar (com filtro opcional por status)
- `POST /clientes` - criar
- `PUT /clientes/:id` - atualizar
- `GET /clientes/:id` - buscar por ID

---

### 4. `/supabase/functions/server/index.tsx`
**Status:** ✅ Já estava implementado  
Endpoints de clientes já existiam:
- `GET /make-server-5ad7fd2c/clientes` (com query param `?status=LEAD`)
- `POST /make-server-5ad7fd2c/clientes`
- `PUT /make-server-5ad7fd2c/clientes/:id`
- `GET /make-server-5ad7fd2c/clientes/:id`

---

## 🗄️ Estrutura da Tabela `clientes`

```sql
CREATE TABLE public.clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status cliente_status NOT NULL DEFAULT 'LEAD',  -- LEAD | CLIENTE_ATIVO | CLIENTE_INATIVO
  nome_razao_social text NOT NULL,
  cpf_cnpj character varying UNIQUE,
  email text,
  telefone character varying,
  nome_responsavel text,
  tipo_cliente tipo_cliente,  -- PESSOA_FISICA | CONDOMINIO | CONSTRUTORA, etc.
  endereco jsonb,  -- Estrutura flexível com dados de endereço + edificação
  observacoes text,
  responsavel_id uuid,
  
  CONSTRAINT clientes_responsavel_id_fkey 
    FOREIGN KEY (responsavel_id) REFERENCES public.colaboradores(id)
);
```

**Exemplo de `endereco` (JSONB):**
```json
{
  "rua": "Rua das Flores",
  "numero": "123",
  "complemento": "Bloco A",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234-567",
  "tipo_edificacao": "Condomínio Residencial - Apartamentos",
  "qtd_unidades": "48",
  "qtd_blocos": "2",
  "qtd_pavimentos": "8",
  "tipo_telhado": "Laje impermeabilizada",
  "possui_elevador": true,
  "possui_piscina": false,
  "cargo_responsavel": "Síndico"
}
```

---

## 🔄 Fluxo de Criação de Lead

```
Usuário clica "Criar novo cliente"
    ↓
Dialog abre com formulário vazio
    ↓
Usuário preenche dados obrigatórios:
  - Nome/Razão Social *
  - CPF/CNPJ *
  - Telefone *
  - Email *
  - Tipo de Edificação *
  - Tipo de Telhado *
  - CEP, Endereço, Bairro, Cidade, Estado *
    ↓
Usuário clica "Salvar Lead"
    ↓
Frontend valida campos obrigatórios
    ↓
Frontend transforma dados (transformFormToCliente)
    ↓
useCreateCliente().mutate(data)
    ↓
POST /make-server-5ad7fd2c/clientes
    ↓
Servidor insere na tabela clientes
    ↓
Retorna novo lead criado { id, nome_razao_social, ... }
    ↓
Frontend atualiza lista (refetch)
    ↓
Frontend seleciona automaticamente o novo lead
    ↓
Dialog fecha
    ↓
Toast de sucesso: "Cliente criado com sucesso!"
```

---

## 🔄 Fluxo de Busca de Leads

```
Componente monta
    ↓
useClientes('LEAD') executa
    ↓
GET /make-server-5ad7fd2c/clientes?status=LEAD
    ↓
Servidor consulta:
  SELECT * FROM clientes WHERE status = 'LEAD'
    ↓
Retorna array de leads
    ↓
Hook armazena em state
    ↓
Componente renderiza lista no Command/Popover
```

**Importante:** A requisição acontece **apenas uma vez** ao montar o componente, graças ao sistema de `deps` implementado.

---

## 🎨 UX Implementada

### Estados de Loading
1. **Carregando leads inicial:**
   ```
   [Buscar por nome...] [🔄 Carregando...]
   ```

2. **Salvando novo lead:**
   ```
   [Cancelar] [🔄 Salvando...]
   ```

### Estados de Erro
1. **Erro ao carregar leads:**
   ```
   ⚠️ Erro ao carregar leads do banco de dados [Tentar novamente]
   ```

2. **Erro ao criar lead:**
   ```
   🔴 Toast: "Erro ao criar cliente: [mensagem de erro]"
   ```

### Estados de Sucesso
1. **Lead criado:**
   ```
   ✅ Toast: "Cliente criado com sucesso!"
   ```
   - Lista atualiza automaticamente
   - Novo lead é selecionado
   - Dialog fecha

---

## 🧪 Como Testar

### Teste 1: Carregar Leads Existentes
1. Abrir OS 01-04 workflow
2. Na Etapa 1, clicar no campo "Cliente / Lead"
3. ✅ Deve mostrar lista de leads do banco com status = 'LEAD'
4. ✅ Deve exibir loading enquanto busca
5. ✅ Se houver erro, deve mostrar alerta com botão retry

### Teste 2: Criar Novo Lead
1. Clicar em "Criar novo cliente" no footer da lista
2. Preencher todos os campos obrigatórios (*):
   - Nome: "Condomínio Teste"
   - CPF/CNPJ: "12.345.678/0001-90"
   - Telefone: "(11) 98765-4321"
   - Email: "contato@teste.com.br"
   - Tipo de Edificação: "Condomínio Residencial - Apartamentos"
   - Qtd. Unidades: "48"
   - Qtd. Blocos: "2"
   - Tipo de Telhado: "Laje impermeabilizada"
   - CEP, Endereço, Bairro, Cidade, Estado
3. Clicar em "Salvar Lead"
4. ✅ Botão deve mostrar "Salvando..."
5. ✅ Toast de sucesso deve aparecer
6. ✅ Dialog deve fechar
7. ✅ Novo lead deve aparecer selecionado no campo

### Teste 3: Verificar Banco de Dados
1. Ir no Supabase Dashboard
2. Table Editor → `clientes`
3. ✅ Novo registro deve estar presente
4. ✅ `status` deve ser 'LEAD'
5. ✅ `endereco` deve ser um JSONB com todos os dados

---

## 🐛 Tratamento de Erros

### Cenário 1: Tabela `clientes` não existe
**Erro:** `relation "clientes" does not exist`  
**Tratamento:** 
- Alerta vermelho: "Erro ao carregar leads do banco de dados"
- Botão "Tentar novamente"
- Log no console com detalhes

### Cenário 2: Campos obrigatórios vazios
**Erro:** Validação frontend  
**Tratamento:**
- Toast: "Preencha todos os campos obrigatórios"
- Formulário não fecha
- Campos obrigatórios mantêm asterisco vermelho

### Cenário 3: CPF/CNPJ duplicado
**Erro:** `duplicate key value violates unique constraint`  
**Tratamento:**
- Toast: "Erro ao criar cliente: CPF/CNPJ já cadastrado"
- Formulário não fecha
- Usuário pode corrigir e tentar novamente

### Cenário 4: Timeout do servidor
**Erro:** `Request timeout - servidor não respondeu em 30s`  
**Tratamento:**
- Toast: "Erro ao carregar clientes: Request timeout"
- Alerta com botão "Tentar novamente"

---

## 📊 Performance

### Requisições
- ✅ **Apenas 1 requisição** ao carregar a etapa
- ✅ Nova requisição **apenas** quando:
  - Usuário clica "Tentar novamente" (após erro)
  - Usuário cria novo lead (refetch automático)
  - Componente é desmontado e remontado

### Cache
- Hook `useApi` mantém dados em cache local
- Não há requisições duplicadas
- Refetch manual disponível via `refetch()`

---

## 🔐 Segurança

### Validação Frontend
- Campos obrigatórios verificados antes do envio
- Email validado via type="email"
- CPF/CNPJ com formato validado

### Validação Backend
- Constraint UNIQUE em `cpf_cnpj`
- Constraint NOT NULL em campos obrigatórios
- Foreign key para `responsavel_id`

### Autorização
- Apenas usuários autenticados podem criar leads
- RLS (Row Level Security) pode ser implementado posteriormente

---

## 🚀 Próximos Passos

### Melhorias Futuras
1. ⏳ Auto-preencher endereço via API ViaCEP (quando CEP for digitado)
2. ⏳ Máscara automática para CPF/CNPJ e telefone
3. ⏳ Upload de logo/foto do cliente
4. ⏳ Histórico de interações com o lead
5. ⏳ Score de qualificação do lead
6. ⏳ Filtros avançados (por cidade, tipo de edificação, etc.)
7. ⏳ Exportar lista de leads para Excel

### Integrações Pendentes
1. ⏳ Etapa 2: Buscar tipos de OS do banco
2. ⏳ Etapa 7: Salvar memorial/escopo no banco
3. ⏳ Etapa 9: Salvar proposta comercial no banco
4. ⏳ Etapa 15: Converter lead em cliente (mudar status)

---

## 📝 Changelog

### [1.0.0] - 2025-11-10

#### Adicionado
- Hook `useClientes('LEAD')` com deps correto
- Hook `useCreateCliente()` com toast de sucesso/erro
- Função `transformFormToCliente()` expandida com dados da edificação
- Estado de loading no botão de busca
- Estado de loading no botão de salvar
- Alerta de erro com botão retry
- Validação de campos obrigatórios
- Auto-seleção do lead criado
- Auto-refetch após criação

#### Modificado
- Componente `StepIdentificacaoLeadCompleto` agora usa dados reais
- Lista de leads renderiza `nome_razao_social` ao invés de `nome`
- Mapeamento de campos atualizado para schema do banco

#### Removido
- Dependência de `mockLeads` (dados fake)
- Loop infinito de requisições

---

**Desenvolvido por:** Equipe Minerva ERP  
**Última atualização:** 10/11/2025
