"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Brand-page reveals: every [data-reveal] gets .in the first time it scrolls into view. */
export default function RevealOnScroll() {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const triggers = els.map((el) =>
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => el.classList.add("in") }),
    );
    // A reload mid-page, or a jump to an anchor, can land past a trigger's start.
    const catchUp = () =>
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("in");
      });
    catchUp();
    window.addEventListener("hashchange", catchUp);

    // Lazy images change the page's height as they arrive; keep every trigger's position true.
    let pending = 0;
    const refreshSoon = () => {
      window.clearTimeout(pending);
      pending = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const imgs = Array.from(document.images).filter((img) => !img.complete);
    imgs.forEach((img) => img.addEventListener("load", refreshSoon, { once: true }));

    return () => {
      window.clearTimeout(pending);
      imgs.forEach((img) => img.removeEventListener("load", refreshSoon));
      window.removeEventListener("hashchange", catchUp);
      triggers.forEach((t) => t.kill());
    };
  }, []);
  return null;
}
