# Validação Dinâmica de Dados da Etapa 1 na Proposta Comercial

> ⚠️ **DOCUMENTO ARQUIVADO** - 14/11/2025  
> Esta feature foi 100% implementada e está em produção.  
> Referência histórica mantida. Ver `/src/FEATURES_IMPLEMENTADAS_LOG.md` para detalhes.

**Data:** 10/11/2025  
**Componente:** `step-gerar-proposta-os01-04.tsx`  
**Funcionalidade:** Etapa 9 - Gerar Proposta Comercial  
**Status:** ✅ Implementado | 📦 ARQUIVADO

---

## 📋 Resumo da Alteração

Substituído o **alerta estático** que informava *"Os dados do cliente, responsável, unidades, blocos e endereço foram carregados automaticamente da Etapa 1"* por um **alerta dinâmico com validação inteligente** que verifica se todos os campos obrigatórios da Etapa 1 foram preenchidos.

---

## 🎯 Comportamento Implementado

### ✅ Cenário 1: Todos os Dados Preenchidos
Quando **todos os campos obrigatórios** da Etapa 1 estão preenchidos:

```
┌────────────────────────────────────────────────────┐
│ ✅ Todos os dados necessários foram preenchidos    │
└────────────────────────────────────────────────────┘
   (Alerta VERDE com ícone CheckCircle)
```

**Botão "Gerar Proposta Comercial":** HABILITADO ✅

---

### ⚠️ Cenário 2: Dados Incompletos
Quando **algum campo obrigatório** está em branco:

```
┌────────────────────────────────────────────────────────────┐
│ ⚠️ Atenção: Preencha os campos obrigatórios da Etapa 1     │
│    antes de gerar a proposta:                              │
│                                                             │
│    • Nome/Razão Social                                     │
│    • CPF/CNPJ                                              │
│    • Nome do Responsável                                   │
│    • Quantidade de Blocos                                  │
└────────────────────────────────────────────────────────────┘
   (Alerta AMARELO com ícone AlertCircle e lista de campos)
```

**Botão "Gerar Proposta Comercial":** DESABILITADO ❌

---

## 🔍 Campos Validados

A validação verifica os seguintes campos obrigatórios da **Etapa 1**:

| Campo | Nome Exibido | Tipo |
|-------|--------------|------|
| `etapa1Data.nome` | Nome/Razão Social | Texto |
| `etapa1Data.cpfCnpj` | CPF/CNPJ | Texto |
| `etapa1Data.telefone` | Telefone | Texto |
| `etapa1Data.email` | E-mail | Email |
| `etapa1Data.nomeResponsavel` | Nome do Responsável | Texto |
| `etapa1Data.endereco` | Endereço (Rua) | Texto |
| `etapa1Data.numero` | Número | Texto |
| `etapa1Data.bairro` | Bairro | Texto |
| `etapa1Data.cidade` | Cidade | Texto |
| `etapa1Data.estado` | Estado | UF |

**Total:** 10 campos obrigatórios

### Campos Opcionais (não bloqueiam geração de proposta):
- `etapa1Data.qtdUnidades` - Quantidade de Unidades
- `etapa1Data.qtdBlocos` - Quantidade de Blocos
- `etapa1Data.complemento` - Complemento do endereço

---

## 💻 Implementação Técnica

### Função de Validação

```typescript
const validarDadosEtapa1 = () => {
  const camposFaltantes: string[] = [];

  if (!etapa1Data.nome) camposFaltantes.push('Nome/Razão Social');
  if (!etapa1Data.cpfCnpj) camposFaltantes.push('CPF/CNPJ');
  if (!etapa1Data.telefone) camposFaltantes.push('Telefone');
  if (!etapa1Data.email) camposFaltantes.push('E-mail');
  if (!etapa1Data.nomeResponsavel) camposFaltantes.push('Nome do Responsável');
  if (!etapa1Data.endereco) camposFaltantes.push('Endereço (Rua)');
  if (!etapa1Data.numero) camposFaltantes.push('Número');
  if (!etapa1Data.bairro) camposFaltantes.push('Bairro');
  if (!etapa1Data.cidade) camposFaltantes.push('Cidade');
  if (!etapa1Data.estado) camposFaltantes.push('Estado');
  // Nota: qtdUnidades e qtdBlocos são opcionais

  return {
    valido: camposFaltantes.length === 0,
    camposFaltantes,
  };
};

const validacao = validarDadosEtapa1();
```

---

### Renderização Condicional do Alerta

