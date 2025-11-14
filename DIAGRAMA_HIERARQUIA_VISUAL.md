# DIAGRAMAS VISUAIS - HIERARQUIA E PERMISSÕES
## ERP Minerva Engenharia

---

## 1. ÁRVORE HIERÁRQUICA ORGANIZACIONAL

```
                          ┌─────────────────┐
                          │   DIRETORIA     │
                          │ Nível 4 - Admin │
                          │ Acesso Total    │
                          └────────┬────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
        ┌───────────▼──────────┐   │   ┌──────────▼──────────┐
        │  GESTOR COMERCIAL    │   │   │   GESTOR ADM        │
        │  (Nível 3)           │   │   │   (Nível 3)         │
        │  Setor: COM          │   │   │   Setor: ADM        │
        │  Acesso: Admin+Fin   │   │   │   Acesso: Cruzado   │
        └────────┬─────────────┘   │   └──────────┬──────────┘
                 │                 │              │
         ┌───────┴────────┐        │        ┌─────┴──────┐
         │                │        │        │            │
    ┌────▼─────────┐ ┌────▼──────────────┐ ┌─▼──────┐ ┌──▼──────┐
    │Colab COM 1   │ │ GESTOR ASS        │ │Colab   │ │Colab    │
    │Nível 2       │ │ GESTOR OBR        │ │ADM 1   │ │ADM 2    │
    │Setor: COM    │ │ Nível 3           │ │Nível 2 │ │Nível 2  │
    └──────────────┘ │ Acesso: Setorial  │ └────────┘ └─────────┘
                     │                   │
                     └────┬──────────┬───┘
                          │          │
                  ┌───────┴───┐  ┌───┴────────┐
                  │           │  │            │
           ┌──────▼──────┐  ┌─▼───────────┐ ┌─▼──────────┐
           │Colab ASS 1  │  │Colab OBR 1  │ │Colab OBR 2 │
           │Nível 2      │  │Nível 2      │ │Nível 2     │
           │Setor: ASS   │  │Setor: OBR   │ │Setor: OBR  │
           └─────────────┘  └─────────────┘ └────────────┘

          ┌──────────────────────────────────────────┐
          │  MOBRA (Nível 1) - Sem Acesso ao Sistema │
          │  • Serventes, Oficiais, Meio-Oficiais   │
          │  • Presença registrada manualmente       │
          │  • Rateado por Centros de Custo          │
          └──────────────────────────────────────────┘
```

---

## 2. MAPA DE ACESSIBILIDADE E MÓDULOS

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        MÓDULOS DO SISTEMA                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────┐    ┌──────────────┐   ┌────────────┐    ┌──────────────┐   │
│  │ Cadastros   │    │ Operacional  │   │Financeiro  │    │ RH & Admin   │   │
│  │             │    │              │   │            │    │              │   │
│  │ • OS        │    │ • OS         │   │ • Receitas │    │ • Usuários   │   │
│  │ • Leads     │    │ • Follow-up  │   │ • Despesas │    │ • Presença   │   │
│  │ • Clientes  │    │ • Laudos     │   │ • Relatórios   │ • Folha      │   │
│  │ • Contatos  │    │ • Medições   │   │ • Conciliação  │ • Permissões │   │
│  │             │    │ • Checklist  │   │            │    │              │   │
│  └─────────────┘    └──────────────┘   └────────────┘    └──────────────┘   │
│         ▲                   ▲                  ▲                  ▲           │
│         │                   │                  │                  │           │
│         ├─────────┬─────────┼──────────┬───────┼──────────┬───────┤           │
│         │         │         │          │       │          │       │           │
│         │         │         │          │       │          │       │           │
│       ALL        ALL       ALL        ALL     DIRETORIA  DIRETORIA           │
│     ╱DIR╲      ╱DIR╲     ╱DIR╲      ╱DIR╲   GESTOR_COM GESTOR_ADM           │
│    ╱  │  ╲    ╱  │  ╲   ╱  │  ╲    ╱  │  ╲   DIRETORIA DIRETORIA           │
│   ╱   │   ╲  ╱   │   ╲ ╱   │   ╲  ╱   │   ╲  GESTOR_*  GESTOR_*            │
│  ╱ COM├─ASS┼─OBR─┤ADM ╲ COM├─ASS┼─OBR─┤ADM  ╲                                │
│ ╱     │   ╱ ╲   │   ╱  ╲   │   ╱ ╲   │   ╱   (Colaboradores: Nenhum)        │
│ ACESSO OPERACIONAL      ACESSO FINANCEIRO    ACESSO ADMIN                   │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘

