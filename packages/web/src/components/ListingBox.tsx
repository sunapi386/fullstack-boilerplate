import React from "react"
import {
  AspectRatioBox,
  Badge,
  Box,
  Icon,
  Image,
  PseudoBox,
} from "@chakra-ui/core/dist"
import { Link } from "./shared/Link"

export interface ListingShortAd {
  imageUrl: string
  imageAlt: string
  beds: number
  baths: number
  title: string
  price: string
  reviews: number
  ratings: number
  id: string
}

export const ListingBox = ({ property }: { property: ListingShortAd }) => {
  return (
    <Link
      to={"listing/" + property.id}
      _hover={{ outline: "none" }}
      _focus={{ outline: "none" }}
    >
      <PseudoBox
        _hover={{ borderColor: "blue.500" }}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        maxH="sm"
        m="1em"
      >
        <AspectRatioBox maxW="400px" ratio={4 / 3}>
          <Image
            src={property.imageUrl}
            alt={property.imageAlt}
            objectFit="cover"
          />
        </AspectRatioBox>

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              $ {property.price} / day
            </Box>
          </Box>

          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  name="star"
                  key={i}
                  color={i < property.ratings ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviews} reviews
            </Box>
          </Box>
        </Box>
      </PseudoBox>
    </Link>
  )
}
