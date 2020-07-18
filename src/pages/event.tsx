import React from "react"
import moment from "moment"
import { getSavedForm } from "../components/Utility/formHelpers"
import { CTFFormProvider } from "../components/Forms/Form"
import EventForm, { EventFormData } from "../components/Forms/EventForm"

type EventPageProps = {
	eventId: string
	location: {
		state: {
			eventId: string
			isEdit: boolean
		}
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

	const initFormMode = typeof savedEvent === "undefined" ? "create" : !p.location.state.isEdit ? "view" : "edit"

	return (
		<CTFFormProvider initialFormMode={initFormMode}>
			<EventForm savedEvent={savedEvent} />
		</CTFFormProvider>
	)
}

export default EventPage
