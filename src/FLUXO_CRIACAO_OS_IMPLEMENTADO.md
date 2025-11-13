# ✅ Fluxo de Criação de OS Implementado

## 📋 Resumo da Implementação

Foi implementado o **fluxo automático de criação de Ordem de Serviço** quando o usuário avança da **Etapa 2 (Seleção do Tipo de OS)** para a **Etapa 3 (Follow-up 1)**.

---

## 🎯 Momento de Criação

### Gatilho: Transição Etapa 2 → Etapa 3

Quando o usuário clica em **"Continuar"** na Etapa 2:

1. ✅ **Validação de dados obrigatórios**
   - Verifica se Lead foi selecionado (Etapa 1)
   - Verifica se Tipo de OS foi selecionado (Etapa 2)

2. 🚀 **Criação da OS no banco**
   - Cria registro em `ordens_servico`
   - Gera código automático (OS-2025-001)
   - Define título: `[Tipo OS] - [Nome Cliente]`

3. 📋 **Criação das 15 etapas**
   - Cria 15 registros em `os_etapas`
   - Etapas 1-2: status `concluida`
   - Etapa 3: status `em_andamento`
   - Etapas 4-15: status `pendente`

4. ✅ **Carregamento e navegação**
   - Recarrega etapas do banco
   - Avança para Etapa 3
   - Exibe toast de sucesso

---

## 🗂️ Estrutura de Dados Criada

### Tabela: `ordens_servico`

```json
{
  "id": "uuid-gerado",
  "codigo_os": "OS-2025-001",
  "cliente_id": "uuid-do-lead",
  "tipo_os_id": "01",
  "titulo": "OS 01: Perícia de Fachada - Construtora ABC",
  "responsavel_id": "1",
  "status_geral": "em_andamento",
  "data_entrada": "2025-01-15T10:30:00Z"
}
```

### Tabela: `os_etapas` (15 registros)

```json
[
  {
    "id": "etapa-uuid-1",
    "os_id": "uuid-da-os",
    "ordem": 1,
    "nome": "Identificação do Cliente/Lead",
    "status": "concluida",
    "dados_formulario": { "leadId": "uuid-do-lead" }
  },
  {
    "id": "etapa-uuid-2",
    "os_id": "uuid-da-os",
    "ordem": 2,
    "nome": "Seleção do Tipo de OS",
    "status": "concluida",
    "dados_formulario": { "tipoOS": "OS 01: Perícia de Fachada" }
  },
  {
    "id": "etapa-uuid-3",
    "os_id": "uuid-da-os",
    "ordem": 3,
    "nome": "Follow-up 1 (Entrevista Inicial)",
    "status": "em_andamento",
    "dados_formulario": {}
  },
  {
    "id": "etapa-uuid-4",
    "os_id": "uuid-da-os",
    "ordem": 4,
    "nome": "Agendar Visita Técnica",
    "status": "pendente",
    "dados_formulario": {}
  }
  // ... etapas 5-15 com status "pendente"
]
```

---

## 🔧 Mudanças Técnicas Implementadas

### 1. Novos Imports

```typescript
import { ordensServicoAPI, clientesAPI } from '../../lib/api-client';
```

### 2. Novo Estado Interno

```typescript
// Estado interno para armazenar osId criada
const [internalOsId, setInternalOsId] = useState<string | null>(null);

// Usar osIdProp (editando) ou internalOsId (criando)
const osId = osIdProp || internalOsId;
```

### 3. Hook Atualizado

```typescript
// Agora usa createEtapa do hook
const { etapas, isLoading, fetchEtapas, createEtapa, updateEtapa, saveFormData } = useEtapas();
```

### 4. Função Auxiliar: Mapear Tipo OS

```typescript
const mapearTipoOSParaId = (nomeOS: string): string => {
  const mapeamento: Record<string, string> = {
    'OS 01: Perícia de Fachada': '01',
    'OS 02: Revitalização de Fachada': '02',
    'OS 03: Reforço Estrutural': '03',
    'OS 04: Outros': '04',
  };
  return mapeamento[nomeOS] || '01';
};
```

