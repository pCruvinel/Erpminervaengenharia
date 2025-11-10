# 📚 Dicionário de Componentes de Fluxo - Minerva ERP

**Versão**: 1.0  
**Data**: 2024-01-09  
**Status**: ✅ Definido  

---

## 🎯 Instrução Principal (Regra de Arquitetura)

Esta é uma **instrução de arquitetura de software** para o projeto Minerva ERP.

### Conceito
Nosso projeto possui múltiplos **fluxos de Ordem de Serviço (OS)** definidos em:
- `FLOW_OS_01_04.md` - Fluxo de OS 01-04 (16 etapas - Lead → Cliente)
- `FLOW_OS_05_06.md` - Fluxo de OS 05-06 (Assessoria)

Várias etapas (como "Identificação do Cliente" ou "Follow-up 1") **se repetem exatamente da mesma forma** em diferentes fluxos.

### Objetivo
Definir (componentizar) essas etapas repetitivas como **componentes React (Next.js) reutilizáveis**, criando um **Dicionário de Componentes de Fluxo** que mapeia:

```
Nome de Componente → Definição de UI específica
```

### Regra de Uso
⚠️ **IMPORTANTE**: Sempre que um desses **Nomes de Componente** for usado em um prompt futuro, você DEVE:
- ✅ Renderizar o **componente exato** conforme definido neste dicionário
- ❌ **NÃO** recriar os campos manualmente
- ✅ Seguir o `DESIGN_SYSTEM.md` (v2.0 Dourado)
- ✅ Seguir o `styles/globals.css`

---

## 📂 Estrutura de Arquivos

### Localização dos Componentes

```
components/
├── os/
│   └── steps/
│       ├── shared/          ← Componentes compartilhados entre fluxos
│       │   ├── step-identificacao-lead.tsx
│       │   ├── step-followup-1.tsx
│       │   ├── step-followup-3.tsx
│       │   ├── step-precificacao.tsx
│       │   ├── step-gerar-proposta.tsx
│       │   ├── step-agendar-apresentacao.tsx
│       │   ├── step-realizar-apresentacao.tsx
│       │   ├── step-gerar-contrato.tsx
│       │   └── step-contrato-assinado.tsx
│       │
│       └── assessoria/      ← Componentes específicos de Assessoria
│           ├── step-selecao-tipo-assessoria.tsx
│           ├── step-memorial-escopo-assessoria.tsx
│           └── step-ativar-contrato-assessoria.tsx
```

### Convenção de Nomenclatura

#### Arquivos
```tsx
// Pattern: step-[nome-kebab-case].tsx
step-identificacao-lead.tsx
step-followup-1.tsx
step-precificacao.tsx
```

#### Componentes (Export)
```tsx
// Pattern: Step + PascalCase
export function StepIdentificacaoLead({ ... }) { }
export function StepFollowUp1({ ... }) { }
export function StepPrecificacao({ ... }) { }
```

#### Importação
```tsx
// Em os-details-workflow-page.tsx
import { StepIdentificacaoLead } from './steps/shared/step-identificacao-lead';
import { StepFollowUp1 } from './steps/shared/step-followup-1';
import { StepPrecificacao } from './steps/shared/step-precificacao';
```

---

## 📚 Dicionário de Componentes

### Índice Rápido

| Nome do Componente | Arquivo | Usado em | Status |
|-------------------|---------|----------|--------|
| `StepIdentificacaoLead` | `step-identificacao-lead.tsx` | OS 01-04 (Etapa 1) | ✅ Criado |
| `StepFollowUp1` | `step-followup-1.tsx` | OS 01-04 (Etapa 3), OS 05-06 (Etapa 3) | ✅ Criado |
| `StepFollowUp2` | `step-followup-2.tsx` | OS 01-04 (Etapa 6) | ✅ Criado |
| `StepMemorialEscopo` | `step-memorial-escopo.tsx` | OS 01-04 (Etapa 8) | ✅ Criado |
| `StepPrecificacao` | `step-precificacao.tsx` | OS 01-04 (Etapa 9) | ✅ Criado |
| `StepGerarProposta` | `step-gerar-proposta.tsx` | OS 01-04 (Etapa 10) | ✅ Criado |
| `StepAgendarApresentacao` | `step-agendar-apresentacao.tsx` | OS 01-04 (Etapa 11) | ✅ Criado |
| `StepRealizarApresentacao` | `step-realizar-apresentacao.tsx` | OS 01-04 (Etapa 12) | ✅ Criado |
| `StepFollowUp3` | `step-followup-3.tsx` | OS 01-04 (Etapa 13) | ✅ Criado |
| `StepGerarContrato` | `step-gerar-contrato.tsx` | OS 01-04 (Etapa 14) | ✅ Criado |
| `StepContratoAssinado` | `step-contrato-assinado.tsx` | OS 01-04 (Etapa 15) | ✅ Criado |

---

## 🔹 Componente 1: StepIdentificacaoLead

### Definição
**Nome**: "Identificação do Cliente/Lead"  
**Arquivo**: `components/os/steps/shared/step-identificacao-lead.tsx`  
**Usado em**: 
- OS 01-04 (Etapa 1) - Fluxo Lead → Cliente

### Descrição
Componente que implementa a **Etapa 1** do fluxo de OS 01-04. Permite ao usuário:
1. **Buscar e selecionar** um lead existente via Combobox
2. **Criar um novo lead** através de Dialog com formulário completo

### Interface (Props)

```tsx
interface StepIdentificacaoLeadProps {
  selectedLeadId: string;
  onSelectLead: (leadId: string) => void;
  showCombobox: boolean;
  onShowComboboxChange: (show: boolean) => void;
  showNewLeadDialog: boolean;
  onShowNewLeadDialogChange: (show: boolean) => void;
  formData: {
    nome: string;
    cpfCnpj: string;
    tipo: string;
    nomeResponsavel: string;
    cargoResponsavel: string;
    telefone: string;
    email: string;
    tipoEdificacao: string;
    qtdUnidades: string;
    qtdBlocos: string;
    qtdPavimentos: string;
    tipoTelhado: string;
    possuiElevador: boolean;
    possuiPiscina: boolean;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  onFormDataChange: (data: any) => void;
  onSaveNewLead: () => void;
}
```

