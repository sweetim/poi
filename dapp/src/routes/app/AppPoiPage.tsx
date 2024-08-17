import { googleMapStyle } from "@/config/googleMapStyle"
import { PoI } from "@/contract"
import {
  Map,
  Marker,
} from "@vis.gl/react-google-maps"
import {
  Button,
  Space,
} from "antd"

const AppPoiPage = () => {
  const poi: PoI = {
    id: 1,
    owner: "0x1234567890123456789012345678901234567890",
    createdAt: 1677721600,
    lat: 35.626992493337665,
    lng: 139.77536944338857,
    reward: 0.05,
    description: "test 123",
  }

  return (
    <div className="h-full w-full flex flex-col relative">
      <Map
        className="basis-1/3 w-full"
        defaultCenter={{
          lat: poi.lat,
          lng: poi.lng,
        }}
        // center={{
        //   lat: latitude || DEFAULT_LOCATION.center.lat,
        //   lng: longitude || DEFAULT_LOCATION.center.lng,
        // }}
        defaultZoom={18}
        gestureHandling={"greedy"}
        // mapId={"4f6dde3310be51d7"}
        disableDefaultUI={true}
        styles={googleMapStyle}
      >
        <Marker
          key={poi.id}
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
      <div className="grow overflow-scroll">
        <Space className="w-full p-2" direction="vertical" size="large">
          <div className="flex flex-col w-full">
            <h1 className="text-base text-slate-600">
              Created by
            </h1>
            <h1 className="text-base">
              {poi.owner}
            </h1>
          </div>
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-xl text-slate-600">
              Rewards
            </h1>
            <h1 className="text-3xl">
              {poi.reward.toLocaleString()} ETH
            </h1>
          </div>
          <p>please take a picture of the restaurant queuing status</p>
          <h1>Reports</h1>
        </Space>
      </div>
      <div className="absolute bottom-0 mb-5 w-full flex flex-row justify-center">
        <Button
          type="primary"
          size="large"
          className="px-10"
        >
          GO REPORT
        </Button>
      </div>
    </div>
  )
}

export default AppPoiPage
