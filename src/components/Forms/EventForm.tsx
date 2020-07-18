import React, { useCallback } from "react"
import { navigate } from "gatsby"
import { Box, Flex, useDisclosure } from "@chakra-ui/core"
import { Button, ButtonSize, Banner, useBanner, Status } from "@c1ds/components"
import moment from "moment"
import { LinkButton } from "../../components/LinkButton"
import { DataLossModal } from "../Modals/DataLossModal"
import { SaveModal } from "../Modals/SaveModal"
import { useForm, FormProvider } from "react-hook-form"
import { getSavedForm, useSavedForm } from "../../components/Utility/formHelpers"
import { Form, useCTFFormContext } from "./Form"
import Layout from "../../components/Layout"
import EvacDetails from "../FormSections/EvacDetails"
import EventDetails from "../FormSections/EventDetails"
import { EventFormData } from "../../pages/event"

interface EventFormProps {
	savedEvent?: EventFormData
}

const EventForm: React.FC<EventFormProps> = (p: EventFormProps) => {
	const { savedEvent } = p
	const { isView, isEdit, setFormMode } = useCTFFormContext()

	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()

	const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure()
	const showSaveBanner = useBanner(saveBanner, 2)
	const [, updateSavedForm] = useSavedForm("events", "ctfForm")

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
		evacStatusCode: "",
		evacSummary: "",
		lastUpdatedDateTime: new Date(),
	}

	const formMethods = useForm<EventFormData>({
		mode: "onBlur",
		defaultValues: savedEvent ?? defaultValues,
	})
	const { register, handleSubmit } = formMethods

	const onSubmit = useCallback(
		(data, skipNavigate = false) => {
			data.lastUpdatedDateTime = new Date()
			const currForm: EventFormData[] = getSavedForm("events", "ctfForm", [])
			if (isEdit) {
				const savedIdx = currForm.findIndex((evt: EventFormData) => evt.eventId === data.eventId)
				currForm.splice(savedIdx, 1, data)
			} else {
				currForm.push(data)
			}
			updateSavedForm(currForm)
			onSaveOpen()
			setTimeout(() => {
				if (skipNavigate) {
					onSaveClose()
				} else {
					navigate("/")
				}
				showSaveBanner()
			}, 2000)
		},
		[updateSavedForm, isEdit, onSaveOpen, onSaveClose, showSaveBanner]
	)

	return (
		<Layout
			pageTitle="Event Details"
			pageHeading={
				isView ? `View ${savedEvent?.eventTitle}` : isEdit ? `Edit ${savedEvent?.eventTitle}` : "Create New Event"
			}
			pageDescription="Please enter as much information as you have related to this crisis.">
			<FormProvider {...formMethods}>
				<Form
					name="eventForm"
					id="eventForm"
					onSubmit={handleSubmit(data => {
						onSubmit(data, false)
					})}
					noValidate={true}>
					<input name="eventId" type="hidden" ref={register} />

					<EventDetails savedEvent={savedEvent} />

					<EvacDetails savedEvent={savedEvent} />

					<Flex
						as="nav"
						aria-label="page"
						id="pageNav"
						gridColumn="1 / -1"
						align="center"
						justify={{ base: "flex-end", md: "flex-start" }}
						marginTop={{ md: "72" }}>
						<Box marginRight="20">
							<LinkButton type="button" onClick={isView ? () => navigate("/") : onDataLossOpen}>
								Cancel
							</LinkButton>
						</Box>
						<Button
							type={isView ? "button" : "submit"}
							size={isEdit ? ButtonSize.SM : ButtonSize.MD}
							onClick={
								isView
									? (e: React.MouseEvent) => {
											e.preventDefault()
											setFormMode("edit")
											window.scrollTo(0, 0)
									  }
									: undefined
							}>
							{isView ? "Edit" : isEdit ? "Save" : "Create Event"}
						</Button>
					</Flex>

					<DataLossModal isOpen={isDataLossOpen} onClose={onDataLossClose} onLeave={() => navigate("/")} />
					<SaveModal isOpen={isSaveOpen} onClose={onSaveClose} />
				</Form>
			</FormProvider>
		</Layout>
	)
}

const saveBanner = <Banner status={Status.success} title="Save successful!" onClose={() => console.log("Banner closed")} />

export default EventForm
