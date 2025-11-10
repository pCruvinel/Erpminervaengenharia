# Fluxo de Execução OS 01-04 (16 Etapas)

## Visão Geral

As Ordens de Serviço 01-04 seguem um fluxo especial diferenciado, voltado para **prospecção e conversão de leads** em contratos de obra. Estas OS incluem:

- **OS 01**: Perícia de Fachada
- **OS 02**: Revitalização de Fachada
- **OS 03**: Reforço Estrutural
- **OS 04**: Outros

**Diferencial**: Enquanto as OS 05-13 trabalham com campo "Cliente" (cliente já convertido), as OS 01-04 possuem etapas específicas de **seleção/cadastro de Lead** e **fluxo de conversão** (follow-ups, visitas técnicas, proposta comercial, contrato).

---

## Estrutura Técnica

### Stack
- **Next.js 14** + **Tailwind CSS v3** + **shadcn/ui** + **Lucide React**
- **Minerva Design System v1.0**
- Paleta de cores:
  - Primary: `#06b6d4` (cyan)
  - Secondary: `#f97316` (laranja)
  - Dourado: `#D3AF37` (primary brand)
  - Dourado Claro: `#DDC063` (secondary brand)

### Navegação
Ao criar uma OS 01-04, o usuário é redirecionado para:
```
/os/[id]/workflow
```

Esta página exibe o **stepper horizontal** com 16 etapas e renderiza dinamicamente o conteúdo de cada etapa.

---

## Fluxo de Etapas Detalhado

### 🔹 Etapa 1: Identificação do Cliente/Lead

**Responsável**: Coordenador ADM  
**Objetivo**: Associar a OS a um lead existente ou criar um novo lead  
**Status Inicial da OS**: `Em Triagem`

#### Interface

A tela exibe duas seções principais:

**Seção A: Selecionar Lead Existente**
- **Componente**: `Combobox` (shadcn/ui Command + Popover)
- **Busca Inteligente**: Por Nome, CPF ou CNPJ
- **Dados exibidos no preview**:
  - Nome / Razão Social
  - CPF/CNPJ
  - Tipo de Edificação
  - Endereço completo
  - Telefone
  - Email

**Seção B: Criar Novo Lead**
- **Botão**: `Button` variant `secondary`, cor `#f97316`
- **Label**: "Criar Novo Lead"
- **Ação**: Abre um `Dialog` (shadcn/ui) com formulário completo

---

#### 📋 Formulário "Cadastrar Novo Lead" (Dialog)

##### Bloco 1: Identificação

| Campo | Tipo | Obrigatório | Máscara | Placeholder |
|-------|------|-------------|---------|-------------|
| Nome / Razão Social | `Input` | ✅ | — | Digite o nome completo ou razão social |
| CNPJ / CPF | `Input` | ✅ | ✅ (`000.000.000-00` ou `00.000.000/0001-00`) | CPF ou CNPJ |
| Nome do Responsável | `Input` | ❌ | — | Nome do contato principal |
| Cargo do Responsável | `Input` | ❌ | — | Ex: Síndico, Gerente, Proprietário |
| Telefone / WhatsApp | `Input` | ✅ | ✅ (`(00) 00000-0000`) | Telefone com DDD |
| Email | `Input` (type=email) | ✅ | — | email@exemplo.com |

##### Bloco 2: Dados da Edificação

| Campo | Tipo | Obrigatório | Lógica Condicional | Opções |
|-------|------|-------------|--------------------|--------|
| **Tipo de Edificação** | `Select` | ✅ | — | Condomínio Residencial - Apartamentos<br>Condomínio Residencial - Casas<br>Condomínio Comercial<br>Hotel<br>Shopping<br>Hospital<br>Indústria<br>Igreja<br>Outro |
| **Qtd. Unidades Autônomas** | `Input` (type=number) | ⚠️ | **Exibido apenas se**:<br>- Condomínio Comercial<br>- Condomínio Residencial - Casas<br>- Condomínio Residencial - Apartamentos | — |
| **Qtd. Blocos** | `Input` (type=number) | ⚠️ | **Exibido apenas se**:<br>- Condomínio Residencial - Apartamentos | — |
| **Qtd. de Pavimentação** | `Input` (type=number) | ❌ | — | Ex: 8 |
| **Tipo de Telhado** | `Select` | ✅ | — | Laje impermeabilizada<br>Telhado cerâmico<br>Telhado fibrocimento<br>Telhado metálico<br>Não se aplica<br>Outros |
| **Possui Elevador?** | `Switch` | ❌ | — | Sim / Não |
| **Possui Piscina?** | `Switch` | ❌ | — | Sim / Não |

