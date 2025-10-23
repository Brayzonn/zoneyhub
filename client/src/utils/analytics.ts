import ReactGA from "react-ga4";

interface EventParams {
  category: string;
  action: string;
  label?: string;
}

export const initGA = (): void => {
  ReactGA.initialize("G-02YZV44RB1");
};

export const logPageView = (): void => {
  const page: string = window.location.pathname + window.location.search;
  ReactGA.send({ hitType: "pageview", page });
};

export const logEvent = (
  category: string,
  action: string,
  label: string = ""
): void => {
  const eventParams: EventParams = {
    category,
    action,
    label,
  };

  ReactGA.event(eventParams);
};
