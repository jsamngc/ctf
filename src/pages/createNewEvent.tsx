import React, { useEffect, useRef, useCallback } from "react"
import { navigate } from "gatsby"
import { Box, Grid, Divider, Flex } from "@chakra-ui/core"
import {
	Switch,
	DatePicker,
	format as DateFormat,
	Select,
	FormInput,
	Text,
	H1,
	H2,
	P,
	Button,
	ValidationState,
	ChangeEvent,
} from "@c1ds/components"
import moment from "moment"
import mgmtTypes from "../../content/managementTypes.json"
import eventTypes from "../../content/eventTypes.json"
import evacStatuses from "../../content/evacuationStatuses.json"
import { Textarea } from "../components/Textarea"
import { LinkButton } from "../components/LinkButton"
import { useForm, Controller } from "react-hook-form"
import { getSavedForm, useSavedForm } from "../components/Utility/formHelpers"

type FormData = {
	eventId: string
	eventTitle: string
	eventStartDate: Date
	eventEndDate: Date
	activeIndicator: boolean
	managementTypeCode: string
	eventTypeId: string
	eventSummary: string
	evacStatus: string
	evacDepAuthDate: Date
	evacDepOrdDate: Date
	evacSummary: string
}

const CreateEventPage: React.FC = () => {
	const [, updateSavedForm] = useSavedForm("events", "ctfForm")

	// getSavedForm(formName, { bornOutsideUS: '', under18: '', isParentCitizen: '' })
	const { register, handleSubmit, setValue, control, errors, trigger, watch, getValues } = useForm<FormData>({
		mode: "onBlur",
		defaultValues: {
			// Mimic key generation for Crisis
			eventId: `OCS${moment(new Date()).format("YYYYDDD")}${Math.floor(Math.random() * Math.floor(1000000))}`,
			eventTitle: "",
			eventStartDate: new Date(),
			// eventEndDate: "",
			activeIndicator: true,
			managementTypeCode: "monitoringGroup",
			// 1.13 The system defaults the Event Type to General.
			eventTypeId: "general",
			eventSummary: "",
			// 1.16.1 The system defaults the Evacuation Status to “blank”
			evacStatus: "",
			// evacDepAuthDate: Date,
			// evacDepOrdDate: Date,
			evacSummary: "",
		},
	})
	const eventStartDateRef = useRef<HTMLElement>(null)
	const eventEndDateRef = useRef<HTMLElement>(null)
	const managementTypeCodeRef = useRef<HTMLButtonElement>(null)
	const eventTypeIdRef = useRef<HTMLButtonElement>(null)
	const evacStatusRef = useRef<HTMLButtonElement>(null)
	const evacDepAuthDateRef = useRef<HTMLElement>(null)
	const orderededDateRef = useRef<HTMLElement>(null)

	// Due to non-standard change event, select inputs must be regsitered manually
	useEffect(() => {
		register({ name: "managementTypeCode" }, { required: "Please select a management type" })
		register({ name: "eventTypeId" }, { required: "Please select an event type" })
		register({ name: "evacStatus" })
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
		} else if (errors.evacStatus && evacStatusRef.current) {
			evacStatusRef.current.focus()
		} else if (errors.evacDepAuthDate && evacDepAuthDateRef.current) {
			evacDepAuthDateRef.current.focus()
		} else if (errors.evacDepOrdDate && orderededDateRef.current) {
			orderededDateRef.current.focus()
		}
	})

	const onSubmit = useCallback(
		(data: FormData) => {
			console.log("submitting!")
			console.log(data)
			const currForm: FormData[] = getSavedForm("events", "ctfForm", [])
			currForm.push(data)
			updateSavedForm(currForm)
			navigate("/")
		},
		[updateSavedForm]
	)
	console.log(errors)

	const watchactiveIndicator = watch("activeIndicator")
	const watchEventStartDate = watch("eventStartDate")
	const watchEvacStatus = watch("evacStatus")

	return (
		<form name="eventForm" onSubmit={handleSubmit(onSubmit)} noValidate={true}>
			<input name="eventId" type="hidden" ref={register} />
			<Grid
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={["repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)", "repeat(12, 1fr)"]}
				color="white"
				maxW={{ xl: "1280px" }}
				m={{ xl: "auto" }}
				paddingX={{ base: "16", md: "24" }}
				paddingTop={{ base: "16", md: "24" }}
				paddingBottom={{ base: "64", md: "96" }}>
				<Box gridColumn="1 / -1">
					<Box marginBottom="12">
						<H1>Create New Event</H1>
					</Box>
					<Box>
						<P>Please enter as much information as you have related to this crisis.</P>
					</Box>
				</Box>
				<Box marginBottom="4" gridColumn="1 / -1">
					<H2>Event Details</H2>
				</Box>
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
									isDisabled={watchactiveIndicator}
									labelId="eventEndDateLabel"
									min={watchEventStartDate ? watchEventStartDate : moment("01/01/1900", DateFormat).toDate()}
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
							id="activeIndicator"
							name="activeIndicator"
							value="Active"
							ariaLabelledBy="activeIndicatorLabel"
							validationState={errors?.activeIndicator ? ValidationState.ERROR : ""}
							errorMessage={errors?.activeIndicator?.message}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.target.checked && setValue("eventEndDate", undefined)
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
							value="monitoringGroup"
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
							value="general"
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
								maxLength: { value: 4000, message: "Event summary cannot exceed 25 characters" },
							})}
							name="eventSummary"
							id="eventSummary"
							labelId="eventSummaryLabel"
							maxLength={4000}
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
				<Box gridColumn={{ base: "1 / -1" }}>
					<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
				</Box>
				<Box marginBottom="4" gridColumn="1 / -1">
					<H2>Evacuation Details</H2>
				</Box>
				<Box gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 3" }}>
					<FormInput inputId="evacStatus" labelText="Evacuation Status" labelId="evacStatusLabel">
						{/* Legacy mapping: Data list: NONE, ADEP, ODEP */}
						<Select
							ref={evacStatusRef}
							id="evacStatus"
							name="evacStatus"
							options={evacStatuses}
							labelId="evacStatusLabel"
							size="full"
							validationState={errors?.evacStatus ? ValidationState.ERROR : ""}
							errorMessage={errors?.evacStatus?.message}
							onChange={(changes: ChangeEvent) => {
								const newVal = changes.selectedItem.value
								setValue("evacStatus", newVal)
								/*
								 * 1.16.6 The system defaults the Authorized or Ordered Date to Today’s date
								 * when Evacuation Status is selected.
								 * TODO: Fix datePicker to support value update on re-render
								 */
								if (newVal === "authorized" && !getValues("evacDepAuthDate")) {
									setValue("evacDepAuthDate", new Date())
									setValue("evacDepOrdDate", "")
								} else if (newVal === "ordered" && !getValues("evacDepOrdDate")) {
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
									isDisabled={!watchEvacStatus || watchEvacStatus !== "authorized"}
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
					<FormInput inputId="evacDepOrdDate" labelText="Departure Ordered" labelId="orderededDateLabel">
						{/*  Legacy mapping: cannot be less than authorized date */}
						<Controller
							control={control}
							name="evacDepOrdDate"
							render={({ onBlur, value }) => (
								<DatePicker
									ref={orderededDateRef}
									id="evacDepOrdDate"
									/*
									 * 1.16.3 The system disables the Date Departure Authorized
									 * and Date Departure Ordered fields
									 * when Evacuation Status to “blank”
									 *
									 * 1.16.5 The system enables Date Departure Ordered
									 * when Evacuation Status to “Ordered”
									 */
									isDisabled={!watchEvacStatus || watchEvacStatus !== "ordered"}
									labelId="orderededDateLabel"
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
								maxLength: { value: 4000, message: "Evacuation summary cannot exceed 25 characters" },
							})}
							name="evacSummary"
							id="evacSummary"
							labelId="evacSummaryLabel"
							maxLength={4000}
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
				{/* <Box gridColumn={{ base: "1 / -1" }}>
					<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
				</Box>
				<Box marginBottom="4" gridColumn="1 / -1">
					<H2>Talking Points</H2>
				</Box>
				<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
					<FormInput inputId="tpDescription" labelText="Description" labelId="tpDescriptionLabel" isRequired={true}>
						<Text id="tpDescription" name="tpDescription" labelId="tpDescriptionleLabel" size="full" />
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
					<FormInput inputId="talkingPoints" labelText="Talking Points" labelId="talkingPointsLabel" isRequired={true}>
						<Textarea id="talkingPoints" name="talkingPoints" labelId="talkingPointsLabel" maxLength="4000" />
					</FormInput>
				</Box> */}
				<Flex gridColumn="1 / -1" justify={{ base: "flex-end", md: "flex-start" }} marginTop={{ md: "72" }}>
					<LinkButton type="button" onClick={() => navigate("/")}>
						Cancel
					</LinkButton>
					<Button type="submit">Create Event</Button>
				</Flex>
			</Grid>
		</form>
	)
}

