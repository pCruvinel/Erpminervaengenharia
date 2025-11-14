# ARQUITETURA DE USUÁRIOS, HIERARQUIAS E PERMISSÕES
## Sistema ERP Minerva Engenharia

**Documento de Especificação Funcional e Técnica**
**Data**: 14/11/2025
**Versão**: 2.0 - Modelo Hierárquico Completo

---

## EXECUTIVE SUMMARY

Este documento define a arquitetura completa de usuários, papéis, permissões e hierarquias para o sistema ERP Minerva Engenharia, alinhado com os requisitos organizacionais da empresa: **4 níveis hierárquicos bem definidos** com responsabilidades específicas, estrutura de delegação e aprovação em cascata.

**Problemas Identificados na Estrutura Atual:**
1. ❌ Não há distinção entre "Gestor de Setor" e "Gestor Comercial" (COM é ignorado)
2. ❌ Não existe papel de "Mão de Obra" (MOBRA) no sistema
3. ❌ Permissões não implementadas no lado do servidor (apenas frontend)
4. ❌ Falta controle de delegação e aprovação de tarefas
5. ❌ Não há rastreamento de hierarquia de supervisor
6. ❌ Integração Supabase RLS não configurada
7. ❌ Mock data não reflete todos os cenários

---

## PARTE 1: ANÁLISE DA ESTRUTURA ATUAL

### 1.1 Arquitetura Atual

#### Papéis Implementados:
```
DIRETORIA
├─ Acesso total
├─ Sem restrições

GESTOR_ADM
├─ Visão cruzada
├─ Sem restrições em filtros
└─ Setor: ADM

GESTOR_SETOR (Obras / Assessoria)
├─ Visão do setor específico
├─ Sem acesso a outros setores
└─ Pode delegar para seu setor

COLABORADOR
├─ Visão apenas suas OS
├─ Sem acesso a outros colaboradores
└─ Executa tarefas delegadas
```

#### Setores Definidos:
- OBRAS
- ASSESSORIA
- LABORATORIO
- ADM

#### Usuários Seed (atualmente 5):
- `diretoria@minerva.com` (DIRETORIA)
- `gestor.adm@minerva.com` (GESTOR_ADM)
- `gestor.obras@minerva.com` (GESTOR_SETOR)
- `gestor.assessoria@minerva.com` (GESTOR_SETOR)
- `colaborador@minerva.com` (COLABORADOR)

### 1.2 Problemas Identificados

| Problema | Impacto | Severidade |
|----------|---------|-----------|
| Setor COMERCIAL (COM) não mapeado | Requisitos não atendidos | 🔴 Alta |
| Falta GESTOR_COMERCIAL | Funcionalidades de COM não implementadas | 🔴 Alta |
| Falta papel MOBRA | Cálculo de custo de mão de obra prejudicado | 🔴 Alta |
| RLS apenas frontend | Segurança vulnerável em produção | 🔴 Alta |
| Sem rastreamento de supervisor | Aprovalização impossível | 🔴 Alta |
| Sem controle de delegação | Auditoria fraca | 🟡 Média |
| Sem perfi "Manutenção" ou "Engenharia" | Estrutura incompleta | 🟡 Média |
| Mock data limitada | Testes inadequados | 🟡 Média |

### 1.3 Arquivos Afetados na Implementação Atual

```
src/lib/types.ts                                    - Tipos User e Role
src/lib/mock-data.ts                               - Usuários mock
src/components/auth/login-page.tsx                 - Autenticação
src/components/os/os-list-page.tsx                 - RLS Frontend
src/components/os/os-filters-card.tsx              - Controle de filtros
src/components/admin/seed-usuarios-page.tsx        - Seed de usuários
src/supabase/functions/server/index.tsx            - Endpoint de seed
Database (colaboradores table)                     - Armazenamento de usuários
```

---

## PARTE 2: ESTRUTURA PROPOSTA - NOVO MODELO HIERÁRQUICO

### 2.1 Hierarquia de 4 Níveis

