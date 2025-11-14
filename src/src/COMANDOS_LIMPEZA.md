# 🛠️ Comandos para Execução da Limpeza de Documentação

**Data:** 13/11/2025  
**Projeto:** Minerva Engenharia ERP  
**Referência:** ANALISE_OBSOLESCENCIA_RESUMO.md

---

## ⚠️ IMPORTANTE: Ler Antes de Executar

1. ✅ **Fazer backup** do projeto antes de deletar arquivos
2. ✅ **Revisar** a análise completa em `ARQUIVOS_OBSOLETOS_ADICIONAIS.md`
3. ✅ **Confirmar** que os arquivos marcados são realmente obsoletos
4. ❌ **NÃO executar** comandos sem entender o impacto

---

## 🚀 Fase 1: Deleção Imediata (5 minutos)

### Arquivo Duplicado SONNER

```bash
# Navegar para raiz do projeto
cd /path/to/minerva-erp

# Deletar arquivo duplicado
rm BUGFIX_SONNER_FINAL_v4.md

# Confirmar deleção
ls -la | grep BUGFIX_SONNER
# Deve mostrar apenas: BUGFIX_SONNER_IMPORT_FINAL.md

# Confirmar status
echo "✅ BUGFIX_SONNER_FINAL_v4.md deletado"
```

**Resultado esperado:**
```
✅ 1 arquivo deletado
✅ Apenas versão FINAL mantida
```

---

## 📦 Fase 2: Consolidações (1-2 horas)

### 2.1 - Consolidar Documentação de Upload

#### Opção A: Manter apenas 2 arquivos principais

```bash
# Backup dos arquivos antes de consolidar
mkdir -p backup/upload-docs
cp FEATURE_FILE_UPLOAD.md backup/upload-docs/
cp UPLOAD_FEATURE_README.md backup/upload-docs/
cp QUICK_STORAGE_SETUP.md backup/upload-docs/
cp SUPABASE_STORAGE_SETUP.md backup/upload-docs/

# Após revisar e consolidar manualmente:
# Deletar arquivos redundantes
rm UPLOAD_FEATURE_README.md
rm SUPABASE_STORAGE_SETUP.md

# Manter apenas:
# - FEATURE_FILE_UPLOAD.md (completo)
# - QUICK_STORAGE_SETUP.md (guia rápido)
```

#### Opção B: Mover para histórico (sem deletar)

```bash
# Criar pasta de histórico
mkdir -p src/archive/upload-legacy

# Mover arquivos redundantes
mv UPLOAD_FEATURE_README.md src/archive/upload-legacy/
mv SUPABASE_STORAGE_SETUP.md src/archive/upload-legacy/

echo "✅ Arquivos movidos para histórico"
```

---

### 2.2 - Arquivar Features Implementadas

```bash
# Criar pasta de features implementadas
mkdir -p src/archive/features-implementadas

# Mover arquivos de validações já implementadas
mv ETAPA_1_UX_IMPROVEMENTS.md src/archive/features-implementadas/
mv VALIDACAO_PROPOSTA_ETAPA1.md src/archive/features-implementadas/
mv VALIDACAO_CAMPOS_OPCIONAIS_UPDATE.md src/archive/features-implementadas/
mv FEATURE_LOADING_STATE_OS_CREATION.md src/archive/features-implementadas/

echo "✅ 4 features implementadas arquivadas"
```

---

### 2.3 - Arquivar Guias de Integração (se concluídos)

```bash
# Verificar se integrações foram concluídas
# Se SIM, executar:

mkdir -p src/archive/integracoes-concluidas

mv INSTRUCOES_INTEGRACAO_WORKFLOW.md src/archive/integracoes-concluidas/
mv INTEGRACAO_ETAPAS_SUPABASE.md src/archive/integracoes-concluidas/

echo "✅ 2 guias de integração arquivados"
```

---

### 2.4 - Organizar Bugfixes Históricos

```bash
# Criar pasta de bugfixes históricos
mkdir -p src/archive/bugfixes

# Mover todos os bugfixes já resolvidos
mv BUGFIX_ENUM_STATUS_ETAPA.md src/archive/bugfixes/
mv BUGFIX_ENUMS_DUPLICATES.md src/archive/bugfixes/
mv BUGFIX_ENUM_CONCLUIDA_SEM_ACENTO.md src/archive/bugfixes/
mv BUGFIX_SCHEMA_COLUNAS.md src/archive/bugfixes/
mv BUGFIX_FOREIGN_KEY_CRIADO_POR.md src/archive/bugfixes/
mv BUGFIX_POSTGREST_CACHE.md src/archive/bugfixes/
mv BUGFIX_JSX_STRUCTURE.md src/archive/bugfixes/
mv BUGFIX_TEXT_ERROR.md src/archive/bugfixes/
mv BUGFIX_VALIDACAO_PROPOSTA_SELECAO_CLIENTE.md src/archive/bugfixes/
mv BUGFIX_LEAD_SELECTION_ERROR.md src/archive/bugfixes/
mv BUGFIX_SONNER_IMPORT_FINAL.md src/archive/bugfixes/
mv LOADING_ISSUE_FIX.md src/archive/bugfixes/
mv FOLLOWUP_1_FIX.md src/archive/bugfixes/
mv CSS_FIX_SPACING.md src/archive/bugfixes/

echo "✅ 14 bugfixes movidos para histórico"
```

