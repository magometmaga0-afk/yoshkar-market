import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";
import { seedProducts, MARKUP } from "@/lib/seedProducts";

export async function POST() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  const valid = secret ? await verifySessionToken(token, secret) : false;

  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const p of seedProducts) {
    await prisma.product.create({
      data: {
        name: p.name,
        category: p.category,
        volumeMl: p.volumeMl,
        caseSize: p.caseSize,
        purchasePrice: p.purchasePrice,
        sellPrice: p.purchasePrice + MARKUP,
      },
    });
  }

  return NextResponse.json({ created: seedProducts.length });
}
