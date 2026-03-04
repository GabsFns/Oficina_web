"use client";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Truck, Settings, LogOut, Plus, Search, Bell } from "lucide-react";

// Interfaces para o TypeScript não reclamar
interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface TruckType {
  id: string;
  plate: string;
  model: string;
  client: { name: string };
}

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [trucks, setTrucks] = useState<TruckType[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulação de usuário logado (Futuramente você pegará isso do seu Auth)
  const [user, setUser] = useState({ name: "Carregando...", email: "", initials: ".." });

  useEffect(() => {
    async function fetchData() {
      try {
        // 2. Adicione a chamada para /api/auth/me
        const [clientsRes, trucksRes, userRes] = await Promise.all([
  fetch("/api/clients", { 
    next: {
      tags: ["clients"],
      revalidate:  60
    },
    credentials: "include" }),
  fetch("/api/trucks", {
  next: { tags: ["trucks"], revalidate: 60 },
  credentials: "include",
}),
  fetch("/api/auth/me", { cache: "no-store", credentials: "include" }),
  
]);
        
        const clientsData = await clientsRes.json();
        const trucksData = await trucksRes.json();
        const userData = await userRes.json();

        setClients(clientsData);
        setTrucks(trucksData);

        // 3. Atualiza o usuário com dados reais
        if (userData.name) {
          setUser({
            name: userData.name,
            email: userData.email,
            initials: userData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Dados dinâmicos para os Cards
  const stats = [
    { label: "Total Clientes", value: clients.length, grow: "+12%", icon: <Users size={20} /> },
    { label: "Caminhões Cadastrados", value: trucks.length, grow: "+5%", icon: <Truck size={20} /> },
    { label: "O.S. Pendentes", value: "07", grow: "-2%", icon: <LayoutDashboard size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-white font-sans">
      
    

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        

        <div className="p-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold italic">Dashboard <span className="text-yellow-500">Oficina</span></h1>
            <p className="text-gray-500 text-sm">Olá, {user.name.split(' ')[0]}. Veja o que está acontecendo hoje.</p>
          </div>

          {/* STATS CARDS DINÂMICOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#121214] border border-white/5 p-6 rounded-[1.5rem] hover:border-yellow-500/20 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-xl text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{stat.label}</p>
                <h3 className="text-4xl font-bold mt-2">{loading ? "..." : stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LISTA DE CLIENTES REAIS */}
            <div className="bg-[#121214] border border-white/5 rounded-[1.5rem] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Clientes Recentes</h3>
                <a href="/dashboard/clients" className="text-xs text-yellow-500 hover:underline">Ver lista completa</a>
              </div>
              <div className="space-y-3">
                {clients.slice(0, 5).map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 flex items-center justify-center font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-yellow-500 transition-colors">{client.name}</p>
                        <p className="text-[10px] text-gray-500">{client.phone}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-700" />
                  </div>
                ))}
                {clients.length === 0 && !loading && <p className="text-gray-600 text-sm text-center py-4">Nenhum cliente cadastrado.</p>}
              </div>
            </div>

            {/* LISTA DE CAMINHÕES REAIS */}
            <div className="bg-[#121214] border border-white/5 rounded-[1.5rem] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Frota na Oficina</h3>
                <a href="/dashboard/trucks" className="text-xs text-yellow-500 hover:underline">Ver frota</a>
              </div>
              <div className="space-y-3">
                {trucks.slice(0, 5).map((truck) => (
                  <div key={truck.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="px-2 py-1 rounded bg-black text-yellow-500 font-mono text-xs border border-yellow-500/20">
                        {truck.plate}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{truck.model}</p>
                        <p className="text-[10px] text-gray-500">Proprietário: {truck.client?.name}</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                ))}
                {trucks.length === 0 && !loading && <p className="text-gray-600 text-sm text-center py-4">Nenhum caminhão na oficina.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// COMPONENTES AUXILIARES TIPADOS
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

function NavItem({ icon, label, active = false, href = "#" }: NavItemProps) {
  return (
    <a 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20" 
          : "text-gray-500 hover:bg-[#1a1a1e] hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}

function ChevronRight({ size, className }: { size: number; className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
  );
}