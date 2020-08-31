import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import ClearIcon from "@material-ui/icons/Clear"
import { Box, InputGroup, Input, InputLeftElement, InputRightElement } from "@chakra-ui/core"

type SearchInputProps = {
	searchTerm: string
	onSearchEvent: (searchText: string) => void
}

/**
 * Search Input component for searching for particular events.
 * Search is case-insensitive
 */
const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchEvent }: SearchInputProps) => {
	// Event handler for key down such as Enter key
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 27) {
			onSearchEvent("")
		}
	}

	const searchSize = { base: "100%" }

	return (
		<Box mr="auto" w={searchSize}>
			<InputGroup width={searchSize}>
				<InputLeftElement
					px="inputX"
					width="auto"
					height="input"
					children={<Box as={SearchIcon} color="clickable" role="presentation" size="iconMd" />}
				/>

				<Input
					color="text"
					height="input"
					display="inline-block"
					fontFamily="body"
					fontSize="base"
					border="px"
					borderColor="inputBorder"
					boxSizing="border-box"
					pl={40}
					py={4}
					maxLength={25}
					outline="none"
					placeholder="Search for an event"
					_disabled={{
						color: "disabledButtonText",
						bg: "disabledBackground",
						borderColor: "disabledBorder",
					}}
					_focus={{
						borderWidth: "2",
						borderColor: "accent",
					}}
					value={searchTerm}
					onKeyDown={handleKeyDown}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						onSearchEvent(e.target.value)
					}}
				/>
				{searchTerm ? (
					<InputRightElement
						width="input"
						height="input"
						onClick={() => onSearchEvent("")}
						children={<Box as={ClearIcon} color="inputPlaceholder" role="presentation" size="iconMd" />}
					/>
				) : null}
			</InputGroup>
		</Box>
	)
}

export default SearchInput
