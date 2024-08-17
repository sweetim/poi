export const CONTRACT_DECIMAL_UNITS = 6

export type PoIOnChain = {
  id: bigint
  owner: string
  createdAt: bigint
  lat: bigint
  lng: bigint
  reward: bigint
  description: string
}

export type PoI = {
  id: number
  owner: string
  createdAt: number
  lat: number
  lng: number
  reward: number
  description: string
}

export type PoIStatus = "active" | "completed"

export function convertToPoI(chainPoI: PoIOnChain): PoI {
  return {
    id: Number(chainPoI.id),
    owner: chainPoI.owner,
    createdAt: Number(chainPoI.createdAt),
    lat: convertToNumber(chainPoI.lat),
    lng: convertToNumber(chainPoI.lng),
    reward: Number(chainPoI.reward),
    description: chainPoI.description,
  }
}

export function convertToBigNumber(value: number): bigint {
  return BigInt(value * Math.pow(10, CONTRACT_DECIMAL_UNITS))
}

export function convertToNumber(value: bigint): number {
  return Number(value) / Math.pow(10, CONTRACT_DECIMAL_UNITS)
}
