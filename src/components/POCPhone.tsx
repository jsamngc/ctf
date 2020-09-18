import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import { useCTFFormContext } from "./Forms/Form"
import { FormIconInput } from './FormIconInput'
import { Phone, AddCircle, HighlightOff } from "@material-ui/icons"

import phoneTypes_json from "../../content/phoneTypes.json"

const PHONE_REGEX = /^([+]?\d{1,2}[.-\s]?)?(\(?\d{3}\)?[\s.-]?){2}\d{4}$/

type POCPhoneProps = {
    namePrefix: string
    isFirst : boolean
    addable: boolean
    onEmptyPhone: boolean
    onPhoneNumberChange : (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    triggerAllFields : () => void
    onAdd : () => void
    onRemove : () => void
}

// One set of Phone number and type
const POCPhone: React.FC<POCPhoneProps> = ( p : POCPhoneProps) => {
    const {namePrefix,  isFirst, addable, onEmptyPhone,
            onPhoneNumberChange, triggerAllFields, onAdd, onRemove } = p
    const { isView } = useCTFFormContext()
    const { errors, formState, register } = useFormContext<LKLFormData>()
    const { dirtyFields } = formState

    // namePrefix : {prefix}-{index of POC}-{string "phoneList"}-{Phone set index}
    // Ex, pocList-0-phoneList-0
    const [ prefix, pocIndex, phoneList ,setNumber ] = namePrefix.split('-')
    const setNameOrder = (nameOfInput : string) => {
        return `${prefix}[${pocIndex}][${phoneList}][${setNumber}][${nameOfInput}]`
    }
    const namePhoneNumber = setNameOrder('phoneNum')
    const namePhoneType = setNameOrder(`phoneTypeCd`)

    const watchPhoneNumber: string | undefined = useWatch({ name: namePhoneNumber })
    const watchPhoneType: string | undefined = useWatch({ name: namePhoneType })
    
    // Get Errors specific to this phone set
    const errorsPOC = errors && errors.pocList && errors.pocList[+pocIndex] ? errors.pocList[+pocIndex] : null
    const errorsPhoneList = errorsPOC && errorsPOC.phoneList ? errorsPOC.phoneList[+setNumber] : null

    // Get Dirty fields in the email set
    const dirtyPOC = dirtyFields && dirtyFields.pocList && dirtyFields.pocList[+pocIndex] ? dirtyFields.pocList[+pocIndex] : null
    const dirtyPhoneList = dirtyPOC && dirtyPOC.phoneList ? dirtyPOC.phoneList[+setNumber] : null

    const errorFree = errorsPhoneList?.phoneNum === undefined && errorsPhoneList?.phoneTypeCd === undefined
    const sectionDirty = dirtyPhoneList?.phoneNum && dirtyPhoneList?.phoneTypeCd
    const validateAddable = (errorFree && (onEmptyPhone ? sectionDirty : true) && addable && !isView)

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
                        disabled={isView}
                        validationState={errorsPhoneList?.phoneNum ? ValidationState.ERROR : undefined}
                        errorMessage={errorsPhoneList?.phoneNum?.message}
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
                                        disabled={isView}
                                        validationState={errorsPhoneList?.phoneTypeCd ? ValidationState.ERROR : undefined}
                                        errorMessage={errorsPhoneList?.phoneTypeCd?.message}
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
