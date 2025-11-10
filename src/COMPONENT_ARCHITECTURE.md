# 🏗️ Arquitetura de Componentes - Minerva ERP

**Versão**: 1.0  
**Data**: 2024-01-09  

---

## 🎯 Regra Principal

⚠️ **INSTRUÇÃO DE ARQUITETURA**: Quando qualquer Nome de Componente deste dicionário for mencionado em um prompt:

✅ **DEVE**: Usar o componente exato conforme definido  
❌ **NÃO DEVE**: Recriar os campos manualmente  

---

## 📂 Estrutura de Pastas

```
components/os/steps/
├── shared/                      ← Componentes compartilhados entre fluxos
│   ├── step-identificacao-lead.tsx
│   ├── step-followup-1.tsx
│   ├── step-followup-2.tsx       (a criar)
│   ├── step-memorial-escopo.tsx  (a criar)
│   ├── step-precificacao.tsx
│   ├── step-gerar-proposta.tsx
│   ├── step-agendar-apresentacao.tsx
│   ├── step-realizar-apresentacao.tsx
│   ├── step-followup-3.tsx
│   ├── step-gerar-contrato.tsx
│   └── step-contrato-assinado.tsx
│
└── assessoria/                  ← Componentes específicos de Assessoria (OS 05-06)
    ├── step-selecao-tipo-assessoria.tsx
    ├── step-memorial-escopo-assessoria.tsx
    └── step-ativar-contrato-assessoria.tsx
```

---

## 📋 Índice Rápido de Componentes

### Componentes Compartilhados (`/shared`)

| # | Nome do Componente | Arquivo | Usado em | Props Principais | Status |
|---|-------------------|---------|----------|------------------|--------|
| 1 | `StepIdentificacaoLead` | `step-identificacao-lead.tsx` | OS 01-04 (Etapa 1) | `selectedLeadId`, `formData`, `onSelectLead`, `onSaveNewLead` | ✅ |
| 2 | `StepFollowUp1` | `step-followup-1.tsx` | OS 01-04 (Etapa 3), OS 05-06 (Etapa 3) | `data` (11 perguntas), `onDataChange` | ✅ |
| 3 | `StepFollowUp2` | `step-followup-2.tsx` | OS 01-04 (Etapa 6) | `data` (3 momentos), `onDataChange` | ✅ |
| 4 | `StepMemorialEscopo` | `step-memorial-escopo.tsx` | OS 01-04 (Etapa 8) | `data.etapasPrincipais`, `onAdicionarEtapa`, `calcularExecucao` | ✅ |
| 5 | `StepPrecificacao` | `step-precificacao.tsx` | OS 01-04 (Etapa 9) | `data.percentuais`, `calcularValorAtual`, `calcularParcelas` | ✅ |
| 6 | `StepGerarProposta` | `step-gerar-proposta.tsx` | OS 01-04 (Etapa 10) | `onVisualizarProposta` | ✅ |
| 7 | `StepAgendarApresentacao` | `step-agendar-apresentacao.tsx` | OS 01-04 (Etapa 11) | `dataAgendamento`, `onAgendar` | ✅ |
| 8 | `StepRealizarApresentacao` | `step-realizar-apresentacao.tsx` | OS 01-04 (Etapa 12) | `apresentacaoRealizada`, `onConfirmar` | ✅ |
| 9 | `StepFollowUp3` | `step-followup-3.tsx` | OS 01-04 (Etapa 13) | `data` (3 momentos), `onDataChange` | ✅ |
| 10 | `StepGerarContrato` | `step-gerar-contrato.tsx` | OS 01-04 (Etapa 14) | `contratoFile`, `onDownload`, `onUpload` | ✅ |
| 11 | `StepContratoAssinado` | `step-contrato-assinado.tsx` | OS 01-04 (Etapa 15) | `contratoAssinado`, `onConfirmar` | ✅ |

### Componentes de Assessoria (`/assessoria`)

| # | Nome do Componente | Arquivo | Usado em | Props Principais | Status |
|---|-------------------|---------|----------|------------------|--------|
| 1 | `StepSelecaoTipoAssessoria` | `step-selecao-tipo-assessoria.tsx` | OS 05-06 (Etapa 2) | `tipoAssessoria`, `onSelect` | ✅ |
| 2 | `StepMemorialEscopoAssessoria` | `step-memorial-escopo-assessoria.tsx` | OS 05-06 (Etapa 4) | `data.escopo`, `onDataChange` | ✅ |
| 3 | `StepAtivarContratoAssessoria` | `step-ativar-contrato-assessoria.tsx` | OS 05-06 (Etapa 5) | `contratoAtivado`, `onAtivar` | ✅ |

