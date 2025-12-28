import type { ReactNode } from "react";
import { useWallpaper } from "../../hooks/useWallpaper";

interface WallpaperProps {
  children: ReactNode;
}

export const Wallpaper = ({ children }: WallpaperProps) => {
  const { wallpaper } = useWallpaper();

  const backgroundStyle: React.CSSProperties =
    wallpaper.type === "image"
      ? {
          backgroundImage: `url(${wallpaper.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {
          backgroundColor: wallpaper.value,
        };

  return (
    <div
      id="wallpaper"
      className="h-screen w-screen overflow-hidden"
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};
