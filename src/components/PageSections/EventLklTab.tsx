import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import moment from "moment"

import { Flex, Box, Grid, Button as ChakraButton } from "@chakra-ui/core"
import { P, H3, LinkButton, IconAlignment, Link } from "@c1ds/components"

import LKLCard from "../LKLCard"
import SortLKLFilter from "../SortLKLFilter"
import HideInactiveButton from "../HideInactiveButton"

import Pagination from "@material-ui/lab/Pagination"
import { AddSharp } from "@material-ui/icons"
import { AddLocationPageState } from "../../pages/addLocation"
import { EventLocationTabMapIcon } from "../Icons/icons"
import { useCTFFormContextWSavedForm } from "../Forms/Form"

interface LastKnownLocationTabProps {
	eventData: EventFormData
}

type SortFunc = (sortOpt: string, isDescending: boolean, listToSort: LklDto[]) => LklDto[]

export const LastKnownLocationTab: React.FC<LastKnownLocationTabProps> = (p: LastKnownLocationTabProps) => {
	const { eventData } = p
	const { savedForm: savedEvents } = useCTFFormContextWSavedForm()

	const eventLklDtoList: LklDto[] = eventData.eventLklDtoList ?? []

	eventLklDtoList.sort((a: LklDto, b: LklDto) => {
		const aLastUpdatedTime = checkString(a.lastUpdatedDateTime)
		const bLastUpdatedTime = checkString(b.lastUpdatedDateTime)
		// Descending order
		const direction = -1
		if (aLastUpdatedTime > bLastUpdatedTime) return direction
		if (aLastUpdatedTime < bLastUpdatedTime) return -direction
		return 0
	})

	const [page, setPage] = useState(1)
	const [lklsPerPage, setLklsPerPage] = useState(10)
	const [sortedLKLs, setSortedLKLs] = useState<LklDto[]>(eventLklDtoList)
	const [sortOption, setSortOption] = useState("-Last Updated")
	const [hideInactive, setHideInactive] = useState(true)

	const sortByText = sortOption[0] === "-" ? sortOption.substring(1, sortOption.length) : sortOption

	/**
	 * Re-sort Location list when:
	 * Sort option changes (including sort direction)
	 * Saved event updates (ex. Event Location is deactivated)
	 */
	useEffect(() => {
		const savedEvent = savedEvents.find(event => event.eventId === eventData.eventId)
		const savedLklDtoList = savedEvent?.eventLklDtoList ?? []

		const sortPropsMap: Record<string, { sortVal: string; sortFunc: SortFunc }> = {
			"Title": { sortVal: "lklTitle", sortFunc: onSortByLookUpLklDto },
			"Country": { sortVal: "countryCd", sortFunc: onSortByLookUpLklDto },
			"Post": { sortVal: "postCd", sortFunc: onSortByLookUpLklDto },
			"Status": { sortVal: "activeIndicator", sortFunc: onSortByLklDto },
			"Last Updated": { sortVal: "lastUpdatedDateTime", sortFunc: onSortByLklDto },
		}

		const sortByText = sortOption[0] === "-" ? sortOption.substring(1) : sortOption
		const sortProp = sortPropsMap[sortByText]

		const sortedLocs = sortProp.sortFunc(sortProp.sortVal, sortOption[0] === "-", savedLklDtoList)

		setSortedLKLs(sortedLocs)
	}, [savedEvents, eventData, sortOption])

	const controlledLkls = sortedLKLs.filter((event: LklDto) => {
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
							const pageState: AddLocationPageState = {
								savedEvent: eventData,
							}
							navigate("/addLocation", { state: pageState })
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
					onClick={() => {
						const pageState: AddLocationPageState = {
							savedEvent: eventData,
						}
						navigate("/addLocation", { state: pageState })
					}}>
					<Box as={AddSharp} size="iconMobileCreate" />
				</ChakraButton>
			</Box>
			{eventLklDtoList.length != 0 ? (
				<>
					<Flex
						gridColumn={{ base: "1 / -1" }}
						gridRow={{ base: "3", md: "auto" }}
						// justify={{ base: "flex-start", md: "flex-end" }}>
						justifyContent={{ base: "space-between" }}>
						<HideInactiveButton onToggleHideInactive={() => setHideInactive(!hideInactive)} />
						<SortLKLFilter
							sortByText={sortByText}
							sortOption={sortOption}
							onSortSelection={(_, label) =>
								setSortOption(prevSortOption => {
									const prevOption = prevSortOption[0] === "-" ? prevSortOption.substring(1) : prevSortOption
									return label === prevOption
										? prevSortOption[0] === "-"
											? prevSortOption.substring(1)
											: "-" + prevSortOption
										: label
								})
							}
							onSortReverse={() =>
								setSortOption(prevSortOption =>
									prevSortOption[0] === "-" ? prevSortOption.substring(1) : "-" + prevSortOption
								)
							}
						/>
					</Flex>

					{lklsOnPage.map((lklData: LklDto, index: number) => {
						return (
							<Box key={`${lklData.eventLklId}-${index}`} gridColumn="1 / -1">
								<LKLCard lklData={lklData} />
							</Box>
						)
					})}

					<Flex gridColumn="1 / -1" justify="space-evenly">
						<P>{controlledLkls.length} results</P>
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
										const pageState: AddLocationPageState = {
											savedEvent: eventData,
										}
										navigate("/addLocation", { state: pageState })
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

// Temporary solution to string date properties
const checkString = (field: string | Date | undefined) => {
	if (typeof field === "object") return field
	if (typeof field === "string") return moment(field).toDate()
	return new Date()
}

//Sort by activeIndicator or lastUpdatedDateTime
const onSortByLklDto: SortFunc = (sortOpt, isDescending, listToSort) => {
	let option = sortOpt
	if (isDescending) {
		option = "-" + sortOpt
	}

	const sorted = listToSort.slice()
	sorted.sort((a: LklDto, b: LklDto) => {
		let direction = 1
		let field = option
		if (field[0] === "-") {
			direction = -1
			field = field.substring(1)
		}

		let aValue, bValue
		// for boolean values such as : activeIndicator
		if (typeof a[field] === "boolean") {
			;(aValue = a[field] ? 1 : -1), (bValue = b[field] ? 1 : -1)
		} else {
			a.lastUpdatedDateTime = checkString(a.lastUpdatedDateTime)
			b.lastUpdatedDateTime = checkString(b.lastUpdatedDateTime)
			;(aValue = a[field]), (bValue = b[field])
		}

		if ((aValue as Date | number) > (bValue as Date | number)) return direction
		if ((aValue as Date | number) < (bValue as Date | number)) return -direction
		return 0
	})

	return sorted
}

//Sort by conutry, post, or title
const onSortByLookUpLklDto: SortFunc = (sortOpt, isDescending, listToSort) => {
	let option = sortOpt
	if (isDescending) {
		option = "-" + sortOpt
	}

	const sorted = listToSort.slice()
	sorted.sort((a: LklDto, b: LklDto) => {
		let direction = 1
		let field = option
		if (field[0] === "-") {
			direction = -1
			field = field.substring(1)
		}

		const aValue = a.lookupLklDto[field],
			bValue = b.lookupLklDto[field]
		if ((aValue as string) > (bValue as string)) return direction
		if ((aValue as string) < (bValue as string)) return -direction
		return 0
	})

	return sorted
}
