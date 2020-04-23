import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { Page } from "../components/Page"
import { ListingsSearchBox } from "../components/ListingsSearchBox"
import { TagPicker, Timeline } from "rsuite"

export const RentingDash: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <ListingsSearchBox />
      <Timeline>
        <Timeline.Item>16:27:41 Your order starts processing</Timeline.Item>
        <Timeline.Item>
          16:28:43 Your order to be ready for delivery
        </Timeline.Item>
        <Timeline.Item>
          16:28:45 Your parcel has been out of the library
        </Timeline.Item>
        <Timeline.Item>02:34:41 Send to Shanghai Hongkou Company</Timeline.Item>
        <Timeline.Item>15:05:29 Sending you a piece</Timeline.Item>
      </Timeline>
    </Page>
  )
}
