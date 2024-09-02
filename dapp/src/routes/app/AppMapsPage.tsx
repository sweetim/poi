import { GOOGLE_MAP_STYLE } from "@/config/googleMapStyle"
import {
  Map,
  Marker,
} from "@vis.gl/react-google-maps"
import "swiper/css"
import "swiper/css/pagination"

import PoICard from "@/modules/PoICard"
import { usePoiStore } from "@/store/usePoiStore"
import {
  Swiper,
  SwiperSlide,
} from "swiper/react"
import "./AppMapsPage.css"

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

  const poi = usePoiStore(state => state.poi)

  return (
    <div className="h-full w-full relative">
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
        styles={GOOGLE_MAP_STYLE}
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
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        centeredSlides={true}
        className="absolute bottom-3 left-0 w-full h-48"
      >
        {poi.map(poi => {
          return (
            <SwiperSlide key={poi.id}>
              <PoICard {...poi} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default AppMapsPage
