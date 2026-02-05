// components/PasswordInputWithIcon.js
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { cn } from "@/core/lib/utils";
import { forwardRef, useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputWithIconProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  error?: string;
}

export const PasswordInputWithIcon = forwardRef<
  HTMLInputElement,
  PasswordInputWithIconProps
>(function PasswordInputWithIcon(
  {
    label,
    id,
    placeholder = "",
    className = "",
    required = false,
    error = "",
    ...props
  },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="relative">
        {/* Default Password Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Lock size={18} />
        </div>

        {/* Show/Hide Password Toggle */}
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        <Input
          ref={ref}
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-2 h-12 rounded-[12px] border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error && "border-red-500 focus:ring-red-500",
          )}
          required={required}
          {...props}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1 text-start">{error}</p>}
    </div>
  );
});
