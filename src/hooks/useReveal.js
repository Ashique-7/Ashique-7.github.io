import { useEffect, useRef } from "react";

/**
 * Adds "is-visible" to the ref'd element once it scrolls into view,
 * triggering the .reveal / .reveal-panel CSS transitions.
 *
 * Uses a plain scroll/resize listener (throttled via rAF) rather than
 * IntersectionObserver. IO proved unreliable here — it intermittently
 * failed to fire for some elements, leaving content stuck invisible.
 * A direct getBoundingClientRect() check on scroll is bulletproof and
 * reveals the element the moment its top edge nears the viewport.
 */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let done = false;

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const check = () => {
      if (done) return;
      const rect = node.getBoundingClientRect();
      // Reveal once the element's top is within ~92% of the viewport
      // height (and it isn't fully scrolled past above).
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        done = true;
        node.classList.add("is-visible");
        cleanup();
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check(); // reveal anything already in view on mount

    return cleanup;
  }, []);

  return ref;
}
