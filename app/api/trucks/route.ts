import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const trucks = await prisma.truck.findMany({
    include: { client: true },
     orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(trucks);
}

export async function POST(req: Request) {
  const { plate, model, year, clientId, marca, type } = await req.json();

  if (!plate || !model || !year || !clientId) {
    return NextResponse.json(
      { error: "Todos os campos são obrigatórios" },
      { status: 400 }
    );
  }

  const truck = await prisma.truck.create({
    data: {
      plate,
      model,
      marca,
      type,
      year: Number(year),
      clientId,
    },
  });

  return NextResponse.json(truck);
}