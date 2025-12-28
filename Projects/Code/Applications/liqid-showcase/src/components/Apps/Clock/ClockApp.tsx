import { IconClock } from '@tabler/icons-react';
import { Window } from 'liqid';
import { useEffect, useState } from 'react';

interface ClockAppProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const ClockApp = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: ClockAppProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconClock size={18} /> Clock
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-4xl font-semibold">{formattedTime}</span>
      </div>
    </Window>
  );
};
