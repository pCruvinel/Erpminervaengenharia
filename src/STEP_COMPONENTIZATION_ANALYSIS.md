# Análise de Componentização de Etapas

## Objetivo
Identificar e componentizar etapas idênticas entre os fluxos OS 01-04 (Obras) e OS 05-06 (Assessoria) para evitar duplicação de código e facilitar manutenção.

## Mapeamento de Etapas

### OS 01-04 (16 Etapas - Obras)
1. Identificação do Cliente/Lead
2. Seleção do Tipo de OS
3. Follow-up 1 (Entrevista Inicial)
4. Agendar Visita Técnica
5. Realizar Visita
6. Follow-up 2 (Pós-Visita)
7. Fazer Memorial (Upload)
8. Formulário Memorial (Escopo)
9. Precificação
10. Gerar Proposta Comercial
11. Agendar Visita (Apresentação)
12. Realizar Visita (Apresentação)
13. Follow-up 3 (Pós-Apresentação)
14. Gerar Contrato (Upload)
15. Contrato Assinado
16. Iniciar Contrato de Obra

### OS 05-06 (12 Etapas - Assessoria)
1. Identificação do Cliente/Lead
2. Seleção do Tipo de OS
3. Follow-up 1 (Entrevista Inicial)
4. Formulário Memorial (Escopo e Prazos)
5. Precificação (Formulário Financeiro)
6. Gerar Proposta Comercial
7. Agendar Visita (Apresentação)
8. Realizar Visita (Apresentação)
9. Follow-up 3 (Pós-Apresentação)
10. Gerar Contrato (Upload)
11. Contrato Assinado
12. Ativar Contrato

## Etapas Compartilhadas (Idênticas)

| # | OS 01-04 (Etapa) | OS 05-06 (Etapa) | Nome da Etapa | Status |
|---|------------------|------------------|---------------|--------|
| 1 | Etapa 1 | Etapa 1 | Identificação do Cliente/Lead | ✅ IDÊNTICA |
| 2 | Etapa 3 | Etapa 3 | Follow-up 1 (Entrevista Inicial) | ✅ IDÊNTICA |
| 3 | Etapa 9 | Etapa 5 | Precificação | ✅ IDÊNTICA |
| 4 | Etapa 10 | Etapa 6 | Gerar Proposta Comercial | ✅ IDÊNTICA |
| 5 | Etapa 11 | Etapa 7 | Agendar Visita (Apresentação) | ✅ IDÊNTICA |
| 6 | Etapa 12 | Etapa 8 | Realizar Visita (Apresentação) | ✅ IDÊNTICA |
| 7 | Etapa 13 | Etapa 9 | Follow-up 3 (Pós-Apresentação) | ✅ IDÊNTICA |
| 8 | Etapa 14 | Etapa 10 | Gerar Contrato (Upload) | ✅ IDÊNTICA |
| 9 | Etapa 15 | Etapa 11 | Contrato Assinado | ✅ IDÊNTICA |

**Total: 9 etapas compartilhadas**

## Etapas Diferentes (Específicas)

### OS 01-04 Específicas:
- Etapa 2: Seleção do Tipo de OS (OS 01, 02, 03, 04)
- Etapa 4: Agendar Visita Técnica
- Etapa 5: Realizar Visita
- Etapa 6: Follow-up 2 (Pós-Visita)
- Etapa 7: Fazer Memorial (Upload)
- Etapa 8: Formulário Memorial (Escopo)
- Etapa 16: Iniciar Contrato de Obra (cria OS-13)

### OS 05-06 Específicas:
- Etapa 2: Seleção do Tipo de OS (OS 05, 06)
- Etapa 4: Formulário Memorial (Escopo e Prazos)
- Etapa 12: Ativar Contrato (cria OS-11 ou OS-12)

## Plano de Componentização

