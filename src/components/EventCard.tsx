import React from "react"
import { navigate } from "gatsby"
import moment from "moment"

import { MoreVertSharp } from "@material-ui/icons"
import Dropdown from "./Dropdown"
import DeactivateModal from "./Modals/DeactivateModal"
import evacStatuses from "../../content/evacuationStatuses.json"
import { Link, LinkButton, Card, CardBody, P, FinePrint } from "@c1ds/components"
import { Box, Flex, Grid, useDisclosure } from "@chakra-ui/core"
import { EventPageState } from "../pages/event"

interface EventCardProps {
	data: EventFormData
	onConfirm: (isActive: boolean, eventId: string) => void
}

//TODO: Use exported type
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

	const options = [
		{
			label: "Edit",
			value: "option1",
			onClick: () => {
				const pageState: EventPageState = {
					eventId: eventId,
					isEdit: true,
					formSection: "overview",
				}
				navigate("/event", { state: pageState })
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
		<Box mb={{ base: "16", md: "24" }} bg={isActive ? "white" : "#f2f2f2"} position="relative">
			<Box backgroundColor={isActive ? eventBarColor : "disabledBorder"} position="absolute" w={6} h="full" />
			<Card id="ctfEvent" maxWidth="full">
				<Flex position="absolute" w="full" top={{ base: "-8px", sm: "-16px" }}>
					<Box flexGrow={1}>
						<FinePrint>{eventType}</FinePrint>
					</Box>
					<Box position="relative" right={{ base: "-12px", sm: "-20px", md: "-12px" }}>
						<Dropdown options={options} borderedRows={true} label={`Additional actions for ${eventTitle}`}>
							<Box as={MoreVertSharp} color="clickable" />
						</Dropdown>
					</Box>
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
				</Flex>

				<CardBody>
					{/* Mobile and Tablet */}
					<Box display={{ lg: "none" }} mt={{ base: 24, md: 20 }} fontSize="base">
						<LinkButton
							onClick={() => {
								const pageState: EventPageState = {
									eventId: eventId,
								}
								navigate("/event", { state: pageState })
							}}>
							<Box as="span" fontSize="base">
								{eventTitle}
							</Box>
						</LinkButton>
						<Grid
							templateColumns={{ base: "1fr 1fr", sm: "repeat(6,1fr)", md: "repeat(5, 1fr)" }}
							columnGap={{ base: "12", sm: "0", md: "16" }}
							rowGap={{ base: "12", md: "8" }}>
							<Box gridColumn={{ sm: "1 / 3", md: "auto" }}>
								<Box pb={4}>
									<FinePrint color="label">Start Date</FinePrint>
								</Box>
								<P>{formatDateField(eventStartDate)}</P>
							</Box>
							<Box gridColumn={{ sm: "span 2", md: "auto" }}>
								{!isActive ? (
									<>
										<Box pb={4}>
											<FinePrint color="label">End Date</FinePrint>
										</Box>
										<P>{eventEndDate ? formatDateField(eventEndDate) : ""}</P>
									</>
								) : null}
							</Box>
							<Box gridColumn={{ sm: "1 / 3", md: "auto" }}>
								<Box pb={4}>
									<FinePrint color="label">Evacuation Status</FinePrint>
								</Box>
								<P>{evacStatus}</P>
							</Box>
							{/* use order */}
							<Box gridColumn={{ sm: "span 2", md: "auto" }}>
								<Box pb={4}>
									<FinePrint color="label">Last Updated</FinePrint>
								</Box>
								<P>{formatDateField(lastUpdatedDateTime)}</P>
							</Box>

							<Flex
								gridColumn={{ base: "2", sm: "span 2", md: "auto" }}
								justifySelf={{ sm: "end" }}
								alignSelf={{ sm: "center" }}
								width={{ base: "116px", sm: "135px", md: "150px" }}
								fontFamily="default"
								fontSize="finePrint"
								align="center"
								justify="center"
								rounded="chip"
								backgroundColor={isActive ? "success" : "disabledBackground"}
								height="32px"
								color={isActive ? "white" : "disabledButtonText"}
								border={isActive ? "none" : "px"}
								borderColor="disabledBorder"
								paddingY={0}>
								{isActive ? "Active" : "Inactive"}
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
										const pageState: EventPageState = {
											eventId: eventId,
										}
										navigate("/event", { state: pageState })
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

						<Flex
							justifySelf="end"
							alignSelf="center"
							width="135px"
							fontFamily="default"
							fontSize="finePrint"
							align="center"
							justify="center"
							rounded="chip"
							backgroundColor={isActive ? "success" : "disabledBackground"}
							height="32px"
							color={isActive ? "white" : "disabledButtonText"}
							border={isActive ? "none" : "px"}
							borderColor="disabledBorder"
							paddingY={0}>
							{isActive ? "Active" : "Inactive"}
						</Flex>
					</Grid>
				</CardBody>
			</Card>
		</Box>
	)
}

export default EventCard
