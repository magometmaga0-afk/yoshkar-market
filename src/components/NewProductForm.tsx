"use client";

import { useActionState, useRef, useEffect } from "react";
import { createProduct, type CreateProductState } from "@/app/actions/admin";

const initialState: CreateProductState = {};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-brand";
const labelClass = "mb-1 block text-xs text-foreground/50";

export default function NewProductForm() {
  const [state, formAction, isPending] = useActionState(createProduct, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !isPending && !state.error) {
      formRef.current?.reset();
    }
    wasPending.current = isPending;
  }, [isPending, state.error]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mb-4 space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
    >
      <label className="block">
        <span className={labelClass}>Название</span>
        <input name="name" required className={inputClass} />
      </label>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <label className="block">
          <span className={labelClass}>Категория</span>
          <select name="category" className={inputClass}>
            {/* Пиво временно скрыто из админки (юридические причины) — не удалено, просто закомментировано.
            <option value="BEER">Пиво</option> */}
            <option value="ENERGY">Энергетик</option>
            <option value="OTHER">Напиток</option>
            <option value="SNACKS">Снек</option>
            <option value="COFFEE_TEA">Чай/кофе</option>
            <option value="CANNED">Консервы</option>       
            <option value="GROCERY">Бакалея</option>
            <option value="PET_SUPPLIES">Зоотовары</option>
            <option value="PRODUCE">Фрукты и овощи</option>
          </select>
        </label>
        <label className="block">
          <span className={labelClass}>Объём, мл</span>
          <input name="volumeMl" type="number" className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Упаковка, шт</span>
          <input name="caseSize" type="number" defaultValue={1} className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Закупка, ₽</span>
          <input name="purchasePrice" type="number" required className={inputClass} />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <label className="block">
          <span className={labelClass}>Продажа, ₽</span>
          <input name="sellPrice" type="number" required className={inputClass} />
        </label>
        <label className="block">
          <span className={labelClass}>Ссылка на фото</span>
          <input name="imageUrl" type="url" placeholder="https://..." className={inputClass} />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50 sm:w-auto sm:px-6"
      >
        {isPending ? "Добавляем..." : "Добавить товар"}
      </button>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
