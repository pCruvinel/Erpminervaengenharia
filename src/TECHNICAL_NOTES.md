# Notas Técnicas - Minerva Design System

> Explicações técnicas sobre decisões de design e implementação

---

## 🎨 Sistema de Cores e Tailwind

### Por que escalas numéricas não funcionam para text/border?

#### Contexto Técnico

No Tailwind CSS, quando você define cores no `theme.extend.colors`, o comportamento de geração de classes é diferente dependendo de como as cores são estruturadas:

**1. Cores Planas (String simples)**
```js
colors: {
  primary: "rgb(211 175 55)"
}
```
- Gera: `bg-primary`, `text-primary`, `border-primary`
- Não gera: escalas numéricas

**2. Cores com Objeto**
```js
colors: {
  primary: {
    DEFAULT: "rgb(211 175 55)",
    500: "rgb(211 175 55)",
    600: "rgb(189 158 50)"
  }
}
```
- Gera: `bg-primary`, `bg-primary-500`, `bg-primary-600`
- **MAS:** Para `text-*` e `border-*`, só gera classes para cores que seguem a convenção do Tailwind

**3. Sistema de Cores do Tailwind (Neutral, Gray, etc)**
```js
colors: {
  neutral: colors.zinc // Do @tailwindcss/colors
}
```
- Gera: `bg-neutral-50` até `bg-neutral-900`
- Gera: `text-neutral-50` até `text-neutral-900`
- Gera: `border-neutral-50` até `border-neutral-900`

#### Por que Minerva usa este approach?

**Decisão de Design:**
- Cores `primary` e `secondary` são específicas da marca (dourado)
- Não queremos encorajar uso de text/border em múltiplos tons dourados
- Mantém design consistente e limpo

**Cores Neutras são a exceção:**
- `neutral` (zinc) é importado do Tailwind padrão
- Tem escala completa 50-900 para flexibilidade
- Ideal para textos, bordas e fundos neutros

### Classes Geradas Automaticamente

#### ✅ FUNCIONA (Background)
```tsx
bg-primary-50
bg-primary-100
bg-primary-200
// ... até
bg-primary-900

bg-secondary-50
// ... até
bg-secondary-900
```

#### ✅ FUNCIONA (Neutral - Tudo)
```tsx
bg-neutral-50
text-neutral-50
border-neutral-50
// ... até
// ...900 para todos
```

#### ❌ NÃO FUNCIONA (Text/Border com Primary/Secondary)
```tsx
text-primary-200     // ❌
text-secondary-500   // ❌
border-primary-300   // ❌
border-secondary-600 // ❌
```

#### ✅ FUNCIONA (Text/Border sem escala)
```tsx
text-primary         // ✅
text-secondary       // ✅
border-primary       // ✅
border-secondary     // ✅
```

### Workarounds Disponíveis

**1. Use Cores Neutras (Recomendado)**
```tsx
// Para textos secundários
<p className="text-neutral-600">
<p className="text-neutral-500">

// Para bordas
<div className="border-neutral-300">
```

**2. Use RGB Direto**
```tsx
// Para casos específicos
<div style={{ 
  borderColor: 'rgb(231 215 151)',  // primary-300
  color: 'rgb(189 158 50)'          // primary-600
}}>
```

**3. Use CSS Custom Properties**
```css
/* No seu CSS */
.custom-border {
  border-color: var(--color-primary-300);
}
```

**4. Use Componentes Base**
```tsx
// Componentes já têm estilos corretos
<Button>Usa cores corretas automaticamente</Button>
<Badge className="bg-primary text-primary-foreground">
```

---

## 🔧 Configuração do Tailwind v4.0

### Diferenças da v3.x

**Tailwind v3.x:**
- Usava `tailwind.config.js` tradicional
- Cores em `theme.extend.colors`
- Gerava classes para todas as propriedades (bg, text, border)

**Tailwind v4.0 (Atual):**
- Config mais simplificado
- Foco em CSS Custom Properties
- Geração de classes mais seletiva
- Melhor tree-shaking

### Nossa Configuração

