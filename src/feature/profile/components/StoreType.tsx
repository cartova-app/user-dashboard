import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/core/components/ui/card";
import {
  Shirt,
  Smartphone,
  Pizza,
  Heart,
  Sofa,
  Code,
  Palette,
  HelpCircle,
  Check,
  LucideIcon,
} from "lucide-react";
import { useProfileStore } from "../store/profileStore";
import { StepperButtons } from "./StepperButtons";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface StoreTypeFormData {
  category: string | null;
}

export function StoreTypeSelection() {
  const { formData, updateFormData, nextStep } = useProfileStore();
  const { handleSubmit, setValue, watch, register } =
    useForm<StoreTypeFormData>({
      defaultValues: {
        category: formData.category || null,
      },
    });

  const selectedCategoryValue = watch("category");

  const categories: Category[] = [
    {
      id: "fashion",
      name: "Fashion & Apparel",
      icon: Shirt,
      color: "text-pink-500",
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      color: "text-blue-500",
    },
    {
      id: "food",
      name: "Food & Drinks",
      icon: Pizza,
      color: "text-orange-500",
    },
    {
      id: "beauty",
      name: "Beauty",
      icon: Heart,
      color: "text-red-500",
    },
    {
      id: "furniture",
      name: "Furniture",
      icon: Sofa,
      color: "text-brown-500",
    },
    {
      id: "digital",
      name: "Digital Product",
      icon: Code,
      color: "text-green-500",
    },
    {
      id: "art",
      name: "Art & Crafts",
      icon: Palette,
      color: "text-purple-500",
    },
    {
      id: "other",
      name: "Other/ Not Sure",
      icon: HelpCircle,
      color: "text-gray-500",
    },
  ];

  const handleCategorySelect = (category: Category) => {
    setValue("category", category.id, { shouldValidate: true });
    updateFormData({ category: category.id });
  };

  const onSubmit = (data: StoreTypeFormData) => {
    updateFormData({ category: data.category });
    nextStep();
  };

  return (
    <div className="w-full py-4">
      <div className="mb-6 space-y-1">
        <h1
          className="text-[28px] font-bold leading-[34px]"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          What Type of Store Are You Building?
        </h1>
        <p
          className="text-[14px] leading-5 text-muted-foreground"
          style={{ fontFamily: "Satoshi, sans-serif" }}
        >
          Choose a category to get started with tailored templates
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategoryValue === category.id;

            return (
              <Card
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`
                                    relative cursor-pointer transition-shadow duration-200 ease-out
                                    hover:shadow-md group
                                    ${
                                      isSelected
                                        ? "border-2 shadow-md bg-primary/10"
                                        : "border border-border hover:border-primary/60"
                                    }
                                `}
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  borderColor: isSelected ? "var(--primary)" : undefined,
                }}
              >
                {/* Selection Indicator - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  {isSelected ? (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <Check
                        className="w-4 h-4 text-primary-foreground"
                        strokeWidth={3}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full border-2 border-border transition-colors"
                      style={{ borderColor: undefined }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "var(--primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "")
                      }
                    />
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    {/* Icon Container */}
                    <div
                      className={`
                                                flex items-center justify-center w-14 h-14 rounded-full
                                                transition-all duration-300
                                                ${
                                                  isSelected
                                                    ? "shadow-lg scale-105"
                                                    : "bg-muted group-hover:bg-muted/80"
                                                }
                                            `}
                      style={{
                        backgroundColor: isSelected
                          ? "var(--primary)"
                          : undefined,
                      }}
                    >
                      <IconComponent
                        className={`w-7 h-7 transition-colors ${
                          isSelected
                            ? "text-primary-foreground"
                            : category.color
                        }`}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Category Name */}
                    <p
                      className={`
                                                text-center text-xs font-semibold transition-colors
                                                ${
                                                  isSelected
                                                    ? "text-foreground"
                                                    : "text-muted-foreground group-hover:text-foreground"
                                                }
                                            `}
                    >
                      {category.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Hidden input for react-hook-form */}
        <input
          type="hidden"
          {...register("category", { required: "Please select a category" })}
        />

        <StepperButtons disabled={!selectedCategoryValue} showBackButton />
      </form>
    </div>
  );
}
