# Documentação - Minerva Design System v2.0

> Índice completo de toda a documentação do Design System

---

## 📚 Guias Principais

### 📘 [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) ⭐ NOVO
**Guia completo de componentes de fluxos OS**

- Arquitetura de componentes
- 14 componentes documentados (shared + específicos)
- Padrões de código e props
- Exemplos práticos de uso
- WorkflowStepper e WorkflowFooter
- Guia de implementação
- Métricas e impacto
- Referência rápida

**Público:** Desenvolvedores (frontend/full-stack)  
**Quando usar:** Ao trabalhar com fluxos de OS ou criar componentes

**⚠️ Este guia unifica e substitui:**
- ~~COMPONENT_ARCHITECTURE.md~~
- ~~COMPONENTIZATION_SUMMARY.md~~
- ~~COMPONENTS_CREATED_SUMMARY.md~~

---

### 🎨 [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md)
**Documentação completa do Design System**

- Paleta de cores (Primary, Secondary, Neutral, Semânticas)
- Sistema tipográfico
- Componentes Shadcn/ui
- Sombras e elevação
- Espaçamento
- Exemplos de uso
- Troubleshooting

**Público:** Todos (devs, designers, gestores)  
**Quando usar:** Referência completa do sistema

---

### 🏛️ [LOGO_USAGE_GUIDE.md](/LOGO_USAGE_GUIDE.md)
**Guia de uso da Logo Minerva**

- Variantes disponíveis (full, icon, compact)
- Componente MinervaLogo
- Boas práticas de uso
- Especificações técnicas
- Casos de uso por contexto
- Responsividade e acessibilidade

**Público:** Todos (devs, designers)  
**Quando usar:** Ao implementar a logo em novos contextos

---

### ⚡ [QUICK_REFERENCE.md](/QUICK_REFERENCE.md)
**Guia rápido para desenvolvimento**

- Classes mais usadas
- Componentes comuns
- Padrões de código
- Paleta rápida (copiar/colar)
- Links úteis

**Público:** Desenvolvedores  
**Quando usar:** Durante o desenvolvimento, para consulta rápida

---

### 🚨 [COMMON_ERRORS.md](/COMMON_ERRORS.md)
**Guia de solução de problemas**

- Erros mais comuns e soluções
- Classes que não funcionam
- Troubleshooting passo a passo
- Checklist de debug
- Workarounds

**Público:** Desenvolvedores  
**Quando usar:** Quando aparecer erro no console ou algo não funcionar

---

### 🔧 [TECHNICAL_NOTES.md](/TECHNICAL_NOTES.md)
**Explicações técnicas e decisões de arquitetura**

- Por que escalas numéricas não funcionam para text/border
- Tailwind v4.0 vs v3.x
- Sistema tipográfico e semântica
- Performance e otimizações
- Roadmap futuro

**Público:** Tech leads, arquitetos, devs seniores  
**Quando usar:** Para entender decisões técnicas e arquiteturais

---

### 📝 [TYPOGRAPHY_EXAMPLES.md](/TYPOGRAPHY_EXAMPLES.md)
**Exemplos práticos de tipografia**

- Todos os headings (h1-h6)
- Parágrafos e body text
- Classes utilitárias
- Line clamp
- Estados (success, warning, error)

**Público:** Desenvolvedores e designers  
**Quando usar:** Para ver exemplos visuais de tipografia

---

### 📖 [CHANGELOG_PHASE2.md](/CHANGELOG_PHASE2.md)
**Registro de mudanças da Fase 2**

- Correções de bugs
- Documentação criada
- Classes problemáticas
- Padrões estabelecidos
- Lições aprendidas

**Público:** Time de desenvolvimento  
**Quando usar:** Para entender o histórico de mudanças

---

## 🧩 Documentação de Componentes

### 📘 [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) ⭐ GUIA OFICIAL
**Referência completa de componentes reutilizáveis**

- ✅ 14 componentes criados e documentados
- ✅ Componentes compartilhados (/shared)
- ✅ Componentes específicos (/assessoria, /obras)
- ✅ WorkflowStepper e WorkflowFooter
- ✅ Padrões de props e lifting state up
- ✅ Exemplos práticos e validação
- ✅ Guia de criação de novos componentes
- ✅ Métricas de impacto (66% redução de código)