---

## 🔍 Mapeamento de Fluxos

### Fluxo OS 01-04 (Lead → Cliente - 16 etapas)

```
Etapa 1  → StepIdentificacaoLead
Etapa 2  → [Específico: Seleção Tipo OS]
Etapa 3  → StepFollowUp1
Etapa 4  → [Específico: Agendar Visita Técnica]
Etapa 5  → [Específico: Realizar Visita]
Etapa 6  → StepFollowUp2
Etapa 7  → [Específico: Upload Memorial]
Etapa 8  → StepMemorialEscopo
Etapa 9  → StepPrecificacao
Etapa 10 → StepGerarProposta
Etapa 11 → StepAgendarApresentacao
Etapa 12 → StepRealizarApresentacao
Etapa 13 → StepFollowUp3
Etapa 14 → StepGerarContrato
Etapa 15 → StepContratoAssinado
Etapa 16 → [Específico: Iniciar Contrato de Obra]
```

### Fluxo OS 05-06 (Assessoria - 5 etapas)

```
Etapa 1  → [Específico: Identificação Cliente]
Etapa 2  → StepSelecaoTipoAssessoria
Etapa 3  → StepFollowUp1 (compartilhado)
Etapa 4  → StepMemorialEscopoAssessoria
Etapa 5  → StepAtivarContratoAssessoria
```

---

## 🎨 Convenções de Design

### Cores Padrão

```tsx
// Usar inline styles ou classes Tailwind
const buttonPrimary = { backgroundColor: '#06b6d4', color: 'white' };      // Cyan
const buttonSecondary = { backgroundColor: '#f97316', color: 'white' };    // Laranja
const buttonGold = { backgroundColor: '#D3AF37', color: 'white' };         // Dourado
```

### Alerts

```tsx
// Informação (Cyan)
<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertDescription>Mensagem informativa</AlertDescription>
</Alert>

// Aviso (Amarelo)
<Alert className="border-yellow-200 bg-yellow-50">
  <AlertCircle className="h-4 w-4 text-yellow-600" />
  <AlertDescription className="text-yellow-700">
    <strong>Atenção:</strong> Mensagem de aviso
  </AlertDescription>
</Alert>

// Sucesso (Verde)
<Card className="bg-green-50 border-green-200">
  <CardContent className="pt-6">
    <div className="flex items-center gap-3">
      <Check className="h-5 w-5 text-green-600" />
      <div>
        <p className="text-sm font-medium">Título de sucesso</p>
        <p className="text-sm text-muted-foreground">Detalhes</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### Campos Obrigatórios

```tsx
<Label htmlFor="campo">
  Nome do Campo <span className="text-destructive">*</span>
</Label>
```

### Upload de Arquivos

```tsx
<div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
  <p className="text-sm text-muted-foreground">Clique para selecionar ou arraste arquivos aqui</p>
  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (máx. 10MB)</p>
</div>
```

### Botões Centralizados com Ícone

```tsx
<div className="flex flex-col items-center justify-center py-12 gap-6">
  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
    <Calendar className="h-10 w-10 text-primary" />
  </div>
  <div className="text-center">
    <h3 className="font-medium mb-2">Título da Ação</h3>
    <p className="text-sm text-muted-foreground mb-4">Descrição da ação</p>
    <Button style={{ backgroundColor: '#06b6d4', color: 'white' }}>
      <Calendar className="h-4 w-4 mr-2" />
      Texto do Botão
    </Button>
  </div>
</div>
```

---

## 🔄 Fluxo de Dados

### Pattern de Props (Lifting State Up)

Todos os componentes seguem o padrão **controlled components**:

```tsx
// ✅ BOM: Estado no pai, componente recebe via props
function ParentComponent() {
  const [data, setData] = useState({ campo1: '', campo2: '' });
  
  return (
    <StepComponent 
      data={data} 
      onDataChange={setData} 
    />
  );
}

// No componente filho
function StepComponent({ data, onDataChange }) {
  return (
    <Input 
      value={data.campo1} 
      onChange={(e) => onDataChange({ ...data, campo1: e.target.value })} 
    />
  );
}
```

### Pattern de Handlers

```tsx
// ✅ BOM: Callbacks específicos
<StepIdentificacaoLead
  onSelectLead={handleSelectLead}           // (leadId: string) => void
  onSaveNewLead={handleSaveNewLead}         // () => void
  onShowDialogChange={setShowDialog}        // (show: boolean) => void
/>

// ✅ BOM: Callback genérico para forms
<StepFollowUp1
  data={etapa3Data}
  onDataChange={setEtapa3Data}              // (data: any) => void
