import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { FileDown } from 'lucide-react';
import { User } from '../../lib/types';
import { OSListHeader } from './os-list-header';
import { OSFiltersCard } from './os-filters-card';
import { OSTable } from './os-table';

// Mock data para Ordens de Serviço
const mockOrdensServico = [
  {
    id: '1',
    codigo: 'OS-2025-001',
    titulo: 'Perícia de Fachada - Edifício Central',
    status: 'em_andamento',
    cliente: { id: '1', nome: 'Construtora ABC Ltda' },
    tipoOS: { id: '01', nome: 'OS 01: Perícia de Fachada', setor: 'obras' },
    responsavel: { id: '1', nome: 'João Silva', avatar: 'JS' },
    dataPrazo: '2025-01-30',
    criadoEm: '2025-01-10'
  },
  {
    id: '2',
    codigo: 'OS-2025-002',
    titulo: 'Revitalização de Fachada - Condomínio Solar',
    status: 'aguardando_aprovacao',
    cliente: { id: '2', nome: 'Incorporadora XYZ' },
    tipoOS: { id: '02', nome: 'OS 02: Revitalização de Fachada', setor: 'obras' },
    responsavel: { id: '3', nome: 'Pedro Oliveira', avatar: 'PO' },
    dataPrazo: '2025-02-15',
    criadoEm: '2025-01-12'
  },
  {
    id: '3',
    codigo: 'OS-2025-003',
    titulo: 'Assessoria Técnica - Shopping Norte',
    status: 'atrasada',
    cliente: { id: '5', nome: 'Grupo Omega' },
    tipoOS: { id: '05', nome: 'OS 05: Assessoria técnica mensal', setor: 'assessoria' },
    responsavel: { id: '2', nome: 'Maria Santos', avatar: 'MS' },
    dataPrazo: '2025-01-15',
    criadoEm: '2025-01-05'
  },
  {
    id: '4',
    codigo: 'OS-2025-004',
    titulo: 'Laudo Pontual - Edifício Atlântico',
    status: 'concluida',
    cliente: { id: '3', nome: 'Empreendimentos Delta' },
    tipoOS: { id: '06', nome: 'OS 06: Laudo pontual', setor: 'assessoria' },
    responsavel: { id: '1', nome: 'João Silva', avatar: 'JS' },
    dataPrazo: '2025-01-20',
    criadoEm: '2025-01-08'
  },
  {
    id: '5',
    codigo: 'OS-2025-005',
    titulo: 'Reforço Estrutural - Ponte Viaduto',
    status: 'em_andamento',
    cliente: { id: '4', nome: 'Construtora Sigma' },
    tipoOS: { id: '03', nome: 'OS 03: Reforço Estrutural', setor: 'obras' },
    responsavel: { id: '3', nome: 'Pedro Oliveira', avatar: 'PO' },
    dataPrazo: '2025-03-01',
    criadoEm: '2025-01-14'
  },
  {
    id: '6',
    codigo: 'OS-2025-006',
    titulo: 'Requisição de Compras - Materiais Diversos',
    status: 'em_andamento',
    cliente: { id: '6', nome: 'Incorporadora Beta' },
    tipoOS: { id: '09', nome: 'OS 09: Requisição de Compras', setor: 'obras' },
    responsavel: { id: '4', nome: 'Ana Costa', avatar: 'AC' },
    dataPrazo: '2025-01-25',
    criadoEm: '2025-01-16'
  },
  {
    id: '7',
    codigo: 'OS-2025-007',
    titulo: 'Start de Contrato - Residencial Vila Nova',
    status: 'aguardando_aprovacao',
    cliente: { id: '7', nome: 'Construtora Alvorada' },
    tipoOS: { id: '13', nome: 'OS 13: Start de Contrato de Obra', setor: 'obras' },
    responsavel: { id: '1', nome: 'João Silva', avatar: 'JS' },
    dataPrazo: '2025-02-10',
    criadoEm: '2025-01-18'
  },
  {
    id: '8',
    codigo: 'OS-2024-045',
    titulo: 'Vistoria Técnica - Edifício Empresarial',
    status: 'concluida',
    cliente: { id: '8', nome: 'Empreendimentos Sul' },
    tipoOS: { id: '08', nome: 'OS 08: Vistoria/Inspeção', setor: 'assessoria' },
    responsavel: { id: '2', nome: 'Maria Santos', avatar: 'MS' },
    dataPrazo: '2024-12-30',
    criadoEm: '2024-12-15'
  }
];

interface OSListPageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export function OSListPage({ currentUser, onNavigate }: OSListPageProps) {
  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [tipoOSFilter, setTipoOSFilter] = useState('todos');
  const [setorFilter, setSetorFilter] = useState('todos');
  const [responsavelFilter, setResponsavelFilter] = useState('todos');

  // Filtrar OS baseado em RLS (Role-Level Security)
  const ordensServico = useMemo(() => {
    let filtered = [...mockOrdensServico];

    // Aplicar RLS baseado no papel do usuário
    if (currentUser.role === 'colaborador') {
      // Colaborador vê apenas suas próprias OS
      filtered = filtered.filter(os => os.responsavel.id === currentUser.id);
    } else if (currentUser.role === 'gestor') {
      // Gestor vê apenas OS do seu setor
      filtered = filtered.filter(os => os.tipoOS.setor === currentUser.setor);
    }
    // Diretoria e Gestor ADM veem todas

    // Aplicar filtros de busca
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(os =>
        os.codigo.toLowerCase().includes(search) ||
        os.cliente.nome.toLowerCase().includes(search) ||
        os.titulo.toLowerCase().includes(search)
      );
    }

    if (statusFilter !== 'todos') {
      filtered = filtered.filter(os => os.status === statusFilter);
    }

    if (tipoOSFilter !== 'todos') {
      filtered = filtered.filter(os => os.tipoOS.id === tipoOSFilter);
    }

    if (setorFilter !== 'todos') {
      filtered = filtered.filter(os => os.tipoOS.setor === setorFilter);
    }

    if (responsavelFilter !== 'todos') {
      filtered = filtered.filter(os => os.responsavel.id === responsavelFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter, tipoOSFilter, setorFilter, responsavelFilter, currentUser]);

  // Função para exportar dados
  const handleExport = () => {
    // Implementação futura: exportar para Excel/CSV
    alert('Funcionalidade de exportação será implementada em breve!');
  };

  // Verificar se o usuário pode ver a coluna Setor
  const canViewSetorColumn = currentUser.role === 'diretoria' || currentUser.role === 'gestor_adm';

  return (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header da Página */}
        <OSListHeader onCreateClick={() => onNavigate('os-criar')} />

        {/* Card de Filtros */}
        <OSFiltersCard
          currentUser={currentUser}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          tipoOSFilter={tipoOSFilter}
          setorFilter={setorFilter}
          responsavelFilter={responsavelFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onTipoOSChange={setTipoOSFilter}
          onSetorChange={setSetorFilter}
          onResponsavelChange={setResponsavelFilter}
        />

        {/* Card da Tabela */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>
              {ordensServico.length} {ordensServico.length === 1 ? 'Ordem de Serviço' : 'Ordens de Serviço'}
            </CardTitle>
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <OSTable
              ordensServico={ordensServico}
              canViewSetorColumn={canViewSetorColumn}
              onNavigate={onNavigate}
            />

            {/* Informação de paginação */}
            {ordensServico.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando {ordensServico.length} de {ordensServico.length} resultados
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
