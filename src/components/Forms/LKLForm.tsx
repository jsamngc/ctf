import React, { useCallback, useState } from "react"
import Layout, { LayoutProps } from "../../components/Layout"
import { navigate } from "gatsby"
import { FormProvider, useForm } from "react-hook-form"
import { Button, LinkButton } from "@c1ds/components"
import { Box, Grid, useDisclosure } from "@chakra-ui/core"
import LocationDetails from "../FormSections/LocationDetails"
import POCDetails from "../FormSections/POCDetails"
import { DataLossModal } from "../Modals/DataLossModal"
import { SaveModal } from "../Modals/SaveModal"
import { EventPageState } from "../../pages/event"
import { AddLocationPageState } from "../../pages/addLocation"
import { Form, useCTFFormContext } from "./Form"
import { getSavedForm, useSavedForm } from "../Utility/formHelpers"
import { LklDto_To_LklFormData, LlkFormData_To_LklDto } from "../Utility/lklFormHelpers"

interface LKLFormProps {
	eventId: string
	savedForm?: LklDto
}

const LKLForm: React.FC<LKLFormProps> = (p: LKLFormProps) => {
	const { eventId, savedForm } = p
	const { isEdit, isCreate } = useCTFFormContext()
	const [, updateSavedEvents] = useSavedForm<EventFormData[]>("ctfForms", "events", true)
	const [breadcrumbLink, setBreadcrumbLink] = useState<"/event" | "/addLocation">("/event")
	const [addAnother, setAddAnother] = useState(false)
	const { isOpen: isDataLossOpen, onOpen: onDataLossOpen, onClose: onDataLossClose } = useDisclosure()
	const { isOpen: isSaveOpen, onOpen: onSaveOpen, onClose: onSaveClose } = useDisclosure()

	const defaultValues = {
		eventId: eventId,
		lklTitle: "",
		activeIndicator: true,
		pocList: [],
	}

	const pointOfContact = savedForm ? LklDto_To_LklFormData(savedForm) : undefined

	const formMethods = useForm<LKLFormData>({
		mode: "onBlur",
		defaultValues: savedForm ? pointOfContact : defaultValues,
	})
	const { handleSubmit, register } = formMethods

	const onSubmit = useCallback(
		data => {
			console.log(data)
			const newLklDto = LlkFormData_To_LklDto(data, savedForm)
			console.log(newLklDto)
			const savedEvents = [...getSavedForm<EventFormData[]>("ctfForms", "events", [])]
			const savedEventIndex = savedEvents.findIndex((evt: EventFormData) => evt.eventId === eventId)
			const savedEvent = { ...savedEvents[savedEventIndex] }

			// Save form data into CTF Events
			if (isEdit && savedForm !== undefined) {
				const savedLklIndex = savedEvent.eventLklDtoList?.findIndex(
					(lklDto: LklDto) => lklDto.eventLklId === savedForm.eventLklId
				)

				// Replace the new LKLDto into the selected event LKL list then replace event in all event list
				if (typeof savedEvent.eventLklDtoList !== "undefined" && typeof savedLklIndex !== "undefined") {
					savedEvent.eventLklDtoList?.splice(savedLklIndex, 1, newLklDto)
					savedEvents.splice(savedEventIndex, 1, savedEvent)

					// Update the event list
					updateSavedEvents(savedEvents)

					onSaveOpen()
					setTimeout(() => {
						const pageState: EventPageState = {
							eventId: savedForm.eventId,
							formSection: "locations",
						}
						navigate("/event", { state: pageState })
						onSaveClose()
					}, 2000)
				} else {
					const pageState: EventPageState = {
						eventId: savedForm.eventId,
						formSection: "locations",
					}
					navigate("/event", { state: pageState })
				}
			} else if (isCreate) {
				if (typeof savedEvent.eventLklDtoList === "undefined") {
					savedEvent.eventLklDtoList = [newLklDto as LklDto]
				} else {
					savedEvent.eventLklDtoList.push(newLklDto as LklDto)
				}
				savedEvents.splice(savedEventIndex, 1, savedEvent)

				// Update the event list
				updateSavedEvents(savedEvents)

				onSaveOpen()
				setTimeout(() => {
					if (addAnother) {
						window.location.reload()
					} else {
						// TODO: Once microservice is connected, use returned eventId/event data
						const pageState: EventPageState = {
							eventId: eventId,
							formSection: "locations",
						}
						navigate("/event", { state: pageState })
					}
					onSaveClose()
				}, 2000)
			}
			// TODO for newLocation and attach it to the addLocation page
		},
		[updateSavedEvents, savedForm, isEdit, isCreate, eventId, onSaveOpen, onSaveClose, addAnother]
	)

	let pageHeading, pageDescription, breadcrumbs: LayoutProps["breadcrumbs"]
	if (isEdit) {
		pageHeading = "Edit Location"
		pageDescription = "Provide as much information as you have for the this location."
		breadcrumbs = [
			{
				label: "Event",
				onClick: () => {
					setBreadcrumbLink("/event")
					onDataLossOpen()
				},
			},
			{ label: "Edit Location" },
		]
	} else {
		pageHeading = "New Location"
		;(pageDescription = "Provide as much information as you have for the new location."),
			(breadcrumbs = [
				{
					label: "Event",
					onClick: () => {
						setBreadcrumbLink("/event")
						onDataLossOpen()
					},
				},
				{
					label: "Add Location",
					onClick: () => {
						setBreadcrumbLink("/addLocation")
						onDataLossOpen()
					},
				},
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
						onSubmit(data)
					})}>
					<input name="eventId" type="hidden" ref={register} />
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
						{isEdit ? (
							<>
								<Box
									gridColumn={{ base: "6 / 9", sm: "9 / 11", md: "1 / 2" }}
									gridRow={1}
									justifySelf="center"
									alignSelf="center">
									<LinkButton
										type="button"
										onClick={() => {
											setBreadcrumbLink("/event")
											onDataLossOpen()
										}}>
										Cancel
									</LinkButton>
								</Box>
								<Box gridColumn={{ base: "9 / -1", sm: "11 / -1", md: "2 / 3" }} gridRow={1}>
									<Button type="submit" size="full">
										Save
									</Button>
								</Box>
							</>
						) : (
							<>
								<Box gridColumn={{ base: "1 / -1", md: "10 / 15", lg: "10 / 13" }} gridRow={{ md: "1" }}>
									<Button type="submit" size="full">
										Create New Location
									</Button>
								</Box>
								<Box gridColumn={{ base: "1 / -1", md: "5 / 10", lg: "7 / 10" }} gridRow={{ md: "1" }}>
									<Button size="full" buttonType="secondary" type="submit" onClick={() => setAddAnother(true)}>
										Create and Add Another
									</Button>
								</Box>
								<Box
									gridColumn={{ base: "1 / -1", md: "1 / 2" }}
									gridRow={{ md: "1" }}
									justifySelf="center"
									alignSelf="center">
									<LinkButton
										type="button"
										onClick={() => {
											setBreadcrumbLink("/addLocation")
											onDataLossOpen()
										}}>
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
							let pageState: EventPageState | AddLocationPageState
							if (breadcrumbLink === "/event") {
								pageState = {
									// TODO: Uncomment once form integration is established
									// eventId: getValues("eventId"),
									eventId: eventId,
									formSection: "locations",
								}
							} else {
								const savedEvents = getSavedForm<Array<EventFormData>>("ctfForms", "events")
								const savedEvent =
									savedEvents && savedEvents.find((event: EventFormData) => event.eventId === eventId)
								pageState = {
									savedEvent: savedEvent,
								}
							}
							navigate(breadcrumbLink, { state: pageState })
						}}
					/>
					<SaveModal
						isOpen={isSaveOpen}
						onClose={onSaveClose}
						message={isCreate ? "Creating new location." : "Saving location."}
					/>
				</Form>
			</FormProvider>
		</Layout>
	)
}

export default LKLForm
