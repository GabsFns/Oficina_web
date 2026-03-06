import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { password } = await req.json();

  const hash = process.env.ACCESS_PASSWORD_HASH;

  if (!hash) return NextResponse.json({ error: "Senha não configurada" }, { status: 500 });

  const isValid = await bcrypt.compare(password, hash);

  if (!isValid) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  // Cria cookie seguro, httpOnly
  const response = NextResponse.json({ message: "Acesso autorizado" });
  response.cookies.set({
    name: "oficina_access",
    value: "true",
    httpOnly: true, // impede JS ler o cookie
    secure: process.env.NODE_ENV === "production", // só HTTPS em produção
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });

  return response;
}