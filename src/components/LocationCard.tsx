import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { P, Card, FinePrint, Checkbox } from "@c1ds/components"

interface LocationCardProps {
	lklTitle: string
	city: string | undefined
	countryCd: string | undefined
}

const LocationCard: React.FC<LocationCardProps> = (p: LocationCardProps) => {
	const { lklTitle, city, countryCd } = p

	return (
		<Card id="LocationCard">
			<Flex w="full" height={{ xl: "5px" }}>
				<Box flexBasis={{ base: "5%", xl: "3%" }} alignSelf={{ base: "center" }}>
					<Checkbox id="selectToAdd" aria-label="Select to Add" value="" />
				</Box>

				<Flex flexBasis={{ base: "95%", xl: "97%" }} flexDir={{ base: "column", xl: "row" }} alignSelf="center">
					<Box flexBasis={{ xl: "60%" }}>
						<P>{lklTitle}</P>
					</Box>

					<Box flexBasis={{ xl: "40%" }}>
						<FinePrint color="label">
							U.S. Embassy in {city}, {countryCd}
						</FinePrint>
					</Box>
				</Flex>
			</Flex>
		</Card>
	)
}

export default LocationCard
