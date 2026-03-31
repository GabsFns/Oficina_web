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




export async function getClients(includeTrucks = false) {
  'use server'
  
  cookies(); // marca request-based
  headers(); // também marca

  return await prisma.client.findMany({
    include: includeTrucks ? { trucks: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
}