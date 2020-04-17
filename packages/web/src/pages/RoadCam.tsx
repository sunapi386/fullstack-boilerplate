import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { WorldMap } from "../components/WorldMap"
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core/dist"
import { LicensePlates } from "../components/LicensePlates"
import { Complaints } from "../components/Complaints"
import { UserDetailsComponent } from "../components/UserDetailsComponent"

export const RoadCam: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Tabs w="100vw">
        <TabList>
          <Tab>World Map</Tab>
          <Tab>License Plate</Tab>
          <Tab>Complaints</Tab>
          <Tab>Users</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              <WorldMap />
            </Box>
          </TabPanel>
          <TabPanel>
            <LicensePlates />
          </TabPanel>
          <TabPanel>
            <Complaints />
          </TabPanel>
          <TabPanel>
            <UserDetailsComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  )
}
