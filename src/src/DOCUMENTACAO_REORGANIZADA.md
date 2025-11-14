# 📚 Guia de Reorganização da Documentação

**Data**: 13/11/2025  
**Versão**: 1.1
**Última Atualização**: Análise completa de arquivos obsoletos

---

## 🎯 Objetivo

Este documento organiza virtualmente a documentação do projeto em categorias,
facilitando a navegação sem necessidade de mover arquivos fisicamente.

---

## 📂 Estrutura Virtual

### ✅ Documentação ATIVA (consultar regularmente)

**Ver**: README_DOCS.md (índice principal completo)

Principais documentos:
- COMPONENTS_GUIDE.md ⭐ (guia oficial de componentes)
- ENUM_DEFINICOES_SISTEMA.md (definições de enums)
- DATABASE_SCHEMA.md (schema do banco)
- API_INTEGRATION_GUIDE.md (guia de API)
- DESIGN_SYSTEM.md (sistema de design)
- FLOW_OS_01_04.md (workflow principal)

### 📦 Documentação ARQUIVADA (referência histórica)

**Bugfixes**: Ver ARCHIVE_INDEX_BUGFIXES.md (14 arquivos)  
**Migrações**: Ver ARCHIVE_INDEX_MIGRATIONS.md (2 arquivos)  
**Implementações**: Ver ARCHIVE_INDEX_IMPLEMENTATIONS.md (5 arquivos)

### ⚠️ Documentação OBSOLETA (marcada para deleção)

**Ver**: ARQUIVOS_PARA_DELETAR.md (5 arquivos já deletados)  
**Ver**: ARQUIVOS_OBSOLETOS_ADICIONAIS.md (32 arquivos candidatos à remoção/consolidação) ⭐ NOVO

---

## 🔍 Como Navegar

1. **Precisa de informação atual?** → Consulte README_DOCS.md
2. **Quer entender um bug antigo?** → Consulte ARCHIVE_INDEX_BUGFIXES.md
3. **Quer saber sobre migrações?** → Consulte ARCHIVE_INDEX_MIGRATIONS.md
4. **Quer ver implementações antigas?** → Consulte ARCHIVE_INDEX_IMPLEMENTATIONS.md
5. **Quer ver análise de obsolescência?** → Consulte ARQUIVOS_OBSOLETOS_ADICIONAIS.md ⭐ NOVO

---

## 🧹 Limpeza Futura

Quando possível, mover arquivos arquivados para subpastas:
- src/docs/archive/bugfixes/
- src/docs/archive/migrations/
- src/docs/archive/implementations/

E deletar arquivos marcados em ARQUIVOS_PARA_DELETAR.md

### 🎯 Plano de Ação Documentado

Ver **ARQUIVOS_OBSOLETOS_ADICIONAIS.md** para plano detalhado:
- **Fase 1:** Deletar 1 arquivo duplicado (BUGFIX_SONNER_FINAL_v4.md)
- **Fase 2:** Consolidar 10 arquivos de features/validações
- **Fase 3:** Manter 21 arquivos históricos já indexados