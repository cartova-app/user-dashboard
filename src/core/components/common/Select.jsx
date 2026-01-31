// components/SelectWithIcon.js
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@core/components/ui/select";
import { Label } from "@core/components/ui/label";
import { cn } from "@core/lib/utils";
import { forwardRef } from "react";

export const SelectWithIcon = forwardRef(function SelectWithIcon(
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
    ref
) {
    return (
        <div className={cn("space-y-1", className)}>
            {/* Label */}
            {label && (
                <Label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
            )}

            {/* Select */}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        {icon}
                    </div>
                )}

                <Select
                    value={value}
                    onValueChange={onValueChange}
                    disabled={disabled}
                >
                    <SelectTrigger
                        ref={ref}
                        id={id}
                        className={cn(
                            "w-full h-12! rounded-[12px] border-2 border-gray-300 px-3",
                            "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                            icon && "pl-10",
                            error && "border-red-500 focus:ring-red-500"
                        )}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-red-500 mt-1 text-start">
                    {error}
                </p>
            )}
        </div>
    );
});
