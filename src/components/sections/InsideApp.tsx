"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Phone from "@/components/Phone";
import { APP_SCREENS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * The real app, screen by screen. Scrolling down slides the phones sideways;
 * each one turns to face you as it passes the middle of the screen.
 */
export default function InsideApp() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const phones = gsap.utils.toArray<HTMLElement>(".ia-phone");
      const turn = () => {
        const mid = window.innerWidth / 2;
        phones.forEach((el) => {
          const r = el.getBoundingClientRect();
          const off = (r.left + r.width / 2 - mid) / mid; // -1 … 1 across the screen
          gsap.set(el, {
            rotationY: gsap.utils.clamp(-38, 38, -off * 34),
            scale: 1 - Math.min(Math.abs(off), 1) * 0.1,
            opacity: 1 - Math.min(Math.abs(off), 1.2) * 0.18,
          });
        });
      };
      gsap.from(".ia-head > *", {
        opacity: 0,
        y: 32,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%", toggleActions: "play none none reverse" },
      });
      gsap.to(track.current, {
        x: () => -((track.current?.scrollWidth ?? 0) - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: turn,
          onRefresh: turn,
        },
      });
      turn();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="app" aria-labelledby="app-title" className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        <div className="ia-head mx-auto w-full max-w-[1600px] px-5 md:px-16">
          <p className="mb-2 text-sm font-medium text-lavender md:mb-4 md:text-base">Inside the app</p>
          <h2
            id="app-title"
            className="text-[clamp(2.1rem,9vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.045em] md:text-[clamp(3.2rem,5.4vw,6.6rem)]"
          >
            Everything in your pocket.
          </h2>
        </div>
        <div
          ref={track}
          className="mt-8 flex w-max items-start gap-8 px-[19vw] [perspective:1400px] md:mt-12 md:gap-16 md:px-[40vw]"
        >
          {APP_SCREENS.map((s) => (
            <figure key={s.src} className="w-[min(62vw,30svh)] shrink-0 md:w-[min(18vw,27svh)]">
              <div className="ia-phone">
                <Phone src={s.src} alt={`The app's ${s.title} screen`} />
              </div>
              <figcaption className="mt-5 md:mt-7">
                <p className="text-lg font-medium tracking-[-0.02em] md:text-xl">{s.title}</p>
                <p className="mt-1 max-w-[30ch] text-sm leading-relaxed text-dim md:text-base">{s.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
