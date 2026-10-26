"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import { INFLUENCER } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Chapter 1: the influencer, full height, with the brand's orbs around her.
 * Layers sit at different depths ([data-depth]) and drift against the pointer;
 * scrolling pushes them apart before the next chapter.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from(".hero-line", { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.09, delay: 0.25 });
        gsap.from(".hero-after", { opacity: 0, y: 16, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.75 });
        gsap.from(".hero-photo", { opacity: 0, scale: 1.12, filter: "blur(18px)", duration: 1.9, ease: "expo.out" });
        gsap.from(".hero-word", { opacity: 0, yPercent: 30, duration: 1.8, ease: "expo.out", delay: 0.2 });
        gsap.from(".hero-orb", { opacity: 0, scale: 0.3, duration: 1.6, ease: "expo.out", stagger: 0.14, delay: 0.5 });
        gsap.from(".hero-chip", { opacity: 0, y: 26, scale: 0.9, duration: 1, ease: "back.out(1.6)", stagger: 0.16, delay: 1.1 });
      }
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .to(".hero-photo-wrap", { scale: 1.1, yPercent: -5, ease: "none", duration: 1 }, 0)
        .to(".hero-word", { xPercent: -16, ease: "none", duration: 1 }, 0)
        .to(".hero-orb-a", { y: -220, ease: "none", duration: 1 }, 0)
        .to(".hero-orb-b", { y: -120, ease: "none", duration: 1 }, 0)
        .to(".hero-orb-c", { y: -320, ease: "none", duration: 1 }, 0)
        .to(".hero-chips", { y: -90, opacity: 0, ease: "power1.in", duration: 0.5 }, 0.25)
        .to(".hero-copy", { opacity: 0, y: -50, ease: "power1.in", duration: 0.4 }, 0.55);
    }, root);

    // Depth on pointer move (desktop only).
    let detach = () => {};
    if (!reduce && window.matchMedia("(hover: hover)").matches && root.current) {
      const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", root.current).map((el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
      }));
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.depth);
          l.y(ny * l.depth);
        });
      };
      window.addEventListener("pointermove", move);
      detach = () => window.removeEventListener("pointermove", move);
    }
    return () => {
      detach();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative h-[200vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the name, enormous and outlined, behind everything */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[38svh] select-none md:top-auto md:bottom-[-3vw]">
          <p className="hero-word whitespace-nowrap pl-[2vw] text-[30vw] font-semibold leading-none tracking-[-0.06em] text-outline md:text-[22vw]">
            influenza
          </p>
        </div>

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[8svh] h-[90vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(196_95_248/0.42),rgb(39_21_203/0.18)_55%,transparent)] blur-3xl md:left-auto md:right-[2vw] md:top-[4svh] md:translate-x-0"
        />

        {/* the influencer */}
        <div
          data-depth="14"
          className="absolute inset-x-0 top-0 mx-auto h-[78svh] w-full max-w-[600px] md:inset-x-auto md:right-[7vw] md:top-[-3svh] md:h-[112svh] md:w-auto md:max-w-none"
        >
          <div className="hero-photo-wrap h-full">
            <img
              src="img/hero-neon.webp"
              alt={`${INFLUENCER}, an AI influencer, in a black suit with glowing lapels in a neon-lit studio`}
              fetchPriority="high"
              className="hero-photo mask-portrait h-full w-full object-cover object-top md:w-auto"
            />
          </div>
        </div>

        {/* the app's 3D orbs */}
        <div data-depth="-50" className="absolute left-[4vw] top-[9svh] md:left-[42vw] md:top-[7svh]">
          <div className="hero-orb hero-orb-c">
            <img src="img/orb-blob.webp" alt="" className="float w-[22vw] max-w-[200px] md:w-[11vw]" />
          </div>
        </div>
        <div data-depth="70" className="absolute right-[5vw] top-[50svh] md:right-[3vw] md:top-[58svh]">
          <div className="hero-orb hero-orb-b">
            <img src="img/orb-iris.webp" alt="" className="float w-[20vw] max-w-[220px] md:w-[10vw]" style={{ animationDelay: "-2.5s" }} />
          </div>
        </div>
        <div data-depth="110" className="absolute right-[38vw] top-[22svh] hidden md:block">
          <div className="hero-orb hero-orb-a">
            <img src="img/orb-sphere.webp" alt="" className="float w-[4.5vw]" style={{ animationDelay: "-4s" }} />
          </div>
        </div>

        {/* what the app tells you, as it happens */}
        <div className="hero-chips pointer-events-none absolute inset-0" aria-hidden="true">
          <div data-depth="40" className="absolute right-[4vw] top-[17svh] md:right-[30vw] md:top-[30svh]">
            <div className="hero-chip glass flex items-center gap-3 rounded-2xl py-2 pl-2 pr-4 md:py-2.5 md:pl-2.5 md:pr-5">
              <img src="img/look-neon.webp" alt="" className="h-9 w-9 rounded-xl object-cover object-top md:h-11 md:w-11" />
              <div>
                <p className="text-[0.8rem] font-medium md:text-sm">{INFLUENCER}</p>
                <p className="text-[0.7rem] text-faint md:text-xs">AI influencer</p>
              </div>
            </div>
          </div>
          <div data-depth="60" className="absolute right-[3vw] top-[22svh] hidden md:block">
            <div className="hero-chip glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-orchid to-cobalt">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium">Product video</p>
                <p className="text-xs text-faint">Ready</p>
              </div>
            </div>
          </div>
          <div data-depth="30" className="absolute bottom-[16svh] right-[27vw] hidden md:block">
            <div className="hero-chip glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#f6a6fe" strokeWidth="2" strokeLinecap="round">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium">Motion copy</p>
                <p className="text-xs text-faint">Saved to the gallery</p>
              </div>
            </div>
          </div>
        </div>

        {/* words */}
        <div className="hero-copy absolute inset-x-0 bottom-0 z-10 md:inset-y-0 md:flex md:items-center">
          <div className="mx-auto w-full max-w-[1600px] bg-gradient-to-t from-night from-40% via-night/80 to-transparent px-5 pb-8 pt-28 md:bg-none md:px-16 md:pb-0 md:pt-0">
            <h1
              id="hero-title"
              className="text-[clamp(2.4rem,10.4vw,4.4rem)] font-semibold leading-[0.92] tracking-[-0.05em] [text-shadow:0_4px_40px_rgb(7_6_28/0.55)] md:text-[clamp(4.4rem,7.6vw,9.8rem)]"
            >
              <span className="block overflow-hidden whitespace-nowrap pb-[0.06em]">
                <span className="hero-line block">AI influencers,</span>
              </span>
              <span className="block overflow-hidden whitespace-nowrap pb-[0.06em]">
                <span className="hero-line block">made by you.</span>
              </span>
            </h1>
            <p className="hero-after mt-4 max-w-[34ch] text-base leading-relaxed text-dim md:mt-8 md:text-xl">
              Create an influencer, star them in product videos and bring them to life with motion.
            </p>
            <div className="hero-after mt-6 flex flex-wrap items-center gap-3 md:mt-10">
              <a href="#get" className="btn-primary">
                Get early access
              </a>
              <a href="#create" className="btn-quiet">
                See how it works
              </a>
            </div>
            <p className="hero-after mt-4 text-sm text-faint md:mt-6">Coming soon to Android</p>
          </div>
        </div>
      </div>
    </section>
  );
}
