import { deployContract } from "./utils"

// An example of a basic deploy script
// It will deploy a Greeter contract to selected network
// as well as verify it on Block Explorer if possible for the network
export default async function() {
  const POI_TOKEN_ADDRESS = "0x8C11415DD6584ffF2561729d7a2Ebac8aafEAE2f"

  const poiContract = await deployContract(
    "POI",
    [
      POI_TOKEN_ADDRESS,
    ],
  )

  const poiContractAddress = await poiContract.getAddress()

  console.table({
    poiContractAddress,
  })
}