/>
```

---

## 📦 Exportação e Importação

### Pattern de Exportação

```tsx
// Em step-identificacao-lead.tsx
export function StepIdentificacaoLead(props: StepIdentificacaoLeadProps) {
  // ... implementação
}
```

### Pattern de Importação

```tsx
// Em os-details-workflow-page.tsx
import { StepIdentificacaoLead } from './steps/shared/step-identificacao-lead';
import { StepFollowUp1 } from './steps/shared/step-followup-1';
import { StepPrecificacao } from './steps/shared/step-precificacao';
```

---

## 🧪 Validação de Campos

### Campos Obrigatórios

```tsx
// Validação básica antes de avançar etapa
const isStepValid = () => {
  if (currentStep === 1) {
    return selectedLeadId !== '';
  }
  if (currentStep === 3) {
    return (
      etapa3Data.idadeEdificacao !== '' &&
      etapa3Data.motivoProcura !== '' &&
      etapa3Data.quandoAconteceu !== '' &&
      etapa3Data.grauUrgencia !== '' &&
      etapa3Data.apresentacaoProposta !== '' &&
      etapa3Data.nomeContatoLocal !== '' &&
      etapa3Data.telefoneContatoLocal !== ''
    );
  }
  return true;
};
```

---

## 📚 Documentação Completa

Para detalhes completos de cada componente, consulte:

📖 **[FLOW_COMPONENTS_DICTIONARY.md](./FLOW_COMPONENTS_DICTIONARY.md)**  
Contém:
- Definição completa de cada componente
- Interface TypeScript (Props)
- Estrutura UI detalhada
- Campos e validações
- Design System compliance
- Exemplos de código

---

## ✅ Checklist de Criação de Componente

Ao criar um novo componente de fluxo:

- [ ] Nome do arquivo em kebab-case (`step-nome-do-componente.tsx`)
- [ ] Nome da função em PascalCase (`StepNomeDoComponente`)
- [ ] Interface de Props definida (`StepNomeDoComponenteProps`)
- [ ] Props documentadas com comentários
- [ ] Componente segue padrão controlled (recebe `data` e `onDataChange`)
- [ ] Alert de contexto no início do componente
- [ ] Campos obrigatórios marcados com `<span className="text-destructive">*</span>`
- [ ] Design System compliance (cores, spacing, tipografia)
- [ ] Documentado no `FLOW_COMPONENTS_DICTIONARY.md`
- [ ] Adicionado ao índice neste arquivo
- [ ] Testado em ambos os fluxos (se compartilhado)

---

## 🎛️ WorkflowStepper - Componente de Navegação

### 📋 Visão Geral

O componente `WorkflowStepper` é um stepper horizontal reutilizável para visualizar o progresso de fluxos de trabalho de Ordens de Serviço (OS).

**Localização:** `/components/os/workflow-stepper.tsx`

### ✨ Características

- ✅ **Responsivo**: Se ajusta automaticamente à largura da tela
- ✅ **Estados visuais**: Completo (✓ verde), Atual (● dourado), Bloqueado (🔒 cinza)
- ✅ **Navegável**: Permite clicar em etapas já acessadas
- ✅ **Acessibilidade**: Suporte a `aria-labels` e estados ARIA
- ✅ **Tipado**: TypeScript com interfaces exportadas
- ✅ **Customizável**: Aceita classes CSS adicionais

### 🎯 Interface TypeScript

```typescript
interface WorkflowStep {
  id: number;           // ID único da etapa (ex: 1, 2, 3...)
  title: string;        // Título completo (ex: "Identificação do Cliente/Lead")
  short: string;        // Versão curta para exibição (ex: "Lead")
  responsible?: string; // Responsável pela etapa (ex: "ADM", "Obras")
  status?: 'pending' | 'active' | 'completed'; // Status (opcional)
}

interface WorkflowStepperProps {
  steps: WorkflowStep[];           // Array de etapas
  currentStep: number;             // ID da etapa atual
  onStepClick?: (stepId: number) => void; // Callback ao clicar
  className?: string;              // Classes CSS adicionais
}
```

### 📚 Exemplo de Uso Básico

```tsx
import { WorkflowStepper, WorkflowStep } from './components/os/workflow-stepper';

const steps: WorkflowStep[] = [
  { id: 1, title: 'Identificação do Cliente/Lead', short: 'Lead', responsible: 'ADM' },
  { id: 2, title: 'Seleção do Tipo de OS', short: 'Tipo OS', responsible: 'ADM' },
  { id: 3, title: 'Follow-up 1', short: 'Follow-up 1', responsible: 'ADM' },
  // ... mais etapas
];

function OSWorkflowPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="h-screen flex flex-col">
      <WorkflowStepper 
        steps={steps}
        currentStep={currentStep}
        onStepClick={(stepId) => setCurrentStep(stepId)}
      />
      {/* Conteúdo da página */}
    </div>
  );
}
```

### 🎨 Estados Visuais

| Estado | Ícone | Cor de Fundo | Descrição |
|--------|-------|--------------|-----------|
| **Completo** | ✓ | `bg-green-100` | Etapa já concluída (stepId < currentStep) |
| **Atual** | ● | `bg-primary/20` | Etapa em andamento (stepId === currentStep) |
| **Bloqueado** | 🔒 | `bg-neutral-100` | Etapa futura (stepId > currentStep) |

**Conectores (linhas):**
- **Verde** (`bg-green-400`): Entre etapas concluídas
- **Cinza** (`bg-neutral-200`): Entre etapas futuras/atuais

**Interatividade:**
- **Clicável**: Etapas até a atual (`stepId <= currentStep`)
- **Hover**: Fundo `bg-muted` em etapas acessíveis
- **Desabilitado**: Etapas futuras com `opacity-50` e `cursor-not-allowed`

### 📐 Layout Responsivo

O componente usa **`flex-1`** nos botões e conectores, garantindo:

- ✅ Distribuição uniforme em telas pequenas (laptops 1366px)
- ✅ Expansão proporcional em telas grandes (ultrawide 3440px)
- ✅ Conectores totalmente flexíveis (largura mínima 8px, sem limite máximo)
- ✅ Sempre ocupa 100% da largura disponível (independente do número de etapas)
- ✅ Sem scroll horizontal (substitui o `ScrollArea` antigo)

### 🔧 Lógica de Acessibilidade

```tsx
const isCompleted = step.id < currentStep;
const isCurrent = step.id === currentStep;
const isAccessible = step.id <= currentStep; // Permite navegar até a etapa atual
```

**Atributos ARIA:**
```tsx
aria-label={`${step.title} - Etapa ${step.id}`}
aria-current={isCurrent ? 'step' : undefined}
```

### 📚 Exemplos de Uso por Fluxo

#### Fluxo OS 01-04 (16 etapas - Lead até Obra)

```tsx
const stepsOS0104: WorkflowStep[] = [
  { id: 1, title: 'Identificação do Cliente/Lead', short: 'Lead', responsible: 'ADM' },
  { id: 2, title: 'Seleção do Tipo de OS', short: 'Tipo OS', responsible: 'ADM' },
  { id: 3, title: 'Follow-up 1 (Entrevista Inicial)', short: 'Follow-up 1', responsible: 'ADM' },
  { id: 4, title: 'Agendar Visita Técnica', short: 'Agendar', responsible: 'ADM' },
  { id: 5, title: 'Realizar Visita', short: 'Visita', responsible: 'Obras' },
  { id: 6, title: 'Follow-up 2 (Pós-Visita)', short: 'Follow-up 2', responsible: 'Obras' },
  { id: 7, title: 'Fazer Memorial (Upload)', short: 'Memorial', responsible: 'Obras' },
  { id: 8, title: 'Formulário Memorial (Escopo)', short: 'Escopo', responsible: 'Obras' },
  { id: 9, title: 'Precificação', short: 'Precificação', responsible: 'Obras' },
  { id: 10, title: 'Gerar Proposta Comercial', short: 'Proposta', responsible: 'ADM' },
  { id: 11, title: 'Agendar Visita (Apresentação)', short: 'Agendar', responsible: 'ADM' },
  { id: 12, title: 'Realizar Visita (Apresentação)', short: 'Apresentação', responsible: 'ADM' },
  { id: 13, title: 'Follow-up 3 (Pós-Apresentação)', short: 'Follow-up 3', responsible: 'ADM' },
  { id: 14, title: 'Gerar Contrato (Upload)', short: 'Contrato', responsible: 'ADM' },
  { id: 15, title: 'Contrato Assinado', short: 'Assinatura', responsible: 'ADM' },
  { id: 16, title: 'Iniciar Contrato de Obra', short: 'Início Obra', responsible: 'Sistema' },
];
```

#### Fluxo OS 05-06 (Obra Simples - 4 etapas)

```tsx
const stepsOS0506: WorkflowStep[] = [
  { id: 1, title: 'Identificação do Cliente', short: 'Cliente', responsible: 'ADM' },
  { id: 2, title: 'Definir Escopo', short: 'Escopo', responsible: 'Obras' },
  { id: 3, title: 'Criar Proposta', short: 'Proposta', responsible: 'ADM' },
  { id: 4, title: 'Iniciar Obra', short: 'Início', responsible: 'Sistema' },
];
```

#### Fluxo Assessoria (5 etapas customizadas)

```tsx
const stepsAssessoria: WorkflowStep[] = [
  { id: 1, title: 'Seleção do Tipo de Assessoria', short: 'Tipo', responsible: 'ADM' },
  { id: 2, title: 'Definir Memorial de Escopo', short: 'Escopo', responsible: 'Assessoria' },
  { id: 3, title: 'Precificação', short: 'Precificação', responsible: 'ADM' },
  { id: 4, title: 'Gerar Contrato', short: 'Contrato', responsible: 'ADM' },
  { id: 5, title: 'Ativar Contrato', short: 'Ativação', responsible: 'Sistema' },
];
```

#### Modo Read-Only (sem navegação)

```tsx
// Apenas visualização, sem callback de clique
<WorkflowStepper 
  steps={stepsOS0104}
  currentStep={5}
  // onStepClick não fornecido = sem navegação
