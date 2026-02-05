import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { useProfileStore } from "../store/profileStore";
import { StepperButtons } from "./StepperButtons";
import ThemeImage1 from "@/assets/images/theme-1.png";
import ThemeImage2 from "@/assets/images/theme-2.png";
import ThemeImage3 from "@/assets/images/theme-3.png";
import ThemeImage4 from "@/assets/images/theme-4.png";
import ThemeImage5 from "@/assets/images/theme-5.png";
import ThemeImage6 from "@/assets/images/theme-6.png";
import SuccessStep from "./SuccessStep";
import { useCreateStore } from "../api/mutations/useCreateStore";
import { useState } from "react";
import { toast } from "sonner";

interface ThemeCategory {
  id: string;
  name: string;
  image: string;
}

interface ThemeFormData {
  category?: string;
}

export function ThemeTypeSelection() {
  const { formData, updateFormData } = useProfileStore();
  const [showSuccessStep, setShowSuccessStep] = useState(false);
  const { handleSubmit, setValue, watch, register } = useForm<ThemeFormData>({
    defaultValues: {
      category: formData.category || undefined,
    },
  });
  const { mutateAsync: createStore, isPending } = useCreateStore();

  const selectedCategoryValue = watch("category");

  const categories: ThemeCategory[] = [
    { id: "default", name: "Default Theme", image: ThemeImage1 },
    { id: "minimal", name: "Modren Minimal", image: ThemeImage2 },
    { id: "luxury", name: "Artisan Crafts", image: ThemeImage3 },
    { id: "classic", name: "Classic", image: ThemeImage4 },
    { id: "industrial", name: "Industrial", image: ThemeImage5 },
    { id: "bold", name: "Bold & Dynamic", image: ThemeImage6 },
  ];

  const handleCategorySelect = (category: ThemeCategory) => {
    setValue("category", category.id, { shouldValidate: true });
    updateFormData({ category: category.id });
  };

  const onSubmit = async (data: ThemeFormData) => {
    try {
      await createStore({ ...formData, theme: data.category });
      toast.success("Store created successfully");
      setShowSuccessStep(true);
    } catch (err) {
      console.error("Error creating store:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create store";
      toast.error(errorMessage);
    }
  };

  // 👉 If it's success step, return SuccessStep
  if (showSuccessStep) {
    return <SuccessStep />;
  }

  console.log(showSuccessStep);
  // 👉 Otherwise return theme selection UI
  return (
    <div className="w-full py-4">
      <div className="mb-6 space-y-1">
        <h1 className="text-[28px] font-bold leading-[34px] font-family-satoshi">
          What Type of store you building?
        </h1>

        <p className="text-[14px] leading-5 text-gray-600 font-family-satoshi">
          Choose a category to get started with tailored templates
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((category) => {
            const isSelected = selectedCategoryValue === category.id;

            return (
              <div
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`
                                    cursor-pointer rounded-xl overflow-hidden border transition-all
                                    duration-300 ease-in-out group relative
                                    ${
                                      isSelected
                                        ? "border-primary shadow-xl scale-[1.02]"
                                        : "border-gray-200 hover:shadow-lg hover:-translate-y-1"
                                    }
                                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                )}

                <div className="w-full h-36 md:h-40 lg:h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3 text-center bg-white">
                  <p
                    className={`text-sm md:text-base font-semibold transition-colors
                                            ${isSelected ? "text-primary" : "text-gray-800 group-hover:text-black"}
                                        `}
                  >
                    {category.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hidden input */}
        <input
          type="hidden"
          {...register("category", { required: "Please select a category" })}
        />

        <StepperButtons
          disabled={!selectedCategoryValue || isPending}
          continueText={isPending ? "Creating Store..." : "Create Store"}
          showBackButton
        />
      </form>
    </div>
  );
}
