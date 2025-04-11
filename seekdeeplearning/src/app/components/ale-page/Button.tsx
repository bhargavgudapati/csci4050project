import React from 'react';

function Button({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button className="custom-buttom" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;