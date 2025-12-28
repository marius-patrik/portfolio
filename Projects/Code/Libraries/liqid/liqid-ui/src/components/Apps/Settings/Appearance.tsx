import { IconPalette, IconPhoto, IconUpload } from "@tabler/icons-react";
import { useRef } from "react";
import { useDesktopLayout } from "../../../hooks/useDesktopLayout";
import { useFooter } from "../../../hooks/useFooter";
import { type IconSize, useIconSize } from "../../../hooks/useIconSize";
import { type ThemeMode, useTheme } from "../../../hooks/useTheme";
import { useWallpaper } from "../../../hooks/useWallpaper";

const COLOR_PRESETS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
];

export const Appearance = () => {
  const { iconSize, setIconSize } = useIconSize();
  const { wallpaper, setWallpaper } = useWallpaper();
  const { hideFooter, setHideFooter } = useFooter();
  const { theme, setTheme } = useTheme();
  const { layoutMode, setLayoutMode } = useDesktopLayout();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const themeOptions: {
    value: ThemeMode;
    label: string;
    description: string;
  }[] = [
    {
      value: "system",
      label: "System",
      description: "Follow system preference",
    },
    {
      value: "light",
      label: "Light",
      description: "Always use light mode",
    },
    {
      value: "dark",
      label: "Dark",
      description: "Always use dark mode",
    },
  ];

  const iconOptions: { value: IconSize; label: string; description: string }[] =
    [
      {
        value: "small",
        label: "Small with titles",
        description: "Smaller icons with names displayed below",
      },
      {
        value: "large",
        label: "Large without titles",
        description: "Bigger icons without names",
      },
    ];

  const handleColorSelect = (color: string) => {
    setWallpaper({ type: "color", value: color });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setWallpaper({ type: "image", value: imageDataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-2 space-y-6">
      {/* Icon Size Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Icon Size</h2>
        <div className="flex flex-col gap-2">
          {iconOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setIconSize(option.value)}
              className={`button flex-col items-start p-3 text-left justify-start ${
                iconSize === option.value
                  ? "selected"
                  : "glass hover:bg-gray-300/30"
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-sm opacity-70">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <div className="flex flex-col gap-2">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTheme(option.value)}
              className={`button flex-col items-start p-3 text-left justify-start ${
                theme === option.value
                  ? "selected"
                  : "glass hover:bg-gray-300/30"
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-sm opacity-70">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dock Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Dock</h2>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setHideFooter(false)}
            className={`button flex-col items-start p-3 text-left justify-start ${
              !hideFooter ? "selected" : "glass hover:bg-gray-300/30"
            }`}
          >
            <div className="font-medium">Show dock</div>
            <div className="text-sm opacity-70">Dock is always visible</div>
          </button>
          <button
            type="button"
            onClick={() => setHideFooter(true)}
            className={`button flex-col items-start p-3 text-left justify-start ${
              hideFooter ? "selected" : "glass hover:bg-gray-300/30"
            }`}
          >
            <div className="font-medium">Hide dock</div>
            <div className="text-sm opacity-70">
              Hover at bottom to reveal dock
            </div>
          </button>
        </div>
      </div>

      {/* Desktop Layout Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Desktop Layout</h2>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setLayoutMode("grid")}
            className={`button flex-col items-start p-3 text-left justify-start ${
              layoutMode === "grid" ? "selected" : "glass hover:bg-gray-300/30"
            }`}
          >
            <div className="font-medium">Grid (Snap)</div>
            <div className="text-sm opacity-70">Icons snap to grid</div>
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("free")}
            className={`button flex-col items-start p-3 text-left justify-start ${
              layoutMode === "free" ? "selected" : "glass hover:bg-gray-300/30"
            }`}
          >
            <div className="font-medium">Free (Anywhere)</div>
            <div className="text-sm opacity-70">Place icons anywhere</div>
          </button>
        </div>
      </div>

      {/* Wallpaper Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Wallpaper</h2>

        {/* Color Presets */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-medium opacity-70 flex items-center gap-2">
            <IconPalette size={16} />
            Colors
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={`w-10 h-10 rounded-lg transition-all hover:scale-110 ${
                  wallpaper.type === "color" && wallpaper.value === color
                    ? "ring-2 ring-white ring-offset-2 ring-offset-transparent"
                    : ""
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Image Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium opacity-70 flex items-center gap-2">
            <IconPhoto size={16} />
            Images
          </h3>

          {/* Custom Upload */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileUpload}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all w-full max-w-xs justify-center"
            >
              <IconUpload size={20} />
              Upload Image
            </button>
          </div>

          {/* Preview current custom image */}
          {wallpaper.type === "image" && wallpaper.value && (
            <div className="mt-2">
              <h3 className="text-sm font-medium opacity-70 mb-2">
                Current wallpaper
              </h3>
              <div className="relative rounded-lg overflow-hidden aspect-video bg-black/20 max-w-xs">
                <img
                  src={wallpaper.value}
                  alt="Current wallpaper"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Current Selection Info */}
        <div className="pt-4 border-t border-white/10 mt-4">
          <p className="text-sm opacity-70">
            Current:{" "}
            {wallpaper.type === "color" ? (
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded inline-block"
                  style={{ backgroundColor: wallpaper.value }}
                />
                {wallpaper.value}
              </span>
            ) : (
              "Custom Image"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
