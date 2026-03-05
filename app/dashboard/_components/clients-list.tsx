interface Client {
  id: string;
  name: string;
  phone: string;
}

export default function ClientsList({ clients }: { clients: Client[] }) {
  return (
    <div className="bg-[#121214] border border-white/5 rounded-[1.5rem] p-6">
      <div className="flex justify-between mb-6">
        <h3 className="font-bold text-lg">Clientes Recentes</h3>

        <a
          href="/dashboard/clients"
          className="text-xs text-yellow-500 hover:underline"
        >
          Ver lista completa
        </a>
      </div>

      <div className="space-y-3">
        {clients.slice(0, 5).map((client) => (
          <div
            key={client.id}
            className="flex justify-between p-3 hover:bg-white/5 rounded-xl"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 flex items-center justify-center rounded-lg font-bold">
                {client.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-bold">{client.name}</p>
                <p className="text-xs text-gray-500">{client.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}