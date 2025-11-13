# 📘 Guia Completo de Componentes - Minerva ERP

**Versão**: 2.0  
**Data**: 10/11/2025  
**Status**: ✅ Guia Consolidado Oficial

---

## 📚 Sobre Este Guia

Este documento consolida **toda a documentação de componentes** do Minerva ERP em um único guia de referência para desenvolvedores. Substitui e unifica:

- ✅ COMPONENT_ARCHITECTURE.md
- ✅ COMPONENTIZATION_SUMMARY.md
- ✅ COMPONENTS_CREATED_SUMMARY.md

### 🎯 Objetivo

Fornecer uma **fonte única da verdade** sobre:
- ✅ Arquitetura de componentes de fluxos OS
- ✅ Como usar componentes existentes
- ✅ Como criar novos componentes
- ✅ Padrões de design e código
- ✅ Exemplos práticos e referências

### 👥 Público-Alvo

- **Desenvolvedores** implementando novos fluxos de OS
- **Mantenedores** atualizando componentes existentes
- **Arquitetos** planejando expansão do sistema

---

## 🏗️ Arquitetura de Componentes

### ⚠️ Regra de Ouro

**INSTRUÇÃO DE ARQUITETURA**: Quando qualquer Nome de Componente deste dicionário for mencionado em um prompt:

✅ **DEVE**: Usar o componente exato conforme definido  
❌ **NÃO DEVE**: Recriar os campos manualmente

### 📂 Estrutura de Pastas

```
components/os/
├── steps/
│   ├── shared/                      ← Componentes compartilhados entre fluxos
│   │   ├── step-identificacao-lead-completo.tsx
│   │   ├── step-followup-1.tsx
│   │   ├── step-followup-2.tsx
│   │   ├── step-followup-3.tsx
│   │   ├── step-memorial-escopo.tsx
│   │   ├── step-precificacao.tsx
│   │   ├── step-gerar-proposta.tsx
│   │   ├── step-agendar-apresentacao.tsx
│   │   ├── step-realizar-apresentacao.tsx
│   │   ├── step-gerar-contrato.tsx
│   │   └── step-contrato-assinado.tsx
│   │
│   ├── assessoria/                  ← Componentes específicos de Assessoria (OS 05-06)
│   │   ├── step-selecao-tipo-assessoria.tsx
│   │   ├── step-memorial-escopo-assessoria.tsx
│   │   └── step-ativar-contrato-assessoria.tsx
│   │
│   └── obras/                       ← Componentes específicos de Obras (OS 01-04)
│       └── (a criar conforme necessidade)
│
├── workflow-stepper.tsx             ← Stepper horizontal de progresso
├── workflow-footer.tsx              ← Footer com navegação e indicador
└── os-details-workflow-page.tsx    ← Página principal de workflow OS 01-04
    os-details-assessoria-page.tsx  ← Página principal de workflow OS 05-06
```

### 📊 Estatísticas do Sistema

| Métrica | Valor |
|---------|-------|
| **Componentes Criados** | 15 |
| **Componentes Compartilhados** | 12 |
| **Componentes Específicos** | 3 |
| **Linhas de Código** | ~4.450 |
| **Redução no Arquivo Principal** | 68% (OS 05-06), 24% (OS 01-04 Etapas 7-8) |
| **Fluxos Cobertos** | 2 (OS 01-04, OS 05-06) |

---

## 📋 Índice de Componentes

### Componentes Compartilhados (`/shared`)

| # | Componente | Arquivo | Usado em | Linhas | Status |
|---|-----------|---------|----------|--------|--------|
| 1 | `StepIdentificacaoLeadCompleto` | `step-identificacao-lead-completo.tsx` | OS 01-04 (Etapa 1) | ~420 | ✅ |
| 2 | `StepFollowUp1` | `step-followup-1.tsx` | OS 01-04 (Etapa 3), OS 05-06 (Etapa 3) | ~280 | ✅ |
| 3 | `StepFollowUp2` | `step-followup-2.tsx` | OS 01-04 (Etapa 6) | ~350 | ✅ |
| 4 | `StepMemorialEscopo` | `step-memorial-escopo.tsx` | OS 01-04 (Etapa 7) | ~360 | ✅ |
| 5 | `StepPrecificacao` | `step-precificacao.tsx` | OS 01-04 (Etapa 8), OS 05-06 (Etapa 5) | ~220 | ✅ |
| 6 | `StepGerarProposta` | `step-gerar-proposta.tsx` | OS 05-06 (Etapa 6) | ~100 | ✅ |
| 7 | `StepGerarPropostaOS0104` | `step-gerar-proposta-os01-04.tsx` | OS 01-04 (Etapa 9) | ~650 | ✅ ⭐ |
| 8 | `StepAgendarApresentacao` | `step-agendar-apresentacao.tsx` | OS 01-04 (Etapa 10), OS 05-06 (Etapa 7) | ~120 | ✅ |
| 9 | `StepRealizarApresentacao` | `step-realizar-apresentacao.tsx` | OS 01-04 (Etapa 11), OS 05-06 (Etapa 8) | ~110 | ✅ |
| 10 | `StepFollowUp3` | `step-followup-3.tsx` | OS 01-04 (Etapa 12), OS 05-06 (Etapa 9) | ~250 | ✅ |
| 11 | `StepGerarContrato` | `step-gerar-contrato.tsx` | OS 01-04 (Etapa 13), OS 05-06 (Etapa 10) | ~150 | ✅ |
| 12 | `StepContratoAssinado` | `step-contrato-assinado.tsx` | OS 01-04 (Etapa 14), OS 05-06 (Etapa 11) | ~110 | ✅ |

