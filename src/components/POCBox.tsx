import React, { useState } from "react"
import { Box, Grid, VisuallyHidden } from "@chakra-ui/core"
import { useFormContext, useWatch } from "react-hook-form"
import { FormInput, Text, ValidationState } from "@c1ds/components"

import { Person, Close } from "@material-ui/icons"

import { useCTFFormContext } from "./Forms/Form"
import { FormIconInput } from './FormIconInput'
import POCEmail from './POCEmail'
import POCPhone from './POCPhone'

const phoneListAllowed = ['phoneDto0', 'phoneDto1', 'phoneDto2']
const emailListAllowed = ['emailDto0', 'emailDto1', 'emailDto2']

interface POCBoxProps {
	pocIndex: number
	initialEmailList: EmailData[]
	initialPhoneList: PhoneData[]
	onRemove: () => void
}
const POCBox: React.FC<POCBoxProps> = (p: POCBoxProps) => {

	const { pocIndex, initialEmailList, initialPhoneList, onRemove } = p
	const { isView } = useCTFFormContext()
	const { errors, setError, clearErrors, register, watch, trigger } = useFormContext<LKLFormData>()
	const isDisabled = isView

	// Parse the LKLFormData structure names with current POC index
	const prefix = `pocList[${pocIndex}]`

	// Check if there is error in either of first name or last name
	const errorFirstName = errors.pocList ? errors.pocList[pocIndex]?.givenName : undefined
	const errorLastName = errors.pocList ? errors.pocList[pocIndex]?.surName : undefined

	// Default name sets for Names and Phone&Email
	const [ nameFieldList, setNameFieldList ] = useState<string[]>([
		`${prefix}[givenName]`,
		`${prefix}[surName]`
	])
	const [ contactFieldList, setContactFieldList ] = useState<string[]>([
		`${prefix}[phoneList][0][phoneNum]`,
		`${prefix}[phoneList][0][phoneTypeCd]`,
		`${prefix}[emailList][0][emailAddress]`,
		`${prefix}[emailList][0][emailType]`,
	])

	const [ phoneList, setPhoneList ] = useState<string[]>(initialPhoneList.length > 0 ? initialPhoneList.map((_,index) => {
		return 'phoneDto' + index
	}) : ['phoneDto0'] )
	const [ emailList, setEmailList ] = useState<string[]>(initialEmailList.length > 0 ? initialEmailList.map((_,index) => {
		return 'emailDto' + index
	}) : ['emailDto0'] )

	// Check if both first name and last name are empty
	const isNameFieldsEmpty = () => {
		return Object.values(watch(nameFieldList)).every((value : string | number | boolean | POC[] | undefined ) => {
			return value === undefined || value === ""
		})
	}

	// Check if all of phone and email fields are empty
	const isAllPhoneEmailEmpty = () => {
		return Object.values(watch(contactFieldList)).every(
			(value : string | number | boolean | POC[] | undefined) => {
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

	const onAddEmail = () => {
		const unused = emailListAllowed.filter(email => {
			return !emailList.includes(email)
		})
		
		setEmailList(prevEmailList => {
			return (unused.length > 0) ? [...prevEmailList, unused[0]] : prevEmailList
		})
		
		setContactFieldList(prevList => {
			const setNumber = unused[0].charAt(unused[0].length-1)
			return [...prevList, 
				`${prefix}[emailList][${setNumber}][emailAddress]`,
				`${prefix}[emailList][${setNumber}][emailType]`
			]
		})
	}
	const onRemoveEmail = (emailName : string) => {
		const setIndex = emailName.charAt(emailName.length-1)
		setEmailList(prevEmailList => {
			const filteredList = prevEmailList.filter(email => {
				return email !== emailName
			})
			return filteredList
		})

		setContactFieldList(prevList => {
			return prevList.filter((name : string) => {
				return !(
					name === `${prefix}[emailList][${setIndex}][emailType]` ||
					name === `${prefix}[emailList][${setIndex}][emailAddress]`
				)
			})
		})
	}

	const onAddPhone = () => {
		const unused = phoneListAllowed.filter(phone => {
			return !phoneList.includes(phone)
		})
		setPhoneList(prevPhoneList => {
			return (unused.length > 0) ? [...prevPhoneList, unused[0]] : prevPhoneList
		})

		setContactFieldList(prevList => {
			const setNumber = unused[0].charAt(unused[0].length-1)
			return [...prevList, 
				`${prefix}[phoneList][${setNumber}][phoneNum]`,
				`${prefix}[phoneList][${setNumber}][phoneTypeCd]`
			]
		})
	}
	const onRemovePhone = (phoneName : string) => {
		const setIndex = phoneName.charAt(phoneName.length-1)
		setPhoneList(prevPhoneList => {
			const filteredList = prevPhoneList.filter(phone => {
				return phone !== phoneName
			})
			return filteredList
		})

		setContactFieldList(prevList => {
			return prevList.filter((name : string) => {
				return !(
					name === `${prefix}[phoneList][${setIndex}][phoneNum]` ||
					name === `${prefix}[phoneList][${setIndex}][phoneTypeCd]`
				)
			})
		})
	}

	return (
		// TO-DO
		// 6. For phone number, we might need an update to C1DS to allow Select component
		//    to accept both dropdown and user input
		<Box position="relative">
			{ pocIndex !== 0 && 
				<Box 
					as={Close} 
					m={8} 
					right={0} 
					position="absolute"
					cursor={ !isView ? "pointer" : "cursor"} 
					color={ !isView ? "text" : "disabledInputText" }
					onClick={() => {
						if(!isView) onRemove()
					}}/>
			}
			
			<Grid
				border="1px"
				borderStyle="solid"
				borderColor="lightGray"
				gridColumn={{ base: "1 / -1", md: "1 / 9" }}
				gridGap={{ base: "16px", md: "24px" }}
				padding={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{ base: "repeat(12,1fr)" }}>

				{/* Placeholder for Phone ID */}
				<input 
					ref={register}
					type="text"
					name={`${prefix}[personId]`} 
					hidden
					defaultValue={`person${pocIndex}`}
					/>

				<Box gridColumn={{ base: "1 / -1", md: "1 / 7" }}>
					<FormIconInput labelText="First Name" labelId="firstNameLabel" icon={Person}>
						<Text
							ref={register({
								required: isAllPhoneEmailEmpty() || !isNameFieldsEmpty() ? false : "First Name is required",
							})}
							id="givenName"
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
							id="surName"
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
				
				{/* Email Set(address and type) List  , max = 3 */}
				{emailList.map((value: string, index: number) => {
					const setNumber = value.charAt(value.length-1)
					//if list has less than 3 and is the first set 
					const addable = emailList.length < 3 && index === 0
					return (
						<POCEmail 
							// EX, key = pocList0-emailDto0, 1, or 2
							key={`${prefix}-${value}`}
							// EX, id = pocList-0-emailList-0, 1, or 2
							namePrefix={`pocList-${pocIndex}-emailList-${setNumber}`}
							isFirst={index === 0}
							addable={addable}
							onEmptyEmail={initialEmailList.length === 0}
							triggerAllFields={triggerAllFields}
							onAdd={() => onAddEmail()}
							onRemove={()=> {
								onRemoveEmail(value)
							}}
						/>
					)
				})}

				{/* Phone Set(address and type) List , max = 3 */}
				{phoneList.map((value: string, index: number) => {
					const setNumber = value.charAt(value.length-1)
					const addable = phoneList.length < 3 && index === 0
					return (
						<POCPhone
							// EX, key = pocList0-phoneDto0,1, or 2
							key={`${prefix}-${value}`}
							namePrefix={`pocList-${pocIndex}-phoneList-${setNumber}`}
							isFirst={index === 0}
							addable={addable}
							onEmptyPhone={initialPhoneList.length === 0}
							onPhoneNumberChange={filterOnTextChange}
							triggerAllFields={triggerAllFields}
							onAdd={() => onAddPhone()}
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
