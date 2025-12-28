import { IconMessage } from '@tabler/icons-react';
import { Window } from 'liqid';

interface MessagesProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Messages = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: MessagesProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconMessage size={18} /> Messages
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full">{/* Messages content */}</div>
    </Window>
  );
};