### Componentes de Assessoria (`/assessoria`)

| # | Componente | Arquivo | Usado em | Linhas | Status |
|---|-----------|---------|----------|--------|--------|
| 1 | `StepSelecaoTipoAssessoria` | `step-selecao-tipo-assessoria.tsx` | OS 05-06 (Etapa 2) | ~180 | ✅ |
| 2 | `StepMemorialEscopoAssessoria` | `step-memorial-escopo-assessoria.tsx` | OS 05-06 (Etapa 4) | ~200 | ✅ |
| 3 | `StepAtivarContratoAssessoria` | `step-ativar-contrato-assessoria.tsx` | OS 05-06 (Etapa 12) | ~130 | ✅ |

### Componentes de Infraestrutura

| Componente | Arquivo | Descrição | Status |
|-----------|---------|-----------|--------|
| `WorkflowStepper` | `workflow-stepper.tsx` | Stepper horizontal de progresso | ✅ |
| `WorkflowFooter` | `workflow-footer.tsx` | Footer com navegação | ✅ |
| `PrimaryButton` | `ui/primary-button.tsx` | Botão primário dourado Minerva | ✅ |

---

## 🗺️ Mapeamento de Fluxos

### Fluxo OS 01-04 (Lead → Cliente - 15 etapas)

```
Etapa 1  → StepIdentificacaoLeadCompleto     ✅ Componentizado
Etapa 2  → [Específico: Seleção Tipo OS]     ⏳ Inline
Etapa 3  → StepFollowUp1                     ✅ Componentizado
Etapa 4  → [Específico: Agendar Visita]      ⏳ Inline
Etapa 5  → [Específico: Realizar Visita]     ⏳ Inline
Etapa 6  → StepFollowUp2                     ✅ Componentizado
Etapa 7  → StepMemorialEscopo                ✅ Componentizado
Etapa 8  → StepPrecificacao                  ✅ Componentizado
Etapa 9  → [Específico: Gerar Proposta]      ⏳ Inline
Etapa 10 → [Específico: Agendar Apresent.]   ⏳ Inline
Etapa 11 → [Específico: Realizar Apresent.]  ⏳ Inline
Etapa 12 → [Específico: Follow-up 3]         ⏳ Inline
Etapa 13 → [Específico: Gerar Contrato]      ⏳ Inline
Etapa 14 → [Específico: Contrato Assinado]   ⏳ Inline
Etapa 15 → [Específico: Iniciar Obra]        ⏳ Inline
```

**Cobertura**: 5 de 15 etapas componentizadas (33%)

### Fluxo OS 05-06 (Assessoria - 12 etapas)

```
Etapa 1  → StepIdentificacaoLeadCompleto     ✅ Componentizado
Etapa 2  → StepSelecaoTipoAssessoria         ✅ Componentizado
Etapa 3  → StepFollowUp1                     ✅ Componentizado
Etapa 4  → StepMemorialEscopoAssessoria      ✅ Componentizado
Etapa 5  → StepPrecificacao                  ✅ Componentizado
Etapa 6  → StepGerarProposta                 ✅ Componentizado
Etapa 7  → StepAgendarApresentacao           ✅ Componentizado
Etapa 8  → StepRealizarApresentacao          ✅ Componentizado
Etapa 9  → StepFollowUp3                     ✅ Componentizado
Etapa 10 → StepGerarContrato                 ✅ Componentizado
Etapa 11 → StepContratoAssinado              ✅ Componentizado
Etapa 12 → StepAtivarContratoAssessoria      ✅ Componentizado
```

**Cobertura**: 12 de 12 etapas componentizadas (100%) ✅

---

## 📖 Componentes Compartilhados - Referência Detalhada

### 1. StepIdentificacaoLeadCompleto

**Arquivo**: `/components/os/steps/shared/step-identificacao-lead-completo.tsx`  
**Usado em**: OS 01-04 (Etapa 1), OS 05-06 (Etapa 1)

#### Funcionalidades
- ✅ Combobox de busca de leads
- ✅ Dialog para cadastrar novo lead
- ✅ Formulário completo: Nome, CPF/CNPJ, Tipo, Telefone, Email, Origem
- ✅ Card de confirmação quando lead é selecionado

#### Props

```typescript
interface StepIdentificacaoLeadCompletoProps {
  selectedLeadId: string;
  onSelectLead: (leadId: string) => void;
  showCombobox: boolean;
  onShowComboboxChange: (show: boolean) => void;
  showNewLeadDialog: boolean;
  onShowNewLeadDialogChange: (show: boolean) => void;
  formData: {
    nome: string;
    cpfCnpj: string;
    tipo: 'fisica' | 'juridica' | '';
    telefone: string;
    email: string;
    origem: string;
  };
  onFormDataChange: (data: any) => void;
  onSaveNewLead: () => void;
}
```

#### Exemplo de Uso

