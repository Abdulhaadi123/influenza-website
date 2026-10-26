import type { ReactNode } from "react";
import { Logo, LogoMark } from "@/components/Logo";
import Tilt from "@/components/Tilt";
import { CONTACT_EMAIL, FAQ, LOOKS, PACKS, PLAY_STORE_URL, USE_CASES, earlyAccessHref } from "@/lib/site";

/*
 * The brand page under the chapters: plain scrolling sections in the same
 * design system, revealed once by RevealOnScroll ([data-reveal]).
 * Every claim here is something the app or its server really does.
 */

const wrap = "mx-auto w-full max-w-[1600px] px-5 md:px-16";
const h2 = "text-[clamp(2.3rem,9vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em] md:text-[clamp(3.4rem,6vw,7.2rem)]";

export function Manifesto() {
  return (
    <section id="after-film" className="relative overflow-hidden py-[18vh] md:py-[24vh]">
      <img
        src="img/orb-iris.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="float pointer-events-none absolute right-[-8vw] top-[8vh] w-[44vw] max-w-[620px] opacity-60 blur-[1px] md:right-[4vw]"
      />
      <div className={`relative ${wrap}`}>
        <h2
          data-reveal
          className="max-w-[12ch] text-[clamp(3rem,13vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em] md:text-[clamp(5rem,10vw,12rem)]"
        >
          Every brand deserves a face.
        </h2>
        <p data-reveal className="mt-8 max-w-[38ch] text-lg leading-relaxed text-dim md:ml-[45%] md:mt-12 md:text-2xl">
          Influenza AI gives you one you design yourself, then puts it to work in photos and videos.
        </p>
      </div>
    </section>
  );
}

