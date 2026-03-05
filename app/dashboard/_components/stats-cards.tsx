import { Users, Truck, LayoutDashboard } from "lucide-react";

interface Props {
  totalClients: number;
  totalTrucks: number;
}

export default function StatsCards({
  totalClients,
  totalTrucks,
}: Props) {

  const stats = [
    {
      label: "Total Clientes",
      value: totalClients,
      icon: <Users size={20} />,
    },
    {
      label: "Caminhões",
      value: totalTrucks,
      icon: <Truck size={20} />,
    },
    {
      label: "O.S. Pendentes",
      value: 7,
      icon: <LayoutDashboard size={20} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-[#121214] border border-white/5 p-6 rounded-[1.5rem]"
        >
          <div className="p-3 bg-white/5 rounded-xl text-yellow-500 w-fit">
            {stat.icon}
          </div>

          <p className="text-gray-500 text-xs uppercase mt-4">
            {stat.label}
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {stat.value}
          </h3>
        </div>
      ))}
    </div>
  );
}