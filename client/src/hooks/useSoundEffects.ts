import { useCallback, useEffect } from "react";

interface UseSoundEffectsProps {
  isSoundOn: boolean;
}

type AudioContextCtor = typeof AudioContext;

const CLICK_URL = "/sounds/click.wav";

let sharedCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let decodePromise: Promise<AudioBuffer> | null = null;

const getCtx = (): AudioContext | null => {
  if (sharedCtx) return sharedCtx;
  if (typeof window === "undefined") return null;

  const Ctor: AudioContextCtor | undefined =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: AudioContextCtor })
      .webkitAudioContext;
  if (!Ctor) return null;

  sharedCtx = new Ctor();
  return sharedCtx;
};

const loadClickBuffer = (ctx: AudioContext): Promise<AudioBuffer> => {
  if (clickBuffer) return Promise.resolve(clickBuffer);
  if (decodePromise) return decodePromise;

  decodePromise = fetch(CLICK_URL)
    .then((r) => r.arrayBuffer())
    .then((bytes) => ctx.decodeAudioData(bytes))
    .then((buf) => {
      clickBuffer = buf;
      return buf;
    })
    .catch((err) => {
      decodePromise = null;
      throw err;
    });
  return decodePromise;
};

const playBuffer = (ctx: AudioContext, buf: AudioBuffer) => {
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.start(ctx.currentTime + 0.005);
};

const PREWARM_EVENTS = [
  "pointermove",
  "pointerdown",
  "keydown",
  "touchstart",
] as const;

export const useSoundEffects = ({ isSoundOn }: UseSoundEffectsProps) => {
  useEffect(() => {
    if (clickBuffer || decodePromise) return;

    const prewarm = () => {
      const ctx = getCtx();
      if (ctx) loadClickBuffer(ctx).catch(() => {});
    };
    const opts = { once: true, capture: true } as const;
    PREWARM_EVENTS.forEach((e) => window.addEventListener(e, prewarm, opts));
    return () => {
      PREWARM_EVENTS.forEach((e) =>
        window.removeEventListener(e, prewarm, opts),
      );
    };
  }, []);

  const playClick = useCallback(() => {
    if (!isSoundOn) return;
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    if (clickBuffer) {
      playBuffer(ctx, clickBuffer);
      return;
    }

    loadClickBuffer(ctx)
      .then((buf) => playBuffer(ctx, buf))
      .catch(() => {});
  }, [isSoundOn]);

  return { playClick };
};