### Estrutura UI

```tsx
<>
  <Alert>
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      Associe esta OS a um lead existente ou crie um novo cadastro.
    </AlertDescription>
  </Alert>

  <div className="space-y-4">
    <Label>Cliente / Lead</Label>
    
    {/* Combobox de Busca */}
    <Popover open={showCombobox} onOpenChange={onShowComboboxChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-full justify-between">
          {selectedLead ? selectedLead.nome : "Buscar por nome, CPF ou CNPJ..."}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start" style={{ width: 'var(--radix-popover-trigger-width)' }}>
        <Command>
          <CommandInput placeholder="Buscar por nome, CPF ou CNPJ..." />
          <CommandEmpty>
            <div className="py-6 text-center text-sm text-muted-foreground">
              Nenhum cliente encontrado.
            </div>
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {mockLeads.map((lead) => (
                <CommandItem key={lead.id} value={`${lead.nome} ${lead.cpfCnpj}`} onSelect={() => onSelectLead(lead.id)}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{lead.nome.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{lead.nome}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {lead.cpfCnpj} • {lead.telefone}
                    </div>
                  </div>
                  <Check className={cn("h-4 w-4 shrink-0", selectedLeadId === lead.id ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          
          {/* Footer com botão "Criar novo" */}
          <div className="border-t bg-white p-2">
            <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => { onShowComboboxChange(false); onShowNewLeadDialogChange(true); }}>
              <UserPlus className="h-4 w-4 mr-2" />
              Criar novo cliente
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>

    {/* Preview do Lead Selecionado */}
    {selectedLead && (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Nome / Razão Social</Label>
              <p className="text-sm font-medium">{selectedLead.nome}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">CPF/CNPJ</Label>
              <p className="text-sm font-medium">{selectedLead.cpfCnpj}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Tipo de Edificação</Label>
              <p className="text-sm font-medium">{selectedLead.tipoEdificacao}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Telefone</Label>
              <p className="text-sm font-medium">{selectedLead.telefone}</p>
            </div>
            <div className="col-span-2">
              <Label className="text-xs text-muted-foreground">Endereço</Label>
              <p className="text-sm font-medium">{selectedLead.endereco}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )}
  </div>

  {/* Dialog de Criação de Novo Lead */}
  <Dialog open={showNewLeadDialog} onOpenChange={onShowNewLeadDialogChange}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Cadastrar Novo Lead</DialogTitle>
        <DialogDescription>
          Preencha os dados do novo lead. Campos com * são obrigatórios.
        </DialogDescription>
      </DialogHeader>
      
      {/* Formulário completo com 3 blocos:
          1. Identificação
          2. Dados da Edificação (com lógica condicional)
          3. Endereço (com integração ViaCEP)
      */}
      
      <DialogFooter>
        <Button variant="outline" onClick={() => onShowNewLeadDialogChange(false)}>
          Cancelar
        </Button>
        <Button onClick={onSaveNewLead} style={{ backgroundColor: '#06b6d4', color: 'white' }}>
          Salvar Lead
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</>
```

### Campos do Formulário "Cadastrar Novo Lead"

#### Bloco 1: Identificação
- Nome / Razão Social * (Input)
- CPF / CNPJ * (Input com máscara)
- Tipo de Pessoa * (Select: Física/Jurídica)
- Nome do Responsável (Input)
- Cargo do Responsável (Input)
- Telefone / WhatsApp * (Input com máscara)
- Email * (Input type=email)

#### Bloco 2: Dados da Edificação
- Tipo de Edificação * (Select)
- Qtd. Unidades Autônomas * (Input number - **condicional**)
- Qtd. Blocos * (Input number - **condicional**)
- Qtd. de Pavimentação (Input number)
- Tipo de Telhado * (Select)
- Possui Elevador? (Switch)
- Possui Piscina? (Switch)

**Lógica Condicional:**
- "Qtd. Unidades" aparece se: Condomínio Comercial OU Condomínio Residencial (Casas/Apartamentos)
- "Qtd. Blocos" aparece se: Condomínio Residencial - Apartamentos

#### Bloco 3: Endereço
- CEP * (Input com ViaCEP)
- Número * (Input)
- Endereço (Rua) * (Input - auto-preenchido)
- Complemento (Input)
- Bairro * (Input - auto-preenchido)
- Cidade * (Input - auto-preenchido)
- Estado * (Input - auto-preenchido)

### Design System
- **Alert**: Border cyan, fundo cyan-50
- **Combobox**: Largura adaptável (`width: var(--radix-popover-trigger-width)`)
- **Items**: Avatar 32px, texto truncado
- **Preview**: Fundo green-50, border green-200
- **Dialog**: max-w-4xl, max-h-90vh, overflow-y-auto
- **Botão Salvar**: bg #06b6d4 (cyan)

---

## 🔹 Componente 2: StepFollowUp1

### Definição
**Nome**: "Follow-up 1 (Entrevista Inicial)"  
**Arquivo**: `components/os/steps/shared/step-followup-1.tsx`  
**Usado em**:
- OS 01-04 (Etapa 3) - Fluxo Lead → Cliente
- OS 05-06 (Etapa 3) - Assessoria

### Descrição
Componente **100% idêntico** entre os fluxos. Implementa a entrevista inicial com o cliente/lead para levantar informações sobre o projeto.

### Interface (Props)

```tsx
interface StepFollowUp1Props {
  data: {
    idadeEdificacao: string;
    motivoProcura: string;
    quandoAconteceu: string;
    oqueFeitoARespeito: string;
    existeEscopo: string;
    previsaoOrcamentaria: string;
    grauUrgencia: string;
    apresentacaoProposta: string; // ✅ NOVO CAMPO
    nomeContatoLocal: string;
    telefoneContatoLocal: string;
    cargoContatoLocal: string;
  };
  onDataChange: (data: any) => void;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert>
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      Realize a entrevista inicial com o lead/cliente para levantar informações sobre o projeto.
    </AlertDescription>
  </Alert>

  <div className="space-y-4">
    {/* 1. Qual a idade da edificação? * */}
    <div className="space-y-2">
      <Label htmlFor="idadeEdificacao">
        1. Qual a idade da edificação? <span className="text-destructive">*</span>
      </Label>
      <Select value={data.idadeEdificacao} onValueChange={(value) => onDataChange({ ...data, idadeEdificacao: value })}>
        <SelectTrigger id="idadeEdificacao">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Ainda não foi entregue">Ainda não foi entregue</SelectItem>
          <SelectItem value="0 a 3 anos">0 a 3 anos</SelectItem>
          <SelectItem value="3 a 5 anos">3 a 5 anos</SelectItem>
          <SelectItem value="5 a 10 anos">5 a 10 anos</SelectItem>
          <SelectItem value="10 a 20 anos">10 a 20 anos</SelectItem>
          <SelectItem value="Acima de 20 anos">Acima de 20 anos</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* 2. Motivo da procura * */}
    <div className="space-y-2">
      <Label htmlFor="motivoProcura">
        2. Qual o motivo fez você nos procurar? Quais problemas existentes? <span className="text-destructive">*</span>
      </Label>
      <Textarea id="motivoProcura" rows={4} value={data.motivoProcura} onChange={(e) => onDataChange({ ...data, motivoProcura: e.target.value })} placeholder="Descreva os problemas e motivações..." />
    </div>

    {/* 3. Quando aconteceu? * */}
    <div className="space-y-2">
      <Label htmlFor="quandoAconteceu">
        3. Quando aconteceu? Há quanto tempo vem acontecendo? <span className="text-destructive">*</span>
      </Label>
      <Textarea id="quandoAconteceu" rows={3} value={data.quandoAconteceu} onChange={(e) => onDataChange({ ...data, quandoAconteceu: e.target.value })} placeholder="Descreva o histórico do problema..." />
    </div>

    {/* 4. O que já foi feito? */}
    <div className="space-y-2">
      <Label htmlFor="oqueFeitoARespeito">4. O que já foi feito a respeito disso?</Label>
      <Textarea id="oqueFeitoARespeito" rows={3} value={data.oqueFeitoARespeito} onChange={(e) => onDataChange({ ...data, oqueFeitoARespeito: e.target.value })} placeholder="Descreva as ações já realizadas..." />
    </div>

    {/* 5. Existe escopo? */}
    <div className="space-y-2">
      <Label htmlFor="existeEscopo">5. Existe um escopo de serviços ou laudo com diagnóstico do problema?</Label>
      <Textarea id="existeEscopo" rows={2} value={data.existeEscopo} onChange={(e) => onDataChange({ ...data, existeEscopo: e.target.value })} placeholder="Sim/Não e detalhes..." />
    </div>

    {/* 6. Previsão orçamentária */}
    <div className="space-y-2">
      <Label htmlFor="previsaoOrcamentaria">6. Existe previsão orçamentária para este serviço? Ou você precisa de parâmetro para taxa extra?</Label>
      <Textarea id="previsaoOrcamentaria" rows={2} value={data.previsaoOrcamentaria} onChange={(e) => onDataChange({ ...data, previsaoOrcamentaria: e.target.value })} placeholder="Informe o orçamento disponível..." />
    </div>

    {/* 7. Grau de urgência * */}
    <div className="space-y-2">
      <Label htmlFor="grauUrgencia">
        7. Qual o grau de urgência para executar esse serviço? <span className="text-destructive">*</span>
      </Label>
      <Select value={data.grauUrgencia} onValueChange={(value) => onDataChange({ ...data, grauUrgencia: value })}>
        <SelectTrigger id="grauUrgencia">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30 dias">30 dias</SelectItem>
          <SelectItem value="3 meses">3 meses</SelectItem>
          <SelectItem value="6 meses ou mais">6 meses ou mais</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* 8. Apresentação da proposta * (NOVO) */}
    <div className="space-y-2">
      <Label htmlFor="apresentacaoProposta">
        8. Nossas propostas são apresentadas, nós não enviamos orçamento. Você concorda? Deseja que faça o orçamento? Se sim, qual dia e horário sugeridos para apresentação da proposta comercial dessa visita técnica? <span className="text-destructive">*</span>
      </Label>
      <Textarea id="apresentacaoProposta" rows={3} value={data.apresentacaoProposta} onChange={(e) => onDataChange({ ...data, apresentacaoProposta: e.target.value })} placeholder="Resposta do cliente..." />
    </div>

    <Separator />

    <h3 className="text-sm font-medium">Dados do Contato no Local</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 9. Nome (Contato no Local) * */}
      <div className="space-y-2">
        <Label htmlFor="nomeContatoLocal">
          9. Nome (Contato no Local) <span className="text-destructive">*</span>
        </Label>
        <Input id="nomeContatoLocal" value={data.nomeContatoLocal} onChange={(e) => onDataChange({ ...data, nomeContatoLocal: e.target.value })} placeholder="Nome completo" />
      </div>

      {/* 10. Contato (Telefone) * */}
      <div className="space-y-2">
        <Label htmlFor="telefoneContatoLocal">
          10. Contato (Telefone) <span className="text-destructive">*</span>
        </Label>
        <Input id="telefoneContatoLocal" value={data.telefoneContatoLocal} onChange={(e) => onDataChange({ ...data, telefoneContatoLocal: e.target.value })} placeholder="(00) 00000-0000" />
      </div>

      {/* 11. Cargo (Contato no Local) */}
      <div className="col-span-2 space-y-2">
        <Label htmlFor="cargoContatoLocal">11. Cargo (Contato no Local)</Label>
        <Input id="cargoContatoLocal" value={data.cargoContatoLocal} onChange={(e) => onDataChange({ ...data, cargoContatoLocal: e.target.value })} placeholder="Ex: Síndico, Zelador, Gerente..." />
      </div>
    </div>

    <Separator />

    {/* Anexar Arquivos */}
    <div className="space-y-2">
      <Label>Anexar Arquivos (escopo, laudo, fotos)</Label>
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Clique para selecionar ou arraste arquivos aqui</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG, DOCX, XLSX (máx. 10MB)</p>
      </div>
    </div>
  </div>
</div>
```

