import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

const URL = import.meta.env.VITE_API_URL;

export const authClient = createAuthClient({
  baseURL: URL, // The base URL of your auth server
  fetchOptions: {
    auth: {
      type: 'Bearer',
      token: () => localStorage.getItem('bearer_token') || '', // get the token from localStorage
    },
  },
  advanced: {
    cookies: {
      session_token: {
        name: 'session_token',
        attributes: {
          // Set custom cookie attributes
        },
      },
    },
  },
  plugins: [organizationClient()],
});

export default authClient;
