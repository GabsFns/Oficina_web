// src/services/auth-service.ts
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import * as jose from "jose";

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
};

export async function getUser(): Promise<User> {
  "use server";

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) throw new Error("Usuário não autenticado");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  const user = await prisma.user.findUnique({
    where: { id: payload.id as string },
    select: { id: true, name: true, email: true },
  });

  if (!user) throw new Error("Usuário não encontrado");

  return {
    ...user,
    initials: user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  };
}