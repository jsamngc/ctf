import React, { useState } from "react"
import { Box, BoxProps, Flex, Grid, Divider, PseudoBox, useTheme } from "@chakra-ui/core"
import SEO from "./seo"
import { H1, Select } from "@c1ds/components"
import { EventFormSections } from "./Forms/Form"
import { OverviewTab } from "./PageSections/EventOverviewTab"
import { LastKnownLocationTab } from "./PageSections/EventLklTab"
import { EvacDetailsTab } from "./PageSections/EventEvacDetailsTab"
import { AttachmentsTab } from "./PageSections/EventAttachmentsTab"

interface EventFormProps {
	savedEvent?: EventFormData
}

const eventTabs: { label: string; value: EventFormSections }[] = [
	{ label: "Event Overview", value: "overview" },
	{ label: "Last Known Locations", value: "locations" },
	{ label: "Evacuation", value: "evacuation" },
	{ label: "Attachments", value: "attachments" },
]

const ViewEvent: React.FC<EventFormProps> = (p: EventFormProps) => {
	const { savedEvent } = p

	const [currentEventData, setEventData] = useState(savedEvent)

	const eventData: EventFormData = savedEvent ?? { eventId: "", eventTitle: "", managementTypeCode: "", eventTypeId: "" }

	const [selectedTab, setSelectedTab] = useState<EventFormSections | undefined>("overview")
	const inOverview = selectedTab === "overview",
		inLkl = selectedTab === "locations",
		inEvacuation = selectedTab === "evacuation",
		inAttachments = selectedTab === "attachments"

	const isActive = !!eventData.activeIndicator

	return (
		<Flex minH="100vh">
			<Box as="main" w="full" lineHeight="1.5">
				<SEO title="View Event" />

				<Grid
					as="section"
					id="pageSection"
					gridColumn="1 / -1"
					gridGap={{ base: "16px", md: "24px" }}
					gridTemplateColumns={[
						"repeat(4, 1fr)",
						"repeat(4, 1fr)",
						"repeat(4, 1fr)",
						"repeat(8, 1fr)",
						"repeat(12, 1fr)",
					]}
					bg="white"
					maxW={{ xl: "1280px" }}
					m={{ xl: "auto" }}
					paddingX={{ base: "16", md: "24" }}
					paddingTop={{ base: "16", md: "24" }}
					paddingBottom={{ base: "64", md: "96" }}>
					<Box gridColumn="1 / -1">
						<Flex align="center" justifyContent="space-between">
							<Box wordBreak="break-word" marginRight="16">
								<H1>{eventData.eventTitle}</H1>
							</Box>

							<Flex
								flexShrink={0}
								justifySelf="end"
								alignSelf="center"
								width={{ base: "74px", sm: "93px" }}
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
						</Flex>
						<Box marginTop="12" display={{ md: "none" }}>
							<Select
								id="eventTab"
								name="eventTab"
								aria-label="Event Tab"
								options={eventTabs}
								size="full"
								onChange={changes => {
									setSelectedTab(changes.selectedItem?.value as EventFormSections)
								}}
								value={selectedTab}
							/>
						</Box>
						<Box marginTop="12" display={{ base: "none", md: "block" }}>
							<TabButton
								isActive={inOverview}
								onClick={() => setSelectedTab("overview")}
								marginRight={{ base: "48", xl: "72" }}>
								Event Overview
							</TabButton>
							<TabButton
								isActive={inLkl}
								onClick={() => setSelectedTab("locations")}
								marginRight={{ base: "48", xl: "72" }}>
								Last Known Locations
							</TabButton>
							<TabButton
								isActive={inEvacuation}
								onClick={() => setSelectedTab("evacuation")}
								marginRight={{ base: "48", xl: "72" }}>
								Evacuation
							</TabButton>
							<TabButton
								isActive={inAttachments}
								onClick={() => setSelectedTab("attachments")}
								marginRight={{ base: "48", xl: "72" }}>
								Attachments
							</TabButton>
						</Box>
						<Box gridColumn="1 / -1" marginTop={{ base: "16", md: "-3px" }} marginBottom="16">
							<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
						</Box>
						{inLkl ? (
							<LastKnownLocationTab eventData={currentEventData} setEventData={setEventData} />
						) : inEvacuation ? (
							<EvacDetailsTab eventData={eventData} />
						) : inAttachments ? (
							<AttachmentsTab eventData={eventData} />
						) : (
							<OverviewTab eventData={eventData} />
						)}
					</Box>
				</Grid>
			</Box>
		</Flex>
	)
}

type TabButtonProps = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	/**
	 * Indicates if tab is currently active
	 */
	isActive?: boolean
} & BoxProps

const TabButton: React.FC<TabButtonProps> = p => {
	const { onClick, isActive, children, ...boxProps } = p
	const theme = useTheme()
	return (
		<PseudoBox
			{...boxProps}
			as="button"
			display="inline-flex"
			alignItems="flex-end"
			textAlign="center"
			border="none"
			borderRadius={0}
			background="none"
			p={0}
			fontFamily="body"
			fontSize="base"
			fontWeight="h4"
			color="primary"
			borderBottom="3"
			borderColor={isActive ? "accent" : "transparent"}
			cursor="pointer"
			_focus={{
				//@ts-ignore
				outline: `2px solid ${theme.colors.primary}`,
			}}
			_hover={{
				outline: "none",
				borderColor: !isActive ? "clickable" : undefined,
				color: !isActive ? "clickable" : undefined,
			}}
			onClick={onClick}>
			<Box flex="1 1 0" lineHeight="linkButton">
				{children}
			</Box>
		</PseudoBox>
	)
}

export default ViewEvent