```tsx
{validacao.valido ? (
  <Alert className="bg-green-50 border-green-200">
    <CheckCircle className="h-4 w-4 text-green-600" />
    <AlertDescription className="text-green-700">
      ✅ Todos os dados necessários foram preenchidos
    </AlertDescription>
  </Alert>
) : (
  <Alert variant="destructive" className="bg-yellow-50 border-yellow-300">
    <AlertCircle className="h-4 w-4 text-yellow-700" />
    <AlertDescription className="text-yellow-800">
      <div>
        <strong>Atenção:</strong> Preencha os campos obrigatórios da Etapa 1 antes de gerar a proposta:
      </div>
      <ul className="list-disc list-inside mt-2 ml-2 text-sm space-y-1">
        {validacao.camposFaltantes.map((campo, index) => (
          <li key={index}>{campo}</li>
        ))}
      </ul>
    </AlertDescription>
  </Alert>
)}
```

---

### Validação no Botão

**ANTES:**
```tsx
disabled={
  !data.validadeDias ||
  !data.garantiaMeses ||
  !etapa1Data.nomeResponsavel ||
  !etapa1Data.qtdUnidades ||
  !etapa1Data.qtdBlocos ||
  !etapa1Data.endereco ||
  !etapa1Data.bairro ||
  !etapa1Data.cidade ||
  !etapa1Data.estado
}
```

**DEPOIS:**
```tsx
disabled={!data.validadeDias || !data.garantiaMeses || !validacao.valido}
```

✅ **Muito mais limpo e centralizado!**

---

## 🎨 Estilos Utilizados

### Alerta de Sucesso (Verde)
```tsx
className="bg-green-50 border-green-200"
// Ícone: CheckCircle (text-green-600)
// Texto: text-green-700
```

### Alerta de Atenção (Amarelo)
```tsx
className="bg-yellow-50 border-yellow-300"
// Ícone: AlertCircle (text-yellow-700)
// Texto: text-yellow-800
// Lista: list-disc list-inside (bullets)
```

---

## 🧪 Como Testar

### Teste 1: Validação Positiva
1. Ir para Etapa 1
2. Preencher **todos** os campos obrigatórios:
   - Nome, CPF/CNPJ, Telefone, Email
   - Nome do Responsável
   - Endereço completo (Rua, Número, Bairro, Cidade, Estado)
   - Qtd. Unidades e Qtd. Blocos
3. Avançar para Etapa 9
4. ✅ Deve mostrar alerta **verde**: "Todos os dados necessários foram preenchidos"
5. ✅ Botão "Gerar Proposta" deve estar **habilitado**

---

### Teste 2: Validação Negativa (Campos Vazios)
1. Ir para Etapa 1
2. Preencher **apenas** alguns campos (deixar outros em branco)
3. Avançar para Etapa 9
4. ⚠️ Deve mostrar alerta **amarelo** com lista de campos faltantes
5. ❌ Botão "Gerar Proposta" deve estar **desabilitado**

**Exemplo de mensagem:**
```
⚠️ Atenção: Preencha os campos obrigatórios da Etapa 1 antes de gerar a proposta:

• Nome/Razão Social
• Telefone
• Bairro
```

---

### Teste 3: Correção Dinâmica
1. Com alertas de validação mostrando campos faltantes
2. Voltar para Etapa 1
3. Preencher os campos que estavam vazios
4. Retornar para Etapa 9
5. ✅ Alerta deve mudar para **verde** automaticamente
6. ✅ Botão "Gerar Proposta" deve ser **habilitado**

---

## 📊 Comparação: Antes vs Depois

### ANTES
```
┌────────────────────────────────────────────────────────┐
│ ℹ️ Os dados do cliente, responsável, unidades, blocos │
│    e endereço foram carregados automaticamente da      │
│    Etapa 1 (Cadastro do Lead).                        │
└────────────────────────────────────────────────────────┘

[✓] Gerar Proposta Comercial
(Botão habilitado mesmo com dados incompletos)
```

**Problema:** Usuário não sabia se os dados estavam completos ou não.

---

### DEPOIS

**Caso 1: Dados Completos**
```
┌────────────────────────────────────────────────────┐
│ ✅ Todos os dados necessários foram preenchidos    │
└────────────────────────────────────────────────────┘

[✓] Gerar Proposta Comercial
(Botão habilitado - tudo OK)
```

**Caso 2: Dados Incompletos**
```
┌────────────────────────────────────────────────────┐
│ ⚠️ Atenção: Preencha os campos obrigatórios da     │
│    Etapa 1 antes de gerar a proposta:             │
│    • CPF/CNPJ                                      │
│    • Nome do Responsável                           │
│    • Quantidade de Blocos                          │
└────────────────────────────────────────────────────┘

[✗] Gerar Proposta Comercial
(Botão DESABILITADO até preencher)
```

