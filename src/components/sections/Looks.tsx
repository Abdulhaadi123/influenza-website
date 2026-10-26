"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LOOKS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * One influencer, four looks: the cards start as a stack and fan out in 3D as
 * the scroll plays. The app keeps a likeness through reference sheets
 * (character sheet, close-up, feature sheet) it hands the generator.
 */
export default function Looks() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mid = (LOOKS.length - 1) / 2;
      const gap = () => Math.min(window.innerWidth * (window.innerWidth < 768 ? 0.2 : 0.17), 300);
      gsap.set(".lk-card", { rotation: (i) => (i - mid) * 4, y: (i) => Math.abs(i - mid) * 10 });
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true } })
        .from(".lk-head", { opacity: 0, y: 40, duration: 0.15 }, 0)
        .from(".lk-body", { opacity: 0, y: 30, duration: 0.15 }, 0.05)
        .from(".lk-deck", { scale: 0.86, duration: 0.3 }, 0)
        .to(
          ".lk-card",
          {
            x: (i) => (i - mid) * gap(),
            rotationY: (i) => (mid - i) * 14,
            z: (i) => -Math.abs(i - mid) * 90,
            rotation: 0,
            y: 0,
            duration: 0.55,
            ease: "power2.inOut",
          },
          0.15,
        )
        .from(".lk-cap", { opacity: 0, y: 12, stagger: 0.04, duration: 0.1 }, 0.62)
        .to(".lk-deck", { rotationY: -6, duration: 0.3, ease: "none" }, 0.7);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="looks" aria-labelledby="looks-title" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-14">
        <div className="text-center">
          <h2
            id="looks-title"
            className="lk-head text-[clamp(2.3rem,10vw,4rem)] font-semibold leading-[0.95] tracking-[-0.05em] md:text-[clamp(3.4rem,6.2vw,7.4rem)]"
          >
            Same influencer.
            <br />
            Any look.
          </h2>
          <p className="lk-body mx-auto mt-4 max-w-[44ch] leading-relaxed text-dim md:mt-6 md:text-xl">
            Reference sheets keep your influencer recognisable from one outfit, scene and video to the next.
          </p>
        </div>
        <div className="lk-deck relative mt-8 h-[44svh] w-full max-w-[1400px] [perspective:1600px] [transform-style:preserve-3d] md:mt-12 md:h-[50svh]">
          {LOOKS.map((look, i) => (
            <figure
              key={look.src}
              className="lk-card absolute left-1/2 top-0 h-full -translate-x-1/2 [transform-style:preserve-3d]"
              style={{ zIndex: i === 1 || i === 2 ? 3 : 2 }}
            >
              <img
                src={look.src}
                alt={look.alt}
                loading="lazy"
                className="aspect-[3/4] h-[88%] w-auto rounded-[1.6rem] object-cover object-top shadow-[0_40px_90px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/15"
              />
              <figcaption className="lk-cap mt-3 hidden text-center text-sm text-dim md:block">{look.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
