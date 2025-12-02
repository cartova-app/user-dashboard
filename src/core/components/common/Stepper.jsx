import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

// Step Icon Component
function StepIcon({ active, completed, icon }) {
    return (
        <div
            className={`
        flex h-[30px] w-[30px] items-center justify-center rounded-full
        transition-all duration-300 ease-in-out
        ${completed
                    ? "bg-[#34DF6A] text-white"
                    : active
                        ? "scale-110 border-2 border-[#34DF6A] bg-white text-[#34DF6A] shadow-md"
                        : "border-2 border-transparent bg-gray-100 text-gray-400"
                }
      `}
        >
            {completed ? (
                <Check className="text-lg text-white" />
            ) : (
                <span className={`text-xs font-bold ${active ? "text-[#34DF6A]" : "text-gray-400"}`}>
                    {icon}
                </span>
            )}
        </div>
    );
}

// Stepper Component
const CustomStepper = ({ steps, active }) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === "ar";

    return (
        <div className="flex w-full items-center" dir={isAr ? "rtl" : "ltr"}>
            {steps.map((label, index) => (
                <div
                    key={index}
                    className="relative flex flex-1 items-center"
                >
                    {/* Step Content (Icon + Label) */}
                    <div className="flex flex-col items-center w-full">
                        {/* Step Icon */}
                        <div className="relative z-10">
                            <StepIcon
                                active={index === active}
                                completed={index < active}
                                icon={index + 1}
                            />
                        </div>

                        {/* Step Label */}
                        <div className="mt-2 text-center">
                            <span
                                className={`text-sm font-medium transition-all duration-300 ${index === active ? "text-base font-bold text-[#34DF6A]" : "text-gray-400"
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
                            className={`absolute top-[15px] h-[3px] rounded transition-colors duration-300 ease-in-out ${index < active ? "bg-[#34DF6A]" : "bg-gray-300"
                                }`}
                            style={{
                                [isAr ? "right" : "left"]: "50%",
                                width: "calc(100% - 30px)",
                                [isAr ? "marginRight" : "marginLeft"]: "15px"
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomStepper;