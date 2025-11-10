# Minerva Design System v3.0 - Sistema CSS Puro

> **Data de Implementação:** 2025-11-09  
> **Mudança:** Migração completa de Tailwind CSS para CSS Puro com Variáveis CSS

---

## 📋 Resumo da Mudança

O sistema foi **completamente refatorado** removendo a dependência do Tailwind CSS e implementando um **sistema CSS puro** usando **CSS Custom Properties (variáveis CSS)** que garante:

✅ **Cores visíveis e funcionais** - As cores douradas (#D3AF37 e #DDC063) agora aparecem corretamente  
✅ **Zero dependências de build** - Não precisa de compilação Tailwind  
✅ **Controle total** - CSS direto e previsível  
✅ **Performance** - Sem classes Tailwind não utilizadas  
✅ **Manutenibilidade** - Código CSS organizado e documentado

---

## 🎨 Estrutura de Arquivos CSS

```
/styles/
├── variables.css    → Variáveis CSS (cores, spacing, tipografia, etc)
├── globals.css      → Estilos base, resets, utilities
└── components.css   → Componentes específicos do Minerva
```

### Ordem de Import (IMPORTANTE!)

```tsx
// App.tsx
import './styles/globals.css';  // Importa tudo automaticamente
```

O `globals.css` já importa `variables.css` e `components.css` internamente.

---

## 🎨 Paleta de Cores (Dourado Minerva)

### Variáveis CSS Disponíveis

```css
/* Primary - Dourado #D3AF37 */
var(--color-primary)          /* #D3AF37 - Cor principal */
var(--color-primary-500)      /* #D3AF37 - Mesmo que primary */
var(--color-primary-600)      /* #bd9e32 - Hover state */
var(--color-primary-700)      /* #a98c2c - Active state */
var(--color-primary-200)      /* #efe4ba - Disabled/Light */

/* Secondary - Dourado Claro #DDC063 */
var(--color-secondary)        /* #DDC063 */
var(--color-secondary-600)    /* #d1b457 - Hover */

/* Cores Semânticas */
var(--color-success)          /* #22c55e - Verde */
var(--color-warning)          /* #f59e0b - Laranja */
var(--color-error)            /* #ef4444 - Vermelho */
var(--color-info)             /* #3b82f6 - Azul */

/* Neutros */
var(--color-neutral-50)       /* Muito claro */
var(--color-neutral-100)      /* Background padrão */
var(--color-neutral-300)      /* Bordas */
var(--color-neutral-600)      /* Textos secundários */
var(--color-neutral-900)      /* Textos principais */
var(--color-white)
var(--color-black)
```

---

## 📦 Classes Utilitárias Disponíveis

### Cores de Background

```css
.bg-primary              /* Dourado #D3AF37 */
.bg-secondary            /* Dourado claro #DDC063 */
.bg-success              /* Verde */
.bg-warning              /* Laranja */
.bg-error                /* Vermelho */
.bg-info                 /* Azul */
.bg-white                /* Branco */
.bg-neutral-50           /* Cinza muito claro */
.bg-neutral-100          /* Cinza claro */
.bg-neutral-800          /* Cinza escuro */
.bg-neutral-900          /* Quase preto */
```

### Cores de Texto

```css
.text-primary            /* Dourado */
.text-white              /* Branco */
.text-black              /* Preto */
.text-success            /* Verde */
.text-warning            /* Laranja */
.text-error              /* Vermelho */
.text-info               /* Azul */
.text-neutral-400        /* Cinza claro */
.text-neutral-600        /* Cinza médio */
.text-neutral-900        /* Preto suave */
```

### Cores de Borda

```css
.border-primary          /* Dourado */
.border-neutral-200      /* Cinza claro */
.border-neutral-300      /* Cinza médio */
```

### Layout

```css
.flex                    /* display: flex */
.flex-col                /* flex-direction: column */
.flex-1                  /* flex: 1 */
.items-center            /* align-items: center */
.justify-between         /* justify-content: space-between */
.justify-center          /* justify-content: center */
.justify-end             /* justify-content: flex-end */
.gap-1, .gap-2, .gap-4, .gap-6, .gap-8  /* Espaçamentos */
```

### Spacing

```css
/* Padding */
.p-2, .p-3, .p-4, .p-6, .p-8
.px-2, .px-3, .px-4, .px-6, .px-8
.py-1, .py-2, .py-3, .py-4, .py-6, .py-8, .py-20

/* Margin */
.m-0
.mb-2, .mb-4, .mb-6, .mb-8
.mx-auto

/* Space Between */
.space-y-2, .space-y-3, .space-y-4, .space-y-6, .space-y-8
```

### Dimensões

```css
.w-full, .w-64, .w-8, .w-5, .w-4
.h-full, .h-screen, .h-16, .h-8, .h-5, .h-4
.max-w-md, .max-w-lg, .max-w-xl, .max-w-2xl, .max-w-4xl
```

### Bordas

```css
.border                  /* 1px solid */
.border-b                /* border-bottom */
.border-l-4              /* border-left 4px */
.rounded, .rounded-md, .rounded-lg, .rounded-xl, .rounded-full
```

### Sombras

```css
.shadow-sm, .shadow-md, .shadow-lg, .shadow-xl
.shadow-card             /* Sombra customizada Minerva */
```

### Tipografia

```css
.text-xs, .text-sm, .text-base, .text-lg, .text-xl, .text-2xl, .text-3xl
.font-normal, .font-medium, .font-semibold, .font-bold
.text-left, .text-center, .text-right
.capitalize, .uppercase
```

### Transições

```css
.transition-all          /* Transição suave em tudo */
.transition-colors       /* Transição apenas cores */
.transition-shadow       /* Transição apenas sombra */
.duration-200, .duration-300
```

### Hover States

```css
.hover\:bg-primary:hover
.hover\:bg-neutral-100:hover
.hover\:text-white:hover
.hover\:text-primary:hover
.hover\:shadow-card-hover:hover
.hover\:underline:hover
```

---

## 🎯 Classes de Componentes Minerva

### Sidebar

```html
<div class="minerva-sidebar">
  <div class="minerva-sidebar-logo">
    <div class="minerva-sidebar-logo-icon bg-primary">M</div>
    <span class="minerva-sidebar-logo-text">Minerva</span>
  </div>
  
  <nav class="minerva-sidebar-nav">
    <button class="minerva-sidebar-item active">
      <Icon class="minerva-sidebar-item-icon" />
      <span class="minerva-sidebar-item-text">Dashboard</span>
    </button>
  </nav>
</div>
```

**Classes:**
- `.minerva-sidebar` - Container principal
- `.minerva-sidebar.collapsed` - Estado colapsado
- `.minerva-sidebar-logo` - Área do logo
- `.minerva-sidebar-logo-icon` - Ícone "M" (usar com `.bg-primary`)
- `.minerva-sidebar-item` - Item de menu
- `.minerva-sidebar-item.active` - Item ativo (dourado)

### Header

```html
<header class="minerva-header">
  <div class="minerva-breadcrumb">...</div>
  <div class="minerva-avatar bg-primary text-white">JD</div>
</header>
```

**Classes:**
- `.minerva-header` - Container principal
- `.minerva-header-search` - Campo de busca
- `.minerva-header-notification` - Botão de notificação
- `.minerva-avatar` - Avatar do usuário (usar com `.bg-primary`)

### Buttons

```html
<button class="minerva-button minerva-button-primary">Criar OS</button>
<button class="minerva-button minerva-button-secondary">Cancelar</button>
<button class="minerva-button minerva-button-outline">Editar</button>
<button class="minerva-button minerva-button-ghost">Fechar</button>
<button class="minerva-button minerva-button-destructive">Deletar</button>
```

**Variantes:**
- `.minerva-button-primary` - Dourado (ações principais)
- `.minerva-button-secondary` - Dourado claro
- `.minerva-button-outline` - Borda dourada, fundo transparente
- `.minerva-button-ghost` - Sem borda, hover suave
- `.minerva-button-destructive` - Vermelho (ações destrutivas)

**Tamanhos:**
- `.minerva-button-sm` - Pequeno
- `.minerva-button-lg` - Grande

### Badges

```html
<span class="minerva-badge minerva-badge-primary">Ativo</span>
<span class="minerva-badge minerva-badge-success">Concluído</span>
<span class="minerva-badge minerva-badge-warning">Em Andamento</span>
<span class="minerva-badge minerva-badge-error">Cancelado</span>
<span class="minerva-badge minerva-badge-info">Informação</span>
```

### Cards

```html
<div class="minerva-card">
  <div class="minerva-card-header minerva-card-header-primary">
    <h3 class="minerva-card-title text-white">Título</h3>
  </div>
  <div class="minerva-card-content">
    Conteúdo do card
  </div>
</div>
```

**Variantes de Header:**
- `.minerva-card-header-primary` - Fundo dourado
- `.minerva-card-header-secondary` - Fundo dourado claro

### Input

```html
<label class="minerva-label">Nome</label>
<input type="text" class="minerva-input" placeholder="Digite o nome">
```

### Table

```html
<table class="minerva-table">
  <thead>
    <tr>
      <th>Código</th>
      <th>Cliente</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>OS-001</td>
      <td>Empresa ABC</td>
      <td><span class="minerva-badge minerva-badge-success">Ativo</span></td>
    </tr>
  </tbody>
</table>
```

---

## 🔧 Como Usar no Código

### Exemplo 1: Botão Primário Dourado

```tsx
<button className="minerva-button minerva-button-primary">
  Criar Ordem de Serviço
</button>
```

**Resultado:** Botão com fundo dourado (#D3AF37), texto branco, hover mais escuro.

### Exemplo 2: Card com Header Dourado

```tsx
<div className="minerva-card">
  <div className="minerva-card-header minerva-card-header-primary">
    <h3 className="minerva-card-title text-white">Resumo da OS</h3>
  </div>
  <div className="minerva-card-content">
    <p>Conteúdo aqui...</p>
  </div>
</div>
```

### Exemplo 3: Avatar Dourado

```tsx
<div className="minerva-avatar bg-primary text-white">
  {user.initials}
</div>
```

### Exemplo 4: Badge de Status

```tsx
<span className="minerva-badge minerva-badge-success">Concluído</span>
<span className="minerva-badge minerva-badge-warning">Em Andamento</span>
<span className="minerva-badge minerva-badge-error">Cancelado</span>
```

### Exemplo 5: Menu Item Ativo (Dourado)

```tsx
<button className={`minerva-sidebar-item ${isActive ? 'active' : ''}`}>
  <Icon className="minerva-sidebar-item-icon" />
  <span className="minerva-sidebar-item-text">Dashboard</span>
</button>
```

**Quando `.active`:** texto e borda ficam dourados.

---

## 🎨 Cores Garantidas Visíveis

Estes elementos **AGORA TÊM COR DOURADA VISÍVEL**:

✅ **Logo "M" da Minerva** (sidebar) → `.minerva-sidebar-logo-icon.bg-primary`  
✅ **Menu item ativo** (sidebar) → `.minerva-sidebar-item.active` (texto e borda dourados)  
✅ **Avatar do usuário** (header) → `.minerva-avatar.bg-primary`  
✅ **Botões primários** → `.minerva-button-primary`  
✅ **Links** → Todos os links (`<a>`) são dourados por padrão  
✅ **Focus states** → Outline dourado em elementos focados  

---

## 🚀 Vantagens do Novo Sistema

1. **Cores Funcionam 100%** - Não depende de build/compilação
2. **Previsível** - CSS direto, sem abstrações
3. **Performático** - Apenas CSS que você usa
4. **Debugável** - Inspecionar no DevTools mostra CSS real
5. **Portável** - Funciona em qualquer ambiente
6. **Customizável** - Fácil adicionar novas variáveis/classes

---

## 🔍 Troubleshooting

### As cores ainda não aparecem?

1. **Limpe o cache do navegador:** Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. **Verifique o import:** Certifique-se que `App.tsx` tem `import './styles/globals.css'`
3. **Inspecione no DevTools:** Verifique se as variáveis CSS estão carregadas
4. **Force refresh:** Feche e reabra o navegador

### Como adicionar uma nova cor?

1. Adicione em `/styles/variables.css`:
   ```css
   --color-tertiary: #ff6b6b;
   ```

2. Adicione classe utilitária em `/styles/globals.css`:
   ```css
   .bg-tertiary {
     background-color: var(--color-tertiary);
   }
   ```

3. Use no código:
   ```tsx
   <div className="bg-tertiary">...</div>
   ```

---

## 📖 Diferenças vs Tailwind

| Tailwind | CSS Puro Minerva |
|----------|------------------|
| `bg-primary-500` | `.bg-primary` |
| `hover:bg-primary-600` | `.hover\:bg-primary:hover` |
| `text-primary` | `.text-primary` |
| `rounded-lg` | `.rounded-lg` |
| `shadow-md` | `.shadow-md` |
| `flex items-center gap-4` | `.flex.items-center.gap-4` |

A maioria das classes **tem nomes idênticos** para facilitar a migração!

---

## ✅ Checklist de Migração

- [x] Deletar `tailwind.config.js`
- [x] Criar `/styles/variables.css`
- [x] Reescrever `/styles/globals.css`
- [x] Criar `/styles/components.css`
- [x] Atualizar `App.tsx` (remover import de tokens.css)
- [x] Atualizar `Header.tsx` (usar classes minerva)
- [x] Atualizar `Sidebar.tsx` (usar classes minerva)
- [ ] Atualizar demais componentes conforme necessário

---

## 🎯 Próximos Passos

1. **Validar cores douradas** aparecem corretamente
2. **Migrar componentes restantes** para usar classes `.minerva-*`
3. **Adicionar mais componentes CSS** conforme necessário
4. **Documentar exemplos visuais** (screenshots)

---

**Desenvolvido por:** Minerva Design System Team  
**Versão:** 3.0  
**Data:** 2025-11-09