LEGENDA:
DIR        = DIRETORIA
COM/ASS/OBR/ADM = Setores específicos
ALL        = Todos têm acesso
GESTOR_*   = Gestores do setor específico
(vazio)    = Sem acesso
```

---

## 3. MATRIZ DE DELEGAÇÃO

```
                    PODE DELEGAR PARA:

DE ↓ PARA →     COM         ASS         OBR         ADM         LAB         ENG

DIRETORIA       ✅ Todos    ✅ Todos    ✅ Todos    ✅ Todos    ✅ Todos    ✅ Todos

GESTOR_COM      ✅ Todos    ✅ Todos    ✅ Todos    ✅ Todos    ✅ Todos    ✅ Todos

GESTOR_ASS      ❌          ✅ Seu Setor ❌          ❌          ❌          ❌

GESTOR_OBR      ❌          ❌          ✅ Seu Setor ❌          ❌          ❌

GESTOR_ADM      ✅ Todos    ✅ Todos    ✅ Todos    ✅ Seu Setor ✅ Todos    ✅ Todos

COLABORADOR_*   ❌          ❌          ❌          ❌          ❌          ❌

MOBRA           ❌          ❌          ❌          ❌          ❌          ❌

LEGENDA:
✅ Todos   = Pode delegar para qualquer colaborador do setor
✅ Seu Setor = Pode delegar apenas para colaboradores de seu setor
❌ = NÃO pode delegar
```

---

## 4. MATRIZ DE APROVAÇÃO

```
                    PODE APROVAR TAREFAS DE:

QUEM APROVA ↓   COM         ASS         OBR         ADM         LAB         ENG

DIRETORIA       ✅ Todas    ✅ Todas    ✅ Todas    ✅ Todas    ✅ Todas    ✅ Todas

GESTOR_COM      ✅ Todas    ❌          ❌          ❌          ❌          ❌

GESTOR_ASS      ❌          ✅ Todas    ❌          ❌          ❌          ❌

GESTOR_OBR      ❌          ❌          ✅ Todas    ❌          ❌          ❌

GESTOR_ADM      ❌          ❌          ❌          ✅ Suas      ❌          ❌

COLABORADOR_*   ❌          ❌          ❌          ❌          ❌          ❌

MOBRA           ❌          ❌          ❌          ❌          ❌          ❌

