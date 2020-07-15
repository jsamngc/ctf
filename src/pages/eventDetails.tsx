import React, { useEffect, useRef, useCallback, useState } from "react"
import { navigate } from "gatsby"
import { Box, Grid, Flex, useDisclosure } from "@chakra-ui/core"
import {
	Switch,
	DatePicker,
	format as DateFormat,
	Select,
	FormInput,
	Text,
	P,
	Button,
	ButtonSize,
	ValidationState,
	ChangeEvent,
	H4,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalCloseButton,
	Banner,
	useBanner,
	Status,
} from "@c1ds/components"
import moment from "moment"
import mgmtTypes from "../../content/managementTypes.json"
import eventTypes from "../../content/eventTypes.json"
import evacStatuses from "../../content/evacuationStatuses.json"
import { Textarea } from "../components/Textarea"
import { LinkButton } from "../components/LinkButton"
import { DataLossModal } from "../components/DataLossModal"
import { SaveModal } from "../components/SaveModal"
import { useForm, Controller } from "react-hook-form"
import { getSavedForm, useSavedForm } from "../components/Utility/formHelpers"
import { Form, FormSection } from "../components/Form"
import Layout from "../components/Layout"

enum FormModes {
	CREATE = "create",
	VIEW = "view",
	EDIT = "edit",
}

type FormData = {
	eventId: string
	eventTitle: string
	eventStartDate: Date
	eventEndDate: Date
	activeIndicator: boolean
	managementTypeCode: string
	eventTypeId: string
	eventSummary: string
	evacStatusCode: string
	evacDepAuthDate: Date
	evacDepOrdDate: Date
	evacSummary: string
	lastUpdatedDateTime: Date
}

type CreateEventProps = {
	eventId: string
	location: {
		state: {
			eventId: string
			isEdit: boolean
		}
	}
}

