import { useCallback } from "react";

interface UseSoundEffectsProps {
  isSoundOn: boolean;
}

type AudioContextCtor = typeof AudioContext;

const CLICK_URL = "/sounds/click.wav";

let sharedCtx: AudioContext | null = null;
let clickBuffer: AudioBuffer | null = null;
let decodePromise: Promise<AudioBuffer> | null = null;

const bytesPromise: Promise<ArrayBuffer> | null =
  typeof window === "undefined"
    ? null
    : fetch(CLICK_URL).then((r) => r.arrayBuffer());

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
  if (!bytesPromise) return Promise.reject(new Error("no fetch"));

  decodePromise = bytesPromise
    .then((bytes) => ctx.decodeAudioData(bytes.slice(0)))
    .then((buf) => {
      clickBuffer = buf;
      return buf;
    });
  return decodePromise;
};

const playBuffer = (ctx: AudioContext, buf: AudioBuffer) => {
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.start(ctx.currentTime + 0.005);
};

if (typeof window !== "undefined") {
  const prewarm = () => {
    const ctx = getCtx();
    if (ctx) loadClickBuffer(ctx).catch(() => {});
  };
  const opts = { once: true, capture: true } as const;
  window.addEventListener("pointermove", prewarm, opts);
  window.addEventListener("pointerdown", prewarm, opts);
  window.addEventListener("keydown", prewarm, opts);
  window.addEventListener("touchstart", prewarm, opts);
}

export const useSoundEffects = ({ isSoundOn }: UseSoundEffectsProps) => {
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
