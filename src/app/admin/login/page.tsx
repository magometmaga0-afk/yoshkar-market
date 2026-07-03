"use client";

import { useActionState } from "react";
import { adminLogin, type LoginState } from "@/app/actions/admin";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, initialState);

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4">
      <h1 className="mb-6 text-xl font-bold">Вход в админку</h1>
      <form action={formAction} className="space-y-4">
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Пароль"
          className="w-full rounded-lg border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-black/30 dark:border-white/10"
        />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-black py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {isPending ? "Входим..." : "Войти"}
        </button>
      </form>
    </main>
  );
}
