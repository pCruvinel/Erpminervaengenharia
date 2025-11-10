# Integração do Wizard OS 01-04 com Hub de Criação

## Resumo da Implementação

Integrado com sucesso o wizard completo das OS 01-04 (16 etapas) ao Hub de Criação de Ordens de Serviço.

## Mudanças Realizadas

### 1. Atualização do `OSDetailsWorkflowPage` Component

**Arquivo**: `/components/os/os-details-workflow-page.tsx`

#### Adicionado Interface de Props
```typescript
interface OSDetailsWorkflowPageProps {
  onBack?: () => void;
}

export function OSDetailsWorkflowPage({ onBack }: OSDetailsWorkflowPageProps = {}) {
  // ...
}
```

#### Adicionado Botão "Voltar"
Implementado botão condicional no topo da página (acima do stepper horizontal):

```tsx
{onBack && (
  <div className="border-b border-neutral-200 px-6 py-3 bg-white">
    <Button variant="ghost" onClick={onBack} className="gap-2">
      <ChevronLeft className="h-4 w-4" />
      Voltar ao Hub de Criação
    </Button>
  </div>
)}
```

**Características**:
- ✅ Só aparece quando `onBack` é fornecido
- ✅ Usa ícone `ChevronLeft` do Lucide React
- ✅ Estilo ghost button (minimalista)
- ✅ Background branco com borda inferior
- ✅ Não interfere no stepper horizontal

### 2. Atualização do `App.tsx`

#### Navegação Atualizada
Removido placeholder e direcionado para o wizard real:

```typescript
{currentPage === 'wizard-obras-lead' && (
  <OSDetailsWorkflowPage onBack={() => setCurrentPage('os-criar')} />
)}
```

#### Breadcrumb Específico
```typescript
else if (currentPage === 'wizard-obras-lead') {
  crumbs.push({ label: 'Ordens de Serviço', href: '#' });
  crumbs.push({ label: 'Criar Nova OS', href: '#' });
  crumbs.push({ label: 'Novo Lead - Obras (OS 01-04)' });
}
```

## Fluxo de Navegação Completo

### Caminho do Usuário

```
1. Lista de OS (/os-list)
   └─> Clica em "Criar Nova OS"
       
2. Hub de Criação (/os-criar)
   └─> Vê 4 cards de setores
       └─> Clica em "Novo Lead (OS 01-04)" no card "Obras"
           
3. Wizard OS 01-04 (/wizard-obras-lead)
   └─> Vê 16 etapas no stepper horizontal
   └─> Botão "Voltar ao Hub de Criação" no topo
   └─> Etapa 1 ativa: "Identificação do Cliente/Lead"
```

### Navegação de Volta

```
Wizard OS 01-04
└─> Clica em "Voltar ao Hub de Criação"
    └─> Retorna para Hub de Criação (/os-criar)
        └─> Pode escolher outro tipo de OS ou voltar à lista
```

## Breadcrumbs em Cada Página

### Lista de OS
```
Início > Ordens de Serviço
```

### Hub de Criação
```
Início > Ordens de Serviço > Criar Nova OS
```

### Wizard OS 01-04
```
Início > Ordens de Serviço > Criar Nova OS > Novo Lead - Obras (OS 01-04)
```

## Detalhes do Wizard OS 01-04

### 16 Etapas Implementadas

1. **Identificação do Cliente/Lead** (ADM)
   - Combobox para selecionar lead existente
   - Dialog para criar novo lead
   - Integração com ViaCEP

2. **Seleção do Tipo de OS** (ADM)
   - OS 01: Perícia de Fachada
   - OS 02: Revitalização de Fachada
   - OS 03: Reforço Estrutural
   - OS 04: Outros

3. **Follow-up 1** (Entrevista Inicial) (ADM)
4. **Agendar Visita Técnica** (ADM)
5. **Realizar Visita** (Obras)
6. **Follow-up 2** (Pós-Visita) (Obras)
7. **Fazer Memorial** (Upload) (Obras)
8. **Formulário Memorial** (Escopo) (Obras)
9. **Precificação** (Obras)
10. **Gerar Proposta Comercial** (ADM)
11. **Agendar Visita** (Apresentação) (ADM)
12. **Realizar Visita** (Apresentação) (ADM)
13. **Follow-up 3** (Pós-Apresentação) (ADM)
14. **Gerar Contrato** (Upload) (ADM)
15. **Contrato Assinado** (ADM)
16. **Iniciar Contrato de Obra** (Sistema)

### Funcionalidades do Wizard

✅ **Stepper Horizontal Compacto**
- 16 etapas visíveis em scroll horizontal
- Indicadores de estado: Concluída (✓), Atual (•), Bloqueada (🔒)
- Cores: Verde (concluída), Dourado (atual), Cinza (pendente)
- Navegação por clique nas etapas já acessadas

✅ **Formulários por Etapa**
- Campos específicos para cada etapa
- Validações inline
- Preview de dados selecionados
- Campos obrigatórios marcados com *

✅ **Gestão de Estado**
- Estado separado para cada etapa
- Preservação de dados ao navegar entre etapas
- Cálculos automáticos (Etapa 8 e 9)