/>
```

### 🎯 Layout Recomendado

```tsx
<div className="h-screen flex flex-col bg-neutral-50">
  {/* Header/Voltar (opcional) */}
  <div className="border-b px-6 py-3">...</div>
  
  {/* WorkflowStepper */}
  <WorkflowStepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
  
  {/* Conteúdo da etapa atual */}
  <div className="flex-1 overflow-hidden">
    <div className="h-full p-6">
      <Card>...</Card>
    </div>
  </div>
  
  {/* Footer com botões (opcional) */}
  <div className="border-t px-6 py-4">...</div>
</div>
```

### 📝 Notas de Implementação

- ⚠️ **IDs devem ser sequenciais**: `1, 2, 3, ...` (não pular números)
- ⚠️ **currentStep deve corresponder a um ID válido**: Evite valores fora do range
- ✅ **Campo `responsible` é opcional**: Use para exibir informações adicionais
- ✅ **Campo `status` é opcional**: Atualmente não é usado pelo componente
- ✅ **Classes customizadas**: Use `className` para ajustes visuais específicos

### ✅ Checklist de Integração

Ao usar o WorkflowStepper em um novo fluxo de OS:

- [ ] Defina o array `steps: WorkflowStep[]` com IDs sequenciais
- [ ] Configure o estado `currentStep` (geralmente começando em 1)
- [ ] Implemente o handler `onStepClick` para navegação
- [ ] Importe e use `<WorkflowStepper />` no layout
- [ ] Teste a navegação clicando nas etapas acessíveis
- [ ] Verifique a responsividade em diferentes tamanhos de tela

### 📦 Exportações

```tsx
export { WorkflowStepper } from './components/os/workflow-stepper';
export type { WorkflowStep, WorkflowStepperProps } from './components/os/workflow-stepper';
```

### 📄 Exemplo Completo

Arquivo de referência completo disponível em:  
`/components/os/os-workflow-simplified-example.tsx`

---

## 🦶 WorkflowFooter - Componente de Navegação Inferior

### 📋 Visão Geral

O componente `WorkflowFooter` é um footer reutilizável para navegação entre etapas de fluxos de trabalho de Ordens de Serviço (OS). Exibe botões de navegação (Anterior/Próximo) e um indicador de progresso.

**Localização:** `/components/os/workflow-footer.tsx`

### ✨ Características

- ✅ **Reutilizável**: Usado em todos os fluxos de OS (01-04, 05-06, etc.)
- ✅ **Customizável**: Textos dos botões configuráveis via props
- ✅ **Indicador de progresso**: Mostra "X / Y" de forma minimalista
- ✅ **Botão de rascunho opcional**: Pode ser ocultado quando não necessário
- ✅ **Estados**: Último passo muda botão para ação final (ex: "Concluir OS")
- ✅ **Desabilitável**: Props para desabilitar navegação quando necessário

### 🎯 Interface TypeScript

```typescript
interface WorkflowFooterProps {
  currentStep: number;        // Etapa atual (1-indexed)
  totalSteps: number;         // Número total de etapas
  onPrevStep: () => void;     // Callback para voltar etapa
  onNextStep: () => void;     // Callback para avançar/concluir
  onSaveDraft?: () => void;   // Callback para salvar rascunho (opcional)
  prevButtonText?: string;    // Texto do botão anterior (default: "Etapa Anterior")
  nextButtonText?: string;    // Texto do botão próximo (default: "Salvar e Continuar")
  finalButtonText?: string;   // Texto botão final (default: "Concluir OS")
  disablePrev?: boolean;      // Desabilitar botão anterior
  disableNext?: boolean;      // Desabilitar botão próximo
  showDraftButton?: boolean;  // Mostrar botão de rascunho (default: true)
}
```

### 📚 Exemplo de Uso Básico

```tsx
import { WorkflowFooter } from './components/os/workflow-footer';

function OSWorkflowPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 16;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Concluir OS
      console.log('OS concluída!');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Conteúdo da página */}
      <div className="flex-1">...</div>
      
      {/* Footer */}
      <WorkflowFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevStep={() => setCurrentStep(Math.max(1, currentStep - 1))}
        onNextStep={handleNextStep}
        onSaveDraft={() => console.log('Salvar rascunho')}
      />
    </div>
  );
}
```

### 🎨 Layout Visual

```
┌────────────────────────────────────────────────────────────────┐
│  [← Etapa Anterior]      1 / 16      [Salvar Rascunho] [Salvar e Continuar →]  │
└────────────────────────────────────────────────────────────────┘
```

**Estrutura:**
- **Esquerda**: Botão "Anterior" (desabilitado na etapa 1)
- **Centro**: Indicador "X / Y" (número atual em negrito)
- **Direita**: Botão "Rascunho" (opcional) + Botão "Próximo/Concluir"

**Cores:**
- **Botão Anterior**: `variant="outline"` (cinza)
- **Botão Rascunho**: `variant="outline"` (cinza)
- **Botão Próximo/Concluir**: `backgroundColor: '#06b6d4'` (cyan)

### 📚 Exemplos de Uso por Fluxo

#### Fluxo OS 01-04 (Workflow Completo)

```tsx
<WorkflowFooter
  currentStep={currentStep}
  totalSteps={16}
  onPrevStep={handlePrevStep}
  onNextStep={handleNextStep}
  onSaveDraft={() => console.log('Salvar rascunho')}
  // Usa textos padrão
/>
```

#### Fluxo OS 05-06 (Assessoria)

```tsx
<WorkflowFooter
  currentStep={currentStep}
  totalSteps={12}
  onPrevStep={handlePrevStep}
  onNextStep={currentStep === 12 ? handleConcluirEtapa : handleNextStep}
  prevButtonText="Anterior"
  nextButtonText="Próxima Etapa"
  finalButtonText="Ativar Contrato"
  showDraftButton={false}  // Sem botão de rascunho
/>
```

#### Com Validação (Desabilitado)

```tsx
<WorkflowFooter
  currentStep={currentStep}
  totalSteps={16}
  onPrevStep={handlePrevStep}
  onNextStep={handleNextStep}
  disableNext={!isCurrentStepValid()}  // Bloqueia se etapa inválida
  onSaveDraft={handleSaveDraft}
/>
```

### 🎯 Comportamento Automático

**Última Etapa:**
- Quando `currentStep === totalSteps`:
  - Botão muda para `finalButtonText` (default: "Concluir OS")
  - Ícone muda de `ChevronRight` para `Check`

**Primeira Etapa:**
- Botão "Anterior" é automaticamente desabilitado quando `currentStep === 1`

**Botão Rascunho:**
- Só aparece se `showDraftButton !== false`
- Útil para fluxos simples que não precisam de autosave

### 📐 Layout Recomendado

```tsx
<div className="h-screen flex flex-col">
  {/* Header/Stepper */}
  <WorkflowStepper steps={steps} currentStep={currentStep} />
  
  {/* Conteúdo scrollável */}
  <div className="flex-1 overflow-auto">
    <Card>
      {/* Conteúdo da etapa atual */}
    </Card>
  </div>
  
  {/* Footer fixo */}
  <WorkflowFooter
    currentStep={currentStep}
    totalSteps={steps.length}
    onPrevStep={handlePrevStep}
    onNextStep={handleNextStep}
  />
</div>
```

### 📝 Notas de Implementação

- ⚠️ **Sempre use `steps.length` para `totalSteps`**: Garante sincronia
- ⚠️ **Handler de navegação**: Implemente lógica de validação antes de chamar `onNextStep`
- ✅ **Botão final customizável**: Use `finalButtonText` para ações específicas por fluxo
- ✅ **Salvar rascunho opcional**: `onSaveDraft` pode ser undefined
- ✅ **Classes CSS**: O footer usa `flex-shrink-0` para garantir altura fixa

### ✅ Checklist de Integração

Ao usar o WorkflowFooter em um novo fluxo de OS:

- [ ] Importar `WorkflowFooter` de `./components/os/workflow-footer`
- [ ] Configurar `currentStep` e `totalSteps`
- [ ] Implementar handlers `onPrevStep` e `onNextStep`
- [ ] Customizar textos dos botões (se necessário)
- [ ] Decidir se mostra botão de rascunho (`showDraftButton`)
- [ ] Testar navegação entre etapas
- [ ] Testar botão final na última etapa

### 📦 Exportações

```tsx
export { WorkflowFooter } from './components/os/workflow-footer';
export type { WorkflowFooterProps } from './components/os/workflow-footer';
```

### 🔗 Integração com WorkflowStepper

**Uso combinado recomendado:**

```tsx
import { WorkflowStepper, WorkflowStep } from './components/os/workflow-stepper';
import { WorkflowFooter } from './components/os/workflow-footer';

