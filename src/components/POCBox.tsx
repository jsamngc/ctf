import React, { useState } from "react"
import { Box, Grid, VisuallyHidden } from "@chakra-ui/core"
import { useFormContext, useWatch } from "react-hook-form"
import {  FormInput, Text, ValidationState } from "@c1ds/components"

import { Person, Close } from "@material-ui/icons"

import { FormIconInput } from './FormIconInput'
import POCEmail from './POCEmail'
import POCPhone from './POCPhone'

const phoneListAllowed = ['phoneDto1', 'phoneDto2', 'phoneDto3']
const emailListAllowed = ['emailDto1', 'emailDto2', 'emailDto3']

interface POCBoxProps {
	personDtoIndex: number
	onRemove: () => void
}
const POCBox: React.FC<POCBoxProps> = (p: POCBoxProps) => {

	const { personDtoIndex, onRemove } = p
	const { errors, setError, clearErrors, register, watch, trigger } = useFormContext<LklDto>()
	const isDisabled = false

	// Parse the LKLDTO structure names with current personDto index
	const prefix = `lookupLklDto[lklPocListDto][${personDtoIndex}][personDto]`

	// Check if there is error in either of first name or last name
	let errorFirstName, errorLastName
	if (errors.lookupLklDto?.lklPocListDto) {
		errorFirstName = errors.lookupLklDto?.lklPocListDto[personDtoIndex]?.personDto?.givenName
		errorLastName = errors.lookupLklDto?.lklPocListDto[personDtoIndex]?.personDto?.surName
	}

	// Default name sets for Names and Phone&Email
	const [ nameFieldList, setNameFieldList ] = useState<string[]>([
		`${prefix}[givenName]`,
		`${prefix}[surName]`
	])
	const [ contactFieldList, setContactFieldList ] = useState<string[]>([
		`${prefix}[personEmailDtoList][1][emailDto][emailType]`,
		`${prefix}[personEmailDtoList][1][emailDto][emailAddress]`,
		`${prefix}[personPhoneDtoList][1][phoneDto][phoneNum]`,
		`${prefix}[personPhoneDtoList][1][phoneDto][phoneTypeCd]`,
	])
	const [ phoneList, setPhoneList ] = useState<string[]>(['phoneDto1'])
	const [ emailList, setEmailList ] = useState<string[]>(['emailDto1'])
	
	// Check if both first name and last name are empty
	const isNameFieldsEmpty = () => {
		return Object.values(watch(nameFieldList)).every((value : string | boolean | Date | LookupLklDto | undefined) => {
			return value === undefined || value === ""
		})
	}

	// Check if all of phone and email fields are empty
	const isAllPhoneEmailEmpty = (specificList : string[] | undefined = undefined) => {
		return Object.values(specificList ? specificList : watch(contactFieldList)).every(
			(value : string | boolean | Date | LookupLklDto | undefined) => {
				return value === undefined || value === ""
			}
		)
	}
	
	const filterOnTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
	}

	// Name set onBlur behavior
	const filterOnNameBlur = (e : React.FocusEvent<HTMLInputElement>) => {
		if(e.target.value.length > 0){
			if(isAllPhoneEmailEmpty()) {
				contactFieldList.forEach((name : string) =>
					setError(name, { type: "manual", message: ""})
				)
			}
			else{
				trigger(nameFieldList)
			}
		} else {
			if(isAllPhoneEmailEmpty()){
				clearErrors(contactFieldList)
			}
			else{
				trigger(nameFieldList)
			}
		}
	}

	// Email and Phone onBlur behavior
	const triggerAllFields = () => {
		trigger([...contactFieldList, ...nameFieldList])
	}

	const onAddEmail = (setNumber : string) => {

		setEmailList(prevEmailList => {
			const unused = emailListAllowed.filter(email => {
				return !prevEmailList.includes(email)
			})
			return (unused.length > 0) ? [...prevEmailList, unused[0]] : prevEmailList
		})
		
		setContactFieldList(prevList => {
			return [...prevList, 
				`${prefix}[personEmailDtoList][${setNumber}][emailDto][emailAddress]`,
				`${prefix}[personEmailDtoList][${setNumber}][emailDto][emailType]`
			]
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

	const onAddPhone = (setNumber : string) => {

		setPhoneList(prevPhoneList => {
			const unused = phoneListAllowed.filter(phone => {
				return !prevPhoneList.includes(phone)
			})
			return (unused.length > 0) ? [...prevPhoneList, unused[0]] : prevPhoneList
		})

		setContactFieldList(prevList => {
			return [...prevList, 
				`${prefix}[personEmailDtoList][${setNumber}][phoneDto][phoneNum]`,
				`${prefix}[personEmailDtoList][${setNumber}][phoneDto][phoneTypeCd]`
			]
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
		// 6. For phone number, we might need an update to C1DS to allow Select component
		//    to accept both dropdown and user input
		<Box position="relative">
			{ personDtoIndex !== 0 && 
				<Box 
					as={Close} 
					m={8} 
					right={0} 
					color="text"
					position="absolute"
					cursor="pointer"
					onClick={onRemove} />
			}
			
			<Grid
				border="1px"
				borderStyle="solid"
				borderColor="lightGray"
				gridColumn={{ base: "1 / -1", md: "1 / 9" }}
				gridGap={{ base: "16px", md: "24px" }}
				padding={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{ base: "repeat(12,1fr)" }}>

				<input 
					ref={register}
					type="text"
					name={`${prefix}[personId]`} 
					hidden
					defaultValue={`person${personDtoIndex}`}
					/>

				<Box gridColumn={{ base: "1 / -1", md: "1 / 7" }}>
					<FormIconInput labelText="First Name" labelId="firstNameLabel" icon={Person}>
						<Text
							ref={register({
								required: isAllPhoneEmailEmpty() || !isNameFieldsEmpty() ? false : "First Name is required",
							})}
							id={`firstName{}`}
							name={`${prefix}[givenName]`}
							size="full"
							disabled={isDisabled}
							validationState={ errorFirstName ? ValidationState.ERROR : undefined}
							errorMessage={errorFirstName?.message}
							onChange={filterOnTextChange}
							onBlur={(filterOnNameBlur)}
							maxLength={33}
						/>
					</FormIconInput>
				</Box>
				
				<Box gridColumn={{ base: "1 / -1", md: "7 / -1" }}>
					<FormInput labelText="Last Name" labelId="lastNameLabel">
						<Text
							ref={register({
								required: isAllPhoneEmailEmpty() || !isNameFieldsEmpty() ? false : "Last Name is required",
							})}
							id="lastName"
							name={`${prefix}[surName]`}
							size="full"
							disabled={isDisabled}
							validationState={ errorLastName ? ValidationState.ERROR : undefined}
							errorMessage={errorLastName?.message}
							onChange={filterOnTextChange}
							onBlur={filterOnNameBlur}
							maxLength={33}
						/>
					</FormInput>
				</Box>
				
				{/* Email List , max = 3*/}
				{emailList.map((value: string, index: number) => {
					const setNumber = value.charAt(value.length-1)
					return (
						<POCEmail 
							key={`${personDtoIndex}-${value}`}
							id={`${prefix}-${setNumber}`}
							personDtoIndex={personDtoIndex}
							isFirst={index === 0}
							addable={emailList.length < 3 && index === 0 }
							onEmailAddressChange={filterOnTextChange}
							triggerAllFields={triggerAllFields}
							onAdd={() => onAddEmail(setNumber)}
							onRemove={()=> {
								onRemoveEmail(value)
							}}
						/>
					)
				})}

				{/* Phone List , max = 3*/}
				{phoneList.map((value: string, index: number) => {
					const setNumber = value.charAt(value.length-1)
					return (
						<POCPhone
							key={`${personDtoIndex}-${value}`}
							id={`${prefix}-${setNumber}`}
							personDtoIndex={personDtoIndex}
							isFirst={index === 0}
							addable={emailList.length < 3 && index === 0 }
							onPhoneNumberChange={filterOnTextChange}
							triggerAllFields={triggerAllFields}
							onAdd={() => onAddPhone(setNumber)}
							onRemove={()=> {
								onRemovePhone(value)
							}}
						/>
					)
				})}
			</Grid>
		</Box>
	)
}

export default POCBox
