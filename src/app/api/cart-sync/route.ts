import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { ids } = await request.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ images: {} });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: ids.filter((id): id is string => typeof id === "string") } },
    select: { id: true, imageUrl: true },
  });

  const images: Record<string, string | null> = {};
  for (const p of products) images[p.id] = p.imageUrl;

  return NextResponse.json({ images });
}
