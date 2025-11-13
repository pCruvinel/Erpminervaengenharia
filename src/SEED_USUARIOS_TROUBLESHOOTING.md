# 🔧 Seed de Usuários - Troubleshooting

## Problemas Comuns e Soluções

### ❌ Erro: "duplicate key value violates unique constraint 'colaboradores_pkey'"

**Causa:** Auth user existe mas colaborador não foi criado (estado inconsistente)

**Solução Automática:** A versão 1.2 do seed resolve isso automaticamente:
- Detecta auth users existentes
- Verifica se colaborador existe
- Cria apenas o que está faltando

**Como Resolver:**
1. Execute o seed novamente
2. O sistema vai detectar o estado inconsistente
3. Criará apenas o colaborador faltante
4. Status retornado: `created_colaborador_only`

---

### ❌ Erro: "User already registered"

**Causa:** Tentativa de criar auth user que já existe

**Solução Automática:** O seed verifica antes de criar:
```typescript
const existingUser = await buscarPorEmail(email);
if (existingUser) {
  // Usa ID existente
}
```

---

### ❌ Erro: "violates foreign key constraint"

**Causa:** Auth user foi deletado mas colaborador permaneceu

**Solução Manual:**
```sql
-- 1. Identificar colaboradores órfãos
SELECT c.id, c.nome_completo, c.role_nivel
FROM colaboradores c
LEFT JOIN auth.users u ON c.id = u.id
WHERE u.id IS NULL;

-- 2. Deletar colaboradores órfãos
DELETE FROM colaboradores
WHERE id NOT IN (SELECT id FROM auth.users);
```

**Depois execute o seed novamente**

---

### ⚠️ Usuário criado mas não aparece no sistema

**Causas Possíveis:**
1. Colaborador não foi criado (verificar logs)
2. Colaborador com `ativo = false`
3. Cache do frontend não atualizado

**Verificação:**
```sql
-- Verificar auth user
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'usuario@minerva.com';

-- Verificar colaborador
SELECT id, nome_completo, role_nivel, setor, ativo
FROM colaboradores
WHERE id = 'uuid-do-auth-user';
```

**Soluções:**
```sql
-- Ativar colaborador
UPDATE colaboradores 
SET ativo = true 
WHERE email = 'usuario@minerva.com';

-- Recriar colaborador (se não existe)
-- Execute o seed novamente
```

---

### 🔄 Como Limpar e Recomeçar

**ATENÇÃO: Isso vai deletar TODOS os usuários de teste!**

```sql
-- 1. Deletar colaboradores de teste
DELETE FROM colaboradores
WHERE nome_completo IN (
  'Carlos Diretor',
  'Maria Gestora ADM',
  'João Gestor de Obras',
  'Paula Gestora de Assessoria',
  'Ana Colaboradora'
);

-- 2. Deletar auth users (via Supabase Admin ou console)
-- Não pode ser feito via SQL diretamente
-- Use: Dashboard Supabase → Authentication → Users
```

**Depois execute o seed novamente**

---

## 📊 Como Verificar o Estado Atual

### Comando Completo de Diagnóstico

```sql
-- Verificar tudo de uma vez
SELECT 
  u.email,
  u.id as auth_id,
  c.id as colaborador_id,
  c.nome_completo,
  c.role_nivel,
  c.setor,
  c.ativo,
  CASE 
    WHEN u.id IS NULL THEN '❌ Auth User Faltando'
    WHEN c.id IS NULL THEN '❌ Colaborador Faltando'
    WHEN c.ativo = false THEN '⚠️ Colaborador Inativo'
    ELSE '✅ OK'
  END as status
FROM auth.users u
FULL OUTER JOIN colaboradores c ON u.id = c.id
WHERE u.email LIKE '%@minerva.com'
ORDER BY u.email;
```

### Interpretação dos Resultados

| Status | Significado | Ação |
|--------|-------------|------|
| ✅ OK | Tudo funcionando | Nenhuma |
| ⚠️ Colaborador Inativo | User existe mas inativo | Ativar colaborador |
| ❌ Auth User Faltando | Colaborador órfão | Deletar colaborador e recriar |
| ❌ Colaborador Faltando | Auth user sem colaborador | Executar seed novamente |

---

## 🔍 Logs Detalhados

O seed produz logs detalhados no console do servidor:

```
🌱 Iniciando seed de usuários...
📝 Processando usuário: diretoria@minerva.com...
✓ Usuário auth já existe: abc-123-def
✓ Colaborador já existe: Carlos Diretor
📝 Processando usuário: gestor.adm@minerva.com...
→ Criando usuário auth...
✅ Usuário auth criado: xyz-789-uvw
→ Criando colaborador...
✅ Colaborador criado: Maria Gestora ADM
✅ Seed concluído! 5 usuários processados
```

### Símbolos dos Logs

- 🌱 Início do processo
- 📝 Processando usuário
- ✓ Item já existe (pulado)
- → Criando novo item
- ✅ Sucesso
- ⚠️ Aviso (não é erro)
- ❌ Erro
- 🔄 Rollback

---

## 💡 Dicas de Prevenção

### 1. Sempre Use o Endpoint de Seed
❌ Não crie usuários manualmente via SQL
✅ Use o endpoint `/seed-usuarios`

### 2. Monitore os Logs
- Logs do servidor Supabase
- Logs do endpoint de seed
- Response JSON do seed

### 3. Valide Após Seed
```sql
-- Deve retornar 5 usuários, todos ✅ OK
SELECT 
  email,
  CASE 
    WHEN c.id IS NOT NULL AND c.ativo = true THEN '✅ OK'
    ELSE '❌ PROBLEMA'
  END as status
FROM auth.users u
LEFT JOIN colaboradores c ON u.id = c.id
WHERE u.email LIKE '%@minerva.com';
```

### 4. Backup Antes de Testar
Se for fazer testes destrutivos:
```sql
-- Backup da tabela colaboradores
CREATE TABLE colaboradores_backup AS 
SELECT * FROM colaboradores;
```

---

## 📞 Suporte

### Informações para Debug

Ao reportar problemas, inclua:

1. **Logs do servidor**
   ```
   🌱 Iniciando seed de usuários...
   ❌ Erro ao criar...
   ```

2. **Response do endpoint**
   ```json
   {
     "success": false,
     "erros": [...]
   }
   ```

3. **Query de diagnóstico**
   ```sql
   SELECT email, nome_completo, role_nivel, setor, ativo
   FROM auth.users u
   JOIN colaboradores c ON u.id = c.id
   WHERE email = 'problema@minerva.com';
   ```

4. **Passos para reproduzir**
   - O que você fez antes
   - Qual comando executou
   - Qual erro apareceu

---

**Versão:** 1.0  
**Última Atualização:** 10/11/2025  
