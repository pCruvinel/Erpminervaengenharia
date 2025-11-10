# Fix de Espaçamento e Alinhamento - CSS Puro

> **Data:** 2025-11-09  
> **Versão:** 3.1 (Correções de Espaçamento)

---

## 🔧 Problemas Corrigidos

### Classes Adicionadas

#### 1. **Spacing Expandido**

**Padding:**
```css
.p-0, .p-1, .p-2, .p-3, .p-4, .p-5, .p-6, .p-8, .p-10, .p-12
.px-0, .px-1, .px-2, .px-3, .px-4, .px-5, .px-6, .px-8, .px-10
.py-0, .py-0.5, .py-1, .py-2, .py-3, .py-4, .py-5, .py-6, .py-8, .py-10, .py-20
.pt-0, .pt-0.5, .pt-1, .pt-2, .pt-3, .pt-4, .pt-6
.pb-0, .pb-1, .pb-2, .pb-3, .pb-4
.pl-3, .pl-10
.pr-3
```

**Margin:**
```css
.m-0, .m-1, .m-2, .m-4
.mt-0, .mt-0.5, .mt-1, .mt-2, .mt-3, .mt-4, .mt-6, .mt-8
.mb-1, .mb-2, .mb-3, .mb-4, .mb-6, .mb-8
.ml-2, .ml-3
.mr-2, .mr-3
.mx-auto, .my-0
```

**Space Between:**
```css
.space-y-0, .space-y-1, .space-y-2, .space-y-3, .space-y-4, .space-y-5, .space-y-6, .space-y-8
.space-x-2, .space-x-3, .space-x-4
```

#### 2. **Dimensões Expandidas**

**Width:**
```css
.w-auto, .w-full, .w-screen, .w-1/2
.w-1, .w-2, .w-3, .w-4, .w-5, .w-6, .w-8, .w-10, .w-12, .w-16, .w-20, .w-24, .w-32, .w-48, .w-56, .w-64
```

**Height:**
```css
.h-auto, .h-full, .h-screen
.h-1, .h-2, .h-3, .h-4, .h-5, .h-6, .h-7, .h-8, .h-9, .h-10, .h-12, .h-16, .h-20, .h-24, .h-32
```

**Size (width + height):**
```css
.size-4, .size-5, .size-6, .size-9
```

**Min/Max:**
```css
.min-h-screen, .min-h-full, .min-h-0
.max-w-sm, .max-w-md, .max-w-lg, .max-w-xl, .max-w-2xl, .max-w-3xl, .max-w-4xl, .max-w-5xl, .max-w-6xl, .max-w-7xl, .max-w-full, .max-w-none
```

#### 3. **Gap Expandido**

```css
.gap-0, .gap-1, .gap-1.5, .gap-2, .gap-3, .gap-4, .gap-5, .gap-6, .gap-8
```

#### 4. **Cores Adicionadas**

**Backgrounds:**
```css
.bg-transparent
.bg-primary/10, .bg-primary/20, .bg-primary/30
.bg-primary-foreground
.bg-background, .bg-foreground
.bg-muted, .bg-accent
.bg-input, .bg-input-background, .bg-input/30
.bg-card, .bg-popover
.bg-destructive
.bg-neutral-200, .bg-neutral-300
```

**Text:**
```css
.text-primary/80
.text-primary-foreground
.text-muted-foreground, .text-accent-foreground, .text-secondary-foreground
.text-card-foreground, .text-popover-foreground
.text-destructive
.text-neutral-200
```

**Borders:**
```css
.border-input, .border-ring
```

**Gradients:**
```css
.bg-gradient-to-br
.from-neutral-800, .via-neutral-900, .to-black
```

#### 5. **Focus & Ring States**

```css
.ring-ring/50
.ring-destructive/20
.focus-visible:ring-ring/50
.focus-visible:border-ring
.focus-visible:ring-[3px]
.aria-invalid:ring-destructive/20
.aria-invalid:border-destructive
```

