"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackMetaPageView } from "@/lib/meta-pixel";

export function MetaPixelPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPageView();
  }, [pathname]);

  return null;
}