LEGENDA:
✅ Todas = Pode aprovar todas as tarefas do setor
✅ Suas  = Pode aprovar apenas as tarefas de seus colaboradores
❌ = NÃO pode aprovar
```

---

## 5. FLUXO DE EXECUÇÃO E APROVAÇÃO DE TAREFA

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CICLO DE VIDA DE UMA TAREFA                         │
└─────────────────────────────────────────────────────────────────────────────┘

1️⃣  CRIAÇÃO/DELEGAÇÃO
    ┌────────────────────────────────────────────────────┐
    │ Quem pode delegar:                                 │
    │ • DIRETORIA       → Para qualquer um              │
    │ • GESTOR_COM      → Para qualquer setor           │
    │ • GESTOR_*        → Para seu setor apenas         │
    │ • COLABORADOR     → NÃO PODE                      │
    │                                                    │
    │ Resultado: Tarefa criada em "PENDENTE"            │
    └────────────────────────────────────────────────────┘
                           ⬇️
2️⃣  EXECUÇÃO
    ┌────────────────────────────────────────────────────┐
    │ Colaborador:                                       │
    │ • Recebe notificação                              │
    │ • Começa a executar                               │
    │ • Preenche Follow-up, Laudo, Medição, etc.        │
    │                                                    │
    │ Status da tarefa: "EM_PROGRESSO"                  │
    └────────────────────────────────────────────────────┘
                           ⬇️
3️⃣  SUBMISSÃO PARA APROVAÇÃO
    ┌────────────────────────────────────────────────────┐
    │ Colaborador:                                       │
    │ • Marca tarefa como "Pronto para Aprovação"       │
    │ • Sistema notifica gestor/supervisor              │
    │                                                    │
    │ Status da tarefa: "AGUARDANDO_APROVAÇÃO"          │
    └────────────────────────────────────────────────────┘
                           ⬇️
4️⃣  APROVAÇÃO
    ┌────────────────────────────────────────────────────┐
    │ Gestor/Supervisor:                                 │
    │ • Acessa "Tarefas Pendentes"                       │
    │ • Revisa execução                                  │
    │ • Pode: APROVAR ou REJEITAR                        │
    │                                                    │
    │ ✅ APROVAR → Tarefa "CONCLUÍDA"                    │
    │             → Liberado para faturamento            │
    │             → Registra em auditoria                │
    │                                                    │
    │ ❌ REJEITAR → Volta para "EM_PROGRESSO"            │
    │              → Feedback enviado ao colaborador     │
    │              → Colaborador revisa e resubmete      │
    └────────────────────────────────────────────────────┘
                           ⬇️
5️⃣  PÓS-APROVAÇÃO
    ┌────────────────────────────────────────────────────┐
    │ Sistema:                                           │
    │ • Marca como concluída                             │
    │ • Gera recibos/relatórios                          │
    │ • Disponibiliza para faturamento                   │
    │ • Atualiza dashboard                               │
    │ • Registra em auditoria                            │
    │                                                    │
    │ Status da tarefa: "CONCLUÍDA"                      │
    └────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  CASO ESPECIAL: REABERTURA (DIRETORIA APENAS)                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Diretoria pode reabrir OS/Tarefa marcada como "CONCLUÍDA"            │  │
│  │ • Requer justificativa obrigatória                                   │  │
│  │ • Volta para colaborador fazer revisão                               │  │
│  │ • Registra em auditoria com motivo                                   │  │
│  │ • Gestor é notificado da reabertura                                  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. ESTRUTURA DE DADOS - RELACIONAMENTOS

```
                         ┌──────────────────┐
                         │   auth.users     │
                         │  (Supabase)      │
                         │ ┌──────────────┐ │
                         │ │ id (UUID)    │ │
                         │ │ email        │ │
                         │ │ senha        │ │
                         │ │ metadata     │ │
                         │ └──────────────┘ │
                         └────────┬─────────┘
                                  │ 1:1
                                  │
                    ┌─────────────▼──────────────┐
                    │   colaboradores            │
                    │ (Nova estrutura completa)  │
                    │ ┌─────────────────────────┐│
                    │ │ id (FK auth.users)      ││
                    │ │ nome_completo           ││
                    │ │ email                   ││
                    │ │ role_nivel (ENUM)       ││
                    │ │ setor (ENUM)            ││
                    │ │ supervisor_id (FK self) ││
                    │ │ status_colaborador      ││
                    │ │ data_admissao           ││
                    │ │ telefone                ││
                    │ │ cpf                     ││
                    │ │ endereco                ││
                    │ │ data_criacao            ││
                    │ │ data_atualizacao        ││
                    │ └─────────────────────────┘│
                    └─────────────┬──────────────┘
                                  │
                      ┌───────────┼───────────┐
                      │           │           │
                   1:N │        1:N │        1:N │
                      │           │           │
         ┌────────────▼──┐ ┌──────▼──────┐ ┌──▼──────────────┐
         │ delegacoes    │ │ aprovacoes  │ │ auditoria_acoes │
         ├───────────────┤ ├─────────────┤ ├─────────────────┤
         │ id            │ │ id          │ │ id              │
         │ os_id         │ │delegacao_id │ │ usuario_id      │
         │delegante_id   │ │responsável_ │ │ acao            │
         │delegado_id    │ │id           │ │ entidade_tipo   │
         │os_id          │ │status_aprova│ │ entidade_id     │
         │status_delegaçã│ │observações  │ │ detalhes_antes  │
         │prazo          │ │data_aprovado│ │ detalhes_depois │
         │descrição      │ │data_criação │ │ ip_origem       │
         │data_delegaçã  │ └─────────────┘ │ data_acao       │
         └───────────────┘                 └─────────────────┘
                      │
                      │ 1:N
                      │
         ┌────────────▼────────────────────────┐
         │   ordens_servico (alterada)         │
         ├────────────────────────────────────┤
         │ id                                  │
         │ tipo_os_id (FK tipos_os)           │
         │ cliente_id (FK clientes)           │
         │ responsavel_id (FK colaboradores)  │
         │ delegado_por_id (FK colaboradores) │
         │ delegada_para_id (FK colaboradores)│
         │ data_delegacao                      │
         │ requer_aprovacao                    │
         │ aprovado_por_id (FK colaboradores) │
         │ data_aprovacao                      │
         │ justificativa_reabertura            │
         │ data_reabertura                     │
         │ reaberida_por_id (FK colaboradores)│
         │ status_aprovacao                    │
         │ ... (outros campos originais)      │
         └────────────────────────────────────┘
