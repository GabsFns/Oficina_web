import { ReactNode } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // depois você pode buscar isso do server (cookies/session)
  const user = {
    name: "Usuário",
    email: "usuario@email.com",
    initials: "US",
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-white font-sans">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col">
        <Header />
        <div className="p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}