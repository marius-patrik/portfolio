import { IconPokeball } from '@tabler/icons-react';
import { Window } from 'liqid';

interface PokedexProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Pokedex = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: PokedexProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconPokeball size={18} /> Pokédex
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full">{/* Pokédex content */}</div>
    </Window>
  );
};
