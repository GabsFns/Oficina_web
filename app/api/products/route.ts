import { NextRequest, NextResponse } from "next/server";
import { createProduct, getProducts } from "@/app/service/product.service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const products = await getProducts({
    search: searchParams.get("search") || undefined,
    categoryId: searchParams.get("categoryId") || undefined
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const product = await createProduct(body);

    return NextResponse.json(product);
  } catch (err: unknown) {
  if (err instanceof Error) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  return NextResponse.json({ error: "Erro interno" }, { status: 500 });
}
}