# Guia Rápido - Minerva Design System v2.0

> Referência rápida para evitar erros comuns e acelerar o desenvolvimento

> ⚠️ **Tendo problemas?** Veja `/COMMON_ERRORS.md` para soluções de erros comuns

---

## ⚡ Classes Mais Usadas

### Cores de Background

```tsx
// ✅ CORRETO
<div className="bg-primary">         // Dourado padrão
<div className="bg-primary-500">     // Dourado padrão (explícito)
<div className="bg-primary-600">     // Dourado escuro
<div className="bg-secondary">       // Dourado claro
<div className="bg-neutral-100">     // Cinza muito claro
<div className="bg-success">         // Verde
<div className="bg-warning">         // Laranja
<div className="bg-error">           // Vermelho
<div className="bg-info">            // Azul
```

### Hover States

```tsx
// ✅ CORRETO
<div className="bg-primary hover:bg-primary-600">
<div className="bg-success hover:bg-green-600">
<Button>Usa hover automático</Button>

// ❌ INCORRETO (não funciona)
<div className="bg-primary hover:bg-primary-hover">
<div className="hover:bg-success-hover">
```

---

## 📝 Tipografia

### Headings (Automáticos)

```tsx
// ✅ CORRETO - Usa estilos padrão
<h1>Título Principal</h1>           // 30px, semibold
<h2>Seção</h2>                       // 24px, semibold
<h3>Subsseção</h3>                   // 20px, semibold
<h4>Card Header</h4>                 // 18px, medium

// ❌ INCORRETO - Não sobrescreva sem necessidade
<h1 className="text-2xl">Título</h1>
```

### Classes Utilitárias

> ✅ Todas essas classes são **customizadas** e definidas no `globals.css`

```tsx
<p className="text-caption">         // 12px, neutral-600
<span className="text-overline">     // 12px, UPPERCASE, medium
<label className="text-label">       // 14px, medium, neutral-700
<p className="text-body-small">      // 14px
<p className="text-body">            // 16px (padrão de <p>)
<p className="text-muted">           // 14px, neutral-500

// Estados semânticos (14px + cor)
<p className="text-success">         // Verde (rgb(34 197 94))
<p className="text-warning">         // Laranja (rgb(245 158 11))
<p className="text-error">           // Vermelho (rgb(239 68 68))
```

### Line Clamp (Truncar)

```tsx
<p className="line-clamp-1">Trunca em 1 linha...</p>
<p className="line-clamp-2">Trunca em 2 linhas...</p>
<p className="line-clamp-3">Trunca em 3 linhas...</p>
```

---

## 🎨 Componentes Shadcn

### Button

```tsx
<Button>Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Deletar</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Pequeno</Button>
<Button size="lg">Grande</Button>
<Button disabled>Desabilitado</Button>
```

### Badge

```tsx
<Badge>Default</Badge>
<Badge variant="secondary">Secundário</Badge>
<Badge variant="destructive">Erro</Badge>
<Badge variant="outline">Outline</Badge>

// Cores customizadas
<Badge className="bg-success text-white">Sucesso</Badge>
<Badge className="bg-warning text-white">Aviso</Badge>
<Badge className="bg-info text-white">Info</Badge>
```

### Card

```tsx
<Card className="shadow-card">
  <CardHeader className="bg-primary">
    <CardTitle className="text-primary-foreground">Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent className="p-6">
    Conteúdo
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
```

---

## 🌑 Sombras

```tsx
<div className="shadow-card">              // Padrão (elevation 1)
<div className="shadow-card-hover">        // Elevation 2
<div className="shadow-elevated">          // Elevation 3
<div className="shadow-float">             // Elevation 4
<div className="shadow-modal">             // Para modais

// Com transição
<div className="shadow-card hover:shadow-card-hover transition-shadow">
```

---

## 📐 Spacing Data-Dense

### Padding/Margin Compactos

```tsx
<div className="p-2.5">     // 10px
<div className="p-3.5">     // 14px
<div className="px-3.5 py-1.5">

<div className="space-y-2.5">  // Gap vertical 10px
<div className="gap-2.5">       // Gap em grid/flex
```

### Formulários Compactos

```tsx
<form className="space-y-3">
  <div className="space-y-1">
    <Label>Campo</Label>
    <Input className="h-9" />
  </div>
</form>
```

---

## 🎯 Padrões Comuns

### Card com Header Dourado

