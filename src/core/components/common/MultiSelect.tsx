import * as React from "react";
import { cva } from "class-variance-authority";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
  LucideIcon,
} from "lucide-react";

import { cn } from "@/core/lib/utils";
import { Separator } from "@/core/components/ui/separator";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Label } from "@/core/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/core/components/ui/command";

// Type definitions
interface OptionStyle {
  badgeColor?: string;
  gradient?: string;
  iconColor?: string;
}

interface MultiSelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  style?: OptionStyle;
}

interface OptionGroup {
  heading: string;
  options: MultiSelectOption[];
}

type ScreenSize = "mobile" | "tablet" | "desktop";

interface ResponsiveSettings {
  maxCount?: number;
  hideIcons?: boolean;
  compactMode?: boolean;
}

interface AnimationConfig {
  badgeAnimation?: "bounce" | "pulse" | "wiggle" | "fade" | "slide" | "none";
  popoverAnimation?: "scale" | "slide" | "fade" | "flip" | "none";
  duration?: number;
  delay?: number;
}

interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: MultiSelectOption[] | OptionGroup[];
  onValueChange: (values: string[]) => void;
  variant?: "default" | "secondary" | "destructive" | "inverted";
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  animationConfig?: AnimationConfig;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
  hideSelectAll?: boolean;
  searchable?: boolean;
  emptyIndicator?: React.ReactNode;
  autoSize?: boolean;
  singleLine?: boolean;
  popoverClassName?: string;
  disabled?: boolean;
  responsive?: boolean | Record<ScreenSize, ResponsiveSettings>;
  minWidth?: string;
  maxWidth?: string;
  deduplicateOptions?: boolean;
  resetOnDefaultValueChange?: boolean;
  closeOnSelect?: boolean;
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  value?: string[];
}

