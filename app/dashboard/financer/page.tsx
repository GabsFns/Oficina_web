"use client";

import { useState } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from "recharts";
import { 
  TrendingUp, TrendingDown, DollarSign, BarChart3, 
  ArrowUpRight, ArrowDownRight, Download, Wallet, Activity, Zap 
} from "lucide-react";

// --- MOCK DE DADOS PARA OS GRÁFICOS ---
const financialData = [
  { name: "JAN", receita: 95000, despesa: 45000 },
  { name: "FEV", receita: 110000, despesa: 48000 },
  { name: "MAR", receita: 142580, despesa: 58320 },
  { name: "ABR", receita: 125000, despesa: 52000 },
  { name: "MAI", receita: 155000, despesa: 61000 },
  { name: "JUN", receita: 168000, despesa: 65000 },
];

const costDistribution = [
  { name: "Peças", value: 65, color: "#EAB308" },
  { name: "Mão de Obra", value: 20, color: "#FFFFFF" },
  { name: "Impostos", value: 10, color: "#4B5563" },
  { name: "Fixo", value: 5, color: "#1F2937" },
];

export default function FinancialAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Mensal");

  return (
    <div className="min-h-screen bg-[#121214] text-white p-8 font-sans selection:bg-yellow-500/30">
      
      {/* HEADER TÁTICO */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="text-yellow-500 animate-pulse" size={16} />
            <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em]">Intelligence & Economic Core</p>
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Análise <span className="text-gray-500 italic font-light">Estratégica</span>
          </h1>
        </div>

        <div className="flex gap-4">
          <div className="bg-[#0d0d0e] border border-white/10 rounded-2xl p-1 flex gap-1">
            {["Semanal", "Mensal", "Anual"].map((period) => (
              <button
                key={period}
                onClick={() => setTimeRange(period)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  timeRange === period ? "bg-yellow-500 text-black" : "text-gray-500 hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition-all text-gray-400 group">
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Faturamento Bruto" value="R$ 142.580" trend="+12.5%" isUp={true} icon={<DollarSign size={20}/>} />
        <StatCard title="Operacional" value="R$ 58.320" trend="+2.1%" isUp={false} icon={<TrendingDown size={20}/>} />
        <StatCard title="Lucro Líquido" value="R$ 84.260" trend="+18.4%" isUp={true} highlight icon={<Zap size={20}/>} />
        <StatCard title="Ticket Médio" value="R$ 4.250" trend="-0.8%" isUp={false} icon={<BarChart3 size={20}/>} />
      </div>

      {/* MAIN CHARTS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* GRÁFICO DE ÁREA PREMIUM (FLUXO DE CAIXA) */}
        <div className="xl:col-span-2 bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none text-8xl font-black italic text-white/5 uppercase">Cashflow</div>
          
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter">Fluxo de Caixa</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Revenue vs Operational Cost</p>
            </div>
          </div>

          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#4b5563', fontSize: 10, fontWeight: 900}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0d0d0e', borderRadius: '16px', border: '1px solid #ffffff10', fontSize: '12px'}}
                  itemStyle={{fontWeight: 900, textTransform: 'uppercase'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="receita" 
                  stroke="#EAB308" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorReceita)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="despesa" 
                  stroke="#4b5563" 
                  strokeWidth={2}
                  fill="transparent"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO DE PIZZA DONUT (ALOCAÇÃO) */}
        <div className="bg-[#0d0d0e] border border-white/5 rounded-[2.5rem] p-10 flex flex-col relative group">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Cost Allocation</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-10">Distribuição por setor</p>
          
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costDistribution}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {costDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Peças</span>
              <span className="text-3xl font-mono font-black italic text-yellow-500">65%</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {costDistribution.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: item.color}} />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER INSIGHTS */}
      <footer className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-[2rem] p-8 flex items-center gap-6 group hover:scale-[1.01] transition-transform">
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-[0_0_30px_rgba(234,179,8,0.4)]">
               <TrendingUp size={32} />
            </div>
            <div>
               <h4 className="font-black italic uppercase tracking-tighter text-xl leading-none mb-1 text-yellow-500">Otimização Detectada</h4>
               <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-md">
                  Seu ticket médio cresceu <span className="text-white font-bold">5%</span> após a implementação do catálogo ZF. 
                  Recomendamos foco em manutenção preventiva no próximo trimestre.
               </p>
            </div>
         </div>

         <div className="bg-[#0d0d0e] border border-white/5 rounded-[2rem] p-8 flex items-center justify-between hover:border-white/10 transition-all">
            <div className="flex items-center gap-4">
               <div className="p-4 rounded-2xl bg-white/5 text-gray-500"><Wallet size={24} /></div>
               <div>
                  <h4 className="font-black italic uppercase tracking-tighter text-xl leading-none">Projeção de Caixa</h4>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">Estimativa de fechamento (Julho)</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-2xl font-mono font-black italic text-white leading-none tracking-tighter">R$ 182.000</p>
               <span className="text-[9px] font-black text-green-500 uppercase flex items-center gap-1 justify-end">
                 <ArrowUpRight size={10} /> +12% vs Jun
               </span>
            </div>
         </div>
      </footer>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---
function StatCard({ title, value, trend, isUp, icon, highlight = false }: any) {
  return (
    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${
      highlight ? "bg-yellow-500 border-yellow-500 shadow-[0_20px_60px_rgba(234,179,8,0.25)]" : "bg-[#0d0d0e] border-white/5 hover:border-yellow-500/30"
    }`}>
      {highlight && (
        <div className="absolute -right-4 -top-4 text-black/10 rotate-12 group-hover:scale-110 transition-transform">
          <Zap size={120} fill="currentColor" />
        </div>
      )}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3 rounded-2xl ${highlight ? "bg-black text-yellow-500" : "bg-white/5 text-gray-500 group-hover:text-yellow-500 transition-colors"}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${
          highlight ? "bg-black/20 text-black" : isUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}>
          {isUp ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${highlight ? "text-black/60" : "text-gray-500"}`}>
          {title}
        </p>
        <h4 className={`text-3xl font-mono font-black italic tracking-tighter ${highlight ? "text-black" : "text-white"}`}>
          {value}
        </h4>
      </div>
    </div>
  );
}