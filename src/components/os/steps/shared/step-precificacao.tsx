import React from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Alert, AlertDescription } from '../../../ui/alert';
import { AlertCircle } from 'lucide-react';

interface StepPrecificacaoProps {
  data: {
    valorBase: string;
    descontos: string;
    acrescimos: string;
    observacoesFinanceiras: string;
  };
  onDataChange: (data: any) => void;
}

export function StepPrecificacao({ data, onDataChange }: StepPrecificacaoProps) {
  const calcularValorTotal = () => {
    const valorBase = parseFloat(data.valorBase || '0');
    const descontos = parseFloat(data.descontos || '0');
    const acrescimos = parseFloat(data.acrescimos || '0');
    return (valorBase * (1 - descontos / 100) + acrescimos).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Preencha os valores para calcular o preço final do serviço.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div>
          <Label>Valor Base</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={data.valorBase}
            onChange={(e) => onDataChange({ ...data, valorBase: e.target.value })}
          />
        </div>

        <div>
          <Label>Descontos (%)</Label>
          <Input
            type="number"
            placeholder="0"
            value={data.descontos}
            onChange={(e) => onDataChange({ ...data, descontos: e.target.value })}
          />
        </div>

        <div>
          <Label>Acréscimos (R$)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={data.acrescimos}
            onChange={(e) => onDataChange({ ...data, acrescimos: e.target.value })}
          />
        </div>

        <div>
          <Label>Observações Financeiras</Label>
          <Textarea
            placeholder="Condições de pagamento, parcelamento..."
            value={data.observacoesFinanceiras}
            onChange={(e) => onDataChange({ ...data, observacoesFinanceiras: e.target.value })}
            rows={4}
          />
        </div>
      </div>

      {data.valorBase && (
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Valor Total:</span>
              <span className="text-xl text-primary">
                R$ {calcularValorTotal()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