✅ **Componentes UI**
- Combobox (pesquisa de leads)
- Dialog (criar novo lead)
- Alerts informativos
- Cards de preview
- Botões de navegação (Anterior/Próximo)

## Compatibilidade com Sistema Existente

### Modo Duplo do OSDetailsWorkflowPage

O componente agora funciona em dois modos:

#### Modo 1: Criação (Novo Lead)
```tsx
<OSDetailsWorkflowPage onBack={() => setCurrentPage('os-criar')} />
```
- Exibe botão "Voltar ao Hub de Criação"
- Usuário está criando uma nova OS
- Origem: Hub de Criação

#### Modo 2: Visualização/Edição (OS Existente)
```tsx
<OSDetailsWorkflowPage />
```
- Não exibe botão "Voltar"
- Usuário está editando uma OS existente
- Origem: Lista de OS ou outro local

### Backward Compatibility

✅ **Chamadas Existentes Não Quebram**
- `onBack` é opcional (prop com valor default `{}`)
- Componente funciona sem `onBack`
- Comportamento anterior preservado

## Próximos Passos (Outros Wizards)

### Wizards a Implementar

#### 1. Start de Contrato de Obra (OS 13)
**Status**: Placeholder
**Rota**: `/os/criar/start-contrato-obra`
**Necessário**: Criar componente wizard simplificado

#### 2. Novo Lead - Assessoria (OS 05, 06)
**Status**: Placeholder
**Rota**: `/os/criar/assessoria-lead`
**Necessário**: Adaptar wizard OS 01-04 ou criar novo

#### 3. Start Contrato Assessoria (OS 11, 12)
**Status**: Placeholder
**Rota**: `/os/criar/start-contrato-assessoria`
**Necessário**: Criar componente wizard

#### 4. Solicitação de Reforma (OS 07)
**Status**: Placeholder
**Rota**: `/os/criar/solicitacao-reforma`
**Necessário**: Criar formulário específico

#### 5. Vistoria Técnica (OS 08)
**Status**: Placeholder
**Rota**: `/os/criar/vistoria`
**Necessário**: Criar formulário específico

#### 6. Requisição de Compras (OS 09)
**Status**: Placeholder
**Rota**: `/os/criar/requisicao-compras`
**Necessário**: Criar tabela dinâmica de itens

#### 7. Requisição de Mão de Obra (OS 10)
**Status**: Placeholder
**Rota**: `/os/criar/requisicao-mao-obra`
**Necessário**: Criar formulário de requisição

## Padrão para Novos Wizards

### Estrutura Recomendada

```tsx
interface OSWizardProps {
  onBack?: () => void;
}

export function OSWizardNome({ onBack }: OSWizardProps = {}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Botão Voltar */}
      {onBack && (
        <div className="border-b border-neutral-200 px-6 py-3 bg-white">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar ao Hub de Criação
          </Button>
        </div>
      )}
      
      {/* Conteúdo do Wizard */}
      <div className="p-6">
        {/* ... */}
      </div>
    </div>
  );
}
```

### Integração no App.tsx

```tsx
{currentPage === 'wizard-nome' && (
  <OSWizardNome onBack={() => setCurrentPage('os-criar')} />
)}
```

### Breadcrumb

```tsx
else if (currentPage === 'wizard-nome') {
  crumbs.push({ label: 'Ordens de Serviço', href: '#' });
  crumbs.push({ label: 'Criar Nova OS', href: '#' });
  crumbs.push({ label: 'Nome do Wizard' });
}
```

## Testes Realizados

✅ Navegação do Hub → Wizard OS 01-04
✅ Botão "Voltar" funcional
✅ Breadcrumbs corretos
✅ Stepper horizontal visível
✅ Etapa 1 ativa (Identificação do Cliente/Lead)
✅ Compatibilidade com uso existente sem `onBack`
✅ Layout responsivo mantido
✅ Cores do Design System v2.0 (Dourado) aplicadas

## Arquitetura Visual

```
┌─────────────────────────────────────────────────────────┐
│ [←] Voltar ao Hub de Criação                            │ ← Botão opcional
├─────────────────────────────────────────────────────────┤
│ [1] [2] [3] [4] [5] ... [16]                            │ ← Stepper horizontal
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ╔══════════════════════════════════════════════════╗  │
│  ║  Etapa 1: Identificação do Cliente/Lead          ║  │
│  ║                                                   ║  │
│  ║  [Combobox: Selecionar Lead]                     ║  │
│  ║  [Botão: Criar Novo Lead]                        ║  │
│  ║                                                   ║  │
│  ║  [Preview do Lead Selecionado]                   ║  │
│  ║                                                   ║  │
│  ║              [Cancelar]  [Próximo →]             ║  │
│  ╚══════════════════════════════════════════════════╝  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Conclusão

✅ **Integração Completa**: Wizard OS 01-04 totalmente integrado ao Hub de Criação
✅ **UX Melhorada**: Navegação clara com breadcrumbs e botão voltar
✅ **Código Limpo**: Interface de props opcional, mantém compatibilidade
✅ **Padrão Estabelecido**: Modelo para implementar os outros 7 wizards
✅ **Design System**: Seguindo cores e componentes do Minerva Design System v2.0
