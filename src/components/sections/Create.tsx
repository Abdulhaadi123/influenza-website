"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterLayout from "@/components/ChapterLayout";
import { FEATURES_TO_MATCH, LOOKS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const PROMPT =
  "Fashion creator in her twenties, long dark wavy hair, black suit with glowing violet lapels, neon studio light";
const PICKED = new Set(["Face & identity", "Hair", "Eyes"]);

/**
 * Chapter 2 — Create Influencer, played by the scroll: the description types
 * itself, the app generates, and the influencer is revealed. Then the other
 * way in: a reference photo and the features to keep from it. An illustration
 * of the app's create screen; nothing here is an input.
 */
export default function Create() {
  const root = useRef<HTMLElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ch-copy > *", {
        opacity: 0,
        y: 32,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%", toggleActions: "play none none reverse" },
      });

      const typing = { n: 0 };
      const progress = { v: 0 };
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .from(".cr-frame", { opacity: 0, y: 40, scale: 0.94, duration: 0.08 }, 0)
        .from(".cr-prompt", { opacity: 0, x: -30, duration: 0.06 }, 0.02)
        .to(
          typing,
          {
            n: PROMPT.length,
            duration: 0.3,
            ease: "none",
            onUpdate: () => {
              if (typed.current) typed.current.textContent = PROMPT.slice(0, Math.round(typing.n));
            },
          },
          0.06,
        )
        .to(
          progress,
          {
            v: 100,
            duration: 0.34,
            ease: "none",
            onUpdate: () => {
              if (pct.current) pct.current.textContent = `${Math.round(progress.v)}%`;
            },
          },
          0.14,
        )
        .fromTo(".cr-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.34, ease: "none" }, 0.14)
        .fromTo(
          ".cr-result",
          { clipPath: "circle(0% at 50% 32%)" },
          { clipPath: "circle(85% at 50% 32%)", duration: 0.16, ease: "power2.inOut" },
          0.46,
        )
        .fromTo(".cr-result", { scale: 1.18 }, { scale: 1, duration: 0.54, ease: "none" }, 0.46)
        .to(".cr-progress", { opacity: 0, y: 16, duration: 0.05 }, 0.5)
        .from(".cr-ref", { opacity: 0, x: 40, duration: 0.07 }, 0.62)
        .to(
          ".cr-chip.pick",
          { backgroundColor: "rgba(123,102,232,0.45)", borderColor: "rgba(246,166,254,0.8)", color: "#ffffff", stagger: 0.05, duration: 0.03 },
          0.7,
        )
        .to(".cr-chip.pick .tick", { opacity: 1, scale: 1, stagger: 0.05, duration: 0.03 }, 0.7);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ChapterLayout
      id="create"
      rootRef={root}
      name="Create Influencer"
      title="Start with a sentence or a photo."
      body="Describe your influencer, or upload a reference photo and choose which features to match."
      stage={
        <div className="relative mx-auto aspect-[3/4] h-full max-w-full">
          {/* the generated result */}
          <div className="cr-frame absolute inset-[9%_3%_5%_12%] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_60px_140px_-40px_rgb(196_95_248/0.6)]">
            <div className="shimmer absolute inset-0" />
            <img
              src={LOOKS[0].src}
              alt={LOOKS[0].alt}
              loading="lazy"
              className="cr-result absolute inset-0 h-full w-full object-cover object-top"
              style={{ clipPath: "circle(0% at 50% 32%)" }}
            />
            <div aria-hidden="true" className="cr-progress glass absolute inset-x-4 bottom-4 rounded-2xl px-4 py-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink">Generating</span>
                <span ref={pct} className="tabular-nums text-dim">
                  0%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="cr-bar h-full origin-left rounded-full bg-gradient-to-r from-pink via-orchid to-violet" />
              </div>
            </div>
          </div>

          {/* the description */}
          <div
            aria-hidden="true"
            className="cr-prompt glass absolute left-0 top-0 w-[78%] rounded-2xl p-4 md:left-[-10%] md:w-[min(380px,66%)] md:p-5"
          >
            <p className="text-xs text-faint">Describe your influencer</p>
            <p className="mt-1.5 min-h-[4.2em] text-[0.88rem] leading-snug text-ink md:text-[0.98rem]">
              <span ref={typed} />
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-pink" />
            </p>
          </div>

          {/* or a reference photo */}
          <div
            aria-hidden="true"
            className="cr-ref glass absolute bottom-0 right-0 w-[86%] rounded-2xl p-4 md:right-[-8%] md:w-[min(400px,74%)] md:p-5"
          >
            <div className="flex items-center gap-3">
              <img src={LOOKS[1].src} alt="" loading="lazy" className="h-14 w-11 rounded-lg object-cover object-top" />
              <div>
                <p className="text-sm text-ink">Reference photo</p>
                <p className="text-xs text-faint">Features to match</p>
              </div>
            </div>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {FEATURES_TO_MATCH.map((f) => (
                <li
                  key={f}
                  className={`cr-chip ${
                    PICKED.has(f) ? "pick" : ""
                  } inline-flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[0.72rem] text-dim`}
                >
                  {PICKED.has(f) && (
                    <svg viewBox="0 0 12 12" className="tick h-3 w-3 opacity-0" style={{ transform: "scale(0.5)" }} fill="none">
                      <path d="M2 6.5 5 9l5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
}
