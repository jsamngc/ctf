import React, { useState } from "react"

import { Flex, Box, PseudoBox, Divider, Text, useDisclosure, BoxProps } from "@chakra-ui/core"
import { P, H4, Card, FinePrint } from "@c1ds/components"

import Dropdown from "../components/Dropdown"
import DeactivateLklModal from "../components/Modals/DeactivateLklModal"
import { useSavedForm } from "../components/Utility/formHelpers"

import {
	MoreVertSharp,
	LocationOnSharp,
	PersonSharp,
	EmailSharp,
	PhoneSharp,
	ExpandLessSharp,
	ExpandMoreSharp,
} from "@material-ui/icons"

import { motion, AnimatePresence } from "framer-motion"

type OmittedBoxProps = "transition" | "style"

const MotionBox = motion.custom<Omit<BoxProps, OmittedBoxProps>>(Box)
interface LKLCard {
	lklData: LklDto
	setEventData: (eventdata : EventFormData) => void
}

const LKLCard: React.FC<LKLCard> = ({ lklData, setEventData }: LKLCard) => {

	const [savedEvents, updateSavedEvents] = useSavedForm<EventFormData[]>("ctfForms", "events")

	const checkActive = lklData.activeIndicator
	// If tabCurrent is true, Location Tab selected otherwise, POC Tab selected
	const [tabCurrent, setTabCurrent] = useState(true)
	const [isDetailOpen, setIsDetailOpen] = useState(false)
	const [direction, setDirection] = useState(1)
	const { isOpen: isDeactivateOpen, onOpen: onDeactivateOpen, onClose: onDeactivateClose } = useDisclosure()

	// const [detailsSectionHeight, setHeight] = useState(200)

	const pocIconProps = {
		mr: 4,
		alignSelf: "center",
		size: "iconPoc",
		color: "label",
	}
	const detailsTabProps = {
		display: "inline-block",
		py: 4,
		fontWeight: 600,
		fontSize: 16,
		color: "headingLarge",
	}

	// TODO : need to improve how to update entire Event DTO efficiently
	const onDeactivate = () => {
		
		let lklDtoIndex = null
		const updateEventIndex = savedEvents.findIndex((evt: EventFormData) => {
			let foundLklDto = null
			if(evt.eventId === lklData.eventId){
				foundLklDto = evt.eventLklDtoList.find((lklDto : LklDto, index : number) => {
					if (lklDto.eventLklId === lklData.eventLklId) {
						lklDtoIndex = index
						return true
					}
					return false
				})
				
			}
			return foundLklDto ? true : false
		})
		const tempLklDto = savedEvents[updateEventIndex].eventLklDtoList[lklDtoIndex]
		const tempLklDtoList = savedEvents[updateEventIndex].eventLklDtoList
		tempLklDtoList.splice(lklDtoIndex, 1, {
			...tempLklDto,
			activeIndicator : !checkActive,
			lastUpdatedDateTime : new Date()
		})
		const updatedEvents = {
			...savedEvents[updateEventIndex],
			eventLklDtoList : tempLklDtoList
		}
		// Update the current Event to reflect the new LKL list in ViewEvent component
		setEventData(updatedEvents)
		savedEvents.splice(updateEventIndex, 1, updatedEvents)

		updateSavedEvents(savedEvents)
		onDeactivateClose()
	}

	// 1.4          The user can see the following fields inside each Last Known Location on the list
	// ·         Location Title
	// ·         Country
	// ·         Post
	// ·         Location Status
	// ·         [Location Description] - expand chevron  (Address, Point of Contact)
	// ·         [Additional Action] – Edit
	// ·         [Additional Action] – Deactivate?
	const options = [
		{
			label: "Edit Location",
			value: "Edit",
			onClick: () => {
				// navigate("/event", { state: { eventId: , isEdit: true } })
			},
		},
		{
			label: checkActive ? "Deactivate" : "Activate",
			value: "Deactivate",
			type: checkActive ? ("error" as const) : ("primary" as const),
			onClick: () => {	
				onDeactivateOpen()
			},
		},
	]

	const { lklTitle, locationDesc, lklAddressDto, lklPocListDto }: LookupLklDto = lklData.lookupLklDto
	const { address1, address2, city, stateCd, postalCode, countryCd }: AddressDto = lklAddressDto.addressDto
	const isUSA = countryCd === 'US' ? `${city}, ${stateCd}, ${postalCode}` : `${city}, ${postalCode}`
	const fullAddress = `${address1} ${address2}, ${isUSA}, ${countryCd}`

	const pocInfo: Array<{ fullName: string; phone: string[]; email: string[] }> = []
	lklPocListDto.map((lklPocListDto: LklPocListDto) => {
		const extractedPoc = { fullName: "", phone: Array<string>(), email: Array<string>()}
		const { givenName, surName, personEmailDtoList, personPhoneDtoList }: PersonDto = lklPocListDto.personDto
		extractedPoc.fullName = `${givenName} ${surName}`

		// TODO: cases for multiple phones and emails
		personPhoneDtoList.map((personPhoneDto : PersonPhoneDto) => {
			extractedPoc.phone.push(personPhoneDto.phoneDto.phoneNum)
		})
		personEmailDtoList.map((personEmailDto : PersonEmailDto) => {
			extractedPoc.email.push(personEmailDto.emailDto.emailAddress)
		})
		pocInfo.push(extractedPoc)
	})
	return (
		<Box>
			<Box backgroundColor={checkActive ? "success" : "silver"} h={3} w="full" /> 
			<Card id="lklCard" maxWidth="full">
				<Flex w="full" mt={{ base: "-8px", sm: "-16px" }}>
					<Flex flexDir={{ base: "column", xl: "row" }} flexGrow={1}>
						<Box flexBasis={{ xl: "65%" }}>
							<P>{lklTitle}</P>
						</Box>
						{/* location address */}
						<Box mb={4} flexBasis={{ xl: "35%" }}>
							<FinePrint color="label">
								U.S. Embassy in {city}, {countryCd}
							</FinePrint>
						</Box>
					</Flex>
					<Box position="relative" right={{ base: "-12px", sm: "-20px", md: "-12px" }}>
						<Dropdown
							options={options}
							borderedRows={true}
							width="10rem"
							label={`Additional actions for ${lklTitle}`}>
							<Box as={MoreVertSharp} color="clickable" />
						</Dropdown>
					</Box>
					<DeactivateLklModal
						isOpen={isDeactivateOpen}
						onCancel={onDeactivateClose}
						locationName={lklTitle}
						onConfirm={onDeactivate}
					/>
				</Flex>

				{/* Detail, hide when  */}
				<Flex mt={8} mb={-12}>
					<Box
						as="button"
						display="inline-flex"
						cursor="pointer"
						border="none"
						backgroundColor="transparent"
						onClick={() => {
							setIsDetailOpen(!isDetailOpen)
						}}
						aria-expanded={isDetailOpen}
						aria-controls="detailsToggleButton"
						aria-label={`Details toggle button for ${lklTitle}`}
						color="clickable">
						<Text my={0} fontSize={16}>
							Details
						</Text>
						{isDetailOpen ? <ExpandLessSharp /> : <ExpandMoreSharp />}
					</Box>
				</Flex>

				{/* Location */}
				{isDetailOpen ? (
					// TODO: Dynamic height with useEffect
					<Box id="detailsToggleButton" position="relative"  overflow="hidden">
						<Divider borderColor="silver" my={16} />
						{/* Detail Tabs before extra large view*/}
						<Box display={{ xl: "none" }}>
							<Flex mb={16}>
								<PseudoBox
									{...detailsTabProps}
									borderWidth={0}
									borderBottom={tabCurrent ? 3 : 0}
									borderBottomColor="accent"
									borderStyle="solid"
									color="headingSmall"
									_hover={
										tabCurrent
											? {}
											: {
													color: "clickable",
													borderBottomColor: "clickable",
													borderBottom: "3px",
													borderStyle: "solid",
											  }
									}
									onClick={() => {
										setDirection(-1)
										setTabCurrent(true)
									}}
									mr={8}>
									<Text fontFamily="headingSmall" margin={0} fontSize="h4" fontWeight="h4" lineHeight="h4">
										Location
									</Text>
								</PseudoBox>
								<Box mx={8} />
								<PseudoBox
									{...detailsTabProps}
									borderWidth={0}
									borderBottom={tabCurrent ? 0 : 3}
									borderBottomColor="accent"
									borderStyle="solid"
									color="headingSmall"
									_hover={
										tabCurrent
											? {
													color: "clickable",
													borderBottomColor: "clickable",
													borderBottom: "3px",
													borderStyle: "solid",
											  }
											: {}
									}
									onClick={() => {
										setDirection(1)
										setTabCurrent(false)
									}}>
									<Text fontFamily="headingSmall" margin={0} fontSize="h4" fontWeight="h4" lineHeight="h4">
										Point of Contact
									</Text>
								</PseudoBox>
							</Flex>
							<AnimatePresence custom={direction} initial={false}>
								<MotionBox
									position="relative"
									
									initial={{ transform: `translateX(${direction < 0 ? "-100%" : "100%"})` }}
									transition={{
										type: "tween",
										duration: 0.5,
										ease: "easeInOut",
									}}
									animate={{
										transform: "translateX(0%)",
									}}
									exit={(currDirection: number) => ({
										transform: `translateX(${currDirection < 0 ? "100%" : "-100%"})`,
									})}
									width="100%">
									{tabCurrent ? (
										<Box key="1">
											<Flex mb={12}>
												<Box as={LocationOnSharp} {...pocIconProps} />
												<FinePrint>{fullAddress}</FinePrint>
											</Flex>
											<Box py={4}>
												<FinePrint color="label">Description</FinePrint>
											</Box>
											<Box>
												<FinePrint>{locationDesc}</FinePrint>
											</Box>
										</Box>
									) : (
										<Box key="2">
											{pocInfo.map((poc, index) => {
												return (
													<Flex
														key={index}
														flexDir={{ base: "column", md: "row" }}
														border={1}
														borderStyle="solid"
														borderColor="silver"
														px={8}
														my={8}
														justifyContent="space-around">
														<Flex py={4}>
															<Box as={PersonSharp} {...pocIconProps} />
															<FinePrint>{poc.fullName}</FinePrint>
														</Flex>
														{poc.email.map((emailAddress : string, index : number) => {
															return (
																<Flex py={4} key={index}>
																	<Box as={EmailSharp} {...pocIconProps} />
																	<FinePrint>{emailAddress}</FinePrint>
																</Flex>
															)
														})}
														{poc.phone.map((phoneNumber : string, index : number) => {
															return (
																<Flex py={4} key={index}>
																	<Box as={PhoneSharp} {...pocIconProps} />
																	<FinePrint>{phoneNumber}</FinePrint>
																</Flex>
															)
														})}
													</Flex>
												)
											})}
										</Box>
									)}
								</MotionBox>
							</AnimatePresence>
						</Box>
						{/* Detail Tabs at extra large view*/}
						<Flex display={{ base: "none", xl: "flex" }}>
							<Box flexBasis={{ xl: "63%" }}>
								<Box pb={16}>
									<H4>Location</H4>
								</Box>
								<Flex mb={12}>
									<Box as={LocationOnSharp} {...pocIconProps} />
									<FinePrint>{fullAddress}</FinePrint>
								</Flex>
								<Box py={4}>
									<FinePrint color="label">Description</FinePrint>
								</Box>
								<Box>
									<FinePrint>{locationDesc}</FinePrint>
								</Box>
							</Box>
							<Divider orientation="vertical" flexBasis={{ xl: "2%" }} color="silver" />
							<Box flexBasis={{ xl: "35%" }}>
								<Box pb={16}>
									<H4>Point of Contact</H4>
								</Box>
								{pocInfo.map((poc, index) => {
									return (
										<Flex
											key={index}
											flexDir="column"
											border={1}
											borderStyle="solid"
											borderColor="silver"
											px={8}
											my={8}
											justifyContent="space-around"
											flexWrap="wrap">
											<Flex py={4}>
												<Box as={PersonSharp} {...pocIconProps} />
												<FinePrint>{poc.fullName}</FinePrint>
											</Flex>
											{poc.email.map((emailAddress : string, index : number) => {
												return (
													<Flex py={4} key={index}>
														<Box as={EmailSharp} {...pocIconProps} />
														<FinePrint>{emailAddress}</FinePrint>
													</Flex>
												)
											})}
											{poc.phone.map((phoneNumber : string, index : number) => {
												return (
													<Flex py={4} key={index}>
														<Box as={PhoneSharp} {...pocIconProps} />
														<FinePrint>{phoneNumber}</FinePrint>
													</Flex>
												)
											})}
										</Flex>
									)
								})}
							</Box>
						</Flex>
					</Box>
				) : null}
			</Card>
		</Box>
	)
}

export default LKLCard
