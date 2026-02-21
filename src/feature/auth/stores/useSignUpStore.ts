import { create } from 'zustand';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export type TabType = 'signup' | 'otp';

interface SignUpState {
  currentTab: TabType;
  signUpData: SignUpData | null;
  isLoading: boolean;
  error: string | null;
  setCurrentTab: (tab: TabType) => void;
  setSignUpData: (data: SignUpData) => void;
  submitSignUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (otp: string) => Promise<{ success: boolean; error?: string }>;
  resetStore: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  currentTab: 'signup',
  signUpData: null,
  isLoading: false,
  error: null,

  setCurrentTab: (tab: TabType) => set({ currentTab: tab }),

  setSignUpData: (data: SignUpData) => set({ signUpData: data }),

  submitSignUp: async (data: SignUpData) => {
    set({ isLoading: true, error: null });

    try {
      // TODO: Replace with your actual API call
      // const response = await axios.post('/api/auth/signup', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({
        signUpData: data,
        currentTab: 'otp',
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  verifyOtp: async (_otp: string) => {
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP';
      set({
        error: errorMessage,
        isLoading: false,
      });
      return { success: false, error: errorMessage };
    }
  },

  resetStore: () =>
    set({
      currentTab: 'signup',
      signUpData: null,
      isLoading: false,
      error: null,
    }),
}));
