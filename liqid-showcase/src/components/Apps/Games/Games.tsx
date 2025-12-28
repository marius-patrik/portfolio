import { IconDeviceGamepad } from '@tabler/icons-react';
import { Window } from 'liqid-ui';

interface GamesProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Games = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: GamesProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconDeviceGamepad size={18} /> Games
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full">{/* Games content */}</div>
    </Window>
  );
};
