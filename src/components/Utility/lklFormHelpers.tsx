/**
 * Replace all of the same key name with the replacement value in dataObj object
 *
 * @param dataObj Object that needs value replacement
 * @param name name of the key property
 * @param replacement replacemnet value
 *
 * @returns N/A
 */
const replaceValue = (dataObj: any, name: string, replacement: any) => {
	for (const key in dataObj) {
		if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
			if (typeof dataObj[key] == "object") {
				replaceValue(dataObj[key], name, replacement)
			}
			if (key === name) {
				dataObj[`${name}`] = replacement
			}
		}
	}
}

/**
 * Retrieve saved Last Known Location DTO and create LKLForm data,
 *
 * @param lklDto LKL information that are retrieved when page load
 *
 * @returns LKLFormData object containing location information from given LKLDto
 */
export const LklDto_To_LklFormData = (lklDto: LklDto): LKLFormData => {
	const { activeIndicator, lookupLklDto } = lklDto
	const { lklTitle, locationDesc, postCd, lklAddressDto, lklPocListDto } = lookupLklDto ?? {}
	const { addressDto } = lklAddressDto ?? {}

	// extract address information
	const { addressTypeCd, address1, address2, city, countryCd, postalCode, stateCd, province, latitude, longitude } =
		addressDto ?? {}

	// create pocList required in LKLFormData
	const pocList = lklPocListDto?.map(lklPocListDtoData => {
		const personDto = lklPocListDtoData.personDto
		const { personId, givenName, surName, personEmailDtoList, personPhoneDtoList } = personDto

		const emailList = personEmailDtoList.map(emailData => {
			const emailDto = emailData.emailDto
			return {
				emailAddress: emailDto.emailAddress,
				emailType: emailDto.emailTypeCd,
			}
		})

		const phoneList = personPhoneDtoList.map(phoneData => {
			const phoneDto = phoneData.phoneDto
			return {
				phoneNum: phoneDto.phoneNum,
				phoneTypeCd: phoneDto.phoneTypeCd,
			}
		})

		// interface POC
		return {
			personId: personId,
			givenName: givenName,
			surName: surName,
			phoneList: phoneList,
			emailList: emailList,
		}
	})

	return {
		eventId: lklDto.eventId,
		eventLklId: lklDto.eventLklId,
		lklTitle: lklTitle,
		activeIndicator: activeIndicator ?? false,
		country: countryCd,
		post: postCd,
		streetAddress: address1,
		additionalAddress: address2,
		city: city,
		stateCd: stateCd,
		province: province,
		postalCode: postalCode,
		longitude: longitude,
		latitude: latitude,
		locationType: addressTypeCd,
		locationDesc: locationDesc,
		pocList: pocList,
	}
}

/**
 * Move over Location values from LKLFormData object to LKLDto object,
 *
 * @param lklFormData LKLFormData object that submitted from LKL form
 * @param lklDto Received/New LKLDto to create/update
 *
 * @returns LKLFormData object containing location information from given LKLDto
 */
export const LlkFormData_To_LklDto = (lklFormData: LKLFormData, lklDto: LklDto | undefined) => {
	const {
		eventId,
		eventLklId,
		lklTitle,
		activeIndicator,
		country,
		post,
		streetAddress,
		additionalAddress,
		city,
		stateCd,
		province,
		postalCode,
		longitude,
		latitude,
		locationType,
		locationDesc,
		pocList,
	} = lklFormData

	const locationDescDefined = typeof locationDesc !== 'undefined' ? locationDesc : ''
	const locationTypeDefined = typeof locationType !== 'undefined' ? locationType : ''

	// Have to have name and either phone or email thus, without names = empty poc
	const pocListDtoList = pocList
		?.filter(poc => {
			return poc.givenName !== "" || poc.surName !== ""
		})
		.map((poc, index) => {
			const personEmailDtoList = poc.emailList
				.filter(emailData => {
					return emailData.emailAddress !== ""
				})
				.map((emailData, index) => {
					return {
						personEmailId: index,
						emailDto: {
							emailId: "0",
							emailAddress: emailData.emailAddress,
							emailTypeCd: emailData.emailType
						},
					}
				})
			const personPhoneDtoList = poc.phoneList
				.filter(phoneData => {
					return phoneData.phoneNum !== ""
				})
				.map(phoneData => {
					return {
						personPhoneId: index,
						phoneDto: {
							phoneId: "0",
							phoneNum: phoneData.phoneNum,
							phoneTypeCd: phoneData.phoneTypeCd,
						},
					}
				})
			const personDto = {
				personId: poc.personId,
				givenName: poc.givenName,
				surName: poc.surName,
				personEmailDtoList: personEmailDtoList,
				personPhoneDtoList: personPhoneDtoList,
			}
			return {
				lklPocId: index,
				personDto: personDto,
			}
		})

	// In case of new LKLDto
	const newLklDto = {
		eventId: eventId,
		eventLklId: eventLklId ?? `${Math.floor(Math.random() * Math.floor(1000000))}`,
		activeIndicator: activeIndicator === "Active" ? true : false,
		lklTypeCd: locationTypeDefined,
		createdDateTime: new Date(),
		lastUpdatedDateTime: new Date(),
		lookupLklDto: {
			lookupLklId: 0,
			lklTitle: lklTitle,
			locationDesc: locationDescDefined,
			postCd: post,
			countryCd: country,
			lklAddressDto: {
				lklAddressId: "",
				addressDto: {
					addressId: "",
					addressTypeCd: locationTypeDefined,
					latitude: latitude,
					longitude: longitude,
					address1: streetAddress,
					address2: additionalAddress,
					city: city,
					countryCd: country,
					postalCode: postalCode,
					province: province,
					stateCd: stateCd,
				},
			},
			lklPocListDto: pocListDtoList,
		},
	}

	if (lklDto) {
		// Create LKLPocListDto : LklPocListDto[]
		replaceValue(lklDto, "activeIndicator", activeIndicator === "Active" ? true : false)
		replaceValue(lklDto, "lklTitle", lklTitle)
		replaceValue(lklDto, "countryCd", country)
		replaceValue(lklDto, "postCd", post)
		replaceValue(lklDto, "address1", streetAddress)
		replaceValue(lklDto, "address2", additionalAddress)
		replaceValue(lklDto, "city", city)
		replaceValue(lklDto, "stateCd", stateCd)
		replaceValue(lklDto, "province", province)
		replaceValue(lklDto, "postalCode", postalCode)
		replaceValue(lklDto, "addressTypeCd", locationTypeDefined)
		replaceValue(lklDto, "longitude", longitude)
		replaceValue(lklDto, "latitude", latitude)
		replaceValue(lklDto, "locationDesc", locationDescDefined)
		replaceValue(lklDto, "lklPocListDto", pocListDtoList)

		replaceValue(lklDto, "lastUpdatedDateTime", new Date())
	}

	return lklDto ? (lklDto as LklDto) : newLklDto
}
