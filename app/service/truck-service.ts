import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { cookies } from "next/headers";

export const getTrucks = cache(async () => {

  cookies();

  const trucks = await prisma.truck.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
    },
  });

  return trucks;
});