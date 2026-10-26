"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "@/components/Logo";

/**
 * The logo is always there. Section links and the call to action join it
 * once the film is over, so the opening chapters play without chrome.
 */
export default function Nav() {
  const [afterFilm, setAfterFilm] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#after-film",
      start: "top 85%",
      onEnter: () => setAfterFilm(true),
      onLeaveBack: () => setAfterFilm(false),
    });
    setAfterFilm(st.progress > 0 || window.scrollY > st.start);
    return () => st.kill();
  }, []);

  const shown = afterFilm ? "visible opacity-100" : "invisible opacity-0";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        afterFilm ? "border-b border-white/5 bg-night/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-12">
        <a href="#top" aria-label="Influenza AI, back to the top">
          <Logo />
        </a>
        <nav
          aria-label="Sections"
          className={`hidden items-center gap-8 text-sm text-dim transition-[opacity,visibility] duration-500 md:flex ${shown}`}
        >
          <a className="transition-colors hover:text-ink" href="#create">
            Features
          </a>
          <a className="transition-colors hover:text-ink" href="#app">
            Inside the app
          </a>
          <a className="transition-colors hover:text-ink" href="#packs">
            Credit packs
          </a>
          <a className="transition-colors hover:text-ink" href="#faq">
            Questions
          </a>
        </nav>
        <a
          href="#get"
          className={`rounded-full border border-lavender/40 px-4 py-2 text-sm transition-[opacity,visibility,background-color] duration-500 hover:bg-lavender/10 ${shown}`}
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