#### 6. **Hover States Expandidos**

```css
.hover:bg-primary/90
.hover:bg-destructive/90
.hover:bg-secondary/80
.hover:bg-accent
.hover:text-accent-foreground
```

#### 7. **Bordas Expandidas**

```css
.border-0, .border-2
.border-t, .border-b, .border-l, .border-r
.rounded-none, .rounded-sm
```

#### 8. **Utility Classes Adicionadas**

```css
/* Cursors */
.cursor-pointer, .cursor-not-allowed, .cursor-default

/* Interatividade */
.pointer-events-none, .select-none

/* Texto */
.whitespace-nowrap, .whitespace-normal
.truncate, .break-words
.underline-offset-4

/* Opacidade */
.opacity-0, .opacity-50, .opacity-60, .opacity-100

/* Outline */
.outline-none

/* Object Fit */
.object-cover

/* Aspect Ratio */
.aspect-square, .aspect-video

/* Position */
.inset-0

/* Z-Index */
.z-10, .z-20, .z-30, .z-40, .z-50

/* Flex */
.flex-shrink-0, .flex-grow
.items-start, .items-end
.self-start, .self-center, .self-end
.justify-start
.flex-wrap, .flex-nowrap
.shrink-0

/* Line Height */
.leading-none, .leading-tight, .leading-snug, .leading-normal, .leading-relaxed

/* Letter Spacing */
.tracking-tight, .tracking-normal, .tracking-wide

/* Font Smoothing */
.antialiased
```

#### 9. **Pseudo-elementos e Estados**

```css
/* File Input */
.file:border-0::file-selector-button
.file:bg-transparent::file-selector-button
.file:text-sm::file-selector-button
.file:font-medium::file-selector-button
.file:text-foreground::file-selector-button
.file:inline-flex::file-selector-button
.file:h-7::file-selector-button

/* Placeholder */
.placeholder:text-muted-foreground::placeholder

/* Selection */
.selection:bg-primary::selection
.selection:text-primary-foreground::selection

/* Disabled */
.disabled:cursor-not-allowed:disabled
.disabled:pointer-events-none:disabled
.disabled:opacity-50:disabled

/* Peer States */
.peer-disabled:cursor-not-allowed
.peer-disabled:opacity-50

/* Group Data */
.group-data-[disabled=true]:pointer-events-none
.group-data-[disabled=true]:opacity-50

/* Has Selector */
.has-[>svg]:px-3
.has-[>svg]:px-2.5
.has-[>svg]:px-4

/* SVG Children */
.[&_svg]:pointer-events-none svg
.[&_svg]:shrink-0 svg
.[&_svg:not([class*='size-'])]:size-4 svg
```

#### 10. **Responsive Classes**

```css
.hidden

@media (min-width: 768px) {
  .md:block
  .md:hidden
  .md:flex
}
```

---

## 🎨 Variáveis CSS Adicionadas

```css
/* Em variables.css */
--color-input: var(--color-neutral-200);
--color-input-background: var(--color-white);
--color-ring: var(--color-primary);
--color-accent: var(--color-primary-50);
--color-accent-foreground: var(--color-primary-900);
--color-muted: var(--color-neutral-100);
--color-muted-foreground: var(--color-neutral-600);
--color-secondary-foreground: var(--color-black);
--color-card: var(--color-white);
--color-card-foreground: var(--color-neutral-900);
--color-popover: var(--color-white);
--color-popover-foreground: var(--color-neutral-900);
```

---

## ✅ Componentes Shadcn Funcionais

Os seguintes componentes shadcn/ui agora funcionam corretamente com o CSS puro:

- ✅ **Button** - Todas as variantes (default, destructive, outline, secondary, ghost, link)
- ✅ **Input** - Focus states, disabled, placeholder, file inputs
- ✅ **Label** - Com estados disabled
- ✅ **Card** - Com headers coloridos
- ✅ **Badge** - Todas as cores
- ✅ **Avatar** - Com fallback dourado
- ✅ **Select** - Dropdown funcional
- ✅ **Dialog/Modal** - Z-index correto
- ✅ **Popover** - Posicionamento
- ✅ **Breadcrumb** - Navegação
- ✅ **Dropdown Menu** - Estados hover

