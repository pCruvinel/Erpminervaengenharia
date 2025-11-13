# Migração para API Supabase - Componentes Atualizados

**Data:** 10/11/2024  
**Status:** ✅ **EM PROGRESSO - Componentes Principais Migrados**

---

## 🎯 Componentes Migrados

### 1. ✅ OSListPage - Lista de Ordens de Serviço

**Arquivo:** `/components/os/os-list-page.tsx`

**Mudanças:**
- ✅ Substituído mock data por `useOrdensServico()` hook
- ✅ Adicionado loading states
- ✅ Adicionado error handling com fallback para mock
- ✅ Alert de status de conexão (verde quando conectado)
- ✅ Transformação automática de dados da API para formato local
- ✅ Mantida toda a lógica de filtros (RLS, busca, etc)

**Uso:**
```tsx
// O componente já usa automaticamente a API
<OSListPage currentUser={user} onNavigate={navigate} />
```

**Estados:**
- 🟢 **Conectado**: Exibe dados reais do Supabase
- 🔴 **Erro**: Exibe mock data como fallback
- ⏳ **Loading**: Mostra spinner durante carregamento

---

### 2. ✅ CreateOSPage - Criação de Ordens de Serviço

**Arquivo:** `/components/os/create-os-page.tsx`

**Mudanças:**
- ✅ Substituído mock de clientes por `useClientes('CLIENTE_ATIVO')` hook
- ✅ Substituído mock de tipos OS por `tiposOSAPI.list()`
- ✅ Adicionado loading states em dropdowns
- ✅ Alert de conexão mostrando quantos clientes estão disponíveis
- ✅ Fallback automático para mock em caso de erro

**Uso:**
```tsx
<CreateOSPage onCancel={handleCancel} onCreate={handleCreate} />
```

---

## 📦 Hooks Criados

### 1. `useClientes(status?)`

**Arquivo:** `/lib/hooks/use-clientes.ts`

**Funções disponíveis:**
```tsx
// Listar clientes
const { clientes, loading, error, refetch } = useClientes();

// Listar apenas leads
const { clientes: leads } = useClientes('LEAD');

// Criar cliente
const { mutate: createCliente } = useCreateCliente();
await createCliente({ nome_razao_social: 'ABC', status: 'LEAD' });

// Atualizar cliente
const { mutate: updateCliente } = useUpdateCliente(clienteId);
await updateCliente({ email: 'novo@email.com' });

// Converter lead em cliente
const { mutate: convert } = useConvertLeadToCliente(leadId);
await convert();
```

**Transformadores:**
- `transformClienteToForm(cliente)` - API → Formulário
- `transformFormToCliente(formData)` - Formulário → API

---

### 2. `useOrdensServico(filters?)`

**Arquivo:** `/lib/hooks/use-ordens-servico.ts`

**Funções disponíveis:**
```tsx
// Listar OS
const { ordensServico, loading, error, refetch, raw } = useOrdensServico();

// Listar com filtros
const { ordensServico } = useOrdensServico({ status: 'Em Andamento' });

// Buscar OS específica
const { data: os } = useOrdemServico(osId);

// Criar OS
const { mutate: createOS } = useCreateOrdemServico();
await createOS({ cliente_id: '...', tipo_os_id: '...' });

// Atualizar OS
const { mutate: updateOS } = useUpdateOrdemServico(osId);
await updateOS({ status_geral: 'Concluída' });

// Gerenciar etapas
const { etapas } = useEtapasOS(osId);
const { mutate: createEtapa } = useCreateEtapa(osId);
const { mutate: updateEtapa } = useUpdateEtapa(etapaId);
```

**Transformações automáticas:**
- Status: `'Em Andamento'` → `'em_andamento'`
- Setor: `'OBRAS'` → `'obras'`
- Iniciais: `'João Silva'` → `'JS'`
- Datas: ISO 8601 → `'YYYY-MM-DD'`

---

## 🔄 Padrão de Migração

### Antes (Mock Data)
```tsx
import { mockOrdensServico } from '../../lib/mock-data';

function MeuComponente() {
  const [ordensServico, setOrdensServico] = useState(mockOrdensServico);
  
  return (
    <div>
      {ordensServico.map(os => <div key={os.id}>{os.codigo}</div>)}
    </div>
  );
}
```

### Depois (API Real)
```tsx
import { useOrdensServico } from '../../lib/hooks/use-ordens-servico';

function MeuComponente() {
  const { ordensServico, loading, error } = useOrdensServico();
  
  if (loading) return <Loader />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {ordensServico?.map(os => <div key={os.id}>{os.codigo}</div>)}
    </div>
  );
}
```

---

## ✅ Recursos Implementados

### Estados de Loading
Todos os componentes migrados têm:
- ✅ Spinner durante carregamento inicial
- ✅ Loading states em dropdowns/selects
- ✅ Skeleton loaders (onde aplicável)