```tsx
import { StepIdentificacaoLeadCompleto } from './steps/shared/step-identificacao-lead-completo';

const [selectedLeadId, setSelectedLeadId] = useState('');
const [showCombobox, setShowCombobox] = useState(false);
const [showDialog, setShowDialog] = useState(false);
const [formData, setFormData] = useState({
  nome: '', cpfCnpj: '', tipo: '', telefone: '', email: '', origem: ''
});

{currentStep === 1 && (
  <StepIdentificacaoLeadCompleto
    selectedLeadId={selectedLeadId}
    onSelectLead={setSelectedLeadId}
    showCombobox={showCombobox}
    onShowComboboxChange={setShowCombobox}
    showNewLeadDialog={showDialog}
    onShowNewLeadDialogChange={setShowDialog}
    formData={formData}
    onFormDataChange={setFormData}
    onSaveNewLead={handleSaveNewLead}
  />
)}
```

---

### 2. StepFollowUp1

**Arquivo**: `/components/os/steps/shared/step-followup-1.tsx`  
**Usado em**: OS 01-04 (Etapa 3), OS 05-06 (Etapa 3)

#### Funcionalidades
- ✅ Entrevista inicial completa (11 perguntas)
- ✅ Mix de inputs: texto, textarea, selects
- ✅ Seção de contato local separada

#### Props

```typescript
interface StepFollowUp1Props {
  data: {
    idadeEdificacao: string;
    motivoProcura: string;
    quandoAconteceu: string;
    oqueFeitoARespeito: string;
    existeEscopo: string;
    previsaoOrcamentaria: string;
    grauUrgencia: string;
    apresentacaoProposta: string;
    nomeContatoLocal: string;
    telefoneContatoLocal: string;
    cargoContatoLocal: string;
  };
  onDataChange: (data: any) => void;
}
```

#### Exemplo de Uso

```tsx
import { StepFollowUp1 } from './steps/shared/step-followup-1';

const [etapa3Data, setEtapa3Data] = useState({
  idadeEdificacao: '',
  motivoProcura: '',
  // ... outros campos
});

{currentStep === 3 && (
  <StepFollowUp1
    data={etapa3Data}
    onDataChange={setEtapa3Data}
  />
)}
```

#### Validação

```tsx
const isEtapa3Valid = () => {
  return (
    etapa3Data.idadeEdificacao !== '' &&
    etapa3Data.motivoProcura !== '' &&
    etapa3Data.quandoAconteceu !== '' &&
    etapa3Data.grauUrgencia !== '' &&
    etapa3Data.apresentacaoProposta !== '' &&
    etapa3Data.nomeContatoLocal !== '' &&
    etapa3Data.telefoneContatoLocal !== ''
  );
};
```

---

### 3. StepFollowUp2

**Arquivo**: `/components/os/steps/shared/step-followup-2.tsx`  
**Usado em**: OS 01-04 (Etapa 6)

#### Funcionalidades
- ✅ Formulário dividido em **3 momentos**
- ✅ Upload de fotos com comentários individuais
- ✅ RadioGroup para avaliação da visita
- ✅ Sistema de adicionar/remover arquivos
- ✅ Cards verdes para confirmação de arquivos

#### Props

```typescript
interface StepFollowUp2Props {
  data: {
    // Momento 1: Perguntas Durante a Visita
    outrasEmpresas: string;
    comoEsperaResolver: string;
    expectativaCliente: string;
    estadoAncoragem: string;
    fotosAncoragem: Array<{ file: File; comment: string }>;
    
    // Momento 2: Avaliação Geral da Visita
    quemAcompanhou: string;
    avaliacaoVisita: 'produtiva' | 'pouco-produtiva' | 'improdutiva';
    
    // Momento 3: Respostas do Engenheiro
    estadoGeralEdificacao: string;
    servicoResolver: string;
    arquivosGerais: Array<{ file: File; comment: string }>;
  };
  onDataChange: (data: any) => void;
}
```

#### Exemplo de Uso

```tsx
import { StepFollowUp2 } from './steps/shared/step-followup-2';

const [etapa6Data, setEtapa6Data] = useState({
  outrasEmpresas: '',
  comoEsperaResolver: '',
  expectativaCliente: '',
  estadoAncoragem: '',
  fotosAncoragem: [],
  quemAcompanhou: '',
  avaliacaoVisita: '',
  estadoGeralEdificacao: '',
  servicoResolver: '',
  arquivosGerais: [],
});

{currentStep === 6 && (
  <StepFollowUp2
    data={etapa6Data}
    onDataChange={setEtapa6Data}
  />
)}
```

---

### 4. StepMemorialEscopo

**Arquivo**: `/components/os/steps/shared/step-memorial-escopo.tsx`  
**Usado em**: OS 01-04 (Etapa 7)

#### Funcionalidades
- ✅ Sistema **dinâmico** de etapas e sub-etapas
- ✅ Adicionar/Remover etapas principais
- ✅ Adicionar/Remover sub-etapas
- ✅ Grid responsivo (grid-cols-12)
- ✅ Cálculo automático do prazo de execução
- ✅ Resumo visual do prazo total do projeto

#### Props

```typescript
interface SubEtapa {
  nome: string;
  m2: string;
  diasUteis: string;
  total: string;
}

interface EtapaPrincipal {
  nome: string;
  subetapas: SubEtapa[];
}

interface StepMemorialEscopoProps {
  data: {
    objetivo: string;
    etapasPrincipais: EtapaPrincipal[];
    planejamentoInicial: string;
    logisticaTransporte: string;
    preparacaoArea: string;
  };
  onDataChange: (data: any) => void;
}
```

#### Exemplo de Uso

