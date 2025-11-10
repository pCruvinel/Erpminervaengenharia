# Bugfix: text-error, text-success, text-warning

> Correção de classes utilitárias customizadas com definição recursiva

---

## 🐛 Problema

### Erro no Console
```
Error: Cannot apply unknown utility class: text-error
Error: Cannot apply unknown utility class: text-success  
Error: Cannot apply unknown utility class: text-warning
```

### Causa Raiz
Classes utilitárias customizadas definidas de forma **recursiva** no `globals.css`:

```css
/* ❌ INCORRETO - Recursivo */
.text-error {
  @apply text-sm text-error;  /* Tentando aplicar text-error dentro de .text-error */
}

.text-success {
  @apply text-sm text-success;  /* Recursivo */
}

.text-warning {
  @apply text-sm text-warning;  /* Recursivo */
}
```

### Por que isso aconteceu?
Quando você usa `@apply text-error` dentro da definição de `.text-error`, o Tailwind tenta buscar a classe `text-error` mas ainda está no processo de defini-la, criando um loop infinito.

---

## ✅ Solução

### Código Corrigido

```css
/* ✅ CORRETO - Valores diretos */
.text-error {
  font-size: 14px;
  line-height: 20px;
  color: rgb(239 68 68);
}

.text-success {
  font-size: 14px;
  line-height: 20px;
  color: rgb(34 197 94);
}

.text-warning {
  font-size: 14px;
  line-height: 20px;
  color: rgb(245 158 11);
}
```

### Valores RGB Utilizados

| Classe | Cor | RGB | Hex |
|--------|-----|-----|-----|
| `.text-error` | Vermelho | `rgb(239 68 68)` | `#EF4444` |
| `.text-success` | Verde | `rgb(34 197 94)` | `#22C55E` |
| `.text-warning` | Laranja | `rgb(245 158 11)` | `#F59E0B` |

Esses valores vêm do `tailwind.config.js`:

```js
error: {
  DEFAULT: 'rgb(239 68 68)',
  // ...
},
success: {
  DEFAULT: 'rgb(34 197 94)',
  // ...
},
warning: {
  DEFAULT: 'rgb(245 158 11)',
  // ...
}
```

---

## 📝 Uso Correto

### Como usar as classes

```tsx
// ✅ Classes funcionam normalmente agora
<p className="text-error">
  Campo obrigatório
</p>

<p className="text-success">
  Operação realizada com sucesso!
</p>

<p className="text-warning">
  Atenção: esta ação não pode ser desfeita
</p>
```

### Propriedades Aplicadas

Cada classe aplica automaticamente:
- **Font size:** 14px
- **Line height:** 20px
- **Color:** Cor semântica (vermelho/verde/laranja)

### Exemplos de Uso Real

```tsx
// Em formulários
<div className="space-y-2">
  <Label htmlFor="email">E-mail</Label>
  <Input type="email" id="email" />
  {error && <p className="text-error">{error}</p>}
</div>

// Em listas de status
<div className="space-y-2">
  <p className="text-success">
    ✓ Documento aprovado
  </p>
  <p className="text-warning">
    ⚠ Aguardando revisão
  </p>
  <p className="text-error">
    ✗ Prazo vencido
  </p>
</div>

// Em notificações
<Alert>
  <AlertTitle>Erro</AlertTitle>
  <AlertDescription className="text-error">
    Não foi possível salvar as alterações
  </AlertDescription>
</Alert>
```

---

## 🔍 Diagnóstico Técnico

### Por que `@apply` não funcionou?

#### Problema 1: Recursão
```css
.text-error {
  @apply text-sm text-error;
  /*              ^^^^^^^^^^
   *              Procura por classe "text-error"
   *              que ainda está sendo definida
   */
}
```

#### Problema 2: Tailwind não gera `text-error` automaticamente
- `text-error` **NÃO** é uma classe padrão do Tailwind
- `error` é uma cor customizada no config
- Tailwind gera `bg-error` mas NÃO `text-error` por padrão
- Por isso tentar usar `@apply text-error` falha

### Classes Tailwind geradas automaticamente

Para cores customizadas no config:

| Propriedade | Gerado? | Exemplo |
|-------------|---------|---------|
| `bg-*` | ✅ Sim | `bg-error`, `bg-success` |
| `text-*` | ❌ Não | ~~`text-error`~~ (não existe) |
| `border-*` | ❌ Não | ~~`border-error`~~ (não existe) |

**Exceção:** `neutral` (zinc) tem escala completa:
- ✅ `bg-neutral-600`
- ✅ `text-neutral-600`  
- ✅ `border-neutral-600`

