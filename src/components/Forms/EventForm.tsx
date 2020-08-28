import React, { useCallback } from "react"
import { navigate } from "gatsby"
import { Box, Flex, useDisclosure } from "@chakra-ui/core"
import { Button, LinkButton } from "@c1ds/components"
import moment from "moment"
import { DataLossModal } from "../Modals/DataLossModal"
import { SaveModal } from "../Modals/SaveModal"
import { useForm, FormProvider } from "react-hook-form"
import { getSavedForm, useSavedForm } from "../../components/Utility/formHelpers"
import { Form, useCTFFormContext } from "./Form"
import Layout, { LayoutProps } from "../../components/Layout"
import EvacDetails from "../FormSections/EvacDetails"
import EventDetails from "../FormSections/EventDetails"
import { EventPageState } from "../../pages/event"

interface EventFormProps {
	savedEvent?: EventFormData
}

const EventForm: React.FC<EventFormProps> = (p: EventFormProps) => {
	const { savedEvent } = p
	const { isCreate, isEdit, formSection } = useCTFFormContext()

	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()

	const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure()
	const [, updateSavedForm] = useSavedForm<EventFormData[]>("ctfForms", "events")

	const defaultValues = {
		// Mimic key generation for Crisis
		eventId: `OCS${moment(new Date()).format("YYYYDDD")}${Math.floor(Math.random() * Math.floor(1000000))}`,
		eventTitle: "",
		eventStartDate: new Date(),
		activeIndicator: true,
		managementTypeCode: "mg",
		// 1.13 The system defaults the Event Type to General.
		eventTypeId: "General",
		eventSummary: "",
		// 1.16.1 The system defaults the Evacuation Status to “blank”
		evacStatusCode: "NONE",
		evacSummary: "",
		lastUpdatedDateTime: new Date(),
	}

	const formMethods = useForm<EventFormData>({
		mode: "onBlur",
		defaultValues: savedEvent ?? defaultValues,
	})
	const { register, handleSubmit, getValues } = formMethods

	const onSubmit = useCallback(
		(data, skipNavigate = false) => {
			data.lastUpdatedDateTime = new Date()
			const currForm = getSavedForm<EventFormData[]>("ctfForms", "events", [])
			if (isEdit) {
				const savedIdx = currForm.findIndex((evt: EventFormData) => evt.eventId === data.eventId)
				// Merge existing saved data with updates in case any fields are not present in section's form data
				const updatedEvent = { ...currForm[savedIdx], ...data }
				currForm.splice(savedIdx, 1, updatedEvent)
			} else {
				currForm.push(data)
			}
			updateSavedForm(currForm)
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
		[updateSavedForm, isEdit, onSaveOpen, onSaveClose, getValues, formSection]
	)

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
						onSubmit(data, false)
					})}
					noValidate={true}>
					<input name="eventId" type="hidden" ref={register} />

					{(isCreate || (isEdit && formSection === "overview")) && <EventDetails hideTitle={isEdit} />}

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
				</Form>
			</FormProvider>
		</Layout>
	)
}

export default EventForm
