# ✅ Seed de Usuários - Correção de Enums

## 🔧 Correções Aplicadas

### **Problema Identificado**
O seed estava usando valores incorretos para o campo `setor`, que não correspondiam aos enums do banco de dados.

### **Enums Corretos do Banco**

#### **user_role_nivel** (Cargos)
- `DIRETORIA`
- `GESTOR_ADM`
- `GESTOR_SETOR`
- `COLABORADOR`

#### **user_setor** (Setores)
- `ADM` ✅ (estava como "ADMINISTRATIVO" ❌)
- `ASSESSORIA` ✅
- `OBRAS` ✅

---

## 📝 Alterações Realizadas

### 1. **Backend** (`/supabase/functions/server/index.tsx`)

**Antes:**
```typescript
{
  email: 'diretoria@minerva.com',
  setor: 'ADMINISTRATIVO' // ❌ ERRADO
}
```

**Depois:**
```typescript
{
  email: 'diretoria@minerva.com',
  setor: 'ADM' // ✅ CORRETO
}
```

### 2. **Usuários Atualizados**

| Email | Cargo | Setor (Antes) | Setor (Depois) |
|-------|-------|---------------|----------------|
| diretoria@minerva.com | DIRETORIA | ADMINISTRATIVO ❌ | ADM ✅ |
| gestor.adm@minerva.com | GESTOR_ADM | ADMINISTRATIVO ❌ | ADM ✅ |
| gestor.obras@minerva.com | GESTOR_SETOR | OBRAS ✅ | OBRAS ✅ |
| gestor.assessoria@minerva.com | GESTOR_SETOR | - | ASSESSORIA ✅ (NOVO) |
| colaborador@minerva.com | COLABORADOR | OBRAS ✅ | OBRAS ✅ |

### 3. **Novo Usuário Adicionado**

Para cobrir todos os setores do sistema, foi adicionado um gestor de Assessoria:

```typescript
{
  email: 'gestor.assessoria@minerva.com',
  password: 'gestor123',
  nome_completo: 'Paula Gestora de Assessoria',
  role_nivel: 'GESTOR_SETOR',
  setor: 'ASSESSORIA'
}
```

---

## 🎯 Resumo dos Usuários do Seed (5 usuários)

### 1️⃣ Diretoria
- **Email:** diretoria@minerva.com
- **Senha:** diretoria123
- **Cargo:** DIRETORIA
- **Setor:** ADM ✅

### 2️⃣ Gestor Administrativo
- **Email:** gestor.adm@minerva.com
- **Senha:** gestor123
- **Cargo:** GESTOR_ADM
- **Setor:** ADM ✅

### 3️⃣ Gestor de Obras
- **Email:** gestor.obras@minerva.com
- **Senha:** gestor123
- **Cargo:** GESTOR_SETOR
- **Setor:** OBRAS ✅

### 4️⃣ Gestor de Assessoria (NOVO)
- **Email:** gestor.assessoria@minerva.com
- **Senha:** gestor123
- **Cargo:** GESTOR_SETOR
- **Setor:** ASSESSORIA ✅

### 5️⃣ Colaborador
- **Email:** colaborador@minerva.com
- **Senha:** colaborador123
- **Cargo:** COLABORADOR
- **Setor:** OBRAS ✅

---

## 📊 Cobertura Completa

### ✅ Todos os Cargos Cobertos
- [x] DIRETORIA (1 usuário)
- [x] GESTOR_ADM (1 usuário)
- [x] GESTOR_SETOR (2 usuários - Obras + Assessoria)
- [x] COLABORADOR (1 usuário)

### ✅ Todos os Setores Cobertos
- [x] ADM (2 usuários - Diretoria + Gestor ADM)
- [x] OBRAS (2 usuários - Gestor Obras + Colaborador)
- [x] ASSESSORIA (1 usuário - Gestor Assessoria)

---

## 🔄 Arquivos Alterados

1. ✅ `/supabase/functions/server/index.tsx` - Endpoint de seed corrigido
2. ✅ `/components/admin/seed-usuarios-page.tsx` - Interface atualizada
3. ✅ `/SEED_USUARIOS.md` - Documentação atualizada
4. ✅ `/SEED_USUARIOS_CORRIGIDO.md` - Este documento

---

## 🚀 Testando as Correções

### Executar o Seed
1. Acesse o sistema
2. Vá em **Sidebar → Debug → Seed Usuários**
3. Clique em **"Executar Seed"**

### Validar no Banco
```sql
-- Verificar setores criados
SELECT 
  email,
  nome_completo,
  role_nivel,
  setor,
  ativo
FROM colaboradores
JOIN auth.users ON colaboradores.id = auth.users.id
WHERE email LIKE '%@minerva.com'
ORDER BY role_nivel, setor;
```

**Resultado Esperado:**
```
diretoria@minerva.com       | Carlos Diretor               | DIRETORIA     | ADM        | true
gestor.adm@minerva.com      | Maria Gestora ADM            | GESTOR_ADM    | ADM        | true
gestor.assessoria@minerva.com | Paula Gestora de Assessoria | GESTOR_SETOR | ASSESSORIA | true
gestor.obras@minerva.com    | João Gestor de Obras         | GESTOR_SETOR  | OBRAS      | true
colaborador@minerva.com     | Ana Colaboradora             | COLABORADOR   | OBRAS      | true
```

---

## ✅ Status

- **Enums Corrigidos:** ✅
- **5 Usuários Configurados:** ✅
- **Todos os Setores Cobertos:** ✅
- **Todos os Cargos Cobertos:** ✅
- **Interface Atualizada:** ✅
- **Documentação Atualizada:** ✅

---

## 🔧 Correção Adicional: Lógica de Idempotência

### **Problema Identificado**
O seed falhava com erro de "duplicate key constraint" quando:
- Auth user existia mas colaborador não
- Tentava-se criar novamente

### **Solução Implementada**
Lógica de verificação em duas etapas:

```typescript
// 1. Verificar/criar auth user
const existingAuthUser = await buscarAuthUser(email);
const authUserId = existingAuthUser?.id ?? await criarAuthUser(email);

// 2. Verificar/criar colaborador
const existingColaborador = await buscarColaborador(authUserId);
if (!existingColaborador) {
  await criarColaborador(authUserId);
}
```

### **Benefícios**
- ✅ 100% idempotente - pode executar quantas vezes quiser
- ✅ Recupera de estados inconsistentes automaticamente
- ✅ Rollback inteligente (só reverte o que criou)
- ✅ Mensagens claras sobre o que foi criado/encontrado

---

**Data da Correção:** 10/11/2025  
**Versão:** 1.2  
**Status:** Pronto para Uso ✅
