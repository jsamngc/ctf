import React, { useState } from "react"
import { navigate } from "gatsby"
import moment from "moment"

import { Flex, Box, Grid, Button as ChakraButton } from "@chakra-ui/core"
import { P, H3, LinkButton, IconAlignment, Link } from "@c1ds/components"

import LKLCard from "../LKLCard"
import HideInactiveButton from "../HideInactiveButton"

import Pagination from "@material-ui/lab/Pagination"
import { AddSharp } from "@material-ui/icons"
import { EventPageState } from "../../pages/event"
import { EventLocationTabMapIcon } from "../Icons/icons"

interface LastKnownLocationTabProps {
	eventData: EventFormData
	setEventData: (eventdata: EventFormData) => void
}

export const LastKnownLocationTab: React.FC<LastKnownLocationTabProps> = (p: LastKnownLocationTabProps) => {
	// Currently using the first event eventLklDtoList for demonstration
	const { eventData, setEventData } = p

	const eventLklDtoList: LklDto[] = eventData.eventLklDtoList ?? []

	const [page, setPage] = useState(1)
	const [lklsPerPage, setLklsPerPage] = useState(10)
	const [hideInactive, setHideInactive] = useState(true)

	const controlledLkls = eventLklDtoList.filter((event: LklDto) => {
		if (hideInactive) return event.activeIndicator
		else return true
	})
	controlledLkls.sort((a: LklDto, b: LklDto) => {
		// Temporary solution to string date properties
		const checkString = (field : string | Date | undefined) => {
			if (typeof field === 'object') return field
			if (typeof field === 'string') return moment(field).toDate()
			return new Date()
		}
		const aLastUpdatedTime = checkString(a.lastUpdatedDateTime)
		const bLastUpdatedTime = checkString(b.lastUpdatedDateTime)
		// Descending order
		const direction = -1
		if (aLastUpdatedTime > bLastUpdatedTime) return direction
		if (aLastUpdatedTime < bLastUpdatedTime) return -direction
		return 0
	})

	const numOfPages = Math.ceil(controlledLkls.length / lklsPerPage)
	// Update the page number when inactive events are hidden
	if (page > numOfPages) setPage(numOfPages)

	const indexOfLastEvent = page * lklsPerPage
	const indexOfFirstEvent = indexOfLastEvent - lklsPerPage

	const isMultiplePages = controlledLkls.length > lklsPerPage
	const totalPages = isMultiplePages ? Math.ceil(controlledLkls.length / lklsPerPage) : 1
	const lklsOnPage = totalPages !== 1 ? controlledLkls.slice(indexOfFirstEvent, indexOfLastEvent) : controlledLkls

	return (
		<Grid
			gridColumn="1 / -1"
			gridGap={{ base: "16px", md: "24px" }}
			gridTemplateColumns={{
				base: "repeat(4, 1fr)",
				md: "repeat(12, 1fr)",
				lg: "repeat(12, 1fr)",
			}}>
			<Flex gridColumn="1 / -1" align="center" justify="space-between">
				<Box>
					<H3>Last Known Locations</H3>
				</Box>
				<Box display={{ base: "none", md: "block" }}>
					<LinkButton
						buttonIcon={{ mdIcon: AddSharp, alignment: IconAlignment.LEFT, color: "clickable" }}
						onClick={() => {
							const pageState: EventPageState = {
								eventId: eventData.eventId,
								formSection: "locations",
							}
							navigate("/searchLKL", { state: pageState })
						}}>
						&nbsp;Add Location
					</LinkButton>
				</Box>
			</Flex>
			<Box gridColumn="1 / -1">
				<P>Manage the last known locations for U.S. citizens involved in this crisis.</P>
			</Box>
			<Box bottom="16px" zIndex={2} right="16px" position="fixed" display={{ md: "none" }}>
				<ChakraButton
					borderColor="transparent"
					boxShadow="0 6px 6px 0 rgba(0, 0, 0, 0.4)"
					color="white"
					height="40px"
					width="40px"
					rounded="round"
					bg="clickable"
					cursor="pointer"
					_hover={{
						bg: "secondary",
					}}
					onClick={() => navigate("/addLKL")}>
					<Box as={AddSharp} size="iconMobileCreate" />
				</ChakraButton>
			</Box>
			{eventLklDtoList.length != 0 ? (
				<>
					<Flex
						gridColumn={{ base: "1 / 3", md: "1 / -1" }}
						gridRow={{ base: "3", md: "auto" }}
						justify={{ base: "flex-start", md: "flex-end" }}>
						<HideInactiveButton onToggleHideInactive={() => setHideInactive(!hideInactive)} />
					</Flex>

					{lklsOnPage.map((lklData: LklDto, index) => {
						return (
							<Box key={index} gridColumn="1 / -1">
								<LKLCard lklData={lklData} setEventData={setEventData} />
							</Box>
						)
					})}

					<Flex gridColumn="1 / -1" justify="space-evenly">
						<P>{eventLklDtoList.length} results</P>
						<Pagination
							page={page}
							count={totalPages}
							onChange={(_, value) => setPage(value)}
							showLastButton
							size="small"
						/>
						<select>
							<option value="10">10</option>
							<option value="20">20</option>
						</select>
					</Flex>
				</>
			) : (
				<>
					<Flex gridColumn="1 / -1" justifyContent="center">
						<EventLocationTabMapIcon width={{ base: "192px", md: "240px" }} height={{ base: "168px", md: "210px" }} />
					</Flex>
					<Flex gridColumn="1 / -1" justifyContent="center" textAlign="center">
						<Box width={{ sm: "252px", md: "full" }}>
							<P color="label">
								There are no last known locations.&nbsp;
								<Link
									onClick={() => {
										const pageState: EventPageState = {
											eventId: eventData.eventId,
											formSection: "locations",
										}
										navigate("/searchLKL", { state: pageState })
									}}>
									Add location now.
								</Link>
							</P>
						</Box>
					</Flex>
				</>
			)}
		</Grid>
	)
}
