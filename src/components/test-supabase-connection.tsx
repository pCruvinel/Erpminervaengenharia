"use client";

/**
 * COMPONENTE DE TESTE - Supabase Connection
 * 
 * Este componente verifica a conexão com o Supabase e exibe:
 * - Status da conexão
 * - Número de registros nas tabelas principais
 * - Exemplos de dados
 * 
 * Para testar, adicione em App.tsx:
 * import { TestSupabaseConnection } from './components/test-supabase-connection';
 * <TestSupabaseConnection />
 */

import React from 'react';
import { useApi } from '../lib/hooks/use-api';
import { clientesAPI, ordensServicoAPI, tiposOSAPI, healthCheck } from '../lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { CheckCircle, XCircle, Loader2, RefreshCw, Database } from 'lucide-react';

export function TestSupabaseConnection() {
  // Health check
  const { 
    data: healthData, 
    loading: healthLoading, 
    error: healthError,
    refetch: refetchHealth 
  } = useApi(healthCheck);

  // Clientes
  const { 
    data: clientes, 
    loading: clientesLoading,
    error: clientesError,
    refetch: refetchClientes
  } = useApi(() => clientesAPI.list());

  // Ordens de Serviço
  const { 
    data: ordensServico, 
    loading: osLoading,
    error: osError,
    refetch: refetchOS
  } = useApi(() => ordensServicoAPI.list());

  // Tipos de OS
  const { 
    data: tiposOS, 
    loading: tiposLoading,
    error: tiposError,
    refetch: refetchTipos
  } = useApi(() => tiposOSAPI.list());

  const handleRefreshAll = () => {
    refetchHealth();
    refetchClientes();
    refetchOS();
    refetchTipos();
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Teste de Conexão Supabase</h1>
          <p className="text-muted-foreground mt-2">
            Verifique o status da integração com o banco de dados
          </p>
        </div>
        <Button onClick={handleRefreshAll} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar Tudo
        </Button>
      </div>

      {/* Health Check */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>Status do Servidor</CardTitle>
          </div>
          <CardDescription>Verificação do servidor Edge Function</CardDescription>
        </CardHeader>
        <CardContent>
          {healthLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Conectando...</span>
            </div>
          )}
          
          {healthError && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Erro de conexão:</strong> {healthError.message}
              </AlertDescription>
            </Alert>
          )}
          
          {healthData && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Conexão ativa!</strong> Servidor respondendo normalmente.
                <br />
                Status: <code>{JSON.stringify(healthData)}</code>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Grid de Tabelas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Clientes/Leads</CardTitle>
            <CardDescription>Tabela: clientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {clientesLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Carregando...</span>
              </div>
            )}
            
            {clientesError && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  {clientesError.message}
                </AlertDescription>
              </Alert>
            )}
            
            {clientes && (
              <>
                <div className="text-4xl font-bold text-primary">
                  {clientes.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  registros encontrados
                </p>
                
                {clientes.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Exemplos:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {clientes.slice(0, 3).map((cliente: any) => (
                        <div key={cliente.id} className="border-l-2 border-primary pl-2">
                          {cliente.nome_razao_social}
                          <br />
                          <span className="text-xs opacity-70">
                            {cliente.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {clientes.length === 0 && (
                  <Alert>
                    <AlertDescription>
                      Nenhum cliente cadastrado ainda
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Ordens de Serviço */}
        <Card>
          <CardHeader>
            <CardTitle>Ordens de Serviço</CardTitle>
            <CardDescription>Tabela: ordens_servico</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {osLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Carregando...</span>
              </div>
            )}
            
            {osError && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  {osError.message}
                </AlertDescription>
              </Alert>
            )}
            
            {ordensServico && (
              <>
                <div className="text-4xl font-bold text-primary">
                  {ordensServico.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  registros encontrados
                </p>
                
                {ordensServico.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Exemplos:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {ordensServico.slice(0, 3).map((os: any) => (
                        <div key={os.id} className="border-l-2 border-primary pl-2">
                          {os.codigo_os}
                          <br />
                          <span className="text-xs opacity-70">
                            {os.status_geral}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {ordensServico.length === 0 && (
                  <Alert>
                    <AlertDescription>
                      Nenhuma OS cadastrada ainda
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Tipos de OS */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de OS</CardTitle>
            <CardDescription>Tabela: tipos_os</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tiposLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Carregando...</span>
              </div>
            )}
            
            {tiposError && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  {tiposError.message}
                </AlertDescription>
              </Alert>
            )}
            
            {tiposOS && (
              <>
                <div className="text-4xl font-bold text-primary">
                  {tiposOS.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  registros encontrados
                </p>
                
                {tiposOS.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Exemplos:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {tiposOS.slice(0, 3).map((tipo: any) => (
                        <div key={tipo.id} className="border-l-2 border-primary pl-2">
                          {tipo.codigo} - {tipo.nome}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {tiposOS.length === 0 && (
                  <Alert>
                    <AlertDescription>
                      Nenhum tipo de OS cadastrado ainda
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Integração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              {healthData ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : healthError ? (
                <XCircle className="h-4 w-4 text-red-600" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <span>
                <strong>Servidor:</strong> {healthLoading ? 'Verificando...' : healthError ? 'Offline' : 'Online'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {clientes ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : clientesError ? (
                <XCircle className="h-4 w-4 text-red-600" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <span>
                <strong>Tabela Clientes:</strong> {clientesLoading ? 'Carregando...' : clientesError ? 'Erro' : `${clientes?.length || 0} registros`}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {ordensServico ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : osError ? (
                <XCircle className="h-4 w-4 text-red-600" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <span>
                <strong>Tabela OS:</strong> {osLoading ? 'Carregando...' : osError ? 'Erro' : `${ordensServico?.length || 0} registros`}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {tiposOS ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : tiposError ? (
                <XCircle className="h-4 w-4 text-red-600" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <span>
                <strong>Tabela Tipos OS:</strong> {tiposLoading ? 'Carregando...' : tiposError ? 'Erro' : `${tiposOS?.length || 0} registros`}
              </span>
            </div>
          </div>
          
          <Alert className="mt-4">
            <AlertDescription>
              <strong>✨ Dica:</strong> Para popular o banco de dados com dados de teste, 
              use o Supabase Dashboard ou crie scripts de seed.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
