import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, logPageView } from "../utils/analytics";

/**
 * Initializes Google Analytics once, then logs a pageview on every client-side
 * route change. Must be rendered inside a react-router <Router>.
 */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
};
