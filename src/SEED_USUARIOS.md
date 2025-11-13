# 🌱 Seed de Usuários - Minerva ERP

## 📋 Visão Geral

Sistema automático para criar usuários de teste com diferentes níveis de acesso (DIRETORIA, GESTOR_ADM, GESTOR_SETOR, COLABORADOR).

---

## 👥 Usuários Criados

### 1. **Diretoria**
- **Nome:** Carlos Diretor
- **Email:** `diretoria@minerva.com`
- **Senha:** `diretoria123`
- **Cargo:** DIRETORIA
- **Setor:** ADM
- **Permissões:** Acesso total ao sistema

### 2. **Gestor Administrativo**
- **Nome:** Maria Gestora ADM
- **Email:** `gestor.adm@minerva.com`
- **Senha:** `gestor123`
- **Cargo:** GESTOR_ADM
- **Setor:** ADM
- **Permissões:** Gestão administrativa

### 3. **Gestor de Obras**
- **Nome:** João Gestor de Obras
- **Email:** `gestor.obras@minerva.com`
- **Senha:** `gestor123`
- **Cargo:** GESTOR_SETOR
- **Setor:** OBRAS
- **Permissões:** Gestão do setor de Obras

### 4. **Gestor de Assessoria**
- **Nome:** Paula Gestora de Assessoria
- **Email:** `gestor.assessoria@minerva.com`
- **Senha:** `gestor123`
- **Cargo:** GESTOR_SETOR
- **Setor:** ASSESSORIA
- **Permissões:** Gestão do setor de Assessoria

### 5. **Colaborador**
- **Nome:** Ana Colaboradora
- **Email:** `colaborador@minerva.com`
- **Senha:** `colaborador123`
- **Cargo:** COLABORADOR
- **Setor:** OBRAS
- **Permissões:** Execução de tarefas

---

## 📊 Enums do Sistema

### **Cargos (role_nivel)**
- `DIRETORIA` - Acesso total ao sistema
- `GESTOR_ADM` - Gestão administrativa
- `GESTOR_SETOR` - Gestão de setor específico
- `COLABORADOR` - Execução de tarefas

### **Setores (setor)**
- `ADM` - Administrativo
- `ASSESSORIA` - Assessoria Técnica
- `OBRAS` - Obras e Construção

---

## 🚀 Como Executar o Seed

### **Método 1: Via Interface (Recomendado)**

1. Faça login no sistema
2. Na **Sidebar**, vá até a seção **Debug**
3. Clique em **"Seed Usuários"** (ícone 👤+)
4. Clique no botão **"Executar Seed"**
5. Aguarde a confirmação

### **Método 2: Via API Direct**

```bash
curl -X POST \
  https://<PROJECT_ID>.supabase.co/functions/v1/make-server-5ad7fd2c/seed-usuarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ANON_KEY>"
```

---

## ✅ Comportamento do Seed

### Características
- ✅ **Idempotente:** Pode ser executado múltiplas vezes sem duplicar usuários
- ✅ **Seguro:** Verifica existência antes de criar
- ✅ **Atômico:** Rollback automático em caso de erro
- ✅ **Completo:** Cria usuário auth + registro de colaborador

### Fluxo de Criação

Para cada usuário:

1. **Verificação do Auth User**
   - Busca usuário por email no `auth.users`
   - Se existir → Usa ID existente
   - Se não existir → Cria novo usuário auth

2. **Criação Auth** (se necessário)
   - Cria usuário no `auth.users` do Supabase
   - Confirma email automaticamente (`email_confirm: true`)
   - Define senha especificada

3. **Verificação do Colaborador**
   - Busca colaborador pelo ID do auth user
   - Se existir → Marca como "already_exists" e pula
   - Se não existir → Cria colaborador

4. **Criação Colaborador** (se necessário)
   - Cria registro na tabela `colaboradores`
   - Usa mesmo `id` do usuário auth (foreign key)
   - Define cargo, setor e status ativo

5. **Rollback em Erro**
   - Se criação de colaborador falhar
   - E o auth user foi criado agora
   - Deleta usuário auth automaticamente
   - Garante consistência do banco

---

## 📊 Resposta do Seed

### Status Possíveis

- **`created`** - Auth user e colaborador criados com sucesso
- **`created_colaborador_only`** - Auth user já existia, apenas colaborador foi criado
- **`already_exists`** - Tanto auth user quanto colaborador já existem

### Exemplo de Resposta de Sucesso

```json
{
  "success": true,
  "message": "Seed de usuários concluído",
  "resultados": [
    {
      "email": "diretoria@minerva.com",
      "nome": "Carlos Diretor",
      "role": "DIRETORIA",
      "setor": "ADM",
      "status": "created",
      "id": "uuid-do-usuario"
    },
    {
      "email": "gestor.adm@minerva.com",
      "nome": "Maria Gestora ADM",
      "role": "GESTOR_ADM",
      "setor": "ADM",
      "status": "created",
      "id": "uuid-do-usuario"
    }
  ],
  "summary": {
    "total": 5,
    "criados": 5,
    "existentes": 0,
    "erros": 0
  }
}
```

### Status Possíveis

- **`created`:** Usuário criado com sucesso
- **`already_exists`:** Usuário já existia no banco
- **`error`:** Erro durante criação (detalhes no campo `erros`)

---