```
╔════════════════════════════════════════════════════════════════════════╗
║                    NÍVEL 4: DIRETORIA (ACESSO TOTAL)                  ║
║ ┌────────────────────────────────────────────────────────────────────┐ ║
║ │ • Acesso a TODOS os módulos, dados e funcionalidades              │ ║
║ │ • Pode reabrir/editar OS marcadas como "Concluída"               │ ║
║ │ • Exigir justificativa obrigatória para reabertura               │ ║
║ │ • Delegar OS para qualquer setor                                 │ ║
║ │ • Visualizar relatórios consolidados de todos os setores         │ ║
║ │ • Gerenciar usuários e papéis                                    │ ║
║ └────────────────────────────────────────────────────────────────────┘ ║
└════════════════════════════════════════════════════════════════════════┘
                                   ↓
╔════════════════════════════════════════════════════════════════════════╗
║              NÍVEL 3: GESTORES DE SETOR (SUPERVISÃO)                   ║
║ ┌────────────────────────────────────────────────────────────────────┐ ║
║ │ GESTOR COMERCIAL (COM)                                            │ ║
║ │ ├─ Setor: Comercial (COM)                                        │ ║
║ │ ├─ Acesso: Administrativo + Financeiro                           │ ║
║ │ ├─ Responsabilidades:                                            │ ║
║ │ │  • Cadastro de OS (13 demandas)                                │ ║
║ │ │  • Cadastro de leads/clientes                                  │ ║
║ │ │  • Conciliação bancária                                        │ ║
║ │ │  • Registro de recorrências (receita/fatura)                   │ ║
║ │ │  • Registro de presença equipe COM                             │ ║
║ │ │  • Criar/editar disponibilidade calendário                     │ ║
║ │ │  • Agendar vistorias/visitas                                   │ ║
║ │ │  • Delegar para QUALQUER setor                                 │ ║
║ │ └─ Pode aprovar tarefas de seus colaboradores COM                │ ║
║ │                                                                    │ ║
║ │ GESTOR ASSESSORIA (ASS)                                           │ ║
║ │ ├─ Setor: Assessoria Técnica (ASS)                               │ ║
║ │ ├─ Acesso: Apenas dados/OS do setor                              │ ║
║ │ ├─ Responsabilidades:                                            │ ║
║ │ │  • Presença e performance equipe ASS                           │ ║
║ │ │  • Aprovação de laudos técnicos                                │ ║
║ │ │  • Editar disponibilidade setor calendário                     │ ║
║ │ │  • Delegar tarefas apenas para equipe ASS                      │ ║
║ │ └─ Pode aprovar tarefas de seus colaboradores ASS                │ ║
║ │                                                                    │ ║
║ │ GESTOR OBRAS (OBR)                                                │ ║
║ │ ├─ Setor: Obras (OBR)                                            │ ║
║ │ ├─ Acesso: Apenas dados/OS do setor                              │ ║
║ │ ├─ Responsabilidades:                                            │ ║
║ │ │  • Presença e performance equipe OBR                           │ ║
║ │ │  • Aprovação de medições                                       │ ║
║ │ │  • Editar disponibilidade setor calendário                     │ ║
║ │ │  • Delegar tarefas apenas para equipe OBR                      │ ║
║ │ └─ Pode aprovar tarefas de seus colaboradores OBR                │ ║
║ │                                                                    │ ║
║ │ GESTOR ADM (ADM) [Intermediário]                                  │ ║
║ │ ├─ Setor: Administrativo (ADM)                                    │ ║
║ │ ├─ Acesso: Cruzado - coordenação entre setores                   │ ║
║ │ ├─ Responsabilidades:                                            │ ║
║ │ │  • Visão consolidada de todos os setores                       │ ║
║ │ │  • Coordenação entre setores                                   │ ║
║ │ │  • Relatórios de performance                                   │ ║
║ │ │  • Delegar para qualquer setor (exceto Diretoria)              │ ║
║ │ └─ Pode aprovar tarefas de colaboradores ADM                     │ ║
║ └────────────────────────────────────────────────────────────────────┘ ║
└════════════════════════════════════════════════════════════════════════┘
                                   ↓
╔════════════════════════════════════════════════════════════════════════╗
║            NÍVEL 2: COLABORADORES (EXECUÇÃO - COM ACESSO)              ║
║ ┌────────────────────────────────────────────────────────────────────┐ ║
║ │ COLABORADOR COMERCIAL (COM)     │ COLABORADOR ASSESSORIA (ASS)    │ ║
║ │ ├─ Setor: Comercial (COM)       │ ├─ Setor: Assessoria (ASS)     │ ║
║ │ ├─ Acesso: Apenas suas OS       │ ├─ Acesso: Apenas suas OS      │ ║
║ │ ├─ Vinculado a: Gestor COM      │ ├─ Vinculado a: Gestor ASS     │ ║
║ │ ├─ Responsabilidades:           │ ├─ Responsabilidades:          │ ║
║ │ │  • Executar OS delegadas      │ │  • Executar OS delegadas     │ ║
║ │ │  • Preencher follow-up        │ │  • Preencher follow-up       │ ║
║ │ │  • Registrar presença         │ │  • Preencher laudo técnico   │ ║
║ │ │  • Ativar/desativar visitas   │ │  • Registrar presença        │ ║
║ │ └─ Precisa APROVAÇÃO Gestor     │ └─ Precisa APROVAÇÃO Gestor    │ ║
║ │                                  │                                │ ║
║ │ COLABORADOR OBRAS (OBR)         │ COLABORADOR ADM (ADM)          │ ║
║ │ ├─ Setor: Obras (OBR)           │ ├─ Setor: Administrativo       │ ║
║ │ ├─ Acesso: Apenas suas OS       │ ├─ Acesso: Apenas suas OS      │ ║
║ │ ├─ Vinculado a: Gestor OBR      │ ├─ Vinculado a: Gestor ADM     │ ║
║ │ ├─ Responsabilidades:           │ ├─ Responsabilidades:          │ ║
║ │ │  • Executar OS delegadas      │ │  • Executar tarefas ADM       │ ║
║ │ │  • Preencher follow-up        │ │  • Suportar os setores        │ ║
║ │ │  • Registrar presença         │ │  • Registrar presença         │ ║
║ │ │  • Registrar medições         │ │                               │ ║
║ │ └─ Precisa APROVAÇÃO Gestor     │ └─ Precisa APROVAÇÃO Gestor    │ ║
║ └────────────────────────────────────────────────────────────────────┘ ║
└════════════════════════════════════════════════════════════════════════┘
                                   ↓
╔════════════════════════════════════════════════════════════════════════╗
║      NÍVEL 1: MÃO DE OBRA (MOBRA) - SEM ACESSO AO SISTEMA              ║
║ ┌────────────────────────────────────────────────────────────────────┐ ║
║ │ • Servente, Meio Oficial, Oficial, Encarregado, etc.             │ ║
║ │ • NÃO tem acesso ao sistema                                       │ ║
║ │ • Custos gerados via presença diária                              │ ║
║ │ • Rateado pelos Centros de Custo (CC)                             │ ║
║ │ • Registrado apenas em tabela de alocação                         │ ║
║ └────────────────────────────────────────────────────────────────────┘ ║
└════════════════════════════════════════════════════════════════════════┘
```

### 2.2 Novos Papéis/Roles Definidos

#### Valores para `role_nivel` na tabela `colaboradores`:

```
DIRETORIA              → Nível 4 (Acesso Total)
GESTOR_COMERCIAL       → Nível 3 (Gestor COM)
GESTOR_ASSESSORIA      → Nível 3 (Gestor ASS)
GESTOR_OBRAS           → Nível 3 (Gestor OBR)
GESTOR_ADM             → Nível 3 (Gestor ADM/Coordenação)
COLABORADOR_COMERCIAL  → Nível 2 (Executante COM)
COLABORADOR_ASSESSORIA → Nível 2 (Executante ASS)
COLABORADOR_OBRAS      → Nível 2 (Executante OBR)
COLABORADOR_ADM        → Nível 2 (Executante ADM)
MOBRA                  → Nível 1 (Mão de Obra - Sem Acesso)
```

#### Setores Definidos:

```
COM → Comercial
ASS → Assessoria Técnica
OBR → Obras
LAB → Laboratório (referência futura)
ADM → Administrativo (Gestão)
ENG → Engenharia (referência futura)
```

### 2.3 Tabela de Mapeamento Completo

| Nível | Role | Setor | Tipo | Acesso | Pode Delegar | Pode Aprovar |
|-------|------|-------|------|--------|--------------|--------------|
| 4 | DIRETORIA | ADM | Gestor | Total | Qualquer setor | Todas |
| 3 | GESTOR_COMERCIAL | COM | Gestor | ADM+FIN | Qualquer setor | COM |
| 3 | GESTOR_ASSESSORIA | ASS | Gestor | ASS | Apenas ASS | ASS |
| 3 | GESTOR_OBRAS | OBR | Gestor | OBR | Apenas OBR | OBR |
| 3 | GESTOR_ADM | ADM | Gestor | Cruzado | Qualquer setor | ADM |
| 2 | COLABORADOR_COMERCIAL | COM | Colab | Suas OS | Não | Não |
| 2 | COLABORADOR_ASSESSORIA | ASS | Colab | Suas OS | Não | Não |
| 2 | COLABORADOR_OBRAS | OBR | Colab | Suas OS | Não | Não |
| 2 | COLABORADOR_ADM | ADM | Colab | Suas Tarefas | Não | Não |
| 1 | MOBRA | (variado) | Mão de Obra | Nenhum | Não | Não |

