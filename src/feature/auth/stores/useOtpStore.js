import { create } from "zustand";

export const useOtpStore = create((set) => ({
  otp: "",
  isComplete: false,
  error: null,

  setOtp: (value) =>
    set({
      otp: value,
      isComplete: value.length === 4,
      error: null,
    }),

  clearOtp: () =>
    set({
      otp: "",
      isComplete: false,
      error: null,
    }),

  setError: (error) => set({ error }),

  validateOtp: () => {
    const { otp } = useOtpStore.getState();
    if (otp.length !== 4) {
      set({ error: "Please enter a 4-digit code" });
      return false;
    }
    if (!/^\d+$/.test(otp)) {
      set({ error: "OTP must contain only numbers" });
      return false;
    }
    set({ error: null });
    return true;
  },
}));