---

## 🐛 Problemas Comuns Resolvidos

### 1. Input sem padding correto
**Antes:** Input muito pequeno  
**Depois:** `.h-9 .px-3 .py-1` aplicado automaticamente

### 2. Cards sem espaçamento
**Antes:** Conteúdo colado nas bordas  
**Depois:** `.p-6` nos CardContent

### 3. Botões desalinhados
**Antes:** Ícones e texto desalinhados  
**Depois:** `.inline-flex .items-center .gap-2`

### 4. Focus invisível
**Antes:** Sem indicação de foco  
**Depois:** Ring dourado com `.focus-visible:ring-ring/50`

### 5. Hover sem feedback
**Antes:** Sem mudança visual  
**Depois:** `.hover:bg-primary/90` aplicado

### 6. Avatar sem cor
**Antes:** Fundo cinza  
**Depois:** `.bg-primary .text-white` aplicado

### 7. Gradientes quebrados
**Antes:** Fundo sólido  
**Depois:** `.bg-gradient-to-br .from-neutral-800 .via-neutral-900 .to-black`

---

## 📝 Como Usar

### Exemplo 1: Card com Espaçamento Correto

```tsx
<div className="minerva-card p-6">
  <h3 className="mb-4">Título</h3>
  <div className="space-y-4">
    <p>Parágrafo 1</p>
    <p>Parágrafo 2</p>
  </div>
</div>
```

### Exemplo 2: Formulário com Gaps

```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <Label>Nome</Label>
    <Input className="h-9" />
  </div>
  
  <div className="space-y-2">
    <Label>Email</Label>
    <Input type="email" className="h-9" />
  </div>
  
  <Button className="w-full">Enviar</Button>
</form>
```

### Exemplo 3: Grid com Spacing

```tsx
<div className="grid grid-cols-3 gap-6">
  <div className="p-4 bg-white rounded-lg">Card 1</div>
  <div className="p-4 bg-white rounded-lg">Card 2</div>
  <div className="p-4 bg-white rounded-lg">Card 3</div>
</div>
```

### Exemplo 4: Flex com Alinhamento

```tsx
<div className="flex items-center justify-between p-4">
  <div className="flex items-center gap-3">
    <Avatar className="bg-primary text-white" />
    <span>Nome do Usuário</span>
  </div>
  <Button>Ação</Button>
</div>
```

---

## 🎯 Checklist de Verificação

Ao criar um novo componente, verifique:

- [ ] Padding/margin aplicados (`.p-*`, `.px-*`, `.py-*`)
- [ ] Gap entre elementos (`.gap-*`, `.space-y-*`)
- [ ] Cores corretas (`.bg-primary`, `.text-white`)
- [ ] Border radius (`.rounded-*`)
- [ ] Shadow se necessário (`.shadow-card`)
- [ ] Estados hover (`.hover:bg-*`)
- [ ] Estados focus (`.focus-visible:ring-*`)
- [ ] Estados disabled (`.disabled:opacity-50`)
- [ ] Responsividade (`.md:*`)
- [ ] Alinhamento flex (`.flex .items-center .justify-between`)

---

## 🔍 Debug

Se algo parecer desalinhado:

1. **Inspecione no DevTools** - Veja quais classes estão aplicadas
2. **Verifique espaçamento** - Adicione background temporário para ver boxes
3. **Confira o CSS** - Use DevTools para ver CSS computado
4. **Teste isolado** - Crie versão mínima do componente

```tsx
// Debug visual
<div className="bg-red-500">
  <div className="p-4 bg-blue-500">
    Seu conteúdo aqui
  </div>
</div>
```

---

**Desenvolvido por:** Minerva Design System Team  
**Versão:** 3.1  
**Data:** 2025-11-09
