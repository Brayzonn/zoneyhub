import { useState, useEffect } from "react";
import { initGA, logPageView } from "../utils/analytics";

export const usePageSetup = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    const gaTimer = setTimeout(() => {
      initGA();
      logPageView();
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(gaTimer);
    };
  }, []);

  return { isScrolled };
};
