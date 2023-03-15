import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
}) => (
  <button className="Button" onClick={() => onClick()} type="button">
    {children}
  </button>
);
