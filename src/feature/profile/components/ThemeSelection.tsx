import { ArrowLeft, ChevronRight, Palette } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useProfileStore } from '../store/profileStore';

export function ThemeSelection() {
  const { prevStep, formData } = useProfileStore();

  const handleFinish = () => {
    console.log('Final form data:', formData);
    // Handle final submission
  };

  return (
    <div className="w-full py-4">
      <div className="mb-6 space-y-1">
        <h1 className="text-[28px] font-bold leading-[34px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Choose Your Theme
        </h1>
        <p className="text-[14px] leading-5 text-gray-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          Customize the look and feel of your store
        </p>
      </div>

      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <Palette className="w-16 h-16 mx-auto text-gray-400" />
          <p className="text-gray-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            Theme selection coming soon...
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-4">
        <Button type="button" variant="outline" onClick={prevStep} size="lg" className="px-6">
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back
        </Button>

        <Button variant="primary" onClick={handleFinish} size="lg" className="px-8">
          Finish Setup
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