---

### 2.5 - Organizar Migrações Concluídas

```bash
# Criar pasta de migrações
mkdir -p src/archive/migracoes

# Mover migrações concluídas
mv MIGRACAO_ENUMS_UPPERCASE_SNAKE_CASE.md src/archive/migracoes/
mv MIGRACAO_API_COMPLETA.md src/archive/migracoes/

echo "✅ 2 migrações movidas para histórico"
```

---

### 2.6 - Organizar Status/Follow-ups Temporários

```bash
# Criar pasta de implementações concluídas
mkdir -p src/archive/implementacoes

# Mover documentos temporários
mv STATUS_IMPLEMENTACAO_FOLLOWUP.md src/archive/implementacoes/
mv PLANO_INTEGRACAO_FOLLOWUP_SUPABASE.md src/archive/implementacoes/
mv CONEXAO_SUPABASE_RESUMO.md src/archive/implementacoes/
mv FLUXO_CRIACAO_OS_IMPLEMENTADO.md src/archive/implementacoes/
mv COMO_RESOLVER_ERRO_TITULO.md src/archive/implementacoes/

echo "✅ 5 documentos de implementação arquivados"
```

---

## 📊 Script Completo - Executar Tudo de Uma Vez

### ⚠️ CUIDADO: Revise antes de executar!

```bash
#!/bin/bash

# Script de Limpeza de Documentação - Minerva ERP
# Data: 13/11/2025
# IMPORTANTE: Revisar antes de executar!

set -e  # Para em caso de erro

echo "🧹 Iniciando limpeza de documentação..."

# Criar estrutura de pastas
echo "📁 Criando estrutura de diretórios..."
mkdir -p src/archive/bugfixes
mkdir -p src/archive/migracoes
mkdir -p src/archive/implementacoes
mkdir -p src/archive/features-implementadas
mkdir -p src/archive/integracoes-concluidas
mkdir -p src/archive/upload-legacy
mkdir -p backup

# Backup completo antes de qualquer ação
echo "💾 Criando backup..."
cp -r . backup/before-cleanup-$(date +%Y%m%d-%H%M%S)

# FASE 1: Deletar duplicação
echo "❌ Fase 1: Deletando arquivo duplicado..."
rm -f BUGFIX_SONNER_FINAL_v4.md
echo "   ✅ BUGFIX_SONNER_FINAL_v4.md deletado"

# FASE 2: Mover arquivos para histórico
echo "📦 Fase 2: Organizando arquivos históricos..."

# Bugfixes
echo "   📌 Movendo 14 bugfixes..."
mv BUGFIX_ENUM_STATUS_ETAPA.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_ENUMS_DUPLICATES.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_ENUM_CONCLUIDA_SEM_ACENTO.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_SCHEMA_COLUNAS.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_FOREIGN_KEY_CRIADO_POR.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_POSTGREST_CACHE.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_JSX_STRUCTURE.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_TEXT_ERROR.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_VALIDACAO_PROPOSTA_SELECAO_CLIENTE.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_LEAD_SELECTION_ERROR.md src/archive/bugfixes/ 2>/dev/null || true
mv BUGFIX_SONNER_IMPORT_FINAL.md src/archive/bugfixes/ 2>/dev/null || true
mv LOADING_ISSUE_FIX.md src/archive/bugfixes/ 2>/dev/null || true
mv FOLLOWUP_1_FIX.md src/archive/bugfixes/ 2>/dev/null || true
mv CSS_FIX_SPACING.md src/archive/bugfixes/ 2>/dev/null || true

# Migrações
echo "   🔄 Movendo 2 migrações..."
mv MIGRACAO_ENUMS_UPPERCASE_SNAKE_CASE.md src/archive/migracoes/ 2>/dev/null || true
mv MIGRACAO_API_COMPLETA.md src/archive/migracoes/ 2>/dev/null || true

# Implementações
echo "   ⚙️ Movendo 5 implementações..."
mv STATUS_IMPLEMENTACAO_FOLLOWUP.md src/archive/implementacoes/ 2>/dev/null || true
mv PLANO_INTEGRACAO_FOLLOWUP_SUPABASE.md src/archive/implementacoes/ 2>/dev/null || true
mv CONEXAO_SUPABASE_RESUMO.md src/archive/implementacoes/ 2>/dev/null || true
mv FLUXO_CRIACAO_OS_IMPLEMENTADO.md src/archive/implementacoes/ 2>/dev/null || true
mv COMO_RESOLVER_ERRO_TITULO.md src/archive/implementacoes/ 2>/dev/null || true

# Features implementadas
echo "   ✨ Movendo 4 features implementadas..."
mv ETAPA_1_UX_IMPROVEMENTS.md src/archive/features-implementadas/ 2>/dev/null || true
mv VALIDACAO_PROPOSTA_ETAPA1.md src/archive/features-implementadas/ 2>/dev/null || true
mv VALIDACAO_CAMPOS_OPCIONAIS_UPDATE.md src/archive/features-implementadas/ 2>/dev/null || true
mv FEATURE_LOADING_STATE_OS_CREATION.md src/archive/features-implementadas/ 2>/dev/null || true

# Integrações (verificar se concluídas antes)
echo "   🔗 Movendo 2 integrações..."
mv INSTRUCOES_INTEGRACAO_WORKFLOW.md src/archive/integracoes-concluidas/ 2>/dev/null || true
mv INTEGRACAO_ETAPAS_SUPABASE.md src/archive/integracoes-concluidas/ 2>/dev/null || true

# Upload docs (opcional - descomentar se quiser consolidar)
# echo "   📎 Movendo docs de upload redundantes..."
# mv UPLOAD_FEATURE_README.md src/archive/upload-legacy/ 2>/dev/null || true
# mv SUPABASE_STORAGE_SETUP.md src/archive/upload-legacy/ 2>/dev/null || true

echo ""
echo "✅ Limpeza concluída com sucesso!"
echo ""
echo "📊 Resumo:"
echo "   - 1 arquivo deletado"
echo "   - 27 arquivos movidos para histórico"
echo "   - Backup criado em: backup/before-cleanup-*"
echo ""
echo "🔗 Próximos passos:"
echo "   1. Verificar links nos documentos ativos"
echo "   2. Atualizar DOCS_CLEANUP_LOG.md"
echo "   3. Testar navegação da documentação"
```

