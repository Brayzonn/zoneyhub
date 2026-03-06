import { ThemeContext, useThemeProvider } from "../hooks/useTheme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeProvider();
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
