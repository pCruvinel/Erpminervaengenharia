# 📋 Documento de Transição - Sistema Minerva Engenharia

## 🎯 Visão Geral do Projeto

Este documento fornece informações essenciais para desenvolvedores que darão continuidade ao projeto do Sistema de Gestão Integrada da Minerva Engenharia.

### Tecnologias Utilizadas
- **Framework**: Next.js 14 (App Router - simulado em React)
- **Estilo**: Tailwind CSS v3
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Notificações**: Sonner v2.0.3

---

## 📁 Estrutura de Arquivos

```
/
├── App.tsx                          # Componente principal (entry point)
├── tailwind.config.js               # Configuração do Tailwind com cores Minerva
├── lib/
│   ├── types.ts                     # TypeScript types/interfaces
│   └── mock-data.ts                 # Dados mockados para desenvolvimento
├── components/
│   ├── auth/
│   │   └── login-page.tsx           # Tela de login (RF-076)
│   ├── layout/
│   │   ├── sidebar.tsx              # Menu lateral colapsável
│   │   └── header.tsx               # Cabeçalho com breadcrumbs e perfil
│   ├── kanban/
│   │   └── kanban-board.tsx         # Kanban de OS (RF-045, RF-054)
│   ├── os/
│   │   └── os-details-page.tsx      # Página de detalhes da OS (RF-019)
│   └── ui/                          # Componentes shadcn/ui (NÃO MODIFICAR)
└── styles/
    └── globals.css                  # Estilos globais e variáveis CSS
```

---

## 🎨 Design System - Cores da Minerva

### Cores de Marca (Configuradas em tailwind.config.js)

```javascript
// Cores Principais
'minerva-primary': '#0a4a8d'    // Azul escuro principal
'minerva-secondary': '#f2a900'  // Amarelo/Ouro para acentos
'minerva-dark': '#111827'       // Fundo da Sidebar
'minerva-accent': '#e5e7eb'     // Cinza claro para fundos/bordas
'minerva-light': '#ffffff'      // Branco

// Cores Semânticas
'success': '#22c55e'            // Verde (Concluído/Aprovado)
'error': '#ef4444'              // Vermelho (Atrasado/Rejeitado)
'warning': '#eab308'            // Amarelo (Em Validação/Aguardando)
```

### Como Usar as Cores

```tsx
// Em componentes
<div className="bg-minerva-primary text-white">
  <Button className="bg-minerva-secondary hover:bg-yellow-600">
    Botão
  </Button>
</div>
```

---

## 🧩 Componentes Criados

### 1. LoginPage (`/components/auth/login-page.tsx`)

**Propósito**: Autenticação de usuários (RF-076)

**Props**:
- `onLogin: (email: string, password: string) => void`

**Funcionalidades**:
- ✅ Validação de email/senha
- ✅ Mensagens de erro com toast
- ✅ Mock authentication (aceita emails @minerva.com)
- ⏳ Recuperação de senha (placeholder)

**Credenciais de Demo**:
- Email: qualquer email @minerva.com
- Senha: mínimo 6 caracteres

---

### 2. Sidebar (`/components/layout/sidebar.tsx`)

**Propósito**: Menu lateral de navegação

**Props**:
- `currentPage: string` - Página atual
- `onNavigate: (page: string) => void` - Callback de navegação
- `collapsed: boolean` - Estado do menu (expandido/recolhido)
- `onToggleCollapse: () => void` - Toggle do estado

**Menu Items**:
- Dashboard
- Ordens de Serviço
- Clientes
- Financeiro
- Calendário
- Configurações

**Features**:
- ✅ Colapsável (modo ícone)
- ✅ Highlight na página ativa
- ✅ Responsivo

---

### 3. Header (`/components/layout/header.tsx`)

**Propósito**: Cabeçalho com navegação e perfil

**Props**:
- `user: User` - Usuário logado
- `breadcrumbs: Array<{label: string, href?: string}>` - Breadcrumbs
- `onLogout: () => void` - Callback de logout

**Features**:
- ✅ Breadcrumbs dinâmicos
- ✅ Campo de busca global
- ✅ Notificações (badge)
- ✅ Dropdown de perfil com logout

---

