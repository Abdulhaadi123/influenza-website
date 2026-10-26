"use client";

import { useId } from "react";

/**
 * The app's logo mark (mobile/assets/brand/logo-mark.svg): the stem and arc of
 * the "in", and the orb that dots the i. On the dark page the navy parts take
 * the current text colour; the orb keeps its own gradient.
 */
export function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 151 103"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <radialGradient id={`${id}-orb`} cx="0.64" cy="0.28" r="0.8" fx="0.68" fy="0.24">
          <stop offset="0" stopColor="#F4A6FF" />
          <stop offset="0.35" stopColor="#8F5BFF" />
          <stop offset="1" stopColor="#2A1BB0" />
        </radialGradient>
      </defs>
      <rect x="0" y="50" width="48" height="53" fill="currentColor" />
      <path d="M48 0 A103 103 0 0 1 151 103 L99 103 A51 51 0 0 0 48 52 Z" fill="currentColor" />
      <circle cx="24" cy="25" r="18" fill={`url(#${id}-orb)`} />
    </svg>
  );
}

/** Mark + wordmark, as in the app's header ("influenza AI"). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-[22px] w-auto text-ink" />
      <span className="text-[1.05rem] font-semibold tracking-[-0.03em]">
        influenza <span className="font-normal">AI</span>
      </span>
    </span>
  );
}
