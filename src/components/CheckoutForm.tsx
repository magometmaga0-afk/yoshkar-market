"use client";

import { useActionState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { createOrder, type OrderFormState } from "@/app/actions/orders";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import PhoneInput from "@/components/PhoneInput";
import Spinner from "@/components/Spinner";
import { PICKUP_ADDRESS, MIN_ORDER_AMOUNT, WORKING_HOURS, isWithinWorkingHours } from "@/lib/constants";
import { CATEGORY_TILE } from "@/lib/productCategory";
import { formatPrice } from "@/lib/formatPrice";

const initialState: OrderFormState = {};

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const syncImages = useCartStore((s) => s.syncImages);

  useEffect(() => {
    const ids = useCartStore.getState().items.map((i) => i.productId);
    if (ids.length === 0) return;
    fetch("/api/cart-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((data) => syncImages(data.images ?? {}))
      .catch(() => {
        // не критично — просто останутся старые (или отсутствующие) фото до следующего захода
      });
  }, [syncImages]);

  const hasAlcohol = items.some((i) => i.category === "BEER");
  const total = items.reduce((sum, i) => sum + i.quantity * i.sellPrice, 0);
  const belowMinimum = total < MIN_ORDER_AMOUNT;
  const closed = !isWithinWorkingHours();

  const actionItems = useMemo(
    () => items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    [items],
  );

  const boundAction = createOrder.bind(null, actionItems);
  const [state, formAction, isPending] = useActionState(boundAction, initialState);
  const submitDisabled = isPending || belowMinimum || closed;

  useEffect(() => {
    if (state.orderId) {
      clear();
      router.push(`/order/${state.orderId}`);
    }
  }, [state.orderId, clear, router]);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="mb-4 text-4xl">🛒</p>
        <p className="mb-4 text-foreground/60">Корзина пуста.</p>
        <Link href="/" className="font-medium text-brand-dark underline underline-offset-2">
          Вернуться к каталогу
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-28 lg:pb-0">
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-6">
        <div className="space-y-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col gap-3 border-b border-border p-3 last:border-b-0 sm:flex-row sm:items-center"
              >
                <Link href={`/product/${item.productId}`} className="flex min-w-0 flex-1 items-center gap-3">
                  <div
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border ${
                      item.imageUrl ? "bg-white" : `bg-gradient-to-br ${CATEGORY_TILE[item.category].gradient}`
                    }`}
                  >
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="absolute inset-0 h-full w-full object-contain p-1.5"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-2xl">
                        {CATEGORY_TILE[item.category].emoji}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="sm:truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-foreground/50">
                      {formatPrice(item.sellPrice)} ₽/шт {item.volumeMl ? `· ${item.volumeMl} мл` : ""}
                      {item.caseSize > 1 ? ` · уп. ${item.caseSize} шт` : ""}
                    </p>
                  </div>
                </Link>
                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                  <div className="flex shrink-0 items-center gap-2 rounded-full bg-background p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity - item.caseSize)}
                      aria-label={item.caseSize > 1 ? "Убавить упаковку" : "Убавить"}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-base font-semibold shadow-sm transition active:scale-90"
                    >
                      −
                    </button>
                    <span
                      key={item.quantity}
                      className="w-5 animate-bounce-once text-center text-sm font-semibold"
                    >
                      {item.quantity / item.caseSize}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.productId, item.quantity + item.caseSize)}
                      aria-label={item.caseSize > 1 ? "Добавить упаковку" : "Добавить"}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-base font-semibold shadow-sm transition active:scale-90"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    aria-label="Убрать"
                    className="shrink-0 text-foreground/30"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between bg-background/60 p-3.5 font-semibold">
              <span>Итого</span>
              <span>{formatPrice(total)} ₽</span>
            </div>
          </div>

          {closed && (
            <p className="rounded-2xl bg-red-50 p-3.5 text-sm text-red-700">
              🕒 Принимаем заказы с {WORKING_HOURS.start}:00 до {WORKING_HOURS.end}:00. Сейчас
              магазин не оформляет заказы — загляните в рабочее время.
            </p>
          )}

          {!closed && belowMinimum && (
            <p className="rounded-2xl bg-amber-50 p-3.5 text-sm text-amber-900">
              Минимальная сумма заказа {MIN_ORDER_AMOUNT} ₽. Добавьте ещё товаров на{" "}
              {formatPrice(MIN_ORDER_AMOUNT - total)} ₽.
            </p>
          )}

          <form id="checkout-form" action={formAction} className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground/50">Имя</label>
                <input
                  name="customerName"
                  required
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground/50">Телефон</label>
                <PhoneInput />
              </div>
              {hasAlcohol ? (
                <div className="rounded-xl bg-amber-50 p-3.5 text-sm text-amber-900">
                  <p className="font-medium">📍 Самовывоз</p>
                  <p className="mt-1">
                    В заказе есть пиво — доставка курьером недоступна по закону. Заберите заказ
                    сами: {PICKUP_ADDRESS}.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground/50">Город</label>
                    <input
                      value="Йошкар-Ола"
                      disabled
                      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] text-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-foreground/50">
                      Улица и дом
                    </label>
                    <AddressAutocomplete />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground/50">
                        Квартира/офис
                      </label>
                      <input
                        name="apartment"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground/50">Этаж</label>
                      <input
                        name="floor"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground/50">Подъезд</label>
                      <input
                        name="entrance"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-foreground/50">Домофон</label>
                      <input
                        name="intercom"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
                      />
                    </div> 
                  </div>
                </>
              )}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground/50">Комментарий</label>
                <textarea
                  name="comment"
                  rows={2}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
                  placeholder="Время доставки, другие пожелания..."
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <label className="mb-2 block text-xs font-medium text-foreground/50">Оплата</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium has-[:checked]:border-brand has-[:checked]:bg-brand/10 has-[:checked]:text-brand-dark">
                  <input type="radio" name="paymentMethod" value="CASH" defaultChecked className="hidden" />
                  💵 Наличными
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium has-[:checked]:border-brand has-[:checked]:bg-brand/10 has-[:checked]:text-brand-dark">
                  <input type="radio" name="paymentMethod" value="CARD" className="hidden" />
                  💳 Картой
                </label>
              </div>
            </div>

            {hasAlcohol && (
              <label className="flex items-start gap-2 rounded-2xl bg-amber-50 p-3.5 text-sm text-amber-900">
                <input type="checkbox" name="ageConfirmed" className="mt-0.5" />
                <span>Подтверждаю, что мне есть 18 лет — в заказе есть пиво.</span>
              </label>
            )}

            {state.error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
            )}
          </form>
        </div>

        <div className="hidden lg:sticky lg:top-20 lg:block">
          <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Итого</span>
              <span>{formatPrice(total)} ₽</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              disabled={submitDisabled}
              className="block w-full rounded-2xl bg-brand py-3.5 text-center font-semibold text-white shadow-sm transition duration-200 hover:brightness-105 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Оформляем...
                </span>
              ) : (
                "Оформить заказ"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pt-3 backdrop-blur-md lg:hidden">
        <button
          type="submit"
          form="checkout-form"
          disabled={submitDisabled}
          className="mx-auto block w-full max-w-lg rounded-2xl bg-brand py-3.5 text-center font-semibold text-white shadow-sm transition duration-200 hover:brightness-105 active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100"
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Spinner /> Оформляем...
            </span>
          ) : (
            `Оформить заказ на ${formatPrice(total)} ₽`
          )}
        </button>
      </div>
    </div>
  );
}
