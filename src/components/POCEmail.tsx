import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Select, FormInput, Text, ValidationState } from "@c1ds/components"

import { useCTFFormContext } from "./Forms/Form"
import { FormIconInput } from './FormIconInput'
import { Email, AddCircle, HighlightOff } from "@material-ui/icons"

import emailTypes_json from "../../content/emailTypes.json"

/**
  * Email field validation pattern
  * // '(?:(?:"[A-Za-z0-9!#&\'... --> Local-part (quoted) - Allows alphanumeric, !#$%&'*+-/=?^_`{|}~, and leading/terminating/consecutive dots
  * // '(?:[A-Za-z0-9!#&\'+\\-... --> Local-part (non-quoted): Allows alphanumeric, !#$%&'*+-/=?^_`{|}~, and non-leading, non-terminating, non-consecutive dots
  * // '(?:(?:[A-Za-z0-9]{1,63... --> Domain-part (second/lower level domains): Allows alphanumeric and non-leading, non-terminating hyphens
  * // '(?:(?:[A-Za-z0-9]-*)*[... --> Domain-part (top level domains): Allows alphanumeric and non-leading, non-terminating hyphens. Requires at least one non-numeric character
  */

 const EMAIL_VALIDATION_PATTERN = new RegExp([
    '^(?:',
    '(?:(?:"[A-Za-z0-9!#&\'+\\-/?_`{}~.]*")|',                                         
    '(?:[A-Za-z0-9!#&\'+\\-/?_`{}~]+(?:\\.?[A-Za-z0-9!#&\'+\\-/?_`{}~])*))',           
    '@',
    '(?:(?:[A-Za-z0-9]{1,63}\\.)|(?:[A-Za-z0-9][A-Za-z0-9\\-]{1,61}[A-Za-z0-9]\\.))+', 
    '(?:(?:[A-Za-z0-9]-*)*[A-Za-z](?:-*[A-Za-z0-9])*)',                                
    ')$',
    ].join(''))

type POCEmailProps = {
    namePrefix: string
    isFirst : boolean
    addable: boolean
    onEmptyEmail: boolean
    triggerAllFields : () => void
    onAdd : () => void
    onRemove : () => void
}

// One set of Email address and type
const POCEmail: React.FC<POCEmailProps> = ( p : POCEmailProps) => {
    const { namePrefix, addable, isFirst, onEmptyEmail,
            triggerAllFields, onAdd, onRemove } = p
    const { isView } = useCTFFormContext()
    const { errors, formState, register } = useFormContext<LKLFormData>()
    const { dirtyFields } = formState

    // namePrefix : {prefix}-{index of POC}-{string "emailList"}-{Email set index}
    // Ex, pocList-0-emailList-0
    const [ prefix, pocIndex, emailList ,setNumber ] = namePrefix.split('-')
    const setNameOrder = (nameOfInput : string) => {
        return `${prefix}[${pocIndex}][${emailList}][${setNumber}][${nameOfInput}]`
    }
    
    const nameEmailAddress = setNameOrder('emailAddress')
    const nameEmailType = setNameOrder(`emailType`)
    
    const watchEmailAddress: string | undefined = useWatch({ name: nameEmailAddress })
    const watchEmailType: string | undefined = useWatch({ name: nameEmailType })
    
    // Get Errors specific to this email set
    const errorsPOC = errors && errors.pocList && errors.pocList[+pocIndex] ? errors.pocList[+pocIndex] : null
    const errorsEmailDto = errorsPOC && errorsPOC.emailList ? errorsPOC.emailList[+setNumber] : null

    // Get Dirty fields in the email set
    const dirtyPOC = dirtyFields && dirtyFields.pocList && dirtyFields.pocList[+pocIndex] ? dirtyFields.pocList[+pocIndex] : null
    const dirtyEmailDto = dirtyPOC && dirtyPOC.emailList ? dirtyPOC.emailList[+setNumber] : null

    const errorFree = errorsEmailDto?.emailAddress === undefined && errorsEmailDto?.emailType === undefined
    const sectionDirty = dirtyEmailDto?.emailAddress !== undefined && dirtyEmailDto?.emailType !== undefined
    const validateAddable = (errorFree && (onEmptyEmail ? sectionDirty : true ) && addable && !isView)

    const errorMsgExist = errorsEmailDto?.emailType?.message !== '' && errorsEmailDto?.emailType?.message !== undefined
    return (
        <>
            <Box gridColumn={{ base: "1 / -1", sm: "1 / 9", md: "1 / 7" }}>
                <FormIconInput labelText="Email Address" labelId="emailAddressLabel" icon={Email}>
                    <Text
                        ref={register({
                            required: watchEmailType && !watchEmailAddress ? "Email Address is required" : false,
                            pattern: {
                                value: EMAIL_VALIDATION_PATTERN,
                                message: "Please enter valid email in the field",
                            }
                        })}
                        id={nameEmailAddress}
                        name={nameEmailAddress}
                        size="full"
                        disabled={isView}
                        validationState={errorsEmailDto?.emailAddress ? ValidationState.ERROR : undefined}
                        errorMessage={errorsEmailDto?.emailAddress?.message}
                        // Email validation covers email value
                        // onChange={onEmailAddressChange}
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
                                render={({ onChange, value }) => (
                                    <Select
                                        id={nameEmailType}
                                        name={nameEmailType}
                                        aria-labelledby="emailTypeLabel"
                                        options={emailTypes_json}
                                        size="full"
                                        disabled={isView}
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
                                cursor={validateAddable ? "pointer" : "cursor"} 
                                color={validateAddable ? "clickable" : "disabledInputText"}
                                onClick={() => {
                                    if(validateAddable) onAdd()
                                }}
                                />
                        :
                            <Box mt={errorFree ? 32 : errorMsgExist ? 0 : 32} as={HighlightOff} 
                                cursor={ !isView ? "pointer" : "cursor"} 
                                color={ !isView ? "clickable" : "disabledInputText" }
                                onClick={() => {
                                    if(!isView) onRemove()
                                }}
                                />
                        }
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default POCEmail
