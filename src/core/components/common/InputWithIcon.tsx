// components/InputWithIcon.js

import { forwardRef } from 'react';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { cn } from '@/core/lib/utils';

export type InputWithIconProps = {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputWithIcon = forwardRef(function InputWithIcon(
  {
    label,
    id,
    type = 'text',
    placeholder = '',
    icon,
    className = '',
    required = false,
    error = '',
    ...props
  }: InputWithIconProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">{icon}</div>}
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-3 py-2 h-12  rounded-[12px] border-2 border-input focus:ring-2 focus:ring-ring focus:border-ring',
            icon && 'pl-10',
            error && 'border-destructive focus:ring-destructive',
          )}
          required={required}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-destructive mt-1 text-start">{error}</p>}
    </div>
  );
});
