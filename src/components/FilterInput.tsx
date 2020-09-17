import React from "react"
import ClearIcon from "@material-ui/icons/Clear"
import { FormLabel, Text, Box, InputGroup, Input, InputRightElement } from "@chakra-ui/core"

type FilterInputProps = {
	labelText: string
	labelId: string
	placeHolder: string
	searchTerm: string
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}
const FilterInput: React.FC<FilterInputProps> = (p: FilterInputProps) => {
	const { labelText, labelId, placeHolder, searchTerm, setSearchTerm } = p

	return (
		<Box>
			<FormLabel
				id={labelId}
				fontFamily="body"
				fontSize="label"
				fontWeight="normal"
				color="label"
				display="block"
				lineHeight="label"
				pb={8}>
				<Text m={0}>{labelText}</Text>
			</FormLabel>
			<InputGroup>
				<Input
					color="text"
					height="input"
					display="inline-block"
					fontFamily="body"
					fontSize="base"
					border="px"
					borderColor="inputBorder"
					boxSizing="border-box"
					px={10}
					py={4}
					outline="none"
					placeholder={placeHolder}
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
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchTerm(e.target.value)
					}}
				/>

				<InputRightElement
					width="input"
					height="input"
					onClick={() => setSearchTerm("")}
					cursor={searchTerm ? "pointer" : "cursor"}
					children={<Box as={ClearIcon} color="inputPlaceholder" size="iconMd" />}
				/>
			</InputGroup>
		</Box>
	)
}

export default FilterInput