##### Bloco 3: Endereço (Integração ViaCEP)

| Campo | Tipo | Obrigatório | API | Placeholder |
|-------|------|-------------|-----|-------------|
| **CEP** | `Input` | ✅ | ✅ ViaCEP | 00000-000 |
| **Endereço (Rua)** | `Input` | ✅ | Auto-preenchido | Rua, Avenida... |
| **Bairro** | `Input` | ✅ | Auto-preenchido | — |
| **Cidade** | `Input` | ✅ | Auto-preenchido | — |
| **Estado** | `Input` | ✅ | Auto-preenchido | UF |
| **Número** | `Input` | ✅ | — | Nº do imóvel |
| **Complemento** | `Input` | ❌ | — | Apto, Bloco, Sala... |

##### Ações do Dialog
- **Botão Primário**: "Salvar Lead" (cor `#06b6d4`)
- **Botão Secundário**: "Cancelar" (variant `outline`)

---

### 🔹 Etapa 2: Seleção do Tipo de OS

**Responsável**: Coordenador ADM  
**Objetivo**: Definir qual tipo de OS será executada

#### Formulário

| Campo | Tipo | Obrigatório | Opções |
|-------|------|-------------|--------|
| **Selecione o Tipo de OS** | `Select` | ✅ | OS 01: Perícia de Fachada<br>OS 02: Revitalização de Fachada<br>OS 03: Reforço Estrutural<br>OS 04: Outros |

**Lógica**:
- Ao salvar, a OS é formalmente criada com `status: 'Em Triagem'`
- O tipo de OS é armazenado em `os.tipo_os`
- O fluxo avança para a Etapa 3

---

### 🔹 Etapa 3: Follow-up 1 (Entrevista Inicial)

**Responsável**: Coordenador ADM  
**Objetivo**: Levantar informações iniciais com o lead/cliente

#### Formulário (salvo em `os_etapas.dados_etapa`)

| # | Campo | Tipo | Obrigatório | Opções/Descrição |
|---|-------|------|-------------|------------------|
| 1 | **Qual a idade da edificação?** | `Select` | ✅ | Ainda não foi entregue<br>0 a 3 anos<br>3 a 5 anos<br>5 a 10 anos<br>10 a 20 anos<br>Acima de 20 anos |
| 2 | **Qual o motivo fez você nos procurar? Quais problemas existentes?** | `Textarea` | ✅ | — |
| 3 | **Quando aconteceu? Há quanto tempo vem acontecendo?** | `Textarea` | ✅ | — |
| 4 | **O que já foi feito a respeito disso?** | `Textarea` | ❌ | — |
| 5 | **Existe um escopo de serviços ou laudo com diagnóstico do problema?** | `Textarea` | ❌ | — |
| 6 | **Existe previsão orçamentária para este serviço? Ou você precisa de parâmetro para taxa extra?** | `Textarea` | ❌ | — |
| 7 | **Qual o grau de urgência para executar esse serviço?** | `Select` | ✅ | 30 dias<br>3 meses<br>6 meses ou mais |
| 8 | **Nossas propostas são apresentadas, nós não enviamos orçamento. Você concorda? Deseja que faça o orçamento? Se sim, qual dia e horário sugeridos para apresentação da proposta comercial dessa visita técnica?** | `Textarea` | ✅ | — |
| 9 | **Nome (Contato no Local)** | `Input` | ✅ | — |
| 10 | **Contato (Telefone)** | `Input` | ✅ | Máscara: `(00) 00000-0000` |
| 11 | **Cargo (Contato no Local)** | `Input` | ❌ | — |

#### Upload de Arquivos
- **Componente**: Upload múltiplo
- **Tipos aceitos**: `.pdf`, `.jpg`, `.png`, `.docx`, `.xlsx`
- **Descrição**: "Anexar Arquivos (escopo, laudo, fotos)"
- **Campo adicional por arquivo**: Input "Adicionar comentário..." (opcional)

---

### 🔹 Etapa 4: Agendar Visita Técnica

**Responsável**: Coordenador ADM  
**Objetivo**: Agendar a primeira visita técnica ao local

#### Interface

- **Botão**: "Agendar no Calendário" (cor `#f97316`, variant `secondary`)
- **Ação**: Abre modal/integração com módulo de Agendamento (a ser implementado)
- **Dados salvos**: Data, hora, responsável pela visita

