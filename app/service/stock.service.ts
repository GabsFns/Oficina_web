import { prisma } from "@/lib/prisma";

type StockInput = {
  productId: string;
  quantity: number;
  reason?: string;
};


export async function addStock({ productId, quantity }: StockInput) {
  if (quantity <= 0) throw new Error("Quantidade inválida");

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId }
    });

    if (!product) throw new Error("Produto não encontrado");

    // atualiza estoque
    await tx.product.update({
      where: { id: productId },
      data: {
        stock: {
          increment: quantity
        }
      }
    });

    // registra movimentação
    await tx.stockMovement.create({
      data: {
        productId,
        quantity,
        type: "ENTRADA"
      }
    });

    return { success: true };
  });
}

export async function removeStock({ productId, quantity }: StockInput) {
  if (quantity <= 0) throw new Error("Quantidade inválida");

  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId }
    });

    if (!product) throw new Error("Produto não encontrado");

    if (product.stock < quantity) {
      throw new Error("Estoque insuficiente");
    }

    // decrementa
    await tx.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity
        }
      }
    });

    // log
    await tx.stockMovement.create({
      data: {
        productId,
        quantity,
        type: "SAIDA"
      }
    });

    return { success: true };
  });
}

export async function adjustStock(productId: string, newQuantity: number) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId }
    });

    if (!product) throw new Error("Produto não encontrado");

    const diff = newQuantity - product.stock;

    if (diff === 0) return { success: true };

    await tx.product.update({
      where: { id: productId },
      data: {
        stock: newQuantity
      }
    });

    await tx.stockMovement.create({
      data: {
        productId,
        quantity: Math.abs(diff),
        type: diff > 0 ? "ENTRADA" : "SAIDA"
      }
    });

    return { success: true };
  });
}

export async function getStockHistory(productId: string) {
  return prisma.stockMovement.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" }
  });
}