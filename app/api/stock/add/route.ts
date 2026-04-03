import { NextRequest, NextResponse } from "next/server";
import { addStock } from "@/app/service/stock.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await addStock(body);

    return NextResponse.json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}