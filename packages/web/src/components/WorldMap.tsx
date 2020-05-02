import React from "react"
import { Box, Icon } from "@chakra-ui/core/dist"
import GoogleMapReact from "google-map-react"
import { BoxProps } from "@chakra-ui/core/dist/Box"
import { LoadSpinner } from "./shared/LoadSpinner"
import { FiHome } from "react-icons/all"

const Marker = ({ text }: any) => {
  return (
    <Icon name="close" cursor="pointer">
      {text}
    </Icon>
  )
}

export const WorldMap: React.FC<BoxProps> = () => {
  return (
    <React.Suspense fallback={<LoadSpinner />}>
      <Box border="1px" m="1em" w="90%" h="80vh">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBELPH36K8jCTp3--G7B2dRBR_en2MpKs0",
          }}
          defaultCenter={{ lat: 37.2967787, lng: -121.9578387 }}
          defaultZoom={11}
        >
          <Marker lat={37.2967787} lng={-121.9578387} name="My Marker">
            <Box as={FiHome} size="28px" />
          </Marker>
        </GoogleMapReact>
      </Box>
    </React.Suspense>
  )
}
