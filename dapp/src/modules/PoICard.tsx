import { usePoiStore } from "@/store/usePoiStore"
import {
  BookmarkSimple,
  MapPinArea,
  SealCheck,
  UserSound,
} from "@phosphor-icons/react"
import { Space } from "antd"
import { formatDistance } from "date-fns"
import {
  FC,
  MouseEvent,
} from "react"
import { useNavigate } from "react-router-dom"

type PoICardProps = {
  id: number
  owner: string
  created: number
  reward: number
  createdAt_s: number
  description: string
  isBookmark: boolean
}

const PoICard: FC<PoICardProps> = (props) => {
  const navigate = useNavigate()
  const toggleBookmark = usePoiStore(state => state.toggleBookmark)

  async function poiCardClickHandler() {
    navigate(`poi/id/${props.id}`)
  }

  function bookmarkClickHandler(ev: MouseEvent<SVGSVGElement>) {
    ev.stopPropagation()

    toggleBookmark(props.id)
  }

  return (
    <div
      className="bg-blue-100 h-full rounded-3xl p-3"
      onClick={poiCardClickHandler}
    >
      <Space size="middle" direction="vertical" className="w-full">
        <div className="flex flex-row justify-between">
          <div>
            <Space>
              <h1 className="text-base font-black text-ellipsis">
                {`${props.owner.substring(0, 8)}...${props.owner.substring(props.owner.length - 8)}`}
              </h1>
              <SealCheck
                size={24}
                color="#ffbf00"
                weight="fill"
              />
            </Space>
            <p>
              {formatDistance(
                props.createdAt_s * 1000,
                new Date(),
                { addSuffix: true },
              )}
            </p>
          </div>
          <BookmarkSimple
            onClick={bookmarkClickHandler}
            size={28}
            color={props.isBookmark ? "#f0a9a7" : "#aaa"}
            weight={props.isBookmark ? "fill" : "duotone"}
          />
        </div>
        <p>{props.description}</p>
        <Space>
          <div className="bg-indigo-200 max-w-fit p-4 rounded-3xl">
            <div className="flex flex-row items-center">
              <Space size="middle">
                <MapPinArea size={32} color="#dee9fc" weight="fill" />
                <p className="text-base text-black font-bold">{props.reward}</p>
              </Space>
            </div>
          </div>
          {
            /* <div className="bg-indigo-200 max-w-fit p-4 rounded-3xl">
            <div className="flex flex-row items-center">
              <Space size="middle">
                <ListBullets size={32} color="#dee9fc" weight="fill" />
                <p className="text-base text-black font-bold">{Number(props.description.length)}</p>
              </Space>
            </div>
          </div> */
          }
          <div className="bg-indigo-200 max-w-fit p-4 rounded-3xl">
            <div className="flex flex-row items-center">
              <Space size="middle">
                <UserSound size={32} color="#dee9fc" weight="fill" />
                <p className="text-base text-black font-bold">{Number(props.description.length)}</p>
              </Space>
            </div>
          </div>
        </Space>
      </Space>
    </div>
  )
}

export default PoICard
