import ReactGA from "react-ga4";

let isInitialized = false;

export const initGA = (): void => {
  if (isInitialized) return;

  ReactGA.initialize("G-02YZV44RB1", {
    gaOptions: {
      debug_mode: false,
    },
  });

  isInitialized = true;
};

export const logPageView = (): void => {
  if (!isInitialized) return;

  const page: string = window.location.pathname + window.location.search;
  ReactGA.send({ hitType: "pageview", page });
};

export const logEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void => {
  if (!isInitialized) return;

  ReactGA.event(eventName, eventParams);
};
