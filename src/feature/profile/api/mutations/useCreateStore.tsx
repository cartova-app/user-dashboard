import { useMutation } from "@tanstack/react-query";
import { createStoreFn } from "../../service/store";

export const useCreateStore = () => {
  return useMutation({
    mutationFn: createStoreFn,
    onError: (error) => {
      console.error("Login failed:", error);
      throw error; // Re-throw for component handling
    },
  });
};