### Campos (11 perguntas)

1. **Idade da edificação** * (Select - 6 opções)
2. **Motivo da procura** * (Textarea - 4 rows)
3. **Quando aconteceu** * (Textarea - 3 rows)
4. **O que foi feito** (Textarea - 3 rows)
5. **Existe escopo** (Textarea - 2 rows)
6. **Previsão orçamentária** (Textarea - 2 rows)
7. **Grau de urgência** * (Select - 3 opções)
8. **Apresentação da proposta** * (Textarea - 3 rows) - ✅ **NOVO CAMPO**
9. **Nome (Contato no Local)** * (Input)
10. **Telefone (Contato no Local)** * (Input)
11. **Cargo (Contato no Local)** (Input)

**Anexos**: Upload de arquivos (escopo, laudo, fotos)

### Design System
- **Alert**: Border cyan, fundo cyan-50
- **Obrigatórios**: Asterisco vermelho
- **Grid**: 2 colunas em desktop, 1 em mobile
- **Separator**: Entre seções

---

## 🔹 Componente 3: StepFollowUp2

### Definição
**Nome**: "Follow-up 2 (Pós-Visita)"  
**Arquivo**: `components/os/steps/shared/step-followup-2.tsx`  
**Usado em**:
- OS 01-04 (Etapa 6) - Fluxo Lead → Cliente

### Descrição
Formulário técnico dividido em **3 momentos** com as informações coletadas durante e após a visita técnica.

### Interface (Props)

```tsx
interface StepFollowUp2Props {
  data: {
    // Momento 1: Perguntas Durante a Visita - Respostas do Cliente
    outrasEmpresas: string;
    comoEsperaResolver: string;
    expectativaCliente: string;
    estadoAncoragem: string;
    fotosAncoragem: Array<{ file: File; comment: string }>;
    
    // Momento 2: Avaliação Geral da Visita
    quemAcompanhou: string;
    avaliacaoVisita: string; // "Produtiva, cliente muito interessado" | "Pouco produtiva" | "Improdutiva"
    
    // Momento 3: Respostas do Engenheiro
    estadoGeralEdificacao: string;
    servicoResolver: string;
    arquivosGerais: Array<{ file: File; comment: string }>;
  };
  onDataChange: (data: any) => void;
}
```

### Estrutura UI

**Momento 1**: Perguntas Durante a Visita - Respostas do Cliente
1. Há outras empresas realizando visita técnica? * (Textarea)
2. Como você espera resolver esse problema? * (Textarea)
3. Qual a principal expectativa do cliente? * (Textarea)
4. Qual o estado do sistema de ancoragem? * (Textarea)
5. Anexar fotos do sistema de ancoragem (Upload com comentários)

**Momento 2**: Avaliação Geral da Visita
6. Quem acompanhou a visita? * (Textarea)
7. Avaliação da Visita * (RadioGroup - 3 opções)

**Momento 3**: Respostas do Engenheiro
8. Qual o estado geral da edificação? * (Textarea)
9. Qual o serviço deve ser feito? * (Textarea)
10. Anexar Arquivos (Fotos gerais, croquis, etc) (Upload com comentários)

### Design System
- **Divisores**: Usar `<div className="bg-neutral-100 px-4 py-2 rounded-md">` para títulos dos momentos
- **Upload com comentários**: Lista de arquivos com Input de comentário para cada
- **RadioGroup**: Vertical spacing

---

## 🔹 Componente 4: StepMemorialEscopo

### Definição
**Nome**: "Formulário Memorial (Escopo e Prazos)"  
**Arquivo**: `components/os/steps/shared/step-memorial-escopo.tsx`  
**Usado em**:
- OS 01-04 (Etapa 8) - Fluxo Lead → Cliente

### Descrição
Digitalize o escopo técnico e prazos do memorial. Permite adicionar múltiplas **etapas principais** e **sub-etapas**.

### Interface (Props)

