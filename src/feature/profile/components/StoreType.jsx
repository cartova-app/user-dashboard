import { useForm } from "react-hook-form"
import { Button } from "@core/components/ui/button"
import { Card, CardContent } from "@core/components/ui/card"
import {
    ChevronRight,
    Shirt,
    Smartphone,
    Pizza,
    Heart,
    Sofa,
    Code,
    Palette,
    HelpCircle,
    Check,
    ArrowLeft
} from "lucide-react"
import { useProfileStore } from '../store/profileStore'

export function StoreTypeSelection() {
    const { formData, updateFormData, nextStep, prevStep } = useProfileStore()
    const { handleSubmit, setValue, watch, register } = useForm({
        defaultValues: {
            category: formData.category || null
        }
    })

    const selectedCategoryValue = watch("category")

    const categories = [
        {
            id: "fashion",
            name: "Fashion & Apparel",
            icon: Shirt,
            color: "text-pink-500"
        },
        {
            id: "electronics",
            name: "Electronics",
            icon: Smartphone,
            color: "text-blue-500"
        },
        {
            id: "food",
            name: "Food & Drinks",
            icon: Pizza,
            color: "text-orange-500"
        },
        {
            id: "beauty",
            name: "Beauty",
            icon: Heart,
            color: "text-red-500"
        },
        {
            id: "furniture",
            name: "Furniture",
            icon: Sofa,
            color: "text-brown-500"
        },
        {
            id: "digital",
            name: "Digital Product",
            icon: Code,
            color: "text-green-500"
        },
        {
            id: "art",
            name: "Art & Crafts",
            icon: Palette,
            color: "text-purple-500"
        },
        {
            id: "other",
            name: "Other/ Not Sure",
            icon: HelpCircle,
            color: "text-gray-500"
        }
    ]

    const handleCategorySelect = (category) => {
        setValue("category", category.id, { shouldValidate: true })
        updateFormData({ category: category.id })
    }

    const onSubmit = (data) => {
        updateFormData({ category: data.category })
        nextStep()
    }

    return (
        <div className="w-full py-4">
            <div className="mb-6 space-y-1">
                <h1
                    className="text-[28px] font-bold leading-[34px]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                    What Type of Store Are You Building?
                </h1>
                <p
                    className="text-[14px] leading-5 text-gray-600"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                    Choose a category to get started with tailored templates
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {categories.map((category) => {
                        const IconComponent = category.icon
                        const isSelected = selectedCategoryValue === category.id

                        return (
                            <Card
                                key={category.id}
                                onClick={() => handleCategorySelect(category)}
                                className={`
                                    relative cursor-pointer transition-all duration-300 ease-in-out
                                    hover:shadow-lg hover:-translate-y-1 group
                                    ${isSelected
                                        ? 'border-2 shadow-md bg-primary/10'
                                        : 'border border-gray-200 hover:border-primary/60'
                                    }
                                `}
                                style={{
                                    fontFamily: 'Satoshi, sans-serif',
                                    borderColor: isSelected ? 'var(--primary)' : undefined
                                }}
                            >
                                {/* Selection Indicator - Top Right */}
                                <div className="absolute top-3 right-3 z-10">
                                    {isSelected ? (
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                                            style={{ backgroundColor: 'var(--primary)' }}
                                        >
                                            <Check className="w-4 h-4 text-black" strokeWidth={3} />
                                        </div>
                                    ) : (
                                        <div
                                            className="w-6 h-6 rounded-full border-2 border-gray-300 transition-colors"
                                            style={{ borderColor: undefined }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                                            onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
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
                                                ${isSelected
                                                    ? 'shadow-lg scale-105'
                                                    : 'bg-gray-100 group-hover:bg-gray-200'
                                                }
                                            `}
                                            style={{
                                                backgroundColor: isSelected ? 'var(--primary)' : undefined
                                            }}
                                        >
                                            <IconComponent
                                                className={`w-7 h-7 transition-colors ${isSelected ? 'text-black' : category.color
                                                    }`}
                                                strokeWidth={2}
                                            />
                                        </div>

                                        {/* Category Name */}
                                        <p
                                            className={`
                                                text-center text-xs font-semibold transition-colors
                                                ${isSelected
                                                    ? 'text-black'
                                                    : 'text-gray-700 group-hover:text-gray-900'
                                                }
                                            `}
                                        >
                                            {category.name}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Hidden input for react-hook-form */}
                <input
                    type="hidden"
                    {...register("category", { required: "Please select a category" })}
                />

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-4">
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

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={!selectedCategoryValue}
                        className="px-8 h-12 text-base font-semibold text-black transition-all duration-300 shadow-lg hover:shadow-xl"
                        style={{
                            fontFamily: 'Satoshi, sans-serif',
                            backgroundColor: selectedCategoryValue ? 'var(--primary)' : undefined
                        }}
                    >
                        Continue
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </form>

        </div>
    )
}
