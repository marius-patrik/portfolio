import { createContext, type ReactNode, useContext, useState } from "react";

export interface WallpaperState {
  type: "color" | "image";
  value: string;
}

interface WallpaperContextType {
  wallpaper: WallpaperState;
  setWallpaper: (wallpaper: WallpaperState) => void;
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(
  undefined,
);

const DEFAULT_WALLPAPER: WallpaperState = {
  type: "color",
  value: "#3b82f6",
};

export const WallpaperProvider = ({ children }: { children: ReactNode }) => {
  const [wallpaper, setWallpaperState] = useState<WallpaperState>(() => {
    if (typeof window === "undefined") return DEFAULT_WALLPAPER;
    const saved = localStorage.getItem("wallpaper");
    if (saved) {
      try {
        return JSON.parse(saved) as WallpaperState;
      } catch {
        return DEFAULT_WALLPAPER;
      }
    }
    return DEFAULT_WALLPAPER;
  });

  const setWallpaper = (newWallpaper: WallpaperState) => {
    setWallpaperState(newWallpaper);
    localStorage.setItem("wallpaper", JSON.stringify(newWallpaper));
  };

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = (): WallpaperContextType => {
  const context = useContext(WallpaperContext);
  if (!context) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return context;
};
