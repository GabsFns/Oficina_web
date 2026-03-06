"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Truck, User, Calendar, Hash, Tag, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

type Client = {
  id: string;
  name: string;
  phone: string;
};

export default function NewTruck() {
  const router = useRouter();

  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [marca, setMarca] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(() => toast.error("Erro ao carregar lista de clientes"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/trucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plate, model, marca, type, year, clientId }),
      });

      if (res.ok) {
        toast.success("Máquina cadastrada com sucesso!");
        setTimeout(() => router.push("/dashboard/trucks"), 1500);
      } else {
        toast.error("Erro ao salvar veículo.");
      }
    } catch (error) {
      toast.error("Falha na conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#121214', color: '#fff', border: '1px solid rgba(255,255,255,0.05)' } }} />

      <div className="max-w-3xl mx-auto">
        {/* BOTÃO VOLTAR */}
        <Link href="/dashboard/trucks" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Voltar para a Frota</span>
        </Link>

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <Truck className="text-yellow-500" size={32} />
            Cadastrar <span className="text-white/20">Novo Veículo</span>
          </h1>
          <div className="w-20 h-1 bg-yellow-500 mt-2"></div>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="bg-[#121214] border border-white/5 rounded-[2rem] p-8 shadow-2xl space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PLACA */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Hash size={12} /> Placa do Veículo
              </label>
              <input
                required
                placeholder="ABC-1234"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm font-mono uppercase tracking-widest"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </div>

            {/* MARCA */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Tag size={12} /> Marca / Fabricante
              </label>
              <input
                required
                placeholder="Ex: Volvo, Scania, Mercedes"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </div>

            {/* MODELO */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Truck size={12} /> Modelo
              </label>
              <input
                required
                placeholder="Ex: FH 540 Globetrotter"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            {/* ANO */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Calendar size={12} /> Ano de Fabricação
              </label>
              <input
                required
                type="number"
                placeholder="2024"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            {/* TIPO */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Truck size={12} /> Categoria / Tipo
              </label>
              <select 
                required
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm appearance-none cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}>
                <option value="" className="bg-[#121214]">Selecione o tipo</option>
                <option value="Cavalo Mecânico" className="bg-[#121214]">Cavalo Mecânico</option>
                <option value="Truck (6x2)" className="bg-[#121214]">Truck (6x2)</option>
                <option value="Bitrem" className="bg-[#121214]">Bitrem</option>
                <option value="Chassi Rígido" className="bg-[#121214]">Chassi Rígido</option>
              </select>
            </div>

            {/* PROPRIETÁRIO */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <User size={12} /> Vincular ao Cliente
              </label>
              <select
                required
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm appearance-none cursor-pointer"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="" className="bg-[#121214]">Selecione o proprietário</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id} className="bg-[#121214]">
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BOTÃO DE SALVAR */}
          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/10 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={18} /> Salvar no Sistema
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-8">
          Voldorico ALM Diesel — Controle de Frota Pesada
        </p>
      </div>
    </div>
  );
}