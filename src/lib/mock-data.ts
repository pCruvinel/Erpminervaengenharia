// Mock data for development
import { User, OrdemServico, Comentario, Documento, HistoricoItem } from './types';

// Tipos de OS disponíveis (RF-017)
export const tiposOS = [
  { id: '01', label: 'OS 01: Perícia de Fachada' },
  { id: '02', label: 'OS 02: Revitalização de Fachada' },
  { id: '03', label: 'OS 03: Reforço Estrutural' },
  { id: '04', label: 'OS 04: Outros' },
  { id: '05', label: 'OS 05: Assessoria técnica mensal' },
  { id: '06', label: 'OS 06: Laudo pontual' },
  { id: '07', label: 'OS 07: Assessoria técnica (documento gerado)' },
  { id: '08', label: 'OS 08: Vistoria/Inspeção' },
  { id: '09', label: 'OS 09: Requisição de Compras' },
  { id: '10', label: 'OS 10: Requisição de Mão de Obra/Recrutamento' },
  { id: '11', label: 'OS 11: Laudo Pontual' },
  { id: '12', label: 'OS 12: Assessoria Técnica Mensal/Anual' },
  { id: '13', label: 'OS 13: Start de Contrato de Obra' }
];

// Clientes disponíveis para seleção (status: 'cliente')
export const mockClientes = [
  { id: '1', nome: 'Construtora ABC Ltda', cnpj: '12.345.678/0001-90' },
  { id: '2', nome: 'Incorporadora XYZ', cnpj: '98.765.432/0001-10' },
  { id: '3', nome: 'Empreendimentos Delta', cnpj: '11.222.333/0001-44' },
  { id: '4', nome: 'Construtora Sigma', cnpj: '44.555.666/0001-77' },
  { id: '5', nome: 'Grupo Omega', cnpj: '77.888.999/0001-00' },
  { id: '6', nome: 'Incorporadora Beta', cnpj: '33.444.555/0001-22' },
  { id: '7', nome: 'Construtora Alvorada', cnpj: '22.333.444/0001-55' },
  { id: '8', nome: 'Empreendimentos Sul', cnpj: '55.666.777/0001-88' },
  { id: '9', nome: 'Grupo Horizonte', cnpj: '66.777.888/0001-99' },
  { id: '10', nome: 'Incorporadora Nexus', cnpj: '88.999.000/0001-11' }
];

