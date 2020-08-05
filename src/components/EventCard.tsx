import React from "react"
import { navigate } from "gatsby"
import moment from "moment"

import MoreVertIcon from "@material-ui/icons/MoreVert"
import Dropdown from "./Dropdown"
import DeactivateModal from "./Modals/DeactivateModal"
import evacStatuses from "../../content/evacuationStatuses.json"
import { Link, Card, CardBody, P, FinePrint } from "@c1ds/components"
import { Box, Flex, PseudoBox, Grid, Button as ChakraButton, useDisclosure } from "@chakra-ui/core"
import { EventFormData } from "../components/Forms/EventForm"

interface EventCardProps {
	data: EventFormData
	onConfirm: (isActive: boolean, eventId: string) => void
}

interface OptionType {
	label: string
	value: string
}

const EventCard: React.FC<EventCardProps> = ({ data, onConfirm }: EventCardProps) => {
	const {
		activeIndicator,
		eventEndDate,
		eventStartDate,
		eventTitle,
		eventTypeId,
		evacStatusCode,
		lastUpdatedDateTime,
		eventId,
	} = data ?? {}

	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()

	const evacStatus = evacStatuses.find((evaStatus: OptionType) => evaStatus.value === evacStatusCode)?.label
	// Event types are Monitoring, General, Crisis. Labels on UI are displayed as Monitored, Working, or Crisis Event respectively.
	// DB property :  Label on UI
	// ----------------------------
	// Monitoring  : Monitored Event
	// General 	   : Working Event
	// Crisis	   : Crisis Event
	const eventType =
		eventTypeId === "Monitoring" ? "Monitored Event" : eventTypeId === "General" ? "Working Event" : "Crisis Event"
	const eventBarColor = eventTypeId === "Monitoring" ? "monitor" : eventTypeId === "General" ? "general" : "error"
	const isActive = activeIndicator ?? false

	// CSS
	const eventTypeBar = ["170px", "170px", "220px", "270px", "260px", "200px"]
	const pseudo = {
		content: '""',
		height: "32px",
		width: "20px",
		transform: "skew(-40deg)",
		backgroundColor: isActive ? eventBarColor : "disabledBorder",
		position: "absolute" as const,
		left: ["220px", "220px", "265px", "320px", "310px", "256px"],
	}
	const pseudoBefore = {
		content: '""',
		height: ["32px", "32px", "32px", "32px", "32px"],
		width: "40px",
		transform: "skew(-40deg)",
		backgroundColor: isActive ? "secondary" : "disabledBorder",
		position: "absolute" as const,
		left: ["165px", "165px", "210px", "265px", "255px", "200px"],
	}
	const options = [
		{
			label: "Edit",
			value: "option1",
			onClick: () => {
				navigate("/event", { state: { eventId: eventId, isEdit: true } })
			},
		},
		{
			label: isActive ? "Deactivate" : "Activate",
			value: "option2",
			type: isActive ? ("error" as const) : ("primary" as const),
			onClick: () => {
				onDeactivateOpen()
			},
		},
	]

	const formatDateField = (inputDate: Date | undefined) => {
		return moment(inputDate).format("MM/DD/YYYY")
	}

	return (
		<Box mb="16" bg={isActive ? "white" : "#f2f2f2"}>
			<Card id="ctfEvent" maxWidth="full">
				<Flex position="absolute" w="full" top={{ base: "-16px", sm: "-24px" }} left={{ base: "-16px", sm: "-24px" }}>
					<PseudoBox
						as={Flex}
						alignItems="center"
						bg={isActive ? "secondary" : "disabledBorder"}
						paddingLeft={{ base: "12px", md: "20px" }}
						w={eventTypeBar}
						boxSizing="content-box"
						h="32px"
						_before={pseudoBefore}
						_after={pseudo}>
						<FinePrint color="white">{eventType}</FinePrint>
					</PseudoBox>
				</Flex>
				<Box
					position="absolute"
					color="secondary"
					top={{ base: "-10px", sm: "-18px" }}
					right={{ base: "-12px", sm: "-20px", md: "-12px" }}>
					<Dropdown options={options} borderedRows={true}>
						<Box w="120px" right="0" textAlign="right" color="clickable">
							<MoreVertIcon />
						</Box>
					</Dropdown>
					<DeactivateModal
						isOpen={isDeactivateOpen}
						onCancel={onDeactivateClose}
						eventName={eventTitle}
						isActivate={!isActive}
						onConfirm={() => {
							onConfirm(isActive, eventId)
							onDeactivateClose()
						}}
					/>
				</Box>

				<CardBody>
					{/* Mobile and Tablet */}
					<Box display={{ md: "none" }} mt={24} fontSize="base">
						<Link
							onClick={() => {
								navigate("/event", { state: { eventId: eventId } })
							}}>
							{eventTitle}
						</Link>
						<Grid templateColumns="1fr 1fr" columnGap="12px" rowGap="12px">
							<Box>
								<Box pb={4}>
									<FinePrint color="label">Start Date</FinePrint>
								</Box>
								<P>{formatDateField(eventStartDate)}</P>
							</Box>
							<Box>
								{!isActive ? (
									<>
										<Box pb={4}>
											<FinePrint color="label">End Date</FinePrint>
										</Box>
										<P>{eventEndDate ? formatDateField(eventEndDate) : ""}</P>
									</>
								) : null}
							</Box>
							<Box>
								<Box pb={4}>
									<FinePrint color="label">Evacuation Status</FinePrint>
								</Box>
								<P>{evacStatus}</P>
							</Box>
							{/* use order */}
							<Box>
								<Box pb={4}>
									<FinePrint color="label">Last Updated</FinePrint>
								</Box>
								<P>{formatDateField(lastUpdatedDateTime)}</P>
							</Box>

							<Box gridColumn="2" width={{ base: "116px", sm: "135px" }}>
								<ChakraButton
									size="md"
									position="relative"
									rounded="chip"
									backgroundColor={isActive ? "success" : "disabledBackground"}
									width={{ base: "116px", sm: "200px" }}
									height="32px"
									color={isActive ? "white" : "disabledButtonText"}
									border={isActive ? "none" : "px"}
									borderColor="disabledBorder"
									paddingY={0}
									paddingX={12}
									fontSize="finePrint">
									{isActive ? "Active" : "Inactive"}
								</ChakraButton>
							</Box>
						</Grid>
					</Box>

					{/* tablet */}
					<Box display={{ base: "none", md: "block", lg: "none" }} mt={20} fontSize="base">
						<Link
							onClick={() => {
								navigate("/event", { state: { eventId: eventId } })
							}}>
							{eventTitle}
						</Link>
						<Grid templateColumns="repeat(5, 1fr)" columnGap="16px" rowGap="8px">
							<Box>
								<Box pb={4}>
									<FinePrint color="label">Start Date</FinePrint>
								</Box>
								<P>{formatDateField(eventStartDate)}</P>
							</Box>
							<Box>
								{!isActive ? (
									<>
										<Box pb={4}>
											<FinePrint color="label">End Date</FinePrint>
										</Box>
										<Box color="text">{eventEndDate ? formatDateField(eventEndDate) : ""}</Box>
									</>
								) : null}
							</Box>
							<Box>
								<Box pb={4}>
									<FinePrint color="label">Evacuation Status</FinePrint>
								</Box>
								<P>{evacStatus}</P>
							</Box>
							<Box>
								<Box pb={4}>
									<FinePrint color="label">Last Updated</FinePrint>
								</Box>
								<P>{formatDateField(lastUpdatedDateTime)}</P>
							</Box>

							<Flex justify="flex-end" align="center" width="full">
								<ChakraButton
									size="md"
									position="relative"
									rounded="chip"
									backgroundColor={isActive ? "success" : "disabledBackground"}
									width="150px"
									height="32px"
									color={isActive ? "white" : "disabledButtonText"}
									border={isActive ? "none" : "px"}
									paddingY={0}
									paddingX={12}
									fontSize="finePrint">
									{isActive ? "Active" : "Inactive"}
								</ChakraButton>
							</Flex>
						</Grid>
					</Box>

					{/* Landscape */}
					<Grid
						mt={20}
						display={{ base: "none", lg: "grid" }}
						templateColumns="repeat(6, 1fr)"
						columnGap="16px"
						rowGap="8px"
						fontSize="base">
						<Box gridColumn="1 / 3">
							<Box>
								<Link
									onClick={() => {
										navigate("/event", { state: { eventId: eventId } })
									}}>
									{eventTitle}
								</Link>
							</Box>
							<Flex align="center">
								<Box marginRight={12}>
									<FinePrint color="label">Start Date</FinePrint>
								</Box>
								{/* only date no time */}
								<P>{formatDateField(eventStartDate)}</P>
							</Flex>
						</Box>
						<Box>
							{!isActive ? (
								<>
									<FinePrint color="label">End Date</FinePrint>
									<P>{eventEndDate ? formatDateField(eventEndDate) : ""}</P>
								</>
							) : null}
						</Box>
						<Box>
							<FinePrint color="label">Evacuation Status</FinePrint>
							<P>{evacStatus}</P>
						</Box>
						<Box>
							<FinePrint color="label">Last Updated</FinePrint>
							<P>{formatDateField(lastUpdatedDateTime)}</P>
						</Box>

						<Flex justify="flex-end" align="center" width="full">
							<ChakraButton
								size="md"
								position="relative"
								rounded="chip"
								backgroundColor={isActive ? "success" : "disabledBackground"}
								width="135px"
								height="32px"
								color={isActive ? "white" : "disabledButtonText"}
								border={isActive ? "none" : "px"}
								paddingY={0}
								paddingX={12}
								fontSize="finePrint">
								{isActive ? "Active" : "Inactive"}
							</ChakraButton>
						</Flex>
					</Grid>
				</CardBody>
			</Card>
		</Box>
	)
}

export default EventCard