const CreateEventPage: React.FC<CreateEventProps> = (p: CreateEventProps) => {
	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()
	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()
	const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure()
	const showSaveBanner = useBanner(saveBanner, 2)
	const [, updateSavedForm] = useSavedForm("events", "ctfForm")

	const defaultValues = {
		// Mimic key generation for Crisis
		eventId: `OCS${moment(new Date()).format("YYYYDDD")}${Math.floor(Math.random() * Math.floor(1000000))}`,
		eventTitle: "",
		eventStartDate: new Date(),
		// eventEndDate: "",
		activeIndicator: true,
		managementTypeCode: "mg",
		// 1.13 The system defaults the Event Type to General.
		eventTypeId: "General",
		eventSummary: "",
		// 1.16.1 The system defaults the Evacuation Status to “blank”
		evacStatusCode: "",
		// evacDepAuthDate: Date,
		// evacDepOrdDate: Date,
		evacSummary: "",
		lastUpdatedDateTime: new Date(),
	}

	let savedEvent: FormData | undefined
	if (p.location?.state?.eventId) {
		const savedEvents = getSavedForm("events", "ctfForm")
		savedEvent = savedEvents.find((event: FormData) => event.eventId === p.location?.state?.eventId)
		if (savedEvent) {
			if (savedEvent.evacDepAuthDate) savedEvent.evacDepAuthDate = moment(savedEvent.evacDepAuthDate).toDate()
			if (savedEvent.evacDepOrdDate) savedEvent.evacDepOrdDate = moment(savedEvent.evacDepOrdDate).toDate()
			if (savedEvent.eventStartDate) savedEvent.eventStartDate = moment(savedEvent.eventStartDate).toDate()
			if (savedEvent.eventEndDate) savedEvent.eventEndDate = moment(savedEvent.eventEndDate).toDate()
			if (savedEvent.lastUpdatedDateTime) savedEvent.lastUpdatedDateTime = moment(savedEvent.lastUpdatedDateTime).toDate()
		}
	}

	const [formMode, setFormMode] = useState<FormModes>(() => {
		return typeof savedEvent === "undefined" ? FormModes.CREATE : !p.location.state.isEdit ? FormModes.VIEW : FormModes.EDIT
	})
	/**
	 * Is Event currently in edit mode
	 */
	const isEdit = formMode === FormModes.EDIT
	/**
	 * Is Event currently in view mode
	 */
	const isView = formMode === FormModes.VIEW

	const { register, handleSubmit, setValue, control, errors, watch, getValues } = useForm<FormData>({
		mode: "onBlur",
		defaultValues: savedEvent ?? defaultValues,
	})
	const eventStartDateRef = useRef<HTMLElement>(null)
	const eventEndDateRef = useRef<HTMLElement>(null)
	const managementTypeCodeRef = useRef<HTMLButtonElement>(null)
	const eventTypeIdRef = useRef<HTMLButtonElement>(null)
	const evacStatusCodeRef = useRef<HTMLButtonElement>(null)
	const evacDepAuthDateRef = useRef<HTMLElement>(null)
	const orderedDateRef = useRef<HTMLElement>(null)

	// Due to non-standard change event, select inputs must be registered manually
	useEffect(() => {
		register({ name: "managementTypeCode" }, { required: "Please select a management type" })
		register({ name: "eventTypeId" }, { required: "Please select an event type" })
		register({ name: "evacStatusCode" })
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
		} else if (errors.evacStatusCode && evacStatusCodeRef.current) {
			evacStatusCodeRef.current.focus()
		} else if (errors.evacDepAuthDate && evacDepAuthDateRef.current) {
			evacDepAuthDateRef.current.focus()
		} else if (errors.evacDepOrdDate && orderedDateRef.current) {
			orderedDateRef.current.focus()
		}
	})

	const onSubmit = useCallback(
		(data, skipNavigate = false) => {
			data.lastUpdatedDateTime = new Date()
			const currForm: FormData[] = getSavedForm("events", "ctfForm", [])
			if (isEdit) {
				const savedIdx = currForm.findIndex((evt: FormData) => evt.eventId === data.eventId)
				currForm.splice(savedIdx, 1, data)
			} else {
				currForm.push(data)
			}
			updateSavedForm(currForm)
			onSaveOpen()
			setTimeout(() => {
				!skipNavigate && navigate("/")
				showSaveBanner()
			}, 2000)
		},
		[updateSavedForm, isEdit, onSaveOpen, showSaveBanner]
	)

	const watchActiveIndicator = watch("activeIndicator")
	const watchEventStartDate = watch("eventStartDate")
	const watchEvacStatus = watch("evacStatusCode")

	return (
		<Layout
			pageTitle="Event Details"
			pageHeading={
				isView ? `View ${savedEvent?.eventTitle}` : isEdit ? `Edit ${savedEvent?.eventTitle}` : "Create New Event"
			}
			pageDescription="Please enter as much information as you have related to this crisis.">
			<Form
				name="eventForm"
				id="eventForm"
				onSubmit={handleSubmit(data => {
					onSubmit(data, false)
				})}
				noValidate={true}>
				<input name="eventId" type="hidden" ref={register} />
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
						<FormInput
							inputId="eventStartDate"
							labelText="Start Date"
							labelId="eventStartDateLabel"
							isRequired={true}>
							<Controller
								control={control}
								name="eventStartDate"
								rules={{ required: "Please enter a start date" }}
								render={({ onBlur, value }) => (
									<DatePicker
										ref={eventStartDateRef}
										id="eventStartDate"
										labelId="eventStartDateLabel"
										/* 1.6.1 The user can edit the Start Date to any date before today's date
										 * with valid date range: 01/01/1900 to 01/01/9999
										 */
										min={moment("01/01/1900", DateFormat).toDate()}
										max={new Date()}
										isDisabled={isView}
										date={value}
										onBlur={onBlur}
										isInvalid={errors?.eventStartDate ? ValidationState.ERROR : ""}
										errorMessage={errors?.eventStartDate?.message}
										onChange={(date: Date) => setValue("eventStartDate", date)}
									/>
								)}
							/>
						</FormInput>
						<FormInput inputId="eventEndDate" labelText="End Date" labelId="eventEndDateLabel">
							{/* The system displays appropriate error message "End Date must be equal or later than Start Date" when user editing End Date of a reactivate event. */}
							<Controller
								control={control}
								name="eventEndDate"
								render={({ onBlur, value }) => (
									<DatePicker
										ref={eventEndDateRef}
										id="eventEndDate"
										/*
										 * 1.16.3 The system disables the Date Departure Authorized
										 * and Date Departure Ordered fields
										 * when Evacuation Status to “blank”
										 */
										isDisabled={isView || watchActiveIndicator}
										labelId="eventEndDateLabel"
										min={
											watchEventStartDate ? watchEventStartDate : moment("01/01/1900", DateFormat).toDate()
										}
										max={moment("01/01/9999", DateFormat).toDate()}
										date={value}
										onBlur={onBlur}
										isInvalid={errors?.eventEndDate ? ValidationState.ERROR : ""}
										errorMessage={errors?.eventEndDate?.message}
										onChange={(date: Date) => setValue("eventEndDate", date)}
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
								isDisabled={isView}
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
								onChange={(changes: ChangeEvent) => setValue("managementTypeCode", changes.selectedItem.value)}
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
								onChange={(changes: ChangeEvent) => setValue("eventTypeId", changes.selectedItem.value)}
							/>
						</FormInput>
					</Box>
					<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
						<FormInput inputId="eventSummary" labelText="Event Summary" labelId="eventSummaryLabel">
							<Textarea
								ref={register({
									pattern: {
										value: /[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/,
										message: "Please enter only plain text in the event summary field",
									},
									maxLength: { value: 4000, message: "Event summary cannot exceed 4000 characters" },
								})}
								name="eventSummary"
								id="eventSummary"
								labelId="eventSummaryLabel"
								maxLength={4000}
								isDisabled={isView}
								validationState={errors?.eventSummary ? ValidationState.ERROR : ""}
								errorMessage={errors?.eventSummary?.message}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									/*
									 * 1.15.1 The user can only enter "Plain Text" in the Event Summary field.
									 * 1.15.2 The system disallows the user to enter any characters that might
									 * cause potential security vulnerability like SQL injection, cross-site scripting
									 */
									e.target.value = replaceMSWordChars(e.target.value).replace(
										/[^A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/,
										""
									)
								}}
							/>
						</FormInput>
					</Box>
				</FormSection>
				<FormSection title="Evacuation Details">
					<Box gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 3" }}>
						<FormInput inputId="evacStatusCode" labelText="Evacuation Status" labelId="evacStatusCodeLabel">
							{/* Legacy mapping: Data list: NONE, ADEP, ODEP */}
							<Select
								ref={evacStatusCodeRef}
								id="evacStatusCode"
								name="evacStatusCode"
								options={evacStatuses}
								labelId="evacStatusCodeLabel"
								size="full"
								isDisabled={isView}
								value={isView || isEdit ? savedEvent?.evacStatusCode : ""}
								validationState={errors?.evacStatusCode ? ValidationState.ERROR : ""}
								errorMessage={errors?.evacStatusCode?.message}
								onChange={(changes: ChangeEvent) => {
									const newVal = changes.selectedItem.value
									setValue("evacStatusCode", newVal)
									/*
									 * 1.16.6 The system defaults the Authorized or Ordered Date to Today’s date
									 * when Evacuation Status is selected.
									 * TODO: Fix datePicker to support value update on re-render
									 */
									if (newVal === "ADEP" && !getValues("evacDepAuthDate")) {
										setValue("evacDepAuthDate", new Date())
										setValue("evacDepOrdDate", "")
									} else if (newVal === "ODEP" && !getValues("evacDepOrdDate")) {
										setValue("evacDepOrdDate", new Date())
										setValue("evacDepAuthDate", "")
									}
								}}
							/>
						</FormInput>
					</Box>
					<Grid
						gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 9" }}
						gridGap={{ base: "16px", md: "24px" }}
						gridTemplateColumns={{ base: "repeat(1,max-content)", md: "repeat(2,max-content)" }}>
						<FormInput inputId="evacDepAuthDate" labelText="Departure Authorized" labelId="evacDepAuthDateLabel">
							<Controller
								control={control}
								name="evacDepAuthDate"
								render={({ onBlur, value }) => (
									<DatePicker
										ref={evacDepAuthDateRef}
										id="evacDepAuthDate"
										/*
										 * 1.16.3 The system disables the Date Departure Authorized
										 * and Date Departure Ordered fields
										 * when Evacuation Status to “blank”
										 *
										 * 1.16.4 The system enables Date Departure Authorized
										 * when Evacuation Status to “Authorized”
										 */
										isDisabled={isView || !watchEvacStatus || watchEvacStatus !== "ADEP"}
										labelId="evacDepAuthDateLabel"
										min={moment("01/01/1900", DateFormat).toDate()}
										max={moment("01/01/9999", DateFormat).toDate()}
										date={value}
										onBlur={onBlur}
										isInvalid={errors?.evacDepAuthDate ? ValidationState.ERROR : ""}
										errorMessage={errors?.evacDepAuthDate?.message}
										onChange={(date: Date) => setValue("evacDepAuthDate", date)}
									/>
								)}
							/>
						</FormInput>
						<FormInput inputId="evacDepOrdDate" labelText="Departure Ordered" labelId="orderedDateLabel">
							{/*  Legacy mapping: cannot be less than authorized date */}
							<Controller
								control={control}
								name="evacDepOrdDate"
								render={({ onBlur, value }) => (
									<DatePicker
										ref={orderedDateRef}
										id="evacDepOrdDate"
										/*
										 * 1.16.3 The system disables the Date Departure Authorized
										 * and Date Departure Ordered fields
										 * when Evacuation Status to “blank”
										 *
										 * 1.16.5 The system enables Date Departure Ordered
										 * when Evacuation Status to “Ordered”
										 */
										isDisabled={isView || !watchEvacStatus || watchEvacStatus !== "ODEP"}
										labelId="orderedDateLabel"
										min={moment("01/01/1900", DateFormat).toDate()}
										max={moment("01/01/9999", DateFormat).toDate()}
										date={value}
										onBlur={onBlur}
										isInvalid={errors?.evacDepOrdDate ? ValidationState.ERROR : ""}
										errorMessage={errors?.evacDepOrdDate?.message}
										onChange={(date: Date) => setValue("evacDepOrdDate", date)}
									/>
								)}
							/>
						</FormInput>
					</Grid>
					<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
						<FormInput inputId="evacSummary" labelText="Evacuation Summary" labelId="evacSummaryLabel">
							<Textarea
								ref={register({
									pattern: {
										value: /[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/,
										message: "Please enter only plain text in the evacuation summary field",
									},
									maxLength: { value: 4000, message: "Evacuation summary cannot exceed 4000 characters" },
								})}
								name="evacSummary"
								id="evacSummary"
								labelId="evacSummaryLabel"
								maxLength={4000}
								isDisabled={isView}
								validationState={errors?.evacSummary ? ValidationState.ERROR : ""}
								errorMessage={errors?.evacSummary?.message}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									/*
									 * 1.15.1 The user can only enter "Plain Text" in the Event Summary field.
									 * 1.15.2 The system disallows the user to enter any characters that might
									 * cause potential security vulnerability like SQL injection, cross-site scripting
									 */
									e.target.value = replaceMSWordChars(e.target.value).replace(
										/[^A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/,
										""
									)
								}}
							/>
						</FormInput>
					</Box>
					<Flex
						as="nav"
						aria-label="page"
						id="pageNav"
						gridColumn="1 / -1"
						justify={{ base: "flex-end", md: "flex-start" }}
						marginTop={{ md: "72" }}>
						<LinkButton type="button" onClick={isView ? () => navigate("/") : onDataLossOpen}>
							Cancel
						</LinkButton>
						<Button
							type={isView ? "button" : "submit"}
							size={isEdit ? ButtonSize.SM : ButtonSize.MD}
							onClick={
								isView
									? (e: React.MouseEvent) => {
											e.preventDefault()
											setFormMode(FormModes.EDIT)
											window.scrollTo(0, 0)
									  }
									: undefined
							}>
							{isView ? "Edit" : isEdit ? "Save" : "Create Event"}
						</Button>
					</Flex>
				</FormSection>
				<DataLossModal isOpen={isDataLossOpen} onClose={onDataLossClose} onLeave={() => navigate("/")} />
				<SaveModal isOpen={isSaveOpen} onClose={onSaveClose} />
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

						handleSubmit(data => {
							onSubmit(data, true)
						})()

						// 1.11.4 The system displays the View Event Detail screen (read-only) with the newly deactivate event details.
						setFormMode(FormModes.VIEW)
					}}
				/>
			</Form>
		</Layout>
	)
}

const saveBanner = <Banner status={Status.success} title="Save successful!" onClose={() => console.log("Banner closed")} />

interface DeactivateModalProps {
	isOpen: boolean
	onCancel: Modal["onClose"]
	onConfirm: Modal["onClose"]
}

const DeactivateModal: React.FC<DeactivateModalProps> = (p: DeactivateModalProps) => (
	<Modal isOpen={p.isOpen} onClose={p.onCancel} isCentered={true} size="sm">
		<ModalHeader>
			<H4>Deactivate Event</H4>
		</ModalHeader>
		<ModalCloseButton />
		<ModalBody>
			<P>Are you sure you want to deactivate this event?</P>
		</ModalBody>

		<ModalFooter>
			<LinkButton onClick={p.onCancel}>Cancel</LinkButton>
			<Button size={ButtonSize.SM} onClick={p.onConfirm}>
				YES
			</Button>
		</ModalFooter>
	</Modal>
)

const replaceMSWordChars = (s: string): string =>
	s &&
	s
		.replace(/[\u2018\u2019\u201A]/, `'`)
		.replace(/[\u201C\u201D\u201E]/, `"`)
		.replace(/[\u2013\u2014]/, `-`)

export default CreateEventPage
