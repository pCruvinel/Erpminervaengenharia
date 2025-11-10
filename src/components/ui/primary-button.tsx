import React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "./utils";

/**
 * PrimaryButton - Botão primário da Minerva com estilo dourado corporativo
 * 
 * Características:
 * - Cor de fundo: #D3AF37 (dourado Minerva)
 * - Hover: #C19F27 (dourado escurecido)
 * - Efeitos: scale-95 ao clicar, sombras suaves
 * - Estados: loading, disabled
 * - Acessibilidade: cursor pointer, transições suaves
 * 
 * @example
 * ```tsx
 * <PrimaryButton onClick={handleSubmit}>
 *   Salvar
 * </PrimaryButton>
 * 
 * <PrimaryButton loading disabled>
 *   Processando...
 * </PrimaryButton>
 * ```
 */

export interface PrimaryButtonProps extends ButtonProps {
  /** Estado de carregamento (mostra texto de loading) */
  loading?: boolean;
  /** Texto alternativo quando loading=true */
  loadingText?: string;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, children, loading, loadingText, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          // Estilos base do Minerva Design System
          "bg-[#D3AF37] text-black",
          // Hover state
          "hover:bg-[#C19F27]",
          // Sombras
          "shadow-md hover:shadow-lg",
          // Active state (efeito de clique)
          "active:scale-95 active:shadow-sm",
          // Transições suaves
          "transition-all duration-200",
          // Cursor pointer
          "cursor-pointer",
          // Font weight (corporativo)
          "font-semibold",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (loadingText || children) : children}
      </Button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
