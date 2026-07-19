import { useEffect, useRef } from "react";
import "./ScrollProgress.css";

/**
 * A slim bar pinned to the top of the viewport that fills left-to-right
 * as the page scrolls. Updates a CSS transform directly (throttled with
 * rAF) so there are no React re-renders on scroll.
 */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}
