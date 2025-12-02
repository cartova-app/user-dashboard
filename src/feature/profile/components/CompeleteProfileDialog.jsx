import { useEffect } from "react"
import OrganizationForm from "./OrganizationForm"
import GenericDialog from '@core/components/common/Modal'
import Stepper from "@core/components/common/Stepper"
import { StoreTypeSelection } from "./StoreType"
import { ThemeTypeSelection } from "./ThemeForm"
import { Tabs, TabsContent } from "@core/components/ui/tabs"
import { useProfileStore } from '../store/profileStore'
import SuccessStep from "./SuccessStep"

function CompeleteProfileDialog({ isOpen, setIsOpen }) {
    const { currentStep, resetForm } = useProfileStore()

    const steps = [
        { id: 'details', label: 'Store Details', component: OrganizationForm },
        { id: 'category', label: 'Choose Category', component: StoreTypeSelection },
        { id: 'theme', label: 'Choose Theme', component: ThemeTypeSelection },
    ]

    const stepLabels = steps.map(step => step.label)

    // Reset form when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            resetForm()
        }
    }, [isOpen, resetForm])

    return (
        <GenericDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            width="60%"
            showHeader={false}
            className="p-6 rounded-2xl max-h-[90vh] flex flex-col overflow-y-auto"
        >
            {/* Stepper Navigation */}
            <div className="shrink-0 mb-6 px-2">
                <Stepper
                    steps={stepLabels}
                    active={currentStep}
                />
            </div>

            {/* Scrollable content */}
            <div className="border-t border-gray-100 flex-1">
                <Tabs value={steps[currentStep].id} className="w-full">
                    {steps.map((step) => {
                        const StepComponent = step.component
                        return (
                            <TabsContent
                                key={step.id}
                                value={step.id}
                                className="mt-0"
                            >
                                <StepComponent />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </GenericDialog>

    )
}

export default CompeleteProfileDialog
