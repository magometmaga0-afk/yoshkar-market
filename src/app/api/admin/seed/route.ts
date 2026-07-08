import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";
import { seedProducts, getMarkup, computeSellPrice } from "@/lib/seedProducts";

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
      weightGrams: p.weightGrams ?? null,
      caseSize: p.caseSize,
      purchasePrice: p.purchasePrice,
      sellPrice: computeSellPrice(p.purchasePrice, p.markup ?? getMarkup(p.category)),
      // imageUrl/description/КБЖУ обновляются, только если заданы в seedProducts —
      // иначе не трогаем то, что уже вручную выставлено в базе через админку.
      ...(p.imageUrl ? { imageUrl: p.imageUrl } : {}),
      ...(p.description ? { description: p.description } : {}),
      ...(p.calories != null ? { calories: p.calories } : {}),
      ...(p.protein != null ? { protein: p.protein } : {}),
      ...(p.fat != null ? { fat: p.fat } : {}),
      ...(p.carbs != null ? { carbs: p.carbs } : {}),
    };
    const existing = await prisma.product.findFirst({ where: { name: p.name, volumeMl: p.volumeMl } });
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data });
    } else {
      await prisma.product.create({ data: { name: p.name, ...data } });
    }
  }

  return NextResponse.json({ synced: seedProducts.length });
}
