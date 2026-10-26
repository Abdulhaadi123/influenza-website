"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** A decoded frame is either an ImageBitmap (fast path) or an <img> fallback. */
type Frame =
  | { kind: "bitmap"; img: ImageBitmap }
  | { kind: "element"; img: HTMLImageElement; url: string };

/**
 * Decode a WebP blob into something ctx.drawImage can use.
 * createImageBitmap is the fast, off-main-thread path — but it can throw
 * "The source image could not be decoded" in backgrounded/hidden tabs and
 * some embedded webviews. When it does, fall back to a plain HTMLImageElement,
 * which decodes reliably everywhere. Both are valid drawImage sources.
 */
async function decodeBlob(blob: Blob): Promise<Frame> {
  try {
    const img = await createImageBitmap(blob);
    return { kind: "bitmap", img };
  } catch {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("img decode failed"));
      img.src = url;
    });
    return { kind: "element", img, url };
  }
}

function releaseFrame(f: Frame) {
  if (f.kind === "bitmap") f.img.close();
  else URL.revokeObjectURL(f.url);
}

/**
 * public/frames/index.json lists the sequences that exist ({"sequences": [...]}),
 * written by tools/publish_frames.py. One shared fetch, so a section whose film
 * has not been generated yet shows its fallback art instead of a 404.
 */
let indexPromise: Promise<Set<string>> | null = null;
function availableSequences(): Promise<Set<string>> {
  indexPromise ??= fetch("frames/index.json")
    .then((r) => (r.ok ? r.json() : { sequences: [] }))
    .then((j: { sequences?: string[] }) => new Set(j.sequences ?? []))
    .catch(() => new Set<string>());
  return indexPromise;
}

/**
 * Loads a WebP frame sequence (public/frames/<name>/) and exposes a
 * draw(canvas, progress) scrubber. `draw` is stable for the life of the
 * component, so a ScrollTrigger timeline can hold on to it.
 *
 * Memory strategy: compressed blobs stay resident (a few MB), decoded
 * frames live only in a sliding window around the playhead so scrubbing
 * stays 60fps without holding hundreds of MB of pixels.
 */
export function useFrameSequence(name: string) {
  const blobs = useRef<(Blob | null)[]>([]);
  const frames = useRef<Map<number, Frame>>(new Map());
  const decoding = useRef<Set<number>>(new Set());
  const countRef = useRef(0);
  const lastProgress = useRef(0);
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let alive = true;
    const decoded = frames.current;
    (async () => {
      const known = await availableSequences();
      if (!alive) return;
      if (!known.has(name)) return setMissing(true);
      const m = await fetch(`frames/${name}/manifest.json`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);
      if (!alive) return;
      if (!m?.count) return setMissing(true);
      countRef.current = m.count;
      blobs.current = new Array(m.count).fill(null);
      const url = (i: number) =>
        m.pattern.replace("%03d", String(i + 1).padStart(3, "0"));

      // fetch all compressed frames (small), decode only frame 0 up front
      await Promise.all(
        Array.from({ length: m.count }, async (_, i) => {
          try {
            const b = await fetch(url(i)).then((r) => r.blob());
            if (alive) blobs.current[i] = b;
          } catch {
            /* refetched implicitly on next visit */
          }
        })
      );
      if (!alive) return;
      if (blobs.current[0]) {
        try {
          const f = await decodeBlob(blobs.current[0]);
          if (!alive) return releaseFrame(f);
          decoded.set(0, f);
        } catch {
          /* first frame will be retried by the draw loop */
        }
      }
      setReady(true);
    })();
    return () => {
      alive = false;
      decoded.forEach(releaseFrame);
      decoded.clear();
    };
  }, [name]);

  /** progress ∈ [0,1] → draw the matching frame, contain-fit, on the canvas */
  const draw = useCallback((canvas: HTMLCanvasElement | null, progress: number) => {
    if (!canvas || countRef.current === 0) return;
    lastProgress.current = progress;
    const count = countRef.current;
    const i = Math.round(Math.min(1, Math.max(0, progress)) * (count - 1));

    const decode = (n: number) => {
      if (frames.current.has(n) || decoding.current.has(n) || !blobs.current[n]) return;
      decoding.current.add(n);
      decodeBlob(blobs.current[n]!)
        .then((f) => frames.current.set(n, f))
        .catch(() => {})
        .finally(() => decoding.current.delete(n));
    };

    // decode ahead of the playhead, evict far-away frames
    const AHEAD = 16;
    const KEEP = 32;
    for (let d = 0; d <= AHEAD; d++) {
      if (i + d < count) decode(i + d);
      if (i - d >= 0) decode(i - d);
    }
    if (frames.current.size > KEEP * 2) {
      for (const [idx, f] of frames.current) {
        if (Math.abs(idx - i) > KEEP) {
          releaseFrame(f);
          frames.current.delete(idx);
        }
      }
    }

    let frame: Frame | null = frames.current.get(i) ?? null;
    for (let d = 1; !frame && d < count; d++) {
      frame = frames.current.get(i - d) ?? frames.current.get(i + d) ?? null;
    }
    if (!frame) return;
    const src = frame.img;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(canvas.clientWidth * dpr);
    const ch = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, cw, ch);
    const s = Math.min(cw / src.width, ch / src.height);
    const w = src.width * s;
    const h = src.height * s;
    ctx.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
  }, []);

  return { ready, missing, draw, lastProgress };
}