### Para executar o script:

```bash
# Dar permissão de execução
chmod +x cleanup-docs.sh

# Executar (CUIDADO!)
./cleanup-docs.sh
```

---

## ✅ Fase 3: Verificação e Atualização

### Verificar estrutura final

```bash
# Ver estrutura de pastas criada
tree src/archive/

# Contar arquivos
echo "Arquivos ativos na raiz:"
ls -1 *.md | wc -l

echo "Arquivos arquivados:"
find src/archive/ -name "*.md" | wc -l
```

### Atualizar índices

```bash
# Atualizar ARCHIVE_INDEX_BUGFIXES.md
# (adicionar nota sobre mudança de localização)

# Atualizar README_DOCS.md se necessário

# Criar log de limpeza
cat > DOCS_CLEANUP_LOG_v2.md << 'EOF'
# 🧹 Log de Limpeza de Documentação v2

**Data:** $(date +%Y-%m-%d)
**Versão:** 2.0

## Ações Realizadas

- ❌ Deletado: 1 arquivo (BUGFIX_SONNER_FINAL_v4.md)
- 📦 Arquivados: 27 arquivos
- ✅ Estrutura organizada em src/archive/

## Estrutura Criada

- src/archive/bugfixes/ (14 arquivos)
- src/archive/migracoes/ (2 arquivos)
- src/archive/implementacoes/ (5 arquivos)
- src/archive/features-implementadas/ (4 arquivos)
- src/archive/integracoes-concluidas/ (2 arquivos)

## Backup

Backup completo criado em: backup/before-cleanup-*
EOF
```

---

## 🔍 Comandos de Verificação

### Verificar links quebrados (exemplo com grep)

```bash
# Procurar referências a arquivos movidos
grep -r "BUGFIX_SONNER_FINAL_v4" *.md
grep -r "VALIDACAO_PROPOSTA_ETAPA1" *.md

# Se encontrar referências, atualizar manualmente
```

### Verificar integridade

```bash
# Listar todos os .md na raiz
ls -1 *.md

# Comparar com lista esperada de arquivos ativos
# (ver ANALISE_OBSOLESCENCIA_RESUMO.md)
```

---

## 🆘 Reverter em Caso de Erro

```bash
# Se algo der errado, restaurar backup
cp -r backup/before-cleanup-* .

echo "✅ Backup restaurado"
```

---

## 📝 Checklist de Execução

Antes de executar:
- [ ] Backup criado
- [ ] Análise revisada
- [ ] Time avisado
- [ ] Git commit feito (estado atual)

Durante execução:
- [ ] Fase 1 executada (deleção)
- [ ] Fase 2 executada (movimentações)
- [ ] Fase 3 executada (verificação)

Após execução:
- [ ] Links verificados
- [ ] README_DOCS.md atualizado
- [ ] DOCS_CLEANUP_LOG_v2.md criado
- [ ] Git commit feito (estado limpo)
- [ ] Time notificado

---

**Última atualização:** 13/11/2025  
**Responsável:** Manutenção de Documentação
