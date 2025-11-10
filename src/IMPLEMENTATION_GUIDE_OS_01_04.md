# Guia de Implementação Técnica - Fluxo OS 01-04

## 📋 Status da Implementação

### ✅ Concluído

#### Estrutura Base
- [x] Documento de especificação completo (`FLOW_OS_01_04.md`)
- [x] Componente principal reescrito (`os-details-workflow-page.tsx`)
- [x] Stepper horizontal com 16 etapas
- [x] Sistema de navegação entre etapas
- [x] Estados (states) para todos os formulários das 16 etapas
- [x] Mock data expandido (10 leads de exemplo)

#### Etapa 1: Identificação do Cliente/Lead
- [x] Combobox com busca inteligente (nome, CPF, CNPJ)
- [x] Preview visual dos dados do lead selecionado
- [x] Dialog para cadastro de novo lead
- [x] Formulário completo com todos os campos:
  - [x] Bloco 1: Identificação (7 campos)
  - [x] Bloco 2: Dados da Edificação (8 campos)
  - [x] Bloco 3: Endereço (8 campos)
- [x] Lógica condicional para "Qtd. Unidades" (condomínios)
- [x] Lógica condicional para "Qtd. Blocos" (apartamentos)

#### Etapa 2: Seleção do Tipo de OS
- [x] Select com 4 opções (OS 01, 02, 03, 04)
- [x] Feedback visual de seleção
- [x] Estado salvo em `etapa2Data.tipoOS`

#### Etapa 3: Follow-up 1 (Entrevista Inicial)
- [x] 11 campos de formulário
- [x] 6 Textareas para respostas descritivas
- [x] 2 Selects (idade edificação, grau urgência)
- [x] 3 Inputs (nome, telefone, cargo do contato)
- [x] Área de upload de arquivos

