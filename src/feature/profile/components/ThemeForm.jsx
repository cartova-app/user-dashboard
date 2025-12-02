import { useForm } from "react-hook-form"
import { Card, CardContent } from "@core/components/ui/card"
import { Check } from "lucide-react"
import { useProfileStore } from '../store/profileStore'
import { StepperButtons } from './StepperButtons'
import ThemeImage1 from "@assets/images/theme-1.png"
import ThemeImage2 from "@assets/images/theme-2.png"
import ThemeImage3 from "@assets/images/theme-3.png"
import ThemeImage4 from "@assets/images/theme-4.png"
import ThemeImage5 from "@assets/images/theme-5.png"
import ThemeImage6 from "@assets/images/theme-6.png"
import SuccessStep from "./SuccessStep"

export function ThemeTypeSelection() {
    const { formData, updateFormData, nextStep, currentStep } = useProfileStore()
    const { handleSubmit, setValue, watch, register } = useForm({
        defaultValues: {
            category: formData.category || null
        }
    })

    const selectedCategoryValue = watch("category")

    const categories = [
        { id: "default", name: "Default Theme", image: ThemeImage1 },
        { id: "minimal", name: "Modren Minimal", image: ThemeImage2 },
        { id: "luxury", name: "Artisan Crafts", image: ThemeImage3 },
        { id: "classic", name: "Classic", image: ThemeImage4 },
        { id: "industrial", name: "Industrial", image: ThemeImage5 },
        { id: "bold", name: "Bold & Dynamic", image: ThemeImage6 },
    ]

    const handleCategorySelect = (category) => {
        setValue("category", category.id, { shouldValidate: true })
        updateFormData({ category: category.id })
    }

    const onSubmit = (data) => {
        updateFormData({ category: data.category })
        nextStep()
    }

    // 👉 If it's success step, return SuccessStep
    if (currentStep === 3) {
        return <SuccessStep />
    }

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
                        const isSelected = selectedCategoryValue === category.id

                        return (
                            <div
                                key={category.id}
                                onClick={() => handleCategorySelect(category)}
                                className={`
                                    cursor-pointer rounded-xl overflow-hidden border transition-all
                                    duration-300 ease-in-out group relative
                                    ${isSelected
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
                        )
                    })}
                </div>

                {/* Hidden input */}
                <input
                    type="hidden"
                    {...register("category", { required: "Please select a category" })}
                />

                <StepperButtons disabled={!selectedCategoryValue} />
            </form>
        </div>
    )
}
