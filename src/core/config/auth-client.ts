import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const URL = import.meta.env.VITE_API_URL;

export const authClient = createAuthClient({
  baseURL: URL, // The base URL of your auth server
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => localStorage.getItem("bearer_token") || "", // get the token from localStorage
    },
  },
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
  plugins: [organizationClient()],
});

/**
 * Re-exports symbols that appear in the inferred type of `createAuthClient` so declaration emit
 * (TS2883 / “cannot be named without a reference …”) can serialize `.d.ts` output for this package.
 *
 * **Temporary:** remove when better-auth’s published types no longer force consumers to anchor these
 * names (see issues below).
 *
 * @see https://github.com/better-auth/better-auth/issues/4250
 * @see https://github.com/better-auth/better-auth/issues/8623
 */
export type {
  AuthQueryAtom,
  InferSignUpEmailCtx,
  InferUserUpdateCtx,
} from "better-auth/client";
export type { FieldAttributeToObject } from "better-auth/db";

export default authClient;
