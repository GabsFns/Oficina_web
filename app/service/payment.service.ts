import { prisma } from "@/lib/prisma";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!
});

export async function createPayment(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) throw new Error("Pedido não encontrado");

  const preference = new Preference(client);

  const response = await preference.create({
    body: {
      items: order.items.map(item => ({
  id: item.productId,
  title: item.product.name,
  description: item.product.description || "",
  quantity: item.quantity,
  unit_price: item.price,
  currency_id: "BRL"
})),
      external_reference: order.id,
      notification_url: "https://seusite.com/api/payment/webhook",
      back_urls: {
        success: "https://seusite.com/success",
        failure: "https://seusite.com/failure"
      }
    }
  });

  return {
    paymentUrl: response.init_point
  };
}