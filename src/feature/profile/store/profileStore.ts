import { create } from 'zustand';

export interface ProfileFormData {
  // Step 1: Store Details
  organizationName: string;
  storeName: string;
  storeDescription: string;
  // Step 2: Category
  category: string | null;
  // Step 3: Theme (placeholder for future)
  theme: string | null;
}

interface ProfileState {
  currentStep: number;
  formData: ProfileFormData;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<ProfileFormData>) => void;
  resetForm: () => void;
}

const initialFormData: ProfileFormData = {
  organizationName: '',
  storeName: '',
  storeDescription: '',
  category: null,
  theme: null,
};

export const useProfileStore = create<ProfileState>((set) => {
  return {
    // Current step
    currentStep: 0,

    // Form data
    formData: initialFormData,

    // Actions
    setCurrentStep: (step: number) => set({ currentStep: step }),

    nextStep: () =>
      set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 2),
      })),

    prevStep: () =>
      set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 0),
      })),

    updateFormData: (data: Partial<ProfileFormData>) =>
      set((state) => ({
        formData: { ...state.formData, ...data },
      })),

    resetForm: () =>
      set({
        currentStep: 0,
        formData: initialFormData,
      }),
  };
});
