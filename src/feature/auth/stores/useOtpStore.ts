import { create } from "zustand";

interface OtpState {
  otp: string;
  isComplete: boolean;
  error: string | null;
  setOtp: (value: string) => void;
  clearOtp: () => void;
  setError: (error: string | null) => void;
  validateOtp: () => boolean;
}

export const useOtpStore = create<OtpState>((set) => ({
  otp: "",
  isComplete: false,
  error: null,

  setOtp: (value: string) =>
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

  setError: (error: string | null) => set({ error }),

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
