import { IconFolder } from "@tabler/icons-react";
import { Window } from "../Window/Window";

interface FilesProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Files = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: FilesProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconFolder size={18} /> Files
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No files
      </div>
    </Window>
  );
};
