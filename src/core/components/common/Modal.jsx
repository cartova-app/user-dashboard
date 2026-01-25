import { Button } from "@core/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@core/components/ui/dialog"
import { X } from "lucide-react"

function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
    width = "75%",
    showCloseButton = true,
    className = "",
    showHeader = true,
    closeOnOverlayClick = true,
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`sm:max-w-[425px] backdrop-blur-sm ${className}`}
                style={{ maxWidth: width, fontFamily: 'Satoshi, sans-serif' }}
                onInteractOutside={(e) => {
                    if (!closeOnOverlayClick) {
                        e.preventDefault()
                    }
                }}
            >
                {/* Header Section */}
                {showHeader && (title || showCloseButton) && (
                    <div className="flex justify-between items-center pb-6">
                        {title && (
                            <DialogHeader className="text-left">
                                <DialogTitle className="text-xl font-bold">
                                    {title}
                                </DialogTitle>
                                {description && (
                                    <DialogDescription>
                                        {description}
                                    </DialogDescription>
                                )}
                            </DialogHeader>
                        )}

                        {!title && <div />}

                        {/* {showCloseButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onOpenChange(false)}
                                className="h-8 w-8 rounded-md"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )} */}
                    </div>
                )}

                {/* Content */}
                <div className={!showHeader ? "mt-0" : ""}>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal