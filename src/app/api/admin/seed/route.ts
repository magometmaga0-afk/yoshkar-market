import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";
import { seedProducts, getMarkup } from "@/lib/seedProducts";

export async function POST() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  const valid = secret ? await verifySessionToken(token, secret) : false;

  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Upsert by product name — never touches Order/OrderItem history.
  for (const p of seedProducts) {
    const data = {
      category: p.category,
      volumeMl: p.volumeMl,
      caseSize: p.caseSize,
      purchasePrice: p.purchasePrice,
      sellPrice: p.purchasePrice + getMarkup(p.category),
      // imageUrl обновляется, только если задан в seedProducts — иначе не трогаем
      // то, что уже вручную выставлено в базе через админку.
      ...(p.imageUrl ? { imageUrl: p.imageUrl } : {}),
    };
    await prisma.product.upsert({
      where: { name: p.name },
      create: { name: p.name, ...data },
      update: data,
    });
  }

  return NextResponse.json({ synced: seedProducts.length });
}
