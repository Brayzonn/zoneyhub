/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Analytics 4 measurement ID (e.g. "G-XXXXXXX"). */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Public site origin used for canonical/OG URLs (no trailing slash). */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