#### Etapa 4: Agendar Visita Técnica
- [x] Interface visual com ícone de calendário
- [x] Botão "Agendar no Calendário" (laranja #f97316)
- [x] Feedback de agendamento confirmado

#### Etapa 5: Realizar Visita
- [x] Checkbox de confirmação
- [x] Feedback visual de confirmação
- [x] Registro de data

#### Etapa 6: Follow-up 2 (Pós-Visita)
- [x] Formulário dividido em 3 momentos
- [x] Momento 1: Checklist (8 campos)
  - [x] 3 Selects, 1 Switch, 1 Textarea, 1 Upload
- [x] Momento 2: Avaliação (2 campos)
  - [x] 1 Textarea, 1 Radio Group
- [x] Momento 3: Engenheiro (3 campos)
  - [x] 2 Textareas, 1 Upload

#### Etapa 7: Fazer Memorial (Upload)
- [x] Área de upload de arquivo único
- [x] Preview do arquivo anexado
- [x] Botão de remoção

#### Etapa 8: Formulário Memorial (Escopo e Prazos)
- [x] Campo "Objetivo" (Textarea)
- [x] Sistema dinâmico de Etapas Principais
  - [x] Botão "Adicionar Etapa Principal"
  - [x] Input para nome da etapa
  - [x] Botão "Adicionar Sub-etapa"
  - [x] Grid com 4 campos (nome, m², dias, total)
  - [x] Botões de remoção (etapa e sub-etapa)
- [x] Campos de Prazo (4 inputs)
  - [x] Planejamento inicial
  - [x] Logística e transporte
  - [x] Preparação de área
  - [x] Execução (calculado automaticamente)
- [x] Cálculo automático de "Execução Total"

#### Etapa 9: Precificação
- [x] Campo "Custo Base" (calculado automaticamente)
- [x] 3 Inputs de percentuais (Imprevisto, Lucro, Imposto)
- [x] Campo "Valor Atual" (calculado automaticamente)
- [x] 2 Inputs de condições de pagamento (% Entrada, Nº Parcelas)
- [x] Campo "Valor de Entrada" (calculado)
- [x] Campo "Valor de Parcela" (calculado)
- [x] Card "Resumo Financeiro" com todos os valores
- [x] Fórmulas de cálculo implementadas:
  - [x] `calcularCustoBase()`
  - [x] `calcularValorAtual()`
  - [x] `calcularValorEntrada()`
  - [x] `calcularValorParcela()`

#### Etapa 10: Gerar Proposta Comercial
- [x] Interface visual com ícone
- [x] Botão "Visualizar Proposta para Impressão"
- [x] Alert de aprovação necessária (Gestor ADM)

#### Etapa 11: Agendar Visita (Apresentação)
- [x] Interface visual com ícone de calendário
- [x] Botão "Agendar no Calendário"
- [x] Feedback de agendamento confirmado

#### Etapa 12: Realizar Visita (Apresentação)
- [x] Checkbox de confirmação
- [x] Feedback visual de confirmação

#### Etapa 13: Follow-up 3 (Pós-Apresentação)
- [x] Formulário dividido em 3 momentos
- [x] Momento 1: Apresentação (3 Textareas)
- [x] Momento 2: Contrato e Dores (2 Textareas, 1 Select)
- [x] Momento 3: Satisfação (1 Textarea, 1 Radio Group)
- [x] Total: 8 campos

#### Etapa 14: Gerar Contrato (Upload)
- [x] Grid 2 colunas
- [x] Coluna 1: Botão "Baixar Modelo de Contrato"
- [x] Coluna 2: Upload de minuta do contrato
- [x] Alert de aprovação necessária

#### Etapa 15: Contrato Assinado
- [x] Checkbox de confirmação
- [x] Feedback visual de sucesso
- [x] Mensagem sobre conversão de lead

#### Etapa 16: Iniciar Contrato de Obra
- [x] Interface final com resumo das ações
- [x] Botão "Concluir OS e Gerar OS-13"
- [x] Card explicativo com 3 itens (OS concluída, Lead → Cliente, OS-13 criada)

---

## 🚧 Pendente (Próximas Fases)

### Integrações Backend
- [ ] Integração com API ViaCEP (Etapa 1 - Bloco 3)
  - [ ] Auto-preenchimento de endereço ao digitar CEP
  - [ ] Tratamento de erros (CEP inválido)
  
- [ ] Sistema de Upload de Arquivos
  - [ ] Etapa 3: Upload múltiplo com comentários
  - [ ] Etapa 6: Upload de fotos de ancoragem
  - [ ] Etapa 6: Upload de fotos gerais
  - [ ] Etapa 7: Upload de memorial
  - [ ] Etapa 14: Upload de contrato
  - [ ] Storage no Supabase ou S3
  - [ ] Preview de imagens
  - [ ] Validação de tipos e tamanhos

- [ ] Módulo de Agendamento
  - [ ] Etapa 4: Calendário para visita técnica
  - [ ] Etapa 11: Calendário para apresentação
  - [ ] Integração com Google Calendar (opcional)
  - [ ] Sistema de notificações

- [ ] Sistema de Aprovações
  - [ ] Etapa 10: Fluxo de aprovação Gestor ADM
  - [ ] Etapa 14: Fluxo de aprovação Gestor ADM
  - [ ] Notificações por email
  - [ ] Dashboard de aprovações pendentes

### Persistência de Dados
- [ ] Salvar dados de cada etapa no backend
  - [ ] Endpoint: `POST /api/os/{id}/etapa/{numero}`
  - [ ] Payload: `{ dados_etapa: JSON }`
  
- [ ] Carregar dados salvos ao voltar para etapa anterior
  - [ ] Endpoint: `GET /api/os/{id}/etapa/{numero}`
  
- [ ] Sistema de "Salvar Rascunho"
  - [ ] Salvar sem validação
  - [ ] Indicador visual de rascunho salvo

- [ ] Validação de campos obrigatórios
  - [ ] Não permitir avançar sem preencher campos com `*`
  - [ ] Mensagens de erro específicas por campo

### Geração de Documentos
- [ ] Etapa 10: Geração de PDF da Proposta Comercial
  - [ ] Rota: `/os/{id}/proposta-preview`
  - [ ] Template HTML/CSS formatado A4
  - [ ] Compilação de dados das Etapas 1-9
  - [ ] Função `window.print()` para salvar PDF
  - [ ] Logo da empresa Minerva
  - [ ] Assinatura digital (opcional)

- [ ] Etapa 14: Download do Modelo de Contrato
  - [ ] Arquivo .docx pré-formatado
  - [ ] Variáveis para substituição (nome cliente, valor, etc.)

### Conversão Lead → Cliente
- [ ] Etapa 16: Lógica de conversão
  - [ ] Atualizar `leads.status = 'cliente'`
  - [ ] Criar registro em tabela `clientes` (se aplicável)
  - [ ] Manter histórico de conversão

### Criação Automática OS-13
- [ ] Etapa 16: Geração automática
  - [ ] Criar nova OS tipo 13
  - [ ] Associar ao cliente convertido
  - [ ] Copiar dados relevantes (endereço, contato, etc.)
  - [ ] Redirecionar para nova OS
  - [ ] Notificar time de obras

### Melhorias de UX/UI
- [ ] Loading states durante salvamento
- [ ] Mensagens de sucesso/erro (toast notifications)
- [ ] Validação em tempo real de campos
- [ ] Máscaras de input (CPF, CNPJ, Telefone, CEP)
- [ ] Formatação de valores monetários (R$)
- [ ] Contadores de caracteres em Textareas
- [ ] Tooltips explicativos
- [ ] Modo mobile responsivo
- [ ] Animações de transição entre etapas
- [ ] Confirmação antes de sair da página (dados não salvos)

### Sistema de Permissões
- [ ] Verificar papel do usuário (ADM, Obras, Diretoria)
- [ ] Bloquear etapas por responsabilidade
  - [ ] Etapas 1-4: Apenas ADM
  - [ ] Etapas 5-9: Apenas Obras
  - [ ] Etapas 10-16: Apenas ADM
- [ ] Registro de quem executou cada etapa
- [ ] Histórico de alterações (audit log)

### Notificações e Alertas
- [ ] Email ao responsável quando etapa anterior for concluída
- [ ] Notificação in-app de novas tarefas
- [ ] Lembrete de prazos (visitas agendadas)
- [ ] Alerta de OS parada há X dias

### Relatórios e Dashboard
- [ ] Dashboard de OS 01-04 em andamento
- [ ] Funil de conversão Lead → Cliente
- [ ] Tempo médio por etapa
- [ ] Taxa de conversão por indicador (Fechado, Quente, Morno, Frio)
- [ ] Relatório de propostas apresentadas vs. convertidas

---

## 📂 Estrutura de Arquivos Atual

```
/components/os/
├── os-details-workflow-page.tsx  ✅ Componente principal (16 etapas completas)
├── os-details-page.tsx            ⚠️ Antigo (pode ser removido ou refatorado)
├── os-workflow-page.tsx           ⚠️ Antigo (pode ser removido ou refatorado)
├── create-os-page.tsx             ✅ Manter (criação de OS)
└── step-wrapper.tsx               ⚠️ Pode ser removido (não usado no novo fluxo)

/lib/
├── mock-data.ts                   ✅ 10 leads de exemplo
└── types.ts                       ⚠️ Pode precisar de expansão (tipos das etapas)

/
├── FLOW_OS_01_04.md              ✅ Especificação completa
├── IMPLEMENTATION_GUIDE_OS_01_04.md ✅ Este guia
├── FLOW_IMPLEMENTATION.md         ⚠️ Antigo (verificar se pode ser mesclado)
├── TRANSITION_DOCUMENT.md         ⚠️ Antigo
└── DATABASE_SCHEMA.md             ⚠️ Precisa ser atualizado para OS 01-04
```

---

## 🔧 Tecnologias Utilizadas

- **React 18** (useState, useEffect)
- **Next.js 14** (file-based routing)
- **Tailwind CSS v3** (utility-first styling)
- **shadcn/ui** (componentes):
  - Card, Button, Input, Label, Textarea
  - Select, Checkbox, Switch, RadioGroup
  - Dialog, Popover, Command (Combobox)
  - Alert, Badge, Separator, ScrollArea
  - Avatar
- **Lucide React** (ícones)

---

## 🎨 Padrões de Design Utilizados

### Cores
- **Primary**: `#06b6d4` (Cyan) - Botões de ação principal
- **Secondary**: `#f97316` (Laranja) - Ações de agendamento e criação
- **Primary Brand**: `#D3AF37` (Dourado) - Minerva Design System
- **Success**: `#22c55e` (Verde) - Confirmações e etapas concluídas
- **Warning**: `#eab308` (Amarelo) - Alertas de aprovação
- **Destructive**: `#ef4444` (Vermelho) - Campos obrigatórios e remoções

### Componentes Reutilizáveis
```tsx
// Botão Primário (Cyan)
<Button style={{ backgroundColor: '#06b6d4', color: 'white' }}>
  Salvar e Continuar
</Button>

// Botão Secundário (Laranja)
<Button variant="secondary" style={{ backgroundColor: '#f97316', color: 'white' }}>
  Agendar no Calendário
</Button>

// Alert de Aprovação
<Alert className="border-yellow-200 bg-yellow-50">
  <AlertCircle className="h-4 w-4 text-yellow-600" />
  <AlertDescription className="text-yellow-700">
    Esta etapa requer aprovação do Gestor ADM.
  </AlertDescription>
</Alert>

// Card de Sucesso
<Card className="bg-green-50 border-green-200">
  <CardContent className="pt-6">
    <div className="flex items-center gap-3">
      <Check className="h-5 w-5 text-green-600" />
      <div>
        <p className="text-sm font-medium">Título</p>
        <p className="text-sm text-muted-foreground">Descrição</p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

## 📊 Estados (States) Implementados

### Estado Global
```tsx
const [currentStep, setCurrentStep] = useState(1);
const [selectedLeadId, setSelectedLeadId] = useState<string>('');
const [showLeadCombobox, setShowLeadCombobox] = useState(false);
const [showNewLeadDialog, setShowNewLeadDialog] = useState(false);
```

### Estados por Etapa (16 etapas)
```tsx
const [etapa1Data, setEtapa1Data] = useState({ leadId: '' });
const [etapa2Data, setEtapa2Data] = useState({ tipoOS: '' });
const [etapa3Data, setEtapa3Data] = useState({ /* 11 campos */ });
const [etapa4Data, setEtapa4Data] = useState({ dataAgendamento: '' });
const [etapa5Data, setEtapa5Data] = useState({ visitaRealizada: false });
const [etapa6Data, setEtapa6Data] = useState({ /* 12 campos */ });
const [etapa7Data, setEtapa7Data] = useState({ memorialFile: null });
const [etapa8Data, setEtapa8Data] = useState({ 
  objetivo: '',
  etapasPrincipais: [], 
  /* 3 campos de prazo */
});
const [etapa9Data, setEtapa9Data] = useState({ /* 5 campos */ });
const [etapa10Data, setEtapa10Data] = useState({});
const [etapa11Data, setEtapa11Data] = useState({ dataAgendamento: '' });
const [etapa12Data, setEtapa12Data] = useState({ apresentacaoRealizada: false });
const [etapa13Data, setEtapa13Data] = useState({ /* 8 campos */ });
const [etapa14Data, setEtapa14Data] = useState({ contratoFile: null });
const [etapa15Data, setEtapa15Data] = useState({ contratoAssinado: false });
```

### Estado do Formulário de Lead (Dialog)
```tsx
const [formData, setFormData] = useState({
  // Bloco 1: Identificação (7 campos)
  nome: '', cpfCnpj: '', tipo: '', nomeResponsavel: '', 
  cargoResponsavel: '', telefone: '', email: '',
  
  // Bloco 2: Edificação (8 campos)
  tipoEdificacao: '', qtdUnidades: '', qtdBlocos: '', qtdPavimentos: '',
  tipoTelhado: '', possuiElevador: false, possuiPiscina: false,
  
  // Bloco 3: Endereço (8 campos)
  cep: '', endereco: '', numero: '', complemento: '',
  bairro: '', cidade: '', estado: '',
});
```

---

## 🧮 Funções de Cálculo Automático

### Etapa 8: Execução Total
```tsx
const calcularExecucaoTotal = () => {
  return etapa8Data.etapasPrincipais.reduce((total, etapa) => {
    return total + etapa.subetapas.reduce((sum, sub) => 
      sum + (parseFloat(sub.diasUteis) || 0), 0
    );
  }, 0);
};
```

### Etapa 9: Custo Base
```tsx
const calcularCustoBase = () => {
  return etapa8Data.etapasPrincipais.reduce((total, etapa) => {
    return total + etapa.subetapas.reduce((sum, sub) => 
      sum + (parseFloat(sub.total) || 0), 0
    );
  }, 0);
};
```

### Etapa 9: Valor Atual
```tsx
const calcularValorAtual = () => {
  const custoBase = calcularCustoBase();
  const imprevisto = parseFloat(etapa9Data.percentualImprevisto) || 0;
  const lucro = parseFloat(etapa9Data.percentualLucro) || 0;
  const imposto = parseFloat(etapa9Data.percentualImposto) || 0;
  return custoBase * (1 + (imprevisto + lucro + imposto) / 100);
};
```

### Etapa 9: Valor Entrada
```tsx
const calcularValorEntrada = () => {
  const valorAtual = calcularValorAtual();
  const percentualEntrada = parseFloat(etapa9Data.percentualEntrada) || 0;
  return valorAtual * (percentualEntrada / 100);
};
```

### Etapa 9: Valor Parcela
```tsx
const calcularValorParcela = () => {
  const valorAtual = calcularValorAtual();
  const valorEntrada = calcularValorEntrada();
  const numeroParcelas = parseInt(etapa9Data.numeroParcelas) || 1;
  return (valorAtual - valorEntrada) / numeroParcelas;
};
```

---

## 🗂️ Estrutura de Dados para Backend

### Tabela: `os_etapas`

```typescript
interface OSEtapa {
  id: string;
  os_id: string;
  etapa_numero: number; // 1-16
  etapa_nome: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  dados_etapa: {
    // Etapa 1
    leadId?: string;
    
    // Etapa 2
    tipoOS?: string;
    
    // Etapa 3
    idadeEdificacao?: string;
    motivoProcura?: string;
    // ... (11 campos)
    
    // Etapa 4
    dataAgendamento?: string;
    
    // Etapa 5
    visitaRealizada?: boolean;
    
    // Etapa 6
    visitaAcompanhada?: string;
    // ... (12 campos)
    
    // Etapa 7
    memorialFileUrl?: string;
    
    // Etapa 8
    objetivo?: string;
    etapasPrincipais?: Array<{
      nome: string;
      subetapas: Array<{
        nome: string;
        m2: string;
        diasUteis: string;
        total: string;
      }>;
    }>;
    planejamentoInicial?: string;
    logisticaTransporte?: string;
    preparacaoArea?: string;
    
    // Etapa 9
    percentualImprevisto?: string;
    percentualLucro?: string;
    percentualImposto?: string;
    percentualEntrada?: string;
    numeroParcelas?: string;
    
    // Etapa 10
    propostaAprovada?: boolean;
    propostaAprovadaPor?: string;
    propostaAprovadaEm?: string;
    
    // Etapa 11
    dataAgendamentoApresentacao?: string;
    
    // Etapa 12
    apresentacaoRealizada?: boolean;
    
    // Etapa 13
    propostaApresentada?: string;
    // ... (8 campos)
    
    // Etapa 14
    contratoFileUrl?: string;
    contratoAprovado?: boolean;
    contratoAprovadoPor?: string;
    
    // Etapa 15
    contratoAssinado?: boolean;
    contratoAssinadoEm?: string;
    
    // Etapa 16
    os13Id?: string; // ID da OS-13 gerada
    leadConvertidoEm?: string;
  };
  responsavel_id: string;
  data_inicio: string;
  data_conclusao: string | null;
  created_at: string;
  updated_at: string;
}
```

---

## 🚀 Próximos Passos Recomendados

### Prioridade Alta (Sprint 1)
1. **Persistência de dados**: Integrar com backend para salvar/carregar dados de cada etapa
2. **Validação de campos obrigatórios**: Bloquear avanço sem preencher campos com `*`
3. **Máscaras de input**: CPF, CNPJ, Telefone, CEP
4. **API ViaCEP**: Auto-preenchimento de endereço

### Prioridade Média (Sprint 2)
5. **Sistema de Upload**: Implementar storage e preview de arquivos
6. **Módulo de Agendamento**: Calendário para Etapas 4 e 11
7. **Geração de PDF**: Proposta comercial (Etapa 10)
8. **Loading states e toasts**: Feedback visual de ações

### Prioridade Baixa (Sprint 3)
9. **Sistema de Aprovações**: Fluxo de aprovação Gestor ADM
10. **Conversão Lead → Cliente**: Lógica completa na Etapa 16
11. **Criação automática OS-13**: Integração entre fluxos
12. **Notificações**: Email e in-app

---

## 📝 Notas Importantes

### Diferenças entre OS 01-04 e OS 05-13
- **OS 01-04**: Fluxo comercial completo (Lead → Proposta → Contrato → Cliente)
- **OS 05-13**: Fluxo operacional (Cliente já convertido, foco em execução)

### Performance
- O componente atual tem **~2000 linhas de código**
- Para melhorar performance e manutenibilidade, considere:
  - Extrair cada etapa para um componente separado
  - Usar React.memo para evitar re-renders desnecessários
  - Implementar lazy loading para etapas não visitadas

### Acessibilidade
- Todos os inputs possuem labels associados
- Navegação por teclado funcional
- Mensagens de erro descritivas (quando implementadas)

### Mobile
- Layout responsivo com `grid-cols-1 md:grid-cols-2`
- ScrollArea horizontal para stepper
- Botões com tamanho adequado para touch

---

## 🎯 Conclusão

A implementação do fluxo completo das OS 01-04 com 16 etapas foi concluída com sucesso. O componente está funcional, com todas as interfaces criadas, estados gerenciados e cálculos automáticos implementados.

A próxima fase crítica é a **integração com o backend** para persistência de dados e validações, seguida pela implementação dos módulos de **upload de arquivos** e **geração de documentos**.

Este documento serve como referência para o desenvolvimento das próximas fases e para onboarding de novos desenvolvedores no projeto.

---

**Última atualização**: 2025-11-09  
**Versão**: 1.0  
**Autor**: Equipe Minerva Engenharia
