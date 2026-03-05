// src/services/truck-service.ts
import { prisma } from "@/lib/prisma";

export async function getTrucks() {
  "use server";

  const trucks = await prisma.truck.findMany({
    include: { client: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return trucks;
}