---

## PARTE 3: MODELO DE DADOS RELACIONAL

### 3.1 Tabelas Necessárias

#### `colaboradores` (já existe, requer ajustes)

```sql
CREATE TABLE colaboradores (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role_nivel VARCHAR(50) NOT NULL,  -- DIRETORIA, GESTOR_*, COLABORADOR_*, MOBRA
  setor VARCHAR(50) NOT NULL,        -- COM, ASS, OBR, LAB, ADM, ENG
  supervisor_id UUID REFERENCES colaboradores(id),  -- NULL para Diretoria
  status_colaborador VARCHAR(50) NOT NULL DEFAULT 'ativo',  -- ativo, inativo, suspenso
  data_admissao DATE NOT NULL,
  data_criacao TIMESTAMP DEFAULT now(),
  data_atualizacao TIMESTAMP DEFAULT now(),

  -- Metadados
  telefone VARCHAR(20),
  cpf VARCHAR(14) UNIQUE,
  endereco TEXT,

  CONSTRAINT role_valido CHECK (role_nivel IN (
    'DIRETORIA',
    'GESTOR_COMERCIAL', 'GESTOR_ASSESSORIA', 'GESTOR_OBRAS', 'GESTOR_ADM',
    'COLABORADOR_COMERCIAL', 'COLABORADOR_ASSESSORIA', 'COLABORADOR_OBRAS', 'COLABORADOR_ADM',
    'MOBRA'
  )),

  CONSTRAINT setor_valido CHECK (setor IN (
    'COM', 'ASS', 'OBR', 'LAB', 'ADM', 'ENG'
  ))
);

CREATE INDEX idx_colaboradores_setor ON colaboradores(setor);
CREATE INDEX idx_colaboradores_role ON colaboradores(role_nivel);
CREATE INDEX idx_colaboradores_supervisor ON colaboradores(supervisor_id);
CREATE INDEX idx_colaboradores_email ON colaboradores(email);
```

#### `permissoes` (nova tabela)

```sql
CREATE TABLE permissoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_nivel VARCHAR(50) NOT NULL UNIQUE,
  nome_permissao VARCHAR(255) NOT NULL,
  descricao TEXT,
  modulos_acesso JSONB NOT NULL,  -- {"administrativo": true, "financeiro": true, ...}
  pode_delegar_para_setores JSONB NOT NULL,  -- {"*": true} ou ["COM", "ASS", "OBR"]
  pode_aprovar_setores JSONB NOT NULL,  -- ["COM"] ou ["*"]
  data_criacao TIMESTAMP DEFAULT now(),

  FOREIGN KEY (role_nivel) REFERENCES colaboradores(role_nivel) ON DELETE CASCADE
);
```

#### `delegacoes` (nova tabela)

```sql
CREATE TABLE delegacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  os_id UUID NOT NULL REFERENCES ordens_servico(id) ON DELETE CASCADE,
  delegante_id UUID NOT NULL REFERENCES colaboradores(id),  -- Quem delegou
  delegado_id UUID NOT NULL REFERENCES colaboradores(id),    -- Para quem foi delegada
  data_delegacao TIMESTAMP DEFAULT now(),
  data_prazo DATE,
  status_delegacao VARCHAR(50) DEFAULT 'pendente',  -- pendente, em_progresso, concluida, reprovada
  descricao_tarefa TEXT,
  observacoes TEXT,
  data_atualizacao TIMESTAMP DEFAULT now(),

  CONSTRAINT delegante_superior CHECK (
    -- Validar que delegante tem permissão de delegar
  )
);

CREATE INDEX idx_delegacoes_delegado ON delegacoes(delegado_id);
CREATE INDEX idx_delegacoes_delegante ON delegacoes(delegante_id);
CREATE INDEX idx_delegacoes_os ON delegacoes(os_id);
CREATE INDEX idx_delegacoes_status ON delegacoes(status_delegacao);
```

#### `aprovaçoes` (nova tabela)

```sql
CREATE TABLE aprovacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delegacao_id UUID NOT NULL REFERENCES delegacoes(id) ON DELETE CASCADE,
  responsavel_id UUID NOT NULL REFERENCES colaboradores(id),  -- Quem precisa aprovar
  status_aprovacao VARCHAR(50) DEFAULT 'pendente',  -- pendente, aprovada, reprovada
  observacoes_aprovacao TEXT,
  data_aprovacao TIMESTAMP,
  data_criacao TIMESTAMP DEFAULT now(),

  CONSTRAINT aprovador_autorizado CHECK (
    -- Validar que responsável tem permissão para aprovar
  )
);

CREATE INDEX idx_aprovacoes_responsavel ON aprovacoes(responsavel_id);
CREATE INDEX idx_aprovacoes_delegacao ON aprovacoes(delegacao_id);
CREATE INDEX idx_aprovacoes_status ON aprovacoes(status_aprovacao);
```

#### `auditoria_acoes` (para rastreamento)

```sql
CREATE TABLE auditoria_acoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES colaboradores(id),
  acao VARCHAR(255) NOT NULL,  -- "criou", "editou", "deletou", "aprovou", etc.
  entidade_tipo VARCHAR(100) NOT NULL,  -- "os", "delegacao", "colaborador", etc.
  entidade_id UUID NOT NULL,
  detalhes_antes JSONB,
  detalhes_depois JSONB,
  ip_origem VARCHAR(50),
  data_acao TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_auditoria_usuario ON auditoria_acoes(usuario_id);
CREATE INDEX idx_auditoria_entidade ON auditoria_acoes(entidade_tipo, entidade_id);
CREATE INDEX idx_auditoria_acao ON auditoria_acoes(acao);
```

### 3.2 Alterações na Tabela `ordens_servico`

