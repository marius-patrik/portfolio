import { IconChartLine } from '@tabler/icons-react';
import { Window } from 'liqid';

interface TradeBotProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const TradeBot = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: TradeBotProps) => {
  // TradeBot client runs on port 3000
  const tradeBotUrl = 'http://localhost:3000';

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconChartLine size={18} /> TradeBot
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <iframe
        src={tradeBotUrl}
        title="TradeBot"
        className="w-full h-full border-none bg-white"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </Window>
  );
};
