# Implementação do Fluxo de Trabalho - OS de Obras

## 📋 Visão Geral

Foi implementada a página completa de **"Detalhes da Ordem de Serviço"** com o fluxo de trabalho de 15 etapas para OS de Obras (OS 01, 02, 03, 04) do ERP Minerva Engenharia.

### ⚠️ Importante: Fluxo Especial de Criação

As **OS 01, 02, 03 e 04** possuem um **fluxo especial com seleção de Lead**:
- Na página de **Criar Nova OS**, o campo "Cliente" **não é exibido** para esses tipos
- Um aviso informativo é mostrado indicando que o cliente será definido após o **Passo 1: Selecionar Lead ou Cadastrar Novo**
- O botão de criação muda para **"Criar OS e Selecionar Lead"**
- Após criar a OS, o usuário é direcionado para o workflow onde selecionará/cadastrará o Lead, e o cliente será vinculado automaticamente

## 🎯 Componente Principal

**Arquivo:** `/components/os/os-details-workflow-page.tsx`

### Estrutura da Página

A página utiliza um **layout de 2 colunas**:

#### Coluna Esquerda (70%)
Contém o **Stepper Vertical** com 15 etapas sequenciais do fluxo de trabalho:

1. **Cadastro do Lead** (Concluído)
2. **Atribuição ao Lead** (Concluído)  
3. **Follow-up 1: Entrevista Inicial** (Em Andamento)
4. **Agendar Visita Técnica** (Pendente)
5. **Visita Técnica e Follow-up 2** (Pendente)
6. *(Continua na etapa 5)*
7. **Memorial Descritivo e Precificação** (Pendente)
8. *(Continua na etapa 7)*
9. **Gerar Proposta Comercial** (Pendente)
10. **Agendar Apresentação** (Pendente)
11. **Follow-up 3: Pós-Apresentação** (Pendente)
12. *(Continua na etapa 11)*
13. **Fechamento de Contrato** (Pendente)
14. *(Continua na etapa 13)*
15. **Concluir e Iniciar Obra** (Pendente)

#### Coluna Direita (30%)
Contém 2 cards fixos:

1. **Informações da OS**
   - Código OS: OS-2025-001
   - Status: Em Andamento
   - Cliente: Condomínio Fit One
   - Responsável Atual: Diego (Coordenador de Obras)
   - Data de Entrada
   - Prazo Estimado

2. **Histórico e Comentários**
   - Timeline de atividades
   - Feed de eventos (status, comentários, uploads)
   - Formulário para adicionar novos comentários

## 🎨 Design System

### Cores Aplicadas
- **Primary:** `#06b6d4` (Cyan/Teal) - Elementos principais, badges de status ativo
- **Secondary:** `#f97316` (Orange) - Botões de ação secundária (agendar)
- **Success:** Verde - Status "Concluído"
- **Neutral:** Cinza - Status "Pendente"

### Estados das Etapas

Cada etapa pode ter 3 estados, gerenciados pelo componente `StepWrapper`:

1. **Completed (Concluído)**
   - Ícone: ✓ Check verde
   - Badge: "Concluído" (verde)
   - Campos: Read-only (disabled)

2. **Active (Em Andamento)**
   - Ícone: ○ Circle (primary)
   - Badge: "Em Andamento" (primary)
   - Border: Destacado com cor primary
   - Campos: Editáveis e funcionais

3. **Pending (Pendente)**
   - Ícone: 🔒 Lock (cinza)
   - Badge: "Pendente" (cinza)
   - Opacity: 60%
   - Campos: Desabilitados (pointer-events-none)

## 📝 Detalhamento das Etapas

### Etapa 1: Selecionar Lead
**Status:** Ativo (primeira etapa do fluxo)
**Responsável:** ADM

Esta etapa permite duas opções:

#### Opção A: Selecionar Lead Existente
- Combobox com busca de leads do banco de dados (tabela `clientes` com `status = 'lead'`)
- Busca por nome, CPF ou CNPJ
- Preview dos dados do lead selecionado:
  - Nome/Razão Social
  - CPF/CNPJ
  - Tipo de Edificação
  - Quantidade de Unidades
  - Endereço completo
- Botão "Confirmar Lead e Avançar" → vai para Etapa 2 em **modo conferência**

#### Opção B: Cadastrar Novo Lead
- Botão "Cadastrar Novo Lead"
- Redireciona para Etapa 2 em **modo cadastro**
- Permite criar um novo lead que não existe no banco

### Etapa 2: Cadastrar/Conferir Lead
**Status:** Pendente (ativa após Etapa 1)
**Responsável:** ADM

Esta etapa tem **2 modos de operação**:

#### Modo A: Conferência (lead selecionado na Etapa 1)
- Todos os campos em **read-only** (disabled)
- Dados pré-preenchidos do lead selecionado
- Alert verde: "Modo: Conferência de Dados"
- Botão: "Confirmar e Avançar"

