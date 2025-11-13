# Fix: Loading Eternamente - Diagnóstico e Solução

**Data:** 10/11/2025 (corrigido)  
**Problema:** A página de lista de OS fica carregando eternamente sem exibir erro ou dados.

## 🔴 PROBLEMA RAIZ IDENTIFICADO

**Erro Supabase:** `Could not embed because more than one relationship was found for 'ordens_servico' and 'colaboradores'`

A tabela `ordens_servico` tem **DUAS foreign keys** para `colaboradores`:
- `responsavel_id` → `colaboradores.id`
- `aprovador_id` → `colaboradores.id`

Quando fazemos `.select('*, responsavel:colaboradores(*)')`, o Supabase fica confuso sobre qual FK usar.

### ✅ SOLUÇÃO
Usar o **nome completo da constraint** da foreign key ao invés de apenas o nome da coluna:

**❌ Errado:**
```typescript
.select(`
  *,
  responsavel:colaboradores!responsavel_id(*)
`)
```

**✅ Correto:**
```typescript
.select(`
  *,
  responsavel:colaboradores!ordens_servico_responsavel_id_fkey(*)
`)
```

## ✅ Mudanças Implementadas

### 1. **Timeout de Requisições** (`/lib/hooks/use-api.ts`)
- ✅ Adicionado timeout de 30 segundos em todas as requisições
- ✅ Mensagem clara quando timeout ocorre: "Request timeout - servidor não respondeu em 30s"
- ✅ Logs detalhados com emojis para facilitar debug no console

```typescript
const timeoutPromise = new Promise<never>((_, reject) => {
  setTimeout(() => reject(new Error('Request timeout - servidor não respondeu em 30s')), 30000);
});

const result = await Promise.race([apiCall(), timeoutPromise]);
```

### 2. **Logs Detalhados no Cliente** (`/lib/api-client.ts`)
- ✅ Log de cada requisição: `🚀 API Request: GET https://...`
- ✅ Log de resposta: `📡 API Response Status: 200 OK`
- ✅ Log de sucesso com dados: `✅ API Success: {...}`
- ✅ Log de erro com detalhes: `❌ API Error Response: {...}`

### 3. **Logs Detalhados no Servidor** (`/supabase/functions/server/index.tsx`)
- ✅ Log de entrada: `📥 GET /ordens-servico - Iniciando busca...`
- ✅ Log de filtros recebidos: `🔍 Filtros recebidos: {...}`
- ✅ Log antes da query: `🔄 Executando query no Supabase...`
- ✅ Log de sucesso com contagem: `✅ Busca bem-sucedida: 5 registros encontrados`
- ✅ Log de erro: `❌ Erro ao buscar OS: {...}`

### 4. **Toast de Erro** (`/lib/hooks/use-ordens-servico.ts`)
- ✅ Exibe toast visual quando erro ocorre
- ✅ Mensagem amigável para o usuário

### 5. **Melhor UX no Loading** (`/components/os/os-list-page.tsx`)
- ✅ Adicionada dica para verificar console se demorar muito
- ✅ Mantido sistema de fallback para mock data
- ✅ Botão de refresh manual

## 🔍 Como Diagnosticar

### **Passo 1: Abrir Console do Navegador**
Pressione `F12` e vá na aba "Console". Você verá logs como:

```
🚀 API Request: GET https://zxfevlkssljndqqhxkjb.supabase.co/functions/v1/make-server-5ad7fd2c/ordens-servico
📡 API Response Status: 200 OK
✅ API Success: [...]
```

### **Passo 2: Verificar Logs do Servidor**
No Supabase Dashboard:
1. Vá em **Edge Functions** > **make-server-5ad7fd2c** > **Logs**
2. Procure por:
   - `📥 GET /ordens-servico - Iniciando busca...`
   - `✅ Busca bem-sucedida: X registros encontrados`

### **Passo 3: Verificar Erros Comuns**

#### ❌ Erro: "Request timeout - servidor não respondeu em 30s"
**Causa:** Servidor Edge Function não está respondendo  
**Solução:**
- Verificar se Edge Function está deployed
- Verificar logs do Supabase
- Verificar se há queries lentas no banco

#### ❌ Erro: "Could not embed because more than one relationship..."
**Causa:** Query Supabase com relacionamento ambíguo  
**Solução:** ✅ **JÁ CORRIGIDO!** Usamos `colaboradores!responsavel_id(*)` para especificar FK

#### ❌ Erro: "Erro 500: Internal Server Error"
**Causa:** Erro no servidor (query inválida, tabela não existe, etc.)  
**Solução:** 
- Verificar logs do servidor
- Verificar se tabelas existem no banco
- Verificar se foreign keys estão corretas

#### ❌ Erro: "Failed to fetch" ou "Network Error"
**Causa:** CORS, Edge Function offline, ou URL incorreta  
**Solução:**
- Verificar URL: `https://zxfevlkssljndqqhxkjb.supabase.co/functions/v1/make-server-5ad7fd2c`
- Verificar CORS no servidor (já configurado)
- Verificar se Edge Function está rodando

## 🧪 Componente de Teste

Existe um componente de diagnóstico em `/components/test-supabase-connection.tsx` que pode ser usado para testar a conexão:

```tsx
// Em App.tsx, temporariamente adicione:
import { TestSupabaseConnection } from './components/test-supabase-connection';

// E renderize:
{currentPage === 'test-connection' && <TestSupabaseConnection />}
```

