import React, { useState } from "react"
import { navigate } from "gatsby"

import SearchIcon from "@material-ui/icons/Search"
import AddIcon from "@material-ui/icons/Add"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "@material-ui/lab/Pagination"
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore"

import { Button, ButtonSize, Checkbox, H1, Text, IconAlignment } from "@c1ds/components"
import { Stack, Box, Button as ChakraButton } from "@chakra-ui/core"

import Layout from "../components/Layout"
import EventItem from "../components/Event"
import Dropdown from "../components/Dropdown"
import eventsJSON from "../../content/events.json"
import { getSavedForm, useSavedForm } from "../components/Utility/formHelpers"

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

	// console.log(data.site.siteMetadata.events)
	const [savedForm, updateSavedForm] = useSavedForm("events", "ctfForm")
	const [sortedEvents, sortEvents] = useState(() => {
		const unSortedData = savedForm ? [...savedForm] : []
		return unSortedData.filter(event => {
			return event.activeIndicator === "Active"
		})
	})

	if (!savedForm) {
		console.log("Event list not intialized")
		updateSavedForm(eventsJSON)
		sortEvents(
			eventsJSON.filter(event => {
				return event.activeIndicator === "Active"
			})
		)
	}
	// console.log(unsorteddata);

	const onToggleTitle = () => {
		console.log("what?")
		const sorted = sortedEvents.slice()
		// sorted.sort((a, b) => a.eventId > b.eventId);
		sorted.reverse()
		console.log(sorted)
		sortEvents(sorted)
	}

	const onToggleHideInactive = event => {
		const checked = event.target.checked
		const unSortedData = savedForm ? [...savedForm] : []
		const sorted = unSortedData.slice()
		// sorted.sort((a, b) => a.eventId > b.eventId);
		sortEvents(
			sorted.filter(event => {
				if (!checked) {
					return true
				}
				return event.activeIndicator === "Active"
			})
		)
		// console.log(sorted)
	}

	const options = [
		{ label: "Event Type", value: "option1" },
		{ label: "Title", value: "option2", onClick: onToggleTitle },
		{ label: "Start Date", value: "option3" },
		{ label: "End Date", value: "option4" },
		{ label: "Evac. Status", value: "option5" },
		{ label: "Status", value: "option6" },
	]

	const searchSize = ["100%", "100%", "100%", "305px", "502px", "782px"]
	// const currTheme = useTheme()

	return (
		<Layout>
			<Box as="div" whiteSpace="nowrap">
				<H1>Event Management</H1>
			</Box>

			<Box as="div" display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-end">
				<Box as="div" mr="auto" w={searchSize}>
					<Text
						id="leadingText"
						labelId="leadingLabel"
						describedBy="leadingLabel"
						value="Search for an event"
						size={searchSize}
						textIcon={{
							mdIcon: SearchIcon,
							color: "accent",
							alignment: IconAlignment.LEFT,
						}}
						onChange={() => console.log("Change")}
					/>
				</Box>
				<Box as="div" display="flex" mt={8} ml={8}>
					<Box position="relative">
						<Dropdown options={options}>
							<Button w="120px" h="150px">
								Sort By <UnfoldMoreIcon fontSize="small" />
							</Button>
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
				{sortedEvents.map(function (event, index) {
					return <EventItem key={index} data={event} />
				})}
			</Stack>
			<Box display="flex" justifyContent="center" my="24px">
				<BasicPagination />
			</Box>
		</Layout>
	)
}

export default IndexPage
