import React from "react"
import { navigate } from "gatsby"
import { Box, Flex, Grid, Divider } from "@chakra-ui/core"
import { FinePrint, P, LinkButton, H3, IconAlignment } from "@c1ds/components"
import moment from "moment"
import { EditSharp } from "@material-ui/icons"
import evacStatuses from "../../../content/evacuationStatuses.json"
import { EventPageState } from "../../pages/event"

//TODO: Use exported type
interface Option {
	label: string
	value: string
}

interface EvacDetailsTabProps {
	eventData: EventFormData
}

export const EvacDetailsTab: React.FC<EvacDetailsTabProps> = (p: EvacDetailsTabProps) => {
	const { eventData } = p
	const evacStatus = evacStatuses.find((evaStatus: Option) => evaStatus.value === eventData.evacStatusCode)?.label
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
						<H3>Evacuation Details</H3>
					</Box>
					<Box>
						<LinkButton
							buttonIcon={{ mdIcon: EditSharp, alignment: IconAlignment.LEFT, color: "clickable" }}
							onClick={() => {
								const pageState: EventPageState = {
									eventId: eventData.eventId,
									isEdit: true,
									formSection: "evacuation",
								}
								navigate("/event", { state: pageState })
							}}>
							&nbsp;Edit
						</LinkButton>
					</Box>
				</Flex>
				<Box gridColumn={{ base: "1 / -1", md: "span 4" }}>
					<Box mb={4}>
						<FinePrint color="label">Evacuation Status</FinePrint>
					</Box>
					<P>{displayData(evacStatus)}</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1", sm: "span 2", md: "span 4", lg: "span 3" }}>
					<Box mb={4}>
						<FinePrint color="label">Departure Authorized</FinePrint>
					</Box>
					<P>{displayData(formatDateField(eventData.evacDepAuthDate))}</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1", sm: "span 2", md: "span 4" }}>
					<Box mb={4}>
						<FinePrint color="label">Departure Ordered</FinePrint>
					</Box>
					<P>{displayData(formatDateField(eventData.evacDepOrdDate))}</P>
				</Box>
				<Box gridColumn={{ base: "1 / -1" }}>
					<Box mb={4}>
						<FinePrint color="label">Evacuation Summary</FinePrint>
					</Box>
					<P>{displayData(eventData.evacSummary)}</P>
				</Box>
			</Grid>
			<Box gridColumn="1 / -1" marginY="16">
				<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
			</Box>
		</>
	)
}

// TODO: Move to common util file (also used by EventCard)
const formatDateField = (inputDate: Date | undefined) => {
	return inputDate ? moment(inputDate).format("MM/DD/YYYY") : ""
}

const displayData = (value?: string) => (value ? value : "-")
