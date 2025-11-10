# Exemplos de Tipografia - Minerva Design System v2.0

Este documento mostra exemplos visuais e de código de todas as classes tipográficas disponíveis.

---

## 📚 Headings (Títulos)

### Heading 1 - Títulos Principais

```tsx
<h1>Minerva Engenharia - Sistema ERP</h1>
```

- **Tamanho:** 30px (text-3xl)
- **Line Height:** 1.25 (leading-tight)
- **Letter Spacing:** -0.025em (tracking-tight)
- **Peso:** 600 (font-semibold)
- **Uso:** Títulos de páginas, headers principais

---

### Heading 2 - Seções Principais

```tsx
<h2>Ordens de Serviço</h2>
```

- **Tamanho:** 24px (text-2xl)
- **Line Height:** 1.375 (leading-snug)
- **Letter Spacing:** -0.025em (tracking-tight)
- **Peso:** 600 (font-semibold)
- **Uso:** Títulos de seções, cards principais

---

### Heading 3 - Subsseções

```tsx
<h3>Detalhes da OS-001</h3>
```

- **Tamanho:** 20px (text-xl)
- **Line Height:** 1.375 (leading-snug)
- **Peso:** 600 (font-semibold)
- **Uso:** Cards, dialogs, subsseções

---

### Heading 4 - Títulos Menores

```tsx
<h4>Informações do Cliente</h4>
```

- **Tamanho:** 18px (text-lg)
- **Line Height:** 1.5 (leading-normal)
- **Peso:** 500 (font-medium)
- **Uso:** Cards internos, formulários agrupados

---

### Heading 5 & 6 - Micro Títulos

```tsx
<h5>Dados de Contato</h5>
<h6>Observações</h6>
```

- **h5:** 16px (text-base), font-medium
- **h6:** 14px (text-sm), font-medium
- **Uso:** Labels de grupos, títulos inline

---

## 📝 Texto Corrido

### Paragraph (Padrão)

```tsx
<p>
  Este é um parágrafo padrão com espaçamento otimizado para leitura.
  O line-height de 1.625 proporciona conforto visual em textos longos.
</p>
```

- **Tamanho:** 16px (text-base)
- **Line Height:** 1.625 (leading-relaxed)
- **Uso:** Corpo de texto, descrições, conteúdo principal

---

### Small (Texto Pequeno)

```tsx
<small>Informação complementar ou rodapé</small>
```

- **Tamanho:** 14px (text-sm)
- **Line Height:** 1.5 (leading-normal)
- **Uso:** Disclaimers, rodapés, informações secundárias

---

## 🏷️ Classes Utilitárias

### Caption (Legendas)

```tsx
<p className="text-caption">
  Última atualização: 09/11/2025 às 14:30
</p>
```

- **Tamanho:** 12px
- **Cor:** neutral-600
- **Line Height:** tight
- **Uso:** Timestamps, metadados, legendas de imagens

---

### Overline (Labels Superiores)

```tsx
<span className="text-overline">Categoria</span>
```

- **Tamanho:** 12px
- **Cor:** neutral-500
- **Transform:** uppercase
- **Letter Spacing:** 0.025em (wide)
- **Peso:** 500 (medium)
- **Uso:** Labels de categorias, seções superiores

---

### Label (Rótulos de Formulário)

```tsx
<label className="text-label" htmlFor="nome">
  Nome Completo
</label>
```

- **Tamanho:** 14px
- **Cor:** neutral-700
- **Peso:** 500 (medium)
- **Uso:** Labels de inputs, checkboxes, radio buttons

---

### Body Variants

```tsx
// Body Small
<p className="text-body-small">
  Texto menor para detalhes secundários
</p>

// Body (padrão - igual a <p>)
<p className="text-body">
  Texto padrão do corpo do conteúdo
</p>

// Body Large
<p className="text-body-large">
  Texto maior para destaque leve
</p>
```

- **Small:** 14px, neutral-700
- **Normal:** 16px, neutral-700
- **Large:** 18px, neutral-700
- **Uso:** Variações de densidade de informação

---

### Muted (Texto Secundário)

```tsx
<p className="text-muted">
  Esta informação é complementar e menos importante
</p>
```

- **Tamanho:** 14px
- **Cor:** neutral-500
- **Uso:** Informações opcionais, ajuda contextual

---

## 🎨 Estados Semânticos

### Error (Erro)

```tsx
<p className="text-error">
  Este campo é obrigatório
</p>
```

- **Tamanho:** 14px
- **Cor:** error (vermelho)
- **Uso:** Mensagens de validação, erros

---

### Success (Sucesso)

```tsx
<p className="text-success">
  Operação realizada com sucesso!
</p>
```

- **Tamanho:** 14px
- **Cor:** success (verde)
- **Uso:** Confirmações, estados positivos

---

### Warning (Aviso)

```tsx
<p className="text-warning">
  Atenção: esta ação não pode ser desfeita
</p>
```

- **Tamanho:** 14px
- **Cor:** warning (laranja)
- **Uso:** Alertas, avisos importantes

---

## ✂️ Line Clamp (Truncamento)

### 1 Linha

```tsx
<p className="line-clamp-1">
  Este texto muito longo será truncado com reticências após uma linha...
</p>
```

**Resultado visual:** "Este texto muito longo será truncado com reticências..."

---

### 2 Linhas

```tsx
<p className="line-clamp-2">
  Este texto ocupará no máximo duas linhas antes de ser truncado.
  Tudo que passar disso será cortado com reticências ao final.
  Esta terceira frase não aparecerá.
</p>
```

