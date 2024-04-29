"use client";

import { MutableRefObject, useEffect } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export function useFilters(): [
  ReadonlyURLSearchParams,
  (items: Record<string, any>) => void
] {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  return [
    query,
    (items: Record<string, any>) => {
      const newFilters = Object.fromEntries(
        Object.entries({ ...query, ...items }).filter(
          ([, value]) => value != null && value !== ''
        )
      );

      const newUrl = `${pathname}?${new URLSearchParams(newFilters).toString()}`;
      console.log({ newUrl });
      router.push(newUrl,
        { scroll: false }
      );
    },
  ];
}

export function useOnClickOutside(
  ref: MutableRefObject<Element | null>,
  handler: (event: TouchEvent | MouseEvent | KeyboardEvent) => void
): void {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    const escListener = (event: KeyboardEvent) =>
      ref.current && event.key === "Escape" && handler(event);

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", escListener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", escListener);
    };
  }, [ref, handler]);
}


export function triggerFocus(element: HTMLElement): void {
  const eventType = "onfocusin" in element ? "focusin" : "focus";
  const bubbles = "onfocusin" in element;

  if ("Event" in window) {
    const event = new Event(eventType, { bubbles: bubbles, cancelable: true });
    element.focus();
    element.dispatchEvent(event);
  }

}