import React, { useState } from "react"
import { Box, Grid } from "@chakra-ui/core"
import { useFormContext, useWatch } from "react-hook-form"
import {  FormInput, Text } from "@c1ds/components"

import { Person } from "@material-ui/icons"

import { FormIconInput } from '../FormIconInput'
import POCEmail from '../POCEmail'
import POCPhone from '../POCPhone'

const phoneListAllowed = ['phoneDto1', 'phoneDto2', 'phoneDto3']
const emailListAllowed = ['emailDto1', 'emailDto2', 'emailDto3']

interface POCBoxProps {
	id?: string
	// used for updating the list of POCBoxes - should be called when user clicks CloseIcon
	pocBoxes: string[]
	setPocBoxes: React.Dispatch<React.SetStateAction<string[]>>
}
const POCBox: React.FC<POCBoxProps> = (p: POCBoxProps) => {
	const { id } = p
	const { setError, clearErrors, formState, register, trigger } = useFormContext<LklDto>()
	const { dirtyFields } = formState

	const [ phoneList, setPhoneList ] = useState<string[]>(['phoneDto1'])
	const [ emailList, setEmailList ] = useState<string[]>(['emailDto1'])


	const watchFirstName: string | undefined = useWatch({ name: "firstName" })
	const watchLastName: string | undefined = useWatch({ name: "lastName" })

	const errorsOnName = [
		{ type: "manual", name: "firstName", message: "" },
		{ type: "manual", name: "lastName", message: "" },
	]
	const errorsOnEmailPhone = [
		{ type: "manual", name: "emailDto1-emailAddress", message: "" },
		{ type: "manual", name: "emailDto1-emailType", message: "" },
		{ type: "manual", name: "phoneDto1-phoneNumber", message: "" },
		{ type: "manual", name: "phoneDto1-phoneType", message: "" },
	]

	// If none of Phone or Email field has value, it's true otherwise : at least one field in Phone or Email has value.
	const isAllPhoneEmailEmpty = !(dirtyFields["emailDto1-emailAddress"] || 
								   dirtyFields["emailDto1-emailType"] || 
								   dirtyFields["phoneDto1-phoneNumber"] || 
								   dirtyFields["phoneDto1-phoneType"])

	const filterOnNameBlur = (e : React.FocusEvent<HTMLInputElement>) => {
		// If none of the fields are touched
		if(e.target.value.length > 0){
			if(isAllPhoneEmailEmpty) {
				errorsOnEmailPhone.forEach(({ name, type, message }) =>
					setError(name, { type, message })
				);
			}

		} else {
			if(isAllPhoneEmailEmpty){
				clearErrors(errorsOnEmailPhone.map(field => field.name))
			}
		}
	}

	const filterOnTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
	}

	const onNameTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		filterOnTextChange(e)
		clearErrors(errorsOnName.map(field => field.name))
	}
	

	const isDisabled = false

	//------------------POC Email and Phone component functions

	const onEmailAddressChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		clearErrors(errorsOnEmailPhone.map(field => field.name))
	}

	const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		filterOnTextChange(e)
		clearErrors(errorsOnEmailPhone.map(field => field.name))
	}

	const triggerPhoneEmail = () => {
		trigger(errorsOnEmailPhone.map(field => field.name))
	}

	const onAddEmail = () => {

		setEmailList(prevEmailList => {
			const unused = emailListAllowed.filter(email => {
				return !prevEmailList.includes(email)
			})
			return (unused.length > 0) ? [...prevEmailList, unused[0]] : prevEmailList
		})
	}
	const onRemoveEmail = (emailName : string) => {

		setEmailList(prevEmailList => {
			const filteredList = prevEmailList.filter(email => {
				return email !== emailName
			})
			return filteredList
		})
	}

	const onAddPhone = () => {

		setPhoneList(prevPhoneList => {
			const unused = phoneListAllowed.filter(phone => {
				return !prevPhoneList.includes(phone)
			})
			return (unused.length > 0) ? [...prevPhoneList, unused[0]] : prevPhoneList
		})
	}
	const onRemovePhone = (phoneName : string) => {

		setPhoneList(prevPhoneList => {
			const filteredList = prevPhoneList.filter(phone => {
				return phone !== phoneName
			})
			return filteredList
		})
	}

	return (
		// TO-DO
		// 3. Find a way to insert the icons onto the form inputs: C1DS limitation
		// 4. Position the AddCircleIcon correctly on the right side of each set
		// 6. For phone number, we might need an update to C1DS to allow Select component
		//    to accept both dropdown and user input
		<Grid
			border="2px"
			borderStyle="solid"
			borderColor="lightGray"
			gridColumn={{ base: "1 / -1", md: "1 / 9" }}
			gridGap={{ base: "16px", md: "24px" }}
			padding={{ base: "16px", md: "30px" }}
			gridTemplateColumns={{ base: "repeat(12,1fr)" }}>
			<Box gridColumn={{ base: "1 / -1", md: "1 / 7" }}>
				<FormIconInput labelText="First Name" labelId="firstNameLabel" icon={Person}>
					<Text
						ref={register}
						id="firstName"
						name="firstName"
						size="full"
						disabled={isDisabled}
						onChange={onNameTextChange}
						onBlur={(filterOnNameBlur)}
						maxLength={33}
					/>
				</FormIconInput>
			</Box>

			<Box gridColumn={{ base: "1 / -1", md: "7 / -1" }}>
				<FormInput labelText="Last Name" labelId="lastNameLabel">
					<Text
						ref={register}
						id="lastName"
						name="lastName"
						size="full"
						disabled={isDisabled}
						onChange={onNameTextChange}
						onBlur={filterOnNameBlur}
						maxLength={33}
					/>
				</FormInput>
			</Box>
			
			{/* Email List , max = 3*/}
			{emailList.map((value: string, index: number) => {
				return (
					<POCEmail 
						// PocBox1-emailDto1, '-' is deliminator
						key={`${id}-${value}`}
						id={value}
						isFirst={index === 0}
						onEmailAddressChange={onEmailAddressChange}
						triggerPhoneEmail={triggerPhoneEmail}
						addable={emailList.length < 3 && index === 0 }
						onAdd={onAddEmail}
						onRemove={()=> {
							onRemoveEmail(value)
						}}
					/>
				)
			})}

			{/* Phone List , max = 3*/}
			{phoneList.map((value: string, index: number) => {
				return (
					<POCPhone
						// PocBox1-phoneDto1, '-' is deliminator
						key={`${id}-${value}`}
						id={value}
						isFirst={index === 0}
						onPhoneNumberChange={onPhoneNumberChange}
						triggerPhoneEmail={triggerPhoneEmail}
						addable={phoneList.length < 3 }
						onAdd={onAddPhone}
						onRemove={()=> {
							onRemovePhone(value)
						}}
					/>
				)
			})}

		</Grid>
	)
}



export default POCBox
