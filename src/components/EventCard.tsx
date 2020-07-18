import React from "react"
import { navigate } from "gatsby"
import moment from "moment"

import MoreVertIcon from "@material-ui/icons/MoreVert"
import Dropdown from "./Dropdown"
import DeactivateModal from "./Modals/DeactivateModal"
import evacStatuses from "../../content/evacuationStatuses.json"
import { Link, Card, CardBody } from "@c1ds/components"
import { Box, Flex, PseudoBox, Grid, Button as ChakraButton, useDisclosure } from "@chakra-ui/core"

interface EventCardProps {
	data: {
		activeIndicator: boolean
		evacDepAuthDate: Date
		evacDepOrdDate: Date
		evacStatusCode: string
		evacSummary: string
		eventEndDate: Date
		eventId: string
		eventStartDate: Date
		eventSummary: string
		eventTitle: string
		eventTypeId: string
		lastUpdatedUserId: string
		managementTypeCode: string
		lastUpdatedDateTime: Date
	}
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
	// Event types are Monitoring, General, Crisis. Labels on UI are displayed as Monitored, Working, or Crirsis Event respectively.
	// DB property :  Label on UI
	// ----------------------------
	// Monitoring  : Monitored Event
	// General 	   : Working Event
	// Crirsis	   : Crirsis Event
	const eventType =
		eventTypeId === "Monitoring" ? "Monitored Event" : eventTypeId === "General" ? "Working Event" : "Crisis Event"
	const eventBarColor = eventTypeId === "Monitoring" ? "monitor" : eventTypeId === "General" ? "general" : "error"
	const isActive = activeIndicator

	// CSS
	const eventTypeBar = ["170px", "170px", "220px", "270px", "260px", "200px"]
	const psudo = {
		content: '""',
		height: "32px",
		width: "20px",
		transform: "skew(-40deg)",
		backgroundColor: isActive ? eventBarColor : "disabledBorder",
		position: "absolute" as const,
		left: ["220px", "220px", "265px", "320px", "310px", "256px"],
	}
	const psudoBefore = {
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

	const formatDateField = (inputDate: Date) => {
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
						color="white"
						paddingLeft={{ base: "12px", md: "20px" }}
						w={eventTypeBar}
						boxSizing="content-box"
						fontSize="finePrint"
						h="32px"
						_before={psudoBefore}
						_after={psudo}>
						{eventType}
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
								<Box pb={4} color="label" fontSize="finePrint">
									Start Date
								</Box>
								<Box color="text">{formatDateField(eventStartDate)}</Box>
							</Box>
							<Box>
								{!isActive ? (
									<>
										<Box pb={4} color="label" fontSize="finePrint">
											End Date
										</Box>
										<Box color="text">{eventEndDate ? formatDateField(eventEndDate) : ""}</Box>
									</>
								) : null}
							</Box>
							<Box>
								<Box pb={4} color="label" fontSize="finePrint">
									Evacuation Status
								</Box>
								<Box color="text">{evacStatus}</Box>
							</Box>
							{/* use order */}
							<Box>
								<Box pb={4} color="label" fontSize="finePrint">
									Last Updated
								</Box>
								<Box color="text">{formatDateField(lastUpdatedDateTime)}</Box>
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
								<Box pb={4} color="label" fontSize="finePrint">
									Start Date
								</Box>
								<Box color="text">{formatDateField(eventStartDate)}</Box>
							</Box>
							<Box>
								{!isActive ? (
									<>
										<Box pb={4} color="label" fontSize="finePrint">
											End Date
										</Box>
										<Box color="text">{eventEndDate ? formatDateField(eventEndDate) : ""}</Box>
									</>
								) : null}
							</Box>
							<Box>
								<Box pb={4} color="label" fontSize="finePrint">
									Evacuation Status
								</Box>
								<Box color="text">{evacStatus}</Box>
							</Box>
							<Box>
								<Box pb={4} color="label" fontSize="finePrint">
									Last Updated
								</Box>
								<Box color="text">{formatDateField(lastUpdatedDateTime)}</Box>
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
								<Box color="label" fontSize="finePrint" marginRight={12}>
									Start Date
								</Box>
								{/* only date no time */}
								<Box color="text">{formatDateField(eventStartDate)}</Box>
							</Flex>
						</Box>
						<Box>
							{!isActive ? (
								<>
									<Box color="label" fontSize="finePrint">
										End Date
									</Box>
									<Box color="text">{eventEndDate ? formatDateField(eventEndDate) : ""}</Box>
								</>
							) : null}
						</Box>
						<Box>
							<Box color="label" fontSize="finePrint">
								Evacuation Status
							</Box>
							<Box color="text">{evacStatus}</Box>
						</Box>
						<Box>
							<Box color="label" fontSize="finePrint">
								Last Updated
							</Box>
							<Box color="text">{formatDateField(lastUpdatedDateTime)}</Box>
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
