import { ethers } from "ethers"
import * as hre from "hardhat"
import { POIToken } from "../typechain-types"
import { getWallet } from "./utils"

const POI_TOKEN_CONTRACT_ADDRESS = process.env.POI_TOKEN_CONTRACT_ADDRESS

if (!POI_TOKEN_CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

// test-account
// const TO_ADDRESS = "0x4538Df273c05289DC7491a6cf01acF54F3D1F189"

// local-account
const TO_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

export default async function() {
  const mintToData = [
    {
      contractName: "POIToken",
      contractAddress: POI_TOKEN_CONTRACT_ADDRESS!,
      amount: BigInt(1_000),
    },
  ]

  for (const item of mintToData) {
    const contractArtifact = await hre.artifacts.readArtifact(
      item.contractName,
    )

    const contract: POIToken = new ethers.Contract(
      item.contractAddress,
      contractArtifact.abi,
      getWallet(),
    ) as any

    await contract.mint(TO_ADDRESS, BigInt(item.amount))

    console.log(`${item.contractName} minted `, await contract.balanceOf(TO_ADDRESS))
  }
}
