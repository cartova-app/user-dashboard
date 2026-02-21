// components/SelectWithIcon.js
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Label } from "@/core/components/ui/label";
import { cn } from "@/core/lib/utils";
import { forwardRef, ReactNode } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectWithIconProps {
  label?: string;
  id?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
  options?: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const SelectWithIcon = forwardRef<
  HTMLButtonElement,
  SelectWithIconProps
>(function SelectWithIcon(
  {
    label,
    id,
    placeholder = "Select...",
    icon,
    className = "",
    required = false,
    error = "",
    options = [],
    value,
    onValueChange,
    disabled = false,
  },
  ref,
) {
  return (
    <div className={cn("space-y-1", className)}>
      {/* Label */}
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      {/* Select */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {icon}
          </div>
        )}

        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            id={id}
            className={cn(
              "w-full h-12! rounded-[12px] border-2 border-input px-3",
              "focus:ring-2 focus:ring-ring focus:border-ring",
              icon && "pl-10",
              error && "border-destructive focus:ring-destructive",
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive mt-1 text-start">{error}</p>
      )}
    </div>
  );
});