```tsx
import { StepMemorialEscopo } from './steps/shared/step-memorial-escopo';

const [etapa8Data, setEtapa8Data] = useState({
  objetivo: '',
  etapasPrincipais: [],
  planejamentoInicial: '',
  logisticaTransporte: '',
  preparacaoArea: '',
});

{currentStep === 7 && (
  <StepMemorialEscopo
    data={etapa8Data}
    onDataChange={setEtapa8Data}
  />
)}
```

#### Cálculos Automáticos

O componente calcula automaticamente:

1. **Execução de Obra**: Soma dos dias úteis de todas as sub-etapas
2. **Prazo Total**: Planejamento + Logística + Preparação + Execução

---

### 5. StepPrecificacao

**Arquivo**: `/components/os/steps/shared/step-precificacao.tsx`  
**Usado em**: OS 01-04 (Etapa 8), OS 05-06 (Etapa 5)

#### Funcionalidades (Versão OS 01-04)
- ✅ Cálculo de Custo Base (soma automática do memorial)
- ✅ % Imprevisto, % Lucro, % Imposto
- ✅ Valor Total calculado automaticamente
- ✅ % Entrada e Nº de Parcelas
- ✅ Valor de Entrada calculado
- ✅ Valor de Cada Parcela calculado
- ✅ Resumo Financeiro completo
- ✅ Formatação monetária (R$ X.XXX,XX)

#### Props

```typescript
interface StepPrecificacaoProps {
  etapa8Data: {
    objetivo: string;
    etapasPrincipais: EtapaPrincipal[];
    planejamentoInicial: string;
    logisticaTransporte: string;
    preparacaoArea: string;
  };
  etapa9Data: {
    percentualImprevisto: string;
    percentualLucro: string;
    percentualImposto: string;
    percentualEntrada: string;
    numeroParcelas: string;
  };
  onEtapa9DataChange: (data: any) => void;
}
```

#### Exemplo de Uso

```tsx
import { StepPrecificacao } from './steps/shared/step-precificacao';

const [etapa8Data, setEtapa8Data] = useState({ /* memorial */ });
const [etapa9Data, setEtapa9Data] = useState({
  percentualImprevisto: '',
  percentualLucro: '',
  percentualImposto: '',
  percentualEntrada: '',
  numeroParcelas: '',
});

{currentStep === 8 && (
  <StepPrecificacao
    etapa8Data={etapa8Data}
    etapa9Data={etapa9Data}
    onEtapa9DataChange={setEtapa9Data}
  />
)}
```

#### Fórmulas de Cálculo

```typescript
// Custo Base
custoBase = soma(etapa8Data.etapasPrincipais[].subetapas[].total)

// Valor Total
valorTotal = custoBase * (1 + (imprevisto + lucro + imposto) / 100)

// Valor de Entrada
valorEntrada = valorTotal * (percentualEntrada / 100)

// Valor da Parcela
valorParcela = (valorTotal - valorEntrada) / numeroParcelas
```

---

### 6. StepGerarPropostaOS0104 ⭐ NOVO

**Arquivo**: `/components/os/steps/shared/step-gerar-proposta-os01-04.tsx`  
**Usado em**: OS 01-04 (Etapa 9)

#### Funcionalidades
- ✅ Formulário **simplificado** (apenas validade e garantia - outros dados vêm da Etapa 1)
- ✅ **Visualização formatada** da proposta comercial completa
- ✅ **7 seções estruturadas**: Cliente, Proposta, Projeto, Especificações, Edificação, Valores, Empresa
- ✅ **Especificações Técnicas** com sub-etapas agrupadas por Etapa Principal (do Memorial)
- ✅ **Cálculos automáticos** de valores por unidade autônoma
- ✅ **Reutilização de dados** da Etapa 1 (responsável, unidades, blocos, endereço)
- ✅ **Botões de ação**: Visualizar, Imprimir, Baixar PDF
- ✅ **Card de sucesso** com código da proposta gerado
- ✅ **Estilos de impressão** otimizados

#### Props

```typescript
interface StepGerarPropostaOS0104Props {
  // Dados da Etapa 1 (Cliente/Lead) - INCLUI DADOS DO RESPONSÁVEL, ENDEREÇO E EDIFICAÇÃO
  etapa1Data: {
    nome: string;
    cpfCnpj: string;
    telefone: string;
    email: string;
    nomeResponsavel: string;      // ⭐ NOVO
    qtdUnidades: string;           // ⭐ NOVO
    qtdBlocos: string;             // ⭐ NOVO
    endereco: string;              // ⭐ NOVO
    numero: string;                // ⭐ NOVO
    complemento: string;           // ⭐ NOVO
    bairro: string;                // ⭐ NOVO
    cidade: string;                // ⭐ NOVO
    estado: string;                // ⭐ NOVO
  };
  
  // Dados da Etapa 2 (Tipo OS)
  etapa2Data: {
    tipoOS: string;
  };
  
  // Dados da Etapa 7 (Memorial de Escopo)
  etapa7Data: {
    objetivo: string;
    etapasPrincipais: EtapaPrincipal[];
    planejamentoInicial: string;
    logisticaTransporte: string;
    preparacaoArea: string;
  };
  
  // Dados da Etapa 8 (Precificação)
  etapa8Data: {
    percentualEntrada: string;
    numeroParcelas: string;
  };
  
  // Valores calculados (vindos do componente pai)
  valorTotal: number;
  valorEntrada: number;
  valorParcela: number;
  
  // Dados próprios da etapa (SIMPLIFICADOS - sem duplicações)
  data: {
    propostaGerada: boolean;
    dataGeracao: string;
    codigoProposta: string;
    validadeDias: string;          // Apenas campos específicos da proposta
    garantiaMeses: string;         // Apenas campos específicos da proposta
  };
  onDataChange: (data: any) => void;
}
```