// Leads disponíveis para seleção (status: 'lead')
export const mockLeads = [
  { 
    id: 'L1', 
    nome: 'Condomínio Jardim das Flores', 
    cpfCnpj: '45.123.789/0001-22',
    tipo: 'juridica',
    tipoEdificacao: 'Condomínio Residencial - Casas',
    qtdUnidades: '48',
    qtdBlocos: '',
    tipoTelhado: 'Laje impermeabilizada',
    endereco: 'Rua das Acácias, 450 - Vila Mariana, São Paulo/SP',
    telefone: '(11) 98765-4321',
    email: 'sindico@jardimflores.com.br',
    status: 'lead'
  },
  { 
    id: 'L2', 
    nome: 'Edifício Residencial Morada do Sol', 
    cpfCnpj: '78.456.123/0001-88',
    tipo: 'juridica',
    tipoEdificacao: 'Condomínio Residencial - Apartamentos',
    qtdUnidades: '120',
    qtdBlocos: '3',
    tipoTelhado: 'Telha cerâmica',
    endereco: 'Av. Paulista, 1200 - Bela Vista, São Paulo/SP',
    telefone: '(11) 97654-3210',
    email: 'contato@moradadosol.com.br',
    status: 'lead'
  },
  { 
    id: 'L3', 
    nome: 'João Carlos Silva', 
    cpfCnpj: '456.789.123-88',
    tipo: 'fisica',
    tipoEdificacao: 'Outro',
    qtdUnidades: '',
    qtdBlocos: '',
    tipoTelhado: 'Telha colonial',
    endereco: 'Rua dos Pinheiros, 850 - Pinheiros, São Paulo/SP',
    telefone: '(11) 99876-5432',
    email: 'joao.silva@email.com',
    status: 'lead'
  },
  { 
    id: 'L4', 
    nome: 'Condomínio Ville de France', 
    cpfCnpj: '12.987.654/0001-33',
    tipo: 'juridica',
    tipoEdificacao: 'Condomínio Residencial - Apartamentos',
    qtdUnidades: '200',
    qtdBlocos: '4',
    tipoTelhado: 'Laje impermeabilizada',
    endereco: 'Rua França Pinto, 1500 - Vila Mariana, São Paulo/SP',
    telefone: '(11) 96543-2109',
    email: 'administracao@villedefrance.com.br',
    status: 'lead'
  },
  { 
    id: 'L5', 
    nome: 'Shopping Center Norte', 
    cpfCnpj: '789.456.123-00',
    tipo: 'juridica',
    tipoEdificacao: 'Shopping',
    qtdUnidades: '',
    qtdBlocos: '',
    tipoTelhado: 'Telha metálica',
    endereco: 'Rua Augusta, 2500 - Consolação, São Paulo/SP',
    telefone: '(11) 95432-1098',
    email: 'contato@shoppingnorte.com.br',
    status: 'lead'
  },
  { 
    id: 'L6', 
    nome: 'Plaza Offices', 
    cpfCnpj: '33.222.111/0001-99',
    tipo: 'juridica',
    tipoEdificacao: 'Condomínio Comercial',
    qtdUnidades: '80',
    qtdBlocos: '',
    tipoTelhado: 'Laje técnica',
    endereco: 'Av. Brigadeiro Faria Lima, 3000 - Itaim Bibi, São Paulo/SP',
    telefone: '(11) 94321-0987',
    email: 'administracao@plazaoffices.com.br',
    status: 'lead'
  },
  { 
    id: 'L7', 
    nome: 'Hotel Grand Luxo', 
    cpfCnpj: '55.666.777/0001-44',
    tipo: 'juridica',
    tipoEdificacao: 'Hotel',
    qtdUnidades: '',
    qtdBlocos: '',
    tipoTelhado: 'Laje impermeabilizada',
    endereco: 'Av. Atlântica, 500 - Copacabana, Rio de Janeiro/RJ',
    telefone: '(21) 98888-7777',
    email: 'contato@hotelgrandluxo.com.br',
    status: 'lead'
  },
  { 
    id: 'L8', 
    nome: 'Hospital São Lucas', 
    cpfCnpj: '66.777.888/0001-55',
    tipo: 'juridica',
    tipoEdificacao: 'Hospital',
    qtdUnidades: '',
    qtdBlocos: '',
    tipoTelhado: 'Laje técnica',
    endereco: 'Rua da Saúde, 1000 - Centro, São Paulo/SP',
    telefone: '(11) 97777-6666',
    email: 'administracao@hsaolucas.com.br',
    status: 'lead'
  },
  { 
    id: 'L9', 
    nome: 'Igreja Batista Central', 
    cpfCnpj: '77.888.999/0001-66',
    tipo: 'juridica',
    tipoEdificacao: 'Igreja',
    qtdUnidades: '',
    qtdBlocos: '',
    tipoTelhado: 'Telhado cerâmico',
    endereco: 'Praça da Fé, 200 - Centro, Campinas/SP',
    telefone: '(19) 99999-8888',
    email: 'contato@igrejabatistacentral.org.br',
    status: 'lead'
  },
  { 
    id: 'L10', 
    nome: 'Indústria Metalúrgica ABC', 
    cpfCnpj: '88.999.000/0001-77',
    tipo: 'juridica',
    tipoEdificacao: 'Indústria',
    qtdUnidades: '',
    qtdBlocos: '',
    tipoTelhado: 'Telhado metálico',
    endereco: 'Rod. Anhanguera, Km 102 - Distrito Industrial, Campinas/SP',
    telefone: '(19) 98888-9999',
    email: 'facilities@metalurgicaabc.com.br',
    status: 'lead'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@minerva.com',
    avatar: 'JS',
    role: 'gestor',
    setor: 'assessoria'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@minerva.com',
    avatar: 'MS',
    role: 'colaborador',
    setor: 'assessoria'
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@minerva.com',
    avatar: 'PO',
    role: 'colaborador',
    setor: 'obras'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@minerva.com',
    avatar: 'AC',
    role: 'diretoria',
    setor: 'assessoria'
  }
];

