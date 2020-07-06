import React from "react"

import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Link, Card, CardBody } from "@c1ds/components"
import { Box, PseudoBox, Grid, Button as ChakraButton } from "@chakra-ui/core"
import Dropdown from "./Dropdown"

interface EventItemProps {
	data: {
		activeIndicator: string
		evacDepAuthDate: string
		evacDepOrdDate: string
		evacStatusCode: string
		evacSummary: string
		eventEndDate: string
		eventId: string
		eventStartDate: string
		eventSummary: string
		eventTitle: string
		eventTypeId: string
		lastUpdatedUserId: string
		managementTypeCode: string
	}
}

const EventItem: React.FC<EventItemProps> = ({ data }: EventItemProps) => {
	const options = [
		{ label: "Edit", value: "option1", color: "red" },
		{ label: "Delete", value: "option2" },
	]
	const {
		activeIndicator = "",
		evacDepOrdDate = "",
		eventEndDate = "",
		eventStartDate = "",
		eventTitle = "",
		eventTypeId = "",
		// evacDepAuthDate = '',
		// evacSummary = '',
		// evacStatusCode = '',
		// eventId = '',
		// eventSummary = '',
		// lastUpdatedUserId = '',
		// managementTypeCode = ''
	} = data ?? {}

	const eventType = eventTypeId === "Monitoring" ? "Monitored" : eventTypeId === "General" ? "Working Event" : "Crisis Event"
	const eventBarColor = eventTypeId === "Monitoring" ? "#E0B624" : eventTypeId === "General" ? "#DD7533" : "#D01319"

	const isActive = activeIndicator === "Active" ? true : false

	const eventTypeBar = ["185px", "185px", "220px", "270px", "260px", "200px"]

	const psudo = {
		content: '""',
		height: "32px",
		width: "20px",
		transform: "skew(-40deg)",
		background: isActive ? eventBarColor : "#666666",
		position: "absolute",
		left: ["220px", "220px", "265px", "320px", "310px", "256px"],
	}
	const psudoBefore = {
		content: '""',
		height: ["32px", "32px", "32px", "32px", "32px"],
		width: "40px",
		transform: "skew(-40deg)",
		bg: isActive ? "secondary" : "#666666",
		position: "absolute",
		left: ["165px", "165px", "210px", "265px", "255px", "200px"],
	}

	return (
		<Box as="div" mb="16px">
			<Card id="ctfEvent" maxWidth="100%">
				<Box
					position="absolute"
					d="flex"
					w="100%"
					top={["-16px", "-16px", "-24px", "-24px"]}
					left={["-16px", "-16px", "-24px", "-24px"]}>
					<PseudoBox
						bg={isActive ? "secondary" : "#666666"}
						color="white"
						paddingLeft="2%"
						w={eventTypeBar}
						boxSizing="content-box"
						lineHeight="32px"
						fontSize={["14px", "14px", "14px", "14px", "16px", "16px"]}
						h="32px"
						_before={psudoBefore}
						_after={psudo}>
						{eventType}
					</PseudoBox>
				</Box>
				<Box
					text-align="center"
					position="absolute"
					color="secondary"
					top={["-12px", "-12px", "-20px", "-20px"]}
					right={["-12px", "-12px", "-20px", "-12px"]}>
					<Dropdown options={options}>
						<Box w="120px" right="0" textAlign="right">
							<MoreVertIcon />
						</Box>
					</Dropdown>
				</Box>

				<CardBody>
					{/* Mobile and Tablet */}
					<Grid
						display={["grid", "grid", "grid", "none"]}
						gridTemplateColumns="47% 47%"
						gridColumnGap="12px"
						gridRowGap="12px">
						<Link mt="24px" gridColumn="1 / -1">
							{eventTitle}
						</Link>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Start Date
							</Box>
							<Box color="text">{eventStartDate}</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Evacuation Status
							</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								End Date
							</Box>
							<Box color="text">{eventEndDate}</Box>
						</Box>

						<Box as="div" width={["116px", "116px", "135px"]}>
							<ChakraButton
								size="md"
								position="relative"
								rounded="16px"
								background={isActive ? "#73AD21" : "#666666"}
								width={["116px", "116px", "200px"]}
								height="32px"
								color="white"
								border="none"
								fontSize={["14px", "14px", "14px"]}>
								{isActive ? "Active" : "Inactive"}
							</ChakraButton>
						</Box>
						{/* use order */}
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Last Updated
							</Box>
							<Box color="text">{evacDepOrdDate}</Box>
						</Box>
					</Grid>

					{/* tablet */}
					<Grid
						display={["none", "none", "none", "grid", "none"]}
						gridTemplateColumns="repeat(5, 1fr)"
						gridColumnGap="16px"
						gridRowGap="8px">
						<Link mt="24px" gridColumn="1 / -1">
							{eventTitle}
						</Link>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Start Date
							</Box>
							<Box color="text">{eventStartDate}</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								End Date
							</Box>
							<Box color="text">{eventEndDate}</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Evacuation Status
							</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Last Updated
							</Box>
							<Box color="text">{evacDepOrdDate}</Box>
						</Box>

						<Box as="div" display="flex" justifyContent="flex-end" width="100%">
							<ChakraButton
								size="md"
								position="relative"
								rounded="16px"
								background={isActive ? "#73AD21" : "#666666"}
								width={["116px", "116px", "200px", "150px"]}
								height="32px"
								color="white"
								border="none"
								fontSize={["14px", "14px", "14px"]}>
								{isActive ? "Active" : "Inactive"}
							</ChakraButton>
						</Box>
					</Grid>

					{/* Landscape */}
					<Grid
						pt="24px"
						display={["none", "none", "none", "none", "grid"]}
						gridTemplateColumns="repeat(6, 1fr)"
						gridColumnGap="16px"
						gridRowGap="8px">
						<Box as="div" gridColumn="1 / 3">
							<Box pb="8px" color="label">
								<Link>{eventTitle}</Link>
							</Box>
							<Box pb="8px" display="flex">
								<Box color="label" width="90px">
									Start Date
								</Box>
								{/* only date no time */}
								<Box color="text">{eventStartDate}</Box>
							</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								End Date
							</Box>
							<Box color="text">{eventEndDate}</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Evacuation Status
							</Box>
						</Box>
						<Box as="div" fontSize="14px">
							<Box pb="8px" color="label">
								Last Updated
							</Box>
							<Box color="text">{evacDepOrdDate}</Box>
						</Box>

						<Box as="div" display="flex" justifyContent="flex-end" width="100%">
							<ChakraButton
								size="md"
								position="relative"
								rounded="16px"
								background={isActive ? "#73AD21" : "#666666"}
								width={["116px", "116px", "200px", "150px", "135px"]}
								height="32px"
								color="white"
								border="none"
								fontSize={["14px", "14px", "14px"]}>
								{isActive ? "Active" : "Inactive"}
							</ChakraButton>
						</Box>
					</Grid>
				</CardBody>
			</Card>
		</Box>
	)
}

export default EventItem