**Público:** Desenvolvedores  
**Quando usar:** Sempre ao trabalhar com fluxos de OS

---

### 📖 [FLOW_COMPONENTS_DICTIONARY.md](/FLOW_COMPONENTS_DICTIONARY.md)
**Dicionário detalhado de cada componente**

- Definição completa de cada componente
- Interface TypeScript (Props)
- Estrutura UI detalhada
- Campos e validações
- Design System compliance
- Exemplos de código

**Público:** Desenvolvedores  
**Quando usar:** Para detalhes específicos de um componente

---

## 📋 Documentação de Projeto

### 🏗️ [DATABASE_SCHEMA.md](/DATABASE_SCHEMA.md)
**Estrutura do banco de dados Supabase**

- Tabelas e relacionamentos
- Tipos e enums
- Políticas RLS
- Triggers e functions

**Público:** Backend developers, DBAs  
**Quando usar:** Ao trabalhar com banco de dados

---

### 🔄 [FLOW_IMPLEMENTATION.md](/FLOW_IMPLEMENTATION.md)
**Implementação dos fluxos de trabalho**

- Fluxo normal (OS 05-13)
- Fluxo especial (OS 01-04)
- Estados e transições
- Validações

**Público:** Desenvolvedores full-stack  
**Quando usar:** Ao implementar fluxos de OS

---

### 🎯 [FLOW_OS_01_04.md](/FLOW_OS_01_04.md)
**Detalhes do fluxo especial OS 01-04**

- 16 etapas do fluxo
- Conversão automática
- Validações específicas
- Campos obrigatórios

**Público:** Desenvolvedores de negócio  
**Quando usar:** Ao trabalhar com OS tipo 01-04

---

### 📘 [IMPLEMENTATION_GUIDE_OS_01_04.md](/IMPLEMENTATION_GUIDE_OS_01_04.md)
**Guia de implementação detalhado**

- Step-by-step da implementação
- Componentes necessários
- Validações e regras
- Testes

**Público:** Desenvolvedores full-stack  
**Quando usar:** Durante implementação de features de OS 01-04

---

### 🔀 [TRANSITION_DOCUMENT.md](/TRANSITION_DOCUMENT.md)
**Documento de transição de estados**

- Máquina de estados
- Transições válidas
- Permissões por role
- Validações de transição

**Público:** Desenvolvedores e gestores de produto  
**Quando usar:** Ao implementar lógica de estados

---

## 🗂️ Por Tipo de Documento

### Para Desenvolvimento Rápido
1. 📘 [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) - Componentes de fluxos OS ⭐
2. ⚡ [QUICK_REFERENCE.md](/QUICK_REFERENCE.md) - Consulta rápida
3. 🚨 [COMMON_ERRORS.md](/COMMON_ERRORS.md) - Solução de problemas
4. 🎨 [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md) - Referência completa

### Para Entender Arquitetura
1. 📘 [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) - Arquitetura de componentes ⭐
2. 🔧 [TECHNICAL_NOTES.md](/TECHNICAL_NOTES.md) - Decisões técnicas
3. 📖 [CHANGELOG_PHASE2.md](/CHANGELOG_PHASE2.md) - Histórico
4. 🏗️ [DATABASE_SCHEMA.md](/DATABASE_SCHEMA.md) - Estrutura de dados

### Para Implementar Features de OS
1. 📘 [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) - Usar componentes ⭐
2. 🔄 [FLOW_IMPLEMENTATION.md](/FLOW_IMPLEMENTATION.md) - Fluxos gerais
3. 🎯 [FLOW_OS_01_04.md](/FLOW_OS_01_04.md) - Fluxo especial
4. 📖 [IMPLEMENTATION_GUIDE_OS_01_04.md](/IMPLEMENTATION_GUIDE_OS_01_04.md) - Guia detalhado

### Para Onboarding
**Ordem recomendada para novos devs:**
1. 📖 Este arquivo (README_DOCS.md)
2. 🎨 [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md) - Overview do sistema
3. 📘 [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) - Componentes reutilizáveis ⭐
4. ⚡ [QUICK_REFERENCE.md](/QUICK_REFERENCE.md) - Começar a codar
5. 🚨 [COMMON_ERRORS.md](/COMMON_ERRORS.md) - Evitar problemas
6. 🔧 [TECHNICAL_NOTES.md](/TECHNICAL_NOTES.md) - Entender decisões

---

## 🔍 Buscar por Tópico

### Componentes de Fluxos OS
- [COMPONENTS_GUIDE.md](/COMPONENTS_GUIDE.md) - Guia completo ⭐
- [COMPONENTS_GUIDE.md - Índice](/COMPONENTS_GUIDE.md#índice-de-componentes) - Lista de componentes
- [COMPONENTS_GUIDE.md - Mapeamento](/COMPONENTS_GUIDE.md#mapeamento-de-fluxos) - Componentes por fluxo
- [COMPONENTS_GUIDE.md - Padrões](/COMPONENTS_GUIDE.md#padrões-de-código) - Como criar/usar
- [FLOW_COMPONENTS_DICTIONARY.md](/FLOW_COMPONENTS_DICTIONARY.md) - Detalhes técnicos

### Cores
- [DESIGN_SYSTEM.md - Paleta de Cores](/DESIGN_SYSTEM.md#paleta-de-cores)
- [QUICK_REFERENCE.md - Cores de Background](/QUICK_REFERENCE.md#cores-de-background)
- [TECHNICAL_NOTES.md - Sistema de Cores](/TECHNICAL_NOTES.md#sistema-de-cores-e-tailwind)

### Tipografia
- [DESIGN_SYSTEM.md - Tipografia](/DESIGN_SYSTEM.md#tipografia)
- [TYPOGRAPHY_EXAMPLES.md](/TYPOGRAPHY_EXAMPLES.md) - Exemplos visuais
- [TECHNICAL_NOTES.md - Sistema Tipográfico](/TECHNICAL_NOTES.md#sistema-tipografico)

### Componentes
- [DESIGN_SYSTEM.md - Componentes](/DESIGN_SYSTEM.md#componentes)
- [QUICK_REFERENCE.md - Componentes Shadcn](/QUICK_REFERENCE.md#componentes-shadcn)

### Erros e Troubleshooting
- [COMMON_ERRORS.md](/COMMON_ERRORS.md) - Guia completo
- [DESIGN_SYSTEM.md - Troubleshooting](/DESIGN_SYSTEM.md#troubleshooting)

### Performance
- [TECHNICAL_NOTES.md - Performance](/TECHNICAL_NOTES.md#performance)

### Acessibilidade
- [TECHNICAL_NOTES.md - Acessibilidade](/TECHNICAL_NOTES.md#acessibilidade)

---

## 📊 Fluxo de Trabalho Recomendado

### 1. Começando uma nova feature

```
1. Consultar DESIGN_SYSTEM.md para componentes disponíveis
2. Usar QUICK_REFERENCE.md para código boilerplate
3. Se erro aparecer, consultar COMMON_ERRORS.md
4. Para dúvidas técnicas, ler TECHNICAL_NOTES.md
```

### 2. Implementando OS 01-04

```
1. Ler COMPONENTS_GUIDE.md para componentes disponíveis ⭐
2. Ler FLOW_OS_01_04.md para entender o fluxo
3. Seguir IMPLEMENTATION_GUIDE_OS_01_04.md passo a passo
4. Consultar DATABASE_SCHEMA.md para estrutura de dados
5. Verificar TRANSITION_DOCUMENT.md para estados
```

### 3. Corrigindo bug visual

```
1. Verificar COMMON_ERRORS.md primeiro
2. Consultar DESIGN_SYSTEM.md para uso correto
3. Inspecionar código com DevTools
4. Se persistir, ler TECHNICAL_NOTES.md para entender limitações
```

### 4. Fazendo code review

```
1. Verificar se segue padrões do DESIGN_SYSTEM.md
2. Checar se não usa classes de COMMON_ERRORS.md
3. Validar tipografia e cores
4. Confirmar acessibilidade
```

---

## 🎯 Checklist de Qualidade

Antes de fazer commit, verificar:

- [ ] Não usa classes `-hover`, `-active`, `-disabled`
- [ ] Não usa escalas numéricas em `text-*` ou `border-*` (exceto neutral)
- [ ] Tipografia usa elementos HTML quando possível
- [ ] Cores seguem paleta do Design System
- [ ] Componentes Shadcn usados corretamente
- [ ] Código segue exemplos do QUICK_REFERENCE.md
- [ ] Não há erros listados em COMMON_ERRORS.md

---

## 📞 Contatos e Suporte

### Dúvidas sobre Design System
- Consultar documentação primeiro
- Verificar COMMON_ERRORS.md
- Abrir issue no repositório

### Sugestões de Melhoria
- Documentar caso de uso
- Propor solução
- Abrir PR com exemplos

### Reportar Bug
- Descrever problema
- Incluir código que causa o erro
- Print do console/DevTools
- Mencionar qual documento consultou

---

## 🔄 Manutenção da Documentação

### Quando atualizar

**DESIGN_SYSTEM.md:**
- Nova cor adicionada
- Novo componente criado
- Mudança em padrão estabelecido

**QUICK_REFERENCE.md:**
- Novo padrão de código comum
- Atalho útil descoberto
- Classe frequentemente usada

**COMMON_ERRORS.md:**
- Novo erro recorrente
- Solução para problema comum
- Workaround útil

**TECHNICAL_NOTES.md:**
- Decisão arquitetural importante
- Mudança de tecnologia
- Otimização significativa

**CHANGELOG_PHASE2.md:**
- Toda correção de bug
- Nova feature adicionada
- Breaking change

---

## 📈 Versioning

**Design System:** v2.0 (Fase 2 completa)  
**Última atualização:** 09/11/2025  
**Próxima fase:** Fase 3 - Utilities Data-Dense

---

## 🚀 Próximos Passos

### Fase 3 (Planejado)
- [ ] Classes data-dense
- [ ] Utilitários de formulário
- [ ] Card utilities
- [ ] Layout helpers

### Melhorias Contínuas
- [ ] Adicionar Storybook
- [ ] Criar testes automatizados
- [ ] Linter customizado
- [ ] Plugin do Figma

---

## 📝 Template para Nova Documentação

Quando criar novo documento:

```markdown
# Título do Documento

> Breve descrição do propósito

---

## Seção Principal

Conteúdo...

### Subseção

Exemplos...

---

**Versão:** X.X  
**Última atualização:** DD/MM/YYYY  
**Projeto:** Minerva Engenharia - Sistema ERP
```

---

**Versão:** 2.1  
**Última atualização:** 10/11/2025  
**Projeto:** Minerva Engenharia - Sistema ERP  
**Mantido por:** Design System Team

---

## 📝 Changelog

### v2.1 (10/11/2025)
- ✅ **NOVO:** COMPONENTS_GUIDE.md - Guia unificado de componentes
- ✅ Consolidação de COMPONENT_ARCHITECTURE.md, COMPONENTIZATION_SUMMARY.md e COMPONENTS_CREATED_SUMMARY.md
- ✅ Documentação completa de 14 componentes
- ✅ Adicionadas seções sobre WorkflowStepper, WorkflowFooter e PrimaryButton
- ✅ Atualizado README_DOCS.md com novo guia

### v2.0 (09/11/2025)
- Design System v2.0 completo
- Documentação de fluxos OS
- Guias de implementação

---

## 📚 Sistema e Arquitetura
- ✅ `DATABASE_SCHEMA.md` - Schema do banco de dados
- ✅ `DESIGN_SYSTEM.md` - Sistema de design Minerva
- ✅ `API_INTEGRATION_GUIDE.md` - Guia de integração com API
- ✅ `SUPABASE_INTEGRATION.md` - Integração com Supabase

### Upload de Arquivos ⭐ NOVO
- ✅ `UPLOAD_STORAGE_GUIDE.md` - Guia consolidado de upload v2.0
- ✅ `QUICK_STORAGE_SETUP.md` - Setup rápido (5 minutos)
- ✅ `CREATE_BUCKET.sql` - Script SQL de criação
- ✅ `STORAGE_POLICIES.sql` - Políticas RLS

### Meta-Documentação ⭐ NOVO
- ✅ `/src/README.md` - Índice de documentação organizacional
- ✅ `/src/DOCUMENTACAO_REORGANIZADA.md` - Guia de navegação
- ✅ `/src/FEATURES_IMPLEMENTADAS_LOG.md` - Log de features implementadas
- ✅ Ver pasta `/src/` para índices completos