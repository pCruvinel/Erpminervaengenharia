# ✨ FEATURE: Loading State na Criação de OS (Etapa 2 → 3)

## 📋 Contexto

Implementado loading state visual durante a criação de Ordem de Serviço no Supabase, especificamente na transição da **Etapa 2** (Seleção do Tipo de OS) para a **Etapa 3** (Follow-up 1).

Este processo envolve:
1. Buscar UUID do tipo de OS no banco
2. Criar registro da OS na tabela `ordens_servico`
3. Criar 15 registros de etapas na tabela `etapas_os`
4. Recarregar dados do banco
5. Avançar para próxima etapa

## 🎯 Objetivo

Fornecer feedback visual claro ao usuário durante operações assíncronas no banco de dados, melhorando a UX e evitando cliques duplicados ou confusão sobre o estado do sistema.

## ✅ Implementação

### 1. **Estado de Loading**

Adicionado estado `isCreatingOS` no componente principal:

```typescript
// /components/os/os-details-workflow-page.tsx

const [isCreatingOS, setIsCreatingOS] = useState(false);
```

### 2. **Controle de Loading no Handler**

Atualizado `handleNextStep` para controlar o loading state:

```typescript
const handleNextStep = async () => {
  if (currentStep === 2 && !osId) {
    // Validações...
    
    try {
      // ✅ Ativar loading state
      setIsCreatingOS(true);
      
      console.log('🚀 Iniciando criação de OS no Supabase...');
      
      // Criar OS e 15 etapas no banco
      const novaOsId = await criarOSComEtapas();
      
      console.log('✅ OS criada com sucesso! ID:', novaOsId);
      
      // Salvar osId e recarregar etapas
      setInternalOsId(novaOsId);
      await fetchEtapas(novaOsId);
      
      // Avançar para etapa 3
      setCurrentStep(3);
      
      toast.success('Agora você pode preencher o Follow-up 1!');
      
    } catch (error) {
      console.error('❌ Erro ao criar OS:', error);
      toast.error('Erro ao criar Ordem de Serviço. Tente novamente.');
    } finally {
      // ✅ Desativar loading state (sempre)
      setIsCreatingOS(false);
    }
    
    return;
  }
  
  // ... resto do código
};
```

### 3. **WorkflowFooter com Loading State**

Atualizado componente `WorkflowFooter` para aceitar props de loading:

**Props Adicionadas:**
```typescript
interface WorkflowFooterProps {
  // ... props existentes
  isLoading?: boolean;        // ← NOVO
  loadingText?: string;       // ← NOVO
}
```

**Implementação:**
```typescript
export function WorkflowFooter({
  // ... outras props
  isLoading = false,
  loadingText = 'Processando...',
}: WorkflowFooterProps) {
  // ...
  
  return (
    <div className="flex-shrink-0 border-t border-neutral-200 px-6 py-4 bg-neutral-50">
      <div className="flex items-center justify-between">
        {/* Botão Voltar - desabilitado durante loading */}
        <Button
          variant="outline"
          onClick={onPrevStep}
          disabled={disablePrev || currentStep === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {prevButtonText}
        </Button>

        {/* Contador de etapas */}
        <span className="text-sm">
          <span className="font-semibold">{currentStep}</span> / {totalSteps}
        </span>

        <div className="flex gap-2">
          {/* Botão Rascunho - desabilitado durante loading */}
          {showDraftButton && (
            <Button variant="outline" onClick={onSaveDraft} disabled={isLoading}>
              Salvar Rascunho
            </Button>
          )}
          
          {/* Botão Continuar/Concluir - mostra loading state */}
          <PrimaryButton 
            onClick={onNextStep}
            disabled={disableNext || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {loadingText}
              </>
            ) : (
              <>
                {nextButtonText}
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
```

### 4. **Passagem de Props no Footer**

```typescript
<WorkflowFooter
  currentStep={currentStep}
  totalSteps={steps.length}
  onPrevStep={handlePrevStep}
  onNextStep={handleNextStep}
  onSaveDraft={handleSaveRascunho}
  showDraftButton={[3, 6, 7, 8].includes(currentStep)}
  disableNext={isLoading}
  isLoading={isCreatingOS}  // ← NOVO
  loadingText={currentStep === 2 ? 'Criando OS no Supabase...' : 'Processando...'}  // ← NOVO
/>
```

