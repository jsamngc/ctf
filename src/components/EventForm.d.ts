interface EventFormData extends Record<string, boolean | Date | string | number | LklDto[] | undefined> {
	eventId: string
	eventTitle: string
	eventStartDate?: Date
	eventEndDate?: Date
	activeIndicator?: boolean
	managementTypeCode: string
	eventTypeId: string
	eventSummary?: string
	evacStatusCode?: string
	evacDepAuthDate?: Date
	evacDepOrdDate?: Date
	evacSummary?: string
	lastUpdatedDateTime?: Date
	eventLklDtoList?: LklDto[]
}

// LklDto related interfaces
interface PersonEmailDto {
	personEmailId: string
	emailDto: {
		emailId: string
		emailAddress: string
	}
}
interface PersonPhoneDto {
	personPhoneId: string
	phoneDto: {
		phoneId: string
		phoneNum: string
		phoneTypeCd: string
	}
}

interface PersonDto {
	personId: string
	givenName: string
	surName: string
	personEmailDtoList: PersonEmailDto[]
	personPhoneDtoList: PersonPhoneDto[]
}

interface LklPocListDto {
	lklPocId: string
	personDto: PersonDto
}

interface AddressDto {
	addressId: string
	addressTypeCd: string
	address1: string
	address2: string
	city: string
	countryCd: string
	postalCode: string
	stateCd: string
}

interface LklAddressDto {
	lklAddressId: string
	addressDto: AddressDto
}

interface LookupLklDto {
	lookupLklId: string
	lklTitle: string
	locationDesc: string
	postCd: string
	countryCd: string
	lklAddressDto: LklAddressDto
	lklPocListDto: LklPocListDto[]
}
// Last Known Location Data Transfer Object
interface LklDto {
	eventId: string
	eventLklId: string
	activeIndicator: boolean
	lklTypeCd: string
	createdDateTime: Date
	lastUpdatedDateTime: Date
	lookupLklDto: LookupLklDto
}
