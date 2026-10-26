export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Redraw a scrubbed canvas at its last position when the window changes size. */
export function redrawOnResize(redraw: () => void) {
  let frame = 0;
  const onResize = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(redraw);
  };
  window.addEventListener("resize", onResize);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
  };
}
