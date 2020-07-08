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

// const data = useStaticQuery(graphql`
// 	query SiteTitleQuery {
// 		site {
// 			siteMetadata {
// 				events {
// 					activeIndicator
// 					evacDepAuthDate
// 					evacDepOrdDate
// 					evacStatusCode
// 					evacSummary
// 					eventEndDate
// 					eventId
// 					eventStartDate
// 					eventSummary
// 					eventTitle
// 					eventTypeId
// 					lastUpdatedUserId
// 					managementTypeCode
// 				}
// 			}
// 		}
// 	}
// `)

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
	const [sortOption, setSortOption] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [savedForm, updateSavedForm] = useSavedForm("events", "ctfForm")
	const [hideInactive, setHideInactive] = useState(true)
	const [sortedEvents, sortEvents] = useState(() => {
		const unSortedData = savedForm ? [...savedForm] : []
		//TODO 1.4 The system displays the events with Active Status and sort by the “Last Update” date with the most recent on top by default.
		return unSortedData
	})
	// const [sortOptions, setSortOption] = useState({
	// 	evacStatusCode : '',
	// 	eventStartDate : '',
	// 	eventEndDate : '',
	// 	eventTitle : '',
	// 	eventTypeId : '',
	// 	lastUpdatedUserId : '',
	// })

	// TEMP: Code to intialize event list with test data
	if (!savedForm) {
		console.log("Event list not intialized")
		updateSavedForm(eventsJSON)
		sortEvents(
			eventsJSON.filter(event => {
				return event.activeIndicator === "Active"
			})
		)
	}

	const onToggleSortBy = (value, label) => {
		// value = 'eventTitle'
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
		// console.log(sorted)
		// console.log(value, label)
		sortEvents(sorted)
		setSortOption(label)
	}

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
		sortEvents(sorted)
		setSortOption(label)
	}

	const onToggleHideInactive = () => {
		setHideInactive(!hideInactive)
	}

	const _handleKeyDown = e => {
		if (e.key === "Enter") {
			searchItem()
		}
	}

	const searchItem = () => {
		console.log(searchTerm)
		const sorted = savedForm.slice()

		if (searchTerm === "") {
			sortEvents(savedForm)
		} else {
			const result = sorted.filter(event => {
				return event.eventTitle.indexOf(searchTerm) > -1
			})

			sortEvents(result)
		}
	}

	// const fieldSorter = (fields: string[]) => {
	// 	return function (event1 , event2 ) {
	// 		return fields.map(function (field) {

	// 				let direction = 1;
	// 				if (field[0] === '-') {
	// 					direction = -1;
	// 					field=field.substring(1);
	// 				}
	// 				if (event1[field] > event2[field]) return direction;
	// 				if (event1[field] < event2[field]) return -(direction);
	// 				return 0;
	// 			})
	// 			.reduce(function findPriority (p,n) {
	// 				return p ? p : n;
	// 			}, 0);
	// 	};
	// }

	// const rawEvents = sortedEvents.slice()

	// sortEvents(rawEvents.sort(fieldSorter(Object.values(sortOptions).filter(value => {
	// 	return value ? true : false;
	// }))))
	const options = [
		{ label: "Event Type", value: "eventTypeId", onClick: onToggleSortBy },
		{ label: "Title", value: "eventTitle", onClick: onToggleSortBy },
		{ label: "Start Date", value: "eventStartDate", onClick: onToggleSortByDate },
		{ label: "End Date", value: "eventEndDate", onClick: onToggleSortByDate },
		{ label: "Evac. Status", value: "evacStatusCode", onClick: onToggleSortBy },
		{ label: "Status", value: "activeIndicator", onClick: onToggleSortBy },
		{ label: "Last Updated Date", value: "evacDepOrdDate", onClick: onToggleSortByDate },
	]
	const searchSize = ["100%", "100%", "100%", "305px", "502px", "782px"]

	const sortByText = sortOption[0] === "-" ? sortOption.substring(1, sortOption.length) : sortOption

	return (
		<Layout>
			<Box as="div" whiteSpace="nowrap">
				<H1>Event Management</H1>
			</Box>

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
							onKeyDown={_handleKeyDown}
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
			<Box display="flex" justifyContent="flex-end" my="24px">
				<Checkbox
					id="hideInactive"
					ariaLabel="hide inactive"
					value="Hide Inactive"
					defaultIsChecked={true}
					onChange={onToggleHideInactive}
				/>
			</Box>
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