Este componente testa:
- ✅ Health check do servidor
- ✅ Listagem de clientes
- ✅ Listagem de OS
- ✅ Listagem de tipos de OS
- ✅ Exibe exemplos de dados retornados

## 📊 Fluxo de Requisição

```
Frontend (os-list-page.tsx)
    ↓ usa
useOrdensServico hook
    ↓ usa
useApi hook (com timeout de 30s)
    ↓ chama
api-client.ts → ordensServicoAPI.list()
    ↓ faz fetch para
https://zxfevlkssljndqqhxkjb.supabase.co/functions/v1/make-server-5ad7fd2c/ordens-servico
    ↓ processa em
Supabase Edge Function (index.tsx)
    ↓ faz query no
PostgreSQL Supabase
    ↓ retorna dados
Frontend recebe e renderiza
```

## 🎯 Próximos Passos se Ainda Não Funcionar

1. **Verificar se Edge Function está deployed:**
   - Supabase Dashboard → Edge Functions
   - Verificar status da função `make-server-5ad7fd2c`

2. **Verificar se tabelas existem:**
   - Supabase Dashboard → Table Editor
   - Confirmar existência de: `ordens_servico`, `clientes`, `tipos_os`, `colaboradores`

3. **Testar endpoint manualmente:**
   ```bash
   curl -H "Authorization: Bearer ANON_KEY" \
     https://zxfevlkssljndqqhxkjb.supabase.co/functions/v1/make-server-5ad7fd2c/health
   ```

4. **Verificar permissões RLS:**
   - Temporariamente desabilitar RLS nas tabelas para teste
   - Se funcionar, o problema é de permissão

5. **Popular banco com dados de teste:**
   - Se tabelas estão vazias mas funcionando, é só falta de dados
   - Sistema agora mostra "0 registros" ao invés de ficar carregando

## 📝 Checklist Final

- ✅ Timeout implementado (30s)
- ✅ Logs detalhados no cliente
- ✅ Logs detalhados no servidor  
- ✅ Toast de erro para usuário
- ✅ Dica visual na tela de loading
- ✅ Componente de teste disponível
- ✅ Foreign keys especificadas corretamente
- ✅ Sistema de fallback para mock data mantido

---

## 🔴 PROBLEMA 2: Requisições Infinitas (Resolvido!)

**Data da Correção:** 10/11/2025  
**Sintoma:** Mesmo após corrigir o erro 500, o navegador fazia **centenas de requisições por segundo**, travando a aplicação.

### 🐛 Causa Raiz

O hook `useApi` tinha um **loop infinito de dependências**:

```typescript
// ❌ PROBLEMA:
const fetchData = useCallback(async () => {
  const result = await apiCall();
  // ...
}, [apiCall, onSuccess, onError]); // Essas funções mudam a cada render!

useEffect(() => {
  fetchData(); // Re-executa infinitamente
}, [fetchData]);
```

**O que acontecia:**
1. `apiCall`, `onSuccess`, `onError` são funções passadas como props
2. React recria essas funções a cada render
3. `fetchData` depende delas → é recriado também
4. `useEffect` detecta mudança em `fetchData` → executa novamente
5. Volta ao passo 1 → **LOOP INFINITO** 🔄

### ✅ Solução Implementada

**1. Uso de `useRef` para estabilizar funções:**
```typescript
// ✅ SOLUÇÃO: Refs não causam re-render
const apiCallRef = useRef(apiCall);
const onSuccessRef = useRef(onSuccess);
const onErrorRef = useRef(onError);

// Atualizar refs quando funções mudarem (sem causar re-render)
useEffect(() => { apiCallRef.current = apiCall; }, [apiCall]);

const fetchData = useCallback(async () => {
  const result = await apiCallRef.current(); // Usa ref estável
  // ...
}, []); // ✅ SEM DEPENDÊNCIAS = função estável!
```

**2. Controle explícito via `deps`:**
```typescript
// ✅ deps controla quando re-executar
useEffect(() => {
  fetchData();
}, deps); // Apenas quando deps mudar!
```

**3. Aplicação nos hooks de domínio:**
```typescript
// useOrdensServico
deps: [filters?.status, filters?.tipo] // Só refetch se filtros mudarem

// useOrdemServico  
deps: [osId] // Só refetch se ID mudar

// useEtapasOS
deps: [osId] // Só refetch se ID mudar
```

### 📝 Arquivos Modificados

1. **`/lib/hooks/use-api.ts`**
   - ✅ Adicionado sistema de `useRef` para estabilizar callbacks
   - ✅ Implementado parâmetro `deps` para controle explícito
   - ✅ `fetchData` agora é estável (sem dependências)
   - ✅ Logs melhorados: `🔄 Iniciando requisição API...`

2. **`/lib/hooks/use-ordens-servico.ts`**
   - ✅ `useOrdensServico`: deps `[filters?.status, filters?.tipo]`
   - ✅ `useOrdemServico`: deps `[osId]`
   - ✅ `useEtapasOS`: deps `[osId]`

3. **`/LOADING_ISSUE_FIX.md`**
   - ✅ Documentação completa da solução

### 🎯 Resultado

- ✅ **1 requisição** ao carregar a página (ao invés de infinitas)
- ✅ Nova requisição **apenas** quando:
  - Usuário clica em "Atualizar" (botão refresh)
  - Filtros de status/tipo mudam
  - ID da OS muda (navegação)
- ✅ Performance restaurada
- ✅ Console limpo, sem spam de logs

---

**Com essas mudanças, você conseguirá ver EXATAMENTE onde o problema está ocorrendo através dos logs do console!** 🎯
