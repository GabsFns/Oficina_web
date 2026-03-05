import { ReactNode, Suspense } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { getDashboardData } from "../service/dashboard-service";

async function SidebarWrapper() {

  const data = await getDashboardData();

  const user = {
    name: data.user.name,
    email: data.user.email,
    initials: data.user.initials
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

      <Suspense fallback={<aside className="w-64 bg-[#121214] border-r border-white/5 animate-pulse" />}>
        <SidebarWrapper />
      </Suspense>

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </main>

    </div>
  );
}