# 🔗 Instruções de Integração: Workflow com Criação de OS

**Como conectar o workflow com o sistema de criação de OS**

---

## 🎯 Objetivo

Fazer com que, ao criar uma nova OS, o sistema:
1. Crie o registro da OS no banco
2. Crie automaticamente as 15 etapas vazias
3. Redirecione para o workflow passando o `osId`
4. O workflow carregue as etapas e permita preenchimento

---

## 📋 Passo a Passo

### **PASSO 1: Atualizar Backend para Criar Etapas**

**Arquivo:** `/supabase/functions/server/index.tsx`

**Modificar rota:** `POST /make-server-5ad7fd2c/ordens-servico`

#### **ANTES:**
```typescript
app.post("/make-server-5ad7fd2c/ordens-servico", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const body = await c.req.json();
    
    // Gerar código da OS
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('ordens_servico')
      .select('*', { count: 'exact', head: true })
      .like('codigo_os', `OS-${year}-%`);
    
    const nextNumber = (count || 0) + 1;
    const codigo_os = `OS-${year}-${String(nextNumber).padStart(3, '0')}`;
    
    // Criar OS
    const { data, error } = await supabase
      .from('ordens_servico')
      .insert([{ ...body, codigo_os }])
      .select(`
        *,
        cliente:clientes(*),
        tipo_os:tipos_os(*),
        responsavel:colaboradores!ordens_servico_responsavel_id_fkey(*)
      `)
      .single();
    
    if (error) {
      console.error('Erro ao criar OS:', error);
      return c.json({ error: error.message }, 500);
    }
    
    return c.json(data, 201);
  } catch (error) {
    console.error('Erro no endpoint POST /ordens-servico:', error);
    return c.json({ error: String(error) }, 500);
  }
});
```

---

#### **DEPOIS:**
```typescript
app.post("/make-server-5ad7fd2c/ordens-servico", async (c) => {
  try {
    const supabase = getSupabaseClient();
    const body = await c.req.json();
    
    // Gerar código da OS
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('ordens_servico')
      .select('*', { count: 'exact', head: true })
      .like('codigo_os', `OS-${year}-%`);
    
    const nextNumber = (count || 0) + 1;
    const codigo_os = `OS-${year}-${String(nextNumber).padStart(3, '0')}`;
    
    // Criar OS
    const { data: os, error: osError } = await supabase
      .from('ordens_servico')
      .insert([{ ...body, codigo_os }])
      .select(`
        *,
        cliente:clientes(*),
        tipo_os:tipos_os(*),
        responsavel:colaboradores!ordens_servico_responsavel_id_fkey(*)
      `)
      .single();
    
    if (osError) {
      console.error('Erro ao criar OS:', osError);
      return c.json({ error: osError.message }, 500);
    }
    
    // ⭐ NOVO: Criar 15 etapas automaticamente
    console.log(`📋 Criando etapas para OS ${os.id}...`);
    
    const etapasDefinicao = [
      { ordem: 1, nome: 'Identificação do Cliente/Lead' },
      { ordem: 2, nome: 'Seleção do Tipo de OS' },
      { ordem: 3, nome: 'Follow-up 1 (Entrevista Inicial)' },
      { ordem: 4, nome: 'Agendar Visita Técnica' },
      { ordem: 5, nome: 'Realizar Visita' },
      { ordem: 6, nome: 'Follow-up 2 (Pós-Visita)' },
      { ordem: 7, nome: 'Formulário Memorial (Escopo)' },
      { ordem: 8, nome: 'Precificação' },
      { ordem: 9, nome: 'Gerar Proposta Comercial' },
      { ordem: 10, nome: 'Agendar Visita (Apresentação)' },
      { ordem: 11, nome: 'Realizar Visita (Apresentação)' },
      { ordem: 12, nome: 'Follow-up 3 (Pós-Apresentação)' },
      { ordem: 13, nome: 'Gerar Contrato (Upload)' },
      { ordem: 14, nome: 'Contrato Assinado' },
      { ordem: 15, nome: 'Iniciar Contrato de Obra' },
    ];
    
    const etapasParaCriar = etapasDefinicao.map(etapa => ({
      os_id: os.id,
      ordem: etapa.ordem,
      nome: etapa.nome,
      status: 'pendente',
      dados_formulario: {},
    }));
    
    const { data: etapasCriadas, error: etapasError } = await supabase
      .from('os_etapas')
      .insert(etapasParaCriar)
      .select();
    
    if (etapasError) {
      console.error('Erro ao criar etapas:', etapasError);
      // Não retorna erro, mas loga
      // A OS foi criada, mas sem etapas
    } else {
      console.log(`✅ ${etapasCriadas.length} etapas criadas com sucesso`);
    }
    
    return c.json(os, 201);
  } catch (error) {
    console.error('Erro no endpoint POST /ordens-servico:', error);
    return c.json({ error: String(error) }, 500);
  }
});
```

