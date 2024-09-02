import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { abi as POIAbi } from "./abis/POI.json"
import { abi as POITokenAbi } from "./abis/POIToken.json"

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "POI",
      abi: POIAbi as any,
    },
    {
      name: "POIToken",
      abi: POITokenAbi as any,
    },
  ],
  plugins: [
    react(),
  ],
})
