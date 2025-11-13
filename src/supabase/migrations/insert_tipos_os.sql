-- =====================================================
-- INSERÇÃO DE TIPOS DE ORDEM DE SERVIÇO (OS)
-- Sistema: Minerva Engenharia ERP
-- Data: 10/11/2025
-- =====================================================

-- Limpar dados existentes (se necessário)
-- TRUNCATE TABLE public.tipos_os CASCADE;

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
  'ASSESORIA',
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

-- =====================================================
-- VERIFICAÇÃO
-- =====================================================

-- Selecionar todos os tipos de OS criados (ordenado por código)
SELECT 
  codigo,
  nome,
  setor_padrao,
  descricao
FROM public.tipos_os
ORDER BY codigo;

-- Contar total de registros
SELECT COUNT(*) as total_tipos_os FROM public.tipos_os;
