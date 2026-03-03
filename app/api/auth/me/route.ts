import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose"; // Ou a biblioteca que você usou no seu createToken

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Aqui você deve usar a mesma lógica do seu lib/auth para verificar o token
    // Exemplo básico usando jose (ajuste conforme seu createToken):
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: { name: true, email: true }, // Não pegamos a senha!
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não existe" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}