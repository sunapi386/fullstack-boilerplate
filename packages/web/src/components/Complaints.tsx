import React, { FC } from "react"
import { Box, Stack, Text } from "@chakra-ui/core/dist"
import { RouteComponentProps } from "@reach/router"

function Feature({ title, desc, ...rest }: { title: string; desc: string }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Text fontSize="lg">{title}</Text>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
}

type ComplaintEntry = { title: string; desc: string }
type ComplaintsList = ComplaintEntry[]

function StackEx({ data, ...rest }: { data: ComplaintsList }) {
  return (
    <Stack spacing={2} m="1em">
      {data.map((item, key) => (
        <Feature key={key} title={item.title} desc={item.desc} />
      ))}
    </Stack>
  )
}

export const Complaints: FC<RouteComponentProps> = () => {
  const complaintData: ComplaintsList = [
    {
      title: "Bad landlord",
      desc: "Terrible landlord makes me pay extra for late fees each month.",
    },
    {
      title: "Save your money elsewhere!",
      desc:
        "Terribly expensive here and cops around all the time with drug users.",
    },
  ]

  return <StackEx data={complaintData} />
}
