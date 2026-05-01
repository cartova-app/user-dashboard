import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/core/components/ui/dialog';

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  width?: string | number;
  showCloseButton?: boolean;
  className?: string;
  showHeader?: boolean;
  closeOnOverlayClick?: boolean;
  /** Prevents default auto-focus on open. Use when initial focus causes a jarring focus ring. */
  onOpenAutoFocus?: (event: Event) => void;
};

function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  width = '75%',
  showCloseButton = true,
  className = '',
  showHeader = true,
  closeOnOverlayClick = true,
  onOpenAutoFocus,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[425px] backdrop-blur-sm ${className}`}
        style={{ maxWidth: width, fontFamily: 'Satoshi, sans-serif' }}
        onOpenAutoFocus={onOpenAutoFocus}
        onInteractOutside={(e) => {
          if (!closeOnOverlayClick) {
            e.preventDefault();
          }
        }}
        aria-describedby={description}
      >
        {/* Header Section */}
        {showHeader && (title || showCloseButton) && (
          <div className="flex justify-between items-center pb-6">
            {title && (
              <DialogHeader className="text-left">
                <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                {description && <DialogDescription>{description}</DialogDescription>}
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
        <div className={!showHeader ? 'mt-0' : ''}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
