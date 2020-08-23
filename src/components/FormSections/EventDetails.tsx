import React, { useRef } from "react"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Box, Grid, useDisclosure } from "@chakra-ui/core"
import { Switch, DatePicker, Select, FormInput, Text, ValidationState, Textarea } from "@c1ds/components"
import { compareAsc } from "date-fns"

import mgmtTypes from "../../../content/managementTypes.json"
import eventTypes from "../../../content/eventTypes.json"
import { FormSection, replaceMSWordChars, useCTFFormContext } from "../Forms/Form"
import DeactivateModal from "../Modals/DeactivateModal"

const EventDetails: React.FC = () => {
	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()

	const { register, errors, setValue } = useFormContext<EventFormData>()

	const eventStartDateRef = useRef<HTMLInputElement>(null)
	const eventEndDateRef = useRef<HTMLInputElement>(null)
	const managementTypeCodeRef = useRef<HTMLButtonElement>(null)
	const eventTypeIdRef = useRef<HTMLButtonElement>(null)
	const eventSummaryRef = useRef<HTMLTextAreaElement>(null)

	const watchActiveIndicator = useWatch<boolean>({ name: "activeIndicator" })
	const watchEventStartDate: Date | undefined = useWatch({ name: "eventStartDate" }) as Date

	const { isView, isCreate } = useCTFFormContext()

	return (
		<FormSection title="Event Details" showDivider={true}>
			<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
				<FormInput labelText="Event Title" labelId="eventTitleLabel" required>
					<Text
						ref={register({
							required: "Please enter an Event Title",
							maxLength: { value: 25, message: "Event Title cannot exceed 25 characters" },
						})}
						name="eventTitle"
						id="eventTitle"
						size="full"
						disabled={isView}
						maxLength={25}
						validationState={errors?.eventTitle ? ValidationState.ERROR : undefined}
						errorMessage={errors?.eventTitle?.message}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							/*
							 * 1.5 The system disallows a space or non-alphanumeric character (in plain text)
							 * at beginning of the title field
							 */
							e.target.value = e.target.value.replace(/^[^A-Za-z0-9]+/, "")
						}}
					/>
				</FormInput>
			</Box>
			<Grid
				gridColumn={{ base: "1 / -1" }}
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{ base: "repeat(1,max-content)", md: "repeat(3,max-content)" }}>
				<FormInput labelText="Start Date" labelId="eventStartDateLabel" required>
					<Controller
						// @ts-ignore
						as={<DatePicker />}
						id="eventStartDate"
						name="eventStartDate"
						rules={{ required: "Please enter a Start Date" }}
						inputRef={eventStartDateRef}
						onFocus={() => eventStartDateRef.current?.focus()}
						/* 1.6.1 The user can edit the Start Date to any date before today's date
						 * with valid date range: 01/01/1900 to 01/01/9999
						 */
						maxDate={new Date()}
						disabled={isView}
						error={typeof errors?.eventStartDate !== "undefined"}
						errorMessage={errors?.eventStartDate?.message}
					/>
				</FormInput>
				{/* TODO: Discuss implications of large date range */}
				<FormInput labelText="End Date" labelId="eventEndDateLabel">
					<Controller
						// @ts-ignore
						as={<DatePicker />}
						id="eventEndDate"
						name="eventEndDate"
						/* The system displays appropriate error message
						 * "End Date must be equal or later than Start Date"
						 * when user editing End Date of a reactivate event.
						 */
						rules={{
							validate: {
								afterStartDate: value =>
									!!watchActiveIndicator ||
									compareAsc(value, watchEventStartDate) > -1 ||
									"End Date must be equal to or later than Start Date",
							},
						}}
						inputRef={eventEndDateRef}
						onFocus={() => eventEndDateRef.current?.focus()}
						minDate={watchEventStartDate ? watchEventStartDate : undefined}
						maxDate={new Date(2100, 0, 1)}
						disabled={isView}
						error={typeof errors?.eventEndDate !== "undefined"}
						errorMessage={errors?.eventEndDate?.message}
					/>
				</FormInput>
				<FormInput labelText="Active" labelId="activeIndicatorLabel">
					<Switch
						ref={register()}
						name="activeIndicator"
						id="activeIndicator"
						value="Active"
						disabled={isView}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.target.checked) {
								setValue("eventEndDate", undefined)
							} else {
								/*
								 * Note: Prevent default will not work as expected for checkboxes in React.
								 * Instead, revert activeIndicator value back to true
								 */
								setValue("activeIndicator", true)
								onDeactivateOpen()
							}
						}}
					/>
				</FormInput>
			</Grid>
			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Management Type" labelId="managementTypeCodeLabel" required>
					<Controller
						name="managementTypeCode"
						rules={{
							required: "Please select a Management Type",
						}}
						onFocus={() => managementTypeCodeRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Select
								ref={managementTypeCodeRef}
								id="managementTypeCode"
								name="managementTypeCode"
								aria-labelledby="managementTypeCodeLabel"
								options={mgmtTypes}
								size="full"
								disabled={isView}
								validationState={errors?.managementTypeCode ? ValidationState.ERROR : undefined}
								errorMessage={errors?.managementTypeCode?.message}
								onChange={changes => {
									onChange(changes.selectedItem?.value)
								}}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Event Type" labelId="eventTypeIdLabel" required>
					<Controller
						name="eventTypeId"
						rules={{
							required: "Please select an Event Type",
						}}
						onFocus={() => eventTypeIdRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Select
								ref={eventTypeIdRef}
								id="eventTypeId"
								name="eventTypeId"
								aria-labelledby="eventTypeIdLabel"
								options={eventTypes}
								size="full"
								disabled={isView}
								validationState={errors?.eventTypeId ? ValidationState.ERROR : undefined}
								errorMessage={errors?.eventTypeId?.message}
								onChange={changes => {
									onChange(changes.selectedItem?.value)
								}}
								onBlur={onBlur}
								value={value}
							/>
						)}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
				<FormInput labelText="Event Summary" labelId="eventSummaryLabel">
					<Controller
						name="eventSummary"
						rules={{
							pattern: {
								value: /^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,
								message: "Please enter only plain text in the Event Summary field",
							},
							maxLength: { value: 4000, message: "Event Summary cannot exceed 4000 characters" },
						}}
						onFocus={() => eventSummaryRef.current?.focus()}
						render={({ onChange, onBlur, value }) => (
							<Textarea
								ref={eventSummaryRef}
								id="eventSummary"
								name="eventSummary"
								aria-labelledby="eventSummaryLabel"
								size="full"
								maxLength={4000}
								disabled={isView}
								validationState={errors?.eventSummary ? ValidationState.ERROR : undefined}
								errorMessage={errors?.eventSummary?.message}
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
			<DeactivateModal
				isOpen={isDeactivateOpen}
				onCancel={onDeactivateClose}
				onConfirm={() => {
					/**
					 * 1.11.2 The user clicks on [YES] on the confirmation message
					 * to deactivate the event or clicks on [Cancel] to exit the deactivation.
					 */
					// 1.11.3 The system update the Event Active Indicator to No and Event End Date to today's date.
					setValue("activeIndicator", false)
					setValue("eventEndDate", new Date())

					onDeactivateClose()
				}}
			/>
		</FormSection>
	)
}

export default EventDetails
