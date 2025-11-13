# 🚀 Guia Rápido: Salvamento de Etapas

**Para desenvolvedores que vão adicionar novas etapas ao sistema**

---

## 📋 Checklist para Adicionar Nova Etapa com Auto-Save

### 1️⃣ Adicionar Estado no Workflow

**Arquivo:** `/components/os/os-details-workflow-page.tsx`

```typescript
// Adicionar estado para a nova etapa
const [etapaNData, setEtapaNData] = useState({
  campo1: '',
  campo2: '',
  campo3: '',
  // ... seus campos
});
```

---

### 2️⃣ Adicionar no `getCurrentStepData()`

```typescript
const getCurrentStepData = () => {
  switch (currentStep) {
    // ... casos existentes
    case N: return etapaNData;  // ← ADICIONAR AQUI
    default: return {};
  }
};
```

---

### 3️⃣ Adicionar no `loadEtapas()`

```typescript
const loadEtapas = async () => {
  // ...
  if (etapas) {
    etapas.forEach((etapa) => {
      if (etapa.dados_formulario) {
        switch (etapa.ordem) {
          // ... casos existentes
          case N:
            setEtapaNData(etapa.dados_formulario);  // ← ADICIONAR AQUI
            break;
        }
      }
    });
  }
};
```

---

### 4️⃣ Adicionar Validação (se tiver campos obrigatórios)

```typescript
const validateCurrentStep = (): boolean => {
  switch (currentStep) {
    // ... casos existentes
    case N:  // ← ADICIONAR AQUI
      return !!(
        etapaNData.campo1 &&
        etapaNData.campo2 &&
        etapaNData.campo3
      );
    default:
      return true;
  }
};
```

---

### 5️⃣ Definir Visibilidade do Botão "Salvar Rascunho"

```typescript
<WorkflowFooter
  // ...
  showDraftButton={[3, 6, 7, 8, N].includes(currentStep)}
  // ↑ Adicionar N se for formulário extenso
/>
```

---

## 💡 Exemplo Completo: Adicionar Etapa 16

### Passo 1: Estado
```typescript
const [etapa16Data, setEtapa16Data] = useState({
  nomeCliente: '',
  valorContrato: '',
  dataInicio: '',
  observacoes: '',
});
```

### Passo 2: getCurrentStepData()
```typescript
const getCurrentStepData = () => {
  switch (currentStep) {
    case 1: return etapa1Data;
    // ...
    case 16: return etapa16Data; // ← NOVO
    default: return {};
  }
};
```

### Passo 3: loadEtapas()
```typescript
etapas.forEach((etapa) => {
  if (etapa.dados_formulario) {
    switch (etapa.ordem) {
      // ...
      case 16:
        setEtapa16Data(etapa.dados_formulario); // ← NOVO
        break;
    }
  }
});
```

### Passo 4: Validação
```typescript
const validateCurrentStep = (): boolean => {
  switch (currentStep) {
    // ...
    case 16:
      return !!(
        etapa16Data.nomeCliente &&
        etapa16Data.valorContrato &&
        etapa16Data.dataInicio
      );
    default:
      return true;
  }
};
```

### Passo 5: Botão Rascunho
```typescript
showDraftButton={[3, 6, 7, 8, 16].includes(currentStep)}
```

---

## ✅ Pronto!

Agora a Etapa 16 tem:
- ✅ Salvamento automático ao avançar
- ✅ Botão "Salvar Rascunho"
- ✅ Validação de campos obrigatórios
- ✅ Recuperação de dados ao recarregar

---

## 🎨 Dicas de UX

### Quando Mostrar "Salvar Rascunho"?

| Tipo de Etapa | Exibir Botão? | Exemplo |
|---------------|---------------|---------|
| Formulário extenso (>5 campos) | ✅ Sim | Follow-up 1, Follow-up 2 |
| Tabela de dados | ✅ Sim | Precificação, Memorial |
| Seleção simples | ❌ Não | Tipo de OS |
| Confirmação | ❌ Não | "Visita realizada?" |
| Upload de arquivo | ❌ Não | Upload de contrato |
| Visualização | ❌ Não | Prévia de proposta |

---

## 🐛 Debugging

### Dados não aparecem ao recarregar?

**Checklist:**
- [ ] Verificar se `osId` está sendo passado como prop
- [ ] Verificar console para logs de `fetchEtapas`
- [ ] Verificar se etapa existe no array `etapas`
- [ ] Verificar se `ordem` está correta no switch

**Console úteis:**
```typescript
console.log('OS ID:', osId);
console.log('Etapas carregadas:', etapas);
console.log('Etapa 3 dados:', etapas?.find(e => e.ordem === 3)?.dados_formulario);
```

---

### Salvamento não funciona?

**Checklist:**
- [ ] Verificar se botão está chamando `handleNextStep()` ou `handleSaveRascunho()`
- [ ] Verificar console para erros de API
- [ ] Verificar se etapa existe no banco
- [ ] Verificar permissões do Supabase

**Console úteis:**
```typescript
console.log('Dados da etapa atual:', getCurrentStepData());
console.log('Etapa ID:', etapas?.find(e => e.ordem === currentStep)?.id);
```

---

### Validação não bloqueia avançar?

**Checklist:**
- [ ] Adicionar caso no `validateCurrentStep()`
- [ ] Verificar se todos os campos obrigatórios estão na condição
- [ ] Verificar nome dos campos no estado

---

## 📚 Referências

- **Documentação Completa:** `/INTEGRACAO_ETAPAS_SUPABASE.md`
- **Plano de Implementação:** `/PLANO_INTEGRACAO_FOLLOWUP_SUPABASE.md`
- **Hook de Etapas:** `/lib/hooks/use-etapas.ts`
- **Workflow Page:** `/components/os/os-details-workflow-page.tsx`

---

**Última Atualização:** 10/11/2025
