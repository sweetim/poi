import { ethers } from "ethers"
import * as hre from "hardhat"
import {
  POI,
  POIToken,
} from "../typechain-types"
import { getWallet } from "./utils"

const POI_CONTRACT_ADDRESS = process.env.POI_CONTRACT_ADDRESS
if (!POI_CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

const POI_TOKEN_CONTRACT_ADDRESS = process.env.POI_TOKEN_CONTRACT_ADDRESS
if (!POI_TOKEN_CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function() {
  console.log(`Running script to interact with contract ${POI_CONTRACT_ADDRESS}`)

  const poiTokenContractArtifact = await hre.artifacts.readArtifact("POIToken")

  const poiTokenContract: POIToken = new ethers.Contract(
    POI_TOKEN_CONTRACT_ADDRESS!,
    poiTokenContractArtifact.abi,
    getWallet(),
  ) as any

  await poiTokenContract.approve(POI_CONTRACT_ADDRESS!, 1_000)

  const poiContractArtifact = await hre.artifacts.readArtifact("POI")

  const poiContract: POI = new ethers.Contract(
    POI_CONTRACT_ADDRESS!,
    poiContractArtifact.abi,
    getWallet(),
  ) as any

  const poiArgs: POI.RegisterPOIArgsStruct = {
    lat: 30123123,
    lng: 128128128,
    description: "take a picture of the store",
    reward: 100,
  }

  const transaction = await poiContract.registerPOI(poiArgs)
  console.log(`Transaction hash of setting new message: ${transaction.hash}`)

  await transaction.wait()
}
