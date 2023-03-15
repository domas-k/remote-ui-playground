import React from 'react';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<Props> = ({
  onClick,
  children,
}) => (
  <button className="Button" onClick={() => onClick()} type="button">
    {children}
  </button>
);
