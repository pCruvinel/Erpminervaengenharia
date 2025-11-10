# Documentação - Minerva Design System v2.0

> Índice completo de toda a documentação do Design System

---

## 📚 Guias Principais

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
1. ⚡ [QUICK_REFERENCE.md](/QUICK_REFERENCE.md) - Consulta rápida
2. 🚨 [COMMON_ERRORS.md](/COMMON_ERRORS.md) - Solução de problemas
3. 🎨 [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md) - Referência completa

### Para Entender Arquitetura
1. 🔧 [TECHNICAL_NOTES.md](/TECHNICAL_NOTES.md) - Decisões técnicas
2. 📖 [CHANGELOG_PHASE2.md](/CHANGELOG_PHASE2.md) - Histórico
3. 🏗️ [DATABASE_SCHEMA.md](/DATABASE_SCHEMA.md) - Estrutura de dados

### Para Implementar Features
1. 🔄 [FLOW_IMPLEMENTATION.md](/FLOW_IMPLEMENTATION.md) - Fluxos gerais
2. 🎯 [FLOW_OS_01_04.md](/FLOW_OS_01_04.md) - Fluxo especial
3. 📘 [IMPLEMENTATION_GUIDE_OS_01_04.md](/IMPLEMENTATION_GUIDE_OS_01_04.md) - Guia detalhado

### Para Onboarding
**Ordem recomendada para novos devs:**
1. 📖 Este arquivo (README_DOCS.md)
2. 🎨 [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md) - Overview do sistema
3. ⚡ [QUICK_REFERENCE.md](/QUICK_REFERENCE.md) - Começar a codar
4. 🚨 [COMMON_ERRORS.md](/COMMON_ERRORS.md) - Evitar problemas
5. 🔧 [TECHNICAL_NOTES.md](/TECHNICAL_NOTES.md) - Entender decisões

---

## 🔍 Buscar por Tópico

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
1. Ler FLOW_OS_01_04.md para entender o fluxo
2. Seguir IMPLEMENTATION_GUIDE_OS_01_04.md passo a passo
3. Consultar DATABASE_SCHEMA.md para estrutura de dados
4. Verificar TRANSITION_DOCUMENT.md para estados
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

**Versão:** 2.0  
**Última atualização:** 09/11/2025  
**Projeto:** Minerva Engenharia - Sistema ERP  
**Mantido por:** Design System Team