```

---

## 7. VISÃO OPERACIONAL: O QUE CADA ROLE VÊ

```
╔════════════════════════════════════════════════════════════════════════════╗
║                              DIRETORIA                                     ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║ DASHBOARD:                                                                 ║
║ • Todas as OS (filtráveis por setor)                                      ║
║ • Todas as tarefas em andamento                                           ║
║ • Todas as aprovações pendentes                                           ║
║ • Relatórios consolidados por setor                                       ║
║ • Análise de custos vs receitas                                           ║
║ • Performance de gestores e colaboradores                                 ║
║                                                                            ║
║ AÇÕES DISPONÍVEIS:                                                         ║
║ ✅ Criar OS | ✅ Editar OS | ✅ Delegar para qualquer um                  ║
║ ✅ Aprovar tarefas | ✅ Reabrir OS concluídas                             ║
║ ✅ Gerenciar usuários | ✅ Ver auditoria completa                         ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        GESTOR COMERCIAL                                    ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║ DASHBOARD:                                                                 ║
║ • Todas as OS (todos os setores)                                          ║
║ • Leads e clientes                                                         ║
║ • Dados financeiros (receitas, despesas)                                  ║
║ • Conciliação bancária                                                     ║
║ • Vistorias agendadas                                                      ║
║ • Relatórios comerciais                                                    ║
║                                                                            ║
║ AÇÕES DISPONÍVEIS:                                                         ║
║ ✅ Criar OS | ✅ Delegar para qualquer setor                              ║
║ ✅ Aprovar tarefas de COM | ✅ Agendar vistorias                          ║
║ ✅ Registrar presença comercial | ✅ Gerenciar disponibilidade            ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                      GESTOR DE SETOR (ASS/OBR)                            ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║ DASHBOARD:                                                                 ║
║ • OS de seu setor apenas                                                  ║
║ • Equipe e presença do setor                                              ║
║ • Tarefas pendentes de aprovação                                          ║
║ • Performance da equipe                                                    ║
║ • Disponibilidade do setor                                                ║
║ • Relatórios do setor                                                      ║
║                                                                            ║
║ AÇÕES DISPONÍVEIS:                                                         ║
║ ✅ Delegar tarefas para seu setor                                         ║
║ ✅ Aprovar tarefas de seus colaboradores                                  ║
║ ✅ Gerenciar disponibilidade do setor                                     ║
║ ✅ Registrar presença | ❌ Delegar para outro setor                       ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                      GESTOR ADMINISTRATIVO                                 ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║ DASHBOARD:                                                                 ║
║ • Todas as OS (visão cruzada)                                             ║
║ • Coordenação entre setores                                               ║
║ • Relatórios de performance geral                                         ║
║ • Dados administrativos                                                    ║
║ • Gestão de recursos                                                       ║
║                                                                            ║
║ AÇÕES DISPONÍVEIS:                                                         ║
║ ✅ Delegar para qualquer setor                                            ║
║ ✅ Aprovar tarefas de ADM                                                 ║
║ ✅ Gerar relatórios consolidados                                          ║
║ ✅ Gerenciar recursos administrativos                                     ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                        COLABORADOR                                         ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║ DASHBOARD:                                                                 ║
║ • Apenas suas tarefas delegadas                                           ║
║ • Status de execução                                                       ║
║ • Tarefas em andamento                                                     ║
║ • Histórico de tarefas concluídas                                         ║
║ • Formulários para preencher (follow-up, laudo, etc.)                      ║
║                                                                            ║
║ AÇÕES DISPONÍVEIS:                                                         ║
║ ✅ Executar tarefas delegadas                                             ║
║ ✅ Preencher follow-up/laudo/medição                                      ║
║ ✅ Registrar sua presença                                                 ║
║ ❌ Delegar tarefas | ❌ Aprovar tarefas                                    ║
║ ❌ Ver dados de outros colaboradores                                       ║
║ ❌ Acessar dados financeiros                                              ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════╗
║                           MOBRA (Mão de Obra)                             ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║ ❌ NÃO TEM ACESSO AO SISTEMA                                              ║
║                                                                            ║
║ COMO É REGISTRADO:                                                         ║
║ • Presença diária (registrada manualmente/app externo)                    ║
║ • Rateado por Centro de Custo (CC)                                        ║
║ • Custos calculados automaticamente                                       ║
║ • Histórico mantido para auditoria                                        ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## 8. TABELA COMPARATIVA RÁPIDA

