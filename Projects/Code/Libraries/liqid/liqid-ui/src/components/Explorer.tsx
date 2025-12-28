import {
  IconFolder,
  IconGlobe,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { DesktopLayoutProvider } from "../hooks/useDesktopLayout";
import { FooterProvider } from "../hooks/useFooter";
import { IconSizeProvider } from "../hooks/useIconSize";
import { ThemeProvider } from "../hooks/useTheme";
import { WallpaperProvider } from "../hooks/useWallpaper";
import type { AppDefinition } from "../types";
import { Browser } from "./Apps/Browser";
import { Files } from "./Apps/Files";
import { Search } from "./Apps/Search";
import { Settings } from "./Apps/Settings/Settings";
import { Trash } from "./Apps/Trash";
import { Desktop } from "./Interface/Desktop";
import { DesktopFooter } from "./Interface/DesktopFooter";
import { DesktopIcons } from "./Interface/DesktopIcons";
import { Wallpaper } from "./Interface/Wallpaper";
import { WindowManager } from "./Window/WindowManager";

export interface ExplorerProps {
  customApps?: AppDefinition[];
}

export const Explorer = ({ customApps = [] }: ExplorerProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [windowStates, setWindowStates] = useState<Record<string, boolean>>({});
  const [focusFunctions, setFocusFunctions] = useState<
    Record<string, () => void>
  >({});

  const coreApps: AppDefinition[] = useMemo(
    () => [
      {
        id: "Browser",
        title: "Browser",
        icon: <IconGlobe size={32} />,
        Component: Browser,
      },
      {
        id: "Files",
        title: "Files",
        icon: <IconFolder size={32} />,
        Component: Files,
      },
      {
        id: "Trash",
        title: "Trash",
        icon: <IconTrash size={32} />,
        Component: Trash,
      },
      {
        id: "Settings",
        title: "Settings",
        icon: <IconSettings size={32} />,
        Component: Settings,
      },
    ],
    [],
  );

  const allApps = useMemo(
    () => [...coreApps, ...customApps],
    [coreApps, customApps],
  );

  const allAppsWithSearch = useMemo(
    () => [
      {
        id: "Search",
        title: "Search",
        icon: <IconSearch size={32} />,
        Component: () => null, // Search is generic overlay
      },
      ...allApps,
    ],
    [allApps],
  );

  const handleFocusReady = useCallback((fns: Record<string, () => void>) => {
    setFocusFunctions(fns);
  }, []);

  const openApp = useCallback((id: string) => {
    if (id === "Search") {
      setSearchOpen(true);
    } else {
      setWindowStates((prev) => ({ ...prev, [id]: true }));
    }
  }, []);

  const closeApp = useCallback((id: string) => {
    if (id === "Search") {
      setSearchOpen(false);
    } else {
      setWindowStates((prev) => ({ ...prev, [id]: false }));
    }
  }, []);

  return (
    <ThemeProvider>
      <IconSizeProvider>
        <FooterProvider>
          <WallpaperProvider>
            <DesktopLayoutProvider customApps={customApps}>
              <Wallpaper>
                <WindowManager
                  apps={allApps}
                  openStates={windowStates}
                  onClose={closeApp}
                  onFocusReady={handleFocusReady}
                />

                <Search
                  open={searchOpen}
                  onClose={() => setSearchOpen(false)}
                  appStates={windowStates}
                  openApp={openApp}
                  focusApp={focusFunctions}
                  apps={allApps}
                />

                <Desktop>
                  <DesktopIcons openApp={openApp} />
                </Desktop>

                <DesktopFooter openApp={openApp} apps={allAppsWithSearch} />
              </Wallpaper>
            </DesktopLayoutProvider>
          </WallpaperProvider>
        </FooterProvider>
      </IconSizeProvider>
    </ThemeProvider>
  );
};

export default Explorer;