```sql
-- Adicionar campos para rastreamento de delegação
ALTER TABLE ordens_servico ADD COLUMN (
  delegado_por_id UUID REFERENCES colaboradores(id),  -- Quem delegou a OS
  delegada_para_id UUID REFERENCES colaboradores(id),  -- Para quem foi delegada
  data_delegacao TIMESTAMP,
  requer_aprovacao BOOLEAN DEFAULT false,
  aprovado_por_id UUID REFERENCES colaboradores(id),
  data_aprovacao TIMESTAMP,
  justificativa_reabertura TEXT,
  data_reabertura TIMESTAMP,
  reaberida_por_id UUID REFERENCES colaboradores(id),
  status_aprovacao VARCHAR(50) DEFAULT 'nao_aplicavel'  -- nao_aplicavel, pendente, aprovada, reprovada
);

-- Adicionar restrições
ALTER TABLE ordens_servico ADD CONSTRAINT
  status_concluida_requer_justificativa CHECK (
    status != 'concluida' OR (status = 'concluida' AND data_reabertura IS NULL) OR
    (justificativa_reabertura IS NOT NULL)
  );
```

---

## PARTE 4: FLUXOS DE PERMISSÃO E AUTORIZAÇÃO

### 4.1 Fluxo de Delegação de OS

```
┌────────────────────────────────────────────────────────────────┐
│ 1. INICIADOR CRIA/DELEGA OS                                   │
├────────────────────────────────────────────────────────────────┤
│ • Diretoria: pode delegar para QUALQUER setor/colaborador     │
│ • Gestor COM: pode delegar para QUALQUER setor                │
│ • Gestor ASS/OBR/ADM: pode delegar APENAS para seu setor      │
│ • Colaborador: NÃO pode delegar (apenas executar)             │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 2. SISTEMA REGISTRA DELEGAÇÃO                                  │
├────────────────────────────────────────────────────────────────┤
│ • Cria registro em tabela 'delegacoes'                         │
│ • Vincula delegante, delegado e OS                             │
│ • Define status: 'pendente'                                    │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 3. COLABORADOR EXECUTA A TAREFA                               │
├────────────────────────────────────────────────────────────────┤
│ • Preenche follow-up, laudo, medição, etc.                    │
│ • Status da delegação passa para: 'em_progresso'              │
│ • Marca como pronto para aprovação quando termina             │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 4. SUPERVISOR APROVA EXECUÇÃO                                  │
├────────────────────────────────────────────────────────────────┤
│ • Sistema notifica supervisor (gestor)                         │
│ • Supervisor revisa tarefas em "pendente de aprovação"        │
│ • Pode:                                                        │
│   → APROVAR: Status passa para 'concluida', libera pagamento  │
│   → REJEITAR: Status volta para 'em_progresso', pede revisão   │
└────────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────────┐
│ 5. REABERTURA (DIRETORIA APENAS)                              │
├────────────────────────────────────────────────────────────────┤
│ • Diretoria pode reabrir OS marcada como 'concluida'          │
│ • Requer: justificativa obrigatória                           │
│ • Volta para colaborador para revisão                         │
│ • Registra em auditoria                                        │
└────────────────────────────────────────────────────────────────┘
```

### 4.2 Fluxo de Controle de Acesso a Dados

```
┌─────────────────────────────┐
│ USUÁRIO FAZ LOGIN            │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────────────────────────────────────────┐
│ SISTEMA CARREGA:                                                │
│ • role_nivel do usuário                                         │
│ • setor do usuário                                              │
│ • supervisor_id do usuário (se colaborador)                     │
│ • permissões do role_nivel                                      │
└──────────────┬──────────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────────┐
│ APLICAR FILTROS POR ROLE:                                       │
│                                                                  │
│ SE DIRETORIA:                                                    │
│   → Sem filtros, acesso a TODAS as OS/dados                    │
│                                                                  │
│ SE GESTOR_COMERCIAL:                                            │
│   → OS de QUALQUER setor (delegadas por COM)                   │
│   → Pode ver: Administrativo + Financeiro                       │
│   → Dados de todos os colaboradores da empresa                  │
│                                                                  │
│ SE GESTOR_ASSESSORIA / GESTOR_OBRAS:                            │
│   → OS apenas do seu setor                                      │
│   → Dados apenas de colaboradores do seu setor                  │
│                                                                  │
│ SE GESTOR_ADM:                                                   │
│   → OS de todos os setores (visão cruzada)                      │
│   → Dados administrativos/coordenação                           │
│                                                                  │
│ SE COLABORADOR:                                                  │
│   → OS delegadas especificamente para ele                       │
│   → Sem acesso a dados de outros colaboradores                  │
│   → Sem acesso a módulos financeiros                            │
│   → Sem acesso a relatórios                                     │
│                                                                  │
│ SE MOBRA:                                                        │
│   → Acesso NEGADO (sem login no sistema)                        │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Matriz de Permissões Detalhada

| Ação | Diretoria | Gestor COM | Gestor ASS | Gestor OBR | Gestor ADM | Colab COM | Colab ASS | Colab OBR | Colab ADM | MOBRA |
|------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-------|
| **Criar OS** | ✅ | ✅ | ✅ Seu setor | ✅ Seu setor | ✅ Qualquer | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Editar OS** | ✅ | ✅ | ✅ Seu setor | ✅ Seu setor | ✅ Qualquer | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Delegar OS** | ✅ Qualquer | ✅ Qualquer | ✅ Seu setor | ✅ Seu setor | ✅ Qualquer | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Visualizar OS** | ✅ Todas | ✅ Todas | ✅ ASS | ✅ OBR | ✅ Todas | ✅ Suas | ✅ Suas | ✅ Suas | ✅ Suas | ❌ |
| **Executar Tarefa** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Suas | ✅ Suas | ✅ Suas | ✅ Suas | ❌ |
| **Aprovar Tarefa** | ✅ Todas | ✅ COM | ✅ ASS | ✅ OBR | ✅ ADM | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Reabrir OS Concluída** | ✅ Requer justif. | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Ver Dados Financeiros** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Gerar Relatórios** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Gerenciar Usuários** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Registrar Presença** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Sua | ✅ Sua | ✅ Sua | ✅ Sua | ✅ Manual |
| **Preencher Follow-up** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ Suas | ✅ Suas | ✅ Suas | ✅ Suas | ❌ |

---

## PARTE 5: USUÁRIOS SEED PROPOSTO (ESTRUTURA COMPLETA)

### 5.1 Usuários Recomendados para Seed Inicial

```
============================================
NÍVEL 4: DIRETORIA
============================================

1. DIRETOR GERAL
   Email: diretoria@minerva.com
   Senha: Dir@2025Minerva!
   Nome: Carlos Alberto Diretor
   Role: DIRETORIA
   Setor: ADM
   Supervisor: Nenhum
   Status: ativo
   CPF: Cadastrado manualmente
   Telefone: +55 (11) 98765-4321

============================================
NÍVEL 3: GESTORES DE SETOR
============================================

