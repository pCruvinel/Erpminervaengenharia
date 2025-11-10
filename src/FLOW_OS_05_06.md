# Fluxo OS 05-06: Contratos de Assessoria

## Visão Geral

Este documento descreve a implementação completa do fluxo de trabalho para as **OS 05 (Assessoria Técnica Mensal)** e **OS 06 (Laudo Pontual)**, que fazem parte do setor de Assessoria da Minerva Engenharia.

## Tipos de OS

### OS 05 - Assessoria Técnica Mensal (Contrato Anual)
- **Descrição**: Contrato anual de assessoria com visitas mensais e acompanhamento contínuo
- **Fluxo**: 12 etapas de negociação e fechamento
- **Conversão**: Após conclusão → cria automaticamente **OS 12** (Execução de Assessoria)
- **Responsável Principal**: ADM + Assessoria

### OS 06 - Laudo Pontual (Contrato Pontual)
- **Descrição**: Laudo técnico específico ou serviço de assessoria pontual
- **Fluxo**: 12 etapas de negociação e fechamento
- **Conversão**: Após conclusão → cria automaticamente **OS 11** (Execução de Laudo)
- **Responsável Principal**: ADM + Assessoria

## Estrutura do Fluxo (12 Etapas)

### Etapa 1: Identificação do Cliente/Lead
- **Responsável**: ADM
- **Ação**: Selecionar cliente existente ou cadastrar novo lead
- **Componente**: Combobox com busca + Dialog de cadastro
- **Dados Capturados**:
  - Nome, Email, Telefone, Origem
- **Status**: Igual à Etapa 1 do Fluxo de Obras

### Etapa 2: Seleção do Tipo de OS
- **Responsável**: ADM
- **Ação**: Escolher entre OS 05 ou OS 06
- **Componente**: RadioGroup com cards descritivos
- **Opções**:
  - OS 05: Assessoria Técnica Mensal (Contrato Anual)
  - OS 06: Laudo Pontual (Contrato Pontual)
- **Conversão**: Sistema mostra para qual OS será convertido após finalização

### Etapa 3: Follow-up 1 (Entrevista Inicial)
- **Responsável**: ADM
- **Ação**: Realizar entrevista inicial com cliente
- **Componente**: Formulário completo
- **Dados Capturados**:
  - Idade da edificação/empreendimento
  - Motivo da procura/problema
  - Quando aconteceu
  - O que foi feito a respeito
  - Já existe escopo definido (Sim/Parcial/Não)
  - Previsão orçamentária
  - Grau de urgência (Baixo/Médio/Alto/Urgente)
  - Contato Local (Nome, Telefone, Cargo)
- **Status**: Idêntico à Etapa 3 do Fluxo de Obras

### Etapa 4: Formulário Memorial (Escopo e Prazos)
- **Responsável**: Assessoria
- **Ação**: Definir escopo detalhado do serviço
- **Componente**: Formulário de escopo
- **Dados Capturados**:
  - Descrição do Serviço
  - Escopo Detalhado (Textarea)
  - Prazo Estimado
  - Observações
- **Status**: Adaptado da Etapa 8 do Fluxo de Obras

### Etapa 5: Precificação (Formulário Financeiro)
- **Responsável**: Assessoria
- **Ação**: Calcular valor do serviço
- **Componente**: Formulário financeiro com cálculo automático
- **Dados Capturados**:
  - Valor Base
  - Descontos (%)
  - Acréscimos (R$)
  - Observações Financeiras
- **Cálculo Automático**: Valor Total = (Valor Base × (1 - Desconto/100)) + Acréscimos
- **Status**: Idêntico à Etapa 9 do Fluxo de Obras

### Etapa 6: Gerar Proposta Comercial
- **Responsável**: ADM
- **Ação**: Gerar documento de proposta
- **Componente**: Botão de geração + Card de confirmação
- **Funcionalidade**:
  - Botão "Gerar Proposta Comercial" (Primary)
  - Após gerar: Card verde com data e botão "Baixar"
- **Status**: Idêntico à Etapa 10 do Fluxo de Obras

### Etapa 7: Agendar Visita (Apresentação)
- **Responsável**: ADM
- **Ação**: Agendar reunião de apresentação
- **Componente**: Input datetime-local
- **Dados Capturados**:
  - Data e Hora do Agendamento
