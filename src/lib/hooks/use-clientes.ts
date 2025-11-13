import { useMemo } from 'react';
import { useApi, useMutation } from './use-api';
import { clientesAPI } from '../api-client';
import { toast } from '../utils/safe-toast';

/**
 * Hook para gerenciar clientes e leads
 */
export function useClientes(status?: 'LEAD' | 'CLIENTE_ATIVO' | 'CLIENTE_INATIVO') {
  const { data, loading, error, refetch } = useApi(
    () => status ? clientesAPI.list(status) : clientesAPI.list(),
    {
      onError: (error) => {
        console.error('❌ Erro ao carregar clientes:', error);
        toast.error(`Erro ao carregar clientes: ${error.message}`);
      },
      // Só re-executar quando status mudar
      deps: [status],
    }
  );

  return { clientes: data, loading, error, refetch };
}

/**
 * Hook para criar cliente/lead
 */
export function useCreateCliente() {
  return useMutation(clientesAPI.create, {
    onSuccess: () => {
      toast.success('Cliente criado com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao criar cliente: ${error.message}`);
    },
  });
}

/**
 * Hook para atualizar cliente
 */
export function useUpdateCliente(clienteId: string) {
  return useMutation(
    (data: any) => clientesAPI.update(clienteId, data),
    {
      onSuccess: () => {
        toast.success('Cliente atualizado com sucesso!');
      },
      onError: (error) => {
        toast.error(`Erro ao atualizar cliente: ${error.message}`);
      },
    }
  );
}

/**
 * Hook para converter lead em cliente
 */
export function useConvertLeadToCliente(leadId: string) {
  return useMutation(
    () => clientesAPI.update(leadId, { status: 'CLIENTE_ATIVO' }),
    {
      onSuccess: () => {
        toast.success('Lead convertido para cliente!');
      },
      onError: (error) => {
        toast.error(`Erro ao converter lead: ${error.message}`);
      },
    }
  );
}

/**
 * Transformar dados da API para formato do formulário
 */
export function transformClienteToForm(cliente: any) {
  return {
    id: cliente.id,
    nome: cliente.nome_razao_social,
    cpfCnpj: cliente.cpf_cnpj,
    email: cliente.email,
    telefone: cliente.telefone,
    nomeResponsavel: cliente.nome_responsavel,
    tipo: cliente.tipo_cliente === 'PESSOA_FISICA' ? 'fisica' : 'juridica',
    status: cliente.status?.toLowerCase() || 'lead',
    endereco: cliente.endereco ? {
      rua: cliente.endereco.rua,
      numero: cliente.endereco.numero,
      complemento: cliente.endereco.complemento,
      bairro: cliente.endereco.bairro,
      cidade: cliente.endereco.cidade,
      estado: cliente.endereco.estado,
      cep: cliente.endereco.cep,
    } : undefined,
    observacoes: cliente.observacoes,
  };
}

/**
 * Transformar dados do formulário para API
 */
export function transformFormToCliente(formData: any) {
  return {
    nome_razao_social: formData.nome,
    cpf_cnpj: formData.cpfCnpj,
    email: formData.email,
    telefone: formData.telefone,
    nome_responsavel: formData.nomeResponsavel,
    tipo_cliente: formData.tipo === 'fisica' ? 'PESSOA_FISICA' : 'CONDOMINIO',
    status: formData.status?.toUpperCase() || 'LEAD',
    endereco: {
      // Dados básicos de endereço
      rua: formData.endereco || '',
      numero: formData.numero || '',
      complemento: formData.complemento || '',
      bairro: formData.bairro || '',
      cidade: formData.cidade || '',
      estado: formData.estado || '',
      cep: formData.cep || '',
      
      // Dados da edificação (armazenados no JSONB do endereço)
      tipo_edificacao: formData.tipoEdificacao || '',
      qtd_unidades: formData.qtdUnidades || '',
      qtd_blocos: formData.qtdBlocos || '',
      qtd_pavimentos: formData.qtdPavimentos || '',
      tipo_telhado: formData.tipoTelhado || '',
      possui_elevador: formData.possuiElevador || false,
      possui_piscina: formData.possuiPiscina || false,
      cargo_responsavel: formData.cargoResponsavel || '',
    },
    observacoes: formData.observacoes || '',
  };
}