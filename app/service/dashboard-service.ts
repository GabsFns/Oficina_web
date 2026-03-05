import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { getUser } from "./auth-service";
import { cookies } from "next/headers";

export const getDashboardData = cache(async () => {

  // necessário para evitar erro de cache do next
  cookies();

  const user = await getUser();

  const [
    clientsCount,
    trucksCount,
    recentClients,
    recentTrucks
  ] = await Promise.all([

    prisma.client.count(),

    prisma.truck.count(),

    prisma.client.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    }),

    prisma.truck.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        client: true
      }
    })
  ]);

  return {
    user,
    clientsCount,
    trucksCount,
    recentClients,
    recentTrucks
  };
});