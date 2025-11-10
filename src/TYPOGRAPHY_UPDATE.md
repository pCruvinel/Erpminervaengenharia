# Atualização de Tipografia - Minerva Design System

## ✅ Fontes Implementadas

### 1. **Plus Jakarta Sans** (Font Sans)
- **Uso**: Fonte padrão do sistema
- **Aplicação**: Todo o corpo de texto, cabeçalhos, botões, formulários
- **Pesos disponíveis**: 400, 500, 600, 700
- **Variável CSS**: `--font-family-sans`
- **Classe utility**: `.font-sans`

### 2. **Lora** (Font Serif)
- **Uso**: Tipografia serifada para destaque ou conteúdo editorial
- **Aplicação**: Títulos especiais, citações, conteúdo de leitura longa
- **Pesos disponíveis**: 400, 500, 600, 700
- **Variável CSS**: `--font-family-serif`
- **Classe utility**: `.font-serif`

### 3. **IBM Plex Mono** (Font Mono)
- **Uso**: Fonte monoespaçada para código e dados técnicos
- **Aplicação**: Códigos de OS, números de protocolo, logs
- **Pesos disponíveis**: 400, 500, 600, 700
- **Variável CSS**: `--font-family-mono`
- **Classe utility**: `.font-mono`

---

## 📝 Como Usar

### Opção 1: Classes Utility (Recomendado)

```tsx
// Plus Jakarta Sans (padrão)
<div className="font-sans">Texto padrão do sistema</div>

// Lora (serif)
<h1 className="font-serif">Título Editorial</h1>

// IBM Plex Mono (código)
<code className="font-mono">OS-0001</code>
```

### Opção 2: Variáveis CSS

```css
.minha-classe {
  font-family: var(--font-family-sans);
}

.titulo-especial {
  font-family: var(--font-family-serif);
}

.codigo-os {
  font-family: var(--font-family-mono);
}
```

---

## 🎨 Exemplos de Uso no Sistema Minerva

### 1. Cabeçalhos e Títulos (Sans)
```tsx
<h1>Ordem de Serviço #OS-0001</h1>
<h2>Dashboard de Gestão</h2>
```
*Automaticamente usa Plus Jakarta Sans*

### 2. Destaque Editorial (Serif)
```tsx
<h1 className="font-serif">Minerva Engenharia</h1>
<blockquote className="font-serif italic">
  "Excelência em gestão de projetos"
</blockquote>
```

### 3. Códigos e IDs (Mono)
```tsx
<span className="font-mono">OS-0001</span>
<code className="font-mono">ID: #123456</code>
```

---

## ⚙️ Configuração Técnica

### Arquivo: `/App.tsx`

```tsx
// Google Fonts são carregadas dinamicamente via useEffect
useEffect(() => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  
  return () => {
    document.head.removeChild(link);
  };
}, []);
```

### Arquivo: `/styles/variables.css`

```css
:root {
  --font-family-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 
    'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif;
  --font-family-serif: 'Lora', 'Georgia', 'Cambria', 'Times New Roman', serif;
  --font-family-mono: 'IBM Plex Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 
    'Consolas', 'Courier New', monospace;
}
```

### Arquivo: `/styles/globals.css`

```css
/* Utility Classes */
.font-sans { font-family: var(--font-family-sans); }
.font-serif { font-family: var(--font-family-serif); }
.font-mono { font-family: var(--font-family-mono); }
```

---

## 📌 Notas Importantes

1. **Fallback fonts**: Cada família possui fontes de fallback para garantir compatibilidade
2. **Performance**: As fontes são carregadas via Google Fonts com `display=swap` para evitar FOIT (Flash of Invisible Text)
3. **Peso padrão**: O corpo de texto usa peso 400 (normal) por padrão
4. **Font size e line-height**: Continuam controlados pelas variáveis CSS globais conforme o Design System

---

## 🔄 Migração de Código Existente

Não é necessário alterar código existente. Plus Jakarta Sans é aplicada automaticamente como fonte padrão do sistema através de:

```css
body {
  font-family: var(--font-family-sans);
}
```

Para aplicar Lora ou IBM Plex Mono, adicione as classes `.font-serif` ou `.font-mono` conforme necessário.

---

## ✨ Próximos Passos

- [ ] Aplicar `.font-mono` em todos os códigos de OS
- [ ] Considerar uso de `.font-serif` em títulos principais do sistema
- [ ] Validar legibilidade em diferentes tamanhos de tela
- [ ] Otimizar carregamento de fontes se necessário

---

**Atualizado em**: 09/11/2025  
**Versão**: 3.1