#### Exemplo de Uso

```tsx
import { StepGerarPropostaOS0104 } from './steps/shared/step-gerar-proposta-os01-04';

// Estados necessários
const [etapa1Data, setEtapa1Data] = useState({ 
  nome: '', 
  cpfCnpj: '', 
  telefone: '', 
  email: '',
  nomeResponsavel: '',
  qtdUnidades: '',
  qtdBlocos: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: ''
});
const [etapa2Data, setEtapa2Data] = useState({ tipoOS: '' });
const [etapa7Data, setEtapa7Data] = useState({ objetivo: '', etapasPrincipais: [], ... });
const [etapa8Data, setEtapa8Data] = useState({ percentualEntrada: '', numeroParcelas: '' });
const [etapa9Data, setEtapa9Data] = useState({
  propostaGerada: false,
  dataGeracao: '',
  codigoProposta: '',
  validadeDias: '',
  garantiaMeses: '',
  // ⭐ Responsável, unidades, blocos e endereço agora vêm do etapa1Data
});

// Cálculos memoizados (no componente pai)
const valoresPrecificacao = useMemo(() => {
  const custoBase = etapa7Data.etapasPrincipais.reduce((total, etapa) => {
    return total + etapa.subetapas.reduce((subtotal, sub) => {
      return subtotal + (parseFloat(sub.total) || 0);
    }, 0);
  }, 0);

  const percImprevisto = parseFloat(etapa8Data.percentualImprevisto) || 0;
  const percLucro = parseFloat(etapa8Data.percentualLucro) || 0;
  const percImposto = parseFloat(etapa8Data.percentualImposto) || 0;
  const valorTotal = custoBase * (1 + (percImprevisto + percLucro + percImposto) / 100);
  
  const valorEntrada = valorTotal * (parseFloat(etapa8Data.percentualEntrada) / 100);
  const valorParcela = (valorTotal - valorEntrada) / parseFloat(etapa8Data.numeroParcelas);

  return { valorTotal, valorEntrada, valorParcela };
}, [etapa7Data, etapa8Data]);

// Renderizar
{currentStep === 9 && (
  <StepGerarPropostaOS0104
    etapa1Data={etapa1Data}
    etapa2Data={etapa2Data}
    etapa7Data={etapa7Data}
    etapa8Data={etapa8Data}
    valorTotal={valoresPrecificacao.valorTotal}
    valorEntrada={valoresPrecificacao.valorEntrada}
    valorParcela={valoresPrecificacao.valorParcela}
    data={etapa9Data}
    onDataChange={setEtapa9Data}
  />
)}
```

#### ⚠️ Observações Importantes

**Reutilização de Dados da Etapa 1:**
- O componente **NÃO solicita** dados de responsável, unidades, blocos ou endereço
- Esses dados são **carregados automaticamente** do `etapa1Data` (Cadastro do Lead)
- O formulário contém apenas **2 campos**: Validade da Proposta e Garantia
- Um alerta informa o usuário sobre essa automação

**Validação:**
- Valida se os campos da Etapa 1 foram preenchidos antes de gerar a proposta
- Desabilita o botão "Gerar Proposta" se faltar algum dado obrigatório

#### Estrutura da Proposta Gerada

A proposta comercial possui um **cabeçalho em 2 colunas** + **4 seções principais**:

**📋 Cabeçalho (Layout 2 Colunas)**

*Coluna Esquerda:*
- Logo: MINERVA ENGENHARIA
- 👤 Informações do Cliente:
  - Cliente, Responsável, CPF/CNPJ, Telefone, Bairro
  - E-mail, Endereço, Cidade/Estado

*Coluna Direita:*
- 📄 Informações da Proposta:
  - Código da Proposta (gerado automaticamente)
  - Data de Emissão
- 🏢 Detalhes da Edificação:
  - Quantidade de Unidades Autônomas
  - Quantidade de Blocos

---

**1. Detalhes do Projeto (Obra)**
- Objeto: "Proposta de [Tipo da OS]"
- Objetivo (do Memorial)
- Prazo Total (calculado automaticamente)
- Garantia (em meses)
- Ícones de check: Seguro de Obra, ART (CREA-MA), NBR 15571-1

**2. Especificações Técnicas** ⭐
- **Descrição dos Serviços**: Sub-etapas agrupadas por Etapa Principal
- Formato: Lista com bullets por etapa
- Mostra nome, m², dias úteis de cada sub-etapa

**3. Valores e Condições de Pagamento**
- Valor Total (destaque em dourado)
- Parcelamento:
  - Entrada (%) e valor
  - Prazo: 7 dias após assinatura
  - Parcelas (quantidade) e valor de cada
- Investimento por Unidade Autônoma (se houver):
  - Entrada por unidade
  - Cada parcela por unidade

**4. Informações da Empresa Emissora**
- MINERVA ENGENHARIA
- Endereço completo
- Telefones
- Site e e-mail de contato

#### Validação de Campos Obrigatórios

```tsx
const isEtapa9Valid = () => {
  return (
    etapa9Data.responsavel !== '' &&
    etapa9Data.validadeDias !== '' &&
    etapa9Data.garantiaMeses !== '' &&
    etapa9Data.qtdUnidades !== '' &&
    etapa9Data.qtdBlocos !== '' &&
    etapa9Data.endereco !== '' &&
    etapa9Data.bairro !== '' &&
    etapa9Data.cidade !== '' &&
    etapa9Data.estado !== ''
  );
};
```