2. GESTOR COMERCIAL
   Email: gestor.comercial@minerva.com
   Senha: GestCom@2025!
   Nome: Maria Silva Gestora Comercial
   Role: GESTOR_COMERCIAL
   Setor: COM
   Supervisor: Carlos Alberto (Diretoria)
   Status: ativo
   CPF: Cadastrado manualmente
   Telefone: +55 (11) 98765-4322

3. GESTOR ASSESSORIA TÉCNICA
   Email: gestor.assessoria@minerva.com
   Senha: GestAss@2025!
   Nome: João Pedro Gestora Assessoria
   Role: GESTOR_ASSESSORIA
   Setor: ASS
   Supervisor: Carlos Alberto (Diretoria)
   Status: ativo
   CPF: Cadastrado manualmente
   Telefone: +55 (11) 98765-4323

4. GESTOR OBRAS
   Email: gestor.obras@minerva.com
   Senha: GestObr@2025!
   Nome: Roberto Carlos Gestor Obras
   Role: GESTOR_OBRAS
   Setor: OBR
   Supervisor: Carlos Alberto (Diretoria)
   Status: ativo
   CPF: Cadastrado manualmente
   Telefone: +55 (11) 98765-4324

5. GESTOR ADMINISTRATIVO
   Email: gestor.adm@minerva.com
   Senha: GestAdm@2025!
   Nome: Paula Fernanda Gestora ADM
   Role: GESTOR_ADM
   Setor: ADM
   Supervisor: Carlos Alberto (Diretoria)
   Status: ativo
   CPF: Cadastrado manualmente
   Telefone: +55 (11) 98765-4325

============================================
NÍVEL 2: COLABORADORES COMERCIAL (COM)
============================================

6. VENDEDOR 1
   Email: vendedor.1@minerva.com
   Senha: Vend001@2025!
   Nome: Ana Claudia Vendedora
   Role: COLABORADOR_COMERCIAL
   Setor: COM
   Supervisor: Maria Silva (Gestor COM)
   Status: ativo

7. VENDEDOR 2
   Email: vendedor.2@minerva.com
   Senha: Vend002@2025!
   Nome: Fernando Luis Vendedor
   Role: COLABORADOR_COMERCIAL
   Setor: COM
   Supervisor: Maria Silva (Gestor COM)
   Status: ativo

============================================
NÍVEL 2: COLABORADORES ASSESSORIA (ASS)
============================================

8. TÉCNICO ASSESSORIA 1
   Email: tecnico.ass.1@minerva.com
   Senha: TecAss001@2025!
   Nome: Bruno Martins Técnico
   Role: COLABORADOR_ASSESSORIA
   Setor: ASS
   Supervisor: João Pedro (Gestor ASS)
   Status: ativo

9. TÉCNICO ASSESSORIA 2
   Email: tecnico.ass.2@minerva.com
   Senha: TecAss002@2025!
   Nome: Fabiana Souza Técnica
   Role: COLABORADOR_ASSESSORIA
   Setor: ASS
   Supervisor: João Pedro (Gestor ASS)
   Status: ativo

============================================
NÍVEL 2: COLABORADORES OBRAS (OBR)
============================================

10. ENCARREGADO OBRA 1
    Email: encarregado.1@minerva.com
    Senha: Encar001@2025!
    Nome: Marcelo Costa Encarregado
    Role: COLABORADOR_OBRAS
    Setor: OBR
    Supervisor: Roberto Carlos (Gestor OBR)
    Status: ativo

11. ENCARREGADO OBRA 2
    Email: encarregado.2@minerva.com
    Senha: Encar002@2025!
    Nome: Juliana Ribeiro Encarregada
    Role: COLABORADOR_OBRAS
    Setor: OBR
    Supervisor: Roberto Carlos (Gestor OBR)
    Status: ativo

============================================
NÍVEL 2: COLABORADOR ADM
============================================

12. ASSISTENTE ADM
    Email: assistente.adm@minerva.com
    Senha: AsstAdm@2025!
    Nome: Larissa Martins Assistente
    Role: COLABORADOR_ADM
    Setor: ADM
    Supervisor: Paula Fernanda (Gestor ADM)
    Status: ativo

============================================
NÍVEL 1: MÃO DE OBRA (MOBRA) - SEM ACESSO
============================================

13. SERVENTE
    Email: mobra.servente.1@minerva.com
    Senha: (não configurada - sem acesso ao sistema)
    Nome: José Silva da Costa Servente
    Role: MOBRA
    Setor: OBR
    Supervisor: Roberto Carlos (Gestor OBR) / Marcelo Costa (Encarregado)
    Status: ativo
    Tipo: Servente

14. MEIO OFICIAL
    Email: mobra.meiooficial.1@minerva.com
    Senha: (não configurada - sem acesso ao sistema)
    Nome: Antonio Pereira Meio Oficial
    Role: MOBRA
    Setor: OBR
    Supervisor: Roberto Carlos (Gestor OBR) / Juliana Ribeiro (Encarregada)
    Status: ativo
    Tipo: Meio Oficial

15. OFICIAL
    Email: mobra.oficial.1@minerva.com
    Senha: (não configurada - sem acesso ao sistema)
    Nome: Valdemir Gonçalves Oficial
    Role: MOBRA
    Setor: OBR
    Supervisor: Roberto Carlos (Gestor OBR) / Marcelo Costa (Encarregado)
    Status: ativo
    Tipo: Oficial
```

---

## PARTE 6: IMPLEMENTAÇÃO TÉCNICA

### 6.1 Alterações Necessárias em `src/lib/types.ts`

```typescript
// Tipos de Roles Hierárquicos
export type RoleLevel =
  | 'DIRETORIA'
  | 'GESTOR_COMERCIAL'
  | 'GESTOR_ASSESSORIA'
  | 'GESTOR_OBRAS'
  | 'GESTOR_ADM'
  | 'COLABORADOR_COMERCIAL'
  | 'COLABORADOR_ASSESSORIA'
  | 'COLABORADOR_OBRAS'
  | 'COLABORADOR_ADM'
  | 'MOBRA';

// Tipos de Setores
export type Setor = 'COM' | 'ASS' | 'OBR' | 'LAB' | 'ADM' | 'ENG';

// Interface de Usuário Expandida
export interface User {
  id: string;
  nome_completo: string;
  email: string;
  role_nivel: RoleLevel;
  setor: Setor;
  supervisor_id?: string;  // UUID do supervisor
  supervisor_nome?: string; // Nome do supervisor
  status_colaborador: 'ativo' | 'inativo' | 'suspenso';
  data_admissao: Date;
  telefone?: string;
  cpf?: string;
  endereco?: string;
  avatar?: string;

