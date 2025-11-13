import { toast as sonnerToast } from "sonner@2.0.3";

/**
 * Wrapper seguro para toast que previne erros se o Toaster não estiver montado
 */
export const toast = {
  success: (message: string, options?: any) => {
    try {
      return sonnerToast.success(message, options);
    } catch (error) {
      console.warn('Toast não pôde ser exibido:', message, error);
    }
  },
  
  error: (message: string, options?: any) => {
    try {
      return sonnerToast.error(message, options);
    } catch (error) {
      console.warn('Toast de erro não pôde ser exibido:', message, error);
    }
  },
  
  info: (message: string, options?: any) => {
    try {
      return sonnerToast.info(message, options);
    } catch (error) {
      console.warn('Toast de info não pôde ser exibido:', message, error);
    }
  },
  
  warning: (message: string, options?: any) => {
    try {
      return sonnerToast.warning(message, options);
    } catch (error) {
      console.warn('Toast de aviso não pôde ser exibido:', message, error);
    }
  },
  
  loading: (message: string, options?: any) => {
    try {
      return sonnerToast.loading(message, options);
    } catch (error) {
      console.warn('Toast de loading não pôde ser exibido:', message, error);
    }
  },
  
  promise: sonnerToast.promise,
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
};
