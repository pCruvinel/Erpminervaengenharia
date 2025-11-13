"use client";

import { Toaster as Sonner } from "sonner@2.0.3";

const Toaster = () => {
  return (
    <Sonner 
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        // Aumentar duração para evitar fechamento rápido
        duration: 4000,
      }}
    />
  );
};

export { Toaster };