### 5. **Overlay de Loading na Etapa 2**

Adicionado overlay visual que cobre o conteúdo durante a criação:

```typescript
{currentStep === 2 && (
  <div className="space-y-6 relative">
    {/* Overlay de Loading */}
    {isCreatingOS && (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <div className="text-center">
            <p className="font-medium">Criando Ordem de Serviço</p>
            <p className="text-sm text-muted-foreground">
              Aguarde enquanto criamos as 15 etapas no banco de dados...
            </p>
          </div>
        </div>
      </div>
    )}
    
    {/* Conteúdo da Etapa 2 */}
    <Alert>...</Alert>
    
    <Select 
      value={etapa2Data.tipoOS} 
      onValueChange={(value) => setEtapa2Data({ tipoOS: value })}
      disabled={isCreatingOS}  // ← Select desabilitado durante loading
    >
      {/* ... opções ... */}
    </Select>
    
    {/* ... resto do conteúdo ... */}
  </div>
)}
```

## 🎨 Elementos Visuais

### Estados do Botão "Salvar e Continuar"

| Estado | Aparência | Comportamento |
|--------|-----------|---------------|
| **Normal** | "Salvar e Continuar" + seta → | Clicável, avança etapa |
| **Loading** | 🔄 "Criando OS no Supabase..." | Desabilitado, spinner animado |
| **Disabled** | Texto cinza claro | Não clicável |

### Overlay na Etapa 2

```
┌─────────────────────────────────────┐
│                                     │
│         🔄 (spinner animado)        │
│                                     │
│    Criando Ordem de Serviço        │
│                                     │
│  Aguarde enquanto criamos as 15     │
│  etapas no banco de dados...        │
│                                     │
└─────────────────────────────────────┘
```

