// Types for the Minerva ERP System

export type OSStatus = 
  | 'triagem' 
  | 'em-andamento' 
  | 'em-validacao' 
  | 'concluida' 
  | 'rejeitada';

export type Setor = 'assessoria' | 'obras';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'colaborador' | 'gestor' | 'diretoria';
  setor: Setor;
}

export interface OrdemServico {
  id: string;
  codigo: string;
  cliente: string;
  tipo: string;
  descricao: string;
  status: OSStatus;
  setor: Setor;
  responsavel: User;
  prazoInicio: string;
  prazoFim: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comentario {
  id: string;
  osId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  texto: string;
  createdAt: string;
}

export interface Documento {
  id: string;
  osId: string;
  nome: string;
  tipo: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface HistoricoItem {
  id: string;
  osId: string;
  tipo: 'status' | 'comentario' | 'documento' | 'atribuicao';
  descricao: string;
  userName: string;
  createdAt: string;
}
