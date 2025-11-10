# Implementação da Página de Lista de Ordens de Serviço

## Resumo
Implementada a página de lista de Ordens de Serviço (OS) conforme especificação do Design System v2.0 (Dourado), com funcionalidades completas de filtros, RLS (Row-Level Security) e interface responsiva.

## Arquivos Criados/Modificados

### 1. Componente Principal
- **Arquivo**: `/components/os/os-list-page.tsx`
- **Descrição**: Componente React completo da página de lista de OS
- **Funcionalidades**:
  - DataTable com todas as OS do sistema
  - Filtros dinâmicos (Busca, Status, Tipo, Setor, Responsável)
  - RLS baseado no papel do usuário
  - Badges coloridos para status
  - Avatar e nome do responsável
  - Ações por linha (Ver Detalhes, Editar, Cancelar)
  - Exportação de dados (placeholder)
  - Navegação para detalhes da OS

### 2. Modificações no App.tsx
- Adicionado import do componente `OSListPage`
- Criada rota `os-list` no type `Page`
- Configurado login para redirecionar para `os-list`
- Adicionado breadcrumb para página de lista
- Renderização condicional do componente `OSListPage`

### 3. Modificações no Sidebar
- Atualizado menu item "Ordens de Serviço" para apontar para `os-list`

## Funcionalidades Implementadas

### 1. Filtros
**Card de Filtros** com 5 campos:
1. **Busca por Texto**: Filtra por código da OS, nome do cliente ou título
2. **Status**: Todos, Em Triagem, Em Andamento, Aguardando Aprovação, Atrasada, Concluída, Cancelada
3. **Tipo de OS**: Todos os 13 tipos de OS disponíveis (OS 01-13)
4. **Setor**: Visível apenas para Diretoria e Gestor ADM (Todos, Obras, Assessoria, Interno)
5. **Responsável**: Visível apenas para Gestores e Diretoria (lista de colaboradores)

### 2. RLS (Row-Level Security)
Implementado sistema de permissões baseado no papel do usuário:

- **Colaborador**: Vê apenas suas próprias OS (onde ele é o responsável)
- **Gestor**: Vê apenas as OS do seu setor (obras ou assessoria)
- **Diretoria/Gestor ADM**: Vê todas as OS de todos os setores

### 3. Tabela (DataTable)
**Colunas**:
1. Código OS (link clicável para detalhes)
2. Status (Badge colorido)
3. Cliente (nome)
4. Tipo de OS (nome completo)
5. Setor (Badge, visível apenas para Diretoria e Gestor ADM)
6. Responsável (Avatar + Nome)
7. Data Prazo (formatada dd/MM/yyyy, em vermelho se atrasada)
8. Ações (DropdownMenu)

**Badge de Status - Cores (Design System v2.0)**:
- **Em Andamento**: Dourado claro `rgb(221, 192, 99)`
- **Aguardando Aprovação**: Warning `rgb(245, 158, 11)`
- **Atrasada**: Error `rgb(239, 68, 68)`
- **Concluída**: Success `rgb(34, 197, 94)`
- **Outros**: Outline (padrão)

### 4. Ações
**DropdownMenu** em cada linha com opções:
- Ver Detalhes (navega para `os-details-workflow`)
- Editar Rápido (placeholder)
- Cancelar OS (placeholder)

### 5. Header da Página
- Título: "Ordens de Serviço" (h1)
- Botão: "Criar Nova OS" (cor dourada, com ícone Plus)
  - Redireciona para `/os/criar`

## Mock Data
Criado array `mockOrdensServico` com 8 OS de exemplo:
- Diferentes tipos (Perícia, Revitalização, Assessoria, Laudo, Reforço, Requisição, Start de Contrato, Vistoria)
- Diferentes status (em_andamento, aguardando_aprovacao, atrasada, concluida)
- Diferentes setores (obras, assessoria)
- Diferentes responsáveis

## Navegação
- **Rota de Login** → `/os-list` (página de lista)
- **Clicar em Código OS** → `/os-details-workflow` (página de detalhes com fluxo)
- **Botão "Criar Nova OS"** → `/os/criar` (hub de criação)

## Design System v2.0
✅ Cor Primary (Dourado): `rgb(211, 175, 55)` - Usado no botão "Criar Nova OS"
✅ Cores de Status conforme especificação
✅ Fundo da página: `bg-neutral-100` (rgb(244, 244, 245))
✅ Cards com `bg-card` (white) e `shadow-card`
✅ Tipografia usando sistema Plus Jakarta Sans

## Responsividade
- Grid de filtros responsivo: 1 coluna (mobile) → 2 (tablet) → 3 (laptop) → 5 (desktop)
- Tabela com scroll horizontal em telas pequenas
- Layout adaptável

## Próximos Passos (Não Implementados)
1. **Paginação**: Implementar componente Pagination do shadcn/ui
2. **Exportação**: Implementar exportação real para Excel/CSV (RF-071)
3. **Editar Rápido**: Modal/Dialog para edição rápida de campos
4. **Cancelar OS**: Lógica de cancelamento com confirmação
5. **Integração Supabase**: Substituir mock data por queries reais
6. **Filtros Avançados**: Adicionar mais opções de filtro (data, valor, etc.)
7. **Ordenação**: Implementar sort por colunas
8. **Busca Avançada**: Implementar busca com operadores (AND, OR)

## Testes de Usuário
Para testar as permissões RLS, use os seguintes usuários:

**Diretoria (vê todas)**:
- Email: `ana.costa@minerva.com`
- Role: `diretoria`

**Gestor de Assessoria (vê apenas Assessoria)**:
- Email: `joao.silva@minerva.com`
- Role: `gestor` | Setor: `assessoria`

**Colaborador (vê apenas suas OS)**:
- Email: `maria.santos@minerva.com`
- Role: `colaborador` | Setor: `assessoria`
- Email: `pedro.oliveira@minerva.com`
- Role: `colaborador` | Setor: `obras`

## Conformidade com PRD
✅ RF-014: Lista de OS com filtros
✅ RF-015: Visualização de detalhes da OS
✅ RF-017: Criação de nova OS
✅ RF-071: Exportação de dados (placeholder)
✅ RLS: Permissões por papel do usuário
✅ Design System v2.0: Cores, tipografia e componentes
