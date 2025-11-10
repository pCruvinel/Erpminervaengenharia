# Correção: Follow-up 1 (Etapa 3) - Padronização

## 🐛 Problema Identificado

O componente compartilhado `step-followup-1.tsx` estava com campos genéricos e simplificados, **diferente** do Follow-up 1 implementado nas OS 01-04, que possui **11 perguntas específicas** com numeração e campos detalhados.

## ✅ Solução Aplicada

### Antes (Componente Genérico)
```tsx
// Campos simplificados
- Idade da edificação (Input text)
- Motivo da procura (Textarea)
- Quando aconteceu (Input text)
- O que foi feito (Textarea)
- Existe escopo (Select: Sim/Parcial/Não)
- Previsão orçamentária (Input text)
- Grau de urgência (Select: Baixo/Médio/Alto/Urgente)
- Contato local (3 campos)
```

### Depois (Componente Alinhado com OS 01-04)
```tsx
// 11 perguntas específicas com numeração
1. Qual a idade da edificação? (Select com 6 opções)
2. Qual o motivo fez você nos procurar? Quais problemas existentes? (Textarea 4 linhas)
3. Quando aconteceu? Há quanto tempo vem acontecendo? (Textarea 3 linhas)
4. O que já foi feito a respeito disso? (Textarea 3 linhas)
5. Existe um escopo de serviços ou laudo com diagnóstico do problema? (Textarea 2 linhas)
6. Existe previsão orçamentária para este serviço? Ou você precisa de parâmetro para taxa extra? (Textarea 2 linhas)
7. Qual o grau de urgência para executar esse serviço? (Select: 30 dias / 3 meses / 6 meses ou mais)
8. Nossas propostas são apresentadas, nós não enviamos orçamento. Você concorda? Deseja que faça o orçamento? Se sim, qual dia e horário sugeridos para apresentação da proposta comercial dessa visita técnica? (Textarea 3 linhas)
9. Nome (Contato no Local) (Input)
10. Contato (Telefone) (Input)
11. Cargo (Contato no Local) (Input)
+ Área de upload de arquivos
```

## 📋 Alterações Específicas

### 1. step-followup-1.tsx

#### Pergunta 1 - Idade da Edificação
**Antes**: Input text genérico
```tsx
<Input placeholder="Ex: 5 anos, em construção, projeto..." />
```

**Depois**: Select com opções específicas
```tsx
<Select>
  <SelectItem value="Ainda não foi entregue">Ainda não foi entregue</SelectItem>
  <SelectItem value="0 a 3 anos">0 a 3 anos</SelectItem>
  <SelectItem value="3 a 5 anos">3 a 5 anos</SelectItem>
  <SelectItem value="5 a 10 anos">5 a 10 anos</SelectItem>
  <SelectItem value="10 a 20 anos">10 a 20 anos</SelectItem>
  <SelectItem value="Acima de 20 anos">Acima de 20 anos</SelectItem>
</Select>
```

#### Pergunta 5 - Existe Escopo
**Antes**: Select com Sim/Parcial/Não
```tsx
<Select>
  <SelectItem value="sim">Sim</SelectItem>
  <SelectItem value="parcial">Parcial</SelectItem>
  <SelectItem value="nao">Não</SelectItem>
</Select>
```

**Depois**: Textarea livre
```tsx
<Textarea 
  rows={2}
  placeholder="Sim/Não e detalhes..."
/>
```

#### Pergunta 6 - Previsão Orçamentária
**Antes**: Input text simples
```tsx
<Input placeholder="Ex: R$ 50.000,00 ou 'A definir'" />
```

**Depois**: Textarea com pergunta completa
```tsx
<Textarea 
  rows={2}
  placeholder="Informe o orçamento disponível..."
/>
```

#### Pergunta 7 - Grau de Urgência
**Antes**: 4 opções (Baixo/Médio/Alto/Urgente)
```tsx
<SelectItem value="baixo">Baixo</SelectItem>
<SelectItem value="medio">Médio</SelectItem>
<SelectItem value="alto">Alto</SelectItem>
<SelectItem value="urgente">Urgente</SelectItem>
```

**Depois**: 3 opções com prazo específico
```tsx
<SelectItem value="30 dias">30 dias</SelectItem>
<SelectItem value="3 meses">3 meses</SelectItem>
<SelectItem value="6 meses ou mais">6 meses ou mais</SelectItem>
```

