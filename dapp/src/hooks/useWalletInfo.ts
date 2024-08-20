import { CHAIN_TO_USE } from "@/config/web3auth"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from "viem"

export function useWalletInfo() {
  const [ walletAddress, setWalletAddress ] = useState<`0x${string}` | null>(null)
  const [ balance_eth, setBalance_eth ] = useState(0)

  const {
    userInfo,
    provider,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (!provider) return

      const walletClient = createWalletClient({
        chain: CHAIN_TO_USE,
        transport: custom<IProvider>(provider),
      })

      const [ address ] = await walletClient.getAddresses()
      setWalletAddress(address)
    })()
  }, [ provider ])

  useEffect(() => {
    ;(async () => {
      if (!walletAddress) return

      const publicClient = createPublicClient({
        chain: CHAIN_TO_USE,
        transport: http(),
      })

      const balance = await publicClient.getBalance({
        address: walletAddress,
      })

      setBalance_eth(Number(balance))
    })()
  }, [ walletAddress ])

  const tokensData = useMemo(() => [
    {
      name: "ETH",
      description: "Ethereum",
      amount: formatEther(BigInt(balance_eth)),
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
    },
  ], [ balance_eth ])

  return {
    userInfo,
    walletAddress,
    balance_eth,
    tokensData,
  }
}
