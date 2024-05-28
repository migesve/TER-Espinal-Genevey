import React from 'react';

export const Button = ({ onClick, text, color, hoverColor, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 p-5 font-semibold text-white rounded-md ${color} ${hoverColor}`}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'bg-blue-600',
  hoverColor: 'hover:bg-blue-800',
  icon: null,
};
