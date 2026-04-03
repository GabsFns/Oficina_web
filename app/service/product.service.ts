import { prisma } from "@/lib/prisma";

type CreateProductDTO = {
  name: string;
  description?: string;
  price: number;
  cost?: number;
  stock: number;
   category: "MOTOR" | "TRANSMISSAO" | "FREIOS" | "SUSPENSAO" | "ELETRICO" | "OUTROS";
  images?: { url: string; alt?: string }[];
};

export async function createProduct(data: CreateProductDTO) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        cost: data.cost,
        stock: data.stock,
        category: data.category,
        images: {
          create: data.images || [],
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    // registrar entrada de estoque
    if (data.stock > 0) {
      await tx.stockMovement.create({
        data: {
          productId: product.id,
          quantity: data.stock,
          type: "ENTRADA",
        },
      });
    }

    return product;
  });
}

export async function getProducts(query: {
  search?: string;
  categoryId?: string;
}) {
  return prisma.product.findMany({
    where: {
      active: true,
      name: {
        contains: query.search,
        mode: "insensitive",
      },
      categoryId: query.categoryId,
    },
    include: {
      images: true,
      category: true,
    },
  });
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      category: true,
    },
  });

  if (!product) throw new Error("Produto não encontrado");

  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<CreateProductDTO>,
) {
  return prisma.product.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.price && { price: data.price }),
      description: data.description,

      cost: data.cost,
      stock: data.stock,

      // relação correta
      category: data.category,

      // imagens (opcional - estratégia simples)
      images: data.images
        ? {
            deleteMany: {}, // remove antigas
            create: data.images,
          }
        : undefined,
    },
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.update({
    where: { id },
    data: {
      active: false,
    },
  });
}
