import { NextRequest, NextResponse } from "next/server";
import { getStockHistory } from "@/app/service/stock.service";

export async function GET(
  _: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const history = await getStockHistory(params.productId);

    return NextResponse.json(history);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}