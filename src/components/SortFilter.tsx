import React from "react"
import { navigate } from "gatsby"

import { Button } from "@c1ds/components"
import Dropdown, { DropdownOptions } from "./Dropdown"
import { AddSharp, ArrowDropUpSharp, ArrowDropDownSharp } from "@material-ui/icons"
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
				<Flex align="center">
					<Dropdown
						options={options}
						width="150px"
						label="Sort events"
						menuProps={{
							marginTop: "4",
							right: -20,
						}}>
						<Box as="span" fontSize="base" marginRight={2} cursor="pointer">
							Sort by
						</Box>
					</Dropdown>
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
								as={ArrowDropDownSharp}
								aria-label={`Sort by ${sortByText} ascending`}
								size="iconLg"
								cursor="pointer"
								color="clickable"
								ml={-4}
								onClick={e => {
									e.stopPropagation()
									onToggleSortBy(getOptionsValue(sortByText), sortOption.substring(1))
								}}
							/>
						</Box>
					) : (
						<Box display="inline-flex">
							<Box
								as={ArrowDropUpSharp}
								aria-label={`Sort by ${sortByText} descending`}
								size="iconLg"
								cursor="pointer"
								color="clickable"
								ml={-4}
								onClick={e => {
									e.stopPropagation()
									onToggleSortBy(getOptionsValue(sortByText), sortOption)
								}}
							/>
						</Box>
					)}
				</Flex>
			</Box>

			<Box display={{ base: "none", md: "block" }}>
				<Button size="lg" onClick={() => navigate("/event")}>
					Create New Event
				</Button>
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
					onClick={() => navigate("/event")}>
					<Box as={AddSharp} size="iconMobileCreate" />
				</ChakraButton>
			</Box>
		</>
	)
}

export default SortFilter
