import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "../../service/order-store.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clientId, items } = body;

    const order = await createOrder(clientId, items);

    return NextResponse.json(order);
  } catch (err: unknown) {
  if (err instanceof Error) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  return NextResponse.json({ error: "Erro interno" }, { status: 500 });
}
}