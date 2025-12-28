import type { ReactNode } from "react";
import { useDesktopLayout } from "../../hooks/useDesktopLayout";

interface DesktopProps {
  children: ReactNode;
}

export const Desktop = ({ children }: DesktopProps) => {
  const { moveIcon } = useDesktopLayout();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const offsetData = e.dataTransfer.getData("offset");

    if (id) {
      const desktopRect = e.currentTarget.getBoundingClientRect();
      let offsetX = 0;
      let offsetY = 0;

      try {
        if (offsetData) {
          const parsed = JSON.parse(offsetData);
          offsetX = parsed.x;
          offsetY = parsed.y;
        }
      } catch {
        // Fallback if no offset data
      }

      const x = e.clientX - desktopRect.left - offsetX;
      const y = e.clientY - desktopRect.top - offsetY;

      moveIcon(id, { x, y });
    }
  };

  return (
    <div
      id="desktop"
      role="application"
      className="relative w-full h-[calc(100vh-8rem)] mt-8"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
