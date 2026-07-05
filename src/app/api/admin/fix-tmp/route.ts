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

  const result = await prisma.product.deleteMany({
    where: { name: { in: ["Горилла (ж/б) Личи", "Горилла (ж/б) Груша"] } },
  });

  return NextResponse.json({ deleted: result.count });
}
