/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly DATABASE_FILE: string
    readonly QUOTE_REUSE_PERIOD_DAYS: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }