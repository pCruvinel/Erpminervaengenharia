"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Alert, AlertDescription } from '../ui/alert';
import { Calendar as CalendarIcon, ArrowRight, Search, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../ui/utils';
import { tiposOS, mockClientes } from '../../lib/mock-data';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { useClientes } from '../../lib/hooks/use-clientes';
import { tiposOSAPI } from '../../lib/api-client';
import { useApi } from '../../lib/hooks/use-api';

interface CreateOSPageProps {
  onCancel: () => void;
  onCreate?: (data: any) => void;
}

export function CreateOSPage({ onCancel, onCreate }: CreateOSPageProps) {
  const [tipoOS, setTipoOS] = useState<string>('');
  const [clienteId, setClienteId] = useState<string>('');
  const [dataEntrada, setDataEntrada] = useState<Date>();
  const [prazoEstimado, setPrazoEstimado] = useState<Date>();
  const [descricao, setDescricao] = useState<string>('');
  const [openClienteCombobox, setOpenClienteCombobox] = useState(false);

  // Buscar clientes da API
  const { clientes: clientesAPI, loading: loadingClientes, error: errorClientes } = useClientes('CLIENTE_ATIVO');
  
  // Buscar tipos de OS da API
  const { data: tiposOSAPI_data, loading: loadingTipos, error: errorTipos } = useApi(() => tiposOSAPI.list());

  // Usar dados da API ou fallback para mock
  const clientesDisponiveis = errorClientes ? mockClientes : (clientesAPI || []).map((c: any) => ({
    id: c.id,
    nome: c.nome_razao_social,
    cnpj: c.cpf_cnpj
  }));

  const tiposDisponiveis = errorTipos ? tiposOS : (tiposOSAPI_data || []).map((t: any) => ({
    id: t.codigo.replace('OS-', ''),
    label: `${t.codigo}: ${t.nome}`
  }));

  // OS 1, 2, 3, 4 têm fluxo especial com seleção de Lead no Passo 1
  const tiposComFluxoLead = ['01', '02', '03', '04'];
  const isFluxoComLead = tiposComFluxoLead.includes(tipoOS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      tipoOS,
      clienteId: isFluxoComLead ? null : clienteId, // Cliente será definido após seleção de Lead
      dataEntrada,
      prazoEstimado,
      descricao
    };

    console.log('Dados do formulário:', formData);
    
    if (onCreate) {
      onCreate(formData);
    }
  };

  const selectedCliente = clientesDisponiveis.find((c: any) => c.id === clienteId);

  return (
    <div className="p-6 bg-muted min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Título da Página */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Criar Nova Ordem de Serviço</h1>
          <p className="text-muted-foreground mt-2">
            Preencha as informações iniciais para criar uma nova OS
          </p>
        </div>

        {/* Alerts de Conexão */}
        {!errorClientes && !loadingClientes && clientesAPI && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              🟢 Conectado ao Supabase! {clientesAPI.length} clientes disponíveis.
            </AlertDescription>
          </Alert>
        )}

        {(errorClientes || errorTipos) && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao carregar dados. Usando dados de exemplo.
            </AlertDescription>
          </Alert>
        )}

        {/* Card Principal do Formulário */}
        <Card className="border-border rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle>Informações da Ordem de Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Etapa 1: Seleção de Tipo (Obrigatório) */}
              <div className="space-y-2">
                <Label htmlFor="tipo-os" className="font-medium">
                  Selecione o Tipo de OS <span className="text-destructive">*</span>
                </Label>
                <Select value={tipoOS} onValueChange={setTipoOS}>
                  <SelectTrigger id="tipo-os" className="w-full">
                    <SelectValue placeholder="Selecione na lista..." />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingTipos ? (
                      <div className="p-4 text-center text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        <span className="text-xs">Carregando tipos...</span>
                      </div>
                    ) : (
                      tiposDisponiveis.map((tipo: any) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Etapa 2: Informações Iniciais */}
              <div className="pt-4 border-t border-border space-y-6">
                {/* Aviso para OS com fluxo de Lead */}
                {isFluxoComLead && tipoOS && (
                  <div className="bg-accent border border-primary/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Fluxo com Seleção de Lead</h4>
                        <p className="text-sm text-muted-foreground">
                          Esta OS possui um fluxo especial. Após criar a OS, você será direcionado para o <strong>Passo 1: Selecionar Lead ou Cadastrar Novo</strong>, onde o cliente será definido automaticamente.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Seleção de Cliente (Combobox com busca) - Oculto para OS 1, 2, 3, 4 */}
                {!isFluxoComLead && (
                  <div className="space-y-2">
                    <Label htmlFor="cliente" className="font-medium">
                      Cliente <span className="text-destructive">*</span>
                    </Label>
                    <Popover open={openClienteCombobox} onOpenChange={setOpenClienteCombobox}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openClienteCombobox}
                          className="w-full justify-between font-normal"
                        >
                          {selectedCliente ? selectedCliente.nome : "Pesquise e selecione um cliente..."}
                          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar cliente..." />
                          <CommandList>
                            {loadingClientes ? (
                              <div className="p-4 text-center">
                                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                                <span className="text-xs text-muted-foreground">Carregando...</span>
                              </div>
                            ) : (
                              <>
                                <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                                <CommandGroup>
                                  {clientesDisponiveis.map((cliente: any) => (
                                    <CommandItem
                                      key={cliente.id}
                                      value={cliente.nome}
                                      onSelect={() => {
                                        setClienteId(cliente.id);
                                        setOpenClienteCombobox(false);
                                      }}
                                    >
                                      <div className="flex flex-col">
                                        <span className="font-medium">{cliente.nome}</span>
                                        <span className="text-xs text-muted-foreground">CNPJ: {cliente.cnpj}</span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {/* Datas (Grid 2 colunas) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Data de Entrada */}
                  <div className="space-y-2">
                    <Label className="font-medium">
                      Data de Entrada <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start font-normal",
                            !dataEntrada && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dataEntrada ? dataEntrada.toLocaleDateString('pt-BR') : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dataEntrada}
                          onSelect={setDataEntrada}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Prazo Estimado */}
                  <div className="space-y-2">
                    <Label className="font-medium">
                      Prazo Estimado <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start font-normal",
                            !prazoEstimado && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {prazoEstimado ? prazoEstimado.toLocaleDateString('pt-BR') : "Selecione a data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={prazoEstimado}
                          onSelect={setPrazoEstimado}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="descricao" className="font-medium">
                    Descrição Resumida da Demanda <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="descricao"
                    placeholder="Digite os detalhes iniciais da solicitação do cliente..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </div>

              {/* Etapa 3: Ações do Formulário */}
              <div className="flex justify-end gap-3 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="font-semibold"
                  disabled={
                    !tipoOS || 
                    !dataEntrada || 
                    !prazoEstimado || 
                    !descricao ||
                    (!isFluxoComLead && !clienteId) // Cliente obrigatório apenas para OS sem fluxo de Lead
                  }
                >
                  {isFluxoComLead ? 'Criar OS e Selecionar Lead' : 'Criar OS e Definir Etapas'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
