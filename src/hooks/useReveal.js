import { useEffect, useRef } from "react";

/**
 * Adds "is-visible" to the ref'd element the first time it scrolls
 * into view, triggering the .reveal / .reveal-panel CSS transitions.
 *
 * Hardened so content can never get stuck invisible:
 *   - if IntersectionObserver is unavailable, reveal immediately
 *   - if the element is already in view on mount, reveal right away
 *     (covers tall viewports and content above the fold on load)
 */
export default function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => node.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    // Already within the viewport when mounted? Reveal now.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      observer.disconnect();
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
