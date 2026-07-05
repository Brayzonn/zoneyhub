import ReactGA from "react-ga4";

// Falls back to the production ID so a build without env vars still works;
// override with VITE_GA_MEASUREMENT_ID for staging/other environments.
const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? "G-02YZV44RB1";

let isInitialized = false;

export const initGA = (): void => {
  if (isInitialized) return;

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {
      debug_mode: false,
    },
  });

  isInitialized = true;
};

export const logPageView = (page?: string): void => {
  if (!isInitialized) return;

  const path = page ?? window.location.pathname + window.location.search;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void => {
  if (!isInitialized) return;

  ReactGA.event(eventName, eventParams);
};
