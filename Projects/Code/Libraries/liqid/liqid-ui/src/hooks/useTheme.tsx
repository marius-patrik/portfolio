import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
    return "system";
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateDarkMode = () => {
      let shouldBeDark = false;

      if (theme === "dark") {
        shouldBeDark = true;
      } else if (theme === "light") {
        shouldBeDark = false;
      } else {
        shouldBeDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
      }

      setIsDark(shouldBeDark);

      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    updateDarkMode();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        updateDarkMode();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