#### Modo B: Cadastro (veio do botão "Cadastrar Novo Lead")
- Todos os campos **editáveis**
- Formulário vazio para preencher
- Alert primário: "Modo: Cadastrar Novo Lead"
- Botão: "Salvar Lead e Avançar"

Campos mapeados do banco (`clientes`):
- Nome / Razão Social *
- CPF / CNPJ *
- Tipo de Pessoa (PF/PJ) *
- Tipo de Edificação *
- Qtd. Unidades Autônomas *
- Qtd. Blocos *
- Tipo de Telhado *
- Endereço Completo *
- Telefone
- E-mail

Ações:
- Botão "Voltar" → retorna à Etapa 1
- Botão "Salvar Lead e Avançar" (modo cadastro) ou "Confirmar e Avançar" (modo conferência)

**Importante:** Após confirmar a Etapa 2, o cliente é vinculado à OS e o status do lead pode ser atualizado para 'cliente' no banco de dados.

### Etapa 3: Follow-up 1 - Entrevista Inicial
**Status:** Em Andamento (Ativo)  
**Responsável:** ADM

Campos mapeados (`OS_follow_up_um`):
- Idade da Edificação
- Tempo de Ocorrência
- Motivo do Contato
- Situação já ocorreu antes?
- Escopo Inicial dos Serviços
- Orçamento Prévio
- Grau de Urgência (Select: Baixo/Médio/Alto)
- **Upload Obrigatório:** Documentos do Cliente

Ações:
- Salvar Rascunho
- Concluir Etapa

### Etapa 4: Agendar Visita Técnica
**Status:** Pendente  
**Responsável:** ADM

