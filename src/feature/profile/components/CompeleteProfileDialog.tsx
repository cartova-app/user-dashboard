import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import GenericDialog from '@/core/components/common/Modal';
import Stepper from '@/core/components/common/Stepper';
import { Tabs, TabsContent } from '@/core/components/ui/tabs';
import authClient from '@/core/config/auth-client';
import useGenerateSlug from '@/core/hooks/useGenerateSlug';
import { createStoreMutationOptions } from '../api/profileQueryDefinitions';
import type { ProfileFormData } from '../store/profileStore';
import { useProfileStore } from '../store/profileStore';
import OrganizationForm from './OrganizationForm';
import { StoreTypeSelection } from './StoreType';
import { ThemeTypeSelection } from './ThemeForm';

interface CompeleteProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function CompeleteProfileDialog({ isOpen, setIsOpen }: CompeleteProfileDialogProps) {
  const queryClient = useQueryClient();
  const { currentStep, resetForm } = useProfileStore();
  const { generateSlug } = useGenerateSlug();
  const { mutateAsync: createStore } = useMutation(createStoreMutationOptions(queryClient));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async (formData: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      const orgSlug = generateSlug(formData.organizationName);
      const { data: orgData, error: orgError } = await authClient.organization.create({
        name: formData.organizationName,
        slug: orgSlug,
      });

      if (orgError) {
        throw new Error(orgError.message || 'Failed to create organization');
      }

      await authClient.organization.setActive({
        organizationId: orgData?.id,
      });

      await createStore({
        storeName: formData.storeName,
        storeDescription: formData.storeDescription || null,
        theme: formData.theme || 'default',
        type: formData.category || 'ecommerce',
      });

      toast.success('Store created successfully');
      setTimeout(() => setIsOpen(false), 1500);
    } catch (err) {
      console.error('Error creating organization/store:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create store';
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 'details', label: 'Store Details', component: OrganizationForm },
    { id: 'category', label: 'Choose Category', component: StoreTypeSelection },
    { id: 'theme', label: 'Choose Theme', component: ThemeTypeSelection },
  ];

  const stepLabels = steps.map((step) => step.label);

  // Reset form when dialog is closed
  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <GenericDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      width="60%"
      showHeader={false}
      onOpenAutoFocus={(e) => e.preventDefault()}
      className="p-6 rounded-2xl max-h-[90vh] flex flex-col overflow-y-auto"
    >
      {/* Stepper Navigation */}
      <div className="shrink-0 mb-6 px-2">
        <Stepper steps={stepLabels} active={currentStep} />
      </div>

      {/* Scrollable content */}
      <div className="border-t border-gray-100 flex-1">
        <Tabs value={steps[currentStep].id} className="w-full">
          {steps.map((step) => {
            const StepComponent = step.component;
            const isLastStep = step.id === 'theme';
            return (
              <TabsContent key={step.id} value={step.id} className="mt-0">
                {isLastStep ? (
                  <StepComponent onComplete={handleComplete} isSubmitting={isSubmitting} />
                ) : (
                  <StepComponent />
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </GenericDialog>
  );
}

export default CompeleteProfileDialog;