---

### 🔹 Etapa 5: Realizar Visita

**Responsável**: Coordenador de Obras (ou Delegado)  
**Objetivo**: Confirmar a realização da visita técnica

#### Interface

- **Componente**: `Checkbox` ou `Button`
- **Label**: "Confirmar Realização da Visita"
- **Dados salvos**: Data/hora de confirmação, usuário que confirmou

---

### 🔹 Etapa 6: Follow-up 2 (Pós-Visita)

**Responsável**: Coordenador de Obras (ou Delegado)  
**Objetivo**: Documentar informações técnicas coletadas durante a visita

#### Formulário dividido em 3 Momentos

##### 📍 Momento 1: Durante a Visita (Checklist)

| # | Campo | Tipo | Obrigatório | Opções |
|---|-------|------|-------------|--------|
| 1 | **A visita foi acompanhada?** | `Select` | ✅ | Sim, pelo síndico(a)<br>Sim, pelo zelador(a)<br>Sim, pelo porteiro(a)<br>Sim, por um morador(a)<br>Não |
| 2 | **A equipe de limpeza estava ciente da visita?** | `Switch` | ✅ | Sim / Não |
| 3 | **Qual o local da visita?** | `Select` | ✅ | Fachada Principal<br>Fachada Lateral<br>Fachada Fundos<br>Garagem<br>Outros |
| 4 | **Qual o estado do sistema de ancoragem?** | `Select` | ✅ | Bom<br>Regular<br>Ruim<br>Inexistente |
| 5 | **Anexar fotos do sistema de ancoragem** | Upload múltiplo | ❌ | Com campo de comentário por arquivo |
| 6 | **O sistema de ancoragem atende a NR-35 e NR-18?** | `Select` | ✅ | Sim<br>Não<br>Não se aplica |
| 7 | **Quais os EPIs necessários?** | `Textarea` | ✅ | — |
| 8 | **Qual o tipo de equipamento para execução?** | `Select` | ✅ | Andaimes<br>Cadeirinha<br>Balança<br>Plataforma elevatória<br>Outros |

##### 📍 Momento 2: Avaliação Geral da Visita

| # | Campo | Tipo | Obrigatório | Opções |
|---|-------|------|-------------|--------|
| 9 | **Quem acompanhou a visita?** | `Textarea` | ✅ | Descrição completa |
| 10 | **Avaliação da Visita** | `Radio Group` | ✅ | Produtiva, cliente muito interessado<br>Pouco produtiva<br>Improdutiva |

##### 📍 Momento 3: Respostas do Engenheiro

| # | Campo | Tipo | Obrigatório | Opções |
|---|-------|------|-------------|--------|
| 11 | **Qual o estado geral da edificação (Condições encontradas)?** | `Textarea` | ✅ | — |
| 12 | **Qual o serviço deve ser feito para resolver o problema?** | `Textarea` | ✅ | — |
| 13 | **Anexar Arquivos (Fotos gerais, croquis, etc)** | Upload múltiplo | ❌ | Com campo de comentário por arquivo |

---

### 🔹 Etapa 7: Fazer Memorial (Upload)

**Responsável**: Coordenador de Obras (ou Delegado)  
**Objetivo**: Upload do Memorial Descritivo de Custos

#### Interface

- **Componente**: Upload de arquivo único
- **Tipos aceitos**: `.xlsx`, `.docx`, `.pdf`
- **Descrição**: "Fazer upload do Memorial Descritivo de Custos"
- **Observação**: Esta etapa é opcional, já que a Etapa 8 digitaliza o memorial

---

### 🔹 Etapa 8: Formulário Memorial (Escopo e Prazos)

**Responsável**: Coordenador de Obras (ou Delegado)  
**Objetivo**: Digitalizar o escopo técnico e prazos do memorial

#### Formulário (salvo em `os_etapas.dados_etapa`)

##### 1. Objetivo

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| **Objetivo da contratação do serviço?** | `Textarea` | ✅ |

##### 2. Etapas da Especificação Técnica (Componente Dinâmico)

**Estrutura hierárquica**:
```
Etapa Principal 1
  ├─ Sub-etapa 1.1 | m² | Dias úteis | Total R$
  ├─ Sub-etapa 1.2 | m² | Dias úteis | Total R$
  └─ ...
Etapa Principal 2
  ├─ Sub-etapa 2.1 | m² | Dias úteis | Total R$
  └─ ...
```

