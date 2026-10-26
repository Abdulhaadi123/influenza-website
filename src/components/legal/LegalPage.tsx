import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BRAND, CONTACT_EMAIL } from "@/lib/site";
import "./legal.css";

/**
 * The frame the legal pages share: the logo, a way back, the title with its date, the text in a
 * readable column, and a footer that links the four pages to each other.
 * The text itself is plain HTML written in each page (src/app/<page>/page.tsx), styled by legal.css.
 */

export const LEGAL_LINKS: [string, string][] = [
  ["Privacy Policy", "/privacy/"],
  ["Terms of Use", "/terms/"],
  ["Delete your account", "/delete-account/"],
  ["Support", "/support/"],
];

export function LegalPage({
  title,
  updated,
  lead,
  children,
}: {
  title: string;
  /** "26 October 2026"; omitted on pages that are not a policy. */
  updated?: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-5 md:px-12">
          <Link href="/" aria-label={`${BRAND}, home`}>
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-dim transition-colors hover:text-ink">
            ← Back to the site
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-[760px] px-5 pb-24 pt-14 md:px-6 md:pt-20">
        <h1 className="text-[clamp(2.2rem,7vw,3.6rem)] font-semibold leading-[1] tracking-[-0.045em]">{title}</h1>
        {updated ? <p className="mt-4 text-sm text-faint">Last updated {updated}</p> : null}
        <div className="legal mt-8 text-lg">
          <p className="text-[1.15rem] leading-relaxed text-ink">{lead}</p>
          {children}
        </div>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {LEGAL_LINKS.map(([label, href]) => (
              <li key={href}>
                <a className="text-dim transition-colors hover:text-ink" href={href}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-faint">
            © 2026 {BRAND} ·{" "}
            <a className="hover:text-ink" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

/** A contact link that is the same everywhere. */
export function Mail({ subject }: { subject?: string }) {
  const href = `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return <a href={href}>{CONTACT_EMAIL}</a>;
}
