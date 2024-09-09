import { ethers } from "ethers"
import * as hre from "hardhat"
import { POI } from "../typechain-types"
import { getWallet } from "./utils"

const POI_CONTRACT_ADDRESS = process.env.POI_CONTRACT_ADDRESS
if (!POI_CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!"

export default async function() {
  console.log(`Running script to interact with contract ${POI_CONTRACT_ADDRESS}`)

  const poiContractArtifact = await hre.artifacts.readArtifact("POI")

  const poiContract: POI = new ethers.Contract(
    POI_CONTRACT_ADDRESS!,
    poiContractArtifact.abi,
    getWallet(),
  ) as any

  console.log(
    await poiContract.readPOIMetadataById(1),
  )
}
