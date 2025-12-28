import { useState } from 'react';

interface ModalProps {
  saveButton?: React.ReactNode;
  closeButton?: React.ReactNode;

  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
}

export const Modal = ({
  children,
  onClose,
  onSave,
  closeButton,
  saveButton,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <div
      id="Modal"
      className="system-overlay w-full h-full flex items-center justify-center z-9999"
      onClick={handleClose}
    >
      <div
        className={`glass rounded-4xl p-2 flex flex-col gap-2 ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}

        <div className="flex flex-row grow w-full gap-2">
          {closeButton ?? (
            <button
              className="button glass rounded-4xl p-3 grow"
              onClick={handleClose}
            >
              Close
            </button>
          )}
          {saveButton ?? (
            <button
              className="button selected rounded-4xl p-3 grow"
              onClick={onSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
