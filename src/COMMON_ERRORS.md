# Erros Comuns - Minerva Design System

> Este documento lista os erros mais comuns e suas soluções

---

## 🚨 ERRO: "Cannot apply unknown utility class: bg-primary-hover"

### Causa
Tentativa de usar classes Tailwind customizadas que não são geradas automaticamente.

### Classes Problemáticas
```tsx
// ❌ TODAS ESTAS CLASSES NÃO EXISTEM

// Background hover/active/disabled
bg-primary-hover
bg-primary-active
bg-primary-disabled
bg-secondary-hover
bg-success-hover
bg-warning-hover
bg-error-hover
bg-info-hover

// Text hover/active + escalas numéricas
text-primary-hover
text-primary-active
text-secondary-hover
text-primary-200        // ⚠️ Escala numérica não funciona em text
text-secondary-500      // ⚠️ Escala numérica não funciona em text

// Border com escalas numéricas
border-primary-300      // ⚠️ Escala numérica não funciona em border
border-secondary-500    // ⚠️ Escala numérica não funciona em border

// Com prefixos
hover:bg-primary-hover
active:bg-primary-active
hover:text-primary-hover

// ⚠️ NOTA: Estas classes SÃO VÁLIDAS (customizadas no globals.css)
text-error              // ✅ Funciona (14px, vermelho)
text-success            // ✅ Funciona (14px, verde)
text-warning            // ✅ Funciona (14px, laranja)
text-muted              // ✅ Funciona (14px, neutral-500)
text-caption            // ✅ Funciona (12px, neutral-600)
text-label              // ✅ Funciona (14px, neutral-700)
text-overline           // ✅ Funciona (12px, uppercase)
```

### ✅ Soluções

#### Solução 1: Use Componentes Base (RECOMENDADO)
```tsx
// Os componentes já têm hover/active/disabled corretos
<Button>Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button disabled>Desabilitado</Button>

<Badge className="bg-success text-white">Status</Badge>
```

#### Solução 2: Use Escala Numérica do Tailwind
```tsx
// Para backgrounds
<div className="bg-primary-500">              // Cor padrão
<div className="bg-primary-600">              // Cor mais escura
<div className="hover:bg-primary-600">        // Hover com cor mais escura

// Para textos
<p className="text-primary-500">              // Texto dourado
<p className="hover:text-primary-600">        // Hover mais escuro

// Escala completa disponível: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
```

#### Solução 3: Use RGB Direto (quando necessário)
```tsx
// Para valores exatos dos tokens
<div style={{ backgroundColor: 'rgb(189 158 50)' }}>  // primary-hover
<div style={{ backgroundColor: 'rgb(169 140 44)' }}>  // primary-active
<div style={{ backgroundColor: 'rgb(239 228 186)' }}> // primary-disabled
```

#### Solução 4: Use CSS Custom Properties
```tsx
// Em arquivos CSS
.custom-button {
  background-color: var(--color-primary-500);
}

.custom-button:hover {
  background-color: var(--color-primary-600);
}
```

---

## 🚨 ERRO: "Cannot apply unknown utility class: text-primary-200" ou "border-primary-300"

### Causa
Tentativa de usar escala numérica em cores de texto/border com primary/secondary que só funcionam para backgrounds.

### ✅ Solução
```tsx
// ❌ ERRADO - Escala numérica não funciona para text/border
<p className="text-primary-200">
<div className="border-primary-300">
<div className="border-secondary-500">

// ✅ CORRETO - Use neutral para textos secundários
<p className="text-neutral-600">
<p className="text-neutral-500">
<p className="text-muted">

// ✅ CORRETO - Use primary para texto dourado (sem número)
<p className="text-primary">

// ✅ CORRETO - Para borders, use neutral ou valor direto
<div className="border-neutral-300">
<div style={{ borderColor: 'rgb(231 215 151)' }}>  // primary-300

// ✅ CORRETO - Use classes utilitárias
<p className="text-caption">       // 12px, neutral-600
<p className="text-label">        // 14px, neutral-700
<p className="text-muted">        // 14px, neutral-500
```

