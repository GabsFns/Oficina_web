"use client";

import { LayoutDashboard, Users, Truck, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  initials: string;
}

export default function Sidebar({ user }: { user: User }) {
const router = useRouter();
  async function handleLogout() {
    try{
      const res = await fetch("/api/auth/logout", { method: "POST"})
      if (res.ok) {
        router.push("/auth/login")
      } else {
        alert("Erro ao sair da conta")
      }
    } catch (err){
      console.error(err)
    }
  }

  
  const pathname = usePathname();

  function NavItem({ href, icon, label }: any) {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          active
            ? "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20"
            : "text-gray-500 hover:bg-[#1a1a1e] hover:text-white"
        }`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </Link>
    );
  }

  return (
    <aside className="w-64 bg-[#121214] border-r border-white/5 flex flex-col p-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold">
          V
        </div>
        <span className="font-bold tracking-tight text-xl">ALM Diesel</span>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem href="/dashboard/clients" icon={<Users size={20} />} label="Clientes" />
        <NavItem href="/dashboard/trucks" icon={<Truck size={20} />} label="Caminhões" />
        <NavItem href="/dashboard/settings" icon={<Settings size={20} />} label="Configurações" />
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-bold text-xs">
          {user.initials}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="ml-auto text-gray-500 hover:text-white transition-colors">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}