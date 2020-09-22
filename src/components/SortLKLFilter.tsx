import React from "react"

import { ArrowDropUpSharp, ArrowDropDownSharp } from "@material-ui/icons"
import { Box, PseudoBox, Flex, useTheme } from "@chakra-ui/core"

import Dropdown, { DropdownOptions, DropdownClick } from "./Dropdown"

type SortFilterProps = {
	sortByText: string
	sortOption: string
	onSortSelection: DropdownClick
	onSortReverse: () => void
}

/**
 *  SortLKLFilter component for sorting the LKL list based on a filter (ASC/DESC).
 */
const SortLKLFilter: React.FC<SortFilterProps> = ({
	sortByText,
	sortOption,
	onSortSelection,
	onSortReverse,
}: SortFilterProps) => {
	const theme = useTheme()

	// Sort option labels, values and onClick event handlers. Order is identical to the option menu
	const options: DropdownOptions[] = [
		{ label: "Title", value: "lklTitle", onClick: onSortSelection },
		{ label: "Country", value: "countryCd", onClick: onSortSelection },
		{ label: "Post", value: "postCd", onClick: onSortSelection },
		{ label: "Status", value: "activeIndicator", onClick: onSortSelection },
		{ label: "Last Updated", value: "lastUpdatedDateTime", onClick: onSortSelection },
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
						}}
						initialSelection={getOptionsValue("Last Updated")}
						showSelected>
						<Box as="span" fontSize="base" marginRight={2} cursor="pointer">
							Sort by
						</Box>
					</Dropdown>
					{sortOption[0] === "-" ? (
						<PseudoBox
							as="button"
							// @ts-ignore
							type="button"
							display="inline-flex"
							alignItems="center"
							justifyContent="center"
							padding={0}
							border="none"
							background="none"
							size="iconMd"
							cursor="pointer"
							aria-label={`Sort by ${sortByText} ascending`}
							onClick={onSortReverse}
							_focus={{
								// @ts-ignore
								outline: `1px dashed ${theme.colors.accent}`,
							}}>
							<Box as={ArrowDropDownSharp} size="icon" transform="scale(2)" color="clickable" />
						</PseudoBox>
					) : (
						<PseudoBox
							as="button"
							// @ts-ignore
							type="button"
							display="inline-flex"
							alignItems="center"
							justifyContent="center"
							padding={0}
							border="none"
							background="none"
							size="iconMd"
							cursor="pointer"
							aria-label={`Sort by ${sortByText} descending`}
							onClick={onSortReverse}
							_focus={{
								// @ts-ignore
								outline: `1px dashed ${theme.colors.accent}`,
							}}>
							<Box as={ArrowDropUpSharp} size="icon" transform="scale(2)" color="clickable" />
						</PseudoBox>
					)}
				</Flex>
			</Box>
		</>
	)
}

export default SortLKLFilter
