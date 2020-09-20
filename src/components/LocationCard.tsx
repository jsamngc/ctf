import React from "react"
import { Flex, Box } from "@chakra-ui/core"
import { P, Card, FinePrint, Checkbox } from "@c1ds/components"

import countries_json from "../../content/countries.json"

interface LocationCardProps {
	lookupLklDto: LookupLklDto
	isSelected?: boolean
	onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>
}

const LocationCard: React.FC<LocationCardProps> = (p: LocationCardProps) => {
	const { lookupLklDto, onChange, isSelected = false } = p

	const city = lookupLklDto.lklAddressDto?.addressDto.city
	const country =
		countries_json.find(country => country.value === lookupLklDto.lklAddressDto?.addressDto.countryCd)?.label ??
		lookupLklDto.lklAddressDto?.addressDto.countryCd

	const countryCaseFixed = country
		?.toLowerCase()
		.split(" ")
		.map(str => {
			return str.charAt(0).toUpperCase() + str.substring(1)
		})
		.join(" ")

	return (
		<Card id="LocationCard">
			<Flex w="full" height={{ xl: "5px" }}>
				<Box flexBasis={{ base: "5%", xl: "3%" }} alignSelf={{ base: "center" }}>
					<Checkbox id="selectToAdd" aria-label="Select to Add" value="" checked={isSelected} onChange={onChange} />
				</Box>

				<Flex flexBasis={{ base: "95%", xl: "97%" }} flexDir={{ base: "column", xl: "row" }} alignSelf="center">
					<Box flexBasis={{ xl: "60%" }}>
						<P>{lookupLklDto.lklTitle}</P>
					</Box>

					<Box flexBasis={{ xl: "40%" }}>
						<FinePrint color="label">
							U.S. Embassy in {city}, {countryCaseFixed}
						</FinePrint>
					</Box>
				</Flex>
			</Flex>
		</Card>
	)
}

export default LocationCard
