import { useEffect, useRef } from "react";

/**
 * Adds "is-visible" to the ref'd element once it scrolls into view,
 * triggering the .reveal CSS transition.
 *
 * Deliberately does NOT use IntersectionObserver — it proved unreliable
 * here, intermittently failing to fire and leaving content invisible.
 * Instead this checks getBoundingClientRect() on three independent
 * triggers so a reveal can never be missed:
 *   1. immediately on mount (content already in view)
 *   2. on scroll / resize (throttled with rAF)
 *   3. a low-frequency interval poll as a safety net
 * All three call the same check; the first one to see the element in
 * view reveals it and tears everything down.
 */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let done = false;

    const check = () => {
      if (done) return;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        done = true;
        node.classList.add("is-visible");
        teardown();
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

    const interval = window.setInterval(check, 300);

    const teardown = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(interval);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check(); // reveal anything already in view on mount

    return teardown;
  }, []);

  return ref;
}
