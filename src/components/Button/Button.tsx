import React, { MouseEventHandler } from 'react';

type ButtonProps = {
  title: string;
  onClick: () => void;
  type?: 'submit' | 'reset';
};

const Button = ({ title, onClick, type }: ButtonProps) => {
  return (
    <button type={type ? type : 'button'} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
