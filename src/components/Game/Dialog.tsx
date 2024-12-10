import React from 'react';

interface DialogProps {
  text: string;
  onClose: () => void;
}

export const Dialog: React.FC<DialogProps> = ({ text, onClose }) => {
  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/90 text-white p-6 rounded-lg max-w-md">
      <p className="text-lg">{text}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
      >
        Continue
      </button>
    </div>
  );
};