import React from 'react';

const Button = ({
  as: As = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-[--radius-md] font-medium transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]/60 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-card] ' +
    'dark:focus-visible:ring-offset-[--color-bg] disabled:opacity-60 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
  };

  const variants = {
    primary:
      'bg-[--color-accent] text-white hover:opacity-95 active:opacity-90',
    outline:
      'bg-transparent text-[--color-accent] border border-[--color-accent] ' +
      'hover:bg-[--color-accent] hover:text-white',
    ghost:
      'bg-[--color-card] text-[--color-fg] hover:bg-[--color-muted]/30 ' +
      'border border-transparent',
    subtle:
      'bg-white text-[--color-accent] border border-[--color-accent]/20 ' +
      'hover:border-[--color-accent]/40 dark:bg-[--color-card] dark:text-[--color-fg]',
  };

  return (
    <As
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;
