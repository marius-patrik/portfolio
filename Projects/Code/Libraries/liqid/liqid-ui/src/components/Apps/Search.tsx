import { IconSearch } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import type { AppDefinition } from "../../types";

interface SearchProps {
  open: boolean;
  onClose: () => void;
  appStates: Record<string, boolean>;
  openApp: (id: string) => void;
  focusApp: Record<string, () => void>;
  apps: AppDefinition[];
}

export const Search = ({
  open,
  onClose,
  appStates,
  openApp,
  focusApp,
  apps,
}: SearchProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    if (!query.trim()) return apps;
    return apps.filter((app) =>
      app.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, apps]);

  const handleAppAction = (appId: string) => {
    if (appStates[appId] && focusApp[appId]) {
      focusApp[appId]();
    } else {
      openApp(appId);
    }
    setIsClosing(true);
  };

  if (!open) return null;

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false);
      setQuery("");
      onClose();
    }
  };

  return (
    <div
      id="search-overlay"
      role="dialog"
      className="system-overlay-50 inset-0 w-full h-full flex items-center justify-center"
      onClick={handleClose}
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
    >
      <div
        role="document"
        className={`glass rounded-4xl p-2 sm:min-w-sm md:min-w-xl flex flex-col gap-2 ${isClosing ? "animate-scale-out" : "animate-scale-in"}`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          id="search"
          className="flex flex-row items-center gap-2 p-3 glass rounded-4xl"
        >
          <IconSearch />
          <input
            type="text"
            className="outline-none bg-transparent w-full"
            placeholder="Search apps..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filteredApps.length > 0) {
                handleAppAction(filteredApps[0].id);
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-1 p-2 glass w-full rounded-4xl max-h-64 overflow-y-auto">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <button
                key={app.id}
                type="button"
                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer text-left"
                onClick={() => handleAppAction(app.id)}
              >
                {app.icon}
                <span className="font-medium">{app.title}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-400 py-2">No apps found</p>
          )}
        </div>
      </div>
    </div>
  );
};
