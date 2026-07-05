"use client";

import { useState } from "react";

function extractNational(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

function formatPhone(national: string): string {
  let result = "+7 ";
  if (national.length > 0) result += `(${national.slice(0, 3)}`;
  if (national.length >= 3) result += ")";
  if (national.length > 3) result += ` ${national.slice(3, 6)}`;
  if (national.length > 6) result += `-${national.slice(6, 8)}`;
  if (national.length > 8) result += `-${national.slice(8, 10)}`;
  return result;
}

export default function PhoneInput() {
  const [national, setNational] = useState("");
  const [focused, setFocused] = useState(false);

  const displayValue = national.length > 0 || focused ? formatPhone(national) : "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputType = (e.nativeEvent as InputEvent).inputType;
    const isDelete = inputType === "deleteContentBackward" || inputType === "deleteContentForward";
    let next = extractNational(e.target.value);
    if (isDelete && next === national && next.length > 0) {
      // Backspace стёр не цифру, а автоматически подставленный символ
      // форматирования (скобку/тире) — цифр в строке не убавилось, и
      // formatPhone тут же нарисовал бы тот же символ обратно, из-за чего
      // поле застревало и казалось, что номер невозможно стереть.
      next = next.slice(0, -1);
    }
    setNational(next);
  }

  return (
    <input
      name="phone"
      type="tel"
      required
      autoComplete="tel"
      value={displayValue}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[15px] outline-none focus:border-brand"
      placeholder="+7 900 000-00-00"
    />
  );
}
