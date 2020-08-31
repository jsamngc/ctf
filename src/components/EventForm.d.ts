interface EventFormData extends Record<string, boolean | Date | string | number | AttachmentDto[] | LklDto[] | undefined> {
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
	attachments?: AttachmentDto[]
	eventLklDtoList?: LklDto[]
}

interface AttachmentDto extends Record<string, File | undefined> {
	file: File
}

interface EmailDto {
	emailId: string
	emailAddress: string
}
interface PhoneDto {
	phoneId: string
	phoneNum: string
	phoneTypeCd: string
}

interface PersonEmailDto {
	personEmailId: string
	emailDto: EmailDto
}
interface PersonPhoneDto {
	personPhoneId: string
	phoneDto: PhoneDto
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
interface LklDto {
	eventId: string
	eventLklId: string
	activeIndicator: boolean
	lklTypeCd: string
	createdDateTime: Date
	lastUpdatedDateTime: Date
	lookupLklDto: LookupLklDto
}