### Explicação Técnica
O Tailwind só gera classes numéricas (`-50`, `-100`, `-200`, etc.) para `bg-*`. Para `text-*` e `border-*`, use:
- Cores sem escala: `text-primary`, `border-primary`
- Neutral com escala: `text-neutral-600`, `border-neutral-300`
- RGB direto via style: `style={{ color: 'rgb(...)' }}`

---

## 🚨 ERRO: "Cannot apply unknown utility class: text-error" (ou text-success, text-warning)

### Causa
Classes utilitárias customizadas (`text-error`, `text-success`, `text-warning`) foram definidas de forma recursiva no globals.css.

### Sintoma
```
Error: Cannot apply unknown utility class: text-error
Error: Cannot apply unknown utility class: text-success
Error: Cannot apply unknown utility class: text-warning
```

### ✅ Solução
As classes já estão corrigidas no `globals.css`. Use normalmente:

```tsx
// ✅ CORRETO - Classes utilitárias para estados
<p className="text-error">Erro de validação</p>
<p className="text-success">Operação bem-sucedida</p>
<p className="text-warning">Atenção necessária</p>

// Também funciona sem as classes utilitárias
<p className="text-sm" style={{ color: 'rgb(239 68 68)' }}>Erro</p>
```

### Nota Técnica
- `text-error`, `text-success`, `text-warning` são classes **utilitárias customizadas**
- Elas aplicam `14px + cor semântica`
- Não são cores diretas do Tailwind
- Definidas em `globals.css` com valores RGB diretos

---

## 🚨 ERRO: Tipografia não aparece como esperado

### Causa
Sobrescrever estilos padrão de headings/paragraphs desnecessariamente.

### ✅ Solução
```tsx
// ❌ ERRADO - Não sobrescreva sem necessidade
<h1 className="text-2xl font-bold">Título</h1>
<p className="text-base leading-normal">Texto</p>

// ✅ CORRETO - Use elementos sem classes
<h1>Título Principal</h1>              // 30px, semibold, leading-tight
<h2>Seção</h2>                          // 24px, semibold, leading-snug
<h3>Subsseção</h3>                      // 20px, semibold
<p>Parágrafo normal</p>                 // 16px, leading-relaxed

// ✅ CORRETO - Use classes utilitárias quando necessário
<span className="text-caption">Metadados</span>
<span className="text-overline">CATEGORIA</span>
```

---

## 🚨 ERRO: Sombras não aparecem

### Causa
1. Elemento não tem background-color
2. Z-index muito baixo
3. Classe de sombra incorreta

### ✅ Solução
```tsx
// ❌ ERRADO - Sem background
<div className="shadow-card">...</div>

// ✅ CORRETO - Com background
<Card className="shadow-card">...</Card>
<div className="bg-white shadow-card">...</div>

// Classes de sombra disponíveis
shadow-card              // Padrão (elevation 1)
shadow-card-hover        // Elevation 2
shadow-elevated          // Elevation 3
shadow-float             // Elevation 4
shadow-modal             // Para modais
```

---

## 🚨 ERRO: Focus rings não aparecem

### Causa
1. Usando `:focus` ao invés de `:focus-visible`
2. Testando com mouse ao invés de teclado

### ✅ Solução
```tsx
// ❌ ERRADO
<button className="focus:ring-2">Botão</button>

// ✅ CORRETO (já aplicado globalmente)
<button>Botão</button>

// ✅ CORRETO (customizado)
<button className="focus-visible:ring-2 focus-visible:ring-primary">
  Botão
</button>

// IMPORTANTE: Teste com Tab (teclado) não com clique do mouse
```

---

## 🚨 ERRO: Scrollbar customizada não aparece