### Tratamento de Erros
- ✅ Fallback automático para mock data
- ✅ Mensagens de erro amigáveis
- ✅ Botão "Tentar novamente"
- ✅ Logs detalhados no console

### Indicadores Visuais
- ✅ Alert verde quando conectado ao Supabase
- ✅ Contador de registros carregados
- ✅ Botão de refresh manual
- ✅ Alert vermelho em caso de erro

### Toast Notifications
Todas as mutations têm toasts:
- ✅ Sucesso: `toast.success('Cliente criado!')`
- ✅ Erro: `toast.error('Erro ao criar cliente')`

---

## 📊 Mapeamento de Dados

### Cliente (API → Local)
```typescript
{
  // API
  id: "uuid",
  nome_razao_social: "ABC Construtora",
  cpf_cnpj: "12.345.678/0001-90",
  status: "LEAD",
  tipo_cliente: "CONSTRUTORA",
  
  // Transformado para
  id: "uuid",
  nome: "ABC Construtora",
  cpfCnpj: "12.345.678/0001-90",
  status: "lead",
  tipo: "juridica"
}
```

### Ordem de Serviço (API → Local)
```typescript
{
  // API
  id: "uuid",
  codigo_os: "OS-2025-001",
  status_geral: "Em Andamento",
  cliente: { nome_razao_social: "ABC" },
  tipo_os: { codigo: "OS-01", nome: "Perícia" },
  
  // Transformado para
  id: "uuid",
  codigo: "OS-2025-001",
  status: "em_andamento",
  cliente: { nome: "ABC" },
  tipoOS: { id: "01", nome: "OS 01: Perícia" }
}
```

---

## 🚀 Próximos Componentes para Migrar

### Alta Prioridade
1. **Etapa 1: Identificação de Lead** (`step-identificacao-lead-completo.tsx`)
   - Usar `useClientes('LEAD')`
   - Usar `useCreateCliente()`
   
2. **Workflow de OS** (`os-workflow-page.tsx`)
   - Usar `useOrdemServico(osId)`
   - Usar `useEtapasOS(osId)`
   - Usar `useUpdateEtapa(etapaId)`

3. **OS Details** (`os-details-page.tsx`)
   - Usar `useOrdemServico(osId)`

### Média Prioridade
4. **OS Creation Hub** (`os-creation-hub.tsx`)
   - Integrar com `useCreateOrdemServico()`

5. **Etapas Follow-up** (`step-followup-*.tsx`)
   - Usar dados da etapa anterior via API
   - Salvar dados_etapa via `useUpdateEtapa()`

---

## 📝 Checklist de Migração

Para cada componente:
- [ ] Identificar dados mockados
- [ ] Substituir por hook apropriado
- [ ] Adicionar loading state
- [ ] Adicionar error handling
- [ ] Adicionar alert de status de conexão
- [ ] Testar com dados reais
- [ ] Testar com API offline (fallback)
- [ ] Documentar mudanças

---

## 🐛 Troubleshooting

### Componente não carrega dados
1. Verificar console (F12) para erros
2. Verificar Network tab para requisições
3. Verificar se as tabelas existem no Supabase
4. Verificar se RLS está desabilitado (temp)

### Fallback para mock mesmo com API OK
1. Verificar se `errorClientes` ou `errorTipos` está true
2. Verificar transformação de dados
3. Ver console para erros de transformação

### Dados desatualizados
1. Usar `refetch()` do hook
2. Verificar se mutation chama `onSuccess` com refetch

---

## 💡 Boas Práticas

### 1. Sempre usar hooks customizados
```tsx
// ✅ Bom
import { useClientes } from '../../lib/hooks/use-clientes';
const { clientes } = useClientes();

// ❌ Evitar
import { clientesAPI } from '../../lib/api-client';
const [data, setData] = useState([]);
useEffect(() => { clientesAPI.list().then(setData) }, []);
```

### 2. Sempre adicionar fallback
```tsx
// ✅ Bom
const clientesDisponiveis = error ? mockClientes : (clientes || []);

// ❌ Evitar
const clientesDisponiveis = clientes; // pode ser null
```

### 3. Transformar dados no hook, não no componente
```tsx
// ✅ Bom - transformação no hook
const { ordensServico } = useOrdensServico(); // já transformado

// ❌ Evitar - transformação no componente
const { data } = useApi(...);
const transformed = data.map(os => transform(os)); // código duplicado
```

---

## 📚 Documentação Relacionada

- [API Integration Guide](/API_INTEGRATION_GUIDE.md)
- [Supabase Integration](/SUPABASE_INTEGRATION.md)
- [Database Schema](/DATABASE_SCHEMA.md)
- [Setup Supabase](/SETUP_SUPABASE.md)

---

**Última atualização:** 10/11/2024  
**Próxima revisão:** Após migração das etapas do workflow
