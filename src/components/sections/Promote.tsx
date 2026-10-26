"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterLayout from "@/components/ChapterLayout";
import { LOOKS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const SCRIPT = [
  "Okay, this is the bag I take everywhere.",
  "Phone, keys, a charger. It all fits.",
  "Link's in my bio if you want one.",
];
const SECONDS = 5; // the app's default clip length
const BARS = 28;

/**
 * Chapter 3 — Product Videos. A 9:16 clip "plays" as the scroll moves: the
 * progress bar and clock advance, the script runs as captions, and the product
 * she holds is picked out. Product and script cards show what the app asks for.
 */
export default function Promote() {
  const root = useRef<HTMLElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

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
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        toggleClass: { targets: ".wave", className: "on" },
      });

      const play = { t: 0 };
      const tl = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .from(".pr-video", { opacity: 0, y: 50, rotationY: -12, duration: 0.08 }, 0)
        .from(".pr-product", { opacity: 0, x: -40, duration: 0.07 }, 0.04)
        .from(".pr-script", { opacity: 0, x: 40, duration: 0.07 }, 0.1)
        .to(".pr-play", { opacity: 0, scale: 1.4, duration: 0.05 }, 0.12)
        .fromTo(".pr-kb", { scale: 1.2, yPercent: 4 }, { scale: 1, yPercent: 0, duration: 0.8, ease: "none" }, 0.12)
        .fromTo(".pr-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "none" }, 0.12)
        .to(
          play,
          {
            t: SECONDS,
            duration: 0.8,
            ease: "none",
            onUpdate: () => {
              if (clock.current) clock.current.textContent = `0:0${Math.min(SECONDS, Math.floor(play.t))}`;
            },
          },
          0.12,
        )
        .fromTo(".pr-ring", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.08, ease: "back.out(2)" }, 0.3)
        .to(".pr-ring", { opacity: 0, duration: 0.06 }, 0.62);
      SCRIPT.forEach((_, i) => {
        const at = 0.14 + i * 0.26;
        tl.fromTo(`.pr-cap-${i}`, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.04 }, at)
          .to(`.pr-cap-${i}`, { opacity: 0, y: -10, duration: 0.04 }, at + 0.22)
          .to(`.pr-line-${i}`, { opacity: 1, color: "#f4f2ff", duration: 0.04 }, at);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ChapterLayout
      id="promote"
      rootRef={root}
      flip
      name="Product Videos"
      title="Your product, presented."
      body="Add a product photo and a script. Your influencer presents it on video, in a voice you choose."
      stage={
        <div className="relative mx-auto flex h-full max-w-full items-center justify-center [perspective:1400px]">
          {/* the clip */}
          <div className="pr-video relative aspect-[9/16] h-[92%] max-w-[78%] overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_60px_140px_-40px_rgb(196_95_248/0.65)]">
            <div className="pr-kb absolute inset-0">
              <img
                src={LOOKS[1].src}
                alt="The influencer presenting a white handbag to the camera"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <span
                aria-hidden="true"
                className="pr-ring absolute left-[27%] top-[63.5%] h-[19%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-pink shadow-[0_0_30px_rgb(246_166_254/0.9),inset_0_0_24px_rgb(246_166_254/0.5)]"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-night/30" />
            <span
              aria-hidden="true"
              className="pr-play absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <div aria-hidden="true" className="absolute inset-x-4 bottom-16 text-center">
              {SCRIPT.map((line, i) => (
                <p
                  key={line}
                  className={`pr-cap-${i} absolute inset-x-0 bottom-0 text-[0.95rem] font-medium leading-snug opacity-0 [text-shadow:0_2px_12px_rgb(0_0_0/0.8)] md:text-lg`}
                >
                  {line}
                </p>
              ))}
            </div>
            <div aria-hidden="true" className="absolute inset-x-4 bottom-4 flex items-center gap-3 text-xs">
              <span ref={clock} className="tabular-nums text-ink">
                0:00
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                <span className="pr-bar block h-full origin-left rounded-full bg-gradient-to-r from-pink to-violet" />
              </span>
              <span className="tabular-nums text-dim">0:0{SECONDS}</span>
            </div>
          </div>

          {/* what you give the app */}
          <div
            aria-hidden="true"
            className="pr-product glass absolute left-0 top-[6%] flex items-center gap-3 rounded-2xl p-2.5 pr-4 md:left-[-4%] md:top-[12%] md:p-3 md:pr-5"
          >
            <img src="img/product-bag.webp" alt="" className="h-14 w-10 rounded-lg object-cover md:h-16 md:w-12" />
            <div>
              <p className="text-sm text-ink">Product photo</p>
              <p className="text-xs text-faint">Handbag, 1 of 3</p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pr-script glass absolute right-[-6%] top-[36%] hidden w-[min(290px,46%)] rounded-2xl p-5 md:block"
          >
            <p className="text-xs text-faint">Script</p>
            <div className="mt-1.5 space-y-1 text-[0.8rem] leading-snug md:text-[0.92rem]">
              {SCRIPT.map((line, i) => (
                <p key={line} className={`pr-line-${i} text-faint opacity-50`}>
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3 border-t border-white/10 pt-3">
              <p className="text-xs text-faint">Voice</p>
              <div className="wave flex h-6 flex-1 items-center gap-[3px]">
                {Array.from({ length: BARS }, (_, i) => (
                  <span
                    key={i}
                    className="block h-full w-[3px] rounded-full bg-gradient-to-b from-pink to-violet"
                    style={{ animationDelay: `${(i * 137) % 900}ms`, animationDuration: `${700 + ((i * 89) % 500)}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
