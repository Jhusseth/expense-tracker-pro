/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_SPREADSHEET_ID: string
  readonly VITE_PERSISTENCE_TYPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
