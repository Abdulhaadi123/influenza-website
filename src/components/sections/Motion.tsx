"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChapterLayout from "@/components/ChapterLayout";
import Phone from "@/components/Phone";
import Skeleton, { JOINTS } from "@/components/Skeleton";
import { LOOKS } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/** One dance, as rotation keyframes per joint (degrees, clockwise). */
const DANCE: Record<string, number[]> = {
  "sk-body": [0, -7, 5, -9, 6, 0],
  "sk-head": [0, 10, -8, 12, -6, 0],
  "sk-armL": [0, 120, 35, 150, 60, 0],
  "sk-foreL": [0, 50, -40, 70, -20, 0],
  "sk-armR": [0, -40, -130, -60, -155, 0],
  "sk-foreR": [0, 30, -60, 20, -70, 0],
  "sk-legL": [0, 14, -4, 18, 2, 0],
  "sk-shinL": [0, -28, 0, -34, -6, 0],
  "sk-legR": [0, -6, -16, 2, -18, 0],
  "sk-shinR": [0, 4, 30, 0, 36, 0],
};

/** Her pose in the neon photo (look-neon.webp, 1000 × 1462), joint by joint. */
const POSE = {
  head: [470, 222],
  neck: [488, 312],
  shL: [380, 362],
  shR: [618, 362],
  elL: [322, 612],
  haL: [300, 755],
  elR: [668, 552],
  haR: [582, 645],
  pelvis: [488, 690],
  hipL: [405, 702],
  hipR: [570, 702],
  knL: [402, 1022],
  ftL: [430, 1372],
  knR: [600, 1052],
  ftR: [652, 1415],
} as const;
type Joint = keyof typeof POSE;
const LIMBS: Joint[][] = [
  ["shL", "neck", "shR"],
  ["neck", "pelvis"],
  ["shL", "elL", "haL"],
  ["shR", "elR", "haR"],
  ["hipL", "pelvis", "hipR"],
  ["hipL", "knL", "ftL"],
  ["hipR", "knR", "ftR"],
];
const d = (joints: Joint[]) => joints.map((j, i) => `${i ? "L" : "M"}${POSE[j][0]} ${POSE[j][1]}`).join(" ");

/**
 * Chapter 4 — Motion Copy. The video you pick (the dancing figure) drives the
 * influencer: her pose is tracked on the photo, and echoes of her follow the
 * dance. Beside it, the app's real Motion screen.
 */
export default function Motion() {
  const root = useRef<HTMLElement>(null);

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
      for (const [joint, origin] of Object.entries(JOINTS)) gsap.set(`.mo-driver .${joint}`, { svgOrigin: origin });
      gsap.set(".mo-phone", { rotationY: -20, rotationZ: 3 });

      const tl = gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .from(".mo-frame", { opacity: 0, y: 40, scale: 0.94, duration: 0.08 }, 0)
        .from(".mo-driver", { opacity: 0, x: -30, scale: 0.9, duration: 0.08 }, 0.03)
        .fromTo(".mo-limb", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.2, stagger: 0.02, ease: "power1.inOut" }, 0.1)
        .from(".mo-joint", { scale: 0, transformOrigin: "50% 50%", duration: 0.05, stagger: 0.01 }, 0.18)
        .from(".mo-status", { opacity: 0, y: 12, duration: 0.05 }, 0.3)
        .fromTo(".mo-echo", { opacity: 0 }, { opacity: (i) => (i ? 0.18 : 0.3), duration: 0.06 }, 0.32)
        .from(".mo-phone", { opacity: 0, x: 60, duration: 0.1 }, 0.4);

      for (const [joint, angles] of Object.entries(DANCE)) {
        tl.to(`.mo-driver .${joint}`, { keyframes: { rotation: angles, ease: "sine.inOut" }, duration: 0.8, ease: "none" }, 0.1);
      }
      tl.to(".mo-echo-0", { keyframes: { x: [0, -22, 16, -26, 12, 0], ease: "sine.inOut" }, duration: 0.6, ease: "none" }, 0.32)
        .to(".mo-echo-1", { keyframes: { x: [0, 30, -22, 34, -16, 0], ease: "sine.inOut" }, duration: 0.6, ease: "none" }, 0.34);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ChapterLayout
      id="motion"
      rootRef={root}
      name="Motion Copy"
      title="Any move, copied."
      body="Pick a video of someone moving. Your influencer performs the same movements and expressions."
      stage={
        <div className="relative mx-auto aspect-[3/4] h-full max-w-full [perspective:1400px]">
          {/* the influencer, tracked */}
          <div className="mo-frame absolute bottom-0 right-[4%] top-[6%] aspect-[1000/1462] md:right-[16%]">
            {[0, 1].map((i) => (
              <img
                key={i}
                src={LOOKS[0].src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className={`mo-echo mo-echo-${i} absolute inset-0 h-full w-full rounded-[2rem] object-cover object-top opacity-0 mix-blend-screen blur-[2px]`}
              />
            ))}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-[0_60px_140px_-40px_rgb(196_95_248/0.6)]">
              <img src={LOOKS[0].src} alt={LOOKS[0].alt} loading="lazy" className="h-full w-full object-cover object-top" />
              <svg
                viewBox="0 0 1000 1462"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full drop-shadow-[0_0_10px_rgb(246_166_254/0.95)]"
                fill="none"
                stroke="#f6a6fe"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {LIMBS.map((limb) => (
                  <path key={limb.join("-")} className="mo-limb" d={d(limb)} pathLength={1} strokeDasharray="1" />
                ))}
                <circle className="mo-limb" cx={POSE.head[0]} cy={POSE.head[1]} r="52" pathLength={1} strokeDasharray="1" />
                {(Object.keys(POSE) as Joint[])
                  .filter((j) => j !== "head")
                  .map((j) => (
                    <circle key={j} className="mo-joint" cx={POSE[j][0]} cy={POSE[j][1]} r="12" fill="#ffffff" stroke="none" />
                  ))}
              </svg>
              <p className="mo-status glass absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-pink" />
                Copying movement
              </p>
            </div>
          </div>

          {/* the video you pick */}
          <div className="mo-driver glass absolute left-0 top-0 aspect-[3/4] w-[36%] overflow-hidden rounded-2xl md:left-[-6%] md:w-[34%]">
            <Skeleton width={4} className="absolute inset-x-0 bottom-[8%] mx-auto h-[78%] w-auto text-lavender" />
            <p className="absolute bottom-2 left-2 rounded-full bg-night/70 px-2.5 py-1 text-[0.7rem] text-ink">Your video</p>
          </div>

          {/* the app's Motion screen */}
          <div className="mo-phone absolute bottom-[-4%] right-[-10%] hidden w-[30%] md:block">
            <Phone src="img/app-motion.webp" alt="The app's Motion screen, with Kling 3.0 Motion Control and a Generate motion copy button" />
          </div>
        </div>
      }
    />
  );
}
