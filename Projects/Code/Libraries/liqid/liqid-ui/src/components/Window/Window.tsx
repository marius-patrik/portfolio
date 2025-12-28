import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconMaximize,
  IconMinimize,
  IconX,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface WindowProps {
  title: React.ReactNode;
  handleClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

const getDefaultDimensions = () => {
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 800;
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 600;

  let defaultWidth = 320;
  if (viewportWidth >= 1536) defaultWidth = 768;
  else if (viewportWidth >= 1280) defaultWidth = 672;
  else if (viewportWidth >= 1024) defaultWidth = 576;
  else if (viewportWidth >= 768) defaultWidth = 512;
  else if (viewportWidth >= 640) defaultWidth = 448;
  else if (viewportWidth >= 475) defaultWidth = 384;

  const maxHeight = Math.floor(viewportHeight * 0.75);
  const defaultHeight = Math.min(400, maxHeight);

  return {
    position: {
      x: Math.max(0, (viewportWidth - defaultWidth) / 2),
      y: Math.max(0, (viewportHeight - defaultHeight) / 2),
    },
    size: { width: defaultWidth, height: defaultHeight },
  };
};

export const Window = ({
  title,
  handleClose,
  children,
  isOpen,
  zIndex,
  onFocus,
  resetKey = 0,
}: WindowProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(
    () => getDefaultDimensions().position,
  );
  const [size, setSize] = useState(() => getDefaultDimensions().size);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const initialResetKey = useRef(resetKey);

  useEffect(() => {
    if (resetKey !== initialResetKey.current) {
      const defaults = getDefaultDimensions();
      setPosition(defaults.position);
      setSize(defaults.size);
      setIsFullscreen(false);
      setIsMaximized(false);
      initialResetKey.current = resetKey;
    }
  }, [resetKey]);

  const handleFullscreen = () => {
    setIsFullscreen(true);
    setIsMaximized(false);
  };

  const cancelFullscreen = () => {
    setIsFullscreen(false);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsFullscreen(false);
    setIsMaximized(true);
  };

  const cancelMaximize = () => {
    setIsFullscreen(false);
    setIsMaximized(false);
  };

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isFullscreen || isMaximized) return;
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position, isFullscreen, isMaximized],
  );

  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isFullscreen || isMaximized) return;
      e.stopPropagation();
      setIsResizing(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      };
    },
    [size, isFullscreen, isMaximized],
  );

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        setSize({
          width: Math.max(200, resizeStart.current.width + deltaX),
          height: Math.max(150, resizeStart.current.height + deltaY),
        });
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, isResizing]);

  if (!isOpen) return null;

  const windowStyle =
    isFullscreen || isMaximized
      ? { zIndex: isFullscreen ? 9998 : zIndex }
      : {
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          zIndex,
        };

  return (
    <div
      role="dialog"
      style={windowStyle}
      onMouseDown={onFocus}
      className={`glass absolute rounded-3xl min-w-xs p-2 flex flex-col gap-1 animate-scale-in pointer-events-auto ${isMaximized ? "left-0! top-6! w-full! h-[calc(99vh-1rem)]!" : ""} ${isFullscreen ? "left-0! top-0! w-full! h-full! rounded-none" : ""}`}
    >
      <div
        role="toolbar"
        className="flex flex-row gap-1 cursor-move select-none touch-none"
        onPointerDown={handlePointerDown}
        onDoubleClick={() => {
          if (isMaximized || isFullscreen) {
            cancelMaximize();
          } else {
            handleMaximize();
          }
        }}
      >
        <div className="glass rounded-xl rounded-tl-2xl p-3 flex flex-row w-full">
          {title}
        </div>

        {/* biome-ignore lint/a11y/useSemanticElements: Using div for styling control buttons container instead of fieldset */}
        <div
          role="group"
          className="glass rounded-xl rounded-tr-2xl p-3 flex flex-row ml-auto gap-2"
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <IconX
            size={20}
            className="button hover-scale"
            onClick={handleClose}
          />

          {isMaximized ? (
            <IconMinimize
              size={20}
              className="button hover-scale"
              onClick={isMaximized ? cancelMaximize : handleMaximize}
            />
          ) : (
            <IconMaximize
              size={20}
              className="button hover-scale"
              onClick={isMaximized ? cancelMaximize : handleMaximize}
            />
          )}

          {isFullscreen ? (
            <IconArrowsMinimize
              size={20}
              className="button hover-scale"
              onClick={isFullscreen ? cancelFullscreen : handleFullscreen}
            />
          ) : (
            <IconArrowsMaximize
              size={20}
              className="button hover-scale"
              onClick={isFullscreen ? cancelFullscreen : handleFullscreen}
            />
          )}
        </div>
      </div>

      <div className="glass rounded-xl rounded-b-2xl w-full h-full p-2 overflow-auto">
        {children}
      </div>

      {!isFullscreen && !isMaximized && (
        <div
          className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize touch-none"
          onPointerDown={handleResizePointerDown}
        />
      )}
    </div>
  );
};
