import React, { useState } from "react"
import { navigate } from "gatsby"
import { Box, BoxProps, Divider, PseudoBox, useTheme, Flex } from "@chakra-ui/core"
import { Select } from "@c1ds/components"
import { EventFormSections, useCTFFormContext } from "./Forms/Form"
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
	const { formSection } = useCTFFormContext()
	const eventData: EventFormData = savedEvent ?? { eventId: "", eventTitle: "", managementTypeCode: "", eventTypeId: "" }

	const [selectedTab, setSelectedTab] = useState<EventFormSections | undefined>(formSection)
	const inOverview = selectedTab === "overview",
		inLkl = selectedTab === "locations",
		inEvacuation = selectedTab === "evacuation",
		inAttachments = selectedTab === "attachments"

	const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>, tab: EventFormSections) => {
		setSelectedTab(tab)
		e.currentTarget.blur()
	}

	// Create context with saved form, update saved events and wrap tabs
	return (
		<Layout pageTitle="View Event" pageHeading={eventData.eventTitle}>
			{/* TODO: Remove temp home nav button once Header/Footer integrated */}
			<Flex display="inline-flex" align="center" position="absolute" top="42px" right={{ base: "16px", md: "24px" }}>
				<PseudoBox
					as="button"
					type="button"
					id="goToHome"
					cursor="pointer"
					display="inline-flex"
					alignItems="flex-end"
					textAlign="center"
					border="none"
					borderRadius={0}
					background="none"
					p={0}
					fontFamily="body"
					fontSize="button"
					color="white"
					_focus={{
						color: "text",
						// @ts-ignore
						outlineWidth: "2px",
						outlineStyle: "solid",
						outlineColor: "accent",
					}}
					_hover={{
						color: "text",
						// @ts-ignore
						outlineWidth: "2px",
						outlineStyle: "solid",
						outlineColor: "accent",
					}}
					_disabled={{
						color: "inputBorder",
						border: "none",
					}}
					onClick={() => {
						navigate("/")
					}}>
					<Box flex="1 1 0" lineHeight="linkButton">
						HOME
					</Box>
				</PseudoBox>
			</Flex>

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
						onClick={e => handleTabClick(e, "overview")}
						marginRight={{ base: "48", xl: "72" }}>
						Event Overview
					</TabButton>
					<TabButton
						isActive={inLkl}
						onClick={e => handleTabClick(e, "locations")}
						marginRight={{ base: "48", xl: "72" }}>
						Last Known Locations
					</TabButton>
					<TabButton
						isActive={inEvacuation}
						onClick={e => handleTabClick(e, "evacuation")}
						marginRight={{ base: "48", xl: "72" }}>
						Evacuation
					</TabButton>
					<TabButton
						isActive={inAttachments}
						onClick={e => handleTabClick(e, "attachments")}
						marginRight={{ base: "48", xl: "72" }}>
						Attachments
					</TabButton>
				</Box>
				<Box gridColumn="1 / -1" marginTop={{ base: "16", md: "-3px" }} marginBottom="16">
					<Divider borderColor="disabledDark" marginY="2" marginX={0} opacity={1} />
				</Box>
				{inLkl ? (
					<LastKnownLocationTab eventData={eventData} />
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
} & Omit<BoxProps, "onClick">

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
