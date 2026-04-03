import { NextRequest, NextResponse } from "next/server";
import { getStockHistory } from "@/app/service/stock.service";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await context.params;

    const history = await getStockHistory(productId);

    return NextResponse.json(history);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}