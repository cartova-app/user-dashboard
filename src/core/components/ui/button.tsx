import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        primary:
          "bg-[#ecff77] text-gray-900 shadow-md hover:bg-[#e4f86d] hover:shadow-lg hover:shadow-[#ecff77]/25 hover:scale-[1.02] active:scale-[0.98] dark:text-gray-900",
        destructive:
          "bg-destructive text-white shadow-md hover:bg-destructive/90 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-border bg-transparent shadow-sm hover:bg-accent/50 hover:border-foreground/20 hover:shadow-md active:scale-[0.98] dark:border-border dark:hover:bg-accent/30",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "hover:bg-accent/80 hover:text-accent-foreground active:scale-[0.98]",
        link: "text-foreground underline-offset-4 hover:underline hover:text-foreground/80",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
