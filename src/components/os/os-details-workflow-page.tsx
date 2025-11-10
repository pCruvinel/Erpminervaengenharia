"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { 
  Upload, 
  FileText, 
  File, 
  Check, 
  Calendar,
  Send,
  ChevronLeft,
  Plus,
  Download,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Separator } from '../ui/separator';
import { mockLeads } from '../../lib/mock-data';
import { WorkflowStepper, WorkflowStep } from './workflow-stepper';
import { WorkflowFooter } from './workflow-footer';
import { StepIdentificacaoLeadCompleto } from './steps/shared/step-identificacao-lead-completo';

// Definição das 16 etapas do fluxo OS 01-04
const steps: WorkflowStep[] = [
  { id: 1, title: 'Identificação do Cliente/Lead', short: 'Lead', responsible: 'ADM', status: 'active' },
  { id: 2, title: 'Seleção do Tipo de OS', short: 'Tipo OS', responsible: 'ADM', status: 'pending' },
  { id: 3, title: 'Follow-up 1 (Entrevista Inicial)', short: 'Follow-up 1', responsible: 'ADM', status: 'pending' },
  { id: 4, title: 'Agendar Visita Técnica', short: 'Agendar', responsible: 'ADM', status: 'pending' },
  { id: 5, title: 'Realizar Visita', short: 'Visita', responsible: 'Obras', status: 'pending' },
  { id: 6, title: 'Follow-up 2 (Pós-Visita)', short: 'Follow-up 2', responsible: 'Obras', status: 'pending' },
  { id: 7, title: 'Fazer Memorial (Upload)', short: 'Memorial', responsible: 'Obras', status: 'pending' },
  { id: 8, title: 'Formulário Memorial (Escopo)', short: 'Escopo', responsible: 'Obras', status: 'pending' },
  { id: 9, title: 'Precificação', short: 'Precificação', responsible: 'Obras', status: 'pending' },
  { id: 10, title: 'Gerar Proposta Comercial', short: 'Proposta', responsible: 'ADM', status: 'pending' },
  { id: 11, title: 'Agendar Visita (Apresentação)', short: 'Agendar', responsible: 'ADM', status: 'pending' },
  { id: 12, title: 'Realizar Visita (Apresentação)', short: 'Apresentação', responsible: 'ADM', status: 'pending' },
  { id: 13, title: 'Follow-up 3 (Pós-Apresentação)', short: 'Follow-up 3', responsible: 'ADM', status: 'pending' },
  { id: 14, title: 'Gerar Contrato (Upload)', short: 'Contrato', responsible: 'ADM', status: 'pending' },
  { id: 15, title: 'Contrato Assinado', short: 'Assinatura', responsible: 'ADM', status: 'pending' },
  { id: 16, title: 'Iniciar Contrato de Obra', short: 'Início Obra', responsible: 'Sistema', status: 'pending' },
];

interface OSDetailsWorkflowPageProps {
  onBack?: () => void;
}

