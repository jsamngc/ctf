import React from "react"
import { navigate } from "gatsby"
import { Box, Flex, Grid, Divider, Text } from "@chakra-ui/core"
import { FinePrint, P, LinkButton, Link, H3, IconAlignment } from "@c1ds/components"
import moment from "moment"
import { EditSharp } from "@material-ui/icons"
import mgmtTypes from "../../../content/managementTypes.json"
import eventTypes from "../../../content/eventTypes.json"
import evacStatuses from "../../../content/evacuationStatuses.json"
import { EventPageState } from "../../pages/event"

//TODO: Use exported type
interface Option {
	label: string
	value: string
}

interface OverviewTabProps {
	eventData: EventFormData
}

export const OverviewTab: React.FC<OverviewTabProps> = (p: OverviewTabProps) => {
	const { eventData } = p
	const eventType = eventTypes.find((eventType: Option) => eventType.value === eventData.eventTypeId)?.label
	const mgmtType = mgmtTypes.find((mgmtType: Option) => mgmtType.value === eventData.managementTypeCode)?.label
	const evacStatus = evacStatuses.find((evaStatus: Option) => evaStatus.value === eventData.evacStatusCode)?.label

	const isActive = !!eventData.activeIndicator

	return (
		<>
			<Grid
				gridColumn="1 / -1"
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{
					base: "repeat(4, 1fr)",
					md: "repeat(12, 1fr)",
					lg: "repeat(12, 1fr)",
				}}>
				<Flex gridColumn="1 / -1" align="center" justify="space-between">
					<Box>
						<H3>Event Details</H3>
					</Box>
					<Box>
						<LinkButton
							buttonIcon={{ mdIcon: EditSharp, alignment: IconAlignment.LEFT, color: "clickable" }}
							onClick={() => {
								const pageState: EventPageState = {
									eventId: eventData.eventId,
									isEdit: true,
									formSection: "overview",
								}
								navigate("/event", { state: pageState })
							}}>
							&nbsp;Edit
						</LinkButton>
					</Box>
				</Flex>
				<Box gridColumn={{ base: "span 2", md: "span 4", lg: "span 2" }}>
					<Box mb={4}>
						<FinePrint color="label">Status</FinePrint>
					</Box>
					<Text
						fontFamily="default"
						color={isActive ? "success" : "error"}
						fontSize="base"
						fontWeight="h3"
						lineHeight="normal"
						margin={0}>
						{displayData(isActive ? "Active" : "Inactive")}
					</Text>
				</Box>
				<Box gridColumn={{ base: "span 2", md: "span 4", lg: "7 / 9" }} gridRow={{ md: "3", lg: "auto" }}>
					<Box mb={4}>
						<FinePrint color="label">Event Type</FinePrint>
					</Box>
					<P>{displayData(eventType)}</P>
				</Box>
				<Box gridColumn={{ base: "span 2", md: "span 4", lg: "3 / 5" }} gridRow={{ lg: "2" }}>
					<Box mb={4}>
						<FinePrint color="label">Start Date</FinePrint>
					</Box>
					<P>{displayData(formatDateField(eventData.eventStartDate))}</P>
				</Box>
				<Box gridColumn={{ base: "span 2", md: "span 4", lg: "5 / 7" }} gridRow={{ lg: "2" }}>
					<Box mb={4}>
						<FinePrint color="label">End Date</FinePrint>
					</Box>
					<P>{displayData(formatDateField(eventData.eventEndDate))}</P>
				</Box>
				<Box gridColumn={{ base: "span 2", md: "span 4", lg: "span 2" }}>
					<Box mb={4}>
						<FinePrint color="label">Management Type</FinePrint>
					</Box>
					<P>{displayData(mgmtType)}</P>
				</Box>
				<Box gridColumn={{ base: "span 2", md: "span 4", lg: "span 2" }}>
					<Box mb={4}>
						<FinePrint color="label">Evacuation Status</FinePrint>
					</Box>
					<P>{displayData(evacStatus)}</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1" }}>
					<Box mb={4}>
						<FinePrint color="label">Event Description</FinePrint>
					</Box>
					<P>{displayData(eventData.eventSummary)}</P>
				</Box>
			</Grid>
			<Box gridColumn="1 / -1" marginY="16">
				<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
			</Box>
			<Grid
				gridColumn="1 / -1"
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{
					base: "repeat(4, 1fr)",
					md: "repeat(8, 1fr)",
					lg: "repeat(12, 1fr)",
				}}>
				<Box gridColumn="1 / -1">
					<H3>Talking Points</H3>
				</Box>
				<Box gridColumn="1 / -1">
					<P>Default Talking Points have been added, pending new Talking Points.</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1" }} marginTop={{ base: "24", sm: "0", md: "24" }}>
					<Box mb={4}>
						<FinePrint color="label">Uploaded file</FinePrint>
					</Box>
					{/* <P>{displayData(eventData.eventSummary)}</P> */}
				</Box>
			</Grid>
			<Box gridColumn="1 / -1" marginY="16">
				<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
			</Box>
			<Grid
				gridColumn="1 / -1"
				gridGap={{ base: "16px", md: "24px" }}
				gridTemplateColumns={{
					base: "repeat(4, 1fr)",
					md: "repeat(8, 1fr)",
					lg: "repeat(12, 1fr)",
				}}>
				<Box gridColumn="1 / -1">
					<H3>Impacted Area</H3>
				</Box>
				<Box gridColumn="1 / -1">
					<P>
						<Text color="required" as="span">
							*&nbsp;
						</Text>
						Which Consular Posts are impacted by this event?
					</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1" }} marginTop={{ base: "0" }}>
					<P>See below to help identify where Consular Districts are located in each country.</P>
					<Box fontSize="button">
						<Link
							href="http://fam.a.state.sbu/fam/02FAM/02FAM0460.html#M463"
							target="_blank"
							rel="noreferrer noopener">
							2 FAM EXHIBIT 461&nbsp; CONSULAR DISTRICTS
						</Link>
					</Box>
					{/* <P>{displayData(eventData.eventSummary)}</P> */}
				</Box>
			</Grid>
		</>
	)
}

// TODO: Move to common util file (also used by EventCard)
const formatDateField = (inputDate: Date | undefined) => {
	return inputDate ? moment(inputDate).format("MM/DD/YYYY") : ""
}

const displayData = (value?: string) => (value ? value : "-")
