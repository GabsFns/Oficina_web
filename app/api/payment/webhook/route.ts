import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const payment = new Payment(client);

    const data = await payment.get({
      id: body.data.id
    });

    const orderId = data.external_reference;

    if (!orderId) return NextResponse.json({ ok: true });

    if (data.status === "approved") {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAGO"
        }
      });
    }

    if (data.status === "rejected") {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "CANCELADO"
        }
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro webhook" }, { status: 500 });
  }
}