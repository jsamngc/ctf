import React, { useEffect, useRef } from "react"
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

type FormData = {
	eventTitle: string
	startDate: Date
	endDate: Date
	active: boolean
	mgmtType: string
	eventType: string
	crisisSummary: string
	evacStatus: string
	authorizedDate: Date
	orderedDate: Date
	evacSummary: string
}

const CreateEventPage: React.FC = () => {
	const { register, handleSubmit, setValue, control, errors, trigger, watch, getValues } = useForm<FormData>({
		mode: "onBlur",
		defaultValues: {
			eventTitle: "",
			startDate: new Date(),
			// endDate: "",
			active: true,
			mgmtType: "monitoringGroup",
			// 1.13 The system defaults the Event Type to General.
			eventType: "general",
			crisisSummary: "",
			// 1.16.1 The system defaults the Evacuation Status to “blank”
			evacStatus: "",
			// authorizedDate: Date,
			// orderedDate: Date,
			evacSummary: "",
		},
	})
	const startDateRef = useRef<HTMLElement>(null)
	const endDateRef = useRef<HTMLElement>(null)
	const mgmtTypeRef = useRef<HTMLButtonElement>(null)
	const eventTypeRef = useRef<HTMLButtonElement>(null)
	const evacStatusRef = useRef<HTMLButtonElement>(null)
	const authorizedDateRef = useRef<HTMLElement>(null)
	const orderededDateRef = useRef<HTMLElement>(null)

	// Due to non-standard change event, select inputs must be regsitered manually
	useEffect(() => {
		register({ name: "mgmtType" }, { required: "Please select a management type" })
		register({ name: "eventType" }, { required: "Please select an event type" })
		register({ name: "evacStatus" })
	}, [register])

	// Handle focus-on-error for controlled components
	useEffect(() => {
		if (errors.startDate && startDateRef.current) {
			startDateRef.current.focus()
		} else if (errors.endDate && endDateRef.current) {
			endDateRef.current.focus()
		} else if (errors.mgmtType && mgmtTypeRef.current) {
			mgmtTypeRef.current.focus()
		} else if (errors.eventType && eventTypeRef.current) {
			eventTypeRef.current.focus()
		} else if (errors.evacStatus && evacStatusRef.current) {
			evacStatusRef.current.focus()
		} else if (errors.authorizedDate && authorizedDateRef.current) {
			authorizedDateRef.current.focus()
		} else if (errors.orderedDate && orderededDateRef.current) {
			orderededDateRef.current.focus()
		}
	})

	const onSubmit = (data: FormData) => {
		console.log("submitting!")
		console.log(data)
	}
	console.log(errors)

	const watchActive = watch("active")
	const watchStartDate = watch("startDate")
	const watchEvacStatus = watch("evacStatus")

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
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
						<P>Please enter as much information as you have realted to this crisis.</P>
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
					<FormInput inputId="startDate" labelText="Start Date" labelId="startDateLabel" isRequired={true}>
						<Controller
							control={control}
							name="startDate"
							rules={{ required: "Please enter a start date" }}
							render={({ onBlur, value }) => (
								<DatePicker
									ref={startDateRef}
									id="startDate"
									labelId="startDateLabel"
									/* 1.6.1 The user can edit the Start Date to any date before today's date
									 * with valid date range: 01/01/1900 to 01/01/9999
									 */
									min={new Date()}
									max={moment("01/01/9999", DateFormat).toDate()}
									date={value}
									onBlur={onBlur}
									isInvalid={errors?.startDate ? ValidationState.ERROR : ""}
									errorMessage={errors?.startDate?.message}
									onChange={(date: Date) => setValue("startDate", date)}
								/>
							)}
						/>
					</FormInput>
					<FormInput inputId="endDate" labelText="End Date" labelId="endDateLabel">
						{/* The system displays appropriate error message "End Date must be equal or later than Start Date" when user editing End Date of a reactivate event. */}
						<Controller
							control={control}
							name="endDate"
							render={({ onBlur, value }) => (
								<DatePicker
									ref={endDateRef}
									id="endDate"
									/*
									 * 1.16.3 The system disables the Date Departure Authorized
									 * and Date Departure Ordered fields
									 * when Evacuation Status to “blank”
									 */
									isDisabled={watchActive}
									labelId="endDateLabel"
									min={watchStartDate ? watchStartDate : moment("01/01/1900", DateFormat).toDate()}
									max={moment("01/01/9999", DateFormat).toDate()}
									date={value}
									onBlur={onBlur}
									isInvalid={errors?.endDate ? ValidationState.ERROR : ""}
									errorMessage={errors?.endDate?.message}
									onChange={(date: Date) => setValue("endDate", date)}
								/>
							)}
						/>
					</FormInput>
					<FormInput inputId="active" labelText="Active" labelId="activeLabel">
						<Switch
							ref={register()}
							id="active"
							name="active"
							ariaLabelledBy="activeLabel"
							validationState={errors?.active ? ValidationState.ERROR : ""}
							errorMessage={errors?.active?.message}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								e.target.checked && setValue("endDate", undefined)
							}}
						/>
					</FormInput>
				</Grid>
				<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
					<FormInput inputId="mgmtType" labelText="Management Type" labelId="mgmtTypeLabel" isRequired={true}>
						{/* Legacy mapping: Data list: MG, WG, TF */}
						<Select
							ref={mgmtTypeRef}
							id="mgmtType"
							name="mgmtType"
							options={mgmtTypes}
							labelId="mgmtTypeLabel"
							size="full"
							value="monitoringGroup"
							validationState={errors?.mgmtType ? ValidationState.ERROR : ""}
							errorMessage={errors?.mgmtType?.message}
							onChange={(changes: ChangeEvent) => setValue("mgmtType", changes.selectedItem.value)}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
					<FormInput inputId="eventType" labelText="Event Type" labelId="eventTypeLabel" isRequired={true}>
						<Select
							ref={eventTypeRef}
							id="eventType"
							name="eventType"
							options={eventTypes}
							labelId="eventTypeLabel"
							size="full"
							// value="general"
							validationState={errors?.eventType ? ValidationState.ERROR : ""}
							errorMessage={errors?.eventType?.message}
							onChange={(changes: ChangeEvent) => setValue("eventType", changes.selectedItem.value)}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
					<FormInput inputId="crisisSummary" labelText="Crisis Summary" labelId="crisisSummaryLabel">
						<Textarea
							ref={register({
								pattern: {
									value: /[A-Za-z0-9`~!@#$%^&*()_+•\-=[\]:";',./?\s]/,
									message: "Please enter only plain text in the crisis summary field",
								},
								maxLength: { value: 4000, message: "Crisis summary cannot exceed 25 characters" },
							})}
							name="crisisSummary"
							id="crisisSummary"
							labelId="crisisSummaryLabel"
							maxLength={4000}
							validationState={errors?.crisisSummary ? ValidationState.ERROR : ""}
							errorMessage={errors?.crisisSummary?.message}
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
								if (newVal === "authorized" && !getValues("authorizedDate")) {
									setValue("authorizedDate", new Date())
									setValue("orderedDate", "")
								} else if (newVal === "ordered" && !getValues("orderedDate")) {
									setValue("orderedDate", new Date())
									setValue("authorizedDate", "")
								}
							}}
						/>
					</FormInput>
				</Box>
				<Grid
					gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 9" }}
					gridGap={{ base: "16px", md: "24px" }}
					gridTemplateColumns={{ base: "repeat(1,max-content)", md: "repeat(2,max-content)" }}>
					<FormInput inputId="authorizedDate" labelText="Departure Authorized" labelId="authorizedDateLabel">
						<Controller
							control={control}
							name="authorizedDate"
							render={({ onBlur, value }) => (
								<DatePicker
									ref={authorizedDateRef}
									id="authorizedDate"
									/*
									 * 1.16.3 The system disables the Date Departure Authorized
									 * and Date Departure Ordered fields
									 * when Evacuation Status to “blank”
									 *
									 * 1.16.4 The system enables Date Departure Authorized
									 * when Evacuation Status to “Authorized”
									 */
									isDisabled={!watchEvacStatus || watchEvacStatus !== "authorized"}
									labelId="authorizedDateLabel"
									min={moment("01/01/1900", DateFormat).toDate()}
									max={moment("01/01/9999", DateFormat).toDate()}
									date={value}
									onBlur={onBlur}
									isInvalid={errors?.authorizedDate ? ValidationState.ERROR : ""}
									errorMessage={errors?.authorizedDate?.message}
									onChange={(date: Date) => setValue("authorizedDate", date)}
								/>
							)}
						/>
					</FormInput>
					<FormInput inputId="orderedDate" labelText="Departure Ordered" labelId="orderededDateLabel">
						{/*  Legacy mapping: cannot be less than authorized date */}
						<Controller
							control={control}
							name="orderedDate"
							render={({ onBlur, value }) => (
								<DatePicker
									ref={orderededDateRef}
									id="orderedDate"
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
									isInvalid={errors?.orderedDate ? ValidationState.ERROR : ""}
									errorMessage={errors?.orderedDate?.message}
									onChange={(date: Date) => setValue("orderedDate", date)}
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
					<LinkButton>Cancel</LinkButton>
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

// {
// 	"eventDto": {
// 	  "activeIndicator": "string",
// 	  "evacDepAuthDate": "string",
// 	  "evacDepOrdDate": "string",
// 	  "evacStatusCode": "string",
// 	  "evacSummary": "string",
// 	  "eventEndDate": "string",
// 	  "eventId": "string",
// 	  "eventStartDate": "string",
// 	  "eventSummary": "string",
// 	  "eventTitle": "string",
// 	  "eventTypeId": "string",
// 	  "lastUpdatedUserId": "string",
// 	  "managementTypeCode": "string"
// 	}
//   }

export default CreateEventPage
