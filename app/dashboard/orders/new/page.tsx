"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ClipboardList, 
  User, 
  Truck as TruckIcon, 
  Calendar, 
  FileText, 
  ArrowLeft, 
  Save,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function NewOrderService() {
  const router = useRouter();

  type Client = {
  id: string
  name: string
}

type Truck = {
  id: string
  plate: string
  model: string
}

  // Estados dos dados
  const [numOs, setNumOs] = useState(`OS-${Math.floor(1000 + Math.random() * 9000)}`);
  const [status, setStatus] = useState("ABERTO");
  const [problemDesc, setProblemDesc] = useState("");
  const [dateInput, setDateInput] = useState(new Date().toISOString().split('T')[0]);
  const [clientId, setClientId] = useState("");
  const [truckId, setTruckId] = useState("");

  // Estados de listas
const [clients, setClients] = useState<Client[]>([])
const [trucks, setTrucks] = useState<Truck[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar Clientes e Caminhões simultaneamente
    Promise.all([
      fetch("/api/clients").then(res => res.json()),
      fetch("/api/trucks").then(res => res.json())
    ]).then(([clientsData, trucksData]) => {
      setClients(clientsData);
      setTrucks(trucksData);
    }).catch(() => toast.error("Erro ao carregar dados auxiliares"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      num_os: numOs,
      status,
      problem_desc_client: problemDesc,
      date_input: new Date(dateInput),
      clientId,
      truckId,
    };


    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Ordem de Serviço aberta!");
        setTimeout(() => router.push("/dashboard/orders"), 1500);
      } else {
        toast.error("Erro ao criar O.S.");
      }
    } catch (error) {
      toast.error("Falha na comunicação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-6 md:p-10 font-sans">
      <Toaster position="top-right" toastOptions={{ style: { background: '#121214', color: '#fff', border: '1px solid rgba(255,255,255,0.05)' } }} />

      <div className="max-w-4xl mx-auto">
        {/* VOLTAR */}
        <Link href="/dashboard/orders" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-500 transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Painel de Ordens</span>
        </Link>

        {/* HEADER */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
              <ClipboardList className="text-yellow-500" size={32} />
              Abertura de <span className="text-white/20">O.S.</span>
            </h1>
            <div className="w-24 h-1 bg-yellow-500 mt-2"></div>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">Identificador Único</p>
            <p className="text-xl font-mono font-black text-yellow-500/80">{numOs}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CLIENTE */}
            <div className="md:col-span-2 group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <User size={12} /> Cliente / Proprietário
              </label>
              <select
                required
                className="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm appearance-none"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              >
                <option value="">Selecione o cliente</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* DATA ENTRADA */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <Calendar size={12} /> Data de Entrada
              </label>
              <input
                required
                type="date"
                className="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm color-scheme-dark"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
            </div>

            {/* VEÍCULO */}
            <div className="md:col-span-2 group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <TruckIcon size={12} /> Veículo (Caminhão/Máquina)
              </label>
              <select
                required
                className="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm appearance-none"
                value={truckId}
                onChange={(e) => setTruckId(e.target.value)}
              >
                <option value="">Selecione o veículo pela placa</option>
                {trucks.map((t) => (
                  <option key={t.id} value={t.id}>{t.plate} - {t.model}</option>
                ))}
              </select>
            </div>

            {/* STATUS INICIAL */}
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
                <AlertCircle size={12} /> Status Inicial
              </label>
              <select
                className="w-full bg-[#121214] border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-yellow-500 transition-all text-sm appearance-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ABERTO">ABERTO</option>
                <option value="AGUARDANDO_PAGAMENTO">AGUARDANDO PEÇAS</option>
                <option value="EM_DIAGNOSTICO">EM DIAGNÓSTICO</option>
              </select>
            </div>
          </div>

          {/* DESCRIÇÃO DO PROBLEMA */}
          <div className="group">
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1 mb-2 group-focus-within:text-yellow-500 transition-colors">
              <FileText size={12} /> Relato do Cliente / Sintomas do Defeito
            </label>
            <textarea
              required
              rows={5}
              placeholder="Descreva detalhadamente o que o cliente relatou (ex: Perda de potência, fumaça preta, barulho no diferencial...)"
              className="w-full bg-[#121214] border border-white/5 rounded-[1.5rem] px-6 py-5 outline-none focus:border-yellow-500 transition-all text-sm resize-none"
              value={problemDesc}
              onChange={(e) => setProblemDesc(e.target.value)}
            />
          </div>

          {/* BOTÃO SUBMIT */}
          <div className="pt-4">
            <button
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/10 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save size={18} /> Registrar Ordem de Serviço
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-12">
          Voldorico ALM Diesel — Sistema de Gestão Industrial
        </p>
      </div>
    </div>
  );
}