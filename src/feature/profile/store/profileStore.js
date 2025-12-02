import { create } from "zustand";

export const useProfileStore = create((set) => ({
  // Current step
  currentStep: 2,

  // Form data
  formData: {
    // Step 1: Store Details
    organizationName: "",
    storeName: "",
    storeDescription: "",

    // Step 2: Category
    category: null,

    // Step 3: Theme (placeholder for future)
    theme: null,
  },

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 2),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  resetForm: () =>
    set({
      currentStep: 0,
      formData: {
        organizationName: "",
        storeName: "",
        storeDescription: "",
        category: null,
        theme: null,
      },
    }),
}));
