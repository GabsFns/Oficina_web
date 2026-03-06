import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      num_os,
      problem_desc_client,
      date_input,
      clientId,
      truckId,
    } = body;

    const order = await prisma.ordemService.create({
      data: {
        num_os,
        status: "AGUARDANDO_DIAGNOSTICO",
        problem_desc_client,
        date_input: new Date(date_input),
        clientId,
        truckId,

        // cria histórico inicial
        statusHistory: {
          create: { status: "AGUARDANDO_DIAGNOSTICO" }
        }
      },
    });

    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar ordem de serviço" },
      { status: 500 }
    );
  }
}