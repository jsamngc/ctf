import React, { useEffect, useRef } from "react"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Box, Grid } from "@chakra-ui/core"
import { DatePicker, Select, FormInput, ValidationState } from "@c1ds/components"

import evacStatuses from "../../../content/evacuationStatuses.json"
import { Textarea } from "../Textarea"
import { FormSection, replaceMSWordChars, useCTFFormContext } from "../Forms/Form"
import { EventFormData } from "../Forms/EventForm"

interface EvacDetailsProps {
	savedEvent?: EventFormData
}

const EvacDetails: React.FC<EvacDetailsProps> = (p: EvacDetailsProps) => {
	const { register, formState, errors, setValue, getValues } = useFormContext<EventFormData>()
	const { savedEvent } = p

	// Due to non-standard change event, select inputs must be registered manually
	const evacStatusCodeRef = useRef<HTMLButtonElement>(null)
	const evacDepAuthDateRef = useRef<HTMLElement>(null)
	const orderedDateRef = useRef<HTMLElement>(null)
	const evacSummaryRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		register({ name: "evacStatusCode" })
	}, [register])

	// Handle focus-on-error for controlled components
	useEffect(() => {
		if (errors.evacStatusCode && evacStatusCodeRef.current) {
			evacStatusCodeRef.current.focus()
		} else if (errors.evacDepAuthDate && evacDepAuthDateRef.current) {
			evacDepAuthDateRef.current.focus()
		} else if (errors.evacDepOrdDate && orderedDateRef.current) {
			orderedDateRef.current.focus()
		} else if (errors.evacSummary && evacSummaryRef.current) {
			evacSummaryRef.current.focus()
		}
	})

	const watchEvacStatus = useWatch<string>({ name: "evacStatusCode" })

	const { isCreate, isView, isEdit } = useCTFFormContext()

	const { dirtyFields } = formState

	return (
		<FormSection title="Evacuation Details">
			<Box gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 3" }}>
				<FormInput labelText="Evacuation Status" labelId="evacStatusCodeLabel">
					<Select
						ref={evacStatusCodeRef}
						id="evacStatusCode"
						name="evacStatusCode"
						options={evacStatuses}
						size="full"
						disabled={isView}
						value={isView || isEdit ? savedEvent?.evacStatusCode : ""}
						validationState={errors?.evacStatusCode ? ValidationState.ERROR : undefined}
						errorMessage={errors?.evacStatusCode?.message}
						onChange={changes => {
							const newVal = changes.selectedItem?.value
							setValue("evacStatusCode", newVal, { shouldDirty: true })
							/*
							 * 1.16.6 The system defaults the Authorized or Ordered Date to Today’s date
							 * when Evacuation Status is selected.
							 */
							if (newVal === "ADEP" && !getValues("evacDepAuthDate")) {
								setValue("evacDepAuthDate", new Date())
								/*
								 * Only clear date field if creating a new event and date is not dirty
								 * (i.e. user has never modified/saved the date field)
								 */
								isCreate && !dirtyFields.evacDepOrdDate && setValue("evacDepOrdDate", "")
							} else if (newVal === "ODEP" && !getValues("evacDepOrdDate")) {
								setValue("evacDepOrdDate", new Date())
								/*
								 * Only clear date field if creating a new event and date is not dirty
								 * (i.e. user has never modified/saved the date field)
								 */
								isCreate && !dirtyFields.evacDepAuthDate && setValue("evacDepAuthDate", "")
							} else if (newVal === "NONE") {
								isCreate && !dirtyFields.evacDepOrdDate && setValue("evacDepOrdDate", "")
								isCreate && !dirtyFields.evacDepAuthDate && setValue("evacDepAuthDate", "")
							}
						}}
					/>
				</FormInput>
			</Box>
			<Grid
				gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 9" }}
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{ base: "repeat(1,max-content)", md: "repeat(2,max-content)" }}>
				<FormInput labelText="Departure Authorized" labelId="evacDepAuthDateLabel">
					<Controller
						name="evacDepAuthDate"
						render={({ onBlur, value }) => (
							<DatePicker
								ref={evacDepAuthDateRef}
								id="evacDepAuthDate"
								name="evacDepAuthDate"
								/*
								 * 1.16.3 The system disables the Date Departure Authorized
								 * and Date Departure Ordered fields
								 * when Evacuation Status to “blank”
								 *
								 * 1.16.4 The system enables Date Departure Authorized
								 * when Evacuation Status to “Authorized”
								 */
								disabled={isView || !watchEvacStatus || watchEvacStatus !== "ADEP"}
								maxDate={new Date(9999, 0, 1)}
								value={value}
								onBlur={onBlur}
								error={typeof errors?.evacDepAuthDate !== "undefined"}
								errorMessage={errors?.evacDepAuthDate?.message}
								onChange={(date: Date) => setValue("evacDepAuthDate", date, { shouldDirty: true })}
							/>
						)}
					/>
				</FormInput>
				<FormInput labelText="Departure Ordered" labelId="orderedDateLabel">
					<Controller
						name="evacDepOrdDate"
						render={({ onBlur, value }) => (
							<DatePicker
								ref={orderedDateRef}
								id="evacDepOrdDate"
								name="evacDepOrdDate"
								/*
								 * 1.16.3 The system disables the Date Departure Authorized
								 * and Date Departure Ordered fields
								 * when Evacuation Status to “blank”
								 *
								 * 1.16.5 The system enables Date Departure Ordered
								 * when Evacuation Status to “Ordered”
								 */
								disabled={isView || !watchEvacStatus || watchEvacStatus !== "ODEP"}
								maxDate={new Date(9999, 0, 1)}
								value={value}
								onBlur={onBlur}
								error={typeof errors?.evacDepOrdDate !== "undefined"}
								errorMessage={errors?.evacDepOrdDate?.message}
								onChange={(date: Date) => setValue("evacDepOrdDate", date, { shouldDirty: true })}
							/>
						)}
					/>
				</FormInput>
			</Grid>
			<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
				<FormInput labelText="Evacuation Summary" labelId="evacSummaryLabel">
					<Controller
						name="evacSummary"
						rules={{
							pattern: {
								value: /^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,
								message: "Please enter only plain text in the Evacuation Summary field",
							},
							maxLength: { value: 4000, message: "Evacuation Summary cannot exceed 4000 characters" },
						}}
						render={({ onChange, onBlur, value }) => (
							<Textarea
								ref={evacSummaryRef}
								id="evacSummary"
								name="evacSummary"
								labelId="evacSummaryLabel"
								maxLength={4000}
								disabled={isView}
								validationState={errors?.evacSummary ? ValidationState.ERROR : undefined}
								errorMessage={errors?.evacSummary?.message}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									/*
									 * 1.15.1 The user can only enter "Plain Text" in the Event Summary field.
									 * 1.15.2 The system disallows the user to enter any characters that might
									 * cause potential security vulnerability like SQL injection, cross-site scripting
									 */
									e.target.value = replaceMSWordChars(e.target.value).replace(
										/[^A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/g,
										""
									)
									onChange(e)
								}}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>
		</FormSection>
	)
}

export default EvacDetails
