import ReactGA from "react-ga4";

export const initGA = (): void => {
  ReactGA.initialize("G-02YZV44RB1", {
    gaOptions: {
      debug_mode: true,
    },
  });
};

export const logPageView = (): void => {
  const page: string = window.location.pathname + window.location.search;
  ReactGA.send({ hitType: "pageview", page });
};

export const logEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void => {
  ReactGA.event(eventName, eventParams);
};
