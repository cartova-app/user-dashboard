import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface StepIconProps {
  active: boolean;
  completed: boolean;
  icon: ReactNode;
}

// Step Icon Component
function StepIcon({ active, completed, icon }: StepIconProps) {
  return (
    <div
      className={`
        flex h-[30px] w-[30px] items-center justify-center rounded-full
        transition-all duration-300 ease-in-out
        ${
          completed
            ? 'bg-[#34DF6A] text-white'
            : active
              ? 'scale-110 border-2 border-[#34DF6A] bg-background text-[#34DF6A] shadow-md'
              : 'border-2 border-transparent bg-muted text-muted-foreground'
        }
      `}
    >
      {completed ? (
        <Check className="text-lg text-white" />
      ) : (
        <span className={`text-xs font-bold ${active ? 'text-[#34DF6A]' : 'text-muted-foreground'}`}>{icon}</span>
      )}
    </div>
  );
}

interface CustomStepperProps {
  steps: string[];
  active: number;
}

// Stepper Component
const CustomStepper = ({ steps, active }: CustomStepperProps) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="flex w-full items-center" dir={isAr ? 'rtl' : 'ltr'}>
      {steps.map((label, index) => (
        <div key={label} className="relative flex flex-1 items-center">
          {/* Step Content (Icon + Label) */}
          <div className="flex flex-col items-center w-full">
            {/* Step Icon */}
            <div className="relative z-10">
              <StepIcon active={index === active} completed={index < active} icon={index + 1} />
            </div>

            {/* Step Label */}
            <div className="mt-2 text-center">
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  index === active ? 'text-base font-bold text-[#34DF6A]' : 'text-muted-foreground'
                }`}
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {label}
              </span>
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute top-[15px] h-[3px] rounded transition-colors duration-300 ease-in-out ${
                index < active ? 'bg-[#34DF6A]' : 'bg-border'
              }`}
              style={{
                [isAr ? 'right' : 'left']: '50%',
                width: 'calc(100% - 30px)',
                [isAr ? 'marginRight' : 'marginLeft']: '15px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
