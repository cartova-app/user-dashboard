import { Button } from "@core/components/ui/button"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { useProfileStore } from '../store/profileStore'

export function StepperButtons({

    disabled = false,
    continueText = "Continue",
    showBackButton = false
}) {
    const { prevStep } = useProfileStore()

    return (
        <div className="flex justify-between items-center mt-4">
            {showBackButton && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="px-6"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                </Button>
            )}

            <Button
                variant="primary"
                type="submit"
                disabled={disabled}
                className={`px-8 h-12 text-base font-semibold text-black transition-all duration-300 shadow-lg hover:shadow-xl ${!showBackButton ? 'mx-auto' : ''}`}
                style={{
                    fontFamily: 'Satoshi, sans-serif',
                    backgroundColor: !disabled ? 'var(--primary)' : undefined
                }}
            >
                {continueText}
                <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
        </div>
    )
}