- **Confirmação**: Card verde com ícone de calendário
- **Status**: Idêntico à Etapa 11 do Fluxo de Obras

### Etapa 8: Realizar Visita (Apresentação)
- **Responsável**: ADM
- **Ação**: Confirmar realização da apresentação
- **Componente**: Checkbox de confirmação
- **Dados Capturados**:
  - Apresentação Realizada (boolean)
- **Confirmação**: Card verde após marcar checkbox
- **Status**: Idêntico à Etapa 12 do Fluxo de Obras

### Etapa 9: Follow-up 3 (Pós-Apresentação)
- **Responsável**: ADM
- **Ação**: Registrar feedback da apresentação
- **Componente**: Formulário de follow-up
- **Dados Capturados**:
  - Nível de interesse (Alto/Médio/Baixo)
  - Pontos de dúvida levantados
  - Próximos passos acordados
  - Data prevista para retorno
- **Status**: Idêntico à Etapa 13 do Fluxo de Obras

### Etapa 10: Gerar Contrato (Upload)
- **Responsável**: ADM
- **Ação**: Upload do contrato preenchido
- **Componente**: Dual Card (Download Modelo + Upload)
- **Funcionalidade**:
  - Card 1: Download do modelo de contrato (.docx)
  - Card 2: Upload do contrato assinado (PDF/DOCX até 10MB)
- **Confirmação**: Card verde com nome do arquivo
- **Status**: Idêntico à Etapa 14 do Fluxo de Obras

### Etapa 11: Contrato Assinado
- **Responsável**: ADM
- **Ação**: Confirmar assinatura do contrato
- **Componente**: Checkbox + Input de data
- **Dados Capturados**:
  - Contrato Assinado (boolean)
  - Data de Assinatura
- **Confirmação**: Card verde com data formatada
- **Status**: Idêntico à Etapa 15 do Fluxo de Obras

