import React from "react"
import moment from "moment"
import { getSavedForm } from "../components/Utility/formHelpers"
import { CTFFormProvider, CTFFormProviderProps } from "../components/Forms/Form"
import EventForm from "../components/Forms/EventForm"
import ViewEvent from "../components/ViewEvent"

export interface EventPageState {
	eventId?: string
	isEdit?: boolean
	formSection?: CTFFormProviderProps["formSection"]
}

type EventPageProps = {
	location: {
		state: EventPageState
	}
}

const EventPage: React.FC<EventPageProps> = (p: EventPageProps) => {
	let savedEvent: EventFormData | undefined
	if (p.location?.state?.eventId) {
		const savedEvents = getSavedForm<Array<EventFormData>>("ctfForms", "events")
		savedEvent = savedEvents && savedEvents.find((event: EventFormData) => event.eventId === p.location?.state?.eventId)
		if (savedEvent) {
			if (savedEvent.evacDepAuthDate) savedEvent.evacDepAuthDate = moment(savedEvent.evacDepAuthDate).toDate()
			if (savedEvent.evacDepOrdDate) savedEvent.evacDepOrdDate = moment(savedEvent.evacDepOrdDate).toDate()
			if (savedEvent.eventStartDate) savedEvent.eventStartDate = moment(savedEvent.eventStartDate).toDate()
			if (savedEvent.eventEndDate) savedEvent.eventEndDate = moment(savedEvent.eventEndDate).toDate()
			if (savedEvent.lastUpdatedDateTime) savedEvent.lastUpdatedDateTime = moment(savedEvent.lastUpdatedDateTime).toDate()
		}
	}

	const formMode: CTFFormProviderProps["formMode"] =
		typeof savedEvent === "undefined" ? "create" : !p.location.state.isEdit ? "view" : "edit"

	return (
		<>
			{formMode === "view" ? (
				<ViewEvent savedEvent={savedEvent} />
			) : (
				<CTFFormProvider formMode={formMode} formSection={p.location.state?.formSection}>
					<EventForm savedEvent={savedEvent} />
				</CTFFormProvider>
			)}
		</>
	)
}

export default EventPage
