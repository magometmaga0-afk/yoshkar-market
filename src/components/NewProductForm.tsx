"use client";

import { useActionState, useRef, useEffect } from "react";
import { createProduct, type CreateProductState } from "@/app/actions/admin";

const initialState: CreateProductState = {};

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
      className="mb-4 flex flex-wrap items-end gap-2 rounded-xl border border-black/10 p-4 dark:border-white/10"
    >
      <div>
        <label className="mb-1 block text-xs text-black/50 dark:text-white/50">Название</label>
        <input
          name="name"
          required
          className="w-48 rounded border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-black/50 dark:text-white/50">Категория</label>
        <select
          name="category"
          className="rounded border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10"
        >
          <option value="BEER">Пиво</option>
          <option value="ENERGY">Энергетик</option>
          <option value="OTHER">Напиток</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs text-black/50 dark:text-white/50">Объём, мл</label>
        <input
          name="volumeMl"
          type="number"
          className="w-20 rounded border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-black/50 dark:text-white/50">Закупка, ₽</label>
        <input
          name="purchasePrice"
          type="number"
          required
          className="w-20 rounded border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-black/50 dark:text-white/50">Продажа, ₽</label>
        <input
          name="sellPrice"
          type="number"
          required
          className="w-20 rounded border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-black/50 dark:text-white/50">Ссылка на фото</label>
        <input
          name="imageUrl"
          type="url"
          placeholder="https://..."
          className="w-48 rounded border border-black/10 bg-transparent px-2 py-1 text-sm dark:border-white/10"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        Добавить
      </button>
      {state.error && <p className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
