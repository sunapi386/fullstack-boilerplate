import React, { FC } from "react"
import { Box } from "@chakra-ui/core/dist"
import GoogleMapReact from "google-map-react"

export const WorldMap: FC = () => {
  return (
    <Box border="1px" m="1em" w="90%">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBELPH36K8jCTp3--G7B2dRBR_en2MpKs0" }}
        defaultCenter={{ lat: 37.2967787, lng: -121.9578387 }}
        defaultZoom={11}
      ></GoogleMapReact>
    </Box>
  )
}
