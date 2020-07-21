import React, { useEffect, useRef } from "react"
import moment from "moment"
import { useFormContext, Controller, useWatch } from "react-hook-form"
import { Box, Grid, useDisclosure } from "@chakra-ui/core"
import { Switch, DatePicker, format as DateFormat, Select, FormInput, Text, ValidationState, ChangeEvent } from "@c1ds/components"

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

	// Due to non-standard change event, select inputs must be registered manually
	const eventStartDateRef = useRef<HTMLElement>(null)
	const eventEndDateRef = useRef<HTMLElement>(null)
	const managementTypeCodeRef = useRef<HTMLButtonElement>(null)
	const eventTypeIdRef = useRef<HTMLButtonElement>(null)
	const eventSummaryRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		register({ name: "managementTypeCode" }, { required: "Please select a management type" })
		register({ name: "eventTypeId" }, { required: "Please select an event type" })
	}, [register])

	// Handle focus-on-error for controlled components
	useEffect(() => {
		if (errors.eventStartDate && eventStartDateRef.current) {
			eventStartDateRef.current.focus()
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

	const watchActiveIndicator = useWatch({ name: "activeIndicator" })
	const watchEventStartDate = useWatch({ name: "eventStartDate" })

	const { isView, isEdit } = useCTFFormContext()

	return (
		<FormSection title="Event Details" showDivider={true}>
			<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
				<FormInput inputId="eventTitle" labelText="Event Title" labelId="eventTitleLabel" isRequired={true}>
					<Text
						ref={register({
							required: "Please enter an event title",
							maxLength: { value: 25, message: "Event title cannot exceed 25 characters" },
						})}
						name="eventTitle"
						id="eventTitle"
						labelId="eventTitleLabel"
						size="full"
						isDisabled={isView}
						maxLength={25}
						validationState={errors?.eventTitle ? ValidationState.ERROR : ""}
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
				<FormInput inputId="eventStartDate" labelText="Start Date" labelId="eventStartDateLabel" isRequired={true}>
					<Controller
						name="eventStartDate"
						rules={{ required: "Please enter a start date" }}
						render={({ onBlur, value }) => (
							<DatePicker
								ref={eventStartDateRef}
								id="eventStartDate"
								name="eventStartDate"
								labelId="eventStartDateLabel"
								/* 1.6.1 The user can edit the Start Date to any date before today's date
								 * with valid date range: 01/01/1900 to 01/01/9999
								 */
								min={moment("12/31/1899", DateFormat).toDate()}
								max={new Date()}
								isDisabled={isView}
								date={value}
								onBlur={onBlur}
								isInvalid={errors?.eventStartDate ? ValidationState.ERROR : ""}
								errorMessage={errors?.eventStartDate?.message}
								onChange={(date: Date) => setValue("eventStartDate", date, { shouldDirty: true })}
							/>
						)}
					/>
				</FormInput>
				<FormInput inputId="eventEndDate" labelText="End Date" labelId="eventEndDateLabel">
					{/* The system displays appropriate error message "End Date must be equal or later than Start Date" when user editing End Date of a reactivate event. */}
					<Controller
						name="eventEndDate"
						render={({ onBlur, value }) => (
							<DatePicker
								ref={eventEndDateRef}
								id="eventEndDate"
								name="eventEndDate"
								/*
								 * 1.16.3 The system disables the Date Departure Authorized
								 * and Date Departure Ordered fields
								 * when Evacuation Status to “blank”
								 */
								isDisabled={isView || watchActiveIndicator}
								labelId="eventEndDateLabel"
								min={watchEventStartDate ? watchEventStartDate : moment("12/31/1899", DateFormat).toDate()}
								max={moment("01/01/9999", DateFormat).toDate()}
								date={value}
								onBlur={onBlur}
								isInvalid={errors?.eventEndDate ? ValidationState.ERROR : ""}
								errorMessage={errors?.eventEndDate?.message}
								onChange={(date: Date) => setValue("eventEndDate", date, { shouldDirty: true })}
							/>
						)}
					/>
				</FormInput>
				<FormInput inputId="activeIndicator" labelText="Active" labelId="activeIndicatorLabel">
					<Switch
						ref={register()}
						name="activeIndicator"
						id="activeIndicator"
						value="Active"
						isDisabled={!isEdit}
						ariaLabelledBy="activeIndicatorLabel"
						validationState={errors?.activeIndicator ? ValidationState.ERROR : ""}
						errorMessage={errors?.activeIndicator?.message}
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
				<FormInput
					inputId="managementTypeCode"
					labelText="Management Type"
					labelId="managementTypeCodeLabel"
					isRequired={true}>
					{/* Legacy mapping: Data list: MG, WG, TF */}
					<Select
						ref={managementTypeCodeRef}
						id="managementTypeCode"
						name="managementTypeCode"
						options={mgmtTypes}
						labelId="managementTypeCodeLabel"
						size="full"
						value={isView || isEdit ? savedEvent?.managementTypeCode : "mg"}
						isDisabled={isView}
						validationState={errors?.managementTypeCode ? ValidationState.ERROR : ""}
						errorMessage={errors?.managementTypeCode?.message}
						onChange={(changes: ChangeEvent) =>
							setValue("managementTypeCode", changes.selectedItem.value, { shouldDirty: true })
						}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
				<FormInput inputId="eventTypeId" labelText="Event Type" labelId="eventTypeIdLabel" isRequired={true}>
					<Select
						ref={eventTypeIdRef}
						id="eventTypeId"
						name="eventTypeId"
						options={eventTypes}
						labelId="eventTypeIdLabel"
						size="full"
						isDisabled={isView}
						value={isView || isEdit ? savedEvent?.eventTypeId : "General"}
						validationState={errors?.eventTypeId ? ValidationState.ERROR : ""}
						errorMessage={errors?.eventTypeId?.message}
						onChange={(changes: ChangeEvent) =>
							setValue("eventTypeId", changes.selectedItem.value, { shouldDirty: true })
						}
					/>
				</FormInput>
			</Box>
			<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
				<FormInput inputId="eventSummary" labelText="Event Summary" labelId="eventSummaryLabel">
					<Controller
						name="eventSummary"
						rules={{
							pattern: {
								value: /^[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]*$/,
								message: "Please enter only plain text in the event summary field",
							},
							maxLength: { value: 4000, message: "Event summary cannot exceed 4000 characters" },
						}}
						render={({ onChange, onBlur, value }) => (
							<Textarea
								ref={eventSummaryRef}
								id="eventSummary"
								name="eventSummary"
								labelId="eventSummaryLabel"
								maxLength={4000}
								disabled={isView}
								validationState={errors?.eventSummary ? ValidationState.ERROR : ""}
								errorMessage={errors?.eventSummary?.message}
								onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
									/*
									 * 1.15.1 The user can only enter "Plain Text" in the Event Summary field.
									 * 1.15.2 The system disallows the user to enter any characters that might
									 * cause potential security vulnerability like SQL injection, cross-site scripting
									 */
									e.target.value = replaceMSWordChars(e.target.value).replace(
										/[^A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/,
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
