import { IconNote } from '@tabler/icons-react';
import { Window } from 'liqid';

interface NotesProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Notes = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: NotesProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconNote size={18} /> Notes
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full">{/* Notes content */}</div>
    </Window>
  );
};