- Botão "Agendar no Calendário" (Secondary color: #f97316)
- Integração futura com módulo de Calendário

### Etapa 5-6: Visita Técnica e Follow-up 2
**Status:** Pendente  
**Responsável:** Obras

Campos mapeados (`OS_follow_up_dois`):
- Data da Realização da Visita (DatePicker)
- Acompanhante(s) na Visita
- Qualitativo/Comentários dos Achados
- Serviço/Solução Recomendada
- Empresas que já visitaram
- Expectativa do Cliente
- Ancoragem de Valor/Preço
- Condição de Entrada
- **Upload Obrigatório:** Fotos da Visita Técnica

### Etapa 7-8: Memorial Descritivo e Precificação
**Status:** Pendente  
**Responsável:** Obras

Campos mapeados (`OS_memorial` e `proposta_comercial`):
- Upload do Memorial Descritivo (Excel/Word)
- Objetivo do Memorial
- Custo Total (Material + Mão de Obra)
- Prazos:
  - Preparação do Trabalho (dias)
  - Transporte de Materiais (dias)
  - Execução da Obra (dias)
- Percentuais:
  - % Imprevisto
  - % Lucro
  - % Imposto
  - % Entrada
- Nº de Parcelas

### Etapa 9: Gerar Proposta Comercial
**Status:** Pendente  
**Responsável:** ADM

- Alert: "Esta etapa requer aprovação do Gestor ADM"
- Botão "Gerar Proposta (PDF)"
- Integração futura para geração de PDF

### Etapa 10: Agendar Apresentação
**Status:** Pendente  
**Responsável:** ADM

- Botão "Agendar no Calendário" (Secondary color)
- Agendar reunião para apresentação da proposta

### Etapa 11-12: Follow-up 3 - Pós-Apresentação
**Status:** Pendente  
**Responsável:** ADM

Campos mapeados (`OS_follow_up_tres`):
- Data da Apresentação da Proposta
- Acompanhante(s) na Apresentação
- Proposta (Dores e Reação do Cliente)
- Método de Apresentação
- Contrato (Feedback do Cliente)
- Dores Adicionais Identificadas
- Indicador de Fechamento / Próximos Passos

### Etapa 13-14: Fechamento de Contrato
**Status:** Pendente  
**Responsável:** ADM

- Upload da Minuta do Contrato (Word/PDF)
- Alert: "Esta etapa requer aprovação do Gestor ADM"
- Checkbox: "Contrato Assinado pelo Cliente"

### Etapa 15: Conclusão
**Status:** Pendente  
**Responsável:** Sistema

- Botão: "Concluir OS e Gerar OS-13 (Start de Obra)"
- Ao concluir, gera automaticamente uma OS-13 (Start de Contrato de Obra)

## 🔧 Componentes Utilizados

### Shadcn/UI
- `Card` - Containers das etapas e sidebar
- `Button` - Ações e navegação
- `Input` - Campos de texto
- `Textarea` - Campos de texto longos
- `Select` - Dropdowns
- `Label` - Rótulos dos campos
- `Alert` - Mensagens de feedback
- `Checkbox` - Confirmações
- `Badge` - Status das etapas
- `Avatar` - Timeline de usuários
- `ScrollArea` - Área de comentários
- `Separator` - Divisores visuais

### Lucide React (Ícones)
- `ArrowLeft` - Voltar
- `Upload` - Upload de arquivos
- `FileText` - Documentos
- `File` - Arquivos genéricos
- `Check` - Confirmação/Concluído
- `Calendar` - Agendamentos
- `Send` - Enviar comentário
- `Circle` - Status em andamento
- `Lock` - Status pendente

## 🔗 Integração no App

### Navegação

1. **Acesso:** Menu Lateral → "Ordem de Serviço"
2. **Link temporário:** Na tela de Criar OS, há um link "Ver exemplo de OS com Fluxo de Trabalho →"
3. **Após criação:** Ao criar uma nova OS, o sistema redireciona para a página de detalhes com fluxo

### Rotas

- **Tipo de página:** `'os-details-workflow'`
- **Breadcrumb:** Início → Ordens de Serviço → Detalhes e Fluxo de Trabalho
- **Componente:** `<OSDetailsWorkflowPage />`

## 📊 Mapeamento de Dados

### Schema do Banco
Os campos foram mapeados de acordo com o schema documentado em `/DATABASE_SCHEMA.md`:

- **Etapa 1:** Tabela `clientes`
- **Etapa 3:** Tabela `os_etapas` com `dados_etapa` JSONB
- **Etapa 5-6:** Tabela `os_etapas` com `dados_etapa` JSONB
- **Etapa 7-8:** Tabela `os_etapas` com `dados_etapa` JSONB
- **Etapa 11-12:** Tabela `os_etapas` com `dados_etapa` JSONB
- **Uploads:** Tabela `os_anexos` com `path_storage` (Supabase Storage)
- **Comentários:** Feed de timeline com histórico de ações

### Exemplo de dados_etapa JSONB (Etapa 3):
```json
{
  "idade_edificacao": "15 anos",
  "motivo_visita": "Infiltração em fachada",
  "tempo_ocorrencia": "6 meses",
  "grau_urgencia": "Alto",
  "escopo_inicial": "Vistoria completa da fachada...",
  "orcamento_previo": "R$ 50.000,00",
  "anexos_ids": ["uuid1", "uuid2"]
}
```

## ✅ Funcionalidades Implementadas

- ✅ Layout responsivo de 2 colunas
- ✅ 15 etapas com formulários completos
- ✅ Sistema de estados (completed/active/pending)
- ✅ Componente reutilizável `StepWrapper`
- ✅ Validação visual de campos obrigatórios
- ✅ Upload de arquivos (UI preparada)
- ✅ Timeline de histórico e comentários
- ✅ Formulário de adicionar comentários
- ✅ Integração com design system Minerva
- ✅ Navegação com breadcrumbs
- ✅ Botões de ação contextuais
- ✅ Alerts de aprovação necessária

## 🚀 Próximos Passos

### Backend (Supabase)
1. Criar endpoints para salvar dados das etapas
2. Implementar upload de arquivos no Supabase Storage
3. Criar triggers para atualizar status da OS
4. Implementar sistema de aprovações hierárquicas
5. Criar notificações em tempo real

### Frontend
1. Integrar com Supabase Client
2. Implementar validação de formulários (React Hook Form + Zod)
3. Adicionar feedback visual de salvamento
4. Implementar geração de PDF da proposta
5. Integrar com módulo de Calendário
6. Adicionar drag & drop para uploads
7. Implementar busca e filtros no histórico

### UX/UI
1. Adicionar animações de transição entre etapas
2. Implementar scroll automático para etapa ativa
3. Adicionar indicador de progresso visual
4. Implementar modo de visualização para gestores
5. Adicionar atalhos de teclado

## 📱 Responsividade

A página é totalmente responsiva:
- **Desktop (>1024px):** Layout de 2 colunas lado a lado
- **Tablet (768px-1024px):** Colunas se ajustam
- **Mobile (<768px):** Colunas empilham verticalmente

## 🎓 Observações Técnicas

### Performance
- Uso de `ScrollArea` do Shadcn para otimizar renderização de lista longa
- Campos `disabled` para etapas read-only evitam re-renders desnecessários

### Acessibilidade
- Todos os campos com `<Label>` associados
- Indicadores visuais claros de estado (cor + ícone + texto)
- Suporte a navegação por teclado (Shadcn UI)

### Manutenibilidade
- Componente `StepWrapper` reutilizável
- Separação clara de responsabilidades
- Comentários explicativos no código
- Estrutura escalável para novas etapas

---

**Desenvolvido para:** Minerva Engenharia  
**Stack:** Next.js 14, Tailwind CSS, Shadcn/UI, Lucide React  
**Data:** Novembro 2024
