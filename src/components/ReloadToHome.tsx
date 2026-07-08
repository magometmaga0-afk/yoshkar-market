"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReloadToHome() {
  const router = useRouter();

  useEffect(() => {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (nav?.type === "reload") {
      router.replace("/");
    }
  }, [router]);

  return null;
}
