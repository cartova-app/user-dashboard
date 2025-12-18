// components/InputWithIcon.js
import { Input } from "@core/components/ui/input";
import { Label } from "@core/components/ui/label";
import { cn } from "@core/lib/utils";
import { forwardRef } from "react";

export const InputWithIcon = forwardRef(function InputWithIcon({
  label,
  id,
  type = "text",
  placeholder = "",
  icon,
  className = "",
  required = false,
  error = "",
  ...props
}, ref) {
  return (
    <div className={cn("space-y-1", className)}>
      {
        label && (
          <Label htmlFor={id} className='text-sm font-medium text-gray-700'>
            {label} {required && <span className='text-red-500'>*</span>}
          </Label>
        )
      }

      <div className='relative'>
        {icon && (
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-3 py-2 h-12  rounded-[12px] border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            icon && "pl-10",
            error && "border-red-500 focus:ring-red-500"
          )}
          required={required}
          {...props}
        />
      </div>
      {error && <p className='text-sm text-red-500 mt-1 text-start'>{error}</p>}
    </div>
  );
});
