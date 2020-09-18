
// replace all of the same key name with the replacement value in dataObj object
export const replaceValue = (dataObj : any, name : string, replacement : any) => {
	for (const key in dataObj) {
		if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
			if (typeof dataObj[key] == 'object') {
				replaceValue(dataObj[key], name, replacement);
			}
			if (key === name) { 
				dataObj[`${name}`] = replacement;
			}
		}
	}
}

export const lklDto_to_LKLFormData = (lklDto : LklDto | undefined) => {

	const { activeIndicator, lookupLklDto } = lklDto ?? {}
	const { lklTitle, locationDesc,	postCd,	lklAddressDto, lklPocListDto } = lookupLklDto ?? {}
	const { addressDto } = lklAddressDto ?? {}

	const {
		addressTypeCd,
		latitude,
		longitude,
		address1,
		address2,
		city,
		countryCd,
		postalCode,
		stateCd,
		province
	} = addressDto ?? {}

	const pocList = lklPocListDto?.map(lklPocListDtoData => {
		const personDto = lklPocListDtoData.personDto
		const { personId, givenName, surName, personEmailDtoList, personPhoneDtoList } = personDto

		const emailList = personEmailDtoList.map(emailData => {
			const emailDto = emailData.emailDto
			return {
				emailAddress : emailDto.emailAddress,
				emailType: "HOME"
			}
		})

		const phoneList = personPhoneDtoList.map(phoneData => {
			const phoneDto = phoneData.phoneDto
			return {
				phoneNum : phoneDto.phoneNum,
				phoneTypeCd: phoneDto.phoneTypeCd
			}
		})

		return {
			personId : personId,
			givenName: givenName,
			surName: surName,
			phoneList: phoneList,
			emailList: emailList
		}
	})

	return {
		lklTitle : lklTitle,
		activeIndicator : activeIndicator,
		country : countryCd,
		post : postCd,
		streetAddress: address1,
		additionalAddress: address2,
		city: city,
		stateCd: stateCd,
		province: province,
		postalCode: postalCode,
		longitude : longitude,
		latitude : latitude,
		locationType: addressTypeCd,
		locationDesc: locationDesc,
		pocList: pocList
	}
}
export const LKLFormData_to_LKLDTO = (lklFormData : LKLFormData, lklDto : LklDto | undefined) => {
	const {
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
		pocList
	} = lklFormData

	// Have to have name and either phone or email thus, without names => empty poc
	const pocListDtoList = pocList?.filter((poc) => {
		return poc.givenName !== '' || poc.surName !== ''
	}).map((poc, index) => {
		const personEmailDtoList = poc.emailList.map((emailData, index) => {
			return {
				personEmailId : index,
				emailDto : {
					emailId : "0",
					emailAddress : emailData.emailAddress
				}
			}
		})
		const personPhoneDtoList = poc.phoneList.map((phoneData) => {
			return {
				personPhoneId : index,
				phoneDto : {
					phoneId : "0",
					phoneNum : phoneData.phoneNum,
					phoneTypeCd : phoneData.phoneTypeCd
				}
			}
		})
		const personDto = {
			personId : poc.personId,
			givenName : poc.givenName,
			surName : poc.surName,
			personEmailDtoList : personEmailDtoList,
			personPhoneDtoList : personPhoneDtoList
		}
		return {
			lklPocId : index,
			personDto : personDto
		}
	})

	const newLklDto = {
		eventId : "",
		eventLklId : "",
		activeIndicator: activeIndicator === "Active" ? true : false,
		lklTypeCd : locationType,
		createdDateTime : new Date(),
		lastUpdatedDateTime : new Date(),
		lookupLklDto : {
			lookupLklId: 0,
			lklTitle: lklTitle,
			locationDesc: locationDesc,
			postCd: post,
			countryCd: country,
			lklAddressDto: {
				lklAddressId: "",
				addressDto: {
					addressId: "",
					addressTypeCd: locationType,
					latitude: latitude,
					longitude: longitude,
					address1: streetAddress,
					address2: additionalAddress,
					city: city,
					countryCd: country,
					postalCode: postalCode,
					province: province,
					stateCd: stateCd
				}
			},
			lklPocListDto: pocListDtoList
		}
	}

	if(lklDto){
		// Create LKLPocListDto : LklPocListDto[]
		replaceValue(lklDto, 'activeIndicator', activeIndicator === "Active" ? true : false)
		replaceValue(lklDto, 'lklTitle', lklTitle)
		replaceValue(lklDto, 'countryCd', country)
		replaceValue(lklDto, 'postCd', post)
		replaceValue(lklDto, 'address1', streetAddress)
		replaceValue(lklDto, 'address2', additionalAddress)
		replaceValue(lklDto, 'city', city)
		replaceValue(lklDto, 'stateCd', stateCd)
		replaceValue(lklDto, 'province', province)
		replaceValue(lklDto, 'postalCode', postalCode)
		replaceValue(lklDto, 'addressTypeCd', locationType)
		replaceValue(lklDto, 'longitude', longitude)
		replaceValue(lklDto, 'latitude', latitude)
		replaceValue(lklDto, 'locationDesc', locationDesc)
		replaceValue(lklDto, 'lklPocListDto', pocListDtoList)

		replaceValue(lklDto, 'lastUpdatedDateTime', new Date())

	} 

	return lklDto ? lklDto as LklDto : newLklDto
}