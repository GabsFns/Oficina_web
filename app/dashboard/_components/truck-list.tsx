interface Truck {
  id: string;
  plate: string;
  model: string;
  client?: {
    name: string;
  };
}

export default function TrucksList({ trucks }: { trucks: Truck[] }) {
  return (
    <div className="bg-[#121214] border border-white/5 rounded-[1.5rem] p-6">
      <div className="flex justify-between mb-6">
        <h3 className="font-bold text-lg">Frota na Oficina</h3>

        <a
          href="/dashboard/trucks"
          className="text-xs text-yellow-500 hover:underline"
        >
          Ver frota
        </a>
      </div>

      <div className="space-y-3">
        {trucks.slice(0, 5).map((truck) => (
          <div
            key={truck.id}
            className="flex justify-between p-3 bg-white/5 rounded-xl"
          >
            <div className="flex gap-3">
              <div className="px-2 py-1 bg-black text-yellow-500 text-xs font-mono rounded">
                {truck.plate}
              </div>

              <div>
                <p className="text-sm font-bold">{truck.model}</p>
                <p className="text-xs text-gray-500">
                  {truck.client?.name}
                </p>
              </div>
            </div>

            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}