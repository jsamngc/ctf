import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import { FormIconInput } from './FormIconInput'
import { Email, AddCircle, HighlightOff } from "@material-ui/icons"

import emailTypes_json from "../../content/emailTypes.json"

const EMAIL_REGEX = /^((?:[A-Za-z0-9!#&'+\-/?_`{|}~]+|"(?:\\"|\\\\|[A-Za-z0-9.!#&'+\-/?_`{|}~ ,:;<>@[].])+")(?:\.(?:[A-Za-z0-9!#&'+\-/?_`{|}~]+|"(?:\\"|\\\\|[A-Za-z0-9.!#&'+\-/?_`{|}~ ,:;<>@[].])+"))*)@((?:[A-Za-z0-9]+(?:(?:[A-Za-z0-9-]*[A-Za-z0-9])?)\.)+[A-Za-z]{1,})$/

type POCEmailProps = {
    id: string
    isFirst : boolean
    addable: boolean
    personDtoIndex : number
    onEmailAddressChange : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    triggerAllFields : () => void
    onAdd : () => void
    onRemove : () => void
}

// One set of Email address and type
const POCEmail: React.FC<POCEmailProps> = ( p : POCEmailProps) => {
    const { id, addable, personDtoIndex, isFirst,
            onEmailAddressChange, triggerAllFields, onAdd, onRemove } = p
    const { errors, formState, register } = useFormContext<LklDto>()
    const { dirtyFields } = formState

    const [ prefix, setNumber ] = id.split('-')
    // Parse input name to LKLDTO structure
    const setNameOrder = (nameOfInput : string) => {
        return `${prefix}[personEmailDtoList][${setNumber}]${nameOfInput}`
    }
    const nameEmailAddress = setNameOrder('[emailDto][emailAddress]')
    const nameEmailType = setNameOrder(`[emailDto][emailType]`)
    
    const watchEmailAddress: string | undefined = useWatch({ name: nameEmailAddress })
    const watchEmailType: string | undefined = useWatch({ name: nameEmailType })
    
    // Get Errors specific to this email set
    const errorEmailDtoList = errors && errors.lookupLklDto && errors.lookupLklDto.lklPocListDto ? 
        errors.lookupLklDto?.lklPocListDto[personDtoIndex]?.personDto?.personEmailDtoList : null
    const errorsEmailDto = errorEmailDtoList ? errorEmailDtoList[+setNumber]?.emailDto : null

    // Get Dirty fields in the email set
    const dirtyEmailDtoList = dirtyFields && dirtyFields.lookupLklDto && dirtyFields.lookupLklDto.lklPocListDto ? 
        dirtyFields.lookupLklDto?.lklPocListDto[personDtoIndex]?.personDto?.personEmailDtoList : null
    const dirtyEmailDto = dirtyEmailDtoList ? dirtyEmailDtoList[+setNumber]?.emailDto : null

    const errorFree = errorsEmailDto?.emailAddress === undefined && errorsEmailDto?.emailType === undefined
    const sectionDirty = dirtyEmailDto?.emailAddress && dirtyEmailDto?.emailType
    const validateAddable = (errorFree && sectionDirty && addable)

    const errorMsgExist = errorsEmailDto?.emailType?.message !== '' && errorsEmailDto?.emailType?.message !== undefined
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
                        id={nameEmailAddress}
                        name={nameEmailAddress}
                        size="full"
                        disabled={false}
                        validationState={errorsEmailDto?.emailAddress ? ValidationState.ERROR : undefined}
                        errorMessage={errorsEmailDto?.emailAddress?.message}
                        onChange={onEmailAddressChange}
                        maxLength={67}
                        onBlur={() => {
                            triggerAllFields()
                        }}
                    />
                </FormIconInput>
            </Box>

            <Box gridColumn={{ base: "1 / 13", sm: "9 / 13 ", md: "7 / 13" }}>
                <Grid
                    gridColumn={{ base: "1 / -1"}}
                    gridGap={{ base: "8px", md: "16px" }}
                    gridTemplateColumns={{ base: "repeat(12,1fr)" }}>
                    <Box gridColumn={{ base: "1 / 12" }}>
                        <FormInput labelText="Type" labelId="emailTypeLabel">
                            <Controller
                                name={nameEmailType}
                                rules={{
                                    required: watchEmailAddress && !watchEmailType ? "Email Type is required" : false
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <Select
                                        id={nameEmailType}
                                        name={nameEmailType}
                                        aria-labelledby="emailTypeLabel"
                                        options={emailTypes_json}
                                        size="full"
                                        disabled={false}
                                        validationState={errorsEmailDto?.emailType ? ValidationState.ERROR : undefined}
                                        errorMessage={ errorsEmailDto?.emailType?.message}
                                        onChange={changes => {
                                            onChange(changes.selectedItem?.value)
                                        }}
                                        onBlur={() => {
                                            triggerAllFields()
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
                </Grid>
            </Box>
        </>
    )
}

export default POCEmail
