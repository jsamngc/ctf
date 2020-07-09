import React, { useState } from "react"
import { navigate } from "gatsby"

import SearchIcon from "@material-ui/icons/Search"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "@material-ui/lab/Pagination"
import { ArrowDropUpSharp, ArrowDropDownSharp } from "@material-ui/icons"

import { Button, ButtonSize, Checkbox, H1, Text, IconAlignment } from "@c1ds/components"
import { Stack, Box, Flex, Button as ChakraButton, InputGroup, Input, InputLeftElement } from "@chakra-ui/core"

import Layout from "../components/Layout"
import EventItem from "../components/Event"
import Dropdown from "../components/Dropdown"
import eventsJSON from "../../content/events.json"
import { getSavedForm, useSavedForm } from "../components/Utility/formHelpers"
import { LinkButton } from "../components/LinkButton"

const useStyles = makeStyles(thema => ({
	root: {
		"& > *": {
			marginTop: thema.spacing(2),
		},
	},
}))

const BasicPagination = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Pagination count={10} />
		</div>
	)
}

const IndexPage = () => {
	
	const sortOnLoad = (unorderedEvents) => {
		return unorderedEvents.sort((a, b) => {
			// Descending order
			const direction = -1
			// currently using evacDepOrdDate as last updated date.
			// Date is presented in format of DD/MM/YYYY
			const aDate = a.evacDepOrdDate.split("/").reverse().join(),
				  bDate = b.evacDepOrdDate.split("/").reverse().join()
			if (aDate > bDate) return direction
			if (aDate < bDate) return -direction
			return 0
		}).filter(event => {
			return event.activeIndicator === "Active"
		})
	}

	// Retrieve saved form from session storage.
	const [savedForm, updateSavedForm] = useSavedForm("events", "ctfForm")

	// Default sort to dispplay the evetns with  with Active Status and sort by the “Last Update” date with the most recent on top
	const initallySortedEvents = () => {
		if (!savedForm) {
			console.log("Event list not intialized")
			const sorted = sortOnLoad(eventsJSON)
			updateSavedForm(sorted)
			return sorted

		}
		return sortOnLoad([...savedForm])
	}
	const [sortedEvents, setSortedEvents] = useState(initallySortedEvents)
	const [sortOption, setSortOption] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [hideInactive, setHideInactive] = useState(true)

	//Sort string depending on the sort option value 
	const onToggleSortBy = (value, label) => {
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
			if (a[field] > b[field]) return direction
			if (a[field] < b[field]) return -direction
			return 0
		})
		setSortedEvents(sorted)
		setSortOption(label)
	}

	//Assuming all the values are in string format MM/DD/YYYY
	const onToggleSortByDate = (value, label) => {
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
			const aDate = a[field].split("/").reverse().join(),
				bDate = b[field].split("/").reverse().join()
			if (aDate > bDate) return direction
			if (aDate < bDate) return -direction
			return 0
		})
		// console.log(sorted)
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
		const events = initallySortedEvents()

		if (searchTerm === "") {
			setSortedEvents(events)
		} else {
			const result = events.filter(event => {
				// Case In-sensitive
				return event.eventTitle.toLowerCase().indexOf(searchTerm) > -1
			})

			setSortedEvents(result)
		}
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
		{ label: "Start Date", value: "eventStartDate", onClick: onToggleSortByDate },
		{ label: "End Date", value: "eventEndDate", onClick: onToggleSortByDate },
		{ label: "Evac. Status", value: "evacStatusCode", onClick: onToggleSortBy },
		{ label: "Status", value: "activeIndicator", onClick: onToggleSortBy },
		{ label: "Last Updated", value: "evacDepOrdDate", onClick: onToggleSortByDate },
	]
	const searchSize = ["100%", "100%", "100%", "305px", "502px", "782px"]

	const sortByText = sortOption[0] === "-" ? sortOption.substring(1, sortOption.length) : sortOption

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
							_disabled={{
								color: "disabledButtonText",
								bg: "disabledBackground",
								borderColor: "disabledBorder",
							}}
							_focus={{
								borderWidth: "2px",
								borderColor: "accent",
							}}
							onKeyDown={handleKeyDown}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</InputGroup>
				</Box>
				<Box as="div" display="flex" mt={8} ml={8}>
					<Box position="relative">
						<Dropdown options={options}>
							<LinkButton>
								<Flex>
									<Box as="span" fontSize="base" marginRight="2">
										Sort by{`: ${sortByText}`}
									</Box>
									{sortOption === "" ? (
										<Flex wrap="wrap" position="relative" size="iconMd">
											<Box
												as={ArrowDropUpSharp}
												size="iconSort"
												position="absolute"
												top="-10px"
												left="-6px"
												color="clickable"
											/>
											<Box
												as={ArrowDropDownSharp}
												size="iconSort"
												position="absolute"
												top="-1px"
												left="-6px"
												color="clickable"
											/>
										</Flex>
									) : sortOption[0] === "-" ? (
										<ArrowDropDownIcon />
									) : (
										<ArrowDropUpIcon />
									)}
								</Flex>
							</LinkButton>
						</Dropdown>
					</Box>

					<Box as="div" display={["none", "none", "none", "block"]}>
						<Button size={ButtonSize.LG} onClick={() => navigate("/createNewEvent")}>
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
				{sortedEvents.length > 0 ? (
					sortedEvents.map(function (event, index) {
						if (hideInactive) {
							if (event.activeIndicator === "Active") {
								return <EventItem key={index} data={event} />
							}
						} else {
							return <EventItem key={index} data={event} />
						}
					})
				) : (
					<H1>data not found</H1>
				)}
			</Stack>
			<Box display="flex" justifyContent="center" my="24px">
				<BasicPagination />
			</Box>
		</Layout>
	)
}

export default IndexPage
