'use client';
import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';

interface Tab {
  label: string;
  content: ReactNode;
}

interface ModalTabsProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  tabs: Tab[];
}

export default function ModalTabs({ isOpen, onClose, title, tabs }: ModalTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#111] rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-700">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-semibold rounded-t-lg ${
                activeTab === index
                  ? 'bg-yellow-500 text-black'
                  : 'bg-[#222] text-gray-400 hover:bg-gray-800'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo ativo */}
        <div className="text-gray-300">
          {tabs[activeTab]?.content}
        </div>
      </div>
    </div>
  );
}