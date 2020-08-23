import React, { useState } from "react"
import { navigate } from "gatsby"
import moment from "moment"

import { Flex, Box, Divider, Button } from "@chakra-ui/core"
import { P, H3, Link, C1_DATE_FORMAT as DateFormat } from "@c1ds/components"

import Layout from "../components/Layout"
import HideInactiveButton from "../components/HideInactiveButton"
import LKLCard from "../components/LKLCard"

import eventsJSON from "../../content/events.json"

import Pagination from "@material-ui/lab/Pagination"
import AddIcon from "@material-ui/icons/Add"

const DateTimeFormat = `${DateFormat} HH:mm:ss:SS ZZ`
// Just for Demonstartion purpose.
interface EventLKLFormData extends Record<string, boolean | Date | string | number | LklDto[] | undefined> {
	eventId: string
	eventTitle: string
	eventStartDate?: Date
	eventEndDate?: Date
	activeIndicator?: boolean
	managementTypeCode: string
	eventTypeId: string
	eventSummary?: string
	evacStatusCode?: string
	evacDepAuthDate?: Date
	evacDepOrdDate?: Date
	evacSummary?: string
	lastUpdatedDateTime?: Date
	eventLklDtoList?: LklDto[]
}

// LklDto related interfaces
interface PersonEmailDto {
	personEmailId: string
	emailDto: {
		emailId: string
		emailAddress: string
	}
}
interface PersonPhoneDto {
	personPhoneId: string
	phoneDto: {
		phoneId: string
		phoneNum: string
		phoneTypeCd: string
	}
}

export interface PersonDto {
	personId: string
	givenName: string
	surName: string
	personEmailDtoList: PersonEmailDto[]
	personPhoneDtoList: PersonPhoneDto[]
}

export interface LklPocListDto {
	lklPocId: string
	personDto: PersonDto
}

export interface AddressDto {
	addressId: string
	addressTypeCd: string
	address1: string
	address2: string
	city: string
	countryCd: string
	postalCode: string
	stateCd: string
}

interface LklAddressDto {
	lklAddressId: string
	addressDto: AddressDto
}

export interface LookupLklDto {
	lookupLklId: string
	lklTitle: string
	locationDesc: string
	postCd: string
	countryCd: string
	lklAddressDto: LklAddressDto
	lklPocListDto: LklPocListDto[]
}
// Last Known Location Data Transfer Object
export interface LklDto {
	eventId: string
	eventLklId: string
	activeIndicator: boolean
	lklTypeCd: string
	createdDateTime: Date
	lastUpdatedDateTime: Date
	lookupLklDto: LookupLklDto
}

const LastKnownLocation: React.FC = () => {
	// Currently using the first event eventLklDtoList for demonstration
	const savedEvent = eventsJSON[0]

	const eventLklDtoList: LklDto[] = savedEvent.eventLklDtoList.map(eventLklDto => {
		const eventLklDtoWithDate: LklDto = {
			...eventLklDto,
			createdDateTime: moment(eventLklDto.createdDateTime, DateTimeFormat).toDate(),
			lastUpdatedDateTime: moment(eventLklDto.lastUpdatedDateTime, DateTimeFormat).toDate(),
		}
		return eventLklDtoWithDate
	})
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

		<Layout pageTitle="Last Known Location" pageHeading={savedEvent.eventTitle}>
			<Divider width="100%" gridColumn={{ base: "1 / -1" }} borderColor="silver" />
			<Flex gridColumn={{ base: "1 / -1" }} direction="column">
				<Flex
					gridColumn={{ base: "1 / -1", md: "1 / 5", lg: "1 / 8", xl: "1 / 9" }}
					direction="row"
					wrap="wrap"
					justify="flex-end"
					mb={8}>
					<Box flexGrow={1} aria-label="Last Known Locations">
						<H3>Last Known Locations</H3>
					</Box>

					{/* 1.8     The user can set “Hide Inactive Location” to NO to view all 
                    last known locations (Active and Inactive) order by default Last Updated Date */}
					{/* <Box mr={20}>
                        <HideInactiveButton onToggleHideInactive={() => {return}} />
                    </Box> */}

					<Box bottom="16px" zIndex={2} right="16px" position="fixed" display={{ md: "none" }}>
						<Button
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
							onClick={() => navigate("/event")}>
							<AddIcon />
						</Button>
					</Box>
					<Flex display={{ base: "none", md: "flex" }} alignItems="center">
						<Box as={AddIcon} alignSelf="center" size="iconPoc" color="lochmara" mx={8} h={16} />
						<Link
							onClick={() => {
								// navigate("/event", { state: { eventId: eventId } })
								navigate("/addLKL")
							}}>
							Add Location
						</Link>
					</Flex>
				</Flex>
				<Flex
					gridColumn={{ base: "1 / -1", md: "1 / 5", lg: "1 / 8", xl: "1 / 9" }}
					direction="row"
					wrap="wrap"
					justify="flex-end">
					<Box flexGrow={1} mb={20}>
						<P>Manage the last known locations for U.S. citizens involved in this crisis</P>
					</Box>
				</Flex>
				{/* LKL card list*/}
				{/* 1.3     The user can see the following fields on View Last Known Location screen
                    ·         Hide Inactive Location - Indicator
                    ·         [Add Location] – button
                    ·         Last Known Location - card
                    ·         Pagination
                    1.6     The system defaults “Hide Inactive Location” to YES  (Still working on the UI)
                    1.7     The user can distinguish active or inactive last known location visually.  (Still working on the UI)
                */}
				{/* 
                <Flex
                    gridColumn={{ base: "1 / 3", md: "1 / -1" }}
                    gridRow={{ base: "3", md: "auto" }}
                    justify={{ base: "flex-start", md: "flex-end" }}>
                    <HideInactiveButton onToggleHideInactive={onToggleHideInactive} />
                </Flex> 
                */}

				{lklsOnPage.map((lklData: LklDto, index) => {
					return <LKLCard key={index} lklData={lklData} />
				})}

				{/* 1.9     The system displays the proper pagination at bottom of the Last 
                            Known Location List, each page contains “X” number of records.  
                            (“X” is based on C1 design) 
                    1.10    The user can browse through additional Last Known Locations 
                            by using the pagination controls (e.g. First, Next, Last, Page Number etc.) .
                    
                    Pagination is not yet build in wireframe, so this is just place holder.
                */}
				{/* pagination */}

				<Flex gridColumn="1 / -1" justify="center">
					<P>Total Locations: {eventLklDtoList.length}</P>
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
			</Flex>
		</Layout>
	)
}

export default LastKnownLocation