**Componentes**:
- **Botão**: "Adicionar Etapa Principal" (variant `outline`, cor `#06b6d4`)
  - Adiciona grupo com:
    - **Input**: "Nome da Etapa" (Ex: "1. Tratamento de Fachada")
    - **Botão**: "Adicionar Sub-etapa" (variant `ghost`, size `sm`)
      - Adiciona linha (`grid grid-cols-4 gap-2`) com campos:
        - **Input**: "Sub-etapa"
        - **Input** (type=number): "m²"
        - **Input** (type=number): "Execução (dias úteis)"
        - **Input** (type=number, currency): "Total R$"

##### 3. Prazo (Dias Úteis)

| Campo | Tipo | Cálculo Automático | Obrigatório |
|-------|------|-------------------|-------------|
| **Planejamento inicial (dias úteis)** | `Input` (number) | ❌ | ✅ |
| **Logística e transporte de materiais (dias úteis)** | `Input` (number) | ❌ | ✅ |
| **Preparação de área de trabalho (dias úteis)** | `Input` (number) | ❌ | ✅ |
| **Execução de obra (dias úteis)** | `Input` (number, disabled) | ✅ Soma de todos os "Execução (dias úteis)" das Sub-etapas | — |

---

### 🔹 Etapa 9: Precificação (Formulário Financeiro)

**Responsável**: Coordenador de Obras (ou Delegado)  
**Objetivo**: Definir a precificação final com base nos custos

#### Formulário (salvo em `os_etapas.dados_etapa`)

##### Bloco 1: Custo Base

| Campo | Tipo | Cálculo Automático |
|-------|------|--------------------|
| **Custo Base (Memorial)** | `Input` (currency, disabled) | ✅ Soma de todos os "Total R$" das Sub-etapas da Etapa 8 |

##### Bloco 2: Percentuais e Valor Total

| Campo | Tipo | Cálculo |
|-------|------|---------|
| **% Imprevisto** | `Input` (number) | — |
| **% Lucro** | `Input` (number) | — |
| **% Imposto** | `Input` (number) | — |
| **Valor Atual (Valor Total da Proposta)** | `Input` (currency, disabled) | `Custo Base × (1 + %Imprev/100 + %Lucro/100 + %Imposto/100)` |

##### Bloco 3: Condições de Pagamento

| Campo | Tipo | Cálculo |
|-------|------|---------|
| **% Entrada** | `Input` (number) | — |
| **Nº de Parcelas** | `Input` (number) | — |
| **Valor de Entrada (Calculado)** | `Input` (currency, disabled) | `Valor Atual × (% Entrada / 100)` |
| **Valor de Cada Parcela (Calculado)** | `Input` (currency, disabled) | `(Valor Atual - Valor de Entrada) / Nº de Parcelas` |

---

### 🔹 Etapa 10: Gerar Proposta Comercial

**Responsável**: Sistema / Coordenador ADM  
**Objetivo**: Gerar versão impressa da proposta comercial

#### Interface

- **Botão**: "Visualizar Proposta para Impressão" (cor `#06b6d4`)
- **Ação**: Navega para `/os/[id]/proposta-preview`
  - Página HTML formatada em A4
  - CSS `@media print` para impressão
  - Dados compilados das etapas anteriores
  - Opção `window.print()` para salvar como PDF

#### Feedback
- **Alert** (shadcn): "Esta etapa requer aprovação do Gestor ADM para ser finalizada."

---

### 🔹 Etapa 11: Agendar Visita (Apresentação)

**Responsável**: Coordenador ADM  
**Objetivo**: Agendar a apresentação da proposta comercial

#### Interface

- **Botão**: "Agendar no Calendário" (cor `#f97316`)
- **Ação**: Abre modal/integração com módulo de Agendamento

---

### 🔹 Etapa 12: Realizar Visita (Apresentação)

**Responsável**: Coordenador ADM  
**Objetivo**: Confirmar a realização da apresentação da proposta

#### Interface

- **Componente**: `Checkbox` ou `Button`
- **Label**: "Confirmar Realização da Apresentação"

---

### 🔹 Etapa 13: Follow-up 3 (Pós-Apresentação)

**Responsável**: Coordenador ADM  
**Objetivo**: Documentar a reação do cliente após a apresentação

#### Formulário dividido em 3 Momentos

##### 📍 Momento 1: Apresentação