**Características:**
- Background branco semi-transparente (80% opacidade)
- Backdrop blur para desfoque do conteúdo
- Z-index elevado (z-10) para ficar sobre tudo
- Centralizado vertical e horizontalmente
- Spinner dourado (#D3AF37) do Minerva Design System

## 📁 Arquivos Modificados

### 1. `/components/os/os-details-workflow-page.tsx`

**Mudanças:**
- ✅ Adicionado estado `isCreatingOS`
- ✅ Adicionado import `Loader2` do lucide-react
- ✅ Atualizado `handleNextStep` com try-catch-finally
- ✅ Adicionado overlay de loading na Etapa 2
- ✅ Select desabilitado durante loading
- ✅ Passadas props `isLoading` e `loadingText` para WorkflowFooter

**Linhas alteradas:**
- L15-27: Imports (adicionado Loader2)
- L64-74: Estados (adicionado isCreatingOS)
- L543-564: handleNextStep (loading state com finally)
- L672-714: Etapa 2 (overlay + disabled)
- L1714-1716: WorkflowFooter (props de loading)

### 2. `/components/os/workflow-footer.tsx`

**Mudanças:**
- ✅ Adicionado import `Loader2`
- ✅ Adicionadas props `isLoading` e `loadingText`
- ✅ Botões desabilitados durante loading
- ✅ Texto e ícone do botão principal alternam entre normal/loading

**Linhas alteradas:**
- L4: Import Loader2
- L17-18: Interface (novas props)
- L33-34: Defaults das novas props
- L44: Botão Voltar (disabled durante loading)
- L55: Botão Rascunho (disabled durante loading)
- L61-85: Botão Continuar (condicional loading state)

## 🧪 Como Testar

### Teste 1: Loading State Visual

1. Ir para "Criar Nova OS" → "Novo Lead - Obras (OS 01-04)"
2. **Etapa 1**: Selecionar um lead
3. Clicar em "Salvar e Continuar"
4. **Etapa 2**: Selecionar um tipo de OS (ex: "OS 01: Perícia de Fachada")
5. Clicar em "Salvar e Continuar"
6. **VERIFICAR**:
   - ✅ Overlay aparece sobre a Etapa 2
   - ✅ Spinner animado (cor dourada) é exibido
   - ✅ Texto "Criando Ordem de Serviço" aparece
   - ✅ Select fica desabilitado (cinza)
   - ✅ Botão "Salvar e Continuar" mostra spinner + "Criando OS no Supabase..."
   - ✅ Botão "Etapa Anterior" fica desabilitado
   - ✅ Botão "Salvar Rascunho" (se visível) fica desabilitado

### Teste 2: Transição Após Loading

7. Aguardar criação da OS
8. **VERIFICAR**:
   - ✅ Overlay desaparece
   - ✅ Toast de sucesso: "OS [código] criada com sucesso!"
   - ✅ Toast de info: "Agora você pode preencher o Follow-up 1!"
   - ✅ Navegação automática para Etapa 3
   - ✅ Stepper horizontal atualizado (Etapa 3 ativa)

### Teste 3: Erro Durante Criação

9. Simular erro (desconectar internet ou modificar API)
10. Tentar criar OS
11. **VERIFICAR**:
    - ✅ Loading state é ativado
    - ✅ Após timeout/erro, loading state é desativado (finally)
    - ✅ Toast de erro: "Erro ao criar Ordem de Serviço. Tente novamente."
    - ✅ Usuário permanece na Etapa 2
    - ✅ Botões voltam a funcionar normalmente

### Teste 4: Logs no Console

12. Abrir DevTools (F12) → Console
13. Criar uma OS
14. **VERIFICAR logs**:
    ```
    🚀 Iniciando criação de OS no Supabase...
    🚀 Iniciando criação da OS...
    🔍 Buscando tipo de OS...
    ✅ Tipo de OS encontrado: {...}
    📝 Criando OS no banco...
    ✅ OS criada: {...}
    📋 Criando 15 etapas...
    ✅ Etapa 1/15 criada: Identificação do Cliente/Lead
    ✅ Etapa 2/15 criada: Seleção do Tipo de OS
    ...
    ✅ Etapa 15/15 criada: Iniciar Contrato de Obra
    ✅ Todas as 15 etapas criadas com sucesso!
    ✅ OS criada com sucesso! ID: [uuid]
    📋 Carregando etapas...
    ✅ Etapas carregadas: [...]
    ```

## 📊 Melhorias de UX

| Antes | Depois |
|-------|--------|
| ❌ Sem feedback visual | ✅ Overlay + spinner |
| ❌ Botão clicável (risco de duplo clique) | ✅ Botão desabilitado com texto de loading |
| ❌ Usuário não sabe se está processando | ✅ Mensagem clara: "Criando OS..." |
| ❌ Select permanece editável | ✅ Select desabilitado durante processo |
| ⚠️ Navegação permitida | ✅ Navegação bloqueada durante criação |

## 🔒 Proteções Implementadas

1. **Desabilitar botões durante loading** → Evita cliques duplicados
2. **Desabilitar select durante loading** → Evita mudanças acidentais
3. **Bloco finally no try-catch** → Garante que loading state seja desativado mesmo em caso de erro
4. **Overlay visual** → Deixa claro que sistema está processando
5. **Mensagem descritiva** → Usuário sabe exatamente o que está acontecendo

## 🎯 Próximos Passos (Sugestões)

- [ ] Adicionar barra de progresso real (1/15, 2/15... 15/15 etapas)
- [ ] Implementar loading state similar em outras operações assíncronas
- [ ] Adicionar timeout de segurança (ex: abortar após 30s)
- [ ] Logging de performance (tempo de criação da OS)
- [ ] Animação de transição suave ao avançar para Etapa 3

## ✨ Resultado Final

Sistema agora oferece feedback visual completo durante criação de OS:
- ✅ Loading state no botão principal
- ✅ Overlay semi-transparente na etapa
- ✅ Spinner animado com cores do Design System
- ✅ Mensagem descritiva do processo
- ✅ Proteção contra interações indesejadas
- ✅ Logs detalhados no console
- ✅ Tratamento de erros com finally

**UX aprimorada** com feedback claro e proteções contra erros de usuário! 🎉
