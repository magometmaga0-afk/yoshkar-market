import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

const renames: [string, string][] = [
  ["Флэш Ягодный (ж/б, все виды)", "Флэш Ягодный (ж/б)"],
  ["Торнадо Шторм (все виды)", "Торнадо Шторм"],
  ["Power Torr Манго (ПЭТ, все виды)", "Power Torr Манго (ПЭТ)"],
  ["Power Torr синий (ПЭТ, все виды)", "Power Torr синий (ПЭТ)"],
  ["Lit Energy Персик (все виды)", "Lit Energy Персик"],
  ["Добрый Апельсин/Фанта 1л (все виды)", "Добрый Апельсин/Фанта 1л"],
  ["Добрый Фанта (ПЭТ, все виды)", "Добрый Фанта (ПЭТ)"],
];

export async function POST() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
  const valid = secret ? await verifySessionToken(token, secret) : false;

  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const renamed: string[] = [];
  for (const [oldName, newName] of renames) {
    const existing = await prisma.product.findUnique({ where: { name: oldName } });
    if (existing) {
      await prisma.product.update({ where: { name: oldName }, data: { name: newName } });
      renamed.push(`${oldName} -> ${newName}`);
    }
  }

  return NextResponse.json({ renamed });
}