```tsx
interface SubEtapa {
  nome: string;
  m2: string;
  diasUteis: string;
  total: string;
}

interface EtapaPrincipal {
  nome: string;
  subetapas: SubEtapa[];
}

interface StepMemorialEscopoProps {
  data: {
    objetivo: string;
    etapasPrincipais: EtapaPrincipal[];
    planejamentoInicial: string;
    logisticaTransporte: string;
    preparacaoArea: string;
    // execucaoObra é calculado automaticamente
  };
  onDataChange: (data: any) => void;
  onAdicionarEtapaPrincipal: () => void;
  onRemoverEtapaPrincipal: (index: number) => void;
  onAtualizarEtapaPrincipal: (index: number, nome: string) => void;
  onAdicionarSubetapa: (etapaIndex: number) => void;
  onRemoverSubetapa: (etapaIndex: number, subIndex: number) => void;
  onAtualizarSubetapa: (etapaIndex: number, subIndex: number, field: string, value: string) => void;
  calcularExecucaoTotal: () => number;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert>...</Alert>

  {/* 1. Objetivo */}
  <div className="space-y-2">
    <Label htmlFor="objetivo">
      1. Objetivo da contratação do serviço? <span className="text-destructive">*</span>
    </Label>
    <Textarea id="objetivo" rows={3} value={data.objetivo} onChange={...} placeholder="Descreva o objetivo principal do serviço..." />
  </div>

  <Separator />

  {/* 2. Etapas da Especificação Técnica */}
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Label className="text-base">2. Etapas da Especificação Técnica</Label>
      <Button variant="outline" size="sm" onClick={onAdicionarEtapaPrincipal} style={{ borderColor: '#06b6d4', color: '#06b6d4' }}>
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Etapa Principal
      </Button>
    </div>

    {data.etapasPrincipais.length === 0 && (
      <Card className="bg-neutral-50 border-dashed">
        <CardContent className="pt-6 text-center text-sm text-muted-foreground">
          Nenhuma etapa adicionada. Clique em "Adicionar Etapa Principal" para começar.
        </CardContent>
      </Card>
    )}

    {data.etapasPrincipais.map((etapa, etapaIndex) => (
      <Card key={etapaIndex} className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center gap-3">
            <Input value={etapa.nome} onChange={...} placeholder={`Ex: ${etapaIndex + 1}. Tratamento de Fachada`} className="flex-1" />
            <Button variant="ghost" size="sm" onClick={() => onAdicionarSubetapa(etapaIndex)}>
              <Plus className="h-4 w-4 mr-2" />
              Sub-etapa
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onRemoverEtapaPrincipal(etapaIndex)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {etapa.subetapas.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma sub-etapa. Clique em "Sub-etapa" para adicionar.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground">
                <div className="col-span-2">Sub-etapa</div>
                <div>m²</div>
                <div>Dias úteis</div>
                <div>Total R$</div>
              </div>
              {etapa.subetapas.map((sub, subIndex) => (
                <div key={subIndex} className="grid grid-cols-5 gap-2">
                  <Input value={sub.nome} onChange={...} placeholder="Descrição da sub-etapa" className="col-span-2" />
                  <Input type="number" value={sub.m2} onChange={...} placeholder="0" />
                  <Input type="number" value={sub.diasUteis} onChange={...} placeholder="0" />
                  <div className="flex gap-2">
                    <Input type="number" value={sub.total} onChange={...} placeholder="0,00" />
                    <Button variant="ghost" size="sm" onClick={() => onRemoverSubetapa(etapaIndex, subIndex)}>
                      <X className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>

  <Separator />

  {/* 3. Prazo (Dias Úteis) */}
  <div className="space-y-4">
    <Label className="text-base">3. Prazo (Dias Úteis)</Label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="planejamentoInicial">Planejamento inicial *</Label>
        <Input id="planejamentoInicial" type="number" value={data.planejamentoInicial} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="logisticaTransporte">Logística e transporte de materiais *</Label>
        <Input id="logisticaTransporte" type="number" value={data.logisticaTransporte} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preparacaoArea">Preparação de área de trabalho *</Label>
        <Input id="preparacaoArea" type="number" value={data.preparacaoArea} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="execucaoObra">Execução de obra (calculado automaticamente)</Label>
        <Input id="execucaoObra" type="number" value={calcularExecucaoTotal()} disabled className="bg-neutral-100" />
        <p className="text-xs text-muted-foreground">Soma automática dos dias úteis de todas as sub-etapas</p>
      </div>
    </div>
  </div>
</div>
```

### Funcionalidades
- **Adicionar/Remover Etapa Principal**: Botões com ícones Plus/Trash2
- **Adicionar/Remover Sub-etapa**: Botões inline
- **Grid de Sub-etapas**: 5 colunas (Nome: 2, m²: 1, Dias: 1, Total: 1)
- **Cálculo Automático**: Soma dos dias úteis das sub-etapas

### Design System
- **Card da Etapa**: Border primary/20, Header bg primary/5
- **Empty State**: bg-neutral-50, border-dashed
- **Botão Adicionar**: Border cyan, texto cyan
- **Grid**: 2 colunas em desktop

---

## 🔹 Componente 5: StepPrecificacao

### Definição
**Nome**: "Precificação (Formulário Financeiro)"  
**Arquivo**: `components/os/steps/shared/step-precificacao.tsx`  
**Usado em**:
- OS 01-04 (Etapa 9) - Fluxo Lead → Cliente

### Descrição
Define a precificação final com base nos custos do memorial. **Valores calculados automaticamente**.

### Interface (Props)

```tsx
interface StepPrecificacaoProps {
  data: {
    percentualImprevisto: string;
    percentualLucro: string;
    percentualImposto: string;
    percentualEntrada: string;
    numeroParcelas: string;
  };
  onDataChange: (data: any) => void;
  calcularCustoBase: () => number; // Soma das sub-etapas do memorial
  calcularValorAtual: () => number; // Custo Base + percentuais
  calcularValorEntrada: () => number; // Valor Atual * % Entrada
  calcularValorParcela: () => number; // (Valor Atual - Entrada) / Nº Parcelas
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert>...</Alert>

  {/* Custo Base */}
  <div className="space-y-2">
    <Label htmlFor="custoBase">Custo Base (Memorial)</Label>
    <Input id="custoBase" type="text" value={`R$ ${calcularCustoBase().toFixed(2).replace('.', ',')}`} disabled className="bg-neutral-100 text-lg" />
    <p className="text-xs text-muted-foreground">Soma automática de todos os valores das sub-etapas do memorial</p>
  </div>

  <Separator />

  {/* Percentuais e Valor Total */}
  <div className="space-y-4">
    <Label className="text-base">Percentuais e Valor Total</Label>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <Label htmlFor="percentualImprevisto">% Imprevisto *</Label>
        <Input id="percentualImprevisto" type="number" value={data.percentualImprevisto} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="percentualLucro">% Lucro *</Label>
        <Input id="percentualLucro" type="number" value={data.percentualLucro} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="percentualImposto">% Imposto *</Label>
        <Input id="percentualImposto" type="number" value={data.percentualImposto} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="valorAtual">Valor Atual (Total)</Label>
        <Input id="valorAtual" type="text" value={`R$ ${calcularValorAtual().toFixed(2).replace('.', ',')}`} disabled className="bg-green-50 border-green-200 text-lg font-medium" />
      </div>
    </div>
  </div>

  <Separator />

  {/* Condições de Pagamento */}
  <div className="space-y-4">
    <Label className="text-base">Condições de Pagamento</Label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="percentualEntrada">% Entrada *</Label>
        <Input id="percentualEntrada" type="number" value={data.percentualEntrada} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="numeroParcelas">Nº de Parcelas *</Label>
        <Input id="numeroParcelas" type="number" value={data.numeroParcelas} onChange={...} placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="valorEntrada">Valor de Entrada (Calculado)</Label>
        <Input id="valorEntrada" type="text" value={`R$ ${calcularValorEntrada().toFixed(2).replace('.', ',')}`} disabled className="bg-neutral-100" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="valorParcela">Valor de Cada Parcela (Calculado)</Label>
        <Input id="valorParcela" type="text" value={`R$ ${calcularValorParcela().toFixed(2).replace('.', ',')}`} disabled className="bg-neutral-100" />
      </div>
    </div>
  </div>

  {/* Resumo Financeiro */}
  <Card className="bg-primary/5 border-primary/20">
    <CardHeader>
      <CardTitle className="text-base">Resumo Financeiro</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Custo Base:</span>
        <span className="text-sm font-medium">R$ {calcularCustoBase().toFixed(2).replace('.', ',')}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Valor Total da Proposta:</span>
        <span className="text-sm font-medium">R$ {calcularValorAtual().toFixed(2).replace('.', ',')}</span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Entrada:</span>
        <span className="text-sm font-medium">R$ {calcularValorEntrada().toFixed(2).replace('.', ',')}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Parcelas:</span>
        <span className="text-sm font-medium">{data.numeroParcelas}x de R$ {calcularValorParcela().toFixed(2).replace('.', ',')}</span>
      </div>
    </CardContent>
  </Card>
</div>
```

