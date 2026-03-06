import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: { trucks: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { name, phone, email } = await req.json();

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Nome e telefone obrigatórios" },
      { status: 400 }
    );
  }

  const client = await prisma.client.create({
    data: { name, phone, email },
  });

  return NextResponse.json(client);
}