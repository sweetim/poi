import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs"
import { expect } from "chai"

import {
  deployContract,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import {
  POI,
  POIToken,
} from "../typechain-types"

describe("POI", function() {
  let wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
  let user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)

  const poiReward = 1_000
  const poiDataId = 0

  let poiContract: POI
  let poiTokenContract: POIToken
  let poiArgs: POI.RegisterPOIArgsStruct = {
    lat: 32123123,
    lng: 128128128,
    description: "a sample",
    reward: poiReward,
  }

  before(async function() {
    poiTokenContract = await deployContract(
      "POIToken",
      [],
      { wallet, silent: true },
    ) as any

    poiContract = await deployContract(
      "POI",
      [
        await poiTokenContract.getAddress(),
      ],
      { wallet, silent: true },
    ) as any
  })

  it("owner should be able to mint poi token", async function() {
    await poiTokenContract.mint(wallet.address, 1_000)
    const balance_owner = await poiTokenContract.balanceOf(wallet.address)
    expect(balance_owner).to.equal(1_000)

    const balance_user_1 = await poiTokenContract.balanceOf(user_1.address)
    expect(balance_user_1).to.equal(0)

    const balance_poiContract = await poiTokenContract.balanceOf(poiContract.getAddress())
    expect(balance_poiContract).to.equal(0)
  })

  it("should able to register poi", async function() {
    await poiTokenContract.approve(poiContract.getAddress(), poiReward)

    await expect(poiContract.registerPOI(poiArgs))
      .to.emit(poiContract, "POIRegister")
      .withArgs(wallet.address, anyValue)

    const poi = await poiContract.readPOIMetadataById(0)
    expect(poi.owner).to.equal(wallet.address)
  })

  it("should contain the poi token", async function() {
    const balance_poiContract = await poiTokenContract.balanceOf(poiContract.getAddress())
    expect(balance_poiContract).to.equal(poiReward)
  })

  it("should able to add multiple contribution", async function() {
    await expect(poiContract.addContribution(poiDataId, "cid_1"))
      .to.emit(poiContract, "POIContributorAdded")
      .withArgs(wallet.address, poiDataId, 0)

    await poiContract.connect(user_1).addContribution(poiDataId, "cid_2")

    const poiContribution = await poiContract.getAllContributions(0)

    expect(poiContribution.length).to.equal(2)
    expect(poiContribution
      .map(item => item.contributor))
      .to.deep.equal([
        wallet.address,
        user_1.address,
      ])
  })

  it("should able to complete the poi", async function() {
    await expect(poiContract.completePOI(poiDataId))
      .to.emit(poiContract, "POICompleted")
      .withArgs(poiDataId, true)
  })
})
