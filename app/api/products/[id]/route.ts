import { NextRequest, NextResponse } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/app/service/product.service";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const product = await updateProduct(params.id, body);
  return NextResponse.json(product);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await deleteProduct(params.id);
  return NextResponse.json({ success: true });
}