  // Metadados de controle
  pode_delegar: boolean;
  pode_aprovar: boolean;
  setores_acesso: Setor[]; // Setores que pode visualizar
  modulos_acesso: {
    administrativo: boolean;
    financeiro: boolean;
    operacional: boolean;
    recursos_humanos: boolean;
  };
}

// Interface de Delegação
export interface Delegacao {
  id: string;
  os_id: string;
  delegante_id: string;
  delegante_nome: string;
  delegado_id: string;
  delegado_nome: string;
  data_delegacao: Date;
  data_prazo?: Date;
  status_delegacao: 'pendente' | 'em_progresso' | 'concluida' | 'reprovada';
  descricao_tarefa: string;
  observacoes?: string;
  data_atualizacao: Date;
}

// Interface de Aprovação
export interface Aprovacao {
  id: string;
  delegacao_id: string;
  responsavel_id: string;
  responsavel_nome: string;
  status_aprovacao: 'pendente' | 'aprovada' | 'reprovada';
  observacoes_aprovacao?: string;
  data_aprovacao?: Date;
  data_criacao: Date;
}

// Enums para constantes
export enum NivelHierarquico {
  MOBRA = 1,
  COLABORADOR = 2,
  GESTOR = 3,
  DIRETORIA = 4,
}

export const ROLE_PARA_NIVEL: Record<RoleLevel, NivelHierarquico> = {
  'MOBRA': NivelHierarquico.MOBRA,
  'COLABORADOR_COMERCIAL': NivelHierarquico.COLABORADOR,
  'COLABORADOR_ASSESSORIA': NivelHierarquico.COLABORADOR,
  'COLABORADOR_OBRAS': NivelHierarquico.COLABORADOR,
  'COLABORADOR_ADM': NivelHierarquico.COLABORADOR,
  'GESTOR_COMERCIAL': NivelHierarquico.GESTOR,
  'GESTOR_ASSESSORIA': NivelHierarquico.GESTOR,
  'GESTOR_OBRAS': NivelHierarquico.GESTOR,
  'GESTOR_ADM': NivelHierarquico.GESTOR,
  'DIRETORIA': NivelHierarquico.DIRETORIA,
};

// Definir permissões por role
export const PERMISSOES_POR_ROLE: Record<RoleLevel, {
  pode_delegar_para: Setor[];
  pode_aprovar_setores: Setor[];
  acesso_modulos: string[];
  acesso_setores: Setor[];
}> = {
  'DIRETORIA': {
    pode_delegar_para: ['COM', 'ASS', 'OBR', 'LAB', 'ADM', 'ENG'],
    pode_aprovar_setores: ['COM', 'ASS', 'OBR', 'LAB', 'ADM', 'ENG'],
    acesso_modulos: ['administrativo', 'financeiro', 'operacional', 'recursos_humanos'],
    acesso_setores: ['COM', 'ASS', 'OBR', 'LAB', 'ADM', 'ENG'],
  },

  'GESTOR_COMERCIAL': {
    pode_delegar_para: ['COM', 'ASS', 'OBR', 'LAB', 'ADM'],
    pode_aprovar_setores: ['COM'],
    acesso_modulos: ['administrativo', 'financeiro'],
    acesso_setores: ['COM', 'ASS', 'OBR', 'LAB', 'ADM'],
  },

  'GESTOR_ASSESSORIA': {
    pode_delegar_para: ['ASS'],
    pode_aprovar_setores: ['ASS'],
    acesso_modulos: ['operacional'],
    acesso_setores: ['ASS'],
  },

  'GESTOR_OBRAS': {
    pode_delegar_para: ['OBR'],
    pode_aprovar_setores: ['OBR'],
    acesso_modulos: ['operacional'],
    acesso_setores: ['OBR'],
  },

  'GESTOR_ADM': {
    pode_delegar_para: ['COM', 'ASS', 'OBR', 'LAB', 'ADM'],
    pode_aprovar_setores: ['ADM'],
    acesso_modulos: ['administrativo', 'financeiro', 'operacional'],
    acesso_setores: ['COM', 'ASS', 'OBR', 'LAB', 'ADM'],
  },

  'COLABORADOR_COMERCIAL': {
    pode_delegar_para: [],
    pode_aprovar_setores: [],
    acesso_modulos: ['operacional'],
    acesso_setores: ['COM'],
  },

  'COLABORADOR_ASSESSORIA': {
    pode_delegar_para: [],
    pode_aprovar_setores: [],
    acesso_modulos: ['operacional'],
    acesso_setores: ['ASS'],
  },

  'COLABORADOR_OBRAS': {
    pode_delegar_para: [],
    pode_aprovar_setores: [],
    acesso_modulos: ['operacional'],
    acesso_setores: ['OBR'],
  },

  'COLABORADOR_ADM': {
    pode_delegar_para: [],
    pode_aprovar_setores: [],
    acesso_modulos: ['administrativo'],
    acesso_setores: ['ADM'],
  },

  'MOBRA': {
    pode_delegar_para: [],
    pode_aprovar_setores: [],
    acesso_modulos: [],
    acesso_setores: [],
  },
};
```

### 6.2 Utilitários para Verificação de Permissões

```typescript
// arquivo: src/lib/auth-utils.ts

export class PermissaoUtil {

  /**
   * Verifica se um usuário pode delegar uma OS para outro
   */
  static podeDelegarPara(
    delegante: User,
    setorDelegado: Setor,
    colaboradorDelegado: User
  ): boolean {
    const permissoes = PERMISSOES_POR_ROLE[delegante.role_nivel];

    // Diretoria pode delegar para qualquer um
    if (delegante.role_nivel === 'DIRETORIA') {
      return true;
    }

    // Gestor Comercial pode delegar para qualquer setor
    if (delegante.role_nivel === 'GESTOR_COMERCIAL') {
      return true;
    }

    // Outros gestores podem delegar apenas para seu próprio setor
    if (delegante.role_nivel.startsWith('GESTOR_')) {
      return setorDelegado === delegante.setor;
    }

    // Colaboradores não podem delegar
    return false;
  }

  /**
   * Verifica se um usuário pode aprovar uma tarefa
   */
  static podeAprovarTarefa(usuario: User, tarefaSetor: Setor): boolean {
    const permissoes = PERMISSOES_POR_ROLE[usuario.role_nivel];
    return permissoes.pode_aprovar_setores.includes('*' as any) ||
           permissoes.pode_aprovar_setores.includes(tarefaSetor);
  }

  /**
   * Retorna os setores que um usuário pode visualizar
   */
  static obterSetoresAcesso(usuario: User): Setor[] {
    return PERMISSOES_POR_ROLE[usuario.role_nivel].acesso_setores;
  }

