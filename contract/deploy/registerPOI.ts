import {
  ethers,
  parseEther,
} from "ethers"
import * as hre from "hardhat"
import { POI } from "../typechain-types"
import { getWallet } from "./utils"

const POI_CONTRACT_ADDRESS = process.env.POI_CONTRACT_ADDRESS
if (!POI_CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function() {
  console.log(`Running script to interact with contract ${POI_CONTRACT_ADDRESS}`)

  const contractArtifact = await hre.artifacts.readArtifact("POI")

  const contract: POI = new ethers.Contract(
    POI_CONTRACT_ADDRESS!,
    contractArtifact.abi,
    getWallet(),
  ) as any

  const poiArgs: POI.RegisterPOIArgsStruct = {
    lat: 32123123,
    lng: 128128128,
    description: "a sample",
    reward: parseEther("0.01"),
  }

  const transaction = await contract.registerPOI(poiArgs)
  console.log(`Transaction hash of setting new message: ${transaction.hash}`)

  await transaction.wait()
}
