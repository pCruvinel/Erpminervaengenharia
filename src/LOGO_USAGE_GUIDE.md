# 🎨 Guia de Uso da Logo Minerva

**Versão**: 1.0  
**Data**: 2024-01-09  
**Asset**: `figma:asset/4d6725944d737f640d01fc63f170afaabecd6e0a.png`

---

## 📋 Visão Geral

A logo da **Minerva Soluções em Engenharia** é composta por:
1. **Ícone**: Capacete romano/grego (Minerva) em estilo de engrenagem dourada
2. **Texto**: "MINERVA" em caixa alta preta + "SOLUÇÕES EM ENGENHARIA" em subtítulo

**Cores principais**:
- Dourado: `#D3AF37` (primary)
- Dourado Claro: `#DDC063` (secondary)
- Texto: Preto

---

## 🏗️ Componente MinervaLogo

Criamos um componente React reutilizável que oferece 3 variantes da logo.

### Localização
```
/components/layout/minerva-logo.tsx
```

### Importação

```tsx
import { MinervaLogo } from './components/layout/minerva-logo';
```

---

## 🎯 Variantes Disponíveis

### 1. Variante `full` (Padrão)

**Uso**: Páginas principais, header, áreas com espaço

```tsx
<MinervaLogo variant="full" />
```

**Características**:
- Logo completa (ícone + texto)
- Altura: 40px (`h-10`)
- Largura: Auto (mantém proporção)

**Onde usar**:
- ✅ Sidebar expandida
- ✅ Página de login
- ✅ Rodapé
- ✅ Documentos impressos (cabeçalho)

---

### 2. Variante `icon`

**Uso**: Sidebar colapsada, espaços pequenos

```tsx
<MinervaLogo variant="icon" />
```

**Características**:
- Apenas o ícone do capacete (parte esquerda da logo)
- Altura: 32px (`h-8`)
- Largura: 32px (`w-8`)
- Object-fit: contain com posição à esquerda

**Onde usar**:
- ✅ Sidebar colapsada
- ✅ Favicons
- ✅ App icons
- ✅ Versões mobile (header compacto)

---

### 3. Variante `compact`

**Uso**: Mobile, espaços médios

```tsx
<MinervaLogo variant="compact" />
```

**Características**:
- Logo completa em tamanho reduzido
- Altura: 32px (`h-8`)
- Largura: Auto (mantém proporção)

**Onde usar**:
- ✅ Header mobile
- ✅ Modais
- ✅ Cards compactos
- ✅ Notificações

---

## 🎨 Customização com className

Você pode adicionar classes Tailwind customizadas:

```tsx
// Adicionar margem
<MinervaLogo variant="full" className="mb-4" />

// Adicionar padding
<MinervaLogo variant="full" className="px-2" />

// Centralizar
<MinervaLogo variant="icon" className="mx-auto" />

// Customizar tamanho (sobrescrever padrão)
<MinervaLogo variant="full" className="h-12 w-auto" />
```

---

## 📦 Implementações Atuais

### 1. Sidebar (`/components/layout/sidebar.tsx`)

```tsx
{/* Logo */}
<div className="minerva-sidebar-logo">
  {!collapsed ? (
    <MinervaLogo variant="full" className="px-2" />
  ) : (
    <MinervaLogo variant="icon" />
  )}
</div>
```

**Comportamento**:
- Sidebar **expandida** → Logo completa
- Sidebar **colapsada** → Apenas ícone

---

### 2. Página de Login (`/components/auth/login-page.tsx`)

```tsx
{/* Logo and Title */}
<div className="text-center mb-8">
  <div className="flex items-center justify-center mb-6">
    <div className="bg-white rounded-lg p-4 shadow-xl">
      <MinervaLogo variant="full" />
    </div>
  </div>
  <p className="text-neutral-200 text-lg">Sistema de Gestão Integrada</p>
</div>
```

**Características**:
- Logo em fundo branco com bordas arredondadas
- Sombra (`shadow-xl`) para destaque no fundo escuro
- Centralizada acima do formulário

---

## 🎯 Boas Práticas

### ✅ O que FAZER

```tsx
// ✅ Usar a variante apropriada para o contexto
<MinervaLogo variant="full" />        // Em header
<MinervaLogo variant="icon" />        // Em sidebar colapsada
<MinervaLogo variant="compact" />     // Em mobile

// ✅ Manter proporções (usar w-auto)
<MinervaLogo variant="full" className="h-12 w-auto" />

// ✅ Adicionar alt text via imagem (já incluído no componente)
// O componente já tem alt="Minerva Soluções em Engenharia"

// ✅ Usar em fundos que contrastem
<div className="bg-white p-4">
  <MinervaLogo variant="full" />
</div>
```

### ❌ O que NÃO FAZER

```tsx
// ❌ Distorcer proporções
<MinervaLogo variant="full" className="h-10 w-10" />

// ❌ Usar tamanho muito pequeno na variante full (ilegível)
<MinervaLogo variant="full" className="h-4" />

// ❌ Usar ícone em contextos que pedem logo completa
<MinervaLogo variant="icon" /> // Na página de login (errado)

// ❌ Sobrepor logo em fundos sem contraste
<div className="bg-gray-200">  {/* Mal contraste com dourado */}
  <MinervaLogo variant="full" />
</div>
```

---

## 📐 Especificações Técnicas

### Asset Original

```tsx
import logoImage from 'figma:asset/4d6725944d737f640d01fc63f170afaabecd6e0a.png';
```

**Formato**: PNG  
**Transparência**: Sim (fundo transparente)  
**Resolução**: Alta (otimizado para web)

### Tamanhos Recomendados

