import type { ReactNode, RefObject } from "react";

/**
 * A pinned chapter: the section is several screens tall and its inner stage
 * sticks to the viewport while the scroll plays the timeline.
 * Phones: stage on top, words underneath. Wider screens: side by side,
 * alternating sides from chapter to chapter (`flip`).
 */
export default function ChapterLayout({
  id,
  rootRef,
  name,
  title,
  body,
  stage,
  flip = false,
}: {
  id: string;
  rootRef: RefObject<HTMLElement | null>;
  /** The feature's name as the app shows it. */
  name: string;
  title: string;
  body: string;
  stage: ReactNode;
  flip?: boolean;
}) {
  return (
    <section ref={rootRef} id={id} aria-labelledby={`${id}-title`} className="relative h-[320vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          className={`mx-auto grid h-full max-w-[1600px] grid-cols-[minmax(0,1fr)] grid-rows-[minmax(0,1fr)_auto] gap-4 px-5 pb-7 pt-[4.75rem] md:grid-rows-1 md:items-center md:gap-16 md:px-16 md:py-0 ${
            flip ? "md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]" : "md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
          }`}
        >
          <div className={`ch-copy relative z-10 order-2 ${flip ? "md:order-2" : "md:order-1"}`}>
            <p className="ch-name mb-2 text-sm font-medium text-lavender md:mb-5 md:text-base">{name}</p>
            <h2
              id={`${id}-title`}
              className="ch-head text-[clamp(2.1rem,9vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] md:text-[clamp(3.2rem,5.4vw,6.6rem)]"
            >
              {title}
            </h2>
            <p className="ch-body mt-3 max-w-[36ch] leading-relaxed text-dim md:mt-7 md:text-xl">{body}</p>
          </div>
          <div className={`ch-stage relative order-1 min-h-0 h-full md:h-[86svh] ${flip ? "md:order-1" : "md:order-2"}`}>
            {stage}
          </div>
        </div>
      </div>
    </section>
  );
}
