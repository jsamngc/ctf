import React, { useState, useCallback } from "react"
import { navigate } from "gatsby"
import { Box, Flex, useDisclosure } from "@chakra-ui/core"
import { Button, LinkButton } from "@c1ds/components"
import moment from "moment"
import { ConfirmTalkingPointModal } from "../Modals/ConfirmTalkingPointModal"
import { DataLossModal } from "../Modals/DataLossModal"
import { SaveModal } from "../Modals/SaveModal"
import { useForm, FormProvider } from "react-hook-form"
import { Form, useCTFFormContextWSavedForm } from "./Form"
import Layout, { LayoutProps } from "../../components/Layout"
import EvacDetails from "../FormSections/EvacDetails"
import EventDetails from "../FormSections/EventDetails"
import TalkingPointsDetails from "../FormSections/TalkingPointsDetails"
import ImpactedPostsDetails from "../FormSections/ImpactedPostsDetails"
import { EventPageState } from "../../pages/event"

interface EventFormProps {
	savedEvent?: EventFormData
}

const EventForm: React.FC<EventFormProps> = (p: EventFormProps) => {
	const { savedEvent } = p
	const {
		isCreate,
		isEdit,
		formSection,
		savedForm: savedEvents,
		updateSavedForm: updateSavedEvents,
	} = useCTFFormContextWSavedForm()

	const [formData, setFormData] = useState<EventFormData>()
	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()
	const { isOpen: isTPConfirmOpen, onOpen: onTPConfirmOpen, onClose: onTPConfirmClose } = useDisclosure()
	const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure()

	const defaultValues = {
		// Mimic key generation for Crisis
		eventId: `OCS${moment(new Date()).format("YYYYDDD")}${Math.floor(Math.random() * Math.floor(1000000))}`,
		eventTitle: "",
		eventStartDate: new Date(),
		activeIndicator: true,
		attachments: [],
		managementTypeCode: "mg",
		// 1.13 The system defaults the Event Type to General.
		eventTypeId: "General",
		eventSummary: "",
		// 1.16.1 The system defaults the Evacuation Status to “blank”
		evacStatusCode: "NONE",
		evacSummary: "",
		impactedPosts: undefined,
		lastUpdatedDateTime: new Date(),
	}

	const formMethods = useForm<EventFormData>({
		mode: "onBlur",
		defaultValues: savedEvent ?? defaultValues,
	})
	const { register, handleSubmit, getValues } = formMethods

	const saveData = useCallback(
		(data, skipNavigate: boolean) => {
			const currEvents = [...savedEvents]
			if (isEdit) {
				const savedIdx = currEvents.findIndex((evt: EventFormData) => evt.eventId === data.eventId)
				// Merge existing saved data with updates in case any fields are not present in section's form data
				const updatedEvent = { ...currEvents[savedIdx], ...data }
				currEvents.splice(savedIdx, 1, updatedEvent)
			} else {
				currEvents.push(data)
			}
			updateSavedEvents(currEvents)
			onSaveOpen()
			setTimeout(() => {
				if (skipNavigate) {
					onSaveClose()
				} else {
					// TODO: Once microservice is connected, use returned eventId/event data
					const pageState: EventPageState = {
						eventId: getValues("eventId"),
						formSection,
					}
					navigate("/event", { state: pageState })
					onSaveClose()
				}
			}, 2000)
		},
		[updateSavedEvents, savedEvents, isEdit, onSaveOpen, onSaveClose, getValues, formSection]
	)

	const onSubmit = (data: EventFormData, skipNavigate = false) => {
		
		data.lastUpdatedDateTime = new Date()
		data.attachments = []
		if(formSection === "evacuation"){
			saveData(data, skipNavigate)
		}
		else {
			if (data.talkingPoints !== undefined) {
				saveData(data, skipNavigate)
			} else {
				setFormData(data)
				onTPConfirmOpen()
			}
		}
	}

	let pageHeading, pageDescription, breadcrumbs: LayoutProps["breadcrumbs"]
	if (isEdit) {
		if (formSection === "overview") {
			pageHeading = "Edit Event Details"
			pageDescription = "Edit the basic information related to the developing crisis."
			breadcrumbs = [
				{
					label: "Event",
					onClick: onDataLossOpen,
				},
				{ label: "Edit Event Details" },
			]
		} else {
			pageHeading = "Edit Event Details"
			pageDescription = "Edit the basic information related to the developing crisis."
			breadcrumbs = [
				{
					label: "Event",
					onClick: onDataLossOpen,
				},
				{ label: "Edit Event Details" },
			]
		}
	} else {
		pageHeading = "Create New Event"
		pageDescription =
			"Enter the basic information related to the developing crisis. You can add more details later as the event unfolds."
	}

	return (
		<Layout pageTitle="Event Details" pageHeading={pageHeading} pageDescription={pageDescription} breadcrumbs={breadcrumbs}>
			<FormProvider {...formMethods}>
				<Form
					name="eventForm"
					id="eventForm"
					onSubmit={handleSubmit(data => {
						onSubmit(data as EventFormData, false)
					})}
					noValidate={true}>
					<input name="eventId" type="hidden" ref={register} />

					{(isCreate || (isEdit && formSection === "overview")) && <EventDetails hideTitle={isEdit} />}

					{(isCreate || (isEdit && formSection === "overview")) && <TalkingPointsDetails />}

					{(isCreate || (isEdit && formSection === "overview")) && (
						<ImpactedPostsDetails impactedPosts={savedEvent?.impactedPosts} />
					)}

					{(isCreate || (isEdit && formSection === "evacuation")) && <EvacDetails />}

					<Flex
						as="nav"
						aria-label="page"
						id="pageNav"
						gridColumn="1 / -1"
						align="center"
						justify={{ base: "flex-end", md: "flex-start" }}
						marginTop={{ md: "72" }}>
						<Box marginRight="20">
							<LinkButton type="button" onClick={onDataLossOpen}>
								Cancel
							</LinkButton>
						</Box>
						<Button type="submit" size={isEdit ? "sm" : "md"}>
							{isEdit ? "Save" : "Create Event"}
						</Button>
					</Flex>

					<DataLossModal
						isOpen={isDataLossOpen}
						onClose={onDataLossClose}
						onLeave={() => {
							if (isCreate) {
								navigate("/")
							} else {
								const pageState: EventPageState = {
									eventId: getValues("eventId"),
									formSection,
								}
								navigate("/event", { state: pageState })
							}
						}}
					/>
					<SaveModal
						isOpen={isSaveOpen}
						onClose={onSaveClose}
						message={isCreate ? "Creating crisis event." : "Saving crisis information."}
					/>
					<ConfirmTalkingPointModal
						isOpen={isTPConfirmOpen}
						onClose={onTPConfirmClose}
						onConfirm={() => {
							saveData(formData, false)
						}}
					/>
				</Form>
			</FormProvider>
		</Layout>
	)
}

export default EventForm