```js
export default {
  content: ['./App.tsx', './components/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        // Importado do Tailwind - Gera todas as classes
        neutral: colors.zinc,
        
        // Customizadas - Geração seletiva
        primary: { ... },
        secondary: { ... },
        
        // Semânticas - Só DEFAULT
        success: { DEFAULT: "...", hover: "...", active: "..." },
        // ...
      }
    }
  }
}
```

---

## 📐 Sistema Tipográfico

### Por que usar elementos HTML sem classes?

#### Benefícios

**1. Semântica HTML Correta**
```tsx
// ✅ CORRETO - SEO friendly, acessível
<h1>Título da Página</h1>
<h2>Seção Principal</h2>
<p>Parágrafo normal</p>

// ❌ EVITE - Perde semântica
<div className="text-3xl font-bold">Título</div>
```

**2. Consistência Automática**
- Todos os `<h1>` têm 30px automaticamente
- Todos os `<p>` têm line-height relaxed
- Fácil manutenção global

**3. Performance**
- Menos classes = menor bundle
- Menos CSS gerado
- Melhor cache

**4. Manutenibilidade**
- Alterar em um lugar (globals.css)
- Propaga para todo o sistema
- Sem find/replace em 100 arquivos

### Quando Sobrescrever?

**Use classes apenas quando:**
```tsx
// 1. Tamanho específico necessário
<h2 className="text-xl">Heading menor que padrão</h2>

// 2. Cor diferente do padrão
<p className="text-primary">Texto dourado</p>

// 3. Classes utilitárias especiais
<span className="text-caption">Metadados 12px</span>
<label className="text-label">Label de formulário</label>
```

---

## 🎯 Classes Utilitárias Customizadas

### Por que criar classes utilitárias?

**Problema:**
```tsx
// Repetitivo e difícil de manter
<p className="text-xs text-neutral-600 uppercase tracking-wider">
<p className="text-xs text-neutral-600 uppercase tracking-wider">
<p className="text-xs text-neutral-600 uppercase tracking-wider">
```

**Solução:**
```tsx
// Classe utilitária
<p className="text-overline">
```

### Classes Criadas

```css
/* globals.css */
.text-caption { /* 12px, neutral-600 */ }
.text-overline { /* 12px, uppercase, semibold */ }
.text-label { /* 14px, medium, neutral-700 */ }
.text-body-small { /* 14px */ }
.text-body { /* 16px - padrão de <p> */ }
.text-body-large { /* 18px */ }
.text-success { /* 14px, verde */ }
.text-warning { /* 14px, laranja */ }
.text-error { /* 14px, vermelho */ }
.text-muted { /* 14px, neutral-500 */ }
```

### Convenções de Nomenclatura

**Padrão adotado:**
- `text-{função}` - Para diferentes propósitos
- `text-{tamanho}` - Para tamanhos específicos
- `text-{estado}` - Para estados semânticos

**Evitamos:**
- `text-12` - Não semântico
- `text-gray` - Ambíguo
- `small-text` - Ordem invertida

---

## 🌑 Sistema de Sombras (Elevação)

### Material Design Elevation Scale

Baseado no sistema de elevação do Material Design:

```css
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.12);        /* Elevation 1 */
--shadow-card-hover: 0 4px 6px rgba(0, 0, 0, 0.12);  /* Elevation 2 */
--shadow-elevated: 0 10px 15px rgba(0, 0, 0, 0.1);   /* Elevation 3 */
--shadow-float: 0 20px 25px rgba(0, 0, 0, 0.1);      /* Elevation 4 */
--shadow-modal: 0 25px 50px rgba(0, 0, 0, 0.2);      /* Elevation 5 */
```

### Quando usar cada nível?

**Elevation 1 (shadow-card):**
- Cards padrão
- Containers de conteúdo
- Items de lista

**Elevation 2 (shadow-card-hover):**
- Hover em cards
- Botões raised
- Inputs em foco

**Elevation 3 (shadow-elevated):**
- Dropdowns
- Menus
- Tooltips

**Elevation 4 (shadow-float):**
- Floating Action Buttons
- Snackbars
- Notifications

**Elevation 5 (shadow-modal):**
- Modais
- Dialogs
- Alerts importantes

---

## ♿ Acessibilidade

### Focus Rings

**Implementação:**
```css
/* globals.css */
:focus-visible {
  outline: 2px solid rgb(211 175 55);
  outline-offset: 2px;
  border-radius: 4px;
}
```