```
╔═════════════════════╦══════════╦═══════╦════════╦═══════════╦════════════╦═════════╗
║ CAPACIDADE          ║ DIR      ║ G.COM ║ G.SET  ║ G.ADM     ║ COLAB      ║ MOBRA   ║
╠═════════════════════╬══════════╬═══════╬════════╬═══════════╬════════════╬═════════╣
║ Criar OS            ║ ✅ Todas ║ ✅ All║ ✅ Seu ║ ✅ All    ║ ❌ Não    ║ ❌ Não  ║
║ Editar OS           ║ ✅ Todas ║ ✅ All║ ✅ Seu ║ ✅ All    ║ ❌ Não    ║ ❌ Não  ║
║ Delegar             ║ ✅ Any   ║ ✅ Any║ ✅ Seu ║ ✅ Any    ║ ❌ Não    ║ ❌ Não  ║
║ Ver dados financ.   ║ ✅ Sim   ║ ✅ Sim║ ❌ Não ║ ✅ Sim    ║ ❌ Não    ║ ❌ Não  ║
║ Aprovar tarefas     ║ ✅ Todas ║ ✅ COM║ ✅ Seu ║ ✅ ADM    ║ ❌ Não    ║ ❌ Não  ║
║ Executar tarefas    ║ ✅ Sim   ║ ✅ Sim║ ✅ Sim ║ ✅ Sim    ║ ✅ Suas   ║ ❌ Não  ║
║ Reabrir concluída   ║ ✅ Sim   ║ ❌ Não║ ❌ Não ║ ❌ Não    ║ ❌ Não    ║ ❌ Não  ║
║ Gerar relatórios    ║ ✅ Todos ║ ✅ COM║ ❌ Não ║ ✅ Geral  ║ ❌ Não    ║ ❌ Não  ║
║ Gerenciar usuários  ║ ✅ Sim   ║ ❌ Não║ ❌ Não ║ ❌ Não    ║ ❌ Não    ║ ❌ Não  ║
║ Ver auditoria       ║ ✅ Completa║ ❌   ║ ❌ Não ║ ❌ Não    ║ ❌ Não    ║ ❌ Não  ║
║ Acesso ao Sistema   ║ ✅ Total ║ ✅ Sim║ ✅ Sim ║ ✅ Sim    ║ ✅ Sim    ║ ❌ Não  ║
╚═════════════════════╩══════════╩═══════╩════════╩═══════════╩════════════╩═════════╝

LEGENDA:
✅ Sim         = Pode fazer
✅ Todas/All   = Pode fazer para todos
✅ Seu         = Pode fazer apenas para seu setor
✅ Suas        = Pode fazer apenas as suas
✅ Completa    = Pode ver tudo
❌ Não         = Não pode fazer
DIR            = DIRETORIA
G.COM          = GESTOR COMERCIAL
G.SET          = GESTOR DE SETOR
G.ADM          = GESTOR ADMINISTRATIVO
COLAB          = COLABORADOR
```

