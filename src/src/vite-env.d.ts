/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // agrega más si quieres
  // readonly VITE_OTHER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
