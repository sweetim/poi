import { GOOGLE_MAP_STYLE } from "@/config/googleMapStyle"
import { PoiByIdPageParams } from "@/config/router"
import { PoI } from "@/contract"
import {
  CheckCircle,
  MapPinArea,
} from "@phosphor-icons/react"
import {
  Map,
  Marker,
} from "@vis.gl/react-google-maps"
import {
  Button,
  Space,
} from "antd"
import { formatDistance } from "date-fns"
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom"

const AppPoiByIdPage = () => {
  const navigate = useNavigate()
  const { id } = useLoaderData() as PoiByIdPageParams

  // const { data: poi } = useReadPoiReadPoiById({
  //   address: POI_ADDRESS,
  //   args: [
  //     BigInt(id),
  //   ],
  // })

  const poi: PoI = {
    id: 1,
    owner: "0x1234567890123456789012345678901234567890",
    created: 3,
    createdAt_s: 1677721600,
    lat: 35.626992493337665,
    lng: 139.77536944338857,
    reward: 1000,
    description: "test 123",
  }

  async function contributeClickHandler() {
    navigate(`/app/poi/capture`)
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      <Map
        className="basis-1/3 w-full"
        defaultCenter={{
          lat: Number(poi.lat),
          lng: Number(poi.lng),
        }}
        defaultZoom={18}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        styles={GOOGLE_MAP_STYLE}
      >
        <Marker
          key={id}
          position={{
            lat: poi.lat,
            lng: poi.lng,
          }}
          // icon={{
          //   url: "/images/marker.png",
          //   scaledSize: new window.google.maps.Size(50, 50),
          // }}
        />
      </Map>
      <Space direction="vertical" size="middle" className="p-2">
        <div className="flex flex-col">
          <h1 className="text-base text-zinc-600">Owner</h1>
          <Space>
            <p className="text-base text-black">
              {`${poi.owner.substring(0, 8)}...${poi.owner.substring(poi.owner.length - 8)}`}
            </p>
            <CheckCircle
              size={24}
              color="#0f0"
              weight="fill"
            />
          </Space>
          <p>{`Successful POI offered ${poi.description.length}`}</p>
        </div>

        <div className="flex flex-col">
          <h1 className="text-base text-zinc-600">Created at</h1>
          <p className="text-base text-black">{new Date(poi.createdAt_s * 1000).toLocaleString()}</p>
          <p className="text-sm text-zinc-500">
            {formatDistance(
              poi.createdAt_s * 1000,
              new Date(),
              { addSuffix: true },
            )}
          </p>
        </div>
        <Space direction="vertical" size="small">
          <h1 className="text-base text-zinc-600">Rewards</h1>
          <div className="bg-indigo-200 max-w-fit p-1 rounded-3xl">
            <div className="flex flex-row items-center p-2">
              <Space size="middle">
                <MapPinArea size={32} color="#dee9fc" weight="fill" />
                <p className="text-base text-black font-bold">{poi.reward}</p>
              </Space>
            </div>
          </div>
        </Space>

        <div className="flex flex-col">
          <h1 className="text-base text-zinc-600">Tasks</h1>
          <p className="text-base text-black">{poi.description}</p>
        </div>

        <div className="flex flex-col">
          <h1 className="text-base text-zinc-600">Contributors</h1>
          <p className="text-base text-black">{poi.description.length}</p>
        </div>
      </Space>
      <div className="absolute bottom-0 mb-5 w-full flex flex-row justify-center">
        <Button
          type="primary"
          size="large"
          className="px-10"
          onClick={contributeClickHandler}
        >
          CONTRIBUTE
        </Button>
      </div>
    </div>
  )
}

export default AppPoiByIdPage
