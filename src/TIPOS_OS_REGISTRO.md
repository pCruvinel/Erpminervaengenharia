# Registro de Tipos de OS no Supabase

**Data:** 10/11/2025  
**Tabela:** `public.tipos_os`  
**Total de Registros:** 13 OS

---

## 🎯 Como Executar

### Opção 1: SQL Editor do Supabase (Recomendado)
1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Copie e cole o conteúdo do arquivo `/supabase/migrations/insert_tipos_os.sql`
5. Clique em **Run** ou pressione `Ctrl + Enter`

### Opção 2: Manual (Copiar e Colar)
Copie os comandos INSERT abaixo diretamente no SQL Editor.

---

## 📋 Comandos SQL

```sql
-- =====================================================
-- OS 01-04: Fluxo Comercial Completo (15 etapas)
-- =====================================================

-- OS-01: Perícia de Fachada
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-01',
  'Perícia de Fachada',
  'OBRAS',
  'Fluxo comercial completo com 15 etapas: desde identificação do lead até conversão automática para OS-13. Inclui visita técnica, follow-ups, memorial, precificação, proposta comercial e contrato.'
);

-- OS-02: Revitalização de Fachada
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-02',
  'Revitalização de Fachada',
  'OBRAS',
  'Fluxo comercial completo com 15 etapas: desde identificação do lead até conversão automática para OS-13. Inclui visita técnica, follow-ups, memorial, precificação, proposta comercial e contrato.'
);

-- OS-03: Reforço Estrutural
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-03',
  'Reforço Estrutural',
  'OBRAS',
  'Fluxo comercial completo com 15 etapas: desde identificação do lead até conversão automática para OS-13. Inclui visita técnica, follow-ups, memorial, precificação, proposta comercial e contrato.'
);

-- OS-04: Outros Serviços
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-04',
  'Outros Serviços',
  'OBRAS',
  'Fluxo comercial completo com 15 etapas para serviços diversos. Desde identificação do lead até conversão automática para OS-13. Inclui visita técnica, follow-ups, memorial, precificação, proposta comercial e contrato.'
);

-- =====================================================
-- OS 05-12: Fluxo Normal (com campo Cliente)
-- =====================================================

-- OS-05: Consultoria Técnica em Obras
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-05',
  'Consultoria Técnica em Obras',
  'OBRAS',
  'Fluxo normal: consultoria técnica para obras em andamento. Requer cliente já cadastrado no sistema. Inclui visita técnica, diagnóstico e relatório técnico.'
);

-- OS-06: Assessoria Técnica de Obras (ATU)
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-06',
  'Assessoria Técnica de Obras (ATU)',
  'OBRAS',
  'Fluxo normal: assessoria técnica contratual para acompanhamento de obras. Requer cliente já cadastrado. Inclui visitas periódicas e relatórios de acompanhamento.'
);

-- OS-07: Laudo de Vistoria Predial
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-07',
  'Laudo de Vistoria Predial',
  'OBRAS',
  'Fluxo normal: elaboração de laudo técnico de vistoria predial. Requer cliente já cadastrado. Inclui inspeção, relatório fotográfico e recomendações.'
);

-- OS-08: Projeto Executivo
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-08',
  'Projeto Executivo',
  'OBRAS',
  'Fluxo normal: desenvolvimento de projeto executivo de engenharia. Requer cliente já cadastrado. Inclui memorial descritivo, plantas e especificações técnicas.'
);

-- OS-09: ART/RRT (Anotação de Responsabilidade Técnica)
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-09',
  'ART/RRT',
  'ADM',
  'Fluxo normal: emissão de Anotação de Responsabilidade Técnica junto aos conselhos (CREA/CAU). Requer cliente já cadastrado. Processamento administrativo.'
);

-- OS-10: Ensaios Laboratoriais - Concreto
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-10',
  'Ensaios Laboratoriais - Concreto',
  'LABORATORIO',
  'Fluxo normal: ensaios tecnológicos em concreto (resistência à compressão, slump test, etc.). Requer cliente já cadastrado. Inclui coleta, ensaio e laudo.'
);

-- OS-11: Ensaios Laboratoriais - Argamassa
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-11',
  'Ensaios Laboratoriais - Argamassa',
  'LABORATORIO',
  'Fluxo normal: ensaios tecnológicos em argamassa (resistência, aderência, consistência). Requer cliente já cadastrado. Inclui coleta, ensaio e laudo.'
);

-- OS-12: Ensaios Laboratoriais - Outros
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-12',
  'Ensaios Laboratoriais - Outros',
  'LABORATORIO',
  'Fluxo normal: ensaios laboratoriais diversos (solo, materiais, etc.). Requer cliente já cadastrado. Inclui coleta, ensaio e laudo técnico.'
);

-- =====================================================
-- OS-13: Contrato de Obra (Gerada Automaticamente)
-- =====================================================

-- OS-13: Start de Contrato de Obra
INSERT INTO public.tipos_os (codigo, nome, setor_padrao, descricao)
VALUES (
  'OS-13',
  'Start de Contrato de Obra',
  'OBRAS',
  'Ordem de Serviço gerada AUTOMATICAMENTE quando uma OS 01-04 chega na Etapa 15 (Contrato Assinado). Representa o início da execução da obra. Cliente já está convertido de Lead para Cliente Ativo.'
);
```