## 🔧 Estrutura Técnica

### Backend: `/supabase/functions/server/index.tsx`

```typescript
// Endpoint: POST /make-server-5ad7fd2c/seed-usuarios
app.post("/make-server-5ad7fd2c/seed-usuarios", async (c) => {
  // 1. Loop pelos 4 usuários
  // 2. Para cada um:
  //    - Verificar se existe
  //    - Criar auth.users
  //    - Criar colaboradores
  //    - Rollback se falhar
  // 3. Retornar resumo
});
```

### Frontend: `/components/admin/seed-usuarios-page.tsx`

- Interface visual para executar seed
- Mostra preview dos usuários a serem criados
- Exibe resultado detalhado após execução
- Cards coloridos por tipo de cargo

---

## 🎨 Interface Visual

A página de Seed possui:

### Preview de Usuários
- 4 cards mostrando dados de cada usuário
- Badges coloridos por cargo:
  - 🟣 **Roxo:** Diretoria
  - 🔵 **Azul:** Gestor ADM
  - 🟢 **Verde:** Gestor de Setor
  - ⚫ **Cinza:** Colaborador

### Resumo de Execução
- **Total:** Quantidade total de usuários
- **Criados:** Novos usuários criados
- **Existentes:** Usuários que já existiam
- **Erros:** Quantidade de erros

### Lista Detalhada
- Nome, email e cargo de cada usuário
- Status da operação (Criado/Já Existia)
- ID gerado (se criado)

---

## 🔐 Segurança

### Permissões Necessárias
- Endpoint requer **SUPABASE_SERVICE_ROLE_KEY**
- Frontend usa **ANON_KEY** (endpoint protegido no server)
- Apenas usuários autenticados devem acessar a interface

### Boas Práticas
- ⚠️ **Senhas padrão:** Alterar em produção
- ⚠️ **Seed em produção:** Usar apenas em ambientes de desenvolvimento/staging
- ✅ **Email confirmado:** Usuários criados já confirmados automaticamente

---

## 🧪 Testes

### Cenários de Teste

1. **Primeira Execução (Banco Vazio)**
   ```
   ✅ Todos os 5 usuários devem ser criados
   Summary: { criados: 5, existentes: 0, erros: 0 }
   ```

2. **Segunda Execução (Usuários Existem)**
   ```
   ✅ Todos marcados como "already_exists"
   Summary: { criados: 0, existentes: 5, erros: 0 }
   ```

3. **Execução Parcial (2 já existem)**
   ```
   ✅ 3 criados, 2 marcados como existentes
   Summary: { criados: 3, existentes: 2, erros: 0 }
   ```

### Validações

```sql
-- Verificar usuários criados
SELECT id, email, raw_user_meta_data->>'nome_completo' as nome
FROM auth.users
WHERE email LIKE '%@minerva.com';

-- Verificar colaboradores
SELECT id, nome_completo, role_nivel, setor, ativo
FROM colaboradores
WHERE nome_completo IN (
  'Carlos Diretor',
  'Maria Gestora ADM', 
  'João Gestor de Obras',
  'Paula Gestora de Assessoria',
  'Ana Colaboradora'
);
```

---

## 🔄 Fluxo de Login

Após executar o seed, você pode fazer login com qualquer dos usuários:

```typescript
// Exemplo de login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'diretoria@minerva.com',
  password: 'diretoria123'
});
```

---

## 📝 Logs

O servidor gera logs detalhados durante o seed:

```
🌱 Iniciando seed de usuários...
📝 Criando usuário: diretoria@minerva.com...
✅ Usuário auth criado: uuid-xxxx
✅ Colaborador criado: Carlos Diretor
📝 Criando usuário: gestor.adm@minerva.com...
⚠️ Usuário gestor.adm@minerva.com já existe, pulando...
📝 Criando usuário: gestor.obras@minerva.com...
✅ Usuário auth criado: uuid-yyyy
✅ Colaborador criado: João Gestor de Obras
✅ Seed concluído! 5 usuários processados
```

---

## 🛠️ Troubleshooting

### Erro: "Email already exists"
**Causa:** Usuário já existe no auth.users  
**Solução:** Esperado! Seed vai marcar como "already_exists"

### Erro: "Foreign key violation"
**Causa:** Problema ao criar colaborador  
**Solução:** Seed faz rollback automático, verifique logs

### Erro: "Service role key not found"
**Causa:** Variável de ambiente não configurada  
**Solução:** Verificar `SUPABASE_SERVICE_ROLE_KEY` no .env

---

## 🎯 Próximos Passos

Após executar o seed:

1. ✅ Testar login com cada usuário
2. ✅ Verificar permissões por cargo
3. ✅ Implementar sistema de autenticação no frontend
4. ✅ Ajustar UI baseado em `role_nivel`
5. ✅ Implementar controle de acesso por rota

---

## 📦 Arquivos Relacionados

- `/supabase/functions/server/index.tsx` - Endpoint de seed
- `/components/admin/seed-usuarios-page.tsx` - Interface visual
- `/components/layout/sidebar.tsx` - Link na sidebar
- `/App.tsx` - Rota da página
- `/SEED_USUARIOS.md` - Esta documentação

---

**Status:** ✅ Implementado e Funcional  
**Versão:** 1.0  
**Data:** 10/11/2025  
**Autor:** Sistema Minerva ERP
