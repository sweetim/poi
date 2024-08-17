import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { MetamaskAdapter } from "@web3auth/metamask-adapter"
import { Web3AuthOptions } from "@web3auth/modal"
import { Web3AuthContextConfig } from "@web3auth/modal-react-hooks"
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin"
import { toHex } from "viem"
import { zkSyncInMemoryNode } from "viem/chains"
import {
  createConfig,
  http,
} from "wagmi"

const WEB3_AUTH_CLIENT_ID = import.meta.env.VITE_WEB3_AUTH_CLIENT_ID

export const CHAIN_TO_USE = zkSyncInMemoryNode

const chainConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: toHex(CHAIN_TO_USE.id),
  rpcTarget: CHAIN_TO_USE.rpcUrls.default.http[0],
  displayName: CHAIN_TO_USE.name,
  blockExplorerUrl: CHAIN_TO_USE.blockExplorers?.default.url || "https://sepolia.explorer.zksync.io/",
  ticker: CHAIN_TO_USE.nativeCurrency.symbol,
  tickerName: CHAIN_TO_USE.nativeCurrency.name,
  isTestnet: true,
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

const metamaskAdapter = new MetamaskAdapter({
  clientId: WEB3_AUTH_CLIENT_ID,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  chainConfig,
})

const web3AuthOptions: Web3AuthOptions = {
  clientId: WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
}

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: {
      showWidgetButton: true,
    },
  },
})

export const web3AuthProviderContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [ metamaskAdapter ],
  plugins: [ walletServicesPlugin ],
  // plugins: [],
}

export const wagmiConfig = createConfig({
  chains: [ CHAIN_TO_USE ],
  batch: {
    multicall: true,
  },
  transports: {
    [CHAIN_TO_USE.id]: http(),
  },
})
