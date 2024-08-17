import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"

import { parseEther } from "ethers"
import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import { POI } from "../typechain-types"

describe("POI", function() {
  it("Should emit event when poi registered", async function() {
    const wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey)

    const poiContract: POI = await deployContract(
      "POI",
      [],
      { wallet, silent: true },
    ) as any

    const poiArgs: POI.RegisterPOIArgsStruct = {
      lat: 32123123,
      lng: 128128128,
      description: "a sample",
      reward: parseEther("0.01"),
    }

    await expect(poiContract.registerPOI(poiArgs))
      .to.emit(poiContract, "POIRegister")
      .withArgs(wallet.address, anyValue)
  })
})
