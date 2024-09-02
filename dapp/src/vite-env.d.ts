/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_WEB3_AUTH_CLIENT_ID: string
  readonly VITE_GOOGLE_MAP_API: string
  readonly VITE_POI_CONTRACT_ADDRESS: `0x${string}`
  readonly VITE_POI_ADDRESS: `0x${string}`
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
