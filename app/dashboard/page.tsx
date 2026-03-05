import { getClients } from "../service/client-service";
import { getTrucks } from "../service/truck-service";
import { getUser } from "../service/auth-service";
import StatsCards from "./_components/stats-cards";
import ClientsList from "./_components/clients-list";
import TrucksList from "./_components/truck-list";

export default async function DashboardPage() {

  const user = await getUser()
  const clients = await getClients()
  const [ trucks] = await Promise.all([
    getTrucks(),
    //getUser(),
  ]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold italic">
          Dashboard <span className="text-yellow-500">Oficina</span>
        </h1>

        <p className="text-gray-500 text-sm">
          Olá, {user.name?.split(" ")[0]}. Veja o que está acontecendo hoje.
        </p>
      </div>

      <StatsCards
        totalClients={clients.length}
        totalTrucks={trucks.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ClientsList clients={clients} />
        <TrucksList trucks={trucks} />
      </div>
    </>
  );
}