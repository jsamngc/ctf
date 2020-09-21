import React, { useCallback } from "react"
import Layout, { LayoutProps } from "../../components/Layout"
import { navigate } from "gatsby"
import { FormProvider, useForm } from "react-hook-form"
import { Button, LinkButton } from "@c1ds/components"
import { Box, Grid, useDisclosure } from "@chakra-ui/core"
import LocationDetails from "../FormSections/LocationDetails"
import POCDetails from "../FormSections/POCDetails"
import { DataLossModal } from "../Modals/DataLossModal"
import { EventPageState } from "../../pages/event"
import { LocationPageState } from "../../pages/newLocation"
import { Form, useCTFFormContext } from "./Form"
import { getSavedForm, useSavedForm } from "../Utility/formHelpers"
import { LklDto_To_LklFormData, LlkFormData_To_LklDto } from "../Utility/lklFormHelpers"

interface LKLFormProps {
	eventId: string
	savedForm?: LklDto
}

const LKLForm: React.FC<LKLFormProps> = (p: LKLFormProps) => {
	const { eventId, savedForm } = p
	const { isEdit, isView } = useCTFFormContext()
	const [, updateSavedForm] = useSavedForm<EventFormData[]>("ctfForms", "events")
	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()

	const defaultValues = {
		lklTitle: "",
		activeIndicator: true,
		pocList: [],
	}

	const pointOfContact = savedForm ? LklDto_To_LklFormData(savedForm) : undefined

	const formMethods = useForm<LKLFormData>({
		mode: "onBlur",
		defaultValues: savedForm ? pointOfContact : defaultValues,
	})
	const { handleSubmit } = formMethods

	const onSubmit = useCallback(
		(data, skipNavigate = false) => {
			const newLklDto = LlkFormData_To_LklDto(data, savedForm)
			// Save form data into CTF Events
			if (isEdit && savedForm !== undefined) {
				const allEvents = getSavedForm<Array<EventFormData>>("ctfForms", "events")
				const selectedEvent = allEvents && allEvents.find((event: EventFormData) => event.eventId === savedForm.eventId)
				const selectedEventIndex =
					allEvents && allEvents.findIndex((event: EventFormData) => event.eventId === savedForm.eventId)
				const savedLklIndex = selectedEvent?.eventLklDtoList?.findIndex(
					(lklDto: LklDto) => lklDto.eventId === savedForm?.eventId && lklDto.eventLklId === savedForm.eventLklId
				)
				// Replace the new LKLDto into the selected event LKL list then replace event in all event list
				if (selectedEvent && typeof savedLklIndex === "number") {
					selectedEvent.eventLklDtoList?.splice(savedLklIndex, 1, newLklDto)
					allEvents.splice(selectedEventIndex, 1, selectedEvent)
				}
				// Update the event list
				updateSavedForm(allEvents)

				const pageState: EventPageState = {
					eventId: savedForm.eventId,
					formSection: "locations",
				}
				navigate("/event", { state: pageState })
			}
			// TODO for newLocation and attach it to the addLocation page
		},
		[updateSavedForm, savedForm, isEdit]
	)

	let pageHeading, pageDescription, breadcrumbs: LayoutProps["breadcrumbs"]
	if (isEdit || isView) {
		pageHeading = isView ? "View Location" : "Edit Location"
		pageDescription = "Provide as much information as you have for the this location."
		breadcrumbs = [
			{
				label: "Event",
				onClick: onDataLossOpen,
			},
			{ label: "Edit Location" },
		]
	} else {
		pageHeading = "New Location"
		;(pageDescription = "Provide as much information as you have for the new location."),
			(breadcrumbs = [
				{ label: "Event", onClick: onDataLossOpen },
				{ label: "Add Location", onClick: onDataLossOpen },
				{ label: "New Location" },
			])
	}

	const pageState: EventPageState = {
		// TODO: Uncomment once form integration is established
		// eventId: getValues("eventId"),
		eventId: eventId,
		formSection: "locations",
	}

	return (
		<Layout
			pageTitle="Location Details"
			pageHeading={pageHeading}
			pageDescription={pageDescription}
			breadcrumbs={breadcrumbs}>
			<FormProvider {...formMethods}>
				<Form
					id="LKLForm"
					onSubmit={handleSubmit(data => {
						onSubmit(data, false)
					})}>
					<LocationDetails />
					<POCDetails pocList={pointOfContact ? pointOfContact.pocList : undefined} />
					<Grid
						as="nav"
						aria-label="page"
						id="pageNav"
						gridColumn="1 / -1"
						alignSelf="center"
						gridGap={{ base: "16px", md: "24px" }}
						marginTop={{ md: "72" }}
						size="full"
						height={48}
						gridTemplateColumns={{ base: "repeat(12, 1fr)", md: "repeat(14, 1fr)", lg: "repeat(12, 1fr)" }}>
						{isView || isEdit ? (
							<>
								<Box
									gridColumn={{ base: "6 / 9", sm: "9 / 11", md: "1 / 2" }}
									gridRow={1}
									justifySelf="center"
									alignSelf="center">
									<LinkButton type="button" onClick={() => {
										if (isEdit || isView) {
											if (isView){
												navigate("/event", { state: pageState })
											}
											else{
												onDataLossOpen()
											}
										} else {
											navigate("/addLocation", { state: pageState })
										}
									}}>
										Cancel
									</LinkButton>
								</Box>
								<Box gridColumn={{ base: "9 / -1", sm: "11 / -1", md: "2 / 3" }} gridRow={1}>
									{isEdit ? (
										<Button type="submit" size="full">
											Save
										</Button>
									) : (
										<Button
											type="button"
											size="full"
											onClick={() => {
												const pageState: LocationPageState = {
													eventId: eventId,
													eventLklId: savedForm?.eventLklId,
													isEdit: true,
												}
												navigate("/newLocation", { state: pageState })
											}}>
											Edit
										</Button>
									)}
								</Box>
							</>
						) : (
							<>
								<Box gridColumn={{ base: "1 / -1", md: "10 / 15", lg: "10 / 13" }} gridRow={{ md: "1" }}>
									<Button
										type="submit"
										size="full"
										onClick={() => {
											navigate("/addLocation")
										}}>
										Create New Location
									</Button>
								</Box>
								<Box gridColumn={{ base: "1 / -1", md: "5 / 10", lg: "7 / 10" }} gridRow={{ md: "1" }}>
									<Button
										size="full"
										buttonType="secondary"
										type="button"
										onClick={() => navigate("/newLocation")}>
										Create and Add Another
									</Button>
								</Box>
								<Box
									gridColumn={{ base: "1 / -1", md: "1 / 2" }}
									gridRow={{ md: "1" }}
									justifySelf="center"
									alignSelf="center">
									<LinkButton type="button" onClick={onDataLossOpen}>
										Cancel
									</LinkButton>
								</Box>
							</>
						)}
					</Grid>

					<DataLossModal
						isOpen={isDataLossOpen}
						onClose={onDataLossClose}
						onLeave={() => {
							if (isEdit || isView) {
								navigate("/event", { state: pageState })
							} else {
								navigate("/addLocation", { state: pageState })
							}
						}}
					/>
				</Form>
			</FormProvider>
		</Layout>
	)
}

export default LKLForm
