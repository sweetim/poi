import { googleMapStyle } from "@/config/googleMapStyle"
import { PoI } from "@/contract"
import {
  Map,
  Marker,
} from "@vis.gl/react-google-maps"

const DEFAULT_LOCATION = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 18,
}

const AppMapsPage = () => {
  // const { latitude, longitude } = useGeolocation({
  //   enableHighAccuracy: true,
  // })

  const poi: PoI[] = [
    {
      id: 1,
      owner: "0x1234567890123456789012345678901234567890",
      createdAt: 1677721600,
      lat: 35.626992493337665,
      lng: 139.77536944338857,
      reward: 100,
      description: "test 123",
    },
    {
      id: 2,
      owner: "0x1234567890123456789012345678901234567890",
      createdAt: 1677721600,
      lat: 35.628992493337665,
      lng: 139.77536944338857,
      reward: 100,
      description: "test",
    },
  ]

  return (
    <Map
      className="h-full w-full"
      defaultCenter={DEFAULT_LOCATION.center}
      // center={{
      //   lat: latitude || DEFAULT_LOCATION.center.lat,
      //   lng: longitude || DEFAULT_LOCATION.center.lng,
      // }}
      defaultZoom={DEFAULT_LOCATION.zoom}
      gestureHandling={"greedy"}
      // mapId={"4f6dde3310be51d7"}
      disableDefaultUI={true}
      styles={googleMapStyle}
    >
      {poi.map(poi => {
        return (
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
        )
      })}
    </Map>
  )
}

export default AppMapsPage
