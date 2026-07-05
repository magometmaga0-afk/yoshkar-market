import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

export async function POST() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  const valid = secret ? await verifySessionToken(token, secret) : false;

  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await prisma.product.updateMany({
    where: { name: "Паппи Апельсин 0,45л" },
    data: { name: "Добрый Pulpy Апельсин 0,45л" },
  });

  return NextResponse.json({ renamed: result.count });
}
