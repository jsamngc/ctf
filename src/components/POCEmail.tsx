import React from "react"
import { Box } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import { FormIconInput } from './FormIconInput'
import { Email, AddCircle, HighlightOff } from "@material-ui/icons"

import emailTypes_json from "../../content/emailTypes.json"

const EMAIL_REGEX = /^((?:[A-Za-z0-9!#&'+\-/?_`{|}~]+|"(?:\\"|\\\\|[A-Za-z0-9.!#&'+\-/?_`{|}~ ,:;<>@[].])+")(?:\.(?:[A-Za-z0-9!#&'+\-/?_`{|}~]+|"(?:\\"|\\\\|[A-Za-z0-9.!#&'+\-/?_`{|}~ ,:;<>@[].])+"))*)@((?:[A-Za-z0-9]+(?:(?:[A-Za-z0-9-]*[A-Za-z0-9])?)\.)+[A-Za-z]{1,})$/
type POCEmailProps = {
    id?: string
    onEmailAddressChange : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    watchNames? : string | undefined
    triggerPhoneEmail : () => void
    addable: boolean
    onAdd : () => void
    onRemove : () => void
    isFirst : boolean
}

const POCEmail: React.FC<POCEmailProps> = ( p : POCEmailProps) => {
    const { id, onEmailAddressChange, triggerPhoneEmail, addable, onAdd, onRemove, isFirst } = p
    const { errors, formState, register, trigger } = useFormContext<LklDto>()
    const { dirtyFields } = formState

	const watchEmailAddress: string | undefined = useWatch({ name: `${id}-emailAddress` })
    const watchEmailType: string | undefined = useWatch({ name: `${id}-emailType` })

    const errorFree = errors[`${id}-emailAddress`] === undefined && errors[`${id}-emailType`] === undefined
    const sectionDirty = dirtyFields[`${id}-emailAddress`] && dirtyFields[`${id}-emailType`]
    console.log(errorFree , sectionDirty , addable)
    const validateAddable = (errorFree && sectionDirty && addable)

    const errorMsgExist = errors[`${id}-emailAddress`]?.message !== '' || errors[`${id}-emailType`]?.message !== ''
    
    return (
        <>
        <Box gridColumn={{ base: "1 / -1", sm: "1 / 9", md: "1 / 7" }}>
            <FormIconInput labelText="Email Address" labelId="emailAddressLabel" icon={Email}>
                <Text
                    ref={register({
                        required: watchEmailType && !watchEmailAddress ? "Email Address is required" : false,
                        pattern: {
                            value: EMAIL_REGEX,
                            message: "Please enter valid email in the field",
                        }
                    })}
                    id={`${id}-emailAddress`}
                    name={`${id}-emailAddress`}
                    size="full"
                    disabled={false}
                    validationState={errors[`${id}-emailAddress`] ? ValidationState.ERROR : undefined}
                    errorMessage={errors[`${id}-emailAddress`]?.message}
                    onChange={onEmailAddressChange}
                    maxLength={67}
                    onBlur={() => {
                        trigger(`${id}-emailType`)
                        triggerPhoneEmail()
                    }}
                />
            </FormIconInput>
        </Box>

        <Box gridColumn={{ base: "1 / 12", sm: "9 / 12 ", md: "7 / 12" }}>
            <FormInput labelText="Type" labelId="emailTypeLabel">
                <Controller
                    name={`${id}-emailType`}
                    rules={{
                        required: watchEmailAddress && !watchEmailType ? "Email Type is required" : false
                    }}
                    render={({ onChange, onBlur, value }) => (
                        <Select
                            id={`${id}-emailType`}
                            name={`${id}-emailType`}
                            aria-labelledby="emailTypeLabel"
                            options={emailTypes_json}
                            size="full"
                            disabled={false}
                            validationState={errors[`${id}-emailType`] ? ValidationState.ERROR : undefined}
                            errorMessage={errors[`${id}-emailType`]?.message}
                            onChange={changes => {
                                onChange(changes.selectedItem?.value)
                            }}
                            onBlur={() => {
                                trigger(`${id}-emailAddress`)
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

export default POCEmail
