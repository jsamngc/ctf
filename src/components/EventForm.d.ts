interface EventFormData
	extends Record<string, boolean | Date | string | number | AttachmentDto[] | LklDto[] | PostDto[] | TalkingPoint | undefined> {
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
	talkingPoints: TalkingPoint
	attachments?: AttachmentDto[]
	impactedPosts: PostDto[]
	eventLklDtoList?: LklDto[]
}
interface PostDto extends Record<string, string> {
	countryValue: string
	countryName: string
	postLabel: string
	postValue: string
}
interface AttachmentDto extends Record<string, string | ArrayBuffer | number | null> {
	fileName: string
	fileSize: number
	fileDataURL: string | ArrayBuffer | null
}

interface TalkingPoint extends Record<string, string | ArrayBuffer | number | null> {
	fileName: string
	fileSize: number
	fileMimeType: string
	fileDataURL: string | ArrayBuffer | null
}

interface EmailDto extends Record<string, string> {
	emailId: string
	emailAddress: string
	emailTypeCd: string
}
interface PhoneDto extends Record<string, string | number> {
	phoneId: number
	phoneNum: string
	phoneTypeCd: string
}

interface PersonEmailDto extends Record<string, string | EmailDto> {
	personEmailId: string
	emailDto: EmailDto
}
interface PersonPhoneDto extends Record<string, string | PhoneDto> {
	personPhoneId: string
	phoneDto: PhoneDto
}

interface PersonDto extends Record<string, string | PersonEmailDto[] | PersonPhoneDto[]> {
	personId: string
	givenName: string
	surName: string
	personEmailDtoList: PersonEmailDto[]
	personPhoneDtoList: PersonPhoneDto[]
}

interface LklPocListDto extends Record<string, string | PersonDto> {
	lklPocId: string
	personDto: PersonDto
}

interface AddressDto extends Record<string, string> {
	addressId: string
	addressTypeCd: string
	address1: string
	address2: string
	city: string
	countryCd: string
	postalCode: string
	stateCd: string
	province: string
	latitude: string
	longitude: string
}

interface LklAddressDto extends Record<string, string | AddressDto> {
	lklAddressId: string
	addressDto: AddressDto
}

interface LookupLklDto extends Record<string, string | LklAddressDto | LklPocListDto[] | undefined> {
	lookupLklId: string
	lklTitle: string
	locationDesc?: string
	postCd: string
	countryCd: string
	lklAddressDto?: LklAddressDto
	lklPocListDto?: LklPocListDto[]
}
interface LklDto extends Record<string, string | boolean | Date | LookupLklDto | undefined> {
	eventId: string
	eventLklId: string
	activeIndicator?: boolean
	lklTypeCd?: string
	createdDateTime?: Date
	lastUpdatedDateTime?: Date
	lookupLklDto: LookupLklDto
}
