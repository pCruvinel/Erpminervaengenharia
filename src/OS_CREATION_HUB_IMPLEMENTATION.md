# Implementação do Hub de Criação de OS (Launcher)

## Resumo
Implementado o Hub de Criação de Ordens de Serviço conforme especificação do planejamento, seguindo o Design System v2.0 (Dourado), com navegação estruturada para os 13 tipos de OS agrupados por setor.

## Arquivos Criados/Modificados

### 1. Componentes Criados

#### `/components/os/os-creation-card.tsx`
**Descrição**: Componente reutilizável para cada card de setor.
**Props**:
- `icon`: Ícone Lucide React
- `title`: Título do setor
- `description`: Descrição do setor
- `options`: Array de opções de criação (label + route)
- `iconColor`: 'primary' ou 'secondary'
- `onNavigate`: Função de navegação

**Funcionalidades**:
- Card responsivo com altura completa
- Ícone colorido em badge circular
- Lista de botões ghost com ícone ArrowRight
- Hover state com cor primária

#### `/components/os/os-creation-hub.tsx`
**Descrição**: Página principal do hub de criação.
**Estrutura**:
- Header com h1 e descrição
- Grid responsivo 1→2 colunas
- 4 cards de setores (Obras, Assessoria, Financeiro, RH)

**Mapeamento de OS**:
1. **Obras** (Ícone: HardHat, Cor: Primary)
   - Novo Lead (OS 01-04)
   - Start de Contrato (OS 13)

2. **Assessoria** (Ícone: ClipboardCheck, Cor: Primary)
   - Novo Lead (OS 05, 06)
   - Start Contrato (OS 11, 12)
   - Solicitação de Reforma (OS 07)
   - Vistoria Técnica (OS 08)

3. **Financeiro** (Ícone: DollarSign, Cor: Secondary)
   - Requisição de Compras (OS 09)

4. **RH** (Ícone: Users, Cor: Secondary)
   - Requisição de Mão de Obra (OS 10)

#### `/components/os/os-wizard-placeholder.tsx`
**Descrição**: Componente placeholder para wizards ainda não implementados.
**Funcionalidades**:
- Card informativo com ícone AlertCircle
- Descrição do que o wizard fará
- Lista de passos que serão incluídos
- Botão "Voltar ao Hub de Criação"

### 2. Modificações no App.tsx

#### Rotas Adicionadas
- `os-criar`: Hub de criação
- `wizard-obras-lead`: Wizard OS 01-04
- `wizard-start-contrato-obra`: Wizard OS 13
- `wizard-assessoria-lead`: Wizard OS 05-06
- `wizard-start-contrato-assessoria`: Wizard OS 11-12
- `wizard-solicitacao-reforma`: Wizard OS 07
- `wizard-vistoria`: Wizard OS 08
- `wizard-requisicao-compras`: Wizard OS 09
- `wizard-requisicao-mao-obra`: Wizard OS 10

#### Lógica de Navegação
Implementado `handleNavigate` com mapeamento de rotas:
```typescript
const wizardRouteMap: Record<string, Page> = {
  '/os/criar/obras-lead': 'wizard-obras-lead',
  '/os/criar/start-contrato-obra': 'wizard-start-contrato-obra',
  // ... etc
};
```

#### Breadcrumbs
Adicionado suporte para:
- `os-criar`: "Início > Ordens de Serviço > Criar Nova OS"
- `wizard-*`: "Início > Ordens de Serviço > Criar Nova OS > Wizard"

## Design System v2.0

✅ **Cores**:
- Primary (Dourado): `rgb(211, 175, 55)` - Cards Obras e Assessoria
- Secondary (Dourado Claro): `rgb(221, 192, 99)` - Cards Financeiro e RH
- Background: `bg-neutral-100` (rgb(244, 244, 245))

✅ **Componentes ShadCN**:
- Card com `bg-card` (white) e `shadow-card`
- Button variant="ghost" com hover state
- CardTitle, CardDescription

✅ **Ícones Lucide React**:
- HardHat (Obras)
- ClipboardCheck (Assessoria)
- DollarSign (Financeiro)
- Users (RH)
- ArrowRight (navegação)
- AlertCircle (placeholders)
- ArrowLeft (voltar)

## Fluxo de Navegação

### 1. Acesso ao Hub
**Rota**: `/os/criar`
**Como chegar**:
- Botão "Criar Nova OS" na página de lista de OS
- (Futuro) Menu lateral "Nova OS"

