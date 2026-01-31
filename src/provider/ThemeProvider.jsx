import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const THEME_KEY = "turfhub-theme";

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || "turf-light";
    }
    return "turf-light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const setTheme = (t) => {
    setThemeState(t === "turf-light" || t === "turf-dark" ? t : "turf-light");
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "turf-light" ? "turf-dark" : "turf-light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
