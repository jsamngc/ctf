import React from "react"
import { navigate } from "gatsby"

import { Button, LinkButton } from "@c1ds/components"
import Dropdown, { DropdownOptions } from "./Dropdown"
import AddIcon from "@material-ui/icons/Add"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import { ArrowDropUpSharp, ArrowDropDownSharp } from "@material-ui/icons"
import { Box, Flex, Button as ChakraButton } from "@chakra-ui/core"

type SortFilterProps = {
	sortByText: string
	sortOption: string
	onToggleSortBy: (value: string, label: string) => void
}

/**
 * SortFilter component for sorting the event list based on a filter (ASC/DESC).
 */
const SortFilter: React.FC<SortFilterProps> = ({ sortByText, sortOption, onToggleSortBy }: SortFilterProps) => {
	// Sort option labels, values and onClick event handlers. Order is identical to the option menu
	const options: DropdownOptions[] = [
		{ label: "Event Type", value: "eventTypeId", onClick: onToggleSortBy },
		{ label: "Title", value: "eventTitle", onClick: onToggleSortBy },
		{ label: "Start Date", value: "eventStartDate", onClick: onToggleSortBy },
		{ label: "End Date", value: "eventEndDate", onClick: onToggleSortBy },
		{ label: "Evac. Status", value: "evacStatusCode", onClick: onToggleSortBy },
		{ label: "Status", value: "activeIndicator", onClick: onToggleSortBy },
		{ label: "Last Updated", value: "lastUpdatedDateTime", onClick: onToggleSortBy },
	]

	// Get value of the options based on the labelKey
	const getOptionsValue = (labelKey: string) => {
		return options.find(option => option.label === labelKey)?.value ?? ""
	}

	return (
		<>
			<Box position="relative" marginRight="20">
				<Dropdown options={options} width="150px">
					<LinkButton>
						<Flex align="center">
							<Box as="span" fontSize="base" marginRight={2} cursor="pointer">
								Sort by{`: ${sortByText}`}
							</Box>

							{sortOption === "" ? (
								<Flex wrap="wrap" position="relative" size="iconMd">
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
								<Box display="inline-flex">
									<Box
										as={ArrowDropDownIcon}
										border="px"
										borderColor="inputBorder"
										borderRadius={4}
										cursor="pointer"
										ml={4}
										onClick={e => {
											e.stopPropagation()
											onToggleSortBy(getOptionsValue(sortByText), sortOption.substring(1))
										}}
									/>
									{/* <Box as={ClearIcon}
                                        size="24px"
                                        cursor="pointer"
                                        onClick={e => {
                                            e.stopPropagation()
                                            setSortOption("")
                                        }} /> */}
								</Box>
							) : (
								<Box display="inline-flex">
									<Box
										as={ArrowDropUpIcon}
										border="px"
										borderColor="inputBorder"
										borderRadius={4}
										cursor="pointer"
										ml={4}
										onClick={e => {
											e.stopPropagation()
											onToggleSortBy(getOptionsValue(sortByText), sortOption)
										}}
									/>
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

			<Box display={{ base: "none", md: "block" }}>
				<Button size="lg" onClick={() => navigate("/event")}>
					Create New Event
				</Button>
			</Box>
			<Box bottom="16px" zIndex={2} right="16px" position="fixed" display={{ base: "block", md: "none" }}>
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
					onClick={() => navigate("/event")}>
					<AddIcon />
				</ChakraButton>
			</Box>
		</>
	)
}

export default SortFilter
