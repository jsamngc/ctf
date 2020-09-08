import React from "react"
import { Box } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import { FormIconInput } from './FormIconInput'
import { Phone, AddCircle, HighlightOff } from "@material-ui/icons"

import phoneTypes_json from "../../content/phoneTypes.json"

const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/

type POCPhoneProps = {
    id?: string
    onPhoneNumberChange : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    watchNames? : string | undefined
    triggerPhoneEmail : () => void
    addable: boolean
    onAdd : () => void
    onRemove : () => void
    isFirst : boolean
}

/**
 * Search Input component for searching for particular events.
 * Search is case-insensitive
 */
const POCPhone: React.FC<POCPhoneProps> = ( p : POCPhoneProps) => {
    const { id, onPhoneNumberChange, triggerPhoneEmail, addable, onAdd, onRemove, isFirst } = p
    const { errors, formState, register, trigger } = useFormContext<LklDto>()
    const { dirtyFields } = formState

    const watchPhoneType: string | undefined = useWatch({ name: `${id}-phoneType` })
	const watchPhoneNumber: string | undefined = useWatch({ name: `${id}-phoneNumber` })
    
    const errorFree = errors[`${id}-phoneNumber`] === undefined && errors[`${id}-phoneType`] === undefined
    const sectionDirty = dirtyFields[`${id}-phoneNumber`] && dirtyFields[`${id}-phoneType`]
    const validateAddable = (errorFree && sectionDirty && addable)

    const errorMsgExist = errors[`${id}-phoneNumber`]?.message !== '' || errors[`${id}-phoneType`]?.message !== ''

    return (
        <>
        
        <Box gridColumn={{ base: "1 / -1", sm: "1 / 9", md: "1 / 7" }}>
            <FormIconInput labelText="Phone Number" labelId="phoneNumberLabel" icon={Phone}>
                <Text
                    ref={register({
                        required: watchPhoneType && !watchPhoneNumber ? "Phone Number is required" : false,
                        pattern: {
                            value: PHONE_REGEX,
                            message: "Please enter valid phone number in the field",
                        }
                    })}
                    id={`${id}-phoneNumber`}
                    name={`${id}-phoneNumber`}
                    size="full"
                    disabled={false}
                    validationState={errors[`${id}-phoneNumber`] ? ValidationState.ERROR : undefined}
                    errorMessage={errors[`${id}-phoneNumber`]?.message}
                    onChange={onPhoneNumberChange}
                    maxLength={30}
                    onBlur={() => {
                        trigger(`${id}-phoneType`)
                        triggerPhoneEmail()
                    }}
                />
            </FormIconInput>
        </Box>

        <Box gridColumn={{ base: "1 / 12", sm: "9 / 12", md: "7 / 12" }}>
            <FormInput labelText="Type" labelId="phoneTypeLabel">
                <Controller
                    name={`${id}-phoneType`}
                    rules={
                        {required: watchPhoneNumber && !watchPhoneType ? "Phone Type is required" : false
                    }}
                    render={({ onChange, onBlur, value }) => (
                        <Select
                            id={`${id}-phoneType`}
                            name={`${id}-phoneType`}
                            aria-labelledby="phoneTypeLabel"
                            options={phoneTypes_json}
                            size="full"
                            disabled={false}
                            validationState={errors[`${id}-phoneType`] ? ValidationState.ERROR : undefined}
                            errorMessage={errors[`${id}-phoneType`]?.message}
                            onChange={changes => {
                                onChange(changes.selectedItem?.value)
                            }}
                            onBlur={() => {
                                trigger(`${id}-phoneNumber`)
                                triggerPhoneEmail()
                            }}
                            value={value}
                        />
                    )}
                />
            </FormInput>
        </Box>

        <Box gridColumn={{ base: "12 / 13"}} alignSelf="center" justifySelf="center">
            {isFirst ?
                <Box mt={errorFree ? 32 : errorMsgExist ? 0 : 32} as={AddCircle} 
                    cursor={ validateAddable ? "pointer" : "cursor"} 
                    color={ validateAddable ? "clickable" : "disabledInputText" }
                    onClick={() => {
                        if(validateAddable) onAdd()
                    }}
                    />
            :
                <Box mt={errorFree ? 32 : errorMsgExist ? 0 : 32} as={HighlightOff} cursor="pointer" color="clickable" 
                    onClick={onRemove}/>
            }
        </Box>
        </>
    )
}

export default POCPhone