| # | Campo | Tipo | Obrigatório |
|---|-------|------|-------------|
| 1 | **Qual a proposta apresentada?** | `Textarea` | ✅ |
| 2 | **Qual o método de apresentação?** | `Textarea` | ✅ |
| 3 | **O que o cliente achou da proposta?** | `Textarea` | ✅ |

##### 📍 Momento 2: Contrato e Dores

| # | Campo | Tipo | Obrigatório | Opções |
|---|-------|------|-------------|--------|
| 4 | **O que o cliente achou do contrato?** | `Textarea` | ✅ | — |
| 5 | **Quais as dores do cliente não atendidas?** | `Textarea` | ❌ | — |
| 6 | **Qual o indicador de fechamento da proposta?** | `Select` | ✅ | Fechado<br>Quente<br>Morno<br>Frio<br>Perdido |

##### 📍 Momento 3: Satisfação

| # | Campo | Tipo | Obrigatório | Opções |
|---|-------|------|-------------|--------|
| 7 | **Quem estava na apresentação?** | `Textarea` | ✅ | — |
| 8 | **Qual o nível de satisfação do cliente?** | `Radio Group` | ✅ | Produtiva, cliente interessado<br>Pouco produtiva<br>Improdutiva |

---

### 🔹 Etapa 14: Gerar Contrato (Upload)

**Responsável**: Coordenador ADM  
**Objetivo**: Download do modelo de contrato e upload da minuta preenchida

#### Interface

**Grid 2 colunas**:

**Coluna 1**:
- **Botão**: "Baixar Modelo de Contrato (.docx)" (variant `outline`, cor `#06b6d4`)
- **Ação**: Download de arquivo de modelo pré-armazenado

**Coluna 2**:
- **Upload**: "Fazer Upload da Minuta do Contrato"
- **Tipos aceitos**: `.docx`, `.pdf`

#### Feedback
- **Alert** (shadcn): "Esta etapa requer aprovação do Gestor ADM."

---

### 🔹 Etapa 15: Contrato Assinado (Check)

**Responsável**: Coordenador ADM  
**Objetivo**: Confirmar que o contrato foi assinado pelo cliente

#### Interface

- **Componente**: `Checkbox`
- **Label**: "Contrato Assinado pelo Cliente"
- **Validação**: Não permite avançar sem marcar

---

### 🔹 Etapa 16: Iniciar Contrato de Obra (Automático)

**Responsável**: Sistema  
**Objetivo**: Concluir a OS 01-04 e gerar automaticamente uma OS-13

#### Interface

- **Botão**: "Concluir OS e Gerar OS-13" (cor `#06b6d4`)
- **Ação**:
  1. Marca a OS atual como `status: 'Concluída'`
  2. Converte o Lead em Cliente (altera `status: 'cliente'` no banco)
  3. Cria automaticamente uma nova OS do tipo 13 (Obra Interna)
  4. Redireciona para a nova OS-13

---

## Tabelas de Banco de Dados Relacionadas

### Tabela: `leads`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| nome | VARCHAR | Nome/Razão Social |
| cpf_cnpj | VARCHAR | CPF ou CNPJ |
| tipo_pessoa | ENUM | fisica, juridica |
| tipo_edificacao | VARCHAR | Tipo selecionado no dropdown |
| qtd_unidades | INT | Quantidade de unidades autônomas |
| qtd_blocos | INT | Quantidade de blocos |
| qtd_pavimentos | INT | Quantidade de pavimentos |
| tipo_telhado | VARCHAR | Tipo de telhado |
| possui_elevador | BOOLEAN | — |
| possui_piscina | BOOLEAN | — |
| cep | VARCHAR | — |
| endereco | VARCHAR | — |
| numero | VARCHAR | — |
| complemento | VARCHAR | — |
| bairro | VARCHAR | — |
| cidade | VARCHAR | — |
| estado | VARCHAR | — |
| telefone | VARCHAR | — |
| email | VARCHAR | — |
| status | ENUM | 'lead', 'cliente' |

### Tabela: `os`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| numero_os | VARCHAR | Ex: OS-001 |
| tipo_os | VARCHAR | 'OS 01', 'OS 02', etc. |
| lead_id | UUID | FK para leads.id |
| status | ENUM | 'Em Triagem', 'Em Execução', 'Concluída', etc. |