#### Funcionalidades Especiais

**Geração Automática de Código**
```typescript
const codigo = `PROP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
// Exemplo: PROP-2025-1234
```

**Formatação Monetária**
```typescript
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
// Exemplo: R$ 150.000,00
```

**Cálculo de Investimento por Unidade**
```typescript
const investimentoPorUnidade = valorTotal / parseFloat(qtdUnidades);
const entradaPorUnidade = valorEntrada / parseFloat(qtdUnidades);
const parcelaPorUnidade = valorParcela / parseFloat(qtdUnidades);
```

**Impressão Otimizada**
- Botão "Imprimir" chama `window.print()`
- CSS de impressão oculta botões e navegação
- Layout formatado para impressão em A4

#### Fluxo de Uso

1. **Preencher Dados Complementares** (formulário inicial)
2. **Clicar em "Gerar Proposta Comercial"**
3. **Visualizar Preview** da proposta formatada
4. **Ações disponíveis**:
   - Visualizar/Ocultar preview
   - Imprimir (abre diálogo de impressão do navegador)
   - Baixar PDF (funcionalidade futura)

---

### 7-12. Outros Componentes Compartilhados

Os componentes abaixo seguem o mesmo padrão de props `{ data, onDataChange }`:

#### StepGerarProposta
- Botão para gerar proposta
- Card de confirmação após geração
- Botão de download

#### StepAgendarApresentacao
- Input datetime-local
- Card de confirmação com data formatada

#### StepRealizarApresentacao
- Checkbox de confirmação
- Card de sucesso

#### StepFollowUp3
- Select de nível de interesse
- Textareas para feedback
- Input de data para retorno

#### StepGerarContrato
- Card de download do modelo
- Card de upload do contrato
- Card de confirmação após upload

#### StepContratoAssinado
- Checkbox de confirmação
- Input de data (aparece após marcar)
- Card de sucesso com data formatada

---

## 📖 Componentes de Assessoria

### 1. StepSelecaoTipoAssessoria

**Arquivo**: `/components/os/steps/assessoria/step-selecao-tipo-assessoria.tsx`  
**Usado em**: OS 05-06 (Etapa 2)

#### Funcionalidades
- ✅ RadioGroup com OS 05 e OS 06
- ✅ Card de confirmação
- ✅ Alert sobre conversão automática

---

### 2. StepMemorialEscopoAssessoria

**Arquivo**: `/components/os/steps/assessoria/step-memorial-escopo-assessoria.tsx`  
**Usado em**: OS 05-06 (Etapa 4)

#### Funcionalidades
- ✅ Descrição do serviço
- ✅ Escopo detalhado (textarea grande)
- ✅ Prazo estimado
- ✅ Observações

---

### 3. StepAtivarContratoAssessoria

**Arquivo**: `/components/os/steps/assessoria/step-ativar-contrato-assessoria.tsx`  
**Usado em**: OS 05-06 (Etapa 12)

#### Funcionalidades
- ✅ Alert de conclusão
- ✅ Botão "Ativar Contrato" (cor #06b6d4)
- ✅ Mensagem sobre criação da OS 11 ou OS 12

---

## 🎛️ Componentes de Infraestrutura

### WorkflowStepper

**Arquivo**: `/components/os/workflow-stepper.tsx`

#### Características
- ✅ Stepper horizontal responsivo
- ✅ Estados visuais: Completo (✓ verde), Atual (● dourado), Bloqueado (🔒 cinza)
- ✅ Navegável por cliques
- ✅ Acessibilidade completa (ARIA)

#### Props

```typescript
interface WorkflowStep {
  id: number;
  title: string;
  short: string;
  responsible?: string;
  status?: 'pending' | 'active' | 'completed';
}

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  className?: string;
}
```

#### Exemplo de Uso

```tsx
import { WorkflowStepper, WorkflowStep } from './components/os/workflow-stepper';

const steps: WorkflowStep[] = [
  { id: 1, title: 'Identificação do Cliente/Lead', short: 'Lead', responsible: 'ADM' },
  { id: 2, title: 'Seleção do Tipo de OS', short: 'Tipo OS', responsible: 'ADM' },
  // ... mais etapas
];

<WorkflowStepper 
  steps={steps}
  currentStep={currentStep}
  onStepClick={setCurrentStep}
/>
```

---

### WorkflowFooter

**Arquivo**: `/components/os/workflow-footer.tsx`

#### Características
- ✅ Botões de navegação (Anterior/Próximo)
- ✅ Indicador de progresso (X / Y)
- ✅ Botão de rascunho opcional
- ✅ Textos customizáveis
- ✅ Estados desabilitados

#### Props

```typescript
interface WorkflowFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSaveDraft?: () => void;
  prevButtonText?: string;
  nextButtonText?: string;
  finalButtonText?: string;
  disablePrev?: boolean;
  disableNext?: boolean;
  showDraftButton?: boolean;
}
```

#### Exemplo de Uso

```tsx
import { WorkflowFooter } from './components/os/workflow-footer';

