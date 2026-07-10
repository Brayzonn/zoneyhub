import { useState, useEffect, ReactNode } from "react";
import { ThemeContext, Theme } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Reads back what the pre-paint script in index.html applied
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.dataset.theme = "dark";
    } else {
      delete root.dataset.theme;
    }
    localStorage.setItem("theme", theme);

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
