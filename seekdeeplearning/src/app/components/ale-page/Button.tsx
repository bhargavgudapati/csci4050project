import React from 'react';

function Button({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      className={`px-6 py-3 rounded-full font-medium shadow-md transition-all duration-200 ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-[#D4DCFF] text-black hover:bg-[#c3d2ff]'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;