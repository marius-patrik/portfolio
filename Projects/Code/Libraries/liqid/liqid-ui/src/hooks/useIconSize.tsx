import { createContext, type ReactNode, useContext, useState } from "react";

export type IconSize = "small" | "large";

interface IconSizeContextType {
  iconSize: IconSize;
  setIconSize: (size: IconSize) => void;
  showTitle: boolean;
}

const IconSizeContext = createContext<IconSizeContextType | undefined>(
  undefined,
);

const DEFAULT_SIZE: IconSize = "small";

export const IconSizeProvider = ({ children }: { children: ReactNode }) => {
  const [iconSize, setIconSizeState] = useState<IconSize>(() => {
    if (typeof window === "undefined") return DEFAULT_SIZE;
    const saved = localStorage.getItem("iconSize");
    if (saved === "small" || saved === "large") {
      return saved;
    }
    return DEFAULT_SIZE;
  });

  const setIconSize = (size: IconSize) => {
    setIconSizeState(size);
    localStorage.setItem("iconSize", size);
  };

  // Small icons show titles, large icons don't
  const showTitle = iconSize === "small";

  return (
    <IconSizeContext.Provider value={{ iconSize, setIconSize, showTitle }}>
      {children}
    </IconSizeContext.Provider>
  );
};

export const useIconSize = (): IconSizeContextType => {
  const context = useContext(IconSizeContext);
  if (!context) {
    throw new Error("useIconSize must be used within an IconSizeProvider");
  }
  return context;
};
