import { NextRequest, NextResponse } from "next/server";
import { createPayment } from "@/app/service/payment.service";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    const payment = await createPayment(orderId);

    return NextResponse.json(payment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}