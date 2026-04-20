// biome-ignore lint/complexity/noBannedTypes: required by Vite's type augmentation
type ViteTypeOptions = {};

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CHATBOT_API_URL: string;
  readonly VITE_CHATBOT_AUTH_TOKEN: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
