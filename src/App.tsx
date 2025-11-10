import React, { useState } from 'react';
import './styles/globals.css';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { LoginPage } from './components/auth/login-page';
import { Sidebar } from './components/layout/sidebar';
import { Header } from './components/layout/header';
import { FontLoader } from './components/layout/font-loader';
import { OSDetailsPage } from './components/os/os-details-page';
import { CreateOSPage } from './components/os/create-os-page';
import { OSWorkflowPage } from './components/os/os-workflow-page';
import { OSDetailsWorkflowPage } from './components/os/os-details-workflow-page';
import { OSDetailsAssessoriaPage } from './components/os/os-details-assessoria-page';
import { OSListPage } from './components/os/os-list-page';
import { OSCreationHub } from './components/os/os-creation-hub';
import { OSWizardPlaceholder } from './components/os/os-wizard-placeholder';
import { 
  mockUsers, 
  mockOrdensServico, 
  mockComentarios, 
  mockDocumentos, 
  mockHistorico 
} from './lib/mock-data';
import { OrdemServico, Comentario, User, OSStatus } from './lib/types';

type Page = 'login' | 'dashboard' | 'os-list' | 'os-criar' | 'wizard-obras-lead' | 'wizard-start-contrato-obra' | 'wizard-assessoria-lead' | 'wizard-start-contrato-assessoria' | 'wizard-solicitacao-reforma' | 'wizard-vistoria' | 'wizard-requisicao-compras' | 'wizard-requisicao-mao-obra' | 'ordens-servico' | 'os-details' | 'os-workflow' | 'os-details-workflow' | 'clientes' | 'financeiro' | 'calendario' | 'configuracoes';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedOS, setSelectedOS] = useState<OrdemServico | null>(null);
  
  // Mock data state
  const [ordensServico, setOrdensServico] = useState(mockOrdensServico);
  const [comentarios, setComentarios] = useState(mockComentarios);

  const handleLogin = (email: string, _password: string) => {
    // Find user by email
    const user = mockUsers.find(u => u.email === email) || mockUsers[0];
    setCurrentUser(user);
    setCurrentPage('os-list');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
    setSelectedOS(null);
  };

  const handleNavigate = (page: string) => {
    // Mapear rotas de wizard
    const wizardRouteMap: Record<string, Page> = {
      '/os/criar/obras-lead': 'wizard-obras-lead',
      '/os/criar/start-contrato-obra': 'wizard-start-contrato-obra',
      '/os/criar/assessoria-lead': 'wizard-assessoria-lead',
      '/os/criar/start-contrato-assessoria': 'wizard-start-contrato-assessoria',
      '/os/criar/solicitacao-reforma': 'wizard-solicitacao-reforma',
      '/os/criar/vistoria': 'wizard-vistoria',
      '/os/criar/requisicao-compras': 'wizard-requisicao-compras',
      '/os/criar/requisicao-mao-obra': 'wizard-requisicao-mao-obra',
    };

    const mappedPage = wizardRouteMap[page] || (page as Page);
    setCurrentPage(mappedPage);
    setSelectedOS(null);
  };

  const handleOSClick = (os: OrdemServico) => {
    setSelectedOS(os);
    setCurrentPage('os-details');
  };

  const handleBackFromOS = () => {
    setSelectedOS(null);
    setCurrentPage('ordens-servico');
  };

  const handleAddComentario = (texto: string) => {
    if (!selectedOS || !currentUser) return;

    const newComentario: Comentario = {
      id: `${comentarios.length + 1}`,
      osId: selectedOS.id,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      texto,
      createdAt: new Date().toISOString()
    };

    setComentarios([...comentarios, newComentario]);
  };

  const handleStatusChange = (osId: string, newStatus: OSStatus) => {
    setOrdensServico(prev => 
      prev.map(os => 
        os.id === osId 
          ? { ...os, status: newStatus, updatedAt: new Date().toISOString() }
          : os
      )
    );
  };

  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'Início', href: '#' }];
    
    if (currentPage === 'os-list') {
      crumbs.push({ label: 'Ordens de Serviço' });
    } else if (currentPage === 'os-criar') {
      crumbs.push({ label: 'Ordens de Serviço', href: '#' });
      crumbs.push({ label: 'Criar Nova OS' });
    } else if (currentPage === 'ordens-servico') {
      crumbs.push({ label: 'Ordens de Serviço' });
      crumbs.push({ label: 'Criar Nova OS' });
    } else if (currentPage === 'os-details' && selectedOS) {
      crumbs.push({ label: 'Ordens de Serviço', href: '#' });
      crumbs.push({ label: selectedOS.codigo });
    } else if (currentPage === 'os-workflow') {
      crumbs.push({ label: 'Ordens de Serviço', href: '#' });
      crumbs.push({ label: 'Fluxo de Trabalho - Obras' });
    } else if (currentPage === 'os-details-workflow') {
      crumbs.push({ label: 'Ordens de Serviço', href: '#' });
      crumbs.push({ label: 'Detalhes e Fluxo de Trabalho' });
    } else if (currentPage === 'wizard-obras-lead') {
      crumbs.push({ label: 'Ordens de Serviço', href: '#' });
      crumbs.push({ label: 'Criar Nova OS', href: '#' });
      crumbs.push({ label: 'Novo Lead - Obras (OS 01-04)' });
    } else if (currentPage.startsWith('wizard-')) {
      crumbs.push({ label: 'Ordens de Serviço', href: '#' });
      crumbs.push({ label: 'Criar Nova OS', href: '#' });
      crumbs.push({ label: 'Wizard' });
    } else if (currentPage === 'dashboard') {
      crumbs.push({ label: 'Dashboard' });
    } else if (currentPage === 'clientes') {
      crumbs.push({ label: 'Clientes' });
    } else if (currentPage === 'financeiro') {
      crumbs.push({ label: 'Financeiro' });
    } else if (currentPage === 'calendario') {
      crumbs.push({ label: 'Calendário' });
    } else if (currentPage === 'configuracoes') {
      crumbs.push({ label: 'Configurações' });
    }
    
    return crumbs;
  };

  // Render Login Page
  if (currentPage === 'login' || !currentUser) {
    return (
      <>
        <FontLoader />
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Render Main Application with Layout
  return (
    <>
      <FontLoader />
      <div className="flex h-screen overflow-hidden bg-neutral-100">
        <Sidebar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            user={currentUser}
            breadcrumbs={getBreadcrumbs()}
            onLogout={handleLogout}
            osData={currentPage === 'os-details-workflow' ? {
              codigo: 'OS-001',
              titulo: 'Perícia de Fachada',
              cliente: 'Condomínio Jardim das Flores',
              status: 'Em Triagem',
              statusVariant: 'outline',
              onBack: () => setCurrentPage('ordens-servico')
            } : undefined}
          />
          
          <main className="flex-1 overflow-auto">
            {currentPage === 'dashboard' && (
              <div className="p-8">
                <h1 className="mb-4">Dashboard</h1>
                <p className="text-neutral-600 mb-8">Em desenvolvimento...</p>
              </div>
            )}
            
            {currentPage === 'os-list' && (
              <OSListPage 
                currentUser={currentUser} 
                onNavigate={handleNavigate}
              />
            )}
            
            {currentPage === 'os-criar' && (
              <OSCreationHub onNavigate={handleNavigate} />
            )}
            
            {currentPage === 'ordens-servico' && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentPage('os-details-workflow')}
                    className="text-sm text-primary hover:underline"
                  >
                    Ver exemplo de OS com Fluxo de Trabalho →
                  </button>
                </div>
                <CreateOSPage
                  onCancel={() => setCurrentPage('dashboard')}
                  onCreate={(data) => {
                    console.log('Nova OS criada:', data);
                    // TODO: Implementar lógica de criação de OS
                    // Após criar, redirecionar para a página de detalhes com fluxo
                    setCurrentPage('os-details-workflow');
                  }}
                />
              </div>
            )}
            
            {currentPage === 'os-details' && selectedOS && (
              <OSDetailsPage 
                ordemServico={selectedOS}
                comentarios={comentarios.filter(c => c.osId === selectedOS.id)}
                documentos={mockDocumentos.filter(d => d.osId === selectedOS.id)}
                historico={mockHistorico.filter(h => h.osId === selectedOS.id)}
                onBack={handleBackFromOS}
                onAddComentario={handleAddComentario}
              />
            )}
            
            {currentPage === 'os-workflow' && (
              <OSWorkflowPage
                onBack={() => setCurrentPage('ordens-servico')}
              />
            )}
            
            {currentPage === 'os-details-workflow' && (
              <OSDetailsWorkflowPage key="os-details-workflow" />
            )}
            
            {/* Wizards de Criação de OS */}
            {currentPage === 'wizard-obras-lead' && (
              <OSDetailsWorkflowPage key="wizard-obras-lead" onBack={() => setCurrentPage('os-criar')} />
            )}
            
            {currentPage === 'wizard-start-contrato-obra' && (
              <OSWizardPlaceholder
                title="Start de Contrato de Obra (OS 13)"
                description="Este wizard permite registrar o início de um contrato de obra já assinado."
                onBack={() => setCurrentPage('os-criar')}
              />
            )}
            
            {currentPage === 'wizard-assessoria-lead' && (
              <OSDetailsAssessoriaPage key="wizard-assessoria-lead" onBack={() => setCurrentPage('os-criar')} />
            )}
            
            {currentPage === 'wizard-start-contrato-assessoria' && (
              <OSWizardPlaceholder
                title="Start de Contrato de Assessoria (OS 11, 12)"
                description="Este wizard permite registrar o início de um contrato de assessoria já assinado."
                onBack={() => setCurrentPage('os-criar')}
              />
            )}
            
            {currentPage === 'wizard-solicitacao-reforma' && (
              <OSWizardPlaceholder
                title="Solicitação de Reforma (OS 07)"
                description="Este wizard permite criar uma solicitação de termo de reforma para clientes."
                onBack={() => setCurrentPage('os-criar')}
              />
            )}
            
            {currentPage === 'wizard-vistoria' && (
              <OSWizardPlaceholder
                title="Vistoria Técnica (OS 08)"
                description="Este wizard permite criar uma ordem de vistoria ou inspeção técnica."
                onBack={() => setCurrentPage('os-criar')}
              />
            )}
            
            {currentPage === 'wizard-requisicao-compras' && (
              <OSWizardPlaceholder
                title="Requisição de Compras (OS 09)"
                description="Este wizard permite criar uma requisição de compra de materiais ou serviços."
                onBack={() => setCurrentPage('os-criar')}
              />
            )}
            
            {currentPage === 'wizard-requisicao-mao-obra' && (
              <OSWizardPlaceholder
                title="Requisição de Mão de Obra (OS 10)"
                description="Este wizard permite solicitar a contratação de nova mão de obra ou colaboradores."
                onBack={() => setCurrentPage('os-criar')}
              />
            )}
            
            {currentPage === 'clientes' && (
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Clientes</h1>
                <p className="text-neutral-600 font-normal">Em desenvolvimento...</p>
              </div>
            )}
            
            {currentPage === 'financeiro' && (
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Financeiro</h1>
                <p className="text-neutral-600 font-normal">Em desenvolvimento...</p>
              </div>
            )}
            
            {currentPage === 'calendario' && (
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Calendário</h1>
                <p className="text-neutral-600 font-normal">Em desenvolvimento...</p>
              </div>
            )}
            
            {currentPage === 'configuracoes' && (
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Configurações</h1>
                <p className="text-neutral-600 font-normal">Em desenvolvimento...</p>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Toaster />
    </>
  );
}