**Por que `:focus-visible` ao invés de `:focus`?**
- `:focus` - Mostra sempre, inclusive em cliques
- `:focus-visible` - Mostra apenas com teclado
- Melhor UX sem sacrificar acessibilidade

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Uso:**
```tsx
<button>
  <XIcon />
  <span className="sr-only">Fechar modal</span>
</button>
```

---

## 🔄 CSS Custom Properties vs Classes Tailwind

### Quando usar cada um?

**CSS Custom Properties (Tokens):**
```tsx
// ✅ BOM PARA: Valores dinâmicos
<div style={{ 
  padding: 'var(--spacing-md)',
  transition: 'var(--transition-base)' 
}}>

// ✅ BOM PARA: CSS customizado
.custom-component {
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-card);
}
```

**Classes Tailwind:**
```tsx
// ✅ BOM PARA: Layout e estrutura
<div className="flex items-center gap-4 p-6">

// ✅ BOM PARA: Responsive
<div className="grid grid-cols-1 md:grid-cols-3">

// ✅ BOM PARA: States
<button className="hover:bg-primary-600 active:bg-primary-700">
```

### Trade-offs

| Aspecto | Custom Properties | Classes Tailwind |
|---------|-------------------|------------------|
| Bundle Size | Menor | Maior (cada classe usada) |
| Runtime | Avaliado no runtime | Estático |
| Flexibilidade | Alta (valores dinâmicos) | Média (classes fixas) |
| Autocomplete | Não | Sim (no editor) |
| Type-safety | Não | Sim (com plugins) |
| SSR | Sim | Sim |

---

## 📦 Estrutura de Arquivos

### Por que separar tokens.css e globals.css?

**tokens.css:**
- Define variáveis CSS
- Valores puros (números, cores)
- Sem estilos aplicados
- Importado primeiro

**globals.css:**
- Usa os tokens
- Aplica estilos
- Resets e base styles
- Importado depois

**Benefícios:**
1. **Separação de responsabilidades** - Tokens = dados, Globals = estilos
2. **Reutilização** - Tokens podem ser usados em qualquer CSS
3. **Manutenção** - Alterar tokens propaga automaticamente
4. **Organização** - Fácil encontrar o que precisa

---

## 🚀 Performance

### Otimizações Aplicadas

**1. Font Loading**
```css
@font-face {
  font-display: swap; /* FOUT ao invés de FOIT */
}
```

**2. CSS Custom Properties**
- Não aumentam bundle size
- Avaliadas no runtime
- Melhor para theming

**3. Tailwind Purge**
```js
content: ['./App.tsx', './components/**/*.{tsx,ts}']
```
- Remove classes não usadas
- Bundle final menor
- Apenas produção

**4. Classes Utilitárias**
- Substituem código repetido
- Melhor compressão gzip
- Menor bundle total

---

## 📊 Métricas de Sucesso

### Objetivos do Design System

**1. Consistência Visual**
- ✅ 100% dos componentes usam tokens
- ✅ Paleta de cores centralizada
- ✅ Tipografia padronizada

**2. Developer Experience**
- ✅ Documentação completa
- ✅ Exemplos de código
- ✅ Guia de erros comuns
- ✅ Quick reference

**3. Manutenibilidade**
- ✅ Alterações em um lugar
- ✅ Propagação automática
- ✅ Fácil onboarding

**4. Performance**
- ✅ Bundle CSS otimizado
- ✅ Tree-shaking funcional
- ✅ Tokens não aumentam bundle

**5. Acessibilidade**
- ✅ Focus visible
- ✅ Screen reader support
- ✅ Contraste adequado (WCAG AA)

---

## 🔮 Futuro

### Melhorias Planejadas

**Fase 3: Utilities Data-Dense**
- Classes para layouts compactos
- Utilitários de formulário
- Card utilities

**Fase 4: Componentes Complexos**
- DataTable
- Dashboard widgets
- Charts customizados

**Fase 5: Temas**
- Dark mode
- High contrast
- Custom themes

---

**Versão:** 2.0  
**Última atualização:** 09/11/2025  
**Projeto:** Minerva Engenharia - Sistema ERP