**O que mudou:**
- ✅ Após criar OS, cria 15 etapas automaticamente
- ✅ Cada etapa começa com `status: 'pendente'` e `dados_formulario: {}`
- ✅ Se houver erro ao criar etapas, apenas loga (não falha a criação da OS)

---

### **PASSO 2: Atualizar Componente de Criação de OS**

**Arquivo:** `/components/os/create-os-page.tsx` (ou similar)

#### **Exemplo de Integração:**

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordensServicoAPI } from '../../lib/api-client';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';

export function CreateOSPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateOS = async (formData: any) => {
    try {
      setIsCreating(true);
      console.log('🚀 Criando OS...', formData);
      
      // Criar OS (backend cria etapas automaticamente)
      const novaOS = await ordensServicoAPI.create(formData);
      
      console.log('✅ OS criada:', novaOS);
      toast.success(`OS ${novaOS.codigo_os} criada com sucesso!`);
      
      // ⭐ Redirecionar para workflow passando osId
      router.push(`/os/${novaOS.id}/workflow`);
      
    } catch (error) {
      console.error('❌ Erro ao criar OS:', error);
      toast.error('Erro ao criar OS. Tente novamente.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      {/* Formulário de criação de OS */}
      <Button 
        onClick={() => handleCreateOS({ /* dados */ })}
        disabled={isCreating}
      >
        {isCreating ? 'Criando...' : 'Criar OS e Iniciar Workflow'}
      </Button>
    </div>
  );
}
```

---

### **PASSO 3: Criar Rota do Workflow**

**Arquivo:** `/App.tsx` (ou `/app/os/[id]/workflow/page.tsx` se usar App Router)

#### **Exemplo com App Router:**

```typescript
// app/os/[id]/workflow/page.tsx

'use client';

import { OSDetailsWorkflowPage } from '@/components/os/os-details-workflow-page';
import { use } from 'react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkflowPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <OSDetailsWorkflowPage 
      osId={id}  // ⭐ Passar osId como prop
      onBack={() => window.location.href = '/os'}
    />
  );
}
```

#### **Exemplo com React Router (App.tsx):**

```tsx
import { Routes, Route } from 'react-router-dom';
import { OSDetailsWorkflowPage } from './components/os/os-details-workflow-page';

function App() {
  return (
    <Routes>
      {/* ... outras rotas ... */}
      
      <Route 
        path="/os/:id/workflow" 
        element={
          <OSWorkflowWrapper />
        } 
      />
    </Routes>
  );
}