  /**
   * Verifica se um usuário tem acesso a um módulo
   */
  static temAcessoModulo(usuario: User, modulo: string): boolean {
    return PERMISSOES_POR_ROLE[usuario.role_nivel].acesso_modulos.includes(modulo);
  }

  /**
   * Retorna o nível hierárquico do usuário
   */
  static obterNivelHierarquico(usuario: User): NivelHierarquico {
    return ROLE_PARA_NIVEL[usuario.role_nivel];
  }

  /**
   * Verifica se um usuário é superior a outro
   */
  static ehSuperior(usuario1: User, usuario2: User): boolean {
    const nivel1 = this.obterNivelHierarquico(usuario1);
    const nivel2 = this.obterNivelHierarquico(usuario2);
    return nivel1 > nivel2;
  }

  /**
   * Obtém o nome legível do role
   */
  static obterNomeRole(role: RoleLevel): string {
    const nomes: Record<RoleLevel, string> = {
      'DIRETORIA': 'Diretoria',
      'GESTOR_COMERCIAL': 'Gestor Comercial',
      'GESTOR_ASSESSORIA': 'Gestor Assessoria Técnica',
      'GESTOR_OBRAS': 'Gestor de Obras',
      'GESTOR_ADM': 'Gestor Administrativo',
      'COLABORADOR_COMERCIAL': 'Colaborador Comercial',
      'COLABORADOR_ASSESSORIA': 'Colaborador Assessoria',
      'COLABORADOR_OBRAS': 'Colaborador Obras',
      'COLABORADOR_ADM': 'Colaborador Administrativo',
      'MOBRA': 'Mão de Obra',
    };
    return nomes[role];
  }
}
```

### 6.3 Hook para Proteger Rotas

```typescript
// arquivo: src/hooks/usePermissoes.ts

export function usePermissoes() {
  const { currentUser } = useAuth();

  return {
    podeDelegarPara: (setor: Setor, colaborador: User) =>
      PermissaoUtil.podeDelegarPara(currentUser, setor, colaborador),

    podeAprovarTarefa: (setor: Setor) =>
      PermissaoUtil.podeAprovarTarefa(currentUser, setor),

    obterSetoresAcesso: () =>
      PermissaoUtil.obterSetoresAcesso(currentUser),

    temAcessoModulo: (modulo: string) =>
      PermissaoUtil.temAcessoModulo(currentUser, modulo),

    ehDiretoria: () =>
      currentUser.role_nivel === 'DIRETORIA',

    ehGestor: () =>
      currentUser.role_nivel.startsWith('GESTOR_'),

    ehColaborador: () =>
      currentUser.role_nivel.startsWith('COLABORADOR_'),

    ehMobra: () =>
      currentUser.role_nivel === 'MOBRA',

    temAcessoAOS: (os: OrdenServico) => {
      // Diretoria tem acesso a todas
      if (currentUser.role_nivel === 'DIRETORIA') return true;

      // Gestor de setor tem acesso às do seu setor
      if (currentUser.role_nivel.startsWith('GESTOR_')) {
        return os.tipoOS.setor === currentUser.setor;
      }

      // Colaborador tem acesso apenas às delegadas para ele
      if (currentUser.role_nivel.startsWith('COLABORADOR_')) {
        return os.delegada_para_id === currentUser.id ||
               os.responsavel?.id === currentUser.id;
      }

      return false;
    },
  };
}
```

---

## PARTE 7: SUGESTÕES DE MELHORIA

### 7.1 Implementações de Curto Prazo (Essencial)

```
✅ PRIORITÁRIO (Sprint 1-2):
├─ [ ] Expandir tipos em types.ts com todos os 10 roles
├─ [ ] Criar arquivo auth-utils.ts com PermissaoUtil
├─ [ ] Atualizar tabela colaboradores com campos novo:
│      ├─ supervisor_id
│      ├─ status_colaborador
│      ├─ data_admissao
│      └─ cpf
├─ [ ] Criar tabelas delegacoes e aprovacoes
├─ [ ] Expandir seed-usuarios-page.tsx com 15 usuários
├─ [ ] Implementar RLS (Row Level Security) no Supabase
├─ [ ] Adicionar hook usePermissoes
└─ [ ] Testar todos os fluxos de permissão

