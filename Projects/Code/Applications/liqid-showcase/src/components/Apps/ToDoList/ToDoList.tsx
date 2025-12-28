import { IconList } from '@tabler/icons-react';
import { Window } from 'liqid';

interface ToDoListProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const ToDoList = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: ToDoListProps) => {
  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconList size={18} /> To Do List
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="w-full h-full">{/* To Do List content */}</div>
    </Window>
  );
};