### 2. Seleção de Setor e Tipo
Usuário clica em um dos botões dentro dos cards:
- **Obras**: "Novo Lead (OS 01-04)" ou "Start de Contrato (OS 13)"
- **Assessoria**: 4 opções diferentes
- **Financeiro**: "Requisição de Compras (OS 09)"
- **RH**: "Requisição de Mão de Obra (OS 10)"

### 3. Redirecionamento para Wizard
Sistema redireciona para a página do wizard correspondente (atualmente placeholder).

### 4. Próximos Passos (Implementação Futura)
Cada wizard terá 2 passos:
1. **Passo 1**: Identificação do Cliente/Lead/Centro de Custo
   - Combobox para seleção
   - Dialog/Sheet para criação de novo
2. **Passo 2**: Detalhes da Solicitação
   - Select de Tipo de OS (filtrado)
   - Campos específicos do tipo
3. **Criação**: Sistema cria OS no Supabase
4. **Redirecionamento**: `/os/[id]` com fluxo de trabalho iniciado

## Estrutura de Arquivos

```
/components/os/
  ├── os-creation-hub.tsx          (Hub principal - 4 cards)
  ├── os-creation-card.tsx         (Card reutilizável)
  ├── os-wizard-placeholder.tsx    (Placeholder para wizards)
  ├── os-list-page.tsx             (Lista de OS - origem)
  └── ... (outros componentes)
```

## Responsividade

✅ **Grid de Cards**:
- Mobile: 1 coluna
- Tablet/Desktop: 2 colunas

✅ **Botões**:
- Full width nos cards
- Hover states bem definidos
- Ícones alinhados (label à esquerda, arrow à direita)

## UX/UI Implementado

### Problema Resolvido
❌ **Antes**: Usuário tinha que memorizar 13 códigos de OS
✅ **Agora**: Interface visual com agrupamento por setor e descrições claras

### Hierarquia Visual
1. **Título Principal**: "Criar Nova Ordem de Serviço"
2. **Subtítulo**: Instrução clara de ação
3. **Cards de Setor**: Divididos visualmente
4. **Opções de Criação**: Botões ghost com hover primário

### Estados Implementados
- ✅ Hover nos botões (bg primary/5)
- ✅ Ícones com badge de fundo neutral-100
- ✅ Cor primária nos textos e ícones
- ✅ Placeholders informativos para wizards

## Próximos Passos (Não Implementados)

### 1. Wizards Reais
Substituir placeholders por wizards funcionais:
- [ ] Wizard Obras Lead (OS 01-04)
- [ ] Wizard Start Contrato Obra (OS 13)
- [ ] Wizard Assessoria Lead (OS 05-06)
- [ ] Wizard Start Contrato Assessoria (OS 11-12)
- [ ] Wizard Solicitação de Reforma (OS 07)
- [ ] Wizard Vistoria (OS 08)
- [ ] Wizard Requisição de Compras (OS 09)
- [ ] Wizard Requisição de Mão de Obra (OS 10)

### 2. Funcionalidades dos Wizards
- [ ] Step 1: Seleção/Criação de Cliente/Lead
- [ ] Step 2: Detalhes da OS
- [ ] Validação de campos
- [ ] Integração com Supabase
- [ ] Progress indicator (Step 1 de 2)
- [ ] Botões Voltar/Próximo/Criar

### 3. Componentes Específicos
- [ ] Combobox de Clientes/Leads
- [ ] Dialog/Sheet de Criação de Lead
- [ ] Formulário com ViaCEP
- [ ] Select de Tipo de OS filtrado
- [ ] Tabela dinâmica de itens (OS 09)

## Conformidade com PRD

✅ **RF-017**: Criação de nova OS com seleção de tipo
✅ **Design System v2.0**: Cores, tipografia e componentes
✅ **UX**: Agrupamento por setor para facilitar seleção
✅ **Navegação**: Estrutura clara de rotas
✅ **Componentização**: Código reutilizável e organizado

## Testes Realizados

✅ Navegação do botão "Criar Nova OS" para o hub
✅ Renderização dos 4 cards com ícones corretos
✅ Cores primary e secondary nos ícones
✅ Navegação dos botões para placeholders de wizards
✅ Botão "Voltar" nos placeholders
✅ Breadcrumbs corretos em todas as páginas
✅ Responsividade do grid de cards