export function UseCases() {
  return (
    <section id="made-for" className="py-[10vh]">
      <div className={wrap}>
        <h2 data-reveal className={h2}>
          Made for
        </h2>
        <ul className="mt-10 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {USE_CASES.map((u, i) => (
            <li key={u.title} data-reveal className={i === 1 ? "md:translate-y-16" : ""}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <img
                  src={u.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{u.title}</h3>
                  <p className="mt-2 max-w-[30ch] leading-relaxed text-dim">{u.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Create your influencer",
    body: "Describe them in a sentence, or start from a reference photo and pick the features to match.",
  },
  {
    title: "Choose what they make",
    body: "A product video with your script and a voice you choose, or a clip that copies the moves from any video.",
  },
  {
    title: "Save or share",
    body: "Results land in your influencer's gallery. Close the app while a video renders; it is waiting when you come back.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-[16vh]">
      <div className={wrap}>
        <h2 data-reveal className={h2}>
          How it works
        </h2>
        <ol className="mt-12 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal className="border-t border-white/15 pt-6">
              <span
                aria-hidden="true"
                className="block text-[6rem] font-semibold leading-none tracking-[-0.05em] text-outline [-webkit-text-stroke-color:rgb(246_166_254/0.7)] md:text-[9rem]"
              >
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.025em] md:text-3xl">{s.title}</h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-dim md:text-lg">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const PACK_ORBS = ["img/orb-sphere.webp", "img/orb-blob.webp", "img/orb-iris.webp"];

export function Packs() {
  return (
    <section id="packs" className="py-[14vh]">
      <div className={wrap}>
        <h2 data-reveal className={h2}>
          Credit packs
        </h2>
        <p data-reveal className="mt-5 max-w-[44ch] leading-relaxed text-dim md:text-xl">
          Buy credits once and spend them on images and videos. No subscription.
        </p>
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {PACKS.map((p, i) => (
            <div key={p.credits} data-reveal>
              <Tilt className="h-full">
                <div className="glass relative h-full overflow-hidden rounded-[2rem] p-8 md:p-10">
                  <img
                    src={PACK_ORBS[i]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="float absolute right-[-12%] top-[-10%] w-[55%] opacity-90"
                    style={{ animationDelay: `${-i * 2}s` }}
                  />
                  <p className="relative mt-20 text-[clamp(3.2rem,6vw,5.4rem)] font-semibold leading-none tracking-[-0.05em] md:mt-28">
                    {p.credits}
                  </p>
                  <p className="relative mt-2 text-lg text-dim">credits</p>
                  <div className="relative mt-10 flex items-end justify-between border-t border-white/10 pt-6">
                    <p className="text-4xl font-medium tracking-[-0.03em]">{p.price}</p>
                    <p className="text-sm text-faint">{p.perThousand} per 1,000</p>
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
        <ul className="mt-10 grid max-w-[1000px] gap-3 leading-relaxed text-dim md:grid-cols-2 md:gap-10">
          <li data-reveal>Credits are set aside when a generation starts, and given back if it fails or is blocked.</li>
          <li data-reveal>Bought in the app through Google Play. Prices are in US dollars; Google Play shows yours before you pay.</li>
        </ul>
      </div>
    </section>
  );
}

const icon = (d: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    className="h-8 w-8 text-pink"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);

const TRUST = [
  {
    title: "Your own account",
    body: "Sign up with your email and a password. Passwords are stored only as a secure hash, never as text.",
    icon: icon(
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      </>,
    ),
  },
  {
    title: "Private files",
    body: "Uploads and results are kept in private storage, never on public links.",
    icon: icon(
      <>
        <rect x="4" y="10" width="16" height="11" rx="2.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>,
    ),
  },
  {
    title: "Checked content",
    body: "Prompts, uploads and results pass through automated moderation. What it blocks is not made.",
    icon: icon(
      <>
        <path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>,
    ),
  },
  {
    title: "Leave any time",
    body: "Delete your account in Settings, and your influencers, results and files are removed for good.",
    icon: icon(<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />),
  },
];

export function Trust() {
  return (
    <section id="privacy" className="py-[14vh]">
      <div className={`${wrap} grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20`}>
        <h2 data-reveal className={`${h2} md:sticky md:top-28 md:self-start`}>
          Private by design.
        </h2>
        <ul className="grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {TRUST.map((t) => (
            <li key={t.title} data-reveal>
              {t.icon}
              <h3 className="mt-5 text-xl font-medium tracking-[-0.02em] md:text-2xl">{t.title}</h3>
              <p className="mt-3 leading-relaxed text-dim md:text-lg">{t.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-[14vh]">
      <div className={`${wrap} grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20`}>
        <div data-reveal>
          <h2 className={h2}>Questions</h2>
          <p className="mt-5 max-w-[30ch] leading-relaxed text-dim md:text-lg">
            Something else? Write to{" "}
            <a className="text-lavender underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
        <div data-reveal className="border-t border-white/10">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-white/10">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg tracking-[-0.015em] transition-colors hover:text-pink md:text-2xl">
                {f.q}
                <span
                  aria-hidden="true"
                  className="faq-plus grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-xl text-lavender transition-transform duration-300"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[60ch] pb-7 leading-relaxed text-dim md:text-lg">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GetApp() {
  return (
    <section id="get" className="relative overflow-hidden py-[14vh]">
      <div className={`${wrap} grid items-center gap-10 md:grid-cols-2 md:gap-16`}>
        <div className="relative order-2 md:order-1">
          <div data-reveal>
            <LogoMark className="h-12 w-auto text-ink md:h-16" />
          </div>
          <h2
            data-reveal
            className="mt-8 text-[clamp(3rem,13vw,5rem)] font-semibold leading-[0.92] tracking-[-0.055em] md:text-[clamp(4.5rem,8vw,10rem)]"
          >
            Be first in line.
          </h2>
          <p data-reveal className="mt-6 max-w-[36ch] text-lg leading-relaxed text-dim md:text-xl">
            Influenza AI is in early testing on Android. Ask for early access and we will get back to you.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-3">
            <a className="btn-primary" href={earlyAccessHref}>
              Ask for early access
            </a>
            {PLAY_STORE_URL ? (
              <a className="btn-quiet" href={PLAY_STORE_URL}>
                Get it on Google Play
              </a>
            ) : (
              <span className="btn-quiet cursor-default text-dim">Coming soon to Google Play</span>
            )}
          </div>
        </div>
        <div data-reveal className="relative order-1 md:order-2">
          <div aria-hidden="true" className="orb absolute inset-[14%] opacity-50 blur-[90px]" />
          <Tilt className="relative mx-auto aspect-[3/4] max-h-[78svh] w-full max-w-[560px]">
            <img
              src={LOOKS[2].src}
              alt={LOOKS[2].alt}
              width={1000}
              height={1333}
              loading="lazy"
              className="h-full w-full rounded-[2.2rem] object-cover object-top shadow-[0_60px_140px_-40px_rgb(196_95_248/0.6)] ring-1 ring-white/15"
            />
          </Tilt>
          <img
            src="img/orb-sphere.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="float pointer-events-none absolute -left-4 bottom-[8%] w-[22%] max-w-[130px] md:-left-10"
          />
        </div>
      </div>
    </section>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="text-sm text-faint">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a className="text-dim transition-colors hover:text-ink" href={href}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/10 pt-16">
      <div className={`${wrap} grid gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]`}>
        <div>
          <Logo />
          <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-dim">
            Create AI influencers, produce product videos and bring them to life with motion.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            ["Create Influencer", "#create"],
            ["Product Videos", "#promote"],
            ["Motion Copy", "#motion"],
            ["Inside the app", "#app"],
            ["Credit packs", "#packs"],
          ]}
        />
        <FooterCol
          title="Help"
          links={[
            ["How it works", "#how"],
            ["Privacy and safety", "#privacy"],
            ["Questions", "#faq"],
            ["Support", "/support/"],
            ["Privacy Policy", "/privacy/"],
            ["Terms of Use", "/terms/"],
            ["Delete your account", "/delete-account/"],
          ]}
        />
        <FooterCol
          title="Contact"
          links={[
            [CONTACT_EMAIL, `mailto:${CONTACT_EMAIL}`],
            ["Early access", "#get"],
          ]}
        />
      </div>
      <div className={`${wrap} mt-14 flex flex-col gap-2 text-xs text-faint md:flex-row md:justify-between`}>
        <p>© 2026 Influenza AI</p>
        <p>Images on this page are AI-generated. Google Play is a trademark of Google LLC.</p>
      </div>
      <p
        aria-hidden="true"
        className="mt-8 select-none whitespace-nowrap bg-gradient-to-b from-lavender/40 to-transparent bg-clip-text text-center text-[23vw] font-semibold leading-[0.8] tracking-[-0.065em] text-transparent"
      >
        influenza
      </p>
    </footer>
  );
}