<WorkflowFooter
  currentStep={currentStep}
  totalSteps={steps.length}
  onPrevStep={() => setCurrentStep(Math.max(1, currentStep - 1))}
  onNextStep={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
  onSaveDraft={handleSaveDraft}
/>
```

---

### PrimaryButton

**Arquivo**: `/components/ui/primary-button.tsx`

#### Características
- ✅ Estilo corporativo dourado #D3AF37
- ✅ Estados: Normal, Hover, Active, Disabled, Loading
- ✅ Efeitos de interação (scale-95 ao clicar)

#### Props

```typescript
interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}
```

#### Exemplo de Uso

```tsx
import { PrimaryButton } from './components/ui/primary-button';

<PrimaryButton 
  onClick={handleSubmit}
  loading={isLoading}
  loadingText="Salvando..."
>
  Salvar
</PrimaryButton>
```

---

## 🎨 Design System e Padrões

### Cores Padrão

```tsx
// Cores corporativas Minerva
const primary = '#D3AF37';       // Dourado (Minerva)
const secondary = '#DDC063';     // Dourado claro
const cyan = '#06b6d4';          // Cyan (botões de ação)
const orange = '#f97316';        // Laranja (ações secundárias)
const success = '#22c55e';       // Verde (confirmações)
const destructive = '#ef4444';   // Vermelho (remover)
```

### Alerts Padrão

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

### Tipografia

⚠️ **REGRA**: Não use classes Tailwind de font-size, font-weight ou line-height, exceto quando especificamente necessário. O sistema usa tipografia padrão definida em `styles/globals.css`.

```tsx
// ✅ BOM: Usar classes de cor/muted
<p className="text-muted-foreground">Texto secundário</p>
<p className="text-sm text-muted-foreground">Texto pequeno</p>

// ❌ RUIM: Não usar font-size, font-weight
<p className="text-2xl font-bold">Não fazer isso</p>
```

---

## 🔄 Padrões de Código

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
<StepIdentificacaoLeadCompleto
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
import { StepIdentificacaoLeadCompleto } from './steps/shared/step-identificacao-lead-completo';
import { StepFollowUp1 } from './steps/shared/step-followup-1';
import { StepPrecificacao } from './steps/shared/step-precificacao';
```

---

## 🛠️ Guia de Implementação

### Como Usar um Componente Existente

#### Passo 1: Importar o Componente

```tsx
import { StepFollowUp1 } from './steps/shared/step-followup-1';
```

#### Passo 2: Definir o Estado

```tsx
const [etapa3Data, setEtapa3Data] = useState({
  idadeEdificacao: '',
  motivoProcura: '',
  quandoAconteceu: '',
  oqueFeitoARespeito: '',
  existeEscopo: '',
  previsaoOrcamentaria: '',
  grauUrgencia: '',
  apresentacaoProposta: '',
  nomeContatoLocal: '',
  telefoneContatoLocal: '',
  cargoContatoLocal: '',
});
```

#### Passo 3: Renderizar o Componente

```tsx
{currentStep === 3 && (
  <StepFollowUp1
    data={etapa3Data}
    onDataChange={setEtapa3Data}
  />
)}
```

#### Passo 4: Implementar Validação (Opcional)

```tsx
const isEtapa3Valid = () => {
  return (
    etapa3Data.idadeEdificacao !== '' &&
    etapa3Data.motivoProcura !== '' &&
    // ... outros campos obrigatórios
  );
};
```

---

### Como Criar um Novo Componente

#### Checklist de Criação

- [ ] Nome do arquivo em kebab-case (`step-nome-do-componente.tsx`)
- [ ] Nome da função em PascalCase (`StepNomeDoComponente`)
- [ ] Interface de Props definida (`StepNomeDoComponenteProps`)
- [ ] Props documentadas com comentários TypeScript
- [ ] Componente segue padrão controlled (recebe `data` e `onDataChange`)
- [ ] Alert de contexto no início do componente
- [ ] Campos obrigatórios marcados com `<span className="text-destructive">*</span>`
- [ ] Design System compliance (cores, spacing, tipografia)
- [ ] Testado no fluxo de uso
- [ ] Documentado neste guia

#### Template Base

```tsx
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Alert, AlertDescription } from '../../ui/alert';
import { AlertCircle } from 'lucide-react';

interface StepNomeDoComponenteProps {
  data: {
    campo1: string;
    campo2: string;
  };
  onDataChange: (data: any) => void;
}

export function StepNomeDoComponente({ data, onDataChange }: StepNomeDoComponenteProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Descrição breve do propósito desta etapa
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="campo1">
            Campo 1 <span className="text-destructive">*</span>
          </Label>
          <Input
            id="campo1"
            value={data.campo1}
            onChange={(e) => onDataChange({ ...data, campo1: e.target.value })}
            placeholder="Digite aqui..."
          />
        </div>

        {/* Mais campos... */}
      </div>
    </div>
  );
}
```

---

## 📊 Métricas e Impacto

### Antes da Componentização

| Métrica | OS 05-06 | OS 01-04 |
|---------|----------|----------|
| **Linhas no arquivo principal** | ~1.100 | ~1.450 |
| **Código duplicado** | Alto | Alto |
| **Manutenibilidade** | Baixa | Baixa |
| **Testabilidade** | Difícil | Difícil |

### Depois da Componentização

| Métrica | OS 05-06 | OS 01-04 (Parcial) |
|---------|----------|---------------------|
| **Linhas no arquivo principal** | ~370 | ~1.100 |
| **Redução** | **66%** | **24%** |
| **Componentes reutilizáveis** | 12 | 5 |
| **Manutenibilidade** | Alta | Média/Alta |
| **Testabilidade** | Fácil | Fácil |

### Benefícios Alcançados

