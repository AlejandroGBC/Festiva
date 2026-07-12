import React from 'react';
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from './ButtonVariants';

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {};

export default function Button({ variant, size, shape, className, ...props }: ButtonProps) {
  return (
    <button 
      className={buttonVariants({ variant, size, shape, className: `${className || ""} relative z-50` })} 
      {...props} 
    />
  );
}
