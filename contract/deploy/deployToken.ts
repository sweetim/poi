import { POIToken } from "../typechain-types"
import { persistToEnvFie } from "./persistToEnvFile"
import { deployContract } from "./utils"

export default async function() {
  const poiToken: POIToken = await deployContract(
    "POIToken",
    [],
  ) as any

  const POI_TOKEN_ADDRESS = await poiToken.getAddress()

  persistToEnvFie({
    POI_TOKEN_ADDRESS,
  })

  console.table({
    POI_TOKEN_ADDRESS,
  })
}