```tsx
<Card className="shadow-card overflow-hidden">
  <div className="bg-primary px-6 py-4">
    <h3 className="text-primary-foreground">Título</h3>
  </div>
  <CardContent className="p-6">
    Conteúdo
  </CardContent>
</Card>
```

### Status Badge

```tsx
const getStatusBadge = (status: string) => {
  const variants = {
    'aberto': <Badge className="bg-info text-white">Aberto</Badge>,
    'andamento': <Badge className="bg-warning text-white">Em Andamento</Badge>,
    'concluido': <Badge className="bg-success text-white">Concluído</Badge>,
    'cancelado': <Badge variant="destructive">Cancelado</Badge>
  };
  return variants[status];
};
```

### Formulário com Validação

```tsx
<div className="space-y-1">
  <Label htmlFor="email" className="text-label">
    E-mail
  </Label>
  <Input 
    id="email" 
    type="email"
    className="h-9"
  />
  <p className="text-error">Campo obrigatório</p>
</div>
```

### Grid Data-Dense

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  <Card className="shadow-card">
    <CardContent className="p-4">
      <span className="text-overline">Categoria</span>
      <p className="text-body-small line-clamp-2">Valor</p>
    </CardContent>
  </Card>
</div>
```

---

## 🚫 Erros Comuns

### ❌ Classes Inexistentes

```tsx
// ❌ ERRADO
bg-primary-hover
hover:bg-primary-hover
bg-success-hover
text-primary-200

// ✅ CORRETO
bg-primary-600
hover:bg-primary-600
bg-success
text-neutral-600
```

### ❌ Sobrescrever Tipografia Desnecessariamente

```tsx
// ❌ ERRADO
<h1 className="text-2xl font-bold">Título</h1>
<p className="text-base leading-normal">Texto</p>

// ✅ CORRETO
<h1>Título</h1>
<p>Texto</p>
```

### ❌ Focus Incorreto

```tsx
// ❌ ERRADO
<button className="focus:outline-blue-500">

// ✅ CORRETO (já aplicado globalmente)
<button>
// ou
<button className="focus:ring-primary">
```

---

## 🔧 CSS Custom Properties

Quando precisar de valores dinâmicos:

```tsx
// Em CSS
.custom-element {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-base);
}

// Em JavaScript
const spacing = getComputedStyle(document.documentElement)
  .getPropertyValue('--spacing-md');

// Inline style
<div style={{ padding: 'var(--spacing-md)' }}>
```

---

## ♿ Acessibilidade

```tsx
// Screen reader only
<span className="sr-only">Descrição para leitores de tela</span>

// ARIA labels
<button aria-label="Fechar modal">
  <XIcon />
</button>

// Focus visible (já aplicado automaticamente)
<Button>Navega com Tab para ver focus ring</Button>
```

---

## 📱 Responsive

```tsx
// Mobile first
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">...</div>
</div>

// Breakpoints
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1400px
```

---

## 🎨 Paleta Rápida (Copiar e Colar)

```tsx
// Cores principais
bg-primary           // rgb(211 175 55)  - Dourado
bg-secondary         // rgb(221 192 99)  - Dourado claro
bg-background        // rgb(244 244 245) - Fundo página
bg-neutral-100       // rgb(244 244 245) - Fundo claro

// Estados
bg-success           // rgb(34 197 94)   - Verde
bg-warning           // rgb(245 158 11)  - Laranja
bg-error             // rgb(239 68 68)   - Vermelho
bg-info              // rgb(59 130 246)  - Azul

// Textos
text-foreground      // rgb(24 24 27)    - Preto principal
text-neutral-600     // rgb(82 82 91)    - Cinza escuro
text-neutral-500     // rgb(113 113 122) - Cinza médio
text-muted           // rgb(82 82 91)    - Texto secundário
```

---

## 📚 Links Úteis

- **Documentação Completa:** `/DESIGN_SYSTEM.md`
- **Exemplos Tipografia:** `/TYPOGRAPHY_EXAMPLES.md`
- **Showcase Visual:** `/components/design-system-showcase.tsx`
- **Tailwind Config:** `/tailwind.config.js`
- **Globals CSS:** `/styles/globals.css`
- **Tokens CSS:** `/styles/tokens.css`

---

**Versão:** 2.0  
**Última atualização:** 09/11/2025  
**Projeto:** Minerva Engenharia - Sistema ERP
