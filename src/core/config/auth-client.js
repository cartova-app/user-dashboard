import { createAuthClient } from "better-auth/react";
const URL = import.meta.env.VITE_API_URL;

export const authClient = createAuthClient({
  baseURL: URL, // The base URL of your auth server
  advanced: {
    cookies: {
      session_token: {
        name: "session_token",
        attributes: {
          // Set custom cookie attributes
        },
      },
    },
  },
});

export default authClient;
