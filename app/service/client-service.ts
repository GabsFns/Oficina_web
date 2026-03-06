// src/services/client-service.ts
import { prisma } from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { cache } from "react";

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  createdAt: Date;
  trucks?: {
    id: string;
    plate: string;
    model: string;
    marca: string | null;
    type: string;
    year: number;
    clientId: string;
    createdAt: Date;
  }[];
};



export const getClients = cache(async (includeTrucks = false) => {
'use server'
  cookies(); 
  headers();// marca como request-based (resolve o erro do Next)

  const clients = await prisma.client.findMany({
    include: includeTrucks ? { trucks: true } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return clients;
});