### 4. KanbanBoard (`/components/kanban/kanban-board.tsx`)

**Propósito**: Visualização em Kanban das OS (RF-045, RF-054)

**Props**:
- `ordensServico: OrdemServico[]` - Lista de OS
- `onOSClick: (os: OrdemServico) => void` - Callback ao clicar em OS
- `onStatusChange: (osId: string, newStatus: OSStatus) => void` - Mudança de status

**Colunas do Kanban**:
1. Em Triagem
2. Em Andamento
3. Em Validação
4. Concluída

**Features**:
- ✅ Filtro por Responsável
- ✅ Filtro por Prazo (Atrasadas/Próximas 7 dias)
- ✅ Cards de OS com informações principais
- ✅ Badges de status
- ✅ Indicador de OS atrasada
- ⏳ Drag & Drop (pendente implementação)

---

### 5. OSDetailsPage (`/components/os/os-details-page.tsx`)

**Propósito**: Detalhes completos de uma OS (RF-019, RF-023, RF-029)

**Props**:
- `ordemServico: OrdemServico` - OS selecionada
- `comentarios: Comentario[]` - Comentários da OS
- `documentos: Documento[]` - Documentos anexados
- `historico: HistoricoItem[]` - Histórico de atividades
- `onBack: () => void` - Voltar ao Kanban
- `onAddComentario: (texto: string) => void` - Adicionar comentário

**Layout**:
- **Coluna Esquerda (2/3)**:
  - Card de Detalhes da OS
  - Card de Documentos Gerados
- **Coluna Direita (1/3)**:
  - Card de Comentários (com textarea para adicionar)
  - Card de Histórico e Atividades (timeline)

**Features**:
- ✅ Visualização completa de dados da OS
- ✅ Lista de documentos com ícones
- ✅ Sistema de comentários
- ✅ Timeline de histórico
- ⏳ Upload de documentos (mock)
- ⏳ Download de documentos (mock)

---

## 📊 Tipos e Interfaces (lib/types.ts)

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'colaborador' | 'gestor' | 'diretoria';
  setor: Setor;
}
```

### OrdemServico
```typescript
interface OrdemServico {
  id: string;
  codigo: string;          // Ex: OS-2024-001
  cliente: string;
  tipo: string;
  descricao: string;
  status: OSStatus;        // triagem | em-andamento | em-validacao | concluida
  setor: Setor;            // assessoria | obras
  responsavel: User;
  prazoInicio: string;
  prazoFim: string;
  createdAt: string;
  updatedAt: string;
}
```

### Comentario
```typescript
interface Comentario {
  id: string;
  osId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  texto: string;
  createdAt: string;
}
```

### Documento
```typescript
interface Documento {
  id: string;
  osId: string;
  nome: string;
  tipo: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}
```

### HistoricoItem
```typescript
interface HistoricoItem {
  id: string;
  osId: string;
  tipo: 'status' | 'comentario' | 'documento' | 'atribuicao';
  descricao: string;
  userName: string;
  createdAt: string;
}
```

---

## 🔌 Dados Mockados (lib/mock-data.ts)

### Usuários Mock
- 4 usuários de exemplo (Gestor, Colaboradores, Diretoria)
- Setores: Assessoria e Obras

### Ordens de Serviço Mock
- 6 OS de exemplo
- Distribuídas em diferentes status
- Alguns com prazos atrasados para testar badges

### Como Adicionar Novos Dados Mock
```typescript
// Em lib/mock-data.ts
export const mockOrdensServico: OrdemServico[] = [
  ...mockOrdensServico,
  {
    id: '7',
    codigo: 'OS-2024-007',
    cliente: 'Novo Cliente',
    // ... restante dos campos
  }
];
```

---

## 🚀 Próximos Passos / Integrações Pendentes

### Backend (Prioridade Alta)
- [ ] Integração com API REST ou GraphQL
- [ ] Autenticação JWT
- [ ] CRUD de Ordens de Serviço
- [ ] Upload/Download de documentos
- [ ] Sistema de notificações em tempo real

### Funcionalidades Pendentes
- [ ] **Drag & Drop no Kanban** (usar react-dnd)
- [ ] **Dashboard com gráficos** (usar recharts)
- [ ] **Calendário de OS** (usar react-big-calendar)
- [ ] **Gestão de Clientes** (tela completa)
- [ ] **Módulo Financeiro** (tela completa)
- [ ] **Relatórios em PDF**
- [ ] **Busca global funcional**
- [ ] **Filtros avançados**

### Melhorias de UX
- [ ] Loading skeletons (shadcn/ui Skeleton)
- [ ] Empty states customizados
- [ ] Animações de transição (Motion)
- [ ] Confirmação antes de ações críticas (AlertDialog)
- [ ] Paginação nas listas

### Responsividade
- [x] Desktop otimizado
- [ ] Mobile - melhorias no Kanban (usar Tabs ao invés de colunas)
- [ ] Mobile - sidebar como Drawer

---

## 🐛 Problemas Conhecidos / Limitações

### Funcionalidades Mock (Não Funcionais)
1. **Upload de Documentos**: Apenas exibe toast
2. **Download de Documentos**: Links apontam para `#`
3. **Busca Global**: Input existe mas não filtra
4. **Drag & Drop**: Cards não são arrastáveis ainda
5. **Notificações**: Badge exibido mas sem dados reais
6. **Recuperação de Senha**: Link placeholder