### Etapa 12: Ativar Contrato (Finalização)
- **Responsável**: Sistema
- **Ação**: Ativar contrato e criar OS de execução
- **Componente**: Tela de finalização
- **Funcionalidade**:
  - Alert informativo (fundo primary/10)
  - Ícone grande de CheckCircle
  - Texto "Pronto para Ativação"
  - Botão **"Ativar Contrato"** (Primary: #06b6d4)
  - Mensagem sobre criação automática da próxima OS
- **Conversão Automática**:
  - OS 05 → Cria **OS 12** (Execução de Assessoria)
  - OS 06 → Cria **OS 11** (Execução de Laudo)

## Componente Implementado

### Arquivo: `/components/os/os-details-assessoria-page.tsx`

**Props**:
```typescript
interface OSDetailsAssessoriaPageProps {
  onBack?: () => void;
  tipoOS?: 'OS-05' | 'OS-06';
}
```

**Estados Principais**:
- `currentStep`: Controla a etapa atual (1-12)
- `selectedLeadId`: ID do cliente/lead selecionado
- `etapa1Data` a `etapa12Data`: Dados de cada etapa

**Navegação**:
- Sidebar de progresso (esquerda) com todas as 12 etapas
- Header com breadcrumbs e navegação Anterior/Próxima
- Botões de etapa clicáveis (só para etapas já visitadas)
- Estados visuais: Concluída (verde), Atual (primary), Bloqueada (cinza)

## Integração com o Sistema

### Rota de Acesso
1. Dashboard → "Ordens de Serviço" → "Criar Nova OS"
2. Hub de Criação → Card "Assessoria"
3. Opção: "Novo Lead (OS 05, 06)"
4. Rota: `/os/criar/assessoria-lead`

### Mapeamento no App.tsx
```typescript
'/os/criar/assessoria-lead' → 'wizard-assessoria-lead' → <OSDetailsAssessoriaPage />
```

### Navegação no Hub
Arquivo: `/components/os/os-creation-hub.tsx`
- Card "Assessoria" já inclui a opção "Novo Lead (OS 05, 06)"
- Rota configurada para navegar corretamente

## Design System Aplicado

### Cores
- **Primary**: `#D3AF37` (Dourado Minerva)
- **Secondary**: `#DDC063` (Dourado Claro)
- **Success**: Verde para etapas concluídas
- **Neutral**: Tons de cinza para elementos secundários

### Componentes Shadcn Utilizados
- Card, CardHeader, CardTitle, CardContent
- Button (variants: default, outline, ghost)
- Badge (variants: default, outline)
- Input, Textarea, Label
- Select, RadioGroup, Checkbox
- Dialog, Popover, Command (Combobox)
- Alert, AlertDescription
- ScrollArea, Separator

### Layout
- **Sidebar Fixa**: 256px (w-64) com lista de etapas
- **Conteúdo Principal**: Flex-1 com scroll
- **Header**: Título, breadcrumb, navegação
- **Cards**: Border-radius xl, shadow-sm, hover:shadow-md
- **Espaçamento**: Padrão 1.5rem (24px) em todos os cards

## Validações e Regras

1. **Etapa 1**: Obrigatório selecionar ou cadastrar cliente
2. **Etapa 2**: Obrigatório selecionar tipo de OS
3. **Etapa 6**: Só pode avançar após gerar proposta
4. **Etapa 8**: Só pode avançar após confirmar apresentação
5. **Etapa 11**: Só pode avançar após confirmar assinatura
6. **Etapa 12**: Botão de ativação cria nova OS automaticamente

## Conversão Automática

### Após Etapa 12 - OS 05 → OS 12
```javascript
if (tipoOS === 'OS-05') {
  // Criar OS-12 (Execução de Assessoria Mensal)
  // Copiar dados do cliente, contrato e valores
  // Definir status inicial: "Em Andamento"
  // Redirecionar para dashboard da OS-12
}
```

### Após Etapa 12 - OS 06 → OS 11
```javascript
if (tipoOS === 'OS-06') {
  // Criar OS-11 (Execução de Laudo Pontual)
  // Copiar dados do cliente, contrato e valores
  // Definir status inicial: "Em Andamento"
  // Redirecionar para dashboard da OS-11
}
```

## Funcionalidades Pendentes

### Para Implementação Futura
1. **Persistência**: Integrar com backend/Supabase
2. **Upload Real**: Implementar upload de arquivos
3. **Geração de Documentos**: PDFs da proposta e contrato
4. **Notificações**: Alertas por email em cada etapa
5. **Timeline**: Histórico visual do progresso
6. **Validação Avançada**: Campos obrigatórios por etapa
7. **Autosave**: Salvar progresso automaticamente
8. **Conversão Real**: Criar OS 11/12 no banco de dados

## Testes Recomendados

### Casos de Teste
1. ✅ Fluxo completo OS 05 (12 etapas)
2. ✅ Fluxo completo OS 06 (12 etapas)
3. ✅ Navegação entre etapas (Next/Prev)
4. ✅ Sidebar de progresso (clique em etapas)
5. ✅ Validação de campos obrigatórios
6. ✅ Botão "Voltar" para Hub de Criação
7. ✅ Estados visuais (concluída/atual/bloqueada)
8. ⏳ Upload de arquivos
9. ⏳ Geração de proposta
10. ⏳ Conversão para OS 11/12

## Próximos Passos

### Fase 1: Completar OS 05-06 ✅
- [x] Criar componente `OSDetailsAssessoriaPage`
- [x] Implementar 12 etapas do fluxo
- [x] Integrar com Hub de Criação
- [x] Adicionar rota no App.tsx
- [x] Documentar fluxo completo

### Fase 2: OS 07-10 (Em Planejamento)
- [ ] OS 07: Solicitação de Reforma
- [ ] OS 08: Vistoria Técnica
- [ ] OS 09: Requisição de Compras
- [ ] OS 10: Requisição de Mão de Obra

### Fase 3: OS 11-13 (Execução)
- [ ] OS 11: Execução de Laudo Pontual
- [ ] OS 12: Execução de Assessoria Mensal
- [ ] OS 13: Execução de Contrato de Obra

## Referências

- **Design System**: `/DESIGN_SYSTEM.md`
- **Fluxo OS 01-04**: `/FLOW_OS_01_04.md`
- **Guia de Implementação**: `/IMPLEMENTATION_GUIDE_OS_01_04.md`
- **Sistema CSS**: `/CSS_SYSTEM.md`
- **Componente Base**: `/components/os/os-details-workflow-page.tsx`
- **Novo Componente**: `/components/os/os-details-assessoria-page.tsx`

---

**Versão**: 1.0  
**Data**: 2024-01-09  
**Autor**: Sistema Minerva ERP  
**Status**: ✅ Implementado e Funcional
