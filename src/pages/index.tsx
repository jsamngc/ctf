import React, { useState } from "react"
import { navigate } from "gatsby"
import moment from "moment"

import SearchIcon from "@material-ui/icons/Search"
import ClearIcon from '@material-ui/icons/Clear';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "@material-ui/lab/Pagination"
import { ArrowDropUpSharp, ArrowDropDownSharp } from "@material-ui/icons"

import { Button, ButtonSize, Checkbox, H1 } from "@c1ds/components"
import { Stack, Box, Flex, Button as ChakraButton, InputGroup, Input, InputLeftElement,InputRightElement } from "@chakra-ui/core"

import Layout from "../components/Layout"
import EventItem from "../components/Event"
import Dropdown, { DropdownClick } from "../components/Dropdown"
import eventsJSON from "../../content/events.json"
import { getSavedForm, useSavedForm } from "../components/Utility/formHelpers"
import { LinkButton } from "../components/LinkButton"

const IndexPage = () => {
	// Reverse the date to sortable string : "YYYY/MM/dd hh:mm:ss"
	// const reverseDateOrder = date => {
	// 	const parts = date.split('/').map(v => v.padStart(2, '0'));
	// 	return `${parts[2]}${parts[0]}${parts[1]}`;
	// };

	const sortOnLoad = (unorderedEvents) => {
		return unorderedEvents.sort((a, b) => {
			// Descending order
			const direction = -1
			// currently using evacDepOrdDate as last updated date.
			// Date is presented in format of "YYYY/MM/dd hh:mm:ss"
			if (a.lastUpdatedDateTime > b.lastUpdatedDateTime) return direction
			if (a.lastUpdatedDateTime < b.lastUpdatedDateTime) return -direction
			return 0
		})
	}

	// Retrieve saved form from session storage.
	const [savedForm, updateSavedForm] = useSavedForm("events", "ctfForm")

	// Default sort to dispplay the evetns with  with Active Status and sort by the “Last Update” date with the most recent on top
	const initalEvents = () => {
		if (!savedForm) {
			console.log("Event list not intialized")
			const formattedEvetns = eventsJSON.map(event => {
				const eventWithDate = {
					...event,
					eventStartDate: moment(event.eventStartDate).toDate(),
					eventEndDate: moment(event.eventEndDate).toDate(),
					evacDepAuthDate: moment(event.evacDepAuthDate).toDate(),
					evacDepOrdDate: moment(event.evacDepOrdDate).toDate(),
					lastUpdatedDateTime: moment(event.lastUpdatedDateTime).toDate(),
				}
				return eventWithDate
			})
			const sorted = sortOnLoad(formattedEvetns)
			updateSavedForm(sorted)
			return sorted
		}
		return sortOnLoad([...savedForm])
	}
	const [sortedEvents, setSortedEvents] = useState(initalEvents())
	const [sortOption, setSortOption] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [hideInactive, setHideInactive] = useState(true)
	//Pagination states
	const [page, setPage] = useState(1)
	const [eventsPerPage, setEventsPerPage] = useState(10)

	//Sort string depending on the sort option value
	const onToggleSortBy: DropdownClick = (value, label) => {
		let option = value
		if (sortOption === label) {
			option = "-" + value
			label = "-" + label
		}

		const sorted = sortedEvents.slice()
		sorted.sort((a, b) => {
			let direction = 1
			let field = option
			if (field[0] === "-") {
				direction = -1
				field = field.substring(1)
			}
			
			if(field === "activeIndicator"){
				console.log(typeof a[field])
			}

			if(typeof a[field] === 'boolean'){
				// console.log(typeof a[field])
				const aValue = a[field]?1:-1, bValue = b[field]?1:-1
				if (aValue > bValue) return direction
				if (aValue < bValue) return -direction
			}
			else{
				if (a[field] > b[field]) return direction
				if (a[field] < b[field]) return -direction
			}
			return 0
		})
		setSortedEvents(sorted)
		setSortOption(label)
	}

	// Hide Inactive events in the management view on toggle
	const onToggleHideInactive = () => {
		setHideInactive(!hideInactive)
	}

	// Event handler for key down such as Enter key
	const handleKeyDown = e => {
		if (e.key === "Enter") {
			searchItem()
		}
	}

	// Search function tirgger
	const searchItem = () => {
		const events = initalEvents()
		
		if (searchTerm === "") {	
			setSortedEvents(events)
		} else {
			const result = events.filter(event => {
				// Case In-sensitive
				return event.eventTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
			})

			setSortedEvents(result)
		}
		setSortOption('')
		setPage(1);
	}

	/* FUTURE: maybe enhancement : multiple sorting logic.
	const fieldSorter = (fields: string[]) => {
		return function (event1 , event2 ) {
			return fields.map(function (field) {

					let direction = 1;
					if (field[0] === '-') {
						direction = -1;
						field=field.substring(1);
					}
					if (event1[field] > event2[field]) return direction;
					if (event1[field] < event2[field]) return -(direction);
					return 0;
				})
				.reduce(function findPriority (p,n) {
					return p ? p : n;
				}, 0);
		};
	}

	const rawEvents = sortedEvents.slice()

	setSortedEvents(rawEvents.sort(fieldSorter(Object.values(sortOptions).filter(value => {
		return value ? true : false;
	}))))
	*/

	// Sort option labels, values and onClick eventhandlers. Order is identical to the option menu
	const options = [
		{ label: "Event Type", value: "eventTypeId", onClick: onToggleSortBy },
		{ label: "Title", value: "eventTitle", onClick: onToggleSortBy },
		{ label: "Start Date", value: "eventStartDate", onClick: onToggleSortBy },
		{ label: "End Date", value: "eventEndDate", onClick: onToggleSortBy },
		{ label: "Evac. Status", value: "evacStatusCode", onClick: onToggleSortBy },
		{ label: "Status", value: "activeIndicator", onClick: onToggleSortBy },
		{ label: "Last Updated", value: "lastUpdatedDateTime", onClick: onToggleSortBy },
	]

	const getOptionsValue = (labelKey : string) => {
		return options.find(option => option.label === labelKey)?.value;
	}

	const searchSize = ["100%", "100%", "100%", "305px", "502px", "782px"]

	const sortByText = sortOption[0] === "-" ? sortOption.substring(1, sortOption.length) : sortOption
	
	const indexOfLastEvent = page * eventsPerPage
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
	const controlledEvents = sortedEvents.filter((event) => {
		if (hideInactive) 
			return event.activeIndicator
		else
			return true
	})

	console.log("events on controlledEvents", controlledEvents)

	const isMutiplePages = controlledEvents.length > eventsPerPage
	const totalPages = isMutiplePages ? Math.ceil(controlledEvents.length/eventsPerPage) : 1
	const eventsOnPage = totalPages !== 1 ? controlledEvents.slice(indexOfFirstEvent, indexOfLastEvent) : controlledEvents
	
	return (
		<Layout>
			{/* Heading */}
			<Box as="div" whiteSpace="nowrap">
				<H1>Event Management</H1>
			</Box>

			{/* Search Inbox, Sort Filter Menu, and Creat Event Button */}
			<Box as="div" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-end">
				<Box as="div" mr="auto" w={searchSize}>
					<InputGroup width={searchSize} mt={8}>
						<InputLeftElement
							px="inputX"
							width="auto"
							height="input"
							onClick={searchItem}
							children={<Box as={SearchIcon} color="accent" role="presentation" size="iconMd" />}
						/>

						<Input
							color="text"
							height="input"
							display="inline-block"
							fontFamily="body"
							fontSize="base"
							borderStyle="solid"
							border={1}
							borderColor="inputBorder"
							boxSizing="border-box"
							pl="2.5rem"
							py={4}
							outline="none"
							placeholder="Search for an event"
							_disabled={{
								color: "disabledButtonText",
								bg: "disabledBackground",
								borderColor: "disabledBorder",
							}}
							_focus={{
								borderWidth: "2px",
								borderColor: "accent",
							}}
							value={searchTerm}
							onKeyDown={handleKeyDown}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						{searchTerm ?
						<InputRightElement 
							width="input"
							height="input"
							onClick={() => setSearchTerm('')}
							children={<Box as={ClearIcon} color="inputPlaceholder" role="presentation" size="iconMd" />} /> 
						: null }
					</InputGroup>
				</Box>
				<Box as="div" display="flex" mt={8} ml={8}>
					<Box position="relative"  >
						<Dropdown options={options}>
							<LinkButton>
								<Flex >
									<Box as="span" fontSize="base" marginRight={2} cursor="pointer">
										Sort by{`: ${sortByText}`}
									</Box>
									
									{sortOption === "" ? (
										<Flex wrap="wrap" position="relative" size="iconMd"  ml={4}>
											<Box
												as={ArrowDropUpSharp}
												size="iconSort"
												position="absolute"
												top={-10}
												left={-6}
												color="clickable"
											/>
											<Box
												as={ArrowDropDownSharp}
												size="iconSort"
												position="absolute"
												top={-1}
												left={-6}
												color="clickable"
											/>
										</Flex>
									) : sortOption[0] === "-" ? (
										<Box as="span">
											<Box as={ArrowDropDownIcon}
											size="iconMd"
											border="1px solid option"
											borderRadius={4}
											cursor="pointer"
											ml={4}
											onClick={e => {
												e.stopPropagation()
												onToggleSortBy(getOptionsValue(sortByText), sortOption.substring(1))
											}} />
											{/* <Box as={ClearIcon}
											size="24px"
											cursor="pointer"
											onClick={e => {
												e.stopPropagation()
												setSortOption("")
											}} /> */}
										</Box>
									) : (
										<Box as="span" >
											<Box as={ArrowDropUpIcon}
											size="24px"
											border="1px solid option"
											borderRadius={4}
											cursor="pointer"
											ml={4}
											onClick={e => {
												e.stopPropagation()
												onToggleSortBy(getOptionsValue(sortByText), sortOption )
											}} />
											{/* <Box as={ClearIcon}
											cursor="pointer"
											size="24px"
											onClick={e => {
												e.stopPropagation()
												setSortOption("")
												setSortedEvents(sortOnLoad(sortedEvents))
											}}
											/> */}
										</Box>
										
									)}
									
								</Flex>
							</LinkButton>
						</Dropdown>
					</Box>

					<Box as="div" display={["none", "none", "none", "block"]}>
						<Button size={ButtonSize.LG} onClick={() => navigate("/eventDetails")}>
							Create New Event
						</Button>
					</Box>
					<Box
						as="div"
						bottom="16px"
						zIndex={2}
						right="16px"
						position="fixed"
						display={["block", "block", "block", "none"]}>
						<ChakraButton
							size="md"
							borderColor="transparent"
							boxShadow="0px 5px #88888878"
							color="white"
							height="48px"
							width="48px"
							rounded="25px"
							background="#0071BC"
							_hover={{
								bg: "secondary",
							}}>
							<AddIcon />
						</ChakraButton>
					</Box>
				</Box>
			</Box>

			{/* Hide Inactive */}
			<Box display="flex" justifyContent="flex-end" my="24px">
				<Checkbox
					id="hideInactive"
					ariaLabel="hide inactive"
					value="Hide Inactive"
					defaultIsChecked={true}
					onChange={onToggleHideInactive}
				/>
			</Box>

			{/* Event List */}
			<Stack spacing="16px">
				{eventsOnPage.length > 0 ? (
					eventsOnPage.map(function (event, index) {
						return <EventItem key={index} data={event} />
					})
				) : (
					<H1>data not found</H1>
				)}
			</Stack>
			<Box display="flex" justifyContent="center" my="24px">
				<h3>Total Events: {controlledEvents.length}</h3>
				<Pagination count={totalPages} onChange={(event, value) => setPage(value)} />
			</Box>
		</Layout>
	)
}

export default IndexPage
