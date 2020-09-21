import React from "react"

import Dropdown, { DropdownOptions } from "./Dropdown"
import { ArrowDropUpSharp, ArrowDropDownSharp } from "@material-ui/icons"
import { Box, PseudoBox, Flex, useTheme } from "@chakra-ui/core"

type SortFilterProps = {
	sortByText: string
	sortOption: string
	onSortByLklDto: (value: string, label: string) => void
	onSortByLookUpLklDto: (value: string, label: string) => void
}

/**
 *  SortLKLFilter component for sorting the LKL list based on a filter (ASC/DESC).
 */
const SortLKLFilter: React.FC<SortFilterProps> = ({ sortByText, sortOption, onSortByLookUpLklDto, onSortByLklDto }: SortFilterProps) => {
	const theme = useTheme()

	// Sort option labels, values and onClick event handlers. Order is identical to the option menu
	const options: DropdownOptions[] = [
		{ label: "Title", value: "lklTitle", onClick: onSortByLookUpLklDto },
		{ label: "Country", value: "countryCd", onClick: onSortByLookUpLklDto },
		{ label: "Post", value: "postCd", onClick: onSortByLookUpLklDto },
		{ label: "Status", value: "activeIndicator", onClick: onSortByLklDto },
		{ label: "Last Updated", value: "lastUpdatedDateTime", onClick: onSortByLklDto },
	]

	// Get value of the options based on the labelKey
	const getOptionsValue = (labelKey: string) => {
		return options.find(option => option.label === labelKey)?.value ?? ""
    }
    
    const arrowOnClick = () => {
        const sortBy = options.find((option : DropdownOptions) => option.label === sortByText)
        sortBy?.onClick ? sortBy.onClick(getOptionsValue(sortByText), 
        sortOption[0] === "-" ? sortOption.substring(1) : sortOption) : null
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
                    {sortOption[0] === "-" ? 
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
                            onClick={arrowOnClick}
                            _focus={{
                                // @ts-ignore
                                outline: `1px dashed ${theme.colors.accent}`,
                            }}>
                            <Box as={ArrowDropDownSharp} size="icon" transform="scale(2)" color="clickable" />
                        </PseudoBox>
                    :
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
                            onClick={arrowOnClick}
                            _focus={{
                                // @ts-ignore
                                outline: `1px dashed ${theme.colors.accent}`,
                            }}>
                            <Box as={ArrowDropUpSharp} size="icon" transform="scale(2)" color="clickable" />
                        </PseudoBox>
                    }
                </Flex>
			</Box>

		</>
	)
}

export default SortLKLFilter
