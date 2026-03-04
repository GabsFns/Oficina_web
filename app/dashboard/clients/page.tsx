"use client";


import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

type ClientPayload = {
    id: string;
    name: string;
    phone: string;
}
  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      <a href="/dashboard/clients/new" className="bg-blue-500 text-white px-4 py-2 rounded">
        Novo Cliente
      </a>

      <ul className="mt-6 space-y-2">
        {clients.map((client: ClientPayload) => (
          <li key={client.id} className="border p-3 rounded">
            {client.name} - {client.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}