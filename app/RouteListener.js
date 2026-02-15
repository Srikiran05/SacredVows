"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteListener() {
  const pathname = usePathname();

  useEffect(() => {
    // If not on home page, enable full blur mode (hide sharp background)
    if (pathname !== "/") {
      document.body.classList.add("blur-background-active");
    } else {
      document.body.classList.remove("blur-background-active");
    }
  }, [pathname]);

  return null;
}
