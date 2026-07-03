import Link from "next/link";
import { adminLogout } from "@/app/actions/admin";

export default function AdminNav() {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
      <nav className="flex gap-4 text-sm font-medium">
        <Link href="/admin" className="hover:underline">
          Заказы
        </Link>
        <Link href="/admin/products" className="hover:underline">
          Товары
        </Link>
      </nav>
      <form action={adminLogout}>
        <button type="submit" className="text-sm text-black/50 hover:underline dark:text-white/50">
          Выйти
        </button>
      </form>
    </div>
  );
}
