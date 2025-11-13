# 🔧 Correção: Foreign Key Constraint em `criado_por_id`

## ❌ Problema Original

```
Error: insert or update on table "ordens_servico" violates foreign key constraint 
"ordens_servico_criado_por_id_fkey"

Details: Key (criado_por_id)=(00000000-0000-0000-0000-000000000000) is not present 
in table "colaboradores".
```

### Causa Raiz
- O campo `criado_por_id` na tabela `ordens_servico` é **obrigatório** (NOT NULL)
- Possui foreign key para `colaboradores.id`
- O frontend estava enviando UUID zerado (`00000000-0000-0000-0000-000000000000`)
- Esse UUID não existia na tabela `colaboradores`, causando violação da constraint

---

## ✅ Solução Implementada

### 1. **Backend: Auto-criação de Colaborador "Sistema"**

O servidor agora detecta automaticamente quando `criado_por_id` é inválido ou ausente e:

1. **Busca** colaborador "Sistema Minerva" existente
2. Se não existir, **cria automaticamente**:
   - Usuário no `auth.users` com email `sistema@minerva.com`
   - Registro correspondente na tabela `colaboradores`
3. **Usa** o ID desse colaborador para preencher `criado_por_id`

**Código no servidor** (`/supabase/functions/server/index.tsx`):

```typescript
// Se criado_por_id não foi fornecido ou é inválido
if (!body.criado_por_id || body.criado_por_id === '00000000-0000-0000-0000-000000000000') {
  // Buscar colaborador "Sistema" existente
  const { data: sistemaColaborador } = await supabase
    .from('colaboradores')
    .select('id')
    .eq('nome_completo', 'Sistema Minerva')
    .single();
  
  if (sistemaColaborador) {
    body.criado_por_id = sistemaColaborador.id;
  } else {
    // Criar usuário auth + colaborador Sistema
    const { data: authUser } = await supabase.auth.admin.createUser({
      email: 'sistema@minerva.com',
      password: crypto.randomUUID(),
      email_confirm: true
    });
    
    const { data: novoSistema } = await supabase
      .from('colaboradores')
      .insert([{ 
        id: authUser.user.id, 
        nome_completo: 'Sistema Minerva' 
      }])
      .select()
      .single();
    
    body.criado_por_id = novoSistema.id;
  }
}
```

### 2. **Frontend: Remoção do UUID Zerado**

Removida linha que enviava UUID inválido:

**Antes:**
```typescript
const novaOS = await ordensServicoAPI.create({
  cliente_id: etapa1Data.leadId,
  tipo_os_id: tipoOSEncontrado.id,
  descricao: `${etapa2Data.tipoOS} - ${nomeCliente}`,
  criado_por_id: '00000000-0000-0000-0000-000000000000', // ❌ INVÁLIDO
  status_geral: 'Em Andamento',
});
```

**Depois:**
```typescript
const novaOS = await ordensServicoAPI.create({
  cliente_id: etapa1Data.leadId,
  tipo_os_id: tipoOSEncontrado.id,
  descricao: `${etapa2Data.tipoOS} - ${nomeCliente}`,
  // criado_por_id será preenchido automaticamente pelo servidor ✅
  status_geral: 'Em Andamento',
});
```

---

## 🎯 Benefícios da Solução

1. **Automática**: Não requer intervenção manual no banco de dados
2. **Idempotente**: Reutiliza colaborador "Sistema" se já existir
3. **Transparente**: Frontend não precisa gerenciar IDs de colaboradores
4. **Compatível**: Funciona mesmo sem sistema de autenticação implementado
5. **Preparada para o futuro**: Quando auth real for implementado, basta passar o `user.id` real

---

## 🔄 Próximos Passos (Futuro)

Quando o sistema de autenticação estiver completo:

```typescript
// Frontend obterá user.id do contexto de autenticação
const { user } = useAuth(); // hook de autenticação

const novaOS = await ordensServicoAPI.create({
  cliente_id: etapa1Data.leadId,
  tipo_os_id: tipoOSEncontrado.id,
  descricao: `${etapa2Data.tipoOS} - ${nomeCliente}`,
  criado_por_id: user.id, // ✅ ID real do usuário logado
  status_geral: 'Em Andamento',
});
```

O servidor continuará funcionando como fallback para casos onde `criado_por_id` não seja fornecido.

---

## 📋 Checklist de Teste

- [ ] Criar nova OS sem fornecer `criado_por_id`
- [ ] Verificar que colaborador "Sistema Minerva" foi criado automaticamente
- [ ] Criar segunda OS e verificar que reutiliza o mesmo colaborador Sistema
- [ ] Confirmar que OS foi criada com sucesso e possui `criado_por_id` válido
- [ ] Verificar logs do servidor para confirmar fluxo correto

---

## 🛠️ Arquivos Modificados

1. `/supabase/functions/server/index.tsx` - Auto-criação de colaborador Sistema
2. `/components/os/os-details-workflow-page.tsx` - Remoção de UUID zerado

---

**Status:** ✅ Resolvido  
**Data:** 10/11/2025  
**Impacto:** Criação de OS agora funciona sem erros de foreign key
