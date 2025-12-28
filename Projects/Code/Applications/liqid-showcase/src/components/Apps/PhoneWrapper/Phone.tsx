import { IconPhone } from '@tabler/icons-react';
import { Window } from 'liqid';

interface PhoneProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Phone = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: PhoneProps) => {
  // Phonebooth client runs on port 3001
  const phoneBoothUrl = 'https://localhost:3001';

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconPhone size={18} /> Phone
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <iframe
        src={phoneBoothUrl}
        title="Phonebooth"
        className="w-full h-full border-none bg-white"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </Window>
  );
};
