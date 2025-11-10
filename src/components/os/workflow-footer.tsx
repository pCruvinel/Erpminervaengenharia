import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface WorkflowFooterProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSaveDraft?: () => void;
  prevButtonText?: string;
  nextButtonText?: string;
  finalButtonText?: string;
  disablePrev?: boolean;
  disableNext?: boolean;
  showDraftButton?: boolean;
}

export function WorkflowFooter({
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onSaveDraft,
  prevButtonText = 'Etapa Anterior',
  nextButtonText = 'Salvar e Continuar',
  finalButtonText = 'Concluir OS',
  disablePrev = false,
  disableNext = false,
  showDraftButton = true,
}: WorkflowFooterProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex-shrink-0 border-t border-neutral-200 px-6 py-4 bg-neutral-50">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevStep}
          disabled={disablePrev || currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {prevButtonText}
        </Button>

        <span className="text-sm">
          <span className="font-semibold">{currentStep}</span> / {totalSteps}
        </span>

        <div className="flex gap-2">
          {showDraftButton && (
            <Button variant="outline" onClick={onSaveDraft}>
              Salvar Rascunho
            </Button>
          )}
          {isLastStep ? (
            <Button 
              onClick={onNextStep}
              disabled={disableNext}
              style={{ backgroundColor: '#06b6d4', color: 'white' }}
            >
              {finalButtonText}
              <Check className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={onNextStep}
              disabled={disableNext}
              style={{ backgroundColor: '#06b6d4', color: 'white' }}
            >
              {nextButtonText}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
