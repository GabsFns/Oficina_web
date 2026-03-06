'use client';
import { ReactNode, useState, useEffect } from 'react';
import { X, LayoutDashboard, Settings, User } from 'lucide-react';
import PrintOrderButton from './PrintOrderButton';
interface Tab {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

// ... dentro da interface ModalTabsProps, adicione a prop 'order'
interface ModalTabsProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  tabs: Tab[];
  order: any; // Adicione isso aqui
}



export default function ModalTabs({ isOpen, onClose, title, tabs, order }: ModalTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Bloquear scroll do fundo quando a modal abre
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop com desfoque profundo */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Container da Modal */}
      <div className="relative bg-[#0d0d0e] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Glow Decorativo de Fundo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Header Superior */}
        <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.01]">
          <div>
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Detalhes do Sistema</p>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
              {title || 'Informações'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Menu Lateral de Abas (Navegação) */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 p-4 bg-black/20">
            <div className="flex md:flex-col gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`
                    flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all
                    ${activeTab === index 
                      ? 'bg-yellow-500 text-black shadow-[0_10px_20px_rgba(234,179,8,0.2)] scale-[1.02]' 
                      : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Área de Conteúdo */}
          <div className="flex-1 p-8 bg-gradient-to-br from-transparent to-white/[0.02] max-h-[500px] overflow-y-auto custom-scrollbar">
            <div className="animate-in slide-in-from-right-4 duration-500">
              {tabs[activeTab]?.content}
            </div>
          </div>
        </div>

        {/* Footer da Modal */}
       <div className="p-6 border-t border-white/5 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col">
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
          Voldorico ALM Diesel • Terminal de Diagnóstico
        </p>
        <p className="text-[7px] text-gray-700 uppercase tracking-widest">
          Sincronizado com Banco de Dados Central
        </p>
      </div>
      
      {/* O Botão de Impressão */}
    <PrintOrderButton order={order ?? null} />
    </div>
      </div>
    </div>
  );
}