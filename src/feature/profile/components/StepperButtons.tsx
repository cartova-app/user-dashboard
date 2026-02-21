import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useProfileStore } from '../store/profileStore';

interface StepperButtonsProps {
  disabled?: boolean;
  continueText?: string;
  showBackButton?: boolean;
}

export function StepperButtons({
  disabled = false,
  continueText = 'Continue',
  showBackButton = false,
}: StepperButtonsProps) {
  const { prevStep } = useProfileStore();

  return (
    <div className="flex justify-between items-center mt-4">
      {showBackButton && (
        <Button type="button" variant="outline" onClick={prevStep} size="lg" className="px-6">
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back
        </Button>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={disabled}
        size="lg"
        className={`px-8 ${!showBackButton ? 'mx-auto' : ''}`}
      >
        {continueText}
        <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
}