export const mockOrdensServico: OrdemServico[] = [
  {
    id: '1',
    codigo: 'OS-2024-001',
    cliente: 'Construtora ABC Ltda',
    tipo: 'Projeto Estrutural',
    descricao: 'Elaboração de projeto estrutural para edifício residencial de 10 pavimentos',
    status: 'em-andamento',
    setor: 'assessoria',
    responsavel: mockUsers[1],
    prazoInicio: '2024-11-01',
    prazoFim: '2024-11-30',
    createdAt: '2024-11-01T08:00:00Z',
    updatedAt: '2024-11-09T10:30:00Z'
  },
  {
    id: '2',
    codigo: 'OS-2024-002',
    cliente: 'Incorporadora XYZ',
    tipo: 'Consultoria Técnica',
    descricao: 'Consultoria para aprovação de projeto junto à prefeitura',
    status: 'triagem',
    setor: 'assessoria',
    responsavel: mockUsers[0],
    prazoInicio: '2024-11-08',
    prazoFim: '2024-11-15',
    createdAt: '2024-11-08T09:00:00Z',
    updatedAt: '2024-11-08T09:00:00Z'
  },
  {
    id: '3',
    codigo: 'OS-2024-003',
    cliente: 'Empreendimentos Delta',
    tipo: 'Fiscalização de Obra',
    descricao: 'Fiscalização e acompanhamento de obra de fundação',
    status: 'em-validacao',
    setor: 'obras',
    responsavel: mockUsers[2],
    prazoInicio: '2024-10-15',
    prazoFim: '2024-11-10',
    createdAt: '2024-10-15T08:00:00Z',
    updatedAt: '2024-11-08T16:45:00Z'
  },
  {
    id: '4',
    codigo: 'OS-2024-004',
    cliente: 'Construtora Sigma',
    tipo: 'Laudo Técnico',
    descricao: 'Laudo de avaliação de imóvel para financiamento',
    status: 'concluida',
    setor: 'assessoria',
    responsavel: mockUsers[1],
    prazoInicio: '2024-10-20',
    prazoFim: '2024-11-05',
    createdAt: '2024-10-20T08:00:00Z',
    updatedAt: '2024-11-05T14:20:00Z'
  },
  {
    id: '5',
    codigo: 'OS-2024-005',
    cliente: 'Grupo Omega',
    tipo: 'Projeto Hidrossanitário',
    descricao: 'Projeto hidrossanitário para complexo comercial',
    status: 'em-andamento',
    setor: 'assessoria',
    responsavel: mockUsers[1],
    prazoInicio: '2024-11-05',
    prazoFim: '2024-12-05',
    createdAt: '2024-11-05T08:00:00Z',
    updatedAt: '2024-11-07T11:15:00Z'
  },
  {
    id: '6',
    codigo: 'OS-2024-006',
    cliente: 'Incorporadora Beta',
    tipo: 'Vistoria Técnica',
    descricao: 'Vistoria cautelar pré-obra em imóveis vizinhos',
    status: 'triagem',
    setor: 'obras',
    responsavel: mockUsers[2],
    prazoInicio: '2024-11-09',
    prazoFim: '2024-11-12',
    createdAt: '2024-11-09T08:00:00Z',
    updatedAt: '2024-11-09T08:00:00Z'
  }
];