### Solução Correta: Valores Diretos

Ao invés de tentar usar `@apply` com classes que não existem:

```css
/* ❌ NÃO FUNCIONA */
.text-error {
  @apply text-sm text-error;  /* text-error não é gerado pelo Tailwind */
}

/* ✅ FUNCIONA */
.text-error {
  font-size: 14px;           /* Valor direto de text-sm */
  line-height: 20px;         /* Line-height padrão do text-sm */
  color: rgb(239 68 68);     /* Valor do error.DEFAULT no config */
}
```

---

## 📋 Checklist de Correção

- [x] Identificado o problema (recursão em @apply)
- [x] Substituído `@apply text-sm text-error` por valores diretos
- [x] Aplicado para `.text-error`, `.text-success`, `.text-warning`
- [x] Verificado que não há outras classes recursivas
- [x] Testado que as classes funcionam corretamente
- [x] Documentado em COMMON_ERRORS.md
- [x] Atualizado CHANGELOG_PHASE2.md
- [x] Atualizado QUICK_REFERENCE.md

---

## 🎓 Lições Aprendidas

### 1. Evite Recursão em @apply
```css
/* ❌ NUNCA faça isso */
.custom-class {
  @apply custom-class;
}

/* ✅ Use valores diretos ou outras classes */
.custom-class {
  font-size: 14px;
  color: red;
}
```

### 2. Nem todas as cores geram text-*
```css
/* No tailwind.config.js */
colors: {
  error: { DEFAULT: 'rgb(239 68 68)' }
}

/* Gera automaticamente: */
✅ bg-error
❌ text-error (NÃO gerado)
❌ border-error (NÃO gerado)
```

### 3. Classes customizadas precisam de valores diretos
```css
/* Se você quer text-error, defina manualmente: */
.text-error {
  color: rgb(239 68 68);  /* Valor direto do config */
}
```

### 4. Prefira classes utilitárias customizadas
Ao invés de repetir:
```tsx
<p className="text-sm text-red-500">Erro</p>
<p className="text-sm text-red-500">Erro</p>
<p className="text-sm text-red-500">Erro</p>
```

Crie uma classe:
```css
.text-error {
  font-size: 14px;
  color: rgb(239 68 68);
}
```

```tsx
<p className="text-error">Erro</p>
<p className="text-error">Erro</p>
<p className="text-error">Erro</p>
```

---

## 🔗 Arquivos Modificados

1. **`/styles/globals.css`** (Linhas 349-365)
   - Corrigido `.text-error`
   - Corrigido `.text-success`
   - Corrigido `.text-warning`

2. **`/COMMON_ERRORS.md`**
   - Adicionado seção sobre text-error
   - Explicação de classes utilitárias customizadas
   - Atualizada lista de classes válidas

3. **`/CHANGELOG_PHASE2.md`**
   - Documentado o bug e correção
   - Explicação técnica do problema
   - Exemplos antes/depois

4. **`/QUICK_REFERENCE.md`**
   - Atualizada seção de classes utilitárias
   - Adicionado nota sobre customização
   - RGB values para referência

5. **`/BUGFIX_TEXT_ERROR.md`** (Este arquivo)
   - Documentação completa do bugfix

---

## ✅ Validação

### Testes Realizados

1. **Console do navegador:** ✅ Sem erros
2. **Classes funcionam:** ✅ text-error, text-success, text-warning aplicam estilos
3. **Sem recursão:** ✅ Nenhuma classe usa @apply recursivo
4. **Todas as cores:** ✅ RGB values corretos

### Comandos de Verificação

```bash
# Procurar por recursão
grep -r "@apply.*text-error" styles/
grep -r "@apply.*text-success" styles/
grep -r "@apply.*text-warning" styles/

# Resultado esperado: Nenhum resultado
```

---

## 📊 Impacto

### Performance
- ✅ Nenhum impacto negativo
- ✅ Classes customizadas compilam normalmente
- ✅ Bundle size inalterado

### Compatibilidade
- ✅ Funcionamento mantido
- ✅ API da classe não mudou (ainda é `text-error`)
- ✅ Componentes existentes não precisam de mudanças

### Developer Experience
- ✅ Erro resolvido
- ✅ Classes funcionam como esperado
- ✅ Documentação clara

---

## 🚀 Próximos Passos

1. ✅ Erro corrigido e validado
2. ✅ Documentação atualizada
3. ⏭️ Continuar para Fase 3 (Utilities Data-Dense)

---

**Status:** ✅ Resolvido  
**Data:** 09/11/2025  
**Versão:** 2.0  
**Projeto:** Minerva Engenharia - Sistema ERP
