/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STREAM_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_STATION_NAME?: string;
  readonly VITE_STATION_TAGLINE?: string;
  readonly VITE_STATION_LOGO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
