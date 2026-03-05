import { ReactNode, Suspense } from "react"; // 1. Importe Suspense
import Sidebar from "../components/sidebar"; 
import Header from "../components/header"; 
import { getUser } from "../service/auth-service";

// Componente separado para buscar os dados do usuário
async function SidebarWrapper() {
  const userData = await getUser();
  
  const user = {
    name: userData.name,
    email: userData.email,
    initials: userData.initials, // Você já faz esse cálculo no auth-service, pode usar direto
  };

  return <Sidebar user={user} />;
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-white">
      {/* 2. Envolva a busca do usuário em Suspense */}
      <Suspense fallback={<aside className="w-64 bg-[#121214] border-r border-white/5 animate-pulse" />}>
        <SidebarWrapper />
      </Suspense>

      <main className="flex-1 flex flex-col">
        <Header />
        <div className="p-8 overflow-y-auto">
          {/* 3. O children (a página) também pode ter seu próprio suspense se necessário */}
          <Suspense fallback={<div className="flex-1 flex items-center justify-center">Carregando dashboard...</div>}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}