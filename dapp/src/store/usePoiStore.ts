import { PoI } from "@/contract"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type PoiAppState = {
  isBookmark: boolean
}

type PoiStoreState = {
  poi: (PoI & PoiAppState)[]
}

type PoiStoreActions = {
  toggleBookmark: (id: number) => void
}

export const usePoiStore = create<PoiStoreState & PoiStoreActions>()(
  immer(
    (set) => ({
      poi: [
        {
          id: 1,
          owner: "0x1234567890123456789012345678901234567890",
          createdAt_s: 1725114343,
          created: 5,
          lat: 35.626992493337665,
          lng: 139.77536944338857,
          reward: 1000,
          description: "test 123",
          isBookmark: false,
        },
        {
          id: 2,
          owner: "0x1234567890123456789012345678901234567890",
          createdAt_s: 1715114343,
          created: 1,
          lat: 35.628992493337665,
          lng: 139.77536944338857,
          reward: 100,
          description: "test",
          isBookmark: false,
        },
      ] as (PoI & PoiAppState)[],
      toggleBookmark: (id: number) =>
        set((state) => {
          const index = state.poi.findIndex(item => item.id === id)
          if (index !== -1) state.poi[index].isBookmark = !state.poi[index].isBookmark
        }),
    }),
  ),
)