### Tabela: `os_etapas`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | PK |
| os_id | UUID | FK para os.id |
| etapa_numero | INT | 1-16 |
| etapa_nome | VARCHAR | Ex: "Follow-up 1" |
| status | ENUM | 'pendente', 'em_andamento', 'concluida' |
| dados_etapa | JSONB | Dados do formulário da etapa |
| responsavel_id | UUID | FK para users.id |
| data_inicio | TIMESTAMP | — |
| data_conclusao | TIMESTAMP | — |

---

## Considerações de UX/UI

### Stepper Horizontal
- **Etapa Concluída**: Ícone ✓ verde + linha conectora verde
- **Etapa Atual**: Círculo com ponto primário dourado
- **Etapa Pendente**: Ícone 🔒 cinza + linha conectora cinza

### Navegação entre Etapas
- Usuário pode voltar para etapas concluídas (modo leitura)
- Não pode avançar sem completar a etapa atual
- Botões de ação sempre no rodapé da etapa:
  - "Salvar e Continuar" (cor `#06b6d4`)
  - "Salvar Rascunho" (variant `outline`)

### Validações
- Campos obrigatórios com asterisco vermelho `*`
- Validação em tempo real com mensagens de erro abaixo do campo
- Não permite avançar sem preencher campos obrigatórios

### Uploads
- Drag & drop ou clique para selecionar
- Preview de arquivos anexados
- Possibilidade de adicionar comentário por arquivo
- Botão de remoção individual

---

## Diferenciais das OS 01-04

| Característica | OS 01-04 | OS 05-13 |
|----------------|----------|----------|
| **Público-alvo** | Leads (prospecção) | Clientes convertidos |
| **Etapa 1** | Seleção/Cadastro de Lead | Campo "Cliente" direto |
| **Fluxo de Conversão** | ✅ (Follow-ups, Visitas, Proposta, Contrato) | ❌ |
| **Geração de Proposta** | ✅ | ❌ |
| **Contrato** | ✅ | ❌ (já contratado) |
| **Número de Etapas** | 16 | Variável (5-10) |
| **Conversão Lead → Cliente** | ✅ Na Etapa 16 | — |
| **Geração de OS-13** | ✅ Automática | Manual |

---

## Roadmap de Implementação

### Fase 1: Estrutura Base ✅
- [x] Stepper horizontal
- [x] Navegação entre etapas
- [x] Etapa 1: Seleção de Lead
- [x] Etapa 1: Cadastro de Lead (Dialog)
- [x] Lógica condicional de campos (Tipo de Edificação)

### Fase 2: Etapas de Follow-up
- [ ] Etapa 2: Seleção do Tipo de OS
- [ ] Etapa 3: Follow-up 1 (Entrevista Inicial)
- [ ] Etapa 4: Agendar Visita Técnica
- [ ] Etapa 5: Realizar Visita
- [ ] Etapa 6: Follow-up 2 (Pós-Visita)

### Fase 3: Memorial e Precificação
- [ ] Etapa 7: Fazer Memorial (Upload)
- [ ] Etapa 8: Formulário Memorial (Escopo Dinâmico)
- [ ] Etapa 9: Precificação (Cálculos Automáticos)

### Fase 4: Proposta e Contrato
- [ ] Etapa 10: Gerar Proposta Comercial (Preview Impressão)
- [ ] Etapa 11: Agendar Visita (Apresentação)
- [ ] Etapa 12: Realizar Visita (Apresentação)
- [ ] Etapa 13: Follow-up 3 (Pós-Apresentação)
- [ ] Etapa 14: Gerar Contrato (Upload)
- [ ] Etapa 15: Contrato Assinado
- [ ] Etapa 16: Iniciar Contrato de Obra (Automático)

### Fase 5: Integrações
- [ ] Módulo de Agendamento (Calendário)
- [ ] API ViaCEP (CEP → Endereço)
- [ ] Upload de arquivos (Storage)
- [ ] Geração de PDF (Proposta/Contrato)
- [ ] Conversão Lead → Cliente (Banco)
- [ ] Criação automática OS-13

---

## Conclusão

O fluxo das OS 01-04 representa o **funil completo de vendas** da Minerva Engenharia, desde a captação do lead até a assinatura do contrato e início da obra. Este fluxo é **crítico para o negócio**, pois:

1. **Organiza o processo comercial** (follow-ups estruturados)
2. **Documenta todas as interações** com o lead
3. **Padroniza a precificação** e geração de propostas
4. **Garante rastreabilidade** de todo o processo
5. **Automatiza a conversão** lead → cliente → obra

A implementação completa deste fluxo trará **agilidade, transparência e eficiência** para o time comercial e de obras da Minerva.
