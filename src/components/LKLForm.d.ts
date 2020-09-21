interface LKLFormData extends Record<string, boolean | string | number | POC[] | undefined> {
	eventId: string
	eventLklId?: string
	lklTitle: string
	activeIndicator: boolean | string
	country?: string
	post?: string
	streetAddress?: string
	additionalAddress?: string
	city?: string
	stateCd?: string
	province?: string
	postalCode?: string
	longitude?: string
	latitude?: string
	locationType?: string
	locationDesc?: string
	pocList?: POC[]
}

interface POC extends Record<string, string | PhoneData[] | EmailData[]> {
	personId: string
	givenName: string
	surName: string
	phoneList: PhoneData[]
	emailList: EmailData[]
}

interface PhoneData extends Record<string, string> {
	phoneNum: string
	phoneTypeCd: string
}

interface EmailData extends Record<string, string> {
	emailAddress: string
	emailType: string
}