export function OSDetailsWorkflowPage({ onBack }: OSDetailsWorkflowPageProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLeadId, setSelectedLeadId] = useState<string>('');
  const [showLeadCombobox, setShowLeadCombobox] = useState(false);
  const [showNewLeadDialog, setShowNewLeadDialog] = useState(false);
  
  // Estados dos formulários de cada etapa
  const [etapa1Data, setEtapa1Data] = useState({ leadId: '' });
  const [etapa2Data, setEtapa2Data] = useState({ tipoOS: '' });
  const [etapa3Data, setEtapa3Data] = useState({
    idadeEdificacao: '',
    motivoProcura: '',
    quandoAconteceu: '',
    oqueFeitoARespeito: '',
    existeEscopo: '',
    previsaoOrcamentaria: '',
    grauUrgencia: '',
    apresentacaoProposta: '',
    nomeContatoLocal: '',
    telefoneContatoLocal: '',
    cargoContatoLocal: '',
  });
  const [etapa4Data, setEtapa4Data] = useState({ dataAgendamento: '' });
  const [etapa5Data, setEtapa5Data] = useState({ visitaRealizada: false });
  const [etapa6Data, setEtapa6Data] = useState({
    // Momento 1: Perguntas Durante a Visita - Respostas do Cliente
    outrasEmpresas: '',
    comoEsperaResolver: '',
    expectativaCliente: '',
    estadoAncoragem: '',
    fotosAncoragem: [] as Array<{ file: File; comment: string }>,
    // Momento 2: Avaliação Geral da Visita
    quemAcompanhou: '',
    avaliacaoVisita: '',
    // Momento 3: Respostas do Engenheiro
    estadoGeralEdificacao: '',
    servicoResolver: '',
    arquivosGerais: [] as Array<{ file: File; comment: string }>,
  });
  const [etapa7Data, setEtapa7Data] = useState({ memorialFile: null as File | null });
  const [etapa8Data, setEtapa8Data] = useState({
    objetivo: '',
    etapasPrincipais: [] as Array<{
      nome: string;
      subetapas: Array<{
        nome: string;
        m2: string;
        diasUteis: string;
        total: string;
      }>;
    }>,
    planejamentoInicial: '',
    logisticaTransporte: '',
    preparacaoArea: '',
  });
  const [etapa9Data, setEtapa9Data] = useState({
    percentualImprevisto: '',
    percentualLucro: '',
    percentualImposto: '',
    percentualEntrada: '',
    numeroParcelas: '',
  });
  const [etapa10Data, setEtapa10Data] = useState({});
  const [etapa11Data, setEtapa11Data] = useState({ dataAgendamento: '' });
  const [etapa12Data, setEtapa12Data] = useState({ apresentacaoRealizada: false });
  const [etapa13Data, setEtapa13Data] = useState({
    propostaApresentada: '',
    metodoApresentacao: '',
    clienteAchouProposta: '',
    clienteAchouContrato: '',
    doresNaoAtendidas: '',
    indicadorFechamento: '',
    quemEstavaNaApresentacao: '',
    nivelSatisfacao: '',
  });
  const [etapa14Data, setEtapa14Data] = useState({ contratoFile: null as File | null });
  const [etapa15Data, setEtapa15Data] = useState({ contratoAssinado: false });

  // Estado do formulário de novo lead (Dialog)
  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    tipo: '',
    nomeResponsavel: '',
    cargoResponsavel: '',
    telefone: '',
    email: '',
    tipoEdificacao: '',
    qtdUnidades: '',
    qtdBlocos: '',
    qtdPavimentos: '',
    tipoTelhado: '',
    possuiElevador: false,
    possuiPiscina: false,
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  // Calcular selectedLead de forma memoizada para evitar re-renders
  const selectedLead = useMemo(() => {
    return mockLeads.find(l => l.id === selectedLeadId);
  }, [selectedLeadId]);

  const handleStepClick = (stepId: number) => {
    // Permite navegar apenas para etapas até a atual
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    setEtapa1Data({ leadId });
    
    // Preencher formData com dados do lead selecionado
    const lead = mockLeads.find(l => l.id === leadId);
    if (lead) {
      setFormData({
        nome: lead.nome || '',
        cpfCnpj: lead.cpfCnpj || '',
        tipo: lead.tipo || '',
        nomeResponsavel: '',
        cargoResponsavel: '',
        telefone: lead.telefone || '',
        email: lead.email || '',
        tipoEdificacao: lead.tipoEdificacao || '',
        qtdUnidades: lead.qtdUnidades || '',
        qtdBlocos: lead.qtdBlocos || '',
        qtdPavimentos: '',
        tipoTelhado: lead.tipoTelhado || '',
        possuiElevador: false,
        possuiPiscina: false,
        cep: '',
        endereco: lead.endereco || '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
    }
    setShowLeadCombobox(false);
  };

  const handleSaveNewLead = () => {
    // Aqui salvaria no backend
    console.log('Salvando novo lead:', formData);
    setShowNewLeadDialog(false);
    // Simular seleção do novo lead
    setSelectedLeadId('NEW');
    setEtapa1Data({ leadId: 'NEW' });
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isReadOnly = selectedLeadId !== 'NEW' && selectedLeadId !== '';

  // Cálculos automáticos Etapa 8
  const calcularExecucaoTotal = () => {
    return etapa8Data.etapasPrincipais.reduce((total, etapa) => {
      return total + etapa.subetapas.reduce((sum, sub) => sum + (parseFloat(sub.diasUteis) || 0), 0);
    }, 0);
  };

  // Cálculos automáticos Etapa 9
  const calcularCustoBase = () => {
    return etapa8Data.etapasPrincipais.reduce((total, etapa) => {
      return total + etapa.subetapas.reduce((sum, sub) => sum + (parseFloat(sub.total) || 0), 0);
    }, 0);
  };

  const calcularValorAtual = () => {
    const custoBase = calcularCustoBase();
    const imprevisto = parseFloat(etapa9Data.percentualImprevisto) || 0;
    const lucro = parseFloat(etapa9Data.percentualLucro) || 0;
    const imposto = parseFloat(etapa9Data.percentualImposto) || 0;
    return custoBase * (1 + (imprevisto + lucro + imposto) / 100);
  };

  const calcularValorEntrada = () => {
    const valorAtual = calcularValorAtual();
    const percentualEntrada = parseFloat(etapa9Data.percentualEntrada) || 0;
    return valorAtual * (percentualEntrada / 100);
  };

  const calcularValorParcela = () => {
    const valorAtual = calcularValorAtual();
    const valorEntrada = calcularValorEntrada();
    const numeroParcelas = parseInt(etapa9Data.numeroParcelas) || 1;
    return (valorAtual - valorEntrada) / numeroParcelas;
  };

  const adicionarEtapaPrincipal = () => {
    setEtapa8Data({
      ...etapa8Data,
      etapasPrincipais: [
        ...etapa8Data.etapasPrincipais,
        { nome: '', subetapas: [] }
      ]
    });
  };

  const adicionarSubetapa = (index: number) => {
    const novasEtapas = [...etapa8Data.etapasPrincipais];
    novasEtapas[index].subetapas.push({ nome: '', m2: '', diasUteis: '', total: '' });
    setEtapa8Data({ ...etapa8Data, etapasPrincipais: novasEtapas });
  };

  const removerEtapaPrincipal = (index: number) => {
    const novasEtapas = etapa8Data.etapasPrincipais.filter((_, i) => i !== index);
    setEtapa8Data({ ...etapa8Data, etapasPrincipais: novasEtapas });
  };

  const removerSubetapa = (etapaIndex: number, subIndex: number) => {
    const novasEtapas = [...etapa8Data.etapasPrincipais];
    novasEtapas[etapaIndex].subetapas = novasEtapas[etapaIndex].subetapas.filter((_, i) => i !== subIndex);
    setEtapa8Data({ ...etapa8Data, etapasPrincipais: novasEtapas });
  };

  const atualizarEtapaPrincipal = (index: number, nome: string) => {
    const novasEtapas = [...etapa8Data.etapasPrincipais];
    novasEtapas[index].nome = nome;
    setEtapa8Data({ ...etapa8Data, etapasPrincipais: novasEtapas });
  };

  const atualizarSubetapa = (etapaIndex: number, subIndex: number, campo: string, valor: string) => {
    const novasEtapas = [...etapa8Data.etapasPrincipais];
    novasEtapas[etapaIndex].subetapas[subIndex] = {
      ...novasEtapas[etapaIndex].subetapas[subIndex],
      [campo]: valor
    };
    setEtapa8Data({ ...etapa8Data, etapasPrincipais: novasEtapas });
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      {/* Botão Voltar (opcional) */}
      {onBack && (
        <div className="border-b border-neutral-200 px-6 py-3 bg-white">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Voltar ao Hub de Criação
          </Button>
        </div>
      )}
      
      {/* Stepper Horizontal */}
      <WorkflowStepper 
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full p-6">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Responsável: {steps[currentStep - 1].responsible}
                  </p>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  Etapa {currentStep} de {steps.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 overflow-y-auto">
              
              {/* ETAPA 1: Identificação do Cliente/Lead */}
              {currentStep === 1 && (
                <StepIdentificacaoLeadCompleto
                  selectedLeadId={selectedLeadId}
                  onSelectLead={handleSelectLead}
                  showCombobox={showLeadCombobox}
                  onShowComboboxChange={setShowLeadCombobox}
                  showNewLeadDialog={showNewLeadDialog}
                  onShowNewLeadDialogChange={setShowNewLeadDialog}
                  formData={formData}
                  onFormDataChange={setFormData}
                  onSaveNewLead={handleSaveNewLead}
                />
              )}

              {/* ETAPA 2: Seleção do Tipo de OS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Defina qual tipo de OS será executada. Esta informação é obrigatória para prosseguir.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="tipoOS">
                      Selecione o Tipo de OS <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={etapa2Data.tipoOS} 
                      onValueChange={(value) => setEtapa2Data({ tipoOS: value })}
                    >
                      <SelectTrigger id="tipoOS">
                        <SelectValue placeholder="Escolha o tipo de OS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OS 01: Perícia de Fachada">OS 01: Perícia de Fachada</SelectItem>
                        <SelectItem value="OS 02: Revitalização de Fachada">OS 02: Revitalização de Fachada</SelectItem>
                        <SelectItem value="OS 03: Reforço Estrutural">OS 03: Reforço Estrutural</SelectItem>
                        <SelectItem value="OS 04: Outros">OS 04: Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {etapa2Data.tipoOS && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Tipo de OS selecionado:</p>
                            <p className="text-sm text-muted-foreground">{etapa2Data.tipoOS}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* ETAPA 3: Follow-up 1 (Entrevista Inicial) */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Realize a entrevista inicial com o lead/cliente para levantar informações sobre o projeto.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idadeEdificacao">
                        1. Qual a idade da edificação? <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={etapa3Data.idadeEdificacao} 
                        onValueChange={(value) => setEtapa3Data({ ...etapa3Data, idadeEdificacao: value })}
                      >
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

                    <div className="space-y-2">
                      <Label htmlFor="motivoProcura">
                        2. Qual o motivo fez você nos procurar? Quais problemas existentes? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="motivoProcura"
                        rows={4}
                        value={etapa3Data.motivoProcura}
                        onChange={(e) => setEtapa3Data({ ...etapa3Data, motivoProcura: e.target.value })}
                        placeholder="Descreva os problemas e motivações..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quandoAconteceu">
                        3. Quando aconteceu? Há quanto tempo vem acontecendo? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="quandoAconteceu"
                        rows={3}
                        value={etapa3Data.quandoAconteceu}
                        onChange={(e) => setEtapa3Data({ ...etapa3Data, quandoAconteceu: e.target.value })}
                        placeholder="Descreva o histórico do problema..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="oqueFeitoARespeito">
                        4. O que já foi feito a respeito disso?
                      </Label>
                      <Textarea
                        id="oqueFeitoARespeito"
                        rows={3}
                        value={etapa3Data.oqueFeitoARespeito}
                        onChange={(e) => setEtapa3Data({ ...etapa3Data, oqueFeitoARespeito: e.target.value })}
                        placeholder="Descreva as ações já realizadas..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="existeEscopo">
                        5. Existe um escopo de serviços ou laudo com diagnóstico do problema?
                      </Label>
                      <Textarea
                        id="existeEscopo"
                        rows={2}
                        value={etapa3Data.existeEscopo}
                        onChange={(e) => setEtapa3Data({ ...etapa3Data, existeEscopo: e.target.value })}
                        placeholder="Sim/Não e detalhes..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previsaoOrcamentaria">
                        6. Existe previsão orçamentária para este serviço? Ou você precisa de parâmetro para taxa extra?
                      </Label>
                      <Textarea
                        id="previsaoOrcamentaria"
                        rows={2}
                        value={etapa3Data.previsaoOrcamentaria}
                        onChange={(e) => setEtapa3Data({ ...etapa3Data, previsaoOrcamentaria: e.target.value })}
                        placeholder="Informe o orçamento dispon��vel..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grauUrgencia">
                        7. Qual o grau de urgência para executar esse serviço? <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={etapa3Data.grauUrgencia} 
                        onValueChange={(value) => setEtapa3Data({ ...etapa3Data, grauUrgencia: value })}
                      >
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

                    <div className="space-y-2">
                      <Label htmlFor="apresentacaoProposta">
                        8. Nossas propostas são apresentadas, nós não enviamos orçamento. Você concorda? Deseja que faça o orçamento? Se sim, qual dia e horário sugeridos para apresentação da proposta comercial dessa visita técnica? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="apresentacaoProposta"
                        rows={3}
                        value={etapa3Data.apresentacaoProposta}
                        onChange={(e) => setEtapa3Data({ ...etapa3Data, apresentacaoProposta: e.target.value })}
                        placeholder="Resposta do cliente..."
                      />
                    </div>

                    <Separator />

                    <h3 className="text-sm font-medium">Dados do Contato no Local</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nomeContatoLocal">
                          9. Nome (Contato no Local) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="nomeContatoLocal"
                          value={etapa3Data.nomeContatoLocal}
                          onChange={(e) => setEtapa3Data({ ...etapa3Data, nomeContatoLocal: e.target.value })}
                          placeholder="Nome completo"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefoneContatoLocal">
                          10. Contato (Telefone) <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="telefoneContatoLocal"
                          value={etapa3Data.telefoneContatoLocal}
                          onChange={(e) => setEtapa3Data({ ...etapa3Data, telefoneContatoLocal: e.target.value })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>

                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="cargoContatoLocal">
                          11. Cargo (Contato no Local)
                        </Label>
                        <Input
                          id="cargoContatoLocal"
                          value={etapa3Data.cargoContatoLocal}
                          onChange={(e) => setEtapa3Data({ ...etapa3Data, cargoContatoLocal: e.target.value })}
                          placeholder="Ex: Síndico, Zelador, Gerente..."
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Anexar Arquivos (escopo, laudo, fotos)</Label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Clique para selecionar ou arraste arquivos aqui
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, JPG, PNG, DOCX, XLSX (máx. 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 4: Agendar Visita Técnica */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <Alert>
                    <Calendar className="h-4 w-4" />
                    <AlertDescription>
                      Agende a visita técnica ao local para avaliação presencial.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col items-center justify-center py-12 gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Agendar Visita Técnica</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Selecione a data e horário para a visita técnica ao local.
                      </p>
                      <Button style={{ backgroundColor: '#f97316', color: 'white' }}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar no Calendário
                      </Button>
                    </div>
                  </div>

                  {etapa4Data.dataAgendamento && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Visita agendada para:</p>
                            <p className="text-sm text-muted-foreground">{etapa4Data.dataAgendamento}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* ETAPA 5: Realizar Visita */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Confirme a realização da visita técnica ao local.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col items-center justify-center py-12 gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Confirmar Realização da Visita</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Marque a caixa abaixo para confirmar que a visita técnica foi realizada.
                      </p>
                      <div className="flex items-center space-x-2 justify-center">
                        <Checkbox
                          id="visitaRealizada"
                          checked={etapa5Data.visitaRealizada}
                          onCheckedChange={(checked) => setEtapa5Data({ visitaRealizada: checked as boolean })}
                        />
                        <Label htmlFor="visitaRealizada" className="cursor-pointer">
                          Visita técnica realizada
                        </Label>
                      </div>
                    </div>
                  </div>

                  {etapa5Data.visitaRealizada && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Visita confirmada!</p>
                            <p className="text-sm text-muted-foreground">Data: {new Date().toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* ETAPA 6: Follow-up 2 (Pós-Visita) */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Preencha o formulário técnico dividido em três momentos com as informações coletadas durante e após a visita.
                    </AlertDescription>
                  </Alert>

                  {/* Momento 1: Perguntas Durante a Visita - Respostas do Cliente */}
                  <div className="space-y-4">
                    <div className="bg-neutral-100 px-4 py-2 rounded-md">
                      <h3 className="text-sm font-medium">Momento 1: Perguntas Durante a Visita - Respostas do Cliente</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="outrasEmpresas">
                        1. Há outras empresas realizando visita técnica? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="outrasEmpresas"
                        rows={3}
                        value={etapa6Data.outrasEmpresas}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, outrasEmpresas: e.target.value })}
                        placeholder="Descreva se há outras empresas realizando visita técnica e quais..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comoEsperaResolver">
                        2. Como você espera resolver esse problema? (Solução, Material e metodologia) <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="comoEsperaResolver"
                        rows={4}
                        value={etapa6Data.comoEsperaResolver}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, comoEsperaResolver: e.target.value })}
                        placeholder="Descreva as expectativas do cliente quanto à solução, materiais e metodologia..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectativaCliente">
                        3. Qual a principal expectativa do cliente? (Solução, Material e metodologia) <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="expectativaCliente"
                        rows={4}
                        value={etapa6Data.expectativaCliente}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, expectativaCliente: e.target.value })}
                        placeholder="Descreva as principais expectativas em relação à solução, materiais e metodologia..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estadoAncoragem">
                        4. Qual o estado do sistema de ancoragem? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="estadoAncoragem"
                        rows={3}
                        value={etapa6Data.estadoAncoragem}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, estadoAncoragem: e.target.value })}
                        placeholder="Descreva o estado atual do sistema de ancoragem..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>5. Anexar fotos do sistema de ancoragem</Label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Clique para selecionar ou arraste fotos aqui
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Múltiplos arquivos permitidos • Você poderá adicionar comentários após o upload
                        </p>
                      </div>
                      
                      {/* Lista de arquivos anexados com comentários */}
                      {etapa6Data.fotosAncoragem.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {etapa6Data.fotosAncoragem.map((item, index) => (
                            <div key={index} className="border border-neutral-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{item.file.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newFiles = etapa6Data.fotosAncoragem.filter((_, i) => i !== index);
                                    setEtapa6Data({ ...etapa6Data, fotosAncoragem: newFiles });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Adicionar comentário..."
                                value={item.comment}
                                onChange={(e) => {
                                  const newFiles = [...etapa6Data.fotosAncoragem];
                                  newFiles[index].comment = e.target.value;
                                  setEtapa6Data({ ...etapa6Data, fotosAncoragem: newFiles });
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Momento 2: Avaliação Geral da Visita */}
                  <div className="space-y-4">
                    <div className="bg-neutral-100 px-4 py-2 rounded-md">
                      <h3 className="text-sm font-medium">Momento 2: Avaliação Geral da Visita</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quemAcompanhou">
                        6. Quem acompanhou a visita? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="quemAcompanhou"
                        rows={3}
                        value={etapa6Data.quemAcompanhou}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, quemAcompanhou: e.target.value })}
                        placeholder="Descreva quem acompanhou a visita e suas funções..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        7. Avaliação da Visita <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup 
                        value={etapa6Data.avaliacaoVisita} 
                        onValueChange={(value) => setEtapa6Data({ ...etapa6Data, avaliacaoVisita: value })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Produtiva, cliente muito interessado" id="av1" />
                          <Label htmlFor="av1" className="cursor-pointer">Produtiva, cliente muito interessado</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Pouco produtiva" id="av2" />
                          <Label htmlFor="av2" className="cursor-pointer">Pouco produtiva</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Improdutiva" id="av3" />
                          <Label htmlFor="av3" className="cursor-pointer">Improdutiva</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Separator />

                  {/* Momento 3: Respostas do Engenheiro */}
                  <div className="space-y-4">
                    <div className="bg-neutral-100 px-4 py-2 rounded-md">
                      <h3 className="text-sm font-medium">Momento 3: Respostas do Engenheiro</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estadoGeralEdificacao">
                        8. Qual o estado geral da edificação (Condições encontradas)? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="estadoGeralEdificacao"
                        rows={4}
                        value={etapa6Data.estadoGeralEdificacao}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, estadoGeralEdificacao: e.target.value })}
                        placeholder="Descreva detalhadamente as condições da edificação encontradas..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servicoResolver">
                        9. Qual o serviço deve ser feito para resolver o problema? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="servicoResolver"
                        rows={4}
                        value={etapa6Data.servicoResolver}
                        onChange={(e) => setEtapa6Data({ ...etapa6Data, servicoResolver: e.target.value })}
                        placeholder="Descreva os serviços recomendados para resolver o problema..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>10. Anexar Arquivos (Fotos gerais, croquis, etc)</Label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Clique para selecionar ou arraste arquivos aqui
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Múltiplos arquivos permitidos • Você poderá adicionar comentários após o upload
                        </p>
                      </div>

                      {/* Lista de arquivos anexados com comentários */}
                      {etapa6Data.arquivosGerais.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {etapa6Data.arquivosGerais.map((item, index) => (
                            <div key={index} className="border border-neutral-200 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <File className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{item.file.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newFiles = etapa6Data.arquivosGerais.filter((_, i) => i !== index);
                                    setEtapa6Data({ ...etapa6Data, arquivosGerais: newFiles });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Adicionar comentário..."
                                value={item.comment}
                                onChange={(e) => {
                                  const newFiles = [...etapa6Data.arquivosGerais];
                                  newFiles[index].comment = e.target.value;
                                  setEtapa6Data({ ...etapa6Data, arquivosGerais: newFiles });
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 7: Fazer Memorial (Upload) */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      Faça upload do Memorial Descritivo de Custos (Excel/Word). Esta etapa é opcional, pois a próxima etapa permite digitalizar o memorial.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label>Upload do Memorial Descritivo de Custos</Label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Clique para selecionar ou arraste o arquivo aqui
                      </p>
                      <p className="text-xs text-muted-foreground">
                        XLSX, DOCX, PDF (máx. 20MB)
                      </p>
                    </div>
                  </div>

                  {etapa7Data.memorialFile && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Arquivo anexado:</p>
                            <p className="text-sm text-muted-foreground">{etapa7Data.memorialFile.name}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* ETAPA 8: Formulário Memorial (Escopo e Prazos) */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Digitalize o escopo técnico e prazos do memorial. Você pode adicionar múltiplas etapas e sub-etapas.
                    </AlertDescription>
                  </Alert>

                  {/* 1. Objetivo */}
                  <div className="space-y-2">
                    <Label htmlFor="objetivo">
                      1. Objetivo da contratação do serviço? <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="objetivo"
                      rows={3}
                      value={etapa8Data.objetivo}
                      onChange={(e) => setEtapa8Data({ ...etapa8Data, objetivo: e.target.value })}
                      placeholder="Descreva o objetivo principal do serviço..."
                    />
                  </div>

                  <Separator />

                  {/* 2. Etapas da Especificação Técnica */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">2. Etapas da Especificação Técnica</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={adicionarEtapaPrincipal}
                        style={{ borderColor: '#06b6d4', color: '#06b6d4' }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Etapa Principal
                      </Button>
                    </div>

                    {etapa8Data.etapasPrincipais.length === 0 && (
                      <Card className="bg-neutral-50 border-dashed">
                        <CardContent className="pt-6 text-center text-sm text-muted-foreground">
                          Nenhuma etapa adicionada. Clique em "Adicionar Etapa Principal" para começar.
                        </CardContent>
                      </Card>
                    )}

                    {etapa8Data.etapasPrincipais.map((etapa, etapaIndex) => (
                      <Card key={etapaIndex} className="border-primary/20">
                        <CardHeader className="bg-primary/5">
                          <div className="flex items-center gap-3">
                            <Input
                              value={etapa.nome}
                              onChange={(e) => atualizarEtapaPrincipal(etapaIndex, e.target.value)}
                              placeholder={`Ex: ${etapaIndex + 1}. Tratamento de Fachada`}
                              className="flex-1"
                            />
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => adicionarSubetapa(etapaIndex)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Sub-etapa
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removerEtapaPrincipal(etapaIndex)}
                            >
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
                                  <Input
                                    value={sub.nome}
                                    onChange={(e) => atualizarSubetapa(etapaIndex, subIndex, 'nome', e.target.value)}
                                    placeholder="Descrição da sub-etapa"
                                    className="col-span-2"
                                  />
                                  <Input
                                    type="number"
                                    value={sub.m2}
                                    onChange={(e) => atualizarSubetapa(etapaIndex, subIndex, 'm2', e.target.value)}
                                    placeholder="0"
                                  />
                                  <Input
                                    type="number"
                                    value={sub.diasUteis}
                                    onChange={(e) => atualizarSubetapa(etapaIndex, subIndex, 'diasUteis', e.target.value)}
                                    placeholder="0"
                                  />
                                  <div className="flex gap-2">
                                    <Input
                                      type="number"
                                      value={sub.total}
                                      onChange={(e) => atualizarSubetapa(etapaIndex, subIndex, 'total', e.target.value)}
                                      placeholder="0,00"
                                    />
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => removerSubetapa(etapaIndex, subIndex)}
                                    >
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
                        <Label htmlFor="planejamentoInicial">
                          Planejamento inicial <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="planejamentoInicial"
                          type="number"
                          value={etapa8Data.planejamentoInicial}
                          onChange={(e) => setEtapa8Data({ ...etapa8Data, planejamentoInicial: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logisticaTransporte">
                          Logística e transporte de materiais <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="logisticaTransporte"
                          type="number"
                          value={etapa8Data.logisticaTransporte}
                          onChange={(e) => setEtapa8Data({ ...etapa8Data, logisticaTransporte: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preparacaoArea">
                          Preparação de área de trabalho <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="preparacaoArea"
                          type="number"
                          value={etapa8Data.preparacaoArea}
                          onChange={(e) => setEtapa8Data({ ...etapa8Data, preparacaoArea: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="execucaoObra">
                          Execução de obra (calculado automaticamente)
                        </Label>
                        <Input
                          id="execucaoObra"
                          type="number"
                          value={calcularExecucaoTotal()}
                          disabled
                          className="bg-neutral-100"
                        />
                        <p className="text-xs text-muted-foreground">
                          Soma automática dos dias úteis de todas as sub-etapas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 9: Precificação */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Defina a precificação final com base nos custos do memorial. Os valores são calculados automaticamente.
                    </AlertDescription>
                  </Alert>

                  {/* Custo Base */}
                  <div className="space-y-2">
                    <Label htmlFor="custoBase">Custo Base (Memorial)</Label>
                    <Input
                      id="custoBase"
                      type="text"
                      value={`R$ ${calcularCustoBase().toFixed(2).replace('.', ',')}`}
                      disabled
                      className="bg-neutral-100 text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Soma automática de todos os valores das sub-etapas do memorial
                    </p>
                  </div>

                  <Separator />

                  {/* Percentuais e Valor Total */}
                  <div className="space-y-4">
                    <Label className="text-base">Percentuais e Valor Total</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="percentualImprevisto">
                          % Imprevisto <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="percentualImprevisto"
                          type="number"
                          value={etapa9Data.percentualImprevisto}
                          onChange={(e) => setEtapa9Data({ ...etapa9Data, percentualImprevisto: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="percentualLucro">
                          % Lucro <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="percentualLucro"
                          type="number"
                          value={etapa9Data.percentualLucro}
                          onChange={(e) => setEtapa9Data({ ...etapa9Data, percentualLucro: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="percentualImposto">
                          % Imposto <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="percentualImposto"
                          type="number"
                          value={etapa9Data.percentualImposto}
                          onChange={(e) => setEtapa9Data({ ...etapa9Data, percentualImposto: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="valorAtual">Valor Atual (Total)</Label>
                        <Input
                          id="valorAtual"
                          type="text"
                          value={`R$ ${calcularValorAtual().toFixed(2).replace('.', ',')}`}
                          disabled
                          className="bg-green-50 border-green-200 text-lg font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Condições de Pagamento */}
                  <div className="space-y-4">
                    <Label className="text-base">Condições de Pagamento</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="percentualEntrada">
                          % Entrada <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="percentualEntrada"
                          type="number"
                          value={etapa9Data.percentualEntrada}
                          onChange={(e) => setEtapa9Data({ ...etapa9Data, percentualEntrada: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="numeroParcelas">
                          Nº de Parcelas <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="numeroParcelas"
                          type="number"
                          value={etapa9Data.numeroParcelas}
                          onChange={(e) => setEtapa9Data({ ...etapa9Data, numeroParcelas: e.target.value })}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="valorEntrada">Valor de Entrada (Calculado)</Label>
                        <Input
                          id="valorEntrada"
                          type="text"
                          value={`R$ ${calcularValorEntrada().toFixed(2).replace('.', ',')}`}
                          disabled
                          className="bg-neutral-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="valorParcela">Valor de Cada Parcela (Calculado)</Label>
                        <Input
                          id="valorParcela"
                          type="text"
                          value={`R$ ${calcularValorParcela().toFixed(2).replace('.', ',')}`}
                          disabled
                          className="bg-neutral-100"
                        />
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
                        <span className="text-sm font-medium">
                          {etapa9Data.numeroParcelas}x de R$ {calcularValorParcela().toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* ETAPA 10: Gerar Proposta Comercial */}
              {currentStep === 10 && (
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
                      <Button style={{ backgroundColor: '#06b6d4', color: 'white' }}>
                        <FileText className="h-4 w-4 mr-2" />
                        Visualizar Proposta para Impressão
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 11: Agendar Visita (Apresentação) */}
              {currentStep === 11 && (
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
                      <Button style={{ backgroundColor: '#f97316', color: 'white' }}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar no Calendário
                      </Button>
                    </div>
                  </div>

                  {etapa11Data.dataAgendamento && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">Apresentação agendada para:</p>
                            <p className="text-sm text-muted-foreground">{etapa11Data.dataAgendamento}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* ETAPA 12: Realizar Visita (Apresentação) */}
              {currentStep === 12 && (
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
                        <Checkbox
                          id="apresentacaoRealizada"
                          checked={etapa12Data.apresentacaoRealizada}
                          onCheckedChange={(checked) => setEtapa12Data({ apresentacaoRealizada: checked as boolean })}
                        />
                        <Label htmlFor="apresentacaoRealizada" className="cursor-pointer">
                          Apresentação realizada
                        </Label>
                      </div>
                    </div>
                  </div>

                  {etapa12Data.apresentacaoRealizada && (
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
              )}

              {/* ETAPA 13: Follow-up 3 (Pós-Apresentação) */}
              {currentStep === 13 && (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Documente a reação do cliente após a apresentação da proposta comercial.
                    </AlertDescription>
                  </Alert>

                  {/* Momento 1: Apresentaç��o */}
                  <div className="space-y-4">
                    <div className="bg-neutral-100 px-4 py-2 rounded-md">
                      <h3 className="text-sm font-medium">Momento 1: Sobre a Apresentação</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propostaApresentada">
                        1. Qual a proposta apresentada? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="propostaApresentada"
                        rows={3}
                        value={etapa13Data.propostaApresentada}
                        onChange={(e) => setEtapa13Data({ ...etapa13Data, propostaApresentada: e.target.value })}
                        placeholder="Descreva a proposta apresentada..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metodoApresentacao">
                        2. Qual o método de apresentação? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="metodoApresentacao"
                        rows={2}
                        value={etapa13Data.metodoApresentacao}
                        onChange={(e) => setEtapa13Data({ ...etapa13Data, metodoApresentacao: e.target.value })}
                        placeholder="Ex: Presencial, Online, Slides..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clienteAchouProposta">
                        3. O que o cliente achou da proposta? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="clienteAchouProposta"
                        rows={3}
                        value={etapa13Data.clienteAchouProposta}
                        onChange={(e) => setEtapa13Data({ ...etapa13Data, clienteAchouProposta: e.target.value })}
                        placeholder="Descreva a reação e comentários do cliente..."
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Momento 2: Contrato e Dores */}
                  <div className="space-y-4">
                    <div className="bg-neutral-100 px-4 py-2 rounded-md">
                      <h3 className="text-sm font-medium">Momento 2: Contrato e Dores do Cliente</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clienteAchouContrato">
                        4. O que o cliente achou do contrato? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="clienteAchouContrato"
                        rows={3}
                        value={etapa13Data.clienteAchouContrato}
                        onChange={(e) => setEtapa13Data({ ...etapa13Data, clienteAchouContrato: e.target.value })}
                        placeholder="Descreva a opinião do cliente sobre o contrato..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doresNaoAtendidas">
                        5. Quais as dores do cliente não atendidas?
                      </Label>
                      <Textarea
                        id="doresNaoAtendidas"
                        rows={3}
                        value={etapa13Data.doresNaoAtendidas}
                        onChange={(e) => setEtapa13Data({ ...etapa13Data, doresNaoAtendidas: e.target.value })}
                        placeholder="Liste possíveis objeções ou pontos não atendidos..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="indicadorFechamento">
                        6. Qual o indicador de fechamento da proposta? <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={etapa13Data.indicadorFechamento} 
                        onValueChange={(value) => setEtapa13Data({ ...etapa13Data, indicadorFechamento: value })}
                      >
                        <SelectTrigger id="indicadorFechamento">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fechado">Fechado</SelectItem>
                          <SelectItem value="Quente">Quente</SelectItem>
                          <SelectItem value="Morno">Morno</SelectItem>
                          <SelectItem value="Frio">Frio</SelectItem>
                          <SelectItem value="Perdido">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Momento 3: Satisfação */}
                  <div className="space-y-4">
                    <div className="bg-neutral-100 px-4 py-2 rounded-md">
                      <h3 className="text-sm font-medium">Momento 3: Satisfação do Cliente</h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quemEstavaNaApresentacao">
                        7. Quem estava na apresentação? <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="quemEstavaNaApresentacao"
                        rows={2}
                        value={etapa13Data.quemEstavaNaApresentacao}
                        onChange={(e) => setEtapa13Data({ ...etapa13Data, quemEstavaNaApresentacao: e.target.value })}
                        placeholder="Liste os participantes da reunião..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>
                        8. Qual o nível de satisfação do cliente? <span className="text-destructive">*</span>
                      </Label>
                      <RadioGroup 
                        value={etapa13Data.nivelSatisfacao} 
                        onValueChange={(value) => setEtapa13Data({ ...etapa13Data, nivelSatisfacao: value })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Produtiva, cliente interessado" id="ns1" />
                          <Label htmlFor="ns1" className="cursor-pointer">Produtiva, cliente interessado</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Pouco produtiva" id="ns2" />
                          <Label htmlFor="ns2" className="cursor-pointer">Pouco produtiva</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Improdutiva" id="ns3" />
                          <Label htmlFor="ns3" className="cursor-pointer">Improdutiva</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 14: Gerar Contrato (Upload) */}
              {currentStep === 14 && (
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
                        <Button variant="outline" style={{ borderColor: '#06b6d4', color: '#06b6d4' }}>
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

                  {etapa14Data.contratoFile && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Minuta do contrato anexada:</p>
                            <p className="text-sm text-muted-foreground">{etapa14Data.contratoFile.name}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* ETAPA 15: Contrato Assinado */}
              {currentStep === 15 && (
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
                        <Checkbox
                          id="contratoAssinado"
                          checked={etapa15Data.contratoAssinado}
                          onCheckedChange={(checked) => setEtapa15Data({ contratoAssinado: checked as boolean })}
                        />
                        <Label htmlFor="contratoAssinado" className="cursor-pointer">
                          Contrato Assinado pelo Cliente
                        </Label>
                      </div>
                    </div>
                  </div>

                  {etapa15Data.contratoAssinado && (
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
              )}

              {/* ETAPA 16: Iniciar Contrato de Obra */}
              {currentStep === 16 && (
                <div className="space-y-6">
                  <Alert className="border-green-200 bg-green-50">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      <strong>Parabéns!</strong> Você chegou à última etapa do fluxo comercial.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col items-center justify-center py-12 gap-6">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <Send className="h-10 w-10 text-green-600" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Concluir OS e Gerar OS-13</h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-md">
                        Ao clicar no botão abaixo, esta OS será marcada como concluída, o lead será convertido em cliente e uma nova OS do tipo 13 (Contrato de Obra) será criada automaticamente para o time interno.
                      </p>
                      <Button size="lg" style={{ backgroundColor: '#06b6d4', color: 'white' }}>
                        <Send className="h-4 w-4 mr-2" />
                        Concluir OS e Gerar OS-13
                      </Button>
                    </div>
                  </div>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">O que acontecerá:</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">OS atual marcada como "Concluída"</p>
                          <p className="text-xs text-muted-foreground">Esta OS-001 será arquivada com sucesso</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Lead convertido em Cliente</p>
                          <p className="text-xs text-muted-foreground">Status alterado de "lead" para "cliente" no sistema</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">OS-13 criada automaticamente</p>
                          <p className="text-xs text-muted-foreground">Nova OS do tipo 13 (Contrato de Obra) gerada para execução interna</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

            </CardContent>

            {/* Footer com botões de navegação */}
            <WorkflowFooter
              currentStep={currentStep}
              totalSteps={steps.length}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
              onSaveDraft={() => console.log('Salvar rascunho')}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