#### Pergunta 8 - Nova (Apresentação de Proposta)
**Adicionada**: Campo novo sobre apresentação de proposta
```tsx
<Textarea
  id="apresentacaoProposta"
  rows={3}
  placeholder="Resposta do cliente..."
/>
```

#### Seção de Anexos
**Adicionada**: Área de upload de arquivos ao final
```tsx
<div className="space-y-2">
  <Label>Anexar Arquivos (escopo, laudo, fotos)</Label>
  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
    <p className="text-sm text-muted-foreground">
      Clique para selecionar ou arraste arquivos aqui
    </p>
    <p className="text-xs text-muted-foreground mt-1">
      PDF, DOC, JPG, PNG - Máx. 10MB por arquivo
    </p>
  </div>
</div>
```

### 2. os-details-assessoria-page.tsx

#### Estado da Etapa 3
**Adicionado**: Campo `apresentacaoProposta` ao estado
```tsx
const [etapa3Data, setEtapa3Data] = useState({
  idadeEdificacao: '',
  motivoProcura: '',
  quandoAconteceu: '',
  oqueFeitoARespeito: '',
  existeEscopo: '',
  previsaoOrcamentaria: '',
  grauUrgencia: '',
  apresentacaoProposta: '',  // ✅ NOVO
  nomeContatoLocal: '',
  telefoneContatoLocal: '',
  cargoContatoLocal: '',
});
```

## 🎯 Resultado

### Consistência Total
Agora o Follow-up 1 é **idêntico** em:
- ✅ OS 01-04 (Obras)
- ✅ OS 05-06 (Assessoria)

### Benefícios
1. **Experiência uniforme**: Usuários veem o mesmo formulário em todos os fluxos
2. **Dados padronizados**: Mesma estrutura de dados facilita análises
3. **Manutenção simplificada**: Uma alteração reflete em todos os fluxos
4. **Componente reutilizável**: Pronto para OS 07-13

## 📊 Comparação Detalhada

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Total de perguntas | 10 | 11 |
| Numeração | ❌ Não | ✅ Sim (1-11) |
| Pergunta 1 (Idade) | Input text | Select com 6 opções |
| Pergunta 5 (Escopo) | Select (3 opções) | Textarea livre |
| Pergunta 6 (Orçamento) | Input text | Textarea |
| Pergunta 7 (Urgência) | Select (4 opções) | Select (3 opções) |
| Pergunta 8 (Apresentação) | ❌ Não existia | ✅ Adicionada |
| Upload de arquivos | ❌ Não | ✅ Sim |
| Campos obrigatórios (*) | ❌ Não marcados | ✅ Marcados (1,2,3,7,8,9,10) |

## 🔍 Validação

### OS 01-04
```tsx
{currentStep === 3 && (
  <StepFollowup1 data={etapa3Data} onDataChange={setEtapa3Data} />
)}
```

### OS 05-06
```tsx
{currentStep === 3 && (
  <StepFollowup1 data={etapa3Data} onDataChange={setEtapa3Data} />
)}
```

**Resultado**: Ambos renderizam o mesmo formulário com 11 perguntas numeradas! ✅

## 📝 Interface TypeScript

```typescript
interface StepFollowup1Props {
  data: {
    idadeEdificacao: string;           // Select: 6 opções
    motivoProcura: string;             // Textarea 4 linhas
    quandoAconteceu: string;           // Textarea 3 linhas
    oqueFeitoARespeito: string;        // Textarea 3 linhas
    existeEscopo: string;              // Textarea 2 linhas
    previsaoOrcamentaria: string;      // Textarea 2 linhas
    grauUrgencia: string;              // Select: 3 opções
    apresentacaoProposta: string;      // Textarea 3 linhas ✅ NOVO
    nomeContatoLocal: string;          // Input
    telefoneContatoLocal: string;      // Input
    cargoContatoLocal: string;         // Input
  };
  onDataChange: (data: any) => void;
}
```

## ✅ Status

- [x] Componente `step-followup-1.tsx` atualizado
- [x] Estado `etapa3Data` em OS 05-06 atualizado
- [x] Validação de consistência
- [x] Documentação atualizada

---

**Data**: 2024-01-09  
**Arquivo**: `/components/os/steps/shared/step-followup-1.tsx`  
**Status**: ✅ Corrigido e Alinhado
