import React from 'react';

export const Button = ({ onClick, text, color, hoverColor, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 p-5 font-semibold text-white rounded-md bg-${color}-600 hover:bg-${hoverColor}-800`}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'blue',
  hoverColor: 'blue',
  icon: null,
};
