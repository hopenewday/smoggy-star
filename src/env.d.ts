/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SVELTIA_CMS_URL: string;
  readonly PUBLIC_SVELTIA_CMS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}