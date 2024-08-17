export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GREETER_CONTRACT_ADDRESS: `0x${string}`
    }
  }
}