export const mockComentarios: Comentario[] = [
  {
    id: '1',
    osId: '1',
    userId: '1',
    userName: 'João Silva',
    userAvatar: 'JS',
    texto: 'Projeto em andamento conforme cronograma. Etapa de dimensionamento concluída.',
    createdAt: '2024-11-07T14:30:00Z'
  },
  {
    id: '2',
    osId: '1',
    userId: '2',
    userName: 'Maria Santos',
    userAvatar: 'MS',
    texto: 'Cliente solicitou revisão no posicionamento dos pilares P3 e P4.',
    createdAt: '2024-11-08T10:15:00Z'
  },
  {
    id: '3',
    osId: '1',
    userId: '1',
    userName: 'João Silva',
    userAvatar: 'JS',
    texto: 'Revisão aprovada. Atualizando prancha 02/15.',
    createdAt: '2024-11-09T09:45:00Z'
  }
];

export const mockDocumentos: Documento[] = [
  {
    id: '1',
    osId: '1',
    nome: 'Memorial_Calculo_Estrutural.pdf',
    tipo: 'application/pdf',
    url: '#',
    uploadedAt: '2024-11-05T16:20:00Z',
    uploadedBy: 'Maria Santos'
  },
  {
    id: '2',
    osId: '1',
    nome: 'Prancha_01_Planta_Locacao.pdf',
    tipo: 'application/pdf',
    url: '#',
    uploadedAt: '2024-11-06T11:30:00Z',
    uploadedBy: 'Maria Santos'
  },
  {
    id: '3',
    osId: '1',
    nome: 'Prancha_02_Planta_Forma.pdf',
    tipo: 'application/pdf',
    url: '#',
    uploadedAt: '2024-11-07T09:10:00Z',
    uploadedBy: 'Maria Santos'
  }
];

export const mockHistorico: HistoricoItem[] = [
  {
    id: '1',
    osId: '1',
    tipo: 'status',
    descricao: 'OS criada e atribuída para Maria Santos',
    userName: 'João Silva',
    createdAt: '2024-11-01T08:00:00Z'
  },
  {
    id: '2',
    osId: '1',
    tipo: 'status',
    descricao: 'Status alterado de "Triagem" para "Em Andamento"',
    userName: 'Maria Santos',
    createdAt: '2024-11-01T10:30:00Z'
  },
  {
    id: '3',
    osId: '1',
    tipo: 'documento',
    descricao: 'Documento "Memorial_Calculo_Estrutural.pdf" enviado',
    userName: 'Maria Santos',
    createdAt: '2024-11-05T16:20:00Z'
  },
  {
    id: '4',
    osId: '1',
    tipo: 'documento',
    descricao: 'Documento "Prancha_01_Planta_Locacao.pdf" enviado',
    userName: 'Maria Santos',
    createdAt: '2024-11-06T11:30:00Z'
  },
  {
    id: '5',
    osId: '1',
    tipo: 'comentario',
    descricao: 'Novo comentário adicionado',
    userName: 'João Silva',
    createdAt: '2024-11-07T14:30:00Z'
  },
  {
    id: '6',
    osId: '1',
    tipo: 'comentario',
    descricao: 'Novo comentário adicionado',
    userName: 'Maria Santos',
    createdAt: '2024-11-08T10:15:00Z'
  },
  {
    id: '7',
    osId: '1',
    tipo: 'documento',
    descricao: 'Documento "Prancha_02_Planta_Forma.pdf" enviado',
    userName: 'Maria Santos',
    createdAt: '2024-11-07T09:10:00Z'
  },
  {
    id: '8',
    osId: '1',
    tipo: 'comentario',
    descricao: 'Novo comentário adicionado',
    userName: 'João Silva',
    createdAt: '2024-11-09T09:45:00Z'
  }
];
