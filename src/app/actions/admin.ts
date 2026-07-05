"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, createSessionToken } from "@/lib/adminAuth";
import { Category, OrderStatus } from "@/generated/prisma/client";
import { sendSms, orderStatusSmsText } from "@/lib/sms";

export type LoginState = { error?: string };

export async function adminLogin(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") || "");
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Неверный пароль" };
  }

  const token = await createSessionToken(secret);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const previous = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });
  const order = await prisma.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin");

  if (previous && previous.status !== status) {
    const text = orderStatusSmsText(status, order.id, order.isPickup);
    if (text) {
      after(() => sendSms(order.phone, text));
    }
  }
}

export async function toggleProductStock(productId: string, inStock: boolean) {
  await prisma.product.update({ where: { id: productId }, data: { inStock } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function updateProductPrices(
  productId: string,
  purchasePrice: number,
  sellPrice: number,
  imageUrl: string,
  caseSize: number,
  description: string,
) {
  await prisma.product.update({
    where: { id: productId },
    data: {
      purchasePrice,
      sellPrice,
      imageUrl: imageUrl.trim() || null,
      caseSize,
      description: description.trim() || null,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath(`/product/${productId}`);
}

export type CreateProductState = { error?: string };

export async function createProduct(
  _prevState: CreateProductState,
  formData: FormData,
): Promise<CreateProductState> {
  const name = String(formData.get("name") || "").trim();
  const category = String(formData.get("category") || "") as Category;
  const volumeMlRaw = String(formData.get("volumeMl") || "").trim();
  const caseSizeRaw = String(formData.get("caseSize") || "").trim();
  const purchasePrice = Number(formData.get("purchasePrice"));
  const sellPrice = Number(formData.get("sellPrice"));
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const caseSize = caseSizeRaw ? Number(caseSizeRaw) : 1;

  if (!name || !Object.values(Category).includes(category)) {
    return { error: "Заполните название и категорию" };
  }
  if (!Number.isFinite(purchasePrice) || !Number.isFinite(sellPrice) || purchasePrice < 0 || sellPrice < 0) {
    return { error: "Некорректные цены" };
  }
  if (!Number.isFinite(caseSize) || caseSize < 1) {
    return { error: "Некорректный размер упаковки" };
  }

  await prisma.product.create({
    data: {
      name,
      category,
      volumeMl: volumeMlRaw ? Number(volumeMlRaw) : null,
      caseSize,
      purchasePrice,
      sellPrice,
      imageUrl: imageUrl || null,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  return {};
}
