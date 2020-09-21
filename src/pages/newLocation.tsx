import React from "react"
import moment from "moment"
import { getSavedForm } from "../components/Utility/formHelpers"
import { CTFFormProvider, CTFFormProviderProps } from "../components/Forms/Form"
import LKLForm from "../components/Forms/LKLForm"

export interface LocationPageState {
	eventId: string
	/**
	 * Provide Event Location ID to
	 * open form in edit mode
	 */
	eventLklId?: string
}

type LocationPageProps = {
	location: {
		state: LocationPageState
	}
}

const NewLocationPage: React.FC<LocationPageProps> = (p: LocationPageProps) => {
	let savedLkl: LklDto | undefined
	if (p.location?.state?.eventLklId) {
		const savedEvents = getSavedForm<Array<EventFormData>>("ctfForms", "events")
		const savedEvent = savedEvents && savedEvents.find((event: EventFormData) => event.eventId === p.location?.state?.eventId)
		savedLkl = savedEvent?.eventLklDtoList?.find((lklDto: LklDto) => lklDto.eventLklId === p.location?.state?.eventLklId)
		if (savedLkl) {
			if (savedLkl.createdDateTime) savedLkl.createdDateTime = moment(savedLkl.createdDateTime).toDate()
			if (savedLkl.lastUpdatedDateTime) savedLkl.lastUpdatedDateTime = moment(savedLkl.lastUpdatedDateTime).toDate()
		}
	}

	const formMode: CTFFormProviderProps["formMode"] = typeof savedLkl === "undefined" ? "create" : "edit"

	return (
		<CTFFormProvider formMode={formMode}>
			<LKLForm eventId={p.location?.state?.eventId} savedForm={savedLkl} />
		</CTFFormProvider>
	)
}

export default NewLocationPage
