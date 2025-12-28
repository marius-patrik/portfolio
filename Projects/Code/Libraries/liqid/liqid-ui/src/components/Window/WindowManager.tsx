import { type JSX, useCallback, useEffect, useState } from "react";
import type { AppDefinition } from "../../types";
import { DesktopHeader } from "../Interface/DesktopHeader";

interface WindowManagerProps {
  apps: AppDefinition[];
  openStates: Record<string, boolean>;
  onClose: (id: string) => void;
  onFocusReady?: (focusFunctions: Record<string, () => void>) => void;
}

export const WindowManager = ({
  apps,
  openStates,
  onClose,
  onFocusReady,
}: WindowManagerProps): JSX.Element => {
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [topZ, setTopZ] = useState(1);
  const [resetKeys, setResetKeys] = useState<Record<string, number>>({});

  const bringToFront = useCallback(
    (id: string) => {
      setTopZ((prev) => prev + 1);
      setZIndices((prev) => ({ ...prev, [id]: topZ + 1 }));
    },
    [topZ],
  );

  const resetAndFocus = useCallback(
    (id: string) => {
      bringToFront(id);
      setResetKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    },
    [bringToFront],
  );

  // Watch for newly opened windows to bring them to front
  useEffect(() => {
    for (const [id, isOpen] of Object.entries(openStates)) {
      if (isOpen) {
        // We don't want to bring to front every render, only when it changes to open.
        // But useEffect dependencies on the whole object might trigger too often.
        // However, bringToFront is cheap.
        // A better way is to check if zIndex is not set for it, or use a ref to track previous open states.
        // For now, let's just ensure it has a zIndex.
        if (!zIndices[id]) {
          bringToFront(id);
        }
      }
    }
  }, [openStates, zIndices, bringToFront]);

  useEffect(() => {
    if (onFocusReady) {
      const funcs: Record<string, () => void> = {};
      apps.forEach((app) => {
        funcs[app.id] = () => resetAndFocus(app.id);
      });
      onFocusReady(funcs);
    }
  }, [onFocusReady, resetAndFocus, apps]);

  return (
    <div
      id="window-manager"
      className="w-full h-full system-overlay pointer-events-none"
    >
      <DesktopHeader />

      {apps.map((app) => {
        const isOpen = openStates[app.id] || false;
        const AppComp = app.Component;
        const zIndex = zIndices[app.id] || 1;
        const resetKey = resetKeys[app.id] || 0;

        return (
          <AppComp
            key={app.id}
            isOpen={isOpen}
            handleClose={() => onClose(app.id)}
            zIndex={zIndex}
            onFocus={() => bringToFront(app.id)}
            resetKey={resetKey}
          />
        );
      })}
    </div>
  );
};