### Causa
Scrollbar só aparece quando há conteúdo suficiente para scroll.

### ✅ Solução
```tsx
// Certifique-se de que há overflow
<div className="h-64 overflow-y-auto">
  {/* Conteúdo longo aqui */}
</div>

// A scrollbar é estilizada automaticamente (webkit + firefox)
```

---

## 🚨 ERRO: Line clamp não funciona

### Causa
Elemento pai sem largura definida.

### ✅ Solução
```tsx
// ❌ ERRADO - Sem largura
<p className="line-clamp-2">Texto longo...</p>

// ✅ CORRETO - Com container de largura definida
<div className="w-64">
  <p className="line-clamp-2">Texto longo...</p>
</div>

<div className="max-w-sm">
  <p className="line-clamp-1">Texto longo...</p>
</div>
```

---

## 🚨 ERRO: Import de globals.css não funciona

### Causa
Ordem incorreta de imports ou falta de import do tokens.css.

### ✅ Solução
```tsx
// App.tsx - ORDEM IMPORTA!
import './styles/tokens.css';    // 1º - Tokens primeiro
import './styles/globals.css';   // 2º - Globals depois

// ❌ ERRADO
import './styles/globals.css';
import './styles/tokens.css';

// ❌ ERRADO - Faltando tokens
import './styles/globals.css';
```

---

## 🚨 ERRO: CSS Custom Properties não funcionam

### Causa
1. Uso em atributos inline ao invés de style
2. Falta de prefixo `var()`

### ✅ Solução
```tsx
// ❌ ERRADO
<div className="p-[--spacing-md]">

// ✅ CORRETO - Use style
<div style={{ padding: 'var(--spacing-md)' }}>

// ✅ CORRETO - Em arquivo CSS
.custom-class {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  transition: var(--transition-base);
}
```

---

## 🚨 ERRO: Cores semânticas não têm hover

### Causa
Classes `bg-success-hover` etc não existem.

### ✅ Solução
```tsx
// ❌ ERRADO
<Badge className="bg-success hover:bg-success-hover">

// ✅ CORRETO - Opção 1: Use componente
<Badge className="bg-success text-white">Status</Badge>

// ✅ CORRETO - Opção 2: Use escala de cor padrão
<div className="bg-green-500 hover:bg-green-600">

// ✅ CORRETO - Opção 3: RGB direto
<div className="bg-success hover:brightness-90">
```

---

## 📋 Checklist de Debug

Quando tiver problemas, verifique na ordem:

1. ✅ **Imports corretos no App.tsx**
   ```tsx
   import './styles/tokens.css';
   import './styles/globals.css';
   ```

2. ✅ **Não usar classes `-hover`, `-active`, `-disabled`**
   - Use escala numérica: `primary-500`, `primary-600`
   - Ou use componentes base: `<Button>`, `<Badge>`

3. ✅ **Não sobrescrever tipografia sem necessidade**
   - Use `<h1>`, `<h2>`, `<p>` sem classes
   - Use classes utilitárias apenas quando necessário

4. ✅ **Verificar console do navegador**
   - Procure por erros "Cannot apply unknown utility class"
   - Procure por warnings do Tailwind

5. ✅ **Limpar cache**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - Reiniciar servidor de desenvolvimento

6. ✅ **Inspecionar com DevTools**
   - Verificar se classes foram aplicadas
   - Verificar computed styles
   - Verificar se há CSS conflitante

---

## 🔗 Links Úteis

- **Guia Rápido:** `/QUICK_REFERENCE.md`
- **Documentação Completa:** `/DESIGN_SYSTEM.md`
- **Exemplos de Tipografia:** `/TYPOGRAPHY_EXAMPLES.md`
- **Showcase Visual:** `/components/design-system-showcase.tsx`

---

**Versão:** 2.0  
**Última atualização:** 09/11/2025  
**Projeto:** Minerva Engenharia - Sistema ERP