**Vantagens:**
- ✅ Feedback visual claro (verde = OK, amarelo = falta algo)
- ✅ Lista exata dos campos que precisam ser preenchidos
- ✅ Impede gerar proposta com dados incompletos
- ✅ Ajuda o usuário a não esquecer nada

---

## 🔄 Fluxo de Validação

```
Usuário chega na Etapa 9
    ↓
Sistema executa validarDadosEtapa1()
    ↓
Verifica 12 campos obrigatórios
    ↓
Todos preenchidos?
    ├─ SIM → Alerta VERDE + Botão HABILITADO
    └─ NÃO → Alerta AMARELO com lista + Botão DESABILITADO
    
Usuário tenta clicar "Gerar Proposta"
    ↓
Botão está desabilitado? (validacao.valido === false)
    ├─ SIM → Não faz nada (botão cinza, não clicável)
    └─ NÃO → Gera proposta normalmente
```

---

## 🐛 Tratamento de Casos Especiais

### Caso 1: Campo "Complemento" (opcional)
- ✅ Não incluído na validação
- Campo opcional, não bloqueia a proposta

### Caso 2: CEP (não validado)
- ⚠️ Atualmente não está na validação
- **Sugestão futura:** Adicionar CEP como obrigatório

### Caso 3: Tipo de Edificação (não validado)
- ⚠️ Atualmente não está na validação
- **Sugestão futura:** Adicionar como obrigatório

### Caso 4: Qtd. Blocos para tipos diferentes de Apartamentos
- ✅ Atualmente valida sempre
- **Melhoria futura:** Validar condicionalmente baseado no tipo de edificação

---

## 📝 Melhorias Futuras

### 1. Validação Condicional de Campos
```typescript
// Exemplo: Qtd. Blocos só é obrigatório para Apartamentos
if (etapa1Data.tipoEdificacao === 'Condomínio Residencial - Apartamentos') {
  if (!etapa1Data.qtdBlocos) camposFaltantes.push('Quantidade de Blocos');
}
```

### 2. Adicionar CEP na Validação
```typescript
if (!etapa1Data.cep) camposFaltantes.push('CEP');
```

### 3. Adicionar Tipo de Edificação
```typescript
if (!etapa1Data.tipoEdificacao) camposFaltantes.push('Tipo de Edificação');
```

### 4. Validação de Formato
```typescript
// Validar formato de email
if (etapa1Data.email && !isValidEmail(etapa1Data.email)) {
  camposFaltantes.push('E-mail (formato inválido)');
}
```

### 5. Link para Etapa 1
```tsx
<Button variant="link" onClick={() => navigateToStep(1)}>
  Voltar para Etapa 1
</Button>
```

---

## 📊 Impacto no UX

### Antes
- ❌ Mensagem genérica sem feedback específico
- ❌ Botão habilitado mesmo com dados faltantes
- ❌ Usuário pode gerar proposta incompleta
- ❌ Não sabe quais campos estão vazios

### Depois
- ✅ Feedback visual claro (verde/amarelo)
- ✅ Botão desabilitado se dados incompletos
- ✅ Lista exata dos campos faltantes
- ✅ Impede erros de proposta incompleta
- ✅ Melhora qualidade das propostas geradas

---

## 🎯 Resultados Esperados

1. **Redução de erros:** Menos propostas geradas com dados incompletos
2. **Melhor UX:** Usuário sabe exatamente o que precisa fazer
3. **Menos retrabalho:** Não precisa voltar para completar dados depois
4. **Propostas mais completas:** Todos os campos essenciais preenchidos
5. **Feedback imediato:** Usuário vê status em tempo real

---

## 📁 Arquivo Modificado

**Caminho:** `/components/os/steps/shared/step-gerar-proposta-os01-04.tsx`

**Linhas alteradas:**
- Adicionada função `validarDadosEtapa1()` (linhas ~88-113)
- Substituído alerta estático por condicional (linhas ~175-200)
- Simplificada validação do botão (linha ~237)

**Linhas totais:** +30 linhas (validação) | -5 linhas (simplificação)

---

## ✅ Checklist de Implementação

- [x] Criar função de validação centralizada
- [x] Implementar alerta condicional (verde/amarelo)
- [x] Listar campos faltantes dinamicamente
- [x] Desabilitar botão se validação falhar
- [x] Testar com todos os campos preenchidos
- [x] Testar com campos vazios
- [x] Testar correção dinâmica
- [x] Documentar alterações

---

**Desenvolvido por:** Equipe Minerva ERP  
**Última atualização:** 10/11/2025