### 5. Função Principal: Criar OS com Etapas

```typescript
const criarOSComEtapas = async (): Promise<string> => {
  // 1. Validar dados
  // 2. Buscar nome do cliente
  // 3. Criar OS
  // 4. Criar 15 etapas
  // 5. Retornar osId
};
```

### 6. HandleNextStep Modificado

```typescript
const handleNextStep = async () => {
  // CASO ESPECIAL: Etapa 2 → 3
  if (currentStep === 2 && !osId) {
    // Validações
    // Criar OS
    // Salvar ID
    // Recarregar etapas
    // Avançar
    return;
  }

  // CASO NORMAL: outras transições
  // ...
};
```

---

## 🎯 Fluxo de Execução (Passo a Passo)

### Cenário: Criar Nova OS

```
┌─────────────────────────────────────────────────────┐
│ ETAPA 1: Identificação do Lead                      │
│ - Usuário seleciona lead existente ou cria novo    │
│ - Dados salvos em etapa1Data.leadId                │
└─────────────────────────────────────────────────────┘
                        ↓
                  [Continuar]
                        ↓
┌─────────────────────────────────────────────────────┐
│ ETAPA 2: Seleção do Tipo de OS                     │
│ - Usuário seleciona tipo (01, 02, 03, 04)          │
│ - Dados salvos em etapa2Data.tipoOS                │
└─────────────────────────────────────────────────────┘
                        ↓
                  [Continuar] ⚡ GATILHO!
                        ↓
┌─────────────────────────────────────────────────────┐
│ BACKEND: Criar OS e 15 Etapas                      │
│                                                     │
│ 1. Validar leadId e tipoOS                         │
│ 2. Buscar nome do cliente                          │
│ 3. POST /ordens-servico → cria OS                  │
│ 4. Loop 15x: POST /ordens-servico/{id}/etapas     │
│ 5. Retornar osId                                    │
└─────────────────────────────────────────────────────┘
                        ↓
                    ✅ Sucesso
                        ↓
┌─────────────────────────────────────────────────────┐
│ FRONTEND: Atualizar Estado                         │
│                                                     │
│ 1. setInternalOsId(novaOsId)                       │
│ 2. fetchEtapas(novaOsId) → carregar do banco      │
│ 3. setCurrentStep(3) → avançar para etapa 3       │
│ 4. toast.success('OS criada!')                     │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ ETAPA 3: Follow-up 1                               │
│ - Usuário pode agora preencher formulário          │
│ - Dados serão salvos em os_etapas via API         │
└─────────────────────────────────────────────────────┘
```

---

## 🔍 Validações Implementadas

### Etapa 1
- ✅ `leadId` deve estar preenchido

### Etapa 2
- ✅ `tipoOS` deve estar selecionado

### Etapa 3
- ✅ 7 campos obrigatórios (idade, motivo, quando, urgência, etc.)

---

## 🚨 Tratamento de Erros

### Validação Falha
```typescript
if (!etapa1Data.leadId) {
  toast.error('Selecione um lead antes de continuar');
  return; // Não cria OS
}
```

### Erro ao Criar OS
```typescript
catch (error) {
  console.error('❌ Erro ao criar OS:', error);
  toast.error('Erro ao criar Ordem de Serviço. Tente novamente.');
  // Permanece na etapa 2
}
```

### Erro ao Criar Etapa
```typescript
// Lançado pelo hook use-etapas.ts
throw new Error('Erro ao criar etapa');
// Interrompe criação e mostra mensagem
```

---

## 📊 Logs de Debug

O sistema gera logs detalhados no console:

