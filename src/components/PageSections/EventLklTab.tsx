import React, { useState } from "react"
import { navigate } from "gatsby"
import moment from "moment"

import { Flex, Box, Grid, Button as ChakraButton } from "@chakra-ui/core"
import { P, H3, C1_DATE_FORMAT as DateFormat, LinkButton, IconAlignment, Link } from "@c1ds/components"

import LKLCard from "../LKLCard"
import HideInactiveButton from "../HideInactiveButton"

import Pagination from "@material-ui/lab/Pagination"
import { AddSharp } from "@material-ui/icons"
import { SvgIcon } from "@material-ui/core"
import { EventPageState } from "../../pages/event"
import { EventLocationTabMapIcon } from "../Icons/icons"
import EventLocationTabMap from "../Icons/eventLocationTabMap.inline.svg"

const DateTimeFormat = `${DateFormat} HH:mm:ss:SS ZZ`

interface LastKnownLocationTabProps {
	eventData: EventFormData
	setEventData: (eventdata: EventFormData) => void
}

export const LastKnownLocationTab: React.FC<LastKnownLocationTabProps> = (p: LastKnownLocationTabProps) => {
	// Currently using the first event eventLklDtoList for demonstration
	const { eventData, setEventData } = p

	const eventLklDtoList: LklDto[] =
		eventData.eventLklDtoList?.map(eventLklDto => {
			const eventLklDtoWithDate: LklDto = {
				...eventLklDto,
				createdDateTime: moment(eventLklDto.createdDateTime, DateTimeFormat).toDate(),
				lastUpdatedDateTime: moment(eventLklDto.lastUpdatedDateTime, DateTimeFormat).toDate(),
			}
			return eventLklDtoWithDate
		}) ?? []
	const [page, setPage] = useState(1)
	const [lklsPerPage, setLklsPerPage] = useState(10)
	const [hideInactive, setHideInactive] = useState(true)

	/**
	 * 1.5 The system displays the default location list with “Active” location status and sort by Last Updated Date (Still working on the UI)
	 */
	eventLklDtoList.sort((a: LklDto, b: LklDto) => {
		const aLastUpdatedTime = a.lastUpdatedDateTime ?? new Date()
		const bLastUpdatedTime = b.lastUpdatedDateTime ?? new Date()
		// Descending order
		const direction = -1
		if (aLastUpdatedTime > bLastUpdatedTime) return direction
		if (aLastUpdatedTime < bLastUpdatedTime) return -direction
		return 0
	})
	const controlledLkls = eventLklDtoList.filter((event: LklDto) => {
		if (hideInactive) return event.activeIndicator
		else return true
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
		// first Flex will be removed once tabular view is established
		/**
            1.1     The user can access the Last Known Locations (list) screen by click on Last Known Locations menu item when editing an event.
            1.2     The user can see the Event Title of the event that is being edited on top of the screen
        */

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
			{/* 1.8     The user can set “Hide Inactive Location” to NO to view all 
                    last known locations (Active and Inactive) order by default Last Updated Date */}
			{/* <Box mr={20}>
                        <HideInactiveButton onToggleHideInactive={() => {return}} />
                    </Box> */}
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
					{/* LKL card list*/}
					{/* 1.3     The user can see the following fields on View Last Known Location screen
					·         Hide Inactive Location - Indicator
					·         [Add Location] – button
					·         Last Known Location - card
					·         Pagination
					1.6     The system defaults “Hide Inactive Location” to YES  (Still working on the UI)
					1.7     The user can distinguish active or inactive last known location visually.  (Still working on the UI)
				*/}
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

					{/* 1.9     The system displays the proper pagination at bottom of the Last 
                            Known Location List, each page contains “X” number of records.  
                            (“X” is based on C1 design) 
					1.10    The user can browse through additional Last Known Locations 
							by using the pagination controls (e.g. First, Next, Last, Page Number etc.) .
                    
					Pagination is not yet build in wireframe, so this is just place holder.
                */}
					{/* pagination */}

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
