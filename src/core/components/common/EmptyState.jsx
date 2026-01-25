import { cn } from "@/core/lib/utils";
import { Button } from "@/core/components/ui/button";

export default function EmptyState({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    className,
}) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16 px-4 text-center",
                className
            )}
        >
            {icon && (
                <div className="w-16 h-16 rounded-full bg-gray-100 grid place-items-center mb-4">
                    {icon}
                </div>
            )}
            {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                </h3>
            )}
            {description && (
                <p className="text-sm text-gray-500 max-w-sm mb-6">
                    {description}
                </p>
            )}
            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    className="bg-lime-400 hover:bg-lime-500 text-black"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