🔄 CURTO PRAZO (Sprint 3-4):
├─ [ ] Tabela auditoria_acoes para rastreamento
├─ [ ] UI para delegação de OS (modal/wizard)
├─ [ ] UI para aprovação de tarefas
├─ [ ] Notificações para aprovações pendentes
├─ [ ] Relatório de hierarquia e permissões
├─ [ ] Controle de reabertura de OS (Diretoria)
├─ [ ] Integração com calendar de disponibilidade
└─ [ ] Testes unitários de permissões
```

### 7.2 Implementações de Médio Prazo (Importante)

```
📅 MÉDIO PRAZO (Sprint 5-8):
├─ [ ] Dashboard customizado por role
├─ [ ] Fluxo de aprovação multi-nível
├─ [ ] Integração com presença/ponto eletrônico
├─ [ ] Cálculo de custo automático para MOBRA
├─ [ ] Integração com centros de custo (CC)
├─ [ ] Relatórios de performance por setor
├─ [ ] Histórico completo de alterações (auditoria)
├─ [ ] API REST para permissões (backend)
├─ [ ] Testes de integração E2E
└─ [ ] Documentação de segurança
```

### 7.3 Implementações de Longo Prazo (Futuro)

```
🎯 LONGO PRAZO (Sprint 9+):
├─ [ ] SSO/LDAP para autenticação corporativa
├─ [ ] 2FA (Two-Factor Authentication)
├─ [ ] Permissões granulares por campo
├─ [ ] Fluxos de aprovação customizáveis
├─ [ ] Rotação automática de senhas
├─ [ ] Integração com sistema de RH
├─ [ ] Analytics de acesso e uso
├─ [ ] Compliance e conformidade (LGPD, ISO)
└─ [ ] Mobile app com autenticação biométrica
```

---

## PARTE 8: CHECKLIST DE IMPLEMENTAÇÃO

### 8.1 Antes de Começar a Implementação

```
PRÉ-REQUISITOS:
☐ Backup completo do banco de dados atual
☐ Branch de desenvolvimento criado
☐ Ambiente de testes configurado
☐ Testes unitários infraestrutura pronta
☐ Documentação de rollback preparada
☐ Aprovação de stakeholders
```

### 8.2 Fase 1: Estrutura de Dados

```
BANCO DE DADOS:
☐ Adicionar coluna supervisor_id em colaboradores
☐ Adicionar status_colaborador em colaboradores
☐ Adicionar data_admissao em colaboradores
☐ Adicionar campos de auditoria (data_criacao, data_atualizacao)
☐ Criar tabela permissoes
☐ Criar tabela delegacoes
☐ Criar tabela aprovacoes
☐ Criar tabela auditoria_acoes
☐ Adicionar campos em ordens_servico para delegação
☐ Adicionar índices para performance
☐ Testar migrações em ambiente de desenvolvimento
```

### 8.3 Fase 2: Backend

```
APIS E VALIDAÇÕES:
☐ Criar utilitário de permissões (PermissaoUtil)
☐ Implementar middleware de autenticação
☐ Implementar RLS no Supabase
☐ Criar validadores de permissão
☐ Testes unitários de permissões
☐ Documentar endpoints em swagger/postman
```

### 8.4 Fase 3: Frontend

```
COMPONENTES:
☐ Expandir tipos em types.ts
☐ Atualizar componente de login
☐ Criar hook usePermissoes
☐ Atualizar os-list-page.tsx com novos filtros
☐ Criar componente de delegação de OS
☐ Criar componente de aprovação de tarefas
☐ Criar dashboard específico por role
☐ Adicionar indicadores de permissão nas UIs
☐ Testes de componentes
```

### 8.5 Fase 4: Testes e Validação

```
TESTES:
☐ Testes de integração de permissões
☐ Testes E2E de fluxos críticos
☐ Teste de RLS (tentativas de contorno)
☐ Testes de delegação e aprovação
☐ Testes de auditoria
☐ Testes de performance
☐ Teste de segurança
☐ Teste de rollback
```

### 8.6 Fase 5: Deployment e Monitoramento

```
PRODUÇÃO:
☐ Migração de dados históricos
☐ Seed de usuários iniciais
☐ Teste de compatibilidade com dados existentes
☐ Monitoramento de logs e erros
☐ Documentação para usuários finais
☐ Treinamento de gestores
☐ Suporte durante transição
```

---

## PARTE 9: CONSIDERAÇÕES DE SEGURANÇA

### 9.1 Implementação de RLS (Row Level Security)

```sql
-- Política para usuários ver apenas dados que podem acessar
CREATE POLICY "rls_colaboradores_acesso"
ON ordens_servico
FOR SELECT
USING (
  -- Diretoria: acesso a tudo
  EXISTS(SELECT 1 FROM colaboradores c
         WHERE c.id = auth.uid()
         AND c.role_nivel = 'DIRETORIA')

  OR

  -- Gestor de Setor: acesso ao seu setor
  EXISTS(SELECT 1 FROM colaboradores c
         WHERE c.id = auth.uid()
         AND c.role_nivel IN ('GESTOR_ASSESSORIA', 'GESTOR_OBRAS', 'GESTOR_ADM')
         AND c.setor = (SELECT setor FROM tipos_os WHERE id = tipo_os_id))

  OR

  -- Colaborador: acesso apenas suas OS
  EXISTS(SELECT 1 FROM colaboradores c
         WHERE c.id = auth.uid()
         AND (delegada_para_id = c.id OR responsavel_id = c.id))
);
```

### 9.2 Proteção Contra Contorno de Permissões

```typescript
// Sempre verificar permissões NO SERVIDOR
async function delegarOS(osId: string, colaboradorId: string) {
  // 1. Verificar autenticação
  const user = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado');

  // 2. Buscar dados do usuário atual (do banco, não do frontend)
  const delegante = await supabase
    .from('colaboradores')
    .select('*')
    .eq('id', user.id)
    .single();

  // 3. Validar permissão NO SERVIDOR
  if (!PermissaoUtil.podeDelegarPara(delegante, ..., ...)) {
    throw new Error('Sem permissão para delegar');
  }

  // 4. Executar ação
  await supabase.from('delegacoes').insert({...});
}
```

### 9.3 Auditoria Completa

```typescript
// Registrar todas as ações sensíveis
async function registrarAuditoria(
  usuarioId: string,
  acao: string,
  entidadeTipo: string,
  entidadeId: string,
  detalhesDados: object
) {
  await supabase
    .from('auditoria_acoes')
    .insert({
      usuario_id: usuarioId,
      acao,
      entidade_tipo: entidadeTipo,
      entidade_id: entidadeId,
      detalhes_depois: detalhesDados,
      ip_origem: getClientIp(),
      data_acao: new Date(),
    });
}
```

---

## PARTE 10: DOCUMENTAÇÃO PARA USUÁRIOS

### 10.1 Manual de Papéis e Responsabilidades (Resumido)

**Para distribuir aos usuários finais:**

```markdown
# GUIA DE PAPÉIS E RESPONSABILIDADES - MINERVA ERP

## Seu Papel no Sistema

### Você é DIRETORIA?
✓ Acesso a TUDO no sistema
✓ Pode delegar para qualquer pessoa
✓ Pode reabrir OS concluídas (com justificativa)
✓ Visualiza relatórios consolidados

### Você é GESTOR COMERCIAL?
✓ Cria e delega OS para todos os setores
✓ Aprova tarefas do setor Comercial
✓ Visualiza dados Administrativos e Financeiros
✓ Agenda vistorias e visitas

### Você é GESTOR DE SETOR (Assessoria/Obras)?
✓ Gerencia equipe do seu setor
✓ Delega tarefas apenas para sua equipe
✓ Aprova execução de tarefas
✓ Gerencia disponibilidade do calendário

### Você é COLABORADOR?
✓ Executa tarefas delegadas para você
✓ Preenche follow-up, laudos, medições
✓ Registra sua presença
✓ Aguarda aprovação do gestor

### Você é MOBRA?
✓ Sem acesso ao sistema
✓ Presença registrada manualmente
✓ Custos calculados automaticamente
```

---

## CONCLUSÃO

Este documento descreve a arquitetura completa de usuários, hierarquias e permissões para o ERP Minerva Engenharia. Implementar todas estas definições garantirá:

✅ **Estrutura hierárquica clara** com 4 níveis bem definidos
✅ **Controle de acesso granular** por setor, módulo e função
✅ **Fluxos de delegação e aprovação** automáticos
✅ **Auditoria completa** de todas as ações sensíveis
✅ **Segurança em produção** com RLS no banco de dados
✅ **Conformidade organizacional** com a estrutura da empresa
✅ **Escalabilidade** para crescimento futuro

Recomenda-se seguir o roteiro de implementação em fases, priorizando as funcionalidades essenciais (curto prazo) antes de funcionalidades avançadas (longo prazo).

---

**Documento preparado**: 14/11/2025
**Versão**: 2.0 - Modelo Completo Hierárquico
**Status**: Pronto para Implementação
