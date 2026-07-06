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

  const renames: [string, string][] = [
    ["Соль \"Ипецкая\" 30кг", "Соль \"Илецкая\" 30кг"],
    ["Галерея Источников №17 (ПЭТ)", "Аллея Источников №17 (ПЭТ)"],
    ["Эмемденс шоколад 45гр", "M&M's шоколад 45гр"],
  ];
  const results: Record<string, number> = {};
  for (const [oldName, newName] of renames) {
    const result = await prisma.product.updateMany({
      where: { name: oldName },
      data: { name: newName },
    });
    results[`${oldName} -> ${newName}`] = result.count;
  }

  return NextResponse.json({ renamed: results });
}
