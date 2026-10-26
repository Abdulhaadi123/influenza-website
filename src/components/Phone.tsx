/** A phone with a real app screen in it. Screens are 402:871, like the app's frames. */
export default function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`rounded-[2.6rem] bg-gradient-to-b from-[#2d2768] to-[#0d0a2c] p-[0.55rem] shadow-[0_50px_120px_-30px_rgb(123_102_232/0.65),inset_0_0_0_1px_rgb(255_255_255/0.14)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block aspect-[402/871] w-full rounded-[2.1rem] object-cover object-top"
      />
    </div>
  );
}