**Resultado visual:**
```
Este texto ocupará no máximo duas linhas antes de ser truncado.
Tudo que passar disso será cortado com reticências...
```

---

### 3 Linhas

```tsx
<p className="line-clamp-3">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco.
  Esta quarta linha será cortada com reticências.
</p>
```

---

## 💻 Code & Pre

### Inline Code

```tsx
<p>
  Use a classe <code>text-primary</code> para aplicar a cor dourada.
</p>
```

- **Background:** neutral-100
- **Cor:** neutral-900
- **Font:** monospace
- **Padding:** 1.5px 6px
- **Border Radius:** sm

---

### Code Block

```tsx
<pre>
  <code>
    {`const greet = (name: string) => {
  return \`Olá, \${name}!\`;
};`}
  </code>
</pre>
```

- **Background:** neutral-800
- **Cor:** neutral-50
- **Padding:** 16px
- **Overflow:** scroll horizontal
- **Border Radius:** lg

---

## 📋 Exemplos Práticos

### Card Header com Título

```tsx
<Card>
  <CardHeader className="bg-primary px-6 py-4">
    <h3 className="text-primary-foreground">OS-001: Projeto Residencial</h3>
    <p className="text-caption text-primary-foreground/80">
      Criado em 01/11/2025 por João Silva
    </p>
  </CardHeader>
  <CardContent className="p-6">
    <p className="text-body mb-4">
      Elaboração de projeto estrutural para residência unifamiliar.
    </p>
    <div className="space-y-2">
      <div>
        <span className="text-label">Cliente:</span>
        <p className="text-body-small">Construtora ABC Ltda.</p>
      </div>
      <div>
        <span className="text-label">Prazo:</span>
        <p className="text-body-small">30 dias corridos</p>
      </div>
    </div>
  </CardContent>
</Card>
```

---

### Formulário Data-Dense

```tsx
<form className="space-y-3">
  <div className="space-y-1">
    <label htmlFor="nome" className="text-label">
      Nome Completo
    </label>
    <Input id="nome" placeholder="Digite o nome" />
    <p className="text-muted">Este campo é obrigatório</p>
  </div>
  
  <div className="space-y-1">
    <label htmlFor="email" className="text-label">
      E-mail
    </label>
    <Input id="email" type="email" placeholder="exemplo@email.com" />
  </div>
  
  <Button type="submit">Salvar</Button>
</form>
```

---

### Lista de Informações

```tsx
<div className="space-y-3">
  <div>
    <span className="text-overline">Identificação</span>
    <h4>OS-001-2025</h4>
  </div>
  
  <div>
    <span className="text-overline">Status</span>
    <Badge>Em Andamento</Badge>
  </div>
  
  <div>
    <span className="text-overline">Responsável</span>
    <p className="text-body-small">Eng. João Silva</p>
    <p className="text-caption">joão.silva@minerva.eng.br</p>
  </div>
</div>
```

---

### Mensagem de Status

```tsx
<div className="space-y-2">
  <p className="text-success">
    ✓ Documento aprovado pela diretoria
  </p>
  
  <p className="text-warning">
    ⚠ Aguardando assinatura do cliente
  </p>
  
  <p className="text-error">
    ✗ Prazo de entrega vencido
  </p>
</div>
```

---

### Texto Truncado em Grid

```tsx
<div className="grid grid-cols-3 gap-4">
  <Card>
    <CardContent className="p-4">
      <h4 className="line-clamp-1">
        Título muito longo que será truncado
      </h4>
      <p className="text-body-small line-clamp-2 mt-2">
        Descrição que pode ocupar até duas linhas antes de ser
        cortada com reticências ao final do texto.
      </p>
    </CardContent>
  </Card>
  
  {/* Repetir mais 2 cards... */}
</div>
```

---

## 🎯 Boas Práticas

### ✅ FAÇA

```tsx
// Use elementos semânticos
<h1>Título Principal</h1>
<h2>Seção</h2>
<p>Parágrafo normal</p>

// Use classes utilitárias para casos especiais
<span className="text-caption">Metadados</span>
<span className="text-overline">Categoria</span>

// Combine classes quando necessário
<p className="text-body-small text-muted">
  Informação secundária pequena
</p>
```

### ❌ NÃO FAÇA

```tsx
// NÃO force tamanhos em elementos semânticos
<h1 className="text-2xl">Título</h1> // ❌

// NÃO use <div> quando há elemento semântico
<div className="text-xl font-semibold">Título</div> // ❌
<h3>Título</h3> // ✅

// NÃO sobrescreva line-heights sem necessidade
<p className="leading-none">Texto</p> // ❌
```

---

## 📊 Tabela Resumo

| Elemento/Classe | Tamanho | Line Height | Peso | Uso Principal |
|----------------|---------|-------------|------|---------------|
| `<h1>` | 30px | 1.25 | 600 | Títulos de página |
| `<h2>` | 24px | 1.375 | 600 | Seções principais |
| `<h3>` | 20px | 1.375 | 600 | Subsseções |
| `<h4>` | 18px | 1.5 | 500 | Cards, grupos |
| `<p>` | 16px | 1.625 | 400 | Corpo de texto |
| `.text-caption` | 12px | 1.25 | 400 | Legendas |
| `.text-overline` | 12px | - | 500 | Labels superiores |
| `.text-label` | 14px | - | 500 | Labels de form |
| `.text-muted` | 14px | - | 400 | Texto secundário |

---

**Versão:** 2.0  
**Última atualização:** 09/11/2025  
**Projeto:** Minerva Engenharia - Sistema ERP
