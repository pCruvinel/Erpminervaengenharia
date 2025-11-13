# 🎯 Plano: Integração Follow-up com Supabase

**Data:** 10/11/2025  
**Objetivo:** Salvar dados das etapas no banco de dados Supabase  
**Status:** 📋 PLANEJAMENTO

---

## 📊 Situação Atual vs Objetivo

### ❌ ATUAL (Dados apenas em memória)
```
┌─────────────────────────────────────────┐
│ Usuário preenche Follow-up 1           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Dados salvos em useState (React)       │
│ → etapa3Data (memória local)           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Se recarregar página: ❌ DADOS PERDIDOS │
└─────────────────────────────────────────┘
```

---

### ✅ OBJETIVO (Dados persistidos)
```
┌─────────────────────────────────────────┐
│ Usuário preenche Follow-up 1           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Opção 1: Clica "Salvar Rascunho"      │
│ Opção 2: Clica "Avançar"               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ POST/PUT para API Supabase             │
│ → /ordens-servico/:osId/etapas         │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Dados salvos na tabela os_etapas       │
│ → campo dados_formulario (JSONB)       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ Recarrega página: ✅ DADOS RECUPERADOS │
└─────────────────────────────────────────┘
```

---

## 🏗️ Arquitetura da Solução

### 1️⃣ Hook Personalizado: `use-etapas.ts`

**Localização:** `/lib/hooks/use-etapas.ts`

**Responsabilidades:**
- ✅ Buscar etapas de uma OS
- ✅ Criar nova etapa
- ✅ Atualizar etapa existente
- ✅ Gerenciar loading e errors
- ✅ Cache local (opcional)

**Interface:**
```typescript
interface UseEtapasReturn {
  // Estado
  etapas: OsEtapa[] | null;
  isLoading: boolean;
  error: string | null;
  
  // Ações
  fetchEtapas: (osId: string) => Promise<void>;
  createEtapa: (osId: string, data: CreateEtapaData) => Promise<OsEtapa>;
  updateEtapa: (etapaId: string, data: UpdateEtapaData) => Promise<OsEtapa>;
  saveFormData: (etapaId: string, formData: any) => Promise<void>;
}
```

---

### 2️⃣ Estrutura de Dados no Banco

**Tabela:** `os_etapas`

**Campos principais:**
```sql
os_etapas
├── id (uuid, PK)
├── os_id (uuid, FK → ordens_servico)
├── ordem (int) -- Número da etapa (1, 2, 3...)
├── nome (text) -- "Follow-up 1", "Follow-up 2"...
├── status (text) -- "pendente", "em_andamento", "concluida"
├── dados_formulario (jsonb) -- ⭐ ONDE SALVAR OS DADOS
├── responsavel_id (uuid, FK)
├── aprovador_id (uuid, FK)
├── data_inicio (timestamptz)
├── data_conclusao (timestamptz)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

**Exemplo de `dados_formulario` para Follow-up 1:**
```json
{
  "idadeEdificacao": "5 a 10 anos",
  "motivoProcura": "Infiltração na fachada...",
  "quandoAconteceu": "Há 6 meses, após chuvas fortes...",
  "oqueFeitoARespeito": "Tentamos aplicar impermeabilizante...",
  "existeEscopo": "Não, precisamos de diagnóstico técnico",
  "previsaoOrcamentaria": "Entre R$ 50.000 e R$ 100.000",
  "grauUrgencia": "30 dias",
  "apresentacaoProposta": "Sim, concordo. Dia 15/11 às 14h",
  "nomeContatoLocal": "João Silva",
  "telefoneContatoLocal": "(11) 98765-4321",
  "cargoContatoLocal": "Síndico"
}
```

---

### 3️⃣ Fluxo de Salvamento

#### **Cenário A: Salvar ao Avançar Etapa**

```
┌─────────────────────────────────────────┐
│ 1. Usuário preenche formulário         │
│    Follow-up 1 (Etapa 3)               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. Clica botão "Avançar"               │
│    (WorkflowFooter)                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Trigger: handleNext()               │
│    em os-details-workflow-page.tsx     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Validar campos obrigatórios         │
│    ✅ Todos preenchidos?                │
└─────────────────────────────────────────┘
              ↓ SIM
