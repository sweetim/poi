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
  let wallet = getWallet(LOCAL_RICH_WALLETS[0].privateKey)
  let user_1 = getWallet(LOCAL_RICH_WALLETS[1].privateKey)

  const poiReward = 1_000
  const poiDataId = 0
  const paymasterInitial_eth = ethers.parseEther("1.0")

  let poiContract: POI
  let poiTokenContract: POIToken
  let generalPaymasterContract: GeneralPaymaster

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

    generalPaymasterContract = await deployContract(
      "GeneralPaymaster",
      [],
      { wallet, silent: true },
    ) as any

    await (
      await wallet.sendTransaction({
        to: await generalPaymasterContract.getAddress(),
        value: paymasterInitial_eth,
      })
    ).wait()

    await poiTokenContract.mint(wallet.address, 100_000)
    await poiTokenContract.approve(poiContract.getAddress(), 100_000)
    // await poiContract.registerPOI(poiArgs)
  })

  it("should able to sponsor transaction using paymaster", async function() {
    const provider = getProvider()
    const balance_paymaster_before = await provider.getBalance(
      await generalPaymasterContract.getAddress(),
    )

    expect(balance_paymaster_before).to.equal(paymasterInitial_eth)

    const balance_user_1_before = await provider.getBalance(
      user_1.address,
    )

    const paymasterParams = utils.getPaymasterParams(
      await generalPaymasterContract.getAddress(),
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    )

    await (await poiContract.connect(user_1)
      .addContribution(poiDataId, "cid_1", {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams,
        },
      })).wait()

    const balance_paymaster_after = await provider.getBalance(
      await generalPaymasterContract.getAddress(),
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
      wallet.address,
    )
    const paymasterParams = utils.getPaymasterParams(
      await generalPaymasterContract.getAddress(),
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
      wallet.address,
    )

    expect(balance_wallet_after).to.equal(balance_wallet_before)
  })
})
