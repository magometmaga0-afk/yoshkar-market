"use client";

import { useActionState } from "react";
import { adminLogin, type LoginState } from "@/app/actions/admin";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, initialState);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-1 flex-col justify-center px-6">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-3 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-mark.png" alt="Йошкар Маркет" className="h-full w-full object-cover" />
        </span>
        <h1 className="text-lg font-bold text-foreground">Вход в админку</h1>
        <p className="text-sm text-foreground/50">Йошкар Маркет</p>
      </div>
      <form action={formAction} className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Пароль"
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-[15px] outline-none focus:border-brand"
        />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-brand py-2.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? "Входим..." : "Войти"}
        </button>
      </form>
    </main>
  );
}
