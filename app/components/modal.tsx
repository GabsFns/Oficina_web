"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  // Bloquear scroll ao abrir
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop de alto desfoque */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Container da Modal */}
      <div className="relative bg-[#0d0d0e] border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-[400px] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Detalhe de luz no topo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

        <div className="p-8">
          {title && (
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}

          <div className="relative z-10">
            {children}
          </div>
        </div>

        {/* Rodapé decorativo */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
}