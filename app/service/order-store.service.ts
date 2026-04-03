import { prisma } from "@/lib/prisma";

export async function createOrder(clientId: string, items: {
  productId: string;
  quantity: number;
}[]) {
  // 1. Buscar produtos
  const productIds = items.map(i => i.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  // 2. Validar estoque
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);

    if (!product) throw new Error("Produto não encontrado");

    if (product.stock < item.quantity) {
      throw new Error(`Estoque insuficiente para ${product.name}`);
    }
  }

  // 3. Calcular total
  let total = 0;

  const orderItems = items.map(item => {
    const product = products.find(p => p.id === item.productId)!;

    const price = product.price;

    total += price * item.quantity;

    return {
      productId: item.productId,
      quantity: item.quantity,
      price
    };
  });

  // 4. Criar pedido + itens (transação)
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        clientId,
        total,
        status: "PENDENTE",
        items: {
          create: orderItems
        }
      },
      include: { items: true }
    });

    // 5. Atualizar estoque + movimentação
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });

      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          quantity: item.quantity,
          type: "SAIDA"
        }
      });
    }

    return newOrder;
  });

  return order;
}

export async function cancelOrder(orderId: string) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) throw new Error("Pedido não encontrado");

    // devolver estoque
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      });

      await tx.stockMovement.create({
        data: {
          productId: item.productId,
          quantity: item.quantity,
          type: "ENTRADA"
        }
      });
    }

    return tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELADO" }
    });
  });
}