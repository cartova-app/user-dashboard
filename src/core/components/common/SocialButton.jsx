// components/SocialButton.js
import { Button } from '@core/components/ui/button';
import { cn } from '@core/lib/utils';

export function SocialButton({ children, icon, className = '' }) {
    return (
        <Button
            variant="outline"
            className={cn(
                'w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium rounded-md transition-colors bg-white hover:bg-gray-50 border-gray-300',
                className
            )}
        >
            {icon}
            {children}
        </Button>
    );
}