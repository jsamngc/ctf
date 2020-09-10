import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import { FormIconInput } from './FormIconInput'
import { Phone, AddCircle, HighlightOff } from "@material-ui/icons"

import phoneTypes_json from "../../content/phoneTypes.json"

const PHONE_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/

type POCPhoneProps = {
    id: string
    isFirst : boolean
    addable: boolean
    personDtoIndex : number
    onPhoneNumberChange : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    triggerAllFields : () => void
    onAdd : () => void
    onRemove : () => void
}

// One set of Phone number and type
const POCPhone: React.FC<POCPhoneProps> = ( p : POCPhoneProps) => {
    const { id, personDtoIndex,  isFirst, addable,
            onPhoneNumberChange, triggerAllFields, onAdd, onRemove } = p
    const { errors, formState, register } = useFormContext<LklDto>()
    const { dirtyFields } = formState

    const [ prefix, setNumber ] = id.split('-')
    // Parse input name to LKLDTO structure
    const setNameOrder = (nameOfInput : string) => {
        return `${prefix}[personPhoneDtoList][${setNumber}]${nameOfInput}`
    }
    const namePhoneNumber = setNameOrder('[phoneDto][phoneNum]')
    const namePhoneType = setNameOrder(`[phoneDto][phoneTypeCd]`)

    const watchPhoneNumber: string | undefined = useWatch({ name: namePhoneNumber })
    const watchPhoneType: string | undefined = useWatch({ name: namePhoneType })

    // Get Errors specific to this phone set
    const personPhoneDtoList = errors && errors.lookupLklDto && errors.lookupLklDto.lklPocListDto ? 
        errors.lookupLklDto?.lklPocListDto[personDtoIndex]?.personDto?.personPhoneDtoList : null
    const errorsPhoneDto = personPhoneDtoList ? personPhoneDtoList[+setNumber]?.phoneDto : null

    // Get Dirty fields in the phone set
    const dirtyPhoneDtoList = dirtyFields && dirtyFields.lookupLklDto && dirtyFields.lookupLklDto.lklPocListDto ? 
        dirtyFields.lookupLklDto?.lklPocListDto[personDtoIndex]?.personDto?.personPhoneDtoList : null
    const dirtyPhoneDto = dirtyPhoneDtoList ? dirtyPhoneDtoList[+setNumber]?.phoneDto : null

    const errorFree = errorsPhoneDto?.phoneNum === undefined && errorsPhoneDto?.phoneTypeCd === undefined
    const sectionDirty = dirtyPhoneDto?.phoneNum && dirtyPhoneDto?.phoneTypeCd
    const validateAddable = (errorFree && sectionDirty && addable)

    const errorMsgExist = errors[namePhoneType]?.message  !== undefined && errors[namePhoneType]?.message !== ''
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
                        id={namePhoneNumber}
                        name={namePhoneNumber}
                        size="full"
                        disabled={false}
                        validationState={errorsPhoneDto?.phoneNum ? ValidationState.ERROR : undefined}
                        errorMessage={errorsPhoneDto?.phoneNum?.message}
                        onChange={onPhoneNumberChange}
                        maxLength={30}
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
                        <FormInput labelText="Type" labelId="phoneTypeLabel">
                            <Controller
                                name={namePhoneType}
                                rules={
                                    {required: watchPhoneNumber && !watchPhoneType ? "Phone Type is required" : false
                                }}
                                render={({ onChange, value }) => (
                                    <Select
                                        id={namePhoneType}
                                        name={namePhoneType}
                                        aria-labelledby="phoneTypeLabel"
                                        options={phoneTypes_json}
                                        size="full"
                                        disabled={false}
                                        validationState={errorsPhoneDto?.phoneTypeCd ? ValidationState.ERROR : undefined}
                                        errorMessage={errorsPhoneDto?.phoneTypeCd?.message}
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

export default POCPhone
