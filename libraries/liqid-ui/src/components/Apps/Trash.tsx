import { IconTrash } from "@tabler/icons-react";
import { Window } from "../Window/Window";

interface TrashProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Trash = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: TrashProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconTrash size={18} /> Trash
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Trash is empty
      </div>
    </Window>
  );
};