---

## 🔍 Verificação

Após executar os INSERTs, execute estas queries para verificar:

### 1. Listar todos os tipos de OS
```sql
SELECT 
  codigo,
  nome,
  setor_padrao,
  descricao
FROM public.tipos_os
ORDER BY codigo;
```

### 2. Contar total de registros
```sql
SELECT COUNT(*) as total_tipos_os 
FROM public.tipos_os;
```

**Resultado esperado:** `total_tipos_os = 13`

---

## 📊 Resumo dos Tipos de OS

| Código | Nome | Setor | Tipo de Fluxo |
|--------|------|-------|---------------|
| OS-01 | Perícia de Fachada | OBRAS | Comercial Completo (15 etapas) |
| OS-02 | Revitalização de Fachada | OBRAS | Comercial Completo (15 etapas) |
| OS-03 | Reforço Estrutural | OBRAS | Comercial Completo (15 etapas) |
| OS-04 | Outros Serviços | OBRAS | Comercial Completo (15 etapas) |
| OS-05 | Consultoria Técnica em Obras | OBRAS | Normal (com cliente) |
| OS-06 | Assessoria Técnica de Obras (ATU) | OBRAS | Normal (com cliente) |
| OS-07 | Laudo de Vistoria Predial | OBRAS | Normal (com cliente) |
| OS-08 | Projeto Executivo | OBRAS | Normal (com cliente) |
| OS-09 | ART/RRT | ADM | Normal (com cliente) |
| OS-10 | Ensaios Laboratoriais - Concreto | LABORATORIO | Normal (com cliente) |
| OS-11 | Ensaios Laboratoriais - Argamassa | LABORATORIO | Normal (com cliente) |
| OS-12 | Ensaios Laboratoriais - Outros | LABORATORIO | Normal (com cliente) |
| OS-13 | Start de Contrato de Obra | OBRAS | Automático (gerado por OS 01-04) |

---

## 📋 Distribuição por Setor

- **OBRAS:** 9 tipos (OS-01 a OS-08 + OS-13)
- **ADM:** 1 tipo (OS-09)
- **LABORATORIO:** 3 tipos (OS-10 a OS-12)

---

## 🔐 Regras de Negócio

### OS 01-04 (Fluxo Comercial Completo)
- ✅ 15 etapas obrigatórias
- ✅ Começa com Lead (não requer cliente cadastrado)
- ✅ Inclui identificação, visitas, follow-ups, memorial, precificação, proposta e contrato
- ✅ **Na Etapa 15:** Quando contrato é assinado → Lead vira Cliente → OS-13 é criada automaticamente

### OS 05-12 (Fluxo Normal)
- ✅ Requer cliente já cadastrado
- ✅ Etapas simplificadas focadas na execução do serviço
- ✅ Não possui fluxo comercial completo

### OS-13 (Contrato de Obra)
- ✅ **NUNCA** é criada manualmente
- ✅ Gerada automaticamente pelo sistema
- ✅ Representa início da execução da obra
- ✅ Cliente já foi convertido de Lead → Cliente Ativo

---

## 🐛 Troubleshooting

### Erro: `duplicate key value violates unique constraint "tipos_os_codigo_key"`
**Causa:** Código já existe na tabela  
**Solução:** 
```sql
-- Ver se código já existe
SELECT * FROM public.tipos_os WHERE codigo = 'OS-01';

-- Se quiser substituir, deletar primeiro
DELETE FROM public.tipos_os WHERE codigo = 'OS-01';
```

### Erro: `invalid input value for enum user_setor: "OBRAS"`
**Causa:** O enum `user_setor` não está criado ou não possui o valor  
**Solução:** Verificar enums disponíveis:
```sql
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = 'user_setor'::regtype;
```

---

## 🚀 Próximos Passos

Após registrar os tipos de OS:

1. ✅ Testar criação de OS no frontend
2. ✅ Verificar se dropdown carrega os tipos corretamente
3. ✅ Testar fluxo completo de OS 01-04
4. ✅ Testar geração automática de OS-13 na Etapa 15

---

## 📝 Changelog

### [1.0.0] - 2025-11-10

#### Criado
- Script SQL completo para 13 tipos de OS
- Documentação de registro
- Tabela resumo com distribuição por setor
- Queries de verificação

---

**Desenvolvido por:** Equipe Minerva ERP  
**Última atualização:** 10/11/2025
