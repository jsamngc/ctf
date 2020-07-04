import React, { useEffect, useState } from "react"
import { Box, Grid, Divider, Flex } from "@chakra-ui/core"
import {
	Switch,
	ChangeEvent,
	DatePicker,
	format as DateFormat,
	Select,
	FormInput,
	Text,
	H1,
	H2,
	P,
	Button,
} from "@c1ds/components"
import moment from "moment"
import mgmtTypes from "../../content/managementTypes.json"
import evacStatuses from "../../content/evacuationStatuses.json"
import { Textarea } from "../components/Textarea"
import { LinkButton } from "../components/LinkButton"

const CreateEventPage: React.FC = () => {
	const [checked, setChecked] = useState(false)
	useEffect(() => {
		console.log(`The switch is ${checked ? "currently" : "not"} checked. Please click the switch to change its state.`)
	}, [checked])
	const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setChecked(!checked)
	}

	const [selectedVal, setSelectedVal] = useState()
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onMgmtSelect: ChangeEvent = changes => {
		setSelectedVal(changes.selectedItem.value)
	}

	return (
		<form>
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
						<Text id="eventTitle" name="eventTitle" labelId="eventTitleLabel" size="full" />
					</FormInput>
				</Box>
				<Grid
					gridColumn={{ base: "1 / -1" }}
					gridGap={{ base: "16px", md: "24px" }}
					gridTemplateColumns={{ base: "repeat(1,max-content)", md: "repeat(3,max-content)" }}>
					<FormInput inputId="startDate" labelText="Start Date" labelId="startDateLabel" isRequired={true}>
						<DatePicker
							id="startDate"
							name="startDate"
							labelId="startDateLabel"
							min={moment("01/01/1900", DateFormat).toDate()}
							max={moment("01/01/9999", DateFormat).toDate()}
						/>
					</FormInput>
					<FormInput inputId="endDate" labelText="End Date" labelId="endDateLabel" isRequired={true}>
						<DatePicker
							id="endDate"
							name="endDate"
							labelId="endDateLabel"
							min={moment("01/01/1900", DateFormat).toDate()}
							max={moment("01/01/9999", DateFormat).toDate()}
						/>
					</FormInput>
					<FormInput inputId="active" labelText="Active" labelId="activeLabel">
						<Switch id="active" name="active" ariaLabelledBy="activeLabel" onClick={onClick} />
					</FormInput>
				</Grid>
				<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
					<FormInput inputId="mgmtType" labelText="Management Type" labelId="mgmtTypeLabel" isRequired={true}>
						<Select
							id="mgmtType"
							name="mgmtType"
							options={mgmtTypes}
							labelId="mgmtTypeLabel"
							size="full"
							onChange={onMgmtSelect}
						/>
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
					<FormInput inputId="crisisSummary" labelText="Crisis Summary" labelId="crisisSummaryLabel">
						<Textarea id="crisisSummary" name="crisisSummary" labelId="crisisSummaryLabel" maxLength="4000" />
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
						<Select
							id="evacStatus"
							name="evacStatus"
							options={evacStatuses}
							labelId="evacStatusLabel"
							size="full"
							onChange={onMgmtSelect}
						/>
					</FormInput>
				</Box>
				<Grid
					gridColumn={{ base: "1 / -1", md: "span 4", lg: "span 9" }}
					gridGap={{ base: "16px", md: "24px" }}
					gridTemplateColumns={{ base: "repeat(1,max-content)", md: "repeat(2,max-content)" }}>
					<FormInput inputId="authorizedDate" labelText="Departure Authorized" labelId="authorizedDateLabel">
						<DatePicker
							id="authorizedDate"
							name="authorizedDate"
							labelId="authorizedDateLabel"
							min={moment("01/01/1900", DateFormat).toDate()}
							max={moment("01/01/9999", DateFormat).toDate()}
						/>
					</FormInput>
					<FormInput inputId="orderededDate" labelText="Departure Ordered" labelId="orderededDateLabel">
						<DatePicker
							id="orderededDate"
							name="orderededDate"
							labelId="orderededDateLabel"
							min={moment("01/01/1900", DateFormat).toDate()}
							max={moment("01/01/9999", DateFormat).toDate()}
						/>
					</FormInput>
				</Grid>
				<Box gridColumn={{ base: "1 / -1", lg: "span 9" }}>
					<FormInput inputId="evacSummary" labelText="Evacuation Summary" labelId="evacSummaryLabel">
						<Textarea id="evacSummary" name="evacSummary" labelId="evacSummaryLabel" maxLength="4000" />
					</FormInput>
				</Box>
				<Box gridColumn={{ base: "1 / -1" }}>
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
				</Box>
				<Flex gridColumn="1 / -1" justify={{ base: "flex-end", md: "flex-start" }} marginTop={{ md: "72" }}>
					<LinkButton>Cancel</LinkButton>
					<Button type="submit">Create Event</Button>
				</Flex>
			</Grid>
		</form>
	)
}

export default CreateEventPage
