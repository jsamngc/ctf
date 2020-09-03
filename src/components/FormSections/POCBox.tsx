import React, { useRef } from "react"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from "@material-ui/icons/Email"
import PhoneIcon from "@material-ui/icons/Phone"
import CancelIcon from "@material-ui/icons/Cancel"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import CloseIcon from "@material-ui/icons/Close"

import emailTypes_json from "../../../content/emailTypes.json"
import phoneTypes_json from "../../../content/phoneTypes.json"

interface POCBoxProps {
	id?: string
	// used for updating the list of POCBoxes - should be called when user clicks CloseIcon
	pocBoxes: string[]
	setPocBoxes: React.Dispatch<React.SetStateAction<string[]>>
}
const POCBox: React.FC<POCBoxProps> = (p: POCBoxProps) => {
	const { errors, formState } = useFormContext<LklDto>()
	const { dirtyFields } = formState

	const emailTypeRef = useRef<HTMLButtonElement>(null)
	const phoneTypeRef = useRef<HTMLButtonElement>(null)

	const isDisabled = false
	return (
		// TO-DO
		// 1. position CloseIcon icon on top right corner of this grid
		// 2. only show on each POCBox if (number of POCBox) > 1
		// 3. Find a way to insert the icons onto the form inputs
		// 4. Position the AddCircleIcon correctly on the right side of each set
		// 5. Change the background color of AddCircleIcon to match that of wireframes
		// 6. For phone number, we might need an update to C1DS to allow Select component
		//    to accept both dropdown and user input
		<Grid
			border="2px"
			borderStyle="solid"
			borderColor="lightGray"
			gridColumn={{ base: "1 / -1", md: "1 / 9" }}
			gridGap={{ base: "16px", md: "24px" }}
			padding="30px"
			gridTemplateColumns={{ base: "1", md: "repeat(8,1fr)" }}>
			<Box gridRow="1" gridColumn={{ base: "1 / -1", md: "1 / 5" }}>
				<FormInput labelText="First Name" labelId="firstNameLabel">
					<Text
						id="firstName"
						name="firstName"
						size="full"
						disabled={isDisabled}
						onChange={filterOnTextChange}
						maxLength={33}
					/>
				</FormInput>
			</Box>

			<Box gridRow="1" gridColumn={{ base: "1 / -1", md: "5 / 9" }}>
				<FormInput labelText="Last Name" labelId="lastNameLabel">
					<Text
						id="lastName"
						name="lastName"
						size="full"
						disabled={isDisabled}
						onChange={filterOnTextChange}
						maxLength={33}
					/>
				</FormInput>
			</Box>

			{/* Spoke to Katherine how we are handling multiple "sets" 
            of emailAddress-emailAdressType and phoneNumber-phoneType...

            1. default number of set is 1 with "+" icon
            2. "+" is defaulted to disabled
            3. validate...
                3a. both-fields validation: if one field has data, other field must have data
                3b. email validation: must pass regex match - NOTE: for email only
            4. "+" gets enabled only when all previous sets pass both 3a and 3b validations
            4. display the second set upon clicking "+"
            5. display a "X" icon next to first set of data
            6. repeat until the nth data set (for now, n will have be a max of 3 sets)
            7. the nth data set will have "+"
            8. all X's are enabled by default and cannot be disabled
            9. user can delete any sets if (number of set) > 1 regardless of validation
            10. after deleting one set...
                10a. all remaining sets below shifts up - with values preserved
                10b. revalidate (3a, 3b) all sets' fields and toggle disabled/enabled for + accordingly
            */}

			<Box gridColumn={{ base: "1 / -1", md: "1 / 5" }}>
				<FormInput labelText="Email Address" labelId="emailAddressLabel">
					<Text
						id="emailAddress"
						name="emailAddress"
						size="full"
						disabled={isDisabled}
						onChange={filterOnTextChange}
						maxLength={67}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "5 / 8" }}>
				<FormInput labelText="Type" labelId="emailTypeLabel">
					<Controller
						name="emailType"
						onFocus={() => emailTypeRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Select
								ref={emailTypeRef}
								id="emailType"
								name="emailType"
								aria-labelledby="emailTypeLabel"
								options={emailTypes_json}
								size="full"
								disabled={isDisabled}
								validationState={errors?.emailType ? ValidationState.ERROR : undefined}
								onChange={changes => {
									onChange(changes.selectedItem?.value)
								}}
								onBlur={() => {
									dirtyFields?.emailType && onBlur()
								}}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "8 / 9" }}>
				<AddCircleIcon></AddCircleIcon>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "1 / 5" }}>
				<FormInput labelText="Phone Number" labelId="phoneNumberLabel">
					<Text
						id="phoneNumber"
						name="phoneNumber"
						size="full"
						disabled={isDisabled}
						onChange={filterOnTextChange}
						maxLength={30}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "5 / 8" }}>
				<FormInput labelText="Type" labelId="phoneTypeLabel">
					<Controller
						name="phoneType"
						onFocus={() => phoneTypeRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Select
								ref={phoneTypeRef}
								id="phoneType"
								name="phoneType"
								aria-labelledby="phoneTypeLabel"
								options={phoneTypes_json}
								size="full"
								disabled={isDisabled}
								validationState={errors?.phoneType ? ValidationState.ERROR : undefined}
								onChange={changes => {
									onChange(changes.selectedItem?.value)
								}}
								onBlur={() => {
									dirtyFields?.phoneType && onBlur()
								}}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "8 / 9" }}>
				<AddCircleIcon></AddCircleIcon>
			</Box>
		</Grid>
	)
}

const filterOnTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
}

export default POCBox
