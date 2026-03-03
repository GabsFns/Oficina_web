import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const clients = await prisma.client.findMany({
    include: { trucks: true },
  });

  return NextResponse.json(clients);
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