import React, { useState } from "react"
import moment from "moment"

import Pagination from "@material-ui/lab/Pagination"
import { H1, C1_DATE_FORMAT as DateFormat } from "@c1ds/components"
import { Flex } from "@chakra-ui/core"

import Layout from "../components/Layout"
import SortFilter from "../components/SortFilter"
import EventCard from "../components/EventCard"
import HideInactiveButton from "../components/HideInactiveButton"
import SearchInput from "../components/SearchInput"
import { DropdownClick } from "../components/Dropdown"
import eventsJSON from "../../content/events.json"
import { useSavedForm } from "../components/Utility/formHelpers"
import { EventFormData } from "../components/Forms/EventForm"

const DateTimeFormat = `${DateFormat} HH:mm:ss:SS ZZ`

/**
 * Event List page component which includes standard C1DS grid layout
 */
const IndexPage: React.FC = () => {
	const sortOnLoad = (unorderedEvents: EventFormData[]) => {
		return unorderedEvents.sort((a, b) => {
			const aLastUpdatedTime = a.lastUpdatedDateTime ?? new Date()
			const bLastUpdatedTime = b.lastUpdatedDateTime ?? new Date()
			// Descending order
			const direction = -1
			if (aLastUpdatedTime > bLastUpdatedTime) return direction
			if (aLastUpdatedTime < bLastUpdatedTime) return -direction
			return 0
		})
	}

	// Retrieve saved form from session storage.
	const [savedEvents, updateSavedEvents] = useSavedForm<EventFormData[]>("ctfForms", "events")

	// Default sort to display the events with  with Active Status and sort by the “Last Update” date with the most recent on top
	const initialEvents = () => {
		let eventList = savedEvents
		if (!savedEvents) {
			const formattedEvents = eventsJSON.map(event => {
				const eventWithDate: EventFormData = {
					...event,
					eventStartDate: event.eventStartDate ? moment(event.eventStartDate, DateFormat).toDate() : undefined,
					eventEndDate: event.eventEndDate ? moment(event.eventEndDate, DateFormat).toDate() : undefined,
					evacDepAuthDate: event.evacDepAuthDate ? moment(event.evacDepAuthDate, DateFormat).toDate() : undefined,
					evacDepOrdDate: event.evacDepOrdDate ? moment(event.evacDepOrdDate, DateFormat).toDate() : undefined,
					lastUpdatedDateTime: event.lastUpdatedDateTime
						? moment(event.lastUpdatedDateTime, DateTimeFormat).toDate()
						: undefined,
				}
				return eventWithDate
			})
			updateSavedEvents(formattedEvents)
			eventList = formattedEvents
		}
		const formattedEvents = eventList.map(event => {
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
		return sortOnLoad([...formattedEvents])
	}
	const [sortedEvents, setSortedEvents] = useState<EventFormData[]>(initialEvents())
	const [sortOption, setSortOption] = useState("")
	const [searchTerm, setSearchTerm] = useState("")
	const [hideInactive, setHideInactive] = useState(true)
	//Pagination states
	const [page, setPage] = useState(1)
	const [eventsPerPage, setEventsPerPage] = useState(10) //TODO: Determine expected sorting behavior of empty vals

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

			let aValue = a[field],
				bValue = b[field]
			// for boolean values such as : activeIndicator
			if (typeof a[field] === "boolean") {
				;(aValue = a[field] ? 1 : -1), (bValue = b[field] ? 1 : -1)
			}
			// for Evac Status, None, ADEP, and ODEP
			else if (field === "evacStatusCode") {
				aValue = a[field]?.toLowerCase() === "none" ? "" : a[field]
				bValue = b[field]?.toLowerCase() === "none" ? "" : b[field]
			} else if (typeof aValue === "string" && typeof bValue === "string") {
				aValue = aValue?.toLowerCase()
				bValue = bValue?.toLowerCase()
			}

			if ((aValue as Date | string | number) > (bValue as Date | string | number)) return direction
			if ((aValue as Date | string | number) < (bValue as Date | string | number)) return -direction
			return 0
		})

		// For end date sort, push active events to the end of list.
		if (value === "eventEndDate") {
			let arrLength = sorted.length
			for (let index = 0; index < arrLength; index++) {
				if (sorted[index].activeIndicator) {
					sorted.push(sorted.splice(index, 1)[0])
					index--
					arrLength--
				}
			}
		}

		setSortedEvents(sorted)
		setSortOption(label)
	}

	// Hide Inactive events in the management view on toggle
	const onToggleHideInactive = () => {
		setHideInactive(!hideInactive)
	}

	// Search function trigger
	const onSearchEvent = (term: string) => {
		const events = initialEvents()

		if (term === "") {
			setSortedEvents(events)
		} else {
			const result = events.filter(event => {
				// Case In-sensitive
				return event.eventTitle.toLowerCase().indexOf(term.toLowerCase()) > -1
			})

			setSortedEvents(result)
		}

		setSearchTerm(term)
		setSortOption("")
		setPage(1)
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

	// SortBy display text, remove "-" indicator when presenting to the page
	const sortByText = sortOption[0] === "-" ? sortOption.substring(1, sortOption.length) : sortOption

	const controlledEvents = sortedEvents.filter(event => {
		if (hideInactive) return event.activeIndicator
		else return true
	})

	const numOfPages = Math.ceil(controlledEvents.length / eventsPerPage)
	// Update the page number when inactive events are hidden
	if (page > numOfPages) setPage(numOfPages)

	const indexOfLastEvent = page * eventsPerPage
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage

	const isMultiplePages = controlledEvents.length > eventsPerPage
	const totalPages = isMultiplePages ? Math.ceil(controlledEvents.length / eventsPerPage) : 1
	const eventsOnPage = totalPages !== 1 ? controlledEvents.slice(indexOfFirstEvent, indexOfLastEvent) : controlledEvents

	return (
		<Layout pageTitle="Event Management" pageHeading="Event Management">
			{/* Search Input Box */}
			<Flex
				gridColumn={{ base: "1 / -1", md: "1 / 5", lg: "1 / 8", xl: "1 / 9" }}
				direction="row"
				wrap="wrap"
				justify="flex-end">
				<SearchInput searchTerm={searchTerm} onSearchEvent={onSearchEvent} />
			</Flex>

			{/* Sort Filter Menu, and Creat Event Button */}
			<Flex align="center" justify="flex-end" gridColumn={{ base: "3 / 5", md: "span 4", lg: "span 5", xl: "span 4" }}>
				<SortFilter sortByText={sortByText} sortOption={sortOption} onToggleSortBy={onToggleSortBy} />
			</Flex>

			{/* Hide Inactive */}
			<Flex
				gridColumn={{ base: "1 / 3", md: "1 / -1" }}
				gridRow={{ base: "3", md: "auto" }}
				justify={{ base: "flex-start", md: "flex-end" }}>
				<HideInactiveButton onToggleHideInactive={onToggleHideInactive} />
			</Flex>

			{/* Event List */}
			<Flex direction="column" gridColumn="1 / -1">
				{eventsOnPage.length > 0 ? (
					eventsOnPage.map((event, index: number) => {
						return (
							<EventCard
								key={index}
								data={event}
								onConfirm={(isActive: boolean, eventId: string) => {
									//1.3.3 The system update the Event Active Indicator to No and Event End Date to today's date.
									const endDate = isActive ? new Date() : undefined
									const updatedEvent = {
										...event,
										activeIndicator: !isActive,
										lastUpdatedDateTime: new Date(),
										eventEndDate: endDate,
									}
									const savedIdx = savedEvents.findIndex(evt => evt.eventId === eventId)
									savedEvents.splice(savedIdx, 1, updatedEvent)
									updateSavedEvents(savedEvents)

									//1.3.4 The system displays an updated Event List with the Pre-existing sort by/Search parameter(s) include the newly deactivated event
									const changedEventIdx = sortedEvents.findIndex(evt => evt.eventId === eventId)
									sortedEvents.splice(changedEventIdx, 1, updatedEvent)
									setSortedEvents(sortedEvents)
								}}
							/>
						)
					})
				) : (
					<H1>data not found</H1>
				)}
			</Flex>

			{/* Pagination */}
			<Flex gridColumn="1 / -1" justify="center">
				<h3>Total Events: {controlledEvents.length}</h3>
				<Pagination page={page} count={totalPages} onChange={(_, value) => setPage(value)} />
			</Flex>
		</Layout>
	)
}

export default IndexPage
