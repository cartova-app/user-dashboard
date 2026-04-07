// biome-ignore lint/complexity/noBannedTypes: required by Vite's type augmentation
type ViteTypeOptions = {};

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