export interface MultiSelectRef {
  reset: () => void;
  getSelectedValues: () => string[];
  setSelectedValues: (values: string[]) => void;
  clear: () => void;
  focus: () => void;
}

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva("m-1 transition-all duration-300 ease-in-out", {
  variants: {
    variant: {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
    },
    badgeAnimation: {
      bounce: "hover:-translate-y-1 hover:scale-110",
      pulse: "hover:animate-pulse",
      wiggle: "hover:animate-wiggle",
      fade: "hover:opacity-80",
      slide: "hover:translate-x-1",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    badgeAnimation: "bounce",
  },
});

export const MultiSelect = React.forwardRef<MultiSelectRef, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      animationConfig,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      hideSelectAll = false,
      searchable = true,
      emptyIndicator,
      autoSize = false,
      singleLine = false,
      popoverClassName,
      disabled = false,
      responsive,
      minWidth,
      maxWidth,
      deduplicateOptions = false,
      resetOnDefaultValueChange = true,
      closeOnSelect = false,
      label,
      icon,
      error,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState("");

    const [politeMessage, setPoliteMessage] = React.useState("");
    const [assertiveMessage, setAssertiveMessage] = React.useState("");
    const prevSelectedCount = React.useRef(selectedValues.length);
    const prevIsOpen = React.useRef(isPopoverOpen);
    const prevSearchValue = React.useRef(searchValue);

    const announce = React.useCallback(
      (message: React.SetStateAction<string>, priority = "polite") => {
        if (priority === "assertive") {
          setAssertiveMessage(message);
          setTimeout(() => setAssertiveMessage(""), 100);
        } else {
          setPoliteMessage(message);
          setTimeout(() => setPoliteMessage(""), 100);
        }
      },
      [],
    );

    const multiSelectId = React.useId();
    const listboxId = `${multiSelectId}-listbox`;
    const triggerDescriptionId = `${multiSelectId}-description`;
    const selectedCountId = `${multiSelectId}-count`;

    const prevDefaultValueRef = React.useRef(defaultValue);

    const isGroupedOptions = React.useCallback(
      (opts: MultiSelectOption[] | OptionGroup[]): opts is OptionGroup[] => {
        return opts.length > 0 && "heading" in opts[0];
      },
      [],
    );

    const arraysEqual = React.useCallback(
      (a: string[], b: string[]): boolean => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, index) => val === sortedB[index]);
      },
      [],
    );

    const resetToDefault = React.useCallback(() => {
      setSelectedValues(defaultValue);
      setIsPopoverOpen(false);
      setSearchValue("");
      onValueChange(defaultValue);
    }, [defaultValue, onValueChange]);

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        reset: resetToDefault,
        getSelectedValues: () => selectedValues,
        setSelectedValues: (values) => {
          setSelectedValues(values);
          onValueChange(values);
        },
        clear: () => {
          setSelectedValues([]);
          onValueChange([]);
        },
        focus: () => {
          if (buttonRef.current) {
            buttonRef.current.focus();
            const originalOutline = buttonRef.current.style.outline;
            const originalOutlineOffset = buttonRef.current.style.outlineOffset;
            buttonRef.current.style.outline = "2px solid hsl(var(--ring))";
            buttonRef.current.style.outlineOffset = "2px";
            setTimeout(() => {
              if (buttonRef.current) {
                buttonRef.current.style.outline = originalOutline;
                buttonRef.current.style.outlineOffset = originalOutlineOffset;
              }
            }, 1000);
          }
        },
      }),
      [resetToDefault, selectedValues, onValueChange],
    );

    const [screenSize, setScreenSize] = React.useState<ScreenSize>("desktop");

    React.useEffect(() => {
      if (typeof window === "undefined") return;
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) {
          setScreenSize("mobile");
        } else if (width < 1024) {
          setScreenSize("tablet");
        } else {
          setScreenSize("desktop");
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("resize", handleResize);
        }
      };
    }, []);

    const getResponsiveSettings = () => {
      if (!responsive) {
        return {
          maxCount: maxCount,
          hideIcons: false,
          compactMode: false,
        };
      }
      if (responsive === true) {
        const defaultResponsive = {
          mobile: { maxCount: 2, hideIcons: false, compactMode: true },
          tablet: { maxCount: 4, hideIcons: false, compactMode: false },
          desktop: { maxCount: 6, hideIcons: false, compactMode: false },
        };
        const currentSettings = defaultResponsive[screenSize];
        return {
          maxCount: currentSettings?.maxCount ?? maxCount,
          hideIcons: currentSettings?.hideIcons ?? false,
          compactMode: currentSettings?.compactMode ?? false,
        };
      }
      const currentSettings = responsive[screenSize];
      return {
        maxCount: currentSettings?.maxCount ?? maxCount,
        hideIcons: currentSettings?.hideIcons ?? false,
        compactMode: currentSettings?.compactMode ?? false,
      };
    };

    const responsiveSettings = getResponsiveSettings();

    const getBadgeAnimationClass = () => {
      if (animationConfig?.badgeAnimation) {
        switch (animationConfig.badgeAnimation) {
          case "bounce":
            return isAnimating
              ? "animate-bounce"
              : "hover:-translate-y-1 hover:scale-110";
          case "pulse":
            return "hover:animate-pulse";
          case "wiggle":
            return "hover:animate-wiggle";
          case "fade":
            return "hover:opacity-80";
          case "slide":
            return "hover:translate-x-1";
          case "none":
            return "";
          default:
            return "";
        }
      }
      return isAnimating ? "animate-bounce" : "";
    };

    const getPopoverAnimationClass = () => {
      if (animationConfig?.popoverAnimation) {
        switch (animationConfig.popoverAnimation) {
          case "scale":
            return "animate-scaleIn";
          case "slide":
            return "animate-slideInDown";
          case "fade":
            return "animate-fadeIn";
          case "flip":
            return "animate-flipIn";
          case "none":
            return "";
          default:
            return "";
        }
      }
      return "";
    };

    const getAllOptions = React.useCallback(() => {
      if (options.length === 0) return [];
      let allOptions: MultiSelectOption[];
      if (isGroupedOptions(options)) {
        allOptions = options.flatMap((group) => group.options);
      } else {
        allOptions = options as MultiSelectOption[];
      }
      const valueSet = new Set<string>();
      const duplicates: string[] = [];
      const uniqueOptions: MultiSelectOption[] = [];
      allOptions.forEach((option: MultiSelectOption) => {
        if (valueSet.has(option.value)) {
          duplicates.push(option.value);
          if (!deduplicateOptions) {
            uniqueOptions.push(option);
          }
        } else {
          valueSet.add(option.value);
          uniqueOptions.push(option);
        }
      });
      if (process.env.NODE_ENV === "development" && duplicates.length > 0) {
        const action = deduplicateOptions
          ? "automatically removed"
          : "detected";
        console.warn(
          `MultiSelect: Duplicate option values ${action}: ${duplicates.join(
            ", ",
          )}. ` +
            `${
              deduplicateOptions
                ? "Duplicates have been removed automatically."
                : "This may cause unexpected behavior. Consider setting 'deduplicateOptions={true}' or ensure all option values are unique."
            }`,
        );
      }
      return deduplicateOptions ? uniqueOptions : allOptions;
    }, [options, deduplicateOptions, isGroupedOptions]);

    const getOptionByValue = React.useCallback(
      (value: string): MultiSelectOption | undefined => {
        const option = getAllOptions().find((opt) => opt.value === value);
        if (!option && process.env.NODE_ENV === "development") {
          console.warn(
            `MultiSelect: Option with value "${value}" not found in options list`,
          );
        }
        return option;
      },
      [getAllOptions],
    );

    const filteredOptions = React.useMemo(():
      | MultiSelectOption[]
      | OptionGroup[] => {
      if (!searchable || !searchValue) return options;
      if (options.length === 0) return [];
      if (isGroupedOptions(options)) {
        return options
          .map((group) => ({
            ...group,
            options: group.options.filter(
              (option: MultiSelectOption) =>
                option.label
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) ||
                option.value.toLowerCase().includes(searchValue.toLowerCase()),
            ),
          }))
          .filter((group) => group.options.length > 0);
      }
      return (options as MultiSelectOption[]).filter(
        (option: MultiSelectOption) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
          option.value.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [options, searchValue, searchable, isGroupedOptions]);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (optionValue: string) => {
      if (disabled) return;
      const option = getOptionByValue(optionValue);
      if (option?.disabled) return;
      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((value) => value !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
      if (closeOnSelect) {
        setIsPopoverOpen(false);
      }
    };

    const handleClear = () => {
      if (disabled) return;
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      if (disabled) return;
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      if (disabled) return;
      const newSelectedValues = selectedValues.slice(
        0,
        responsiveSettings.maxCount,
      );
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (disabled) return;
      const allOptions = getAllOptions().filter((option) => !option.disabled);
      if (selectedValues.length === allOptions.length) {
        handleClear();
      } else {
        const allValues = allOptions.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }

      if (closeOnSelect) {
        setIsPopoverOpen(false);
      }
    };

    React.useEffect(() => {
      if (!resetOnDefaultValueChange) return;
      const prevDefaultValue = prevDefaultValueRef.current;
      if (!arraysEqual(prevDefaultValue, defaultValue)) {
        if (!arraysEqual(selectedValues, defaultValue)) {
          setSelectedValues(defaultValue);
        }
        prevDefaultValueRef.current = [...defaultValue];
      }
    }, [defaultValue, selectedValues, arraysEqual, resetOnDefaultValueChange]);

    const getWidthConstraints = () => {
      const defaultMinWidth = screenSize === "mobile" ? "0px" : "200px";
      const effectiveMinWidth = minWidth || defaultMinWidth;
      const effectiveMaxWidth = maxWidth || "100%";
      return {
        minWidth: effectiveMinWidth,
        maxWidth: effectiveMaxWidth,
        width: autoSize ? "auto" : "100%",
      };
    };

    const widthConstraints = getWidthConstraints();

    React.useEffect(() => {
      if (!isPopoverOpen) {
        setSearchValue("");
      }
    }, [isPopoverOpen]);

    React.useEffect(() => {
      const selectedCount = selectedValues.length;
      const allOptions = getAllOptions();
      const totalOptions = allOptions.filter((opt) => !opt.disabled).length;
      if (selectedCount !== prevSelectedCount.current) {
        const diff = selectedCount - prevSelectedCount.current;
        if (diff > 0) {
          const addedItems = selectedValues.slice(-diff);
          const addedLabels = addedItems
            .map(
              (value) => allOptions.find((opt) => opt.value === value)?.label,
            )
            .filter(Boolean);

          if (addedLabels.length === 1) {
            announce(
              `${addedLabels[0]} selected. ${selectedCount} of ${totalOptions} options selected.`,
            );
          } else {
            announce(
              `${addedLabels.length} options selected. ${selectedCount} of ${totalOptions} total selected.`,
            );
          }
        } else if (diff < 0) {
          announce(
            `Option removed. ${selectedCount} of ${totalOptions} options selected.`,
          );
        }
        prevSelectedCount.current = selectedCount;
      }

      if (isPopoverOpen !== prevIsOpen.current) {
        if (isPopoverOpen) {
          announce(
            `Dropdown opened. ${totalOptions} options available. Use arrow keys to navigate.`,
          );
        } else {
          announce("Dropdown closed.");
        }
        prevIsOpen.current = isPopoverOpen;
      }

      if (
        searchValue !== prevSearchValue.current &&
        searchValue !== undefined
      ) {
        if (searchValue && isPopoverOpen) {
          const filteredCount = allOptions.filter(
            (opt) =>
              opt.label.toLowerCase().includes(searchValue.toLowerCase()) ||
              opt.value.toLowerCase().includes(searchValue.toLowerCase()),
          ).length;

          announce(
            `${filteredCount} option${
              filteredCount === 1 ? "" : "s"
            } found for "${searchValue}"`,
          );
        }
        prevSearchValue.current = searchValue;
      }
    }, [selectedValues, isPopoverOpen, searchValue, announce, getAllOptions]);

    return (
      <div className="space-y-1">
        {label && (
          <Label className="text-sm font-medium text-foreground">{label}</Label>
        )}
        <div className="sr-only">
          <div aria-live="polite" aria-atomic="true" role="status">
            {politeMessage}
          </div>
          <div aria-live="assertive" aria-atomic="true" role="alert">
            {assertiveMessage}
          </div>
        </div>

        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <div id={triggerDescriptionId} className="sr-only">
            Multi-select dropdown. Use arrow keys to navigate, Enter to select,
            and Escape to close.
          </div>
          <div id={selectedCountId} className="sr-only" aria-live="polite">
            {selectedValues.length === 0
              ? "No options selected"
              : `${selectedValues.length} option${
                  selectedValues.length === 1 ? "" : "s"
                } selected: ${selectedValues
                  .map((value) => getOptionByValue(value)?.label)
                  .filter(Boolean)
                  .join(", ")}`}
          </div>

          <PopoverTrigger asChild>
            <Button
              ref={buttonRef}
              {...props}
              onClick={handleTogglePopover}
              disabled={disabled}
              role="combobox"
              aria-expanded={isPopoverOpen}
              aria-haspopup="listbox"
              aria-controls={isPopoverOpen ? listboxId : undefined}
              aria-describedby={`${triggerDescriptionId} ${selectedCountId}`}
              aria-label={`Multi-select: ${selectedValues.length} of ${
                getAllOptions().length
              } options selected. ${placeholder}`}
              className={cn(
                "relative flex py-2 rounded-[12px] border-2 min-h-12 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
                icon ? "pl-10 pr-3" : "pl-3 pr-3",
                autoSize ? "w-auto" : "w-full",
                responsiveSettings.compactMode && "min-h-8 text-sm",
                screenSize === "mobile" && "min-h-12 text-base",
                disabled && "opacity-50 cursor-not-allowed",
                className,
                error ? "!border-destructive" : "border-input",
              )}
              style={{
                ...widthConstraints,
                maxWidth: `min(${widthConstraints.maxWidth}, 100%)`,
              }}
            >
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  {icon}
                </div>
              )}
              {selectedValues.length > 0 ? (
                <div className="flex justify-between items-center w-full">
                  <div
                    className={cn(
                      "flex items-center gap-1",
                      singleLine
                        ? "overflow-x-auto multiselect-singleline-scroll"
                        : "flex-wrap",
                      responsiveSettings.compactMode && "gap-0.5",
                    )}
                    style={
                      singleLine
                        ? {
                            paddingBottom: "4px",
                          }
                        : {}
                    }
                  >
                    {selectedValues
                      .slice(0, responsiveSettings.maxCount)
                      .map((value) => {
                        const option = getOptionByValue(value);
                        const IconComponent = option?.icon;
                        const customStyle = option?.style;
                        if (!option) {
                          return null;
                        }
                        const badgeStyle = {
                          animationDuration: `${animation}s`,
                          ...(customStyle?.badgeColor && {
                            backgroundColor: customStyle.badgeColor,
                          }),
                          ...(customStyle?.gradient && {
                            background: customStyle.gradient,
                            color: "white",
                          }),
                        };
                        return (
                          <Badge
                            key={value}
                            className={cn(
                              getBadgeAnimationClass(),
                              multiSelectVariants({ variant }),
                              customStyle?.gradient &&
                                "text-white border-transparent",
                              responsiveSettings.compactMode &&
                                "text-xs px-1.5 py-0.5",
                              screenSize === "mobile" &&
                                "max-w-[120px] truncate",
                              singleLine && "shrink-0 whitespace-nowrap",
                              "[&>svg]:pointer-events-auto",
                            )}
                            style={{
                              ...badgeStyle,
                              animationDuration: `${
                                animationConfig?.duration || animation
                              }s`,
                              animationDelay: `${animationConfig?.delay || 0}s`,
                            }}
                          >
                            {IconComponent && !responsiveSettings.hideIcons && (
                              <IconComponent
                                className={cn(
                                  "h-4 w-4 mr-2",
                                  responsiveSettings.compactMode &&
                                    "h-3 w-3 mr-1",
                                  customStyle?.iconColor && "text-current",
                                )}
                                {...(customStyle?.iconColor && {
                                  style: { color: customStyle.iconColor },
                                })}
                              />
                            )}
                            <span
                              className={cn(
                                screenSize === "mobile" && "truncate",
                              )}
                            >
                              {option.label}
                            </span>
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  toggleOption(value);
                                }
                              }}
                              aria-label={`Remove ${option.label} from selection`}
                              className="ml-2 h-4 w-4 cursor-pointer hover:bg-white/20 rounded-sm p-0.5 -m-0.5 focus:outline-none focus:ring-1 focus:ring-white/50"
                            >
                              <XCircle
                                className={cn(
                                  "h-3 w-3",
                                  responsiveSettings.compactMode &&
                                    "h-2.5 w-2.5",
                                )}
                              />
                            </div>
                          </Badge>
                        );
                      })
                      .filter(Boolean)}
                    {selectedValues.length > responsiveSettings.maxCount && (
                      <Badge
                        className={cn(
                          "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                          getBadgeAnimationClass(),
                          multiSelectVariants({ variant }),
                          responsiveSettings.compactMode &&
                            "text-xs px-1.5 py-0.5",
                          singleLine && "shrink-0 whitespace-nowrap",
                          "[&>svg]:pointer-events-auto",
                        )}
                        style={{
                          animationDuration: `${
                            animationConfig?.duration || animation
                          }s`,
                          animationDelay: `${animationConfig?.delay || 0}s`,
                        }}
                      >
                        {`+ ${
                          selectedValues.length - responsiveSettings.maxCount
                        } more`}
                        <XCircle
                          className={cn(
                            "ml-2 h-4 w-4 cursor-pointer",
                            responsiveSettings.compactMode && "ml-1 h-3 w-3",
                          )}
                          onClick={(event) => {
                            event.stopPropagation();
                            clearExtraOptions();
                          }}
                        />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          handleClear();
                        }
                      }}
                      aria-label={`Clear all ${selectedValues.length} selected options`}
                      className="flex items-center justify-center h-4 w-4 mx-2 cursor-pointer text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded-sm"
                    >
                      <XIcon className="h-4 w-4" />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="flex min-h-6 h-full"
                    />
                    <ChevronDown
                      className="h-4 mx-2 cursor-pointer text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full mx-auto">
                  <span className="text-sm text-muted-foreground mx-3">
                    {placeholder}
                  </span>
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-label="Available options"
            className={cn(
              "w-auto p-0",
              getPopoverAnimationClass(),
              screenSize === "mobile" && "w-[85vw] max-w-[280px]",
              screenSize === "tablet" && "w-[70vw] max-w-md",
              screenSize === "desktop" && "min-w-[300px]",
              popoverClassName,
            )}
            style={{
              animationDuration: `${animationConfig?.duration || animation}s`,
              animationDelay: `${animationConfig?.delay || 0}s`,
              maxWidth: `min(${widthConstraints.maxWidth}, 85vw)`,
              maxHeight: screenSize === "mobile" ? "70vh" : "60vh",
              touchAction: "manipulation",
            }}
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <Command>
              {searchable && (
                <CommandInput
                  placeholder="Search options..."
                  onKeyDown={handleInputKeyDown}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  aria-label="Search through available options"
                  aria-describedby={`${multiSelectId}-search-help`}
                />
              )}
              {searchable && (
                <div id={`${multiSelectId}-search-help`} className="sr-only">
                  Type to filter options. Use arrow keys to navigate results.
                </div>
              )}
              <CommandList
                className={cn(
                  "max-h-[40vh] overflow-y-auto multiselect-scrollbar",
                  screenSize === "mobile" && "max-h-[50vh]",
                  "overscroll-behavior-y-contain",
                )}
              >
                <CommandEmpty>
                  {emptyIndicator || "No results found."}
                </CommandEmpty>{" "}
                {!hideSelectAll && !searchValue && (
                  <CommandGroup>
                    <CommandItem
                      key="all"
                      onSelect={toggleAll}
                      role="option"
                      aria-selected={
                        selectedValues.length ===
                        getAllOptions().filter((opt) => !opt.disabled).length
                      }
                      aria-label={`Select all ${
                        getAllOptions().length
                      } options`}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selectedValues.length ===
                            getAllOptions().filter((opt) => !opt.disabled)
                              .length
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                        aria-hidden="true"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      <span>
                        (Select All
                        {getAllOptions().length > 20
                          ? ` - ${getAllOptions().length} options`
                          : ""}
                        )
                      </span>
                    </CommandItem>
                  </CommandGroup>
                )}
                {isGroupedOptions(filteredOptions) ? (
                  filteredOptions.map((group) => (
                    <CommandGroup key={group.heading} heading={group.heading}>
                      {group.options.map((option: MultiSelectOption) => {
                        const isSelected = selectedValues.includes(
                          option.value,
                        );
                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleOption(option.value)}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={option.disabled}
                            aria-label={`${option.label}${
                              isSelected ? ", selected" : ", not selected"
                            }${option.disabled ? ", disabled" : ""}`}
                            className={cn(
                              "cursor-pointer",
                              option.disabled &&
                                "opacity-50 cursor-not-allowed",
                            )}
                            disabled={option.disabled}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible",
                              )}
                              aria-hidden="true"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </div>
                            {option.icon && (
                              <option.icon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                              />
                            )}
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ))
                ) : (
                  <CommandGroup>
                    {(filteredOptions as MultiSelectOption[]).map(
                      (option: MultiSelectOption) => {
                        const isSelected = selectedValues.includes(
                          option.value,
                        );
                        return (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleOption(option.value)}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={option.disabled}
                            aria-label={`${option.label}${
                              isSelected ? ", selected" : ", not selected"
                            }${option.disabled ? ", disabled" : ""}`}
                            className={cn(
                              "cursor-pointer",
                              option.disabled &&
                                "opacity-50 cursor-not-allowed",
                            )}
                            disabled={option.disabled}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible",
                              )}
                              aria-hidden="true"
                            >
                              <CheckIcon className="h-4 w-4" />
                            </div>
                            {option.icon && (
                              <option.icon
                                className="mr-2 h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                              />
                            )}
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      },
                    )}
                  </CommandGroup>
                )}
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between">
                    {selectedValues.length > 0 && (
                      <>
                        <CommandItem
                          onSelect={handleClear}
                          className="flex-1 justify-center cursor-pointer"
                        >
                          Clear
                        </CommandItem>
                        <Separator
                          orientation="vertical"
                          className="flex min-h-6 h-full"
                        />
                      </>
                    )}
                    <CommandItem
                      onSelect={() => setIsPopoverOpen(false)}
                      className="flex-1 justify-center cursor-pointer max-w-full"
                    >
                      Close
                    </CommandItem>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
          {animation > 0 && selectedValues.length > 0 && (
            <WandSparkles
              className={cn(
                "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
                isAnimating ? "" : "text-muted-foreground",
              )}
              onClick={() => setIsAnimating(!isAnimating)}
            />
          )}
        </Popover>
        {error && (
          <p className="text-sm text-red-500 mt-1 text-start">{error}</p>
        )}
      </div>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
