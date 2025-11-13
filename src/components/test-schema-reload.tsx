"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle2, RefreshCw, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * Componente de debug para testar e recarregar o schema do PostgREST
 * 
 * Use este componente quando estiver enfrentando erros de schema cache como:
 * "Could not find the 'titulo' column of 'ordens_servico' in the schema cache"
 */
export function TestSchemaReload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const reloadSchema = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5ad7fd2c/reload-schema`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Erro ao recarregar schema');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const checkTableStructure = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5ad7fd2c/debug/table-structure`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Erro ao verificar estrutura');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Debug: PostgREST Schema Cache
          </CardTitle>
          <CardDescription>
            Ferramentas para diagnosticar e resolver problemas de cache de schema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Quando usar:</strong> Se você está recebendo erros como{' '}
              <code className="text-sm bg-neutral-100 px-1 py-0.5 rounded">
                "Could not find the 'titulo' column..."
              </code>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={reloadSchema}
              disabled={loading}
              className="flex items-center gap-2"
              variant="default"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Recarregar Schema
            </Button>

            <Button
              onClick={checkTableStructure}
              disabled={loading}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Database className="h-4 w-4" />
              Verificar Estrutura da Tabela
            </Button>
          </div>

          {result && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                <strong>Sucesso!</strong>
                <pre className="mt-2 text-xs bg-white p-2 rounded border border-green-200 overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                <strong>Erro:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p><strong>Passos para resolver erro de schema:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Clique em "Recarregar Schema"</li>
              <li>Aguarde ~10 segundos</li>
              <li>Clique em "Verificar Estrutura da Tabela"</li>
              <li>Verifique se a coluna <code>descricao</code> aparece (não <code>titulo</code>)</li>
              <li>Tente criar uma OS novamente</li>
            </ol>
            <p className="mt-4">
              <strong>Se o erro persistir:</strong> Vá para o Supabase Dashboard → 
              Settings → API → "Reload Schema" ou "Restart PostgREST"
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Projeto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project ID:</span>
            <code className="bg-neutral-100 px-2 py-1 rounded">{projectId}</code>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">API URL:</span>
            <code className="bg-neutral-100 px-2 py-1 rounded text-xs">
              https://{projectId}.supabase.co/functions/v1/
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