┌─────────────────────────────────────────┐
│ 5. Chamar saveEtapaData(3, etapa3Data) │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 6. Hook: updateEtapa(etapaId, {        │
│      dados_formulario: etapa3Data,     │
│      status: 'concluida'               │
│    })                                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 7. API: PUT /etapas/:id                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 8. Sucesso: setCurrentStep(4)         │
│    (Avançar para próxima etapa)        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 9. Toast: "Dados salvos com sucesso!"  │
└─────────────────────────────────────────┘
```

---

#### **Cenário B: Salvar Rascunho (sem avançar)**

```
┌─────────────────────────────────────────┐
│ 1. Usuário preenche PARCIALMENTE       │
│    Follow-up 1 (Etapa 3)               │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. Clica botão "Salvar Rascunho"      │
│    (WorkflowFooter)                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Trigger: handleSaveRascunho()       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. NÃO validar campos obrigatórios     │
│    (permite salvar incompleto)         │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 5. Chamar saveEtapaRascunho(3, data)  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 6. Hook: updateEtapa(etapaId, {        │
│      dados_formulario: etapa3Data,     │
│      status: 'em_andamento' ⭐         │
│    })                                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 7. API: PUT /etapas/:id                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 8. Sucesso: NÃO avança etapa           │
│    (permanece na mesma)                │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 9. Toast: "Rascunho salvo!"            │
└─────────────────────────────────────────┘
```

---

### 4️⃣ Recuperação de Dados ao Carregar Página

```
┌─────────────────────────────────────────┐
│ 1. Usuário acessa /os/:id/workflow     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. useEffect() carrega dados da OS     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. fetchEtapas(osId)                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. API: GET /ordens-servico/:id/etapas │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 5. Retorna array de etapas:           │
│    [                                    │
│      { ordem: 1, dados_formulario: {...} },│
│      { ordem: 2, dados_formulario: {...} },│
│      { ordem: 3, dados_formulario: {...} } │
│    ]                                    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 6. Preencher estados locais:          │
│    setEtapa1Data(etapas[0].dados_form) │
│    setEtapa2Data(etapas[1].dados_form) │
│    setEtapa3Data(etapas[2].dados_form) │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 7. Formulários preenchidos! ✅         │
└─────────────────────────────────────────┘
```

---

## 🚀 Implementação - Ordem de Execução

### **Fase 1: Criar Hook** ✅
**Arquivo:** `/lib/hooks/use-etapas.ts`

```typescript
export function useEtapas() {
  const [etapas, setEtapas] = useState<OsEtapa[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEtapas = async (osId: string) => { ... };
  const createEtapa = async (osId: string, data: any) => { ... };
  const updateEtapa = async (etapaId: string, data: any) => { ... };
  const saveFormData = async (etapaId: string, formData: any) => { ... };

  return { etapas, isLoading, error, fetchEtapas, createEtapa, updateEtapa, saveFormData };
}
```

---

### **Fase 2: Atualizar Workflow** ✅
**Arquivo:** `/components/os/os-details-workflow-page.tsx`

**Mudanças:**
1. Importar `useEtapas` hook
2. No `useEffect`, buscar etapas da OS
3. Preencher estados locais com dados do banco
4. Criar função `saveEtapaData(ordem, data)`
5. Chamar `saveEtapaData` no `handleNext()`

---

### **Fase 3: Criar Botão "Salvar Rascunho"** ✅
**Arquivo:** `/components/os/workflow-footer.tsx`

**Mudanças:**
1. Adicionar prop `onSaveRascunho?: () => void`
2. Adicionar botão "Salvar Rascunho" (só visível em certas etapas)
3. Estilizar botão (secondary, outline)

---

### **Fase 4: Implementar Salvamento** ✅
**Arquivo:** `/components/os/os-details-workflow-page.tsx`

**Funções:**
```typescript
// Salvar ao avançar (com validação)
const handleNext = async () => {
  // 1. Validar campos obrigatórios
  if (!validarCamposObrigatorios(currentStep)) {
    toast.error("Preencha os campos obrigatórios");
    return;
  }
  
  // 2. Salvar dados da etapa atual
  await saveEtapaData(currentStep, getCurrentStepData());
  
  // 3. Avançar para próxima etapa
  setCurrentStep(currentStep + 1);
  
  // 4. Toast de sucesso
  toast.success("Dados salvos com sucesso!");
};

// Salvar rascunho (sem validação)
const handleSaveRascunho = async () => {
  try {
    await saveEtapaRascunho(currentStep, getCurrentStepData());
    toast.success("Rascunho salvo!");
  } catch (err) {
    toast.error("Erro ao salvar rascunho");
  }
};
```

---

### **Fase 5: Documentação** ✅
**Arquivo:** `/INTEGRACAO_ETAPAS_SUPABASE.md`

Documentar:
- Como funciona o hook
- Estrutura de dados
- Fluxos de salvamento
- Exemplos de uso
- Troubleshooting

---

## 🎯 Estados da Etapa

| Status | Significado | Quando Acontece |
|--------|-------------|-----------------|
| `pendente` | Etapa não iniciada | Criação da OS |
| `em_andamento` | Etapa parcialmente preenchida | Salvar rascunho |
| `concluida` | Etapa totalmente preenchida | Clicar "Avançar" após validação |
| `aprovada` | Etapa aprovada pelo gestor | Fluxo de aprovação (futuro) |
| `rejeitada` | Etapa rejeitada pelo gestor | Fluxo de aprovação (futuro) |

---

## 🔄 Mapeamento: Etapa → Ordem

| Etapa | Nome | Ordem | Componente |
|-------|------|-------|------------|
| 1 | Identificação do Lead | 1 | `StepIdentificacaoLeadCompleto` |
| 2 | Seleção de Tipo de Assessoria | 2 | *(condicional OS 07-13)* |
| 3 | **Follow-up 1** | **3** | `StepFollowup1` ⭐ |
| 4 | Agendar Visita | 4 | `StepAgendarVisita` |
| 5 | Realizar Visita | 5 | *(confirmação simples)* |
| 6 | Follow-up 2 | 6 | `StepFollowup2` |
| 7 | Memorial/Escopo | 7 | `StepMemorialEscopo` |
| 8 | Precificação | 8 | `StepPrecificacao` |
| 9 | Gerar Proposta | 9 | `StepGerarPropostaOS0104` |
| ... | ... | ... | ... |

---

## 📝 Validações por Etapa

### **Etapa 3 - Follow-up 1**

**Campos Obrigatórios (não pode avançar sem):**
- ✅ `idadeEdificacao`
- ✅ `motivoProcura`
- ✅ `quandoAconteceu`
- ✅ `grauUrgencia`
- ✅ `apresentacaoProposta`
- ✅ `nomeContatoLocal`
- ✅ `telefoneContatoLocal`

**Campos Opcionais (pode salvar rascunho sem):**
- ⚪ `oqueFeitoARespeito`
- ⚪ `existeEscopo`
- ⚪ `previsaoOrcamentaria`
- ⚪ `cargoContatoLocal`

---

## 🎨 UI/UX do Botão "Salvar Rascunho"

### **WorkflowFooter - Layout**

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [← Voltar]    [Salvar Rascunho]          [Avançar →]  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### **Comportamento:**

| Botão | Ação | Validação | Status da Etapa |
|-------|------|-----------|-----------------|
| **Voltar** | `currentStep--` | ❌ Não | Mantém atual |
| **Salvar Rascunho** | Salva no banco | ❌ Não | `em_andamento` |
| **Avançar** | Salva + `currentStep++` | ✅ Sim | `concluida` |

### **Visibilidade do Botão "Salvar Rascunho":**

| Etapa | Exibir Botão? | Motivo |
|-------|---------------|--------|
| 1 - Identificação | ❌ Não | Obrigatória (já tem auto-save) |
| 2 - Tipo Assessoria | ❌ Não | Apenas seleção simples |
| 3 - Follow-up 1 | ✅ **Sim** | Formulário extenso |
| 4 - Agendar Visita | ❌ Não | Apenas data/hora |
| 5 - Realizar Visita | ❌ Não | Apenas confirmação |
| 6 - Follow-up 2 | ✅ **Sim** | Formulário extenso |
| 7 - Memorial/Escopo | ✅ **Sim** | Formulário extenso |
| 8 - Precificação | ✅ **Sim** | Tabela de valores |
| 9 - Gerar Proposta | ❌ Não | Apenas visualização |

**Regra Geral:** Exibir "Salvar Rascunho" apenas em etapas com **formulários extensos**.

---

## 🐛 Tratamento de Erros

### **Cenário 1: Erro ao Salvar**
```typescript
try {
  await updateEtapa(etapaId, data);
  toast.success("Dados salvos com sucesso!");
} catch (error) {
  console.error("Erro ao salvar etapa:", error);
  toast.error("Erro ao salvar dados. Tente novamente.");
  // NÃO avança para próxima etapa
}
```

### **Cenário 2: Conexão Perdida**
```typescript
if (!navigator.onLine) {
  toast.error("Sem conexão com a internet. Dados não foram salvos.");
  return;
}
```

### **Cenário 3: Timeout**
```typescript
const timeout = setTimeout(() => {
  toast.error("Tempo esgotado. Tente novamente.");
}, 10000); // 10 segundos

await updateEtapa(etapaId, data);
clearTimeout(timeout);
```

---

## ✅ Checklist de Implementação

### **Fase 1: Hook** ✅
- [ ] Criar `/lib/hooks/use-etapas.ts`
- [ ] Implementar `fetchEtapas()`
- [ ] Implementar `createEtapa()`
- [ ] Implementar `updateEtapa()`
- [ ] Implementar `saveFormData()`
- [ ] Adicionar tratamento de erros
- [ ] Adicionar loading states

### **Fase 2: Workflow** ✅
- [ ] Importar hook em `os-details-workflow-page.tsx`
- [ ] Buscar etapas ao carregar página
- [ ] Preencher estados locais com dados do banco
- [ ] Criar função `saveEtapaData()`
- [ ] Criar função `saveEtapaRascunho()`
- [ ] Integrar com `handleNext()`

### **Fase 3: Footer** ✅
- [ ] Adicionar prop `onSaveRascunho` em `workflow-footer.tsx`
- [ ] Adicionar botão "Salvar Rascunho"
- [ ] Implementar lógica de visibilidade
- [ ] Estilizar botão (variant outline)

### **Fase 4: Validações** ✅
- [ ] Criar função `validarCamposObrigatoriosEtapa3()`
- [ ] Integrar validação no `handleNext()`
- [ ] Exibir toast de erro se campos faltando

### **Fase 5: Testes** ✅
- [ ] Testar salvar rascunho
- [ ] Testar avançar etapa (com validação)
- [ ] Testar recuperar dados ao recarregar
- [ ] Testar cenários de erro

### **Fase 6: Documentação** ✅
- [ ] Criar `INTEGRACAO_ETAPAS_SUPABASE.md`
- [ ] Documentar fluxos
- [ ] Adicionar exemplos de código
- [ ] Documentar troubleshooting

---

## 📈 Próximos Passos (Futuro)

### **Melhorias Futuras:**

1. **Auto-save Inteligente**
   - Salvar automaticamente a cada 30 segundos
   - Usar debounce para não sobrecarregar API
   - Indicador visual "Salvando..." / "Salvo"

2. **Histórico de Versões**
   - Tabela `os_etapas_historico`
   - Salvar cada alteração com timestamp
   - Permitir reverter para versão anterior

3. **Modo Offline**
   - Usar IndexedDB para armazenar temporariamente
   - Sincronizar quando conexão voltar
   - Indicador "Modo Offline"

4. **Validação em Tempo Real**
   - Marcar campos obrigatórios em vermelho
   - Mostrar contador de campos faltantes
   - Barra de progresso da etapa

5. **Colaboração em Tempo Real**
   - WebSockets para atualização live
   - Mostrar quem está editando
   - Prevenir conflitos de edição

---

## 🎯 Resumo Executivo

**O QUE VAMOS FAZER:**
Integrar o componente Follow-up 1 com o Supabase para salvar dados persistentemente.

**COMO:**
1. Criar hook `use-etapas.ts` para comunicação com API
2. Atualizar workflow para buscar/salvar dados automaticamente
3. Adicionar botão "Salvar Rascunho" (sem validação)
4. Botão "Avançar" valida e salva (com validação)

**BENEFÍCIOS:**
- ✅ Dados não perdidos ao recarregar página
- ✅ Possibilidade de pausar e continuar depois
- ✅ Rascunhos salvos sem obrigar completar tudo
- ✅ Histórico de preenchimento
- ✅ Base para aprovações futuras

**IMPACTO:**
- 📝 Melhora significativa na UX
- 🔒 Dados seguros e persistentes
- 🚀 Base para funcionalidades avançadas
- ⚡ Sistema profissional e confiável

---

**Próximo Passo:** Implementar Fase 1 (Hook) ✅