### Estado
- **Estado Global**: Atualmente gerenciado no `App.tsx`
- **Recomendação**: Migrar para Context API ou Zustand quando crescer

### Validações
- Login aceita qualquer email @minerva.com
- Sem validação de permissões por role
- Sem tratamento de erros de API (não há API ainda)

---

## 🛠️ Como Continuar o Desenvolvimento

### 1. Configurar Backend
```bash
# Exemplo com Node.js + Express
npm install express cors
# Ou usar Supabase/Firebase para backend rápido
```

### 2. Substituir Mock Data por API Calls
```typescript
// Exemplo em KanbanBoard
const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);

useEffect(() => {
  fetch('/api/ordens-servico')
    .then(res => res.json())
    .then(data => setOrdensServico(data));
}, []);
```

### 3. Implementar Drag & Drop
```bash
npm install react-dnd react-dnd-html5-backend
```

```typescript
// Em KanbanBoard
import { DndProvider, useDrag, useDrop } from 'react-dnd';
```

### 4. Adicionar State Management
```bash
npm install zustand
# Ou
npm install @tanstack/react-query
```

### 5. Configurar Upload de Arquivos
```typescript
// Usar input type="file" + FormData
const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
};
```

---

## 📞 Contato / Suporte

Para dúvidas sobre este código:
1. Consulte este documento primeiro
2. Verifique os comentários no código
3. Consulte a documentação do shadcn/ui: https://ui.shadcn.com

---

## ✅ Checklist de Implementação

### Telas Implementadas
- [x] Tela de Login (RF-076)
- [x] Layout Principal (Sidebar + Header)
- [x] Kanban de Ordens de Serviço (RF-045, RF-054)
- [x] Página de Detalhes da OS (RF-019, RF-023, RF-029)

### Features Implementadas
- [x] Autenticação (mock)
- [x] Navegação entre telas
- [x] Breadcrumbs dinâmicos
- [x] Filtros no Kanban
- [x] Sistema de comentários
- [x] Timeline de histórico
- [x] Badge de status
- [x] Indicador de OS atrasada
- [x] Sidebar colapsável
- [x] Responsivo (desktop + mobile básico)

### Dados Mock
- [x] Usuários (4)
- [x] Ordens de Serviço (6)
- [x] Comentários (3)
- [x] Documentos (3)
- [x] Histórico (8 itens)

### Configuração
- [x] Tailwind v3 configurado
- [x] Cores Minerva aplicadas
- [x] shadcn/ui integrado
- [x] Lucide React para ícones
- [x] Toast notifications (Sonner)

---

## 📝 Notas Finais

Este projeto foi desenvolvido seguindo o design brief fornecido. Todas as telas principais estão funcionais com dados mockados. O próximo passo crítico é a integração com um backend real para persistência de dados e autenticação.

O código está organizado de forma modular e componentizada, facilitando a manutenção e expansão futura do sistema.

**Última atualização**: 09/11/2024