const replaceMSWordChars = (s: string): string =>
	s &&
	s
		.replace(/[\u2018\u2019\u201A]/, `'`)
		.replace(/[\u201C\u201D\u201E]/, `"`)
		.replace(/[\u2013\u2014]/, `-`)

// alphaNumeric ^[A-Za-z0-9\\`\\~\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)_\\+\\•\\-\\=\\[\\]\\:\\\"\\;\\\'\\,\\.\\/\\?\\s]*$

// ReplaceWordChars (title, summaries)
// // smart single quotes and apostrophe
//             s = Regex.Replace(s, "[\u2018\u2019\u201A]", "'");
//             // smart double quotes
//             s = Regex.Replace(s, "[\u201C\u201D\u201E]", "\"");
//             // dashes
//             s = Regex.Replace(s, "[\u2013\u2014]", "-");

// ScriptTagValidation
// !testValue.ToLower().Contains("<script>") &&
//                     !testValue.ToLower().Contains("javascript") &&
//                     !testValue.ToLower().Contains("alert(") &&
//                     !testValue.ToLower().Contains("xss") &&
//                     !testValue.ToLower().Contains("<") &&
//                     !testValue.ToLower().Contains(">") &&
//                     !testValue.ToLower().Contains("{") &&
//                     !testValue.ToLower().Contains("}") &&
//                     !testValue.ToLower().Contains("|"))

export default CreateEventPage
