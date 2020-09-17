import React, { useState } from "react"
import { Flex, Box } from "@chakra-ui/core"
import { P, Card, FinePrint, Checkbox } from "@c1ds/components"

interface LocationCardProps {
	lklDto: LklDto
	selectedLocationList: LklDto[]
	setSelectedLocationList: React.Dispatch<React.SetStateAction<LklDto[]>>
}

const LocationCard: React.FC<LocationCardProps> = (p: LocationCardProps) => {
	const { lklDto, selectedLocationList, setSelectedLocationList } = p
	const [isSelected, setIsSelected] = useState(false)
	return (
		<Card id="LocationCard">
			<Flex w="full" height={{ xl: "5px" }}>
				<Box flexBasis={{ base: "5%", xl: "3%" }} alignSelf={{ base: "center" }}>
					<Checkbox
						id="selectToAdd"
						aria-label="Select to Add"
						value=""
						onClick={() => {
							isSelected
								? selectedLocationList.splice(
										selectedLocationList.findIndex(
											(location: LklDto) => location.lookupLklDto.lklTitle === lklDto.lookupLklDto.lklTitle
										),
										1
								  )
								: selectedLocationList.push(lklDto)
							setSelectedLocationList([...selectedLocationList])
							setIsSelected(!isSelected)
						}}
					/>
				</Box>

				<Flex flexBasis={{ base: "95%", xl: "97%" }} flexDir={{ base: "column", xl: "row" }} alignSelf="center">
					<Box flexBasis={{ xl: "60%" }}>
						<P>{lklDto.lookupLklDto.lklTitle}</P>
					</Box>

					<Box flexBasis={{ xl: "40%" }}>
						<FinePrint color="label">
							U.S. Embassy in {lklDto.lookupLklDto.lklAddressDto?.addressDto.city},
							{lklDto.lookupLklDto.lklAddressDto?.addressDto.countryCd}
						</FinePrint>
					</Box>
				</Flex>
			</Flex>
		</Card>
	)
}

export default LocationCard
