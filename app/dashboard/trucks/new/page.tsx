"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTruck() {
  const router = useRouter();


type Client = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: string;
};

  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [clientId, setClientId] = useState("");

  
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch("/api/clients")
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/trucks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plate,
        model,
        year,
        clientId,
      }),
    });

    router.push("/dashboard/trucks");
  }

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Novo Caminhão</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Placa"
          className="border p-2 w-full"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <input
          placeholder="Modelo"
          className="border p-2 w-full"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <input
          placeholder="Ano"
          type="number"
          className="border p-2 w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        >
          <option value="">Selecione um cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Salvar Caminhão
        </button>

      </form>
    </div>
  );
}