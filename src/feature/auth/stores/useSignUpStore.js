import { create } from "zustand";

export const useSignUpStore = create((set) => ({
  currentTab: "signup",
  signUpData: null,
  isLoading: false,
  error: null,

  setCurrentTab: (tab) => set({ currentTab: tab }),

  setSignUpData: (data) => set({ signUpData: data }),

  submitSignUp: async (data) => {
    set({ isLoading: true, error: null });

    try {
      // TODO: Replace with your actual API call
      // const response = await axios.post('/api/auth/signup', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({
        signUpData: data,
        currentTab: "otp",
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      set({
        error: error.message || "Failed to sign up",
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  verifyOtp: async (otp) => {
    set({ isLoading: true, error: null });

    try {
      // TODO: Replace with your actual API call
      // const response = await axios.post('/api/auth/verify-otp', {
      //   email: get().signUpData.email,
      //   otp
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({ isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error.message || "Failed to verify OTP",
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  resetStore: () =>
    set({
      currentTab: "signup",
      signUpData: null,
      isLoading: false,
      error: null,
    }),
}));