### Cálculos

```tsx
// Custo Base = Soma de todos os "Total R$" das sub-etapas
const calcularCustoBase = () => {
  return etapasPrincipais.reduce((total, etapa) => {
    return total + etapa.subetapas.reduce((subtotal, sub) => subtotal + parseFloat(sub.total || '0'), 0);
  }, 0);
};

// Valor Atual = Custo Base * (1 + %Imprevisto/100 + %Lucro/100 + %Imposto/100)
const calcularValorAtual = () => {
  const custoBase = calcularCustoBase();
  const imprevisto = parseFloat(data.percentualImprevisto || '0') / 100;
  const lucro = parseFloat(data.percentualLucro || '0') / 100;
  const imposto = parseFloat(data.percentualImposto || '0') / 100;
  return custoBase * (1 + imprevisto + lucro + imposto);
};

// Valor Entrada = Valor Atual * (%Entrada / 100)
const calcularValorEntrada = () => {
  return calcularValorAtual() * (parseFloat(data.percentualEntrada || '0') / 100);
};

// Valor Parcela = (Valor Atual - Valor Entrada) / Nº Parcelas
const calcularValorParcela = () => {
  const valorAtual = calcularValorAtual();
  const valorEntrada = calcularValorEntrada();
  const numeroParcelas = parseInt(data.numeroParcelas || '1');
  return (valorAtual - valorEntrada) / numeroParcelas;
};
```

### Design System
- **Custo Base**: bg-neutral-100, text-lg
- **Valor Atual**: bg-green-50, border-green-200, text-lg font-medium
- **Resumo**: Card com bg-primary/5, border-primary/20
- **Grid**: 4 colunas para percentuais, 2 colunas para pagamento

---

## 🔹 Componente 6: StepGerarProposta

### Definição
**Nome**: "Gerar Proposta Comercial"  
**Arquivo**: `components/os/steps/shared/step-gerar-proposta.tsx`  
**Usado em**:
- OS 01-04 (Etapa 10) - Fluxo Lead → Cliente

### Descrição
Etapa que requer **aprovação do Gestor ADM**. Visualiza e imprime a proposta comercial compilada com os dados das etapas anteriores.

### Interface (Props)

```tsx
interface StepGerarPropostaProps {
  onVisualizarProposta: () => void;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert className="border-yellow-200 bg-yellow-50">
    <AlertCircle className="h-4 w-4 text-yellow-600" />
    <AlertDescription className="text-yellow-700">
      <strong>Atenção:</strong> Esta etapa requer aprovação do Gestor ADM para ser finalizada.
    </AlertDescription>
  </Alert>

  <div className="flex flex-col items-center justify-center py-12 gap-6">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
      <FileText className="h-10 w-10 text-primary" />
    </div>
    <div className="text-center">
      <h3 className="font-medium mb-2">Proposta Comercial</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Visualize e imprima a proposta comercial compilada com os dados das etapas anteriores.
      </p>
      <Button onClick={onVisualizarProposta} style={{ backgroundColor: '#06b6d4', color: 'white' }}>
        <FileText className="h-4 w-4 mr-2" />
        Visualizar Proposta para Impressão
      </Button>
    </div>
  </div>
</div>
```

### Design System
- **Alert Amarelo**: border-yellow-200, bg-yellow-50, texto yellow-700
- **Círculo de Ícone**: w-20 h-20, bg-primary/10
- **Botão**: bg #06b6d4 (cyan)

---

## 🔹 Componente 7: StepAgendarApresentacao

### Definição
**Nome**: "Agendar Visita (Apresentação)"  
**Arquivo**: `components/os/steps/shared/step-agendar-apresentacao.tsx`  
**Usado em**:
- OS 01-04 (Etapa 11) - Fluxo Lead → Cliente

### Descrição
Agendar a visita para apresentação da proposta comercial ao cliente.

### Interface (Props)

```tsx
interface StepAgendarApresentacaoProps {
  dataAgendamento: string;
  onAgendar: () => void;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert>
    <Calendar className="h-4 w-4" />
    <AlertDescription>
      Agende a visita para apresentação da proposta comercial ao cliente.
    </AlertDescription>
  </Alert>

  <div className="flex flex-col items-center justify-center py-12 gap-6">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
      <Calendar className="h-10 w-10 text-primary" />
    </div>
    <div className="text-center">
      <h3 className="font-medium mb-2">Agendar Apresentação da Proposta</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Selecione a data e horário para apresentar a proposta comercial.
      </p>
      <Button onClick={onAgendar} style={{ backgroundColor: '#f97316', color: 'white' }}>
        <Calendar className="h-4 w-4 mr-2" />
        Agendar no Calendário
      </Button>
    </div>
  </div>

  {dataAgendamento && (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium">Apresentação agendada para:</p>
            <p className="text-sm text-muted-foreground">{dataAgendamento}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )}
</div>
```