function OSWorkflowWrapper() {
  const { id } = useParams();
  
  return (
    <OSDetailsWorkflowPage 
      osId={id}  // ⭐ Passar osId da URL
      onBack={() => navigate('/os')}
    />
  );
}
```

---

### **PASSO 4: Testar End-to-End**

#### **Teste Completo:**

1. **Criar Nova OS**
   ```
   POST /ordens-servico
   {
     "cliente_id": "uuid-do-cliente",
     "tipo_os_id": "uuid-do-tipo-os",
     "status": "em_andamento"
   }
   ```

2. **Verificar Resposta**
   ```json
   {
     "id": "uuid-da-os-criada",
     "codigo_os": "OS-2025-001",
     ...
   }
   ```

3. **Verificar Etapas Criadas**
   ```
   GET /ordens-servico/uuid-da-os-criada/etapas
   ```
   
   Deve retornar 15 etapas:
   ```json
   [
     {
       "id": "uuid-etapa-1",
       "ordem": 1,
       "nome": "Identificação do Cliente/Lead",
       "status": "pendente",
       "dados_formulario": {}
     },
     {
       "id": "uuid-etapa-2",
       "ordem": 2,
       "nome": "Seleção do Tipo de OS",
       "status": "pendente",
       "dados_formulario": {}
     },
     ...
   ]
   ```

4. **Acessar Workflow**
   ```
   http://localhost:3000/os/uuid-da-os-criada/workflow
   ```

5. **Verificar Carregamento**
   - ✅ Console deve mostrar: `📋 Buscando etapas da OS...`
   - ✅ Console deve mostrar: `✅ 15 etapas carregadas`

6. **Preencher Follow-up 1**
   - Preencher campos
   - Clicar "Salvar Rascunho"
   - ✅ Toast verde: "Rascunho salvo com sucesso!"

7. **Verificar Salvamento**
   ```
   GET /ordens-servico/uuid-da-os-criada/etapas
   ```
   
   Etapa 3 deve ter dados:
   ```json
   {
     "ordem": 3,
     "status": "em_andamento",
     "dados_formulario": {
       "idadeEdificacao": "5 a 10 anos",
       "motivoProcura": "...",
       ...
     }
   }
   ```

8. **Recarregar Página**
   - Atualizar navegador (F5)
   - ✅ Dados devem estar preenchidos no formulário

9. **Avançar Etapa**
   - Preencher campos restantes
   - Clicar "Salvar e Continuar"
   - ✅ Deve avançar para Etapa 4
   - ✅ Etapa 3 deve ter `status: 'concluida'`

---

## 🎯 Checklist de Integração

- [ ] Backend cria etapas ao criar OS
- [ ] Frontend redireciona para `/os/:id/workflow` após criar OS
- [ ] Rota de workflow recebe `osId` como parâmetro
- [ ] Workflow recebe `osId` como prop
- [ ] `useEffect` carrega etapas ao montar
- [ ] Estados locais são preenchidos com dados do banco
- [ ] Salvamento funciona (rascunho + avançar)
- [ ] Validação bloqueia avançar sem campos obrigatórios
- [ ] Toasts aparecem corretamente
- [ ] Dados persistem ao recarregar página

---

## 🐛 Troubleshooting

### **Problema 1: Etapas não aparecem**

**Sintoma:** Console mostra `Etapas carregadas: []`

**Possíveis causas:**
- Backend não criou etapas ao criar OS
- `osId` não foi passado corretamente
- Erro na rota GET `/ordens-servico/:osId/etapas`

**Solução:**
```typescript
// Verificar no console do navegador:
console.log('OS ID:', osId);

// Verificar resposta da API:
console.log('Etapas:', etapas);

// Verificar no banco:
SELECT * FROM os_etapas WHERE os_id = 'uuid-da-os';
```

---

### **Problema 2: Salvamento não funciona**

**Sintoma:** Clica "Salvar" mas dados não aparecem no banco

**Possíveis causas:**
- Etapa não existe no banco
- Erro de permissão no Supabase
- `etapaId` incorreto

**Solução:**
```typescript
// Verificar ID da etapa:
const etapaAtual = etapas?.find(e => e.ordem === currentStep);
console.log('Etapa Atual ID:', etapaAtual?.id);

// Verificar request:
// Console deve mostrar: 💾 Salvando etapa 3...

// Verificar response:
// Console deve mostrar: ✅ Etapa atualizada: {...}
```

---

### **Problema 3: Dados não recuperam ao recarregar**

**Sintoma:** Preenche formulário, recarrega, dados sumiram

**Possíveis causas:**
- `osId` não está sendo passado como prop
- `useEffect` não está executando
- `loadEtapas()` não está preenchendo estados

**Solução:**
```typescript
// Adicionar logs no useEffect:
useEffect(() => {
  console.log('🔄 useEffect executou, osId:', osId);
  if (osId) {
    loadEtapas();
  }
}, [osId]);

// Adicionar logs no loadEtapas:
const loadEtapas = async () => {
  console.log('📋 Carregando etapas...');
  await fetchEtapas(osId);
  console.log('✅ Etapas:', etapas);
  
  // Verificar se preenche estado:
  console.log('Estado Etapa 3:', etapa3Data);
};
```

---

## ✅ Resultado Final

Após seguir todos os passos:

```
1. Usuário cria OS
   ↓
2. Backend cria OS + 15 etapas vazias
   ↓
3. Frontend redireciona para /os/uuid/workflow
   ↓
4. Workflow carrega etapas do banco
   ↓
5. Usuário preenche formulários
   ↓
6. Sistema salva no banco (rascunho ou completo)
   ↓
7. Usuário pode recarregar e continuar de onde parou
   ↓
✅ SISTEMA FUNCIONANDO COMPLETAMENTE!
```

---

## 📚 Referências

- **Status da Implementação:** `/STATUS_IMPLEMENTACAO_FOLLOWUP.md`
- **Documentação Técnica:** `/INTEGRACAO_ETAPAS_SUPABASE.md`
- **Guia Rápido:** `/GUIA_RAPIDO_SALVAMENTO_ETAPAS.md`
- **Plano Original:** `/PLANO_INTEGRACAO_FOLLOWUP_SUPABASE.md`

---

**Última Atualização:** 10/11/2025  
**Versão:** 1.0.0