| Variante | Altura Padrão | Largura | Uso |
|----------|--------------|---------|-----|
| `full` | 40px (`h-10`) | Auto | Desktop, áreas principais |
| `icon` | 32px (`h-8`) | 32px (`w-8`) | Sidebar colapsada, ícones |
| `compact` | 32px (`h-8`) | Auto | Mobile, espaços médios |

### Responsividade

```tsx
// Exemplo: Logo responsiva no header
<div className="flex items-center">
  {/* Mobile: ícone ou compact */}
  <div className="block md:hidden">
    <MinervaLogo variant="icon" />
  </div>
  
  {/* Desktop: logo completa */}
  <div className="hidden md:block">
    <MinervaLogo variant="full" />
  </div>
</div>
```

---

## 🎨 Casos de Uso por Contexto

### 1. Autenticação

```tsx
// Login Page
<div className="bg-white rounded-lg p-4 shadow-xl">
  <MinervaLogo variant="full" />
</div>
```

### 2. Navegação

```tsx
// Sidebar
{collapsed ? (
  <MinervaLogo variant="icon" />
) : (
  <MinervaLogo variant="full" className="px-2" />
)}

// Header Mobile
<MinervaLogo variant="compact" />

// Header Desktop
<MinervaLogo variant="full" />
```

### 3. Documentos e Relatórios

```tsx
// Cabeçalho de PDF/Impressão
<div className="print:block hidden">
  <MinervaLogo variant="full" className="h-16 w-auto" />
</div>
```

### 4. Modais e Dialogs

```tsx
// Header de Dialog
<DialogHeader>
  <div className="flex items-center gap-3 mb-4">
    <MinervaLogo variant="compact" />
    <DialogTitle>Título do Modal</DialogTitle>
  </div>
</DialogHeader>
```

### 5. E-mails e Notificações

```tsx
// Template de email (header)
<div style="background: white; padding: 20px; text-align: center;">
  <MinervaLogo variant="full" className="h-12 w-auto mx-auto" />
</div>
```

---

## 🔄 Variações de Fundo

### Fundo Branco (Recomendado)

```tsx
<div className="bg-white p-4 rounded-lg">
  <MinervaLogo variant="full" />
</div>
```

**Contraste**: Excelente (dourado + preto em branco)

### Fundo Escuro

```tsx
<div className="bg-neutral-900 p-4 rounded-lg">
  <div className="bg-white rounded-md p-2 inline-block">
    <MinervaLogo variant="full" />
  </div>
</div>
```

**Nota**: Adicionar fundo branco por baixo para manter legibilidade

### Fundo Neutro Claro

```tsx
<div className="bg-neutral-50 p-4">
  <MinervaLogo variant="full" />
</div>
```

**Contraste**: Bom (mas menos que fundo branco puro)

---

## 📱 Responsividade Mobile

### Exemplo: Header Responsivo

```tsx
export function ResponsiveHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      {/* Logo - varia por tamanho de tela */}
      <div className="flex items-center gap-3">
        {/* Extra Small: apenas ícone */}
        <div className="block sm:hidden">
          <MinervaLogo variant="icon" />
        </div>
        
        {/* Small e acima: logo completa em tamanho reduzido */}
        <div className="hidden sm:block md:hidden">
          <MinervaLogo variant="compact" />
        </div>
        
        {/* Medium e acima: logo completa */}
        <div className="hidden md:block">
          <MinervaLogo variant="full" />
        </div>
      </div>
      
      {/* Resto do header... */}
    </header>
  );
}
```

---

## 🎯 Acessibilidade

### Alt Text

O componente já inclui `alt` apropriado:

```tsx
// Variante full
alt="Minerva Soluções em Engenharia"

// Variante icon e compact
alt="Minerva Engenharia"
```

### Contraste

- ✅ **Logo em fundo branco**: WCAG AAA (excelente)
- ✅ **Logo em fundo neutro claro**: WCAG AA (bom)
- ⚠️ **Logo em fundo escuro**: Adicionar fundo branco por baixo

---

## 📊 Performance

### Otimização de Imagem

```tsx
// O asset é carregado via Figma CDN
import logoImage from 'figma:asset/4d6725944d737f640d01fc63f170afaabecd6e0a.png';

// Otimizações aplicadas:
// - Lazy loading (quando apropriado)
// - Tamanho otimizado (PNG comprimido)
// - Cache do navegador
```

### Loading Strategy

```tsx
// Para páginas de loading, use skeleton
{isLoading ? (
  <div className="h-10 w-48 bg-neutral-200 animate-pulse rounded" />
) : (
  <MinervaLogo variant="full" />
)}
```

---

## 🔮 Futuras Implementações Sugeridas

### 1. Favicon

```html
<!-- Em index.html -->
<link rel="icon" type="image/png" href="/path/to/minerva-icon.png" />
```

### 2. PWA Icons

```json
// manifest.json
{
  "icons": [
    {
      "src": "/icons/minerva-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/minerva-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 3. Social Media (Open Graph)

```html
<!-- Meta tags -->
<meta property="og:image" content="/path/to/minerva-og.png" />
```

### 4. Email Signatures

```html
<!-- Template de assinatura -->
<table>
  <tr>
    <td>
      <img src="https://..." alt="Minerva Engenharia" height="50" />
    </td>
  </tr>
</table>
```

---

## 📚 Referências

- **Design System**: `/DESIGN_SYSTEM.md`
- **Paleta de Cores**: Primary `#D3AF37`, Secondary `#DDC063`
- **Asset Original**: `figma:asset/4d6725944d737f640d01fc63f170afaabecd6e0a.png`

---

**Última Atualização**: 2024-01-09  
**Versão**: 1.0  
**Responsável**: Minerva ERP - Brand Guidelines