### Design System
- **Botão Agendar**: bg #f97316 (laranja)
- **Card de Confirmação**: bg-green-50, border-green-200
- **Ícone Check**: text-green-600

---

## 🔹 Componente 8: StepRealizarApresentacao

### Definição
**Nome**: "Realizar Visita (Apresentação)"  
**Arquivo**: `components/os/steps/shared/step-realizar-apresentacao.tsx`  
**Usado em**:
- OS 01-04 (Etapa 12) - Fluxo Lead → Cliente

### Descrição
Confirmar a realização da apresentação da proposta comercial.

### Interface (Props)

```tsx
interface StepRealizarApresentacaoProps {
  apresentacaoRealizada: boolean;
  onConfirmarRealizacao: (realizada: boolean) => void;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert>
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      Confirme a realização da apresentação da proposta comercial.
    </AlertDescription>
  </Alert>

  <div className="flex flex-col items-center justify-center py-12 gap-6">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
      <Check className="h-10 w-10 text-primary" />
    </div>
    <div className="text-center">
      <h3 className="font-medium mb-2">Confirmar Realização da Apresentação</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Marque a caixa abaixo para confirmar que a apresentação foi realizada.
      </p>
      <div className="flex items-center space-x-2 justify-center">
        <Checkbox id="apresentacaoRealizada" checked={apresentacaoRealizada} onCheckedChange={onConfirmarRealizacao} />
        <Label htmlFor="apresentacaoRealizada" className="cursor-pointer">
          Apresentação realizada
        </Label>
      </div>
    </div>
  </div>

  {apresentacaoRealizada && (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium">Apresentação confirmada!</p>
            <p className="text-sm text-muted-foreground">Data: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )}
</div>
```

### Design System
- **Checkbox**: Padrão shadcn/ui
- **Card de Confirmação**: bg-green-50, border-green-200
- **Data**: Formato pt-BR

---

## 🔹 Componente 9: StepFollowUp3

### Definição
**Nome**: "Follow-up 3 (Pós-Apresentação)"  
**Arquivo**: `components/os/steps/shared/step-followup-3.tsx`  
**Usado em**:
- OS 01-04 (Etapa 13) - Fluxo Lead → Cliente

### Descrição
Documentar a reação do cliente após a apresentação da proposta comercial. Dividido em **3 momentos**.

### Interface (Props)

```tsx
interface StepFollowUp3Props {
  data: {
    // Momento 1: Sobre a Apresentação
    propostaApresentada: string;
    metodoApresentacao: string;
    clienteAchouProposta: string;
    
    // Momento 2: Contrato e Dores
    clienteAchouContrato: string;
    doresNaoAtendidas: string;
    indicadorFechamento: string; // "Fechado" | "Quente" | "Morno" | "Frio" | "Perdido"
    
    // Momento 3: Satisfação
    quemEstavaNaApresentacao: string;
    nivelSatisfacao: string; // "Produtiva, cliente interessado" | "Pouco produtiva" | "Improdutiva"
  };
  onDataChange: (data: any) => void;
}
```

### Estrutura UI

**Momento 1**: Sobre a Apresentação
1. Qual a proposta apresentada? * (Textarea)
2. Qual o método de apresentação? * (Textarea)
3. O que o cliente achou da proposta? * (Textarea)

**Momento 2**: Contrato e Dores do Cliente
4. O que o cliente achou do contrato? * (Textarea)
5. Quais as dores do cliente não atendidas? (Textarea)
6. Qual o indicador de fechamento da proposta? * (Select - 5 opções)

**Momento 3**: Satisfação do Cliente
7. Quem estava na apresentação? * (Textarea)
8. Qual o nível de satisfação do cliente? * (RadioGroup - 3 opções)

### Design System
- **Divisores**: `<div className="bg-neutral-100 px-4 py-2 rounded-md">` para títulos dos momentos
- **Select**: Indicador de Fechamento (Fechado, Quente, Morno, Frio, Perdido)
- **RadioGroup**: Nível de Satisfação

---

## 🔹 Componente 10: StepGerarContrato

### Definição
**Nome**: "Gerar Contrato (Upload)"  
**Arquivo**: `components/os/steps/shared/step-gerar-contrato.tsx`  
**Usado em**:
- OS 01-04 (Etapa 14) - Fluxo Lead → Cliente

### Descrição
Etapa que requer **aprovação do Gestor ADM**. Download do modelo de contrato e upload da minuta preenchida.

### Interface (Props)

```tsx
interface StepGerarContratoProps {
  contratoFile: File | null;
  onDownloadModelo: () => void;
  onUploadMinuta: (file: File) => void;
  onRemoverArquivo: () => void;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert className="border-yellow-200 bg-yellow-50">
    <AlertCircle className="h-4 w-4 text-yellow-600" />
    <AlertDescription className="text-yellow-700">
      <strong>Atenção:</strong> Esta etapa requer aprovação do Gestor ADM.
    </AlertDescription>
  </Alert>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Coluna 1: Download do Modelo */}
    <Card>
      <CardHeader>
        <CardTitle className="text-base">1. Baixar Modelo</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
        <Download className="h-12 w-12 text-muted-foreground" />
        <p className="text-sm text-muted-foreground text-center">
          Baixe o modelo de contrato padrão
        </p>
        <Button variant="outline" onClick={onDownloadModelo} style={{ borderColor: '#06b6d4', color: '#06b6d4' }}>
          <Download className="h-4 w-4 mr-2" />
          Baixar Modelo de Contrato (.docx)
        </Button>
      </CardContent>
    </Card>

    {/* Coluna 2: Upload da Minuta */}
    <Card>
      <CardHeader>
        <CardTitle className="text-base">2. Upload da Minuta</CardTitle>
      </CardHeader>
      <CardContent className="py-8">
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-1">
            Fazer Upload da Minuta do Contrato
          </p>
          <p className="text-xs text-muted-foreground">
            DOCX, PDF (máx. 15MB)
          </p>
        </div>
      </CardContent>
    </Card>
  </div>

  {contratoFile && (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-green-600" />
          <div className="flex-1">
            <p className="text-sm font-medium">Minuta do contrato anexada:</p>
            <p className="text-sm text-muted-foreground">{contratoFile.name}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onRemoverArquivo}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )}
</div>
```

