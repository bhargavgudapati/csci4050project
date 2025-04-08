import React from 'react';
import '../styles/Button.css';

function Button({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;