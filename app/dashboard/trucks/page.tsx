'use client'
import { Plus, Truck, Hash, User, Calendar, Settings2, Search } from "lucide-react";
import Link from "next/link";
import { useTrucks } from '../../hooks/useTrucks'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function TrucksPage() {
     const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const token_ofi = cookieStore.get("oficina_access");
    if (!token && token_ofi) {
      redirect("/");
    }
 const { trucks, isLoading, error } = useTrucks()
 
if (isLoading) return <p className="text-white">Carregando veículos...</p>
  if (error) return <p className="text-red-500">Erro ao carregar veículos</p>

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">Frota Gerenciada</p>
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
            Veículos <span className="text-white/20">Diesel</span>
          </h1>
        </div>

        <Link
          href="/dashboard/trucks/new"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold uppercase text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Cadastrar Veículo
        </Link>
      </div>

      {/* ÁREA DA TABELA */}
      <div className="bg-[#121214] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        
        {/* BARRA DE PESQUISA */}
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
          <Search size={18} className="text-gray-500" />
          <input 
            type="text" 
            placeholder="Filtrar por placa, modelo ou proprietário..." 
            className="bg-transparent border-none outline-none text-sm text-gray-400 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Veículo / Placa</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Especificações</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500">Proprietário</th>
                <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 text-right">Gerenciar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {trucks.map((truck: any) => (
                <tr key={truck.id} className="hover:bg-white/[0.02] transition-colors group">
                  
                  {/* VEÍCULO E PLACA */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/5 border border-white/5 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                        <Truck size={22} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-gray-200 uppercase italic tracking-tighter leading-none mb-1">
                          {truck.plate}
                        </p>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                          {truck.model}
                        </p>
                      </div>
                    </div>
                  </td>
                  
                  {/* ESPECIFICAÇÕES */}
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Hash size={12} className="text-yellow-500/50" />
                        <span className="font-bold">{truck.marca || "Marca N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase">
                        <Calendar size={12} />
                        Ano: {truck.year}
                      </div>
                    </div>
                  </td>

                  {/* PROPRIETÁRIO */}
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                        <User size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-300">{truck.client?.name || "Sem Vínculo"}</p>
                        <p className="text-[10px] text-gray-600 font-mono">{truck.client?.phone}</p>
                      </div>
                    </div>
                  </td>

                  {/* AÇÕES */}
                  <td className="px-8 py-6 text-right">
                    <button className="text-gray-600 hover:text-yellow-500 transition-all p-2 hover:bg-yellow-500/10 rounded-lg">
                      <Settings2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">
            {trucks.length} Máquinas registradas no sistema
          </p>
        </div>
      </div>
    </div>
  );
}