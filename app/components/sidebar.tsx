"use client";

import { LayoutDashboard, Users, Truck, Settings, LogOut, ListOrdered, AlertTriangle} from "lucide-react";
import { refresh } from "next/cache";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import Modal from "./modal";
import { useState } from "react";
interface User {
  name: string;
  email: string;
  initials: string;
}

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  pathname: string;
}

function NavItem({ href, icon, label, pathname }: NavItemProps) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active
          ? "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20"
          : "text-gray-500 hover:bg-[#1a1a1e] hover:text-white"
        }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

const menuItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    href: "/dashboard/clients",
    label: "Clientes",
    icon: <Users size={20} />,
  },
  {
    href: "/dashboard/trucks",
    label: "Caminhões",
    icon: <Truck size={20} />,
  },
  {
    href: "/dashboard/orders",
    label: "Serviços",
    icon: <ListOrdered size={20} />,
  },
  {
    href: "/dashboard/settings",
    label: "Configurações",
    icon: <Settings size={20} />,
  },
];

export default function Sidebar({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const [logoutOpen, setLogoutOpen] = useState(false);
  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        router.replace("/auth/login");
        refresh()
      } else {
        alert("Erro ao sair da conta");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <aside className="w-64 bg-[#121214] border-r border-white/5 flex flex-col p-6">
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold">
          V
        </div>
        <span className="font-bold tracking-tight text-xl">ALM Diesel</span>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            pathname={pathname}
          />
        ))}
      </nav>

      {/* USER */}
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-700 flex items-center justify-center text-black font-bold text-xs">
          {user.initials}
        </div>

        <div className="overflow-hidden">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
        </div>

        <button
          onClick={() => setLogoutOpen(true)}
          className="ml-auto text-gray-500 hover:text-white transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    <Modal
  open={logoutOpen}
  onClose={() => setLogoutOpen(false)}
  title="Encerrar Sessão"
>
  <div className="flex flex-col items-center text-center">
    {/* Ícone de Alerta Premium */}
    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
      <AlertTriangle className="text-red-500" size={28} />
    </div>

    <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 uppercase tracking-wide">
      Você está prestes a desconectar do terminal <span className="text-white font-bold">Voldorico ALM</span>. 
      Sua conexão segura será encerrada.
    </p>

    <div className="flex flex-col w-full gap-3">
      {/* Botão Sair (Destaque) */}
      <button
        onClick={handleLogout}
        className="w-full group relative flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-[0.98] overflow-hidden"
      >
        <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
        Confirmar Desconexão
      </button>

      {/* Botão Cancelar (Discreto) */}
      <button
        onClick={() => setLogoutOpen(false)}
        className="w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/5 transition-all"
      >
        Manter Conectado
      </button>
    </div>
  </div>
</Modal>
    </aside>


  );
}