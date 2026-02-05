// components/ui/SearchInput.tsx
"use client";

import { Search, X } from "lucide-react";
import React, {
  forwardRef,
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { cn } from "@/core/lib/utils";

type SearchInputSize = "sm" | "md" | "lg";
type SearchInputVariant = "default" | "ghost" | "filled";

interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  showClearButton?: boolean;
  icon?: ReactNode;
  variant?: SearchInputVariant;
  size?: SearchInputSize;
  isLoading?: boolean;
  debounceMs?: number;
  containerClassName?: string;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onSearch,
      placeholder = "Search...",
      showClearButton = true,
      icon,
      variant = "default",
      size = "md",
      isLoading = false,
      debounceMs,
      containerClassName,
      className,
      onKeyDown,
      ...inputProps
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const [isDebouncing, setIsDebouncing] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    // Handle debouncing if debounceMs is provided
    React.useEffect(() => {
      if (debounceMs) {
        setIsDebouncing(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          onChange(internalValue);
          setIsDebouncing(false);
        }, debounceMs);

        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      } else {
        setInternalValue(value);
      }
    }, [internalValue, debounceMs, onChange, value]);

    // Sync with external value changes
    React.useEffect(() => {
      if (!debounceMs) {
        setInternalValue(value);
      }
    }, [value, debounceMs]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      // Immediate update if no debouncing
      if (!debounceMs) {
        onChange(newValue);
      }
    };

    const handleClear = () => {
      setInternalValue("");
      onChange("");
      if (debounceMs) {
        setIsDebouncing(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // Trigger search on Enter
      if (e.key === "Enter" && onSearch) {
        onSearch(internalValue);
      }

      // Clear on Escape
      if (e.key === "Escape") {
        handleClear();
      }

      onKeyDown?.(e);
    };

    const handleSearchClick = () => {
      if (onSearch) {
        onSearch(internalValue);
      }
    };

    const isClearable =
      showClearButton && internalValue?.length > 0 && !isLoading;

    // Size classes
    const sizeClasses: Record<SearchInputSize, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-4 text-lg",
    };

    // Variant classes
    const variantClasses: Record<SearchInputVariant, string> = {
      default:
        "border border-input bg-background hover:border-ring focus:border-ring focus:ring-2 focus:ring-ring/20",
      ghost:
        "border border-transparent bg-transparent hover:bg-accent focus:bg-background focus:border-input",
      filled:
        "border border-transparent bg-muted hover:bg-muted/80 focus:bg-background focus:border-ring focus:ring-2 focus:ring-ring/20",
    };

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <div className="relative">
          {/* Search Icon */}
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              "flex items-center justify-center",
              "text-muted-foreground",
              isLoading && "text-primary",
            )}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : icon ? (
              icon
            ) : (
              <Search className="h-4 w-4" />
            )}
          </div>

          {/* Input */}
          <input
            ref={ref}
            type="search"
            role="searchbox"
            value={debounceMs ? internalValue : value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-lg",
              "outline-none transition-all duration-200",
              "text-foreground placeholder:text-muted-foreground",
              "disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size],
              variantClasses[variant],
              "pl-10", // Padding for icon
              isClearable && "pr-10", // Padding for clear button
              "focus:outline-none",
              className,
            )}
            aria-label={placeholder}
            {...inputProps}
          />

          {/* Clear Button */}
          {isClearable && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "flex items-center justify-center",
                "h-5 w-5 rounded-full",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-accent",
                "transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring/20",
              )}
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          )}

          {/* Search Button (only when onSearch is provided) */}
          {onSearch && !isClearable && (
            <button
              type="button"
              onClick={handleSearchClick}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "flex items-center justify-center",
                "h-6 w-6 rounded",
                "text-muted-foreground hover:text-primary",
                "hover:bg-accent",
                "transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring/20",
              )}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          {/* Debouncing Indicator */}
          {isDebouncing && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            </div>
          )}
        </div>

        {/* Optional character count */}
        {inputProps.maxLength && (
          <div className="mt-1 text-right text-xs text-muted-foreground">
            {internalValue.length} / {inputProps.maxLength}
          </div>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
