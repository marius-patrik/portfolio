import { AppIcon } from "liqid-components";
import { useDesktopLayout } from "../../hooks/useDesktopLayout";
import { useIconSize } from "../../hooks/useIconSize";

interface DesktopIconsProps {
  openApp: (id: string) => void;
}

export const DesktopIcons = ({ openApp }: DesktopIconsProps) => {
  const { items } = useDesktopLayout();
  const { iconSize, showTitle } = useIconSize();

  const size = iconSize === "small" ? "sm" : "md";

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    const rect = (e.target as Element).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setData(
      "offset",
      JSON.stringify({ x: offsetX, y: offsetY }),
    );
  };

  return (
    <>
      {items.map((item) => {
        return (
          // biome-ignore lint/a11y/useSemanticElements: Wrapper div needed for drag-and-drop functionality
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openApp(item.id);
              }
            }}
            style={{
              position: "absolute",
              left: item.position.x,
              top: item.position.y,
              transition: "left 0.2s, top 0.2s",
            }}
            className="absolute cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <AppIcon
              name={item.label}
              icon={item.icon}
              size={size}
              showTitle={showTitle}
              onClick={() => openApp(item.id)}
            />
          </div>
        );
      })}
    </>
  );
};