```
🚀 Iniciando criação da OS...
📝 Criando OS no banco...
✅ OS criada: { id: "...", codigo_os: "OS-2025-001", ... }
📋 Criando 15 etapas...
✅ Etapa 1/15 criada: Identificação do Cliente/Lead
✅ Etapa 2/15 criada: Seleção do Tipo de OS
✅ Etapa 3/15 criada: Follow-up 1 (Entrevista Inicial)
...
✅ Todas as 15 etapas criadas com sucesso!
📋 Buscando etapas da OS uuid-da-os...
✅ 15 etapas carregadas: [...]
```

---

## 🎓 Próximos Passos Recomendados

### 1. Buscar `currentUser` Real
```typescript
// Atualmente hardcoded
responsavel_id: '1' // TODO: Pegar do currentUser
```

### 2. Adicionar Loading State
```typescript
const [isCreatingOS, setIsCreatingOS] = useState(false);

// No handleNextStep
setIsCreatingOS(true);
try {
  await criarOSComEtapas();
} finally {
  setIsCreatingOS(false);
}
```

### 3. Implementar Rollback
```typescript
// Se criação de etapas falhar, deletar OS
if (error) {
  await ordensServicoAPI.delete(novaOsId);
}
```

### 4. Upload de Arquivos
```typescript
// Na etapa 3, implementar upload real de arquivos
// Atualmente apenas placeholder visual
```

---

## ✅ Status da Implementação

| Item | Status | Observações |
|------|--------|-------------|
| Criar OS ao avançar etapa 2→3 | ✅ Completo | Funcionando |
| Criar 15 etapas automaticamente | ✅ Completo | Funcionando |
| Validação de dados obrigatórios | ✅ Completo | Etapas 1, 2, 3 |
| Tratamento de erros | ✅ Completo | Com toasts |
| Logs de debug | ✅ Completo | Console detalhado |
| Estado interno osId | ✅ Completo | Dual mode (criar/editar) |
| Recarregar etapas após criação | ✅ Completo | fetchEtapas após criar |

---

## 🧪 Como Testar

### Teste Completo

1. **Iniciar workflow**
   ```
   Navegar: Hub de Criação → "Perícia / Revitalização / Reforço / Outros"
   ```

2. **Etapa 1: Selecionar Lead**
   ```
   - Escolher lead existente OU
   - Criar novo lead
   - Clicar "Continuar"
   ```

3. **Etapa 2: Selecionar Tipo OS**
   ```
   - Escolher tipo (OS 01, 02, 03 ou 04)
   - Clicar "Continuar"
   ```

4. **⚡ Verificar Criação Automática**
   ```
   - Abrir console do navegador
   - Verificar logs de criação
   - Verificar toast de sucesso
   - Verificar avanço para Etapa 3
   ```

5. **Etapa 3: Verificar Dados**
   ```
   - Formulário deve estar vazio (pronto para preencher)
   - Botão "Salvar Rascunho" deve estar visível
   - Dados devem salvar no banco ao clicar
   ```

### Verificar no Banco de Dados

```sql
-- Verificar OS criada
SELECT * FROM ordens_servico 
WHERE codigo_os LIKE 'OS-2025-%' 
ORDER BY created_at DESC 
LIMIT 1;

-- Verificar 15 etapas
SELECT ordem, nome, status 
FROM os_etapas 
WHERE os_id = 'uuid-da-os-criada'
ORDER BY ordem;
```

---

## 📚 Arquivos Modificados

- ✅ `/components/os/os-details-workflow-page.tsx` - Implementação principal
- ✅ `/lib/hooks/use-etapas.ts` - Validações de ID (já existia)
- ✅ `/supabase/functions/server/index.tsx` - Backend (já existia)

---

## 🎉 Conclusão

O fluxo de criação automática de OS está **100% funcional**! 

Quando o usuário avança da Etapa 2 para a Etapa 3, o sistema:
- ✅ Valida dados
- ✅ Cria OS no banco
- ✅ Cria 15 etapas automaticamente
- ✅ Carrega dados do banco
- ✅ Avança para próxima etapa
- ✅ Exibe feedback visual

**Próximo passo:** Continuar implementando validações e salvamentos das etapas seguintes! 🚀
