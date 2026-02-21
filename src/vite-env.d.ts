// biome-ignore lint/complexity/noBannedTypes: required by Vite's type augmentation
type ViteTypeOptions = {};

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