---

## 9. FLUXOGRAMA DECISÓRIO: "POSSO FAZER ISSO?"

```
                            ┌────────────────────────────┐
                            │ Estou autenticado?         │
                            └──────────┬─────────────────┘
                                       │ NÃO
                               ┌───────▼────────┐
                               │ ❌ ACESSO NEGADO│
                               │ Faça login     │
                               └────────────────┘
                                       │
                                     SIM
                                       │
                            ┌──────────▼──────────────┐
                            │ Qual é meu papel?       │
                            └──────────┬──────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
            ┌───────▼────┐    ┌────────▼────┐  ┌─────────▼────────┐
            │ DIRETORIA  │    │ GESTOR*     │  │ COLABORADOR/MOBRA│
            └───────┬────┘    └────────┬────┘  └─────────┬────────┘
                    │                  │                  │
            ┌───────▼───────┐  ┌───────▼────────┐ ┌──────▼──────────┐
            │ Acesso Total  │  │ Qual é minha   │ │ Minha atribuição │
            │               │  │ responsabilidad│ │ está nesta       │
            │ Posso fazer   │  │ de aprovação?  │ │ tarefa?          │
            │ QUALQUER      │  │                │ └──────┬──────────┘
            │ ação          │  └──────┬─────────┘        │
            │ ✅ Aprovado   │         │           ┌──────▼──┐
            │ (se aplicável)│  ┌──────▼────────┐  │  NÃO    │
            └───────────────┘  │ Meu setor     │  │❌ NEGADA│
                               │ inclui esta   │  └─────────┘
                               │ tarefa?       │
                               └──────┬────────┘
                                      │
                          ┌───────────┼───────────┐
                        SIM            NÃO
                          │             │
                    ┌─────▼──┐   ┌─────▼───┐
                    │✅ OK    │   │ ❌ NEGADA│
                    │Aproved  │   │ Fora do  │
                    └─────────┘   │ setor    │
                                  └──────────┘
```

---

## 10. ROADMAP DE IMPLEMENTAÇÃO VISUAL

```
SPRINT 1: ESTRUTURA BÁSICA
├─ [ ] Expandir tipos em types.ts
├─ [ ] Atualizar tabela colaboradores
├─ [ ] Criar tabelas de delegação e aprovação
└─ [ ] Seed com 15 usuários
    (⏱️ 1-2 semanas)

SPRINT 2: AUTENTICAÇÃO E AUTORIZAÇÃO
├─ [ ] Implementar PermissaoUtil
├─ [ ] Implementar RLS no Supabase
├─ [ ] Criar hook usePermissoes
└─ [ ] Testes de permissões
    (⏱️ 1-2 semanas)

SPRINT 3: UI E COMPONENTES
├─ [ ] Atualizar login para novo modelo
├─ [ ] Criar componente delegação
├─ [ ] Criar componente aprovação
├─ [ ] Criar dashboard customizado por role
└─ [ ] Testes de componentes
    (⏱️ 2 semanas)

SPRINT 4: FLUXOS AVANÇADOS
├─ [ ] Reabertura de OS (Diretoria)
├─ [ ] Notificações de aprovação
├─ [ ] Rastreamento de hierarquia
├─ [ ] Testes E2E
└─ [ ] Documentação
    (⏱️ 2 semanas)

TOTAL: ~8 semanas para MVP completo
```

---

## 11. COMPARAÇÃO: ANTES vs DEPOIS

