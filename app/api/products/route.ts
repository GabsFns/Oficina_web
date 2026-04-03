import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts } from "@/app/service/product.service";
const validCategories = [
  "MOTOR",
  "TRANSMISSAO",
  "FREIOS",
  "SUSPENSAO",
  "ELETRICO",
  "OUTROS",
] as const;

type ProductCategory = (typeof validCategories)[number];

// 🔥  type guard
function isProductCategory(value: unknown): value is ProductCategory {
  return validCategories.includes(value as ProductCategory);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categoryParam = searchParams.get("category");

  const category = isProductCategory(categoryParam)
    ? categoryParam
    : undefined;

  const products = await getProducts({
    search: searchParams.get("search") || undefined,
    category,
  });

  return NextResponse.json(products);
}