### Design System
- **Grid**: 2 colunas em desktop
- **Botão Download**: Border cyan, texto cyan
- **Upload Area**: Border dashed, hover:border-primary
- **Card de Confirmação**: bg-green-50, border-green-200

---

## 🔹 Componente 11: StepContratoAssinado

### Definição
**Nome**: "Contrato Assinado"  
**Arquivo**: `components/os/steps/shared/step-contrato-assinado.tsx`  
**Usado em**:
- OS 01-04 (Etapa 15) - Fluxo Lead → Cliente

### Descrição
Confirmar que o contrato foi assinado pelo cliente para prosseguir.

### Interface (Props)

```tsx
interface StepContratoAssinadoProps {
  contratoAssinado: boolean;
  onConfirmarAssinatura: (assinado: boolean) => void;
}
```

### Estrutura UI

```tsx
<div className="space-y-6">
  <Alert>
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      Confirme que o contrato foi assinado pelo cliente para prosseguir.
    </AlertDescription>
  </Alert>

  <div className="flex flex-col items-center justify-center py-12 gap-6">
    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
      <FileText className="h-10 w-10 text-primary" />
    </div>
    <div className="text-center">
      <h3 className="font-medium mb-2">Contrato Assinado pelo Cliente</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Marque a caixa abaixo para confirmar que o contrato foi assinado.
      </p>
      <div className="flex items-center space-x-2 justify-center">
        <Checkbox id="contratoAssinado" checked={contratoAssinado} onCheckedChange={onConfirmarAssinatura} />
        <Label htmlFor="contratoAssinado" className="cursor-pointer">
          Contrato Assinado pelo Cliente
        </Label>
      </div>
    </div>
  </div>

  {contratoAssinado && (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium">Contrato assinado confirmado!</p>
            <p className="text-sm text-muted-foreground">
              O lead será convertido em cliente e uma OS-13 será gerada automaticamente.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )}
</div>
```

### Design System
- **Checkbox**: Padrão shadcn/ui
- **Card de Confirmação**: bg-green-50, border-green-200
- **Mensagem**: Explicar conversão automática Lead → Cliente + criação OS-13

---

## 📝 Guia de Uso

### Como usar os componentes no workflow

```tsx
// Em os-details-workflow-page.tsx

import { StepIdentificacaoLead } from './steps/shared/step-identificacao-lead';
import { StepFollowUp1 } from './steps/shared/step-followup-1';
import { StepPrecificacao } from './steps/shared/step-precificacao';
// ... outros imports

export function OSDetailsWorkflowPage() {
  // Estados
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [etapa1Data, setEtapa1Data] = useState({ ... });
  const [etapa3Data, setEtapa3Data] = useState({ ... });
  
  return (
    <Card>
      <CardContent>
        {/* ETAPA 1 */}
        {currentStep === 1 && (
          <StepIdentificacaoLead
            selectedLeadId={selectedLeadId}
            onSelectLead={setSelectedLeadId}
            showCombobox={showLeadCombobox}
            onShowComboboxChange={setShowLeadCombobox}
            showNewLeadDialog={showNewLeadDialog}
            onShowNewLeadDialogChange={setShowNewLeadDialog}
            formData={etapa1Data}
            onFormDataChange={setEtapa1Data}
            onSaveNewLead={handleSaveNewLead}
          />
        )}
        
        {/* ETAPA 3 */}
        {currentStep === 3 && (
          <StepFollowUp1
            data={etapa3Data}
            onDataChange={setEtapa3Data}
          />
        )}
        
        {/* ETAPA 9 */}
        {currentStep === 9 && (
          <StepPrecificacao
            data={etapa9Data}
            onDataChange={setEtapa9Data}
            calcularCustoBase={calcularCustoBase}
            calcularValorAtual={calcularValorAtual}
            calcularValorEntrada={calcularValorEntrada}
            calcularValorParcela={calcularValorParcela}
          />
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 🎨 Design System Compliance

### Paleta de Cores
```tsx
// Cores padrão do Minerva Design System v2.0
const colors = {
  primary: '#06b6d4',      // Cyan (botões principais)
  secondary: '#f97316',    // Laranja (ações de criação)
  dourado: '#D3AF37',      // Dourado (marca principal)
  douradoClaro: '#DDC063', // Dourado Claro (marca secundária)
  success: '#22c55e',      // Verde (confirmações)
  warning: '#eab308',      // Amarelo (avisos)
  error: '#ef4444',        // Vermelho (erros)
};
```

### Typography
- **Seguir**: `styles/globals.css`
- **NÃO usar**: Classes de font-size, font-weight, line-height (exceto quando solicitado)

### Componentes Shadcn/UI
- Alert
- Badge
- Button
- Card
- Checkbox
- Command
- Dialog
- Input
- Label
- Popover
- RadioGroup
- Select
- Separator
- Switch
- Textarea

---

## 📚 Referências

- **FLOW_OS_01_04.md**: Documentação completa do fluxo OS 01-04 (16 etapas)
- **FLOW_OS_05_06.md**: Documentação do fluxo de Assessoria
- **DESIGN_SYSTEM.md**: Design System Minerva v2.0 (Dourado)
- **styles/globals.css**: Estilos globais e tipografia
- **ETAPA_1_UX_IMPROVEMENTS.md**: Melhorias de UX implementadas na Etapa 1

---

**Última Atualização**: 2024-01-09  
**Versão**: 1.0  
**Status**: ✅ Documentação Completa