const steps: WorkflowStep[] = [...];
const [currentStep, setCurrentStep] = useState(1);

return (
  <div className="h-screen flex flex-col">
    <WorkflowStepper 
      steps={steps} 
      currentStep={currentStep} 
      onStepClick={setCurrentStep}
    />
    <div className="flex-1 overflow-auto">{/* Conteúdo */}</div>
    <WorkflowFooter
      currentStep={currentStep}
      totalSteps={steps.length}
      onPrevStep={() => setCurrentStep(Math.max(1, currentStep - 1))}
      onNextStep={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
    />
  </div>
);
```

---

## 🔘 PrimaryButton - Botão Primário da Minerva

### 📋 Visão Geral

O componente `PrimaryButton` é um botão reutilizável com o estilo visual corporativo da Minerva (dourado #D3AF37). Encapsula todos os estados visuais e efeitos de interação em um único componente consistente.

**Localização:** `/components/ui/primary-button.tsx`

### ✨ Características

- ✅ **Estilo corporativo**: Cor dourada #D3AF37 (Minerva Design System)
- ✅ **Estados visuais**: Hover, Active (clique), Disabled, Loading
- ✅ **Efeitos de interação**: Scale-95 ao clicar, transições de sombra
- ✅ **Acessibilidade**: Cursor pointer, aria-disabled automático
- ✅ **Tipado**: TypeScript com interface exportada
- ✅ **Customizável**: Aceita todas as props do Button shadcn/ui

### 🎯 Interface TypeScript

```typescript
export interface PrimaryButtonProps extends ButtonProps {
  /** Estado de carregamento (mostra texto de loading) */
  loading?: boolean;
  /** Texto alternativo quando loading=true */
  loadingText?: string;
}
```

### 🎨 Estados Visuais

| Estado | Cor de Fundo | Sombra | Escala | Descrição |
|--------|--------------|--------|--------|-----------|
| **Normal** | `#D3AF37` | `shadow-md` | `1` | Estado padrão do botão |
| **Hover** | `#C19F27` | `shadow-lg` | `1` | Ao passar o mouse |
| **Active** | `#C19F27` | `shadow-sm` | `0.95` | Ao clicar (feedback tátil) |
| **Disabled** | `#D3AF37` | `shadow-md` | `1` | Opacidade reduzida (padrão shadcn) |
| **Loading** | `#D3AF37` | `shadow-md` | `1` | Disabled + texto alternativo |

### 📚 Exemplos de Uso

#### Uso Básico

```tsx
import { PrimaryButton } from './components/ui/primary-button';

<PrimaryButton onClick={handleSubmit}>
  Salvar
</PrimaryButton>
```

#### Com Estado de Loading

```tsx
<PrimaryButton 
  loading={isLoading}
  loadingText="Salvando..."
>
  Salvar e Continuar
</PrimaryButton>
```

#### Em Formulários

```tsx
<form onSubmit={handleSubmit}>
  <Input {...} />
  <PrimaryButton 
    type="submit"
    className="w-full"
  >
    Entrar
  </PrimaryButton>
</form>
```

#### Com Ícones (usando Lucide React)

```tsx
import { Save } from 'lucide-react';

<PrimaryButton>
  <Save className="h-4 w-4 mr-2" />
  Salvar
</PrimaryButton>
```

#### Customização de Classes

```tsx
<PrimaryButton 
  className="w-full rounded-md"
  onClick={handleClick}
>
  Botão Customizado
</PrimaryButton>
```

#### Desabilitado

```tsx
<PrimaryButton disabled>
  Ação Indisponível
</PrimaryButton>
```

### 🎨 Design System

**Cores (Minerva Design System v1.0):**
- **Primary:** `#D3AF37` (Dourado)
- **Primary Hover:** `#C19F27` (Dourado escurecido ~10%)
- **Text:** `black` (contraste adequado com fundo dourado)

**Tipografia:**
- **Font Weight:** `font-semibold` (600)
- **Font Size:** Herda do componente `Button` shadcn/ui

**Efeitos:**
- **Transições:** `transition-all duration-200` (200ms suave)
- **Sombras:** `shadow-md` → `shadow-lg` (hover) → `shadow-sm` (active)
- **Escala:** `scale-95` no clique (feedback tátil)

### 🔄 Diferença vs Button Padrão

```tsx
// ❌ ANTES (Button genérico)
<Button
  className="bg-[#D3AF37] text-black hover:bg-[#C19F27] shadow-md hover:shadow-lg active:scale-95 active:shadow-sm transition-all duration-200 cursor-pointer font-semibold"
  disabled={isLoading}
>
  {isLoading ? "Entrando..." : "Entrar"}
</Button>

// ✅ DEPOIS (PrimaryButton)
<PrimaryButton 
  loading={isLoading}
  loadingText="Entrando..."
>
  Entrar
</PrimaryButton>
```

**Benefícios:**
- 🎯 **Consistência**: Todos os botões primários usam o mesmo estilo
- 🧹 **Manutenção**: Atualizar estilo em um único lugar
- 📖 **Legibilidade**: Código mais limpo e semântico
- 🛡️ **Tipo-seguro**: Props específicas para loading state

### 📐 Layout Recomendado

#### Botões de Ação Únicos
```tsx
<div className="flex justify-end gap-3">
  <Button variant="outline">Cancelar</Button>
  <PrimaryButton>Confirmar</PrimaryButton>
</div>
```

#### Botões Full Width (Formulários)
```tsx
<PrimaryButton className="w-full">
  Entrar
</PrimaryButton>
```

#### Botões em Grid
```tsx
<div className="grid grid-cols-2 gap-4">
  <Button variant="outline">Voltar</Button>
  <PrimaryButton>Continuar</PrimaryButton>
</div>
```

### 📝 Notas de Implementação

- ⚠️ **Herda de Button shadcn/ui**: Todas as props do Button são válidas
- ⚠️ **Loading desabilita automaticamente**: Não precisa passar `disabled={loading}`
- ✅ **ForwardRef habilitado**: Pode usar `ref` para acessar o elemento DOM
- ✅ **DisplayName configurado**: Útil para debugging no React DevTools
- ✅ **Tailwind classes personalizáveis**: Use `className` para override

### ✅ Checklist de Uso

Ao usar o PrimaryButton em um novo componente:

- [ ] Importar de `./components/ui/primary-button`
- [ ] Usar para ações primárias (submits, confirmações, CTA)
- [ ] Considerar usar `loading` prop em operações assíncronas
- [ ] Combinar com `Button variant="outline"` para ações secundárias
- [ ] Testar estados: normal, hover, active, disabled, loading
- [ ] Verificar contraste de cores (texto preto em fundo dourado)

### 📦 Exportações

```tsx
export { PrimaryButton } from './components/ui/primary-button';
export type { PrimaryButtonProps } from './components/ui/primary-button';
```

### 🔗 Componentes Relacionados

- **Button (shadcn/ui)**: Componente base do PrimaryButton
- **WorkflowFooter**: Usa botões primários para navegação
- **LoginPage**: Usa PrimaryButton no formulário de login
- **OS Forms**: Deve usar PrimaryButton para submits de formulários

### 📄 Exemplo Completo

```tsx
import { PrimaryButton } from './components/ui/primary-button';
import { Button } from './components/ui/button';
import { useState } from 'react';

function MyForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await saveData();
      toast.success('Dados salvos!');
    } catch (error) {
      toast.error('Erro ao salvar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      
      <div className="flex justify-end gap-3 mt-6">
        <Button 
          variant="outline"
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        
        <PrimaryButton
          type="submit"
          loading={isLoading}
          loadingText="Salvando..."
        >
          Salvar
        </PrimaryButton>
      </div>
    </form>
  );
}
```

---

## 🔮 Próximos Passos

### ✅ Todos os Componentes Criados!

Todos os componentes do dicionário foram implementados com sucesso:
- **11 componentes compartilhados** em `/shared`
- **3 componentes de assessoria** em `/assessoria`
- **2 componentes de navegação** (`WorkflowStepper`, `WorkflowFooter`)
- **Total: 16 componentes reutilizáveis**

### Melhorias Futuras

- [ ] Integração com ViaCEP no formulário de Lead
- [ ] Upload real de arquivos (integração com backend)
- [ ] Validação de CPF/CNPJ
- [ ] Máscaras de input (telefone, CEP, CPF/CNPJ)
- [ ] Sistema de autosave (rascunhos)
- [ ] Histórico de alterações por etapa

---

**Última Atualização**: 2024-01-10  
**Versão**: 1.2  
**Responsável**: Arquitetura Minerva ERP

**Changelog v1.2:**
- ✅ Adicionado componente `WorkflowFooter` para navegação inferior padronizada
- ✅ Implementado indicador de progresso "X / Y" minimalista
- ✅ Componentização completa de todos os elementos de navegação de OS
