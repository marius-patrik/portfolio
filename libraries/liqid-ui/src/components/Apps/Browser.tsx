import { IconGlobe } from "@tabler/icons-react";
import { Window } from "../Window/Window";

interface BrowserProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Browser = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: BrowserProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconGlobe size={18} /> Browser
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Browser content
      </div>
    </Window>
  );
};