✅ **Redução de 66%** no arquivo principal (OS 05-06)  
✅ **14 componentes** reutilizáveis criados  
✅ **Manutenção centralizada** - alterar 1 vez, reflete em todos os fluxos  
✅ **Código limpo e organizado**  
✅ **Fácil extensão** para OS 07-13  
✅ **Elimina duplicação** de código  
✅ **Facilita testes** unitários  

### Exemplo Comparativo

**Antes (Código Duplicado):**

```tsx
// Em os-details-workflow-page.tsx - ~150 linhas inline
{currentStep === 3 && (
  <div className="space-y-6">
    <Alert>...</Alert>
    <div className="space-y-4">
      <div><Label>...</Label><Input /></div>
      <div><Label>...</Label><Textarea /></div>
      {/* ... mais 8 campos ... */}
    </div>
  </div>
)}
```

**Depois (Componentizado):**

```tsx
// Em os-details-workflow-page.tsx - 3 linhas limpas
{currentStep === 3 && (
  <StepFollowUp1 data={etapa3Data} onDataChange={setEtapa3Data} />
)}
```

---

## 🔍 Referência Rápida

### Layout Recomendado de Página

```tsx
<div className="h-screen flex flex-col bg-neutral-50">
  {/* Botão Voltar (opcional) */}
  {onBack && (
    <div className="border-b border-neutral-200 px-6 py-3 bg-white">
      <Button variant="ghost" onClick={onBack}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>
    </div>
  )}

  {/* WorkflowStepper */}
  <WorkflowStepper 
    steps={steps} 
    currentStep={currentStep} 
    onStepClick={setCurrentStep}
  />

  {/* Conteúdo scrollável */}
  <div className="flex-1 overflow-auto">
    <div className="h-full p-6">
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Componente da etapa atual */}
          {currentStep === 1 && <StepIdentificacaoLeadCompleto {...} />}
          {currentStep === 2 && <StepFollowUp1 {...} />}
          {/* ... */}
        </CardContent>
      </Card>
    </div>
  </div>

  {/* WorkflowFooter */}
  <WorkflowFooter
    currentStep={currentStep}
    totalSteps={steps.length}
    onPrevStep={handlePrevStep}
    onNextStep={handleNextStep}
  />
</div>
```

---

## ✅ Checklist de Integração

Ao usar componentes em um novo fluxo de OS:

### Setup Inicial
- [ ] Importar componentes necessários de `./steps/shared` ou `./steps/assessoria`
- [ ] Importar `WorkflowStepper` e `WorkflowFooter`
- [ ] Definir array `steps: WorkflowStep[]` com IDs sequenciais

### Estado
- [ ] Configurar estado `currentStep` (geralmente começando em 1)
- [ ] Criar estados `etapaXData` para cada etapa
- [ ] Implementar handlers de navegação

### Renderização
- [ ] Renderizar `<WorkflowStepper />` no layout
- [ ] Renderizar componentes condicionalmente por `currentStep`
- [ ] Renderizar `<WorkflowFooter />` no layout

### Validação e Navegação
- [ ] Implementar função `isStepValid()` para cada etapa
- [ ] Bloquear navegação se etapa inválida
- [ ] Testar navegação entre etapas
- [ ] Testar comportamento da última etapa

### Finalização
- [ ] Testar em diferentes tamanhos de tela
- [ ] Verificar acessibilidade (ARIA labels)
- [ ] Documentar componentes novos criados

---

## 🚀 Próximos Passos

### Etapas Pendentes de Componentização (OS 01-04)

1. **Etapa 2**: Seleção do Tipo de OS
2. **Etapa 4**: Agendar Visita Técnica
3. **Etapa 5**: Realizar Visita
4. **Etapa 9-14**: Etapas de proposta e contrato
5. **Etapa 15**: Iniciar Contrato de Obra

### Melhorias Futuras

- [ ] Integração com backend (upload real de arquivos)
- [ ] Validação de CPF/CNPJ
- [ ] Máscaras de input (telefone, CEP)
- [ ] Sistema de autosave (rascunhos)
- [ ] Drag and drop para reordenar etapas/sub-etapas
- [ ] Export para Excel/PDF do memorial
- [ ] Histórico de alterações por etapa
- [ ] Notificações de aprovação (para Gestor ADM)

---

## 📚 Documentos Relacionados

Este guia substitui e unifica:
- ~~COMPONENT_ARCHITECTURE.md~~ (conteúdo integrado)
- ~~COMPONENTIZATION_SUMMARY.md~~ (conteúdo integrado)
- ~~COMPONENTS_CREATED_SUMMARY.md~~ (conteúdo integrado)

Outros documentos relevantes:
- `FLOW_COMPONENTS_DICTIONARY.md` - Dicionário detalhado de componentes
- `DESIGN_SYSTEM.md` - Sistema de design completo
- `FLOW_OS_01_04.md` - Especificação do fluxo OS 01-04
- `FLOW_OS_05_06.md` - Especificação do fluxo OS 05-06

---

## 📞 Suporte

Para dúvidas sobre implementação de componentes:

1. **Consulte este guia** primeiro
2. **Verifique o código existente** em `/components/os/steps/shared`
3. **Siga os padrões** estabelecidos neste documento
4. **Documente novos componentes** criados

---

**Versão**: 2.0  
**Data de Consolidação**: 10/11/2025  
**Status**: ✅ **GUIA OFICIAL**  
**Mantenedores**: Equipe Arquitetura Minerva ERP
