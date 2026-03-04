"use client";


import { useEffect, useState } from "react";

export default function TrucksPage() {

type Truck = {
  id: string;
  plate: string;
  model: string;
  marca: string;
  type: string;
  year: number;
  createdAt: string;
  client: {
    id: string;
    name: string;
    phone: string;
  };
};
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    fetch("/api/trucks")
      .then(res => res.json())
      .then(data => setTrucks(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Caminhões</h1>

      <a
        href="/dashboard/trucks/new"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Novo Caminhão
      </a>

      <div className="mt-6 space-y-3">
        {trucks.map((truck) => (
          <div key={truck.id} className="border p-4 rounded shadow-sm">
            <p><strong>Placa:</strong> {truck.plate}</p>
            <p><strong>Modelo:</strong> {truck.model}</p>
            <p><strong>marca:</strong> {truck.model}</p>
            <p><strong>type:</strong> {truck.model}</p>
            <p><strong>Ano:</strong> {truck.year}</p>
            <p><strong>Cliente:</strong> {truck.client?.name}</p>
            <p><strong>Telefone:</strong> {truck.client?.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}