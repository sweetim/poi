import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poiAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'POIRegister',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINIMUM_DECIMAL',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'readPOIById',
    outputs: [
      {
        name: '',
        internalType: 'struct POI.POIMetadata',
        type: 'tuple',
        components: [
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
          { name: 'lat', internalType: 'uint256', type: 'uint256' },
          { name: 'lng', internalType: 'uint256', type: 'uint256' },
          { name: 'reward', internalType: 'uint256', type: 'uint256' },
          { name: 'description', internalType: 'string', type: 'string' },
          { name: 'isCompleted', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'args',
        internalType: 'struct POI.RegisterPOIArgs',
        type: 'tuple',
        components: [
          { name: 'lat', internalType: 'uint256', type: 'uint256' },
          { name: 'lng', internalType: 'uint256', type: 'uint256' },
          { name: 'reward', internalType: 'uint256', type: 'uint256' },
          { name: 'description', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'registerPOI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POIToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poiTokenAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiAbi}__
 */
export const useReadPoi = /*#__PURE__*/ createUseReadContract({ abi: poiAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiAbi}__ and `functionName` set to `"MINIMUM_DECIMAL"`
 */
export const useReadPoiMinimumDecimal = /*#__PURE__*/ createUseReadContract({
  abi: poiAbi,
  functionName: 'MINIMUM_DECIMAL',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiAbi}__ and `functionName` set to `"readPOIById"`
 */
export const useReadPoiReadPoiById = /*#__PURE__*/ createUseReadContract({
  abi: poiAbi,
  functionName: 'readPOIById',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiAbi}__
 */
export const useWritePoi = /*#__PURE__*/ createUseWriteContract({ abi: poiAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiAbi}__ and `functionName` set to `"registerPOI"`
 */
export const useWritePoiRegisterPoi = /*#__PURE__*/ createUseWriteContract({
  abi: poiAbi,
  functionName: 'registerPOI',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiAbi}__
 */
export const useSimulatePoi = /*#__PURE__*/ createUseSimulateContract({
  abi: poiAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiAbi}__ and `functionName` set to `"registerPOI"`
 */
export const useSimulatePoiRegisterPoi =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiAbi,
    functionName: 'registerPOI',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poiAbi}__
 */
export const useWatchPoiEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: poiAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poiAbi}__ and `eventName` set to `"POIRegister"`
 */
export const useWatchPoiPoiRegisterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poiAbi,
    eventName: 'POIRegister',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__
 */
export const useReadPoiToken = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadPoiTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadPoiTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadPoiTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadPoiTokenName = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadPoiTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadPoiTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadPoiTokenTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: poiTokenAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__
 */
export const useWritePoiToken = /*#__PURE__*/ createUseWriteContract({
  abi: poiTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWritePoiTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: poiTokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWritePoiTokenDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: poiTokenAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWritePoiTokenIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: poiTokenAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useWritePoiTokenMint = /*#__PURE__*/ createUseWriteContract({
  abi: poiTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWritePoiTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poiTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWritePoiTokenTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: poiTokenAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWritePoiTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: poiTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWritePoiTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poiTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__
 */
export const useSimulatePoiToken = /*#__PURE__*/ createUseSimulateContract({
  abi: poiTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulatePoiTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulatePoiTokenDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulatePoiTokenIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulatePoiTokenMint = /*#__PURE__*/ createUseSimulateContract({
  abi: poiTokenAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulatePoiTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulatePoiTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulatePoiTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poiTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulatePoiTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poiTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poiTokenAbi}__
 */
export const useWatchPoiTokenEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: poiTokenAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poiTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchPoiTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poiTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poiTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchPoiTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poiTokenAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poiTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchPoiTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poiTokenAbi,
    eventName: 'Transfer',
  })
