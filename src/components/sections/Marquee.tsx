import { Fragment } from "react";
import { LOOKS } from "@/lib/site";

const WORDS = ["Create", "Promote", "Move", "Share"];

/** The four things the app does, in huge type, sliding past with the influencer's looks. */
export default function Marquee() {
  const row = WORDS.map((word, i) => ({ word, look: LOOKS[i % LOOKS.length], outline: i % 2 === 1 }));
  return (
    <section aria-label="Create, promote, move, share" className="overflow-hidden border-y border-white/10 py-7 md:py-12">
      <div className="marquee flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex items-center">
            {row.map(({ word, look, outline }) => (
              <Fragment key={word}>
                <span
                  className={`px-[3vw] text-[15vw] font-semibold leading-[1.05] tracking-[-0.055em] md:text-[9vw] ${
                    outline ? "text-outline [-webkit-text-stroke-color:rgb(246_166_254/0.7)]" : ""
                  }`}
                >
                  {word}
                </span>
                <img
                  src={look.src}
                  alt=""
                  loading="lazy"
                  className="h-[14vw] w-[14vw] rounded-full object-cover object-top ring-1 ring-white/20 md:h-[8vw] md:w-[8vw]"
                />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
