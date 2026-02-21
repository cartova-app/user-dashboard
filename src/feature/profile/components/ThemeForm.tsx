import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { useProfileStore } from "../store/profileStore";
import { StepperButtons } from "./StepperButtons";
import SuccessStep from "./SuccessStep";
import ThemeImage1 from "@/assets/images/theme-1.png";
import ThemeImage2 from "@/assets/images/theme-2.png";
import ThemeImage3 from "@/assets/images/theme-3.png";
import ThemeImage4 from "@/assets/images/theme-4.png";
import ThemeImage5 from "@/assets/images/theme-5.png";
import ThemeImage6 from "@/assets/images/theme-6.png";

interface ThemeCategory {
  id: string;
  name: string;
  image: string;
}

interface ThemeFormData {
  theme?: string;
}

interface ThemeTypeSelectionProps {
  onComplete?: (
    formData: import("../store/profileStore").ProfileFormData,
  ) => Promise<void>;
  isSubmitting?: boolean;
}

export function ThemeTypeSelection({
  onComplete,
  isSubmitting = false,
}: ThemeTypeSelectionProps) {
  const { formData, updateFormData } = useProfileStore();
  const [showSuccessStep, setShowSuccessStep] = useState(false);

  const { handleSubmit, setValue, watch, register } = useForm<ThemeFormData>({
    defaultValues: {
      theme: formData.theme || undefined,
    },
  });

  const selectedThemeValue = watch("theme");

  const categories: ThemeCategory[] = [
    { id: "default", name: "Default Theme", image: ThemeImage1 },
    { id: "minimal", name: "Modren Minimal", image: ThemeImage2 },
    { id: "luxury", name: "Artisan Crafts", image: ThemeImage3 },
    { id: "classic", name: "Classic", image: ThemeImage4 },
    { id: "industrial", name: "Industrial", image: ThemeImage5 },
    { id: "bold", name: "Bold & Dynamic", image: ThemeImage6 },
  ];

  const handleThemeSelect = (theme: ThemeCategory) => {
    setValue("theme", theme.id, { shouldValidate: true });
    updateFormData({ theme: theme.id });
  };

  const onSubmit = async (data: ThemeFormData) => {
    const finalFormData = { ...formData, theme: data.theme ?? null };
    updateFormData({ theme: data.theme ?? null });

    try {
      await onComplete?.(finalFormData);
      setShowSuccessStep(true);
    } catch {
      // Error already handled (toast) in CompeleteProfileDialog
    }
  };

  if (showSuccessStep) {
    return <SuccessStep />;
  }
  // 👉 Otherwise return theme selection UI
  return (
    <div className="w-full py-4">
      <div className="mb-6 space-y-1">
        <h1 className="text-[28px] font-bold leading-[34px] font-family-satoshi">
          Choose Your Store Theme
        </h1>

        <p className="text-[14px] leading-5 text-muted-foreground font-family-satoshi">
          Select a theme to customize the look and feel of your store
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((theme) => {
            const isSelected = selectedThemeValue === theme.id;

            return (
              <div
                key={theme.id}
                onClick={() => handleThemeSelect(theme)}
                className={`
                  cursor-pointer rounded-xl overflow-hidden border group relative
                  transition-[border-color,box-shadow] duration-200 ease-out
                  ${
                    isSelected
                      ? "border-primary shadow-md ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50 hover:shadow-sm"
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 bg-primary rounded-full flex items-center justify-center animate-in fade-in duration-200">
                    <Check
                      className="w-4 h-4 text-primary-foreground"
                      strokeWidth={3}
                    />
                  </div>
                )}

                <div className="w-full h-36 md:h-40 lg:h-48 overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-3 text-center bg-card">
                  <p
                    className={`text-sm md:text-base font-semibold transition-colors duration-200 ease-out ${
                      isSelected ? "text-primary" : "text-card-foreground group-hover:text-foreground"
                    }`}
                  >
                    {theme.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hidden input */}
        <input
          type="hidden"
          {...register("theme", { required: "Please select a theme" })}
        />

        <StepperButtons
          disabled={!selectedThemeValue || isSubmitting}
          continueText={isSubmitting ? "Creating Store..." : "Create Store"}
          showBackButton
        />
      </form>
    </div>
  );
}