```
╔══════════════════════════════════════════════════════════════════════════╗
║                            ANTES (ATUAL)                                 ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║ Papéis: 4 (DIRETORIA, GESTOR_ADM, GESTOR, COLABORADOR)                 ║
║ Setores: 4 (OBRAS, ASSESSORIA, LABORATORIO, ADM)                       ║
║ Usuários: ~5                                                             ║
║ RLS: Apenas Frontend (inseguro)                                         ║
║ Delegação: Não existe                                                    ║
║ Aprovação: Não existe                                                    ║
║ Auditoria: Limitada                                                      ║
║ MOBRA: Não implementado                                                 ║
║ Hierarquia: Não rastreada                                               ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════════════╗
║                            DEPOIS (PROPOSTO)                             ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║ Papéis: 10 (DIRETORIA, 4 GESTORES, 4 COLABORADORES, MOBRA)             ║
║ Setores: 6 (COM, ASS, OBR, LAB, ADM, ENG)                              ║
║ Usuários: ~15 (seed inicial)                                            ║
║ RLS: Frontend + Backend (PostgreSQL RLS)                                ║
║ Delegação: Completa com rastreamento                                    ║
║ Aprovação: Multi-nível com workflow                                     ║
║ Auditoria: Completa de todas as ações                                   ║
║ MOBRA: Totalmente implementado                                          ║
║ Hierarquia: Rastreada e validada                                        ║
║ Segurança: Conformidade corporativa                                     ║
║ Escalabilidade: Pronta para crescimento                                 ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 12. ESTATÍSTICAS E MÉTRICAS

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ESTRUTURA PROPOSTA - RESUMO                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Números:                                                               │
│  • Níveis Hierárquicos:        4 (MOBRA, COLAB, GESTOR, DIRETORIA)     │
│  • Total de Papéis/Roles:      10 (distintos)                           │
│  • Setores:                    6 (COM, ASS, OBR, LAB, ADM, ENG)        │
│  • Usuários Seed Iniciais:     15 (distribuídos por role)              │
│  • Tabelas Novas:              4 (delegações, aprovações, etc.)        │
│  • Tabelas Alteradas:          2 (colaboradores, ordens_servico)       │
│  • Tipos TypeScript:           10+ (novos/alterados)                   │
│  • Utilitários de Permissão:   1 (PermissaoUtil com 7+ métodos)        │
│  • Hooks React:                1 (usePermissoes)                        │
│                                                                         │
│  Funcionalidades:                                                       │
│  • Delegação de tarefas:       ✅ Sim (rastreada)                      │
│  • Aprovação em cascata:       ✅ Sim (multi-nível)                    │
│  • Auditoria completa:         ✅ Sim (todas as ações)                 │
│  • RLS banco de dados:         ✅ Sim (PostgreSQL)                     │
│  • Reabertura com justif.:     ✅ Sim (Diretoria)                      │
│  • MOBRA (sem sistema):        ✅ Sim (registrado externamente)        │
│  • Rastreamento hierarquia:    ✅ Sim (supervisor_id)                  │
│  • Controle granular módulos:  ✅ Sim (por role/setor)                 │
│                                                                         │
│  Segurança:                                                             │
│  • Autenticação:               Supabase Auth + Validação               │
│  • Autorização:                RBAC (Role-Based Access Control)        │
│  • Nível Backend:              ✅ RLS PostgreSQL                        │
│  • Nível Frontend:             ✅ Filtros + UI condicional             │
│  • Auditoria:                  ✅ Tabela auditoria_acoes               │
│  • Validação de delegação:     ✅ Regras de negócio no servidor        │
│                                                                         │
│  Conformidade:                                                          │
│  • Hierarquia organizacional:  ✅ Alinhada com Minerva                 │
│  • Fluxo de aprovação:         ✅ Validado com requisitos              │
│  • Rastreabilidade:            ✅ 100% auditável                       │
│  • Documentação:               ✅ Completa em markdown                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

**Documento Visual - Diagrama Hierárquico**
**Versão**: 2.0
**Status**: Pronto para Apresentação
**Data**: 14/11/2025
