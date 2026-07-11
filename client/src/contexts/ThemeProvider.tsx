import { useState, useEffect, ReactNode } from "react";
import { ThemeContext, Theme } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Reads back what the pre-paint script in index.html applied
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  // Persist only explicit picks so unpicked visitors keep following the OS
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const followOS = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme"))
        setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", followOS);
    return () => mq.removeEventListener("change", followOS);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.dataset.theme = "dark";
    } else {
      delete root.dataset.theme;
    }

    // Recreating the meta tag (vs mutating) is more reliable in Safari
    const bg = getComputedStyle(root).getPropertyValue("--color-bg").trim();
    document.querySelector('meta[name="theme-color"]')?.remove();
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = bg;
    document.head.appendChild(meta);

    // iOS Safari only recomputes the status-bar tint on navigations
    const frame = requestAnimationFrame(() => {
      history.replaceState(history.state, "", window.location.href);
    });
    return () => cancelAnimationFrame(frame);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
