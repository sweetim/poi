import { expect } from "chai"

import { ethers } from "ethers"
import { utils } from "zksync-ethers"
import {
  deployContract,
  getProvider,
  getWallet,
  LOCAL_RICH_WALLETS,
} from "../deploy/utils"
import {
  GeneralPaymaster,
  POI,
  POIToken,
} from "../typechain-types"

describe("POIPaymaster", function() {
  const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
  const user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)
  const user_2 = getWallet("0x0000000000000000000000000000000000000000000000000000000000000002")

  const poiReward = 1_000
  const poiDataId_owner = 0
  const poiDataId_user_1 = 1
  const paymasterInitial_eth = ethers.parseEther("1.0")

  let poiContract: POI
  let poiTokenContract: POIToken
  let generalPaymasterContract_owner: GeneralPaymaster

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
      { wallet: owner, silent: true },
    ) as any

    poiContract = await deployContract(
      "POI",
      [
        await poiTokenContract.getAddress(),
      ],
      { wallet: owner, silent: true },
    ) as any

    generalPaymasterContract_owner = await deployContract(
      "GeneralPaymaster",
      [
        await poiContract.getAddress(),
      ],
      { wallet: owner, silent: true },
    ) as any

    await (
      await owner.sendTransaction({
        to: await generalPaymasterContract_owner.getAddress(),
        value: paymasterInitial_eth,
      })
    ).wait()

    await poiTokenContract.mint(owner.address, 100_000)
    await poiTokenContract.approve(poiContract.getAddress(), 100_000)
    await poiContract.registerPOI(poiArgs)
  })

  it("should able to sponsor transaction using paymaster", async function() {
    const provider = getProvider()
    const balance_paymaster_before = await provider.getBalance(
      await generalPaymasterContract_owner.getAddress(),
    )

    expect(balance_paymaster_before).to.equal(paymasterInitial_eth)

    const balance_user_1_before = await provider.getBalance(
      user_1.address,
    )

    const paymasterParams = utils.getPaymasterParams(
      await generalPaymasterContract_owner.getAddress(),
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    )

    await (await poiContract.connect(user_1)
      .addContribution(poiDataId_owner, "cid_1", {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      })).wait()

    const balance_paymaster_after = await provider.getBalance(
      await generalPaymasterContract_owner.getAddress(),
    )

    expect(balance_paymaster_before - balance_paymaster_after)
      .to.be.greaterThan(0)

    const balance_user_1_after = await provider.getBalance(
      user_1.address,
    )

    expect(balance_user_1_after).to.equal(balance_user_1_before)
  })

  it("should able to sponsor only addContribution method", async function() {
    const provider = getProvider()

    const balance_wallet_before = await provider.getBalance(
      owner.address,
    )
    const paymasterParams = utils.getPaymasterParams(
      await generalPaymasterContract_owner.getAddress(),
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    )

    try {
      await poiContract
        .registerPOI(poiArgs, {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams,
          },
        })
    } catch (err) {
      expect(err.message).to.include("Unsupported function selector")
    }

    const balance_wallet_after = await provider.getBalance(
      owner.address,
    )

    expect(balance_wallet_after).to.equal(balance_wallet_before)
  })

  it("should able to sponsor transaction if poi is owned by owner", async function() {
    const provider = getProvider()
    const balance_owner_before = await provider.getBalance(
      owner.address,
    )

    const balance_user_1_before = await provider.getBalance(
      user_1.address,
    )

    const balance_user_2_before = await provider.getBalance(
      user_2.address,
    )

    await poiTokenContract.mint(user_1.address, 100_000)
    await poiTokenContract.connect(user_1).approve(poiContract.getAddress(), 100_000)
    await poiContract.connect(user_1).registerPOI(poiArgs)

    const paymasterParams = utils.getPaymasterParams(
      await generalPaymasterContract_owner.getAddress(),
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    )

    try {
      await (await poiContract.connect(user_2)
        .addContribution(poiDataId_user_1, "cid_1", {
          customData: {
            gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
            paymasterParams,
          },
        })).wait()
    } catch (err) {
      expect(err.message).to.include("poiDataId is not owned by contract")
    }
  })
})
