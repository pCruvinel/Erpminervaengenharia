# GUIA RÁPIDO - PAPÉIS, HIERARQUIAS E PERMISSÕES
## ERP Minerva Engenharia

**Referência Rápida para Desenvolvedores e Usuários Finais**

---

## 📋 ÍNDICE RÁPIDO

- [Os 4 Níveis Hierárquicos](#os-4-níveis-hierárquicos)
- [Os 10 Papéis Definidos](#os-10-papéis-definidos)
- [Os 6 Setores](#os-6-setores)
- [Referência Rápida por Papel](#referência-rápida-por-papel)
- [Quem Pode Fazer O Quê](#quem-pode-fazer-o-quê)
- [Fluxos Principais](#fluxos-principais)
- [Código TypeScript Essencial](#código-typescript-essencial)

---

## OS 4 NÍVEIS HIERÁRQUICOS

```
NÍVEL 4  ▲  DIRETORIA              [1 pessoa]
         │  Acesso Total
         │
         ├─ NÍVEL 3 ▲  GESTORES    [4 gestores]
         │          │  Supervisão
         │          │
         │          ├─ NÍVEL 2 ▲  COLABORADORES  [vários]
         │          │          │  Execução
         │          │          │
         │          │          ├─ NÍVEL 1  MOBRA  [vários]
         │          │          │  Sem Sistema
         │          │          │
         ▼          ▼          ▼
        Comando    Supervisão  Execução
```

---

## OS 10 PAPÉIS DEFINIDOS

### Nível 4 (Diretoria)
| Papel | Setor | Responsabilidades |
|-------|-------|-------------------|
| **DIRETORIA** | ADM | Acesso total, Delega para todos, Reabre OS, Gerencia usuários |

### Nível 3 (Gestores)
| Papel | Setor | Responsabilidades |
|-------|-------|-------------------|
| **GESTOR_COMERCIAL** | COM | Cadastro OS, Leads, Financeiro, Delega para todos |
| **GESTOR_ASSESSORIA** | ASS | Equipe ASS, Laudos, Delega para ASS |
| **GESTOR_OBRAS** | OBR | Equipe OBR, Medições, Delega para OBR |
| **GESTOR_ADM** | ADM | Coordenação geral, Cruzado, Delega para todos |

### Nível 2 (Colaboradores)
| Papel | Setor | Responsabilidades |
|-------|-------|-------------------|
| **COLABORADOR_COMERCIAL** | COM | Executa suas tarefas de vendas |
| **COLABORADOR_ASSESSORIA** | ASS | Executa suas tarefas de assessoria |
| **COLABORADOR_OBRAS** | OBR | Executa suas tarefas de obras |
| **COLABORADOR_ADM** | ADM | Executa suas tarefas administrativas |

### Nível 1 (Mão de Obra)
| Papel | Setor | Responsabilidades |
|-------|-------|-------------------|
| **MOBRA** | Variado | Presença diária, Sem acesso ao sistema |

---

## OS 6 SETORES

```
COM  → Comercial (Vendas, Cotações, Vistorias)
ASS  → Assessoria Técnica (Laudos, Consultoria)
OBR  → Obras (Execução, Medições)
LAB  → Laboratório (Ensaios)
ADM  → Administrativo (Coordenação geral)
ENG  → Engenharia (Projetos) [futuro]
```

---

## REFERÊNCIA RÁPIDA POR PAPEL

### 🔴 DIRETORIA

**O que vejo?**
- Tudo (todas as OS, todos os dados)
- Dashboard consolidado de todos setores

**O que posso fazer?**
- ✅ Criar/editar qualquer OS
- ✅ Delegar para qualquer pessoa
- ✅ Aprovar qualquer tarefa
- ✅ Reabrir OS concluídas (com justificativa)
- ✅ Acessar financeiro completo
- ✅ Gerenciar usuários
- ✅ Ver auditoria completa

**O que NÃO posso fazer?**
- ❌ Nada (acesso total)

---

### 🔵 GESTOR COMERCIAL

**O que vejo?**
- Todas as OS (de todos setores)
- Leads e clientes
- Dados financeiros

**O que posso fazer?**
- ✅ Criar/editar OS
- ✅ Delegar para QUALQUER setor
- ✅ Aprovar tarefas de COM
- ✅ Acessar módulo Administrativo + Financeiro
- ✅ Gerenciar disponibilidade COM

**O que NÃO posso fazer?**
- ❌ Delegar apenas para COM (pode para todos)
- ❌ Aprovar tarefas de outros setores
- ❌ Reabrir OS
- ❌ Gerenciar usuários

**Exemplo de workflow:**
```
Você delegou uma vistoria → Colaborador COM executa
→ Coloca "Pronto para aprovação" → Você aprova
→ OS marca como concluída
```

---

### 🟢 GESTOR DE SETOR (ASS/OBR)

**O que vejo?**
- Apenas OS do seu setor
- Sua equipe
- Tarefas pendentes do setor

**O que posso fazer?**
- ✅ Criar/editar OS (seu setor)
- ✅ Delegar APENAS para meu setor
- ✅ Aprovar tarefas de meu setor
- ✅ Gerenciar disponibilidade do setor
- ✅ Registrar presença do setor

**O que NÃO posso fazer?**
- ❌ Delegar para outro setor
- ❌ Ver dados de outros setores
- ❌ Aprovar tarefas de outro setor
- ❌ Acessar financeiro
- ❌ Reabrir OS
- ❌ Gerenciar usuários

**Exemplo de workflow:**
```
Gestor OBR delega obra → Colaborador OBR executa
→ Preenche medição → Gestor OBR aprova
→ Obra marcada como concluída
```

---

### 🟡 GESTOR ADMINISTRATIVO

**O que vejo?**
- Todas as OS (cruzado)
- Dados administrativos
- Relatórios gerais

**O que posso fazer?**
- ✅ Delegar para QUALQUER setor
- ✅ Aprovar tarefas de ADM
- ✅ Ver dados cruzados

**O que NÃO posso fazer?**
- ❌ Acessar financeiro
- ❌ Aprovar fora de ADM
- ❌ Reabrir OS
- ❌ Gerenciar usuários

---

### ⚪ COLABORADOR

**O que vejo?**
- Apenas minhas tarefas delegadas

**O que posso fazer?**
- ✅ Executar tarefas delegadas
- ✅ Preencher follow-up/laudo/medição
- ✅ Registrar minha presença
- ✅ Marcar como "Pronto para aprovação"

**O que NÃO posso fazer?**
- ❌ Criar/editar OS
- ❌ Delegar tarefas
- ❌ Aprovar tarefas
- ❌ Ver tarefas de outros
- ❌ Acessar financeiro
- ❌ Acessar outro setor

**Exemplo de workflow:**
```
Gestor me delega tarefa → Eu executo → Preencho dados
→ Marco "Pronto" → Gestor aprova → Concluída
```

---

### ⚫ MOBRA

**O que vejo?**
- Nada (sem acesso ao sistema)

**O que posso fazer?**
- ✅ Nada no sistema

**Como sou registrado?**
- Presença diária (manual ou app externo)
- Custos calculados automaticamente
- Rateado por Centro de Custo

---

## QUEM PODE FAZER O QUÊ

### CRIAR OS
- ✅ DIRETORIA
- ✅ GESTOR_COMERCIAL (qualquer setor)
- ✅ GESTOR_ASSESSORIA (seu setor)
- ✅ GESTOR_OBRAS (seu setor)
- ✅ GESTOR_ADM (qualquer setor)
- ❌ Colaborador

### DELEGAR
```
DIRETORIA             → Para: Qualquer pessoa
GESTOR_COMERCIAL      → Para: Qualquer setor
GESTOR_ASSESSORIA     → Para: Apenas ASS
GESTOR_OBRAS          → Para: Apenas OBR
GESTOR_ADM            → Para: Qualquer setor
Colaborador           → Para: Ninguém
```

### APROVAR
```
DIRETORIA             → Aprova: Tudo
GESTOR_COMERCIAL      → Aprova: COM
GESTOR_ASSESSORIA     → Aprova: ASS
GESTOR_OBRAS          → Aprova: OBR
GESTOR_ADM            → Aprova: ADM
Colaborador           → Aprova: Nada
```

### REABRIR OS CONCLUÍDA
```
✅ DIRETORIA (requer justificativa)
❌ Todos os outros
```

### VER FINANCEIRO
```
✅ DIRETORIA
✅ GESTOR_COMERCIAL
✅ GESTOR_ADM
❌ Todos os outros
```

---

## FLUXOS PRINCIPAIS

### 1️⃣ FLUXO: CRIAR E COMPLETAR UMA OS

```
DIRETORIA/GESTOR cria OS
        ↓
DIRETORIA/GESTOR delega para COLABORADOR
        ↓
COLABORADOR executa tarefa
        ↓
COLABORADOR preenche follow-up/laudo/etc
        ↓
COLABORADOR marca "Pronto para aprovação"
        ↓
GESTOR recebe notificação
        ↓
GESTOR revisa e:
   ✅ APROVA  → OS concluída, liberada para faturamento
   ❌ REJEITA → Volta para colaborador revisar
        ↓
Se rejeitou:
   COLABORADOR refaz
   COLABORADOR resubmete
   (volta ao "marca Pronto")
```

### 2️⃣ FLUXO: DELEGAR PARA OUTRO SETOR

```
GESTOR_COMERCIAL precisa de laudo
        ↓
GESTOR_COMERCIAL delega para COLABORADOR_ASSESSORIA
        ↓
Mas GESTOR_ASSESSORIA é notificado (seu colaborador foi delegado)
        ↓
GESTOR_ASSESSORIA aprova tarefas de ASS
        ↓
OS concluída
```

### 3️⃣ FLUXO: REABRIR OS (APENAS DIRETORIA)

```
DIRETORIA identifica problema
        ↓
DIRETORIA clica "Reabrir OS"
        ↓
Sistema exige JUSTIFICATIVA (obrigatório)
        ↓
DIRETORIA digita motivo
        ↓
OS volta para COLABORADOR
        ↓
COLABORADOR revisa
        ↓
Volta ao fluxo normal de aprovação
```

---

## CÓDIGO TYPESCRIPT ESSENCIAL

### Tipos Básicos

```typescript
// Role tipos
type RoleLevel =
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

// Setor tipos
type Setor = 'COM' | 'ASS' | 'OBR' | 'LAB' | 'ADM' | 'ENG';

// Interface User
interface User {
  id: string;
  nome_completo: string;
  email: string;
  role_nivel: RoleLevel;
  setor: Setor;
  supervisor_id?: string;
  status_colaborador: 'ativo' | 'inativo' | 'suspenso';
}
```

### Verificar Permissões

```typescript
import { usePermissoes } from '@/hooks/usePermissoes';

function MeuComponente() {
  const perms = usePermissoes();

  // Verificar se pode fazer algo
  if (perms.ehDiretoria()) {
    // Mostrar opção de reabrir OS
  }

  if (perms.ehGestor()) {
    // Mostrar opções de delegação
  }

  if (perms.ehColaborador()) {
    // Mostrar apenas suas tarefas
  }

  // Verificar acesso a módulo
  if (perms.temAcessoModulo('financeiro')) {
    // Mostrar seção financeira
  }

  // Verificar acesso a OS específica
  if (perms.temAcessoAOS(osAtual)) {
    // Permitir visualizar
  }
}
```

### Usar PermissaoUtil

```typescript
import { PermissaoUtil } from '@/lib/auth-utils';

// Verificar se pode delegar
const podeDelegar = PermissaoUtil.podeDelegarPara(
  usuarioAtual,
  'COM',  // setor
  colaboradorDestino
);

// Obter nível hierárquico
const nivel = PermissaoUtil.obterNivelHierarquico(usuario);

// Verificar se é superior
const ehSuperior = PermissaoUtil.ehSuperior(user1, user2);

// Nomes legíveis
const nome = PermissaoUtil.obterNomeRole('GESTOR_COMERCIAL');
// Resultado: "Gestor Comercial"
```

---

## 📊 TABELA RESUMIDA

| Papel | Nível | Vê | Delega | Aprova | Acesso Fin | Reabrir |
|-------|-------|-----|--------|--------|-----------|---------|
| DIRETORIA | 4 | Tudo | Todos | Todos | ✅ | ✅ |
| GESTOR_COMERCIAL | 3 | Tudo | Todos | COM | ✅ | ❌ |
| GESTOR_ASSESSORIA | 3 | ASS | ASS | ASS | ❌ | ❌ |
| GESTOR_OBRAS | 3 | OBR | OBR | OBR | ❌ | ❌ |
| GESTOR_ADM | 3 | Tudo | Todos | ADM | ✅ | ❌ |
| COLAB_COMERCIAL | 2 | Suas | ❌ | ❌ | ❌ | ❌ |
| COLAB_ASSESSORIA | 2 | Suas | ❌ | ❌ | ❌ | ❌ |
| COLAB_OBRAS | 2 | Suas | ❌ | ❌ | ❌ | ❌ |
| COLAB_ADM | 2 | Suas | ❌ | ❌ | ❌ | ❌ |
| MOBRA | 1 | Nada | ❌ | ❌ | ❌ | ❌ |

---

## 🎓 CENÁRIOS PRÁTICOS

### Cenário 1: Uma Vistoria Simples
```
1. Gestor COM cria OS "Vistoria - Cliente X"
2. Gestor COM delega para Colab COM 1
3. Colab COM 1 executa vistoria
4. Colab COM 1 preenche formulário
5. Colab COM 1 marca "Pronto"
6. Gestor COM vê notificação
7. Gestor COM aprova
8. OS marca como "Concluída"
9. Financeiro libera faturamento
```

### Cenário 2: Um Laudo Técnico
```
1. Gestor COM cria OS "Laudo - Propriedade Y"
2. Gestor COM delega para Colab ASS 1 (setor diferente!)
3. Gestor ASS é notificado (seu colaborador foi delegado)
4. Colab ASS 1 preenche laudo detalhado
5. Colab ASS 1 marca "Pronto"
6. Gestor ASS aprova (é supervisor de ASS)
7. OS marcada como "Concluída"
```

### Cenário 3: Correção por Reabrir
```
1. OS estava "Concluída" desde ontem
2. Diretor encontra problema
3. Diretor clica "Reabrir OS"
4. Diretor digita: "Cliente reclamou qualidade"
5. OS volta para Colab responsável
6. Colab refaz o trabalho
7. Sistema registra tudo em auditoria
```

### Cenário 4: Mão de Obra (MOBRA)
```
1. Oficial João trabalha na Obra Z (não tem acesso ao sistema)
2. Gestor OBR registra presença manualmente
3. Sistema calcula: 8 horas × 50/hora = R$ 400
4. Rateia entre centros de custo: CC1 (50%), CC2 (50%)
5. Laudo de auditoria: Oficial João - 8h - R$ 400
```

---

## ❓ DÚVIDAS FREQUENTES

**P: Um colaborador pode ver dados de outro colaborador?**
R: Não. Cada colaborador vê apenas suas tarefas delegadas.

**P: Um gestor de setor pode delegar para outro setor?**
R: Não, a menos que seja Gestor Comercial ou Diretoria.

**P: Colaborador pode aprovar sua própria tarefa?**
R: Não. Precisa aprovação do gestor.

**P: Pode ter vários supervisores?**
R: Não. Cada colaborador tem apenas um supervisor_id.

**P: MOBRA pode logar no sistema?**
R: Não. MOBRA não tem acesso. Presença é registrada externamente.

**P: Gestor Comercial é mais importante que outros gestores?**
R: Hierarquicamente sim - tem mais responsabilidades (pode delegar para todos). Mas todos são gestores (Nível 3).

**P: Como funciona a auditoria?**
R: Toda ação sensível é registrada em `auditoria_acoes` com: quem fez, o quê fez, quando e detalhes.

**P: Posso mudar o role de um usuário?**
R: Sim, apenas DIRETORIA pode mudar (futuramente).

---

## 🔗 LIGAÇÕES RÁPIDAS

**Documentos Relacionados:**
- 📘 [ARQUITETURA_USUARIOS_E_PERMISSOES.md](./ARQUITETURA_USUARIOS_E_PERMISSOES.md) - Especificação completa
- 📊 [DIAGRAMA_HIERARQUIA_VISUAL.md](./DIAGRAMA_HIERARQUIA_VISUAL.md) - Diagramas visuais

**Arquivos do Código:**
- `src/lib/types.ts` - Tipos TypeScript
- `src/lib/auth-utils.ts` - Utilitários de permissão (criar)
- `src/hooks/usePermissoes.ts` - Hook de permissões (criar)
- `src/components/admin/seed-usuarios-page.tsx` - Seed de usuários
- `src/supabase/migrations/` - Scripts SQL

---

**Última Atualização**: 14/11/2025
**Versão**: 2.0 - Guia Rápido Completo
**Status**: Pronto para Referência
