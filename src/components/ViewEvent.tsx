import React, { useState } from "react"
import { Box, BoxProps, Divider, PseudoBox, useTheme } from "@chakra-ui/core"
import { Select } from "@c1ds/components"
import { EventFormSections } from "./Forms/Form"
import { OverviewTab } from "./PageSections/EventOverviewTab"
import { LastKnownLocationTab } from "./PageSections/EventLklTab"
import { EvacDetailsTab } from "./PageSections/EventEvacDetailsTab"
import { AttachmentsTab } from "./PageSections/EventAttachmentsTab"
import Layout from "./Layout"

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

	return (
		<Layout pageTitle="View Event" pageHeading={eventData.eventTitle}>
			<Box gridColumn="1 / -1">
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
		</Layout>
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
