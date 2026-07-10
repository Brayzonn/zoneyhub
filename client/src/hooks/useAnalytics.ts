import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, logPageView } from "../utils/analytics";

/** Init GA once, then log a pageview per route change; must sit inside <Router>. */
export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);
};
