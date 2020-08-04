import React, { useEffect, useRef } from "react"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Box, Grid, useDisclosure } from "@chakra-ui/core"
import { Switch, DatePicker, Select, FormInput, Text, ValidationState } from "@c1ds/components"

import mgmtTypes from "../../../content/managementTypes.json"
import eventTypes from "../../../content/eventTypes.json"
import { Textarea } from "../../components/Textarea"
import { FormSection, replaceMSWordChars, useCTFFormContext } from "../Forms/Form"
import { EventFormData } from "../Forms/EventForm"
import DeactivateModal from "../Modals/DeactivateModal"

interface EventDetailsProps {
	savedEvent?: EventFormData
}

const EventDetails: React.FC<EventDetailsProps> = (p: EventDetailsProps) => {
	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()

	const { register, errors, setValue } = useFormContext<EventFormData>()
	const { savedEvent } = p

	const eventStartDateRef = useRef<HTMLInputElement>(null)
	const eventEndDateRef = useRef<HTMLInputElement>(null)
	const managementTypeCodeRef = useRef<HTMLButtonElement>(null)
	const eventTypeIdRef = useRef<HTMLButtonElement>(null)
	const eventSummaryRef = useRef<HTMLTextAreaElement>(null)

	// Due to non-standard change event, select inputs must be registered manually
	useEffect(() => {
		register({ name: "managementTypeCode" }, { required: "Please select a Management Type" })
		register({ name: "eventTypeId" }, { required: "Please select an Event Type" })
	}, [register])

	// Handle focus-on-error for controlled components
	useEffect(() => {
		if (errors.eventStartDate && eventStartDateRef.current) {
			// eventStartDateRef.current.focus()
		} else if (errors.eventEndDate && eventEndDateRef.current) {
			eventEndDateRef.current.focus()
		} else if (errors.managementTypeCode && managementTypeCodeRef.current) {
			managementTypeCodeRef.current.focus()
		} else if (errors.eventTypeId && eventTypeIdRef.current) {
			eventTypeIdRef.current.focus()
		} else if (errors.eventSummary && eventSummaryRef.current) {
			eventSummaryRef.current.focus()
		}
	})

	const watchActiveIndicator = useWatch<boolean>({ name: "activeIndicator" })
	const watchEventStartDate: Date | undefined = useWatch({ name: "eventStartDate" }) as Date

	const { isView, isEdit } = useCTFFormContext()

	return (
		<FormSection title="Event Details" showDivider={true}>
			<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
				<FormInput labelText="Event Title" labelId="eventTitleLabel" required={true}>
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
				<Controller
					name="eventStartDate"
					rules={{ required: "Please enter a Start Date" }}
					render={({ onBlur, value }) => (
						<FormInput labelText="Start Date" labelId="eventStartDateLabel" required={true}>
							<DatePicker
								inputRef={eventStartDateRef}
								id="eventStartDate"
								name="eventStartDate"
								/* 1.6.1 The user can edit the Start Date to any date before today's date
								 * with valid date range: 01/01/1900 to 01/01/9999
								 */
								maxDate={new Date()}
								disabled={isView}
								value={value}
								onBlur={onBlur}
								error={typeof errors?.eventStartDate !== "undefined"}
								errorMessage={errors?.eventStartDate?.message}
								onChange={(date: Date) => setValue("eventStartDate", date, { shouldDirty: true })}
							/>
						</FormInput>
					)}
				/>
				<Controller
					name="eventEndDate"
					render={({ onBlur, value }) => (
						<FormInput labelText="End Date" labelId="eventEndDateLabel">
							<DatePicker
								inputRef={eventEndDateRef}
								id="eventEndDate"
								name="eventEndDate"
								/*
								 * 1.16.3 The system disables the Date Departure Authorized
								 * and Date Departure Ordered fields
								 * when Evacuation Status to “blank”
								 */
								disabled={isView || watchActiveIndicator}
								minDate={watchEventStartDate ? watchEventStartDate : undefined}
								maxDate={new Date(9999, 0, 1)}
								value={value}
								onBlur={onBlur}
								error={typeof errors?.eventEndDate !== "undefined"}
								errorMessage={errors?.eventEndDate?.message}
								onChange={(date: Date) => setValue("eventEndDate", date, { shouldDirty: true })}
							/>
						</FormInput>
					)}
				/>
				<FormInput labelText="Active" labelId="activeIndicatorLabel">
					<Switch
						ref={register()}
						name="activeIndicator"
						id="activeIndicator"
						value="Active"
						disabled={!isEdit}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.target.checked) {
								setValue("eventEndDate", undefined)
							} else {
								e.preventDefault()
								onDeactivateOpen()
							}
						}}
					/>
				</FormInput>
			</Grid>
			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Management Type" labelId="managementTypeCodeLabel" required={true}>
					<Select
						ref={managementTypeCodeRef}
						id="managementTypeCode"
						name="managementTypeCode"
						options={mgmtTypes}
						size="full"
						value={isView || isEdit ? savedEvent?.managementTypeCode : "mg"}
						disabled={isView}
						validationState={errors?.managementTypeCode ? ValidationState.ERROR : undefined}
						errorMessage={errors?.managementTypeCode?.message}
						onChange={changes => setValue("managementTypeCode", changes.selectedItem?.value, { shouldDirty: true })}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput labelText="Event Type" labelId="eventTypeIdLabel" required={true}>
					<Select
						ref={eventTypeIdRef}
						id="eventTypeId"
						name="eventTypeId"
						options={eventTypes}
						size="full"
						disabled={isView}
						value={isView || isEdit ? savedEvent?.eventTypeId : "General"}
						validationState={errors?.eventTypeId ? ValidationState.ERROR : undefined}
						errorMessage={errors?.eventTypeId?.message}
						onChange={changes => setValue("eventTypeId", changes.selectedItem?.value, { shouldDirty: true })}
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
						render={({ onChange, onBlur, value }) => (
							<Textarea
								ref={eventSummaryRef}
								id="eventSummary"
								name="eventSummary"
								labelId="eventSummaryLabel"
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
