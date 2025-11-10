"use client";

import React from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Alert, AlertDescription } from '../../../ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../ui/dialog';
import { Search, UserPlus, Check, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import { Switch } from '../../../ui/switch';
import { Separator } from '../../../ui/separator';
import { cn } from '../../../ui/utils';
import { mockLeads } from '../../../../lib/mock-data';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../../ui/command';

interface FormDataCompleto {
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
}

interface StepIdentificacaoLeadCompletoProps {
  selectedLeadId: string;
  onSelectLead: (leadId: string) => void;
  showCombobox: boolean;
  onShowComboboxChange: (show: boolean) => void;
  showNewLeadDialog: boolean;
  onShowNewLeadDialogChange: (show: boolean) => void;
  formData: FormDataCompleto;
  onFormDataChange: (data: FormDataCompleto) => void;
  onSaveNewLead: () => void;
}

export function StepIdentificacaoLeadCompleto({
  selectedLeadId,
  onSelectLead,
  showCombobox,
  onShowComboboxChange,
  showNewLeadDialog,
  onShowNewLeadDialogChange,
  formData,
  onFormDataChange,
  onSaveNewLead,
}: StepIdentificacaoLeadCompletoProps) {
  const selectedLead = mockLeads.find(l => l.id === selectedLeadId);

  return (
    <>
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Associe esta OS a um lead existente ou crie um novo cadastro.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Label>Cliente / Lead</Label>
          <Popover open={showCombobox} onOpenChange={onShowComboboxChange}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {selectedLead ? selectedLead.nome : "Buscar por nome, CPF ou CNPJ..."}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="p-0" 
              align="start"
              style={{ width: 'var(--radix-popover-trigger-width)' }}
            >
              <Command>
                <CommandInput placeholder="Buscar por nome, CPF ou CNPJ..." className="focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none" />
                <CommandEmpty>
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Nenhum cliente encontrado.
                  </div>
                </CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {mockLeads.map((lead) => (
                      <CommandItem
                        key={lead.id}
                        value={`${lead.nome} ${lead.cpfCnpj}`}
                        onSelect={() => onSelectLead(lead.id)}
                        className="flex items-center gap-2 px-3 py-2"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {lead.nome.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{lead.nome}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {lead.cpfCnpj} • {lead.telefone}
                          </div>
                        </div>
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            selectedLeadId === lead.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                
                {/* Footer fixo com botão Criar Novo */}
                <div className="border-t bg-white p-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      onShowComboboxChange(false);
                      // Resetar formData para vazio ao criar novo cliente
                      onFormDataChange({
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
                      onShowNewLeadDialogChange(true);
                    }}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar novo cliente
                  </Button>
                </div>
              </Command>
            </PopoverContent>
          </Popover>
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

            <div className="space-y-6 py-4">
              {/* Bloco 1: Identificação */}
              <div>
                <h3 className="text-sm font-medium mb-4">Identificação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="nome">
                      Nome / Razão Social <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => onFormDataChange({ ...formData, nome: e.target.value })}
                      placeholder="Digite o nome completo ou razão social"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpfCnpj">
                      CPF / CNPJ <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cpfCnpj"
                      value={formData.cpfCnpj}
                      onChange={(e) => onFormDataChange({ ...formData, cpfCnpj: e.target.value })}
                      placeholder="000.000.000-00 ou 00.000.000/0001-00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">
                      Tipo de Pessoa <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.tipo} 
                      onValueChange={(value) => onFormDataChange({ ...formData, tipo: value })}
                    >
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fisica">Pessoa Física</SelectItem>
                        <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
                    <Input
                      id="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={(e) => onFormDataChange({ ...formData, nomeResponsavel: e.target.value })}
                      placeholder="Nome do contato principal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cargoResponsavel">Cargo do Responsável</Label>
                    <Input
                      id="cargoResponsavel"
                      value={formData.cargoResponsavel}
                      onChange={(e) => onFormDataChange({ ...formData, cargoResponsavel: e.target.value })}
                      placeholder="Ex: Síndico, Gerente, Proprietário"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">
                      Telefone / WhatsApp <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => onFormDataChange({ ...formData, telefone: e.target.value })}
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bloco 2: Dados da Edificação */}
              <div>
                <h3 className="text-sm font-medium mb-4">Dados da Edificação</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="tipoEdificacao">
                      Tipo de Edificação <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.tipoEdificacao} 
                      onValueChange={(value) => onFormDataChange({ ...formData, tipoEdificacao: value })}
                    >
                      <SelectTrigger id="tipoEdificacao">
                        <SelectValue placeholder="Selecione a categoria que melhor descreve o imóvel." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Condomínio Comercial">Condomínio Comercial</SelectItem>
                        <SelectItem value="Condomínio Residencial - Casas">Condomínio Residencial - Casas</SelectItem>
                        <SelectItem value="Condomínio Residencial - Apartamentos">Condomínio Residencial - Apartamentos</SelectItem>
                        <SelectItem value="Hotel">Hotel</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="Indústria">Indústria</SelectItem>
                        <SelectItem value="Igreja">Igreja</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Selecione a categoria que melhor descreve o imóvel.
                    </p>
                  </div>

                  {/* Lógica Condicional: Exibir "Qtd. Unidades" para TODOS os Condomínios */}
                  {(formData.tipoEdificacao === 'Condomínio Comercial' || 
                    formData.tipoEdificacao === 'Condomínio Residencial - Casas' || 
                    formData.tipoEdificacao === 'Condomínio Residencial - Apartamentos') && (
                    <div className="space-y-2">
                      <Label htmlFor="qtdUnidades">
                        Quantidade de Unidades Autônomas <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="qtdUnidades"
                        type="number"
                        value={formData.qtdUnidades}
                        onChange={(e) => onFormDataChange({ ...formData, qtdUnidades: e.target.value })}
                        placeholder="Ex: 48"
                      />
                      <p className="text-xs text-muted-foreground">
                        Informe o número total de unidades independentes (salas, lojas, casas ou apartamentos) do condomínio.
                      </p>
                    </div>
                  )}

                  {/* Lógica Condicional: Exibir "Qtd. Blocos" APENAS para Condomínio Residencial - Apartamentos */}
                  {formData.tipoEdificacao === 'Condomínio Residencial - Apartamentos' && (
                    <div className="space-y-2">
                      <Label htmlFor="qtdBlocos">
                        Quantidade de Blocos <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="qtdBlocos"
                        type="number"
                        value={formData.qtdBlocos}
                        onChange={(e) => onFormDataChange({ ...formData, qtdBlocos: e.target.value })}
                        placeholder="Ex: 2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Informe o número de torres ou blocos que compõem o condomínio.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="qtdPavimentos">Quantidade de Pavimentação</Label>
                    <Input
                      id="qtdPavimentos"
                      type="number"
                      value={formData.qtdPavimentos}
                      onChange={(e) => onFormDataChange({ ...formData, qtdPavimentos: e.target.value })}
                      placeholder="Ex: 8"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipoTelhado">
                      Tipo de Telhado <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.tipoTelhado} 
                      onValueChange={(value) => onFormDataChange({ ...formData, tipoTelhado: value })}
                    >
                      <SelectTrigger id="tipoTelhado">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Laje impermeabilizada">Laje impermeabilizada</SelectItem>
                        <SelectItem value="Telhado cerâmico">Telhado cerâmico</SelectItem>
                        <SelectItem value="Telhado fibrocimento">Telhado fibrocimento</SelectItem>
                        <SelectItem value="Telhado metálico">Telhado metálico</SelectItem>
                        <SelectItem value="Não se aplica">Não se aplica</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="possuiElevador"
                      checked={formData.possuiElevador}
                      onCheckedChange={(checked) => onFormDataChange({ ...formData, possuiElevador: checked })}
                    />
                    <Label htmlFor="possuiElevador" className="cursor-pointer">
                      Possui Elevador?
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="possuiPiscina"
                      checked={formData.possuiPiscina}
                      onCheckedChange={(checked) => onFormDataChange({ ...formData, possuiPiscina: checked })}
                    />
                    <Label htmlFor="possuiPiscina" className="cursor-pointer">
                      Possui Piscina?
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Bloco 3: Endereço */}
              <div>
                <h3 className="text-sm font-medium mb-4">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">
                      CEP <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cep"
                      value={formData.cep}
                      onChange={(e) => onFormDataChange({ ...formData, cep: e.target.value })}
                      placeholder="00000-000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero">
                      Número <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="numero"
                      value={formData.numero}
                      onChange={(e) => onFormDataChange({ ...formData, numero: e.target.value })}
                      placeholder="Nº do imóvel"
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="endereco">
                      Endereço (Rua) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => onFormDataChange({ ...formData, endereco: e.target.value })}
                      placeholder="Rua, Avenida..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                      id="complemento"
                      value={formData.complemento}
                      onChange={(e) => onFormDataChange({ ...formData, complemento: e.target.value })}
                      placeholder="Apto, Bloco, Sala..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bairro">
                      Bairro <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => onFormDataChange({ ...formData, bairro: e.target.value })}
                      placeholder="Bairro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidade">
                      Cidade <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cidade"
                      value={formData.cidade}
                      onChange={(e) => onFormDataChange({ ...formData, cidade: e.target.value })}
                      placeholder="Cidade"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">
                      Estado <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="estado"
                      value={formData.estado}
                      onChange={(e) => onFormDataChange({ ...formData, estado: e.target.value })}
                      placeholder="UF"
                    />
                  </div>
                </div>
              </div>
            </div>

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
      </div>
    </>
  );
}
