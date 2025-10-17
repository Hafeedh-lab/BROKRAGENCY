'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-900',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-brand-navy',
    danger: 'bg-danger/10 text-danger',
    info: 'bg-info/10 text-brand-blue',
    gold: 'bg-brand-gold/10 text-brand-navy border border-brand-gold/30',
  } as const;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  } as const;

  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
