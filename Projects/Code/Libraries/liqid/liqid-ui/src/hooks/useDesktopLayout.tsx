import {
  IconFolder,
  IconGlobe,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { AppDefinition } from "../types";

export type LayoutMode = "grid" | "free";

export interface DesktopItem {
  id: string;
  label: string;
  icon: ReactNode;
  position: { x: number; y: number };
}

interface DesktopLayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  items: DesktopItem[];
  moveIcon: (id: string, position: { x: number; y: number }) => void;
  resetLayout: () => void;
}

const DesktopLayoutContext = createContext<
  DesktopLayoutContextType | undefined
>(undefined);

const GRID_CELL_SIZE = 112;
const COLUMNS = 5;

export const DesktopLayoutProvider = ({
  children,
  customApps = [],
}: {
  children: ReactNode;
  customApps?: AppDefinition[];
}) => {
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>("grid");
  const [items, setItems] = useState<DesktopItem[]>([]);

  // Memoize definitions to prevent re-calculations causing infinite loops if dependencies change
  // specialized generation functions
  const getDefaults = useCallback(
    () => generateDefaultItems(customApps),
    [customApps],
  );

  useEffect(() => {
    const savedMode = localStorage.getItem("desktopLayoutMode") as LayoutMode;
    if (savedMode) setLayoutModeState(savedMode);

    const savedItems = localStorage.getItem("desktopItems");
    const defaults = getDefaults();

    if (savedItems) {
      const parsed = JSON.parse(savedItems);
      setItems(hydrateItems(parsed, defaults));
    } else {
      setItems(defaults);
    }
  }, [getDefaults]);

  const setLayoutMode = (mode: LayoutMode) => {
    setLayoutModeState(mode);
    localStorage.setItem("desktopLayoutMode", mode);

    if (mode === "grid") {
      setItems((prevItems) => {
        const newItems = prevItems.map((item) => {
          const snapX =
            Math.round(item.position.x / GRID_CELL_SIZE) * GRID_CELL_SIZE;
          const snapY =
            Math.round(item.position.y / GRID_CELL_SIZE) * GRID_CELL_SIZE;
          return { ...item, position: { x: snapX, y: snapY } };
        });

        localStorage.setItem(
          "desktopItems",
          JSON.stringify(newItems.map(({ icon, ...rest }) => rest)),
        );
        return newItems;
      });
    }
  };

  const layoutModeRef = useRef(layoutMode);
  useEffect(() => {
    layoutModeRef.current = layoutMode;
  }, [layoutMode]);

  const moveIcon = (id: string, position: { x: number; y: number }) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        if (item.id !== id) return item;

        let finalPos = position;
        if (layoutModeRef.current === "grid") {
          const snapX =
            Math.round(position.x / GRID_CELL_SIZE) * GRID_CELL_SIZE;
          const snapY =
            Math.round(position.y / GRID_CELL_SIZE) * GRID_CELL_SIZE;
          finalPos = { x: snapX, y: snapY };
        }

        return { ...item, position: finalPos };
      });

      localStorage.setItem(
        "desktopItems",
        JSON.stringify(newItems.map(({ icon, ...rest }) => rest)),
      );
      return newItems;
    });
  };

  const resetLayout = () => {
    const defaults = getDefaults();
    setItems(defaults);
    localStorage.setItem(
      "desktopItems",
      JSON.stringify(defaults.map(({ icon, ...rest }) => rest)),
    );
  };

  return (
    <DesktopLayoutContext.Provider
      value={{ layoutMode, setLayoutMode, items, moveIcon, resetLayout }}
    >
      {children}
    </DesktopLayoutContext.Provider>
  );
};

export const useDesktopLayout = () => {
  const context = useContext(DesktopLayoutContext);
  if (context === undefined) {
    throw new Error(
      "useDesktopLayout must be used within a DesktopLayoutProvider",
    );
  }
  return context;
};

// Core apps + Custom apps
function generateDefaultItems(customApps: AppDefinition[]): DesktopItem[] {
  const definitions = [
    { id: "Search", label: "Search", icon: <IconSearch size={32} /> },
    { id: "Browser", label: "Browser", icon: <IconGlobe size={32} /> },
    { id: "Files", label: "Files", icon: <IconFolder size={32} /> },
    { id: "Trash", label: "Trash", icon: <IconTrash size={32} /> },
    { id: "Settings", label: "Settings", icon: <IconSettings size={32} /> },
  ];

  // Add custom apps
  const customDefs = customApps.map((app) => ({
    id: app.id,
    label: app.title,
    icon: app.icon,
  }));

  const allDefs = [...definitions, ...customDefs];

  return allDefs.map((def, index) => {
    const col = index % COLUMNS;
    const row = Math.floor(index / COLUMNS);
    return {
      ...def,
      position: {
        x: 16 + col * GRID_CELL_SIZE,
        y: 16 + row * GRID_CELL_SIZE,
      },
    };
  });
}

function hydrateItems(
  savedItems: Omit<DesktopItem, "icon">[],
  defaults: DesktopItem[],
): DesktopItem[] {
  // Filter out saved items that no longer exist in defaults (e.g. removed custom apps)
  // And add missing defaults (e.g. new custom apps)

  const hydratedSaved = savedItems
    .map((saved) => {
      const def = defaults.find((d) => d.id === saved.id);
      return def ? { ...saved, icon: def.icon } : null;
    })
    .filter((item) => item !== null) as DesktopItem[];

  // Find items present in defaults but not in saved
  const missing = defaults.filter(
    (def) => !hydratedSaved.find((s) => s.id === def.id),
  );

  return [...hydratedSaved, ...missing];
}