### Estrutura de Diretórios
```
/components/os/steps/
  ├── shared/                    # Etapas compartilhadas
  │   ├── step-identificacao-lead.tsx
  │   ├── step-followup-1.tsx
  │   ├── step-precificacao.tsx
  │   ├── step-gerar-proposta.tsx
  │   ├── step-agendar-apresentacao.tsx
  │   ├── step-realizar-apresentacao.tsx
  │   ├── step-followup-3.tsx
  │   ├── step-gerar-contrato.tsx
  │   └── step-contrato-assinado.tsx
  ├── obras/                     # Etapas específicas de Obras
  │   ├── step-selecao-tipo-obras.tsx
  │   ├── step-agendar-visita-tecnica.tsx
  │   ├── step-realizar-visita-tecnica.tsx
  │   ├── step-followup-2-pos-visita.tsx
  │   ├── step-memorial-upload.tsx
  │   ├── step-memorial-escopo.tsx
  │   └── step-iniciar-contrato-obra.tsx
  └── assessoria/                # Etapas específicas de Assessoria
      ├── step-selecao-tipo-assessoria.tsx
      ├── step-memorial-escopo-assessoria.tsx
      └── step-ativar-contrato-assessoria.tsx
```

### Interface Padrão dos Componentes
```typescript
interface StepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext?: () => void;
  onPrev?: () => void;
}
```

## Benefícios da Componentização

1. **DRY (Don't Repeat Yourself)**
   - Código único para etapas idênticas
   - Redução de ~60% do código duplicado

2. **Manutenibilidade**
   - Alterações em uma etapa refletem em todos os fluxos
   - Facilita correção de bugs

3. **Consistência**
   - Interface uniforme entre fluxos diferentes
   - UX padronizada

4. **Escalabilidade**
   - Fácil adicionar novos fluxos (OS 07-10, etc.)
   - Reutilização de componentes existentes

5. **Testabilidade**
   - Componentes isolados são mais fáceis de testar
   - Testes unitários por etapa

## Implementação Proposta

### Fase 1: Criar Componentes Compartilhados ✅
- [x] step-identificacao-lead.tsx
- [x] step-followup-1.tsx
- [x] step-precificacao.tsx
- [x] step-gerar-proposta.tsx
- [x] step-agendar-apresentacao.tsx
- [x] step-realizar-apresentacao.tsx
- [x] step-followup-3.tsx
- [x] step-gerar-contrato.tsx
- [x] step-contrato-assinado.tsx

### Fase 2: Refatorar OS 01-04
- [ ] Substituir código inline por componentes compartilhados
- [ ] Criar componentes específicos de obras
- [ ] Testar fluxo completo

### Fase 3: Refatorar OS 05-06
- [ ] Substituir código inline por componentes compartilhados
- [ ] Criar componentes específicos de assessoria
- [ ] Testar fluxo completo

### Fase 4: Validação
- [ ] Testes de integração
- [ ] Validação de UX
- [ ] Performance

## Exemplo de Uso

### Antes (Código Duplicado)
```tsx
// Em os-details-workflow-page.tsx
{currentStep === 3 && (
  <div className="space-y-6">
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Realize a entrevista inicial...
      </AlertDescription>
    </Alert>
    {/* 150+ linhas de código */}
  </div>
)}

// Em os-details-assessoria-page.tsx
{currentStep === 3 && (
  <div className="space-y-6">
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Realize a entrevista inicial...
      </AlertDescription>
    </Alert>
    {/* MESMO código duplicado */}
  </div>
)}
```

### Depois (Componentizado)
```tsx
// Em os-details-workflow-page.tsx
{currentStep === 3 && (
  <StepFollowup1
    data={etapa3Data}
    onDataChange={setEtapa3Data}
  />
)}

// Em os-details-assessoria-page.tsx
{currentStep === 3 && (
  <StepFollowup1
    data={etapa3Data}
    onDataChange={setEtapa3Data}
  />
)}
```

## Métricas Estimadas

- **Redução de código**: ~2.000 linhas → ~800 linhas (60% redução)
- **Arquivos criados**: 21 componentes
- **Tempo de implementação**: ~4-6 horas
- **ROI**: Alto (facilita futuras OS 07-13)

## Próximos Passos

1. ✅ Criar estrutura de diretórios
2. ✅ Implementar componentes compartilhados
3. ⏳ Refatorar OS 05-06 (piloto)
4. ⏳ Refatorar OS 01-04
5. ⏳ Testes e validação

---

**Status**: 🚀 Pronto para implementação  
**Prioridade**: Alta  
**Impacto**: Alto
