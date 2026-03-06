import { getDashboardData } from "../service/dashboard-service";

import StatsCards from "./_components/stats-cards";
import ClientsList from "./_components/clients-list";
import TrucksList from "./_components/truck-list";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
   const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const token_ofi = cookieStore.get("oficina_access");
  if (!token && token_ofi) {
    redirect("/");
  }
  const data = await getDashboardData();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold italic">
          Dashboard <span className="text-yellow-500">Oficina</span>
        </h1>

        <p className="text-gray-500 text-sm">
          Olá, {data.user.name?.split(" ")[0]}. Veja o que está acontecendo hoje.
        </p>
      </div>

      <StatsCards
        totalClients={data.clientsCount}
        totalTrucks={data.trucksCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ClientsList clients={data.recentClients} />
        <TrucksList trucks={data.recentTrucks} />
      </div>
    </>
  );
}